export interface DataItem {
    [x: string]: any;
    tithi: any;
    id: number;
    bs_year_np: string;
    bs_month_np: string;
    bs_month_code_np: string;
    bs_date_np: string;
    ad_date_en: string;
    bs_month_code_en: string;
    bs_year_en: string;
    item: any;
    handleDayCloseOffCanvas: () => void;
 

}

export interface TithiProps {
    tithi_np:string;
}
export interface events {
    event_title_np:string
} 

export interface Data {
    data: DataItem[];
    events: events[]
        tithi: TithiProps[] ;
   
}  


export interface PageProps {
    // data: DataItem[];
    // tithiProps?: TithiProps[] ;
    // Nextmonthdata:any  | undefined
    // previousdata:any
    currentdate:any
    currenttime:number
    // currentmonthapi?:string;
    ad_year_en?:number;
    ad_month_en?:number;
    loading?:boolean;
    currMonth?:any  | undefined
    isParam?:any
    monthNow?:any
    yearNow?:any
    preloadData?:any
    preloadNextData?:any
    preloadPrevData?:any
    preloadcurrMonth?:any

}

export interface PageEngProps {
    data: DataItem[];
    tithiProps?: TithiProps[] ;
    Nextmonthdata:any  | undefined
    previousdata:any
    currentdate:any
    currenttime:number
    // currentmonthapi?:string;
    ad_year_en?:number;
    ad_month_en?:number;
    loading?:boolean;
    currMonth?:any  | undefined
    isParam?:any
    monthNow?:any
    yearNow?:any
    preloadData?:any
    preloadNextData?:any
    preloadPrevData?:any

}