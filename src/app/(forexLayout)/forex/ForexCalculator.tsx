"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../context';
import { arabicToDevanagari, formattedEngDate, formattedNepDate } from '../../../hooks';
import PageLoading from '../../page-loading';
import { MdChevronRight } from 'react-icons/md';
import SelectCountry from '../../Components/SelectMonth/SelectCountry';
import Advertisement from '../../Components/Advertisement/Advertisement';

const ForexCalculator = ({ isHome }) => {
    const { siteSetting, forexData, forexLoading, adData, handleAdClick } = useRoot();

    const forex = forexData && forexData.length > 0
    const todayForex = forex && forexData[0]
    const forexCountry = forex && forexData[0].rates;

    const [baseCurrency, setBaseCurrency] = useState("USD");
    const [targetCurrency, setTargetCurrency] = useState("NPR");
    const [amountBase, setAmountBase] = useState(1);
    const [amountTarget, setAmountTarget] = useState(0);

    const nepaleseCurrency = [
        {
            "id": 0,
            "currency_code": "NPR",
            "currency_title": "Nepalese Rupee",
            "thumbnail": "https://flagcdn.com/np.svg",
            "unit": "1",
            "buy": "1",
            "sell": "1"
        }
    ]

    const allCountry = forexCountry && nepaleseCurrency.concat(forexCountry)

    const baseCountry = allCountry && allCountry.filter((item) => item.currency_code !== targetCurrency)
    const targetCountry = allCountry && allCountry.filter((item) => item.currency_code !== baseCurrency)

    useEffect(() => {
        updateTargetAmount(amountBase);
    }, [amountBase, allCountry]);

    const handleBaseAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setAmountBase(isNaN(value) ? 0 : value);
        updateTargetAmount(isNaN(value) ? 0 : value);
    };

    const handleTargetAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setAmountTarget(isNaN(value) ? 0 : value);
        updateBaseAmount(isNaN(value) ? 0 : value);
    };

    const updateTargetAmount = (baseValue) => {
        const baseCurrencyData = allCountry && allCountry.find(currency => currency.currency_code === baseCurrency) || {};
        const targetCurrencyData = allCountry && allCountry.find(currency => currency.currency_code === targetCurrency) || {};

        const baseRate = parseFloat(baseCurrencyData.buy) / (parseFloat(baseCurrencyData.unit) || 1);
        const targetRate = parseFloat(targetCurrencyData.sell) / (parseFloat(targetCurrencyData.unit) || 1);

        const convertedAmount = (baseValue * baseRate) / targetRate;
        setAmountTarget(isNaN(convertedAmount) ? 0 : convertedAmount);
    };

    const updateBaseAmount = (targetValue) => {
        const baseCurrencyData = allCountry && allCountry.find(currency => currency.currency_code === baseCurrency) || {};
        const targetCurrencyData = allCountry && allCountry.find(currency => currency.currency_code === targetCurrency) || {};

        const baseRate = parseFloat(baseCurrencyData.buy) / (parseFloat(baseCurrencyData.unit) || 1);
        const targetRate = parseFloat(targetCurrencyData.sell) / (parseFloat(targetCurrencyData.unit) || 1);

        const convertedAmount = (targetValue * targetRate) / baseRate;
        setAmountBase(isNaN(convertedAmount) ? 0 : convertedAmount);
    };


    let slug = "homepage-below-currency-converter"

    const filterAd = adData && adData.filter((item) => item.slug === slug);

    const advertisement = adData && filterAd.length > 0 && filterAd[0].advertisements[0]

    const handleClick = () => {
        handleAdClick(advertisement)
    };

    return (
        <>
            <div className="ok-card-all-festivals">

                <div className="ok-block">
                    <div className="ok-block-heading">
                        <h3>
                            {/* {
                                siteSetting?.today_gold_silver_title_np ||
                                "आजको सुन, चाँदीको दर"
                            } */}
                            मुद्रा रूपान्तरण
                        </h3>
                        {
                            isHome === "true" && (
                                <div className="ok-block-heading-right-elem">
                                    <Link href="/forex" className="ok-view-all-btn">
                                        <MdChevronRight width={30} />
                                    </Link>
                                </div>
                            )
                        }

                    </div>
                </div>

                {
                    forexLoading ? (
                        <PageLoading />
                    )
                        : (
                            <div className="ok-forex-container">
                                <div className="today-forex">
                                    {
                                        todayForex && (
                                            <>
                                                <div className='flex-between'>
                                                    <div className='ok-card-date'>
                                                        {formattedNepDate(todayForex.date_bs)} - {formattedEngDate(todayForex.date)}
                                                    </div>

                                                </div>
                                            </>
                                        )
                                    }
                                </div>

                                <div className="">
                                    <div className="ok-forex-calculator">
                                        <div>
                                            <label>Amount</label>
                                            <div className='wrapper'>
                                                <div>
                                                    <input type="text" value={amountBase.toFixed(3).toString().replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')}
                                                        onChange={handleBaseAmountChange} />
                                                </div>

                                                <div className='ok-forex-filter'>
                                                    <SelectCountry
                                                        countryList={baseCountry}
                                                        setSelectedCountry={setBaseCurrency}
                                                        selectedCountry={baseCurrency} />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label>Converted to</label>
                                            <div className='wrapper'>
                                                <div>
                                                    <input type="text" value={amountTarget.toFixed(3).toString().replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')}
                                                        onChange={handleTargetAmountChange} />
                                                </div>

                                                <div className='ok-forex-filter'>
                                                    <SelectCountry
                                                        countryList={targetCountry}
                                                        setSelectedCountry={setTargetCurrency}
                                                        selectedCountry={targetCurrency} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='ok-forex-value'>
                                        <h2 className='ok-title small'>
                                            1
                                            {" "}
                                            {
                                                baseCountry && baseCountry.filter((item) => item.currency_code === baseCurrency).map((item) => {
                                                    return (
                                                        <React.Fragment key={item.currency_code}>
                                                            {item.currency_title}
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                            {" "}
                                            equals
                                        </h2>
                                        <p className='ok-main-title small'>
                                            {
                                                baseCountry && baseCountry.filter((item) => item.currency_code === baseCurrency).map((item) => {
                                                    const buyrate = item.buy;
                                                    const buyunit = item.unit;
                                                    const basetotal = buyrate / buyunit;

                                                    return (
                                                        <React.Fragment key={item.currency_code}>
                                                            {
                                                                targetCountry && targetCountry.filter((item) => item.currency_code === targetCurrency).map((item) => {
                                                                    const buy = item.buy;
                                                                    const unit = item.unit;
                                                                    const targettotal = buy / unit;
                                                                    const total = basetotal / targettotal
                                                                    return (
                                                                        parseFloat(total.toFixed(3).toString().replace(/\.00$/, ''))
                                                                    )
                                                                })
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                            {" "}
                                            {
                                                targetCountry && targetCountry.filter((item) => item.currency_code === targetCurrency).map((item) => {
                                                    return (
                                                        <React.Fragment key={item.currency_code}>
                                                            {item.currency_title}
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                            {" "}
                                        </p>
                                    </div>
                                </div>

                                {
                                    isHome === "true" && (
                                        <div className="ok-ad-placement small mt-1">
                                            <Advertisement advertisement={advertisement} handleClick={handleClick} />
                                        </div>
                                    )
                                }
                            </div>
                        )
                }
            </div>

        </>
    );
};

export default ForexCalculator