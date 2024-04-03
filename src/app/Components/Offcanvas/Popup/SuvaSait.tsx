// import React from 'react';

// const SuvaSait = ({ onClose, saitData, saitList, setSaitId, saitid, saitLoading }) => {
//     console.log(saitLoading)
//     return (
//         <>
//             <div className="custom__popup active suvasait">
//                 <div className="overlay" onClick={onClose}></div>
//                 <div className="custom__popup__model">
//                     <div className="custom__popup__head">
//                         <div>
//                             <h2>साईत</h2>
//                         </div>
//                         <div onClick={onClose} className="suvasait__popup__close close__popup">
//                             <img src="./img/close.png" alt="close" />
//                         </div>
//                     </div>
//                     <div className="custom__popup__content">
//                         <div>
//                             <div className="wrapper">
//                                 <div className="btn__wrapper">
//                                     {
//                                         saitData.length > 0 && (
//                                             <>
//                                                 {
//                                                     saitData.map((data) => (
//                                                         <div className="category__btn" key={data.id}>
//                                                             <input type="radio" onChange={() => setSaitId(data.id)} checked={saitid === data.id} id={data.title_en} name="suvaSait" />
//                                                             <div className="dot" style={{ background: '#1A164224' }}></div>
//                                                             <label className="category__label " htmlFor={data.title_en}>{data.title_np}</label>
//                                                         </div>
//                                                     ))
//                                                 }
//                                             </>
//                                         )
//                                     }
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             {
//                                 saitLoading ? (
//                                     <div style={{ position: "relative" }}>
//                                         <span className="loader"></span>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         {
//                                             saitList.length > 0 && (
//                                                 <>
//                                                     {
//                                                         saitList.map((data) => {
//                                                             return (
//                                                                 <div className="mt-2">

//                                                                     <div className="card-day-event">
//                                                                         <div>
//                                                                             <div className="suvasait-label">
//                                                                                 {data?.data[0]?.bs_year_np}, <span>{data?.data[0]?.bs_month_np}</span> महिनाका साईतहरु
//                                                                             </div>

//                                                                             <div className="sait-dates">
//                                                                                 <>
//                                                                                     {
//                                                                                         data?.data.length > 0 ? (
//                                                                                             <>
//                                                                                                 {
//                                                                                                     data?.data.map((item) => (
//                                                                                                         <div>
//                                                                                                             <span>{item.bs_date_np}</span>
//                                                                                                             <div className="sait-date-bottom">
//                                                                                                                 {item.ad_date_np}
//                                                                                                             </div>
//                                                                                                         </div>
//                                                                                                     ))
//                                                                                                 }
//                                                                                             </>
//                                                                                         ) : (
//                                                                                             <span>
//                                                                                                 No data
//                                                                                             </span>
//                                                                                         )
//                                                                                     }
//                                                                                 </>


//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             )
//                                                         })
//                                                     }
//                                                 </>
//                                             )
//                                         }
//                                     </>
//                                 )
//                             }



//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SuvaSait;