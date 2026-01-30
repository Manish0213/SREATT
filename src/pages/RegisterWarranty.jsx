import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";
import "./RegisterWarranty.css";

const RegisterWarranty = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  // 🔥 To track Quagga status safely
  const quaggaRunningRef = useRef(false);

  useEffect(() => {
    if (!showScanner) return;

    const scannerElement = document.getElementById("scanner");

    if (!scannerElement) return;

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerElement,
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
        quaggaRunningRef.current = true;
      }
    );

    Quagga.onDetected((data) => {
      const code = data?.codeResult?.code;
      if (!code) return;

      setSerialNumber(code);

      if (quaggaRunningRef.current) {
        Quagga.stop();
        quaggaRunningRef.current = false;
      }

      setShowScanner(false);
    });

    // 🔥 CLEANUP (VERY IMPORTANT)
    return () => {
      if (quaggaRunningRef.current) {
        Quagga.stop();
        quaggaRunningRef.current = false;
      }
    };
  }, [showScanner]);

  return (
    <section className="register-warranty">
      <h1>Register Warranty</h1>

      <form className="register-warranty-form">
        <div className="form-group full">
          <label>Dealer Name</label>
          <input type="text" placeholder="Enter dealer name" />
        </div>

        <div className="form-group full">
          <label>Address</label>
          <input type="text" placeholder="Enter address" />
        </div>

        <div className="form-group">
          <label>Customer Name</label>
          <input type="text" placeholder="Enter customer name" />
        </div>

        <div className="form-group">
          <label>Customer Mobile Number</label>
          <input type="text" placeholder="Enter mobile number" />
        </div>

        <div className="form-group">
          <label>Vehicle Type</label>
          <input type="text" placeholder="Enter vehicle type" />
        </div>

        <div className="form-group">
          <label>Date of Purchase</label>
          <input type="date" />
        </div>

        <div className="form-group">
          <label>Battery Model Number</label>
          <input type="text" placeholder="Enter model number" />
        </div>

        {/* 🔥 SERIAL NUMBER + SCAN */}
        <div className="form-group">
          <label>Battery Serial Number</label>
          <input
            type="text"
            value={serialNumber}
            placeholder="Scan or enter serial number"
            onChange={(e) => setSerialNumber(e.target.value)}
          />

          <button
            type="button"
            className="scan-btn"
            onClick={() => setShowScanner(true)}
          >
            📷 Scan Barcode
          </button>
        </div>

        {/* 🔥 SCANNER */}
        {showScanner && (
          <div className="scanner-box">
            <div id="scanner" className="quagga-scanner"></div>

            <button
              type="button"
              className="close-btn"
              onClick={() => {
                if (quaggaRunningRef.current) {
                  Quagga.stop();
                  quaggaRunningRef.current = false;
                }
                setShowScanner(false);
              }}
            >
              Close
            </button>
          </div>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default RegisterWarranty;
