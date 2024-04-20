import { useParams } from "react-router-dom";
import NewsCard from "../../components/NewsCard";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import { useCallback, useEffect, useMemo, useState } from "react";
import { logo } from "../../assets";

import SearchPickers from "../../components/SearchPicker";
import Loader from "../../components/Loader";
import { useStore } from "../../store/store";
import { useCategoryQuery } from "../../hooks/useCategoryQuery";

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
    (item) => {
      const publicationDate = new Date(
        item.publication_date || item.pub_date || item.publishedAt
      );
      return publicationDate >= fromDate && publicationDate <= toDate;
    },
    [fromDate, toDate]
  );

  const filterBySource = useCallback(
    (item) => {
      const source = item?.source || item?.sectionName || item?.source?.name;
      return source === selectedSource;
    },
    [selectedSource]
  );
  const { mutate: categoryMutate, data: categoryData } = useCategoryQuery({
    selectedCategory
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
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <SearchPickers />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-5 mt-5">
        {filteredData?.map((item, i) => (
          <NewsCard
            key={i}
            urlToImage={item.urlToImage ? item.urlToImage : logo}
            title={item.title || item.webTitle || item.abstract}
            webUrl={item.webUrl || item.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
