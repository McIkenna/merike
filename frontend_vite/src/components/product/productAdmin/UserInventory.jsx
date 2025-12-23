import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Box, Typography, Button, Stack, TextField, Modal, IconButton } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddIcon from '@mui/icons-material/Add'
import { useDeleteProductMutation } from '../../../api/services/productApi'
import ProductForm from './ProductForm'
import { colors } from '../../../utils/Themes'

// Separate component for action buttons in grid
const ActionButtons = ({ data, onEdit, onDelete }) => (
  <Stack direction="row" spacing={1} alignItems="center" height="100%">
    <IconButton
      size="small"
      onClick={() => onEdit(data)}
      sx={{
        color: colors.primaryBlue.main,
        bgcolor: colors.neutral.lightGray,
        '&:hover': { bgcolor: colors.primaryBlue.light }
      }}
    >
      <EditNoteOutlinedIcon fontSize="small" />
    </IconButton>
    <IconButton
      size="small"
      onClick={() => onDelete(data)}
      sx={{
        color: colors.primaryRed.main,
        bgcolor: colors.neutral.lightGray,
        '&:hover': { bgcolor: colors.primaryRed.light }
      }}
    >
      <DeleteOutlineOutlinedIcon fontSize="small" />
    </IconButton>
  </Stack>
)

// Separate component for product image
const ProductImage = ({ url }) => (
  <Box display="flex" alignItems="center" height="100%">
    <img
      src={url}
      alt="Product"
      style={{
        width: 50,
        height: 50,
        objectFit: 'cover',
        borderRadius: 8
      }}
    />
  </Box>
)

// Generic cell renderer
const CellRenderer = ({ field, value, data, onEdit, onDelete }) => {
  if (field === 'images' && value?.[0]?.url) {
    return <ProductImage url={value[0].url} />
  }
  
  if (field === '_id') {
    return <ActionButtons data={data} onEdit={onEdit} onDelete={onDelete} />
  }

  const displayValue = typeof value === 'object' ? JSON.stringify(value) : value

  return (
    <Box display="flex" alignItems="center" height="100%">
      <Typography variant="body2" noWrap>
        {displayValue}
      </Typography>
    </Box>
  )
}

// Delete confirmation modal
const DeleteModal = ({ open, onClose, onConfirm, productName }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        minWidth: 400
      }}
    >
      <Typography variant="h6" gutterBottom>
        Delete Product
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Are you sure you want to delete "{productName}"? This action cannot be undone.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </Stack>
    </Box>
  </Modal>
)

// Main component
export const UserInventory = ({
  categories,
  user,
  data,
  refetch,
  toastState,
  setToastState
}) => {
  const gridRef = useRef(null)
  const [selectedRow, setSelectedRow] = useState(null)
  const [view, setView] = useState('list') // 'list', 'create', 'edit'
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteProduct] = useDeleteProductMutation()

  // Handle product deletion
  const handleDelete = async () => {
    try {
      const response = await deleteProduct(selectedRow?._id)
      
      const success = response.statusCode === 200
      setToastState({
        open: true,
        message: success ? 'Product deleted successfully' : 'Product deletion failed',
        severity: success ? 'success' : 'error'
      })

      if (success) {
        refetch()
        setView('list')
        setSelectedRow(null)
      }
    } catch {
      setToastState({
        open: true,
        message: 'Product deletion failed',
        severity: 'error'
      })
    } finally {
      setShowDeleteModal(false)
    }
  }

  // Handle view changes
  const handleViewChange = (newView) => {
    setView(newView)
    setSelectedRow(null)
    gridRef.current?.api?.deselectAll()
  }

  // Grid configuration
  const rowData = useMemo(
    () => data?.products?.filter(product => product) || [],
    [data]
  )

  const columnDefs = useMemo(() => {
    if (!data?.products?.length) return []

    return Object.keys(data.products[0])
      .filter(field => field !== 'reviews')
      .map(field => ({
        headerName: field.charAt(0).toUpperCase() + field.slice(1),
        field,
        cellRenderer: (params) => (
          <CellRenderer
            {...params}
            onEdit={(data) => {
              setSelectedRow(data)
              setView('edit')
            }}
            onDelete={(data) => {
              setSelectedRow(data)
              setShowDeleteModal(true)
            }}
          />
        )
      }))
  }, [data])

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true
    }),
    []
  )

  const rowSelection = useMemo(() => ({ mode: 'singleRow' }), [])

  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api?.getSelectedRows()
    setSelectedRow(selectedNodes?.length > 0 ? selectedNodes[0] : null)
  }, [])

  const onFilterTextBoxChanged = useCallback(() => {
    const filterValue = document.getElementById('filter-text-box')?.value || ''
    gridRef.current?.api?.setGridOption('quickFilterText', filterValue)
  }, [])

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastState.open) return

    const timer = setTimeout(() => {
      setToastState({ open: false, message: '', severity: '' })
    }, 3000)

    return () => clearTimeout(timer)
  }, [toastState.open, setToastState])

  const emptyProduct = {
    name: '',
    price: 0,
    description: '',
    ratings: 5,
    images: [{ public_id: '', url: '' }],
    category: '',
    seller: user?._id,
    stock: 0,
    createdAt: ''
  }

  const onCloseModal = () => {
        setShowDeleteModal(false)
        setSelectedRow(null)
        gridRef.current?.api?.deselectAll()
        setView('list')
    }

  return (
    <Box>
      {/* Action Bar */}
      <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant={view === 'create' ? 'contained' : 'outlined'}
            startIcon={<AddIcon />}
            disabled={selectedRow || view === 'create'}
            onClick={() => handleViewChange('create')}
            sx={{ textTransform: 'none', color: 'primary.dark', borderColor: 'primary.dark'}}
          >
            Add Product
          </Button>
          <Button
            variant={view === 'edit' ? 'contained' : 'outlined'}
            disabled={!selectedRow || view === 'edit'}
            onClick={() => setView('edit')}
            sx={{ textTransform: 'none', color: 'success.main', borderColor: 'success.main'}}
          >
            Edit Product
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={!selectedRow}
            onClick={() => setShowDeleteModal(true)}
            sx={{ textTransform: 'none' }}
          >
            Delete Product
          </Button>
        </Stack>

        {view === 'list' ? (
          <TextField
            id="filter-text-box"
            size="small"
            placeholder="Search products..."
            variant="outlined"
            onChange={onFilterTextBoxChanged}
            sx={{ width: 250 }}
          />
        ) : (
          <Button
            variant="text"
            onClick={() => handleViewChange('list')}
            sx={{ textTransform: 'none' }}
          >
            ← Back to List
          </Button>
        )}
      </Box>

      {/* Content Area */}
      {view === 'list' ? (
        <Box sx={{ height: '80vh', px: 2 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowHeight={60}
            rowSelection={rowSelection}
            onSelectionChanged={onSelectionChanged}
            suppressRowClickSelection
          />
        </Box>
      ) : (
        <Box sx={{ px: 2 }}>
          <ProductForm
            categories={categories}
            user={user}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            activePage={view === 'create' ? 'ProductForm' : 'UpdateProductForm'}
            setActivePage={setView}
            emptyState={emptyProduct}
            refetch={refetch}
            setToastState={setToastState}
            gridRef={gridRef}
          />
        </Box>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={showDeleteModal}
        onClose={onCloseModal}
        onConfirm={handleDelete}
        productName={selectedRow?.name || 'this product'}
      />
    </Box>
  )
}