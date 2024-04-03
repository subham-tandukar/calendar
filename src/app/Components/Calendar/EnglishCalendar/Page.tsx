"use client"
import AD from "./EnglishCalendar";
import NotFound from "../../../not-found";
import { useContext, useEffect, useState } from "react";
import { signOut, useSession } from 'next-auth/react';
import { useRoot } from "../../../../context";
// import AuthContext from "../../../../context/AuthContext";
interface CalendarData {
  success: boolean;
  data: any;
}




export default function EnglishCalendarComponent({
  month,
  ad_month_en,
  currentdate,
  currenttime,
  ad_year_en,
}: {
  month: string;
  ad_year_en: number;
  currentdate: string;
  currenttime: number;
  ad_month_en: number;
  calendarType?: string;
}) {
  const { data: session, status } = useSession();
  const token = session?.data?.token;
  // const { userData } = useContext(AuthContext)
  const { eventCreated } = useRoot();
  const [loading, setLoading] = useState(true);
  const [calendarData, setCalendarData] = useState<any>([]);
  const [previousData, setPreviousData] = useState<any>([]);
  const [nextMonthData, setNextMonthData] = useState<any>([]);

  const fetchCalenderData = async (
    ad_year_en: number,
    ad_month_en: number,
    previous?: number,
    next?: number
  ): Promise<CalendarData> => {
    const queryParam = previous
      ? `/${ad_year_en}/${previous}`
      : next
        ? `/${ad_year_en}/${next}`
        : `/${ad_year_en}/${ad_month_en}`;
    try {
      const response = await fetch(
        `http://47.128.210.223/api/v1/calendar/month/ad${queryParam}`, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
      );

      return {
        success: response.ok,
        data: await response.json(),
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        success: false,
        data: null,
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [calendarData, previousdata, Nextmonthdata] = await Promise.all([
          fetchCalenderData(ad_year_en, ad_month_en),
          fetchCalenderData(ad_year_en, ad_month_en, parseInt(month) - 1),
          fetchCalenderData(
            ad_year_en,
            ad_month_en,
            undefined,
            (parseInt(month) >= 12 ? 1 : parseInt(month) + 1),
          ),
        ]);
        if (
          calendarData.success &&
          previousdata.success &&
          Nextmonthdata.success
        ) {
          setCalendarData(calendarData.data.data);
          setPreviousData(previousdata.data);
          setNextMonthData(Nextmonthdata.data);

        } else {
          console.error("Error fetching data.");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [ad_month_en, ad_year_en, token, eventCreated]);

  if (!calendarData || !previousData || !nextMonthData) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  if (ad_month_en > 12 || ad_month_en < 1) {
    return <NotFound />
  }

  return (
    <AD
      data={calendarData}
      tithiProps={[]}
      currentdate={currentdate}
      currenttime={currenttime}
      previousdata={previousData}
      Nextmonthdata={nextMonthData}
      ad_year_en={ad_year_en}
      ad_month_en={ad_month_en}
      loading={loading}
    />
  );
}