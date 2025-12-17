import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Chip,
    IconButton,
    Stack,
    ImageList, ImageListItem, ImageListItemBar, ListSubheader
} from '@mui/material';
const CartInspired = ({ cartInspiredProducts, handleSelect }) => {
    return (
        <>
            <Card
            sx={{
                   p: 2,
          borderRadius: 2,
          justifyContent: 'center',
          alignItems: 'center',
          height: 500,
         cursor: 'pointer',
         border: '2px solid',
         borderColor: 'background.paper',
         background: 'none',
                }}
                onClick={() => handleSelect('cart-inspired')}>

                <ImageList sx={{ width: '100%', height: 450 }} cols={2}  >
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader sx={{ background: 'none', fontSize: '1.4em', fontWeight: 'bold', color: 'text.primary' }}>Cart Inspired Products</ListSubheader>
                    </ImageListItem>
                    {cartInspiredProducts?.map((item) => (
                        <ImageListItem key={item?.id}
                        sx={{
                                borderRadius: 2,
                                overflow: 'hidden'
                            }}>
                            <img
                                srcSet={`${item?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item?.image}?w=164&h=164&fit=crop&auto=format`}
                                alt={item?.name}
                                loading="lazy"
                            />
                            {/* <ImageListItemBar position="top" title={item?.name} /> */}
                        </ImageListItem>
                    ))}
                </ImageList>
            </Card>
        </>
    );

};

export default CartInspired;