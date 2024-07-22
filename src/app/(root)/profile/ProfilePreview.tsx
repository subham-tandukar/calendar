
import Image from 'next/image';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const ProfilePreview = ({ onClose, image }) => {
    return (
        <>
            <div className="ok-custom__popup active popup__big image__preview">
                <div className="overlay" onClick={onClose}></div>
                <div className="ok-custom__popup__model">

                    <div className="">

                        <div onClick={onClose} className="close__popup">
                            <FaTimes />
                        </div>
                        {
                            image ? (

                                <img src={image} alt="User Profile" />
                            ) : (

                                <Image
                                    width={300}
                                    height={300}
                                    src="/img/ok-user.png"
                                    alt='user'
                                />
                            )
                        }

                    </div>


                </div>
            </div>
        </>
    );
};

export default ProfilePreview;