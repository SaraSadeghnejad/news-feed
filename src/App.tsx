import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/Searchbar";
import styles from "./styles.module.scss";
import {
  Categories,
  Following,
  ForYou,
  Search,
  Sources,
  TopHeadlines,
} from "./pages";


function App() {
  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <SearchBar />

          <div className={styles["main-content"]}>
            <div className="flex-1 h-fit pb-40">
              <Routes>
                <Route path="/for-you" element={<ForYou />} />
                <Route path="/" element={<TopHeadlines />} />
                <Route path="/following" element={<Following />} />
                <Route path="/search/:searchTerm" element={<Search />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
