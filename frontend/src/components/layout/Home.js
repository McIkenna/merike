import React from 'react'
import BoxCard from '../../utils/BoxCard'
import {Grid, Box} from '@mui/material';
export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
            <BoxCard/>
        </Grid>
        <Grid item xs={4}>
        <BoxCard/>
        </Grid>
        <Grid item xs={4}>
        <BoxCard/>
        </Grid>
        <Grid item xs={4}>
        <BoxCard/>
        </Grid>
      </Grid>
    </Box>
  )
}
