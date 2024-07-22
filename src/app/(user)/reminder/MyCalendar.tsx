"use client"

import React, { useEffect, useState } from 'react';
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import PageLoading from '../../page-loading';
import { useSession } from 'next-auth/react';
import { arabicToDevanagari, fetcherWithToken, getRemainingDays, nepaliDaysRemaining } from '../../../hooks';
import NepaliDateConverter from 'nepali-date-converter';
import Popup from './Popup';
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdChevronRight, MdDeleteOutline } from "react-icons/md";
import DeletePop from './DeletePop';
import { AiOutlineEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa6";
import ScheduleOffcanvas from '../../Components/Offcanvas/ScheduleOffCanvas/ScheduleOffcanvas';
import EditPop from './EditPop';
import moment from 'moment';
import { toast } from 'react-toastify';
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import { useRoot } from '../../../context';
import Image from 'next/image';
import Share from '../../Components/Share/Share';
import SelectYear from '../../Components/SelectYear/SelectYear';
import SelectMonth from '../../Components/SelectMonth/SelectMonth';
import useSWR, { mutate } from 'swr';
interface Event {
    id: number;
    event_title_np: string;
    is_public_holiday: boolean;
    date: {
        bs_month_np: string;
        bs_date_np: string;
        bs_year_np: string;
        ad_date_en: string;
        ad_month_en: string;
        id: number;
        ad_year_en: string;
        ad_concat_date_en: string;
    }

}


const MyCalendar = ({ currentdate }) => {
    const { siteSetting, createddate, eventCreated, userInfo } = useRoot();
    const creadtedYear = createddate.split("-")[0] || "";
    const creadtedMonth = createddate.split("-")[1] || "";

    const [submitYear, setSubmitYear] = useState<string>(creadtedYear ? creadtedYear : currentdate.bs_year_en);
    const [submitMonth, setSubmitMonth] = useState<string>(creadtedMonth ? creadtedMonth : currentdate.bs_month_code_en);

    const [selectedMyYear, setSelectedMyYear] = useState(creadtedYear ? creadtedYear : currentdate.bs_year_en);
    const [selectedMyMonth, setSelectedMyMonth] = useState(creadtedMonth ? creadtedMonth : currentdate.bs_month_code_en);

    const [todaydate, setTodayDate] = useState('');
    const { data: session, status } = useSession();
    const token = session?.token ? session?.token : session?.user?.data?.token;

    const initialDateValue = {
        selectedDate: todaydate,
    };
    useEffect(() => {
        if (currentdate && creadtedYear) {
            setSelectedMyYear(Number(creadtedYear ? creadtedYear : currentdate?.bs_year_en));
            setSubmitYear(creadtedYear ? creadtedYear : currentdate?.bs_year_en);
        }
        if (currentdate && creadtedMonth) {
            setSelectedMyMonth(Number(creadtedMonth ? creadtedMonth : currentdate?.bs_month_code_en));
            setSubmitMonth(creadtedMonth ? creadtedMonth : currentdate?.bs_month_code_en);
        }
    }, [currentdate, creadtedYear, creadtedMonth]);

    const [dateValue, setDateValue] = useState(initialDateValue);
    useEffect(() => {
        const currentDate = new NepaliDateConverter();
        setTodayDate(currentDate.format('YYYY/M/D'))
        setDateValue({ selectedDate: currentDate.format('YYYY/M/D') });
    }, []);
    const handleDate = ({ bsDate }: { bsDate: string }) => {
        setDateValue({ ...dateValue, selectedDate: bsDate });
    };

    const [eventList, setEventList] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    // const getEventList = async () => {
    //     const EventApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/my-events/bs/${submitYear}/${submitMonth}`;

    //     try {
    //         setLoading(true)
    //         const response = await fetch(EventApi, {
    //             cache: "no-store",
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //         });

    //         if (!response.ok) {
    //             console.error("Failed to fetch data");
    //             setLoading(false)
    //         }

    //         if (response.ok) {
    //             const data = await response.json();
    //             setEventList(data?.data);
    //             setLoading(false)
    //         }

    //     } catch (error) {
    //         console.error("Failed to fetch data");
    //         setEventList([]);
    //         setLoading(false)
    //     }
    // };

    // useEffect(() => {
    //     getEventList();
    // }, [submitMonth, submitYear, token, eventCreated]);


    const fetcher = (url) => fetcherWithToken(url, token);

    const { data: fetchedData, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/my-events/bs/${submitYear}/${submitMonth}`,
        fetcher
    );

    useEffect(() => {
        if (fetchedData) {
            setEventList(fetchedData?.data);
        }

    }, [fetchedData]);

    useEffect(() => {
        if (error) {
            setEventList([])
        }
    }, [error]);

    const reFetch = () => {
        mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/my-events/bs/${submitYear}/${submitMonth}`);
    }

    useEffect(() => {
        if (eventCreated) {
            reFetch()
        }
    }, [eventCreated])

    const [popup, setPopup] = useState(false)
    const [deletepopup, setDeletePopup] = useState(false)

    // To view
    const [eventInfo, setEventInfo] = useState([]);

    const handleClick = (data) => {
        setEventInfo(data)
        setPopup(!popup)
    }

    const handleClose = () => {
        setPopup(false)
    }

    // To delete
    const [id, setId] = useState("")
    const handleDelete = (id) => {
        setId(id)
        setDeletePopup(!deletepopup)
    }
    const handleDeleteClose = () => {
        setDeletePopup(false)
    }

    const deleteEvent = async () => {
        const EventApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/delete-events/${id}`;

        try {
            setLoading(true)
            const response = await fetch(EventApi, {
                cache: "no-store",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!response.ok) {
                console.error("Failed to fetch data");
            }

            if (response.ok) {
                const result = await response.json();

                setDeletePopup(false)
                reFetch();
                toast.success(result?.data?.message, {
                    theme: "light",
                });
            }

        } catch (error) {
            console.error("Failed to fetch data");
        }
    };

    // To edit
    const [today, setToday] = useState('');
    const [tomorrow, setTomorrow] = useState('');
    const [dayAfterTomorrow, setDayAfterTomorrow] = useState('');

    // Load moment-nepali plugin
    moment.locale('ne');

    useEffect(() => {
        const currentDate = moment(); // Get the current date in Gregorian calendar
        const nepaliDateConverter = new NepaliDateConverter(currentDate.toDate()); // Convert to Nepali date
        const today = nepaliDateConverter.format('YYYY-M-D');
        setToday(today);

        const tomorrowDate = currentDate.clone().add(1, 'day'); // Clone the current date and add 1 day
        const tomorrowNepali = new NepaliDateConverter(tomorrowDate.toDate()); // Convert to Nepali date
        const tomorrow = tomorrowNepali.format('YYYY-M-D');
        setTomorrow(tomorrow);

        const dayAfterTomorrowDate = currentDate.clone().add(2, 'days'); // Clone the current date and add 2 days
        const dayAfterTomorrowNepali = new NepaliDateConverter(dayAfterTomorrowDate.toDate()); // Convert to Nepali date
        const dayAfterTomorrow = dayAfterTomorrowNepali.format('YYYY-M-D');
        setDayAfterTomorrow(dayAfterTomorrow);
    }, []);

    const initialValue = {
        scheduledate: "",
        selectedDate: "",
        fromTime: "",
        toTime: "",
        eventTitle: "",
        location: "",
        note: "",
    };

    const [clearDate, setClearDate] = useState<number | undefined>();
    const [categoryid, setCategoryId] = useState<string>("");
    const [formValue, setFormValue] = useState(initialValue);


    const [editpopup, setEditPopup] = useState(false)

    const handleEdit = (data) => {
        setId(data.id)
        setEventInfo(data)
        setEditPopup(!editpopup)
        document.documentElement.classList.add("ok-open");

        setFormValue({
            ...formValue,
            scheduledate: data?.date.bs_concat_date_en === today
                ? "today"
                :
                data?.date.bs_concat_date_en === tomorrow
                    ? "tomorrow"
                    :
                    data?.date.bs_concat_date_en === dayAfterTomorrow
                        ? "dayAfterTomorrow"
                        : "",

            selectedDate: data.date.bs_concat_date_en,
            fromTime: data.time_from,
            toTime: data.time_to,
            eventTitle: data.event_title_np,
            location: data.location,
            note: data.note,
        })


        setCategoryId(data.event_category_id.toString())
    }
    const handleEditClose = () => {
        setEditPopup(false)
        document.documentElement.classList.remove("ok-open");

    }


    // 
    const selectedYear = dateValue.selectedDate.split("/")[0]
    const selectedMonth = dateValue.selectedDate.split("/")[1]
    const selectedDay = dateValue.selectedDate.split("/")[2]

    const monthNames = [
        "सबै",
        "बैशाख",
        "जेठ",
        "असार",
        "साउन",
        "भदौ",
        "असोज",
        "कार्तिक",
        "मंसिर",
        "पौष",
        "माघ",
        "फागुन",
        "चैत",
    ]

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitYear(selectedMyYear)
        setSubmitMonth(selectedMyMonth)
    };

    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

    const handleToggleOffCanvas = () => {
        setIsOffCanvasOpen(!isOffCanvasOpen);
        document.documentElement.classList.add("ok-open");

    };

    const handleCloseOffCanvas = () => {
        setIsOffCanvasOpen(false);
        document.documentElement.classList.remove("ok-open");

    };

    return (
        <>

            <div className="okv4-container ">
                <div className="ok-breadcrumb">
                    <ul>
                        <li>
                            <Link href="https://www.onlinekhabar.com/" target='_blank'>अनलाइनखबर </Link>
                        </li>
                        <li>
                            <Link href="/">क्यालेन्डर</Link>
                        </li>
                        <li className='active'>
                            {siteSetting.reminder_title_np}
                        </li>
                    </ul>
                </div>

                <div className="ok-bg">
                    <div className="ok-desc-content">

                        <div className="ok-tab-flex">
                            <h4 className='ok-main-title ok-my-reminder-title'>
                                {siteSetting.reminder_title_np}

                                <span onClick={handleToggleOffCanvas} className='ok-add-my-reminder'><FaPlus /></span>
                            </h4>
                            {/* <Share
                                endpoint="reminder"
                                title={`${siteSetting?.reminder_title_np} - Online Khabar Calendar`}
                                imageUrl={`${siteSetting?.reminder_thumbnail ? siteSetting?.reminder_thumbnail : siteSetting?.main_logo}`}
                            /> */}
                        </div>

                        <div className="ok-content mt-2">
                            <p
                                dangerouslySetInnerHTML={{ __html: siteSetting.reminder_description_np }}
                            />
                        </div>
                        <div className="ok-content-profile ">
                            {userInfo && (
                                <>

                                    <div className="ok-user__profile">
                                        {
                                            userInfo && userInfo.photo ? (
                                                <>
                                                    <img src={userInfo.photo} alt="User Image" />
                                                </>
                                            ) : (
                                                // <span>
                                                //     {
                                                //         userInfo && userInfo.display_name && userInfo.display_name.charAt(0)
                                                //     }
                                                // </span>
                                                <Image
                                                    width={35}
                                                    height={35}
                                                    src="/img/ok-user.png"
                                                    alt='user'
                                                />
                                            )
                                        }
                                    </div>
                                    <div>
                                        <span>
                                            {userInfo.display_name}
                                        </span>
                                        <span>
                                            {userInfo.email}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        {
                            userInfo && userInfo.bio && (
                                <div className="ok-content mt-1">
                                    <p>
                                        {userInfo.bio}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                    <div className="">
                        <div className="">


                            <div>
                                <form onSubmit={handleSubmit}>

                                    <div className='ok-filter__flex ok-filter-border'>
                                        <div>
                                            <div className='ok-filter__flex'>
                                                <label htmlFor="number" className="mb-10 d-block">
                                                    वर्ष रोज्नुहोस्
                                                </label>
                                                {/* <div className='ok-filter-year mt-1'>

                                            <input
                                                type="number"
                                                id="number"
                                                value={selectedMyYear}
                                                onChange={(e) => setSelectedMyYear(e.target.value)}
                                            />

                                        </div> */}
                                                <SelectYear currentdate={currentdate} selectedYear={selectedMyYear} setSelectedYear={setSelectedMyYear} />
                                            </div>

                                            <div className='ok-filter__flex'>
                                                <label className="mb-10 d-block">महिना रोज्नुहोस्</label>

                                                <SelectMonth isAll="notall" selectedMonth={selectedMyMonth} setSelectedMonth={setSelectedMyMonth} />

                                            </div>
                                        </div>
                                        <div >
                                            <input
                                                type="submit"
                                                className="btn btn-medium primary primary-gradient"
                                                value={siteSetting?.date_filter_cta_np}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="">


                            {
                                isLoading ? (
                                    <PageLoading />
                                ) : (
                                    <>
                                        {
                                            eventList.length > 0 ? (
                                                <div className="ok-my__events">
                                                    <div className="ok__table">
                                                        <table >
                                                            <thead>

                                                                <tr>
                                                                    <th>मिति</th>
                                                                    <th>
                                                                        कार्यक्रमहरू
                                                                    </th>
                                                                    <th></th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {eventList.map((props) => {
                                                                    const remainingDays = getRemainingDays(String(props?.date?.ad_concat_date_en))

                                                                    return (

                                                                        <React.Fragment key={props.id}>
                                                                            <tr  >
                                                                                <td>
                                                                                    <span>{props?.date?.bs_month_np} {props?.date?.bs_date_np}, {props?.date?.bs_year_np}</span>
                                                                                    <span>{props?.date?.ad_date_en} {props?.date?.ad_month_en}, {props?.date?.ad_year_en}</span>
                                                                                </td>
                                                                                <td>
                                                                                    <span className={`ok-event-title ${props?.is_public_holiday ? "is-holiday" : ""}`}>
                                                                                        {props.event_title_np}
                                                                                    </span>
                                                                                </td>
                                                                                <td >{nepaliDaysRemaining(remainingDays)}</td>
                                                                                <td>
                                                                                    <div className='ok-popup-cta'>
                                                                                        <span className='ok-cta' onClick={() => handleClick(props)}>
                                                                                            <FaEye />
                                                                                        </span>
                                                                                        <span className='ok-cta edit' onClick={() => handleEdit(props)}>
                                                                                            <AiOutlineEdit />
                                                                                        </span>

                                                                                        <span className='ok-cta danger' onClick={() => handleDelete(props.id)}>
                                                                                            <MdDeleteOutline size="1.2rem" />
                                                                                        </span>
                                                                                    </div>

                                                                                </td>
                                                                            </tr>

                                                                        </React.Fragment>

                                                                    )
                                                                })}

                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='ok-add-events'>
                                                    इभेन्ट थप्नुहोस्
                                                    <span onClick={handleToggleOffCanvas} className="ok-view-all-btn">
                                                        <MdChevronRight width={30} />
                                                    </span>

                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }


                        </div>
                    </div>
                </div>
            </div>



            {
                popup && <Popup onClose={handleClose} data={eventInfo} />
            }
            {
                deletepopup && <DeletePop onClose={handleDeleteClose} onDelete={deleteEvent} />
            }
            {editpopup && <EditPop
                Selecteddate={eventInfo}
                onClose={handleEditClose}
                initialValue={initialValue}
                clearDate={clearDate}
                setClearDate={setClearDate}
                formValue={formValue}
                setFormValue={setFormValue}
                categoryid={categoryid}
                setCategoryId={setCategoryId}
                today={today}
                tomorrow={tomorrow}
                dayAfterTomorrow={dayAfterTomorrow}
                id={id}
                getEventList={reFetch}
            />}

            {isOffCanvasOpen && <ScheduleOffcanvas isDayCanvas={false} Selecteddate={eventInfo} onClose={handleCloseOffCanvas} />}

        </>
    );
};

export default MyCalendar;