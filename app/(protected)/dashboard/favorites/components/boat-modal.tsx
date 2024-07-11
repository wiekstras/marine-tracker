import React, {useState, useEffect, useMemo} from 'react';
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
import { getBoatById } from "@/lib/actions/boats";
import Vesselfinder from "@/components/map/find-ship";
import dynamic from "next/dynamic";

interface BoatModalProps {
    isOpen: boolean;
    onClose: () => void;
    boatId: string; // Assuming boatId is passed as a prop
}


const BoatModal: React.FC<BoatModalProps> = ({ isOpen, onClose, boatId }) => {
    const Map = useMemo(() => dynamic(
        () => import('@/components/map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    const [boat, setBoat] = useState<any>(null);

    useEffect(() => {
        const fetchBoatData = async () => {
            try {
                const boatData = await getBoatById(boatId);
                setBoat(boatData);
            } catch (error) {
                console.error('Error fetching boat data:', error);
            }
        };

        if (isOpen && boatId) {
            fetchBoatData();
        }
    }, [isOpen, boatId]);

    if (!isOpen) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>

                <Vesselfinder mmsi={boat?.mmsi} /> {/* Display Vesselfinder image */}
                <AlertDialogHeader>
                    <AlertDialogTitle>{boat ? boat.name || "Boat Details" : "Loading..."}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {boat && (
                            <>
                                <p><strong>ID:</strong> {boat.id}</p>
                                <p><strong>MMSI:</strong> {boat.mmsi}</p>
                                <p><strong>Longitude:</strong> {boat.x}</p>
                                <p><strong>Latitude:</strong> {boat.y}</p>
                                <p><strong>COG:</strong> {boat.cog}</p>
                                <p><strong>SOG:</strong> {boat.sog}</p>
                                <p><strong>Timestamp:</strong> {boat.time}</p>
                                {/* Add other details as needed */}
                            </>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
                    <AlertDialogAction onClick={onClose}>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default BoatModal;