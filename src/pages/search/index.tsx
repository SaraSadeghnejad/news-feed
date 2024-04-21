/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import NewsCard from "../../components/NewsCard";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { useCallback, useEffect, useMemo } from "react";
import { logo } from "../../assets";
import styles from "./styles.module.scss";
import SearchPickers from "../../components/SearchPicker";
import Loader from "../../components/Loader";
import { useStore } from "../../store/store";
import { useCategoryQuery } from "../../hooks/useCategoryQuery";
import {  FilteredSource, NewsItem } from "../../utils/types";

const Search = () => {
  const { searchTerm } = useParams();
  const { fromDate, toDate, selectedCategory, selectedSource } = useStore(
    (state) => ({
      fromDate: state.fromDate,
      toDate: state.toDate,
      selectedCategory: state.selectedCategory,
      selectedSource: state.selectedSource
    })
  );

  const { data, refetch, isLoading, isRefetching } = useSearchQuery({
    searchTerm: searchTerm || "" // Added fallback value to handle undefined case
  });

  const filterByDate = useCallback(
    (item: any) => {
      const publicationDate = new Date(
        item?.publication_date || item?.pub_date || item?.publishedAt
      );
      if (fromDate && toDate) {
        return publicationDate >= fromDate && publicationDate <= toDate;
      }
    },
    [fromDate, toDate]
  );

  const filterBySource = useCallback(
    (item: FilteredSource) => {
      const source =
        item?.source?.name || item?.sectionName || "The New York Times";
      return source === selectedSource;
    },
    [selectedSource]
  );
  const { mutate: categoryMutate, data: categoryData } = useCategoryQuery({
    categoryTerm: selectedCategory as string
  });
  useEffect(() => {
    if (selectedCategory) {
      categoryMutate();
    }
  }, [categoryMutate, selectedCategory]);

  const filteredData = useMemo(() => {
    let filtered = selectedCategory.length !== 0 ? categoryData : data;
    filtered = fromDate && toDate ? filtered?.filter(filterByDate) : filtered;
    filtered = selectedSource ? filtered?.filter(filterBySource) : filtered;
    return filtered;
  }, [
    data,
    categoryData,
    selectedCategory,
    fromDate,
    toDate,
    selectedSource,
    filterByDate,
    filterBySource
  ]);

  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);

  if (isLoading || isRefetching) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <h2 className="label-style">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <SearchPickers />
      <div className={styles["filtered-list"]}>
        {filteredData?.map((item: NewsItem, i: number) => (
          <NewsCard
            key={i}
            urlToImage={item?.urlToImage ? item?.urlToImage : logo}
            title={item?.title || item?.webTitle || item?.abstract}
            webUrl={item?.webUrl || item?.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
