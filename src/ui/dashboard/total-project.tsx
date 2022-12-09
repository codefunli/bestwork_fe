import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { getProjConstr } from '../../services/dashboard-service';
import './dashboard.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    
const initData = {
    labels:[''],
    datasets: [
        {
            label: '',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: '',
            data: [],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export default function TotalProject(props: any) {
    const { t } = useTranslation();
    const [tableData, setTableData] = useState<any>();
    const [data, setData] = useState<any>(initData);
    
    useEffect(() => {
        getProjConstr(new Date().getFullYear()).then((result: any) => {
            if (result && result.data) {
                setTableData(result.data);
                
            } 
        });
    }, []);

    useEffect(() => {
        if (tableData) {
            const currentData = {
                labels:props.labels,
                datasets: [
                    {
                        label: t('dashBoard.project'),
                        data: props.labels.map((target:any, index:any) => tableData[index][0]),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: t('dashBoard.construction'),
                        data: props.labels.map((target:any, index:any) => tableData[index][1]),
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            };
    
            setData(currentData)
        } else {
            setData(initData);
        }
        
    }, [props.labels, tableData]);

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
            <CardHeader title="Total company" />
            <Divider />
            <CardContent>
                <Bar options={options} data={data} />
            </CardContent>
        </Card>
    );
}
