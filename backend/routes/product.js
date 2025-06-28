const express = require('express');
const router = express.Router();

// Mock product data for demonstration
const mockProducts = [
  {
    id: '1',
    name: 'Victorian Armchair',
    price: 899,
    description: 'Elegant Victorian-style armchair with intricate carved details',
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
    thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    category: 'chairs',
    quantity: 10,
    featured: true,
    ratings: [],
    totalRating: 5
  },
  {
    id: '2',
    name: 'Victorian Dining Table',
    price: 1299,
    description: 'Handcrafted Victorian dining table perfect for elegant gatherings',
    images: ['https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg'],
    thumbnail: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
    category: 'tables',
    quantity: 5,
    featured: true,
    ratings: [],
    totalRating: 5
  },
  {
    id: '3',
    name: 'Victorian Bedroom Set',
    price: 2199,
    description: 'Complete Victorian bedroom furniture set with ornate details',
    images: ['https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg'],
    thumbnail: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg',
    category: 'bedroom',
    quantity: 3,
    featured: true,
    ratings: [],
    totalRating: 5
  }
];

// Get all products
router.get('/', (req, res) => {
  try {
    res.json(mockProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get featured products
router.get('/featured', (req, res) => {
  try {
    const featuredProducts = mockProducts.filter(product => product.featured);
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured products', error: error.message });
  }
});

// Get product by ID
router.get('/:id', (req, res) => {
  try {
    const product = mockProducts.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// Get products by category
router.get('/category/:categoryName', (req, res) => {
  try {
    const categoryProducts = mockProducts.filter(
      product => product.category.toLowerCase() === req.params.categoryName.toLowerCase()
    );
    res.json(categoryProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error: error.message });
  }
});

// Get related products
router.get('/related/:id', (req, res) => {
  try {
    const product = mockProducts.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Return products from the same category, excluding the current product
    const relatedProducts = mockProducts.filter(
      p => p.category === product.category && p.id !== req.params.id
    );
    
    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching related products', error: error.message });
  }
});

module.exports = router;