import React, { useEffect, useRef } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected, onClose }) => {
  const scannerRef = useRef(null);
  const isQuaggaRunning = useRef(false);

  useEffect(() => {
    if (!scannerRef.current) return;

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "code_39_reader",
            "ean_reader",
            "ean_8_reader",
            "upc_reader",
          ],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("Quagga init error:", err);
          return;
        }
        Quagga.start();
        isQuaggaRunning.current = true;
      }
    );

    Quagga.onDetected((data) => {
      const code = data?.codeResult?.code;
      if (!code) return;

      onDetected(code);

      if (isQuaggaRunning.current) {
        Quagga.stop();
        isQuaggaRunning.current = false;
      }
    });

    // 🔥 CLEANUP
    return () => {
      if (isQuaggaRunning.current) {
        Quagga.stop();
        isQuaggaRunning.current = false;
      }
      Quagga.offDetected();
    };
  }, [onDetected]);

  return (
    <div className="scanner-box">
      <div ref={scannerRef} className="quagga-scanner"></div>

      <button type="button" className="close-btn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default BarcodeScanner;