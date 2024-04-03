"use client"

import Link from 'next/link';
import React, { useState } from 'react';
const SingleRashifal = ({ singleData, rashifalData, params }) => {
    const [activeTab, setActiveTab] = useState({
        tab1: true,
        tab2: false,
        tab3: false,
    })

    const handleTab1 = () => {
        setActiveTab({
            tab1: true,
            tab2: false,
            tab3: false,
        })
    }
    const handleTab2 = () => {
        setActiveTab({
            tab1: false,
            tab2: true,
            tab3: false,
        })
    }
    const handleTab3 = () => {
        setActiveTab({
            tab1: false,
            tab2: false,
            tab3: true,
        })
    }

    return (
        <>
            <div className="okv4-section rashi-single-page">

                <div className="page-container">
                    <div className="okv4-container">
                        <div className="ok-section ok-page-details  rashi-single-page flx flx-wrp">
                            <div className="entry-content">

                                <div className="ok-section-title ok-rashifal-heading">
                                    <h2>राशिफल</h2>
                                    <div className="heading-jyotis-info">
                                        <span>
                                            <span className="small-label">ज्योतिष:</span>
                                            {singleData.jyotish}
                                        </span>
                                        <img src={singleData.jyotish_image} alt={singleData.jyotish} />
                                    </div>
                                </div>

                                <div className="rashifal-details">
                                    <div className="rashi-single-heading">
                                        <div className="rashi-img">
                                            <img src={singleData.icon} alt="" />
                                        </div>
                                        <div className="rashi-name-info">
                                            <h5>{singleData.name} <span>{singleData.rashi_letters}</span></h5>
                                            {
                                                singleData.subha_rang && <span><b>शुभ रङ</b> : {singleData.subha_rang}</span>
                                            }

                                            {
                                                singleData.mitra_rashi && <span><b>मित्र राशि</b> : {singleData.mitra_rashi}</span>
                                            }

                                            {
                                                singleData.lucky_day_number && <span><b>भाग्यशाली दिन र नंबर</b> :{singleData.lucky_day_number}</span>
                                            }

                                        </div>
                                        <div className="ok-select-box">

                                        </div>
                                    </div>
                                    <div className="tab-nav rashifal">
                                        <div className="wrapper">
                                            <div className="btn__wrapper">
                                                <div className={`category__btn ${activeTab.tab1 === true ? "active" : ""}`} onClick={handleTab1}>
                                                    <input type="radio" id="todayRashi" name="category" />
                                                    <label className="category__label " htmlFor="todayRashi">आजको राशिफल</label>
                                                </div>
                                                <div className={`category__btn ${activeTab.tab2 === true ? "active" : ""}`} onClick={handleTab2}>
                                                    <input type="radio" id="weeklyRashi" name="category" />
                                                    <label className="category__label" htmlFor="weeklyRashi">सप्ताहिक राशिफल</label>
                                                </div>
                                                <div className={`category__btn ${activeTab.tab3 === true ? "active" : ""}`} onClick={handleTab3}>
                                                    <input type="radio" id="monthlyRashi" name="category" />
                                                    <label className="category__label" htmlFor="monthlyRashi">मासिक राशिफल</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-container">
                                        {
                                            activeTab.tab1 && (
                                                <>
                                                    <div className="ok-news-post-hour rashifal-date">
                                                        <span>{
                                                            singleData?.rashifal?.daily?.today
                                                        }</span>
                                                    </div>

                                                    <div className="rashi-contenT">
                                                        <p>
                                                            {
                                                                singleData?.rashifal?.daily?.content
                                                            }
                                                        </p>
                                                    </div>

                                                </>
                                            )
                                        }
                                        {
                                            activeTab.tab2 && (
                                                <>
                                                    <div className="ok-news-post-hour rashifal-date">
                                                        <span>{
                                                            singleData?.rashifal?.monthly?.today
                                                        }</span>
                                                    </div>

                                                    <div className="rashi-contenT">
                                                        <p>
                                                            {
                                                                singleData?.rashifal?.monthly?.content
                                                            }
                                                        </p>
                                                    </div>

                                                </>
                                            )
                                        }
                                        {
                                            activeTab.tab3 && (
                                                <>
                                                    <div className="ok-news-post-hour rashifal-date">
                                                        <span>{
                                                            singleData?.rashifal?.yearly?.today
                                                        }</span>
                                                    </div>

                                                    <div className="rashi-contenT">
                                                        <p>
                                                            {
                                                                singleData?.rashifal?.yearly?.content
                                                            }
                                                        </p>
                                                    </div>

                                                </>
                                            )
                                        }
                                    </div>

                                    <div className="ok-block-rashifal">
                                        <h3>अरु राशिफल</h3>
                                        <div className="rashifal-icon-cards grid-item grid-item-6 grid-gap-20">
                                            {
                                                rashifalData.length > 0 && (
                                                    <>
                                                        {
                                                            rashifalData.map((item) => (
                                                                <Link key={item.slug} href={`/rashifal/${item.slug}`} className={`card-item ${item.slug === params.id ? "active-card" : ""}`}>
                                                                    <img src={item.icon} alt={item.name} />
                                                                    <h5>{item.name}</h5>
                                                                </Link>
                                                            ))
                                                        }
                                                    </>
                                                )
                                            }


                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="ok-col-right">
                                <div className="rashi-profile-list">
                                    <h2>
                                        <img src={singleData.icon} alt={singleData.name} />
                                        {singleData.name} राशि - प्रोफाइल
                                    </h2>

                                    <div
                                        dangerouslySetInnerHTML={{ __html: singleData.rashi_profile }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleRashifal;