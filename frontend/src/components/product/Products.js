import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@mui/material'
import Loader from '../../utils/Loader'
import BoxCard from '../../utils/BoxCard'
import { CustomSnackbar } from '../../utils/CustomSnackbar'
export const Products = ({ products }) => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
    const [ snackbarMessage, setSnackbarMessage] = useState('')
  useEffect(() => {

  }, [products])
  return (
    <Box>

      <Grid item container spacing={2}>
        {
          !products?.length ? <Loader /> :
            products?.map(product =>
              <Grid item md={2} sm={2} xs={6} >
                <BoxCard
                  product={product}
                  setSnackbarMessage={setSnackbarMessage}
                  setOpenSnackbar={setOpenSnackbar}
                />
              </Grid>
            )
        }
      </Grid>

      <CustomSnackbar 
      openSnackbar={openSnackbar}
      snackbarMessage={snackbarMessage}
      setOpenSnackbar={setOpenSnackbar}
      />
      
      {/* <ProdGrid /> */}
    </Box>
  )
}
