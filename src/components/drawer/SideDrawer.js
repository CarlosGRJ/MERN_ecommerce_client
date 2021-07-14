import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import laptop from '../../images/macbookpro.webp'; // default image
import { types } from '../../types/types';

export const SideDrawer = () => {
   const dispatch = useDispatch();
   const { drawer, cart } = useSelector((state) => ({ ...state }));

   const imageStyle = {
      width: '100%',
      height: '50px',
      objectFit: 'cover',
   };

   return (
      <Drawer
         className='text-center'
         title={`Cart / ${cart.length} Product`}
         placement='right' // right by default
         closable={false}
         onClose={() => {
            dispatch({
               type: types.setVisible,
               payload: false,
            });
         }}
         visible={drawer}>
         {cart.map((p) => (
            <div key={p._id} className='row'>
               <div className='col'>
                  {p.images[0] ? (
                     <>
                        <img
                           src={p.images[0].url}
                           style={imageStyle}
                           alt={p.title}
                        />
                     </>
                  ) : (
                     <img src={laptop} style={imageStyle} alt={p.title} />
                  )}
                  <p className='text-center bg-secondary text-light'>
                     {p.title} x {p.count}
                  </p>
               </div>
            </div>
         ))}

         <Link to='/cart'>
            <button
               onClick={() =>
                  dispatch({
                     type: types.setVisible,
                     payload: false,
                  })
               }
               className='text-center btn btn-primary btn-raised btn-block'>
               Go To Cart
            </button>
         </Link>
      </Drawer>
   );
};
