import NepaliCalenderComponent from "../../Components/Calendar/NepalICalendar/Page";

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
  const nepalimonths = [
    "Baisakh",
    "Jestha",
    "Ashadh",
    "Shrawan",
    "Bhadra",
    "Ashwin",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra"
  ];

  try {
    const title = year && month ?
      `${nepalimonths[parseInt(month) - 1]} ${year} - OK Calendar` :
      "OK Calendar"; // Set a default title if year or month is undefined

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
  };
}

export default async function Home({ searchParams }: Props) {
  const { year, month, currentdate, currenttime } =
    await getTimeAndDate();
  if (searchParams.year && searchParams.month) {
    return (
      <>
        <NepaliCalenderComponent
          year={searchParams.year}
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
      <NepaliCalenderComponent
        year={year}
        currentdate={currentdate}
        currenttime={currenttime}
        month={month}
        isParam="false"
      />
    </>
  );
}