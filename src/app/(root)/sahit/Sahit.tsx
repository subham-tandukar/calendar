"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Loading from '../../loading';
import { arabicToDevanagari } from '../../../hooks';


const Sahit = ({ currentdate }) => {
    const searchParams = useSearchParams();

    const [saitData, setSaitdata] = useState<any[]>([]);
    const [saitList, setSaitList] = useState<any[]>([]);
    const [saitLoading, setSaitLoading] = useState<boolean>(true);
    const [saitid, setSaitId] = useState<string>("");
    const [saitName, setSaitName] = useState<string>("");
    const [submitYear, setSubmitYear] = useState<string>(currentdate.bs_year_en);
    const [submitMonth, setSubmitMonth] = useState<string>("-1");

    const [selectedYear, setSelectedYear] = useState(currentdate.bs_year_en);
    const [selectedMonth, setSelectedMonth] = useState("-1");

    const getSaitData = async () => {
        const saitapi = `http://47.128.210.223/api/v1/calendar/sahits`;

        try {
            const response = await fetch(saitapi, {
                cache: "no-store"
            });
            if (!response.ok) {
                console.error("failed to fetch data");
            }
            const sait = await response.json();
            setSaitdata(sait?.data)

            if (sait?.data.length > 0) {
                setSaitId(sait?.data[0].id);
            }
            if (sait?.data.length > 0) {
                setSaitName(sait?.data[0].title_np);
            }
        } catch (error) {
            console.error("failed to fetch data");
            setSaitdata([])
        }
    }

    const getSaitList = async () => {
        const saitapi = `http://47.128.210.223/api/v1/calendar/sahit/${submitYear}/${saitid}?month=${submitMonth}`;

        try {
            setSaitLoading(true)
            const response = await fetch(saitapi, {
                cache: "no-store"
            });
            if (!response.ok) {
                console.error("failed to fetch data");
            }
            const sait = await response.json();
            setSaitList(sait?.data)
            setSaitLoading(false)
        } catch (error) {
            console.error("failed to fetch data");
            setSaitList([])
            setSaitLoading(false)
        }
    }

    useEffect(() => {
        getSaitData()
    }, [])

    useEffect(() => {
        getSaitList()
    }, [submitYear, saitid, submitMonth,])

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitYear(selectedYear)
        setSubmitMonth(selectedMonth)
    };

    const monthNames = [
        "सबै",
        "बैशाख",
        "जेठ",
        "असार",
        "साउन",
        "भदौ",
        "असोज",
        "कार्तिक",
        "मंसिर",
        "पौष",
        "माघ",
        "फागुन",
        "चैत",
    ]

    return (
        <>
            <div className=" ">

                <div className="">
                    <div className="okv4-container">

                        <div className="ok-section-title ok-rashifal-heading ">
                            <h2>साईत</h2>
                        </div>

                        <div className="mt-2 rashifal-container suvasait-container">
                            <div>
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
                                <div className="wrapper mt-3">
                                    <div className="btn__wrapper">
                                        {
                                            saitData.length > 0 && (
                                                <>
                                                    {
                                                        saitData.map((data) => (
                                                            <div className="category__btn" key={data.id}>
                                                                <input type="radio" onChange={() => {
                                                                    setSaitId(data.id);
                                                                    setSaitName(data.title_np)
                                                                }} checked={saitid === data.id} id={data.title_en} name="suvaSait" />
                                                                <div className="dot" style={{ background: '#1A164224' }}></div>
                                                                <label className="category__label " htmlFor={data.title_en}>{data.title_np}</label>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div>
                                {
                                    saitLoading ? (
                                        <Loading />
                                    ) : (
                                        <>
                                            {
                                                saitList.length > 0 ? (
                                                    <div className='sait-grid grid-item grid-item-2 grid-gap-20 mt-3'>
                                                        {
                                                            saitList.map((data) => {
                                                                return (
                                                                    <div key={data.id} className="">

                                                                        <div className="card-day-event">
                                                                            <div>
                                                                                <div className="suvasait-label">
                                                                                    {data?.data[0]?.bs_year_np}, <span>{data?.data[0]?.bs_month_np}</span> महिनाका साईतहरु
                                                                                </div>

                                                                                <div className="sait-dates">
                                                                                    <>
                                                                                        {
                                                                                            data?.data.length > 0 ? (
                                                                                                <>
                                                                                                    {
                                                                                                        data?.data.map((item) => (
                                                                                                            <div>
                                                                                                                <span>{item.bs_date_np}</span>
                                                                                                                <div className="sait-date-bottom">
                                                                                                                    {item.ad_date_np}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ))
                                                                                                    }
                                                                                                </>
                                                                                            ) : (
                                                                                                <div className='no-data'>
                                                                                                    No data found
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    </>


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                ) : (
                                                    <div className='no-data'>
                                                        {
                                                            submitMonth !== "-1" ? (
                                                                <>
                                                                    {`${arabicToDevanagari(Number(submitYear))}, ${monthNames[submitMonth]} महिनामा ${saitName}को कुनै पनि साइत छैन`}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {`${arabicToDevanagari(Number(submitYear))} वर्षमा ${saitName}को कुनै पनि साइत छैन`}
                                                                </>
                                                            )
                                                        }
                                                        {/* ///No data */}
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
        </>
    );
};

export default Sahit;
