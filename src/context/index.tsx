
"use client"

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";
import { signIn, signOut, useSession } from 'next-auth/react';
interface ClickedDate {
    date: string;
}

type DateType = "वि.सं." | "ई.सं.";

interface RootContextType {
    baseUrl: any;
    liveUrl: any;
    animation: boolean;
    eventCreated: boolean;
    setAnimation: Dispatch<SetStateAction<boolean>>;
    setEventCreated: Dispatch<SetStateAction<boolean>>;
    clickedDate: ClickedDate;
    setClickedDate: Dispatch<SetStateAction<ClickedDate>>;
    dropdownitem: DateType;
    setDropdownitem: Dispatch<SetStateAction<DateType>>;
    Currentdata: any;
    userInfo: any;
    siteSetting: any;
    setSingleRashi: any;
    singleRashi: any;
    createddate: any;
    setCreatedDate: any;
    userUpdated: any;
    setUserUpdated: any;
    activeTab: any;
    setActiveTab: any;
    bullionData: any;
    loading: any;
    forexData: any;
    forexLoading: any;
    adData: any;
    handleAdClick: any;
}

const RootContext = createContext<RootContextType | null>(null);

interface RootContextProviderProps {
    children: ReactNode;
}

export function RootContextProvider({ children }: RootContextProviderProps): JSX.Element {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const liveUrl = process.env.NEXT_PUBLIC_LIVE_URL;
    const { data: session, status } = useSession();
    const token = session?.token ? session?.token : session?.user?.data?.token;
    const [animation, setAnimation] = useState<boolean>(false);
    const [eventCreated, setEventCreated] = useState<boolean>(false);
    const [userUpdated, setUserUpdated] = useState<boolean>(false);
    const [clickedDate, setClickedDate] = useState<ClickedDate>({ date: "" });
    const [dropdownitem, setDropdownitem] = useState<DateType>("वि.सं.");
    const [Currentdata, setCurrentData] = useState<any>(null);
    const [userInfo, setUserInfo] = useState<any>("");
    const [createddate, setCreatedDate] = useState<any>("");
    const [siteSetting, setSiteSetting] = useState<any>([]);
    const [singleRashi, setSingleRashi] = useState<any>();

    const loginViaCookie = async () => {
        const res = await signIn('credentials', { redirect: false, callbackUrl: '/' });
      }
    
      useEffect(() => {
        const cookieValue = document.cookie.split('; ').find(row => row.startsWith('ok_reg_user='));
    
        if (cookieValue) {
          loginViaCookie()
        }
    
      }, [])

    async function fetchData() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/today`, {
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user`, {
                cache: "no-store",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!response.ok) {
                console.error("failed to fetch data");
            }
            const data = await response.json();
            setUserInfo(data?.data);
        } catch (error) {
            console.error('Error fetching data:', error);

        }
    }

    useEffect(() => {
        if (token) {
            userData();
        }
    }, [token, userUpdated]);

    async function siteSettingList() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/site-settings`, {
                cache: "no-store",
            });
            const { data, time } = await response.json();
            setSiteSetting(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        siteSettingList();
    }, []);


    const [activeTab, setActiveTab] = useState({
        tab1: true,
        tab2: false,
        tab3: false,
    })

    const [bullionData, setBullionData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const getBullionList = async () => {
        const bullionapi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/bullions?limit=26`;

        try {
            setLoading(true)
            const response = await fetch(bullionapi, {
                cache: "no-store"
            });
            if (!response.ok) {
                console.error("failed to fetch data");
            }
            if (response.ok) {
                const bullion = await response.json();
                setBullionData(bullion?.data)
                setLoading(false)
            }
        } catch (error) {
            console.error("failed to fetch data");
            setBullionData([])
            setLoading(false)
        }
    }


    useEffect(() => {
        getBullionList()
    }, [])

    const [forexData, setForexData] = useState<any[]>([]);
    const [forexLoading, setForexLoading] = useState<boolean>(true);
    const getForexList = async () => {
        const forexapi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/forex`;

        try {
            setForexLoading(true)
            const response = await fetch(forexapi, {
                cache: "no-store"
            });
            if (!response.ok) {
                console.error("failed to fetch data");
            }
            if (response.ok) {
                const forex = await response.json();
                setForexData(forex?.data)
                setForexLoading(false)
            }
        } catch (error) {
            console.error("failed to fetch data");
            setForexData([])
            setForexLoading(false)
        }
    }


    useEffect(() => {
        getForexList()
    }, [])

    const [adData, setAdData] = useState<any[]>([]);
    const getadList = async () => {
        const adApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/ads-by-section`;

        try {
            const response = await fetch(adApi, {
                cache: "no-store"
            });
            if (!response.ok) {
                console.error("failed to fetch data");
            }
            if (response.ok) {
                const ad = await response.json();
                setAdData(ad?.data)
            }
        } catch (error) {
            console.error("failed to fetch data");
            setAdData([])
        }
    }


    useEffect(() => {
        getadList()
    }, [])

    const handleAdClick = async (data) => {
        const dataForm = {
            advertisement_id: data && data.id || "",
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendar/ad-click-count`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataForm)
            });

            const data = await res.json();

            if (res.ok) {
                if (data?.error) {
                    console.log(data?.error?.message)
                }
                // Handle success response here
            } else {
                console.log(data?.message)
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const contextValue: RootContextType = {
        baseUrl,
        liveUrl,
        animation,
        setAnimation,
        eventCreated, setEventCreated,
        clickedDate,
        setClickedDate,
        dropdownitem,
        setDropdownitem,
        Currentdata,
        userInfo,
        siteSetting,
        singleRashi,
        setSingleRashi,
        createddate,
        setCreatedDate,
        userUpdated, setUserUpdated,
        activeTab,
        setActiveTab,
        bullionData,
        loading,
        forexData,
        forexLoading,
        adData,
        handleAdClick
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
