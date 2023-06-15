import { useQuery } from "react-query";

const useReviews = () => {
  const { data: reviews, isLoading: reviewLoading } = useQuery("reviews", () =>
    fetch("http://localhost:5000/review").then((res) => res.json())
  );

  return [reviews, reviewLoading];
};

export default useReviews;
