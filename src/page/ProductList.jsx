import { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
    const [newProduct, setNewProduct] = useState({ // Thông tin sản phẩm mới
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
    });
    const [products, setProducts] = useState([]); // Danh sách sản phẩm


    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then(({ data }) => setProducts(data))
            .catch((err) => {
                console.error(err);
                alert("Failed to fetch data from API");
                setProducts([]);
            });
    }, []);

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleAdd = () => {
        const { title, price, description, image, category } = newProduct;

        if (!title || !price || !description || !image || !category) {
            alert("Please fill all fields!");
            return;
        }

        const newItem = {
            ...newProduct,
            id: Date.now(),
        };

        setProducts([newItem, ...products]);
        setNewProduct({ title: "", price: "", description: "", image: "", category: "" });
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Product Management
            </Typography>

            {/* Form thêm sản phẩm */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {/* ... như cũ, giữ nguyên phần form ... */}
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        label="Title"
                        fullWidth
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Image URL"
                        fullWidth
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        label="Category"
                        fullWidth
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={2}
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        onClick={handleAdd}
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
                    >
                        Add Product
                    </Button>
                </Grid>
            </Grid>

            {/* Danh sách sản phẩm */}
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                            }}
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.title}
                                sx={{
                                    height: 200,
                                    objectFit: "contain",
                                    backgroundColor: "#fff",
                                    p: 2,
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {product.description.substring(0, 60)}...
                                </Typography>
                                <Typography variant="h6" sx={{ color: "green", mb: 1 }}>
                                    ${product.price}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {product.category}
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation(); // tránh click vào card
                                    handleDelete(product.id);
                                }}
                                sx={{ m: 2 }}
                            >
                                Delete
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
