"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../context';
import { arabicToDevanagari, formattedEngDate, formattedNepDate } from '../../../hooks';
import PageLoading from '../../page-loading';
import { MdChevronRight } from 'react-icons/md';

const TodayBullion = ({ isHome }) => {
    const { siteSetting, bullionData, loading } = useRoot();

    const bullion = bullionData && bullionData.length > 0
    const todayBullion = bullion && bullionData[0]
    const yesterdayBullion = bullion && bullionData[1]


    return (
        <>
            <div className="ok-card-all-festivals">

                <div className="ok-block">
                    <div className="ok-block-heading">
                        <h3>
                            {
                                isHome === "false" ? (
                                    <>
                                        {
                                            siteSetting?.gold_silver_page_title_np ||
                                            "आजको सुन, चाँदीको दर"
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            siteSetting?.today_gold_silver_title_np ||
                                            "सुन, चाँदीको दर"
                                        }
                                    </>
                                )
                            }

                        </h3>
                        {
                            isHome === "true" && (
                                <div className="ok-block-heading-right-elem">
                                    <Link href="/bullion" className="ok-view-all-btn">
                                        <MdChevronRight width={30} />
                                    </Link>
                                </div>
                            )
                        }

                    </div>
                </div>

                {
                    loading ? (
                        <PageLoading />
                    )
                        : (
                            <div className="ok-bullion-container">
                                <div className="ok-today-bullion mt-1">
                                    {
                                        todayBullion && (
                                            <>
                                                <div className='flex-between'>
                                                    <div className='ok-card-date'>
                                                        {formattedNepDate(todayBullion.date_bs)} - {formattedEngDate(todayBullion.date)}
                                                    </div>

                                                    {
                                                        isHome === "true" && (
                                                            <div className='ok-prev-bullion-title'>
                                                                <h2>आज</h2>
                                                                <h2>हिजो</h2>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="ok-bullion-grid">
                                                    <div>
                                                        {
                                                            siteSetting?.hallmark_thumbnail && (
                                                                <div className="ok-bullion-img">
                                                                    <img src={siteSetting?.hallmark_thumbnail} alt={
                                                                        siteSetting?.hallmark_title_np ||
                                                                        "छापावाल"
                                                                    } />
                                                                </div>

                                                            )
                                                        }
                                                        <div className='ok-bullion__wrapper'>

                                                            <div>

                                                                <h2>
                                                                    {
                                                                        siteSetting?.hallmark_title_np ||
                                                                        "छापावाल"
                                                                    }
                                                                </h2>
                                                                <p>
                                                                    {arabicToDevanagari(todayBullion.gold_hallmark_tola)}
                                                                    <span>प्रति तोला</span>
                                                                </p>
                                                            </div>

                                                            {
                                                                isHome === "true" && (
                                                                    <div className='prev-bullion'>
                                                                        <h2>
                                                                            {
                                                                                siteSetting?.hallmark_title_np ||
                                                                                "छापावाल"
                                                                            }
                                                                        </h2>
                                                                        <p>
                                                                            {arabicToDevanagari(yesterdayBullion.gold_hallmark_tola)}
                                                                            <span>प्रति तोला</span>
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ok-bullion-grid">
                                                    <div>
                                                        {
                                                            siteSetting?.tejabi_thumbnail && (
                                                                <div className="ok-bullion-img">
                                                                    <img src={siteSetting?.tejabi_thumbnail} alt={
                                                                        siteSetting?.tejabi_title_np ||
                                                                        "तेजाबी"
                                                                    } />
                                                                </div>

                                                            )
                                                        }
                                                        <div className='ok-bullion__wrapper'>

                                                            <div>
                                                                <h2>
                                                                    {
                                                                        siteSetting?.tejabi_title_np ||
                                                                        "तेजाबी"
                                                                    }

                                                                </h2>
                                                                <p>
                                                                    {arabicToDevanagari(todayBullion.gold_tejabi_tola)}
                                                                    <span>प्रति तोला</span>
                                                                </p>
                                                            </div>

                                                            {
                                                                isHome === "true" && (
                                                                    <div className='prev-bullion'>
                                                                        <h2>
                                                                            {
                                                                                siteSetting?.tejabi_title_np ||
                                                                                "तेजाबी"
                                                                            }

                                                                        </h2>
                                                                        <p>
                                                                            {arabicToDevanagari(yesterdayBullion.gold_tejabi_tola)}
                                                                            <span>प्रति तोला</span>
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ok-bullion-grid">
                                                    <div>
                                                        {
                                                            siteSetting?.silver_thumbnail && (
                                                                <div className="ok-bullion-img">
                                                                    <img src={siteSetting?.silver_thumbnail} alt={
                                                                        siteSetting?.silver_title_np ||
                                                                        "चाँदी"
                                                                    } />
                                                                </div>

                                                            )
                                                        }

                                                        <div className='ok-bullion__wrapper'>
                                                            <div>

                                                                <h2>
                                                                    {
                                                                        siteSetting?.silver_title_np ||
                                                                        "चाँदी"
                                                                    }
                                                                </h2>
                                                                <p>
                                                                    {arabicToDevanagari(todayBullion.silver_tola)}
                                                                    <span>प्रति तोला</span>
                                                                </p>
                                                            </div>

                                                            {
                                                                isHome === "true" && (
                                                                    <div className='prev-bullion'>
                                                                        <h2>
                                                                            {
                                                                                siteSetting?.silver_title_np ||
                                                                                "चाँदी"
                                                                            }
                                                                        </h2>
                                                                        <p>
                                                                            {arabicToDevanagari(yesterdayBullion.silver_tola)}
                                                                            <span>प्रति तोला</span>
                                                                        </p>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }


                                </div>
                            </div>
                        )
                }


            </div>



        </>
    );
};

export default TodayBullion