import { useEffect } from "react";
import RelatedItemList from "../../components/RelatedItemList";
import { useCategoryQuery } from "../../hooks/useCategoryQuery";
import { useStore } from "../../store/store";
import { useGetSource } from "../../hooks/useGetSource";
import styles from './styles.module.scss'
import { useGetAuthor } from "../../hooks/useGetAuthor";
import Loader from "../../components/Loader";
import { NewsItem } from "../../utils/types";
const ForYou = () => {
  const {
    CategoryList: category,
    SourceList: source,
    AuthorList: author
  } = useStore((state) => ({
    CategoryList: state.CategoryList,
    SourceList: state.SourceList,
    AuthorList: state.AuthorList
  }));
  const { mutate: categoryMutate, data: categoryData,isLoading:categoryLoading } = useCategoryQuery({
    categoryTerm: category.id
  });
  const { mutate: sourceMutate, data: sourceData,isLoading:sourceLoading } = useGetSource({
    sourceTerm: source.id
  });
  const { mutate: authorMutate, data: authorData ,isLoading:authorLoading } =useGetAuthor({
    authorTerm: author.id
  });
  useEffect(() => {
    if (category.id) {
      categoryMutate();
    }
    if (source.id) {
      sourceMutate();
    }
    if (author.id) {
      authorMutate();
    }
  }, [
    author.id,
    authorMutate,
    category.id,
    categoryMutate,
    source,
    sourceMutate
  ]);
  if (categoryLoading || sourceLoading || authorLoading) {
    return <Loader />;
  }
  return (
    <div className={styles["container"]}>
      <RelatedItemList data={categoryData as NewsItem[]} title={category.id} />

      <RelatedItemList data={sourceData as NewsItem[]} title={source.id} />

      <RelatedItemList data={authorData as NewsItem[] } title={author.id} />
    </div>
  );
};

export default ForYou;
