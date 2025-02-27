import { FC } from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "./index.module.scss";
import ChevronIcon from "../../assets/chevron_icon.svg";

const TestPageLayout: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <Outlet />
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={ChevronIcon} className={styles.backIcon} alt="Go Back" />
        Back
      </button>
    </div>
  );
};

export default TestPageLayout;
