import React from 'react';
import ProductColumn from './ProductColumn';
import { topRatedProducts } from '../api/specialPopularData';

const TopRatedProducts = () => {
  return (
    <>
      <section className='section-main2'>
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
               <ProductColumn
               title="Top Rated Products"
               data={topRatedProducts}
               />
            </div>
            <div className="col-3"></div>
        </div>
      </section>
    </>
  );
}

export default TopRatedProducts;
