import Map from "@/components/map";
import {ToolBar} from "@/app/dashboard/analytics/components/tool-bar";

export default function DashboardAnalytics() {
    return (
        <div>
            <div className=" ">
                <ToolBar/>
            </div>
            <div className="">
                <Map/>
            </div>
        </div>

    )
}