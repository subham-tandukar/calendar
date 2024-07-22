import Toast from "../Components/Toast/Toast";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <main className="auth">
            <Toast />
            {children}
        </main>
    );
}