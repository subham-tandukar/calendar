import EnglishCalendarComponent from "../../Components/Calendar/EnglishCalendar/Page";

type Props = {
  searchParams: {
    year: string;
    month: string;
    calendarType: string;
    ad_month_en: string;
    ad_year_en: string;
  };
};

const siteSettingList = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/site-settings`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    return result
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function generateMetadata({ searchParams }) {
  const { year, month } = searchParams ?? {};
  const data = await siteSettingList()
  const englishMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  try {
    let title;
    if (month && englishMonths[parseInt(month) - 1]) {
      title = `${englishMonths[parseInt(month) - 1]} ${year} - OK Calendar`;
    } else {
      title = `OK Calendar`;
    }

    const ogTitle = title ? title : "OK Calendar"
    const description = data?.data?.site_meta_description
    const imageUrl = data?.data?.site_og_image

    return {
      title: ogTitle,
      description: description,
      openGraph: {
        title: ogTitle,
        description: description,
        images: [
          {
            url: imageUrl,
            width: 900,
            height: 500,
          },
        ],
        url: `${process.env.NEXT_PUBLIC_LIVE_URL}`,
        type: "article",
      },
      twitter: {
        title: ogTitle,
        description: description,
        images: [
          {
            url: imageUrl,
            width: 900,
            height: 500,
          },
        ],
      },
    }
  } catch (error) {
    console.error("Error fetching metadata", error);
  }
}


async function getTimeAndDate() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/today`, {
    cache: "no-store"
  });
  const { data, time } = await response.json();

  return {
    year: data.bs_year_en,
    month: data.bs_month_code_en,
    currentdate: data,
    currenttime: time,
    ad_year_en: data.ad_year_en,
    ad_month_en: data.ad_month_code_en,
  };
}

export default async function Home({ searchParams }: Props) {
  const { year, month, currentdate, currenttime, ad_year_en, ad_month_en } =
    await getTimeAndDate();

  if (searchParams.year && searchParams.month) {
    return (
      <>
        <EnglishCalendarComponent
          ad_year_en={parseInt(searchParams.year)}
          ad_month_en={parseInt(searchParams.month)}
          currentdate={currentdate}
          currenttime={currenttime}
          month={searchParams.month}
          isParam="true"
        />
      </>
    );
  }

  return (
    <>
      <EnglishCalendarComponent
        ad_year_en={parseInt(ad_year_en)}
        ad_month_en={parseInt(ad_month_en)}
        currentdate={currentdate}
        currenttime={currenttime}
        month={month}
        isParam="false"
      />
    </>
  );
}