import React, { useEffect, useState } from 'react';
import { AdminNav } from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { updateCategory, getCategory } from '../../../functions/category';
import { useSelector } from 'react-redux';
import { CategoryForm } from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
   const { user } = useSelector((state) => ({ ...state }));

   const [name, setName] = useState('');
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      // loadCategory();  =====> Warning missing dependency
      getCategory(match.params.slug).then((c) => {
         setName(c.data.category.name);
      });
   }, [match.params.slug]);

   // const loadCategory = () => {
   //    getCategory(match.params.slug).then((c) => {
   //       setName(c.data.category.name);
   //    });
   // };

   const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      updateCategory(match.params.slug, { name }, user.token)
         .then((res) => {
            // console.log('res ', res);
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
               <CategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
               />
               <hr />
            </div>
         </div>
      </div>
   );
};

export default CategoryUpdate;
