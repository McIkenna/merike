import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import {
    TextField, Button, Grid, Typography, Container, MenuItem, Select, InputLabel, FormControl, Box,
    IconButton, Modal

} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import {
    useCreateBannerMutation, useUpdateBannerMutation,
    useGetAllBannerQuery, useDeleteBannerMutation
} from '../../../api/services/bannerApi';
import { AgGridReact } from "ag-grid-react";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { blueGrey, red, blue, grey } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
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



const BannerForm = (props) => {
    const { toastState, setToastState } = props;
const { stateStore, auth } = useSelector((state) => state)

  const { bannerItems } = stateStore;
    // console.log('bannerData -->', bannerItems)
    const [selectedRow, setSelectedRow] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const gridRef = useRef(null)
    const emptyState = {
        name: '',
        description: '',
        image: { public_id: '', url: '' },
        createdAt: Date.now()
    }

    const [createCarousel, { isLoading, isError, isSuccess }] = useCreateBannerMutation()
    const { refetch } = useGetAllBannerQuery()
    const [updateCarousel, { isError: isErrorUpdate, isSucess: isSuccessProduct }] = useUpdateBannerMutation()
    const [deleteCarousel, { isError: isErrorDelete, isSuccess: isSuccessDelete }] = useDeleteBannerMutation()
    const [activePage, setActivePage] = useState('Banner');
    const classes = useStyles();
    const [formData, setFormData] = useState({});


    useEffect(() => {
        if (activePage === 'UpdateBannerForm' && selectedRow) {
            setFormData(selectedRow)
        } else {
            setFormData(emptyState)
        }
    }, [activePage])

    // console.log('activePage -->', activePage)


    useEffect(() => {
        const removeAlert = () => {
            setToastState({
                open: false,
                message: '',
                severity: ''
            })
        }
        const timer = setTimeout(removeAlert, 3000);
        return () => clearTimeout(timer)
    }, [toastState.open])

    const columnData = useMemo(() => {
        if (!bannerItems || bannerItems?.length === 0) {
            return []
        }
        const headers = Object.keys(bannerItems[0]).map((header) => (
            {

                headerName: header,
                field: header
            }
        )
        )
        return headers

    }, [bannerItems])

    const rowData = useMemo(() => { return bannerItems ? bannerItems : [] }, [bannerItems])

    const rowSelection = useMemo(() => {
        return {
            mode: 'singleRow',
        };
    }, []);



    const CustomButtonComponent = (props) => {
        const field = props.colDef.field
        const value = props.value

        if (field === 'image') {
            const mainImage = value.url
            return (
                <Box>
                    <img
                        src={mainImage}
                        alt={'...product'}
                        style={{
                            width: '50px',
                            borderRadius: '8px'
                        }}
                    />
                </Box>
            )

        }
        if (field === '_id') {
            return (
                <Box style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px'
                }}>
                    <EditNoteOutlinedIcon
                        style={{
                            color: blue['700'],
                            border: 'none',
                            backgroundColor: grey['100'],
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '20px',
                        }}
                        onClick={() => handleEdit(props.data)}
                    />
                    <DeleteOutlineOutlinedIcon
                        style={{
                            color: red['700'],
                            border: 'none',
                            backgroundColor: grey['100'],
                            padding: '5px',
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}
                        onClick={() => deleteIntent(props.data)} />
                </Box>
            )

        }

        else {
            return (
                <Box sx={{
                    height: '100%',
                    alignContent: 'center'
                }}>
                    <Typography variant='body1'>
                        {value}
                    </Typography>
                </Box>

            )

        }
    };

    const handleDelete = () => {

        deleteCarousel(selectedRow?._id).then((res) => {
            if (res?.data?.success) {
                setToastState({
                    open: true,
                    message: 'Banner Deleted Successfully',
                    severity: 'success'
                })
            }
            refetch();
        }
        ).catch((err) => {
            setToastState({
                open: true,
                message: 'Banner Deletion Failed',
                severity: 'error'
            })
        }
        )
        setActivePage('Banner')
        setSelectedRow(null);
        setShowDeleteModal(false)
    }

    const defaultColDef = {
        flex: 1,
        minWidth: 150,
        cellRenderer: CustomButtonComponent
    };

    const onSelectedRow = useCallback(() => {
        const selectedNodes = gridRef.current.api.getSelectedRows();
        setSelectedRow(selectedNodes.length > 0 ? selectedNodes[0] : null);

    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEdit = (data) => {
        setSelectedRow(data); // Set the selected row
        setActivePage('UpdateBannerForm')
    }
    const deleteIntent = (data) => {
        setSelectedRow(data);
        setShowDeleteModal(true)
    }

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


    const handleSubmit = (e) => {
        e.preventDefault();
        if (activePage === 'UpdateBannerForm') {
            const updatedFormData = {
                ...formData
            };
            updateCarousel(updatedFormData).then(res => {
                if (res.data.success) {
                    setToastState({
                        open: true,
                        message: "Banner Updated successfully",
                        severity: "success"
                    })
                    refetch()
                    setActivePage('Banner')
                    setFormData(emptyState)
                } else {
                    setToastState({
                        open: true,
                        message: "Banner Update failed",
                        severity: "error"
                    })
                }
            }).catch(err => {
                setToastState({
                    open: true,
                    message: "Banner Update failed",
                    severity: "error"
                })
            })

        } else {
            const convertedFormData = {
                ...formData
            };
            createCarousel(convertedFormData).then(res => {
                if (res.data.success) {
                    setToastState({
                        open: true,
                        message: "Banner created successfully",
                        severity: "success"
                    })
                    refetch()
                    setActivePage('Banner')
                    setFormData(emptyState)
                } else {
                    setToastState({
                        open: true,
                        message: "Banner creation failed",
                        severity: "error"
                    })
                }
            }).catch(err => {
                setToastState({
                    open: true,
                    message: "Banner creation failed",
                    severity: "error"
                })
            })

        }
        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.deselectAll(); // Corrected to deselectAll
        }
        setSelectedRow(null)

    };

    return (
        <Container component="main" maxWidth="md">
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color={activePage === 'Banner' ? 'primary' : 'default'}
                        onClick={() => setActivePage('Banner')}
                        fullWidth
                    >
                        Banner Listing
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        variant="contained"
                        color={activePage === 'BannerForm' || activePage === 'UpdateBannerForm' ? 'primary' : 'default'}
                        onClick={() => {
                            setActivePage('BannerForm')
                            setFormData(emptyState)
                            setSelectedRow(null)
                        }}
                        fullWidth
                    >
                        {activePage === 'UpdateBannerForm' ? 'Update Banner' : 'Add Banner'}
                    </Button>
                </Grid>
            </Grid>

            {activePage === 'Banner' &&
                <Box>
                    <div className="ag-theme-quartz" style={{ height: '80vh' }}>
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnData}
                            defaultColDef={defaultColDef}
                            rowHeight={50}
                            rowSelection={rowSelection}
                            onSelectionChanged={onSelectedRow}
                        />
                    </div>

                </Box>}



            {(activePage === 'BannerForm' || activePage === 'UpdateBannerForm') && (
                <div className={classes.form}>
                    <Box sx={{ padding: '20px' }}><Typography component="h1" variant="h4">
                        {(activePage === 'UpdateBannerForm' && selectedRow) ? 'Update Banner Form' : 'Banner Form'}
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
                                    label="Name"
                                    value={formData?.name}
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
                                    label="Description"
                                    value={formData?.description}
                                    onChange={handleChange}
                                    inputProps={{ maxLength: 500 }}
                                />
                            </Grid>

                            <Grid item xs={8}>
                                <TextField
                                    name="url"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="Image URL"
                                    value={formData?.image?.url}
                                    onChange={(e) => handleImageChange(e)}
                                />
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
                </div>)
            }

            {showDeleteModal && <Box
            >
                <Modal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            // width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: '10px'
                        }}>
                        <Typography variant='h5' sx={{ mt: 2 }}>Are you sure you want to delete this Banner Item?</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '20px'
                            }}>

                            <Button variant='outlined' color='primary' onClick={() => setShowDeleteModal(false)}>No</Button>
                            <Button variant='outlined' color='error' onClick={() => handleDelete(selectedRow)}>Yes</Button>
                        </Box>

                    </Box>
                </Modal>
            </Box>}
        </Container>
    );
};

export default BannerForm;