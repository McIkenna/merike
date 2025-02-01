import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import Loader from '../../utils/Loader'
import { grey, green, red, blue } from "@mui/material/colors";
export const Category = ({ categories, handleCategoryChange, selectedCategory }) => {
    return (
        <Box>
            <Typography variant='h6'>Categories</Typography>
            <Box>
                {
                    categories ? categories?.categories?.map((category, index) =>
                        <Paper
                            elevation={0}
                            sx={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                                margin: '10px',
                                padding: '10px',
                                backgroundColor: category?.categoryName === selectedCategory ? blue[100] : grey[100]
                            }}
                            key={index}
                            onClick={() => handleCategoryChange(category?.categoryName)}
                        >
                            {category?.categoryName}
                        </Paper>
                    ) : <Loader />
                }
            </Box>
        </Box>
    );
};
