import { removeHTMLTags } from "../../../hooks";
import DateConverter from "./DateConverter";
import { Metadata, ResolvingMetadata } from "next";

async function getItem() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/today`, {
            cache: "no-store"
        });
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return { data: null, time: null };
    }
}

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

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
    const data = await siteSettingList()
    const previousImg = (await parent).openGraph?.images || []

    const title = data?.data?.date_converter_meta_title || data?.data?.date_converter_title_np
    const description = data?.data?.date_converter_meta_description || data?.data?.date_converter_description_np && removeHTMLTags(data?.data?.date_converter_description_np)
    const ogTitle = `${title}`
    const imageUrl = data?.data?.date_converter_og_image || data?.data?.site_og_image

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
            url: `${process.env.NEXT_PUBLIC_LIVE_URL}/date-converter`,
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


export default async function page() {
    const { data, time } = await getItem();
    return (
        <>
            <DateConverter currentdate={data} />
        </>
    );
}