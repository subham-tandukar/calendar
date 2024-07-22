
import Festival from "./Festival";

export default async function page() {
    let festivaldata;
    
    // const upcomingeventapi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/parvas/bs/${currentyear}/${currentmonth}`;
    const upcomingeventapi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/trending-parvas`;

    try {
        const response = await fetch(upcomingeventapi);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        festivaldata = await response.json();
    }
    catch (error) {
        console.error("error", error);


        return <div>error fetching. please try again</div>
    };


    return (
        <>

            <Festival festivaldata={festivaldata.data}  />

        </>
    )

}