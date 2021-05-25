import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ProductCreateForm } from '../../../components/forms/ProductCreateForm';
import { AdminNav } from '../../../components/nav/AdminNav';
import { getCategories } from '../../../functions/category';
import { createProduct } from '../../../functions/product';

const initialState = {
   title: 'Macbook Pro',
   description: 'Apple Product',
   price: '4500',
   categories: [],
   category: '',
   subs: [],
   shipping: 'Yes',
   quantity: '50',
   images: [],
   colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
   brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
   color: 'White',
   brand: 'Apple',
};

export const ProductCreate = () => {
   const [values, setValues] = useState(initialState);
   const { user } = useSelector((state) => ({ ...state }));
   const {
      title,
      description,
      price,
      categories,
      category,
      subs,
      shipping,
      quantity,
      images,
      colors,
      brands,
      color,
      brand,
   } = values;

   useEffect(() => {
      loadCategories();
      // getCategories().then((c) => {
      //    console.log('c ', c);
      //    setValues({ ...values, categories: c.data.categories });
      // });
   }, []);

   const loadCategories = () => {
      getCategories().then((c) => {
         console.log('c ', c);
         setValues({ ...values, categories: c.data.categories });
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
      setValues({ ...values, [e.target.name]: e.target.value });
      // console.log(e.target.name, ' ------- ', e.target.value);
   };

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-2'>
               <AdminNav />
            </div>

            <div className='col-md-10'>
               <h4>Product Create</h4>
               <hr />

               <ProductCreateForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  values={values}
               />
            </div>
         </div>
      </div>
   );
};
