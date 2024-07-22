import React, { useEffect, useState } from 'react';
import NotFound from '../../../not-found';
import BS from './NepaliCalendar';
import { useSession } from 'next-auth/react';
import { useRoot } from '../../../../context';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

// interface CalendarData {
//   currentMonthsAd: any;
//   success: boolean;
//   data: any;
// }

interface Props {
  month: any;
  year: any;
  currentdate: string;
  currenttime: number;
  isParam: string;
}

const NepaliCalendarComponent: React.FC<Props> = async({
  month,
  year,
  currentdate,
  currenttime,
  isParam
}) => {

  const getPreviousMonth = (year: number, month: number) => {
    let previousMonth = month - 1;
    let previousYear = year;
    if (previousMonth < 1) {
      previousMonth = 12;
      previousYear--;
    }
    return { previousYear, previousMonth };
  };

  const getNextMonth = (year: number, month: any) => {
    let nextMonth = parseInt(month) + 1;
    let nextYear = year;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear++;
    }
    return { nextYear, nextMonth };
  };

  const { previousYear, previousMonth } = getPreviousMonth(year, month);
  const { nextYear, nextMonth } = getNextMonth(year, month);

  let todayCalendar;
    
  const calendarApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/month/bs/${year}/${month}`;

  try {
      const response = await fetch(calendarApi);

      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      todayCalendar = await response.json();
  }
  catch (error) {
      console.error("error", error);


      return <div>error fetching. please try again</div>
  };

  let nextCalendar;
    
  const nextcalendarApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/month/bs/${nextYear}/${nextMonth}`;

  try {
      const response = await fetch(nextcalendarApi);

      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      nextCalendar = await response.json();
  }
  catch (error) {
      console.error("error", error);


      return <div>error fetching. please try again</div>
  };

  let prevCalendar;
    
  const prevcalendarApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/month/bs/${previousYear}/${previousMonth}`;

  try {
      const response = await fetch(prevcalendarApi);

      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      prevCalendar = await response.json();
  }
  catch (error) {
      console.error("error", error);


      return <div>error fetching. please try again</div>
  };

  // const { data: session } = useSession();
  // const token = session?.token ? session?.token : session?.user?.data?.token;
  // const { eventCreated, baseUrl } = useRoot();
  // const [loading, setLoading] = useState(true);

  // const fetcher = async (url: string) => {
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`
  //     }
  //   });

  //   if (!response.ok) {
  //     throw new Error('Failed to fetch');
  //   }

  //   return response.json();
  // };

  // const getPreviousMonth = (year: number, month: number) => {
  //   let previousMonth = month - 1;
  //   let previousYear = year;
  //   if (previousMonth < 1) {
  //     previousMonth = 12;
  //     previousYear--;
  //   }
  //   return { previousYear, previousMonth };
  // };

  // const getNextMonth = (year: number, month: any) => {
  //   let nextMonth = parseInt(month) + 1;
  //   let nextYear = year;
  //   if (nextMonth > 12) {
  //     nextMonth = 1;
  //     nextYear++;
  //   }
  //   return { nextYear, nextMonth };
  // };

  // const { previousYear, previousMonth } = getPreviousMonth(year, month);
  // const { nextYear, nextMonth } = getNextMonth(year, month);


  // const { data: calendarData, error: calendarError } = useSWR<CalendarData>(
  //   `${baseUrl}/api/v1/calendar/month/bs/${year}/${month}`,
  //   fetcher
  // );

  // const { data: previousData } = useSWR<CalendarData>(
  //   `${baseUrl}/api/v1/calendar/month/bs/${previousYear}/${previousMonth}`,
  //   fetcher
  // );

  // const { data: nextMonthData } = useSWR<CalendarData>(
  //   `${baseUrl}/api/v1/calendar/month/bs/${nextYear}/${nextMonth}`,
  //   fetcher
  // );


  // if (calendarError) {
  //   return <div>Error fetching next data. Please try again later.</div>;
  // }

  // if (month > 12 || month < 1) {
  //   return <NotFound />;
  // }

  // useEffect(() => {
  //   if (!calendarData || !previousData || !nextMonthData) {
  //     setLoading(true)
  //   } else {
  //     setLoading(false)
  //   }
  // }, [calendarData, previousData, nextMonthData])
  return (
    <BS
      currentdate={currentdate}
      currenttime={currenttime}
      monthNow={month}
      yearNow={year}
      isParam={isParam}
      preloadData = {todayCalendar?.data || []}
      preloadNextData = {nextCalendar?.data || []}
      preloadPrevData = {prevCalendar?.data || []}
      preloadcurrMonth={todayCalendar?.currentMonthsAd}
    />
  );
};



export default NepaliCalendarComponent;
