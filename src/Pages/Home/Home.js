import React from "react";
import Banner from "./Banner";
import Parts from "./Parts";
import useAllParts from "../../hooks/useAllParts";
import ArrivingSoon from "./ArrivingSoon";
import LatestBlogs from "./LatestBlogs";
import BusinessSummary from "./BusinessSummary";
import useReviews from "../../hooks/useReviews";
import PageLoading from "../Shared/PageLoading";
import Reviews from "./Reviews";

const Home = () => {
  const [allParts, partsLoading] = useAllParts();
  const [reviews, reviewLoading] = useReviews();

  if (partsLoading || reviewLoading) {
    return <PageLoading />;
  }

  return (
    <div>
      <Banner />
      <Parts allParts={allParts} />
      <BusinessSummary />
      <ArrivingSoon />
      <Reviews reviews={reviews} />
      <LatestBlogs />
    </div>
  );
};

export default Home;
