
package com.qdu.entity;

public class Product {
    
    private String productId;
    private String productName;
    private Double productPrice;
    private String productDesc;

    public Product() {
    }

    public Product(String productId, String productName, Double productPrice, String productDesc) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDesc = productDesc;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductDesc() {
        return productDesc;
    }

    public void setProductDesc(String productDesc) {
        this.productDesc = productDesc;
    }
    
}
