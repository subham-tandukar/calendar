import React from 'react'

const PanchangOffCanvas = ({onclose , Selecteddate}) => {
  return (
<>
<div className ="panchanga__offcanvas custom__offcanvas active">
      <div className ="overlay" onClick={onclose}></div>

      <div  onClick={onclose} className ="panchanga__offcanvas__close close__offcanvas">
        <img src="./img/close.png" alt="close" />
      </div>

      <div className ="offcanvas__content panchanga__content">
        <div className ="panchanga">
          <div className ="flex-row">
            <img src="./img/icon-panchanga2.png" alt="" />
            <h2 className ="the__title">पंचाङ्ग</h2>
          </div>
          <div className ="panchanga__data">
            <div className ="wrapper">
              <div className ="title">तारिख:</div>
              <div className ="txt">{Selecteddate.ad_month_np} {Selecteddate.ad_date_np}, {Selecteddate.ad_year_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title">पक्ष:</div>
              <div className ="txt">{Selecteddate.panchanga.pakshya_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title">चन्द्र राशि:</div>
              <div className ="txt">{Selecteddate.panchanga.chandra_rashi_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title">सूर्य राशि:</div>
              <div className ="txt">{Selecteddate.panchanga.surya_rashi_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title">सूर्योदय</div>
              <div className ="txt">{Selecteddate.panchanga.sunrise_np}</div>
            </div>
            
            <div className ="wrapper">
              <div className ="title">नक्षत्र समाप्ति समय:</div>
              <div className ="txt">{Selecteddate.panchanga.nakshatra_end_time_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title">योग:</div>
              <div className ="txt">{Selecteddate.panchanga.yog_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title"> प्रथम करण:</div>
              <div className ="txt">{Selecteddate.panchanga.pratham_karan_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title">अयान:</div>
              <div className ="txt">{Selecteddate.panchanga.ayan_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title">ऋतु:</div>
              <div className ="txt">{Selecteddate.panchanga.ritu_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title">सूर्यास्त:</div>
              <div className ="txt">{Selecteddate.panchanga.sunset_np}</div>
            </div>
            <div className ="wrapper">
              <div className ="title">करण:</div>
              <div className ="txt">n/a</div>
            </div>
    
          </div>
        </div>
      </div>
    </div>
   



</>
  )
}

export default PanchangOffCanvas