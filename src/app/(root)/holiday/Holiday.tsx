"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '../../loading';
import { getRemainingDays, nepaliDaysRemaining } from '../../../hooks';


const Holiday = ({ currentdate }) => {
    const searchParams = useSearchParams();

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitYear, setSubmitYear] = useState<string>(currentdate.bs_year_en);
    const [submitMonth, setSubmitMonth] = useState<string>("-1");

    const [selectedYear, setSelectedYear] = useState(currentdate.bs_year_en);
    const [selectedMonth, setSelectedMonth] = useState("-1");


    const getSaitList = async () => {
        const holidayapi = `http://47.128.210.223/api/v1/calendar/holidays/bs/${submitYear}?month=${submitMonth}`;

        try {
            setLoading(true)
            const response = await fetch(holidayapi, {
                cache: "no-store"
            });
            if (!response.ok) {
                console.error("failed to fetch data");
            }
            const sait = await response.json();
            setData(sait?.data)
            setLoading(false)
        } catch (error) {
            console.error("failed to fetch data");
            setData([])
            setLoading(false)
        }
    }


    useEffect(() => {
        getSaitList()
    }, [submitYear, submitMonth, submitMonth])

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitYear(selectedYear)
        setSubmitMonth(selectedMonth)
    };

    return (
        <>

            <div className="okv4-container">

                <div className="ok-section-title ok-rashifal-heading ">
                    <h2>बिदाहरु</h2>
                </div>

                <div className="mt-2">

                    <div>
                        <form onSubmit={handleSubmit}>

                            <div className='filter__flex'>
                                <div>
                                    <label htmlFor="number" className="mb-10 d-block">
                                        वर्ष रोज्नुहोस्
                                    </label>
                                    <div className='sahit-year mt-1'>

                                        <input
                                            type="number"
                                            id="number"
                                            value={selectedYear}
                                            onChange={(e) => setSelectedYear(e.target.value)}
                                        />

                                    </div>
                                </div>

                                <div>
                                    <label className="mb-10 d-block">महिना रोज्नुहोस्</label>
                                    <div className='mt-1 filter-month'>

                                        <select
                                            value={selectedMonth}
                                            onChange={(e) => setSelectedMonth(e.target.value)}
                                        >

                                            <option value="-1">सबै</option>
                                            <option value="1">बैशाख</option>
                                            <option value="2">जेठ</option>
                                            <option value="3">असार</option>
                                            <option value="4">साउन</option>
                                            <option value="5">भदौ</option>
                                            <option value="6">असोज</option>
                                            <option value="7">कार्तिक</option>
                                            <option value="8">मंसिर</option>
                                            <option value="9">पौष</option>
                                            <option value="10">माघ</option>
                                            <option value="11">फागुन</option>
                                            <option value="12">चैत</option>


                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-1'>
                                <input
                                    type="submit"
                                    className="btn primary primary-gradient"
                                    value="जानुहोस्"
                                />
                            </div>
                        </form>
                    </div>


                    {
                        loading ? (
                            <Loading />
                        ) : (
                            <>
                                {data && data.length > 0 ? (
                                    <div className='overflow-sidebar mt-2'>
                                        <div className="grid-item grid-item-2 grid-gap-20 ">
                                            {
                                                <>
                                                    {
                                                        data.map((holiday) => {
                                                            const remainingDays = getRemainingDays(holiday?.date?.ad_concat_date_en)
                                                            return (
                                                                <div key={holiday.id}>
                                                                    <div className={`card-day-event ${holiday.is_public_holiday === true ? 'is-holiday' : ''}`}>
                                                                        <div className="event-day-date">
                                                                            {holiday.date.bs_date_np}
                                                                            <span>{holiday.date.day_np.replace("वार", "")}</span>
                                                                        </div>
                                                                        <div className="event-day-info">
                                                                            <p>
                                                                                {holiday.event_title_np}
                                                                            </p>
                                                                            <span>{holiday.date.bs_month_np} {holiday.date.bs_date_np}, {holiday.date.bs_year_np} - {holiday.date.ad_date_en}, {holiday.date.ad_year_en}</span>
                                                                        </div>

                                                                        <div className="event-day-reminder">{nepaliDaysRemaining(remainingDays)}</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div className='no-data'>No holidays</div>
                                )}

                            </>
                        )
                    }



                </div>
            </div>


        </>
    );
};

export default Holiday;
