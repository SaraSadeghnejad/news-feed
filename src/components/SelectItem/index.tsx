const SelectItem = ({ title, data, onChange, value }) => {
  return (
    <div className="mx-1">
      <label htmlFor={title} className="label-style">
        {title}
      </label>
      <select
        defaultValue={value}
        onChange={onChange}
        id={title}
        className="input-container"
      >
        <option>Choose an item</option>
        {data?.map((item, i) => (
          <option
            key={i}
            value={
              item?.name ||
              item?.author ||
              item?.edition ||
              item?.byline?.original
            }
          >
            {item?.id ||
              item?.author ||
              item?.edition ||
              item?.byline?.original}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectItem;
