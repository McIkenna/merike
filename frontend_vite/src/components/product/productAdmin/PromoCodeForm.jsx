import  { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    TextField,
    Container,
    Modal
} from '@mui/material';
import { useCreatePromoCodeMutation, useUpdatePromoCodeMutation, useGetAllPromoQuery, useDeletePromoCodeMutation } from '../../../api/services/promoCodeApi';
import { makeStyles } from '@mui/styles';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { AgGridReact } from "ag-grid-react";
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
}));
const PromoCodeForm = (props) => {
    const { data, refetch } = useGetAllPromoQuery();
    const [activePage, setActivePage] = useState('AvailablePromoCode');
    const [createPromoCode] = useCreatePromoCodeMutation()
    const [updatePromoCode] = useUpdatePromoCodeMutation()
    const [deletePromoCode] = useDeletePromoCodeMutation()
    const [selectedRow, setSelectedRow] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [formData, setFormData] = useState({});
    const { toastState, setToastState } = props;
    const gridRef = useRef(null);
    const classes = useStyles();

    // eslint-disable-next-line no-restricted-syntax
    const timestamp = new Date()

    
    const emptyState = {
        code: "",
        description: "",
        discountType: "",
        discountValue: 0,
        minPurchaseAmount: 0,
        validFrom: new Date(),
        validUntil: new Date(timestamp + 90 * 24 * 60 * 60 * 1000), // 90 days
        usageLimit: null // Unlimited
    }


    useEffect(() => {
        const setData = () =>{
            if (activePage === 'UpdatePromoCodeForm' && selectedRow) {
            setFormData(selectedRow)
        } else {
            setFormData(emptyState)
        }

        }
        setData()
    }, [activePage, selectedRow, emptyState])

    

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
    }, [toastState.open, setToastState])

    const columnData = useMemo(() => {
        if (!data?.promos || data?.promos?.length === 0) {
            return []
        }
        const headers = Object.keys(data?.promos[0]).map((header) => (
            {

                headerName: header,
                field: header
            }
        )
        )
        return headers

    }, [data?.promos])

    const rowData = useMemo(() => { return data?.promos ? data?.promos : [] }, [data?.promos])

    const rowSelection = useMemo(() => {
        return {
            mode: 'singleRow',
        };
    }, []);



    const CustomButtonComponent = (props) => {
        const field = props.colDef.field
        const value = props.value
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
                            color: 'primary.main',
                            border: 'none',
                            backgroundColor: 'background.default',
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '20px',
                        }}
                        onClick={() => handleEdit(props.data)}
                    />
                    <DeleteOutlineOutlinedIcon
                        style={{
                            color: 'secondary.main',
                            border: 'none',
                            backgroundColor: 'background.default',
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

        deletePromoCode(selectedRow?._id).then((res) => {
            if (res?.data?.success) {
                setToastState({
                    open: true,
                    message: 'Banner Deleted Successfully',
                    severity: 'success'
                })
            }
            refetch();
        }
        ).catch(() => {
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


    const handleEdit = (data) => {
        setSelectedRow(data); // Set the selected row
        setActivePage('UpdatePromoCodeForm')
    }
    const deleteIntent = (data) => {
        setSelectedRow(data);
        setShowDeleteModal(true)
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (activePage === 'UpdatePromoCodeForm') {
            const updatedFormData = {
                ...formData
            };
            updatePromoCode(updatedFormData).then(res => {
                if (res.data.success) {
                    setToastState({
                        open: true,
                        message: "Banner Updated successfully",
                        severity: "success"
                    })
                    refetch()
                    setActivePage('AvailablePromoCode')
                    setFormData(emptyState)
                } else {
                    setToastState({
                        open: true,
                        message: "AvailablePromoCode Update failed",
                        severity: "error"
                    })
                }
            }).catch(() => {
                setToastState({
                    open: true,
                    message: "AvailablePromoCode Update failed",
                    severity: "error"
                })
            })

        } else {
            const convertedFormData = {
                ...formData
            };
            createPromoCode(convertedFormData).then(res => {
                if (res.data.success) {
                    setToastState({
                        open: true,
                        message: "Promocode created successfully",
                        severity: "success"
                    })
                    refetch()
                    setActivePage('AvailablePromoCode')
                    setFormData(emptyState)
                } else {
                    setToastState({
                        open: true,
                        message: "PromoCode creation failed",
                        severity: "error"
                    })
                }
            }).catch(() => {
                setToastState({
                    open: true,
                    message: "promoCode creation failed",
                    severity: "error"
                })
            })

        }

        setSelectedRow(null)

    };

    const formatDateForInput = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // console.log('data -->promocodes', data)


    return (
        <Container component="main" maxWidth="xl">

            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item size={{xs:12, sm:6}}>
                    <Button
                        variant="contained"
                        sx={{
                            color: activePage === 'AvailablePromoCode' ? 'text.primary' : 'text.light',
                            bgcolor: activePage === 'AvailablePromoCode' ? 'primary.main' : 'primary.light'
                        }}
                        // 
                        onClick={() => setActivePage('AvailablePromoCode')}
                        fullWidth
                    >
                        Active PromoCodes
                    </Button>
                </Grid>
                <Grid item size={{xs:12, sm:6}}>
                    <Button
                        variant="contained"
                        sx={{
                            color: (activePage === 'AddPromoCodeForm' || activePage === 'UpdatePromoCodeForm') ? 'primary' : 'default'
                        }}

                        onClick={() => {
                            setActivePage('AddPromoCodeForm')
                            setFormData(emptyState)
                        }}
                        fullWidth
                    >
                        {activePage === 'UpdatePromoCodeForm' ? 'Update PromoCode' : 'Add PromoCode'}
                    </Button>
                </Grid>
            </Grid>
            {activePage === 'AvailablePromoCode' && <Box>
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

            {(activePage === 'AddPromoCodeForm' || activePage === 'UpdatePromoCodeForm') &&
                <Box>
                    <div className={classes.form}>
                        <Box sx={{ padding: '20px' }}><Typography component="h1" variant="h4">
                            {(activePage === 'UpdatePromoCodeForm' && selectedRow) ? 'Update PromoCode Form' : 'PromoCode Form'}
                        </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="code"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Code"
                                        value={formData?.code}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                </Grid>
                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="description"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Description"
                                        value={formData?.description}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                </Grid>
                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="discountType"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Discount Type"
                                        value={formData?.discountType}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                </Grid>
                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="discountValue"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="number"
                                        label="Discount Value"
                                        value={formData?.discountValue}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                </Grid>

                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="minPurchaseAmount"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="number"
                                        label="Minimum Purchase Order"
                                        value={formData?.minPurchaseAmount}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                </Grid>

                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="validFrom"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="date"
                                        label="Valid From"
                                        value={formatDateForInput(formData?.validFrom)}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true, // Keeps label above the field
                                        }}
                                        inputProps={{
                                            min: new Date().toISOString().split('T')[0], // Today's date as minimum
                                        }}
                                    />
                                </Grid>

                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="validUntil"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="date"
                                        label="Valid Until"
                                        value={formatDateForInput(formData?.validUntil)}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true, // Keeps label above the field
                                        }}
                                        inputProps={{
                                            min: formData.validFrom || new Date().toISOString().split('T')[0], // Can't be before validFrom
                                        }}
                                    />
                                </Grid>

                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="usageLimit"
                                        variant="outlined"
                                        fullWidth
                                        label="Usage Limit"
                                        value={formData?.usageLimit}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                </Grid>

                                <Grid item size={{xs:12}}>
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
                </Box>

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

export default PromoCodeForm;