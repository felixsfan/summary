# Mybatis底层原理

## 持久层技术解决方案

- JDBC技术：

  ​       Connection

  ​       PreparedStatement

  ​       ResultSet

- Spring的JdbcTemplate:

  ​       Spring中对jdbc的简单封装

- Apache的DBUtils:

  ​        它和Spring的JdbcTemplate很像，也是对Jdbc的简单封装

   top:

  ​       1.以上这些都不是框架

  ​               2.Spring的JdbcTemplate和DBUtils都只是工具类

- 框架：Mybatis、hibenate

  ​      

## Mybatis的概述

   持久层框架，由Java编写。它封装了jdbc操作的很多细节，使开发者只需要关注sql语句本身，而无需关注注册驱动，创建连接等繁杂过程，它使用了ORM思想实现了结果集的封装

## ORM

​      Object Relational Mapping  对象关系映射，及把数据库表和实体类及实体类的属性对应起来，让我们可以操作实体类就能实现操作数据库表

