package com.etoak.util;

import java.util.HashSet;
import java.util.Set;

import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisCluster;
import redis.clients.jedis.JedisPoolConfig;

public class ClusterUtil {
    
    private static final int MAX_TOTAL = 5;
    
    private static final int MAX_IDLE = 5;
    
    private static final int MIN_IDLE = 1;
    
    private static JedisPoolConfig poolConfig //
        = new JedisPoolConfig();
    
    private static Set<HostAndPort> nodes //
        = new HashSet<>();
    static {
        poolConfig.setMaxTotal(MAX_TOTAL);
        poolConfig.setMaxIdle(MAX_IDLE);
        poolConfig.setMinIdle(MIN_IDLE);
        for (int port = 6001; port <= 6006; port++) {
            nodes.add(new HostAndPort("192.168.179.128", port));
        }
    }
    
    // 获取JedisCluster实例
    public static JedisCluster getCluster() {
        return new JedisCluster(nodes, poolConfig);
    }
    
}
