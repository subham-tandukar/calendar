// "use client"
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import PageLoading from '../../page-loading';
// import { arabicToDevanagari, getRemainingDays, nepaliDaysRemaining } from '../../../hooks';
// import Popup from '../../(user)/event/Popup';
// import { signOut, useSession } from 'next-auth/react';
// import { useRoot } from '../../../context';

// interface Reminder {
//     id: number;
//     event_title_np: string;
//     date: {
//         ad_concat_date_en: string;
//         bs_date_np: string;
//         day_np: string;
//         bs_month_np: string;
//         bs_year_np: string;
//         ad_date_np: string;
//         ad_month_np: string;
//         ad_year_np: string;
//     }
// }

// const Reminder = () => {
//     const { siteSetting } = useRoot();
//     const { data: session, status } = useSession();
//     const token = session?.token ? session?.token : session?.user?.data?.token;

//     const [reminderList, setreminderList] = useState<Reminder[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     const getreminderList = async () => {
//         const reminderApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/my-events?type=upcoming`;

//         try {
//             setLoading(true)
//             const response = await fetch(reminderApi, {
//                 cache: "no-store",
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//             });

//             if (!response.ok) {
//                 console.error("Failed to fetch data");
//             }


//             if (response.ok) {
//                 const data = await response.json();
//                 setreminderList(data.data);
//                 setLoading(false)
//             }

//         } catch (error) {
//             console.error("Failed to fetch data");
//             setreminderList([]);
//             setLoading(false)
//         }
//     };

//     useEffect(() => {
//         getreminderList();
//     }, [token]);

//     const [popup, setPopup] = useState(false)
//     const handleClose = () => {
//         setPopup(false)
//     }
//     const [eventInfo, setEventInfo] = useState([])
//     const [eventData, setEventData] = useState([])
//     const handleClick = (props) => {
//         setEventData(props.date)
//         setEventInfo(props)
//         setPopup(!popup)
//     }
//     return (
//         <>

//             <div className="okv4-container">
//                 <div className="ok-breadcrumb">
//                     <ul>
//                         <li>
//                             <Link href="/">क्यालेन्डर</Link>
//                         </li>
//                         <li className='active'>
//                             {siteSetting.reminder_title_np}
//                         </li>
//                     </ul>
//                 </div>
//                 <div className="ok-desc-content">
//                     <h4>
//                         {siteSetting.reminder_title_np}
//                     </h4>
//                     <div className="ok-content mt-1">
//                         <p
//                             dangerouslySetInnerHTML={{ __html: siteSetting.reminder_description_np }}
//                         />
//                     </div>
//                 </div>

//                 <div className="">

//                     {
//                         loading ? (
//                             <PageLoading />
//                         ) : (
//                             <>
//                                 {
//                                     reminderList.length > 0 ? (
//                                         <div className="grid-item grid-item-2 grid-gap-10">
//                                             {
//                                                 reminderList.map((data) => {
//                                                     const remainingDays = getRemainingDays(String(data?.date?.ad_concat_date_en))
//                                                     return (
//                                                         <div key={data.id}>
//                                                             <div className="ok-card-day-event">
//                                                                 <div className="ok-event-day-date">
//                                                                     {data.date.bs_date_np}<br />
//                                                                     <span>{data.date.day_np.replace("वार", "")}</span>
//                                                                 </div>
//                                                                 <div className="ok-event-day-info">
//                                                                     <p className='cursor'
//                                                                         onClick={() => handleClick(data)}>{data.event_title_np}</p>
//                                                                     <span>{data.date.bs_month_np} {data.date.bs_date_np}, {data.date.bs_year_np} - {data.date.ad_date_np} {data.date.ad_month_np}, {data.date.ad_year_np}</span>
//                                                                 </div>
//                                                                 <div className="right-items">
//                                                                     <div className="ok-event-day-reminder">{nepaliDaysRemaining(remainingDays)}</div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>

//                                                     )
//                                                 })
//                                             }
//                                         </div>

//                                     ) : (
//                                         <div className="ok-no-data" style={{ textAlign: "left" }}>
//                                             डाटा उपलब्ध छैन
//                                         </div>
//                                     )
//                                 }
//                             </>
//                         )
//                     }



//                 </div>
//             </div>

//             {
//                 popup && <Popup title="आगामी इभेन्टहरु" onClose={handleClose} data={eventInfo} eventData={eventData} />
//             }

//         </>
//     );
// };

// export default Reminder;