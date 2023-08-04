package com.idxcode.ecommerce.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.idxcode.ecommerce.api.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
  
}
