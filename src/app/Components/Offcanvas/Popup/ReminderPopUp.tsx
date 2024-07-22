"use client"
import React, { useState } from 'react'
import ReminderDetailsPopUp from './ReminderDetailsPopup';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';

const ReminderPopUp = ({ onClose }) => {
  const [openReminderPopup, setReminderPopup] = useState(false);

  const handlereminderpopup = () => {
    setReminderPopup(!openReminderPopup)
  }
  const handlereminderpopupclose = () => {
    setReminderPopup(false)
  }
  return (
    <>
      <div className="ok-custom__popup reminder__popup active">
        <div className="overlay" onClick={onClose}></div>
        <div className="ok-custom__popup__model">
          <div className="ok-custom__popup__head">
            <div>
              <h2>सबै रिमाइन्डर</h2>
            </div>
            <div className="reminder__popup__close close__popup" onClick={onClose}>
            <FaTimes />
            </div>
          </div>
          <div className="ok-custom__popup__content">
            <div className="grid-item grid-item-2 grid-gap-20">
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    ६
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    १४
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    ६
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    १४
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    ६
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    १४
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    ६
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    १४
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    ६
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    १४
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    ६
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    १४
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    ६
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    १४
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    ६
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>गोपालदाई संग मिटिङ</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    १४
                    <span>सोम</span>
                  </div>
                  <div className="ok-event-day-info">
                    <a href="#" onClick={handlereminderpopup}>केहि जन्मदिन हरु सम्झान</a>
                    <span>साउन १५, २०८० - 26 Jul, 2023</span>
                  </div>
                  <div className="right-items">
                    <div className="ok-event-day-reminder">६ दिन बाँकी</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openReminderPopup && <ReminderDetailsPopUp onClose={handlereminderpopupclose} />}


    </>
  )
}

export default ReminderPopUp