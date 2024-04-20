import { useEffect } from "react";
import RelatedItemList from "../../components/RelatedItemList";
import { useCategoryQuery } from "../../hooks/useCategoryQuery";
import { useStore } from "../../store/store";
import { useGetSource } from "../../hooks/useGetSource";
import styles from './styles.module.scss'
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
  const { mutate: categoryMutate, data: categoryData } = useCategoryQuery({
    categoryTerm: category.id
  });
  const { mutate: sourceMutate, data: sourceData } = useGetSource({
    sourceTerm: source.id
  });
  const { mutate: authorMutate, data: authorData } = useCategoryQuery({
    categoryTerm: author.id
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

  return (
    <div className={styles['container']}>
      <RelatedItemList data={categoryData} title={category.id} />

      <RelatedItemList data={sourceData} title={source.id} />

      <RelatedItemList data={authorData} title={author.id} />
    </div>
  );
};

export default ForYou;
