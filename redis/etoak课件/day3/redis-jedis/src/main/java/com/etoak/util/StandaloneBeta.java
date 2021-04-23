package com.etoak.util;

import java.util.concurrent.ConcurrentHashMap;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

public class StandaloneBeta {
    
    private StandaloneBeta() {
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
    
    // 使用ConcurrentHashMap绑定当前线程和Jedis实例
    // key:当前线程，value:Jedis实例
    private static ConcurrentHashMap<Thread, Jedis> map //
        = new ConcurrentHashMap<>();
    
    public static Jedis getJedis() {
        // 1.根据当前线程获取jedis实例
        Jedis jedis = map.get(Thread.currentThread());
        
        // 2. 判断jedis是否为空
        // 3. 如果是null
        // 3.1 那么使用jedisPool.getResource()获取新的Jedis实例，
        // 3.2 并且将这个实例与当前线程绑定
        if (jedis == null) {
            jedis = jedisPool.getResource();
            map.put(Thread.currentThread(), jedis);
        }
        return jedis;
    }
    
    public static void close(Jedis jedis) {
        // 解绑当前线程和Jedis实例，并将Jedis放回连接池
        if (jedis != null) {
            map.remove(Thread.currentThread());
            jedis.close();
        }
    }
    
}
