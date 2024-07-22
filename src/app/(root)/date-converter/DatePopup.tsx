"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';

const DatePopup = ({ onClose, data }) => {

    return (
        <>
            <div className="ok-custom__popup reminder__popup active popup__small">
                <div className="overlay" onClick={onClose}></div>
                <div className="ok-custom__popup__model">
                    <div className="ok-custom__popup__head">
                        <div>
                            <h2>रूपान्तरित मिति</h2>
                        </div>
                        <div className="reminder__popup__close close__popup" onClick={onClose}>
                            <FaTimes />
                        </div>
                    </div>
                    <div className="ok-custom__popup__content">
                        <div className="converted-date">
                            {data()}
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default DatePopup