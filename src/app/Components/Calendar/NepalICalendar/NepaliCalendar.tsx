"use client";

import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PageProps } from "../../../../types/Calendartypes";
import ScheduleOffcanvas from "../../Offcanvas/ScheduleOffCanvas/ScheduleOffcanvas";
import DayOffcanvas from "../../Offcanvas/DayOffCanvas/NepaliDayOffcanvas";
import PreviousMonths from "./Previousmonths";
import NextMonth from "./NextMonth";
import Choosedate from "../../Offcanvas/Popup/Choosedate";
import NotFound from "../../../not-found";
import { useRoot } from "../../../../context";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AuthContext from "../../../../context/AuthContext";

export const BS: React.FC<PageProps> = ({
  data,
  currentdate,
  currenttime,
  previousdata,
  Nextmonthdata,
  loading
}) => {

  const { animation, clickedDate, dropdownitem, setDropdownitem, setAnimation } = useRoot();
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isDayOffCanvasOpen, setDayisOffCanvasOpen] = useState<boolean>(false);
  const [Selecteddate, setSelecteddate] = useState<any | null>(null);
  const calendardata = data;
  const { bs_year_en }: any = isNaN(parseInt(calendardata[0]?.bs_year_en)) ? {} : calendardata[0];
  const { bs_month_code_en } = calendardata[1] || {};
  const month = isNaN(parseInt(bs_month_code_en, 10)) ? 1 : parseInt(bs_month_code_en, 10);

  const [ChoosedateOpen, Setchoosedate] = useState<boolean>(false);
  const handleChoosedate = () => {
    Setchoosedate(!ChoosedateOpen);
  };
  const handleChoosedateClose = () => {
    Setchoosedate(false);
  };
  const handleToggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  const handleCloseOffCanvas = () => {
    setIsOffCanvasOpen(false);
  };

  const handleDayTogglecanvas = (_id: number) => {
    setDayisOffCanvasOpen(!isDayOffCanvasOpen);
  };

  const handleDayCloseOffCanvas = () => {
    setDayisOffCanvasOpen(false);
  };

  const [OpenDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setOpenDropdown(!OpenDropdown);
  };

  useEffect(() => {
    setDropdownitem("वि.सं.");
  }, [])

  // for loading skeleton 
  const numRows = 5;
  const numColumns = 7;

  const dataArray = Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numColumns }, (_, columnIndex) => rowIndex * numColumns + columnIndex + 1)
  );


  return (
    <>
      <div className="okv4-col order-2">
        <div className="calendar-dates">
          <div className="ok-block ok-block-cal-header">
            <div className="ok-block-cal-date-circle">
              <Link href={`bs?year=${currentdate.bs_year_en}&month=${currentdate.bs_month_code_en}`}>
                {currentdate.bs_date_np}
              </Link>
            </div>
            <div className="ok-block-cal-date-circle-info">
              <div>
                {currentdate.bs_month_np}
                <span>
                  {currentdate.ad_month_en} {currentdate.ad_date_en},{" "}
                  {currentdate.ad_year_en}
                </span>
                <span> ऋतु : {currentdate.panchanga.ritu_np}</span>
              </div>
              <div className="flx flxwrp align-m for-desktop">
                <div className="okelem-panchanga-dropdwon">
                  आजको पञ्चाङ्ग
                  <span className="reveal-dropdown">
                    <img src="img/arrow-right.svg" alt="" />
                  </span>
                </div>
                <div className="okelem-panchanga-source">
                  {/* <img src="./img/toyanath-img.png" alt="" /> */}
                  {/* <a href="#">"तोयनाथ पंचाङ्ग"</a> */}
                   पञ्चाङ निर्णायक समितिद्वारा मान्यता प्राप्त



                </div>
              </div>

              <div className="right-time-watch for-mobile">
                <div>
                  <span className="right-time-watch-day">
                    {currentdate.day_np} <span>{currenttime}</span>
                  </span>
                  <span className="sun-rising-info">
                    <span>सूर्योदय {currentdate.panchanga.sunset_np}</span>
                    <span>सूर्यास्त {currentdate.panchanga.sunrise_np}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="right-time-watch for-desktop">
              <img src="./img/watch.png" alt="" />
              <div>
                <span className="right-time-watch-day">
                  {currentdate.day_np} <span>{currenttime}</span>
                </span>
                <span className="sun-rising-info">
                  <span>सूर्योदय {currentdate.panchanga.sunset_np}</span>
                  <span>सूर्यास्त {currentdate.panchanga.sunrise_np}</span>
                </span>
              </div>
            </div>
          </div>
        </div>



        <div className="okelm-calendar-card">

          <div className="okelm-calendar-card-filter">
            <div className="select-by-year-months flex">
              <div
                onClick={handleDropdownClick}
                className="select__box select__yr-month yr-month-wrapper"
                ref={dropdownRef}
              >
                {dropdownitem}
                <MdOutlineKeyboardArrowDown />
                {OpenDropdown && (
                  <div className="yr-month-dropdown">
                    <div onClick={() => { setDropdownitem("वि.सं."); setAnimation(false) }}>
                      <Link href={"bs"}>वि.सं.</Link>
                    </div>

                    <div onClick={() => { setDropdownitem("ई.सं."); setAnimation(false) }}>
                      <Link href={"ad"}>ई.सं.</Link>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="select__box select__yr-month"
                onClick={handleChoosedate}
              >
                वर्ष र महिना रोज्नुहोस्
              </div>
            </div>
            <div className="jump-between-dates">
              <Link
                href={`bs?year=${Number(month) === 1 ? Number(bs_year_en) - 1 : Number(bs_year_en)}&month=${Number(month) === 1 ? 12 : Number(month) - 1}`}
                className="prev-date"
                prefetch={false}
                scroll={false}
              >
                <img src="./img/arrow-left.svg" alt="" />
              </Link>
              {calendardata.length > 0 && (
                <div key={1}>
                  <span className="current-date">
                    {calendardata[0].bs_month_np}{" "}
                    <span>{calendardata[0].bs_year_np}</span>
                  </span>
                </div>
              )}
              <Link
                href={`bs?year=${(month === 12 ? parseInt(bs_year_en) + 1 : parseInt(bs_year_en))}&month=${((month % 12) === 0 ? 1 : (month) + 1)}`}
                className="next-date"
                prefetch={false}
                scroll={false}
              >
                <img src="./img/arrow-left.svg" alt="" />
              </Link>
            </div>
            <div className="schedule-btn-wrapper">
              <button
                className="btn primary primary-gradient schedule__offcanvas__btn"
                onClick={handleToggleOffCanvas}
              >
                सेड्युलहरु +
              </button>
            </div>
          </div>


          <div className="okelm-patro desktop-patro ">
            <div className="okelm-patro-row">
              <div className="okelm-patro-col heading">
                आइतवार
                <span>SUN</span>
              </div>
              <div className="okelm-patro-col heading">
                सोमवार
                <span>MON</span>
              </div>
              <div className="okelm-patro-col heading">
                मंगलवार
                <span>TUE</span>
              </div>
              <div className="okelm-patro-col heading">
                बुधवार
                <span>WED</span>
              </div>
              <div className="okelm-patro-col heading">
                बिहीवार
                <span>THU</span>
              </div>
              <div className="okelm-patro-col heading">
                शुक्रवार
                <span>FRI</span>
              </div>
              <div className="okelm-patro-col heading">
                शनिवार
                <span>SAT</span>
              </div>
            </div>

            {
              loading ? (
                <div className="okelm-patro-row">
                  {dataArray.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                      {row.map((item, columnIndex) => (
                        <div key={columnIndex} className="okelm-patro-col p-1">
                          <Skeleton className="my-skeleton" />
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              ) :
                !calendardata || calendardata.length === 0 ? (
                  <div className="okelm-nodata">
                    no data
                    <div className="mt-1">
                      <Link href={`bs?year=${currentdate.bs_year_en}&month=${currentdate.bs_month_code_en}`}>
                        Go back
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="okelm-patro-row ">
                    <PreviousMonths previousdata={previousdata || {}} data={data || {}} />

                    {data.length > 1 &&
                      data.map((item) => {
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              handleDayTogglecanvas(item.id);
                              setSelecteddate(item);
                            }}
                            className={`okelm-patro-col-day day__offcanvas__btn 
              ${item.bs_date_np === currentdate.bs_date_np &&
                                item.bs_month_code_en === currentdate.bs_month_code_en && bs_year_en === currentdate.bs_year_en
                                ? "is-today"
                                : item.day_en === "Saturday"
                                  ? "holiday"
                                  : item.events[0]?.is_public_holiday === true ?
                                    "holiday" :
                                    ""
                              }
                            ${animation && item?.ad_full_date_en === clickedDate?.date ? "animation" : ""}
              `}
                          >

                            {item.events.slice(0, 1).map((event, index) => (
                              <span key={index} className="box-top"> {event.event_title_np}</span>
                            ))}

                            <div
                              className="okelm-patro-col heading"
                            >
                              <span className="">{item.bs_date_np}</span>
                              <span className="more-event">

                                {item.events?.length - 1 >= 1 && (
                                  <>
                                    + {item.events?.length - 1}
                                  </>
                                )}

                              </span>
                            </div>
                            <div className="col-text-left">
                              <span>{item.tithi.tithi_title_np}</span>
                            </div>
                            <div className="eng-date">
                              <span>{item.ad_date_en}</span>
                            </div>
                          </div>
                        )
                      })}
                    <NextMonth data={data} Nextmonthdata={Nextmonthdata} />
                  </div>
                )
            }

          </div>
        </div>

        {
          data.length > 0 && (
            <div className="okelm-patro mobile-patro">
              {
                loading ? (
                  <div className="okelm-patro-col">
                    <Skeleton className="my-mob-skeleton" count={5} />
                  </div>
                ) :
                  (
                    <div className="okelm-patro-col">
                      {data.length > 1 &&
                        data.map((item) => {
                          return (

                            <div
                              key={item.id}
                              onClick={() => {
                                handleDayTogglecanvas(item.id);
                                setSelecteddate(item);
                              }}
                              className={`okelm-patro-col-day day__offcanvas__btn 
              ${item.bs_date_np === currentdate.bs_date_np &&
                                  item.bs_month_code_en === currentdate.bs_month_code_en && bs_year_en === currentdate.bs_year_en
                                  ? "is-today"
                                  : item.day_en === "Saturday"
                                    ? "holiday"
                                    : item.events[0]?.is_public_holiday === true ?
                                      "holiday" :
                                      ""
                                }
              `}
                            >

                              <div className="mob-col-left">
                                <span className="mob-date">{item.bs_date_np}</span>
                                <span className="mob-day">{item.day_np}</span>
                              </div>
                              <div className="mob-col-right">
                                <div className="mob-first-col">
                                  <span className="mob-col-text-left">{item.tithi.tithi_title_np}</span>

                                  {item.events.slice(0, 2).map((event, index) => (
                                    <span key={index} className="mob-box-top"> {event.event_title_np}</span>
                                  ))}
                                </div>

                                <div className="mob-last-col">
                                  <span className="mob-eng-date">{item.ad_date_en}</span>
                                  <span className="mob-more-event">
                                    {item.events?.length - 2 >= 1 && (
                                      <>
                                        + {item.events?.length - 2}
                                      </>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>

                          )
                        })}
                    </div>

                  )}

            </div>
          )
        }

      </div>
      {ChoosedateOpen && <Choosedate currentdate={currentdate} currentYear={bs_year_en} currentMonth={month} onClose={handleChoosedateClose} />}
      {isOffCanvasOpen && <ScheduleOffcanvas isDayCanvas={false} Selecteddate={Selecteddate} onClose={handleCloseOffCanvas} />}
      {isDayOffCanvasOpen && (
        <DayOffcanvas
          data={data}
          handleDayCloseOffCanvas={handleDayCloseOffCanvas}
          Selecteddate={Selecteddate}
        />
      )}
    </>
  );
};

export default BS;


// "use client";

// import React, { useEffect, useRef } from "react";
// import { useState } from "react";
// import Link from "next/link";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { PageProps } from "../../../../types/Calendartypes";
// import ScheduleOffcanvas from "../../Offcanvas/ScheduleOffCanvas/ScheduleOffcanvas";
// import DayOffcanvas from "../../Offcanvas/DayOffCanvas/NepaliDayOffcanvas";
// import PreviousMonths from "./Previousmonths";
// import NextMonth from "./NextMonth";
// import Choosedate from "../../Offcanvas/Popup/Choosedate";
// import NotFound from "../../../not-found";
// import { useRoot } from "../../../../context";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// export const BS: React.FC<PageProps> = ({
//   data,
//   calendarData,
//   currentdate,
//   currenttime,
//   previousdata,
//   Nextmonthdata,
//   loading,
//   nextCalendarData,
//   previousCalendarData,
//   selectedmonth,
//   selectedyear,
// }) => {
//   console.log("currentdate", currentdate)
//   console.log("calendarData", calendarData)
//   console.log("nextCalendarData", nextCalendarData)
//   console.log("previousCalendarData", previousCalendarData)

//   const [previousData, setPreviousData] = useState<any>([]);
//   const [currentData, setCurrentData] = useState<any>([]);
//   const [nextData, setNextData] = useState<any>([]);
//   const [allCalendarData, setAllCalendarData] = useState<any>([]);
// useEffect(()=>{
//   setCurrentData(calendarData)
// },[])
//   console.log("currentData", currentData)
//   console.log("previousData", previousData)
//   console.log("nextData", nextData)
//   console.log("allCalendarData", allCalendarData)

//   const currentMonth = calendarData.find((item: any) => Number(item.month_bs) === Number(selectedmonth))?.data || [];

//   let previousMonth;
//   if (selectedmonth <= 1) {
//     previousMonth = previousCalendarData.find((item: any) => Number(item.month_bs) === 12)?.data || [];
//   } else {
//     previousMonth = calendarData.find((item: any) => Number(item.month_bs) === Number(selectedmonth) - 1)?.data || [];
//   }
//   let nextMonth;
//   if (selectedmonth >= 12) {
//     nextMonth = nextCalendarData.find((item: any) => Number(item.month_bs) === 1)?.data || [];
//   } else {
//     nextMonth = calendarData.find((item: any) => Number(item.month_bs) === Number(selectedmonth) + 1)?.data || [];
//   }

//   console.log("currentMonth", currentMonth)
//   console.log("previousMonth", previousMonth)
//   console.log("nextMonth", nextMonth)

//   const firstIndex = currentMonth[0]?.day_code_en;
//   const firstIndexData = parseInt(firstIndex) - 1;
//   const lastIndex = currentMonth[currentMonth.length - 1]?.day_code_en;
//   const lastIndexData = 7 - parseInt(lastIndex);

//   console.log("firstIndex", firstIndex)
//   console.log("firstIndexData", firstIndexData)
//   console.log("lastIndex", lastIndex)
//   console.log("lastIndexData", lastIndexData)

//   let previousMonthData = firstIndexData > 0 ? previousMonth.slice(-firstIndexData) : [];
//   // let previousMonthData: { bs_month_np: string }[] = [];
//   // if (previousData.length === 0) {
//   //   previousMonthData = Array(firstIndexData).fill({ bs_month_np: '' });
//   // } else {
//   //   previousMonthData = firstIndexData > 0 ? previousMonth.slice(-firstIndexData) : [];
//   // }

//   // let nextMonthData: { bs_month_np: string }[] = [];
//   // if (nextData.length === 0) {
//   //   nextMonthData = Array(lastIndexData).fill({ bs_month_np: '' });
//   // } else {
//   //   nextMonthData = nextMonth.slice(0, lastIndexData);
//   // }
//   let nextMonthData = nextMonth.slice(0, lastIndexData);

//   console.log("previousMonthData", previousMonthData)
//   console.log("nextMonthData", nextMonthData)

//   let allData = [...previousMonthData, ...currentMonth, ...nextMonthData];
//   console.log('allData', allData);

//   // const callCalendarData = () => {

//   //   console.log("calendarDatacalendarData", calendarData)
//   //   const currentMonth = calendarData.find((item: any) => Number(item.month_bs) === Number(selectedmonth)) || [];
//   //   setCurrentData(currentMonth);

//   //   const previousMonth = calendarData.find((item: any) => Number(item.month_bs) === Number(selectedmonth) - 1) || [];
//   //   setPreviousData(previousMonth);


//   //   if (selectedmonth >= 12) {
//   //     const nextMonth = nextCalendarData.find((item: any) => Number(item.month_bs) === 1) || [];
//   //     setNextData(nextMonth);
//   //   } else {
//   //     const nextMonth = calendarData.find((item: any) => Number(item.month_bs) === Number(selectedmonth) + 1) || [];
//   //     setNextData(nextMonth);

//   //   }


//   // }

//   // useEffect(() => {
//   //   callCalendarData()
//   // }, [calendarData])



//   const { animation, clickedDate, dropdownitem, setDropdownitem, setAnimation } = useRoot();
//   const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
//   const [isDayOffCanvasOpen, setDayisOffCanvasOpen] = useState<boolean>(false);
//   const [Selecteddate, setSelecteddate] = useState<any | null>(null);
//   // const calendardata = data;
//   // const { bs_year_en }: any = isNaN(parseInt(calendardata[0]?.bs_year_en)) ? {} : calendardata[0];
//   // const { bs_month_code_en } = calendardata[1] || {};
//   // const month = isNaN(parseInt(bs_month_code_en, 10)) ? 1 : parseInt(bs_month_code_en, 10);

//   const [ChoosedateOpen, Setchoosedate] = useState<boolean>(false);
//   const handleChoosedate = () => {
//     Setchoosedate(!ChoosedateOpen);
//   };
//   const handleChoosedateClose = () => {
//     Setchoosedate(false);
//   };
//   const handleToggleOffCanvas = () => {
//     setIsOffCanvasOpen(!isOffCanvasOpen);
//   };

//   const handleCloseOffCanvas = () => {
//     setIsOffCanvasOpen(false);
//   };

//   const handleDayTogglecanvas = (_id: number) => {
//     setDayisOffCanvasOpen(!isDayOffCanvasOpen);
//   };

//   const handleDayCloseOffCanvas = () => {
//     setDayisOffCanvasOpen(false);
//   };

//   const [OpenDropdown, setOpenDropdown] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Function to close dropdown when clicking outside
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleDropdownClick = () => {
//     setOpenDropdown(!OpenDropdown);
//   };

//   useEffect(() => {
//     setDropdownitem("वि.सं.")
//   }, [])

//   // for loading skeleton
//   const numRows = 5;
//   const numColumns = 7;

//   const dataArray = Array.from({ length: numRows }, (_, rowIndex) =>
//     Array.from({ length: numColumns }, (_, columnIndex) => rowIndex * numColumns + columnIndex + 1)
//   );


//   return (
//     <>
//       <div className="okv4-col order-2">
//         <div className="calendar-dates">
//           <div className="ok-block ok-block-cal-header">
//             <div className="ok-block-cal-date-circle">
//               <Link href={`bs?year=${currentdate.bs_year_en}&month=${currentdate.bs_month_code_en}`}>
//                 {currentdate.bs_date_np}
//               </Link>
//             </div>
//             <div className="ok-block-cal-date-circle-info">
//               <div>
//                 {currentdate.bs_month_np}
//                 <span>
//                   {currentdate.ad_month_en} {currentdate.ad_date_en},{" "}
//                   {currentdate.ad_year_en}
//                 </span>
//                 <span> ऋतु : {currentdate.panchanga.ritu_np}</span>
//               </div>
//               <div className="flx flxwrp align-m for-desktop">
//                 <div className="okelem-panchanga-dropdwon">
//                   आजको पञ्चाङ्ग
//                   <span className="reveal-dropdown">
//                     <img src="img/arrow-right.svg" alt="" />
//                   </span>
//                 </div>
//                 <div className="okelem-panchanga-source">
//                   <img src="./img/toyanath-img.png" alt="" />
//                   <a href="#">"तोयनाथ पंचाङ्ग"</a> सँगको सहकार्यमा
//                 </div>
//               </div>

//               <div className="right-time-watch for-mobile">

//                 <div>
//                   <span className="right-time-watch-day">
//                     {currentdate.day_np} <span>{currenttime}</span>
//                   </span>
//                   <span className="sun-rising-info">
//                     <span>सूर्योदय {currentdate.panchanga.sunset_np}</span>
//                     <span>सूर्यास्त {currentdate.panchanga.sunrise_np}</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="right-time-watch for-desktop">
//               <img src="./img/watch.png" alt="" />
//               <div>
//                 <span className="right-time-watch-day">
//                   {currentdate.day_np} <span>{currenttime}</span>
//                 </span>
//                 <span className="sun-rising-info">
//                   <span>सूर्योदय {currentdate.panchanga.sunset_np}</span>
//                   <span>सूर्यास्त {currentdate.panchanga.sunrise_np}</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>



//         <div className="okelm-calendar-card">

//           <div className="okelm-calendar-card-filter">
//             <div className="select-by-year-months flex">
//               <div
//                 onClick={handleDropdownClick}
//                 className="select__box select__yr-month yr-month-wrapper"
//                 ref={dropdownRef}
//               >
//                 {dropdownitem}
//                 <MdOutlineKeyboardArrowDown />
//                 {OpenDropdown && (
//                   <div className="yr-month-dropdown">
//                     <div onClick={() => { setDropdownitem("वि.सं."); setAnimation(false) }}>
//                       <Link href={"bs"}>वि.सं.</Link>
//                     </div>

//                     <div onClick={() => { setDropdownitem("ई.सं."); setAnimation(false) }}>
//                       <Link href={"ad"}>ई.सं.</Link>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div
//                 className="select__box select__yr-month"
//                 onClick={handleChoosedate}
//               >
//                 वर्ष र महिना रोज्नुहोस्
//               </div>
//             </div>
//             <div className="jump-between-dates">
//               {/* <Link
//                 href={`bs?year=${Number(month) === 1 ? Number(bs_year_en) - 1 : Number(bs_year_en)}&month=${Number(month) === 1 ? 12 : Number(month) - 1}`}
//                 className="prev-date"
//                 prefetch={false}
//                 scroll={false}
//               >
//                 <img src="./img/arrow-left.svg" alt="" />
//               </Link>
//               {calendardata.length > 0 && (
//                 <div key={1}>
//                   <span className="current-date">
//                     {calendardata[0].bs_month_np}{" "}
//                     <span>{calendardata[0].bs_year_np}</span>
//                   </span>
//                 </div>
//               )}
//               <Link
//                 href={`bs?year=${(month === 12 ? parseInt(bs_year_en) + 1 : parseInt(bs_year_en))}&month=${((month % 12) === 0 ? 1 : (month) + 1)}`}
//                 className="next-date"
//                 prefetch={false}
//                 scroll={false}
//               >
//                 <img src="./img/arrow-left.svg" alt="" />
//               </Link> */}
//             </div>
//             <div className="schedule-btn-wrapper">
//               <button
//                 className="btn primary primary-gradient schedule__offcanvas__btn"
//                 onClick={handleToggleOffCanvas}
//               >
//                 सेड्युलहरु +
//               </button>
//             </div>
//           </div>


//           <div className="okelm-patro desktop-patro ">
//             <div className="okelm-patro-row">
//               <div className="okelm-patro-col heading">
//                 आइतवार
//                 <span>SUN</span>
//               </div>
//               <div className="okelm-patro-col heading">
//                 सोमवार
//                 <span>MON</span>
//               </div>
//               <div className="okelm-patro-col heading">
//                 मंगलवार
//                 <span>TUE</span>
//               </div>
//               <div className="okelm-patro-col heading">
//                 बुधवार
//                 <span>WED</span>
//               </div>
//               <div className="okelm-patro-col heading">
//                 बिहीवार
//                 <span>THU</span>
//               </div>
//               <div className="okelm-patro-col heading">
//                 शुक्रवार
//                 <span>FRI</span>
//               </div>
//               <div className="okelm-patro-col heading">
//                 शनिवार
//                 <span>SAT</span>
//               </div>
//             </div>

//             {
//               loading ? (
//                 <div className="okelm-patro-row">
//                   {dataArray.map((row, rowIndex) => (
//                     <React.Fragment key={rowIndex}>
//                       {row.map((item, columnIndex) => (
//                         <div key={columnIndex} className="okelm-patro-col p-1">
//                           <Skeleton className="my-skeleton" />
//                         </div>
//                       ))}
//                     </React.Fragment>
//                   ))}
//                 </div>
//               ) :
//                 !allData || allData.length === 0 ? (
//                   <div className="okelm-nodata">
//                     no data
//                     <div className="mt-1">
//                       <Link href={`bs?year=${currentdate.bs_year_en}&month=${currentdate.bs_month_code_en}`}>
//                         Go back
//                       </Link>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="okelm-patro-row">
//                       {allData.length > 0 &&
//                         allData.map((item) => (
//                           <div
//                             key={item.id}
//                             onClick={() => {
//                               handleDayTogglecanvas(item.id);
//                               setSelecteddate(item);
//                             }}
//                             className={`okelm-patro-col-day day__offcanvas__btn
// ${item.bs_date_np === currentdate.bs_date_np &&
//                                 item.bs_month_code_en === currentdate.bs_month_code_en && item.bs_year_en === currentdate.bs_year_en
//                                 ? "is-today"
//                                 : item.day_en === "Saturday"
//                                   ? "holiday"
//                                   : item.events[0]?.is_public_holiday === true ?
//                                     "holiday" :
//                                     ""
//                               }
//                               ${item.bs_month_code_en !== currentdate.bs_month_code_en ? "inactive" : ""}
//              ${animation && item?.ad_full_date_en === clickedDate?.date ? "animation" : ""}
// `}
//                           >

//                             {item.events?.slice(0, 1).map((event, index) => (
//                               <span key={index} className="box-top"> {event.event_title_np}</span>
//                             ))}

//                             <div
//                               className="okelm-patro-col heading"
//                             >
//                               <span className="">{item.bs_date_np}</span>
//                               <span className="more-event">

//                                 {item.events?.length - 1 >= 1 && (
//                                   <>
//                                     + {item.events?.length - 1}
//                                   </>
//                                 )}

//                               </span>
//                             </div>
//                             <div className="col-text-left">
//                               <span>{item.tithi.tithi_title_np}</span>
//                             </div>
//                             <div className="eng-date">
//                               <span>{item.ad_date_en}</span>
//                             </div>
//                           </div>

//                         ))}
//                     </div>
//                   </>
//                 )
//             }

//           </div>
//         </div>

//         {
//           currentMonth.length > 0 && (
//             <div className="okelm-patro mobile-patro">
//               {
//                 loading ? (
//                   <div className="okelm-patro-col">
//                     <Skeleton className="my-mob-skeleton" count={5} />
//                   </div>
//                 ) :
//                   (
//                     <div className="okelm-patro-col">
//                       {currentMonth.length > 1 &&
//                         currentMonth.map((item) => {
//                           return (

//                             <div
//                               key={item.id}
//                               onClick={() => {
//                                 handleDayTogglecanvas(item.id);
//                                 setSelecteddate(item);
//                               }}
//                               className={`okelm-patro-col-day day__offcanvas__btn
//                               ${item.bs_date_np === currentdate.bs_date_np &&
//                                   item.bs_month_code_en === currentdate.bs_month_code_en && item.bs_year_en === currentdate.bs_year_en
//                                   ? "is-today"
//                                   : item.day_en === "Saturday"
//                                     ? "holiday"
//                                     : item.events[0]?.is_public_holiday === true ?
//                                       "holiday" :
//                                       ""
//                                 }
//               `}
//                             >

//                               <div className="mob-col-left">
//                                 <span className="mob-date">{item.bs_date_np}</span>
//                                 <span className="mob-day">{item.day_np}</span>
//                               </div>
//                               <div className="mob-col-right">
//                                 <div className="mob-first-col">
//                                   <span className="mob-col-text-left">{item.tithi.tithi_title_np}</span>

//                                   {item?.events.slice(0, 2).map((event, index) => (
//                                     <span key={index} className="mob-box-top"> {event.event_title_np}</span>
//                                   ))}
//                                 </div>

//                                 <div className="mob-last-col">
//                                   <span className="mob-eng-date">{item.ad_date_en}</span>
//                                   <span className="mob-more-event">
//                                     {item.events?.length - 2 >= 1 && (
//                                       <>
//                                         + {item.events?.length - 2}
//                                       </>
//                                     )}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                           )
//                         })}
//                     </div>

//                   )}

//             </div>
//           )
//         }

//       </div>
//       {ChoosedateOpen && <Choosedate currentdate={currentdate} currentYear={selectedyear} currentMonth={selectedmonth} onClose={handleChoosedateClose} />}
//       {isOffCanvasOpen && <ScheduleOffcanvas onClose={handleCloseOffCanvas} />}
//       {isDayOffCanvasOpen && (
//         <DayOffcanvas
//           data={data}
//           handleDayCloseOffCanvas={handleDayCloseOffCanvas}
//           Selecteddate={Selecteddate}
//         />
//       )}
//     </>
//   );
// };

// export default BS;