# **Redis教程**

# **1.** **NoSQL(Not Only SQL)数据库介绍**

![img](/Users/fanqingwei/Desktop/学习/redis/images\wps1.jpg) 

全文搜索：Apache Lucene

​          Solr

​          ElasticSearch（基于Lucene开发的）

# **2.** **Redis介绍**

Redis的作者，叫SalvatoreSanfilippo，来自意大利的西西里岛，现在居住在卡塔尼亚。目前供职于**Pivotal**公司。他使用的网名是antirez。

2012年08月02日

Redis2.4.16 小更新版本 NoSQL；

2012年08月31日 

Redis2.4.17 小更新版本 NoSQL；

2012年11月7日Redis 2.6.3 发布，高性能K/V服务器；

2013年4月30日Redis2.6.13 发布，高性能K/V服务器；

2013年11月25日，Redis2.8.1发布；

2015年2月，Redis3.0.0发布。

## **2.1.** **Redis概述**

**Redis是一个开放源代码（BSD许可）的内存数据结构存储，可以用作数据库、****缓存****和消息代理；支持字符串、哈希、列表、集合、带范围查询的排序集合等数据结构。Redis具有内置的复制、Lua脚本、LRU收回、事务和不同级别的磁盘上持久性，并通过Redis Sentinel和Redis集群的自动分区提供高可用性。**

**源码地址：https://github.com/antirez/redis**

**官方网站：https://redis.io**

## **2.2.** **Redis的特点、优势** 

### **2.2.1.** **Redis的特点**

**1.内存数据库，速度快；支持数据的****持久化****，可以将内存中的数据保存在磁盘中，重启的时候可以再次加载进行使用。**

**2.Redis不仅仅支持简单的key-value类型的数据，同时还提供list，set，zset，hash等数据结构的存储。（Redis5新增了Stream）**

**3.Redis支持数据的备份，即主从模式的数据备份，数据可扩展性高。**

**4.支持事务。**

### **2.2.2.** **Redis的优势** 

**性能极高**：Redis读的速度是110000次/s，写的速度是81000次/s。

**丰富的数据类型**：String、List、Hash、Set 及Sorted Set数据类型。 (Stream)

**原子操作**：Redis的所有操作都是原子性的。

**丰富的特性**：Redis可用于缓存，消息队列、排行榜、点赞等。

### 2.2.3 为啥在项目里要用缓存？

用缓存，主要是两个用途：高性能 和 高并发

#### 高性能

假设有这么个场景，有一个操作，一个请求过来，然后执行N条SQL语句，然后半天才查询出一个结果，耗时600ms，但是这个结果可能接下来几个小时就不会变了，或者变了也可以不用立即反馈给用户，这个时候就可以使用缓存了。

我们可以把花费了600ms查询出来的数据，丢进缓存中，一个key对应一个value，下次再有人来查询的时候，就不走mysql了，而是直接从缓存中读取，通过key直接查询出value，耗时2ms，性能提升300倍。这就是所谓的高性能。

就是把一些复杂操作耗时查询出来的结果，如果确定后面不怎么变化了，但是马上还有很多读请求，这个时候，就可以直接把结果存放在缓存中，后面直接读取缓存即可。

<img src="/Users/fanqingwei/Desktop/学习/分布式/images/image-20200421122211630.png" alt="image-20200421122211630" style="zoom:50%;" />

就第一次从数据库中获取，后面直接从缓存中获取即可，性能提升很高

#### 高并发

MySQL这么重的数据库，并不适合于高并发，虽然可以使用，但是天然支持的就不好，因为MySQL的单机撑到2000QPS的时候，就容易报警了

<img src="/Users/fanqingwei/Desktop/学习/分布式/images/image-20200421124116765.png" alt="image-20200421124116765" style="zoom:50%;" />

##### 为什么缓存可以支持高并发

首先因为缓存是走内存的，内存天然就可以支持高并发，但是数据库因为是存储在硬盘上的，因此不要超过2000QPS

##### 场景

所以要是有一个系统，高峰期过来每秒的请求有1W个，要是MySQL单机的话，一定会宕机的，这个时候就只能用上缓存，把很多数据放到缓存中，这样请求过来了之后，就直接从缓存中获取数据，而不查询数据库。缓存的功能很简单，说白了就是一个 key - value式数据库，单机支撑的并发量轻松超过一秒几万 到 十多万，单机的承载量是mysql单机的几十倍。

#### 缓存带来的不良后果

场景的缓存问题有三个

- 缓存与数据库双写不一致的问题
- 缓存穿透
- 缓存雪崩
- 缓存并发竞争

# **3.** **Centos7安装redis-5.0.4**

## **3.1.** **简要介绍**

**l** **安装步骤，我分享的有道云笔记** 

<http://note.youdao.com/noteshare?id=60ab3c5071f1acab4d90d32e5ee5f130&sub=A486484D71BB454C8A6F0CBA0B9E2A5C>

**l** **目前官网的最新稳定版本是****5.0.5****版本，Redis官网不提供windows的版本。** 

l Window64位下载地址：<https://github.com/MicrosoftArchive/redis/releases>。

l 目前最新的windows版本是2016年的3.2.100版本。

![img](/Users/fanqingwei/Desktop/学习/redis/images\wps2.jpg) 

## **3.2.** **单机版安装步骤**

### **3.2.1.** **上传文件到服务器**

**[root@localhost ~]#** **tar -zxvf redis-5.0.3.tar.gz -C /opt**

**[root@localhost redis-5.0.3]# cd /opt/redis-5.0.3** 

**[root@localhost redis-5.0.3]# make**

**报错：**

**compilation terminated. make[1]: \**\* [adlist.o] Error 1 make[1]: Leaving directory `/usr/local/redis-5.0-rc3/src' make: \**\* [all] Error 2**

### **3.2.2.** **安装Development Tools**

**[root@localhost redis-5.0.3]# yum groupinstall 'Development Tools'**

### **3.2.3.** 安装Redis依赖包

**[root@localhost redis-5.0.3]# cd /opt/redis-5.0.3/deps**

**[root@localhost deps]# make hiredis lua jemalloc linenoise**

**安装结果：**	

**MAKE linenoise**

**cd linenoise && make**

**make[1]: Entering directory `/opt/redis-5.0.3/deps/linenoise'**

**cc -Wall -Os -g -c linenoise.c**

**make[1]: Leaving directory `/opt/redis-5.0.3/deps/linenoise'**

### **3.2.4.** **继续安装Redis**

**[root@localhost deps]# cd ../**

**[root@localhost redis-5.0.3]# make**

**安装结果**

**INSTALL redis-check-rdb**

**INSTALL redis-check-aof**

**Hint: It's a good idea to run 'make test' ;)**

**make[1]: Leaving directory `/opt/redis-5.0.3/src'**

### **3.2.5.** **测试Redis安装**

**[root@localhost redis-5.0.3]# cd src**

**[root@localhost src]# make install**

**测试结果**

**Hint: It's a good idea to run 'make test' ;)**

**INSTALL install**

**INSTALL install**

**INSTALL install**

**INSTALL install**

**INSTALL install**

### **3.2.6.** **编辑redis.conf**

**[root@localhost redis-5.0.3] vim /opt/redis/redis.conf**

  **bind 127.0.0.1 # 注释掉**

  **protected-mode no # 关闭保护模式**

  **daemonize yes # 守护进程模式开启**

  **dir ./rdb/ # 默认是./，表示在redis-5.0.3目录下生成dump.rdb,用于持久化数据**

### **3.2.7.** **启动服务**

**[root@localhost redis-5.0.3]/opt/redis-5.0.3/src/redis-server /opt/redis-5.0.3/redis.conf**

### **3.2.8.** **启动客户端**

**[root@localhost redis-5.0.3]/opt/redis/src/redis-cli**

### **3.2.9.** **关闭redis-server**

**[root@localhost redis-5.0.3]/opt/redis-5.0.3/src/redis-cli shutdown**

## **3.3.** **Redis的多数据库特点**

**Redis默认支持16个数据库，以一个从0开始的递增数字命名，可以通过redis.conf文件中的参数databases来修改默认数据库个数。客户端连接Redis服务后会自动选择0号数据库，可以通过SELECT命令更换数据库，例如选择15号数据库：** 

**说明：不支持自定义数据库名称。**

​      **不支持为每个数据库设置访问密码。** 

​      多个数据库之间不是完全隔离的，FLUSHALL命令会清空所有数据库的数据。 

​      多数据库不适用存储不同应用的数据。

​	  **Redis集群不支持多数据库**；

# **4.** **Redis5.0新增特性**

**1.新增stream数据类型。**

2.新的Redis模块API：Timers和Cluster API。 

3.RDB现在存储LFU(最近最少使用)和LRU(最近不经长使用)信息。

**4.集群管理器从Ruby移植到了C。**

5.新的sorted set命令：ZPOPMIN/MAX和阻塞变种。 

6.升级了主动碎片整理。 

7.增强HyperLogLog实现 

8.完善内存报告。 

9.许多带有子命令的命令有了一个HELP子命令。 

10.客户经常连接和断开连接时性能更好。

11.修复了错误和改进。

12.Jemalloc内存分配器升级到了5.1。 

# **5.** **Redis的数据类型**

#### 底层数据结构

Redis构建了一个结构体redisObject，包含类型、编码、指向底层实现数据结构的指针；
底层数据结构有简单动态字符串、字典、双端链表、整数集合、跳跃表和字典、压缩链表

```
1.在Redis的五大数据对象中，string对象是唯一个可以被其他四种数据对象作为内嵌对象的；
2.列表（list）、哈希（hash）、集合（set）、有序集合（zset）底层实现都用到了压缩链表结构
3.skiplist编码的有序集合对象底层实现是跳跃表和字典两种及原因：
跳跃表优点是有序，但是查询分值复杂度为O(logn)；
字典查询分值复杂度为O(1) ，但是无序，所以结合连个结构的优点进行实现。
虽然采用两个结构但是集合的元素成员和分值是共享的，两种结构通过指针指向同一地址，不会浪费内存。

```

zset底层实现方式:
       zset的编码有ziplist和skiplist两种。
       底层分别使用ziplist（压缩链表）和skiplist（跳表和字典）实现。当zset满足以下两个条件的时候，使用ziplist：保存的元素少于128个,保存的所有元素大小都小于64字节,否则skiplist.
                            

```java
          
底层数据结构实现： https://www.cnblogs.com/MouseDong/p/11134039.html
数据类型：  https://stor.51cto.com/art/201908/601696.htm
5.1 压缩列表ziplist（https://blog.csdn.net/qiezikuaichuan/article/details/46574301）
5.2 跳表：https://baijiahao.baidu.com/s?id=1633338040568845450&wfr=spider&for=pc
                   多级链表，范围查询，有序
5.3 hashtable字典 https://www.jianshu.com/p/bfecf4ccf28b
```
## **5.1.** **string类型**

String类型是redis中最基本的类型，它是包含了很多种类型的特殊类型，并且是二进制的安全的，可以存储序列化的对象、图片的二进制存储、一个简单的字符串、数值等。一个字符串类型键允许存储的数据最大容量是512MB。 

## **5.2.** **hash类型**

hash是一个String类型的field和value的映射表。hash特别适合用于存储对象。相对于将对象序列化存储为String类型，将一个对象存储在hash类型中会占用更少的内存，且可以方便的操作对象。 

## **5.3.** **list类型**

list是一个链表结构，类似JDK的LinkedList、Queue，主要功能是push、pop、获取一个范围的所有值等等，key可以认为链表的名称。list类型的每个子元素都是string类型的**双向链表**。我们可以通过push、pop操作从链表的头部或者尾部添加删除元素，这样list既可以作为栈，又可以作为队列。

## **5.4.** **set类型**

set是集合，它是string类型的无序不可重复集合。Set是通过hash table实现的，添加、删除和查找的复杂度都是o(1)。对set我们可以取并集、交集、差集。通过set的这些操作我们可以实现好友推荐功能。 

**命令举例：** 

**sadd：**添加元素 

**smembers**：获取集合中所有元素 

**sismember：**判断元素是否在集合中 

**srem**：删除元素 

**scard**：获取元素个数，相当于count

**spop**：随机返回删除的元素 

**sdiff**：差集，返回在第一个set里面而不在后面任何一个set里面的项(谁在前以谁为标准) 

**sdiffstore**：差集并保留结果 

​    sdiffstore destination key [key ...]

**sinter**：交集，返回多个set里面都有的项 

**sinterstore**：交集并保留结果 

**sunion**：并集 

**sunionstore**：并集并保留结果 

**smove**：移动元素到另一个集合 

## **5.5.** **zset类型**

zset有序集合，类似SortedSet. 

**zadd**：添加元素；格式：**zadd key score value [score value]**

**zrange：**获取索引区间内的元素；**格式：zrange key start stop [withscores]**

**zrangebyscore ：**获取分数区间内的元素；

​    **格式：zrangebyscore key minscore maxscore [withscore] [limit offset count]，**默认是包含端点值的，如果加上"("表示不包含，后面还可以加上limit来限制。 

**zrem ：**删除元素，**格式是：zrem key member**，member值可以是多个

## **5.6.** **stream类型-Reids5.0新增类型** 

Redis5.0大版本新增类型

本质是抽象日志

# 6.Redis的过期策略

### Redis中的数据为什么会丢失

之前有同学问过我，说我们生产环境的redis怎么经常会丢掉一些数据？写进去了，过一会儿可能就没了。我的天，同学，你问这个问题就说明redis你就没用对啊。redis是缓存，你给当存储了是吧？

啥叫缓存？用内存当缓存。内存是无限的吗，内存是很宝贵而且是有限的，磁盘是廉价而且是大量的。可能一台机器就几十个G的内存，但是可以有几个T的硬盘空间。redis主要是基于内存来进行高性能、高并发的读写操作的。

那既然内存是有限的，比如redis就只能用10个G，你要是往里面写了20个G的数据，会咋办？当然会干掉10个G的数据，然后就保留10个G的数据了。那干掉哪些数据？保留哪些数据？当然是干掉不常用的数据，保留常用的数据了。所以说，这是缓存的一个最基本的概念，数据是会过期的，要么是你自己设置个过期时间，要么是redis自己给干掉。

```
set key value 过期时间（1小时）
set进去的key，1小时之后就没了，就失效了
```

### 数据明明都过期了，怎么还占用着内存啊？

还有一种就是如果你设置好了一个过期时间，你知道redis是怎么给你弄成过期的吗？什么时候删除掉？如果你不知道，之前有个学员就问了，为啥好多数据明明应该过期了，结果发现redis内存占用还是很高？那是因为你不知道redis是怎么删除那些过期key的。

redis 内存一共是10g，你现在往里面写了5g的数据，结果这些数据明明你都设置了过期时间，要求这些数据1小时之后都会过期，结果1小时之后，你回来一看，redis机器，怎么内存占用还是50%呢？5g数据过期了，我从redis里查，是查不到了，结果过期的数据还占用着redis的内存。

### 定期删除和惰性删除

我们Redis设置了过期时间，其实内部是 定期删除 + 惰性删除两个再起作用的。

所谓定期删除，指的是redis默认是每隔100ms就随机抽取一些设置了过期时间的key，检查其是否过期，如果过期就删除。假设redis里放了10万个key，都设置了过期时间，你每隔几百毫秒，就检查10万个key，那redis基本上就死了，cpu负载会很高的，消耗在你的检查过期key上了。注意，这里可不是每隔100ms就遍历所有的设置过期时间的key，那样就是一场性能上的灾难。实际上redis是每隔100ms随机抽取一些key来检查和删除的。

但是问题是，定期删除可能会导致很多过期key到了时间并没有被删除掉，那咋整呢？所以就是惰性删除了。这就是说，在你获取某个key的时候，redis会检查一下 ，这个key如果设置了过期时间那么是否过期了？如果过期了此时就会删除，不会给你返回任何东西。

并不是key到时间就被删除掉，而是你查询这个key的时候，redis再懒惰的检查一下

通过上述两种手段结合起来，保证过期的key一定会被干掉。

很简单，就是说，你的过期key，靠定期删除没有被删除掉，还停留在内存里，占用着你的内存呢，除非你的系统去查一下那个key，才会被redis给删除掉。

但是实际上这还是有问题的，如果定期删除漏掉了很多过期key，然后你也没及时去查，也就没走惰性删除，此时会怎么样？如果大量过期key堆积在内存里，导致redis内存块耗尽了，咋整？

答案是：走内存淘汰机制。

### Redis内存淘汰机制

如果redis的内存占用过多的时候，此时会进行内存淘汰，有如下一些策略：

```shell
redis 10个key，现在已经满了，redis需要删除掉5个key

1个key，最近1分钟被查询了100次

1个key，最近10分钟被查询了50次

1个key，最近1个小时倍查询了1次
```

1）noeviction：当内存不足以容纳新写入数据时，新写入操作会报错，这个一般没人用吧，实在是太恶心了

2）allkeys-lru：当内存不足以容纳新写入数据时，在键空间中，移除最近最少使用的key（这个是最常用的）

3）allkeys-random：当内存不足以容纳新写入数据时，在键空间中，随机移除某个key，这个一般没人用吧，为啥要随机，肯定是把最近最少使用的key给干掉啊

4）volatile-lru：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，移除最近最少使用的key（这个一般不太合适）

5）volatile-random：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，随机移除某个key

6）volatile-ttl：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，有更早过期时间的key优先移除

很简单，你写的数据太多，内存满了，或者触发了什么条件，redis lru，自动给你清理掉了一些最近很少使用的数据

# **7.** **Redis集群**

## **7.1.** **Redis主从模式**

### **7.1.1.** **Redis主从复制模式** 

Master可以有多个Slave。 

Slave也可以连接其它的Slave。 

Slave同步Master数据时，Master不会阻塞，可以继续处理client的读写请求。（乐观复制策略） 

Mater主库可以进行读写操作，Slave从库一般只是进行读操作。 

### 7.1.2作用

​      1.读写分离 2.容灾备份

### *7*.1.3 **主从复制配置** 

#### 7.1.3.1配从不配主

#### 7.1.3.2从库配置

​        slaveof主库IP主库端口

​        每次与master断开之后，都需要重新连接，除非你配置进 redis.conf文件

#### 7.1.3.3修改配置细节操左

##### **7.1.3.3.1** **Master配置** 

​                           配置redis.conf

#####                7.1.3.3.2.Slave配置

​                            拷贝多个redis.conf文件

​                            开启daemonize  yes

​                            Pid文件名字

​                            指定端口

​                            Log文件名字

​                            Dump.rdb名字

#### 7.1.3.4三种模型方式

​                一主二仆

​               薪火相传

​               反客为主

### 7.1.4主从复制

#### **7.1.4.1** **主从复制基本原理** 

l Slave启动时，向Master发送sync命令，2.8版本发送psync，以实现增量复制。 

l Mater(主库)接到sync请求后，会在后台保存快照，也就是实现RDB持久化，并将保存快照期间接收到的命令缓存起来。

l 快照完成后，Master(主库)会将快照文件和所有的缓存的命令发送给Slave(从库)。 

l Slave(从库)接收后，会载入快照文件并执行缓存的命令，从而完成复制的初始化。 

l 在数据库使用阶段，Master(主库)会自动把每次收到的写命令同步到从服务器。 

![](/Users/fanqingwei/Desktop/学习/redis/images\redis主从复制的原理.png)

#### **7.1.4.**2 **Redis乐观复制策略** （弱一致性）

Redis采用乐观复制的策略，允许一定时间内主从数据库的内容不同，当然最终的数据会相同。此策略保证了Redis性能，在进行复制时，Master(主库)并不阻塞，继续处理client的请求。

但是Redis同样提供了配置用来限制**只有当数据库至少同步给指定数量的Slave(从库)时**，Master(主库)才可写，否则返回错误。配置是：min-slaves-to-write、min-slaves-max-lag。 

#### 7.1.4.3 主从复制的断点续传 

从redis 2.8开始，就支持主从复制的断点续传，如果主从复制过程中，网络连接断掉了，那么可以接着上次复制的地方，继续复制下去，而不是从头开始复制一份

master node会在内存中常见一个backlog，master和slave都会保存一个replica offset还有一个master id，offset就是保存在backlog中的。如果master和slave网络连接断掉了，slave会让master从上次的replica offset开始继续复制，但是如果没有找到对应的offset，那么就会执行一次resynchronization

#### 7.1.4.4 Redis主从复制的完整复制流程

##### 主从复制流程图

- slave node启动，仅仅保存master node的信息，包括master node的host和ip，但是复制流程没开始master host和ip是从哪儿来的，redis.conf里面的slaveof配置的
- slave node内部有个定时任务，每秒检查是否有新的master node要连接和复制，如果发现，就跟master node建立socket网络连接
- slave node发送ping命令给master node
- 口令认证，如果master设置了requirepass，那么salve node必须发送masterauth的口令过去进行认证
- master node第一次执行全量复制，将所有数据发给slave node
- master node后续持续将写命令，异步复制给slave node

![](/Users/fanqingwei/Desktop/学习/redis/images\复制的完整的基本流程.png)

##### 数据同步相关核心机制

指的就是第一次slave连接msater的时候，执行的全量复制，那个过程里面你的一些细节的机制

- master和slave都会维护一个offset

master会在自身不断累加offset，slave也会在自身不断累加offset
slave每秒都会上报自己的offset给master，同时master也会保存每个slave的offset

这个倒不是说特定就用在全量复制的，主要是master和slave都要知道各自的数据的offset，才能知道互相之间的数据不一致的情况

- backlog

master node有一个backlog，默认是1MB大小
master node给slave node复制数据时，也会将数据在backlog中同步写一份
backlog主要是用来做全量复制中断后的增量复制的

- master run id

info server，可以看到master run id
如果根据host+ip定位master node，是不靠谱的，如果master node重启或者数据出现了变化，那么slave node应该根据不同的run id区分，run id不同就做全量复制
如果需要不更改run id重启redis，可以使用redis-cli debug reload命令

- psync

从节点使用psync从master node进行复制，psync runid offset master node会根据自身的情况返回响应信息，可能是FULLRESYNC runid offset触发全量复制，可能是CONTINUE触发增量复制

![](/Users/fanqingwei/Desktop/学习/redis/images\maste run id的作用.png)

##### 全量复制

- master执行bgsave，在本地生成一份rdb快照文件
- master node将rdb快照文件发送给salve node，如果rdb复制时间超过60秒（repl-timeout），那么slave node就会认为复制失败，可以适当调节大这个参数
- 对于千兆网卡的机器，一般每秒传输100MB，6G文件，很可能超过60s
- master node在生成rdb时，会将所有新的写命令缓存在内存中，在salve node保存了rdb之后，再将新的写命令复制给salve node
- client-output-buffer-limit slave 256MB 64MB 60，如果在复制期间，内存缓冲区持续消耗超过64MB，或者一次性超过256MB，那么停止复制，复制失败
- slave node接收到rdb之后，清空自己的旧数据，然后重新加载rdb到自己的内存中，同时基于旧的数据版本对外提供服务

rdb生成、rdb通过网络拷贝、slave旧数据的清理、slave aof rewrite，很耗费时间

如果slave node开启了AOF，那么会立即执行BGREWRITEAOF，重写AOF

##### 增量复制

- 如果全量复制过程中，master-slave网络连接断掉，那么salve重新连接master时，会触发增量复制
- master直接从自己的backlog中获取部分丢失的数据，发送给slave node，默认backlog就是1MB
- master就是根据slave发送的psync中的offset来从backlog中获取数据的

##### 异步复制

master每次接收到写命令之后，先在内部写入数据，然后异步发送给slave node

##### 心跳机制

master默认每隔10秒发送一次心跳，salve node每隔1秒发送一个心跳

## **7.2.** **Redis哨兵模式**

### 7.2.1搭建

l 前面主从集群有个问题，就是Master(主库)挂了之后，无法重新选举新的节点作为主节点进行写操作，导致服务不可用。

l Redis提供了哨兵工具来实现监控Redis系统的运行情况，能够实现如下功能：

l 监控主从数据库运行是否正常。

l 当主数据库出现故障时，自动将从数据库转换为主数据库。

l 使用Redis-sentinel,redis实例必须在非集群模式下运行。

配置哨兵模式 - 配置sentinel.conf文件



**启动哨兵**：/opt/redis-shaobing/src/redis-sentinel /opt/redis-shaobing/sentinel.conf

**进入哨兵**：/opt/redis-shaobing/src/redis-cli -h 192.168.17.129 -p 26379

**查看哨兵信息**：/opt/redis-shaobing/src/redis-cli -h 192.168.17.129 -p 26379 info Sentinel

**停掉**Master，查看哨兵日志，从库重启后不能再次成为Master

![img](/Users/fanqingwei/Desktop/学习/redis/images\wps4.jpg) 

### 7.2.2Redis主备切换的数据丢失问题：异步复制、集群脑裂

主备切换的过程，可能会导致数据丢失

#### 异步复制导致的数据丢失

因为master -> slave的复制是异步的，所以可能有部分数据还没复制到slave，master就宕机了，此时这些部分数据就丢失了。

![](/Users/fanqingwei/Desktop/学习/redis/images\异步复制导致的数据丢失问题.png)

#### 脑裂导致的数据丢失

脑裂，也就是说，某个master所在机器突然脱离了正常的网络，跟其他slave机器不能连接，但是实际上master还运行着，此时哨兵可能就会认为master宕机了，然后开启选举，将其他slave切换成了master

这个时候，集群里就会有两个master，也就是所谓的脑裂。此时虽然某个slave被切换成了master，但是可能client还没来得及切换到新的master，还继续写向旧master的数据可能也丢失了

因此旧master再次恢复的时候，会被作为一个slave挂到新的master上去，自己的数据会清空，重新从新的master复制数据

![](/Users/fanqingwei/Desktop/学习/redis/images\集群脑裂导致的数据丢失问题.png)

同时原来的master节点上的，client像 旧的 master中写入数据，当网络分区恢复正常后，client写的数据就会因为复制，导致数据的丢失。

#### 解决异步复制和脑裂导致数据丢失

```
min-slaves-to-write 1
min-slaves-max-lag 10
```

要求至少有1个slave，数据复制和同步的延迟不能超过10秒

如果说一旦所有的slave，数据复制和同步的延迟都超过了10秒钟，那么这个时候，master就不会再接收任何请求了，上面两个配置可以减少异步复制和脑裂导致的数据丢失

- 减少异步复制的数据丢失

有了min-slaves-max-lag这个配置，就可以确保说，一旦slave复制数据和ack延时太长，就认为可能master宕机后损失的数据太多了，那么就拒绝写请求，这样可以把master宕机时由于部分数据未同步到slave导致的数据丢失降低的可控范围内

![](/Users/fanqingwei/Desktop/学习/redis/images\异步复制导致数据丢失如何降低损失.png)

- 减少脑裂的数据丢失

如果一个master出现了脑裂，跟其他slave丢了连接，那么上面两个配置可以确保说，如果不能继续给指定数量的slave发送数据，而且slave超过10秒没有给自己ack消息，那么就直接拒绝客户端的写请求，这样脑裂后的旧master就不会接受client的新数据，也就避免了数据丢失，上面的配置就确保了，如果跟任何一个slave丢了连接，在10秒后发现没有slave给自己ack，那么就拒绝新的写请求，因此在脑裂场景下，最多就丢失10秒的数据

![](/Users/fanqingwei/Desktop/学习/redis/images\脑裂导致数据丢失的问题如何降低损失.png)

### 7.2.3Redis哨兵的底层原理

**sdown和odown转换机制**

sdown和odown两种失败状态

sdown是主观宕机，就一个哨兵如果自己觉得一个master宕机了，那么就是主观宕机

odown是客观宕机，如果quorum数量的哨兵都觉得一个master宕机了，那么就是客观宕机

sdown达成的条件很简单，如果一个哨兵ping一个master，超过了is-master-down-after-milliseconds指定的毫秒数之后，就主观认为master宕机

sdown到odown转换的条件很简单，如果一个哨兵在指定时间内，收到了quorum指定数量的其他哨兵也认为那个master是sdown了，那么就认为是odown了，客观认为master宕机

##### **哨兵集群的自动发现机制**

哨兵互相之间的发现，是通过redis的pub/sub系统实现的，每个哨兵都会往__sentinel__:hello这个channel里发送一个消息，这时候所有其他哨兵都可以消费到这个消息，并感知到其他的哨兵的存在

每隔两秒钟，每个哨兵都会往自己监控的某个master+slaves对应的__sentinel__:hello channel里发送一个消息，内容是自己的host、ip和runid还有对这个master的监控配置

每个哨兵也会去监听自己监控的每个master+slaves对应的__sentinel__:hello channel，然后去感知到同样在监听这个master+slaves的其他哨兵的存在

每个哨兵还会跟其他哨兵交换对master的监控配置，互相进行监控配置的同步

**slave配置的自动纠正**

哨兵会负责自动纠正slave的一些配置，比如slave如果要成为潜在的master候选人，哨兵会确保slave在复制现有master的数据; 如果slave连接到了一个错误的master上，比如故障转移之后，那么哨兵会确保它们连接到正确的master上

**slave->master选举算法**

如果一个master被认为down了，而且slaver哨兵都允许了主备切换，那么某个哨兵就会执行主备切换操作，此时首先要选举一个slave来，会考虑slave的一些信息

- 跟master断开连接的时长
- slave优先级
- 复制offset
- run id

如果一个slave跟master断开连接已经超过了down-after-milliseconds的10倍，外加master宕机的时长，那么slave就被认为不适合选举为master

```
(down-after-milliseconds * 10) + milliseconds_since_master_is_in_SDOWN_state
```

接下来会对slave进行排序

- 按照slave优先级进行排序，slave priority越低，优先级就越高
- 如果slave priority相同，那么看replica offset，哪个slave复制了越多的数据，offset越靠后，优先级就越高
- 如果上面两个条件都相同，那么选择一个run id比较小的那个slave

**quorum和majority**

每次一个哨兵要做主备切换，首先需要quorum数量的哨兵认为odown，然后选举出一个哨兵来做切换，这个哨兵还得得到majority哨兵的授权，才能正式执行切换

如果quorum < majority，比如5个哨兵，majority就是3，quorum设置为2，那么就3个哨兵授权就可以执行切换

但是如果quorum >= majority，那么必须quorum数量的哨兵都授权，比如5个哨兵，quorum是5，那么必须5个哨兵都同意授权，才能执行切换

**configuration epoch**

哨兵会对一套redis master+slave进行监控，有相应的监控的配置

执行切换的那个哨兵，会从要切换到的新master（salve->master）那里得到一个configuration epoch，这就是一个version号，每次切换的version号都必须是唯一的

如果第一个选举出的哨兵切换失败了，那么其他哨兵，会等待failover-timeout时间，然后接替继续执行切换，此时会重新获取一个新的configuration epoch，作为新的version号

**configuraiton传播**

哨兵完成切换之后，会在自己本地更新生成最新的master配置，然后同步给其他的哨兵，就是通过之前说的pub/sub消息机制，这里之前的version号就很重要了，因为各种消息都是通过一个channel去发布和监听的，所以一个哨兵完成一次新的切换之后，新的master配置是跟着新的version号的，其他的哨兵都是根据版本号的大小来更新自己的master配置的

## **7.3.** **Redis集群**

### **7.3.1.** **集群介绍** 

Redis 集群是一个提供在多个Redis节点间共享数据的程序集。

Redis集群并不支持处理多个keys的命令(比如mset、mget等)，因为这需要在不同的节点间移动数据,从而达不到像Redis那样的性能,在高负载的情况下可能会导致不可预料的错误.

Redis 集群通过分区来提供一定程度的可用性，在实际环境中当某个节点宕机或者不可达的情况下继续处理命令。 

### **7.3.2.** **Redis 集群的优势** 

自动分割数据到不同的节点上。

整个集群的部分节点失败或者不可达的情况下能够继续处理命令。 

### **7.3.3.** Redis 集群的数据分片

Redis集群引入了**哈希槽**的概念。

Redis 集群有16384个哈希槽，每个key通过CRC16校验后对16384取模来决定放置哪个槽。集群的每个节点负责一部分hash槽。

举个例子：比如当前集群有3个节点,那么：节点 A 包含 0 到 5500号哈希槽。节点 B 包含5501 到 11000 号哈希槽。节点 C 包含11001 到 16383号哈希槽。 

**这种结构很容易添加或者删除节点**： 比如我们想新添加个节点D, 我们需要将节点 A、B、 C中的部分槽移动到D上。如果我想移除节点A，需要将A中的槽移到B和C节点上。然后将没有任何槽的A节点从集群中移除即可。由于从一个节点将哈希槽移动到另一个节点并不会停止服务,所以无论添加删除或者改变某个节点的哈希槽的数量都不会造成集群不可用的状态.

### **7.3.4.** **Redis集群安装**

![](/Users/fanqingwei/Desktop/学习/redis/images\22.png)

#### 7.3.4.1使用redis提供的rb脚本

**安装方式**：在一台机器上搭建集群

**安装节点数**：必须有3个或3个以上的主节点，所以采用3主3从方式安装；



**搭建伪集群：**redis启动时附带一个配置文件，配置文件只要端口号不一样就不会冲突，一个配置文件就是一个redis实例，配置多个端口号不同的配置文件然后根据不同的配置文件启动redis或者开多个虚拟机界面

##### **7.3.4.1.1** **创建目录**

**l** **在/opt下创建redis-cluster目录；**

**l** **在redis-cluster创建8000至8005六个目录；**

**l** **将redis.conf文件移动到8000-8005文件夹下；**

**7.3.4.1.2** **修改redis.conf文件**

每个redis.conf文件修改配置点：*表示要替换的字符：如8000、8001、8002、8003、8004、8005



##### **7.3.4.1.3** **按次序启动每一个节点**



##### **7.3.4.1.4** **创建集群**

Redis5.0将Ruby创建集群的方式改为了C语言创建，创建命令也进行了修改；

**执行下面的一条命令：**

/opt/redis-5.0.3/src/redis-cli --cluster create 192.168.179.128:8000 1192.168.179.128:8001 192.168.179.128:8002 192.168.179.128:8003 192.168.179.128:8004 192.168.179.128:8005 --cluster-replicas 1

**输入命令后，redis会自动划分hash槽，看下面日志，在划分完成后，输入yes即可**



#### 7.3.4.2原生搭建

##### 7.3.4.2.1配置开启cluster节点

  cluster-enabled yes(启动集群模式)

  cluster-config-file nodes-8001.conf(这里800x最好和port对应上)

##### 7.3.4.2.2meet

   cluster meet ip port

##### 7.3.4.2.3指派槽

   查看crc16算法算出key的槽位命令 cluster keyslot key

   16384/3 0-5461 5462-10922 10923-16383

   16384/4 4096

​    cluster addslots slot(槽位下标)

##### 7.3.4.2.4分配主从

​    cluster replicate node-id

### 7.3.5集群的扩容缩容

​         扩容缩容槽位迁移数据也跟着迁移

####       7.3.5.1扩容



####       7.3.5.2缩容



## 7.4 Redis Cluster节点通信

#### 基础通信原理

（1）redis cluster节点间采取**gossip协议**进行通信

跟集中式不同，不是将集群元数据（节点信息，故障，等等）集中存储在某个节点上，而是互相之间不断通信，保持整个集群所有节点的数据是完整的

维护集群的元数据两种

集中式：好处在于，元数据的更新和读取，时效性非常好，一旦元数据出现了变更，立即就更新到集中式的存储中，其他节点读取的时候立即就可以感知到; 不好在于，所有的元数据的跟新压力全部集中在一个地方，可能会导致元数据的存储有压力

gossip：好处在于，元数据的更新比较分散，不是集中在一个地方，更新请求会陆陆续续，到达所有节点上去更新，有一定的延时，降低了压力; 缺点，元数据更新有延时，可能导致集群的一些操作会有一些滞后

![](/Users/fanqingwei/Desktop/学习/redis/images\gossip协议维护集群元数据.png)

（2）10000端口

每个节点都有一个专门用于节点间通信的端口，就是自己提供服务的端口号+10000，比如7001，那么用于节点间通信的就是17001端口

每隔节点每隔一段时间都会往另外几个节点发送ping消息，同时其他几点接收到ping之后返回pong

（3）交换的信息

故障信息，节点的增加和移除，hash slot信息，等等

#### gossip协议

gossip协议包含多种消息，包括ping，pong，meet，fail，等等

meet: 某个节点发送meet给新加入的节点，让新节点加入集群中，然后新节点就会开始与其他节点进行通信

```
redis-trib.rb add-node
```

其实内部就是发送了一个gossip meet消息，给新加入的节点，通知那个节点去加入我们的集群

ping: 每个节点都会频繁给其他节点发送ping，其中包含自己的状态还有自己维护的集群元数据，互相通过ping交换元数据,每个节点每秒都会频繁发送ping给其他的集群，频繁的互相之间交换数据，互相进行元数据的更新

pong: 返回ping和meet，包含自己的状态和其他信息，也可以用于信息广播和更新

fail: 某个节点判断另一个节点fail之后，就发送fail给其他节点，通知其他节点，指定的节点宕机了

#### ping消息深入

ping很频繁，而且要携带一些元数据，所以可能会加重网络负担，每个节点每秒会执行10次ping，每次会选择5个最久没有通信的其他节点，当然如果发现某个节点通信延时达到了cluster_node_timeout / 2，那么立即发送ping，避免数据交换延时过长，落后的时间太长了

比如说，两个节点之间都10分钟没有交换数据了，那么整个集群处于严重的元数据不一致的情况，就会有问题，所以cluster_node_timeout可以调节，如果调节比较大，那么会降低发送的频率，每次ping，一个是带上自己节点的信息，还有就是带上1/10其他节点的信息，发送出去，进行数据交换，至少包含3个其他节点的信息，最多包含总节点-2个其他节点的信息

#### 面向集群的Jedis内部实现原理

开发，jedis，redis的java client客户端，redis cluster，jedis cluster api

jedis cluster api与redis cluster集群交互的一些基本原理

1、基于重定向的客户端

redis-cli -c，自动重定向

（1）请求重定向

客户端可能会挑选任意一个redis实例去发送命令，每个redis实例接收到命令，都会计算key对应的hash slot

如果在本地就在本地处理，否则返回moved给客户端，让客户端进行重定向

cluster keyslot mykey，可以查看一个key对应的hash slot是什么

用redis-cli的时候，可以加入-c参数，支持自动的请求重定向，redis-cli接收到moved之后，会自动重定向到对应的节点执行命令

（2）计算hash slot

计算hash slot的算法，就是根据key计算CRC16值，然后对16384取模，拿到对应的hash slot

用hash tag可以手动指定key对应的slot，同一个hash tag下的key，都会在一个hash slot中，比如set mykey1:{100}和set mykey2:{100}

（3）hash slot查找

节点间通过gossip协议进行数据交换，就知道每个hash slot在哪个节点上

2、smart jedis

（1）什么是smart jedis

基于重定向的客户端，很消耗网络IO，因为大部分情况下，可能都会出现一次请求重定向，才能找到正确的节点

所以大部分的客户端，比如java redis客户端，就是jedis，都是smart的

本地维护一份hashslot -> node的映射表，缓存，大部分情况下，直接走本地缓存就可以找到hashslot -> node，不需要通过节点进行moved重定向

（2）JedisCluster的工作原理

在JedisCluster初始化的时候，就会随机选择一个node，初始化hashslot -> node映射表，同时为每个节点创建一个JedisPool连接池

每次基于JedisCluster执行操作，首先JedisCluster都会在本地计算key的hashslot，然后在本地映射表找到对应的节点

如果那个node正好还是持有那个hashslot，那么就ok; 如果说进行了reshard这样的操作，可能hashslot已经不在那个node上了，就会返回moved

如果JedisCluter API发现对应的节点返回moved，那么利用该节点的元数据，更新本地的hashslot -> node映射表缓存

重复上面几个步骤，直到找到对应的节点，如果重试超过5次，那么就报错，JedisClusterMaxRedirectionException

jedis老版本，可能会出现在集群某个节点故障还没完成自动切换恢复时，频繁更新hash slot，频繁ping节点检查活跃，导致大量网络IO开销

jedis最新版本，对于这些过度的hash slot更新和ping，都进行了优化，避免了类似问题

（3）hashslot迁移和ask重定向

如果hash slot正在迁移，那么会返回ask重定向给jedis

jedis接收到ask重定向之后，会重新定位到目标节点去执行，但是因为ask发生在hash slot迁移过程中，所以JedisCluster API收到ask是不会更新hashslot本地缓存

已经可以确定说，hashslot已经迁移完了，moved是会更新本地hashslot->node映射表缓存的



#### 高可用性与主备切换原理

redis cluster的高可用的原理，几乎跟哨兵是类似的

1、判断节点宕机

如果一个节点认为另外一个节点宕机，那么就是pfail，主观宕机，如果多个节点都认为另外一个节点宕机了，那么就是fail，客观宕机，跟哨兵的原理几乎一样，sdown，odown，在cluster-node-timeout内，某个节点一直没有返回pong，那么就被认为pfail，如果一个节点认为某个节点pfail了，那么会在gossip ping消息中，ping给其他节点，如果超过半数的节点都认为pfail了，那么就会变成fail

2、从节点过滤

对宕机的master node，从其所有的slave node中，选择一个切换成master node，检查每个slave node与master node断开连接的时间，如果超过了cluster-node-timeout * cluster-slave-validity-factor，那么就没有资格切换成master，这个也是跟哨兵是一样的，从节点超时过滤的步骤

3、从节点选举

哨兵：对所有从节点进行排序，slave priority，offset，run id，每个从节点，都根据自己对master复制数据的offset，来设置一个选举时间，offset越大（复制数据越多）的从节点，选举时间越靠前，优先进行选举，所有的master node开始slave选举投票，给要进行选举的slave进行投票，如果大部分master node（N/2 + 1）都投票给了某个从节点，那么选举通过，那个从节点可以切换成master，从节点执行主备切换，从节点切换为主节点

4、与哨兵比较

整个流程跟哨兵相比，非常类似，所以说，redis cluster功能强大，直接集成了replication和sentinal的功能

## 7.5**其他版本Redis集群**

豌豆荚的codis：**https://github.com/CodisLabs/codis**

Codis is a proxy based high performance Redis cluster solution written in Go. It is production-ready and widely used at **wandoujia.com** and many companies. You can see Codis Releases for latest and most stable realeases. 

**Codis架构图：**

![img](/Users/fanqingwei/Desktop/学习/redis/images\wps5.jpg) 

**其它版本的redis集群大家自己了解一下即可；**

## 7.6总结Redis集群的演变过程：

###  7.6.1单机版

​     核心技术：持久化-------->>作用：数据备份到硬盘，容灾备份

### 7.6.2主从复制

####     7.6.2.1简介

高可用redis的基础，哨兵和集群都是在复制基础上实现的高可用

复制主要实现了数据的多机备份，以及对于读操作的负载均衡和简单的故障恢复

 缺陷是故障恢复无法自动化，写操作无法负载均衡，存储能力受单机限制

####     7.6.2.2复制缺点：复制延迟

​               由于所有的写操作都是先在Master上操作，然后同步更新到slave上，所有从Master同步到slave机器有一定的延迟，当系统很繁忙时，延迟问题会更加严重，Slave机器数量的增加也会使这个问题更加严重

### 7.6.3哨兵集群

####     7.6.3.1特点

​         在主从复制的基础上，哨兵实现了自动化的故障恢复，主从切换时节点不可用，因此存在数据丢失的问题

​         缺陷：写操作无法负载均衡，存储能力受到单机限制              

### 7.6.4 Rediscluster集群

​          通过集群，redis解决了写操作无法负载均衡，以及存储能力受单机限制的问题，较为完善的高可用方案

### 7.6.5操作集群原理

​           ![](/Users/fanqingwei/Desktop/学习/redis/images\1587020702645.png)

# **8.** **Redis的事务**

## **7.1.** **Redis事务概述**

**Redis对事务的支持比较简单，它是一组命令的集合，命令被依次顺序的执行，也可以放弃事务的执行，此时所有事务里面的命令都不会执行。**

**Redis 只能保证一个client发起的事务中的命令可以连续的执行，而中间不会插入其他client的命令，因为Redis是单线程架构，所以在执行完事务内所有指令前是不可能再去同时执行其他客户端的请求的。**

Redis的事务没有隔离级别的概念，因为事务提交前任何指令都不会被实际执行，也就不存在“事务内的查询要看到事务里的更新，在事务外查询不能看到”这种问题了。

Redis的事务不保证原子性，也就是不保证所有指令同时成功或同时失败，只有决定是否开始执行全部指令的能力，没有执行到一半进行回滚的能力。

## **7.2.** **事务操作的基本命令**

**multi** : 设置事务开始

**exec** : 执行事务

**discard** : 放弃事务

**watch** : 监控键值，如果键值被修改或删除，后面的一个事务就不会执行

**unwatch** : 取消watch

**watch命令说明：**

**Redis使用watch来提供乐观锁；**

**当exec被调用后，所有的之前被监视的键值会被取消监视，不管事务是否被取消或执行。并且当客户端连接丢失的时候，所有东西都会被取消监视。**

## **7.3.** **事务扩展-乐观锁**

### **7.3.1.** **乐观锁介绍**

**乐观锁大多是****基于数据版本(version)的记录机制****实现的。何谓数据版本？即为数据增加一个版本标识，更新数据时，对此版本号加 1，当线程A要更新数据值时，在读取数据的同时也会读取version值，在提交更新时，若刚才读取到的version值****比****当前数据库中的version值大于时才更新，否则更新失败。**

### **7.3.2.** **乐观锁举例**

小明的账户有余额1000刀；

(1)操作员A将小明的信息读出（此时 version=1），并准备从其帐户余额中扣除100刀（1000-100）； 900

(2)在操作员A操作的过程中，操作员B也读入小明的信息（此时 version=1），并准备从其帐户余额中扣除500刀（1000-500）； 500

(3)A完成了修改工作后，将数据版本号加 1（此时 version=2），帐户扣除后余额为900刀，提交至数据库更新，此时由于提交数据版本大于数据库记录当前版本(2>1)，数据被更新，数据库记录 version 更新为 2;

 (4)在A完成更新操作之后，B也完成了操作，她也将版本号加 1（version=2）并试图向数据库提交数据(此时小明的余额为500刀)，但比对数据库记录版本时发现，B提交的数据版本号为 2，数据库记录当前版本也为 2，不满足“提交版本必须大于记录当前版本才能执行更新”的乐观锁策略，因此，B的提交被驳回； 

### **7.3.3.** **Redis的乐观锁测试**

开启两个客户端 

![img](/Users/fanqingwei/Desktop/学习/redis/images\wps6.jpg) 

## **7.4.** **Redis事务的基本过程**

1.发送一个事务的命令multi给redis； 

2.依次把要执行的命令发送给redis，redis接到这些命令，并不会立即执行，而是放到等待执行的事务队列里面；

3.发送执行事务的命令exec给redis；

4.redis会保证一个事务内的命令依次执行，而不会被其它命令插入； 

## **7.5.** **Redis事务过程中的错误处理**

**redis 的事务非常简单，当然会存在一些问题。只能保证事务的每个命令连续执行，但是如果事务中的一个命令失败了，并不回滚其他命令，下面举例看错误处理；**

**1.如果是某个命令执行错误(使用方式错了)，那么其它的命令仍然会正常执行，然后在执行后返回错误信息；** 

![img](/Users/fanqingwei/Desktop/学习/redis/images\wps7.jpg) 

**2.如果任何一个命令语法有错，redis会直接返回错误，所有的命令都不会执行；**

![img](/Users/fanqingwei/Desktop/学习/redis/images\wps8.jpg) 

**3.redis不提供事务滚回的功能，开发者必须在事务执行出错后，自行恢复数据库状态；**

# **8.** **Redis持久化**

## **8.1.** **持久化方案**

Redis的持久化方案目前有两种方式：RDB和AOF模式。 

### **8.1.1.** **RDB持久化**

 **实现机制** **rdb方式是通过在是****一****定时间内将内存中的数据集快照（Snapshot）写入磁盘；在数据恢复时，再将快照中的信息读取到内存中。**

**RDB持久化是Redis定期将内存中的"数据集快照"写入磁盘，实际操作过程是创建(fork)一个子进程，先将数据集写入临时文件，写入成功后，再替换之前的文件，用二进制压缩存储。****整个过程****主进程****不进行任何IO操作，保证Redis性能的高效性。**

**RDB持久化的触发方式**：自动触发和手动触发 

l 自动触发主要看redis.conf 

save 900 1     900秒内至少有一个key被改变就自动触发RDB持久化

save 300 10    300秒内至少有10个key被改变就自动触发RDB持久化

​    save 60 10000  60秒内至少有10000个key被改变就自动触发RDB持久化



l 手动触发 

**save命令**：执行此命令会阻塞Redis服务器，执行命令期间，Redis不能处理其它命令，直到RDB过程完成为止。

**bgsave****命令**：执行该命令时，Redis会在后台异步进行快照操作，做快照的同时还可以响应客户端请求；此时Redis进程执行fork操作创建子进程，RDB持久化过程由子进程负责，完成后自动结束。阻塞只发生在fork阶段，一般时间很短。 



 

### **8.1.2.** **AOF持久化**

**AOF持久化以日志的形式记录服务器所处理的每一个写、删除操作，查询操作不会记录，以文本的方式记录，可以打开文件看到详细的操作记录。**



# **9.** **Redis发布与订阅**

## **9.1.** **介绍**

Redis的发布订阅模式可以实现进程间的消息传递

## **9.2.** **发布订阅模式的操作指令** 

publish：发布消息，格式是： publish channel 消息

subscribe：订阅消息，格式是：subscribe channel, 可以是多个channel

psubscribe：订阅消息，格式是：psubscribe channel, 支持glob风格的通配符

unsubscribe：取消订阅，格式是：unsubscribe channel,不指定频道表示取消所有subscribe命令的订阅

punsubscribe：取消订阅，格式是：punsubscribe channel,不指定频道表示取消所有的punsubscribe命令的订阅，注意这里匹配模式的时候，是不会将通配符展开的，是严格进行字符串匹配的，比如：punsubscribe * 是无法退订 c1.*的，必须严格使用punsubscribe c1.* 才可以。 

# 10.Redis缓存和数据库一致性

## 10.1 实时同步

### 10.1.2 双写一致性的策略

#### 先更新缓存，再更新数据库

更新缓存成功，更新数据库失败会产生脏数据

#### 先更新数据库，再更新缓存

<img src="/Users/fanqingwei/Desktop/学习/分布式\images\双写一致1.webp" style="zoom:50%;" />

如上图redis更新失败则会造成数据不一致的情况,直到缓存超时自动删除或则下次更新才可能一致

#### 先删除缓存，再更新数据库

<img src="/Users/fanqingwei/Desktop/学习/分布式\images\双写一致2.webp" style="zoom:50%;" />

线程更新完数据库和线程2存入的缓存值不一致

#### 先更新数据库，再删除缓存

线程A查询数据库 x=3

线程B更新数据库 x=4

线程B删除缓存

线程A更新旧值到缓存

### 10.1.3  spring-cache 数据库一致性解决方案

​      对强一致性要求高的，应采用实时同步方案，即查询缓存查询不到再到数据库查询，保存到缓存；更新缓存时，先更新数据库，再将缓存的设置过期（建议不要去更新缓存内容，直接设置缓存过期）。

Spring缓存注解：

@Cacheable:存在缓存则直接返回,不存在则调用业务方法,保存到缓存

@CachePut：不管缓存存不存在,调用业务方法,将返回值set到缓存里面

@CacheEvict：清空缓存

@Caching：组合注解

原理：SpringAOP

![1587203185384](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1587203185384.png)

Spring默认是内置缓存ConcurrentHashMap

可以配置缓存管理器来指定为redis

### 10.1.4  存在的问题

 一致性问题

　　读数据的时候首先去Redis里读，没有读到再去MySQL里读，读回来之后更新到Redis里作为下一次的缓存。写数据的时候会产生数据不一致的问题，无论是先写到Redis里再写MySQL还是先写MySQL再写Redis，这两步写操作不能保证原子性，所以会出现Redis和MySQL里的数据不一致。无论采取何种方式都不能保证强一致性，如果对Redis里的数据设置了过期时间能够保证最终一致性，对架构做的优化只能降低不一致性发生的概率，不能从根本上避免不一致性。

​          <https://www.jianshu.com/p/7c4053b81ea2>

### 10.1.5  解决

延迟双删

出现删除失败

循环删除

## 10.2 非实时同步

### 10.2.1 定时任务

​        一篇文章1分钟内被点击100万次，更新redis缓存，定时任务每天凌晨两点同步到数据库

### 10.2.2 异步队列

​         对于并发程度高的，可以采用异步队列的方式同步，可采用Kafka、rabbitMq等消息中间件处理消息生产和消费。RabbitMq优点可靠性高，可以做到消息0丢失。

## 10.3 阿里的同步工具canal

canal实现方式是模拟mysql slave和master的同步机制，监控DB bitlog的日志更新来触发缓存的更新，此方法可以解放程序员双手，减轻工作量，但使用时存在局限性；

Mysql主从复制原理参考下文MySQL

**canal的工作原理**

![1587136282683](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1587136282683.png)

1.canal模拟mysql salve的交互协议，伪装自己为mysql slave，向mysqll master发送dump协议

2.mysql master 收到dump请求，开始推送binary log给slave(也就是canal)

3.canal解析binary log对象（原始为byte流）

## 10.4 采用UDF自定义函数的方式

面向mysql的API进行编程，利用触发器进行缓存同步，但UDF主要是C/C++语言实现，学习成本高

# **11.** **Redis的java客户端-Jedis**

源码地址：[https](https://github.com/xetorthio/jedis)[://](https://github.com/xetorthio/jedis)[github.com/xetorthio/jedis](https://github.com/xetorthio/jedis) 

官方最新版 

<dependency>

​    <groupId>redis.clients</groupId>

​    <artifactId>jedis</artifactId>

​    <version>3.0.1</version>

</dependency>

 

## **Redis使用jedis原生api**

![img](/Users/fanqingwei/Desktop/学习/redis/images\wps9.png)

## **Spring整合Redis**

 

## **spring-data-redis**

​    Spring-data-redis是spring大家族的一部分，提供了在srping应用中通过简单的配置访问redis服务，对reids底层开发包(Jedis, JRedis, and RJC)进行了高度封装，RedisTemplate提供了redis各种操作、异常处理及序列化，支持发布订阅，并对spring 3.1 cache进行了实现。

 spring-data-redis针对jedis提供了如下功能：

连接池自动管理，提供了一个高度封装的“RedisTemplate”类

