import "./css/style.css";
import type { Metadata } from "next";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import { RootContextProvider } from "../context";
import { AuthContextProvider } from "../context/AuthContext";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Online-Khabar Calendar",
  description: "OK-Khabar",
};

async function getItem() {
  const response = await fetch("http://47.128.210.223/api/v1/calendar/today", {
    cache: "no-store",
  });
  return response.json()
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, time } = await getItem();
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <RootContextProvider>
            <NavBar currentdate={data} />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            <Footer />
          </RootContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}