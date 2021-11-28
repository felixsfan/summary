本篇文章是阅读了官方文档和大量博客（质量参差不齐）后，根据自己的理解和实际操作总结而成；

> 对于基础理论部分，大部分直接引用他人的文档，主要目的是帮助快速了解airflow；
>
> 实践部分由于国内没有大面积使用，以及airflow的快速迭代，本人踩了很多坑，重点做一下总结

# 1. airflow简介

> 本节主要摘抄自各个博客，了解一下是啥即可

## 1.1 什么是 Airflow？

Airflow 是一个使用 python 语言编写的 data pipeline 调度和监控工作流的平台。 Airflow 是通过 DAG（Directed acyclic graph 有向无环图）来管理任务流程的任务调度工具， 不需要知道业务数据的具体内容，设置任务的依赖关系即可实现任务调度。

这个平台拥有和 Hive、Presto、MySQL、HDFS、Postgres 等数据源之间交互的能力，并且提供了钩子（hook）使其拥有很好地扩展性。 除了使用命令行，该工具还提供了一个 WebUI 可以可视化的查看依赖关系、监控进度、触发任务等。

## 1.2 Airflow 的架构

在一个可扩展的生产环境中，Airflow 含有以下组件：

### webserver

webserver 是一个守护进程，它接受 HTTP 请求，允许你通过 Python Flask Web 应用程序与 airflow 进行交互，webserver 提供以下功能： *中止、恢复、触发任务。* 监控正在运行的任务，断点续跑任务。 *执行 ad-hoc 命令或 SQL 语句来查询任务的状态，日志等详细信息。* 配置连接，包括不限于数据库、ssh 的连接等。

webserver 守护进程使用 gunicorn 服务器（相当于 java 中的 tomcat ）处理并发请求，可通过修改{AIRFLOW_HOME}/airflow.cfg文件中 workers 的值来控制处理并发请求的进程数。 例如：

```python
workers = 4 #表示开启4个gunicorn worker(进程)处理web请求
```

启动 webserver 守护进程：

```python
$ airfow webserver -D
```

### 元数据库

这个数据库存储有关任务状态的信息。**默认sqlLite数据库，生产环境配置成mysql**

### 调度器

Scheduler 是一种使用 DAG 定义结合元数据中的任务状态来决定哪些任务需要被执行以及任务执行优先级的过程。调度器通常作为服务运行。

scheduler 是一个守护进程，它周期性地轮询任务的调度计划，以确定是否触发任务执行。 启动的 scheduler 守护进程：

```python
$ airfow scheduler -D
```

### 执行器

Executor 是一个消息队列进程，它被绑定到调度器中，用于确定实际执行每个任务计划的工作进程。有不同类型的执行器，每个执行器都使用一个指定工作进程的类来执行任务。例如，LocalExecutor 使用与调度器进程在同一台机器上运行的并行进程执行任务。 其他像 CeleryExecutor 的执行器使用存在于独立的工作机器集群中的工作进程执行任务。

### Workers

worker 是一个守护进程，它启动 1 个或多个 Celery 的任务队列，**负责执行具体 的 DAG 任务**。

当设置 airflow 的 executors 设置为 CeleryExecutor 时才需要开启 worker 守护进程。推荐你在生产环境使用 CeleryExecutor ：

```python
executor = CeleryExecutor
```

启动一个 worker守护进程，默认的队列名为 default:

```python
$ airfow worker -D
```

### flower

flower 是一个守护进程，用于是监控 celery 消息队列。启动守护进程命令如下：

```python
$ airflow flower -D
```

默认的端口为 5555，您可以在浏览器地址栏中输入 "[http://hostip:5555](https://link.zhihu.com/?target=http%3A//hostip%3A5555)" 来访问 flower ，对 celery 消息队列进行监控。

## 1.3 各个组件的关系

**以下是各个组件的关系,值得注意的是，各个组件可以分布到同一个或多个不同机器上，从而实现分布式集群部署来实现高可用和减少各种依赖**，实践部分会写到单机部署和分布式集群部署

![img](https://img-blog.csdnimg.cn/20200317114128891.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpaHVpZmVuMjAxMQ==,size_16,color_FFFFFF,t_70)

## 1.4 Airflow 解决哪些问题

通常，在一个运维系统，数据分析系统，或测试系统等大型系统中，我们会有各种各样的依赖需求。包括但不限于：

- 时间依赖：任务需要等待某一个时间点触发。
- 外部系统依赖：任务依赖外部系统需要调用接口去访问。
- 任务间依赖：任务 A 需要在任务 B 完成后启动，两个任务互相间会产生影响。 资源环境依赖：任务消耗资源非常多， 或者只能在特定的机器上执行。

crontab 可以很好地处理定时执行任务的需求，但仅能管理时间上的依赖。

## 1.5 Airflow 在 ETL 上的实践

ETL，是英文 Extract，Transform，Load 的缩写，用来描述将数据从来源端经过抽取（extract）、转换（transform）、加载（load）至目的端的过程。 ETL 一词较常用在数据仓库，Airflow 在解决 ETL 任务各种依赖问题上的能力恰恰是我们所需要的。

在现阶段的实践中，我们使用 Airflow 来同步各个数据源数据到数仓，同时定时执行一些批处理任务及带有数据依赖、资源依赖关系的计算脚本。

## 1.6 相关概念

### **DAGs**

有向无环图(Directed Acyclic Graph)，是将所有需要运行的Task按照依赖组合起来，描述的是所有Task执行的顺序和依赖关系。

```python
dag = DAG('testFile', default_args=default_args)

# t1, t2 and t3 are examples of tasks created by instantiating operators
t1 = BashOperator(   #任务类型是bash
    task_id='echoDate', #任务id
    bash_command='echo date > /home/datefile', #任务命令
    dag=dag)

t2 = BashOperator(
    task_id='sleep',
    bash_command='sleep 5',
    retries=3,[]()
    dag=dag)

t2.set_upstream(t1) #定义任务信赖，任务2依赖于任务1
```

### **Tasks**

task定义任务的类型、任务内容、任务所依赖的dag等。dag中每个task都要有不同的task_id

### **Operators**

操作器，定义任务该以哪种方式执行。airflow有多种operator,如BashOperator、DummyOperator、MySqlOperator、HiveOperator以及社区贡献的operator等，其中BaseOperator是所有operator的基础operator。

```python
t1 = BashOperator(   #任务类型是bash
    task_id='echoDate', #任务id
    bash_command='echo date > /home/datefile', #任务命令
    dag=dag)
```

### **Task Instance**

task的一次运行。Web 界面中可以看到task instance 有自己的状态，包括"running", "success", "failed", "skipped", "up for retry"等。

### **Task Relationships**

DAGs中的不同Tasks之间可以有依赖关系，如 Task1 >> Task2，表明Task2依赖于Task2了。

## 1.7 airflow 的守护进程是如何一起工作的？

需要注意的是 airflow 的守护进程彼此之间是独立的，他们并不相互依赖，也不相互感知。每个守护进程在运行时只处理分配到自己身上的任务，他们在一起运行时，提供了 airflow 的全部功能。

1. 调度器 scheduler 会间隔性的去轮询元数据库（Metastore）已注册的 DAG（有向无环图，可理解为作业流）是否需要被执行。如果一个具体的 DAG 根据其调度计划需要被执行，scheduler 守护进程就会先在元数据库创建一个 DagRun 的实例，并触发 DAG 内部的具体 task（任务，可以这样理解：DAG 包含一个或多个task），触发其实并不是真正的去执行任务，而是推送 task 消息至消息队列（即 broker）中，每一个 task 消息都包含此 task 的 DAG ID，task ID，及具体需要被执行的函数。如果 task 是要执行 bash 脚本，那么 task 消息还会包含 bash 脚本的代码。
2. 用户可能在 webserver 上来控制 DAG，比如手动触发一个 DAG 去执行。当用户这样做的时候，一个DagRun 的实例将在元数据库被创建，scheduler 使同 #1 一样的方法去触发 DAG 中具体的 task 。
3. worker 守护进程将会监听消息队列，如果有消息就从消息队列中取出消息，当取出任务消息时，**它会更新元数据中的 DagRun 实例的状态为正在运行，并尝试执行 DAG 中的 task**，如果 DAG 执行成功，则更新任 DagRun 实例的状态为成功，否则更新状态为失败。

# 2. 单台机器安装部署

## 2.1 环境

**Anaconda（python3.7）**

```python
(python37) [root@VM-236-231-centos ~/airflow]# python -V
Python 3.7.10
```

**airflow(2.1.2)**

```
(python37) [root@VM-236-231-centos ~/airflow]# airflow version
2.1.2
```

**mysql(5.7.35)**

```mysql
(python37) [root@VM-236-231-centos ~/airflow]# mysql -uroot -p123456
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 37
Server version: 5.7.35 MySQL Community Server (GPL)
```

不要使用云数据库，因为后面修改配置需要super权限，云数据库无法修改；建议自己yum安装mysql即相关的软件包（GCC等）

**redis**

没有特别要求

## 2.2 安装mysql

```sh
#卸载mariadb
rpm -qa | grep mariadb
rpm -e --nodeps mariadb-libs-5.5.52-1.el7.x86_64
#sudo rpm -e --nodeps mariadb-libs-5.5.52-1.el7.x86_64
rpm -qa | grep mariadb
```

```sh
#下载mysql的repo源
wget -P /root http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
#通过rpm安装
rpm -ivh mysql-community-release-el7-5.noarch.rpm
#安装mysql
yum install mysql-server
#授权
chown -R mysql:mysql /var/lib/mysql
#查看mysql安装位置

#开启Mysql服务
service mysqld start
#第一次安装获取默认密码
grep 'temporary password' /var/log/mysqld.log
#用root用户连接登录mysql:
mysql -uroot  -p“默认密码”
#提示重置mysql密码，并有格式限制，可以修改配置文件取消格式限制
update user set password='123456' where user='root';
flush privileges;
```

```sh
#为Airflow建库、建用户
#建库:
create database airflow;
#建用户:
create user 'airflow'@'%' identified by 'airflow';
create user 'airflow'@'localhost' identified by 'airflow';
#为用户授权，很容易遗忘，让airflow所在的机器可以访问到mysql
grant all on airflow.* to 'airflow'@'%';
grant all on airflow.* to 'root'@'%';
flush privileges;

#设置MySQL对null的处理，只有super可以修改
set explicit_defaults_for_timestamp = 1;
#开启timestamp ，数据更新时添加上当前时间
set @@global.explicit_defaults_for_timestamp=on;
# 重启mysql服务
systemctl restart mysqld
```

## 2.3 安装开发库

```shell
yum install python3-devel

yum install libevent-devel

yum install mysql-devel #开发所需的链接库和头文件

yum install gcc 

```

## 2.4 安装airflow

```shell
# 安装最新的稳定版本
pip install apache-airflow==2.1.2
```

## 2.5 安装airflow组件

```sh
# Airflow 的一些别的支持功能组件,更具需要安装，可以全部安装
pip install apache-airflow[all]
#安装mysql组件经常出现问题，下面单独讲解
pip install apache-airflow[kubernetes]
pip install apache-airflow[mysql] #重点
pip install apache-airflow[celery]
pip install apache-airflow[redis]
```

```shell
# 顺便安装cryptography，#避免之后产生错误
(python37) [root@VM-236-231-centos ~/airflow] pip install cryptography

#airflow.exceptions.AirflowException: Could not create Fernet object: Incorrect padding
#需要修改airflow.cfg (默认位于~/airflow/)里的fernet_key，修改方法
(python37) [root@VM-236-231-centos ~/airflow]# python -c "from cryptography.fernet import Fernet; 
> print(Fernet.generate_key().decode())"
BypegKsvJ6T_w3byFmf-zcmYvK38k7DnwG-aL4HYH6g=
#这个命令生成一个key，复制这个key然后替换airflow.cfg文件里的fernet_key的值
```

## 2.6 初始化Airflow默认数据库

在运行任务之前，Airflow需要初始化数据库

由于版本不同，airflow的命令发生了变化，可以看到`airflow initdb`提示错误，但是会提示正确的命令

```shell
# 初始化数据库
airflow db init
```

初始化数据库后自动会在～目录下生成airflow文件夹

```sh
(python37) [root@VM-236-231-centos ~/airflow]# ls
airflow.cfg  airflow.db  logs  webserver_config.py
```

## 2.7 配置环境变量

**默认可配可不配，~/airflow为默认路径，如果换文件路径的话需要，一定要配置**

```sh
#添加编辑环境变量
vi /etc/profile或~/.bashrc
#添加 
export AIRFLOW_HOME=～/airflow
export SITE_AIRFLOW_HOME=/anaconda3/lib/python3.7/site-packages/airflow
export PATH=$PATH:$SITE_AIRFLOW_HOME/bin
#生效环境变量
source /etc/profile
```

## 2.8 安装数据库驱动

我们使用Django、flask等来操作MySQL，实际上底层还是通过Python来操作的。因此我们想要用Django来操作MySQL，首先还是需要安装一个驱动程序。在Python3中，驱动程序有多种选择。比如有pymysql以及mysqlclient等。
常见的Mysql驱动介绍：

- MySQL-python：也就是MySQLdb。是对C语言操作MySQL数据库的一个简单封装。遵循了Python DB API v2。但是只支持Python2，目前还不支持Python3。
- mysqlclient：是MySQL-python的另外一个分支。支持Python3并且修复了一些bug。
- pymysql：纯Python实现的一个驱动。因为是纯Python编写的，因此执行效率不如MySQL-python。并且也因为是纯Python编写的，因此可以和Python代码无缝衔接。
- MySQL Connector/Python：MySQL官方推出的使用纯Python连接MySQL的驱动。因为是纯Python开发的。效率不高。

```shell
###########重点python2安装MySQLdb，python3安装python-mysql###############
(python37) [root@VM-236-231-centos ~/airflow] pip install pymysql/mysqlclient/mysql-connector 
```

#### 错误一

```shell
#出现报错：
ERROR: Command errored out with exit status 1:
     command: /root/anaconda3/envs/python37/bin/python -c 'import io, os, sys, setuptools, tokenize; sys.argv[0] = '"'"'/tmp/pip-install-hjyokk9w/mysqlclient_e2b6add2cb9f4124885048ee13706239/setup.py'"'"'; __file__='"'"'/tmp/pip-install-hjyokk9w/mysqlclient_e2b6add2cb9f4124885048ee13706239/setup.py'"'"';f = getattr(tokenize, '"'"'open'"'"', open)(__file__) if os.path.exists(__file__) else io.StringIO('"'"'from setuptools import setup; setup()'"'"');code = f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base /tmp/pip-pip-egg-info-5bl5al18
         cwd: /tmp/pip-install-hjyokk9w/mysqlclient_e2b6add2cb9f4124885048ee13706239/
    Complete output (10 lines):
    /bin/sh: mysql_config: command not found
    Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "/tmp/pip-install-hjyokk9w/mysqlclient_e2b6add2cb9f4124885048ee13706239/setup.py", line 17, in <module>
        metadata, options = get_config()
      File "/tmp/pip-install-hjyokk9w/mysqlclient_e2b6add2cb9f4124885048ee13706239/setup_posix.py", line 44, in get_config
        libs = mysql_config("libs_r")
      File "/tmp/pip-install-hjyokk9w/mysqlclient_e2b6add2cb9f4124885048ee13706239/setup_posix.py", line 26, in mysql_config
        raise EnvironmentError("%s not found" % (mysql_config.path,))
    OSError: mysql_config not found
    ----------------------------------------
#解决方案,查看是否有mysql_config文件
(python37) [root@VM-236-231-centos ~/airflow] find / -name mysql_config
#如果没有
(python37) [root@VM-236-231-centos ~/airflow] yum -y install mysql-devel
#安装完成后再次验证是否有mysql_config
(python37) [root@VM-236-231-centos ~/airflow] find / -name mysql_config
/usr/bin/mysql_config
```

## 2.9 修改airflow.cfg(重点)

所有关于airflow运行需要配置的东西都在配置

### 数据库

```ini
# sql_alchemy_conn配置,元数据库配置，默认sqllite
# sql_alchemy_conn = 数据库+数据驱动：//用户：密码@主机IP：端口/airflow
# 测试了一下，加不加驱动都行，但最好加上
sql_alchemy_conn = mysql+pymysql://root:123456@localhost:3306/airflow


#为避免初始化数据库时有如下报错
#Global variable explicit_defaults_for_timestamp needs to be on (1) for mysql
#修改MySQL配置文件my.cnf
#查找my.cnf位置
mysql --help | grep my.cnf
#修改my.cnf
vi /etc/my.cnf
#在[mysqld]下面（一定不要写错地方）添加如下配置:
explicit_defaults_for_timestamp=true
#重启mysql服务使配置生效
service mysqld restart
#检查配置是否生效
mysql -uroot -proot
mysql> select @@global.explicit_defaults_for_timestamp;
+------------------------------------------+
| @@global.explicit_defaults_for_timestamp |
+------------------------------------------+
|                                        1 |
+------------------------------------------+
1 row in set (0.00 sec)
```

### 执行器

```ini
#SequentialExecutor是单进程顺序执行任务，默认执行器，通常只用于测试
#LocalExecutor是多进程本地执行任务使用的
#CeleryExecutor是分布式调度使用（当然也可以单机），生产环境常用
#DaskExecutor则用于动态任务调度，常用于数据分析
executor = CeleryExecutor
```

### 时区

```ini
#修改airflow.cfg中
default_timezone = Asia/Shanghai
```

### redis充当中间人broker

broker官方推荐使用rabbitmq

```ini
#使用数据库 0
# broker_url = redis://:密码@主机IP:端口/数据库
broker_url = redis://:HRzMs*7562kJRt@9.135.111.65:6380/0
# 设定结果存储后端 backend
result_backend = redis://:HRzMs*7562kJRt@9.135.111.65:6380/1 
或
celery_result_backend = db+mysql://{USERNAME}:{PASSWORD}@{MYSQL_HOST}:3306/airflow
```

### 修改scheduler线程数控制并发量

```ini
parallelism = 32
```

### 修改检测新DAG间隔

```ini
min_file_process_interval = 5
```

## 2.9 添加用户认证

### 方式一

会出现airflow.contrib.auth.backends.password_auth不存在的情况，网上说pip install airflow[' XXX']安装，试了没有效果

```shell
#在这里我们采用简单的password认证方式
#（1）安装password组件:
sudo pip install apache-airflow[password]
```

```shell
#（2）修改airflow.cfg配置文件:
[webserver]
authenticate = True
auth_backend = airflow.contrib.auth.backends.password_auth
```

```python
#（3）编写python脚本用于添加用户账号:
#编写add_account.py文件：
import airflow
from airflow import models, settings
from airflow.contrib.auth.backends.password_auth import PasswordUser

user = PasswordUser(models.User())
user.username = 'airflow'
user.email = 'test_airflow@wps.cn'
user.password = 'airflow'

session = settings.Session()
session.add(user)
session.commit()
session.close()
exit()
#执行add_account.py文件：
python add_account.py
#你会发现mysql元数据库表user中会多出来一条记录的。

```

```shell
# 报错
ModuleNotFoundError: No module named 'airflow.contrib.auth'
```

### 方式二

```ini
#（1）修改airflow.cfg配置文件:
# 如果在[webserver]里面有 authenticate 和 auth_backend 的配置，就必须先将其注释掉了
[webserver]
security = Flask AppBuilder
secure_mode = True
rbac=True
```

```shell
#（2）添加配置之后，需要重建数据库表： :
airflow  db reset
```

```shell
#(3)添加用户
airflow users create --lastname fan --firstname felixs --username felixsfan --email felixsfan@tencent.com --role Admin --password 123456
```

## 2.10 初始化mysql源数据库及启动组件

```sh
airflow db init # 初始化
airflow db reset # 重置数据库
```

前面的步骤已经避免了大部分坑，这里列举几个常见的错误

### 错误一

```shell
Global variable explicit_defaults_for_timestamp needs to be on (1) for mysql
解决方法：
# 进入mysql airflow 数据库，设置global explicit_defaults_for_timestamp
mysql>  show global variables like '%timestamp%';
+---------------------------------+-------+
| Variable_name                   | Value |
+---------------------------------+-------+
| explicit_defaults_for_timestamp | OFF   |
| log_timestamps                  | UTC   |
+---------------------------------+-------+
2 rows in set (0.00 sec)

mysql> set global explicit_defaults_for_timestamp =1;
Query OK, 0 rows affected (0.00 sec)
```

### 错误二

```shell
ModuleNotFoundError: No module named 'MySQLdb'
```

```shell
NameError: name ‘_mysql‘ is not defined
```

以上两个错误是python3不支持mysqldb驱动，不用`mysqldb`驱动，使用`pymsql`或`mysqlconnector`

## 2.12 启动

```shell
# 前台启动web服务
airflow webserver 
# 后台启动web服务
nohup airflow webserver > /dev/null 2>&1 &

# 前台启动scheduler 
airflow scheduler

# 后台启动scheduler
nohup airflow scheduler > /dev/null 2>&1 &

```

```sh
# 后台启动worker
nohup airflow celery worker > /dev/null 2>&1 &
(python37) [root@VM-236-231-centos ~/airflow]# airflow celery worker -D
[2021-08-18 09:58:45,623] {default_celery.py:100} WARNING - You have configured a result_backend of redis://HRzMs*7562kJRt@9.135.111.65:6380/1, it is highly recommended to use an alternative result_backend (i.e. a database).
#提示建议result_backend使用数据库，而不是redis
```

## 2.13 docker的操作

```shell
# 把配置好的docker容器提交成镜像
docker commit -m="airflow集群" -a="felixsfan" b92f219c95a6 airflow_sett:0.1.7
# 启动镜像，命名matser，添加端口映射、数据卷
docker run -it -p8080:8080 --name="master" -v /root/airflow:/root/airflow airflow_sett:0.1.7 /bin/bash
# 启动镜像，命名worker1，添加端口映射、数据卷
docker run -it -p8793:8793 --name="worker1" -v /root/airflow:/root/airflow airflow_sett:0.1.7 /bin/bash
# 查看正在运行的容器
docker ps
# 进入正在运行的容器worker1
docker attach 88b00494ed45
# 进入正在运行的容器master
docker attach 8ace0861c254
```

## 2.14 出现的问题记录

### 1.容器访问宿主mysql

```shell
[root@VM-236-231-centos ~/airflow]# ifconfig
docker0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.10.1  netmask 255.255.255.0  broadcast 192.168.10.255
        ether 02:42:69:d5:a5:ad  txqueuelen 0  (Ethernet)
        RX packets 31049191  bytes 7702769733 (7.1 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 30044736  bytes 11297295660 (10.5 GiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 9.134.236.231  netmask 255.255.248.0  broadcast 9.134.239.255
        ether 52:54:00:85:13:60  txqueuelen 1000  (Ethernet)
        RX packets 34519507  bytes 25937153899 (24.1 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 17848441  bytes 2995336733 (2.7 GiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

有进行容器间及和宿主通信的虚拟网卡IP192.168.10.X

### 2.找不到主机名

 **在master节点上，通过webserver无法查看远程执行的任务日志**

![主机名映射1](/Users/fanqingwei/Desktop/airflow/images/主机名映射1.png)

master的webserver去worker去运行日志，现实到前端，是通过worker的主机名去找的，需要添加一下主机名映射IP

![主机名映射2](/Users/fanqingwei/Desktop/airflow/images/主机名映射2.png)

### 3.使用mysql-connector驱动，启动scheduler报错

```shell
sql_alchemy_conn = mysql+mysqlconnector://root:123456@192.168.10.1:3306/airflow
```

```shell
(python37) [root@88b00494ed45 airflow]# airflow scheduler
[2021-10-11 03:00:20,519] {settings.py:51} INFO - Configured default timezone Timezone('Asia/Shanghai')
[2021-10-11 03:00:20,524] {scheduler_job.py:1315} ERROR - Exception when executing SchedulerJob._run_scheduler_loop
Traceback (most recent call last):
  File "/root/anaconda3/envs/python37/lib/python3.7/site-packages/mysql/connector/conversion.py", line 179, in to_mysql
    return getattr(self, "_{0}_to_mysql".format(type_name))(value)
AttributeError: 'MySQLConverter' object has no attribute '_dagruntype_to_mysql'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/root/anaconda3/envs/python37/lib/python3.7/site-packages/mysql/connector/cursor.py", line 395, in _process_params_dict
    conv = to_mysql(conv)
  File "/root/anaconda3/envs/python37/lib/python3.7/site-packages/mysql/connector/conversion.py", line 182, in to_mysql
    "MySQL type".format(type_name))
TypeError: Python 'dagruntype' cannot be converted to a MySQL type

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/root/anaconda3/envs/python37/lib/python3.7/site-packages/sqlalchemy/engine/base.py", line 1277, in _execute_context
    cursor, statement, parameters, context
  File "/root/anaconda3/envs/python37/lib/python3.7/site-packages/sqlalchemy/engine/default.py", line 608, in do_execute
    cursor.execute(statement, parameters)
  File "/root/anaconda3/envs/python37/lib/python3.7/site-packages/mysql/connector/cursor.py", line 537, in execute
    stmt, self._process_params_dict(params))
  File "/root/anaconda3/envs/python37/lib/python3.7/site-packages/mysql/connector/cursor.py", line 404, in _process_params_dict
    "Failed processing pyformat-parameters; %s" % err)
mysql.connector.errors.ProgrammingError: Failed processing pyformat-parameters; Python 'dagruntype' cannot be converted to a MySQL type
```

<img src="/Users/fanqingwei/Desktop/airflow/images/问题3.png" alt="问题3" style="zoom:50%;" />

解决方案：

1.使用pymysql

```shell
sql_alchemy_conn = mysql+pymysql://root:123456@192.168.10.1:3306/airflow
```

2.使用mysqlclient

```shell
sql_alchemy_conn = mysql://root:123456@192.168.10.1:3306/airflow
```

### 4.用pymysql驱动出现的问题

<img src="/Users/fanqingwei/Desktop/airflow/images/问题1.png" alt="问题1" style="zoom:50%;" />

### 5.最终解决

使用mysqlclient

```shell
sql_alchemy_conn = mysql://root:123456@192.168.10.1:3306/airflow
```

## 2.15 总结

**以上是在单台机器上部署安装。但是执行器使用了CeleryExecutor，加入了redis（消息队列），目的主要是走一遍集群部署流程，后面在多台机器机器上重复上述安装配置airflow的步骤,根据需要启动不同的守护进程即可**

# 3. 生产环境架构

单机和集群部署除了涉及多个机器，基本上步骤和配置差不多，都配置同一个元数据库和消息队列，本人不善言辞直接使用别人的博客

来源于博客https://zhuanlan.zhihu.com/p/44768244

## 3.1 单机版

![](/Users/fanqingwei/Desktop/airflow/images/单机架构.png)

将以所有上守护进程运行在同一台机器上即可完成 airflow 的单结点部署，架构如下图所示，

## 3.2 airflow 多节点（集群）部署

在稳定性要求较高的场景，如金融交易系统中，一般采用集群、高可用的方式来部署。Apache Airflow 同样支持集群、高可用的部署，airflow 的守护进程可分布在多台机器上运行，架构如下图所示：

![集群架构](/Users/fanqingwei/Desktop/airflow/images/集群架构.png)

如果一个 worker 节点崩溃或离线时，集群仍可以被控制的，其他 worker 节点的任务仍会被执行。

- 分布式处理

如果你的工作流中有一些内存密集型的任务，任务最好是分布在多台机器上运行以便得到更快的执行。

## 3.3 扩展 worker 节点

- 水平扩展 你可以通过向集群中添加更多 worker 节点来水平地扩展集群，并使这些新节点指向同一个元数据库，从而分发处理过程。由于 worker 不需要在任何守护进程注册即可执行任务，因此所以 worker 节点可以在不停机，不重启服务下的情况进行扩展，也就是说可以随时扩展。
- 垂直扩展 你可以通过增加单个 worker 节点的守护进程数来垂直扩展集群。可以通过修改 airflow 的配置文件-{AIRFLOW_HOME}/airflow.cfg 中 celeryd_concurrency 的值来实现，例如：

```python
celeryd_concurrency = 30
```

您可以根据实际情况，如集群上运行的任务性质，CPU 的内核数量等，增加并发进程的数量以满足实际需求。

## 3.4 扩展 Master 节点

您还可以向集群中添加更多主节点，以扩展主节点上运行的服务。您可以扩展 webserver 守护进程，以防止太多的 HTTP 请求出现在一台机器上，或者您想为 webserver 的服务提供更高的可用性。需要注意的一点是，每次只能运行一个 scheduler 守护进程。如果您有多个 scheduler 运行，那么就有可能一个任务被执行多次。这可能会导致您的工作流因重复运行而出现一些问题。 下图为扩展 Master 节点的架构图：

![扩展master](/Users/fanqingwei/Desktop/airflow/images/扩展master.png)

## 3.5 scheduler 的高可用

我们可以在两台机器上部署 scheduler ，只运行一台机器上的 scheduler 守护进程 ，一旦运行 scheduler 守护进程的机器出现故障，立刻启动另一台机器上的 scheduler 即可。我们可以借助第三方组件 **airflow-scheduler-failover-controller** 实现 scheduler 的高可用。

![failover](/Users/fanqingwei/Desktop/airflow/images/failover.png)

## 3.6 队列服务及元数据库(Metestore)的高可用

队列服务取决于使用的消息队列是否可以高用可部署，如 RabbitMQ 和 Redis。 RabbitMQ 集群并配置Mirrored模式

元数据库(Metestore) 取决于所使用的数据库，如 Mysql 等，Mysql 做主从备份

# 4. airflow 集群部署的具体步骤

根据实际需要选择机器的数量，我实际使用了两台机器：master节点运行webserver、scheduler, work节点运行worker，dev上申请一个云redis,master安装一个mysql

## 4.1 前提条件

- 节点运行的守护进程如下:

- - master1

  - - 运行: webserver, scheduler

- - master2

  - - 运行：webserver

- - worker1

  - - 运行：worker

- - worker2

  - - 运行：worker

- 队列服务处于运行中. (RabbitMQ, Redis, etc)

- - 安装 RabbitMQ 方法
  - 如果正在使用 RabbitMQ, 推荐 RabbitMQ 也做成高可用的集群部署，并为 RabbitMQ 实例配置负载均衡。

## 4.2 步骤 

1.在**所有**需要运行守护进程的机器上安装 Apache Airflow。具体安装方法见`第二章`

2.修改 {AIRFLOW_HOME}/airflow.cfg 文件，确保**所有机器**使用同一份配置文件。

3.修改 Executor 为 CeleryExecutor

```python
executor = CeleryExecutor
```

- 指定元数据库（metestore)

```python
sql_alchemy_conn = mysql://{USERNAME}:{PASSWORD}@{MYSQL_HOST}:3306/airflow
```

- 设置中间人（broker)

如果使用 RabbitMQ

```python
broker_url = amqp://guest:guest@{RABBITMQ_HOST}:5672/
```

如果使用 Redis

```python
broker_url = redis://:密码{REDIS_HOST}:6379/0  #使用数据库 0
```

- 设定结果存储后端 backend

```python
celery_result_backend = db+mysql://{USERNAME}:{PASSWORD}@{MYSQL_HOST}:3306/airflow #当然您也可以使用 Redis :celery_result_backend =redis://{REDIS_HOST}:6379/1
```

4.在 master1 和 master2 上部署您的工作流（DAGs）。

5.在 master 1，初始 airflow 的元数据库

```python
$ airflow db init
```

6.在 master1, 启动相应的守护进程

```python
$ airflow webserver
$ airflow scheduler
```

7.在 master2，启动 Web Server

```python
$ airflow webserver
```

8.在 worker1 和 worker2 启动 worker

```python
$ airflow celery worker -D
```

9.使用负载均衡处理 webserver 可以使用 nginx，AWS 等服务器处理 webserver 的负载均衡，不在此详述

## 4.3 注意

每台机器上Dags的任务配置必须一样，不然会出现奇奇怪怪的错误。这里提供一个思路，把Dags配置即业务代码放到远程github上，多台机器上监听github提交，拉去最新配置

# 5. 常见问题排坑

## 5.1 UTC时间问题

前端页面、日志、以及数据库中的任务元数据，默认都是UTC时间，即使修改了系统配置项，也还是有部分显示依然是UTC时间。原因主要考虑点是本地时间机制无法解决夏令时切换问题。

待总结

## 5.2 airflow worker 角色不能使用根用户启动

- 原因：不能用根用户启动的根本原因，在于airflow的worker直接用的celery，而celery 源码中有参数默认不能使用ROOT启动，否则将报错

```text
    C_FORCE_ROOT = os.environ.get('C_FORCE_ROOT', False)

    ROOT_DISALLOWED = """\
    Running a worker with superuser privileges when the
    worker accepts messages serialized with pickle is a very bad idea!

    If you really want to continue then you have to set the C_FORCE_ROOT
    environment variable (but please think about this before you do).

    User information: uid={uid} euid={euid} gid={gid} egid={egid}
    """

    ROOT_DISCOURAGED = """\
    You're running the worker with superuser privileges: this is
    absolutely not recommended!

    Please specify a different user using the --uid option.

    User information: uid={uid} euid={euid} gid={gid} egid={egid}
    """
```

- 解决方案一：修改airlfow源码，在celery_executor.py中强制设置C_FORCE_ROOT

```text
	from celery import Celery, platforms 
	在app = Celery(…)后新增 
	platforms.C_FORCE_ROOT = True
	重启即可 
```

- 解决方案二：在容器初始化环境变量的时候，设置C_FORCE_ROOT参数，以零侵入的方式解决问题

```text
 强制celery worker运行采用root模式
 export C_FORCE_ROOT=True
```

