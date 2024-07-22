"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { engToNepTime, getRemainingDays, nepaliDaysRemaining } from '../../../hooks';
import { IoClose } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';

const Popup = ({ onClose, data }) => {
    const remainingDays = getRemainingDays(String(data?.date?.ad_concat_date_en))
    return (
        <>
            <div className="ok-custom__popup reminder__popup active popup__small">
                <div className="overlay" onClick={onClose}></div>
                <div className="ok-custom__popup__model">
                    <div className="ok-custom__popup__head">
                        <div>
                            <h2>मेरो रिमाइन्डर</h2>
                        </div>
                        <div className="reminder__popup__close close__popup" onClick={onClose}>
                            <FaTimes />
                        </div>
                    </div>
                    <div className="ok-custom__popup__content">

                        <div className='ok-popup-wrapper'>
                            <div>
                                <h3 className='ok-popup-event-title'>
                                    {data.event_title_np}
                                </h3>

                                <div className='ok-popup-event-date'>

                                    <span>{data?.date?.bs_month_np} {data?.date?.bs_date_np}, {data?.date?.bs_year_np}</span>

                                    <span>{data?.date?.ad_date_np} {data?.date?.ad_month_np}, {data?.date?.ad_year_np}</span>
                                    <span>{data?.date?.day_np}</span>

                                </div>
                            </div>

                            <div className='ok-pop-remaining'>
                                {nepaliDaysRemaining(remainingDays)}
                            </div>

                        </div>

                        <div className="ok-popup-content">
                            <div>
                                <div className='grid-item grid-item-3 grid-gap-20'>
                                    {/* <div>
                                        <h4 className='ok-popup-subtitle'>
                                            Category
                                        </h4>
                                        <p>
                                            {data.event_category}
                                        </p>
                                    </div> */}
                                    <div>
                                        <h4 className='ok-popup-subtitle'>
                                            Location
                                        </h4>
                                        <p>
                                            {data.location}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className='ok-popup-subtitle'>
                                            Time
                                        </h4>
                                        <p>
                                            {engToNepTime(data.time_from.split(":")[0])}
                                            :
                                            {engToNepTime(data.time_from.split(":")[1])}
                                            {" "}
                                            -
                                            {" "}
                                            {engToNepTime(data.time_to.split(":")[0])}
                                            :
                                            {engToNepTime(data.time_to.split(":")[1])}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <h4 className='ok-popup-subtitle'>
                                    Note
                                </h4>
                                <p>
                                    {data.note}
                                </p>
                            </div>
                        </div>

                        <div className="panchanga">
                            <div className="block-heading">
                                <h3>
                                    पञ्चाङ्ग
                                </h3>
                            </div>

                            <div className="ok-panchanga__data">
                                <div className="wrapper">
                                    <div className="title">तारिख:</div>
                                    <div className="txt small-ok-eng-font">{data?.date.ad_month_en} {data?.date.ad_date_en}, {data?.date.ad_year_en}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">पक्ष:</div>
                                    <div className="txt">{data?.date?.panchanga?.pakshya_np}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">सूर्योदय</div>
                                    <div className="txt">{data?.date?.panchanga?.sunrise_np}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">सूर्यास्त:</div>
                                    <div className="txt">{data?.date?.panchanga?.sunset_np}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">चन्द्र राशि:</div>
                                    <div className="txt">{data?.date?.panchanga?.chandra_rashi_np}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">सूर्य राशि:</div>
                                    <div className="txt">{data?.date?.panchanga?.surya_rashi_np}</div>
                                </div>


                                <div className="wrapper">
                                    <div className="title">नक्षत्र समाप्ति समय:</div>
                                    <div className="txt">{data?.date?.panchanga?.nakshatra_end_time_np}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">योग:</div>
                                    <div className="txt">{data?.date?.panchanga?.yog_np}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title"> प्रथम करण:</div>
                                    <div className="txt">{data?.date?.panchanga?.pratham_karan_np}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">अयान:</div>
                                    <div className="txt">{data?.date?.panchanga?.ayan_np}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">ऋतु:</div>
                                    <div className="txt">{data?.date?.panchanga?.ritu_np}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">तिथी:</div>
                                    <div className="txt">{data?.date?.tithi?.tithi_np} {data?.date?.tithi?.tithi_end_time_np} बजेसम्म</div>
                                </div>

                                <div className="wrapper">
                                    <div className="title">करण १:</div>
                                    <div className="txt">{data?.date?.panchanga?.pratham_karan_np ? data?.date?.panchanga?.pratham_karan_np : "-"}</div>
                                </div>
                                <div className="wrapper">
                                    <div className="title">करण २:</div>
                                    <div className="txt">{data?.date?.panchanga?.dutiya_karan_np ? data?.date?.panchanga?.dutiya_karan_np : "-"}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Popup