"use client"
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import SelectYear from '../../Components/SelectYear/SelectYear';
import SelectMonth from '../../Components/SelectMonth/SelectMonth';
import SelectEnglishYear from '../../Components/SelectYear/SelectEnglishYear';
import SelectEnglishMonth from '../../Components/SelectMonth/SelectEnglishMonth';
import { MdChevronRight } from 'react-icons/md';
import { useRoot } from '../../../context';
import DatePopup from './DatePopup';
import Advertisement from '../../Components/Advertisement/Advertisement';

const DateCalculator = ({ currentdate, isHome }) => {
    const { siteSetting, adData, handleAdClick } = useRoot();
    const [dropdownitem, setDropdownitem] = useState<string>("bs");
    const [OpenDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleDropdownClick = () => {
        setOpenDropdown(!OpenDropdown);
    };

    useEffect(() => {
        // Function to close dropdown when clicking outside
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [selectedYear, setSelectedYear] = useState(currentdate.bs_year_en);
    const [selectedMonth, setSelectedMonth] = useState(currentdate.bs_month_code_en);

    useEffect(() => {
        if (currentdate) {

            if (dropdownitem === "bs") {
                setSelectedYear(Number(currentdate?.bs_year_en));
            } else if (dropdownitem === "ad") {
                setSelectedYear(Number(currentdate?.ad_year_en));
            }
        }

    }, [currentdate, dropdownitem]);

    const [formError, setFormError] = useState<any>("");
    const [convertedData, setConvertedData] = useState<any>([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [popup, setPopup] = useState(false)

    const [day, setDay] = useState(1);
    const handleDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setDay(isNaN(value) ? 1 : value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isHome === "true") {
            setPopup(true)
        } else {
            setPopup(false)
        }

        try {
            setIsSubmit(true);
            const dataForm = {
                type: dropdownitem,
                year: selectedYear,
                month: selectedMonth,
                day: day,
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/helper/date-converter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataForm)
            });

            const data = await res.json();

            if (data?.error) {
                setFormError("मिति फेला परेन")
                setIsSubmit(false);
                setConvertedData([]);
            } else {
                setIsSubmit(false);
                setFormError("");
                setConvertedData([data?.data]);
            }


        } catch (error) {
            setIsSubmit(false);
            console.error("Error during login:", error);
        }
    };

    useEffect(() => {
        setConvertedData([]);
    }, [dropdownitem])

    const handleClose = () => {
        setPopup(false)
    }

    const finalDate = () => {
        return (
            <>
                {convertedData && convertedData.length > 0 ? (
                    <>
                        {
                            convertedData.map((item) => (
                                <div>
                                    <div className="ok-title">
                                        {
                                            dropdownitem === "bs" ? (
                                                <>
                                                    {item.bs_month_np} {item.bs_date_np}, {item.bs_year_np}

                                                </>
                                            ) : (
                                                <>
                                                    {item.ad_date_en} {item.ad_month_en}, {item.ad_year_en}
                                                </>
                                            )
                                        }
                                    </div>

                                    <div className={`ok-main-title small ${dropdownitem === "bs" ? "" : "ok-eng-font"} `}>
                                        {
                                            dropdownitem === "bs" ? (
                                                <>

                                                    {item.ad_date_en} {item.ad_month_en}, {item.ad_year_en}
                                                </>
                                            ) : (
                                                <>
                                                    {item.bs_month_np} {item.bs_date_np}, {item.bs_year_np}
                                                </>
                                            )
                                        }

                                    </div>

                                    <div className="ok-converted-day mt-1">
                                        {item.day_np}
                                    </div>

                                    <div className="ok-date-converter-txt">
                                        {item?.tithi?.tithi_title_np}
                                    </div>

                                    {
                                        item?.nepal_sambat_month_np && item?.nepal_sambat_year_np && (
                                            <div className="ok-date-converter-txt">
                                                {item?.nepal_sambat_month_np}, {item?.nepal_sambat_year_np} {" "}
                                                ने.सं.
                                            </div>
                                        )
                                    }

                                </div>
                            ))
                        }
                    </>
                ) : (

                    <div className='ok-no-data'>
                        {formError}
                    </div>

                )}
            </>
        )
    }

    let slug = "homepage-below-date-converter"

    const filterAd = adData && adData.filter((item) => item.slug === slug);

    const advertisement = adData && filterAd.length > 0 && filterAd[0].advertisements[0]

    const handleClick = () => {

        handleAdClick(advertisement)
    };

    return (
        <>
            {
                isHome === "true" && (
                    <div className="ok-block">
                        <div className="ok-block-heading">
                            <h3>
                                {
                                    siteSetting?.date_converter_title_np || "मिति परिवर्तन"
                                }

                            </h3>
                            <div className="ok-block-heading-right-elem">
                                <Link href="/date-converter" className="ok-view-all-btn">
                                    <MdChevronRight width={30} />
                                </Link>
                            </div>

                        </div>
                    </div>
                )
            }
            <div className={`ok-date-converter ${isHome === "true" ? "is-home" : ""}`}>

                <div>
                    <form onSubmit={handleSubmit}>

                        <div className='ok-filter__flex ok-filter-border'>
                            <div className='gap-0'>

                                <div className=" ok-filter__flex">
                                    <div
                                        onClick={handleDropdownClick}
                                        className="ok-select__box ok-select__yr-month ok-yr-month-wrapper ok-select__arrow"
                                        ref={dropdownRef}
                                    >
                                        {dropdownitem === "bs" ? "वि.सं." : "ई.सं."}

                                        {OpenDropdown && (
                                            <div className="ok-yr-month-dropdown ">

                                                <div onClick={() => { setDropdownitem("bs"); }} className={`${dropdownitem === "bs" ? "active" : ""}`}>वि.सं.</div>


                                                <div onClick={() => { setDropdownitem("ad"); }} className={`${dropdownitem === "ad" ? "active" : ""}`} >ई.सं.</div>


                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='ok-filter__flex'>
                                    {
                                        dropdownitem === "bs" ? (
                                            <SelectYear currentdate={currentdate} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
                                        ) : (
                                            <SelectEnglishYear currentdate={currentdate} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
                                        )
                                    }

                                </div>

                                <div className='ok-filter__flex'>
                                    {
                                        dropdownitem === "bs" ? (
                                            <SelectMonth isAll="notall" selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                                        ) : (
                                            <SelectEnglishMonth selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                                        )
                                    }

                                </div>

                                <div className='ok-filter__flex'>
                                    <input autoComplete='off' type="text" name='day' value={day} onChange={handleDay} />
                                </div>


                            </div>
                            <div >
                                <button disabled={isSubmit ? true : false} className="btn btn-medium primary primary-gradient " type="submit"
                                >
                                    {isSubmit ?
                                        (
                                            <>
                                                <span className="loader ok-btn-loader"></span>
                                            </>
                                        )
                                        : "परिवर्तन गर्नुहोस्"}

                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {
                    isHome === "false" && (

                        <div className="converted-date mt-2">
                            {finalDate()}
                        </div>
                    )
                }

                {
                    isHome === "true" && (
                        <div className="ok-ad-placement big mt-1">
                            <Advertisement advertisement={advertisement} handleClick={handleClick} />
                        </div>
                    )
                }

            </div>

            {
                popup && isHome === "true" && !isSubmit && <DatePopup onClose={handleClose} data={finalDate} />
            }
        </>
    );
};

export default DateCalculator;