import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import Loader from '../../utils/Loader'
import BoxCard from '../../utils/BoxCard'

export const Products = ({ products }) => {
  useEffect(() => {

  }, [products])
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
      {/* <ProdGrid /> */}
    </Box>
  )
}
