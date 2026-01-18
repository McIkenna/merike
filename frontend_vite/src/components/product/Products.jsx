import React, {  useState } from 'react'
import { Box, Grid } from '@mui/material'
import Loader from '../../utils/Loader'
import BoxCard from '../../utils/BoxCard.jsx'
import { CustomSnackbar } from '../../utils/CustomSnackbar';
import ModernLoader from '../../utils/ModernLoader.jsx';
export const Products = ({ products, favorites, totalPrice, totalQuantity, cartItems, cartInspiredProducts }) => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  // useEffect(() => {

  // }, [products])
  return (
    <Box>

      {!products?.length ?
        <ModernLoader variant='grid' count={12}/> :
        <Grid container spacing={2}>
          {
            products?.map((product, index) =>
              <Grid size={{ md: 2, sm: 3, xs: 6 }} key={index}>
                <BoxCard
                  product={product}
                  favorites={favorites}
                  totalPrice={totalPrice}
                  totalQuantity={totalQuantity}
                  cartItems={cartItems}
                  setSnackbarMessage={setSnackbarMessage}
                  setOpenSnackbar={setOpenSnackbar}
                  setSeverity={setSeverity}
                  cartInspiredProducts={cartInspiredProducts}

                />
              </Grid>
            )
          }
        </Grid>}

      <CustomSnackbar
        openSnackbar={openSnackbar}
        snackbarMessage={snackbarMessage}
        setOpenSnackbar={setOpenSnackbar}
        severity={severity}
      />

      {/* <ProdGrid /> */}
    </Box>
  )
}
