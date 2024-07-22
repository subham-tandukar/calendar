import NepaliCalendarComponent from "../Components/Calendar/NepalICalendar/Page";

async function getTimeAndDate() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/today`, {
        cache: "no-store"
    });
    const { data, time } = await response.json();

    return { 
        year: data.bs_year_en,
        month: data.bs_month_code_en,
        currentdate: data,
        currenttime: time,
        ad_year_en: data.ad_year_en,
        ad_month_en: data.ad_month_code_en,
    };
}

export default async function Dashboard({ searchParams }) {
    const { year, month, currentdate, currenttime } =
        await getTimeAndDate();

    if (searchParams.year && searchParams.month) {
        return (
            <>
                <NepaliCalendarComponent
                    year={searchParams.year}
                    month={searchParams.month}
                    currentdate={currentdate}
                    currenttime={currenttime}
                    isParam="true"
                />
            </>
        );
    }

    return (
        <>
            <NepaliCalendarComponent
                year={year}
                month={month}
                currentdate={currentdate}
                currenttime={currenttime}
                isParam="false"
            />
        </>
    );
}