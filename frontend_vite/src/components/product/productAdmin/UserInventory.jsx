import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Box, Typography, Button, Stack, TextField, Modal } from '@mui/material'
import { AgGridReact } from "ag-grid-react";
import {  useDeleteProductMutation } from '../../../api/services/productApi';
import ProductForm from './ProductForm';
import Loader from '../../../utils/Loader';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { colors } from '../../../utils/Themes';

export const UserInventory = (props) => {
    const { categories, user, data, isFetching, refetch, toastState, setToastState } = props
    const gridRef = useRef(null)
    // Row Data: The data to be displayed.


    const [selectedRow, setSelectedRow] = useState(null)
    // const userPage = ['Listing', 'ProductForm', 'UpdateProductForm']
    const [deleteProduct, { isLoading: deleteIsLoading}] = useDeleteProductMutation()
    const [activePage, setActivePage] = useState('Listing')
   
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const changePage = (e) => {
        const { name } = e.target
        setActivePage(name)
    }

    const handleEdit = (data) => {
        setSelectedRow(data); // Set the selected row
        setActivePage('UpdateProductForm')
    }
    const deleteIntent = (data) => {
        setSelectedRow(data);
        setShowDeleteModal(true)
    }


    const handleDelete = () => {
        
        deleteProduct(selectedRow?._id).then((res) => {
            if(res.statusCode === 200){
                setToastState({
                    open: true,
                    message: 'Product Deleted Successfully',
                    severity: 'success'
                })
            }
            // console.log('res -->', res)
            if (res?.error) {
                setToastState({
                    open: true,
                    message: 'Product Deletion Failed',
                    severity: 'error'
                })
            }
        }
        ).catch((err) => {
            console.log('err -->', err)
                setToastState({
                    open: true,
                    message: 'Product Deletion Failed',
                    severity: 'error'
                })
        }
        )
        setActivePage('Listing')
        setSelectedRow(null)
        refetch()
        setShowDeleteModal(false)
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
            return (
                <Box style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px'
                }}>
                    <EditNoteOutlinedIcon
                        style={{
                            color: colors.primaryBlue.main,
                            border: 'none',
                            backgroundColor: colors.neutral.lightGray,
                            cursor: 'pointer',
                            padding: '5px',
                            borderRadius: '20px',
                        }}
                        onClick={() => handleEdit(props.data)}
                    />
                    <DeleteOutlineOutlinedIcon
                        style={{
                            color: colors.primaryRed.main,
                            border: 'none',
                            backgroundColor: colors.neutral.lightGray,
                            padding: '5px',
                            borderRadius: '20px',
                            cursor: 'pointer'
                        }} 
                        onClick={() => deleteIntent(props.data)}/>
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
    }, [toastState.open])

    const emptyState = {
        name: '',
        price: 0.0,
        description: '',
        ratings: 5.0,
        images: [{ public_id: '', url: '' }],
        category: '',
        seller: user?._id,
        stock: 0,
        createdAt: ''
    }

    return (
        <Box>
            
            {(!data?.product || isFetching || deleteIsLoading) ? <Box>
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
                            <Button 
                            name='ProductForm' 
                            disabled={activePage === 'ProductForm'} 
                            variant="outlined" 
                            onClick={(e) => changePageAndClear(e)}
                            sx={{
                                borderColor: colors.primaryBlue.main,
                                color: colors.primaryBlue.main,
                                '&:hover': {
                                    backgroundColor: colors.primaryBlue.light,
                                    color: colors.neutral.black
                                }

                            }}>Add Listing</Button>
                            <Button 
                            name='UpdateProductForm'
                             disabled={!selectedRow || activePage === 'UpdateProductForm'} 
                             variant="outlined" 
                             onClick={changePage}
                             sx={{
                                borderColor: colors.primaryGreen.dark,
                                color: colors.primaryGreen.dark,
                                '&:hover': {
                                    backgroundColor: colors.primaryGreen.main,
                                    color: colors.neutral.black
                                }
                            }}
                             >Edit Listing</Button>
                            {/* <Button disabled={!selectedRow} variant="outlined">Update Listing</Button> */}
                            <Button 
                            disabled={!selectedRow} variant="outlined" 
                             sx={{
                                borderColor: colors.primaryRed.main,
                                color: colors.primaryRed.main,
                                '&:hover': {
                                    backgroundColor: colors.primaryRed.light,
                                    color: colors.neutral.black
                                }
                            }}
                            onClick={() =>setShowDeleteModal(true)}>Delete Listing</Button>
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
                            <Button 
                            name='Listing' variant="outlined" 
                            sx={{
                                borderColor: colors.primaryGreen.dark,
                                color: colors.primaryGreen.dark,
                                '&:hover': {
                                    backgroundColor: colors.primaryGreen.light,
                                    color: colors.neutral.black
                                }
                            }}
                             onClick={(e) => changePageAndClear(e)}>Back to listing</Button>
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
                                setSelectedRow={setSelectedRow}
                                activePage={activePage}
                                setActivePage={setActivePage}
                                emptyState={emptyState}
                                refetch={refetch}
                                setToastState={setToastState}
                                gridRef={gridRef}
                            />
                        </Box>}
                    </Box>

                    {/* <Box>
                {activePage === 'UpdateProductForm' && <Box>
                    <UpdateProductForm categories={categories} user={user} />
                </Box>}
            </Box> */}
             {showDeleteModal && <Box
               >
                <Modal
                    open={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                    sx = {{
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
                        <Typography variant='h5' sx={{ mt: 2 }}>Are you sure you want to delete this product?</Typography>
                        <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '20px'
                        }}>
                        
                        <Button variant='outlined' color='error' onClick={() => setShowDeleteModal(false)}>No</Button>
                        <Button variant='outlined' color='primary' onClick={() => handleDelete(selectedRow)}>Yes</Button>
                        </Box>
                  
                    </Box>
                </Modal>
            </Box>}
                </Box>
            }
           
        </Box>
    )
}
