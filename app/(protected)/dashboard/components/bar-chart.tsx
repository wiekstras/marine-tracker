"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dummy function to fetch boat data
async function fetchBoatData() {
    try {
        const response = await fetch('/boat', {
            method: "GET",
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error("Failed to fetch boat data:", error);
    }
}

const chartConfig = {
    count: {
        label: "Boat Records",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

type Interval = 'day' | 'hour' | '5min';

export function BarChartComponent() {
    const [chartData, setChartData] = React.useState([]);
    const [interval, setInterval] = React.useState<Interval>('day');

    React.useEffect(() => {
        const loadData = async () => {
            const data = await fetchBoatData();
            const aggregatedData = aggregateData(data, interval);
            setChartData(aggregatedData);
        };

        loadData();
    }, [interval]);

    const aggregateData = (data: any[], interval: Interval) => {
        const aggregated = data.reduce((acc, curr) => {
            let key: string;
            const date = new Date(curr.time);

            switch (interval) {
                case 'hour':
                    key = `${date.toISOString().split('T')[0]} ${date.getUTCHours()}:00`;
                    break;
                case '5min':
                    const minutes = Math.floor(date.getUTCMinutes() / 5) * 5;
                    key = `${date.toISOString().split('T')[0]} ${date.getUTCHours()}:${minutes}`;
                    break;
                case 'day':
                default:
                    key = date.toISOString().split('T')[0];
                    break;
            }

            if (!acc[key]) {
                acc[key] = { date: key, count: 0 };
            }
            acc[key].count += 1;
            return acc;
        }, {});

        return Object.values(aggregated);
    };

    const total = React.useMemo(
        () => ({
            count: chartData.reduce((acc, curr) => acc + curr.count, 0),
        }),
        [chartData]
    );

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Boat Records Over Time</CardTitle>
                    <CardDescription>
                        Showing total boat records per {interval}
                    </CardDescription>
                </div>
                <div className="flex">
                    <button
                        data-active={true}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                    >
                        <span className="text-xs text-muted-foreground">
                            {chartConfig.count.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {total.count.toLocaleString()}
                        </span>
                    </button>
                </div>
            </CardHeader>
            <div className="flex justify-end px-6 py-4">
                <button onClick={() => setInterval('day')} className={`mx-2 ${interval === 'day' ? 'text-blue-500' : ''}`}>Day</button>
                <button onClick={() => setInterval('hour')} className={`mx-2 ${interval === 'hour' ? 'text-blue-500' : ''}`}>Hour</button>
                <button onClick={() => setInterval('5min')} className={`mx-2 ${interval === '5min' ? 'text-blue-500' : ''}`}>5 Minutes</button>
            </div>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return interval === 'day'
                                    ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                                    : interval === 'hour'
                                        ? date.getUTCHours() + ":00"
                                        : date.getUTCHours() + ":" + (date.getUTCMinutes() < 10 ? '0' : '') + date.getUTCMinutes();
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="count"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "numeric"
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar dataKey="count" fill={chartConfig.count.color} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}