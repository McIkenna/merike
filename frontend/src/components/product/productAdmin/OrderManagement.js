import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    TextField,
    Container,
    Modal
} from '@mui/material';
import { useAllOrdersQuery } from '../../../api/services/orderApi'
import { makeStyles } from '@material-ui/core/styles';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { AgGridReact } from "ag-grid-react";
import { styled } from '@mui/material/styles';
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


const HeaderBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.divider}`,
}));
export const OrderManagement = (props) => {
    const { toastState, setToastState } = props;
    const [activePage, setActivePage] = useState('OrderPage');

    const { data, isLoading: allOrderLoading, refetch } = useAllOrdersQuery();

    const [selectedRow, setSelectedRow] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const gridRef = useRef(null);
    const classes = useStyles();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (activePage === 'UpdateOrderForm' && selectedRow) {
            setFormData(selectedRow)
        }
    }, [activePage])

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
        if (!data?.orders || data?.orders?.length === 0) {
            return []
        }
        const headers = Object.keys(data?.orders[0]).map((header) => (
            {

                headerName: header,
                field: header
            }
        )
        )
        return headers

    }, [data?.orders])

    const rowData = useMemo(() => { return data?.orders ? data?.orders : [] }, [data?.orders])

    const rowSelection = useMemo(() => {
        return {
            mode: 'singleRow',
        };
    }, []);

    const handleEdit = (data) => {
        setSelectedRow(data); // Set the selected row
        setActivePage('UpdateOrderForm')
    }
    const deleteIntent = (data) => {
        setSelectedRow(data);
        setShowDeleteModal(true)
    }

   


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
                    {/* <DeleteOutlineOutlinedIcon
                        style={{
                            color: 'secondary.main',
                            border: 'none',
                            backgroundColor: 'background.default',
                            padding: '5px',
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }}
                        onClick={() => deleteIntent(props.data)} /> */}
                </Box>
            )

        }

        else {
            const formatObjectValue = (val) => {
                if (val === null || val === undefined) return '';
                if (typeof val === 'object') {
                    const { address1, address2, city, state, postalCode, country, phoneNo } = val;
                    if (address1 || address2 || city || state || postalCode || country || phoneNo) {
                        const parts = [];
                        if (address1) parts.push(address1);
                        if (address2) parts.push(address2);
                        const cityStatePostal = [city, state].filter(Boolean).join(', ');
                        if (cityStatePostal) parts.push(cityStatePostal + (postalCode ? ` ${postalCode}` : ''));
                        if (country) parts.push(country);
                        if (phoneNo) parts.push(`Phone: ${phoneNo}`);
                        return parts.join(' | ');
                    }
                    try {
                        return JSON.stringify(val);
                    } catch (e) {
                        return String(val);
                    }
                }
                return String(val);
            };

            const displayValue = formatObjectValue(value);

            return (
                <Box sx={{
                    height: '100%',
                    alignContent: 'center'
                }}>
                    <Typography variant='body1'>
                        {displayValue}
                    </Typography>
                </Box>
            )

        }
    };

     const defaultColDef = {
        flex: 1,
        minWidth: 150,
        cellRenderer: CustomButtonComponent
    };

    const onSelectedRow = useCallback(() => {
        const selectedNodes = gridRef.current.api.getSelectedRows();
        setSelectedRow(selectedNodes.length > 0 ? selectedNodes[0] : null);

    }, []);
    // const handleDelete = () => {

    //     deletePromoCode(selectedRow?._id).then((res) => {
    //         if (res?.data?.success) {
    //             setToastState({
    //                 open: true,
    //                 message: 'Banner Deleted Successfully',
    //                 severity: 'success'
    //             })
    //         }
    //         refetch();
    //     }
    //     ).catch((err) => {
    //         setToastState({
    //             open: true,
    //             message: 'Banner Deletion Failed',
    //             severity: 'error'
    //         })
    //     }
    //     )
    //     setActivePage('Banner')
    //     setSelectedRow(null);
    //     setShowDeleteModal(false)
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (activePage === 'UpdateOrderForm') {
        //     const updatedFormData = {
        //         ...formData
        //     };
        //     updateOrder(updatedFormData).then(res => {
        //         if (res.data.success) {
        //             setToastState({
        //                 open: true,
        //                 message: "Banner Updated successfully",
        //                 severity: "success"
        //             })
        //             // refetch()
        //             setActivePage('AvailablePromoCode')
        //             setFormData({})
        //         } else {
        //             setToastState({
        //                 open: true,
        //                 message: "AvailablePromoCode Update failed",
        //                 severity: "error"
        //             })
        //         }
        //     }).catch(err => {
        //         setToastState({
        //             open: true,
        //             message: "AvailablePromoCode Update failed",
        //             severity: "error"
        //         })
        //     })

        // }

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
    console.log('allOrders -->', data)
    return (
        <Container component="main" maxWidth="xl" sx={{py:4}}>
            <HeaderBox>
                            <Box>
                                <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                                    Order Management
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {data?.orders?.length || 0} order{data?.orders?.length !== 1 ? 's' : ''} total
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Typography variant="body1" color="text.secondary">
                                    Total Value: Approx ${data?.totalAmount || 0} 
                                </Typography>

                            </Box>
            </HeaderBox>

            <Box>

           
            {activePage === 'OrderPage' && <Box>
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
             </Box>

            {activePage === 'UpdateOrderForm' &&
                <Box>
                    <div className={classes.form}>
                        <Box sx={{ padding: '20px' }}><Typography component="h1" variant="h4">
                            {(activePage === 'UpdateOrderForm' && selectedRow) ? 'Update PromoCode Form' : 'PromoCode Form'}
                        </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
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
                                <Grid item xs={12}>
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
                                <Grid item xs={12}>
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
                                <Grid item xs={12}>
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

                                <Grid item xs={12}>
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

                                <Grid item xs={12}>
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

                                <Grid item xs={12}>
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

                                <Grid item xs={12}>
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
                </Box>

            }

            {/* {showDeleteModal && <Box
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
            </Box>} */}
        </Container>
    )
}
