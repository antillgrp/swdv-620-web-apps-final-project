package com.challenge.customers;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email ="";
    private String first_name ="";
    private String last_name ="";
    private String ip ="";
    private float latitude;
    private float longitude;
    private String created_at = "";
    private String updated_at = "";

    public Customer() {}

    public Customer(String email) {
        this.email = email;
    }

    public Customer(Customer copy, boolean creating, boolean updating){
        this.email = copy.getEmail();
        this.first_name = copy.getFirst_name();
        this.last_name = copy.getLast_name();
        this.ip = copy.getIp();
        this.latitude = copy.getLatitude();
        this.longitude = copy.getLongitude();
        this.created_at =   creating
                            ?
                                (new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new java.util.Date())
                            :
                                copy.created_at
                            ;
        this.updated_at =   updating
                            ?
                                (new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new java.util.Date())
                            :
                                copy.updated_at
                            ;
    }

    public Customer(Customer copy, Long copyId, boolean creating, boolean updating) {
        this(copy,creating,updating);
        this.id = Long.valueOf(copyId.longValue());
    }

    @Override
    public String toString() {
        return "(ID=" + id + ", EMAIL=" + email +")";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public String getCreated_at() {
        return created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(String updated_at) {
        this.updated_at = updated_at;
    }
}