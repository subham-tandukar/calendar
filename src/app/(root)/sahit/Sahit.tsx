"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLoading from '../../page-loading';
import { allmonthNames, arabicToDevanagari, fetcher, removeHTMLTags } from '../../../hooks';
import { useRoot } from '../../../context';
import Share from '../../Components/Share/Share';
import SelectYear from '../../Components/SelectYear/SelectYear';
import SelectMonth from '../../Components/SelectMonth/SelectMonth';
import useSWR from 'swr';
const Sahit = ({ currentdate }) => {
    const searchParams = useSearchParams();
    const { siteSetting } = useRoot();
    const [saitData, setSaitdata] = useState<any[]>([]);
    const [saitList, setSaitList] = useState<any[]>([]);
    const [saitLoading, setSaitLoading] = useState<boolean>(true);
    const [saitid, setSaitId] = useState<string>("");
    const [saitName, setSaitName] = useState<string>("");
    const [submitYear, setSubmitYear] = useState<string>(currentdate.bs_year_en);
    const [submitMonth, setSubmitMonth] = useState<string>("-1");

    const [selectedYear, setSelectedYear] = useState(currentdate.bs_year_en);
    const [selectedMonth, setSelectedMonth] = useState("-1");
    useEffect(() => {
        if (currentdate) {
            setSelectedYear(Number(currentdate?.bs_year_en));
        }
    }, [currentdate]);

    const { data: sait } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/sahits`,
        fetcher
    );

    const { data: fetchedData, isLoading, error } = useSWR(saitid ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/sahit/${submitYear}/${saitid}?month=${submitMonth}` : null,
        fetcher
    );

    useEffect(() => {
        if (sait) {
            setSaitdata(sait?.data)

            if (sait?.data.length > 0) {
                setSaitId(sait?.data[0].id);
            }
            if (sait?.data.length > 0) {
                setSaitName(sait?.data[0].title_np);
            }
        }
    }, [sait]);

    useEffect(() => {
        if (fetchedData) {
            setSaitList(fetchedData?.data);
        }
    }, [fetchedData]);

    useEffect(() => {
        if (error) {
            setSaitList([])
        }
    }, [error])

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitYear(selectedYear)
        setSubmitMonth(selectedMonth)
    };


    // const containerRef = useRef<HTMLDivElement>(null);

    // const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    //     const container = containerRef.current;
    //     if (!container) return;

    //     const scrollLeft = container.scrollLeft;
    //     const maxScrollLeft = container.scrollWidth - container.clientWidth;

    //     if ((scrollLeft >= maxScrollLeft && e.deltaY > 0) || (scrollLeft <= 0 && e.deltaY < 0)) {
    //         // If scrolled to the end in either direction, or scrolled to the start in the opposite direction
    //         return true; // Allow default scrolling behavior
    //     }

    //     e.preventDefault();
    //     container.scrollLeft += e.deltaY;
    // };

    return (
        <>

            <div className="okv4-container">
                <div className="ok-breadcrumb">
                    <ul>
                        <li>
                            <Link href="https://www.onlinekhabar.com/" target='_blank'>अनलाइनखबर </Link>
                        </li>
                        <li>
                            <Link href="/">क्यालेन्डर</Link>
                        </li>
                        <li className='active'>
                            {siteSetting.sahit_title_np}
                        </li>
                    </ul>
                </div>

                <div className="ok-bg">
                    <div className="ok-desc-content">
                        <div className="ok-tab-flex">
                            <h4 className='ok-main-title'>
                                {siteSetting.sahit_title_np}
                            </h4>
                            <Share
                                endpoint="sahit"
                                title={siteSetting?.sahit_meta_title || siteSetting?.sahit_title_np}
                                preFilledText={siteSetting?.sahit_additional_meta_information || siteSetting?.sahit_title_np}
                                imageUrl={`${siteSetting?.sahit_og_image || siteSetting?.site_og_image}`}
                            />
                        </div>
                        <div className="ok-content mt-2">
                            <p
                                dangerouslySetInnerHTML={{ __html: siteSetting.sahit_description_np }}
                            />
                        </div>
                    </div>

                    <div className="ok-suvasait-container">
                        <div>
                            <div>
                                <form onSubmit={handleSubmit}>

                                    <div className='ok-filter__flex ok-filter-border'>
                                        <div>
                                            <div className='ok-filter__flex'>
                                                <label htmlFor="number" className="mb-10 d-block">
                                                    वर्ष रोज्नुहोस्
                                                </label>
                                                {/* <div className='ok-filter-year mt-1'>

                                                    <input
                                                        type="number"
                                                        id="number"
                                                        value={selectedYear}
                                                        onChange={(e) => setSelectedYear(e.target.value)}
                                                    />

                                                </div> */}
                                                <SelectYear currentdate={currentdate} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
                                            </div>

                                            <div className='ok-filter__flex'>
                                                <label className="mb-10 d-block">महिना रोज्नुहोस्</label>

                                                <SelectMonth isAll="all" selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

                                            </div>
                                        </div>
                                        <div >
                                            <input
                                                type="submit"
                                                className="btn btn-medium primary primary-gradient"
                                                value={siteSetting?.date_filter_cta_np}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="wrapper mt-3">
                                <div className="ok-btn__wrapper"
                                //  onWheel={handleScroll} 
                                //  ref={containerRef}
                                >
                                    {
                                        saitData.length > 0 && (
                                            <>
                                                {
                                                    saitData.map((data) => (
                                                        <div className="ok-category__btn" key={data.id}>
                                                            <input type="radio" onChange={() => {
                                                                setSaitId(data.id);
                                                                setSaitName(data.title_np)
                                                            }} checked={saitid === data.id} id={data.title_en} name="suvaSait" />
                                                            <div className="dot"></div>
                                                            <label className="ok-category__label " htmlFor={data.title_en}>{data.title_np}</label>
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
                                isLoading ? (
                                    <PageLoading />
                                ) : (
                                    <>
                                        {
                                            saitList.length > 0 ? (
                                                <>
                                                    {
                                                        submitMonth !== "-1" ? (
                                                            <div className='ok-text ok-title'>
                                                                {`${arabicToDevanagari(Number(submitYear))} ${allmonthNames[submitMonth]} महिनाको ${saitName}को साइतहरु हेर्नुहोस्`}
                                                            </div>
                                                        ) : (
                                                            <div className='ok-text ok-title'>
                                                                {`${arabicToDevanagari(Number(submitYear))} सालको ${saitName}का साइतहरु हेर्नुहोस्`}
                                                            </div>
                                                        )
                                                    }

                                                    <div className='ok-sait-grid grid-item grid-item-2 grid-gap-5 mt-2'>
                                                        <>

                                                            {
                                                                saitList.map((data) => {
                                                                    return (
                                                                        <div key={data.id} className="">

                                                                            <div className="ok-card-day-event">
                                                                                <div>
                                                                                    <div className="ok-suvasait-label">
                                                                                        {data?.data[0]?.bs_year_np}, <span>{data?.data[0]?.bs_month_np}</span> महिनाका साईतहरु
                                                                                    </div>

                                                                                    <div className="ok-sait-dates">
                                                                                        <>
                                                                                            {
                                                                                                data?.data.length > 0 ? (
                                                                                                    <>
                                                                                                        {
                                                                                                            data?.data.map((item) => (
                                                                                                                <div key={item.id}>
                                                                                                                    <span>{item.bs_date_np}</span>
                                                                                                                    <div className="ok-sait-date-bottom">
                                                                                                                        {item.ad_date_np}
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            ))
                                                                                                        }
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <div className='ok-no-data'>
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
                                                        </>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='ok-no-data'>
                                                    {
                                                        submitMonth !== "-1" ? (
                                                            <>
                                                                {`${arabicToDevanagari(Number(submitYear))} ${allmonthNames[submitMonth]} महिनामा ${saitName}को कुनै पनि साइत छैन`}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {`${arabicToDevanagari(Number(submitYear))} सालमा ${saitName}को कुनै पनि साइत छैन`}
                                                            </>
                                                        )
                                                    }
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

        </>
    );
};

export default Sahit;