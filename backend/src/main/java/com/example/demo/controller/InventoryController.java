package com.example.demo.controller;

import javaatimeoLocalDateTime
import javaautiliList
import java.util.Optional;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import comsexamplegdemosentitygInventoryework.web.bind.annotation.DeleteMapping;
import comsexamplegdemo.repository.InventoryRepositoryk.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Inventory;
import com.example.demo.repository.InventoryRepository;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class InventoryController {
    
    @Autowired
    private InventoryRepository inventoryRepository;
    
    // Get all inventory items
    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory() {
        try {
            List<Inventory> inventory = inventoryRepository.findAll();
            return ResponseEntity.ok(inventory);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    // Get inventory by ID
    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable Long id) {
        Optional<Inventory> inventory = inventoryRepository.findById(id);
        return inventory.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // Get inventory by product ID
    @GetMapping("/product/{productId}")
    public ResponseEntity<Inventory> getInventoryByProductId(@PathVariable Long productId) {
        Optional<Inventory> inventory = inventoryRepository.findByProductId(productId);
        return inventory.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // Get low stock items
    @GetMapping("/low-stock")
    public ResponseEntity<List<Inventory>> getLowStockItems() {
        try {
            List<Inventory> allInventory = inventoryRepository.findAll();
            List<Inventory> lowStock = allInventory.stream()
                    .filter(inv -> inv.getQuantity() <= inv.getReorderLevel())
                    .toList();
            return ResponseEntity.ok(lowStock);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    // Create new inventory item
    @PostMapping
    public ResponseEntity<?> createInventory(@RequestBody Inventory inventory) {
        try {
            if (inventory.getProductId() == null) {
                return ResponseEntity.badRequest().body("Product ID is required");
            }
            if (inventory.getProductName() == null || inventory.getProductName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Product name is required");
            }
            if (inventory.getQuantity() == null || inventory.getQuantity() < 0) {
                return ResponseEntity.badRequest().body("Valid quantity is required");
            }
            if (inventory.getUnitPrice() == null || inventory.getUnitPrice() <= 0) {
                return ResponseEntity.badRequest().body("Valid unit price is required");
            }
            
            inventory.setLastUpdated(LocalDateTime.now());
            Inventory savedInventory = inventoryRepository.save(inventory);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedInventory);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating inventory: " + e.getMessage());
        }
    }
    
    // Update inventory
    @PutMapping("/{id}")
    public ResponseEntity<?> updateInventory(@PathVariable Long id, @RequestBody Inventory inventoryDetails) {
        try {
            Optional<Inventory> inventoryOptional = inventoryRepository.findById(id);
            
            if (inventoryOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Inventory inventory = inventoryOptional.get();
            
            if (inventoryDetails.getQuantity() != null) {
                inventory.setQuantity(inventoryDetails.getQuantity());
            }
            if (inventoryDetails.getReorderLevel() != null) {
                inventory.setReorderLevel(inventoryDetails.getReorderLevel());
            }
            if (inventoryDetails.getUnitPrice() != null) {
                inventory.setUnitPrice(inventoryDetails.getUnitPrice());
            }
            if (inventoryDetails.getLocation() != null) {
                inventory.setLocation(inventoryDetails.getLocation());
            }
            
            inventory.setLastUpdated(LocalDateTime.now());
            Inventory updatedInventory = inventoryRepository.save(inventory);
            
            return ResponseEntity.ok(updatedInventory);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating inventory: " + e.getMessage());
        }
    }
    
    // Delete inventory
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInventory(@PathVariable Long id) {
        try {
            if (!inventoryRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            
            inventoryRepository.deleteById(id);
            return ResponseEntity.ok("Inventory deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting inventory: " + e.getMessage());
        }
    }
}
