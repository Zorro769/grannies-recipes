import { IoMdClose } from "react-icons/io";
import Filters from "components/Shared/Filters";

const Filter = ({
  onClose,
  values,
  handleFilterSubmit,
  handleTimeChange,
  handleFilterChange,
}) => {
  return (
    <div className="bg-black text-left h-full">
      <div className="flex justify-end p-2">
        <IoMdClose
          className="cursor-pointer text-gray-600 text-xl "
          onClick={() => onClose()}
        />
      </div>
      <div className="px-10">
        <Filters
          values={values}
          handleTimeChange={handleTimeChange}
          handleFilterChange={handleFilterChange}
          handleFilterSubmit={handleFilterSubmit}
        />
      </div>
    </div>
  );
};

export default Filter;
