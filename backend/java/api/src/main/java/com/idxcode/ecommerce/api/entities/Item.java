package com.idxcode.ecommerce.api.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_order_items")
public class Item {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Integer quantity;

  @ManyToOne
  @JoinColumn(name = "order_id")
  private Order order;

  @ManyToOne
  @JoinColumn(name = "product_id")
  private Product product;

  public Item(){}

  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public Integer getQuantity() {
    return quantity;
  }
  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }
  public Order getOrder() {
    return order;
  }
  public void setOrder(Order order) {
    this.order = order;
  }
  public Product getProduct() {
    return product;
  }
  public void setProduct(Product product) {
    this.product = product;
  }

}

// CREATE TABLE IF NOT EXISTS tb_order_items(
//   id SERIAL PRIMARY KEY,
//   quantity integer DEFAULT 1,
//   order_id serial REFERENCES tb_orders (id) ON DELETE SET NULL,
//   product_id serial REFERENCES tb_products (id) ON DELETE SET NULL,
//   created_at DATE NOT NULL DEFAULT CURRENT_DATE
// );
