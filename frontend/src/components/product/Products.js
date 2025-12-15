import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import Loader from '../../utils/Loader'
import BoxCard from '../../utils/BoxCard'

export const Products = ({ products }) => {
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
                />
              </Grid>
            )
        }
      </Grid>
      {/* <ProdGrid /> */}
    </Box>
  )
}
