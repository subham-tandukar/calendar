"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../../context';
const SidebarRashifal = () => {
    const { singleRashi } = useRoot()

    return (
        <>
            {
                singleRashi && (
                    <div className="ok-rashifal-sidebar">
                        <div className="ok-rashi-profile-list">
                            <h2>
                                <img src={singleRashi?.rashi_data?.icon} alt={singleRashi.name} />
                                {singleRashi.name} राशि - प्रोफाइल
                            </h2>

                            <div
                                className='ok-rashi-profile-list-grid'
                                dangerouslySetInnerHTML={{ __html: singleRashi?.rashi_data?.rashi_profile }}
                            />

                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SidebarRashifal