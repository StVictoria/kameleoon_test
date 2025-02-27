import { useState, useEffect } from "react";
import { PATH } from "./constants";
import { Test, Site } from "./types";

export const useGetData = (endpoint: string) => {
  const [testData, setTestData] = useState<Test | null>(null);
  const [siteData, setSiteData] = useState<Site | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const testResponse = await fetch(`${PATH}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!testResponse.ok) {
        throw new Error(`Error: ${testResponse.status}`);
      }

      const testData = await testResponse.json();
      setTestData(testData);

      const siteId = testData?.siteId;
      if (siteId) {
        const siteResponse = await fetch(`${PATH}/sites/${siteId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!siteResponse.ok) {
          throw new Error(`Error: ${siteResponse.status}`);
        }

        const siteData = await siteResponse.json();
        setSiteData(siteData);
      }
    } catch (error) {
      console.error("Request error:", error);
      setError("Request error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { testData, siteData, isLoading, error };
};
