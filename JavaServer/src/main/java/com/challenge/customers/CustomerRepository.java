package com.challenge.customers;

import java.util.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

@Repository
interface CustomerRepository extends JpaRepository<Customer, Long> {

  @Query(value = "SELECT * FROM customer WHERE (id % 2) <> 0", nativeQuery = true)
  List<Customer> findByOddIds();

}