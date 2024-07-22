"use client"
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight, MdOutlineFormatListBulleted, MdOutlineKeyboardArrowDown } from "react-icons/md";
import Choosedate from '../../Offcanvas/Popup/Choosedate';
import { PageEngProps } from "../../../../types/Calendartypes";
import ScheduleOffcanvas from "../../Offcanvas/ScheduleOffCanvas/ScheduleOffcanvas";
import NextMonth from "./NextMonth";
import EnglishDayOffCanvas from "../../Offcanvas/DayOffCanvas/EnglishDayOffcanvas";
import PreviousMonths from "./PreviousMonth";
import NotFound from "../../../not-found";
import { useRoot } from "../../../../context";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import NepaliDate from "nepali-date-converter";
import { englishYearList, limitedEngYearList, engMonthNames, selectEngMonthList } from "../../../../hooks";
import Select, { components } from 'react-select';
import { FiSunrise, FiSunset } from "react-icons/fi";
import Festival from "../../Events/Festival/Festival";
import { FaBell, FaCalendarAlt, FaPlus } from "react-icons/fa";
import Share from "../../Share/Share";
import ClockPage from "../../Clock/Clock";

export const EnglishCalendar: React.FC<PageEngProps> = ({
  data,
  currentdate,
  currenttime,
  previousdata,
  Nextmonthdata,
  loading,
  isParam
}) => {
  const limitedYearData: number[] = limitedEngYearList();
  const { animation, clickedDate, dropdownitem, setDropdownitem, setAnimation, siteSetting } = useRoot();

  const startYear = Number(siteSetting?.start_year_ad) || 1977;
  const endYear = Number(siteSetting?.end_year_ad) || 2143;
  const yearData: number[] = englishYearList(startYear, endYear);
  
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isDayOffCanvasOpen, setDayisOffCanvasOpen] = useState<boolean>(false);
  const [Selecteddate, setSelecteddate] = useState<any | null>(null);
  const [ChoosedateOpen, Setchoosedate] = useState<boolean>(false);
  const calendardata = data;
  const router = useRouter();
  const { ad_year_en }: any = isNaN(parseInt(calendardata[0]?.bs_year_en)) ? {} : calendardata[0];
  const { ad_month_code_en } = calendardata[1] || {};
  const month = isNaN(parseInt(ad_month_code_en, 10)) ? 1 : parseInt(ad_month_code_en, 10);


  const handleToggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
    document.documentElement.classList.add("ok-open");

  };

  const handleChoosedate = () => {
    Setchoosedate(!ChoosedateOpen)
  };

  const handleChoosedateClose = () => {
    Setchoosedate(false);
  }

  const handleCloseOffCanvas = () => {
    setIsOffCanvasOpen(false);
    document.documentElement.classList.remove("ok-open");

  };

  const handleDayTogglecanvas = () => {
    setDayisOffCanvasOpen(!isDayOffCanvasOpen);
    document.documentElement.classList.add("ok-open");

  };

  const handleDayCloseOffCanvas = () => {
    setDayisOffCanvasOpen(false);
    document.documentElement.classList.remove("ok-open");
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
    setOpenDropdown(!OpenDropdown)
  }
  const handleMonthDropdownClick = () => {
    setOpenMonthDropdown(!OpenMonthDropdown);
  };

  useEffect(() => {
    setDropdownitem("ई.सं.")
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
    moment.locale('en');
    // Use Moment.js to format the current time
    return moment().format('HH:mm');
  };
  const currentEngTime = getCurrentTime();

  const [selectedMonth, setSelectedMonth] = useState<any | "">(Number(month));
  const [selectedCalendarType, setSelectedCalendarType] = useState(dropdownitem === "वि.सं." ? "bs" : "ad");

  const [dropDownYearValue, setDropDownYearValue] = useState<number | null>(Number(ad_year_en ? ad_year_en : currentdate.ad_year_en));
  const [inputValue, setInputValue] = useState<string>('');

  const dropDownYear = yearData
    .filter((item) => item.toString().startsWith(inputValue)) // Filter years based on the input text
    .map((item) => ({
      value: item,
      label: item.toString(),
    }));

  const limitedDropDownYear = limitedYearData
    .filter((item) => item.toString().startsWith(inputValue)) // Filter years based on the input text
    .map((item) => ({
      value: item,
      label: item.toString(),
    }));

  useEffect(() => {
    setDropDownYearValue(Number(ad_year_en ? ad_year_en : currentdate.ad_year_en))
    setSelectedMonth(Number(month))
  }, [month, ad_year_en, isParam])



  const currentEnglishYear = new Date().getFullYear();

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
            <div className="ok-block-cal-date-circle ok-eng-font">
              <Link onClick={() => { setDropDownYearValue(null); setSelectedMonth("") }} href={`ad?year=${currentdate.ad_year_en}&month=${currentdate.ad_month_code_en}`}>
                {currentdate.ad_date_en}
              </Link>
            </div>
            <div className="ok-block-cal-date-circle-info">
              <div className="ok-eng-font">
                {currentdate.ad_month_en} {currentdate.ad_year_en}
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
                  <span className="ok-reveal-dropdown" onClick={() => {
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
                    {/* <Image width={24} height={24} src="/img/toyanath-img.png" alt="" />
                    "तोयनाथ पञ्चाङ्ग" {" "}
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
                    <ClockPage />
                    {currentdate.day_np}
                    {/* <span>{arabicToDevanagari(currenttime)}</span> */}
                    <span>{currentEngTime}</span>
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
              <ClockPage />
              <div>
                <span className="ok-right-time-watch-day">
                  {currentdate.day_np}
                  {/* <span>{arabicToDevanagari(currenttime)}</span> */}
                  <span>{currentEngTime}</span>
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

        <div className="for-mobile  ok-mobile-festival">
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
                      <Link className={`${dropdownitem === "वि.सं." ? "active" : ""}`} href={"bs"}>वि.सं. </Link>
                    </div>

                    <div onClick={() => { setDropdownitem("ई.सं."); setAnimation(false) }} >
                      <Link className={`${dropdownitem === "ई.सं." ? "active" : ""}`} href={"ad"}>ई.सं.</Link>
                    </div>

                  </div>
                )}
              </div>

              <div
                className="ok-select__box ok-select__yr-month p-0"
              >

                <Select
                  placeholder={dropDownYearValue}
                  isSearchable
                  styles={customStyles}
                  noOptionsMessage={() => "No year available"}
                  components={{ MenuList }}
                  options={inputValue ? dropDownYear : dropDownYear}  // Conditionally render the dropdown
                  onInputChange={(newValue) => setInputValue(newValue)} // Track user input
                  onChange={(selectedOption) => {
                    setDropDownYearValue(selectedOption ? selectedOption.value : ad_year_en)
                    router.push(
                      `${selectedCalendarType}?year=${selectedOption ? selectedOption.value : ad_year_en}&month=${selectedMonth ? selectedMonth : selectedOption && selectedOption.value === currentEnglishYear ? Number(month) : 1}`
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

                {engMonthNames[selectedMonth - 1]}
                {
                  OpenMonthDropdown && (
                    <div
                      className="ok-yr-month-dropdown"
                    // value={selectedMonth}
                    // onChange={(e) => {
                    //   setSelectedMonth(e.target.value);
                    //   router.push(
                    //     `${selectedCalendarType}?year=${dropDownYearValue ? dropDownYearValue : ad_year_en}&month=${e.target.value}`
                    //   );
                    // }}
                    >

                      <div className="disabled">Select Month</div>
                      {
                        selectEngMonthList.map((item) => (
                          <div
                            onClick={() => {
                              setSelectedMonth(item.value);
                              router.push(
                                `${selectedCalendarType}?year=${dropDownYearValue ? dropDownYearValue : ad_year_en}&month=${item.value}`
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
                data.length > 0 ? (
                  <>
                    <Link
                      href={`ad?year=${Number(month) === 1 ? Number(ad_year_en) - 1 : Number(ad_year_en)}&month=${Number(month) === 1 ? 12 : Number(month) - 1
                        }`}
                      className="prev-date"
                      prefetch={false}
                      scroll={false}
                      onClick={() => setAnimation(false)}
                    >
                      <MdChevronLeft />
                    </Link>

                    {calendardata.length > 0 && (
                      <div key={1}>
                        <span className="ok-current-date ok-eng-font">
                          {calendardata[0].ad_month_en}{" "}
                          <span>{calendardata[0].ad_year_en}</span>
                        </span>
                      </div>
                    )}

                    <Link
                      href={`ad?year=${(month === 12 ? parseInt(ad_year_en) + 1 : parseInt(ad_year_en))}&month=${((month % 12) === 0 ? 1 : (month) + 1)}`}
                      className="next-date"
                      prefetch={false}
                      scroll={false}
                      onClick={() => setAnimation(false)}

                    >
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
                            <div className="okelm-patro-row">
                              <PreviousMonths previousdata={previousdata} data={data} />
                              {data.length > 1 &&
                                data.map((item) => (
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
                                        item.bs_month_code_en === currentdate.bs_month_code_en && ad_year_en === currentdate.ad_year_en
                                        && item.day_en === "Saturday"
                                        ? "is-today-holiday"
                                        :
                                        item.bs_date_np === currentdate.bs_date_np &&
                                          item.bs_month_code_en === currentdate.bs_month_code_en && ad_year_en === currentdate.ad_year_en
                                          && item?.events[0]?.is_public_holiday === true
                                          ? "is-today-holiday"
                                          :
                                          item.bs_date_np === currentdate.bs_date_np &&
                                            item.bs_month_code_en === currentdate.bs_month_code_en && ad_year_en === currentdate.ad_year_en
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
                                      <span className="ok-eng-font">{item.ad_date_en}</span>


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
                                      <span>{item.bs_date_np}</span>
                                    </div>
                                  </div>
                                ))}
                              <NextMonth data={data} Nextmonthdata={Nextmonthdata} />
                            </div>
                          )}
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
                data.length > 0 && (
                  <div className="okelm-patro ok-mobile-patro">
                    {
                      loading ? (
                        <div className="okelm-patro-col">
                          <Skeleton className="ok-my-mob-skeleton" count={5} />
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
                                      handleDayTogglecanvas();
                                      setSelecteddate(item);
                                    }}
                                    className={`ok-card-day-event  cursor  m-0
    
                                    ${item.bs_date_np === currentdate.bs_date_np &&
                                        item.bs_month_code_en === currentdate.bs_month_code_en && ad_year_en === currentdate.ad_year_en
                                        && item.day_en === "Saturday"
                                        ? "is-today-holiday"
                                        :
                                        item.bs_date_np === currentdate.bs_date_np &&
                                          item.bs_month_code_en === currentdate.bs_month_code_en && ad_year_en === currentdate.ad_year_en
                                          && item?.events[0]?.is_public_holiday === true
                                          ? "is-today-holiday"
                                          :
                                          item.bs_date_np === currentdate.bs_date_np &&
                                            item.bs_month_code_en === currentdate.bs_month_code_en && ad_year_en === currentdate.ad_year_en
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
                                      {item.ad_date_en}
                                      <span className="">{item.day_en.slice(0, 3)}</span>
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
      {isOffCanvasOpen && <ScheduleOffcanvas isDayCanvas={false} Selecteddate={Selecteddate} onClose={handleCloseOffCanvas} />}
      {ChoosedateOpen && <Choosedate currentdate={currentdate} currentYear={ad_year_en} currentMonth={month} onClose={handleChoosedateClose} />}
      {isDayOffCanvasOpen && (
        <EnglishDayOffCanvas
          data={data}
          handleDayCloseOffCanvas={handleDayCloseOffCanvas}
          Selecteddate={Selecteddate}
          currentdate={currentdate}
        />
      )}
    </>
  );
};

export default EnglishCalendar;