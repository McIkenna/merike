import React, {useState, useMemo, useRef, useCallback} from 'react'
import { Box } from '@mui/material'
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css"; // Core AG Grid styles
// import "ag-grid-community/styles/ag-theme-quartz.css";
import { useGetProductBySellerQuery } from '../../../api/services/productApi';

export const UserInventory = (props) => {
        const {user} = props
        // Row Data: The data to be displayed.
        const {data, isError, isSuccess, isFetching, isLoading} = useGetProductBySellerQuery(user?._id)

        console.log('seller data -->', data)

        const columnData = useMemo(() => {
            if(!data || !data?.product || data.product?.length === 0){
                return []
            }
            const headers = Object.keys(data?.product[0]).map((header) => ({
                headerName: header,
                field: header


            }))
            return headers

        }, [data])

        const rowData = useMemo(() => { return data?.product ? data?.product : []}, [data])
       
        const defaultColDef = {
            flex: 1,
            minWidth: 150,
            filter: false,
            floatingFilter: true,
          };
    
    return (
        <Box>
            <div className="ag-theme-quartz" style={{ height: '100vh' }}>
        <AgGridReact
            rowData={rowData}
            columnDefs={columnData}
            defaultColDef={defaultColDef}
        />
    </div>
        </Box>
    )
}
