package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ErrorResponse;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = productRepository.findAll();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        Optional<Product> productData = productRepository.findById(id);
        return productData.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get products by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable("category") String category) {
        try {
            List<Product> products = productRepository.findByCategory(category);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get products by brand
    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<Product>> getProductsByBrand(@PathVariable("brand") String brand) {
        try {
            List<Product> products = productRepository.findByBrand(brand);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Search products by name
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String name) {
        try {
            List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Create new product
    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try {
            // Validation
            if (product.getName() == null || product.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Product name is required"));
            }
            if (product.getBrand() == null || product.getBrand().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Brand is required"));
            }
            if (product.getPrice() == null || product.getPrice() <= 0) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Valid price is required"));
            }
            if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Category is required"));
            }

            Product newProduct = productRepository.save(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(newProduct);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to save product: " + e.getMessage()));
        }
    }

    // Update product
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Long id, @RequestBody Product product) {
        try {
            Optional<Product> productData = productRepository.findById(id);

            if (productData.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Product not found with id: " + id));
            }

            // Validation
            if (product.getName() == null || product.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Product name is required"));
            }
            if (product.getBrand() == null || product.getBrand().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Brand is required"));
            }
            if (product.getPrice() == null || product.getPrice() <= 0) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Valid price is required"));
            }
            if (product.getCategory() == null || product.getCategory().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Category is required"));
            }

            Product existingProduct = productData.get();
            existingProduct.setName(product.getName());
            existingProduct.setBrand(product.getBrand());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setOriginalPrice(product.getOriginalPrice());
            existingProduct.setCategory(product.getCategory());
            existingProduct.setShortDesc(product.getShortDesc());
            existingProduct.setFeatures(product.getFeatures());
            existingProduct.setImageUrl(product.getImageUrl());

            return ResponseEntity.ok(productRepository.save(existingProduct));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to update product: " + e.getMessage()));
        }
    }

    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        try {
            productRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Delete all products
    @DeleteMapping
    public ResponseEntity<Void> deleteAllProducts() {
        try {
            productRepository.deleteAll();
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}