"use client"
import React, { useEffect, useState } from 'react'
// import SuvaSait from '../Offcanvas/Popup/SuvaSait';
import Link from 'next/link';
// import HolidayPopUp from '../Offcanvas/Popup/HolidayPopUp';
;

const Panels = () => {
  const [isPopup, setIsPopup] = useState(false);

  const handleChange = () => {
    setIsPopup(!isPopup);
  };
  const handleClose = () => {
    setIsPopup(false);
  };


  // Holiday APi
  const [holidayPopup, setHolidayPopup] = useState(false);
  const [holidaydata, setHolidaydata] = useState([]);

  const handleHolidayPop = () => {
    setHolidayPopup(!holidayPopup)
  }
  const handleHolidayClose = () => {
    setHolidayPopup(false);
  };

  // const getHolidayData = async () => {

  //   const holidayapi = `http://47.128.210.223/api/v1/calendar/events?type=holidays`;

  //   try {
  //     const response = await fetch(holidayapi, {
  //       cache: "no-store"
  //     });
  //     if (!response.ok) {
  //       console.error("failed to fetch data");
  //     }
  //     const holiday = await response.json();
  //     setHolidaydata(holiday?.data)


  //   } catch (error) {
  //     console.error("failed to fetch data");
  //     setHolidaydata([])
  //     return <div>Error fetching data</div>
  //   }
  // }

  // useEffect(() => {
  //   getHolidayData()
  // }, [])


  // Suva Sait APi


  return (
    <>
      <div className="quick-access-tools">
        <div>
          <Link href="/holiday">
            <img src="./img/icon-holidays.png" alt="" />
          </Link>
        </div>
        <div>
          <Link href="/sahit">
            <img src="./img/iocn-sait.png" alt="" />
          </Link>
        </div>
        <div>
          <img src="./img/icon-panchanga.png" alt="" />
        </div>
        <Link href="/rashifal" className="go-to-horoscope" >
          <div>
            <img src="./img/icon-rashi.png" alt="" />
            <h3>राशिफल<span>ज्यो.प. डा.उत्तम उपाध्याय न्यौपाने</span></h3>
          </div>
          <div>
            <img src="./img/icon-right-white.png" alt="" />
          </div>

        </Link>
      </div>

      {/* {isPopup && <SuvaSait saitLoading={saitLoading} saitData={saitData} saitid={saitid} setSaitId={setSaitId} saitList={saitList} onClose={handleClose} />} */}
      {/* {holidayPopup && <HolidayPopUp onClose={handleHolidayClose} data={holidaydata} />} */}
    </>
  )
}

export default Panels;