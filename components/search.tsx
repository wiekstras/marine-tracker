"use client";

import {useForm} from "react-hook-form";
import {SearchSchmea} from "@/schemas";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {
    Search as SearchIcon
} from "lucide-react"

interface SearchProps {
    title: string;
}

const Search: React.FC<SearchProps> = ({title}) => {
    const form = useForm<z.infer<typeof SearchSchmea>>({
        resolver: zodResolver(SearchSchmea),
        defaultValues: {
            search: "",
        },
    });

    const onSumbit = (values: z.infer<typeof SearchSchmea>) => {
        console.log(values);
    }
    return (
        <form onSubmit={(form.handleSubmit(onSumbit))}>
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                <Input
                    type="search"
                    placeholder={title}
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
            </div>
        </form>
    );
};

export default Search;