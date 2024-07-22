
import Image from 'next/image';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Logout = ({ onClose, onLogout }) => {
    return (
        <>
            <div className="ok-custom__popup active yr-month__popup popup__small">
                <div className="overlay" onClick={onClose}></div>
                <div className="ok-custom__popup__model">
                    <div className="ok-custom__popup__head">
                        <div>
                            <h2>लग-आउट</h2>
                        </div>
                        <div onClick={onClose} className="yr-month__popup__close close__popup">
                        <FaTimes />
                        </div>
                    </div>
                    <div className="ok-custom__popup__content">

                        <p>
                            के तपाइँ लगआउट गर्न चाहनुहुन्छ?
                        </p>

                        <div className='ok-footer__btn'>
                            <button
                                type="button"
                                onClick={onLogout}
                                className="btn primary primary-gradient"
                            >
                                चाहन्छु
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn danger "
                            >
                                चाहन्न
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Logout;