import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import './dashboard.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getAwbStatusData } from '../../services/dashboard-service';
ChartJS.register(ArcElement, Tooltip, Legend);

const initData = {
    labels: [],
    datasets: [
        {
            label: '# of AWB',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],}

export function AnalyticsAwb(props: any) {
    const [chartData, setChartData] = useState<any>(initData);
    const [data, setData] = useState<any>(initData);

    useEffect(() => {
        getAwbStatusData().then((result: any) => {
            if (result && result.data) {
                setChartData(Object.keys(result.data).map((key) => result.data[key]));
            } 
        });

    }, []);
    
    const data2 = {
        labels: props.labels,
        datasets: [
            {
                label: '# of AWB',
                data: chartData,
                backgroundColor: [
                    // 'rgba(255, 99, 132, 0.2)',
                    // 'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    // 'rgba(255, 99, 132, 1)',
                    // 'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        if (chartData) {
            const currentData = {
                labels:props.labels,
                datasets: [
                    {
                        label: '# of AWB',
                        data: chartData,
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };
    
            setData(currentData)
        } else {
            setData(initData);
        }
        
    }, [props.labels, chartData]);
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    return (
        <Card className="grid-height">
            <CardHeader title="Analystic Progress" />
            <Divider />
            <CardContent>
                <div>
                    <Doughnut data={data2} options={options} />
                </div>
            </CardContent>
        </Card>
    );
}
