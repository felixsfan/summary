package com.etoak.util;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class StandaloneRelease {
    
    private StandaloneRelease() {
        
    }
    
    // 最大连接数
    private static final int MAX_TOTAL = 5;
    
    // 最大空闲数
    private static final int MAX_IDLE = 5;
    
    // 最小空闲数
    private static final int MIN_IDLE = 1;
    
    // 配置连接池(最大连接数、空闲数..)
    private static JedisPoolConfig poolConfig;
    
    // 连接池
    private static JedisPool jedisPool;
    static {
        poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(MAX_TOTAL);
        poolConfig.setMaxIdle(MAX_IDLE);
        poolConfig.setMinIdle(MIN_IDLE);
        createJedisPool();
    }
    
    // 创建JedisPool
    private static void createJedisPool() {
        // JedisPool(poolConfig, ip, host)
        jedisPool = new JedisPool(poolConfig, "192.168.179.128", 6379);
    }
    
    // 将当前线程与Jedis实例绑定
    private static ThreadLocal<Jedis> local//
        = new ThreadLocal<>();
    public static Jedis getJedis() {
        Jedis jedis = local.get(); // 获取与当前线程绑定的jedis
        if (jedis == null) {
            jedis = jedisPool.getResource();
            local.set(jedis); // 将jedis与当前线程进行绑定
        }
        return jedis;
    }
    public static void close(Jedis jedis) {
        if (jedis != null) {
            local.remove();
            jedis.close();
        }
    }
    
}
