import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Box, Typography, Button, Stack, TextField} from '@mui/material'
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css"; // Core AG Grid styles
// import "ag-grid-community/styles/ag-theme-quartz.css";
import { useGetProductBySellerQuery, useUpdateProductMutation } from '../../../api/services/productApi';
import { blue, grey } from '@mui/material/colors';
import ProductForm from './ProductForm';
import Loader from '../../../utils/Loader';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const UserInventory = (props) => {
    const { categories, user, data, isFetching , refetch} = props
    const gridRef = useRef(null)
    // Row Data: The data to be displayed.

    const [selectedRow, setSelectedRow] = useState(null)
    // const userPage = ['Listing', 'ProductForm', 'UpdateProductForm']
    const [activePage, setActivePage] = useState('Listing')
     const [toastState, setToastState] = useState({
            open: false,
            message: '',
            severity: ''
        });
    const changePage = (e) => {
        const { name } = e.target
        // console.log('e -->', e.target)
        setActivePage(name)
    }

    // console.log('seller data -->', data)
    const CustomButtonComponent = (props) => {
        const field = props.colDef.field
        const value = props.value

        if (field === 'images') {
            const mainImage = value[0].url
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
            return (<Button style={{
                color: blue['700']
            }}>Edit</Button>)

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
        // return <button onClick={() => window.alert("clicked")}>Push Me!</button>;
    };

    const columnData = useMemo(() => {
        if (!data || !data?.product || data.product?.length === 0) {
            return []
        }
        const headers = Object.keys(data?.product[0]).map((header) => (
            {

                headerName: header,
                field: header,




            }
        )
        )
        return headers

    }, [data])

    const rowData = useMemo(() => { return data?.product ? data?.product : [] }, [data])

    const defaultColDef = {
        flex: 1,
        minWidth: 150,
        cellRenderer: CustomButtonComponent
    };

    const rowSelection = useMemo(() => {
        return {
            mode: 'singleRow',
        };
    }, []);

    // const getSelectValue = (id) => {
    //     return document.querySelector(id)?.value ?? "singleRow";
    // };

    // const checkRowSelected = useMemo(() => {
    //     if(!gridRef.current.api){
    //         return null
    //     }

    //     return selectedNodes
    // }, [gridRef?.current.api]);
    const handleListingUpdate = () => {

        console.log('selectedRow -->', selectedRow)
        const reqBody = {
            ...selectedRow,
            updateAt: Date.now()
        }
        console.log('reqBody -->', reqBody)

    }

    const onSelectedRow = useCallback(() => {
        const selectedNodes = gridRef.current.api.getSelectedRows();
        setSelectedRow(selectedNodes.length > 0 ? selectedNodes[0] : null);

    }, []);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            document.getElementById("filter-text-box").value,
        );
    }, []);

    const changePageAndClear = (e) => {
        changePage(e)
        setSelectedRow(null)
        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.deselectAll(); // Corrected to deselectAll
        }
    }

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
    }, [toastState])

    const emptyState = {
        name: '',
        price: 0.0,
        description: '',
        ratings: 5.0,
        images: [{ public_id: '', url: '' }],
        category: '',
        seller: user?._id,
        stock: 0,
        createdAt: Date.now()
    }

    return (
        <Box>
            <Box>
                <Snackbar open={toastState.open} autoHideDuration={1200} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert
                        severity={toastState.severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {toastState.message}
                    </Alert>
                </Snackbar>
            </Box>
            {(!data?.product || isFetching) ? <Box>
                <div style={{ height: '80vh' }}>
                    <Loader />
                </div>
            </Box>
           :
           <Box>
            <Box sx={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Stack spacing={2} direction="row">
                    <Button name='ProductForm' variant="outlined" onClick={(e) => changePageAndClear(e)}>Add Listing</Button>
                    <Button name='UpdateProductForm' disabled={!selectedRow} variant="outlined" onClick={changePage}>Edit Listing</Button>
                    {/* <Button disabled={!selectedRow} variant="outlined">Update Listing</Button> */}
                    <Button disabled={!selectedRow} variant="outlined" color="error">Delete Listing</Button>
                </Stack>
                {activePage === 'Listing' ? <Box>
                    <TextField
                        id="filter-text-box"
                        label="Search Filter"
                        variant="outlined"
                        type="text"
                        placeholder="Quick Filter..."
                        onChange={onFilterTextBoxChanged} />
                </Box>
                    :
                    <Button name='Listing' variant="outlined" color="secondary" onClick={(e) => changePageAndClear(e)}>Back to listing</Button>
                }

            </Box>
            {activePage === 'Listing' && <Box>
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
            <Box>
                {(activePage === 'ProductForm' || activePage === 'UpdateProductForm') && <Box>
                    <ProductForm 
                        categories={categories} 
                        user={user} 
                        selectedRow={selectedRow} 
                        activePage={activePage} 
                        setActivePage={setActivePage} 
                        emptyState={emptyState} 
                        refetch={refetch}
                        setToastState={setToastState}
                        />
                </Box>}
            </Box>

            {/* <Box>
                {activePage === 'UpdateProductForm' && <Box>
                    <UpdateProductForm categories={categories} user={user} />
                </Box>}
            </Box> */}
    </Box>
}
        </Box>
    )
}
