/* okcalendar.js */
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

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
const fetchTodayData = async(url)=> {
  if (todayCache[url]) {
    return todayCache[url];
  }
  const response = await fetch(url);
  const todaydata = await response.json();
  todayCache[url] = todaydata;
  return todaydata;
}

let todayYear;
let todayMonth;


const handlePrev = async (container, widgetType,data, width) => {
  todayYear = todayMonth === 1 ? todayYear - 1 : todayYear;
  todayMonth = todayMonth === 1 ? 12 : todayMonth - 1;
  await fetchDataAndRender(container, widgetType,data, width);
};

const handleNext = async (container, widgetType,data, width) => {
  todayYear = todayMonth === 12 ? todayYear + 1 : todayYear;
  todayMonth = todayMonth === 12 ? 1 : todayMonth + 1;
  await fetchDataAndRender(container, widgetType,data, width);
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


const handlePopup =()=>{
  const OKbody = document.querySelector("body");
  const OKpopUp = document.querySelector(".ok-custom__popup");
  OKbody.classList.add("ok-popup-open")
  OKpopUp.classList.add("active")
}

const handleClose =()=>{
  const OKbody = document.querySelector("body");
  const OKpopUp = document.querySelector(".ok-custom__popup");
  OKbody.classList.remove("ok-popup-open")
  OKpopUp.classList.remove("active")
}

// Cache object
const cache = {
  calendarData: {},
  previousData: {},
  nextMonthData: {}
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


const noData = () =>
  `<div class="ok-calendar">
      <div class="ok-card ok-error">
        <h2 class="ok-error-title">Error Loading Widget</h2>
        <p class="ok-error-content">There was an error loading the widget data.</p>
      </div>
    </div>`;

const okDay = (data, width) => (
  `<div class="ok-calendar">
  <a href="${process.env.NEXT_PUBLIC_LIVE_URL}" target="_blank">
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
</div>`
)

const okDaySmall = (data, width) =>
  `<div class="ok-calendar">
        <a href="${process.env.NEXT_PUBLIC_LIVE_URL}" target="_blank">
          <div class="ok-card ok-day-sm">
            <div class="ok-day-sm-date">
              ${data.data.bs_date_np}
              <span>${data.data.day_np.replace("वार", "")}</span>
            </div>
            <div class="ok-flex">
              <div class="ok-day-sm-info">
                <div class="ok-flex ok-flex-m">
                  ${data.data?.events
                    .slice(0, 1)
                    .map(
                      (event, index) =>
                        `<p><span key=${index}>${event?.event_title_np} -</span></p>`
                    )
                    .join("")}
                  <p class="ok-day-sm-tithi">
                    ${data.data?.tithi?.tithi_title_np}
                  </p>
                </div>
                <div class='ok-day-sm-flex'>
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
                <span class="ok-day-sm-event">
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

const okMonthSmall = (calendarData, previousData, nextMonthData, todayData, width) => {
  const daysOfWeek = ["आ", "सो", "मं", "बु", "बि", "शु", "श"];
  
  const popUp = ()=> (
    `
    <div class="ok-custom__popup popup__small">
      <div class="ok-overlay"></div>
      <div class="ok-custom__popup__model">
        <div class="ok-close__popup">
          <svg stroke="currentColor" fill="#555" stroke-width="0" viewBox="0 0 352 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </div>
        <div class="ok-custom__popup__content">
          <div class="ok-month-popup">
            <div class="ok-day-circle">
              २५
            </div>

            <div class="ok-month-info">
              <div class="ok-day-date">
                असार २०८१
                <span class="ok-day-current">
                  मंगलवार 
                </span>
              </div>

              <div class="ok-day-site-info">
                तृतीया 
                <span class="ok-day-sunrise">
                  सूर्योदय ०५ः१६ 
                </span>
                <span class="ok-day-sunrise">
                  सूर्यास्त १९ः०५ 
                </span>
              </div>

              <div>
                <span class="ok-badge">
                  July 9, 2024, Wednesday
                </span>
              </div>
            </div>
          </div>

          <div class="ok-month-event">
            <h2 class="ok-title">
             कार्यक्रमहरू

             <span class="ok-badge">
              २१ दिन पहिले
             </span>
            </h2>

            <div class="ok-month-event-list">
              <ul>
                <li class="">निर्जला एकादशी व्रत</li>
                <li class="">तुलसीको दल राख्ने</li>
              </ul>
            </div>

            <div class="ok-no-data">
              कुनै कार्यक्रमहरू उपलब्ध छैनन्
            </div>
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
                  June 17, 2024
                </div>
              </div>

              <div class="ok-wrapper">
                <div>
                  पक्ष:
                </div>
                <div>
                  ज्येष्ठ शुक्लपक्ष
                </div>
              </div>

              <div class="ok-wrapper">
                <div>
                  सूर्योदय:
                </div>
                <div>
                 ०५:१०
                </div>
              </div>

              <div class="ok-wrapper">
                <div>
                  सूर्यास्त:
                </div>
                <div>
                  १९:००
                </div>
              </div>

              <div class="ok-wrapper">
                <div>
                  ऋतु:
                </div>
                <div>
                  ग्रीष्म
                </div>
              </div>

              <div class="ok-wrapper">
                <div>
                  तिथी:
                </div>
                <div>
                  एकादशी २८:४५ बजेसम्म
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  )

  const disabledHtml=(data, index)=>
      `<div 
          class="ok-month-sm-col ok-disabled-month"
          key=${index}
          >
      ${data.bs_date_np}

      <span class="ok-eng-font">
        ${data.ad_date_en}
      </span>
      </div>`

  const dayCode = calendarData.data[0].day_code_en;
  const dayEn = calendarData.data[0].day_en;
  const prevDayCode = dayCode - 1;

  let prevArray;
  if(dayEn === "Sunday"){
    prevArray = []
  }else{
    prevArray = previousData.data.slice(-prevDayCode);
  }

  const previousHTML = `${prevArray
    .map(
      (data, index) =>
        disabledHtml(data, index)
    )
    .join("")}`

    const lastDayCode = calendarData.data[calendarData.data.length - 1].day_code_en;
    const nextDayCode = 7 - lastDayCode;
    const nextArray = nextMonthData.data.slice(0 , nextDayCode);

    const nextHTML = `${nextArray
      .map(
        (data, index) =>
          disabledHtml(data, index)
      )
      .join("")}`

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
          ${daysOfWeek.map((days, index)=> 
            `<div class="ok-month-sm-days" key=${index}>
                  ${days}
              </div>`
          ).join("")}

          ${previousHTML}

          ${calendarData.data
          .map(
            (data, index) =>
              `<div 
            onClick="popUp()"
              class="ok-month-sm-col 
              ${data.bs_date_np === todayData.bs_date_np && data.bs_month_code_en === todayData.bs_month_code_en && data.bs_year_en === todayData.bs_year_en
                && data.day_en === "Saturday"
                ? "ok-month-today-holiday"
                :
                data.bs_date_np === todayData.bs_date_np &&
                  data.bs_month_code_en === todayData.bs_month_code_en && data.bs_year_en === todayData.bs_year_en
                  && data?.events[0]?.is_public_holiday === true
                  ? "ok-month-today-holiday"
                  :
                  data.bs_date_np === todayData.bs_date_np &&
                    data.bs_month_code_en === todayData.bs_month_code_en && data.bs_year_en === todayData.bs_year_en
                    ? "ok-month-today"
                    : data.day_en === "Saturday"
                      ? "ok-month-holiday"
                      : data?.events[0]?.is_public_holiday === true ?
                        "ok-month-holiday" :
                        ""}
              "
                key=${index}
                >
            ${data.bs_date_np}

            ${data?.events.length > 0 ? `<span class="ok-month-sm-event"></span>` : ""}

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

    ${popUp()}
    `

  return calendarHTML;
}

async function renderDayWidget(container, widgetType, width) {
  const data = await fetchTodayData(`${baseUrl}/api/v1/calendar/today`);

  if (data) {
    if (widgetType === "ok-day") {
      container.innerHTML = okDay(data,width)
    }else if (widgetType === "ok-day-sm") {
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

const attachEventListeners = (container, widgetType, data, width) => {
  const prevButton = document.querySelector('.ok-month-prev');
  const nextButton = document.querySelector('.ok-month-next');

  const popButtons = document.querySelectorAll('.ok-month-sm-col');
  const closeButton = document.querySelector('.ok-close__popup');
  const closeOverlay = document.querySelector('.ok-overlay');

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => handlePrev(container, widgetType, data, width));
    nextButton.addEventListener('click', () => handleNext(container, widgetType, data, width));
  }

  popButtons.forEach(button => {
    button.addEventListener('click', () => handlePopup());
  });

  if(closeButton && closeOverlay){
    closeButton.addEventListener('click', ()=> handleClose())
    closeOverlay.addEventListener('click', ()=> handleClose())
  }
  
};

const fetchDataAndRender = async (container, widgetType, data, width) => {
  const { previousYear, previousMonth } = getPreviousMonth(todayYear, todayMonth);
  const { nextYear, nextMonth } = getNextMonth(todayYear, todayMonth);

  const [calendarData, previousData, nextMonthData] = await Promise.all([
    fetchData(`${baseUrl}/api/v1/calendar/month/bs/${todayYear}/${todayMonth}`),
    fetchData(`${baseUrl}/api/v1/calendar/month/bs/${previousYear}/${previousMonth}`),
    fetchData(`${baseUrl}/api/v1/calendar/month/bs/${nextYear}/${nextMonth}`),
  ]);

  if (calendarData && previousData && nextMonthData) {
    if (widgetType === "ok-month-sm") {
      container.innerHTML = okMonthSmall(calendarData, previousData, nextMonthData, data, width);
      attachEventListeners(container, widgetType, data, width);
    }
  } else {
    container.innerHTML = noData();
  }
};

// Function to initialize the widget based on data-widget attribute
function initWidgets() {
  const okDayContainers = document.querySelectorAll('[data-widget="ok-day"]');
  const okDaySmallContainers = document.querySelectorAll(
    '[data-widget="ok-day-sm"]'
  );
  const okMonthSmallContainers = document.querySelectorAll(
    '[data-widget="ok-month-sm"]'
  );

  okDayContainers.forEach((container) => {
    const width = container.getAttribute('style') || '300px'; 
    renderDayWidget(container, "ok-day", width);
  });

  okDaySmallContainers.forEach((container) => {
    const width = container.getAttribute('style') || '300px';
    renderDayWidget(container, "ok-day-sm",width);
  });

  okMonthSmallContainers.forEach((container) => {
    const width = container.getAttribute('style') || '300px';
    renderMonthWidget(container, "ok-month-sm",width);
  });
}

// Call the function to initialize the widgets on page load
initWidgets();

// Initialize a MutationObserver to watch for changes in the DOM
document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('[data-widget="ok-day"], [data-widget="ok-day-sm"]').forEach(container => {
      const widgetType = container.getAttribute('data-widget');
      const width = container.getAttribute('style') || '300px';
      renderDayWidget(container, widgetType, width);
    });

    document.querySelectorAll('[data-widget="ok-month"], [data-widget="ok-month-sm"]').forEach(container => {
      const widgetType = container.getAttribute('data-widget');
      const width = container.getAttribute('style') || '300px';
      renderMonthWidget(container, widgetType, width);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial rendering for existing elements
  document.querySelectorAll('[data-widget="ok-day"], [data-widget="ok-day-sm"]').forEach(container => {
    const widgetType = container.getAttribute('data-widget');
    const width = container.getAttribute('style') || '300px';
    renderDayWidget(container, widgetType, width);
  });

  document.querySelectorAll('[data-widget="ok-month"], [data-widget="ok-month-sm"]').forEach(container => {
    const widgetType = container.getAttribute('data-widget');
    const width = container.getAttribute('style') || '300px';
    renderMonthWidget(container, widgetType, width);
  });
});

