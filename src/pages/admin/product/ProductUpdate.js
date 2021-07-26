import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FileUpload } from '../../../components/forms/FileUpload';
import { ProductUpdateForm } from '../../../components/forms/ProductUpdateForm';
import { AdminNav } from '../../../components/nav/AdminNav';
import { getProduct, updateProduct } from '../../../functions/product';
import { LoadingOutlined } from '@ant-design/icons';
import { getCategories, getCategorySubs } from '../../../functions/category';

const initialState = {
   title: '',
   description: '',
   price: '',
   category: '',
   subs: [],
   shipping: '',
   quantity: '',
   images: [],
   colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
   brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS', 'DELL'],
   color: '',
   brand: '',
};

const ProductUpdate = ({ match, history }) => {
   // state
   const [values, setValues] = useState(initialState);
   const [categories, setCategories] = useState([]);
   const [subOptions, setSubOptions] = useState([]);
   const [arrayOfSubsIds, setArrayOfSubsIds] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState('');
   const [loading, setLoading] = useState(false);

   //  Redux
   const { user } = useSelector((state) => ({ ...state }));
   // router
   const { slug } = match.params;

   useEffect(() => {
      loadProduct(slug);
      loadCategories();
   }, [slug]);

   const loadProduct = (slug) => {
      getProduct(slug)
         .then((p) => {
            // 1. load single product
            setValues((prevState) => {
               return { ...prevState, ...p.data };
            });
            // 2. load single product category subs
            getCategorySubs(p.data.category._id).then((res) => {
               setSubOptions(res.data);
            });
            // 3. prepare array of sub ids to show as default sub values in antd Select
            let arr = [];
            p.data.subs.map((s) => {
               return arr.push(s._id);
            });
            // console.log('ARR', arr);
            setArrayOfSubsIds((prev) => arr); // required for ant design select to work
         })
         .catch((err) => {
            console.log('ERROR get product', err);
            setLoading(false);
            toast.error(err);
         });
   };

   const loadCategories = () => {
      getCategories()
         .then((c) => {
            // console.log('categories update product: ', c.data.categories);
            setCategories(c.data.categories);
         })
         .catch((err) => {
            console.log('ERROR get categories', err);
            setLoading(false);
            toast.error(err);
         });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);

      values.subs = arrayOfSubsIds;
      values.category = selectedCategory ? selectedCategory : values.category;

      // console.log('VALUES SUBMITED ', values);
      updateProduct(slug, values, user.token)
         .then((res) => {
            setLoading(false);
            toast.success(`"${res.data.title}" is updated`);
            history.push('/admin/products');
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
            toast.error(err.response.data.err);
         });
   };

   const handleChange = (e) => {
      // setValues({ ...values, [e.target.name]: e.target.value });
      setValues((prevState) => {
         return { ...prevState, [e.target.name]: e.target.value };
      });
   };

   const handleCategoryChange = (e) => {
      e.preventDefault();
      // console.log('CLICKED CATEGORY', e.target.value);
      setValues((prevState) => {
         return { ...prevState, subs: [] };
      });

      setSelectedCategory(e.target.value);

      getCategorySubs(e.target.value).then((res) => {
         // console.log('SUB OPTIONS ON CATEGORY CLICK', res);
         setSubOptions(res.data);
      });

      // if user clicks back to the original category
      // show its sub categories in default
      if (values.category._id === e.target.value) {
         loadProduct(slug);
      }
      // Clear old sub categories ids
      setArrayOfSubsIds([]);
   };

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-2'>
               <AdminNav />
            </div>

            <div className='col-md-10'>
               {loading ? (
                  <LoadingOutlined className='text-danger h1' />
               ) : (
                  <h4>Product update</h4>
               )}
               {/* {JSON.stringify(values)} */}

               <div className='p-3'>
                  <FileUpload
                     values={values}
                     setValues={setValues}
                     setLoading={setLoading}
                  />
               </div>

               <ProductUpdateForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  setValues={setValues}
                  values={values}
                  handleCategoryChange={handleCategoryChange}
                  categories={categories}
                  subOptions={subOptions}
                  // showSub={showSub}
                  arrayOfSubsIds={arrayOfSubsIds}
                  setArrayOfSubsIds={setArrayOfSubsIds}
                  selectedCategory={selectedCategory}
               />
               <hr />
            </div>
         </div>
      </div>
   );
};

export default ProductUpdate;
