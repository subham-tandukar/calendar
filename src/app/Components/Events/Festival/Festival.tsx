"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../../context';

const Festival = ({ festivaldata, currentnepalimonth }) => {
  const { animation, setAnimation, setClickedDate, dropdownitem } = useRoot();

  const handleClick = (data) => {
    setClickedDate({
      date: data?.date?.ad_concat_date_en
    });
    setAnimation(false);
    setTimeout(() => {
      setAnimation(true);
    }, 0);
    setTimeout(() => {
      setAnimation(false);
    }, 5000);
  }

  useEffect(() => {
    // Scroll to the element with the "animation" class in the middle of the viewport
    const animationElement = document.querySelector('.animation');
    if (animationElement) {
      const topOffset = animationElement.getBoundingClientRect().top;
      const middleOfViewport = window.innerHeight / 2;
      window.scrollTo({
        top: window.pageYOffset + topOffset - middleOfViewport,
        behavior: 'smooth'
      });
    }
  }, [animation])

  return (
    <>
      <div className="card-all-festivals">
        <h3>{currentnepalimonth} का पर्वहरू</h3>

        <div className="tags-wrapper" >
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
            <p>No data available</p>
          )}
        </div>

      </div>
    </>
  );
};

export default Festival;