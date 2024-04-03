import Holiday from "./Holiday";

async function getItem() {
    try {
        const response = await fetch("http://47.128.210.223/api/v1/calendar/today", {
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

export default async function page() {
    const { data, time } = await getItem();
    return (
        <>
            <Holiday currentdate={data} />
        </>
    );
}