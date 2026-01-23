import '../components/FilterSidebar.css';

const FilterSidebar = ({ filters, setFilters, showFilter, setShowFilter }) => {
  return (
    <div className={`filter ${showFilter ? "active" : ""}`}>
      {/* <div className="Filter-heading"><i class="fa-solid fa-filter"></i> Filter</div> */}

      {/* Mobile Close */}
      <div className="filter-header">
        <div className="Filter-heading">
          <i className="fa-solid fa-filter"></i> Filter
        </div>
        <span className="close-btn" onClick={() => setShowFilter(false)}>✕</span>
      </div>

      <div className="vehicle-type">
        <h4>Vehicle Type</h4>
        <div className='label'>
          <input
            type="checkbox"
            onChange={() => setFilters({ ...filters, car: !filters.car })}
          />
          <span>Motorcycle</span>
        </div>
        <div className='label'>
          <input
            type="checkbox"
            onChange={() => setFilters({ ...filters, car: !filters.car })}
          />
          <span>Car & SUV</span>
        </div>
        <div className='label'>
          <input
            type="checkbox"
            onChange={() => setFilters({ ...filters, car: !filters.car })}
          />
          <span>Inverter & UPS</span>
        </div>
        <div className='label'>
          <input
            type="checkbox"
            onChange={() => setFilters({ ...filters, car: !filters.car })}
          />
          <span>E-Rickshaw</span>
        </div>
      </div>

      <div className="bettery-technology">
        <h4>Battery Technology</h4>
        <div className='label'>
          <input type="checkbox" /> <span>VRLA Design</span>
        </div>
        <div className='label'>
          <input type="checkbox" /> <span>AGM Technology</span>
        </div>
        <div className='label'>
          <input type="checkbox" /> <span>Pure Lead-Calcium</span>
        </div>
      </div>

      <div className="capacity">
        <h4>Capacity (Ah)</h4>
        <div className="capacity-btns">
          <button>2.5 Ah - 5 Ah</button>
          <button>7 Ah - 12Ah</button>
          <button>35 Ah - 65 Ah</button>
          <button>100 Ah +</button>
        </div>
      </div>

      <button className="apply-btn">Apply Filters</button>
      <button className="reset-btn">Reset All</button>
    </div>
  );
};

export default FilterSidebar;