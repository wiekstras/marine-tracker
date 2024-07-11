"use client";

import React, { useState, useEffect } from 'react';
import Vesselfinder from '@/components/map/find-ship';
import { fetchBoats } from '@/lib/actions/boats';
import BoatModal from "@/app/(protected)/dashboard/favorites/components/boat-modal";


const ITEMS_PER_PAGE = 30; // 6 columns * 5 rows

const BoatGrid = () => {
    const [boats, setBoats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBoatId, setSelectedBoatId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchBoats();
            setBoats(data);
            setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
        };

        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleBoatClick = (boatId) => {
        setSelectedBoatId(boatId);
    };

    const handleCloseModal = () => {
        setSelectedBoatId(null);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentBoats = boats.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const nextBoats = boats.slice(startIndex + ITEMS_PER_PAGE, startIndex + 2 * ITEMS_PER_PAGE);

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {currentBoats.map((boat) => (
                    <div key={boat._id} className="border rounded p-4" onClick={() => handleBoatClick(boat._id)}>
                        <h3 className="text-lg font-semibold">{boat.name || 'Unnamed Vessel'}</h3>
                        <Vesselfinder mmsi={boat.mmsi} isVisible={true} />
                    </div>
                ))}
                {nextBoats.map((boat) => (
                    <div key={boat._id} style={{ display: 'none' }}>
                        <Vesselfinder mmsi={boat.mmsi} isVisible={false} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 m-1 text-white bg-blue-500 rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 m-1 rounded ${currentPage === index + 1 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`}
                    >
                        {index + 1}
                    </button>
                ))}
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