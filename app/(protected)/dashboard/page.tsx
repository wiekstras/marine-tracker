import {BarChartComponent} from "@/app/(protected)/dashboard/components/bar-chart";
import {LineChartComponent} from "@/app/(protected)/dashboard/components/line-chart";
import BoatTable from "@/app/(protected)/dashboard/components/boat-table";

export default function DashboardBoats() {
    return (
        <div>
            <BarChartComponent/>
            <LineChartComponent/>
        </div>

    )
}