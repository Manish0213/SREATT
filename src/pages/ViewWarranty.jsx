import React from 'react'
import './ViewWarranty.css'

const ViewWarranty = () => {
  return (
    <section className="view-warranty">
      <h1>View Warranty</h1>

      <form className="view-warranty-form">
        <div className="form-group full">
          <label htmlFor="serialNumber">Battery Serial Number</label>
          <input
            type="text"
            id="serialNumber"
            placeholder="Enter battery serial number"
          />
        </div>

        <div className="form-group full">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            placeholder="Enter registered mobile number"
          />
        </div>

        <div className="form-group full">
          <label htmlFor="purchaseDate">Date of Purchase</label>
          <input type="date" id="purchaseDate" />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </section>
  )
}

export default ViewWarranty