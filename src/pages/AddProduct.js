import { faker } from '@faker-js/faker'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddProduct() {

    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState()
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const handleAddProduct = (e) => {
        e.preventDefault()
        fetch('http://localhost:4000/products', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: faker.datatype.uuid(),
                name: productName,
                price: Number(price),
                category
            })
        })

        navigate('/dashboard/products')

    }

    return (
        <div>
            <Typography variant='h3' textAlign={"center"}>Ajouter un produits</Typography>
            <form onSubmit={handleAddProduct}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: "wrap", justifyContent: 'center', }}>
                    <TextField
                        label="Nom du produit"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Prix du produit"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        margin="normal"
                        type='number'
                        required
                    />
                    <TextField
                        label="Categorie du produit"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" disabled={!productName || !price}>
                        Add Product
                    </Button>
                </Box>
            </form>
        </div>
    )
}
