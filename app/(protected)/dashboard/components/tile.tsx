import { DollarSign } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface TileProps {
    title: string;
    subTitle: string;
    valueIcon: string;
    value: string;
    icon: any;

}
const Tile: React.FC<TileProps> = ({ title, subTitle, valueIcon, value, icon }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{`${valueIcon}${value}`}</div>
                <p className="text-xs text-muted-foreground">{subTitle}</p>
            </CardContent>
        </Card>
    )
}

export default Tile;