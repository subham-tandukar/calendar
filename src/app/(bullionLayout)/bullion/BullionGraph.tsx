"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRoot } from '../../../context';
import { arabicToDevanagari, formattedEngDate, formattedNepDate } from '../../../hooks';
import Loading from '../../loading';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BullionGraph = () => {
    const { siteSetting, bullionData, loading } = useRoot();

    const bullion = bullionData && bullionData.length > 0
    const bullionGraph = bullion && bullionData.slice(0, 10)

    const hallmarkData = bullion && bullionGraph.map((item) => item.gold_hallmark_tola)
    const tejabiData = bullion && bullionGraph.map((item) => item.gold_tejabi_tola)
    const silverData = bullion && bullionGraph.map((item) => item.silver_tola)
    const bullionDate = bullion && bullionGraph.map((item) => item.date_bs)

    // Convert string values to numbers
    let goldNumberValues = tejabiData && tejabiData.map((item) => item) || [];

    // Finding the minimum value
    let goldMinimumValue = Math.min(...goldNumberValues);

    // Round down the minimum value to the nearest lower multiple of 1000
    let goldMinValue = Math.floor(goldMinimumValue / 1000) * 1000;

    // Convert string values to numbers
    let silverNumberValues = silverData && silverData.map((item) => item) || [];

    // Finding the minimum value
    let silverMinimumValue = Math.min(...silverNumberValues);

    // Round down the minimum value to the nearest lower multiple of 1000
    let silverMinValue = silverMinimumValue - 10;

    const formattedBullionData = bullionDate && bullionDate.length > 0 && bullionDate.map((item) => formattedNepDate(item))

    // Configuring the Line chart data
    const chartData = {
        labels: formattedBullionData,
        datasets: [
            {
                label: siteSetting?.hallmark_title_np || 'छापावाल',
                data: hallmarkData,
                backgroundColor: 'rgba(255, 215, 0, 0.2)', // Golden color with alpha for background
                borderColor: 'rgba(255, 215, 0, 1)',
                borderWidth: 1,
                yAxisID: 'gold-axis', // Assign to left Y-axis
                pointStyle: 'circle',
                pointRadius: 4,
                pointHoverRadius: 7
            },
            {
                label: siteSetting?.tejabi_title_np || 'तेजाबी',
                data: tejabiData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                yAxisID: 'gold-axis', // Assign to left Y-axis
                pointStyle: 'circle',
                pointRadius: 4,
                pointHoverRadius: 7
            },
            {
                label: siteSetting?.silver_title_np || 'चाँदी',
                data: silverData,
                backgroundColor: 'rgba(192, 192, 192, 0.2)', // Silver color with alpha for background
                borderColor: 'rgba(192, 192, 192, 1)',
                borderWidth: 1,
                yAxisID: 'silver-axis', // Assign to right Y-axis
                pointStyle: 'circle',
                pointRadius: 4,
                pointHoverRadius: 7
            },
        ],
    };
    let delayed;

    return (
        <>
            <div className="">
                <h3 className='ok-title'>
                    {
                        siteSetting?.gold_silver_graph_title_np
                        ||
                        "सुन-चाँदीको ट्रेन्ड"
                    }
                </h3>

                {
                    siteSetting?.gold_silver_graph_subtitle_np && (
                        <div className="ok-content mt-1">
                            <p>
                                {
                                    siteSetting?.gold_silver_graph_subtitle_np
                                }
                            </p>
                        </div>
                    )
                }

                <div className="ok-graph mt-1">
                    <Bar height={270} width={270} data={chartData}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Date (AD)',
                                    },
                                    type: 'category',
                                    labels: formattedBullionData,
                                },
                                'gold-axis': {
                                    type: 'linear',
                                    position: 'left',
                                    title: {
                                        display: true,
                                        text: 'छापावाल र तेजाबी (तोला)',
                                    },
                                    min: goldMinValue,
                                },
                                'silver-axis': {
                                    type: 'linear',
                                    position: 'right',
                                    title: {
                                        display: true,
                                        text: 'चाँदी (तोला)',
                                    },
                                    min: silverMinValue,
                                    grid: {
                                        drawOnChartArea: false, // Prevents the grid lines from appearing on the chart area
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
                        }} />
                </div>
            </div>
        </>
    );
};

export default BullionGraph