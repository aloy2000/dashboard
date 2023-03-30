import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';


import { useEffect, useState } from 'react';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '../components/iconify/Iconify';

// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [])

  return (
    <>
      <Helmet>
        <title> Produits </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
           Listes des menus
          </Typography>
          <Link style={{ textDecoration: "none", color: "white" }} to={'/dashboard/addProduct'}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Nouveau menu
            </Button>
          </Link>
        </Stack>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        {/* <ProductList products={PRODUCTS} /> */}
        <ProductList products={products} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
