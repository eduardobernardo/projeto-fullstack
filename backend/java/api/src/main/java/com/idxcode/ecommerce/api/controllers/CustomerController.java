package com.idxcode.ecommerce.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idxcode.ecommerce.api.entities.Customer;
import com.idxcode.ecommerce.api.repositories.CustomerRepository;

@RestController
@RequestMapping(value = "/customers")
public class CustomerController {
  
  @Autowired
  private CustomerRepository repository;

  @GetMapping
  public List<Customer> findAll(){
    List<Customer> result = repository.findAll();
    return result;
  }

  @GetMapping(value = "/{id}")
  public Customer findById(@PathVariable Long id){
    Customer result = repository.findById(id).get();
    return result;
  }
  @GetMapping(value = "/email/{email}")
  public Customer findByEmail(@PathVariable String email){
    Customer result = repository.findByEmail(email).get(0);
    return result;
  }

  @PostMapping
  public Customer create(@RequestBody Customer customer){
    Customer result = repository.save(customer);
    return result;
  }

}
