
import { logo } from "../../assets";
import styles from "./styles.module.scss"
const Logo = () => {
  return (
    <div className={styles['logo-container']}>
      <img src={logo} alt="logo" className={styles['logo-img']} />
      <h1 className={styles['logo-title']}>Worldwide News</h1>
    </div>
  );
}

export default Logo