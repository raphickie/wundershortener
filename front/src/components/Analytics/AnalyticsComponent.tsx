import { Box, Button, chakra, Spinner, Input, StatHelpText, ScaleFade } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { SERVER_ENDPOINTS } from "../../config"
import { useMatch } from "react-router-dom";
import groupByDay from "../../utils/dateGrouping";
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js';
import { analyticsState } from "./AnalyticsComponent.types";
Chart.register(...registerables);

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
    }, [urlId])

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
                label: `Url clicks count`,
                data: aggregations.map(a => a.count),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return !state.data ? <Spinner width={20} height={20} /> :
        < div style={{ height: "300px", width: "450px", position: "relative", marginBottom: "1%", padding: "1%" }} >
            <Line
                data={data}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            title: {
                                text: 'Day',
                                display: true,
                            },
                            axis: 'x',
                            time: {
                                unit: "day",
                                stepSize: 1,
                                displayFormats: {
                                    second: 'MMM dd',
                                    minute: 'MMM dd',
                                    hour: 'MMM dd',
                                    day: 'MMM dd',
                                }
                            }
                        },
                        y: {
                            type: 'linear',
                            title: {
                                text: 'Redirects',
                                display: true,
                            },
                            axis: 'y',
                            ticks: {
                                precision: 0
                            }
                        }

                    }
                }}
            />
        </div >
}
export default UrlShortenerForm;