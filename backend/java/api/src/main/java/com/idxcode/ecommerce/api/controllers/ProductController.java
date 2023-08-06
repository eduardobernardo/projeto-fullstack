package com.idxcode.ecommerce.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idxcode.ecommerce.api.entities.Product;
import com.idxcode.ecommerce.api.repositories.ProductRepository;

@RestController
@RequestMapping(value = "/products")
public class ProductController {
  
  @Autowired
  private ProductRepository repository;

  @GetMapping
  ResponseEntity<List<Product>> findAll(){
    List<Product> result = repository.findAll();

    HttpHeaders responHeaders = new HttpHeaders();
    Integer totalProducts = result.size();
    responHeaders.set("x-total", totalProducts.toString());

    return ResponseEntity.ok()
            .headers(responHeaders)
            .body(result);
  }

  @GetMapping(value = "/{id}")
  public Product findById(@PathVariable Long id){
    Product result = repository.findById(id).get();
    return result;
  }
  @GetMapping(value = "/name/{name}")
  public Product findByEmail(@PathVariable String name){
    Product result = repository.findByName(name).get(0);
    return result;
  }

  @PostMapping
  public Product create(@RequestBody Product Product){
    Product result = repository.save(Product);
    return result;
  }

}
