"use client"
import React, { useEffect, useState, useRef } from 'react';
import Select, { components } from 'react-select';
import { arabicToDevanagari, limitedUpcomingYearList, limitedYearList, upcomingYearList, yearList } from '../../../hooks';
import { useRoot } from '../../../context';



const SelectUpcomingYear = ({ currentdate, selectedYear, setSelectedYear }) => {
    const { siteSetting } = useRoot();

    const startYear = Number(siteSetting?.start_year_bs) || 2031;
    const endYear = Number(siteSetting?.end_year_bs) || 2200;

    const yearData: number[] = upcomingYearList(endYear);
    const limitedYearData: number[] = limitedUpcomingYearList();
    const [inputValue, setInputValue] = useState<string>('');

    const dropDownYear = yearData
        .filter((item) => item.toString().startsWith(inputValue))
        .map((item) => ({
            value: item,
            label: arabicToDevanagari(item).toString(),
        }));

    const limitedDropDownYear = limitedYearData
        .filter((item) => item.toString().startsWith(inputValue))
        .map((item) => ({
            value: item,
            label: item.toString(),
        }));

    useEffect(() => {
        if (currentdate) {
            setSelectedYear(Number(currentdate?.bs_year_en));
        }
    }, [currentdate, setSelectedYear]);

    const customStyles = {
        menu: (provided: any, state: any) => ({
            ...provided,
            background: "#f9f9fd",
            border: "solid 1px #a0a0a0a6",
            boxShadow: "none",
            lineHeight: "20px",
            fontSize: "14px",
            top: "80%",
            cursor: "pointer !important",
            width: state.selectProps.options && state.selectProps.options.length > 0 ? "100px" : "160px",
            zIndex: "100",
        }),
        menuList: (provided: any, state: any) => ({
            ...provided,
            cursor: "pointer",
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            cursor: "pointer",
        }),
        placeholder: (provided: any, state: any) => ({
            ...provided,
            fontSize: "13px",
            color: "rgba(51, 51, 51, 0.8) !important",
            fontWeight: "600"
        }),
    };

    // Custom MenuList component to handle scroll behavior
    const MenuList = (props) => {
        const selectedOptionIndex = props.options.findIndex(option => option.value === selectedYear);
        const menuListRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (props.selectProps.menuIsOpen && menuListRef.current) {
                const menu = menuListRef.current;
                const selectedOption = menu.children[selectedOptionIndex] as HTMLDivElement;
                if (selectedOption) {
                    const menuHeight = menu.offsetHeight;
                    const optionHeight = selectedOption.offsetHeight;
                    const scrollPosition = selectedOption.offsetTop - (menuHeight / 2) + (optionHeight / 2);
                    menu.scrollTo({
                        top: scrollPosition,
                        behavior: 'smooth',
                    });
                }
            }
        }, [props.selectProps.menuIsOpen, selectedOptionIndex]);

        return (
            <components.MenuList {...props} innerRef={menuListRef}>
                {props.children}
            </components.MenuList>
        );
    };

    return (
        <div className="ok-select__box ok-select__yr-month p-0">
            <Select
                placeholder={selectedYear}
                isSearchable
                styles={customStyles}
                components={{ MenuList }}
                noOptionsMessage={() => "तपाइले खोज्नुभएको वर्ष यहाँ लेख्नुहोस्"}
                options={inputValue ? dropDownYear : dropDownYear} // Conditionally render the dropdown
                onInputChange={(newValue) => setInputValue(newValue)} // Track user input
                onChange={(selectedOption) => {

                    setSelectedYear(selectedOption && selectedOption.value)

                }
                }
                value={dropDownYear.find((option) => option.value === selectedYear)}
            />
        </div>
    );
};

export default SelectUpcomingYear;
