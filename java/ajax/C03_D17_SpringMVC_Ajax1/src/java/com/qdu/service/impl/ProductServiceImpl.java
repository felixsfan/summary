package com.qdu.service.impl;

import com.qdu.entity.Product;
import com.qdu.service.ProductService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Anna
 */
@Service
public class ProductServiceImpl implements ProductService{
    
    private static List<Product> productList;

    static {

        productList = new ArrayList();
        productList.add(new Product("P0001", "卫龙辣条", 2.5,"一种神奇的食品"));
        productList.add(new Product("P0002", "快乐肥宅水", 10.5,"宅人必备"));
        productList.add(new Product("P0003", "四级真题", 25.0,"这个东西未必靠得住"));
        productList.add(new Product("P0004", "苹果", 2.5,"每天一颗，身体健康"));
        productList.add(new Product("P0005", "榴莲", 3.6,"水果之王"));
        productList.add(new Product("P0006", "橘子", 4.7,"酸酸甜甜"));
        productList.add(new Product("P0007", "芒果", 5.8,"酸甜酸甜"));
        productList.add(new Product("P0008", "芒果1", 6.8,"酸甜酸甜1"));
        productList.add(new Product("P0009", "芒果2", 7.8,"酸甜酸甜2"));
        productList.add(new Product("P0010", "芒果3", 8.8,"酸甜酸甜3"));
    }

    @Override
    public Product getProductById(String productId) {

        Product s = null;
        for (int i = 0; i < productList.size(); i++) {
            if (productList.get(i).getProductId().equals(productId)) {
                s = productList.get(i);
            }
        }
        return s;
    }

    @Override
    public List getProductList() {
        return productList;
    }

    @Override
    public boolean addProduct(Product newProduct) {
        if (newProduct.getProductId().length() != 5) {
            return false;
        } else {
            productList.add(newProduct);
            return true;
        }
    }
    
    @Override
    public void deleteProduct(String productId) {
        productList.remove(getProductById(productId));
    }
}
