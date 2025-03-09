import React, { useEffect, useState, useMemo } from 'react';
import {
    TextField, Button, Grid, Typography, Container, MenuItem, Select, InputLabel, FormControl, Box,
    IconButton

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@mui/material/colors';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { useCreateProductMutation, useUpdateProductMutation } from '../../../api/services/productApi';


const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        minWidth: 120,
    },
    imageUrlContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    imageUrlInput: {
        flex: 1,
    },
}));

const ProductForm = (props) => {
    const { categories, user, activePage, setActivePage, selectedRow, emptyState, refetch, setToastState, setSelectedRow, gridRef } = props;
    // console.log('categories -->', categories)
    const [createProduct, { isLoading, isError, isSuccess }] = useCreateProductMutation()
    const [updateProduct, { isError: isErrorUpdate, isSucess: isSuccessProduct }] = useUpdateProductMutation()

    const classes = useStyles();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (activePage === 'UpdateProductForm' && selectedRow) {
            setFormData(selectedRow)
        } else {
            setFormData(emptyState)
        }
    }, [activePage])

    // console.log(' activePage -->', activePage)
    // console.log(' selectedRow -->', selectedRow)
    // console.log(' defaultState -->', defaultState)
    // const [formSubmitted, setFormSubmitted] = useState(false)

    // console.log('formData --->', formData)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (index, e) => {
        const { value } = e.target;
        const updatedImages = formData?.images?.map((image, i) =>
            i === index ? {
                ...image,
                public_id: value?.split("/").pop(),
                url: value
            } : image
        );
        setFormData((prevData) => ({
            ...prevData,
            images: updatedImages,
        }));
    };

    const addImageField = () => {
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, { public_id: '', url: '' }],
        }));
    };

    const removeImageField = (index) => {
        const updatedImages = formData?.images?.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            images: updatedImages,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activePage === 'UpdateProductForm') {
            const updatedFormData = {
                ...formData,
                price: parseFloat(formData?.price),
                ratings: parseFloat(formData?.ratings),
                stock: parseInt(formData?.stock, 10),
                updatedAt: Date.now()
            };
            updateProduct(updatedFormData).then(res => {
                if (res.data.success && res.data.statusCode === 200) {
                    setToastState({
                        open: true,
                        message: "Product Updated successfully",
                        severity: "success"
                    })
                    refetch()
                    setActivePage('Listing')
                    setFormData(emptyState)
                } else {
                    setToastState({
                        open: true,
                        message: "Product Update failed",
                        severity: "error"
                    })
                }
            }).catch(err => {
                setToastState({
                    open: true,
                    message: "Product Update failed",
                    severity: "error"
                })
            })

        } else {
            const convertedFormData = {
                ...formData,
                price: parseFloat(formData?.price),
                ratings: parseFloat(formData?.ratings),
                stock: parseInt(formData?.stock, 10)
            };
            createProduct(convertedFormData).then(res => {
                if (res.data.success && res.data.statusCode === 201) {
                    setToastState({
                        open: true,
                        message: "Product created successfully",
                        severity: "success"
                    })
                    refetch()
                    setActivePage('Listing')
                    setFormData(emptyState)
                } else {
                    setToastState({
                        open: true,
                        message: "Product creation failed",
                        severity: "error"
                    })
                }
            }).catch(err => {
                setToastState({
                    open: true,
                    message: "Product creation failed",
                    severity: "error"
                })
            })

        }
        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.deselectAll(); // Corrected to deselectAll
        }
        setSelectedRow(null)
        // Add your form submission logic here
        // console.log(convertedFormData);

    };

    return (
        <Container component="main" maxWidth="md">

            <div className={classes.form}>
                <Box sx={{ padding: '20px' }}><Typography component="h1" variant="h4">
                    {(activePage === 'UpdateProductForm' && selectedRow) ? 'Update Product Form' : 'Product Form'}
                </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                label="Product Name"
                                value={formData?.name}
                                onChange={handleChange}
                                inputProps={{ maxLength: 100 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="price"
                                variant="outlined"
                                required
                                fullWidth
                                label="Product Price"
                                type="number"
                                value={formData?.price}
                                onChange={handleChange}
                                inputProps={{ maxLength: 100 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                variant="outlined"
                                required
                                fullWidth
                                label="Product Description"
                                value={formData?.description}
                                onChange={handleChange}
                                inputProps={{ maxLength: 500 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="ratings"
                                variant="outlined"
                                fullWidth
                                label="Ratings"
                                type="number"
                                value={formData?.ratings}
                                aria-readonly
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth required>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    name="category"
                                    value={formData?.category || ""} // Ensure it's not undefined
                                    onChange={handleChange}
                                    label="Category"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {categories?.categories?.map((cat) => (
                                        <MenuItem key={cat?._id} value={cat?.categoryName}>
                                            {cat?.categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="seller"
                                variant="outlined"
                                required
                                fullWidth
                                label="Seller"
                                value={user?._id}
                                aria-readonly
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="stock"
                                variant="outlined"
                                required
                                fullWidth
                                label="Stock"
                                type="number"
                                value={formData?.stock}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
              <TextField
                name="numOfReviews"
                variant="outlined"
                fullWidth
                label="Number of Reviews"
                type="number"
                value={formData.numOfReviews}
                onChange={handleChange}
              />
            </Grid> */}
                        {/* <Grid item xs={12} >
              <TextField
                name="user"
                variant="outlined"
                required
                fullWidth
                label="User ID"
                value={user?._id}
                aria-readonly
               
              />
            </Grid> */}
                        {/* <Grid item xs={12}>
              <TextField
                name="createdAt"
                variant="outlined"
                fullWidth
                label="Created At"
                type="date"
                value={formData.createdAt.toISOString().split('T')[0]}
                aria-readonly
              />
            </Grid> */}
                        {formData?.images?.map((image, index) => (
                            <React.Fragment key={index}>
                                {/* <Grid item xs={5}>
                  <TextField
                    name="public_id"
                    variant="outlined"
                    required
                    fullWidth
                    label="Image Public ID"
                    value={image.public_id}
                    onChange={(e) => handleImageChange(index, e)}
                  />
                </Grid> */}
                                <Grid item xs={8}>
                                    <TextField
                                        name="url"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Image URL"
                                        value={image.url}
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton onClick={() => removeImageField(index)}>
                                        <RemoveCircleOutline />
                                    </IconButton>
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={addImageField}
                                startIcon={<AddCircleOutline />}
                            >
                                Add Image
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default ProductForm;