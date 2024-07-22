"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Advertisement = ({ advertisement, handleClick }) => {

    return (
        <>
            {
                advertisement && (
                    <>
                        {
                            advertisement && advertisement?.ad_banner && (
                                <div className="ok-desktop__view">
                                    <Link href={advertisement && advertisement?.url || "#"} target='_blank' onClick={handleClick}>
                                        <img src={advertisement && advertisement?.ad_banner} alt="Online Khabar Calendar Advertisement" />
                                    </Link>
                                </div>
                            )
                        }
                        {
                            advertisement && advertisement?.ad_banner_mobile && (

                                <div className="ok-mobile__view">
                                    <Link href={advertisement && advertisement?.url || "#"} target='_blank' onClick={handleClick}>
                                        <img src={advertisement && advertisement?.ad_banner_mobile} alt="Online Khabar Calendar Advertisement" />
                                    </Link>
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    )

}

export default Advertisement