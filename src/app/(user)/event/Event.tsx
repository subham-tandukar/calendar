"use client"

import React, { useEffect, useState } from 'react';
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import Loading from '../../loading';
import { arabicToDevanagari, getRemainingDays, nepaliDaysRemaining } from '../../../hooks';
import NepaliDateConverter from 'nepali-date-converter';
interface Event {
    bs_month_np: string;
    bs_date_np: string;
    bs_year_np: string;
    ad_date_en: string;
    ad_month_en: string;
    id: number;
    ad_year_en: string;
    ad_full_date_en: string;
    events: {
        id: number;
        event_title_np: string;
    }[]

}


const Event = () => {
    const [today, setToday] = useState('');

    console.log('today', today);
    const initialValue = {
        selectedDate: today,
    };

    const [formValue, setFormValue] = useState(initialValue);
    useEffect(() => {
        const currentDate = new NepaliDateConverter();
        setToday(currentDate.format('YYYY/M/D'))
        setFormValue({ selectedDate: currentDate.format('YYYY/M/D') });
    }, []);
    const handleDate = ({ bsDate }: { bsDate: string }) => {
        setFormValue({ ...formValue, selectedDate: bsDate });
    };

    const [eventList, setEventList] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const getEventList = async () => {
        const EventApi = `http://47.128.210.223/api/v1/calendar/month/bs/${formValue.selectedDate}`;

        try {
            setLoading(true)
            const response = await fetch(EventApi, {
                cache: "no-store"
            });

            if (!response.ok) {
                console.error("Failed to fetch data");
            }

            const data = await response.json();
            setEventList([data?.data]);
            setLoading(false)

        } catch (error) {
            console.error("Failed to fetch data");
            setEventList([]);
            setLoading(false)
        }
    };

    useEffect(() => {
        getEventList();
    }, [formValue, today]);

    console.log("eventList", eventList)


    return (
        <>
            <div className="okv4-section  ">
                <div className="page-container">
                    <div className="okv4-container">
                        <div className="custom__row">
                            <div className="custom__col__side">
                                <div className='my__calendar'>
                                    <Calendar
                                        className="form-control form-control-sm"
                                        dateFormat="YYYY/M/D"
                                        theme="default"
                                        // language={`${dropdownitem === "वि.सं." ? "ne" : "en"}`}
                                        language="en"
                                        // hideDefaultValue={true}
                                        // placeholder="Select Date"
                                        values={formValue.selectedDate}
                                        onChange={handleDate}
                                    //   key={clearDate}
                                    />
                                </div>
                            </div>
                            <div className="custom__col__main">
                                <div className="my__events">
                                    <div className="block-heading">
                                        <h3>
                                            इभेन्ट
                                        </h3>
                                    </div>

                                    {
                                        loading ? (
                                            <Loading />
                                        ) : (

                                            <>
                                                {
                                                    eventList.length > 0 && (
                                                        <div className="event__table">
                                                            <table >
                                                                <thead>
                                                                    <tr>
                                                                        <th>मिति</th>
                                                                        <th>
                                                                            कार्यक्रमहरू
                                                                        </th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    {eventList.map((props) => {
                                                                        const { bs_month_np, bs_date_np, bs_year_np, ad_date_en, ad_month_en, ad_year_en } = props
                                                                        const remainingDays = getRemainingDays(props.ad_full_date_en)

                                                                        return (
                                                                            props.events.length > 0 ? (
                                                                                <React.Fragment key={props.id}>
                                                                                    {props.events.map((event) => (

                                                                                        <tr key={event.id}>
                                                                                            <td>
                                                                                                <span>{bs_month_np} {bs_date_np}, {bs_year_np}</span>
                                                                                                <span>{ad_date_en} {ad_month_en}, {ad_year_en}</span>
                                                                                            </td>
                                                                                            <td>{event.event_title_np}</td>
                                                                                            <td>{nepaliDaysRemaining(remainingDays)}</td>
                                                                                        </tr>

                                                                                    ))}
                                                                                </React.Fragment>
                                                                            ) : (
                                                                                <React.Fragment key={props.id}>
                                                                                    <tr className='no-data small'>
                                                                                        <td colSpan={3} className='tx-align-c'>
                                                                                            {bs_month_np} {bs_date_np}, {bs_year_np} मा कुनै पनि इभेन्ट छैन
                                                                                        </td>
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            )
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </table>

                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
};

export default Event;