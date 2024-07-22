
"use client"

import AD from "./EnglishCalendar";
import React, { useEffect, useState } from "react";
import NotFound from "../../../not-found";
import { useSession } from 'next-auth/react';
import { useRoot } from "../../../../context";
import useSWR from 'swr';
import Skeleton from "react-loading-skeleton";

interface CalendarData {
  success: boolean;
  data: any;
}

export default function EnglishCalendarComponent({
  month,
  ad_year_en,
  currentdate,
  currenttime,
  ad_month_en,
  isParam
}: {
  month: string;
  ad_year_en: any;
  currentdate: string;
  currenttime: number;
  ad_month_en: any;
  calendarType?: string;
  isParam: string;
}) {
  const { data: session } = useSession();
  const token = session?.token ? session?.token : session?.user?.data?.token;
  const [currMonth, setCurrMonth] = useState<any>([]);


  const { eventCreated, baseUrl } = useRoot();

  const [loading, setLoading] = useState(true);

  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    return response.json();
  };

  const getPreviousMonth = (year: number, month: number) => {
    let previousMonth = month - 1;
    let previousYear = year;
    if (previousMonth < 1) {
      previousMonth = 12;
      previousYear--;
    }
    return { previousYear, previousMonth };
  };

  const getNextMonth = (year: number, month: number) => {
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear++;
    }
    return { nextYear, nextMonth };
  };

  const { previousYear, previousMonth } = getPreviousMonth(ad_year_en, ad_month_en);
  const { nextYear, nextMonth } = getNextMonth(ad_year_en, ad_month_en);

  const { data: calendarData, error: calendarError } = useSWR<CalendarData>(
    `${baseUrl}/api/v1/calendar/month/ad/${ad_year_en}/${ad_month_en}`,
    fetcher
  );




  const { data: previousData } = useSWR<CalendarData>(
    `${baseUrl}/api/v1/calendar/month/ad/${previousYear}/${previousMonth}`,
    fetcher
  );

  const { data: nextMonthData } = useSWR<CalendarData>(
    `${baseUrl}/api/v1/calendar/month/ad/${nextYear}/${nextMonth}`,
    fetcher
  );

  if (calendarError) {
    return <div>Error fetching data. Please try again later.</div>;
  }


  if (ad_month_en > 12 || ad_month_en < 1) {
    return <NotFound />
  }

  useEffect(() => {
    if (!calendarData || !previousData || !nextMonthData) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [calendarData, previousData, nextMonthData])


  return (
    <AD
      data={calendarData?.data || []}
      currMonth={currMonth}
      tithiProps={[]}
      currentdate={currentdate}
      currenttime={currenttime}
      previousdata={previousData?.data || []}
      Nextmonthdata={nextMonthData?.data || []}
      ad_year_en={ad_year_en}
      ad_month_en={ad_month_en}
      loading={!calendarData || !previousData || !nextMonthData}
      isParam={isParam}
    />
  );
}
