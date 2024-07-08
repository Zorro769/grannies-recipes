import React from "react";
import Filters from "components/Shared/Filters";
import sorts from "helpers/filterData";
import Select from "react-select";
import colorStyle from "helpers/styleReactSelect";

const SearchFilters = ({
  values,
  handleTimeChange,
  handleSortChanged,
  handleFilterChange,
  handleFilterSubmit,
}) => {
  const getCurrentSort = () => {
    const sortValue = values.sorts;
    return sorts.find((sort) => sort.label === sortValue.label) || sorts[0];
  };
  return (
    <aside>
      <div className="text-left max-w-full font-bold text-[#1FB137]">
        <Select
          options={sorts}
          value={getCurrentSort()}
          name="sort"
          defaultValue={sorts[0]}
          styles={colorStyle}
          onChange={handleSortChanged}
        />
      </div>

      <Filters
        values={values}
        handleTimeChange={handleTimeChange}
        handleFilterChange={handleFilterChange}
        handleFilterSubmit={handleFilterSubmit}
      />
    </aside>
  );
};

export default SearchFilters;
