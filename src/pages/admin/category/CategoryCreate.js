import React, { useEffect, useState } from 'react';
import { AdminNav } from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import {
   createCategory,
   getCategories,
   removeCategory,
} from '../../../functions/category';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CategoryForm } from '../../../components/forms/CategoryForm';

export const CategoryCreate = () => {
   const { user } = useSelector((state) => ({ ...state }));

   const [name, setName] = useState('');
   const [loading, setLoading] = useState(false);
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      loadCategories();
   }, []);

   const loadCategories = () => {
      getCategories().then((c) => {
         setCategories(c.data.categories);
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      createCategory({ name }, user.token)
         .then((res) => {
            // console.log('res ', res);
            setLoading(false);
            setName('');
            toast.success(`"${res.data.category.name}" is created`);
            loadCategories();
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) {
               toast.error(err.response.data);
            }
         });
   };

   const handleRemove = async (slug, name) => {
      const answer = window.confirm(
         `Are you sure you want to delete ${name} category?`,
      );
      if (answer) {
         setLoading(true);
         removeCategory(slug, user.token)
            .then((res) => {
               setLoading(false);
               toast.error(`${res.data.deleted.name} deleted`);
               loadCategories();
            })
            .catch((err) => {
               console.log(err);
               setLoading(false);
               if (err.response.status === 400) {
                  toast.error(err.response.data);
               }
            });
      }
   };

   return (
      <div className='container-fluid'>
         <div className='row'>
            <div className='col-md-2'>
               <AdminNav />
            </div>
            <div className='col'>
               {loading ? (
                  <h4 className='text-danger'>Loading...</h4>
               ) : (
                  <h4>Create category</h4>
               )}

               <CategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
               />

               <hr />
               {categories.map((c) => (
                  <div className='alert alert-secondary' key={c._id}>
                     {c.name}
                     <span
                        onClick={() => handleRemove(c.slug, c.name)}
                        className='btn btn-sm float-right d-flex align-items-center'>
                        <DeleteOutlined className='text-danger' />
                     </span>
                     <Link to={`/admin/category/${c.slug}`}>
                        <span className='btn btn-sm float-right d-flex align-items-center'>
                           <EditOutlined className='text-primary' />
                        </span>
                     </Link>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
