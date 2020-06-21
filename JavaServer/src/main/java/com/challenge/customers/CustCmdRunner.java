package com.challenge.customers;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CustCmdRunner implements CommandLineRunner {

    private final CustomerRepository repository;

    public CustCmdRunner(CustomerRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        //repository.findAll().forEach(System.out::println);
    }
}