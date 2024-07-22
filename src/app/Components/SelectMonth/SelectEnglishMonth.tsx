"use client"
import React, { useEffect, useRef, useState } from 'react'
import { engMonthNames, selectEngMonthList } from '../../../hooks';

const SelectEnglishMonth = ({ selectedMonth, setSelectedMonth }) => {

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
            {engMonthNames[selectedMonth - 1]}

            {
                OpenMonthDropdown && (
                    <div
                        className="ok-yr-month-dropdown"
                    >

                        <div className="disabled">Select Month</div>
                        {
                            selectEngMonthList.map((item) => (
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

export default SelectEnglishMonth