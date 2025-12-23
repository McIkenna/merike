import React, { useMemo, useState, useEffect } from 'react'
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    MenuItem,
    Box,
    IconButton,
    Paper,
    Stack,
    Card,
    CardMedia
} from '@mui/material'
import {
    AddCircleOutline,
    RemoveCircleOutline,
    ImageOutlined,
    SaveOutlined,
    CancelOutlined
} from '@mui/icons-material'
import {
    useCreateProductMutation,
    useUpdateProductMutation
} from '../../../api/services/productApi'
import { Divider } from '../../../utils/Divider'

// Image field component
const ImageField = ({ image, index, onChange, onRemove, canRemove }) => (
    <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
            {image.url && (
                <CardMedia
                    component="img"
                    sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                    image={image.url}
                    alt={`Product ${index + 1}`}
                />
            )}
            <TextField
                name="url"
                variant="outlined"
                fullWidth
                required
                size="small"
                label={`Image URL ${index + 1}`}
                placeholder="https://example.com/image.jpg"
                value={image.url}
                onChange={(e) => onChange(index, e)}
            />
            {canRemove && (
                <IconButton
                    color="error"
                    onClick={() => onRemove(index)}
                    sx={{ flexShrink: 0 }}
                >
                    <RemoveCircleOutline />
                </IconButton>
            )}
        </Stack>
    </Card>
)

const ProductForm = ({
    categories,
    activePage,
    setActivePage,
    selectedRow,
    emptyState,
    refetch,
    setToastState,
    setSelectedRow,
    gridRef
}) => {
    const [createProduct] = useCreateProductMutation()
    const [updateProduct] = useUpdateProductMutation()

    const isEditMode = activePage === 'UpdateProductForm' && selectedRow

    const initialFormData = useMemo(() => {
        return isEditMode ? selectedRow : emptyState
    }, [isEditMode, selectedRow, emptyState])

    const [formData, setFormData] = useState(initialFormData)

    // Update form when switching between create/edit
    useEffect(() => {
        setFormData(initialFormData)
    }, [initialFormData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (index, e) => {
        const { value } = e.target
        const updatedImages = formData.images.map((image, i) =>
            i === index
                ? {
                    ...image,
                    public_id: value.split('/').pop() || '',
                    url: value
                }
                : image
        )
        setFormData((prev) => ({
            ...prev,
            images: updatedImages
        }))
    }

    const addImageField = () => {
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, { public_id: '', url: '' }]
        }))
    }

    const removeImageField = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    const resetForm = () => {
        setFormData(emptyState)
        setSelectedRow(null)
        gridRef.current?.api?.deselectAll()
        setActivePage('list')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const processedData = {
            ...formData,
            price: parseFloat(formData.price).toFixed(2),
            ratings: parseFloat(formData.ratings).toFixed(2),
            stock: parseInt(formData.stock, 10),
            ...(isEditMode && { updatedAt: Date.now() })
        }

        try {
            const mutation = isEditMode ? updateProduct : createProduct
            const response = await mutation(processedData)

            const expectedStatus = isEditMode ? 200 : 201
            const isSuccess = response.data?.success && response.data?.statusCode === expectedStatus

            setToastState({
                open: true,
                message: isSuccess
                    ? `Product ${isEditMode ? 'updated' : 'created'} successfully`
                    : `Product ${isEditMode ? 'update' : 'creation'} failed`,
                severity: isSuccess ? 'success' : 'error'
            })

            if (isSuccess) {
                refetch()
                resetForm()
            }
        } catch {
            setToastState({
                open: true,
                message: `Product ${isEditMode ? 'update' : 'creation'} failed`,
                severity: 'error'
            })
        }
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        {isEditMode ? 'Edit Product' : 'New Product'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {isEditMode
                            ? 'Update the details of your existing product'
                            : 'Add a new product to your inventory'}
                    </Typography>
                </Box>

                <Box mb={4}>
                    <Divider />
                </Box>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Product Name */}
                        <Grid item size={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                label="Product Name"
                                value={formData.name}
                                onChange={handleChange}
                                inputProps={{ maxLength: 100 }}
                            />
                        </Grid>

                        {/* Price and Stock */}
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="price"
                                variant="outlined"
                                required
                                fullWidth
                                label="Price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                inputProps={{ min: 0, step: '0.01' }}
                            />
                        </Grid>

                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="stock"
                                variant="outlined"
                                required
                                fullWidth
                                label="Stock Quantity"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                inputProps={{ min: 0 }}
                            />
                        </Grid>

                        {/* Category and Discount */}
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="category"
                                variant="outlined"
                                required
                                fullWidth
                                select
                                label="Category"
                                value={formData.category || ''}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>Select a category</em>
                                </MenuItem>
                                {categories?.categories?.map((cat) => (
                                    <MenuItem key={cat._id} value={cat.categoryName}>
                                        {cat.categoryName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="discount"
                                variant="outlined"
                                fullWidth
                                label="Discount (%)"
                                type="number"
                                value={formData.discount || ''}
                                onChange={handleChange}
                                inputProps={{ min: 0, max: 100 }}
                            />
                        </Grid>

                        {/* Description */}
                        <Grid item size={{ xs: 12 }}>
                            <TextField
                                name="description"
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                value={formData.description}
                                onChange={handleChange}
                                inputProps={{ maxLength: 500 }}
                                helperText={`${formData.description?.length || 0}/500 characters`}
                            />
                        </Grid>

                        {/* Ratings (Read-only) */}
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="ratings"
                                variant="outlined"
                                fullWidth
                                label="Current Rating"
                                type="number"
                                value={formData.ratings}
                                InputProps={{
                                    readOnly: true
                                }}
                                disabled
                            />
                        </Grid>

                        {/* Images Section */}
                        <Grid item size={{ xs: 12 }}>
                            <Box my={2}>
                                <Divider />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                                    <ImageOutlined color="action" />
                                    <Typography variant="h6" fontWeight={600}>
                                        Product Images
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    Add URLs for your product images. The first image will be the main display image.
                                </Typography>
                            </Box>

                            {formData.images?.map((image, index) => (
                                <ImageField
                                    key={index}
                                    image={image}
                                    index={index}
                                    onChange={handleImageChange}
                                    onRemove={removeImageField}
                                    canRemove={formData.images.length > 1}
                                />
                            ))}

                            <Button
                                variant="outlined"
                                startIcon={<AddCircleOutline />}
                                onClick={addImageField}
                                sx={{ mt: 1 }}
                            >
                                Add Another Image
                            </Button>
                        </Grid>

                        {/* Action Buttons */}
                        <Grid item size={{ xs: 12 }}>
                            <Box my={2}>
                                <Divider />
                            </Box>

                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    startIcon={<CancelOutlined />}
                                    onClick={resetForm}
                                    sx={{ minWidth: 120 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<SaveOutlined />}
                                    sx={{ minWidth: 120 }}
                                >
                                    {isEditMode ? 'Update' : 'Create'} Product
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default ProductForm