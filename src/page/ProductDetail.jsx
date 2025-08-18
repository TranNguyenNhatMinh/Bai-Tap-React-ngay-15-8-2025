import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => {
        alert("Product not found");
        navigate("/");
      });
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Button variant="outlined" onClick={() => navigate("/")}>
        ← Back to list
      </Button>

      <Card sx={{ mt: 3, p: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain", mb: 3 }}
        />
        <CardContent>
          <Typography variant="h4" fontWeight="bold">
            {product.title}
          </Typography>
          <Typography variant="h6" color="green" sx={{ my: 1 }}>
            ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Category: {product.category}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
