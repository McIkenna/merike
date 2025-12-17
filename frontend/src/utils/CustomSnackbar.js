import React from 'react'
import { Box, Snackbar, Alert } from '@mui/material'

export const CustomSnackbar = ({openSnackbar, snackbarMessage, setOpenSnackbar, severity="success" }) => {
  return (
    <Box>
            <Snackbar
            open={openSnackbar}
            autoHideDuration={1000}
            message={snackbarMessage}
          />

          <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
                <Alert
                  severity={severity}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {snackbarMessage}
                </Alert>
          </Snackbar>
            </Box>
  )
}
