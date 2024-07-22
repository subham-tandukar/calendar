"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import BullionGraph from './BullionGraph';
import TodayBullion from './TodayBullion';


const BullionSidebar = () => {

    return (
        <>
            <TodayBullion isHome="false" />

            {/* <BullionGraph /> */}

        </>
    );
};

export default BullionSidebar