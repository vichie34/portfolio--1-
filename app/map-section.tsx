import { useState } from "react";

function MapSection() {
    const [iframeError, setIframeError] = useState(false);

    return (
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
            {iframeError ? (
                // Fallback Image
                <img
                    src="/images.jpeg"
                    alt="Fallback Map"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                // Google Map Embed
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63449.14627712487!2d8.059713918210862!3d6.319858829309671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105ca0692143e095%3A0xe38f8845a6d5a3ae!2sAbakaliki%2C%20Ebonyi!5e0!3m2!1sen!2sng!4v1746486463339!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                    onError={() => setIframeError(true)} // Set error state on iframe load failure
                ></iframe>
            )}
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <div className="bg-background p-4 rounded-lg shadow-lg">
                    <p className="font-bold">Abakaliki, Nigeria</p>
                </div>
            </div>
        </div>
    );
}

export default MapSection;