"use client"
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { IoClose  } from 'react-icons/io5'


const PermissionPopup = ({ onClose, data }) => {
 

    return (
        <>
            <div className="ok-custom__popup reminder__popup active popup__big">
                <div className="overlay" onClick={onClose}></div>
                <div className="ok-custom__popup__model">
                    <div className="ok-custom__popup__head">
                        <div>
                            <h2>{data.title_np}</h2>
                        </div>
                        <div className="reminder__popup__close close__popup" onClick={onClose}>
                            {/* <img src="./img/close.png" alt="close" /> */}
                            <FaTimes />
                        </div>
                    </div>
                    <div className="ok-custom__popup__content">
                       
                        <iframe
                            src={data.file}
                            width="100%"
                            allowFullScreen
                            height={700}
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PermissionPopup