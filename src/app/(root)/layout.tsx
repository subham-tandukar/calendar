import Eventsblog from "../Components/Events/Eventsblog/Page";
import Stocklive from "../Components/News and Updates/Stocklive";
import Reminder from "../Components/Reminders/Reminder";
import Toast from "../Components/Toast/Toast";
import SideMenuContent from "../Components/WrapperContent/SideMenuContent";
import Panels from "../Components/panels/Panels";

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
        return { data: null};
    }
}

export default async function Layout({
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
                        <div className="okv4-col order-2">
                            {children}
                            <Reminder />
                            <Panels  />
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
