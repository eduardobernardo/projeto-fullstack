package com.idxcode.ecommerce.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.idxcode.ecommerce.api.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
  
}
