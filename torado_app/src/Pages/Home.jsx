import React from 'react';
import NewArrivals from '../Components/NewArrivals';
import TrandingCategory from '../Components/TrandingCategory';
import BestSeller from '../Components/BestSeller';
import OfferCards from '../Components/OfferCards';
import NewArrivalCards from '../Components/NewArrivalCards';
import FeaturedProduct from '../Components/FeaturedProduct';
import FlashDeals from '../Components/FlashDeals';
import SpecialPopular from '../Components/SpecialPopular';
import TopRatedProducts from '../Components/TopRatedProducts';
import BlogSlider from '../Components/BlogSlider';
import FeatureCards from '../Components/FeaturedCard';
import ImageSlider from '../Components/ImageSlider';

const Home = () => {
  return (
    <>
      <NewArrivals/>
      <TrandingCategory/>
      <BestSeller/>
      <OfferCards/>
      <FeaturedProduct/>
      <FlashDeals/>
      <NewArrivalCards/>
      <SpecialPopular/>
      <TopRatedProducts/>
      <BlogSlider/>
      <FeatureCards/>
      <ImageSlider/>
    </>
  );
}

export default Home;
