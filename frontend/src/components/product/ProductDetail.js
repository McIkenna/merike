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
import { CustomSnackbar } from '../../utils/CustomSnackbar';

export default function ProductDetail() {
  const params = useParams();
  const { data, error, isLoading, isSuccess } = useGetSingleProductQuery(params.id);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const product = data?.product;



  return (
    <Box>
      <MetaData title={product?.name} />
      {
        data && data.product ?
          <Box style={{ padding: '10px', marginTop: '20px' }}>
            <Grid container spacing={2}>
              {/* Additional Product Images */}
              <Grid item xs={12} md={6} sm={6}>
                <Box >
                  <ProductGallery product={product} />

                </Box>
              
              </Grid>

              


              <Grid item xs={12} md={6} sm={6}>
                <ProductInfo product={product} 
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMessage={setSnackbarMessage}
                setSeverity={setSeverity}/>

              </Grid>
            </Grid>
            <CustomSnackbar
            openSnackbar={openSnackbar}
            snackbarMessage={snackbarMessage}
            setOpenSnackbar={setOpenSnackbar}
            severity={severity}
            />

            
          </Box> :
          <Loader />}
   </Box>
  )
}
