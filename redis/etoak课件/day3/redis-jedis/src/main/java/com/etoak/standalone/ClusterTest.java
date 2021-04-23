package com.etoak.standalone;

import java.io.IOException;

import com.etoak.util.ClusterUtil;

import redis.clients.jedis.JedisCluster;

public class ClusterTest {
    public static void main(String[] args) throws IOException {
        JedisCluster cluster = ClusterUtil.getCluster();
        cluster.set("user:id:1", "1");
        String id = cluster.get("user:id:1");
        System.out.println(id);
        cluster.close();
    }
}
