package com.idxcode.ecommerce.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.idxcode.ecommerce.api.entities.Customer;
import java.util.List;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
  List<Customer> findByEmail(String email);
}
