import React, { useState } from 'react';
import PanchangOffCanvas from '../PanchangOffCanvas/PanchangOffCanvas';
import ScheduleOffcanvas from '../ScheduleOffCanvas/ScheduleOffcanvas';
import { arabicToDevanagari, englishDaysRemaining, getRemainingDays, monthNames } from '../../../../hooks';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useRoot } from '../../../../context';
import Share from '../../Share/Share';

interface DataItem {

}

interface EnglishDayOffCanvasProps {
  data: DataItem[];
  handleDayCloseOffCanvas: () => void;
  Selecteddate: any;
  currentdate: any;
}

const EnglishDayOffCanvas: React.FC<EnglishDayOffCanvasProps> = ({ data, currentdate, handleDayCloseOffCanvas, Selecteddate }) => {
  const [openpanchanga, setpanchanga] = useState(false);
  const [openschedule, setopenschdule] = useState(false);
  const { siteSetting } = useRoot()

  const handlePanchangaopen = () => {
    setpanchanga(!openpanchanga);
  };

  const handlePanchangaclose = () => {
    setpanchanga(false);
  };

  const hadlescheduleclose = () => {
    setopenschdule(false);
  };

  const handleScheduleopen = () => {
    setopenschdule(!openschedule);
  };
  const remainingDays = getRemainingDays(String(Selecteddate?.ad_full_date_en));

  const selectedParam = Selecteddate?.bs_full_date_en
  const year = selectedParam.split("-")[0];
  const month = selectedParam.split("-")[1];
  const day = selectedParam.split("-")[2];
  return (

    <>
      <div className="day__offcanvas ok-custom__offcanvas active">
        <div className="overlay" onClick={handleDayCloseOffCanvas}></div>



        <div className="ok-offcanvas__content ok-day__content">
          <div onClick={handleDayCloseOffCanvas} className="day__offcanvas__close ok-close__offcanvas">
            {/* <Image width={13} height={13} src="/img/close.png" alt="close" /> */}
            <FaTimes />
          </div>
          <div className="ok-block ok-block-cal-header">

            <div className="ok-block-cal-date-circle ok-eng-font">     {Selecteddate.ad_date_en}</div>
            <div className="ok-block-cal-date-circle-info">
              <div className='ok-eng-font'>

                {Selecteddate.ad_month_en}
                {" "}
                {Selecteddate.ad_year_en}

                <small>{Selecteddate.day_en}</small>
                {/* <span className='ok-nep-font'>
                  {Selecteddate.bs_month_np} {Selecteddate.bs_date_np}, {" "}
                  {Selecteddate.bs_year_np},  {" "} {Selecteddate.day_np}

                </span> */}

              </div>
              <div className="flx flxwrp align-m">
                <div className=" ok-sunrise-sunset">
                  {Selecteddate?.tithi?.tithi_title_np}
                  {" "}
                  <span className="ok-sun-rising-info">
                    <span>सूर्योदय {currentdate.panchanga.sunrise_np}</span>
                    <span>सूर्यास्त {currentdate.panchanga.sunset_np}</span>
                    {/* <span><FiSunrise /> {currentdate.panchanga.sunrise_np}</span>
                    <span><FiSunset /> {currentdate.panchanga.sunset_np}</span> */}
                  </span>
                  {/* {Selecteddate?.tithi?.tithi_end_time_np} बजेसम्म */}
                  {/* <span>{Selecteddate.panchanga.sunrise_np} </span>

                  <span style={{ margin: "0" }}> {Selecteddate.panchanga.sunset_np} </span> */}
                </div>
              </div>

              <div className='ok-fullday-badge'>
                <span className='ok-nep-font'>
                  {Selecteddate.bs_month_np} {Selecteddate.bs_date_np}, {" "}
                  {Selecteddate.bs_year_np},  {" "} {Selecteddate.day_np}

                </span>
              </div>
            </div>
          </div>

          <div className="ok-day__events">
            <div className="flex-between">
              <div>
                <div className="flex-row">
                  <h2 className="ok-the__title ok-eng-font">
                    {
                      siteSetting?.date_off_canvas_text_en || "Events"
                    }
                  </h2>
                  {
                    Selecteddate?.events.length > 0 && (
                      <div className="badge danger ok-eng-font">
                        {englishDaysRemaining(remainingDays)}
                      </div>
                    )
                  }

                </div>
                <div className="ok-day__event__list">
                  <ul>

                    {Selecteddate?.events.length > 0 ? (
                      Selecteddate?.events.map((event, index) => (
                        <React.Fragment key={index}>
                          <li className={`${event?.is_public_holiday === true ? "danger" : ""}`}>{event?.event_title_np}</li>
                        </React.Fragment>
                      ))
                    ) : (

                      <p className="">No events available</p>
                    )}

                  </ul>
                </div>
              </div>
              <div className="ok-schedule-btn-wrapper">
                <button
                  onClick={handleScheduleopen}
                  className="btn ok-eng-font primary primary-gradient rounded day__ok-schedule__offcanvas__btn"
                >
                  {
                    siteSetting?.date_off_canvas_cta_en || "Events/Reminder"
                  }

                  <span className="ok-add-scheule-btn"><FaPlus /></span>
                </button>

              </div>
            </div>
          </div>

          <div className="ok-content__wrapper">
            <div className="panchanga">
              <div className="ok-panchanga-share">
                <div className="flex-row">
                  <Image width={24} height={24} src="/img/panchanga.svg" alt="" />
                  <h2 className="ok-the__title">पञ्चाङ्ग</h2>
                </div>

                <Share
                  endpoint={`panchanga/${Selecteddate?.bs_full_date_en}`}
                  title={`${siteSetting?.panchanga_meta_title || siteSetting?.panchanga_title_np} - ${arabicToDevanagari(day)} ${monthNames[Number(month) - 1]} ${arabicToDevanagari(year)}`}
                  preFilledText={`${siteSetting?.panchanga_additional_meta_information || siteSetting?.panchanga_title_np}`}
                  imageUrl={`${siteSetting?.panchanga_og_image || siteSetting?.site_og_image}`}
                />
              </div>
              <div className="ok-panchanga__data">
                <div className="wrapper">
                  <div className="title">तारिख:</div>
                  <div className="txt small-ok-eng-font">{Selecteddate.ad_month_en} {Selecteddate.ad_date_en}, {Selecteddate.ad_year_en}</div>
                </div>
                <div className="wrapper">
                  <div className="title">पक्ष:</div>
                  <div className="txt">{Selecteddate?.panchanga?.pakshya_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">सूर्योदय</div>
                  <div className="txt">{Selecteddate?.panchanga?.sunrise_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">सूर्यास्त:</div>
                  <div className="txt">{Selecteddate?.panchanga?.sunset_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">चन्द्र राशि:</div>
                  <div className="txt">{Selecteddate?.panchanga?.chandra_rashi_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">सूर्य राशि:</div>
                  <div className="txt">{Selecteddate?.panchanga?.surya_rashi_np}</div>
                </div>


                <div className="wrapper">
                  <div className="title">नक्षत्र समाप्ति समय:</div>
                  <div className="txt">{Selecteddate?.panchanga?.nakshatra_end_time_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">योग:</div>
                  <div className="txt">{Selecteddate?.panchanga?.yog_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title"> प्रथम करण:</div>
                  <div className="txt">{Selecteddate?.panchanga?.pratham_karan_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">अयान:</div>
                  <div className="txt">{Selecteddate?.panchanga?.ayan_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">ऋतु:</div>
                  <div className="txt">{Selecteddate?.panchanga?.ritu_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">तिथी:</div>
                  <div className="txt">{Selecteddate?.tithi?.tithi_title_np} {Selecteddate?.tithi?.tithi_end_time_np} बजेसम्म</div>
                </div>

                <div className="wrapper">
                  <div className="title">करण १:</div>
                  <div className="txt">{Selecteddate?.panchanga?.pratham_karan_np ? Selecteddate?.panchanga?.pratham_karan_np : "-"}</div>
                </div>
                <div className="wrapper">
                  <div className="title">करण २:</div>
                  <div className="txt">{Selecteddate?.panchanga?.dutiya_karan_np ? Selecteddate?.panchanga?.dutiya_karan_np : "-"}</div>
                </div>

              </div>
              {/* {
                !openpanchanga && (

                  <div onClick={handlePanchangaopen} className="ok-view__panchanga">
                    <span onClick={handlePanchangaopen}>view all</span>
                  </div>
                )
              } */}
            </div>

            {
              Selecteddate?.subha_sahits.length > 0 && (
                <>
                  <div className="flex-row mt-3">
                    <Image width={24} height={24} src="/img/subha-sait.svg" alt="" />
                    <h2 className="ok-the__title">
                      आजको शुभ साइत / मुहुर्त
                    </h2>
                  </div>
                  <div className="ok-moment__table">

                    <div className="ok-moment__data">
                      {
                        Selecteddate?.subha_sahits.map((data) => {
                          return (
                            <div key={data.id}>
                              <div className="flex-between">
                                <div className='relative'>
                                  {data.title_np}
                                  {
                                    data.description_np && (
                                      <span className="small-tooltip" data-tooltip={data.description_np}>
                                        <img src="./img/question.png" alt="" />
                                      </span>

                                    )
                                  }
                                </div>

                                <div>
                                  {
                                    data.start_time_np || data.end_time_np && (
                                      <>
                                        {data.start_time_np} - {data.end_time_np}
                                      </>
                                    )
                                  }
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                      {/* Repeat for other moments */}
                    </div>
                  </div>
                </>
              )
            }

            {
              Selecteddate?.muhurats && (

                <>
                  <div className="flex-row mt-3 ">
                    <Image width={24} height={24} src="/img/muhurat.png" alt="" />
                    <h2 className="ok-the__title">
                      आजको काल / मुहुर्तम्
                    </h2>
                  </div>
                  <div className="ok-moment__table danger">
                    <div className="ok-moment__data">
                      {
                        Selecteddate?.muhurats.map((data) => {
                          return (
                            <div>
                              <div className="flex-between">
                                <div>{data.text}</div>
                                <div>
                                  {
                                    data.value && (
                                      <>
                                        {arabicToDevanagari(data.value)}
                                      </>
                                    )
                                  }
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }

                      {/* Repeat for other moments */}
                    </div>
                  </div>

                </>
              )
            }
          </div>
        </div>
      </div>

      {/* {openpanchanga && <PanchangOffCanvas onclose={handlePanchangaclose} Selecteddate={Selecteddate} />} */}
      {openschedule && <ScheduleOffcanvas isDayCanvas={true} Selecteddate={Selecteddate} onClose={hadlescheduleclose} />}
    </>
  );
};

export default EnglishDayOffCanvas;