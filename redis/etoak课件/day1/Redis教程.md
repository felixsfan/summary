# **Redis教程**

# **1.** **NoSQL(Not Only SQL)数据库介绍**

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml7744\wps1.jpg) 

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

# **3.** **Centos7安装redis-5.0.4**

## **3.1.** **简要介绍**

**l** **安装步骤，我分享的有道云笔记** 

<http://note.youdao.com/noteshare?id=60ab3c5071f1acab4d90d32e5ee5f130&sub=A486484D71BB454C8A6F0CBA0B9E2A5C>

**l** **目前官网的最新稳定版本是****5.0.5****版本，Redis官网不提供windows的版本。** 

l Window64位下载地址：<https://github.com/MicrosoftArchive/redis/releases>。

l 目前最新的windows版本是2016年的3.2.100版本。

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml7744\wps2.jpg) 

## **3.2.** **单机版安装步骤**

### **3.2.1.** **上传文件到服务器**

**[root@localhost ~]#** **tar -zxvf redis-5.0.3.tar.gz -C /opt**

**[root@localhost redis-5.0.3]# cd /opt/redis-5.0.3** 

**[root@localhost redis-5.0.3]# make**

**报错：**

**compilation terminated. make[1]: \**\* [adlist.o] Error 1 make[1]: Leaving directory `/usr/local/redis-5.0-rc3/src' make: \**\* [all] Error 2**

### **3.2.2.** **安装Development Tools**

**[root@localhost redis-5.0.3]# yum groupinstall 'Development Tools'**

### **3.2.3.** **安装****Redis****依赖****包**

**[root@localhost redis-5.0.3]# cd /opt/redis-5.0.3/deps**

**[root@localhost deps]# make hiredis lua jemalloc linenoise**

**安装结果：**	

**MAKE linenoise**

**cd linenoise && make**

**make[1]: Entering directory `/opt/redis-5.0.3/deps/linenoise'**

**cc -Wall -Os -g -c linenoise.c**

**make[1]: Leaving directory `/opt/redis-5.0.3/deps/linenoise'**

### **3.2.4.** **继续安装Redis：**

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

  **dir ./rdb/ # 默认是./，表示在redis-5.0.3目录下生成dump.rdb,用于持久化数据****；**

### **3.2.7.** **启动服务**

**[root@localhost redis-5.0.3]/opt/redis-5.0.3/src/redis-server /opt/redis-5.0.3/redis.conf**

### **3.2.8.** **启动客户端**

**[root@localhost redis-5.0.3]/opt/redis/src/redis-cli**

### **3.2.9.** **关闭redis-server**

**[root@localhost redis-5.0.3]/opt/redis-5.0.3/src/redis-cli shutdown**

 

## **3.3.** **Redis的多数据库特点**

**Redis默认支持16个数据库，以一个从0开始的递增数字命名，可以通过redis.conf文件中的参数databases来修改默认数据库个数。客户端连接Redis服务后会自动选择0号数据库，可以通过SELECT命令更换数据库，例如选择15号数据库：** 

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml7744\wps3.jpg) 

**说明****：不支持自定义数据库名称。** 

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

# **6.** **Redis集群**

 

## **6.1.** **Redis主从模式**

### **6.1.1.** **Redis主从复制模式** 

Master可以有多个Slave。 

Slave也可以连接其它的Slave。 

Slave同步Master数据时，Master不会阻塞，可以继续处理client的读写请求。（乐观复制策略） 

Mater主库可以进行读写操作，Slave从库一般只是进行读操作。 

### 6.1.2作用

​      1.读写分离 2.容灾备份

### **6.1.3.** **主从复制配置** 

#### 6.1.3.1配从不配主

#### 6.1.3.2从库配置

​        slaveof主库IP主库端口

​        每次与master断开之后，都需要重新连接，除非你配置进 redis.conf文件

#### 6.1.3.3修改配置细节操左

​               **6.1.3.3.1** **Master配置** 

​                           配置redis.conf

#####                6.1.3.3.2.Slave配置

​                            拷贝多个redis.conf文件

​                            开启daemonize  yes

​                            Pid文件名字

​                            指定端口

​                            Log文件名字

​                            Dump.rdb名字

#### 6.1.3.4三种模型方式

​                一主二仆

​               薪火相传

​               反客为主

### **6.1.3.** **主从复制基本原理** 

l Slave启动时，向Master发送sync命令，2.8版本发送psync，以实现增量复制。 

l Mater(主库)接到sync请求后，会在后台保存快照，也就是实现RDB持久化，并将保存快照期间接收到的命令缓存起来。

l 快照完成后，Master(主库)会将快照文件和所有的缓存的命令发送给Slave(从库)。 

l Slave(从库)接收后，会载入快照文件并执行缓存的命令，从而完成复制的初始化。 

l （增量复制）在数据库使用阶段，Master(主库)会自动把每次收到的写命令同步到从服务器。 

### **6.1.4.** **Redis乐观复制策略** **（****弱一致性****）**

Redis采用乐观复制的策略，允许一定时间内主从数据库的内容不同，当然最终的数据会相同。此策略保证了Redis性能，在进行复制时，Master(主库)并不阻塞，继续处理client的请求。

但是Redis同样提供了配置用来限制**只有当数据库至少同步给指定数量的Slave(从库)时**，Master(主库)才可写，否则返回错误。配置是：min-slaves-to-write、min-slaves-max-lag。 



## **6.2.** **Redis哨兵模式**

l 前面主从集群有个问题，就是Master(主库)挂了之后，无法重新选举新的节点作为主节点进行写操作，导致服务不可用。

l Redis提供了哨兵工具来实现监控Redis系统的运行情况，能够实现如下功能：

l 监控主从数据库运行是否正常。

l 当主数据库出现故障时，自动将从数据库转换为主数据库。

l 使用Redis-sentinel,redis实例必须在非集群模式下运行。

配置哨兵模式 - 配置sentinel.conf文件



**启动哨兵**：/opt/redis-shaobing/src/redis-sentinel /opt/redis-shaobing/sentinel.conf

**进入哨兵**：/opt/redis-shaobing/src/redis-cli -h 192.168.17.129 -p 26379

**查看哨兵信息**：/opt/redis-shaobing/src/redis-cli -h 192.168.17.129 -p 26379 info Sentinel

**停掉****Master，查看哨兵日志，****从****库重启后不能再次成为Master。**

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml7744\wps4.jpg) 

## **6.3.** **Redis集群**

### **6.3.1.** **集群介绍** 

Redis 集群是一个提供在多个Redis节点间共享数据的程序集。

Redis集群并不支持处理多个keys的命令(比如mset、mget等)，因为这需要在不同的节点间移动数据,从而达不到像Redis那样的性能,在高负载的情况下可能会导致不可预料的错误.

Redis 集群通过分区来提供一定程度的可用性，在实际环境中当某个节点宕机或者不可达的情况下继续处理命令。 

### **6.3.2.** **Redis 集群的优势** 

自动分割数据到不同的节点上。

整个集群的部分节点失败或者不可达的情况下能够继续处理命令。 

### **6.3.3.** **Redis 集群的数据分片 \**\**\**** 

Redis集群引入了**哈希槽**的概念。

Redis 集群有16384个哈希槽，每个key通过CRC16校验后对16384取模来决定放置哪个槽。集群的每个节点负责一部分hash槽。

举个例子：比如当前集群有3个节点,那么：节点 A 包含 0 到 5500号哈希槽。节点 B 包含5501 到 11000 号哈希槽。节点 C 包含11001 到 16383号哈希槽。 

**这种结构很容易添加或者删除节点**： 比如我们想新添加个节点D, 我们需要将节点 A、B、 C中的部分槽移动到D上。如果我想移除节点A，需要将A中的槽移到B和C节点上。然后将没有任何槽的A节点从集群中移除即可。由于从一个节点将哈希槽移动到另一个节点并不会停止服务,所以无论添加删除或者改变某个节点的哈希槽的数量都不会造成集群不可用的状态.

### **6.3.4.** **Redis集群安装**

![](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1587014849469.png)

#### 6.3.4.1使用redis提供的rb脚本

**安装方式**：在一台机器上搭建集群

**安装节点数**：必须有3个或3个以上的主节点，所以采用3主3从方式安装；



**搭建伪集群：**redis启动时附带一个配置文件，配置文件只要端口号不一样就不会冲突，一个配置文件就是一个redis实例，配置多个端口号不同的配置文件然后根据不同的配置文件启动redis或者开多个虚拟机界面

##### **6.3.4.1.1** **创建目录**

**l** **在/opt下创建redis-cluster目录；**

**l** **在redis-cluster创建8000至8005六个目录；**

**l** **将redis.conf文件移动到8000-8005文件夹下；**

**6.3.4.1.2** **修改redis.conf文件**

每个redis.conf文件修改配置点：*表示要替换的字符：如8000、8001、8002、8003、8004、8005



##### **6.3.4.1.3** **按次序启动每一个节点**



##### **6.3.4.1.4** **创建集群**

Redis5.0将Ruby创建集群的方式改为了C语言创建，创建命令也进行了修改；

**执行下面的一条命令：**

/opt/redis-5.0.3/src/redis-cli --cluster create 192.168.179.128:8000 1192.168.179.128:8001 192.168.179.128:8002 192.168.179.128:8003 192.168.179.128:8004 192.168.179.128:8005 --cluster-replicas 1

**输入命令后，redis会自动划分hash槽，看下面日志，在划分完成后，输入yes即可**



#### 6.3.4.2原生搭建

##### 6.3.4.2.1配置开启cluster节点

  cluster-enabled yes(启动集群模式)

  cluster-config-file nodes-8001.conf(这里800x最好和port对应上)

##### 6.3.4.2.2meet

   cluster meet ip port

##### 6.3.4.2.3指派槽

   查看crc16算法算出key的槽位命令 cluster keyslot key

   16384/3 0-5461 5462-10922 10923-16383

   16384/4 4096

​    cluster addslots slot(槽位下标)

##### 6.3.4.2.4分配主从

​    cluster replicate node-id

### 6.3.5集群的扩容缩容

​         扩容缩容槽位迁移数据也跟着迁移

####       6.3.5.1扩容

​          ![](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1587020577395.png)

####       6.3.5.2缩容

​                ![](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1587020602107.png)

## 6.4.** **其他版本Redis集群**

豌豆荚的codis：**https://github.com/CodisLabs/codis**

Codis is a proxy based high performance Redis cluster solution written in Go. It is production-ready and widely used at **wandoujia.com** and many companies. You can see Codis Releases for latest and most stable realeases. 

**Codis架构图：**

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml7744\wps5.jpg) 

**其它版本的redis集群大家自己了解一下即可；**

## 6.5总结Redis集群的演变过程：

###  6.5.1单机版

​     核心技术：持久化-------->>作用：数据备份到硬盘，容灾备份

### 6.5.2主从复制

####     6.5.2.1简介

​                高可用redis的基础，哨兵和集群都是在复制基础上实现的高可用

​    复制主要实现了数据的多机备份，以及对于读操作的负载均衡和简单的故障恢复

​    缺陷是故障恢复无法自动化，写操作无法负载均衡，存储能力受单机限制

####     6.5.2.2复制缺点：复制延迟

​               由于所有的写操作都是先在Master上操作，然后同步更新到slave上，所有从Master同步到slave机器有一定的延迟，当系统很繁忙时，延迟问题会更加严重，Slave机器数量的增加也会使这个问题更加严重

### 6.5.3哨兵集群

####     6.5.3.1特点

​         在主从复制的基础上，哨兵实现了自动化的故障恢复，主从切换时节点不可用，因此存在数据丢失的问题

​         缺陷：写操作无法负载均衡，存储能力受到单机限制              

### 6.3.4 Rediscluster集群

​          通过集群，redis解决了写操作无法负载均衡，以及存储能力受单机限制的问题，较为完善的高可用方案

### 6.3.5操作集群原理

​           ![](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1587020702645.png)



# **7.** **Redis的事务**

## **7.1.** **Redis事务概述**

**Redis对事务的支持比较简单，它是一组命令的集合，命令被依次顺序的执行，也可以放弃事务的执行，此时所有事务里面的命令都不会执行。**

**Redis 只能保证一个client发起的事务中的命令可以连续的执行，而中间不会插入其他client的命令，因为Redis是单线程架构，所以在执行完事务内所有指令前是不可能再去同时执行其他客户端的请求的。**

**Redis的事务没****有隔离级别****的概念，因为事务提交前任何指令都不会被实际执行，也就不存在“事务内的查询要看到事务里的更新，在事务外查询不能看到”这种问题了。**

**Redis的事务****不保证原子性****，也就是不保证所有指令同时成功或同时失败，只有决定是否开始执行全部指令的能力，没有执行到一半进行回滚的能力。**

## **7.2.** **事务操作的基本命令**

**multi** : 设置事务开始

**exec** : 执行事务

**discard** : 放弃事务

**watch** : 监控键值，如果键值被修改或删除，后面的一个事务就不会执行

**unwatch** : 取消watch

**watch命令说明：**

**Redis使用watch来提供****乐观锁****；** 

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

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml7744\wps6.jpg) 

## **7.4.** **Redis事务的基本过程**

1.发送一个事务的命令multi给redis； 

2.依次把要执行的命令发送给redis，redis接到这些命令，并不会立即执行，而是放到等待执行的事务队列里面；

3.发送执行事务的命令exec给redis；

4.redis会保证一个事务内的命令依次执行，而不会被其它命令插入； 

## **7.5.** **Redis事务过程中的错误处理**

**redis 的事务非常简单，当然会存在一些问题。只能保证事务的每个命令连续执行，但是如果事务中的一个命令失败了，并不回滚其他命令，下面举例看错误处理；**

**1.如果是某个命令执行错误(使用方式错了)，那么其它的命令仍然会正常执行，然后在执行后返回错误信息；** 

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml7744\wps7.jpg) 

**2.如果任何一个命令语法有错，redis会直接返回错误，所有的命令都不会执行；**

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml7744\wps8.jpg) 

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

## 10.1实时同步

### 10.1.1spring-cache 数据库一致性解决方案

​          对强一致性要求高的，应采用实时同步方案，即查询缓存查询不到再到数据库查询，保存到缓存；更新缓存时，先更新数据库，再将缓存的设置过期（建议不要去更新缓存内容，直接设置缓存过期----- >避免缓存击穿）。

Spring缓存注解：

@Cacheable:存在缓存则直接返回,不存在则调用业务方法,保存到缓存

@CachePut：不管缓存存不存在,调用业务方法,将返回值set到缓存里面

@CacheEvict：清空缓存

@Caching：组合注解

原理：SpringAOP

![1587203185384](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1587203185384.png)

Spring默认是内置缓存ConcurrentHashMap

可以配置缓存管理器来指定为redis

### 10.1.2存在的问题

​        一致性问题

　　读数据的时候首先去Redis里读，没有读到再去MySQL里读，读回来之后更新到Redis里作为下一次的缓存。写数据的时候会产生数据不一致的问题，无论是先写到Redis里再写MySQL还是先写MySQL再写Redis，这两步写操作不能保证原子性，所以会出现Redis和MySQL里的数据不一致。无论采取何种方式都不能保证强一致性，如果对Redis里的数据设置了过期时间能够保证最终一致性，对架构做的优化只能降低不一致性发生的概率，不能从根本上避免不一致性。

​        <https://www.cnblogs.com/AshOfTime/p/10815593.html>



## 10.2非实时同步

### 10.2.1定时任务：

​        一篇文章1分钟内被点击100万次，更新redis缓存，定时任务每天凌晨两点同步到数据库

### 10.2.2异步队列：

​         对于并发程度高的，可以采用异步队列的方式同步，可采用Kafka、rabbitMq等消息中间件处理消息生产和消费。RabbitMq优点可靠性高，可以做到消息0丢失。

## 10.3阿里的同步工具canal

canal实现方式是模拟mysql slave和master的同步机制，监控DB bitlog的日志更新来触发缓存的更新，此方法可以解放程序员双手，减轻工作量，但使用时存在局限性

### 10.3.1Mysql主从复制原理

![](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1587133853251.png)

1.master将改变记录到二进制日志中（这些记录叫做二进制日志事件，binary log events,可以通过show binlog events进行查看）；

2.slave将master的binary log events拷贝到他的中继日志（relay log）

3.slave重做中继日志中的事件，将改变反映到自己的数据

### 10.3.2canal的工作原理

![1587136282683](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1587136282683.png)

1.canal模拟mysql salve的交互协议，伪装自己为mysql slave，向mysqll master发送dump协议

2.mysql master 收到dump请求，开始推送binary log给slave(也就是canal)

3.canal解析binary log对象（原始为byte流）

## 10.4采用UDF自定义函数的方式

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

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml7744\wps9.png)

## **Spring整合Redis**

 

## **spring-data-redis**

​    Spring-data-redis是spring大家族的一部分，提供了在srping应用中通过简单的配置访问redis服务，对reids底层开发包(Jedis, JRedis, and RJC)进行了高度封装，RedisTemplate提供了redis各种操作、异常处理及序列化，支持发布订阅，并对spring 3.1 cache进行了实现。

 spring-data-redis针对jedis提供了如下功能：

连接池自动管理，提供了一个高度封装的“RedisTemplate”类

