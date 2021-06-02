import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';

export const FileUpload = ({ values, setValues, setLoading }) => {
   const { user } = useSelector((state) => ({ ...state }));

   const fileUploadAndResize = (e) => {
      console.log(e.target.files);
      const files = e.target.files;
      const allUploadedFiles = values.images;

      if (files) {
         setLoading(true);
         for (let i = 0; i < files.length; i++) {
            Resizer.imageFileResizer(
               files[i],
               720,
               720,
               'JPEG',
               100,
               0,
               (uri) => {
                  // console.log(uri);
                  axios
                     .post(
                        `${process.env.REACT_APP_API}/uploadimages`,
                        { image: uri },
                        {
                           headers: {
                              authtoken: user ? user.token : '',
                           },
                        },
                     )
                     .then((res) => {
                        console.log('IMAGE UPLOAD RES DATA', res);
                        setLoading(false);
                        allUploadedFiles.push(res.data);
                        console.log('allUploadedFiles ', allUploadedFiles);

                        setValues({ ...values, images: allUploadedFiles });
                     })
                     .catch((err) => {
                        setLoading(false);
                        console.log('CLOUDINARY UPLOAD ERR', err);
                     });
               },
               'base64',
            );
         }
      }
   };

   const handleImageRemove = (public_id) => {
      setLoading(true);
      console.log('remove image', public_id);
      axios
         .post(
            `${process.env.REACT_APP_API}/removeimage`,
            { public_id },
            {
               headers: {
                  authtoken: user ? user.token : '',
               },
            },
         )
         .then((res) => {
            setLoading(false);
            const { images } = values;
            console.log('images ', images);
            const filteredImages = images.filter((item) => {
               console.log('ITEM', item);
               return item.public_id !== public_id;
            });
            console.log('FILTERED IMAGES', filteredImages);
            setValues((prevState) => {
               return { ...prevState, images: filteredImages };
            });
            console.log(values.images);
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
         });
   };

   return (
      <>
         <div className='row'>
            {values.images &&
               values.images.map((image) => (
                  <Badge
                     className='mr-3 mb-3'
                     count='X'
                     key={image.public_id}
                     onClick={() => handleImageRemove(image.public_id)}
                     style={{ cursor: 'pointer' }}>
                     <Avatar src={image.url} size={100} shape='square' />
                  </Badge>
               ))}
         </div>
         <div className='row'>
            <label className='btn btn-primary btn-raised'>
               Choose File
               <input
                  type='file'
                  multiple
                  hidden
                  accept='images/*'
                  onChange={fileUploadAndResize}
               />
            </label>
         </div>
      </>
   );
};
