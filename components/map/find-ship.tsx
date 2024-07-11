import React, { useState, useEffect } from 'react';

interface VesselfinderProps {
    mmsi: number;
}

const Vesselfinder: React.FC<VesselfinderProps> = ({ mmsi }) => {
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('https://www.vesselfinder.com/gallery?mmsi=' + mmsi);
                const text = await response.text();


                // Use DOMParser to parse the response HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const imgElement = doc.querySelector('#gallery img');

                if (imgElement) {
                    setImage(imgElement.getAttribute('src') || '');
                }
            } catch (error) {
                console.error('Error fetching the image:', error);
            }
        };

        fetchImage();
    }, [mmsi]);

    return (
        <div>
            {image ? (
                <img src={image} className="w-56" alt="Vessel" />
            ) : (
                <p>Loading image...</p>
            )}
        </div>
    );
};

export default Vesselfinder;