import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { FiSearch } from "react-icons/fi";
import { useStore } from "../../store/store";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { setFromDate, setToDate, setSelectedCategory, setSelectedSource } =
    useStore((state) => ({
      setFromDate: state.setFromDate,
      setToDate: state.setToDate,
      setSelectedCategory: state.setSelectedCategory,
      setSelectedSource: state.setSelectedSource
    }));
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSelectedSource("");
    setSelectedCategory("");
    setToDate(null);
    setFromDate(null);
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={styles["form-container"]}
    >
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className={styles["input-container"]}>
        <FiSearch aria-hidden="true" className={styles["search-icon"]} />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className={styles["input-style"]}
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;
