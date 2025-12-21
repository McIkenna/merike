import {
    Box,
    Typography,
    Card,
    ImageList, ImageListItem, ImageListItemBar, ListSubheader,
    Link
} from '@mui/material';
const RecentlyBought = ({ recentBoughtProducts, handleSelect }) => {
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
                    background: 'none'
                }}
            >

                <ImageList sx={{ width: '100%', height: 450 }} cols={2}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader sx={{ background: 'none', fontSize: '1.4em', fontWeight: 'bold' }}>Recently Bought</ListSubheader>
                    </ImageListItem>
                    {recentBoughtProducts?.map((item) => (
                        <Link href={`/product/${item?._id}`} sx={{ textDecoration: 'none', cursor: 'pointer' }} key={item?.id}>
                            <ImageListItem key={item?.id}
                                sx={{
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                    }
                                }}>
                                <img
                                    srcSet={`${item?.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item?.image}?w=164&h=164&fit=crop&auto=format`}
                                    alt={item?.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar title={item?.name} subtitle={<span>price: ${item.price}</span>} />
                            </ImageListItem>
                        </Link>
                    ))}
                </ImageList>
                <Box
                    onClick={() => handleSelect('recently-bought')}>
                    <Typography
                        sx={{
                            mt: 1,
                            fontSize: '0.8em',
                            color: 'primary.main',
                            cursor: 'pointer', textAlign: 'center',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Show More
                    </Typography>
                </Box>

            </Card>
        </>
    );

};

export default RecentlyBought;