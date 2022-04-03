import { Line } from "react-chartjs-2"
import groupByDay from "../../utils/dateGrouping";
import { shortUrlAnalytics } from "./AnalyticsComponent.types";
import { ChartContainer as ChartContainerStyled } from "./Chart.styled"

interface LineChartProps {
    series: shortUrlAnalytics[] | undefined
}
export const LineChart = (props: LineChartProps) => {


    if (typeof props.series == 'undefined')
        throw Error("Argument null")

    const series = props.series

    let groupedSeries: _.Dictionary<Date[]>;
    let aggregations: { label: string; count: number }[] = [];
    groupedSeries = groupByDay(series.map((x) => x.createdAt));
    aggregations = Object.keys(groupedSeries).map((x) => ({
        label: x,
        count: groupedSeries[x].length,
    }));
    console.log(aggregations);

    const labels = aggregations.map((x) => new Date(x.label));

    const data = {
        labels,
        datasets: [
            {
                label: `Url clicks count`,
                data: aggregations.map((a) => a.count),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return <ChartContainerStyled>
        <Line
            data={data}
            options={{
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: "time",
                        title: {
                            text: "Day",
                            display: true,
                        },
                        axis: "x",
                        time: {
                            unit: "day",
                            stepSize: 1,
                            displayFormats: {
                                second: "MMM dd",
                                minute: "MMM dd",
                                hour: "MMM dd",
                                day: "MMM dd",
                            },
                        },
                    },
                    y: {
                        type: "linear",
                        title: {
                            text: "Redirects",
                            display: true,
                        },
                        axis: "y",
                        ticks: {
                            precision: 0,
                        },
                    },
                },
            }}
        />
    </ChartContainerStyled>
}