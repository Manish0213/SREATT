import React, { useEffect } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected, onClose }) => {

    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    type: "LiveStream",
                    target: document.querySelector("#scanner"),
                    constraints: {
                        facingMode: "environment"
                    }
                },
                decoder: {
                    readers: ["code_128_reader", "ean_reader", "ean_8_reader"]
                }
            },
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
            }
        );

        Quagga.onDetected((data) => {
            const code = data.codeResult.code;
            onDetected(code);
            Quagga.stop();
            onClose();
        });

        return () => {
            Quagga.stop();
        };
    }, []);

    return (
        <div className="scanner-overlay">
            <div className="scanner-wrapper">
                <div id="scanner"></div>

                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default BarcodeScanner;