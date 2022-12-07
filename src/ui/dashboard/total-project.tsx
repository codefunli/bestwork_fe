import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import './dashboard.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.floor(Math.random() * 500)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => Math.floor(Math.random() * 500)),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function TotalProject() {
    return (
        <Card className="grid-height">
            <CardHeader title="Total company" />
            <Divider />
            <CardContent>
                <Bar options={options} data={data} />
            </CardContent>
        </Card>
    );
}
