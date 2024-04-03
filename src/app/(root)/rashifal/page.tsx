import { error } from "console";
import Rashifal from "./Rashifal";

export default async function page() {
    let rashifaldata;
    const rashifalapi = `https://www.onlinekhabar.com/wp-json/okapi/v2/rashi`;

    try {
        const response = await fetch(rashifalapi, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new error("failed to fetch data");
        }
        rashifaldata = await response.json();
    }
    catch (error) {
        console.error("error", error);
        return <div>error fetching. please try again</div>
    };
    return (
        <>
            <Rashifal rashifaldata={rashifaldata?.data?.rashi} />
        </>
    );
}