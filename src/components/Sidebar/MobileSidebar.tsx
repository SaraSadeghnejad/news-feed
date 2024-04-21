import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import NavLinks from "../NavLinks";
import { useState } from "react";
import styles from "./styles.module.scss";
import Logo from "../Logo";
const MobileSidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className={styles["mobile-sidebar"]}>
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className={styles["sidebar-icon"]}
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className={styles["sidebar-icon"]}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 lg:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <Logo />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default MobileSidebar;
