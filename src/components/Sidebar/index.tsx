import NavLinks from "../NavLinks";
import styles from "./styles.module.scss";
import Logo from "../Logo";
import MobileSidebar from "./MobileSidebar";
const Sidebar = () => {
  return (
    <>
      <div className={styles.sidebar}>
        <Logo />
        <NavLinks />
      </div>
      <MobileSidebar />
    </>
  );
};

export default Sidebar;
