
"use client"
import React, { useContext, useEffect, useState } from 'react';
import ReminderPopUp from '../Offcanvas/Popup/ReminderPopUp';
import ReminderDetailsPopUp from '../Offcanvas/Popup/ReminderDetailsPopup';
import AuthContext from '../../../context/AuthContext';
import { signOut, useSession } from 'next-auth/react';

interface Reminder {
  id: number;
  title_en: string;
  color: string;
}
const Reminder = () => {
  // const { userData } = useContext(AuthContext)
  const { data: session, status } = useSession();
  const token = session?.data?.token;
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

  const getreminderList = async () => {
    const reminderApi = `http://47.128.210.223/api/v1/calendar/my-events?type=upcoming`;

    try {
      const response = await fetch(reminderApi, {
        cache: "no-store",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch data");
      }

      const data = await response.json();
      setreminderList(data.data);

    } catch (error) {
      console.error("Failed to fetch data");
      setreminderList([]);
    }
  };

  useEffect(() => {
    getreminderList();
  }, []);

  console.log("reminderList", reminderList)
  return (
    <>
      {
        status === 'authenticated' && (

          <div className="my-reminders mt-30">
            <div className="block-heading">
              <h3>मेरो रिमाइन्डर <span className="add-scheule-btn">+</span></h3>
              <button onClick={handlereminderpopup} className="btn primary primary-gradient">सबै रिमाइन्डर</button>
            </div>
            <div className="reminder-card-wrapper grid-item grid-item-2 grid-gap-20">
              <div>
                <div className="card-day-event">
                  <div className="event-day-date">
                    ६ <br />
                    <span>सोम</span>
                  </div>
                  <div className="event-day-info">
                    <a href="#" onClick={handlereminderdetailpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="event-day-reminder">६ दिन बाकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card-day-event">
                  <div className="event-day-date">
                    १४ <br />
                    <span>सोम</span>
                  </div>
                  <div className="event-day-info">
                    <a href="#" onClick={handlereminderdetailpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="event-day-reminder">६ दिन बाकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card-day-event">
                  <div className="event-day-date">
                    ६ <br />
                    <span>सोम</span>
                  </div>
                  <div className="event-day-info">
                    <a href="#" onClick={handlereminderdetailpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="event-day-reminder">६ दिन बाकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card-day-event">
                  <div className="event-day-date">
                    १४ <br />
                    <span>सोम</span>
                  </div>
                  <div className="event-day-info">
                    <a href="#" onClick={handlereminderdetailpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="event-day-reminder">६ दिन बाकी</div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        )
      }
      {openReminderPopup && <ReminderPopUp onClose={handlereminderpopupclose} />}
      {reminderDetailPopup && <ReminderDetailsPopUp onClose={reminderDetailsclose} />}

    </>
  );
};

export default Reminder;