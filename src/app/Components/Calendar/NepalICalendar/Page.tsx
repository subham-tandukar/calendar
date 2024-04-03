"use client"
import React, { useState, useEffect, useContext } from 'react';
import NotFound from '../../../not-found';
import BS from './NepaliCalendar';
import { signOut, useSession } from 'next-auth/react';
import { useRoot } from '../../../../context';
// import AuthContext from '../../../../context/AuthContext';
interface CalendarData {
  success: boolean;
  data: any;
}



interface Props {
  month: any;
  year: any;
  currentdate: string;
  currenttime: number;
}

const NepaliCalendarComponent: React.FC<Props> = ({
  month,
  year,
  currentdate,
  currenttime,
}) => {
  // const{userData}=useContext(AuthContext);
  const { data: session, status } = useSession();
  const { eventCreated} = useRoot();
  const token = session?.data?.token;
  const [loading, setLoading] = useState(true);
  const [calendarData, setCalendarData] = useState<any>([]);
  const [previousData, setPreviousData] = useState<any>([]);
  const [nextMonthData, setNextMonthData] = useState<any>([]);

  const fetchCalendarData = async (
    year: number,
    month: number,
    previous?: number,
    next?: number
  ): Promise<CalendarData> => {
    const queryParam = previous
      ? `/${year}/${previous}`
      : next
        ? `/${year}/${next}`
        : `/${year}/${month}`;
  
    try {
      const response = await fetch(
        `http://47.128.210.223/api/v1/calendar/month/bs${queryParam}`,{
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
        const initialNextMonth = parseInt(month) + 1;
        const nextMonth = initialNextMonth > 12 ? 1 : initialNextMonth;
        const nextYear = initialNextMonth > 12 ? parseInt(year) + 1 : year;

        const [
          calendarResponse,
          previousResponse,
          nextMonthResponse,
        ] = await Promise.all([
          fetchCalendarData(year, month),
          fetchCalendarData(year, month, parseInt(month) - 1),
          fetchCalendarData(nextYear, nextMonth),
        ]);

        if (
          calendarResponse.success &&
          previousResponse.success &&
          nextMonthResponse.success
        ) {
          setCalendarData(calendarResponse.data.data);
          setPreviousData(previousResponse.data.data);
          setNextMonthData(nextMonthResponse.data.data);
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
  }, [month, year,token,eventCreated]);

  if (month > 12 || month < 1) {
    return <NotFound />;
  }

  return (
    <BS
      data={calendarData}
      currentdate={currentdate}
      currenttime={currenttime}
      previousdata={previousData}
      Nextmonthdata={nextMonthData}
      loading={loading}
    />
  );
};

export default NepaliCalendarComponent;

// "use client"
// import React, { useState, useEffect } from 'react';
// import NotFound from '../../../not-found';
// import BS from './NepaliCalendar';

// interface CalendarData {
//   success: boolean;
//   data: any;
// }

// const fetchCalendarData = async (
//   year: number
// ): Promise<CalendarData> => {
//   const queryParam = `/${year}`;
//   try {
//     const response = await fetch(
//       `http://47.128.210.223/api/v1/calendar/yearly/bs${queryParam}`, {
//       cache: "no-store",
//       // next: {
//       //   revalidate: 5000
//       // }
//     }
//     );
//     return {
//       success: response.ok,
//       data: await response.json(),
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       success: false,
//       data: null,
//     };
//   }
// };

// interface Props {
//   month: number;
//   year: number;
//   currentdate: string;
//   currenttime: number;
// }

// const NepaliCalendarComponent: React.FC<Props> = ({
//   month,
//   year,
//   currentdate,
//   currenttime,
// }) => {
//   const [loading, setLoading] = useState(true);
//   const [calendarData, setCalendarData] = useState<any>([]);
//   const [previousCalendarData, setPreviousCalendarData] = useState<any>([]);
//   const [nextCalendarData, setNextCalendarData] = useState<any>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)

//         let calendarResponse, nextResponse, prevResponse;

//         if (month >= 12) {
//           // Fetch data for current year and next year
//           [calendarResponse, nextResponse] = await Promise.all([
//             fetchCalendarData(year),
//             fetchCalendarData(Number(year) + 1)
//           ]);
//         } else if (month <= 1) {
//           // Fetch data for current year and next year
//           [calendarResponse, prevResponse] = await Promise.all([
//             fetchCalendarData(year),
//             fetchCalendarData(Number(year) - 1)
//           ]);
//         } else {
//           // Fetch data only for the current year
//           calendarResponse = await fetchCalendarData(year);
//           nextResponse = null; // or any default value you want
//           prevResponse = null; // or any default value you want
//         }
//         if (
//           calendarResponse && calendarResponse.success
//         ) {
//           setCalendarData(calendarResponse.data.data);
//           setNextCalendarData(nextResponse ? nextResponse.data.data : null);
//           setPreviousCalendarData(prevResponse ? prevResponse.data.data : null);

//         } else {
//           console.error("Error fetching data.");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [year]);



  


//   if (month > 12 || month < 1) {
//     return <NotFound />;
//   }


//   return (
//     <BS
//       data={calendarData}
//       calendarData={calendarData}
//       currentdate={currentdate}
//       currenttime={currenttime}
//       loading={loading}
//       nextCalendarData={nextCalendarData}
//       previousCalendarData={previousCalendarData}
//       selectedmonth={month}
//       selectedyear={year}
//     />
//   );
// };

// export default NepaliCalendarComponent;