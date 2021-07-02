import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { ProductCard } from '../components/cards/ProductCard';
import {
   getProductsByCount,
   fetchProductsByFilter,
} from '../functions/product';
import { types } from '../types/types';

const { SubMenu, ItemGroup } = Menu;

export const Shop = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [price, setPrice] = useState([0, 0]);
   const [ok, setOk] = useState(false);

   const dispatch = useDispatch();
   const { search } = useSelector((state) => ({ ...state }));
   const { text } = search;

   useEffect(() => {
      loadAllProducts();
   }, []);

   const fetchProducts = (arg) => {
      fetchProductsByFilter(arg).then((res) => {
         setProducts(res.data);
      });
   };

   // 1. load products by default on page load
   const loadAllProducts = () => {
      getProductsByCount(12).then((p) => {
         setProducts(p.data);
         setLoading(false);
      });
   };

   // 2. load products on user search input
   useEffect(() => {
      const delayed = setTimeout(() => {
         fetchProducts({ query: text });
      }, 300);
      return () => clearTimeout(delayed);
   }, [text]);

   // 3. load products based on price range
   useEffect(() => {
      // console.log('ok to request');
      fetchProducts({ price });
   }, [ok]);

   const handleSlider = (value) => {
      dispatch({
         type: types.searchQuery,
         payload: { text: '' },
      });
      setPrice(value);
      setTimeout(() => {
         setOk(!ok);
      }, 300);
   };

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-3 pt-2'>
               <h4>Search/Filter</h4>
               <hr />

               <Menu defaultOpenKeys={['1', '2']} mode='inline'>
                  <SubMenu
                     key='1'
                     title={
                        <span className='h6'>
                           <DollarOutlined />
                           Price
                        </span>
                     }>
                     <div>
                        <Slider
                           className='mx-4'
                           tipFormatter={(v) => `$${v}`}
                           range
                           value={price}
                           onChange={handleSlider}
                           max='4999'
                        />
                     </div>
                  </SubMenu>
               </Menu>
            </div>

            <div className='col-md-9 pt-2'>
               {loading ? (
                  <h4 className='text-danger'>Loading...</h4>
               ) : (
                  <h4 className='text-danger'>Products</h4>
               )}

               {products.length < 1 && <p>No products found</p>}

               <div className='row pb-5'>
                  {products.map((p) => (
                     <div key={p._id} className='col-md-4 mt-3'>
                        <ProductCard product={p} />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
