/* okcalendar.js */
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const arabicToDevanagari = (number) => {
  const arabicDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const devanagariDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

  const arabicNumberString = number.toString();
  let devanagariNumberString = "";

  for (let i = 0; i < arabicNumberString.length; i++) {
    const digit = arabicNumberString.charAt(i);
    const index = arabicDigits.indexOf(digit);
    if (index !== -1) {
      devanagariNumberString += devanagariDigits[index];
    } else {
      devanagariNumberString += digit;
    }
  }

  return devanagariNumberString;
};

// Function to get the current Nepali time
const getNepaliTime = () => {
  const date = new Date();
  const utcOffset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const nepalOffset = 5.75 * 3600000; // 5 hours 45 minutes in milliseconds
  const nepalTime = new Date(date.getTime() + utcOffset + nepalOffset);

  const hours = String(nepalTime.getHours()).padStart(2, "0");
  const minutes = String(nepalTime.getMinutes()).padStart(2, "0");
  return `${arabicToDevanagari(hours)}:${arabicToDevanagari(minutes)}`;
};

// Cache object
const todayCache = {
  data: {},
};
const fetchTodayData = async (url) => {
  if (todayCache[url]) {
    return todayCache[url];
  }
  const response = await fetch(url);
  const todaydata = await response.json();
  todayCache[url] = todaydata;
  return todaydata;
};

// Cache object
const holidaysCache = {
  data: {},
};
const fetchHolidaysData = async (url) => {
  if (holidaysCache[url]) {
    return holidaysCache[url];
  }
  const response = await fetch(url);
  const holidaysdata = await response.json();
  holidaysCache[url] = holidaysdata;
  return holidaysdata;
};

let todayYear;
let todayMonth;

const handlePrev = async (container, widgetType, data, width) => {
  todayYear = todayMonth === 1 ? todayYear - 1 : todayYear;
  todayMonth = todayMonth === 1 ? 12 : todayMonth - 1;
  await fetchDataAndRender(container, widgetType, data, width);
};

const handleNext = async (container, widgetType, data, width) => {
  todayYear = todayMonth === 12 ? todayYear + 1 : todayYear;
  todayMonth = todayMonth === 12 ? 1 : todayMonth + 1;
  await fetchDataAndRender(container, widgetType, data, width);
};

const getPreviousMonth = (year, month) => {
  let previousMonth = month - 1;
  let previousYear = year;
  if (previousMonth < 1) {
    previousMonth = 12;
    previousYear--;
  }
  return { previousYear, previousMonth };
};

const getNextMonth = (year, month) => {
  let nextMonth = parseInt(month) + 1;
  let nextYear = year;
  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear++;
  }
  return { nextYear, nextMonth };
};

export const getRemainingDays = (selectedDateString) => {
  if (!selectedDateString) return 0; // Add a check for undefined or null

  // Parse the selected date string
  const selectedDate = new Date(selectedDateString);

  // Check if the selected date is valid
  if (isNaN(selectedDate.getTime())) {
    console.error("Invalid date format. Please provide a date in ISO format.");
    return 0;
  }

  // Get the current date and set it to the start of the day
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Set the selected date to the start of the day
  selectedDate.setHours(0, 0, 0, 0);

  // Calculate the difference in days
  const differenceInTime = selectedDate.getTime() - currentDate.getTime();
  const remainingDays = differenceInTime / (1000 * 3600 * 24);

  return Math.ceil(remainingDays);
};

export const nepaliDaysRemaining = (remainingDays) => {
  if (remainingDays === -1) {
    return `हिजो`;
  } else if (remainingDays === 0) {
    return `आज`;
  } else if (remainingDays === 1) {
    return `भोलि`;
  } else if (remainingDays > 0 && remainingDays !== 1) {
    if (remainingDays > 365) {
      const yearsLeft = Math.floor(remainingDays / 365);
      const remainingDaysAfterYears = remainingDays % 365;
      if (remainingDaysAfterYears > 30) {
        const monthsLeft = Math.floor(remainingDaysAfterYears / 30);
        return `
                      ${arabicToDevanagari(yearsLeft)}
                      वर्ष 
                      ${arabicToDevanagari(monthsLeft)}
                      महिना बाँकी
                  `;
      } else {
        return `
                      ${arabicToDevanagari(yearsLeft)}
                      वर्ष 
                      ${arabicToDevanagari(remainingDaysAfterYears)}
                      दिन बाँकी
                  `;
      }
    } else if (remainingDays > 30) {
      const monthsLeft = Math.floor(remainingDays / 30);
      return `
                  ${arabicToDevanagari(monthsLeft)}
                  महिना बाँकी
              `;
    } else {
      return `
                  ${arabicToDevanagari(remainingDays)}
                  दिन बाँकी
             `;
    }
  } else if (remainingDays < 0) {
    // Handling past dates
    if (Math.abs(remainingDays) > 365) {
      const yearsAgo = Math.floor(Math.abs(remainingDays) / 365);
      const remainingDaysAfterYears = Math.abs(remainingDays) % 365;
      if (remainingDaysAfterYears > 30) {
        const monthsAgo = Math.floor(remainingDaysAfterYears / 30);
        return `
                      ${arabicToDevanagari(yearsAgo)}
                      वर्ष पहिले 
                      ${arabicToDevanagari(monthsAgo)}
                      महिना पहिले
                  `;
      } else {
        return `
                      ${arabicToDevanagari(yearsAgo)}
                      वर्ष पहिले 
                      ${arabicToDevanagari(remainingDaysAfterYears)}
                      दिन पहिले
                 `;
      }
    } else if (Math.abs(remainingDays) > 30) {
      const monthsAgo = Math.floor(Math.abs(remainingDays) / 30);
      return `
                  ${arabicToDevanagari(monthsAgo)}
                  महिना पहिले
              `;
    } else {
      return `
                  ${arabicToDevanagari(Math.abs(remainingDays))}
                  दिन पहिले
              `;
    }
  } else {
    return null;
  }
};

const customPopup = () =>
  `
  <div class="ok-custom__popup popup__small ok-month-popup">
      <div class="ok-overlay"></div>
      <div class="ok-custom__popup__model">
        <div class="ok-close__popup">
          <svg stroke="currentColor" fill="#555" stroke-width="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </div>

        <div class="ok-custom__popup__content">
        </div>
      </div>
      </div>
    </div>
  `;
const customPopupSm = () =>
  `
  <div class="ok-custom__popup popup__small ok-month-sm-popup">
      <div class="ok-overlay"></div>
      <div class="ok-custom__popup__model">
        <div class="ok-close__popup">
          <svg stroke="currentColor" fill="#555" stroke-width="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </div>

        <div class="ok-custom__popup__content">
        </div>
      </div>
      </div>
    </div>
  `;

const popUp = (data) => {
  const remainingDays = getRemainingDays(String(data?.ad_full_date_en));
  return `
        <div class="ok-month-popup">
          <div class="ok-day-circle">
            ${data.bs_date_np}
          </div>

          <div class="ok-month-info">
            <div class="ok-day-date">
            ${data.bs_month_np} ${data.bs_year_np}
              <span class="ok-day-current">
                ${data.day_np}
              </span>
            </div>

            <div class="ok-day-site-info">
              ${data.tithi_title_np} 
              
                ${data.sunrise_np ? 
                  `<span class="ok-day-sunrise">
                    सूर्योदय ${data.sunrise_np}
                  </span>
                  `
                  : "" 
                }

                 ${data.sunset_np ? 
                  `<span class="ok-day-sunrise">
                    सूर्यास्त ${data.sunset_np}
                  </span>
                  `
                  : "" 
                }
            </div>

            <div>
              <span class="ok-badge ok-eng-font">
                ${data.ad_month_en} ${data.ad_date_en}, ${data.ad_year_en}, ${data.day_en}
              </span>
            </div>
          </div>
        </div>

        <div class="ok-month-event">
          <h2 class="ok-title">
           कार्यक्रमहरू

           ${
             data.events.length > 0
               ? `
              <span class="ok-badge ${
                data.day_en === "Saturday" ||
                data?.events[0].is_public_holiday === true
                  ? "ok-event-holiday"
                  : ""
              }">
              ${nepaliDaysRemaining(remainingDays)}
              </span>
              `
               : ``
           }
          
          </h2>

          ${
            data.events.length > 0
              ? `
            <div class="ok-month-event-list">
              <ul>
              ${data.events
                .map(
                  (event, i) =>
                    `
                <li key=${event.id} class="${
                      event?.is_public_holiday === true ||
                      data.day_en === "Saturday"
                        ? "danger"
                        : ""
                    }">${event.event_title_np}</li>
                `
                )
                .join("")}
              </ul>
            </div>
            `
              : `
            <div class="ok-null-data">
            कुनै कार्यक्रमहरू उपलब्ध छैनन्
            </div>
            `
          }

        </div>

        <div class="ok-month-panchanga">
          <h2 class="ok-title">
            पञ्चाङ्ग
          </h2>

          <div class="ok-month-panchanga-list">
            <div class="ok-wrapper">
              <div>
                तारिख:
              </div>
              <div class="ok-eng-font">
              ${data.ad_month_en} ${data.ad_date_en}, ${data.ad_year_en}
              </div>
            </div>

            <div class="ok-wrapper">
              <div>
                पक्ष:
              </div>
              <div>
              ${data.pakshya_np || "-"}
              </div>
            </div>

            <div class="ok-wrapper">
              <div>
                सूर्योदय:
              </div>
              <div>
              ${data.sunrise_np || "-"} 
              </div>
            </div>

            <div class="ok-wrapper">
              <div>
                सूर्यास्त:
              </div>
              <div>
              ${data.sunset_np || "-"} 
              </div>
            </div>

            <div class="ok-wrapper">
              <div>
                ऋतु:
              </div>
              <div>
              ${data.ritu_np || "-"}
              </div>
            </div>

            <div class="ok-wrapper">
              <div>
                तिथी:
              </div>
              <div>
              ${data.tithi_title_np || data.tithi_end_time_np  ?  
                data.tithi_title_np + data.tithi_end_time_np + "बजेसम्म" :
              "-"
              }
              </div>
            </div>
          </div>
      
  `;
};

const handlePopup = (data) => {
  const OKbody = document.querySelector("body");
  const OKpopUp = document.querySelector(".ok-month-popup");
  const OKpopUpContent = document.querySelector(".ok-month-popup .ok-custom__popup__content");

  if (OKbody) {
    OKbody.classList.add("ok-popup-open");
  }
  if (OKpopUp) {
    OKpopUpContent.innerHTML = popUp(data);
    OKpopUp.classList.add("active");
  }
};
const handlePopupSm = (data) => {
  const OKbody = document.querySelector("body");
  const OKpopUp = document.querySelector(".ok-month-sm-popup");
  const OKpopUpContent = document.querySelector(".ok-month-sm-popup .ok-custom__popup__content");

  if (OKbody) {
    OKbody.classList.add("ok-popup-open");
  }
  if (OKpopUp) {
    OKpopUpContent.innerHTML = popUp(data);
    OKpopUp.classList.add("active");
  }
};

const handleClose = () => {
  const OKbody = document.querySelector("body");
  const OKpopUp = document.querySelector(".ok-month-popup");
  OKbody.classList.remove("ok-popup-open");
  OKpopUp.classList.remove("active");
};
const handleCloseSm = () => {
  const OKbody = document.querySelector("body");
  const OKpopUp = document.querySelector(".ok-month-sm-popup");
  OKbody.classList.remove("ok-popup-open");
  OKpopUp.classList.remove("active");
};

// Cache object
const cache = {
  calendarData: {},
  previousData: {},
  nextMonthData: {},
};

const fetchData = async (url) => {
  if (cache[url]) {
    return cache[url];
  }
  const response = await fetch(url);
  const data = await response.json();
  cache[url] = data;
  return data;
};

const getPreviousArray =(calendarData,previousData)=>{
  const dayCode = calendarData.data[0].day_code_en;
  const dayEn = calendarData.data[0].day_en;
  const prevDayCode = dayCode - 1;

  let prevArray;
  if (dayEn === "Sunday") {
    prevArray = [];
  } else {
    prevArray = previousData.data.slice(-prevDayCode);
  }

  return prevArray;
}

const getNextArray =(calendarData,nextMonthData)=>{
  const lastDayCode =
    calendarData.data[calendarData.data.length - 1].day_code_en;
  const nextDayCode = 7 - lastDayCode;
  const nextArray = nextMonthData.data.slice(0, nextDayCode);

  return nextArray;
}

const noData = () =>
  `<div class="ok-calendar">
      <div class="ok-card ok-error">
        <h2 class="ok-error-title">Error Loading Widget</h2>
        <p class="ok-error-content">There was an error loading the widget data.</p>
      </div>
    </div>`;

const okDay = (data, width) =>
  `<div class="ok-calendar">
  <a class="ok-card-target" href="${process.env.NEXT_PUBLIC_LIVE_URL}" target="_blank">
    <div class="ok-card ok-day">
      <div class="ok-day-circle">
        ${data.data.bs_date_np}
      </div>
      <div class="ok-day-info">
        <div class="ok-day-date">
          ${data.data.bs_month_np}
          ${data.data.bs_year_np}
          <span class="ok-eng-font ok-badge">
            ${data.data.ad_month_en} ${data.data.ad_date_en}, ${
    data.data.ad_year_en
  }
          </span>

          <span class="ok-day-season ok-badge">
            ऋतु : <small>${data.data.panchanga.hritu.title_np}</small>
          </span>
        </div>

        <div class="ok-day-site-info">
          ${data.data?.tithi?.tithi_title_np}
          <span class="ok-day-sunrise">
            सूर्योदय ${data.data.panchanga.sunrise_np} 
          </span>
          <span class="ok-day-sunrise">
            सूर्यास्त ${data.data.panchanga.sunset_np} 
          </span>
          <span class="ok-day-current">
            ${data.data.day_np} 
          </span>
          <span class="ok-day-time">
            ${getNepaliTime()}
          </span>
        </div>
      </div>
    </div>
  </a>
</div>`;

const okDaySmall = (data, width) =>
  `<div class="ok-calendar">
        <a class="ok-card-target" href="${process.env.NEXT_PUBLIC_LIVE_URL}" target="_blank">
          <div class="ok-card ok-day-sm">
            <div class="ok-card-date-info">
              ${data.data.bs_date_np}
              <span>${data.data.day_np.replace("वार", "")}</span>
            </div>
            <div class="ok-flex">
              <div class="ok-card-info">
                <div class="ok-flex ok-flex-m">
                  ${data.data?.events
                    .slice(0, 1)
                    .map(
                      (event, index) =>
                        `<p><span key=${index}>${event?.event_title_np} -</span></p>`
                    )
                    .join("")}
                  <p class="ok-card-tithi">
                    ${data.data?.tithi?.tithi_title_np}
                  </p>
                </div>
                <div class='ok-card-flex'>
                  <span>
                    ${data.data.bs_month_np} ${data.data.bs_date_np}, ${
    data.data.bs_year_np
  }
                  </span>
                  -
                  <span class='ok-eng-font'>
                    ${data.data.ad_month_en.slice(0, 3)} ${
    data.data.ad_date_en
  }, ${data.data.ad_year_en}
                  </span>
                </div>
              </div>
              <div>
                <span class="ok-card-event">
                  ${
                    data.data?.events?.length - 1 >= 1
                      ? `+ ${data.data?.events?.length - 1}`
                      : ""
                  }
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>`;

const okMonth = (
  calendarData,
  previousData,
  nextMonthData,
  todayData,
  width
) => {
  const daysOfWeek =[
    {
      nep:"आइतवार",
      eng:"SUN"
    },
    {
      nep:"सोमवार",
      eng:"MON"
    },
    {
      nep:"मंगलवार",
      eng:"TUE"
    },
    {
      nep:"बुधवार",
      eng:"WED"
    },
    {
      nep:"बिहीवार",
      eng:"THU"
    },
    {
      nep:"शुक्रवार",
      eng:"FRI"
    },
    {
      nep:"शनिवार",
      eng:"SAT"
    },
  ]

  const disabledHtml = (data, index) =>
      `<div 
          class="ok-month-col ok-disabled-month"
          key=${index}
          >
          <div class="ok-month-col-date">
            <span>${data.bs_date_np}</span>
          </div>

          <div class="ok-month-col-left">
            <span>${data?.tithi?.tithi_title_np || ""}</span>
          </div>

          <div class="ok-month-col-right">
            <span class="ok-eng-font">
              ${data.ad_date_en}
            </span>
          </div>
      </div>`;

  const prevArray = getPreviousArray(calendarData, previousData)

  const previousHTML = `${prevArray
    .map((data, index) => disabledHtml(data, index))
    .join("")}`;

  const nextArray = getNextArray(calendarData, nextMonthData)

  const nextHTML = `${nextArray
    .map((data, index) => disabledHtml(data, index))
    .join("")}`;

  let calendarHTML = `<div class="ok-calendar">
        <div class="ok-card ok-month">

        <div class="ok-month-header">
          
          <div class="ok-month-prev ok-month-jump-between">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
          </div>

          <div class="ok-month-selected">
            <span>
            ${calendarData.data[0].bs_month_np}
            </span>

            <span class="ok-eng-font">
            ${calendarData.currentMonthsAd[0].slice(0, 3)}
            <small>/</small>
            ${calendarData.currentMonthsAd[1].slice(0, 3)}
            ${" "}
            ${calendarData.currentMonthsAd[2]}
            </span>
          </div>

          <div class="ok-month-next ok-month-jump-between">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
          </div>
        </div>

        <div class="ok-month-sm-body">
          ${daysOfWeek
            .map(
              (days, index) =>
                `<div class="ok-month-days" key=${index}>
                  ${days.nep}
                  <span>${days.eng}</span>
                </div>`
            )
            .join("")}

          ${previousHTML}

          ${calendarData.data
            .map(
              (data, index) =>
                `<div 
              class="ok-month-col ok-month-col-click
              ${
                data.bs_date_np === todayData.bs_date_np &&
                data.bs_month_code_en === todayData.bs_month_code_en &&
                data.bs_year_en === todayData.bs_year_en &&
                data.day_en === "Saturday"
                  ? "ok-month-today-holiday"
                  : data.bs_date_np === todayData.bs_date_np &&
                    data.bs_month_code_en === todayData.bs_month_code_en &&
                    data.bs_year_en === todayData.bs_year_en &&
                    data?.events[0]?.is_public_holiday === true
                  ? "ok-month-today-holiday"
                  : data.bs_date_np === todayData.bs_date_np &&
                    data.bs_month_code_en === todayData.bs_month_code_en &&
                    data.bs_year_en === todayData.bs_year_en
                  ? "ok-month-today"
                  : data.day_en === "Saturday"
                  ? "ok-month-holiday"
                  : data?.events[0]?.is_public_holiday === true
                  ? "ok-month-holiday"
                  : ""
              }
              "
                key=${index}

                data-bs_date_np="${data.bs_date_np}"
                data-bs_month_np="${data.bs_month_np}"
                data-bs_year_np="${data.bs_year_np}"
                data-day_np="${data.day_np}"
                data-tithi_title_np="${data?.tithi ? data?.tithi?.tithi_title_np : ""}"
                data-sunrise_np="${data?.panchanga ? data?.panchanga.sunrise_np : ""}"
                data-sunset_np="${data?.panchanga ? data?.panchanga.sunset_np : ""}"
                data-ad_month_en="${data.ad_month_en}"
                data-ad_date_en="${data.ad_date_en}"
                data-ad_year_en="${data.ad_year_en}"
                data-day_en="${data.day_en}"
                data-ad_full_date_en="${data.ad_full_date_en}"
                data-events='${JSON.stringify(data.events)}'
                data-pakshya_np="${data?.panchanga ? data?.panchanga?.pakshya_np : ""}"
                data-ritu_np="${data?.panchanga ? data?.panchanga?.ritu_np : ""}"
                data-tithi_end_time_np="${data?.tithi ? data?.tithi?.tithi_end_time_np : ""}"
                >

                ${
                  data?.events.length > 0
                    ? `
                    ${data?.events.slice(0,1).map((evt, i) =>
                      `
                        <span class="ok-month-col-top">
                          ${evt?.event_title_np}
                        </span>
                      `
                    ).join("")}
                    `
                    : ""
                }

                <div class="ok-month-col-date">
                  <span>${data.bs_date_np}</span>

                  ${
                  data?.events.length - 1 >= 1
                    ? `
                    <span class="ok-month-col-event ok-for-desktop">
                    + ${data?.events.length - 1}
                    </span>

                    <span class="ok-month-col-event ok-for-mobile">
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path></svg>
                    </span>
                    `
                    : ""
                  }
                  
                </div>

                <div class="ok-month-col-left">
                  <span>${data?.tithi?.tithi_title_np || ""}</span>
                </div>

                <div class="ok-month-col-right">
                  <span class="ok-eng-font">
                    ${data.ad_date_en}
                  </span>
                </div>
            </div>`
            )
            .join("")}

          ${nextHTML}
        </div>
      </div>
    </div>

    ${customPopup()}
    `;

  return calendarHTML;
};      

const okMonthSmall = (
  calendarData,
  previousData,
  nextMonthData,
  todayData,
  width
) => {
  const daysOfWeek = ["आ", "सो", "मं", "बु", "बि", "शु", "श"];

  const disabledHtml = (data, index) =>
    `<div 
          class="ok-month-sm-col ok-disabled-month"
          key=${index}
          >
      ${data.bs_date_np}

      <span class="ok-eng-font">
        ${data.ad_date_en}
      </span>
      </div>`;

 const prevArray = getPreviousArray(calendarData, previousData)

  const previousHTML = `${prevArray
    .map((data, index) => disabledHtml(data, index))
    .join("")}`;

  const nextArray = getNextArray(calendarData, nextMonthData)

  const nextHTML = `${nextArray
    .map((data, index) => disabledHtml(data, index))
    .join("")}`;

  let calendarHTML = `<div class="ok-calendar">
        <div class="ok-card ok-month-sm" style="width: ${width};">

        <div class="ok-month-sm-header">
          
          <div class="ok-month-prev ok-month-jump-between">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
          </div>

          <div class="ok-month-sm-selected">
            <span>
            ${calendarData.data[0].bs_month_np}
            ${calendarData.data[0].bs_year_np}
            </span>

            <span class="ok-eng-font">
            ${calendarData.currentMonthsAd[0].slice(0, 3)}
            <small>/</small>
            ${calendarData.currentMonthsAd[1].slice(0, 3)}
            ${" "}
            ${calendarData.currentMonthsAd[2]}
            </span>
          </div>

          <div class="ok-month-next ok-month-jump-between">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
          </div>
        </div>

        <div class="ok-month-sm-body">
          ${daysOfWeek
            .map(
              (days, index) =>
                `<div class="ok-month-sm-days" key=${index}>
                  ${days}
              </div>`
            )
            .join("")}

          ${previousHTML}

          ${calendarData.data
            .map(
              (data, index) =>
                `<div 
              class="ok-month-sm-col ok-month-sm-col-click
              ${
                data.bs_date_np === todayData.bs_date_np &&
                data.bs_month_code_en === todayData.bs_month_code_en &&
                data.bs_year_en === todayData.bs_year_en &&
                data.day_en === "Saturday"
                  ? "ok-month-today-holiday"
                  : data.bs_date_np === todayData.bs_date_np &&
                    data.bs_month_code_en === todayData.bs_month_code_en &&
                    data.bs_year_en === todayData.bs_year_en &&
                    data?.events[0]?.is_public_holiday === true
                  ? "ok-month-today-holiday"
                  : data.bs_date_np === todayData.bs_date_np &&
                    data.bs_month_code_en === todayData.bs_month_code_en &&
                    data.bs_year_en === todayData.bs_year_en
                  ? "ok-month-today"
                  : data.day_en === "Saturday"
                  ? "ok-month-holiday"
                  : data?.events[0]?.is_public_holiday === true
                  ? "ok-month-holiday"
                  : ""
              }
              "
                key=${index}

                data-bs_date_np="${data.bs_date_np}"
                data-bs_month_np="${data.bs_month_np}"
                data-bs_year_np="${data.bs_year_np}"
                data-day_np="${data.day_np}"
                data-tithi_title_np="${data?.tithi ? data?.tithi?.tithi_title_np : ""}"
                data-sunrise_np="${data?.panchanga ? data?.panchanga.sunrise_np : ""}"
                data-sunset_np="${data?.panchanga ? data?.panchanga.sunset_np : ""}"
                data-ad_month_en="${data.ad_month_en}"
                data-ad_date_en="${data.ad_date_en}"
                data-ad_year_en="${data.ad_year_en}"
                data-day_en="${data.day_en}"
                data-ad_full_date_en="${data.ad_full_date_en}"
                data-events='${JSON.stringify(data.events)}'
                data-pakshya_np="${data?.panchanga ? data?.panchanga?.pakshya_np : ""}"
                data-ritu_np="${data?.panchanga ? data?.panchanga?.ritu_np : ""}"
                data-tithi_end_time_np="${data?.tithi ? data?.tithi?.tithi_end_time_np : ""}"
                >
            ${data.bs_date_np}

            ${
              data?.events.length > 0
                ? `<span class="ok-month-sm-event"></span>`
                : ""
            }

            <span class="ok-eng-font">
            ${data.ad_date_en}
            </span>
            </div>`
            )
            .join("")}

          ${nextHTML}
        </div>
      </div>
    </div>

    ${customPopupSm()}
    `;

  return calendarHTML;
};

const okHolidays = (data, width) => {
  let newData = [];

  data.forEach((event) => {
    const existingEventIndex = newData.findIndex(
      (item) => item.date.bs_concat_date_en === event.date.bs_concat_date_en
    );
    if (existingEventIndex !== -1) {
      // If the event's date matches an existing event in newData, append the event_title_np to the existing one
      newData[
        existingEventIndex
      ].event_title_np += ` | ${event.event_title_np}`;
    } else {
      // If the event's date doesn't match any existing event in newData, push the event into newData
      newData.push({
        ...event,
        event_title_np: event.event_title_np,
      });
    }
  });

  return `<div class="ok-calendar">
      <div class="ok-card ok-holidays">
        <h2>आगामी बिदाहरु</h2>
       ${
         newData.length > 0
           ? `
        ${newData
          .map((data) => {
            const remainingDays = getRemainingDays(
              String(data?.date?.ad_concat_date_en)
            );
            return `
              <div key=${data.id} class="ok-holidays-wrapper">
      
        <div class="ok-card-date-info">
          ${data.date.bs_date_np}
          <span>${data.date.day_np.replace("वार", "")}</span>
        </div>
        <div class="ok-flex">
          <div class="ok-card-info ok-card-holiday-info">
            <div class="ok-flex ok-flex-m">
              
              <p class="ok-card-holiday">
                ${data.event_title_np}
              </p>
            </div>
            <div class='ok-card-flex'>
              <span>
                ${data.date.bs_month_np} ${data.date.bs_date_np}, ${
              data.date.bs_year_np
            }
              </span>
              -
              <span class='ok-eng-font'>
                ${data.date.ad_month_en.slice(0, 3)} ${data.date.ad_date_en}, ${
              data.date.ad_year_en
            }
              </span>
            </div>
          </div>
          <div>
            <span class="ok-card-day-remaining">
            ${nepaliDaysRemaining(remainingDays)}
            </span>
          </div>
          </div>
        </div>
              `;
          })
          .join("")}
        `
           : ``
       }
        
      </div>
    </div>`;
};

async function renderDayWidget(container, widgetType, width) {
  const data = await fetchTodayData(`${baseUrl}/api/v1/calendar/today`);

  if (data) {
    if (widgetType === "ok-day") {
      container.innerHTML = okDay(data, width);
    } else if (widgetType === "ok-day-sm") {
      container.innerHTML = okDaySmall(data, width);
    }
  } else {
    container.innerHTML = noData();
  }
}

async function renderMonthWidget(container, widgetType, width) {
  const data = await fetchTodayData(`${baseUrl}/api/v1/calendar/today`);

  if (data) {
    todayYear = parseInt(data.data.bs_year_en);
    todayMonth = parseInt(data.data.bs_month_code_en);

    await fetchDataAndRender(container, widgetType, data.data, width);
  } else {
    container.innerHTML = noData();
  }
}

async function renderHolidaysWidget(container, widgetType, width) {
  const data = await fetchHolidaysData(
    `${baseUrl}/api/v1/calendar/upcoming?type=holidays`
  );

  if (data) {
    if (widgetType === "ok-holidays") {
      container.innerHTML = okHolidays(data.data, width);
    }
  } else {
    container.innerHTML = noData();
  }
}

const attachEventListeners = (container, widgetType, data, width) => {
  const prevButton = document.querySelector(".ok-month-prev");
  const nextButton = document.querySelector(".ok-month-next");

  const popButtons = document.querySelectorAll(".ok-month-col-click");
  const popButtonsSm = document.querySelectorAll(".ok-month-sm-col-click");
  const closeButton = document.querySelector(".ok-month-popup .ok-close__popup");
  const closeButtonSm = document.querySelector(".ok-month-sm-popup .ok-close__popup");
  const closeOverlay = document.querySelector(".ok-month-popup .ok-overlay");
  const closeOverlaySm = document.querySelector(".ok-month-sm-popup .ok-overlay");

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () =>
      handlePrev(container, widgetType, data, width)
    );
    nextButton.addEventListener("click", () =>
      handleNext(container, widgetType, data, width)
    );
  }

  const popupData =(item)=>{
    const data = {
      bs_date_np: item.getAttribute("data-bs_date_np"),
      bs_month_np: item.getAttribute("data-bs_month_np"),
      bs_year_np: item.getAttribute("data-bs_year_np"),
      day_np: item.getAttribute("data-day_np"),
      tithi_title_np: item.getAttribute("data-tithi_title_np"),
      sunrise_np: item.getAttribute("data-sunrise_np"),
      sunset_np: item.getAttribute("data-sunset_np"),
      ad_month_en: item.getAttribute("data-ad_month_en"),
      ad_date_en: item.getAttribute("data-ad_date_en"),
      ad_year_en: item.getAttribute("data-ad_year_en"),
      day_en: item.getAttribute("data-day_en"),
      ad_full_date_en: item.getAttribute("data-ad_full_date_en"),
      events: JSON.parse(item.getAttribute("data-events")),
      pakshya_np: item.getAttribute("data-pakshya_np"),
      ritu_np: item.getAttribute("data-ritu_np"),
      tithi_end_time_np: item.getAttribute("data-tithi_end_time_np"),
    };
    return data
  }

  popButtons.forEach((item) => {
    item.addEventListener("click", (event) => {
      handlePopup(popupData(item));
    });
  });

  popButtonsSm.forEach((item) => {
    item.addEventListener("click", (event) => {
      handlePopupSm(popupData(item));
    });
  });

  if (closeButton && closeOverlay) {
    closeButton.addEventListener("click", () => handleClose());
    closeOverlay.addEventListener("click", () => handleClose());
  }
  if (closeButtonSm && closeOverlaySm) {
    closeButtonSm.addEventListener("click", () => handleCloseSm());
    closeOverlaySm.addEventListener("click", () => handleCloseSm());
  }
};

const fetchDataAndRender = async (container, widgetType, data, width) => {
  const { previousYear, previousMonth } = getPreviousMonth(
    todayYear,
    todayMonth
  );
  const { nextYear, nextMonth } = getNextMonth(todayYear, todayMonth);

  const [calendarData, previousData, nextMonthData] = await Promise.all([
    fetchData(`${baseUrl}/api/v1/calendar/month/bs/${todayYear}/${todayMonth}`),
    fetchData(
      `${baseUrl}/api/v1/calendar/month/bs/${previousYear}/${previousMonth}`
    ),
    fetchData(`${baseUrl}/api/v1/calendar/month/bs/${nextYear}/${nextMonth}`),
  ]);

  if (calendarData && previousData && nextMonthData) {
    if (widgetType === "ok-month") {
      container.innerHTML = okMonth(
        calendarData,
        previousData,
        nextMonthData,
        data,
        width
      );
      attachEventListeners(container, widgetType, data, width);
    }else if (widgetType === "ok-month-sm") {
      container.innerHTML = okMonthSmall(
        calendarData,
        previousData,
        nextMonthData,
        data,
        width
      );
      attachEventListeners(container, widgetType, data, width);
    }
  } else {
    container.innerHTML = noData();
  }
};

// Function to initialize the widget based on data-widget attribute
function initWidgets() {
  document.querySelectorAll('[data-widget]').forEach((container) => {
    const widgetType = container.getAttribute('data-widget');
    const width = container.style.width || '300px'; // Fallback to 300px if width not set
    if (widgetType === 'ok-day' || widgetType === 'ok-day-sm') {
      renderDayWidget(container, widgetType, width);
    } else if (widgetType === 'ok-month' || widgetType === 'ok-month-sm') {
      renderMonthWidget(container, widgetType, width);
    }else if (widgetType === 'ok-holidays') {
      renderHolidaysWidget(container, widgetType, width);
    }
  });
}

// Call the function to initialize the widgets on page load
initWidgets();

// Initialize a MutationObserver to watch for changes in the DOM
document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && node.hasAttribute('data-widget')) {
            const widgetType = node.getAttribute('data-widget');
            const width = node.style.width || '300px';
            if (widgetType === 'ok-day' || widgetType === 'ok-day-sm') {
              renderDayWidget(node, widgetType, width);
            } else if (widgetType === 'ok-month' || widgetType === 'ok-month-sm') {
              renderMonthWidget(node, widgetType, width);
            }else if (widgetType === 'ok-holidays') {
              renderHolidaysWidget(container, widgetType, width);
            }
          }
        });
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});