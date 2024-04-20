import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.scss'
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={styles['form-container']}
    >
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className={styles['input-container']}>
        <FiSearch aria-hidden="true" className={styles['search-icon']} />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className={styles['input-style']}
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
