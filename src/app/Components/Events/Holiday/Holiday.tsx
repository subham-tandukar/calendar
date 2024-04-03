"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../../context';
import { getRemainingDays, nepaliDaysRemaining } from '../../../../hooks';
const Holiday = ({ holidaydata }) => {
  const { animation, setAnimation, setClickedDate, dropdownitem } = useRoot();
  const [showAll, setShowAll] = useState(false);
  const dataToShow = showAll ? holidaydata : holidaydata.slice(0, 5);
  const handleViewAllClick = () => {
    setShowAll(true);
  };

  const handleClick = (data) => {
    setClickedDate({
      date: data?.date?.ad_concat_date_en
    });
    setAnimation(false);
    setTimeout(() => {
      setAnimation(true);
    }, 0);
    // setTimeout(() => {
    //   setAnimation(false);
    // }, 5000);
  }

  useEffect(() => {
    // Scroll to the element with the "animation" class in the middle of the viewport
    const animationElement = document.querySelector('.animation');
    if (animationElement) {
      const topOffset = animationElement.getBoundingClientRect().top;
      const middleOfViewport = window.innerHeight / 2;
      window.scrollTo({
        top: window.pageYOffset + topOffset - middleOfViewport,
        behavior: 'smooth'
      });
    }
  }, [animation])



  return (
    <>
      <div className="ok-block ok-block-leftbar-events">
        <div className="ok-block-heading">
          <h3>आगामी बिदाहरु</h3>
          {/* <div className="ok-block-heading-right-elem">
            <a href="#" className="view-all-btn">
              <img src="img/arrow-right.svg" alt="" />
            </a>
          </div> */}
        </div>
        <div className='overflow-sidebar'>
          {dataToShow && dataToShow.length > 0 ? (
            dataToShow.map((holiday) => {
              const remainingDays = getRemainingDays(holiday?.date?.ad_concat_date_en)
              return (
                <div key={holiday.id} className={`card-day-event ${holiday.is_public_holiday === true ? 'is-holiday' : ''}`}>
                  <div className="event-day-date">
                    {holiday.date.bs_date_np}
                    <span>{holiday.date.day_np.replace("वार", "")}</span>
                  </div>
                  <div className="event-day-info">
                    <Link
                      scroll={false}
                      prefetch={false}
                      onClick={() => handleClick(holiday)}
                      href={`${dropdownitem === "वि.सं." ? "bs" : "ad"}?year=${dropdownitem === "वि.सं." ? holiday?.date?.bs_year_en : holiday?.date.ad_year_en}&month=${dropdownitem === "वि.सं." ? holiday?.date?.bs_month_code_en : holiday?.date?.ad_month_code_en}`}>
                      {holiday.event_title_np}
                    </Link>
                    <span>{holiday.date.bs_month_np} {holiday.date.bs_date_np}, {holiday.date.bs_year_np} - {holiday.date.ad_date_en}, {holiday.date.ad_year_en}</span>
                  </div>
                  <div className="event-day-reminder">{nepaliDaysRemaining(remainingDays)}</div>
                </div>
              )
            })
          ) : (
            <div>No upcoming holidays</div>
          )}
          {
            !showAll && holidaydata.length > 5 ? (
              <div className='tx-align-r'>
                <button className="btn primary primary-gradient btn-small" onClick={handleViewAllClick}>सबै हेर्नुहोस्</button>
              </div>
            ) : null
          }
        </div>

      </div>
    </>
  );
};

export default Holiday;