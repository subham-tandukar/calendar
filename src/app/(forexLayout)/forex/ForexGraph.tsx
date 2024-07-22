"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../context';
import { arabicToDevanagari, formattedEngDate, formattedNepDate } from '../../../hooks';
import Loading from '../../loading';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import SelectCountry from '../../Components/SelectMonth/SelectCountry';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ForexGraph = () => {
    const { siteSetting, forexData } = useRoot();

    const [selectedCountry, setSelectedCountry] = useState("USD");
    const forex = forexData && forexData.length > 0
    const forexGraph = forex && forexData.slice(0, 14)

    const forexCountry = forex && forexData[0].rates;

    const forexGraphData = forex && forexGraph.map((item) => {
        const buyRate = item.rates.filter((item) => item.currency_code === selectedCountry.toString())[0].buy
        const unit = item.rates.filter((item) => item.currency_code === selectedCountry.toString())[0].unit
        const total = Number(buyRate) / Number(unit)
        return (
            total.toString()
        )
    });
    const forexDate = forex && forexGraph.map((item) => item.date)

    const formattedForexData = forexDate && forexDate.length > 0 && forexDate.map((item) => formattedEngDate(item))

    const chartData = {
        labels: forexDate,
        datasets: [
            {
                label: "",
                data: forexGraphData,
                backgroundColor: 'rgba(29, 99, 237, 0.2)',
                borderColor: 'rgba(29, 99, 237, 1)',
                borderWidth: 1,
            },

        ],
    };
    let delayed;

    return (
        <>
            <div className="">
                <h3 className='ok-title'>
                    {
                        siteSetting?.forex_graph_title_np
                        ||
                        "करेन्सी ट्रेन्ड"
                    }
                </h3>

                <div className="ok-content mt-1">
                    <p>
                        {
                            siteSetting?.forex_graph_subtitle_np
                            ||
                            "नेपाली रुपैयाँको तुलनामा विदेशी मुद्राको उतारचढाव हेर्नुहोस् ।"
                        }
                    </p>
                </div>

                <div className="ok-forex-filter mt-1">
                    <SelectCountry
                        countryList={forexCountry}
                        setSelectedCountry={setSelectedCountry}
                        selectedCountry={selectedCountry}
                    />
                </div>

                <div className="ok-graph mt-1">
                    <Line height={270} width={270} data={chartData}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Date (AD)',
                                    },
                                    type: 'category',
                                    labels: formattedForexData,
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'NPR',
                                    },
                                },
                            },
                            interaction: {
                                intersect: false,
                                mode: 'index',
                            },

                            animation: {
                                onComplete: () => {
                                    delayed = true;
                                },
                                delay: (context) => {
                                    let delay = 0;
                                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                        delay = context.dataIndex * 10 + context.datasetIndex * 0;
                                    }
                                    return delay;
                                },
                            },

                            plugins: {
                                legend: {
                                    display: false, // Disable the legend
                                },
                            },
                        }} />
                </div>
            </div>
        </>
    );
};

export default ForexGraph