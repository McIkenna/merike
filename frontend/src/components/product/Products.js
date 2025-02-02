import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import Loader from '../../utils/Loader'
import BoxCard from '../../utils/BoxCard'
import ProdGrid from './ProdGrid'
export const Products = ({ products }) => {
  // console.log('product in products component -->', products)
  useEffect(() => {

  }, [products])
  // console.log(Object.value(products))
  return (
    <Box>

      <Grid item container>
        {
          !products?.length ? <Loader /> :
            products?.map(product =>
              <Grid item md={3} sm={3} xs={6}>
                <BoxCard
                  product={product}
                />
              </Grid>
            )
        }
      </Grid>
      <ProdGrid />
    </Box>
  )
}
