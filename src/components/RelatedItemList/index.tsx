import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NewsCard from "../NewsCard";
import { logo } from "../../assets";
import styles from "./styles.module.scss";

const RelatedItemList = ({ data, title }) => {
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
