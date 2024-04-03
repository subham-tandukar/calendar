
import { error } from "console";
import Festival from "./Festival";

export default async function page({
    currentdate
}) {
    const currentyear = currentdate.bs_year_en;
    const currentmonth = currentdate.bs_month_code_en;
    const currentnepalimonth = currentdate.bs_month_np;
    let festivaldata;
    
    const upcomingeventapi = `http://47.128.210.223/api/v1/calendar/parvas/bs/${currentyear}/${currentmonth}`;

    try {
        const response = await fetch(upcomingeventapi, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new error("failed to fetch data");
        }
        festivaldata = await response.json();
    }
    catch (error) {
        console.error("error", error);


        return <div>error fetching. please try again</div>
    };


    return (
        <>

            <Festival festivaldata={festivaldata.data} currentnepalimonth={currentnepalimonth} />

        </>
    )

}