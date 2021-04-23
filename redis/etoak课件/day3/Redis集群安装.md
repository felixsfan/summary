## 安装Redis集群
    1. 安装方式：在一台机器上搭建集群
    2. 安装要求：最少有三个主节点三个从节点
    
    2. 前置：
    - 在/opt目录下创建cluster目录
    - 在/opt/cluster目录下依次创建6001、6002、6003、6004、6005、6006六个目录
    - 先将一个redis.conf复制/opt/cluster/6001下

    3. 修改redis.conf文件
     3.1. bind 192.168.179.129  
     3.2. protected-mode no
     3.3. daemonize yes
     3.4. port 600*   端口号，依次修改为6001、6002、6003、6004、6005、6006
     3.5. pidfile "/var/run/redis_600*.pid" 由于是在同一台机器上，所以pid文件也要修改
     3.6. logfile "/opt/cluster/600*/redis.log"
     3.7. dir "/opt/cluster/600*"  持久化文件等的存储位置
     3.8. appendonly yes   开启aof持久化
     3.9. cluster-enabled yes  启动集群模式
     3.10. cluster-config-file nodes-600*.conf   这个文件用于保存集群信息，文件会自动生成到上面dir配置的目录下

    4. 按次序启动每一个节点
	 /opt/redis-5.0.4/src/redis-server /opt/cluster/6001/redis.conf
	 /opt/redis-5.0.4/src/redis-server /opt/cluster/6002/redis.conf
	 /opt/redis-5.0.4/src/redis-server /opt/cluster/6003/redis.conf
	 /opt/redis-5.0.4/src/redis-server /opt/cluster/6004/redis.conf
	 /opt/redis-5.0.4/src/redis-server /opt/cluster/6005/redis.conf
	 /opt/redis-5.0.4/src/redis-server /opt/cluster/6006/redis.conf
  
    5. 创建集群
      /opt/redis-5.0.4/src/redis-cli --cluster create 192.168.179.129:6001 192.168.179.129:6002 192.168.179.129:6003 192.168.179.129:6004 192.168.179.129:6005 192.168.179.129:6006 --cluster-replicas 1

    6. 登录集群
     /opt/redis-5.0.4/src/redis-cli -h 192.168.179.129 -p 8000 -c

     -h：指定机器的ip
     -p：端口号
     -c：表示以集群方式登录

   
    计算hash槽的槽号:cluster keyslot age