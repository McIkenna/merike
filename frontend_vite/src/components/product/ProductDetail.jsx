import React, { useState } from 'react'
import {
  Grid,  Box
  
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../../api/services/productApi';
import Loader from '../../utils/Loader.jsx';

import MetaData from '../../utils/MetaData.jsx';
import { ProductInfo } from './ProductInfo.jsx';
import { ProductGallery } from './ProductGallery.jsx';
import { CustomSnackbar } from '../../utils/CustomSnackbar.jsx';
import ModernLoader from '../../utils/ModernLoader.jsx';

export default function ProductDetail() {
  const params = useParams();
  const { data} = useGetSingleProductQuery(params.id);
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
              <Grid item size={{ xs:12, md:6, sm:6}}>
                <Box >
                  <ProductGallery product={product} />

                </Box>
              
              </Grid>

              


              <Grid size={{ xs:12, md:6, sm:6}}>
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
          <ModernLoader variant='grid' count={2} />}
   </Box>
  )
}
