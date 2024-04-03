import React, { useState } from 'react';
import PanchangOffCanvas from '../PanchangOffCanvas/PanchangOffCanvas';
import ScheduleOffcanvas from '../ScheduleOffCanvas/ScheduleOffcanvas';
import { englishDaysRemaining, getRemainingDays } from '../../../../hooks';

interface DataItem {

}

interface EnglishDayOffCanvasProps {
  data: DataItem[];
  handleDayCloseOffCanvas: () => void;
  Selecteddate: any;
}

const EnglishDayOffCanvas: React.FC<EnglishDayOffCanvasProps> = ({ data, handleDayCloseOffCanvas, Selecteddate }) => {
  const [openpanchanga, setpanchanga] = useState(false);
  const [openschedule, setopenschdule] = useState(false);

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
  const remainingDays = getRemainingDays(Selecteddate?.ad_full_date_en)
  return (

    <>
      <div className="day__offcanvas custom__offcanvas active">
        <div className="overlay" onClick={handleDayCloseOffCanvas}></div>


        <div onClick={handleDayCloseOffCanvas} className="day__offcanvas__close close__offcanvas">
          <img src="./img/close.png" alt="close" />
        </div>

        <div className="offcanvas__content day__content">
          <div className="ok-block ok-block-cal-header">

            <div className="ok-block-cal-date-circle">     {Selecteddate.ad_date_en}</div>
            <div className="ok-block-cal-date-circle-info">
              <div>


                <small>{Selecteddate.day_en}</small>
                <span>{Selecteddate.ad_month_en} {Selecteddate.ad_date_en}</span>
              </div>
              <div className="flx flxwrp align-m">
                <div className="okelem-panchanga-dropdwon">
                  {Selecteddate.tithi.tithi_title_np}
                  <span>{Selecteddate.panchanga.sunrise_np} </span>
                  <span> {Selecteddate.panchanga.sunset_np} </span>
                </div>
              </div>
            </div>
          </div>

          <div className="day__events">
            <div className="flex-between">
              <div>
                <div className="flex-row">
                  <h2 className="the__title">Events</h2>
                  {
                    Selecteddate.events.length > 0 && (
                      <div className="badge danger">
                        {englishDaysRemaining(remainingDays)}
                      </div>
                    )
                  }

                </div>
                <div className="day__event__list">
                  <ul>

                    {Selecteddate.events.length > 0 ? (
                      Selecteddate.events.map((event, index) => (
                        <React.Fragment key={index}>
                          <li className={`${event.is_public_holiday === true ? "danger" : ""}`}>{event.event_title_np}</li>
                        </React.Fragment>
                      ))
                    ) : (

                      <p className="">No events available</p>
                    )}

                  </ul>
                </div>
              </div>
              <div>
                <button
                  onClick={handleScheduleopen}
                  className="btn primary primary-gradient rounded day__schedule__offcanvas__btn"
                >Choose Event</button>

              </div>
            </div>
          </div>

          <div className="content__wrapper">
            <div className="panchanga">
              <div className="flex-row">
                <img src="./img/icon-panchanga2.png" alt="" />
                <h2 className="the__title">पंचाङ्ग</h2>
              </div>
              <div className="panchanga__data">
                <div className="wrapper">
                  <div className="title">तारिख:</div>
                  <div className="txt">{Selecteddate.ad_month_np} {Selecteddate.ad_date_np}, {Selecteddate.ad_year_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">तिथि:</div>
                  <div className="txt">{Selecteddate.tithi.tithi_title_np},  </div>
                </div>
                <div className="wrapper">
                  <div className="title">सूर्य राशि:</div>
                  <div className="txt">{Selecteddate.panchanga.chandra_rashi_np}</div>
                </div>
                <div className="wrapper">
                  <div className="title">सूर्योदय:</div>
                  <div className="txt">{Selecteddate.panchanga.sunrise_np}</div>
                </div>
              </div>
              <div onClick={handlePanchangaopen} className="view__panchanga">
                <span onClick={handlePanchangaopen}   >view all</span>
              </div>
            </div>

            {
              Selecteddate.subha_sahits.length > 0 && (

                <div className="moment__table">
                  <h2 className="moment__title">शुभ साइत / मुहुर्त</h2>
                  <div className="moment__data">
                    {
                      Selecteddate.subha_sahits.map((data) => {
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
              )
            }

            <div className="moment__table danger">
              <h2 className="moment__title">No अशुभ साइत / मुहुर्त availaible</h2>
              <div className="moment__data">
                <div>
                  <div className="flex-between">
                    <div>गुलिक काल</div>
                    <div>No गुलिक काल availaible </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {openpanchanga && <PanchangOffCanvas onclose={handlePanchangaclose} Selecteddate={Selecteddate} />}
      {openschedule && <ScheduleOffcanvas isDayCanvas={true} Selecteddate={Selecteddate} onClose={hadlescheduleclose} />}
    </>
  );
};

export default EnglishDayOffCanvas;