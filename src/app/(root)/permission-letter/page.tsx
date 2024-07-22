import PermissionLetter from "./PermissionLetter";
import { Metadata, ResolvingMetadata } from "next";
import { removeHTMLTags } from "../../../hooks";


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
    
    const title = data?.data?.authorization_letter_meta_title || data?.data?.authorization_letter_title_np
    const description = data?.data?.authorization_letter_meta_description || data?.data?.authorization_letter_description_np && removeHTMLTags(data?.data?.authorization_letter_description_np)
    const ogTitle = `${title}`
    const imageUrl = data?.data?.authorization_letter_og_image || data?.data?.site_og_image

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
            url: `${process.env.NEXT_PUBLIC_LIVE_URL}/permission-letter`,
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
    return (
        <>
            <PermissionLetter />
        </>
    );
}