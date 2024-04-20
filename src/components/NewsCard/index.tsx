import { Link } from "react-router-dom";
import styles from "./styles.module.scss"
interface NewsCardProps {
  urlToImage: string | undefined;
  title?: string;
  webUrl: string | undefined;
}
const NewsCard = ({ urlToImage, title, webUrl }: NewsCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles["img-container"]}>
        <img alt="song_img" src={urlToImage} className={styles["img-style"]} />
      </div>
      <div className={styles["text-content"]}>
        <p className={styles["title-style"]}>
          <Link to={`${webUrl}`} target="_blank">
            {title}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NewsCard