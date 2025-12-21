import React, { useEffect, useState} from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
    Paper,
    Tabs,
    Tab,
    Alert,
    Snackbar,
    Tooltip,
    Avatar,
    Stack
} from '@mui/material';
import { Divider } from '../../../utils/Divider';
import { styled } from '@mui/material/styles';
import {
    Add,
    Edit,
    Delete,
    Image as ImageIcon,
    ViewList,
    GridView,
    Close,
    SaveOutlined,
    CancelOutlined
} from '@mui/icons-material';
import {
    useCreateCarouselMutation, useUpdateCarouselMutation,
    useGetAllCarouselQuery, useDeleteCarouselMutation
} from '../../../api/services/carouselApi';


const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.divider,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8],
        borderColor: theme.palette.primary.main,
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.spacing(1),
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.divider}`,
}));




const CarouselManagement = (props) => {

    const { toastState, setToastState, carouselItems } = props;

    // State Management
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedCarousel, setSelectedCarousel] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showFormDialog, setShowFormDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const emptyState = {
        name: '',
        description: '',
        image: { public_id: '', url: '' },
        createdAt: ''
    }

     const [formData, setFormData] = useState({});
    const [createCarousel, { isLoading: isCreating }] = useCreateCarouselMutation()
    const { refetch } = useGetAllCarouselQuery()
    const [updateCarousel, { isError: isUpdating}] = useUpdateCarouselMutation()
    const [deleteCarousel, { isError: isDeleting}] = useDeleteCarouselMutation()


    useEffect(() => {
        if (toastState.open) {
            const timer = setTimeout(() => {
                setToastState({ open: false, message: '', severity: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastState.open]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const { value } = e.target;
        const updatedImage =
        {
            public_id: value?.split("/").pop(),
            url: value
        }
        setFormData((prevData) => ({
            ...prevData,
            image: updatedImage,
        }));
    };


     // CRUD Operations
    const handleOpenCreateDialog = () => {
        setFormData(emptyState);
        setIsEditing(false);
        setShowFormDialog(true);
    };

    const handleOpenEditDialog = (carousel) => {
        setFormData(carousel);
        setSelectedCarousel(carousel);
        setIsEditing(true);
        setShowFormDialog(true);
    };

    const handleCloseDialog = () => {
        setShowFormDialog(false);
        setFormData(emptyState);
        setSelectedCarousel(null);
        setIsEditing(false);
    };


      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                const result = await updateCarousel(formData).unwrap();
                if (result.success) {
                    setToastState({
                        open: true,
                        message: "Carousel updated successfully",
                        severity: "success"
                    });
                }
            } else {
                const result = await createCarousel(formData).unwrap();
                if (result.success) {
                    setToastState({
                        open: true,
                        message: "Carousel created successfully",
                        severity: "success"
                    });
                }
            }
            refetch();
            handleCloseDialog();
        } catch  {
            setToastState({
                open: true,
                message: `Carousel ${isEditing ? 'update' : 'creation'} failed`,
                severity: "error"
            });
        }
    };

    const handleDeleteClick = (carousel) => {
        setSelectedCarousel(carousel);
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const result = await deleteCarousel(selectedCarousel?._id).unwrap();
            if (result.success) {
                setToastState({
                    open: true,
                    message: "Carousel deleted successfully",
                    severity: "success"
                });
                refetch();
            }
        } catch {
            setToastState({
                open: true,
                message: "Carousel deletion failed",
                severity: "error"
            });
        }
        setShowDeleteDialog(false);
        setSelectedCarousel(null);
    };


        // Render Grid View
    const renderGridView = () => (
        <Grid container spacing={3}>
            {carouselItems?.map((carousel) => (
                <Grid item size={{xs:12, sm:6, md:4}} key={carousel._id}>
                    <StyledCard elevation={0}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={carousel.image?.url}
                            alt={carousel.name}
                            sx={{
                                objectFit: 'cover',
                                bgcolor: 'background.default',
                            }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {carousel.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    minHeight: 40,
                                }}
                            >
                                {carousel.description}
                            </Typography>
                            <Chip
                                label={new Date(carousel.createdAt).toLocaleDateString()}
                                size="small"
                                sx={{ mt: 1 }}
                            />
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                            <Tooltip title="Edit">
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => handleOpenEditDialog(carousel)}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'primary.main',
                                    }}
                                >
                                    <Edit fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleDeleteClick(carousel)}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'error.main',
                                    }}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );

    // Render List View
    const renderListView = () => (
        <Stack spacing={2}>
            {carouselItems?.map((carousel) => (
                <Paper
                    key={carousel._id}
                    elevation={0}
                    sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            borderColor: 'primary.main',
                            boxShadow: 2,
                        },
                    }}
                >
                    <Avatar
                        src={carousel.image?.url}
                        variant="rounded"
                        sx={{ width: 80, height: 80 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {carousel.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {carousel.description}
                        </Typography>
                        <Chip
                            label={new Date(carousel.createdAt).toLocaleDateString()}
                            size="small"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit">
                            <IconButton
                                color="primary"
                                onClick={() => handleOpenEditDialog(carousel)}
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                color="error"
                                onClick={() => handleDeleteClick(carousel)}
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Paper>
            ))}
        </Stack>
    );

    // Empty State
    const renderEmptyState = () => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                }}
            >
                <ImageIcon sx={{ fontSize: 60, color: 'primary.main' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                No Banners Yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Create your first carousel to get started
            </Typography>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenCreateDialog}
                size="large"
            >
                Create Carousel
            </Button>
        </Box>
    );
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <HeaderBox>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                        Carousel Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {carouselItems?.length || 0} carousel{carouselItems?.length !== 1 ? 's' : ''} total
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {/* View Mode Toggle */}
                    <Box
                        sx={{
                            display: 'flex',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                        }}
                    >
                        <Tooltip title="Grid View">
                            <IconButton
                                size="small"
                                onClick={() => setViewMode('grid')}
                                sx={{
                                    borderRadius: 0,
                                    bgcolor: viewMode === 'grid' ? 'primary.main' : 'transparent',
                                    color: viewMode === 'grid' ? 'primary.contrastText' : 'text.primary',
                                    '&:hover': {
                                        bgcolor: viewMode === 'grid' ? 'primary.dark' : 'action.hover',
                                    },
                                }}
                            >
                                <GridView fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="List View">
                            <IconButton
                                size="small"
                                onClick={() => setViewMode('list')}
                                sx={{
                                    borderRadius: 0,
                                    bgcolor: viewMode === 'list' ? 'primary.main' : 'transparent',
                                    color: viewMode === 'list' ? 'primary.contrastText' : 'text.primary',
                                    '&:hover': {
                                        bgcolor: viewMode === 'list' ? 'primary.dark' : 'action.hover',
                                    },
                                }}
                            >
                                <ViewList fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleOpenCreateDialog}
                        size="large"
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3,
                        }}
                    >
                        Create Carousel
                    </Button>
                </Box>
            </HeaderBox>

            {/* Content */}
            {!carouselItems || carouselItems.length === 0 ? (
                renderEmptyState()
            ) : (
                <Box sx={{ mt: 3 }}>
                    {viewMode === 'grid' ? renderGridView() : renderListView()}
                </Box>
            )}

            {/* Form Dialog */}
            <Dialog
                open={showFormDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                    },
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {isEditing ? 'Edit Carousel' : 'Create New Carousel'}
                    </Typography>
                    <IconButton onClick={handleCloseDialog} size="small">
                        <Close />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <form onSubmit={handleSubmit}>
                    <DialogContent sx={{ pt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item size={{xs:12}}>
                                <StyledTextField
                                    name="name"
                                    label="Carousel Name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={formData?.name}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 100 }}
                                    placeholder="Enter carousel name"
                                />
                            </Grid>
                            <Grid item size={{xs:12}}>
                                <StyledTextField
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={formData?.description}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 500 }}
                                    placeholder="Enter carousel description"
                                />
                            </Grid>
                            <Grid item size={{xs:12}}>
                                <StyledTextField
                                    name="url"
                                    label="Image URL"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={formData?.image?.url}
                                    onChange={handleImageChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </Grid>
                            {formData?.image?.url && (
                                <Grid item size={{xs:12}}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: 200,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            bgcolor: 'background.default',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img
                                            src={formData.image.url}
                                            alt="Preview"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain',
                                            }}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{ p: 2, gap: 1 }}>
                        <Button
                            onClick={handleCloseDialog}
                            variant="outlined"
                            startIcon={<CancelOutlined />}
                            sx={{ textTransform: 'none' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveOutlined />}
                            disabled={isCreating || isUpdating}
                            sx={{ textTransform: 'none' }}
                        >
                            {isCreating || isUpdating
                                ? 'Saving...'
                                : isEditing
                                ? 'Update Carousel'
                                : 'Create Carousel'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                    },
                }}
            >
                <DialogTitle>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Delete Carousel
                    </Typography>
                </DialogTitle>
                <Divider />
                <DialogContent sx={{ pt: 3 }}>
                    <Typography variant="body1">
                        Are you sure you want to delete "{selectedCarousel?.name}"? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={() => setShowDeleteDialog(false)}
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        variant="contained"
                        color="error"
                        disabled={isDeleting}
                        sx={{ textTransform: 'none' }}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Toast Notification */}
            <Snackbar
                open={toastState.open}
                autoHideDuration={3000}
                onClose={() => setToastState({ ...toastState, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setToastState({ ...toastState, open: false })}
                    severity={toastState.severity}
                    sx={{ width: '100%' }}
                >
                    {toastState.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CarouselManagement;