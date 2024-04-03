import Link from 'next/link';
import React from 'react';
const Rashifal = ({ rashifaldata }) => {
    return (
        <>
            <div className=" ">

                <div className="">
                    <div className="okv4-container">

                        <div className="ok-section-title ok-rashifal-heading">
                            <h2>राशिफल</h2>
                            <div className="rashi-relate-context">
                                <span>दैनिक</span>
                                <span>मासिक</span>
                                <span>बार्षिक</span>
                            </div>
                            <div className="heading-jyotis-info">
                                <span>ज्यो.प. डा.उत्तम उपाध्याय न्यौपाने</span>
                                <img src="./img/Uttam-Upadhya.jpg" alt="Uttam Upadhya, Onlinekhabar Rashifal" />
                            </div>
                        </div>

                        <div className="mt-2 rashifal-container">
                            <div className="grid-item grid-item-4 grid-gap-20">
                                {
                                    rashifaldata.length > 0 ? (
                                        <>
                                            {
                                                rashifaldata.map((item) => (
                                                    <div key={item.slug}>
                                                        <Link href={`/rashifal/${item.slug}`} className="card-item">
                                                            <img src={item.icon} alt={item.name} />
                                                            <h5>{item.name}</h5>
                                                            <span>{item.letters}</span>
                                                        </Link>
                                                    </div>
                                                ))
                                            }
                                        </>
                                    ) : (
                                        <div>No data</div>
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

export default Rashifal;