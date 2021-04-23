package com.etoak;

import java.io.IOException;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import redis.clients.jedis.JedisCluster;

public class ClusterTest {
    
    public static void main(String[] args) throws IOException {
        ClassPathXmlApplicationContext applicationContext
        = new ClassPathXmlApplicationContext("cluster.xml");
        
        JedisCluster cluster = applicationContext.getBean("cluster", JedisCluster.class);
        
        String name = cluster.get("name");
        System.out.println(name);
        
        cluster.close();
        applicationContext.close();
        
    }
}
