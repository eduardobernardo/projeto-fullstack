package com.idxcode.ecommerce.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.idxcode.ecommerce.api.entities.Item;

public interface ItemRepository extends JpaRepository<Item, Long>{
  
}
