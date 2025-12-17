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
import {Snackbar, Alert} from '@mui/material'

export default function ProductDetail() {
  const params = useParams();
  const { data, error, isLoading, isSuccess } = useGetSingleProductQuery(params.id);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [ snackbarMessage, setSnackbarMessage] = useState('')
  const product = data?.product;



  return (
    <Box>
      <MetaData title={product?.name} />
      {
        data && data.product ?
          <Box style={{ padding: '10px', marginTop: '20px' }}>
            <Grid container spacing={2}>
              {/* Additional Product Images */}
              <Grid item xs={6} md={6} sm={6}>
              <ProductGallery product={product} />
              </Grid>

              


              <Grid item xs={6} md={6} sm={6}>
                {/* Product Details */}
                <ProductInfo product={product} 
                setOpenSnackbar={setOpenSnackbar}
                setSnackbarMessage={setSnackbarMessage}/>

              </Grid>
            </Grid>

            <Box>
            <Snackbar
            open={openSnackbar}
            autoHideDuration={1000}
            message={snackbarMessage}
          />

          <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
                <Alert
                  severity="success"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {snackbarMessage}
                </Alert>
          </Snackbar>
            </Box>
          </Box> :
          <Loader />}
   </Box>
  )
}
