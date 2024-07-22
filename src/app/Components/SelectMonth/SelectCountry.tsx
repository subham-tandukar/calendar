"use client"
import React, { useEffect, useRef, useState } from 'react'

const SelectCountry = ({ countryList, selectedCountry, setSelectedCountry }) => {

    const [OpenDropdown, setOpenDropdown] = useState(false);
    const dropdownMonthRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Function to close dropdown when clicking outside
        function handleClickOutside(event) {

            if (dropdownMonthRef.current && !dropdownMonthRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleDropdownClick = () => {
        setOpenDropdown(!OpenDropdown);
        setSearchQuery('')
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const sanitizeString = (str) => str.replace(/[.]/g, '').toLowerCase();

    const filteredCountryList = countryList && countryList.filter((item) =>
        sanitizeString(item.currency_title).includes(sanitizeString(searchQuery))
    );

    return (
        <div
            className="ok-select__box ok-select__yr-month ok-yr-month-wrapper ok-select__arrow"
            onClick={handleDropdownClick}
            ref={dropdownMonthRef}
        >

            {
                countryList && countryList.filter((item) => item.currency_code === selectedCountry).map((item) => {
                    return (
                        <div className='ok-country-info' key={item.currency_code}>
                            <img src={item.thumbnail} alt={item.currency_title} />
                            {item.currency_title}
                        </div>
                    )
                })
            }
            {
                OpenDropdown && (
                    <div
                        className="ok-yr-month-dropdown"
                    >
                        <div>
                            <input
                                type="text"
                                placeholder='देश खोज्नुहोस्'
                                onClick={(e) => e.stopPropagation()}
                                onChange={handleSearchChange}
                                value={searchQuery}
                            />
                        </div>
                        {
                            filteredCountryList.map((item) => (
                                <div
                                    onClick={() => {
                                        setSelectedCountry(item.currency_code);
                                    }}
                                    key={item.id}
                                    className={selectedCountry === item.currency_code ? "active" : ""}
                                >
                                    <img src={item.thumbnail} alt={item.currency_title} />
                                    {item.currency_title}
                                </div>
                            ))
                        }



                    </div>
                )
            }
        </div>
    )
}

export default SelectCountry