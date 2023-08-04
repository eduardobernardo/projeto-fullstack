package com.idxcode.ecommerce.api.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_ordes")
public class Order {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @JoinColumn(name = "order_status")
  private String status;

  @ManyToOne
  @JoinColumn(name = "customer_id")
  private Customer customer;

  public Order(){}

  public Long getId() {
    return id;
  }
  public void setId(Long id) {
    this.id = id;
  }
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
  }
  public Customer getCustomer() {
    return customer;
  }
  public void setCustomer(Customer customer) {
    this.customer = customer;
  }

}

// CREATE TABLE IF NOT EXISTS tb_orders (
//   id SERIAL PRIMARY KEY,
//   customer_id integer NOT NULL,
//   order_status TEXT,
//   created_at DATE NOT NULL DEFAULT CURRENT_DATE,
//   CONSTRAINT fk_customer 
//     FOREIGN KEY(customer_id) 
//       REFERENCES tb_customers(id)
//       ON DELETE SET NULL
// );

// CREATE TABLE IF NOT EXISTS tb_order_items(
//   id SERIAL PRIMARY KEY,
//   quantity integer DEFAULT 1,
//   order_id serial REFERENCES tb_orders (id) ON DELETE SET NULL,
//   product_id serial REFERENCES tb_products (id) ON DELETE SET NULL,
//   created_at DATE NOT NULL DEFAULT CURRENT_DATE
// );