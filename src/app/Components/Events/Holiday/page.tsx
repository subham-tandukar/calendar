import { error } from "console";

import Holiday from "./Holiday";

export default async function page({
    currentdate
}) {

    const currentyear =  currentdate?.bs_year_en;
    const currentmonth =  currentdate?.bs_month_code_en;
    let holidaydata;

    const holidayapi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/upcoming?type=holidays`;


    try {
        const response = await fetch(holidayapi, {
            cache: "no-store"
        });
        if (!response.ok) {
            throw new error("failed to fetch data")
        }
        holidaydata = await response.json();


    } catch (error) {
        console.error("failed to fetch data");

        return <div>Error fetching data</div>
    }


    return (
        <>

            <Holiday holidaydata={holidaydata.data} />


        </>
    )



}