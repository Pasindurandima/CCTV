package com.example.demo.controller;

import java.time.LocalDateTime;
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
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.repository.OrderRepository;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // Get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> orders = orderRepository.findAll();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable("id") Long id) {
        Optional<Order> orderData = orderRepository.findById(id);
        return orderData.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create new order
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest) {
        try {
            // Create order entity
            Order order = new Order();
            order.setCustomerName(orderRequest.getCustomerName());
            order.setCustomerEmail(orderRequest.getCustomerEmail());
            order.setCustomerPhone(orderRequest.getCustomerPhone());
            order.setShippingAddress(orderRequest.getShippingAddress());
            order.setNotes(orderRequest.getNotes());
            order.setTotalAmount(orderRequest.getTotalAmount());
            order.setPaymentMethod(orderRequest.getPaymentMethod());
            order.setOrderDate(LocalDateTime.now());
            order.setStatus(orderRequest.getStatus() != null ? orderRequest.getStatus() : "PENDING");
            
            // Calculate product count from items
            int totalQuantity = 0;
            if (orderRequest.getItems() != null && !orderRequest.getItems().isEmpty()) {
                for (OrderRequest.OrderItemDTO itemDTO : orderRequest.getItems()) {
                    OrderItem item = new OrderItem();
                    item.setProductId(itemDTO.getProductId());
                    item.setProductName(itemDTO.getProductName());
                    item.setQuantity(itemDTO.getQuantity());
                    item.setPrice(itemDTO.getPrice());
                    order.addItem(item);
                    totalQuantity += itemDTO.getQuantity();
                }
            }
            order.setProductCount(totalQuantity);
            
            Order savedOrder = orderRepository.save(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update order status
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable("id") Long id, @RequestBody String status) {
        Optional<Order> orderData = orderRepository.findById(id);
        
        if (orderData.isPresent()) {
            Order order = orderData.get();
            order.setStatus(status);
            Order updatedOrder = orderRepository.save(order);
            return ResponseEntity.ok(updatedOrder);
        }
        
        return ResponseEntity.notFound().build();
    }

    // Update entire order
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable("id") Long id, @RequestBody java.util.Map<String, Object> updates) {
        Optional<Order> orderData = orderRepository.findById(id);
        
        if (orderData.isPresent()) {
            Order order = orderData.get();
            
            // Update only the fields that are provided
            if (updates.containsKey("status")) {
                order.setStatus((String) updates.get("status"));
            }
            if (updates.containsKey("customerName")) {
                order.setCustomerName((String) updates.get("customerName"));
            }
            if (updates.containsKey("customerEmail")) {
                order.setCustomerEmail((String) updates.get("customerEmail"));
            }
            if (updates.containsKey("customerPhone")) {
                order.setCustomerPhone((String) updates.get("customerPhone"));
            }
            if (updates.containsKey("shippingAddress")) {
                order.setShippingAddress((String) updates.get("shippingAddress"));
            }
            if (updates.containsKey("productCount")) {
                order.setProductCount((Integer) updates.get("productCount"));
            }
            if (updates.containsKey("totalAmount")) {
                Object amount = updates.get("totalAmount");
                if (amount instanceof Integer) {
                    order.setTotalAmount(((Integer) amount).doubleValue());
                } else if (amount instanceof Double) {
                    order.setTotalAmount((Double) amount);
                }
            }
            if (updates.containsKey("paymentMethod")) {
                order.setPaymentMethod((String) updates.get("paymentMethod"));
            }
            if (updates.containsKey("notes")) {
                order.setNotes((String) updates.get("notes"));
            }
            
            Order updatedOrder = orderRepository.save(order);
            return ResponseEntity.ok(updatedOrder);
        }
        
        return ResponseEntity.notFound().build();
    }

    // Delete order
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable("id") Long id) {
        try {
            orderRepository.deleteById(id);
            return ResponseEntity.ok(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get orders by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable("status") String status) {
        try {
            // Assuming you add this method to the repository
            List<Order> orders = orderRepository.findAll().stream()
                    .filter(order -> order.getStatus().equalsIgnoreCase(status))
                    .toList();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
