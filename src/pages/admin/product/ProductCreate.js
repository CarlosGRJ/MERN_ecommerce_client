import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FileUpload } from '../../../components/forms/FileUpload';
import { ProductCreateForm } from '../../../components/forms/ProductCreateForm';
import { AdminNav } from '../../../components/nav/AdminNav';
import { getCategories, getCategorySubs } from '../../../functions/category';
import { createProduct } from '../../../functions/product';
import { LoadingOutlined } from '@ant-design/icons';

const initialState = {
   title: '',
   description: '',
   price: '',
   categories: [],
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

const ProductCreate = () => {
   const [values, setValues] = useState(initialState);
   const [subOptions, setSubOptions] = useState([]);
   const [showSub, setShowSub] = useState(false);
   const [loading, setLoading] = useState(false);

   //  Redux
   const { user } = useSelector((state) => ({ ...state }));

   useEffect(() => {
      loadCategories();
   }, []);

   const loadCategories = () => {
      getCategories().then((c) => {
         // setValues({ ...values, categories: c.data.categories });
         setValues((prevState) => {
            return { ...prevState, categories: c.data.categories };
         });
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      createProduct(values, user.token)
         .then((res) => {
            console.log(res);
            window.alert(`"${res.data.title}" is created`);
            window.location.reload();
         })
         .catch((err) => {
            console.log(err);
            // if (err.response.status === 400) {
            //    toast.error(err.response.data);
            // }
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
         return { ...prevState, subs: [], category: e.target.value };
      });
      getCategorySubs(e.target.value).then((res) => {
         // console.log('SUB OPTIONS ON CATEGORY CLICK', res);
         setSubOptions(res.data);
      });
      setShowSub(true);
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
                  <h4>Product Create</h4>
               )}
               <hr />

               {/* {JSON.stringify(values.images)} */}

               <div className='p-3'>
                  <FileUpload
                     values={values}
                     setValues={setValues}
                     setLoading={setLoading}
                  />
               </div>

               <ProductCreateForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  values={values}
                  handleCategoryChange={handleCategoryChange}
                  subOptions={subOptions}
                  showSub={showSub}
                  setValues={setValues}
               />
            </div>
         </div>
      </div>
   );
};

export default ProductCreate;
