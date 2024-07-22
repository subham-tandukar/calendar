"use client"
import React, { useEffect, useRef, useState } from 'react'
import { allmonthNames } from '../../../hooks';

const SelectUpcomingMonth = ({ selectedMonth, setSelectedMonth, monthList }) => {

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
            {allmonthNames[selectedMonth] || <small>महिना रोज्नुहोस्</small> }

            {
                OpenMonthDropdown && (
                    <div
                        className="ok-yr-month-dropdown"
                    >


                        <div className="disabled">महिना रोज्नुहोस्</div>

                        {
                            monthList.map((item) => (
                                <div
                                    onClick={() => {
                                        setSelectedMonth(item);
                                    }}
                                    key={item}
                                    className={selectedMonth === item ? "active" : ""}
                                >
                                    {allmonthNames[item]}
                                </div>
                            ))
                        }


                    </div>
                )
            }
        </div>
    )
}

export default SelectUpcomingMonth