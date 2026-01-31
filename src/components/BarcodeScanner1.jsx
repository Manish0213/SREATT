import React, { useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScanner = ({ onDetected, onClose }) => {
  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(
      null,
      "video",
      (result, err) => {
        if (result) {
          onDetected(result.getText());
          codeReader.reset();
          onClose();
        }
      }
    );

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div className="scanner-overlay">
      <div className="scanner-wrapper">
        <video
          id="video"
          style={{
            width: "90vw",
            maxWidth: "360px",
            aspectRatio: "4 / 3",
            borderRadius: "14px",
            background: "#000",
          }}
        ></video>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BarcodeScanner;