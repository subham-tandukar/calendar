"use client"
import Link from 'next/link';
import React from 'react';
import { useRoot } from '../../../context';
import Share from '../../Components/Share/Share';
import DateCalculator from './DateCalculator';

const DateConverter = ({ currentdate }) => {

    const { siteSetting } = useRoot();

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
                            {
                                siteSetting?.date_converter_title_np || "मिति परिवर्तन"
                            }

                        </li>
                    </ul>
                </div>

                <div className="ok-bg">
                    <div className="ok-desc-content">
                        <div className="ok-tab-flex">

                            <h4 className='ok-main-title'>
                                {
                                    siteSetting?.date_converter_title_np || "मिति परिवर्तन"
                                }
                            </h4>

                            <Share
                                endpoint="date-converter"
                                title={siteSetting?.date_converter_meta_title || siteSetting?.date_converter_title_np}
                                preFilledText={siteSetting?.date_converter_additional_meta_information || siteSetting?.date_converter_title_np}
                                imageUrl={`${siteSetting?.date_converter_og_image || siteSetting?.site_og_image}`}
                            />
                        </div>

                        <div className="ok-content mt-2">
                            {
                                siteSetting.date_converter_description_np ?
                                    (
                                        <p
                                            dangerouslySetInnerHTML={{ __html: siteSetting.date_converter_description_np }}
                                        />
                                    ) : (
                                        <>
                                            <p>
                                                विक्रम संवत् (विक्रम सम्वत्) पात्रो नेपाल, भारत (इण्डिया / हिन्दुस्तान), बंगलादेश र दक्षिणपूर्वी एशियाका केही अन्य भागहरूमा प्रयोग हुने चन्द्र पात्रो हो। यो वैदिक सनातन हिन्दू पञ्चाङमा आधारित छ र ग्रेगोरियन क्यालेन्डर (AD / इश्वी सम्वत्) भन्दा लगभग ५६.७ वर्ष अगाडि पनि छ।
                                            </p>

                                        </>
                                    )
                            }

                        </div>
                    </div>

                    <DateCalculator currentdate={currentdate} isHome="false"/>
                </div>
            </div>
        </>
    );
};

export default DateConverter;