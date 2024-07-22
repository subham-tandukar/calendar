"use client"
import React, { useEffect, useState } from 'react'
// import SuvaSait from '../Offcanvas/Popup/SuvaSait';
import Link from 'next/link';
import Image from 'next/image';
import { useRoot } from '../../../context';
// import HolidayPopUp from '../Offcanvas/Popup/HolidayPopUp';
;

const Panels = () => {
  const { siteSetting } = useRoot()
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

  return (
    <>
      <div className="ok-quick-access-tools">
        <div>
          <Link href="/holiday">
            {
              siteSetting?.holiday_card_bg_image ? (
                <img  width={200} height={200}  src={siteSetting?.holiday_card_bg_image} alt={siteSetting?.holiday_card_title_np || "बिदाहरु"} />
              ) : (
                <Image  width={200} height={200} src="/img/holiday-bg.png" alt={siteSetting?.holiday_card_title_np || "बिदाहरु"} />
              )
            }
          </Link>
          <div className="ok-quick-access-tools-content">
            {
              siteSetting?.holiday_igscard_icon ? (
                <img width={43} height={43} src={siteSetting?.holiday_igscard_icon} alt={siteSetting?.holiday_card_title_np || "बिदाहरु"} />
              ) : (
                <Image width={43} height={43} src="/img/holiday-icon.png" alt={siteSetting?.holiday_card_title_np || "बिदाहरु"} />
              )
            }
            <span>{siteSetting?.holiday_card_title_np || "बिदाहरु"}</span>
          </div>
        </div>
        <div>
          <Link href="/sahit">
            {
              siteSetting?.sahit_card_bg_image ? (
                <img  width={200} height={200}  src={siteSetting?.sahit_card_bg_image} alt={siteSetting?.sahit_card_title_np || "साइत"} />
              ) : (
                <Image width={200} height={200} src="/img/sait-bg.png" alt={siteSetting?.sahit_card_title_np || "साइत"} />
              )
            }

          </Link>
          <div className="ok-quick-access-tools-content">
            {
              siteSetting?.sahit_card_icon ? (
                <img width={43} height={43} src={siteSetting?.sahit_card_icon} alt={siteSetting?.sahit_card_title_np || "साइत"} />
              ) : (
                <Image width={43} height={43} src="/img/sait-icon.png" alt={siteSetting?.sahit_card_title_np || "साइत"} />
              )
            }
            <span>{siteSetting?.sahit_card_title_np || "साइत"}</span>
          </div>
        </div>
        <div>
          <Link href="/panchanga">
            {
              siteSetting?.panchanga_card_bg_image ? (
                <img  width={200} height={200}  src={siteSetting?.panchanga_card_bg_image} alt={siteSetting?.panchanga_card_title_np || "पञ्चाङ्ग"} />
              ) : (
                <Image width={200} height={200} src="/img/panchanga-bg.png" alt={siteSetting?.panchanga_card_title_np || "पञ्चाङ्ग"} />

              )
            }
          </Link>
          <div className="ok-quick-access-tools-content">
            {
              siteSetting?.panchanga_card_icon ? (
                <img width={43} height={43} src={siteSetting?.panchanga_card_icon} alt={siteSetting?.panchanga_card_title_np || "पञ्चाङ्ग"} />
              ) : (
                <Image width={43} height={43} src="/img/panchanga-icon.png" alt={siteSetting?.panchanga_card_title_np || "पञ्चाङ्ग"} />

              )
            }
            <span>{siteSetting?.panchanga_card_title_np || "पञ्चाङ्ग"}</span>
          </div>
        </div>
        <div>
          <Link href="/rashifal">
            {
              siteSetting?.rashifal_card_bg_image ? (
                <img width={400} height={124} src={siteSetting?.rashifal_card_bg_image} alt={siteSetting?.rashifal_card_title_np || "राशिफल"} />
              ) : (
                <Image width={400} height={124} src="/img/rashifal-bg.png" alt={siteSetting?.rashifal_card_title_np || "राशिफल"} />
              )
            }
          </Link>
          <div className="ok-quick-access-tools-content">
            <div>
              <div className='ok-panel-rashifal-icon'>
                {
                  siteSetting?.rashifal_card_icon ? (
                    <img width={43} height={43} src={siteSetting?.rashifal_card_icon} alt={siteSetting?.rashifal_card_title_np || "राशिफल"} />
                  ) : (
                    <Image width={43} height={43} src="/img/rashifal-icon.png" alt={siteSetting?.rashifal_card_title_np || "राशिफल"} />
                  )
                }
              </div>
              <h3>{siteSetting?.rashifal_card_title_np || "राशिफल"}
                <span>
                  {
                    siteSetting?.jyotish_name_np || "ज्यो.प. डा.उत्तम उपाध्याय न्यौपाने"
                  }
                </span>
              </h3>
            </div>
            <div>
              <Image width={40} height={40} src="/img/icon-right-white.png" alt="" />
            </div>
          </div>
        </div>

      </div>

      {/* {isPopup && <SuvaSait saitLoading={saitLoading} saitData={saitData} saitid={saitid} setSaitId={setSaitId} saitList={saitList} onClose={handleClose} />} */}
      {/* {holidayPopup && <HolidayPopUp onClose={handleHolidayClose} data={holidaydata} />} */}
    </>
  )
}

export default Panels;