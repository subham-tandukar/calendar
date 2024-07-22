import { error } from "console";
import Link from "next/link";
import SingleRashifal from "./SingleRahifal";
import NotFound from "../../../not-found";
import { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import NepaliDate from "nepali-date-converter";
import { arabicToDevanagari, dayNames, monthNames } from "../../../../hooks";

async function getRashi(params) {
  let rashifalFooterdata;
  const rashifalFooterapi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/rashifal-footer/${params.id}`;

  try {
    const response = await fetch(rashifalFooterapi, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new error("failed to fetch data");
    }
    return rashifalFooterdata = await response.json();
  }
  catch (error) {
    console.error("error", error);
    return (
      <NotFound />
    )
  };
}

const fetchSingleRashi = async (id: string) => {

  const rashifalapi = `https://www.onlinekhabar.com/wp-json/okapi/v2/rashifal/type/daily`;
  // const rashifalapi = `https://www.onlinekhabar.com/wp-json/okapi/v2/rashifal/${id}`;
  try {
    const response = await fetch(rashifalapi, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new error("failed to fetch data");
    }
    const result = await response.json();

    const filteredList = result.filter((item) => {
      return (
        item.slug === id[0]
      )
    })
    return filteredList
  }
  catch (error) {
    console.error("error", error);
    return (
      <NotFound />
    )
  };
}


export async function generateMetadata({ params }: { params: { id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const { data } = await getRashi(params);
  const singleFooterData = data || [];

  // Get the current Nepali date
  const currentNepaliDate = new NepaliDate();

  // Extract the current year from the Nepali date
  const currentNepaliDay = currentNepaliDate.getDay();
  const currentNepaliTodayDate = currentNepaliDate.getDate();
  const currentNepaliMonth = currentNepaliDate.getMonth();
  const currentNepaliYear = currentNepaliDate.getYear();

  const rashiData = await fetchSingleRashi(params.id);
  const rashi = rashiData[0];
  const previousImg = (await parent).openGraph?.images || []

  const title = `${rashi?.name} - OK Calendar`
  const description = rashi?.rashifal
  const ogTitle = `${rashi?.name} - ${arabicToDevanagari(currentNepaliTodayDate)} ${monthNames[currentNepaliMonth]} ${arabicToDevanagari(currentNepaliYear)}, ${dayNames[currentNepaliDay]}`
  const imageUrl = singleFooterData?.single_rashifal_og_image
  // Set metadataBase for resolving images
  return {
     metadataBase: new URL(`${process.env.NEXT_PUBLIC_LIVE_URL}`),
    title: title ? title : "OK Calendar",
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
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/rashifal/${params.id}`,
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
}

const RashifalSingle = async ({ params }: any) => {
  const { data } = await getRashi(params);
  const singleFooterData = data || [];

  let rashifal;
  // const rashiapi = `https://www.onlinekhabar.com/wp-json/okapi/v2/rashi`;
  const rashiapi = `https://www.onlinekhabar.com/wp-json/okapi/v2/rashifal/type/daily`;

  try {
    const response = await fetch(rashiapi, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new error("failed to fetch data");
    }
    rashifal = await response.json();
  }
  catch (error) {
    console.error("error", error);
    return (
      <NotFound />
    )
  };
  const rashifalData = rashifal


  return (
    <>
      <SingleRashifal singleFooterData={singleFooterData} params={params} rashifalData={rashifalData} />
    </>
  );
};



// export async function generateMetadata(rashifalData) {
//   try {
//     const rashi = rashifalData?.data?.rashi;
//     const title = rashi?.name || "Online-Khabar Calendar";
//     const image = rashi?.icon;

//     console.log("Metadata:", { title, image });

//     return { title, image };
//   } catch (error) {
//     console.error("Error fetching metadata", error);
//   }
// }

export default RashifalSingle;