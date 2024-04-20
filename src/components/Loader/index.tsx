import loader from "../../assets/loader.gif";
import styles from "./styles.module.scss";

const Loader = () => {
  return (
    <div className={styles["loader-style"]}>
      <img src={loader} />
    </div>
  );
};

export default Loader;
