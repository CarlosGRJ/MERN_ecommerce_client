import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Slider, Checkbox } from 'antd';
import {
   DollarOutlined,
   DownSquareOutlined,
   StarOutlined,
} from '@ant-design/icons';
import { ProductCard } from '../components/cards/ProductCard';
import {
   getProductsByCount,
   fetchProductsByFilter,
} from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import { types } from '../types/types';
import { Star } from '../components/forms/Star';

const { SubMenu, ItemGroup } = Menu;

export const Shop = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [price, setPrice] = useState([0, 0]);
   const [ok, setOk] = useState(false);
   const [categories, setCategories] = useState([]);
   const [categoryIds, setCategoryIds] = useState([]);
   const [subs, setSubs] = useState([]);
   const [sub, setSub] = useState('');
   const [star, setStar] = useState('');

   const dispatch = useDispatch();
   const { search } = useSelector((state) => ({ ...state }));
   const { text } = search;

   useEffect(() => {
      loadAllProducts();
      // fetch categories
      getCategories().then((res) => setCategories(res.data.categories));
      // fetch sub categories
      getSubs().then((res) => {
         setSubs(res.data.subs);
      });
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

      // reset
      setCategoryIds([]);
      setPrice(value);
      setStar('');
      setSub('');
      setTimeout(() => {
         setOk(!ok);
      }, 300);
   };

   // 4. load products based on category
   // show categories in a list of checkbox}
   const showCategories = () =>
      categories.map((c) => (
         <div key={c._id}>
            <Checkbox
               onChange={handleCheck}
               className='pb-2 px-4'
               value={c._id}
               name='category'
               checked={categoryIds.includes(c._id)}>
               {c.name}
            </Checkbox>
            <br />
         </div>
      ));

   // handleCheckfor categories
   const handleCheck = (e) => {
      // reset
      dispatch({
         type: types.searchQuery,
         payload: { text: '' },
      });
      setPrice([0, 0]);
      setStar('');
      setSub('');
      console.log(e.target.value);
      const inTheState = [...categoryIds];
      const justChecked = e.target.value;
      const foundInTheState = inTheState.indexOf(justChecked); // index or -1

      // indexOf method ?? if not found returns -1 else return index
      if (foundInTheState === -1) {
         inTheState.push(justChecked);
      } else {
         // if found pull out one item from index
         inTheState.splice(foundInTheState, 1);
      }

      setCategoryIds(inTheState);
      // console.log(inTheState);
      fetchProducts({ category: inTheState });
   };

   // 5. Show products by star rating
   const handlerStarClick = (num) => {
      dispatch({
         type: types.searchQuery,
         payload: { text: '' },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar(num);
      setSub('');
      fetchProducts({ stars: num });
   };

   const showStars = () => (
      <div className='px-4 pb-2'>
         <Star starClick={handlerStarClick} numberOfStars={5} />
         <Star starClick={handlerStarClick} numberOfStars={4} />
         <Star starClick={handlerStarClick} numberOfStars={3} />
         <Star starClick={handlerStarClick} numberOfStars={2} />
         <Star starClick={handlerStarClick} numberOfStars={1} />
      </div>
   );

   // 6. show products by sub category
   const showSubs = () =>
      subs.map((s) => (
         <div
            key={s._id}
            onClick={() => handleSub(s)}
            className='p-1 m-1 badge badge-secondary'
            style={{ cursor: 'pointer' }}>
            {s.name}
         </div>
      ));

   const handleSub = (sub) => {
      console.log('SUB ', sub);
      setSub(sub);
      dispatch({
         type: types.searchQuery,
         payload: { text: '' },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar('');
      fetchProducts({ sub });
   };

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-3 pt-2'>
               <h4>Search/Filter</h4>
               <hr />

               <Menu defaultOpenKeys={['1', '2', '3', '4']} mode='inline'>
                  {/* Price */}
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

                  {/* Category */}
                  <SubMenu
                     key='2'
                     title={
                        <span className='h6'>
                           <DownSquareOutlined /> Categories
                        </span>
                     }>
                     <div style={{ marginTop: '-10px' }}>
                        {showCategories()}
                     </div>
                  </SubMenu>

                  {/* stars */}
                  <SubMenu
                     key='3'
                     title={
                        <span className='h6'>
                           <StarOutlined /> Rating
                        </span>
                     }>
                     <div style={{ marginTop: '-10px' }}>{showStars()}</div>
                  </SubMenu>

                  {/* Sub Category */}
                  <SubMenu
                     key='4'
                     title={
                        <span className='h6'>
                           <DownSquareOutlined /> Sub Categories
                        </span>
                     }>
                     <div style={{ marginTop: '-10px' }} className='px-4'>{showSubs()}</div>
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
