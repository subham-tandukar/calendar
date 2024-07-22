
"use client"
import React, { useContext, useEffect, useState } from 'react';
import ReminderPopUp from '../Offcanvas/Popup/ReminderPopUp';
import ReminderDetailsPopUp from '../Offcanvas/Popup/ReminderDetailsPopup';
import AuthContext from '../../../context/AuthContext';
import { signOut, useSession } from 'next-auth/react';
import { arabicToDevanagari, engToNepTime, fetcherWithToken, getRemainingDays, nepaliDaysRemaining } from '../../../hooks';
import PageLoading from '../../page-loading';
import Popup from '../../(root)/event/Popup';
import Link from 'next/link';
import { useRoot } from '../../../context';
import useSWR from 'swr';
import { MdChevronRight } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';

interface Reminder {
  id: number;
  event_title_np: string;
  time_from: string;
  time_to: string;
  date: {
    ad_concat_date_en: string;
    bs_date_np: string;
    day_np: string;
    bs_month_np: string;
    bs_year_np: string;
    ad_date_en: string;
    ad_month_en: string;
    ad_year_en: string;
  }
}
const Reminder = () => {
  // const { userData } = useContext(AuthContext)
  const { data: session, status } = useSession();
  const { Currentdata, siteSetting } = useRoot();
  const token = session?.token ? session?.token : session?.user?.data?.token;
  const [openReminderPopup, setReminderPopup] = useState(false);
  const [reminderDetailPopup, setReminderDetailPopup] = useState(false);
  const handlereminderpopup = () => {
    setReminderPopup(!openReminderPopup)
  }
  const handlereminderdetailpopup = () => {
    setReminderDetailPopup(!reminderDetailPopup)
  }
  const handlereminderpopupclose = () => {
    setReminderPopup(false)
  }
  const reminderDetailsclose = () => {
    setReminderDetailPopup(false)
  }

  const [reminderList, setreminderList] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const getreminderList = async () => {
  //   const reminderApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/my-events?type=upcoming`;

  //   try {
  //     setLoading(true)
  //     const response = await fetch(reminderApi, {
  //       cache: "no-store",
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`
  //       },
  //     });

  //     if (!response.ok) {
  //       console.error("Failed to fetch data");
  //       setLoading(false)
  //     }



  //     if (response.ok) {
  //       const data = await response.json();
  //       setreminderList(data.data);
  //       setLoading(false)
  //     }

  //   } catch (error) {
  //     console.error("Failed to fetch data");
  //     setreminderList([]);
  //     setLoading(false)
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     getreminderList();
  //   }
  // }, [token]);

  const fetcher = (url) => fetcherWithToken(url, token);

  const { data: fetchedData, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/my-events?type=upcoming`,
    fetcher
  );

  useEffect(() => {
    if (fetchedData) {
      setreminderList(fetchedData?.data);
    }

  }, [fetchedData]);

  useEffect(() => {
    if (error) {
      setreminderList([])
    }
  }, [error])

  const [popup, setPopup] = useState(false)
  const handleClose = () => {
    setPopup(false)
  }

  const [eventInfo, setEventInfo] = useState([])
  const [eventData, setEventData] = useState([])
  const handleClick = (props) => {
    setEventData(props.date)
    setEventInfo(props)
    setPopup(!popup)
  }

  return (
    <>
      {
        session && !session?.error && (

          <div className="ok-my-reminders mt-30">
            <div className="ok-my-reminder-heading">
              <h3 className='ok-main-title'> {siteSetting.reminder_title_np}
                {/* <span className="ok-add-scheule-btn">+</span> */}
              </h3>
              {
                reminderList.length > 0 && (
                  <Link href="/reminder" className="ok-view-all-btn">
                    <span>तपाँइको सबै इभेन्ट्स/रिमाइण्डर हेर्नुहोस्</span>
                    <MdChevronRight width={30} />
                  </Link>

                )
              }
            </div>

            {/* {
              isLoading ? (
                <PageLoading />
              ) : ( */}
            <>
              {
                reminderList.length > 0 ? (
                  <div className="ok-reminder-card-wrapper grid-item grid-item-2 grid-gap-5">
                    {
                      reminderList.slice(0, 4).map((data) => {
                        const remainingDays = getRemainingDays(String(data?.date?.ad_concat_date_en))
                        return (
                          <div key={data.id}>
                            <div className="ok-card-day-event">
                              <div className="ok-event-day-date">
                                {data.date.bs_date_np}<br />
                                <span>{data.date.day_np.replace("वार", "")}</span>
                              </div>
                              <div className='flex gap-1'>
                                <div className="ok-event-day-info">
                                  <p className='cursor'
                                    onClick={() => handleClick(data)}>{data.event_title_np}</p>

                                  <div className='ok-date-flex '>
                                    {
                                      data.date.ad_concat_date_en === Currentdata.ad_full_date_en ? (
                                        <span>
                                          {engToNepTime(data.time_from.split(":")[0])}
                                          :
                                          {engToNepTime(data.time_from.split(":")[1])}
                                          {" "}
                                          -
                                          {" "}
                                          {engToNepTime(data.time_to.split(":")[0])}
                                          :
                                          {engToNepTime(data.time_to.split(":")[1])}
                                        </span>
                                      ) : (
                                        <>
                                          <span>
                                            {data.date.bs_month_np}{" "} {data.date.bs_date_np}, {" "}
                                            {data.date.bs_year_np}

                                          </span>
                                          -
                                          <span className='ok-eng-font'>
                                            {data.date.ad_month_en.slice(0, 3)}
                                            {" "}
                                            {data.date.ad_date_en},{" "}
                                            {data.date.ad_year_en}
                                          </span>
                                        </>
                                      )
                                    }

                                  </div>
                                </div>
                                <div className="right-items">
                                  <div className="ok-event-day-reminder">{nepaliDaysRemaining(remainingDays)}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                        )
                      })
                    }
                  </div>

                ) : (
                  <div className=" flx align-m ok-no-data">

                    तपाइँले आगामी दिनहरुका लागि कुनै रिमाण्डर बनाउनुभएको छैन ।  इभेन्ट्स/रिमाइण्डर थप्नुहोस्
                    <Link href="/reminder" className="ok-add-my-reminder ml-10">
                      <FaPlus width={20} />
                    </Link>

                  </div>
                )
              }
            </>
            {/* )
            } */}

          </div>
        )
      }
      {
        popup && <Popup title="मेरो रिमाइन्डर" onClose={handleClose} data={eventInfo} eventData={eventData} />
      }

    </>
  );
};

export default Reminder;