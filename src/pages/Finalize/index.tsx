import { FC } from "react";
import { useParams } from "react-router";
import TestData from "../../shared/components/TestData";

const Finalize: FC = () => {
  const { id } = useParams();

  return (
    <>
      <h1>Finalize</h1>
      <TestData testId={Number(id)} />
    </>
  );
};

export default Finalize;
