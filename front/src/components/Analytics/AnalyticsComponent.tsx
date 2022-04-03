import { Box, Button, chakra, Spinner, Input, StatHelpText, ScaleFade } from "@chakra-ui/react";
import axios from "axios";
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { SERVER_ENDPOINTS } from "../../config"
import { useMatch } from "react-router-dom";
import groupByDay from "../../utils/dateGrouping";
import { Line } from 'react-chartjs-2'
import { Chart as Chartjs, registerables } from 'chart.js';
Chartjs.register(...registerables);
interface analyticsState {
    error: string | null,
    data?: shortUrlAnalytics[]
}

interface shortUrlAnalytics {
    createdAt: Date
}


function UrlShortenerForm() {

    const [state, setState] = useState<analyticsState>({ error: null });

    const match = useMatch("/analytics/:id")
    const urlId = match?.params.id
    useEffect(() => {
        async function getData() {
            const result = await axios.get(`${SERVER_ENDPOINTS}/api/analytics/${urlId}`)
                .then((response) => response.data)
            setState(o => ({ ...o, data: result }))
        }
        getData()
    }, [])
    let q: _.Dictionary<Date[]>;
    let aggregations: { label: string, count: number }[] = []
    if (state?.data) {
        q = groupByDay(state.data.map(x => x.createdAt))
        aggregations = Object.keys(q).map(x => ({ label: x, count: q[x].length }))
        console.log(aggregations)
    }

    if (!state.data && !state.error) {
        return <Spinner width={20} height={20} />
    }

    if (state.error) {
        return <h1>{'An error occurred'}</h1>
    }

    const labels = aggregations.map(x => new Date(x.label))

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: aggregations.map(a => a.count),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return !state.data ? <Spinner width={20} height={20} /> :
        < div >
            <Line
                data={data}
                options={{
                    scales: {
                        x: {
                            type: 'time',
                            axis: 'x',
                            // time: {
                            //     unit: "hour",
                            //     stepSize: 1000,
                            //     displayFormats: {
                            //         millisecond: 'MMM DD',
                            //         second: 'MMM DD',
                            //         minute: 'MMM DD',
                            //         hour: 'MMM DD',
                            //         day: 'MMM DD',
                            //         week: 'MMM DD',
                            //         month: 'MMM DD',
                            //         quarter: 'MMM DD',
                            //         year: 'MMM DD',
                            //     }
                            // }

                        }

                    }
                }}
            />
        </div >
}
export default UrlShortenerForm;