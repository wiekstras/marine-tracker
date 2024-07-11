import React, { useState, useEffect } from 'react';
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
import { getBoatById } from "@/actions/boats";
import Vesselfinder from "@/components/map/find-ship";

interface BoatModalProps {
    isOpen: boolean;
    onClose: () => void;
    boatId: string;
}

const BoatModal: React.FC<BoatModalProps> = ({ isOpen, onClose, boatId }) => {
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
                <AlertDialogHeader>
                    <AlertDialogTitle>{boat ? `Boat ID: ${boat._id}` : "Loading..."}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {boat ? (
                            <>
                                <Vesselfinder mmsi={boat.mmsi} /> {/* Display Vesselfinder image */}
                                <p><strong>ID:</strong> {boat.id}</p>
                                <p><strong>MMSI:</strong> {boat.mmsi}</p>
                                <p><strong>Repeat Indicator:</strong> {boat.repeat_indicator}</p>
                                <p><strong>Navigation Status:</strong> {boat.nav_status}</p>
                                <p><strong>ROT Over Range:</strong> {boat.rot_over_range ? 'Yes' : 'No'}</p>
                                <p><strong>ROT:</strong> {boat.rot}</p>
                                <p><strong>SOG:</strong> {boat.sog}</p>
                                <p><strong>Position Accuracy:</strong> {boat.position_accuracy}</p>
                                <p><strong>Longitude (x):</strong> {boat.x}</p>
                                <p><strong>Latitude (y):</strong> {boat.y}</p>
                                <p><strong>COG:</strong> {boat.cog}</p>
                                <p><strong>True Heading:</strong> {boat.true_heading}</p>
                                <p><strong>Timestamp:</strong> {boat.timestamp}</p>
                                <p><strong>Special Manoeuvre:</strong> {boat.special_manoeuvre}</p>
                                <p><strong>Spare:</strong> {boat.spare}</p>
                                <p><strong>RAIM:</strong> {boat.raim ? 'Yes' : 'No'}</p>
                                <p><strong>Sync State:</strong> {boat.sync_state}</p>
                                <p><strong>Slot Timeout:</strong> {boat.slot_timeout}</p>
                                <p><strong>Received Stations:</strong> {boat.received_stations}</p>
                                <p><strong>Original:</strong> {boat.original}</p>
                                <p><strong>Time:</strong> {new Date(boat.time).toLocaleString()}</p>
                            </>
                        ) : (
                            <p>Loading boat data...</p>
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