import SinglePanchanga from "./SinglePanchanga";
import { Metadata, ResolvingMetadata } from "next";
import { arabicToDevanagari, dayNames, monthNames, removeHTMLTags } from "../../../../hooks";

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


export async function generateMetadata({ params }: { params: { id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
    const data = await siteSettingList()
    const previousImg = (await parent).openGraph?.images || []

    const selectedParam = params.id[0];
    console.log(selectedParam)
    const year = selectedParam.split("-")[0];
    const month = selectedParam.split("-")[1];
    const day = selectedParam.split("-")[2];

    const title = `${data?.data?.panchanga_meta_title || data?.data?.panchanga_title_np} - ${arabicToDevanagari(Number(day))} ${monthNames[Number(month) - 1]} ${arabicToDevanagari(Number(year))}`

    const description = data?.data?.panchanga_meta_description || data?.data?.panchanga_description_np && removeHTMLTags(data?.data?.panchanga_description_np)
    const ogTitle = `${title}`
    const imageUrl = data?.data?.panchanga_og_image || data?.data?.site_og_image

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
            url: `${process.env.NEXT_PUBLIC_LIVE_URL}/panchanga/${params.id}`,
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

const PanchangaSingle = async ({ params }: any) => {
    return (
        <>
            <SinglePanchanga params={params} />
        </>
    )
}

export default PanchangaSingle;