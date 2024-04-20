import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import SelectItem from "../SelectItem";
import { categoryLists } from "../../db/data";
import { useSourceQuery } from "../../hooks/useSourceQuery";
import { useStore } from "../../store/store";

const SearchPickers = () => {
  const { data: sources } = useSourceQuery();

  const {
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    setSelectedCategory,
    selectedCategory,
    setSelectedSource,
    selectedSource
  } = useStore((state) => ({
    fromDate: state.fromDate,
    toDate: state.toDate,
    setFromDate: state.setFromDate,
    setToDate: state.setToDate,
    setSelectedCategory: state.setSelectedCategory,
    selectedCategory: state.selectedCategory,
    setSelectedSource: state.setSelectedSource,
    selectedSource: state.selectedSource
  }));
  return (
    <div className="flex flex-wrap mx-3 ">
      <div className="mx-2">
        <div className="label-style">From</div>
        <DatePicker
          className="input-container"
          onChange={(date) => {
            setFromDate(date);
            setSelectedSource("");
            setSelectedCategory("");
          }}
          value={fromDate}
        />
      </div>
      <div>
        <div className="label-style">To</div>
        <DatePicker
          className="input-container"
          onChange={(date) => {
            setToDate(date);
            setSelectedSource("");
            setSelectedCategory("");
          }}
          value={toDate}
        />
      </div>
      <SelectItem
        title={"Categories"}
        data={categoryLists}
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      />
      <SelectItem
        title={"Sources"}
        data={sources}
        onChange={(e) => {
          setSelectedSource(e.target.value);
          setSelectedCategory("");
        }}
        value={selectedSource}
      />
    </div>
  );
};

export default SearchPickers;
