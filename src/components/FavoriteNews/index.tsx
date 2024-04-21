import { categoryLists } from "../../db/data";
import SelectItem from "../SelectItem";
import { useStore } from "../../store/store";
import { ChangeEvent, useState } from "react";
import { useSourceQuery } from "../../hooks/useSourceQuery";
import { useAuthorQuery } from "../../hooks/useAuthorQuery";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
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

  const [category, setCategory] = useState(CategoryList?.id);
  const [source, setSource] = useState(SourceList?.id);
  const [author, setAuthor] = useState(AuthorList?.id);
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    addToFavoriteList("Categories", e.target.value);
  };
  const handleSource = (e: ChangeEvent<HTMLSelectElement>) => {
    setSource(e.target.value);
    addToFavoriteList("Sources", e.target.value);
  };
  const handleAuthor = (e: ChangeEvent<HTMLSelectElement>) => {
    setAuthor(e.target.value);
    addToFavoriteList("Authors", e.target.value);
  };

  return (
    <div className="flex justify-center items-center mx-auto flex-col text-white">
      <div className={styles["favorite-container"]}>
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

      <Link className="mt-5" to="/for-you">
        <h1>After select Go to For You Page</h1>
      </Link>
    </div>
  );
};

export default FavoriteNews;
