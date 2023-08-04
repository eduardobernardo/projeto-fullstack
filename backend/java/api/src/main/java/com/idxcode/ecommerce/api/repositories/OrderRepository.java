package com.idxcode.ecommerce.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.idxcode.ecommerce.api.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
  
}
