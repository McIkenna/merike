import { useState } from 'react';
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Paper,
    Divider,
    Slider
} from '@mui/material';

const SortProd = ({
    onSortChange,
    valueText,
    handlePriceChange,
    marks,
    priceFilter,
    selectedSort,
    setSelectedSort
}) => {
    

    const sortOptions = [
        { value: 'bestselling', label: 'Bestselling' },
        { value: 'discount', label: 'Discount %' },
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low-high', label: 'Price: Low to High' },
        { value: 'price-high-low', label: 'Price: High to Low' }
    ];

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSelectedSort(value);
        if (onSortChange) {
            onSortChange(value);
        }
    };

    //   const sortProducts = (products, sortType) => {
    //   switch(sortType) {
    //     case 'price-low-high':
    //       return [...products].sort((a, b) => a.price - b.price);
    //     case 'price-high-low':
    //       return [...products].sort((a, b) => b.price - a.price);
    //     case 'newest':
    //       return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //     case 'discount':
    //       return [...products].sort((a, b) => (b.discount || 0) - (a.discount || 0));
    //     default:
    //       return products; // bestselling
    //   }
    // };

    return (
        <Paper
            elevation={0}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                p: 2,
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontWeight: 400,
                        color: 'text.primary'
                    }}>Price Filter</Typography>
                <Slider
                    aria-label="Always visible"
                    defaultValue={[1, 150]}
                    getAriaValueText={valueText}
                    step={1}
                    marks={marks}
                    min={0}
                    max={150}
                    value={priceFilter}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={value => `$${value}`}
                />
            </Box>
            <Divider />
            {/* Header */}
            <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="h6" fontWeight="600">
                    Sort
                </Typography>
            </Box>

            <Divider />

            {/* Sort Options */}
            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup value={selectedSort} onChange={handleSortChange}>
                    {sortOptions.map((option, index) => (
                        <Box key={option.value}>
                            <FormControlLabel
                                value={option.value}
                                control={
                                    <Radio
                                        sx={{
                                            color: 'grey.400',
                                            '&.Mui-checked': {
                                                color: 'success.main'
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <Typography
                                        sx={{
                                            fontWeight: selectedSort === option.value ? 600 : 400,
                                            color: selectedSort === option.value ? 'text.primary' : 'text.secondary'
                                        }}
                                    >
                                        {option.label}
                                    </Typography>
                                }
                                sx={{
                                    py: 1.5,
                                    px: 2,
                                    m: 0,
                                    width: '100%',
                                    '&:hover': {
                                        bgcolor: 'grey.50'
                                    }
                                }}
                            />
                            {index < sortOptions.length - 1 && <Divider />}
                        </Box>
                    ))}
                </RadioGroup>
            </FormControl>
        </Paper>
    );
};

export default SortProd;