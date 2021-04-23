package com.etoak;

import java.io.StringReader;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.redis.core.StringRedisTemplate;

public class StandaloneTest {
    
    public static void main(String[] args) {
        ClassPathXmlApplicationContext ioc//
            = new ClassPathXmlApplicationContext("spring.xml");
        
        StringRedisTemplate stringTemplate//
            = ioc.getBean("stringTemplate", StringRedisTemplate.class);
        
        // string类型
        stringTemplate.opsForValue().set("name", "etoak");
        // list类型
        stringTemplate.opsForList();
        // hash类型
        stringTemplate.opsForHash();
        // set类型
        stringTemplate.opsForSet();
        // zset类型
        stringTemplate.opsForZSet();
        
    }
    
}
