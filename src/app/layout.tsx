
import type { Metadata } from "next";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { RootContextProvider } from "../context";
import { AuthContextProvider } from "../context/AuthContext";
import { Suspense } from "react";
import Head from "next/head";
import "./css/style.css";

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

export async function generateMetadata() {
  const data = await siteSettingList()

  const title = data?.data?.site_meta_title || "OK Calendar"
  const description = data?.data?.site_meta_description
  const ogTitle = `${title}`
  const imageUrl = data?.data?.site_og_image

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
}


async function getItem() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/today`, {
    cache: "no-store",
  });
  return response.json()
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, time } = await getItem();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`/img/favicon${data.bs_date_en}.ico`} type="image/x-icon" sizes="16x16" />
      </head>
      <body>
        <AuthContextProvider>
          <RootContextProvider>

            <NavBar currentdate={data} />
            <div className="ok-main">

            {children}
            </div>
            <Footer />
          </RootContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
