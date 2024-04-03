import Toast from "../Components/Toast/Toast";

export default async function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <main className="user">
            <Toast/>
            {children}
        </main>
    );
}