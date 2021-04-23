package com.etoak;

import java.util.Set;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.Tuple;

public class StandaloneTest {
    
    public static void main(String[] args) {
        ClassPathXmlApplicationContext ioc//
            = new ClassPathXmlApplicationContext("spring.xml");
        
        JedisPool jedisPool //
            = ioc.getBean("jedisPool", JedisPool.class);
        
        Jedis jedis = jedisPool.getResource();
        heroRank(jedis);
    }
    
    public static void heroRank(Jedis jedis) {
        
        String[] hero = new String[] {//
            "貂蝉", "李白", "吕布", "姜子牙", "杨戬", //
            "典韦", "诸葛亮", "司马懿", "孙尚香", "百里玄策"};
        
        String key = "wz:hero";
        
        // 随机给英雄添加score
        for (int i = 0; i < hero.length; i++) {
            int score = (int)(Math.random() * 1000);
            jedis.zadd(key, score, hero[i]);
        }
        
        // 1. 显示英雄列表(score降序)
        Set<Tuple> tuples //
            = jedis.zrevrangeWithScores(key, 0, -1);
        for (Tuple tuple : tuples) {
            String member = tuple.getElement();
            double score = tuple.getScore();
            System.out.println(member + ":" + score);
        }
        System.out.println("=============");
        // 2. 显示top3
        Set<Tuple> tuples2 //
            = jedis.zrevrangeWithScores(key, 0, 2);
        for (Tuple tuple : tuples2) {
            String member = tuple.getElement();
            double score = tuple.getScore();
            System.out.println(member + ":" + score);
        }
        System.out.println("=============");
        // 3. 显示200 - 800数值的英雄列表
        Set<Tuple> tuples3 = //
            jedis.zrevrangeByScoreWithScores(key, 800D, 200D);
        for (Tuple tuple : tuples3) {
            String member = tuple.getElement();
            double score = tuple.getScore();
            System.out.println(member + ":" + score);
        }
        
        jedis.close();
    }
    
}
