package com.etoak.standalone;

import com.etoak.util.StandaloneAlpha;
import com.etoak.util.StandaloneBeta;
import com.etoak.util.StandaloneRelease;

import redis.clients.jedis.Jedis;

public class StandaloneTest {
    
    public static void main(String[] args) {
        // 官方示例
        // Jedis jedis = new Jedis("192.168.179.128");
        // jedis.set("key1", "v1");
        // String key1 = jedis.get("key1");
        // System.out.println(key1);
        // jedis.close();
        testStandaloneRelease();
    }
    
    private static void testStandaloneRelease() {
        Jedis jedis = StandaloneRelease.getJedis();
        // Jedis jedis2 = StandaloneRelease.getJedis();
        // Jedis jedis3 = StandaloneRelease.getJedis();
        // Jedis jedis4 = StandaloneRelease.getJedis();
        // Jedis jedis5 = StandaloneRelease.getJedis();
        //
        // System.out.println(jedis);
        // System.out.println(jedis2);
        // System.out.println(jedis3);
        // System.out.println(jedis4);
        // System.out.println(jedis5);
        
        jedis.set("name", "etoak");
        
        Long strlen = jedis.strlen("name");
        System.out.println("len:" + strlen);
        StandaloneRelease.close(jedis);
        
    }
    
    public static void testStandaloneBeta() {
        Jedis jedis = StandaloneBeta.getJedis();
        Jedis jedis2 = StandaloneBeta.getJedis();
        Jedis jedis3 = StandaloneBeta.getJedis();
        Jedis jedis4 = StandaloneBeta.getJedis();
        Jedis jedis5 = StandaloneBeta.getJedis();
        
        System.out.println(jedis);
        System.out.println(jedis2);
        System.out.println(jedis3);
        System.out.println(jedis4);
        System.out.println(jedis5);
        
    }
    
    public static void testStandaloneAlpha() {
        
        // Jedis jedis = StandaloneAlpha.getJedis();
        // jedis.mset("k1", "v1", "k2", "2");
        // Long v2 = jedis.incr("k2");
        // System.out.println(v2);
        // StandaloneAlpha.closeJedis(jedis);
        
        Jedis jedis = StandaloneAlpha.getJedis();
        Jedis jedis2 = StandaloneAlpha.getJedis();
        Jedis jedis3 = StandaloneAlpha.getJedis();
        Jedis jedis4 = StandaloneAlpha.getJedis();
        Jedis jedis5 = StandaloneAlpha.getJedis();
        
        System.out.println(jedis);
        System.out.println("2-" + jedis2);
        System.out.println(jedis3);
        System.out.println(jedis4);
        System.out.println(jedis5);
        
        jedis2.close();
        
        Jedis jedis6 = StandaloneAlpha.getJedis();
        System.out.println("6-" + jedis6);
        
        System.out.println(Thread.currentThread().getName());
    }
    
}
