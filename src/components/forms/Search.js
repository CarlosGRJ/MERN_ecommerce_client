import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { types } from '../../types/types';

export const Search = () => {
   const dispatch = useDispatch();
   const { search } = useSelector((state) => ({ ...state }));
   const { text } = search;

   const history = useHistory();

   const handleChange = (e) => {
      dispatch({
         type: types.searchQuery,
         payload: { text: e.target.value },
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      history.push(`/shop?${text}`);
   };

   return (
      <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
         <input
            onChange={handleChange}
            type='search'
            value={text}
            className='form-control mr-sm-2'
            placeholder='search'
         />
         <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
      </form>
   );
};
