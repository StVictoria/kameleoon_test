import { FC, useEffect, useState } from "react";
import cn from "classnames";
import styles from "./index.module.scss";
import SearchIcon from "../../assets/search_icon.svg";
import { Site, Status, Test, Type } from "../../shared/types";
import { Link } from "react-router";
import { PATH } from "../../shared/constants";
import { formatUrl } from "../../shared/utils";

const Dashboard: FC = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [testsResponse, sitesResponse] = await Promise.all([
        fetch(`${PATH}/tests`),
        fetch(`${PATH}/sites`),
      ]);

      if (!testsResponse.ok || !sitesResponse.ok) {
        throw new Error("Request error");
      }

      const [tests, sites] = await Promise.all([
        testsResponse.json(),
        sitesResponse.json(),
      ]);

      return { tests, sites };
    } catch (error) {
      console.error("Fetch error:", error);
      return { tests: [], sites: [] };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const { tests, sites } = await fetchData();
      setTests(tests);
      setSites(sites);
    };

    loadData();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <div className={styles.searchInputWrapper}>
        <input
          placeholder="What test are you looking for?"
          className={styles.searchInput}
        />
        <img className={styles.searchIcon} src={SearchIcon} alt="Search" />
        <p className={styles.testsAmount}>{tests.length || 0} tests</p>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th align="left">Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Site</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test: Test) => {
              const status = Status[test.status];
              const isDraft = status === Status.DRAFT;
              const url = sites?.[test.siteId]?.url;

              return (
                <tr key={test.id} className={styles.row}>
                  <td className={styles.cell}>
                    <b>{test.name}</b>
                  </td>
                  <td className={styles.cell} align="center">
                    {Type[test.type as keyof typeof Type]}
                  </td>
                  <td
                    className={cn(styles.cell, styles.status, {
                      [styles.stopped]: test.status === Status.STOPPED,
                      [styles.paused]: test.status === Status.PAUSED,
                      [styles.online]: test.status === Status.ONLINE,
                    })}
                    align="center"
                  >
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                  </td>
                  <td className={styles.cell} align="center">
                    <a href={url} target="_blank">
                      {url && formatUrl(url)}
                    </a>
                  </td>
                  <td>
                    <Link
                      className={cn(styles.rowLink, {
                        [styles.draft]: isDraft,
                      })}
                      to={
                        isDraft ? `/finalize/${test.id}` : `/results/${test.id}`
                      }
                    >
                      {isDraft ? "Finalize" : "Results"}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Dashboard;
