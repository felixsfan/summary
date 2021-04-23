package com.etoak;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.redis.core.StringRedisTemplate;

public class ClusterTest {
    
    public static void main(String[] args) {
        ClassPathXmlApplicationContext ioc//
            = new ClassPathXmlApplicationContext("cluster.xml");
        
        StringRedisTemplate stringTemplate//
            = ioc.getBean("stringTemplate", StringRedisTemplate.class);
        
        String name = stringTemplate.opsForValue().get("name");
        System.out.println(name);
        
    }
}
