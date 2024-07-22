import Link from "next/link";
import TodayBullion from "../(bullionLayout)/bullion/TodayBullion";
import ForexCalculator from "../(forexLayout)/forex/ForexCalculator";
import Eventsblog from "../Components/Events/Eventsblog/Page";
import Stocklive from "../Components/News and Updates/Stocklive";
import Toast from "../Components/Toast/Toast";
import SideMenuContent from "../Components/WrapperContent/SideMenuContent";
import Panels from "../Components/panels/Panels";
import DateCalculator from "../(root)/date-converter/DateCalculator";

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
        return { data: null };
    }
}

export default async function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data } = await getItem();
    return (
        <div id="content" className="site-content site-ok-calendar">
            <section className="okv4-section okv4-section-calendar">
                <div className="okv4-container">
                    <Toast />
                    <div className="okv4-section-items-wrap item-width-sidebar">
                        <div className="okv4-col leftbar-col order-2">
                            <SideMenuContent currentdate={data} />
                        </div>
                        <div className="okv4-col rightbar-col order-2">
                            {children}
                            <Panels />
                            <div className="ok-home-widget">
                                <div>
                                    <TodayBullion isHome="true" />
                                </div>
                                <div>
                                    <ForexCalculator isHome="true" />
                                </div>
                                <div>
                                    <div className="ok-card-all-festivals">
                                        <DateCalculator currentdate={data} isHome="true" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="grid-item grid-item-1 grid-gap-20">
                                <div className="ok-card-all-festivals">
                                    <DateCalculator currentdate={data} isHome="true"/>
                                </div>

                            </div> */}
                            <Eventsblog />
                        </div>
                    </div>
                    <div className="okv4 ">
                        <Stocklive />
                    </div>
                </div>
            </section>
        </div>
    );
}
