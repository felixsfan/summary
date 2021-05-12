package com.qdu.service;

import com.qdu.entity.Product;
import java.util.List;

public interface ProductService {

    /**
     * 根据产品编号获取一个产品的所有信息
     *
     * @param productId 字符串表示的产品编号
     * @return 一个Product对象，包含产品信息
     */
    Product getProductById(String productId);

    /**
     * 获取所有产品的列表
     *
     * @return 一个列表，包含所有产品的信息
     */
    List getProductList();

    /**
     * 添加一个新产品
     *
     * @param newProduct 一个包含新产品信息的Product对象
     * @return 一个boolean值，表示是否添加成功
     */
    boolean addProduct(Product newProduct);

    /**
     * 根据产品编号删除一个产品
     *
     * @param productId 字符串表示的产品编号
     */
    void deleteProduct(String productId);
}
