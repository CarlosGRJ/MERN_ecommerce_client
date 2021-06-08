import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FileUpload } from '../../../components/forms/FileUpload';
import { ProductUpdateForm } from '../../../components/forms/ProductUpdateForm';
import { AdminNav } from '../../../components/nav/AdminNav';
import { getProduct } from '../../../functions/product';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

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
   brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
   color: '',
   brand: '',
};

export const ProductUpdate = ({ match }) => {
   // state
   const [values, setValues] = useState(initialState);

   //  Redux
   const { user } = useSelector((state) => ({ ...state }));
   // router
   const { slug } = match.params;

   useEffect(() => {
      // loadProduct();
      getProduct(slug)
         .then((p) => {
            // console.log('single product', p);
            setValues((prevState) => {
               return { ...prevState, ...p.data };
            });
         })
         .catch();
   }, [slug]);

   // const loadProduct = () => {
   //    getProduct(slug)
   //       .then((p) => {
   //          // console.log('single product', p);
   //          setValues((prevState) => {
   //             return { ...prevState, ...p.data }
   //          })
   //       })
   //       .catch();
   // };

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   const handleChange = (e) => {
      // setValues({ ...values, [e.target.name]: e.target.value });
      setValues((prevState) => {
         return { ...prevState, [e.target.name]: e.target.value };
      });
   };

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-2'>
               <AdminNav />
            </div>

            <div className='col-md-10'>
               <h4>Product Update</h4>
               {JSON.stringify(values)}

               <ProductUpdateForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  values={values}
                  // handleCategoryChange={handleCategoryChange}
                  // subOptions={subOptions}
                  // showSub={showSub}
                  setValues={setValues}
               />
               <hr />
            </div>
         </div>
      </div>
   );
};
