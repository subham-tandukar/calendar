"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../context';
import PageLoading from '../../page-loading';
import { arabicToDevanagari, formattedEngDate, formattedNepDate } from '../../../hooks';
import Share from '../../Components/Share/Share';
import ForexGraph from './ForexGraph';

const Forex = () => {

    const { siteSetting, forexData, forexLoading } = useRoot();

    const [fixedForexRate, setFixedForexRate] = useState<any[]>([]);
    const [marketForexRate, setMarketForexRate] = useState<any[]>([]);

    useEffect(() => {
        if (forexData.length > 0) {
            const forexFixeddata = forexData[0]?.rates
            const fixedData = forexFixeddata.filter((item) => {
                return item?.currency_code === "INR"
            })
            setFixedForexRate(fixedData)

            const marketData = forexFixeddata.filter((item) => {
                return item?.currency_code !== "INR"
            })
            setMarketForexRate(marketData)
        }
    }, [forexData.length])

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
                            {siteSetting.forex_title_np || "विदेशी विनिमय"}
                        </li>
                    </ul>
                </div>

                <div className="ok-bg">
                    <div className="ok-desc-content">
                        <div className="ok-tab-flex">

                            <h4 className='ok-main-title'>
                                {siteSetting.forex_title_np || "विदेशी विनिमय"}
                            </h4>

                            <Share
                                endpoint="forex"
                                title={siteSetting?.forex_meta_title || siteSetting?.forex_title_np}
                                preFilledText={siteSetting?.forex_additional_meta_information || siteSetting?.forex_title_np}
                                imageUrl={`${siteSetting?.forex_og_image || siteSetting?.site_og_image}`}
                            />
                        </div>
                        <div className="ok-content mt-2">
                            {
                                siteSetting.forex_page_description_np ?
                                    (

                                        <p
                                            dangerouslySetInnerHTML={{ __html: siteSetting.forex_page_description_np }}
                                        />
                                    ) : (
                                        <>
                                            <p>
                                                विदेशी विनिमय मुद्रा दर-रेट: विदेशी विनिमय दरलाई विप्रेशण दररेट भनिन्छ, यसरी दिइएको दररेटहरु राष्ट्र वाणिज्य वैंकले दैनिक जारी गर्ने सटही प्रयोजनका लागि विनिमय गर्न सकिन्छ। यी दरहरू विभिन्न कारणले निरन्तर उतार-चढाव भई रहन्छन्। ति कारणहरु जस्तै आर्थिक अवस्था, राजनीतिक घटनाहरू, र विशेष मुद्राहरूको आपूर्ति र मागबाट प्रभावित अवस्थाहरु हुन्।
                                            </p>

                                        </>
                                    )
                            }

                        </div>
                    </div>


                    <div className="">

                        <div>
                            <ForexGraph />
                        </div>

                        <div className="mt-2">
                            {
                                forexLoading ? (
                                    <PageLoading />
                                ) : (

                                    <>
                                        {
                                            forexData && forexData.length > 0 ? (
                                                <>
                                                    <div>
                                                        <div className='ok-title'>
                                                            Fixed Rate
                                                        </div>
                                                        <div className="ok-forex__table">
                                                            <div className="ok__table">
                                                                <table >
                                                                    <thead>
                                                                        <tr>
                                                                            <th></th>
                                                                            <th>Currency</th>
                                                                            <th className='tx-align-r'>
                                                                                Unit
                                                                            </th>
                                                                            <th className='tx-align-r'>
                                                                                Buying
                                                                            </th>
                                                                            <th className='tx-align-r'>
                                                                                Selling
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            fixedForexRate.map((item) => (
                                                                                <tr key={item.id}>
                                                                                    <td>
                                                                                        <div>
                                                                                            <img src={item.thumbnail} alt={item?.currency_title} />
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        {item?.currency_title} {" "}
                                                                                        ({item?.currency_code})
                                                                                    </td>
                                                                                    <td className='tx-align-r'>
                                                                                        {item?.unit}
                                                                                    </td>
                                                                                    <td className='tx-align-r'>
                                                                                        {item?.buy}
                                                                                    </td>
                                                                                    <td className='tx-align-r'>
                                                                                        {item?.sell}
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='mt-3'>
                                                        <div className=' ok-title'>
                                                            Open Market Rates
                                                        </div>
                                                        <div className="ok-forex__table">
                                                            <div className="ok__table">
                                                                <table >
                                                                    <thead>
                                                                        <tr>
                                                                            <th></th>
                                                                            <th>Currency</th>
                                                                            <th className='tx-align-r'>
                                                                                Unit
                                                                            </th>
                                                                            <th className='tx-align-r'>
                                                                                Buying
                                                                            </th>
                                                                            <th className='tx-align-r'>
                                                                                Selling
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            marketForexRate.map((item) => (
                                                                                <tr key={item.id}>
                                                                                    <td>
                                                                                        <div>
                                                                                            <img src={item.thumbnail} alt={item?.currency_title} />
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        {item?.currency_title} {" "}
                                                                                        ({item?.currency_code})
                                                                                    </td>
                                                                                    <td className='tx-align-r'>
                                                                                        {item?.unit}
                                                                                    </td>
                                                                                    <td className='tx-align-r'>
                                                                                        {item?.buy}
                                                                                    </td>
                                                                                    <td className='tx-align-r'>
                                                                                        {item?.sell}
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (

                                                <p>कुनै डाटा उपलब्ध छैन</p>

                                            )
                                        }
                                    </>
                                )
                            }
                        </div>


                    </div>
                </div>


            </div >
        </>
    );
};

export default Forex;