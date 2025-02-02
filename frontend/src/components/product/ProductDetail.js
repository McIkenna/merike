import React, { useState, useEffect } from 'react'
import {
  Container, Grid, Paper, Typography, Button, Box, IconButton, List,
  ListItem,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../../api/services/productApi';
import Loader from '../../utils/Loader';

import MetaData from '../../utils/MetaData';
import { ProductInfo } from './ProductInfo';
import { ProductGallery } from './ProductGallery';

export default function ProductDetail() {
  const params = useParams();
  const { data, error, isLoading, isSuccess } = useGetSingleProductQuery(params.id);
  const product = data?.product;



  return (
    <Box>
      <MetaData title={product?.name} />
      {
        data && data.product ?
          <Paper elevation={0} style={{ padding: '10px', marginTop: '20px' }}>
            <Grid container spacing={2}>
              {/* Additional Product Images */}
              <Grid item xs={6} md={6} sm={6}>
              <ProductGallery product={product} />
              </Grid>

              


              <Grid item xs={6} md={6} sm={6}>
                {/* Product Details */}
                <ProductInfo product={product} />

              </Grid>
            </Grid>
          </Paper> :
          <Loader />}
   </Box>
  )
}
