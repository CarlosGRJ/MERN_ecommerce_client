import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../components/cards/ProductCard';
import { getCategory } from '../../functions/category';

export const CategoryHome = ({ match }) => {
   const [category, setCategory] = useState({});
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);

   const { slug } = match.params;

   useEffect(() => {
      setLoading(true);
      getCategory(slug).then((c) => {
         console.log(JSON.stringify(c.data, null, 4));
         setCategory(c.data);
         setLoading(false);
      });
   }, [slug]);

   return <p>{slug}</p>;
};
