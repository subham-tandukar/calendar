"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../../context';
import { getRemainingDays, nepaliDaysRemaining } from '../../../../hooks';
import Popup from '../../../(root)/event/Popup';
import Image from 'next/image';
import { MdChevronRight } from 'react-icons/md';

interface EventData {
  id: number;
  event_category: string;
  event_title_np: string;
  is_public_holiday: boolean;
  date: {
    bs_concat_date_en: string;
    ad_concat_date_en: string;
    bs_date_np: string;
    day_np: string;
    bs_month_np: string;
    bs_year_np: string;
    ad_month_en: string;
    ad_date_en: string;
    ad_year_en: string;
  };
}

const UpcomingEvents = ({ Upcomingeventdata }) => {
  const { animation, setAnimation, setClickedDate, dropdownitem,siteSetting } = useRoot();

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

  let newData: EventData[] = [];

  Upcomingeventdata.forEach(event => {
    const existingEventIndex = newData.findIndex(item => item.date.bs_concat_date_en === event.date.bs_concat_date_en);
    if (existingEventIndex !== -1) {
      // If the event's date matches an existing event in newData, append the event_title_np to the existing one
      newData[existingEventIndex].event_title_np += ` | ${event.event_title_np}`;
    } else {
      // If the event's date doesn't match any existing event in newData, push the event into newData
      newData.push({
        ...event,
        event_title_np: event.event_title_np
      });
    }
  });
  const dataToShow = newData.slice(0, 5);

  return (
    <>
      <div className="ok-block ok-block-leftbar-events">
        <div className="ok-block-heading">
          <h3>{siteSetting.upcoming_events_title_np}</h3>
          <div className="ok-block-heading-right-elem">
            <Link href="/upcoming-event" className="ok-view-all-btn">
              <MdChevronRight width={30} />
            </Link>
          </div>
        </div>
        <div className=''>
          {dataToShow && dataToShow.length > 0 ? (
            dataToShow.map((event, index) => {
              const remainingDays = getRemainingDays(String(event?.date?.ad_concat_date_en));
              return (
                <div key={index} className="ok-card-day-event">
                  <div className="ok-event-day-date">
                    {event.date.bs_date_np}
                    <span>{event.date.day_np.replace("वार", "")}</span>
                  </div>
                  <div className='flex gap-1'>
                    <div className="ok-event-day-info">
                      <p
                        className='cursor'
                        onClick={() => handleClick(event)}
                      >
                        {event.event_title_np}
                      </p>
                      <div className='ok-date-flex'>
                        <span>
                          {event.date.bs_month_np}{" "} {event.date.bs_date_np},{" "}
                          {event.date.bs_year_np}

                        </span>
                        -
                        <span className='ok-eng-font'>
                          {event.date.ad_month_en.slice(0, 3)}
                          {" "}
                          {event.date.ad_date_en},{" "}
                          {event.date.ad_year_en}
                        </span>
                      </div>
                    </div>
                    <div className="ok-event-day-reminder">{nepaliDaysRemaining(remainingDays)}</div>
                  </div>
                </div>
              )
            })
          ) : (
            <div>कुनै आगामी कार्यक्रमहरू छैन</div>
          )}

        </div>
      </div>

      {
        popup && <Popup title="आगामी इभेन्टहरु" onClose={handleClose} data={eventInfo} eventData={eventData} />
      }
    </>
  );
};

export default UpcomingEvents;