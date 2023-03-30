import { useEffect, useState } from 'react';
import { Select, MenuItem, Button, List, ListItem, ListItemText, Table, Pagination, Typography, TableHead, TableBody, TableRow, TableCell, Card, Grid, Container, RadioGroup, FormControlLabel, Radio, Box, Input } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';

// const products = [
//     {
//         name: 'Hamburger',
//         price: 10000.99,
//         category: 'charcuterie'
//     },
//     {
//         name: 'Pizza',
//         price: 12000.99,
//         category: 'italien'

//     },
//     {
//         name: 'Salad',
//         price: 84511.99,
//         category: 'legume'

//     },
//     {
//         name: 'Fries',
//         price: 500.99,
//         category: 'fruits'

//     },
//     {
//         name: 'Taco',
//         price: 700.99,
//         category: 'mexicain'

//     },
//     {
//         name: 'Pasta',
//         price: 11000.99,
//         category: 'italien'

//     },
//     {
//         name: 'Sandwich',
//         price: 6785.99,
//         category: 'fast food'

//     },
//     {
//         name: 'Soup',
//         price: 4500.99,
//         category: 'Malagasy'

//     },
//     {
//         name: 'Steak',
//         price: 1500.99,
//         category: 'charcuterie'

//     },
//     {
//         name: 'Fish',
//         price: 9000.99,
//         category: 'Poisson'

//     },
//     {
//         name: 'Chicken',
//         price: 8000.99,
//         category: 'charcuterie'

//     },
// ];

function Invoice({ order }) {
    const [taxRate] = useState(0.1);
    const subtotal = order.reduce((total, product) => total + product.price, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return (
        <Card>
            <Typography variant='h4' sx={{ textAlign: "center" }}> Factures</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Produits</TableCell>
                        <TableCell align="right">Prix</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order.map((product) => (
                        <TableRow key={product.name}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell align="right">Ar {product.price.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableBody>
                    <TableRow>
                        <TableCell>Subtotal</TableCell>
                        <TableCell align="right">{subtotal.toFixed(2)} Ar</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax ({taxRate * 100}%)</TableCell>
                        <TableCell align="right">{tax.toFixed(2)} Ar</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align="right">{total.toFixed(2)} Ar</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
}

export default function OrderPage() {
    const [table, setTable] = useState('Table 1');
    const [clientName, setClientName] = useState('')
    const [order, setOrder] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [products, setProducts] = useState([]);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        setPage(1);
    }, [rowsPerPage]);

    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }, [])

    const handleTableChange = (event) => {
        setTable(event.target.value);
    };

    const handleAddToOrder = (product) => {
        setOrder([...order, product]);
    };

    const getTotalPrice = () => {
        return order.reduce((total, product) => total + product.price, 0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(1);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleConfirmOrder = () => {
        if (order.length === 0) {
            toast.error("Vous n'avez pas encore selectionner un menu")
            return
        }
        const totalPrices = getTotalPrice()
        fetch('http://localhost:4000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: faker.datatype.uuid(),
                tableNumber: table,
                clientName,
                order, 
                total: totalPrices,
                status: "paye"
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        toast.success('commande confirmer')
        setIsConfirmed(true);
        navigate('/dashboard/order')

        
    };

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return (
        <Container>
            <Toaster />
            <Typography variant='h3' sx={{ marginBottom: 4, textAlign: 'center' }}>
                Effectuer une commande
            </Typography>
            {
                products.length > 0 && <Grid container spacing={3}>
                    <Grid item lg={6} xs={12} md={6}>
                        <Card sx={{ padding: 5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
                                <Box>
                                    <Typography>Choisir une place</Typography>
                                    <Select sx={{ marginBottom: 2 }} value={table} onChange={handleTableChange} defaultValue='Table 1'>
                                        <MenuItem value="Table 1">Table 1</MenuItem>
                                        <MenuItem value="Table 2">Table 2</MenuItem>
                                        <MenuItem value="Table 3">Table 3</MenuItem>
                                        <MenuItem value="Terrase table 1">Terasse - Table 1</MenuItem>
                                    </Select>
                                </Box>
                                <Input placeholder='Nom du client' onChange={(e) => setClientName(e.target.value)} />
                            </Box>
                            <List>
                                {paginatedProducts.map((product) => (
                                    <ListItem key={product.name}>
                                        <ListItemText primary={`${product.name} - ${product.category}`} secondary={product.price.toFixed(2)} />
                                        <Button variant="contained" onClick={() => handleAddToOrder(product)}>
                                            Ajouter
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                            {products.length > rowsPerPage && (
                                <Pagination
                                    count={Math.ceil(products.length / rowsPerPage)}
                                    page={page}
                                    onChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            )}
                            <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange} sx={{
                                display: 'flex',
                                marginTop: 2

                            }}>
                                <FormControlLabel value="cash" control={<Radio />} label="Espèce" />
                                <FormControlLabel value="credit" control={<Radio />} label="Chèque" />
                            </RadioGroup>
                            <Typography sx={{ marginTop: 2, textAlign: 'right' }}>Total: {getTotalPrice().toFixed(2)} Ar</Typography>
                            {!isConfirmed && (
                                <Button variant="contained" onClick={handleConfirmOrder}>
                                    Confirmer la commande
                                </Button>
                            )}

                        </Card>
                    </Grid>
                    <Grid item lg={2} />
                    <Grid item lg={4}>
                        {order.length > 0 && <Invoice order={order} />}
                    </Grid>
                </Grid>
            }
        </Container>
    );
}

