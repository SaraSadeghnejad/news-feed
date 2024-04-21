import {
  HiOutlineCollection,
  HiOutlineGlobeAlt,
  HiOutlineStar,
} from "react-icons/hi";
import styles from './styles.module.scss'
import { NavLink } from "react-router-dom";
const links = [
  { name: "Headlines", to: "/", icon: HiOutlineGlobeAlt },
  { name: "Following", to: "/following", icon: HiOutlineStar },
  { name: "For You", to: "/for-you", icon: HiOutlineCollection }
];
interface NavLinksProps {
  handleClick?: () => void;
}
const NavLinks = ({ handleClick }: NavLinksProps) => {
  return (
    <div className={styles['nav-container']}>
      {links.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          className={styles["nav-style"]}
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className={styles['nav-icon']} />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};
export default NavLinks;
