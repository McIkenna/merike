import React from 'react'
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import {useParams} from 'react-router-dom';
import { useGetSingleProductQuery } from '../../api/services/productApi';
import Loader from '../../utils/Loader';

export default function ProductDetail() {
    const params = useParams();
    console.log('params ->', params.id);
    const {data, error, isLoading, isSuccess} = useGetSingleProductQuery(params.id);
    console.log('data ->', data);
    const product = data?.product;
  return (
    <Container maxWidth="lg">
      {
        data && data.product ?
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Product Image */}
            <img
              src={product.images[0].url}
              alt="Product"
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Product Details */}
            <Typography variant="h4" gutterBottom>
             {product.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Category: {product.category}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: ${product.price}
            </Typography>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper> :
      <Loader/>}
    </Container>
  )
}
