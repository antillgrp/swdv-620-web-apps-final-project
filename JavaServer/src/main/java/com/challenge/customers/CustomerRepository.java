package com.challenge.customers;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
interface CustomerRepository extends JpaRepository<Customer, Long> {}