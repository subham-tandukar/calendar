"use client"
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../context';
import Link from 'next/link';
import { FaPencil } from "react-icons/fa6";
import Loading from '../../loading';
import ProfilePreview from './ProfilePreview';
import Image from 'next/image';
const Profile = () => {
    const { userInfo, userUpdated } = useRoot();
    const [preview, setPreview] = useState(false);
    const [image, setImage] = useState(null);

    const handleClose = () => {
        setPreview(false)
    }
    return (
        <>
            <div className="okv4-container ">
                <div className="ok-breadcrumb">
                    <ul>
                        <li>
                            <Link href="https://www.onlinekhabar.com/" target='_blank'>अनलाइनखबर </Link>
                        </li>
                        <li>
                            <Link href="/">क्यालेन्डर</Link>
                        </li>
                        <li className='active'>
                            प्रोफाइल
                        </li>
                    </ul>
                </div>

                <div className="ok-bg">
                    <div className="ok-desc-content mt-1 p-0">
                        <h4 className='ok-main-title'>
                            प्रोफाइल
                        </h4>
                        {userInfo && (
                            <div className="ok-my-profile">

                                <div className="ok-user__profile" onClick={() => {
                                    setPreview(true);
                                    setImage(userInfo && userInfo.photo)
                                }}>
                                    {
                                        userInfo && userInfo.photo ? (
                                            <>
                                                <img src={userInfo.photo} alt="User Image" />
                                            </>
                                        ) : (
                                            // <span>
                                            //     {
                                            //         userInfo && userInfo.display_name && userInfo.display_name.charAt(0)
                                            //     }
                                            // </span>
                                            <Image
                                                width={80}
                                                height={80}
                                                src="/img/ok-user.png"
                                                alt='user'
                                            />
                                        )
                                    }
                                </div>
                                <div className='user-profile-info'>

                                    <span>
                                        {userInfo.display_name}
                                    </span>
                                    <span>
                                        {userInfo.email}
                                    </span>

                                    {/* {
                                        userInfo.bio && (
                                            <div className="ok-content mt-1">
                                                <p>
                                                    {userInfo.bio}
                                                </p>
                                            </div>
                                        )
                                    } */}

                                    {
                                        userInfo.bio && (

                                            <div className="ok-content mt-2">
                                                <h2 className='ok-bio-title'>छोटो परिचय</h2>
                                                <p>
                                                    {userInfo.bio}
                                                </p>
                                            </div>
                                        )
                                    }
                                    <div className='mt-2'>
                                        <Link href="/edit-profile" className="btn primary primary-gradient ">प्रोफाइल सम्पादन गर्नुहोस्</Link>
                                    </div>

                                    {
                                        userUpdated && (

                                            <div className="form-message ok-form-response-message ok-success mt-10">
                                                Profile Updated Successfully!
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                        )}
                    </div>

                </div>




            </div>

            {
                preview && <ProfilePreview onClose={handleClose} image={image} />
            }
        </>
    );
};

export default Profile;