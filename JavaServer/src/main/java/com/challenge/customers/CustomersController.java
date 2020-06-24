package com.challenge.customers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.*;

@RestController
@RequestMapping("/")// ===> http://localhost:8080/
//@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CustomersController {

    private CustomerRepository repository;

    public CustomersController(CustomerRepository repository) {
        this.repository = repository;
    }

    /*****GETALL****/
    //curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X GET "http://localhost:8080/customers"
    @GetMapping(path = "customers", produces = "application/JSON")
    public ResponseEntity<List<Customer>> getAll() {
        
        // return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
        return new ResponseEntity<>(repository.findByOddIds(), HttpStatus.OK);
        
    }

    /*****GETONEBYID******/
    //curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X GET "http://localhost:8080/customers/68"
    @GetMapping(path = "customers/{id}", produces = "application/JSON")
    public ResponseEntity<List<Customer>> getOneByID(@PathVariable("id") Long id) {
        
        List<Customer> resL = new LinkedList<>();
        Optional<Customer> opt= repository.findById(id);
        if(opt.isPresent()){
            resL.add(opt.get());
            return new ResponseEntity<>(resL,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(resL, HttpStatus.NOT_FOUND);
        
    }

    /******CREATE********/
    /*
    curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data '{"id":2024,"email":"jhami6dddff54lton0@a.gov","first_name":"Joshuaaa","la
st_name":"Hamilton","ip":"135.75.95.238","latitude":-27.634171,"longitude":-52.273891,"created_at":"2015-01-21 03:20:11","updated_at":null}' "http://localhost:8080
/customers"
    */
    @PostMapping(path = "customers", produces = "application/JSON")
    public ResponseEntity<Long> create(@RequestBody Customer cust) {

        return new ResponseEntity<>(
            (repository.save(new Customer(cust,true,true))).getId(),
            HttpStatus.CREATED
        );

    }

    /******UPDATE*********/
    /*
    curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X PUT --data '{"id":2024,"email":"jhami6dddff54lton0@a.gov","first_name":"Joshuaaa","las
t_name":"Hamiltosssssn","ip":"135.75.95.238","latitude":-27.634171,"longitude":-52.273891,"created_at":"2015-01-21 03:20:11","updated_at":null}' "http://localhost:8
080/customers"
    */
    @PutMapping(path = "customers", produces = "application/JSON")
    public ResponseEntity<Long> update(@RequestBody Customer cust) {

        Customer custRes = new Customer(cust,cust.getId(),false,true);
        if(repository.existsById(cust.getId())){

            custRes = repository.save(custRes);
            return new ResponseEntity<>(
                custRes.getId(),
                HttpStatus.CREATED
            );
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
    }

    /*******DELETE***********/
    //curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X DELETE "http://localhost:8080/customers/68"
    @DeleteMapping(path = "customers/{id}", produces = "application/JSON")
    public ResponseEntity<Long> delete(@PathVariable("id") Long id) {

        if(repository.existsById(id)){

            repository.deleteById(id);

            return new ResponseEntity<>(
                id,
                HttpStatus.OK
            );
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
    }

}