"use client"
import React, { useEffect, useRef, useState } from 'react'
import { allmonthNames, selectMonthList } from '../../../hooks';

const SelectMonth = ({ selectedMonth, setSelectedMonth, isAll }) => {

    const [OpenMonthDropdown, setOpenMonthDropdown] = useState(false);
    const dropdownMonthRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to close dropdown when clicking outside
        function handleClickOutside(event) {

            if (dropdownMonthRef.current && !dropdownMonthRef.current.contains(event.target)) {
                setOpenMonthDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleMonthDropdownClick = () => {
        setOpenMonthDropdown(!OpenMonthDropdown);
    };

    return (
        <div
            className="ok-select__box ok-select__yr-month ok-yr-month-wrapper ok-select__arrow"
            onClick={handleMonthDropdownClick}
            ref={dropdownMonthRef}
        >
            {allmonthNames[selectedMonth === "-1" ? "0" : selectedMonth]}

            {
                OpenMonthDropdown && (
                    <div
                        className="ok-yr-month-dropdown"
                    >

                        {
                            isAll === "all" ? (

                                <div
                                    onClick={() => {
                                        setSelectedMonth("-1");
                                    }}
                                    className={selectedMonth === "-1" ? "active" : ""}>
                                    सबै
                                </div>
                            ) : (
                                <div className="disabled">महिना रोज्नुहोस्</div>
                            )
                        }
                        {
                            selectMonthList.map((item) => (
                                <div
                                    onClick={() => {
                                        setSelectedMonth(item.value);
                                    }}
                                    key={item.value}
                                    className={selectedMonth === item.value ? "active" : ""}
                                >
                                    {item.label}
                                </div>
                            ))
                        }


                    </div>
                )
            }
        </div>
    )
}

export default SelectMonth