import "swiper/css";
import "swiper/css/free-mode";
import { categoryLists } from "../../db/data";
import SelectItem from "../SelectItem";
import { useStore } from "../../store/store";
import { useState } from "react";
import { useSourceQuery } from "../../hooks/useSourceQuery";
import { useAuthorQuery } from "../../hooks/useAuthorQuery";
import styles from "./styles.module.scss";
const FavoriteNews = () => {
  const { data: sources } = useSourceQuery();
  const { data: authors } = useAuthorQuery();
  const { CategoryList, SourceList, AuthorList, addToFavoriteList } = useStore(
    (state) => ({
      CategoryList: state.CategoryList,
      SourceList: state.SourceList,
      AuthorList: state.AuthorList,
      addToFavoriteList: state.addToFavoriteList
    })
  );

  const [category, setCategory] = useState(CategoryList.id);
  const [source, setSource] = useState(SourceList.id);
  const [author, setAuthor] = useState(AuthorList.id);
  const handleCategory = (e) => {
    setCategory(e.target.value);
    addToFavoriteList("Categories", e.target.value);
  };
  const handleSource = (e) => {
    setSource(e.target.value);
    addToFavoriteList("Sources", e.target.value);
  };
  const handleAuthor = (e) => {
    setAuthor(e.target.value);
    addToFavoriteList("Authors", e.target.value);
  };
  console.log(sources);
  return (
    <div className={styles["favorite-container"]}>
      <button></button>
      <SelectItem
        title={"Categories"}
        data={categoryLists}
        onChange={handleCategory}
        value={category}
      />
      <SelectItem
        title={"Sources"}
        data={sources}
        onChange={handleSource}
        value={source}
      />
      <SelectItem
        title={"Authors"}
        data={authors}
        onChange={handleAuthor}
        value={author}
      />
    </div>
  );
};

export default FavoriteNews;
