package com.etoak.util;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class StandaloneAlpha {
    
    private StandaloneAlpha() {
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
    
    // 获取jedis-jedisPool.getRresource();
    public static Jedis getJedis() {
        return jedisPool.getResource();
    }
    
    // 关闭jedis资源，将jedis实例返回给jedisPool
    public static void closeJedis(Jedis jedis) {
        if (jedis != null) {
            // Map.remove(Thread.currentThread());
            jedis.close();
        }
    }
    
}
