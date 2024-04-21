import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NewsCard from "../NewsCard";
import { logo } from "../../assets";
import styles from "./styles.module.scss";
import { NewsItem } from "../../utils/types";

import "swiper/css";
import "swiper/css/free-mode";
interface RelatedItemList {
  title: string;
  data: NewsItem[];
}
const RelatedItemList = ({ data, title }: RelatedItemList) => {
  return (
    <div className={styles["list-container"]}>
      <div className={styles["title-container"]}>
        <h2 className={styles["title-style"]}>{title}</h2>
      </div>

      <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className={styles["swiper-container"]}
      >
        {data &&
          data?.map((item, i) => (
            <SwiperSlide key={i} className={styles["swiper-slide"]}>
              <NewsCard
                key={i}
                urlToImage={item.urlToImage ? item.urlToImage : logo}
                title={item.title || item.webTitle || item.abstract}
                webUrl={item.webUrl || item.url}
              />
          
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default RelatedItemList;
