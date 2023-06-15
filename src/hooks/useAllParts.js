import { useQuery } from "react-query";

const useAllParts = () => {
  const { data: allParts, isLoading: partsLoading } = useQuery("parts", () =>
    fetch("http://localhost:5000/part").then((res) => res.json())
  );

  return [allParts, partsLoading];
};

export default useAllParts;
