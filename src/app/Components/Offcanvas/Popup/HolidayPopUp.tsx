// "use client"
// import React, { useEffect, useState } from 'react'
// import Link from 'next/link';
// import { getRemainingDays, nepaliDaysRemaining } from '../../../../hooks'
// import { useRoot } from '../../../../context';

// const HolidayPopUp = ({ onClose, data }) => {
//   const { animation, setAnimation, setClickedDate, dropdownitem } = useRoot();
//   const handleClick = (data) => {
//     onClose()
//     setClickedDate({
//       date: data?.date?.ad_concat_date_en
//     });
//     setAnimation(false);
//     setTimeout(() => {
//       setAnimation(true);
//     }, 0);
//     setTimeout(() => {
//       setAnimation(false);
//     }, 5000);
//   }

//   useEffect(() => {
//     // Scroll to the element with the "animation" class in the middle of the viewport
//     const animationElement = document.querySelector('.animation');
//     if (animationElement) {
//       const topOffset = animationElement.getBoundingClientRect().top;
//       const middleOfViewport = window.innerHeight / 2;
//       window.scrollTo({
//         top: window.pageYOffset + topOffset - middleOfViewport,
//         behavior: 'smooth'
//       });
//     }
//   }, [animation])
//   return (
//     <>
//       <div className="custom__popup reminder__popup active">
//         <div className="overlay" onClick={onClose}></div>
//         <div className="custom__popup__model">
//           <div className="custom__popup__head">
//             <div>
//               <h2>सबै बिदाहरु</h2>
//             </div>
//             <div className="reminder__popup__close close__popup" onClick={onClose}>
//               <img src="./img/close.png" alt="close" />
//             </div>
//           </div>
//           <div className="custom__popup__content">
//             <div className="grid-item grid-item-2 grid-gap-20">
//               {data && data.length > 0 ? (
//                 data.map((holiday) => {
//                   const remainingDays = getRemainingDays(holiday?.date?.ad_concat_date_en)
//                   return (
//                     <div key={holiday.id}>
//                       <div className={`card-day-event ${holiday.is_public_holiday === true ? 'is-holiday' : ''}`}>
//                         <div className="event-day-date">
//                           {holiday.date.bs_date_np}
//                           <span>{holiday.date.day_np.replace("वार", "")}</span>
//                         </div>
//                         <div className="event-day-info">
//                           <Link
//                             scroll={false}
//                             prefetch={false}
//                             onClick={() => handleClick(holiday)}
//                             href={`${dropdownitem === "वि.सं." ? "bs" : "ad"}?year=${dropdownitem === "वि.सं." ? holiday?.date?.bs_year_en : holiday?.date.ad_year_en}&month=${dropdownitem === "वि.सं." ? holiday?.date?.bs_month_code_en : holiday?.date?.ad_month_code_en}`}>
//                             {holiday.event_title_np}
//                           </Link>
//                           <span>{holiday.date.bs_month_np} {holiday.date.bs_date_np}, {holiday.date.bs_year_np} - {holiday.date.ad_date_en}, {holiday.date.ad_year_en}</span>
//                         </div>

//                         <div className="event-day-reminder">{nepaliDaysRemaining(remainingDays)}</div>
//                       </div>
//                     </div>
//                   )
//                 })
//               ) : (
//                 <div>No holidays</div>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>



//     </>
//   )
// }

// export default HolidayPopUp