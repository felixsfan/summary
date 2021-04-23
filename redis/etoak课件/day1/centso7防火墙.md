## 查看防火墙状态
	[root@bogon-29 ~]# systemctl status firewalld
	● firewalld.service - firewalld - dynamic firewall daemon
	   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)
	   Active: active (running) since Tue 2018-09-18 13:05:45 CST; 1 weeks 4 days ago
	     Docs: man:firewalld(1)
	 Main PID: 772 (firewalld)
	   CGroup: /system.slice/firewalld.service
	           └─772 /usr/bin/python -Es /usr/sbin/firewalld --nofork --nopid
	
	Sep 18 13:05:38 localhost.localdomain systemd[1]: Starting firewalld - dynamic firewall daemon...
	Sep 18 13:05:45 localhost.localdomain systemd[1]: Started firewalld - dynamic firewall daemon.

## 查看状态
	[root@bogon-29 ~]# firewall-cmd --state
	running

## 查询3306端口是否开放
	[root@bogon-28 ~]# firewall-cmd --query-port=3306/tcp
	no

## 开放3306端口
	[root@bogon-28 ~]# firewall-cmd --permanent --add-port=3306/tcp
	success

## 重启防火墙(修改配置后要重启防火墙)
	[root@bogon-28 ~]# firewall-cmd --reload
	success

## 移除端口
	[root@bogon-28 ~]# firewall-cmd --permanent --remove-port=8080/tcp

## 参数解释
	1、firwall-cmd：是Linux提供的操作firewall的一个工具；
	2、--permanent：表示设置为持久；
	3、--add-port：标识添加的端口；

## CentOS7使用firewalld打开关闭防火墙与端口
#### 1、firewalld的基本使用
	启动： systemctl start firewalld
	关闭： systemctl stop firewalld
	查看状态： systemctl status firewalld 
	开机禁用： systemctl disable firewalld
	开机启用： systemctl enable firewalld
	
#### 2.systemctl是CentOS7的服务管理工具中主要的工具，它融合之前service和chkconfig的功能于一体。
	启动一个服务：systemctl start firewalld.service
	关闭一个服务：systemctl stop firewalld.service
	重启一个服务：systemctl restart firewalld.service
	显示一个服务的状态：systemctl status firewalld.service
	在开机时启用一个服务：systemctl enable firewalld.service
	在开机时禁用一个服务：systemctl disable firewalld.service
	查看服务是否开机启动：systemctl is-enabled firewalld.service
	查看已启动的服务列表：systemctl list-unit-files|grep enabled
	查看启动失败的服务列表：systemctl --failed

#### 3.配置firewalld-cmd

	查看版本： firewall-cmd --version
	查看帮助： firewall-cmd --help
	显示状态： firewall-cmd --state
	查看所有打开的端口： firewall-cmd --zone=public --list-ports
	更新防火墙规则： firewall-cmd --reload
	查看区域信息:  firewall-cmd --get-active-zones
	查看指定接口所属区域： firewall-cmd --get-zone-of-interface=eth0
	拒绝所有包：firewall-cmd --panic-on
	取消拒绝状态： firewall-cmd --panic-off
	查看是否拒绝： firewall-cmd --query-panic
	 
	那怎么开启一个端口呢
	添加
	firewall-cmd --zone=public --add-port=80/tcp --permanent    （--permanent永久生效，没有此参数重启后失效）
	重新载入
	firewall-cmd --reload
	查看
	firewall-cmd --zone= public --query-port=80/tcp
	删除
	firewall-cmd --zone= public --remove-port=80/tcp --permanent


