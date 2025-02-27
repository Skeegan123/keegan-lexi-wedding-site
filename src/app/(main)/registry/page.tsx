"use client"
import { useEffect } from "react";

export default function Registry() {
    useEffect(() => {
        // Create script element
        const script = document.createElement('script');
        script.id = 'zola-wjs';
        script.async = true;
        script.src = 'https://widget.zola.com/js/widget.js';
        document.body.appendChild(script);
        
        // Clean up function to remove script when component unmounts
        return () => {
            const existingScript = document.getElementById('zola-wjs');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="registry-container">
            <a 
                className="zola-registry-embed" 
                href="https://www.zola.com/registry/alexisandkeegan2024" 
                data-registry-key="alexisandkeegan2024"
            >
                Our Zola Wedding Registry
            </a>
        </div>
    );
}