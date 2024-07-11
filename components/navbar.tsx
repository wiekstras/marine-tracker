import Search from "@/components/search";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {CircleUser} from "lucide-react";
import Link from "next/link";
import { signOut } from "@/auth"



export const Navbar = () => {
    return (
        <div className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1">
                <Search title="Zoek"/>
            </div>
            <div>
                <img src="/logo.png" height="30" width="40" alt=""/>
            </div>
            <Button variant="default" size="default">
                <a href="/dashboard">
                    <span className="">Dasboard</span>
                </a>
            </Button>
            <ModeToggle/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5"/>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        {/*<form*/}
                        {/*    action={async () => {*/}
                        {/*        "use server"*/}
                        {/*        await signOut()*/}
                        {/*    }}*/}
                        {/*/>*/}
                        Logoutasdasd
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
);
};