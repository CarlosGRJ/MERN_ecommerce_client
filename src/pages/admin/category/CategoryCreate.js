import React, { useEffect, useState } from 'react';
import { AdminNav } from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useForm } from '../../../hooks/useForm';
import {
   createCategory,
   getCategories,
   removeCategory,
} from '../../../functions/category';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const CategoryCreate = () => {
   const { user } = useSelector((state) => ({ ...state }));
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

   const [formValues, handleInputChange, reset] = useForm({
      name: '',
   });
   const { name } = formValues;

   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      createCategory({ name }, user.token)
         .then((res) => {
            console.log('res ', res);
            setLoading(false);
            reset();
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

   const categoryForm = () => (
      <form onSubmit={handleSubmit}>
         <div className='form-group'>
            <label>Name</label>
            <input
               type='text'
               className='form-control'
               name='name'
               value={name}
               onChange={handleInputChange}
               autoFocus
               required
            />
            <br />
            <button className='btn btn-outline-primary'>Save</button>
         </div>
      </form>
   );

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
               {categoryForm()}
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
