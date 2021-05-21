import React, { useEffect, useState } from 'react';
import { AdminNav } from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { createSub, getSub, removeSub } from '../../../functions/sub';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CategoryForm } from '../../../components/forms/CategoryForm';
import { LocalSearch } from '../../../components/forms/LocalSearch';
import { getCategories } from '../../../functions/category';

export const SubCreate = () => {
   const { user } = useSelector((state) => ({ ...state }));

   const [name, setName] = useState('');
   const [loading, setLoading] = useState(false);
   const [categories, setCategories] = useState([]);
   const [category, setCategory] = useState('');
   // Searching Filtering
   // Step 1
   const [keyword, setKeyword] = useState('');

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
      createSub({ name, parent: category }, user.token)
         .then((res) => {
            console.log('res ', res);
            setLoading(false);
            setName('');
            toast.success(`"${res.data.sub.name}" is created`);
            // loadCategories();
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
         removeSub(slug, user.token)
            .then((res) => {
               setLoading(false);
               toast.error(`${res.data.deleted.name} deleted`);
               //    loadCategories();
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

   // step 4
   const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
                  <h4>Create sub category</h4>
               )}

               <div className='form-group'>
                  <label>Parent category</label>
                  <select
                     name='category'
                     className='form-control'
                     onChange={(e) => setCategory(e.target.value)}>
                     <option>Please select</option>
                     {categories.length > 0 &&
                        categories.map((c) => (
                           <option kwy={c._id} value={c._id}>
                              {c.name}
                           </option>
                        ))}
                  </select>
               </div>

               {JSON.stringify(category)}

               <CategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
               />
               {/* step 2 and step 3 */}
               <LocalSearch keyword={keyword} setKeyword={setKeyword} />

               {/* step 5 */}
               {/* {categories.filter(searched(keyword)).map((c) => (
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
               ))} */}
            </div>
         </div>
      </div>
   );
};
