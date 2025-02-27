import { FC } from "react";
import styles from "./index.module.scss";
import SearchIcon from "../../assets/search_icon.svg";

const Dashboard: FC = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className={styles.searchInputWrapper}>
        <input
          placeholder="What test are you looking for?"
          className={styles.searchInput}
        />
        <img className={styles.searchIcon} src={SearchIcon} alt="Search" />
        <p className={styles.testsAmount}>7 tests</p>
      </div>
    </>
  );
};

export default Dashboard;
