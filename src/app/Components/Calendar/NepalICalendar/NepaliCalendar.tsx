"use client";

import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineFormatListBulleted, MdOutlineKeyboardArrowDown } from "react-icons/md";
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
import { arabicToDevanagari, limitedYearList, monthNames, selectMonthList, yearList } from "../../../../hooks";
import moment from "moment";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import Select, { components } from 'react-select';
import NepaliDate from "nepali-date-converter";
import Festival from "../../Events/Festival/Festival";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { FaBell, FaCalendarAlt, FaPlus } from "react-icons/fa";
import Share from "../../Share/Share";
import ClockPage from "../../Clock/Clock";
import { useSession } from "next-auth/react";
import useSWR from "swr";

interface CalendarData {
  currentMonthsAd: any;
  success: boolean;
  data: any;
}

export const BS: React.FC<PageProps> = ({
  monthNow,
  yearNow,
  currentdate,
  currenttime,
  isParam,
  preloadData,
  preloadNextData,
  preloadPrevData,
  preloadcurrMonth
}) => {
  const { data: session } = useSession();
  const token = session?.token ? session?.token : session?.user?.data?.token;
  const { eventCreated, baseUrl, siteSetting, animation, clickedDate, dropdownitem, setDropdownitem, setAnimation } = useRoot();
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

  const getNextMonth = (year: number, month: any) => {
    let nextMonth = parseInt(month) + 1;
    let nextYear = year;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear++;
    }
    return { nextYear, nextMonth };
  };

  const { previousYear, previousMonth } = getPreviousMonth(yearNow, monthNow);
  const { nextYear, nextMonth } = getNextMonth(yearNow, monthNow);


  const { data: calendarData, error: calendarError } = useSWR<CalendarData>(
    `${baseUrl}/api/v1/calendar/month/bs/${yearNow}/${monthNow}`,
    fetcher
  );

  const { data: previousData } = useSWR<CalendarData>(
    `${baseUrl}/api/v1/calendar/month/bs/${previousYear}/${previousMonth}`,
    fetcher
  );

  const { data: nextMonthData } = useSWR<CalendarData>(
    `${baseUrl}/api/v1/calendar/month/bs/${nextYear}/${nextMonth}`,
    fetcher
  );


  if (calendarError) {
    return <div>Error fetching next data. Please try again later.</div>;
  }

  if (monthNow > 12 || monthNow < 1) {
    return <NotFound />;
  }
  const [isData, setIsData] = useState(preloadData);

  useEffect(() => {
    if (!calendarData || !previousData || !nextMonthData) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [calendarData, previousData, nextMonthData])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsData([]);
  //   }, 0); // 1000 milliseconds = 1 second

  //   // Cleanup function to clear the timeout if the component unmounts before the timeout is done
  //   return () => clearTimeout(timer);
  // }, [])


  useEffect(() => {

    setLoading(false)

  }, [isData])

  const Nextmonthdata = nextMonthData?.data || []
  const previousdata = previousData?.data || []
  const data = calendarData?.data || []
  const currMonth = calendarData?.currentMonthsAd

  const startYear = Number(siteSetting?.start_year_bs) || 2031;
  const endYear = Number(siteSetting?.end_year_bs) || 2200;
  const yearData: number[] = yearList(startYear, endYear);
  
  const limitedYearData: number[] = limitedYearList();
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isDayOffCanvasOpen, setDayisOffCanvasOpen] = useState<boolean>(false);
  const [Selecteddate, setSelecteddate] = useState<any | null>(null);


  const [calendardata, setcalendardata] = useState(data || preloadData);
  const [nextdata, setnextdata] = useState(Nextmonthdata || preloadNextData);
  const [prevdata, setprevdata] = useState(previousdata || preloadPrevData);
  const [currdata, setcurrdata] = useState(currMonth || preloadcurrMonth);

  useEffect(() => {
    setcalendardata(preloadData);
    setnextdata(preloadNextData);
    setprevdata(preloadPrevData);
    setcurrdata(preloadcurrMonth);

    if (data.length > 0) {
      // setLoading(true)
      setcalendardata(data)
    }
    if (Nextmonthdata.length > 0) {
      // setLoading(true)
      setnextdata(Nextmonthdata)
    }
    if (previousdata.length > 0) {
      // setLoading(true)
      setprevdata(previousdata)
    }
    if (currMonth && currMonth.length > 0) {
      // setLoading(true)
      setcurrdata(currMonth)
    }
  }, [preloadData, preloadNextData, preloadPrevData, data])




  const { bs_year_en }: any = isNaN(parseInt(calendardata[0]?.bs_year_en)) ? {} : calendardata[0];
  const { bs_month_code_en } = calendardata[1] || {};
  const month = isNaN(parseInt(bs_month_code_en, 10)) ? 1 : parseInt(bs_month_code_en, 10);
  const router = useRouter();
  const [ChoosedateOpen, Setchoosedate] = useState<boolean>(false);
  const handleChoosedate = () => {
    Setchoosedate(!ChoosedateOpen);
  };
  const handleChoosedateClose = () => {
    Setchoosedate(false);
  };
  const handleToggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
    document.documentElement.classList.add("ok-open");
  };

  const handleCloseOffCanvas = () => {
    setIsOffCanvasOpen(false);
    document.documentElement.classList.remove("ok-open");
  };
  const handleDayTogglecanvas = () => {
    document.documentElement.classList.add("ok-open");
    setDayisOffCanvasOpen(!isDayOffCanvasOpen);
  };

  const handleDayCloseOffCanvas = () => {
    document.documentElement.classList.remove("ok-open");
    setDayisOffCanvasOpen(false);
  };

  const animateRef = useRef(null);

  useEffect(() => {
    if (animateRef.current) {
      scrollToContainer(animateRef.current);
    }
  }, [animateRef.current])

  const scrollToContainer = (element) => {
    if (element) {
      const offset = 200; // Adjust the offset value according to your needs
      const topPos = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  const [OpenDropdown, setOpenDropdown] = useState(false);
  const [OpenMonthDropdown, setOpenMonthDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMonthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to close dropdown when clicking outside
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
      if (dropdownMonthRef.current && !dropdownMonthRef.current.contains(event.target)) {
        setOpenMonthDropdown(false);
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
  const handleMonthDropdownClick = () => {
    setOpenMonthDropdown(!OpenMonthDropdown);
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

  const handleTodayCanvas = () => {
    setSelecteddate(currentdate)
  }


  // Function to get the current time in "08:39 AM" format
  const getCurrentTime = () => {
    moment.locale('ne');
    // Use Moment.js to format the current time
    return moment().format('HH:mm');
  };
  const currentEngTime = getCurrentTime();

  const [selectedMonth, setSelectedMonth] = useState<any | "">(Number(month));
  const [selectedCalendarType, setSelectedCalendarType] = useState(dropdownitem === "वि.सं." ? "bs" : "ad");

  const [dropDownYearValue, setDropDownYearValue] = useState<number | null>(Number(bs_year_en ? bs_year_en : currentdate.bs_year_en));
  const [inputValue, setInputValue] = useState<string>('');

  const dropDownYear = yearData
    .filter((item) => item.toString().startsWith(inputValue)) // Filter years based on the input text
    .map((item) => ({
      value: item,
      label: arabicToDevanagari(item).toString(),
    }));

  const limitedDropDownYear = limitedYearData
    .filter((item) => item.toString().startsWith(inputValue)) // Filter years based on the input text
    .map((item) => ({
      value: item,
      label: item.toString(),
    }));

  useEffect(() => {
    setDropDownYearValue(Number(bs_year_en ? bs_year_en : currentdate.bs_year_en))
    setSelectedMonth(Number(month))
  }, [month, bs_year_en, isParam])

  // Get the current Nepali date
  const currentNepaliDate = new NepaliDate();

  // Extract the current year from the Nepali date
  const currentNepaliYear = currentNepaliDate.getYear();

  const [eventList, setEventList] = useState<Event[]>([]);

  const getEventList = async () => {
    const upcomingeventapi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/trending-parvas`;

    try {
      const response = await fetch(upcomingeventapi, {
        cache: "no-store"
      });

      if (!response.ok) {
        console.error("Failed to fetch data");
      }

      if (response.ok) {
        const data = await response.json();
        setEventList(data?.data);
      }

    } catch (error) {
      console.error("Failed to fetch data");
      setEventList([]);
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  const customStyles = {

    menu: (provided, state) => ({
      ...provided,
      background: "#f9f9fd",
      border: "solid 1px #a0a0a0a6",
      boxShadow: "none",
      lineHeight: "20px",
      fontSize: "14px",
      top: "80%",
      cursor: "pointer !important",
      width: state.selectProps.options && state.selectProps.options.length > 0 ? "100px" : "160px",
      zIndex: "100",
    }),
    menuList: (provided, state) => ({
      ...provided,
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      fontSize: "13px",
      color: "rgba(51, 51, 51, 0.8) !important",
      fontWeight: "600"
    }),
  }

  // Custom MenuList component to handle scroll behavior
  const MenuList = (props) => {
    const selectedOptionIndex = props.options.findIndex(option => option.value === dropDownYearValue);
    const menuListRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (props.selectProps.menuIsOpen && menuListRef.current) {
        const menu = menuListRef.current;
        const selectedOption = menu.children[selectedOptionIndex] as HTMLDivElement;
        if (selectedOption) {
          const menuHeight = menu.offsetHeight;
          const optionHeight = selectedOption.offsetHeight;
          const scrollPosition = selectedOption.offsetTop - (menuHeight / 2) + (optionHeight / 2);
          menu.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });
        }
      }
    }, [props.selectProps.menuIsOpen, selectedOptionIndex]);

    return (
      <components.MenuList {...props} innerRef={menuListRef}>
        {props.children}
      </components.MenuList>
    );
  };

  const [viewMode, setViewMode] = useState("calendarView");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setViewMode("calendarView");
      } else {
        setViewMode("calendarView");
      }
    };

    // Call handleResize initially
    handleResize();

    // Add event listener to listen for resize events
    window.addEventListener('resize', handleResize);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once


  return (
    <>
      <div className="okv4-col order-2">
        <div className="ok-breadcrumb">
          <ul>
            <li>
              <Link href="https://www.onlinekhabar.com/" target='_blank'>अनलाइनखबर </Link>
            </li>
            <li className='active'>
              क्यालेन्डर
            </li>

          </ul>
        </div>
        <div className="ok-calendar-dates">
          <div className="ok-block ok-block-cal-header">
            <div className="ok-block-cal-date-circle">
              <Link onClick={() => { setDropDownYearValue(null); setSelectedMonth("") }} href={`bs?year=${currentdate.bs_year_en}&month=${currentdate.bs_month_code_en}`}>
                {currentdate.bs_date_np}
              </Link>
            </div>
            <div className="ok-block-cal-date-circle-info">
              <div>
                {currentdate.bs_month_np} {currentdate.bs_year_np}
                <span className="ok-eng-font">
                  {currentdate.ad_month_en} {currentdate.ad_date_en},{" "}
                  {currentdate.ad_year_en}
                </span>
                <span className="ok-season">
                  <Link href={currentdate.panchanga.hritu.url || "#"}>
                    {/* <img src={currentdate.panchanga.hritu.icon} alt="Season" /> */}

                    ऋतु : <small>{currentdate.panchanga.hritu.title_np}</small>

                  </Link>
                </span>
              </div>
              <div className="flx flxwrp align-m ">
                <div className="okelem-panchanga-dropdwon ok-today-panchanga">
                  आजको पञ्चाङ्ग
                  <span className="ok-reveal-dropdown"
                    onClick={() => {
                      handleDayTogglecanvas();
                      handleTodayCanvas()
                    }}>
                    <small className="ok-panchanga-arrow">

                      <MdChevronRight width={30} />
                    </small>
                  </span>
                </div>
                <div className="okelem-panchanga-source">

                  <Link href="/permission-letter">
                    {/* <Image width={24} height={24} src="/img/toyanath-img.png" alt="" /> */}
                    {/* "तोयनाथ पञ्चाङ्ग" {" "}
                    <span>सँगको सहकार्यमा</span> */}
                    {
                      siteSetting?.manyata_prapta_text_np
                    }
                  </Link>
                </div>
              </div>

              <div className="right-time-watch for-mobile">
                <div>

                  <span className="ok-right-time-watch-day">
                    {/* <Image width={38} height={38} src="/img/watch.png" alt="" /> */}
                    {/* <Clock value={clockValue} /> */}
                    <ClockPage />
                    {currentdate.day_np}
                    {/* <span>{arabicToDevanagari(currenttime)}</span> */}
                    <span className="ok-nep-font">{currentEngTime}</span>
                  </span>
                  <span className="ok-sun-rising-info">
                    <span>सूर्योदय {currentdate.panchanga.sunrise_np}</span>
                    <span>सूर्यास्त {currentdate.panchanga.sunset_np}</span>
                    {/* <span><FiSunrise /> {currentdate.panchanga.sunrise_np}</span>
                    <span><FiSunset /> {currentdate.panchanga.sunset_np}</span> */}
                  </span>
                </div>
              </div>
            </div>
            <div className="ok-home-share-this">
              <Share
                endpoint=""
                title={siteSetting?.site_meta_title || "OK Calendar"}
                preFilledText={siteSetting?.site_additional_meta_information}
                imageUrl={siteSetting?.site_og_image}
              />
            </div>
            <div className="right-time-watch ok-for-desktop">
              {/* <Image width={38} height={38} src="/img/watch.png" alt="" /> */}
              {/* <Clock value={clockValue} /> */}
              <ClockPage />
              <div>
                <span className="ok-right-time-watch-day">
                  {currentdate.day_np}
                  {/* <span>{arabicToDevanagari(currenttime)}</span> */}
                  <span className="ok-nep-font">{currentEngTime}</span>
                </span>
                <span className="ok-sun-rising-info">
                  <span>सूर्योदय {currentdate.panchanga.sunrise_np}</span>
                  <span>सूर्यास्त {currentdate.panchanga.sunset_np}</span>
                  {/* <span><FiSunrise /> {currentdate.panchanga.sunrise_np}</span>
                    <span><FiSunset /> {currentdate.panchanga.sunset_np}</span> */}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="for-mobile ok-mobile-festival">
          <Festival festivaldata={eventList} />
        </div>

        <div className="okelm-calendar-card">
          <div className="okelm-calendar-card-filter">
            <div className="ok-select-by-year-months flex">
              <div
                onClick={handleDropdownClick}
                className="ok-select__box ok-select__yr-month ok-yr-month-wrapper ok-select__arrow"
                ref={dropdownRef}
              >
                {dropdownitem}
                {/* <MdOutlineKeyboardArrowDown /> */}
                {OpenDropdown && (
                  <div className="ok-yr-month-dropdown chooseAdBs">
                    <div onClick={() => { setDropdownitem("वि.सं."); setAnimation(false) }}>
                      <Link className={`${dropdownitem === "वि.सं." ? "active" : ""}`} href={"bs"}>वि.सं.</Link>
                    </div>

                    <div onClick={() => { setDropdownitem("ई.सं."); setAnimation(false) }}>
                      <Link className={`${dropdownitem === "ई.सं." ? "active" : ""}`} href={"ad"}>ई.सं.</Link>
                    </div>

                  </div>
                )}
              </div>

              <div
                className="ok-select__box ok-select__yr-month p-0"
              // ref={menuListRef}
              >

                <Select
                  placeholder={dropDownYearValue}
                  isSearchable
                  styles={customStyles}
                  noOptionsMessage={() => "तपाइले खोज्नुभएको वर्ष यहाँ लेख्नुहोस्"}
                  components={{ MenuList }}
                  options={inputValue ? dropDownYear : dropDownYear} // Conditionally render the dropdown
                  onInputChange={(newValue) => setInputValue(newValue)} // Track user input
                  onChange={(selectedOption) => {

                    setDropDownYearValue(selectedOption ? selectedOption.value : bs_year_en)
                    router.push(
                      `${selectedCalendarType}?year=${selectedOption ? selectedOption.value : bs_year_en}&month=${selectedMonth ? selectedMonth : selectedOption && selectedOption.value === currentNepaliYear ? Number(month) : 1}`
                    );
                  }
                  }
                  value={dropDownYear.find((option) => option.value === dropDownYearValue)}
                />
              </div>
              {/* <div
                    className="ok-select__box ok-select__yr-month"
                    onClick={handleChoosedate}
                  >
                    वर्ष र महिना रोज्नुहोस्
                  </div> */}

              <div
                className="ok-select__box ok-select__yr-month ok-yr-month-wrapper ok-select__arrow"
                onClick={handleMonthDropdownClick}
                ref={dropdownMonthRef}
              >
                {monthNames[selectedMonth - 1]}

                {
                  OpenMonthDropdown && (
                    <div
                      className="ok-yr-month-dropdown"
                    // value={selectedMonth}
                    // onChange={(e) => {
                    //   setSelectedMonth(e.target.value);
                    //   router.push(
                    //     `${selectedCalendarType}?year=${dropDownYearValue ? dropDownYearValue : bs_year_en}&month=${e.target.value}`
                    //   );
                    // }}
                    >

                      <div className="disabled">महिना रोज्नुहोस्</div>
                      {
                        selectMonthList.map((item) => (
                          <div
                            onClick={() => {
                              setSelectedMonth(item.value);
                              router.push(
                                `${selectedCalendarType}?year=${dropDownYearValue ? dropDownYearValue : bs_year_en}&month=${item.value}`
                              );
                            }}
                            key={item.value}
                            className={selectedMonth === Number(item.value) ? "active" : ""}
                          >
                            {item.label}
                          </div>
                        ))
                      }


                    </div>
                  )
                }
              </div>
            </div>
            <div className="ok-jump-between-dates">
              {
                calendardata.length > 0 ? (
                  <>
                    <Link
                      href={`bs?year=${Number(month) === 1 ? Number(bs_year_en) - 1 : Number(bs_year_en)}&month=${Number(month) === 1 ? 12 : Number(month) - 1}`}
                      className="prev-date"
                      prefetch={false}
                      scroll={false}
                      onClick={() => { setAnimation(false) }}
                    >
                      {/* <Image width={26} height={26} src="./img/arrow-left.svg" alt="" /> */}
                      <MdChevronLeft />
                    </Link>
                    <div className="ok-currMonthFlex">

                      {calendardata.length > 0 && (
                        <div className="tx-align-c" key={1}>
                          <span className="ok-current-date">
                            {calendardata[0].bs_month_np}{" "}
                            {/* <span>{calendardata[0].bs_year_np}</span> */}

                            {
                              currdata && currdata ? (
                                <>
                                  {
                                    currdata.length > 0 && (
                                      <div className="ok-currMonthDivider">
                                        {
                                          currdata.map((item, i) => (
                                            <div className="relative" key={i}>
                                              {
                                                item[i] === item[2] ? (
                                                  item
                                                ) : (
                                                  item.slice(0, 3)
                                                )
                                              }
                                            </div>
                                          ))
                                        }
                                      </div>
                                    )
                                  }
                                </>
                              ) : null
                            }
                          </span>
                        </div>
                      )}

                    </div>
                    <Link
                      href={`bs?year=${(month === 12 ? parseInt(bs_year_en) + 1 : parseInt(bs_year_en))}&month=${((month % 12) === 0 ? 1 : (month) + 1)}`}
                      className="next-date"
                      prefetch={false}
                      scroll={false}
                      onClick={() => { setAnimation(false) }}

                    >
                      {/* <Image width={26} height={26} src="./img/arrow-left.svg" alt="" /> */}
                      <MdChevronRight />
                    </Link>
                  </>
                ) : null
              }
            </div>

            <div className="flx justify-between gap-1 align-m ok-list-grid-view">
              <div>
                <div className="ok-mobile-view">
                  <div className="ok-calendar-grid">

                    <div onClick={() => {
                      setViewMode("calendarView");
                      setAnimation(false)
                    }}
                      className={`calendar-view ${viewMode === "calendarView" ? "active" : ""}`}>
                      <FaCalendarAlt />
                    </div>

                    <div onClick={() => {
                      setViewMode("listView");
                      setAnimation(false)
                    }}
                      className={`mob-list-view ${viewMode === "listView" ? "active" : ""}`}>
                      <MdOutlineFormatListBulleted />
                    </div>
                  </div>

                </div>
              </div>
              <div className="ok-schedule-btn-wrapper">
                <button
                  className="btn primary  ok-schedule__offcanvas__btn"
                  onClick={handleToggleOffCanvas}
                >
                  {siteSetting?.main_calendar_cta_np}
                  <span className="ok-add-scheule-btn"><FaPlus /></span>
                </button>
              </div>
            </div>

          </div>
          {
            viewMode === "calendarView" && (

              <div className="okelm-patro desktop-patro ">
                <div className="okelm-patro-row ok-for-desktop">
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
                <div className="okelm-patro-row for-mobile mt-0">
                  <div className="okelm-patro-col heading">
                    आ
                    <span>S</span>
                  </div>
                  <div className="okelm-patro-col heading">
                    सो
                    <span>M</span>
                  </div>
                  <div className="okelm-patro-col heading">
                    मं
                    <span>T</span>
                  </div>
                  <div className="okelm-patro-col heading">
                    बु
                    <span>W</span>
                  </div>
                  <div className="okelm-patro-col heading">
                    बि
                    <span>T</span>
                  </div>
                  <div className="okelm-patro-col heading">
                    शु
                    <span>F</span>
                  </div>
                  <div className="okelm-patro-col heading">
                    श
                    <span>S</span>
                  </div>
                </div>

                {
                  !calendardata || calendardata.length === 0 ? (
                    <>
                      {
                        loading ? (
                          <div className="okelm-patro">

                            <div className="okelm-patro-row">
                              {dataArray.map((row, rowIndex) => (
                                <React.Fragment key={rowIndex}>
                                  {row.map((item, columnIndex) => (
                                    <div key={columnIndex} className="okelm-patro-col p-1">
                                      <Skeleton className="ok-my-skeleton" />
                                    </div>
                                  ))}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <NotFound />
                        )
                      }
                    </>
                  ) : (
                    <>

                      {
                        loading ? (
                          <div className="okelm-patro-row">
                            {dataArray.map((row, rowIndex) => (
                              <React.Fragment key={rowIndex}>
                                {row.map((item, columnIndex) => (
                                  <div key={columnIndex} className="okelm-patro-col p-1">
                                    <Skeleton className="ok-my-skeleton" />
                                  </div>
                                ))}
                              </React.Fragment>
                            ))}
                          </div>
                        ) :
                          (
                            <div className="okelm-patro-row ">
                              <PreviousMonths previousdata={prevdata || {}} data={calendardata || {}} />

                              {calendardata.length > 1 &&
                                calendardata.map((item) => {
                                  return (
                                    <div
                                      key={item.id}
                                      ref={animation && item?.ad_full_date_en === clickedDate?.date ? animateRef : null}
                                      onClick={() => {
                                        handleDayTogglecanvas();
                                        setSelecteddate(item);
                                      }}
                                      id={`${animation && item?.ad_full_date_en === clickedDate?.date ? "animation" : ""}`}
                                      className={`okelm-patro-col-day day__offcanvas__btn 
${item.bs_date_np === currentdate.bs_date_np &&
                                          item.bs_month_code_en === currentdate.bs_month_code_en && bs_year_en === currentdate.bs_year_en
                                          && item.day_en === "Saturday"
                                          ? "is-today-holiday"
                                          :
                                          item.bs_date_np === currentdate.bs_date_np &&
                                            item.bs_month_code_en === currentdate.bs_month_code_en && bs_year_en === currentdate.bs_year_en
                                            && item?.events[0]?.is_public_holiday === true
                                            ? "is-today-holiday"
                                            :
                                            item.bs_date_np === currentdate.bs_date_np &&
                                              item.bs_month_code_en === currentdate.bs_month_code_en && bs_year_en === currentdate.bs_year_en
                                              ? "is-today"
                                              : item.day_en === "Saturday"
                                                ? "holiday"
                                                : item?.events[0]?.is_public_holiday === true ?
                                                  "holiday" :
                                                  ""
                                        }
            ${animation && item?.ad_full_date_en === clickedDate?.date ? "animation" : ""}
`}
                                    >

                                      {item?.events.slice(0, 1).map((event, index) => (
                                        <span key={index} className="box-top"> {event?.event_title_np}</span>
                                      ))}

                                      <div
                                        className="okelm-patro-col heading"
                                      >
                                        <span className="">{item.bs_date_np}</span>


                                        {item?.events?.length - 1 >= 1 && (
                                          <span className="ok-more-event">
                                            + {item?.events?.length - 1}
                                          </span>
                                        )}
                                        {item?.events?.length - 1 >= 1 && (
                                          <span className="for-mobile ok-bell-icon">
                                            <FaBell />
                                          </span>
                                        )}


                                      </div>
                                      <div className="col-text-left">
                                        <span>{item?.tithi?.tithi_title_np}</span>
                                      </div>
                                      <div className="ok-eng-date">
                                        <span>{item.ad_date_en}</span>
                                      </div>
                                    </div>
                                  )
                                })}
                              <NextMonth data={calendardata} Nextmonthdata={nextdata} />
                            </div>
                          )
                      }
                    </>
                  )
                }
              </div>
            )
          }
        </div>

        {
          viewMode === "listView" && (
            <>
              {
                calendardata.length > 0 && (
                  <div className="okelm-patro ok-mobile-patro">
                    {
                      loading ? (
                        <div className="okelm-patro-col">
                          <Skeleton className="ok-my-mob-skeleton" count={5} />
                        </div>
                      ) :
                        (
                          <div className="okelm-patro-col">
                            {calendardata.length > 1 &&
                              calendardata.map((item) => {
                                return (

                                  <div
                                    key={item.id}
                                    onClick={() => {
                                      handleDayTogglecanvas();
                                      setSelecteddate(item);
                                    }}
                                    className={`ok-card-day-event  cursor m-0
                              ${item.bs_date_np === currentdate.bs_date_np &&
                                        item.bs_month_code_en === currentdate.bs_month_code_en && bs_year_en === currentdate.bs_year_en
                                        && item.day_en === "Saturday"
                                        ? "is-today-holiday"
                                        :
                                        item.bs_date_np === currentdate.bs_date_np &&
                                          item.bs_month_code_en === currentdate.bs_month_code_en && bs_year_en === currentdate.bs_year_en
                                          && item?.events[0]?.is_public_holiday === true
                                          ? "is-today-holiday"
                                          :
                                          item.bs_date_np === currentdate.bs_date_np &&
                                            item.bs_month_code_en === currentdate.bs_month_code_en && bs_year_en === currentdate.bs_year_en
                                            ? "is-today"

                                            : item.day_en === "Saturday"
                                              ? "is-holiday"
                                              : item?.events[0]?.is_public_holiday === true ?
                                                "is-holiday" :
                                                ""
                                      }
              `}
                                  >

                                    <div className="ok-event-day-date">
                                      {item.bs_date_np}
                                      <span className="">{item.day_np.replace("वार", "")}</span>
                                    </div>
                                    <div className="flex gap-1">
                                      <div className="ok-event-day-info">
                                        <div className="flex gap-1 align-m">
                                          {item?.events.slice(0, 1).map((event, index) => (
                                            <p>
                                              <span key={index} className="mob-box-top">{event?.event_title_np} -</span>
                                            </p>
                                          ))}
                                          <p className="ok-mob-tithi">
                                            {item?.tithi?.tithi_title_np}
                                          </p>

                                        </div>

                                        <div className='ok-date-flex'>
                                          <span>
                                            {item.bs_month_np}{" "} {item.bs_date_np}, {" "}
                                            {item.bs_year_np}

                                          </span>
                                          -
                                          <span className='ok-eng-font'>
                                            {item.ad_month_en.slice(0, 3)}
                                            {" "}
                                            {item.ad_date_en},{" "}
                                            {item.ad_year_en}
                                          </span>
                                        </div>
                                        {/* <span className="mob-ok-eng-date">{item.ad_date_en}</span> */}

                                        {/* {item?.events.slice(0, 2).map((event, index) => (
                                          <span key={index} className="mob-box-top"> {event?.event_title_np}</span>
                                        ))} */}
                                      </div>


                                      <div className="mob-last-col">

                                        <span className="mob-ok-more-event">
                                          {item?.events?.length - 1 >= 1 && (
                                            <>
                                              + {item?.events?.length - 1}
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
            </>
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
          currentdate={currentdate}
        />
      )}
    </>
  );
};

export default BS;

