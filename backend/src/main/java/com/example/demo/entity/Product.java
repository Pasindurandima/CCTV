package com.example.demo.entity;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String brand;
    
    @Column(nullable = false)
    private Double price;
    
    private Double originalPrice;
    
    @Column(nullable = false)
    private String category;
    
    @Column(length = 500)
    private String shortDesc;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_features", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "feature", length = 500)
    private List<String> features;
    
    @Lob
    @Column(columnDefinition = "MEDIUMTEXT")
    private String imageUrl;
    
    // Constructors
    public Product() {
    }
    
    public Product(String name, String brand, Double price, Double originalPrice, 
                   String category, String shortDesc, List<String> features, String imageUrl) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.originalPrice = originalPrice;
        this.category = category;
        this.shortDesc = shortDesc;
        this.features = features;
        this.imageUrl = imageUrl;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getBrand() {
        return brand;
    }
    
    public void setBrand(String brand) {
        this.brand = brand;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public Double getOriginalPrice() {
        return originalPrice;
    }
    
    public void setOriginalPrice(Double originalPrice) {
        this.originalPrice = originalPrice;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getShortDesc() {
        return shortDesc;
    }
    
    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }
    
    public List<String> getFeatures() {
        return features;
    }
    
    public void setFeatures(List<String> features) {
        this.features = features;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
