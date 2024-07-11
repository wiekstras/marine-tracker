"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BoatTableProps {
    data: any[];
}

export default function BoatTable({ data }: BoatTableProps) {
    const [boats, setBoats] = useState(data);
    const [selectedBoat, setSelectedBoat] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setBoats(data);
    }, [data]);

    const handleInfoClick = (boat) => {
        setSelectedBoat(boat);
    };

    const handleClose = () => {
        setSelectedBoat(null);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => {
            const maxPage = Math.ceil(boats.length / itemsPerPage);
            return Math.min(prevPage + 1, maxPage);
        });
    };
    console.log(data);
    const paginatedBoats = boats.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
    );


    return (
        <Card>
            <CardHeader className="px-7">
                <CardTitle>Boats</CardTitle>
                <CardDescription>All the boats that encountered this AIS station</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>MMSI</TableHead>
                            <TableHead className="hidden sm:table-cell">Type and Cargo</TableHead>
                            <TableHead className="hidden sm:table-cell">Speed Over Ground (SOG)</TableHead>
                            <TableHead className="hidden md:table-cell">Date Last Seen</TableHead>
                            <TableHead className="text-right">Info</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedBoats.map((boat) => (
                            <TableRow key={boat._id}>
                                <TableCell>
                                    <div className="font-medium">{boat.mmsi}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{boat.type_and_cargo || 'N/A'}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge className="text-xs" variant="secondary">
                                        {boat.sog || 'N/A'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{boat.time ? new Date(boat.time).toLocaleString() : 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    <Button size="icon" variant="default" className="rounded-2xl" onClick={() => handleInfoClick(boat)}>+</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-between mt-4">
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(boats.length / itemsPerPage)}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>

            {selectedBoat && (
                <AlertDialog open={true} onOpenChange={handleClose}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{selectedBoat.mmsi}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {Object.keys(selectedBoat).map((key) => (
                                    <p key={key}><strong>{key}:</strong> {selectedBoat[key]}</p>
                                ))}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleClose}>Close</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClose}>OK</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </Card>
    );
}