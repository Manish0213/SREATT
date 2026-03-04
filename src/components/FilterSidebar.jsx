import '../components/FilterSidebar.css';

const FilterSidebar = ({ filters, setFilters, showFilter, setShowFilter, vehicleTypes, setAppliedFilters, setCurrentPage }) => {



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

        {vehicleTypes.map((type) => (
          <div className="label" key={type.id}>
            <input
              type="checkbox"
              checked={filters.vehicleTypes.includes(type.id)}
              onChange={() => {
                const updated = filters.vehicleTypes.includes(type.id)
                  ? filters.vehicleTypes.filter(id => id !== type.id)
                  : [...filters.vehicleTypes, type.id];

                setFilters({ ...filters, vehicleTypes: updated });
              }}
            />
            <span>{type.name}</span>
          </div>
        ))}
      </div>

      {/* <div className="bettery-technology">
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
      </div> */}

      <div className="capacity">
        <h4>Capacity (Ah)</h4>
        <div className="capacity-btns">

          <button
            className={
              filters.minCapacity === 2.5 && filters.maxCapacity === 5
                ? "active"
                : ""
            }
            onClick={() =>
              setFilters({ ...filters, minCapacity: 2.5, maxCapacity: 5 })
            }
          >
            2.5 Ah - 5 Ah
          </button>

          <button
            className={
              filters.minCapacity === 7 && filters.maxCapacity === 12
                ? "active"
                : ""
            }
            onClick={() =>
              setFilters({ ...filters, minCapacity: 7, maxCapacity: 12 })
            }
          >
            7 Ah - 12Ah
          </button>

          <button
            className={
              filters.minCapacity === 35 && filters.maxCapacity === 65
                ? "active"
                : ""
            }
            onClick={() =>
              setFilters({ ...filters, minCapacity: 35, maxCapacity: 65 })
            }
          >
            35 Ah - 65 Ah
          </button>

          <button
            className={
              filters.minCapacity === 100 && filters.maxCapacity === null
                ? "active"
                : ""
            }
            onClick={() =>
              setFilters({ ...filters, minCapacity: 100, maxCapacity: null })
            }
          >
            100 Ah +
          </button>

        </div>
      </div>

      <button className="apply-btn" onClick={() => { setAppliedFilters(filters); setCurrentPage(1); setShowFilter(false); }}>Apply Filters</button>
      {/* <button className="reset-btn" onClick={() =>
        setFilters({
          vehicleTypes: [],
          minCapacity: null,
          maxCapacity: null
        })
      }>Reset All</button> */}
      <button
        className="reset-btn"
        onClick={() => {
          const reset = {
            vehicleTypes: [],
            minCapacity: null,
            maxCapacity: null
          };

          setFilters(reset);
          setAppliedFilters(reset);
          setCurrentPage(1);
        }}
      >
        Reset All
      </button>
    </div>
  );
};

export default FilterSidebar;