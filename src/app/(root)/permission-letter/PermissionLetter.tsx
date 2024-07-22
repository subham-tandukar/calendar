"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageLoading from '../../page-loading';
import { arabicToDevanagari } from '../../../hooks';
import { FiExternalLink } from "react-icons/fi";
import PermissionPopup from './PermissionPopup';
import { useRoot } from '../../../context';
import Share from '../../Components/Share/Share';

const PermissionLetter = () => {
    const { siteSetting } = useRoot();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getList = async () => {
        const saitapi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/authorization-letters`;

        try {
            setLoading(true)
            const response = await fetch(saitapi, {
                cache: "no-store"
            });
            if (!response.ok) {
                console.error("failed to fetch data");
            }
            if (response.ok) {
                const sait = await response.json();
                setData(sait?.data)
                setLoading(false)
            }
        } catch (error) {
            console.error("failed to fetch data");
            setData([])
            setLoading(false)
        }
    }

    useEffect(() => {
        getList()
    }, [])

    const [popup, setPopup] = useState(false)
    const handleClose = () => {
        setPopup(false)
    }
    const [eventData, setEventData] = useState([])
    const handleClick = (props) => {
        setEventData(props)
        setPopup(!popup)
    }

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
                            {siteSetting.authorization_letter_title_np}
                        </li>
                    </ul>
                </div>


                <div className="ok-bg">
                    <div className="ok-desc-content">
                        <div className="ok-tab-flex">
                            <h4 className='ok-main-title'>
                                {siteSetting.authorization_letter_title_np}
                            </h4>
                            <Share
                                endpoint="permission-letter"
                                title={siteSetting?.authorization_letter_meta_title || siteSetting?.authorization_letter_title_np}
                                preFilledText={siteSetting?.authorization_letter_additional_meta_information || siteSetting?.authorization_letter_title_np}
                                imageUrl={`${siteSetting?.authorization_letter_og_image || siteSetting?.site_og_image}`}
                            />
                        </div>
                        <div className="ok-content mt-2">
                            <p
                                dangerouslySetInnerHTML={{ __html: siteSetting.authorization_letter_description_np }}
                            />
                        </div>
                    </div>
                    <>
                        {
                            loading ? (
                                <PageLoading />
                            ) : (
                                <>
                                    {
                                        data && data.length > 0 ? (
                                            <div className="ok-anumati-table">
                                                {
                                                    data.map((item) => (
                                                        <div onClick={() => handleClick(item)} key={item.id} className="wrapper">
                                                            <h2 className="title">{item.title_np}</h2>
                                                            <div>
                                                                <FiExternalLink />
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ) : (
                                            <div className='ok-no-data'>
                                                कुनै डाटा उपलब्ध छैन
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </>
                </div>


            </div>

            {
                popup && <PermissionPopup onClose={handleClose} data={eventData} />
            }

        </>
    );
};

export default PermissionLetter;