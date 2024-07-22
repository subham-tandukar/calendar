"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../../context';

const Festival = ({ festivaldata }) => {
  const { animation, setAnimation, setClickedDate, dropdownitem , siteSetting} = useRoot();

  const handleClick = (data) => {
    setClickedDate({
      date: data?.date?.ad_concat_date_en
    });
    setAnimation(true);
    // setTimeout(() => {
    //   setAnimation(true);
    // }, 0);
    // setTimeout(() => {
    //   setAnimation(false);
    // }, 5000);
  }



  return (
    <>
      <div className="ok-card-all-festivals">
        <h3>{siteSetting?.sidebar_trending_parva_cta_np}</h3>

        <div className="ok-tags-wrapper" >
          {festivaldata && festivaldata.length > 0 ? (
            festivaldata.map((festival, index) => (
              <Link
                scroll={false}
                prefetch={false}
                onClick={() => handleClick(festival)}
                href={`${dropdownitem === "वि.सं." ? "bs" : "ad"}?year=${dropdownitem === "वि.सं." ? festival?.date?.bs_year_en : festival?.date.ad_year_en}&month=${dropdownitem === "वि.सं." ? festival?.date?.bs_month_code_en : festival?.date?.ad_month_code_en}`}
                key={index}
              >{festival.event_title_np}</Link>
            ))
          ) : (
            <p>कुनै डाटा उपलब्ध छैन</p>
          )}
        </div>

      </div>
    </>
  );
};

export default Festival;