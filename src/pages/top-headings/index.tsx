import { logo } from "../../assets";
import Loader from "../../components/Loader";
import NewsCard from "../../components/NewsCard";
import { useHeadlinesQuery } from "../../hooks/useHeadlinesQuery";
import { NewsItem } from "../../utils/types";
import styles from "./styles.module.scss";
const TopHeadlines = () => {
  const { data, isLoading } = useHeadlinesQuery();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <h2 className="heading">
        Around you
      </h2>
      <div className={styles['news-container']}>
        {data &&
          data.map((item: NewsItem, i: number) => (
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

export default TopHeadlines;
