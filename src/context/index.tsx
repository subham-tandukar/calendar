
"use client"

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { signOut, useSession } from 'next-auth/react';
interface ClickedDate {
    date: string;
}

type DateType = "वि.सं." | "ई.सं.";

interface RootContextType {
    baseUrl: string | undefined;
    animation: boolean;
    eventCreated: boolean;
    setAnimation: Dispatch<SetStateAction<boolean>>;
    setEventCreated: Dispatch<SetStateAction<boolean>>;
    clickedDate: ClickedDate;
    setClickedDate: Dispatch<SetStateAction<ClickedDate>>;
    dropdownitem: DateType;
    setDropdownitem: Dispatch<SetStateAction<DateType>>;
    Currentdata: any;
    currentTime: any;
    userInfo: any;
}

const RootContext = createContext<RootContextType | null>(null);

interface RootContextProviderProps {
    children: ReactNode;
}

export function RootContextProvider({ children }: RootContextProviderProps): JSX.Element {
    const baseUrl = process.env.REACT_APP_URL;
    const { data: session, status } = useSession();
    const token = session?.data?.token;
    const [animation, setAnimation] = useState<boolean>(false);
    const [eventCreated, setEventCreated] = useState<boolean>(false);
    const [clickedDate, setClickedDate] = useState<ClickedDate>({ date: "" });
    const [dropdownitem, setDropdownitem] = useState<DateType>("वि.सं.");
    const [Currentdata, setCurrentData] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>("");

    async function fetchData() {
        try {
            const response = await fetch("http://47.128.210.223/api/v1/calendar/today", {
                cache: "no-store",
            });
            const { data, time } = await response.json();
            setCurrentData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    async function userData() {
        try {
            const response = await fetch("http://47.128.210.223/api/user", {
                cache: "no-store",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setUserInfo("")
        }
    }

    useEffect(() => {
        userData();
    }, []);

    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString()
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        // Cleanup function to clear the interval when component unmounts or when the dependency array changes
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array so that the effect runs only once

    const contextValue: RootContextType = {
        baseUrl,
        animation,
        setAnimation,
        eventCreated, setEventCreated,
        clickedDate,
        setClickedDate,
        dropdownitem,
        setDropdownitem,
        Currentdata,
        currentTime,
        userInfo
    };

    return (
        <RootContext.Provider value={contextValue}>
            {children}
        </RootContext.Provider>
    );
}

export function useRoot(): RootContextType {
    const context = useContext(RootContext);

    if (context === null) {
        throw new Error("useRoot must be used within a RootContextProvider");
    }

    return context;
}
