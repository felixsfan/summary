http://c.biancheng.net/view/7490.html

# 1. MySQL常用指令

## 1.1 数据库查询模版

```sql
select 列1 as 别名1, 列2 as 别名2 ,...
from 表1 as 表名1 left join 表2 as 表名2 on 表名1.字段=表名2.字段 ...
where 条件1 and/or 条件2 and/or?...
group by 列
having 条件1 and/or 条件2 and/or ...
order by 列1, 列2,...
limit m,n ; 从m处开始获取n条
```

### 1.1.1 语句执行步骤

**mysql select， from ，join ，on ，where groupby,having ,order by limit的执行顺序和书写顺序**

| 关键字或 解释           | 执行顺序 |
| ----------------------- | -------- |
| select 查询列表（字段） | 第七步   |
| from 表                 | 第一步   |
| 连接类型 join 表2       | 第二步   |
| on 连接条件             | 第三步   |
| where 筛选条件          | 第四步   |
| group by 分组列表       | 第五步   |
| having 分组后的筛选条件 | 第六步   |
| order by 排序列表       | 第八步   |
| limit 偏移 ，条目数     | 第九步   |

## 1.2 mysql创建表

```mysql
CREATE TABLE t_quanminkge_jiaochang_detail_data (
  date varchar(10) NOT NULL DEFAULT '',
  seq_no varchar(64) NOT NULL DEFAULT '',
  tran_type varchar(32) NOT NULL DEFAULT '',
  real_tran_amt double(15,4) NOT NULL DEFAULT '0.0000',
  tran_amt double(15,4) NOT NULL DEFAULT '0.0000',
  fpay_chan varchar(10) NOT NULL DEFAULT '',
  spoa_id varchar(20) NOT NULL DEFAULT '',
  posid varchar(20) NOT NULL DEFAULT '',
  source_top varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (date,seq_no)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```

## 1.3 mysql查询建表语

```sql
show create table 表名;
```

## 1.4 查询表的字段信息

```sql
desc t_cp_sett_task;
```

## 1.5 查到的结构旋转90度变成纵向 

```mysql
select * from t_source_6666 limit 1 /G;
```

## 1.6 mysql修改表



## 1.8 mysql导出sql文件

`mysqldump` 是 `MySQL` 自带的逻辑备份工具。

它的备份原理是通过协议连接到 `MySQL` 数据库，将需要备份的数据查询出来，将查询出的数据转换成对应的`insert` 语句，当我们需要还原这些数据时，只要执行这些 `insert` 语句，即可将对应的数据还原。

### 1.8.1 命令格式

```sql
mysqldump [选项] 数据库名 [表名] > 脚本名
```

或

```sql
mysqldump [选项] --databases [选项 表名] > 脚本名
```

或

```sql
mysqldump [选项] --all-databases [选项]  > 脚本名
```

### 1.8.2 选项说明

| 参数名                          | 缩写 | 含义                          |
| ------------------------------- | ---- | ----------------------------- |
| --host                          | -h   | 服务器IP地址                  |
| --port                          | -P   | 服务器端口号                  |
| --user                          | -u   | MySQL 用户名                  |
| --pasword                       | -p   | MySQL 密码                    |
| --databases                     |      | 指定要备份的数据库            |
| --all-databases                 |      | 备份mysql服务器上的所有数据库 |
| --compact                       |      | 压缩模式，产生更少的输出      |
| --comments                      |      | 添加注释信息                  |
| --complete-insert               |      | 输出完成的插入语句            |
| --lock-tables                   |      | 备份前，锁定所有数据库表      |
| --no-create-db/--no-create-info |      | 禁止生成创建数据库语句        |
| --force                         |      | 当出现错误时仍然继续备份操作  |
| --default-character-set         |      | 指定默认字符集                |
| --add-locks                     |      | 备份数据库表时锁定数据库表    |

### 1.8.3 实例

备份所有数据库：

```sql
mysqldump -uroot -psett123 --all-databases > /backup/mysqldump/all.sql
```

备份指定数据库：

```sql
mysqldump -uroot -psett123 --databases test > /backup/mysqldump/test.sql
```

**备份指定数据库指定表(多个表以空格间隔)**

```sql
mysqldump --default-character-set=utf8  -h9.21.149.196 -P24001 -usett -psett1234 db_tdw_data t_acct_balance_two_remain >./data.sql;
```

备份指定数据库排除某些表

```sql
mysqldump -uroot -p test --ignore-table=test.t1 --ignore-table=test.t2 > /backup/mysqldump/test2.sql
```

### 1.8.4 还原命令

#### 系统行命令

```sql
mysqladmin -uroot -p create db_name 
mysql -uroot -pXXX -h9.134.236.231 db_name < /backup/mysqldump/xxx.sql

注：在导入备份数据库前，db_name如果没有，是需要创建的;
```

例：

```sql
mysql -uroot -psett -h9.134.74.30 felix < ./xxx.sql
```

#### soure 方法（数据库和服务器是同一台物理机）

```sql
mysql > use db_name
mysql > source /backup/mysqldump/xxx.sql
```

## 1.9 远程登录数据库

```shell
mysql -u (用户名) -h (mysql服务所在地址) -P (可选默认3306 指定端口号) -p

mysql -u root -h 127.0.0.1 -P3306 -p
```

## 1.10 查看当前所在数据库下面的所有表

```shell
show tables;
```

## 1.11 显示数据库列表

```shell
show databases;
```

## 1.12 查看正在执行的线程

```mysql
show processlist;

mysql> show processlist;
+----------+--------+---------------------+---------------+---------+------+-------------------+-------------------------------------------------------+
| Id       | User   | Host                | db            | Command | Time | State             | Info                                                  |
+----------+--------+---------------------+---------------+---------+------+-------------------+-------------------------------------------------------+
| 34601177 | settle | 9.134.236.231:49478 | db_income_day | Query   |  472 | copy to tmp table | alter table t_refund_data_from_water drop primary key |
| 34602207 | settle | 9.134.236.231:49542 | NULL          | Query   |    0 | starting          | show processlist                                      |
+----------+--------+---------------------+---------------+---------+------+-------------------+-------------------------------------------------------+
2 rows in set (0.00 sec)
```

# 15.索引

# 16.分区

# 17. mysql用户管理

## 17.1 MySQL user权限表详解

MySQL 在安装时会自动创建一个名为 mysql 的数据库，mysql 数据库中存储的都是用户权限表。用户登录以后，MySQL 会根据这些权限表的内容为每个用户赋予相应的权限。

user 表是 MySQL 中最重要的一个权限表，用来记录允许连接到服务器的账号信息。需要注意的是，在 user 表里启用的所有权限都是全局级的，适用于所有数据库。

user 表中的字段大致可以分为 4 类，分别是用户列、权限列、安全列和资源控制列，下面主要介绍这些字段的含义。

### 用户列

用户列存储了用户连接 MySQL 数据库时需要输入的信息。需要注意的是 MySQL 5.7 版本不再使用 Password 来作为密码的字段，而改成了 authentication_string。

MySQL 5.7 版本的用户列如表 1 所示。

| 字段名                | 字段类型 | 是否为空 | 默认值 | 说明   |
| --------------------- | -------- | -------- | ------ | ------ |
| Host                  | char(60) | NO       | 无     | 主机名 |
| User                  | char(32) | NO       | 无     | 用户名 |
| authentication_string | text     | YES      | 无     | 密码   |

用户登录时，如果这 3 个字段同时匹配，MySQL 数据库系统才会允许其登录。创建新用户时，也是设置这 3 个字段的值。修改用户密码时，实际就是修改 user 表的 authentication_string 字段的值。因此，这 3 个字段决定了用户能否登录。

### 权限列

权限列的字段决定了用户的权限，用来描述在全局范围内允许对数据和数据库进行的操作。

权限大致分为两大类，分别是高级管理权限和普通权限：

- 高级管理权限主要对数据库进行管理，例如关闭服务的权限、超级权限和加载用户等；
- 普通权限主要操作数据库，例如查询权限、修改权限等。

user 表的权限列包括 Select_priv、Insert_ priv 等以 priv 结尾的字段，这些字段值的数据类型为 ENUM，可取的值只有 Y 和 N：Y 表示该用户有对应的权限，N 表示该用户没有对应的权限。从安全角度考虑，这些字段的默认值都为 N。

user 表的权限列包括 Select_priv、Insert_ priv 等以 priv 结尾的字段，这些字段值的数据类型为 ENUM，可取的值只有 Y 和 N：Y 表示该用户有对应的权限，N 表示该用户没有对应的权限。从安全角度考虑，这些字段的默认值都为 N。

| 字段名                 | 字段类型      | 是否为空 | 默认值 | 说明                                                         |
| ---------------------- | ------------- | -------- | ------ | ------------------------------------------------------------ |
| Select_priv            | enum('N','Y') | NO       | N      | 是否可以通过SELECT 命令查询数据                              |
| Insert_priv            | enum('N','Y') | NO       | N      | 是否可以通过 INSERT 命令插入数据                             |
| Update_priv            | enum('N','Y') | NO       | N      | 是否可以通过UPDATE 命令修改现有数据                          |
| Delete_priv            | enum('N','Y') | NO       | N      | 是否可以通过DELETE 命令删除现有数据                          |
| Create_priv            | enum('N','Y') | NO       | N      | 是否可以创建新的数据库和表                                   |
| Drop_priv              | enum('N','Y') | NO       | N      | 是否可以删除现有数据库和表                                   |
| Reload_priv            | enum('N','Y') | NO       | N      | 是否可以执行刷新和重新加载MySQL所用的各种内部缓存的特定命令，包括日志、权限、主机、查询和表 |
| Shutdown_priv          | enum('N','Y') | NO       | N      | 是否可以关闭MySQL服务器。将此权限提供给root账户之外的任何用户时，都应当非常谨慎 |
| Process_priv           | enum('N','Y') | NO       | N      | 是否可以通过SHOW PROCESSLIST命令查看其他用户的进程           |
| File_priv              | enum('N','Y') | NO       | N      | 是否可以执行SELECT INTO OUTFILE和LOAD DATA INFILE命令        |
| Grant_priv             | enum('N','Y') | NO       | N      | 是否可以将自己的权限再授予其他用户                           |
| References_priv        | enum('N','Y') | NO       | N      | 是否可以创建外键约束                                         |
| Index_priv             | enum('N','Y') | NO       | N      | 是否可以对索引进行增删查                                     |
| Alter_priv             | enum('N','Y') | NO       | N      | 是否可以重命名和修改表结构                                   |
| Show_db_priv           | enum('N','Y') | NO       | N      | 是否可以查看服务器上所有数据库的名字，包括用户拥有足够访问权限的数据库 |
| Super_priv             | enum('N','Y') | NO       | N      | 是否可以执行某些强大的管理功能，例如通过KILL命令删除用户进程；使用SET GLOBAL命令修改全局MySQL变量，执行关于复制和日志的各种命令。（超级权限） |
| Create_tmp_table_priv  | enum('N','Y') | NO       | N      | 是否可以创建临时表                                           |
| Lock_tables_priv       | enum('N','Y') | NO       | N      | 是否可以使用LOCK TABLES命令阻止对表的访问/修改               |
| Execute_priv           | enum('N','Y') | NO       | N      | 是否可以执行存储过程                                         |
| Repl_slave_priv        | enum('N','Y') | NO       | N      | 是否可以读取用于维护复制数据库环境的二进制日志文件           |
| Repl_client_priv       | enum('N','Y') | NO       | N      | 是否可以确定复制从服务器和主服务器的位置                     |
| Create_view_priv       | enum('N','Y') | NO       | N      | 是否可以创建视图                                             |
| Show_view_priv         | enum('N','Y') | NO       | N      | 是否可以查看视图                                             |
| Create_routine_priv    | enum('N','Y') | NO       | N      | 是否可以更改或放弃存储过程和函数                             |
| Alter_routine_priv     | enum('N','Y') | NO       | N      | 是否可以修改或删除存储函数及函数                             |
| Create_user_priv       | enum('N','Y') | NO       | N      | 是否可以执行CREATE USER命令，这个命令用于创建新的MySQL账户   |
| Event_priv             | enum('N','Y') | NO       | N      | 是否可以创建、修改和删除事件                                 |
| Trigger_priv           | enum('N','Y') | NO       | N      | 是否可以创建和删除触发器                                     |
| Create_tablespace_priv | enum('N','Y') | NO       | N      | 是否可以创建表空间                                           |


如果要修改权限，可以使用 GRANT 语句为用户赋予一些权限，也可以通过 UPDATE 语句更新 user 表的方式来设置权限。

### 安全列

安全列主要用来判断用户是否能够登录成功，user 表中的安全列如表 3 所示：

| 字段名                | 字段类型                          | 是否为空 | 默认值                | 说明                                                         |
| --------------------- | --------------------------------- | -------- | --------------------- | ------------------------------------------------------------ |
| ssl_type              | enum('','ANY','X509','SPECIFIED') | NO       |                       | 支持ssl标准加密安全字段                                      |
| ssl_cipher            | blob                              | NO       |                       | 支持ssl标准加密安全字段                                      |
| x509_issuer           | blob                              | NO       |                       | 支持x509标准字段                                             |
| x509_subject          | blob                              | NO       |                       | 支持x509标准字段                                             |
| plugin                | char(64)                          | NO       | mysql_native_password | 引入plugins以进行用户连接时的密码验证，plugin创建外部/代理用户 |
| password_expired      | enum('N','Y')                     | NO       | N                     | 密码是否过期 (N 未过期，y 已过期)                            |
| password_last_changed | timestamp                         | YES      |                       | 记录密码最近修改的时间                                       |
| password_lifetime     | smallint(5) unsigned              | YES      |                       | 设置密码的有效时间，单位为天数                               |
| account_locked        | enum('N','Y')                     | NO       | N                     | 用户是否被锁定（Y 锁定，N 未锁定）                           |

注意：即使 password_expired 为“Y”，用户也可以使用密码登录 MySQL，但是不允许做任何操作。

通常标准的发行版不支持 ssl，读者可以使用 SHOW VARIABLES LIKE "have_openssl" 语句来查看是否具有 ssl 功能。如果 have_openssl 的值为 DISABLED，那么则不支持 ssl 加密功能。

### 资源控制列

资源控制列的字段用来限制用户使用的资源，user 表中的资源控制列如表 4 所示。

| 字段名               | 字段类型         | 是否为空 | 默认值 | 说明                             |
| -------------------- | ---------------- | -------- | ------ | -------------------------------- |
| max_questions        | int(11) unsigned | NO       | 0      | 规定每小时允许执行查询的操作次数 |
| max_updates          | int(11) unsigned | NO       | 0      | 规定每小时允许执行更新的操作次数 |
| max_connections      | int(11) unsigned | NO       | 0      | 规定每小时允许执行的连接操作次数 |
| max_user_connections | int(11) unsigned | NO       | 0      | 规定允许同时建立的连接次数       |


以上字段的默认值为 0，表示没有限制。一个小时内用户查询或者连接数量超过资源控制限制，用户将被锁定，直到下一个小时才可以在此执行对应的操作。可以使用 GRANT 语句更新这些字段的值。

## 17.2 其他权限表

### db表

db 表比较常用，是 MySQL 数据库中非常重要的权限表，表中存储了用户对某个数据库的操作权限。表中的字段大致可以分为两类，分别是用户列和权限列。

#### 用户列

db 表用户列有 3 个字段，分别是 Host、User、Db，标识从某个主机连接某个用户对某个数据库的操作权限，这 3 个字段的组合构成了 db 表的主键。

db 表的用户列如下表所示：


| 字段名 | 字段类型 | 是否为空 | 默认值 | 说明     |
| ------ | -------- | -------- | ------ | -------- |
| Host   | char(60) | NO       | 无     | 主机名   |
| Db     | char(64) | NO       | 无     | 数据库名 |
| User   | char(32) | NO       | 无     | 用户名   |

#### 权限列

db 表中的权限列和 user 表中的权限列大致相同，只是user 表中的权限是针对所有数据库的，而 db 表中的权限只针对指定的数据库。如果希望用户只对某个数据库有操作权限，可以先将 user 表中对应的权限设置为 N，然后在 db 表中设置对应数据库的操作权限。

### tables_priv表和columns_priv表

tables_priv 表用来对单个表进行权限设置，columns_priv 表用来对单个数据列进行权限设置。tables_priv 表结构如下表所示：

| 字段名      | 字段类型                                                     | 是否为空 | 默认值            | 说明                                                         |
| ----------- | ------------------------------------------------------------ | -------- | ----------------- | ------------------------------------------------------------ |
| Host        | char(60)                                                     | NO       | 无                | 主机                                                         |
| Db          | char(64)                                                     | NO       | 无                | 数据库名                                                     |
| User        | char(32)                                                     | NO       | 无                | 用户名                                                       |
| Table_name  | char(64)                                                     | NO       | 无                | 表名                                                         |
| Grantor     | char(93)                                                     | NO       | 无                | 修改该记录的用户                                             |
| Timestamp   | timestamp                                                    | NO       | CURRENT_TIMESTAMP | 修改该记录的时间                                             |
| Table_priv  | set('Select','Insert','Update','Delete',' Create','Drop','Grant','References', 'Index','Alter','Create View','Show view','Trigger') | NO       | 无                | 表示对表的操作权限，包括 Select、Insert、Update、Delete、Create、Drop、Grant、References、Index 和 Alter 等 |
| Column_priv | set('Select','Insert','Update','References')                 | NO       | 无                | 表示对表中的列的操作权限，包括 Select、Insert、Update 和 References |


columns_priv 表结构如下表所示：



| 字段名      | 字段类型                                     | 是否为空 | 默认值            | 说明                                                         |
| ----------- | -------------------------------------------- | -------- | ----------------- | ------------------------------------------------------------ |
| Host        | char(60)                                     | NO       | 无                | 主机                                                         |
| Db          | char(64)                                     | NO       | 无                | 数据库名                                                     |
| User        | char(32)                                     | NO       | 无                | 用户名                                                       |
| Table_name  | char(64)                                     | NO       | 无                | 表名                                                         |
| Column_name | char(64)                                     | NO       | 无                | 数据列名称，用来指定对哪些数据列具有操作权限                 |
| Timestamp   | timestamp                                    | NO       | CURRENT_TIMESTAMP | 修改该记录的时间                                             |
| Column_priv | set('Select','Insert','Update','References') | NO       | 无                | 表示对表中的列的操作权限，包括 Select、Insert、Update 和 References |

### procs_priv表

procs_priv 表可以对存储过程和存储函数进行权限设置，procs_priv 的表结构如表所示：

| 字段名       | 字段类型                               | 是否为空 | 默认值            | 说明                                                         |
| ------------ | -------------------------------------- | -------- | ----------------- | ------------------------------------------------------------ |
| Host         | char(60)                               | NO       | 无                | 主机名                                                       |
| Db           | char(64)                               | NO       | 无                | 数据库名                                                     |
| User         | char(32)                               | NO       | 无                | 用户名                                                       |
| Routine_name | char(64)                               | NO       | 无                | 表示存储过程或函数的名称                                     |
| Routine_type | enum('FUNCTION','PROCEDURE')           | NO       | 无                | 表示存储过程或函数的类型，Routine_type 字段有两个值，分别是 FUNCTION 和 PROCEDURE。FUNCTION 表示这是一个函数；PROCEDURE 表示这是一个 存储过程。 |
| Grantor      | char(93)                               | NO       | 无                | 插入或修改该记录的用户                                       |
| Proc_priv    | set('Execute','Alter Routine','Grant') | NO       | 无                | 表示拥有的权限，包括 Execute、Alter Routine、Grant 3种       |
| Timestamp    | timestamp                              | NO       | CURRENT_TIMESTAMP | 表示记录更新时间                                             |

## 17.3 MySQL创建用户

MySQL 在安装时，会默认创建一个名为 root 的用户，该用户拥有超级权限，可以控制整个 MySQL 服务器。

在对 MySQL 的日常管理和操作中，为了避免有人恶意使用 root 用户控制数据库，我们通常创建一些具有适当权限的用户，尽可能地不用或少用 root 用户登录系统，以此来确保数据的安全访问。

MySQL 提供了以下 3 种方法创建用户。

1. 使用 CREATE USER 语句创建用户
2. 在 mysql.user 表中添加用户
3. 使用 GRANT 语句创建用户

### 1. 使用CREATE USER语句创建用户

可以使用 **CREATE USER** 语句来创建 MySQL 用户，并设置相应的密码。其基本语法格式如下：

```sql
CREATE USER <用户> [ IDENTIFIED BY [ PASSWORD ] 'password' ] [ ,用户 [ IDENTIFIED BY [ PASSWORD ] 'password' ]]
```

参数说明如下：

**用户**

指定创建用户账号，格式为 `user_name'@'host_name`。这里的`user_name`是用户名，`host_name`为主机名，即用户连接 MySQL 时所用主机的名字。如果在创建的过程中，只给出了用户名，而没指定主机名，那么主机名默认为“%”，表示一组主机，即对所有主机开放权限。

**IDENTIFIED BY子句**

用于指定用户密码。新用户可以没有初始密码，若该用户不设密码，可省略此子句。

**PASSWORD 'password'**

PASSWORD 表示使用哈希值设置密码，该参数可选。如果密码是一个普通的字符串，则不需要使用 PASSWORD 关键字。'password' 表示用户登录时使用的密码，需要用单引号括起来。

使用 CREATE USER 语句时应注意以下几点：

- CREATE USER 语句可以不指定初始密码。但是从安全的角度来说，不推荐这种做法。
- 使用 CREATE USER 语句必须拥有 mysql 数据库的 INSERT 权限或全局 CREATE USER 权限。
- 使用 CREATE USER 语句创建一个用户后，MySQL 会在 mysql 数据库的 user 表中添加一条新记录。
- CREATE USER 语句可以同时创建多个用户，多个用户用逗号隔开。


新创建的用户拥有的权限很少，它们只能执行不需要权限的操作。如登录 MySQL、使用 SHOW 语句查询所有存储引擎和字符集的列表等。如果两个用户的用户名相同，但主机名不同，MySQL 会将它们视为两个用户，并允许为这两个用户分配不同的权限集合。

**例 1**

使用 CREATE USER 创建一个用户，用户名是 test1，密码是 test1，主机名是 localhost。SQL 语句和执行过程如下。

```sql
mysql> CREATE USER 'test1'@'localhost' IDENTIFIED BY 'test1';
Query OK, 1 rows affected (0.06 sec)
```

结果显示，创建 test1 用户成功。

在实际应用中，我们应避免明文指定密码，可以通过 PASSWORD 关键字使用密码的哈希值设置密码。

**例 2**

在 MySQL 中，可以使用 password() 函数获取密码的哈希值，查看 test1 哈希值的 SQL 语句和执行过程如下：

```sql
mysql> SELECT password('test1');
+-------------------------------------------+
| password('test1')                         |
+-------------------------------------------+
| *06C0BF5B64ECE2F648B5F048A71903906BA08E5C |
+-------------------------------------------+
1 row in set, 1 warning (0.00 sec)
```

“*06C0BF5B64ECE2F648B5F048A71903906BA08E5C”就是 test1 的哈希值。下面创建用户 test1，SQL 语句和执行过程如下：

```sql
mysql> CREATE USER 'test1'@'localhost'IDENTIFIED BY PASSWORD '*06C0BF5B64ECE2F648B5F048A71903906BA08E5C';
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

执行成功后就可以使用密码“test1”登录了。

### 2. 使用 INSERT 语句新建用户

可以使用 INSERT 语句将用户的信息添加到 mysql.user 表中，但必须拥有对 mysql.user 表的 INSERT 权限。通常 INSERT 语句只添加 Host、User 和 authentication_string 这 3 个字段的值。

> MySQL 5.7 的 user 表中的密码字段从 Password 变成了 authentication_string，如果你使用的是 MySQL 5.7 之前的版本，将 authentication_string 字段替换成 Password 即可。

使用 **INSERT** 语句创建用户的代码如下：

```sql
INSERT INTO mysql.user(Host, User,  authentication_string, ssl_cipher, x509_issuer, x509_subject) VALUES ('hostname', 'username', PASSWORD('password'), '', '', '');
```

由于 mysql 数据库的 user 表中，ssl_cipher、x509_issuer 和 x509_subject 这 3 个字段没有默认值，所以向 user 表插入新记录时，一定要设置这 3 个字段的值，否则 INSERT 语句将不能执行。

**例 3**

下面使用 INSERT 语句创建名为 test2 的用户，主机名是 localhost，密码也是 test2。SQL 语句和执行过程如下：

```sql
mysql> INSERT INTO mysql.user(Host, User, authentication_string, ssl_cipher, x509_issuer, x509_subject) VALUES ('localhost', 'test2', PASSWORD('test2'), '', '', '');
Query OK, 1 row affected, 1 warning (0.02 sec)
```

结果显示，新建用户成功。但是这时如果通过该账户登录 MySQL 服务器，不会登录成功，因为 test2 用户还没有生效。

可以使用 FLUSH 命令让用户生效，命令如下：

FLUSH PRIVILEGES;

使用以上命令可以让 MySQL 刷新系统权限相关表。执行 FLUSH 命令需要 RELOAD 权限。

注意：user 表中的 User 和 Host 字段区分大小写，创建用户时要指定正确的用户名称或主机名。

### 3. 使用GRANT语句新建用户

虽然 CREATE USER 和 INSERT INTO 语句都可以创建普通用户，但是这两种方式不便授予用户权限。于是 MySQL 提供了 GRANT 语句。

使用 **GRANT** 语句创建用户的基本语法形式如下:

```sql
GRANT priv_type ON database.table TO user [IDENTIFIED BY [PASSWORD] 'password']
```

其中：

- priv_type 参数表示新用户的权限；
- database.table 参数表示新用户的权限范围，即只能在指定的数据库和表上使用自己的权限；
- user 参数指定新用户的账号，由用户名和主机名构成；
- IDENTIFIED BY 关键字用来设置密码；
- password 参数表示新用户的密码。

**例 4**

下面使用 GRANT 语句创建名为 test3 的用户，主机名为 localhost，密码为 test3。该用户对所有数据库的所有表都有 SELECT 权限。SQL 语句和执行过程如下：

```sql
mysql> GRANT SELECT ON*.* TO 'test3'@localhost IDENTIFIED BY 'test3';
Query OK, 0 rows affected, 1 warning (0.01 sec)
```

其中，“*.*” 表示所有数据库下的所有表。结果显示创建用户成功，且 test3 用户对所有表都有查询（SELECT）权限。

技巧：GRANT 语句是 MySQL 中一个非常重要的语句，它可以用来创建用户、修改用户密码和设置用户权限。教程后面会详细介绍如何使用 GRANT 语句修改密码、更改权限。

## 17.4 修改用户

使用 RENAME USER 语句将用户名 test1 修改为 testUser1，主机是 localhost。SQL 语句和执行过程如下。

```sql
mysql> RENAME USER 'test1'@'localhost'
    -> TO 'testUser1'@'localhost';
Query OK, 0 rows affected (0.03 sec
```

## 17.5 删除用户

### 17.5.1 使用 DROP USER 语句删除普通用户

下面使用 DROP USER 语句删除用户'test1@'localhost'。SQL 语句和执行过程如下。

```sql
mysql> DROP USER 'test1'@'localhost';
Query OK, 0 rows affected (0.00 sec)
```

### 17.5.2  使用DELETE语句删除普通用户

下面使用 DELETE 语句删除用户'test2'@'localhost'。SQL 语句和执行过程如下所示。

```sql
DELETE FROM mysql.user WHERE Host='localhost'AND User='test2';
Query OK, 1 rows affected (0.00 sec)
```

## 17.6 查询用户权限

在 MySQL 中，可以通过查看 mysql.user 表中的数据记录来查看相应的用户权限，也可以使用 SHOW GRANTS 语句查询用户的权限。

mysql 数据库下的 user 表中存储着用户的基本权限，可以使用 SELECT 语句来查看。SELECT 语句的代码如下：

```sql
SELECT * FROM mysql.user;
```

要执行该语句，必须拥有对 user 表的查询权限。

注意：新创建的用户只有登录 MySQL 服务器的权限，没有任何其它权限，不能查询 user 表。

除了使用 SELECT 语句之外，还可以使用 SHOW GRANTS FOR 语句查看权限。其语法格式如下：

```sql
SHOW GRANTS FOR 'username'@'hostname';
```

其中，username 表示用户名，hostname 表示主机名或主机 IP。

## 17.7 用户授权

```mysql
例一：
1. 授权用户root使用密码root从任意主机连接到mysql服务器：
代码如下:
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
flush privileges;

2.授权用户root使用密码root从指定ip为47.94.15.114的主机连接到mysql服务器：
代码如下:
GRANT ALL PRIVILEGES ON *.* TO 'root'@'47.94.15.114' IDENTIFIED BY 'root' WITH GRANT OPTION;
flush privileges;
例二：
#授权只读（mysql 5.7）
grant select on *.* to 'zabbix'@'localhost' identified by 'zabbix';

#授权读写所有权限（mysql 5.7）
grant all privileges on zabbix.* to 'zabbix'@'192.168.40.131' identified by 'mysqlZ125!' ;

grant all privileges on *.* to 'root'@'192.168.40.1' identified by '123456' ;

flush privileges;
例三：
#授权所有用户连接
#mysql 5.7
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'youpassword' WITH GRANT OPTION;

#mysql 8.0
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

flush privileges;
```

## 17.8 查看授权用户IP

https://blog.csdn.net/qq_45004192/article/details/100120000

```mysql
select user,host from mysql.user;
```

![MYSQL授权IP](/Users/fanqingwei/Desktop/学习/数据库/images/MYSQL授权IP.png)

## 17.9 MySQL登录和退出服务器

**登录**

启动 MySQL 服务后，可以使用以下命令来登录。

```sql
mysql -h hostname|hostlP -p port -u username -p DatabaseName -e "SQL语句"
```

对上述参数说明如下：

- -h：指定连接 MySQL 服务器的地址。可以用两种方式表示，hostname 为主机名，hostIP 为主机 IP 地址。
- -p：指定连接 MySQL 服务器的端口号，port 为连接的端口号。MySQL 的默认端口号是 3306，因此如果不指定该参数，默认使用 3306 连接 MySQL 服务器。
- -u：指定连接 MySQL 服务器的用户名，username 为用户名。
- -p：提示输入密码，即提示 Enter password。
- DatabaseName：指定连接到 MySQL 服务器后，登录到哪一个数据库中。如果没有指定，默认为 mysql 数据库。
- -e：指定需要执行的 SQL 语句，登录 MySQL 服务器后执行这个 SQL 语句，然后退出 MySQL 服务器。

**例 1**

下面使用 root 用户登录到 test 数据库中，命令和运行过程如下：

```sql
C:\Users\11645>mysql -h localhost -u root -p test
Enter password: ****
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.29-log MySQL Community Server (GPL)

Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.
```

**退出**

退出 MySQL 服务器的方式很简单，只要在命令行输入 EXIT 或 QUIT 即可。“\q”是 QUIT 的缩写，也可以用来退出 MySQL 服务器。退出后就会显示 Bye。如下所示：

```sql
mysql> QUIT;
Bye
```

# 19. 数据库编码

## 19.1 编码类型

```shell
查看各编码：show variables like 'character%';

+--------------------------+-------------------------------------------------------------+
| Variable_name            | Value                                                       |
+--------------------------+-------------------------------------------------------------+
| character_set_client     | utf8                                                        |
| character_set_connection | utf8                                                        |
| character_set_database   | utf8mb4                                                     |
| character_set_filesystem | binary                                                      |
| character_set_results    | utf8                                                        |
| character_set_server     | utf8mb4                                                     |
| character_set_system     | utf8                                                        |
| character_sets_dir       | /usr/local/mysql-5.6.26-linux-glibc2.5-i686/share/charsets/ |
+--------------------------+-------------------------------------------------------------+
8 rows in set (0.01 sec)
```

### 1.character_set_system

character_set_system 是系统元数据(字段名等)存储时使用的编码字符集，该字段和具体存储的数据无关。总是固定不变的——utf8. 我们可以不去管它。

### **2. character_set_server** 

该变量**设置的 server 级别的(mysqld级别的) 字符集**。也就是说设置的是 一个 mysqld 的，所有字符最后存储时，使用的编码字符集。

默认值为 lantin1. 我们一般设置成：utf8、utf8mb4、gbk 等值。

一同设置的还有 server 级别的排序规则：

**collation_server**:

utf8mb4_bin, utf8mb4_general_ci, utf8_bin, utf8_general_ci

ci 代表： casesensitive ignore 排序时不考虑大小写；而 _bin 结尾的排序时考虑大小写。

### **3. character_set_database**

```
CREATE DATABASE db_name
    [[DEFAULT] CHARACTER SET charset_name]
    [[DEFAULT] COLLATE collation_name]

ALTER DATABASE db_name
    [[DEFAULT] CHARACTER SET charset_name]
    [[DEFAULT] COLLATE collation_name]
```

character_set_database 是**单个**数据库级别的 字符集设置，该参数允许我们在同一个 mysqd 下面的不同的 database 使用不同的字符集。

比如：

create database db1 **character set utf8mb4 collate utf8mb4_bin**;

这就设置了 数据库 级别的字符集。如果 create database 语句没有 character 和 collate 参数，那么他们会默认使用：

character_set_server 和 character_collation 的值作为 默认值。

同样对应有数据库级别的排序规则参数：

```
collation_database
```

### **4. character_set_client** 

也就是 mysql client 发送 给 mysqld 的语句使用的 编码字符集。

可以使用 --default-character-set 参数来显示设置。

### **5. character_set_connection**

数字到字符转换时的编码字符集。

（用introducer指定文本字符串的字符集： 
– 格式为：[_charset] 'string' [COLLATE collation] 
– 例如： 
• SELECT _latin1 'string'; 
• SELECT _utf8 '你好' COLLATE utf8_general_ci; 
– 由introducer修饰的文本字符串在请求过程中不经过多余的转码，直接转换为内部字符集处理。 ）

实际中我们一般没有人去使用 introducer ，所以其实是没有 introducer，所以都会使用 character_set_connection来编码的。

### **6. character_set_results**

mysqld 在返回 查询 结果集 或者错误信息到 client 时，使用的编码字符集。

## 19.2 设置编码

### **19.2.1 set names 'xxx' 命令**

```shell
set names GBK;
```

可以看到改变的是 character_set_client、character_set_connection、character_set_results

它们都是和 client 相关的。而 真正server端的编码字符集，character_set_server 和 character_set_database ，set names 'xxx' 根本无法修改。

set names 'xxx' 命令可以使 character_set_client、character_set_connection、character_set_results 三者统一：

**client (character_set_client) -----> character_set_connection -------> mysqld  ------> client(character_set_results)**

减少编码转换的需要。

### 19.2.2 set charset xxx

```shell
set charset utf8
```

可以看到改变的是character_set_client、character_set_results，相比于set names xxx,少了character_set_connection

### **19.2.3 default-character-set = charset_name 配置参数**

default-character-set 能够同时指定 client 端 和 connection 的字符，也就是：**character_set_client 和 character_set_connection的值，实际上还设置了 character-set-results 的值**。

**所以 default-character-set 的作用和 set names 'xxx' 的作用是一样的**。 

## **19.3 **编码过程

**character_set_server 和 character_set_database** 二者 的作用其实是相同的，都是设置 字符最终存储到磁盘时，使用的编码字符集。只不过 二者设置的级别不一样而已。character_set_server 设置了 mysqld 级别的存储编码字符集，而character_set_database设置 mysqld 中单个 database 的存储编码字符集。而且character_set_database的默认值就是 character_set_server 的值。

存在三次编码转换过程：

1）mysql client 使用 character_set_client编码的字符------> character_set_connection 编码字符

  ------> mysqld ：这里需要从 character_set_connection 编码格式二进制流**解码成 字符**，然后使用 character_set_server/character_set_database **对字符进行再次编码**，生成二进制流，存储时，就是存储再次编码的二进制流数据。

2）读取数据时，会使用 character_set_server/character_set_database 对读取到的二级制流进行 解码成 字符，然后使用 character_set_results 对字符进行二次编码，生成二进制流，发给 mysql client.

所以 使用 set names 'xxx' 命令，结合 character_set_server 参数，可以将 整个过程的 字符集设置成相同的，就不会存在编码转换的过程。

# 20.类型

## 20.1 日期类型

### 类型

mysql(5.5)所支持的日期时间类型有：DATETIME、 TIMESTAMP、DATE、TIME、YEAR。

几种类型比较如下：

| 日期时间类型 | 占用空间 | 日期格式            | 最小值              | 最大值              | 零值表示            |
| ------------ | -------- | ------------------- | ------------------- | ------------------- | ------------------- |
| DATETIME     | 8 bytes  | YYYY-MM-DD HH:MM:SS | 1000-01-01 00:00:00 | 9999-12-31 23:59:59 | 0000-00-00 00:00:00 |
| TIMESTAMP    | 4 bytes  | YYYY-MM-DD HH:MM:SS | 19700101080001      | 2038 年的某个时刻   | 00000000000000      |
| DATE         | 4 bytes  | YYYY-MM-DD          | 1000-01-01          | 9999-12-31          | 0000-00-00          |
| TIME         | 3 bytes  | HH:MM:SS            | -838:59:59          | 838:59:59           | 00:00:00            |
| YEAR         | 1 bytes  | YYYY                | 1901                | 2155                | 0000                |

### 插入

MySQL 按标准格式 `YYYY-MM-DD hh:mm:ss[.fraction]` 输出日期时间，但设置或进行日期时间相关的比较时却支持灵活的多种格式，会自动解析。

虽然 MySQL 支持多种格式进行日期时间的设置，但日期部分要求必须是 年-月-日 的形式才能正确解析。比如 `98-09-04` 是按年月日顺序解析的，而不是英文里常用的月日年，或者日月年。

# 21. Linux安装MySQL、卸载MySQL、查看MySQL安装路径

见尚硅谷课件
