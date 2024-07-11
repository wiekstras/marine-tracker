"use client";

import React, { useState, useEffect } from 'react';
import Vesselfinder from '@/components/map/find-ship';
import { getLikedBoats } from "@/data/like-ship";
import { useCurrentUser } from "@/hooks/use-current-user";
import BoatModal from "@/app/(protected)/dashboard/favorites/components/boat-modal";

const ITEMS_PER_PAGE = 30; // 6 columns * 5 rows
const MAX_PAGE_BUTTONS = 5; // Maximum number of page buttons to display

const BoatGrid = () => {
    const [boats, setBoats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBoatId, setSelectedBoatId] = useState<string | null>(null);
    const user = useCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const data = await getLikedBoats(user?.id);
                setBoats(data || []);
                setTotalPages(Math.ceil((data?.length || 0) / ITEMS_PER_PAGE));
            } catch (error) {
                console.error("Error fetching liked boats:", error);
                setBoats([]);
            }
        };

        fetchData();
    }, [user]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleBoatClick = (boatId: number) => {
        setSelectedBoatId(boatId);
    };

    const handleCloseModal = () => {
        setSelectedBoatId(null);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentBoats = boats.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const renderPageButtons = () => {
        const pageButtons = [];
        const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
        const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

        if (startPage > 1) {
            pageButtons.push(
                <button key={1} onClick={() => handlePageChange(1)} className="px-4 py-2 m-1 rounded bg-blue-500 text-white">
                    1
                </button>
            );
            if (startPage > 2) {
                pageButtons.push(<span key="start-ellipsis" className="px-4 py-2 m-1">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 m-1 rounded ${currentPage === i ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageButtons.push(<span key="end-ellipsis" className="px-4 py-2 m-1">...</span>);
            }
            pageButtons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-4 py-2 m-1 rounded bg-blue-500 text-white"
                >
                    {totalPages}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-6 gap-4">
                {currentBoats.map((boat) => (
                    <div
                        key={boat.mmsi}
                        className="border rounded p-4 cursor-pointer hover:shadow-lg"
                        onClick={() => handleBoatClick(boat.boatId)}
                    >
                        <h3 className="text-lg font-semibold">{boat.mmsi || 'Unnamed Vessel'}</h3>
                        <Vesselfinder mmsi={boat.mmsi} isVisible={true} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 space-x-1">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 m-1 text-white bg-blue-500 rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                {renderPageButtons()}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 m-1 text-white bg-blue-500 rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
            {selectedBoatId && (
                <BoatModal boatId={selectedBoatId} isOpen={true} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default BoatGrid;