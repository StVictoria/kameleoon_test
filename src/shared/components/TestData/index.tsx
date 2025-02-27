import { FC } from "react";
import { useGetData } from "../../useGetData";
import { formatUrl } from "../../utils";

type TestData = {
  testId: number;
};

const TestData: FC<TestData> = ({ testId }) => {
  const { testData, siteData, isLoading } = useGetData(`tests/${testId}`);

  return (
    <>
      <p>
        <b>Name:</b> {isLoading ? "Loading..." : testData?.name}
      </p>
      <p>
        <b>Type:</b> {isLoading ? "Loading..." : testData?.type}
      </p>
      <p>
        <b>Status:</b> {isLoading ? "Loading..." : testData?.status}
      </p>
      <p>
        <b>Site:</b>{" "}
        {isLoading ? (
          "Loading..."
        ) : (
          <a href={siteData?.url} target="_blank">
            <u>{siteData && formatUrl(siteData?.url)}</u>
          </a>
        )}
      </p>
    </>
  );
};

export default TestData;
