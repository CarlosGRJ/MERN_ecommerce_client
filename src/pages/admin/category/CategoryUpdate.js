import React, { useEffect, useState } from 'react';
import { AdminNav } from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { updateCategory, getCategory } from '../../../functions/category';
import { useSelector } from 'react-redux';
export const CategoryUpdate = ({ history, match }) => {
   const { user } = useSelector((state) => ({ ...state }));

   const [name, setName] = useState('');
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      loadCategory();
   }, []);

   const loadCategory = () => {
      getCategory(match.params.slug).then((c) => {
         setName(c.data.category.name);
         console.log('NAME ', name);
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      updateCategory(match.params.slug, { name }, user.token)
         .then((res) => {
            console.log('res ', res);
            setLoading(false);
            setName('');
            toast.success(`"${res.data.updated.name}" is updated`);
            history.push('/admin/category');
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) {
               toast.error(err.response.data);
            }
         });
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
               onChange={(e) => setName(e.target.value)}
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
                  <h4>Update category</h4>
               )}
               {categoryForm()}
               <hr />
            </div>
         </div>
      </div>
   );
};
