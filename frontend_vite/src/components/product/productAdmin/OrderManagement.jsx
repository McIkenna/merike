import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    TextField,
    Container,
    Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    // Divider,
    IconButton,
   
} from '@mui/material';
import { useAllOrdersQuery, useUpdateOrderMutation } from '../../../api/services/orderApi'
import {
    Close,
    CancelOutlined,
    Edit,
    SaveOutlined} from '@mui/icons-material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from "ag-grid-react";
import { styled } from '@mui/material/styles';
import { Divider } from '../../../utils/Divider';
import ModernLoader from '../../../utils/ModernLoader';



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

    const { data, refetch } = useAllOrdersQuery();
    const [updateOrder, {isLoading: isUpdating}] = useUpdateOrderMutation();

    const [selectedRow, setSelectedRow] = useState(null)
    // const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showFormDialog, setShowFormDialog] = useState(false);
    const gridRef = useRef(null);
    const [formData, setFormData] = useState({});
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

     const handleOpenEditDialog = (order) => {
        setFormData(order);
        setSelectedRow(order);
        setShowFormDialog(true);
    };
    // const deleteIntent = (data) => {
    //     setSelectedRow(data);
    //     setShowDeleteModal(true)
    // }

    console.log('formaData', formData)
    console.log('selectedRow -->', selectedRow)

   


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
                   

                    <Edit style={{
                            color: 'primary.main',
                            cursor: 'pointer',
                            borderRadius: '20px',
                        }}
                        fontSize="medium"
                        onClick={() =>handleOpenEditDialog(props.data)}/>
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
                    } catch {
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

    const handleCloseDialog = () => {
        setShowFormDialog(false);
        setFormData({});
        setSelectedRow(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
                const result = await updateOrder(formData).unwrap();
                if (result.success) {
                    setToastState({
                        open: true,
                        message: "Order updated successfully",
                        severity: "success"
                    });
                }
            refetch();
            handleCloseDialog();
        } catch {
            setToastState({
                open: true,
                message: `Order 'update' failed`,
                severity: "error"
            });
        }
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
        <Box>

            {
                !data?.orders?.length ? <ModernLoader variant='list' /> :
        <Box>
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

           
           <Box>
                {/* <div className="ag-theme-quartz" style={{ height: '80vh' }}> */}
                <div className="grid-wrapper">
                <div class="ag-theme-alpine ag-grid-container">
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
                </div>

            </Box>
             </Box>
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
                        Edit Order
                    </Typography>
                    <IconButton onClick={handleCloseDialog} size="small">
                        <Close />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <form onSubmit={handleSubmit}>
                    <DialogContent sx={{ pt: 3 }}>
                        <Grid container spacing={2}>
                                {/* <Grid item size={{xs:12}}>
                                    <TextField
                                        name="shippingInfo"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Shipping Address"
                                        value={formData?.shippingInfo}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                </Grid>
                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="paymentInfo"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Payment Info"
                                        value={formData?.paymentInfo}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                </Grid> */}
                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="orderStatus"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Order Status"
                                        value={formData?.orderStatus}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                    />
                                </Grid>


                                <Grid item size={{xs:12}}>
                                    <TextField
                                        name="deliveredAt"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="date"
                                        label="Delivery date"
                                        value={formatDateForInput(formData?.deliveredAt)}
                                        onChange={handleChange}
                                        InputLabelProps={{
                                            shrink: true, // Keeps label above the field
                                        }}
                                        // inputProps={{
                                        //     min: new Date().toISOString().split('T')[0], // Today's date as minimum
                                        // }}
                                    />
                                </Grid>
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
                            disabled={isUpdating}
                            sx={{ textTransform: 'none' }}
                        >
                            {isUpdating
                                ? 'Saving...'
                                : 'Update Order'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            
        </Box>
         }
        </Box>
    )
}
