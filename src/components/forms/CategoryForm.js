import React from 'react';

export const CategoryForm = ({ handleSubmit, name, setName }) => {
   return (
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
};
