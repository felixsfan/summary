# n0. Centos和UBUNTU区别

- centos中新建的普通用户是没有sudo权限的，如果想让普通用户拥有sudo权限需要在/etc/sudoers文件中添加用户的权限，而ubuntu系统普通用户想要使用sudo权限 直接使用sudo +命令行的方式就可以了
- 安装软件包命令格式不一样。centos使用yum的方式，而Ubuntu使用apt-get 方式
- 由于centos是基于redhat的，所以centos支持rpm包，但Ubuntu不支持
- centos比ubuntu稳定

# 1. 一些补充命令

 命令＋常用选项＋目录 

## 1.1 关机&重启命令

**shutdown**

- shutdown -h now :立即关机
- shutdown -h 1:一分钟后关机
- shutdown -r now:立即重启

**halt**：关机
**reboot**：重启系统
**sync**：将内存上的数据写入磁盘（建议重启或关机前使用）
**logout**:注销用户（图形界面无效）

## 1.2 帮助指令man

通过Linux提供的帮助指令了解这个命令。
**man**[命令]

```shell
[root@VM-4-15-centos ~]# man ls
```

## 1.3 echo

```
[root@VM-4-15-centos ~]# echo $PATH
/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```

## 1.4 history

查看已经执行过的命令

```shell
[root@VM-4-15-centos ~]# history 5
  139  2020-11-17 17:49:34 ll
  140  2020-11-17 17:58:48 rm d -rf
  141  2020-11-17 17:58:50 ls
  142  2020-11-17 18:00:44 history
  143  2020-11-17 18:00:54 history 5
```

# 2. 文件系统

## 2.1 系统目录结构

登录系统后，在当前命令窗口下输入命令：

![](/Users/fanqingwei/Desktop/学习/linux/images/4_20.png)

树状目录结构：

![](/Users/fanqingwei/Desktop/学习/linux/images/d0c50-linux2bfile2bsystem2bhierarchy.jpg)

## 2.2 各目录的功能

以下是对这些目录的解释：

- **/bin**：
  bin 是 Binaries (二进制文件) 的缩写, 这个目录存放着最经常使用的命令。

- **/boot：**
  这里存放的是启动 Linux 时使用的一些核心文件，包括一些连接文件以及镜像文件。

- **/dev ：**
  dev 是 Device(设备) 的缩写, 该目录下存放的是 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件的方式是相同的。

- **/etc：**
  etc 是 Etcetera(等等) 的缩写,这个目录用来存放所有的系统管理所需要的配置文件和子目录。

- **/home**：
  用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的，如上图中的 alice、bob 和 eve。

- **/lib**：
  lib 是 Library(库) 的缩写这个目录里存放着系统最基本的动态连接共享库，其作用类似于 Windows 里的 DLL 文件。几乎所有的应用程序都需要用到这些共享库。

- **/lost+found**：
  这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。

- **/media**：
  linux 系统会自动识别一些设备，例如U盘、光驱等等，当识别后，Linux 会把识别的设备挂载到这个目录下。

- **/mnt**：
  系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在 /mnt/ 上，然后进入该目录就可以查看光驱里的内容了。

- **/opt**：
  opt 是 optional(可选) 的缩写，这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。

- **/proc**：
  proc 是 Processes(进程) 的缩写，/proc 是一种伪文件系统（也即虚拟文件系统），存储的是当前内核运行状态的一系列特殊文件，这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。
  这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件，比如可以通过下面的命令来屏蔽主机的ping命令，使别人无法ping你的机器：

  ```
  echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all
  ```

- **/root**：
  该目录为系统管理员，也称作超级权限者的用户主目录。

- **/sbin**：
  s 就是 Super User 的意思，是 Superuser Binaries (超级用户的二进制文件) 的缩写，这里存放的是系统管理员使用的系统管理程序。

- **/selinux**：
   这个目录是 Redhat/CentOS 所特有的目录，Selinux 是一个安全机制，类似于 windows 的防火墙，但是这套机制比较复杂，这个目录就是存放selinux相关的文件的。

- **/srv**：
   该目录存放一些服务启动之后需要提取的数据。

- **/sys**：

  这是 Linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs 。

  sysfs 文件系统集成了下面3种文件系统的信息：针对进程信息的 proc 文件系统、针对设备的 devfs 文件系统以及针对伪终端的 devpts 文件系统。

  该文件系统是内核设备树的一个直观反映。

  当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中被创建。

- **/tmp**：
  tmp 是 temporary(临时) 的缩写这个目录是用来存放一些临时文件的。

- **/usr**：
   usr 是 unix shared resources(共享资源) 的缩写，这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录。

- **/usr/bin：**
  系统用户使用的应用程序。

- **/usr/sbin：**
  超级用户使用的比较高级的管理程序和系统守护程序。

- **/usr/src：**
  内核源代码默认的放置目录。

- **/var**：
  var 是 variable(变量) 的缩写，这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

- **/run**：
  是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。

在 Linux 系统中，有几个目录是比较重要的，平时需要注意不要误删除或者随意更改内部文件。

**/etc**： 上边也提到了，这个是系统中的配置文件，如果你更改了该目录下的某个文件可能会导致系统不能启动。

**/bin, /sbin, /usr/bin, /usr/sbin**: 这是系统预设的执行文件的放置目录，比如 ls 就是在 /bin/ls 目录下的。

值得提出的是，/bin, /usr/bin 是给系统用户使用的指令（除root外的通用户），而/sbin, /usr/sbin 则是给 root 使用的指令。

**/var**： 这是一个非常重要的目录，系统上跑了很多程序，那么每个程序都会有相应的日志产生，而这些日志就被记录到这个目录下，具体在 /var/log 目录下，另外 mail 的预设放置也是在这里。

我们知道Linux的目录结构为树状结构，最顶级的目录为根目录 /。

其他目录通过挂载可以将它们添加到树中，通过解除挂载可以移除它们。

## 2.3 文件的基本属性

Linux 系统是一种典型的多用户系统，不同的用户处于不同的地位，拥有不同的权限。

为了保护系统的安全性，Linux 系统对不同的用户访问同一文件（包括目录文件）的权限做了不同的规定。

### 2.3.1 修改文件或目录的所属用户与权限

- chown (change ownerp) ： 修改所属用户与组。
- chmod (change mode) ： 修改用户的权限。

### 2.3.2 显示一个文件的属性以及文件所属的用户和组

```
[root@www /]# ls -l
total 64
dr-xr-xr-x   2 root root 4096 Dec 14  2012 bin
dr-xr-xr-x   4 root root 4096 Apr 19  2012 boot
……
```

### 2.3.3 参数作用

实例中，**bin** 文件的第一个属性用 **d** 表示。**d** 在 Linux 中代表该文件是一个目录文件。

在 Linux 中第一个字符代表这个文件是目录、文件或链接文件等等。

- 当为 **d** 则是目录
- 当为 **-** 则是文件；
- 若是 **l** 则表示为链接文档(link file)；
- 若是 **b** 则表示为装置文件里面的可供储存的接口设备(可随机存取装置)；
- 若是 **c** 则表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)。

接下来的字符中，以三个为一组，且均为 **rwx** 的三个参数的组合。其中， **r** 代表可读(read)、 **w** 代表可写(write)、 **x** 代表可执行(execute)。 要注意的是，这三个权限的位置不会改变，如果没有权限，就会出现减号 **-** 而已。

![img](https://www.runoob.com/wp-content/uploads/2014/06/file-llls22.jpg)

每个文件的属性由左边第一部分的 10 个字符来确定（如下图）。

![363003_1227493859FdXT](https://www.runoob.com/wp-content/uploads/2014/06/363003_1227493859FdXT.png)

从左至右用 **0-9** 这些数字来表示。

第 **0** 位确定文件类型，第 **1-3** 位确定属主（该文件的所有者）拥有该文件的权限。

第4-6位确定属组（所有者的同组用户）拥有该文件的权限，第7-9位确定其他用户拥有该文件的权限。



其中，第 **1、4、7** 位表示读权限，如果用 **r** 字符表示，则有读权限，如果用 **-** 字符表示，则没有读权限；

第 **2、5、8** 位表示写权限，如果用 **w** 字符表示，则有写权限，如果用 **-** 字符表示没有写权限；第 **3、6、9** 位表示可执行权限，如果用 **x** 字符表示，则有执行权限，如果用 **-** 字符表示，则没有执行权限。

## 2.4 更改文件属性

### 2.4.1 chgrp：更改文件属组

语法：

```
chgrp [-R] 属组名 文件名
```

参数选项

- -R：递归更改文件属组，就是在更改某个目录文件的属组时，如果加上-R的参数，那么该目录下的所有文件的属组都会更改。

### 2.4.2 chown：更改文件属主，也可以同时更改文件属组

语法：

```
chown [–R] 属主名 文件名
chown [-R] 属主名：属组名 文件名
```

进入 /root 目录（~）将install.log的拥有者改为bin这个账号：

```
[root@www ~] cd ~
[root@www ~]# chown bin install.log
[root@www ~]# ls -l
-rw-r--r--  1 bin  users 68495 Jun 25 08:53 install.log
```

将install.log的拥有者与群组改回为root：

```
[root@www ~]# chown root:root install.log
[root@www ~]# ls -l
-rw-r--r--  1 root root 68495 Jun 25 08:53 install.log
```

### 3.4.3 chmod：更改文件9个属性

Linux文件属性有两种设置方法，一种是数字，一种是符号。

Linux 文件的基本权限就有九个，分别是 **owner/group/others(拥有者/组/其他)** 三种身份各有自己的 **read/write/execute** 权限。

先复习一下刚刚上面提到的数据：文件的权限字符为： **-rwxrwxrwx** ， 这九个权限是三个三个一组的！其中，我们可以使用数字来代表各个权限，各权限的分数对照表如下：

- r:4
- w:2
- x:1

每种身份(owner/group/others)各自的三个权限(r/w/x)分数是需要累加的，例如当权限为： **-rwxrwx---** 分数则是：

- owner = rwx = 4+2+1 = 7
- group = rwx = 4+2+1 = 7
- others= --- = 0+0+0 = 0

所以等一下我们设定权限的变更时，该文件的权限数字就是 **770**。变更权限的指令 chmod 的语法是这样的：

```
 chmod [-R] xyz 文件或目录
```

选项与参数：

- xyz : 就是刚刚提到的数字类型的权限属性，为 rwx 属性数值的相加。
- -R : 进行递归(recursive)的持续变更，亦即连同次目录下的所有文件都会变更

举例来说，如果要将 .bashrc 这个文件所有的权限都设定启用，那么命令如下：

```
[root@www ~]# ls -al .bashrc
-rw-r--r--  1 root root 395 Jul  4 11:45 .bashrc
[root@www ~]# chmod 777 .bashrc
[root@www ~]# ls -al .bashrc
-rwxrwxrwx  1 root root 395 Jul  4 11:45 .bashrc
```

那如果要将权限变成 *-rwxr-xr--* 呢？那么权限的分数就成为 [4+2+1][4+0+1][4+0+0]=754。

### 3.4.4 符号类型改变文件权限

还有一个改变权限的方法，从之前的介绍中我们可以发现，基本上就九个权限分别是：

- user：用户
- group：组
- others：其他

那么我们就可以使用 **u, g, o** 来代表三种身份的权限。

此外， **a** 则代表 **all**，即全部的身份。读写的权限可以写成 **r, w, x**，也就是可以使用下表的方式来看：



| chmod | u <br />g <br />o <br />a | +(加入) <br />-(除去) <br />=(设定) | r w x | 文件或目录 |
| ----- | ------------------------- | ----------------------------------- | ----- | ---------- |
|       |                           |                                     |       |            |

如果我们需要将文件权限设置为 **-rwxr-xr--** ，可以使用 **chmod u=rwx,g=rx,o=r 文件名** 来设定:

```
#  touch test1    // 创建 test1 文件
# ls -al test1    // 查看 test1 默认权限
-rw-r--r-- 1 root root 0 Nov 15 10:32 test1
# chmod u=rwx,g=rx,o=r  test1    // 修改 test1 权限
# ls -al test1
-rwxr-xr-- 1 root root 0 Nov 15 10:32 test1
```

而如果是要将权限去掉而不改变其他已存在的权限呢？例如要拿掉全部人的可执行权限，则：

```shell
#  chmod  a-x test1
# ls -al test1
-rw-r--r-- 1 root root 0 Nov 15 10:32 test1
```

## 2.5 文件的目录管理

### 2.5.1 绝对路径和相对路径

- **绝对路径：**
  路径的写法，由根目录 **/** 写起，例如： /usr/share/doc 这个目录。
- **相对路径：**
  路径的写法，不是由 **/** 写起，例如由 /usr/share/doc 要到 /usr/share/man 底下时，可以写成： **cd ../man** 这就是相对路径的写法。

### 2.5.2 处理目录的常用命令

- ls（英文全拼：list files）: 列出目录及文件名
- cd（英文全拼：change directory）：切换目录
- pwd（英文全拼：print work directory）：显示目前的目录
- mkdir（英文全拼：make directory）：创建一个新的目录
- rmdir（英文全拼：remove directory）：删除一个空的目录
- cp（英文全拼：copy file）: 复制文件或目录
- rm（英文全拼：remove）: 移除文件或目录
- mv（英文全拼：move file）: 移动文件与目录，或修改文件与目录的名称

你可以使用 *man [命令]* 来查看各个命令的使用文档，如 ：man cp。

#### ls (列出目录)

语法：

```shell
[root@www ~]# ls [-aAdfFhilnrRSt] 目录名称
[root@www ~]# ls [--color={never,auto,always}] 目录名称
[root@www ~]# ls [--full-time] 目录名称
```

选项与参数：

- -a ：全部的文件，连同隐藏文件( 开头为 . 的文件) 一起列出来(常用)
- -d ：仅列出目录本身，而不是列出目录内的文件数据(常用)
- -l ：长数据串列出，包含文件的属性与权限等等数据；(常用)

#### cd (切换目录)

语法：

```shell
 cd [相对路径或绝对路径]
```

#### pwd (显示目前所在的目录)

```
[root@www ~]# pwd [-P]
```

选项与参数：

- **-P** ：显示出确实的路径，而非使用连结 (link) 路径。

```shell
[root@www ~]# cd /var/mail   <==注意，/var/mail是一个连结档
[root@www mail]# pwd
/var/mail         <==列出目前的工作目录
[root@www mail]# pwd -P
/var/spool/mail   <==怎么回事？有没有加 -P 差很多～
[root@www mail]# ls -ld /var/mail
lrwxrwxrwx 1 root root 10 Sep  4 17:54 /var/mail -> spool/mail
# 看到这里应该知道为啥了吧？因为 /var/mail 是连结档，连结到 /var/spool/mail 
# 所以，加上 pwd -P 的选项后，会不以连结档的数据显示，而是显示正确的完整路径啊！
```

#### mkdir (创建新目录)

语法：

```
mkdir [-mp] 目录名称
```

选项与参数：

- -m ：配置文件的权限喔！直接配置，不需要看默认权限 (umask) 的脸色～
- -p ：帮助你直接将所需要的目录(包含上一级目录)递归创建起来！

实例：请到/tmp底下尝试创建数个新目录看看：

```
[root@www ~]# cd /tmp
[root@www tmp]# mkdir test    <==创建一名为 test 的新目录
[root@www tmp]# mkdir test1/test2/test3/test4
mkdir: cannot create directory `test1/test2/test3/test4': 
No such file or directory       <== 没办法直接创建此目录啊！
[root@www tmp]# mkdir -p test1/test2/test3/test4
```

加了这个 -p 的选项，可以自行帮你创建多层目录！

实例：创建权限为 **rwx--x--x** 的目录。

```
[root@www tmp]# mkdir -m 711 test2
[root@www tmp]# ls -l
drwxr-xr-x  3 root  root 4096 Jul 18 12:50 test
drwxr-xr-x  3 root  root 4096 Jul 18 12:53 test1
drwx--x--x  2 root  root 4096 Jul 18 12:54 test2
```

上面的权限部分，如果没有加上 -m 来强制配置属性，系统会使用默认属性。

如果我们使用 -m ，如上例我们给予 -m 711 来给予新的目录 drwx--x--x 的权限。

#### rmdir (删除空的目录)

语法：

```
 rmdir [-p] 目录名称
```

选项与参数：

- **-p ：**连同上一级『空的』目录也一起删除

删除 runoob 目录

```
[root@www tmp]# rmdir runoob/
```

#### cp (复制文件或目录)

cp 即拷贝文件和目录。

语法:

```
[root@www ~]# cp [-adfilprsu] 来源档(source) 目标档(destination)
[root@www ~]# cp [options] source1 source2 source3 .... directory
```

选项与参数：

- **-a：**相当於 -pdr 的意思，至於 pdr 请参考下列说明；(常用)
- **-d：**若来源档为连结档的属性(link file)，则复制连结档属性而非文件本身；
- **-f：**为强制(force)的意思，若目标文件已经存在且无法开启，则移除后再尝试一次；
- **-i：**若目标档(destination)已经存在时，在覆盖时会先询问动作的进行(常用)
- **-l：**进行硬式连结(hard link)的连结档创建，而非复制文件本身；
- **-p：**连同文件的属性一起复制过去，而非使用默认属性(备份常用)；
- **-r：**递归持续复制，用於目录的复制行为；(常用)
- **-s：**复制成为符号连结档 (symbolic link)，亦即『捷径』文件；
- **-u：**若 destination 比 source 旧才升级 destination ！

用 root 身份，将 root 目录下的 .bashrc 复制到 /tmp 下，并命名为 bashrc

```
[root@www ~]# cp ~/.bashrc /tmp/bashrc
[root@www ~]# cp -i ~/.bashrc /tmp/bashrc
cp: overwrite `/tmp/bashrc'? n  <==n不覆盖，y为覆盖
```

#### rm (移除文件或目录)

语法：

```
 rm [-fir] 文件或目录
```

选项与参数：

- -f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
- -i ：互动模式，在删除前会询问使用者是否动作
- -r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！

将刚刚在 cp 的实例中创建的 bashrc 删除掉！

```
[root@www tmp]# rm -i bashrc
rm: remove regular file `bashrc'? y
```

如果加上 -i 的选项就会主动询问喔，避免你删除到错误的档名！

#### mv (移动文件与目录，或修改名称)

语法：

```
[root@www ~]# mv [-fiu] source destination
[root@www ~]# mv [options] source1 source2 source3 .... directory
```

选项与参数：

- -f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；
- -i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！
- -u ：若目标文件已经存在，且 source 比较新，才会升级 (update)

复制一文件，创建一目录，将文件移动到目录中

```
[root@www ~]# cd /tmp
[root@www tmp]# cp ~/.bashrc bashrc
[root@www tmp]# mkdir mvtest
[root@www tmp]# mv bashrc mvtest
```

将刚刚的目录名称更名为 mvtest2

```
[root@www tmp]# mv mvtest mvtest2
```

#### du(用于显示目录或文件的大小)

du 会显示指定的目录或文件所占用的磁盘空间

例如查看当前目录的大小：

```
# du -sh
605M    .
```

显示指定文件所占空间：

```
# du log2012.log 
300     log2012.log
```

方便阅读的格式显示test目录所占空间情况：

```shell
# du -h test
608K    test/test6
308K    test/test4
4.0K    test/scf/lib
4.0K    test/scf/service/deploy/product
4.0K    test/scf/service/deploy/info
12K     test/scf/service/deploy
16K     test/scf/service
4.0K    test/scf/doc
4.0K    test/scf/bin
32K     test/scf
8.0K    test/test3
1.3M    test
```

du 命令用于查看当前目录的总大小：

- **-s**：对每个Names参数只给出占用的数据块总数。
- **-a**：递归地显示指定目录中各文件及子目录中各文件占用的数据块数。若既不指定-s，也不指定-a，则只显示Names中的每一个目录及其中的各子目录所占的磁盘块数。
- **-b**：以字节为单位列出磁盘空间使用情况（系统默认以k字节为单位）。
- **-k**：以1024字节为单位列出磁盘空间使用情况。
- **-c**：最后再加上一个总计（系统默认设置）。
- **-l**：计算所有的文件大小，对硬链接文件，则计算多次。
- **-x**：跳过在不同文件系统上的目录不予统计。
- **-h**：以K，M，G为单位，提高信息的可读性。

## 3.6 Linux 文件内容查看

Linux系统中使用以下命令来查看文件的内容：

- cat 由第一行开始显示文件内容
- tac 从最后一行开始显示，可以看出 tac 是 cat 的倒着写！
- nl  显示的时候，顺道输出行号！
- more 一页一页的显示文件内容
- less 与 more 类似，但是比 more 更好的是，他可以往前翻页！
- head 只看头几行
- tail 只看尾巴几行

## 2.7 创建一个空文件

### touch

```shell
[root@VM-4-15-centos ~]# touch tencent.txt
[root@VM-4-15-centos ~]# ll
total 8
drwxr-xr-x 11 root root 4096 Nov  2 21:03 Directory
-rw-r--r--  1 root root    5 Nov  7 22:08 felix
-rw-r--r--  1 root root    0 Nov 17 16:07 tencent.txt
```

### vim



## 2.8 软连接ln

软链接也叫符号链接，类似于windows里面的快捷方式，主要存放了链接其他文件的路径

基本语法

```shell
ln -s[源文件或目录][软链接名] #给原文件创建一个软链接
```

实例

```shell
[root@VM-4-15-centos ~]# ln -s felix f
[root@VM-4-15-centos ~]# ll
total 8
drwxr-xr-x 11 root root 4096 Nov  2 21:03 Directory
lrwxrwxrwx  1 root root    5 Nov 17 17:49 f -> felix
```

删除软链接

```shell
[root@VM-4-15-centos ~]# rm f -rf
[root@VM-4-15-centos ~]# ls
Directory  felix  tencent.txt
```

## 2.9 查找

### find

从指定目录向下递归遍历查找指定文件

语法：find [搜索范围] [选项]

- -name按指定文件名查找
- -user按文件拥有者查找
- -size按文件大小查找

```shell
[root@VM-4-15-centos ~]# find ~/ -name tencent.txt
/root/tencent.txt
```

### locate

locate 指令可以快速定位文件路径。locate 指令**利用事先建立的系统中所有文件名称及路径的locate 数据库**实现快速定位给定的文件。Locate指令无需遍历整个文件系统，查询速度较快。为了保证查询结果的准确度，管理员必须**定期更新** locate 时刻

基础语法：locate 搜索文件

由于locate指令基于数据库查询，所以运行前，必须使用updatedb指令创建locate数据库

```shell
[root@VM-4-15-centos ~]# locate felix
/root/felix
/root/Directory/.idea/dictionaries/felixsfan.xml
```

## 2.10 Linux PATH环境变量及作用

在讲解 PATH 环境变量之前，首先介绍一下 which 命令，它用于查找某个命令所在的绝对路径。例如：

```shell
[root@localhost ~]# which rm
/bin/rm
[root@localhost ~]# which rmdir
/bin/rmdir
[root@localhost ~]# which ls
alias ls='ls --color=auto'
        /bin/ls
```

注意，ls 是一个相对特殊的命令，它使用 alias 命令做了别名，也就是说，我们常用的 ls 实际上执行的是 ls --color=auto。

通过使用 which 命令，可以查找各个外部命令（和 Shell 内置命令相对）所在的绝对路径。学到这里，读者是否有这样一个疑问，为什么前面在使用 rm、rmdir、ls 等命令时，无论当前位于哪个目录，都可以直接使用，而无需指明命令的执行文件所在的位置（绝对路径）呢？其实，这是 PATH 环境变量在起作用。

首先，执行如下命令：

```shell
[root@localhost ~]# echo $PATH
/usr/local/sbin:/usr/sbin:/sbin:/usr/local/bin:/usr/bin:/bin:/root/bin
```

这里的 echo 命令用来输出 PATH 环境变量的值（这里的 $ 是 PATH 的前缀符号），PATH 环境变量的内容是由一堆目录组成的，各目录之间用冒号“:”隔开。当执行某个命令时，Linux 会依照 PATH 中包含的目录依次搜寻该命令的可执行文件，一旦找到，即正常执行；反之，则提示无法找到该命令。

> 如果在 PATH 包含的目录中，有多个目录都包含某命令的可执行文件，那么会执行先搜索到的可执行文件。

从执行结果中可以看到，/bin 目录已经包含在 PATH 环境变量中，因此在使用类似 rm、rmdir、ls等命令时，即便直接使用其命令名，Linux 也可以找到该命令。

为了印证以上观点，下面举个反例，如果我们将 ls 命令移动到 /root 目录下，由于 PATH 环境变量中没有包含此目录，所有当直接使用 ls 命令名执行时，Linux 将无法找到此命令的可执行文件，并提示 No such file or directory，示例命令如下：

```shell
[root@localhost ~]# mv /bin/ls /root
[root@localhost ~]# ls
bash: /bin/ls: No such file or directory
```


此时，如果仍想使用 ls 命令，有 2 种方法，一种是直接将 /root 添加到 PATH 环境变量中，例如：

```shell
[root@localhost ~]# PATH=$PATH:/root
[root@localhost ~]# echo $PATH
/usr/local/sbin:/usr/sbin:/usr/local/bin:/usr/bin:/bin:/root/bin:/root
[root@localhost ~]# ls
Desktop    Downloads    Music    post-install     Public    Videos
Documents  ls           Pictures post-install.org Templates
```

> 注意，这种方式只是临时有效，一旦退出下次再登陆的时候，$PATH 就恢复成了默认值。


另一种方法是以绝对路径的方式使用此命令，例如：

```shell
[root@localhost ~]# /root/ls
Desktop    Downloads    Music    post-install     Public    Videos
Documents  ls           Pictures post-install.org Templates
```

 

为了不影响系统的正常使用，强烈建议大家将移动后的 ls 文件还原，命令如下：

```shell
[root@localhost ~]# mv /root/ls /bin
```

# 3.文本处理

## cat 

由第一行开始显示文件内容

- -A ：相当於 -vET 的整合选项，可列出一些特殊字符而不是空白而已；
- -b ：列出行号，仅针对非空白行做行号显示，空白行不标行号！
- -E ：将结尾的断行字节 $ 显示出来；
- -n ：列印出行号，连同空白行也会有行号，与 -b 的选项不同；
- -T ：将 [tab] 按键以 ^I 显示出来；
- -v ：列出一些看不出来的特殊字符

## tac

tac与cat命令刚好相反，文件内容从最后一行开始显示，可以看出 tac 是 cat 的倒着写！

## nl

显示行号

语法：

```shell
nl [-bnw] 文件
```

选项与参数：

- -b ：指定行号指定的方式，主要有两种：
  -b a ：表示不论是否为空行，也同样列出行号(类似 cat -n)；
  -b t ：如果有空行，空的那一行不要列出行号(默认值)；
- -n ：列出行号表示的方法，主要有三种：
  -n ln ：行号在荧幕的最左方显示；
  -n rn ：行号在自己栏位的最右方显示，且不加 0 ；
  -n rz ：行号在自己栏位的最右方显示，且加 0 ；
- -w ：行号栏位的占用的位数。

## more

一页一页翻动

在 more 这个程序的运行过程中，你有几个按键可以按的：

- 空白键 (space)：代表向下翻一页；
- Enter     ：代表向下翻『一行』；
- /字串     ：代表在这个显示的内容当中，向下搜寻『字串』这个关键字；
- :f      ：立刻显示出档名以及目前显示的行数；
- q       ：代表立刻离开 more ，不再显示该文件内容。
- b 或 [ctrl]-b ：代表往回翻页，不过这动作只对文件有用，对管线无用。

## less

less运行时可以输入的命令有：

- 空白键  ：向下翻动一页；
- [pagedown]：向下翻动一页；
- [pageup] ：向上翻动一页；
- /字串   ：向下搜寻『字串』的功能；
- ?字串   ：向上搜寻『字串』的功能；
- n     ：重复前一个搜寻 (与 / 或 ? 有关！)
- N     ：反向的重复前一个搜寻 (与 / 或 ? 有关！)
- q     ：离开 less 这个程序；

## head

用于显示文件开头部分内容，-n为指定显示多少行

```shell
[root@VM-4-15-centos ~]# head -n 5 felix
123
```

## tail

输出文件中尾部的内容

- tail 文件（查看文件后10行内容）
- tail -n 5 文件（查看文件后5行内容）
- **tail -f 文件**（实时追踪文件的所有更新）

## grep命令详解：查找文件内容

语法：grep [选项] 查找内容 源文件

**从文件内容查找匹配指定字符串的行：**

```shell
$ grep "被查找的字符串" 文件名
```

例子：在当前目录里第一级文件夹中寻找包含指定字符串的 .in 文件

```shell
grep "thermcontact" /.in
```

从文件内容查找与正则表达式匹配的行：

```shell
$ grep –e "正则表达式" 文件名
```

查找时不区分大小写：

```shell
$ grep –i "被查找的字符串" 文件名
```

查找匹配的行数：

$ grep -c "被查找的字符串" 文件名

从文件内容查找不匹配指定字符串的行：

```shell
$ grep –v "被查找的字符串" 文件名
```

从根目录开始查找所有扩展名为 .log 的文本文件，并找出包含 "ERROR" 的行：

```shell
$ find / -type f -name "*.log" | xargs grep "ERROR"
```

## 输入输出重定向

'>'输出重定向和'>>'追加

### 基本语法

```shell
ls -l>a.txt #列表的内容写入文件a.txt中（覆盖写）
ls -al>>文件 # 列表的内容追加到文件aa.txt的末尾
cat 文件1>文件2 # 将文件1的内容覆盖到文件2
echo "内容">>文件
```

## awk命令详解



## 管道符(|)

# 4. 用户管理

## 4.1 添加新的用户账号

```shell
useradd 选项 用户名
```

参数说明：

- 选项:
  - -c comment 指定一段注释性描述。
  - -d 目录 指定用户主目录，如果此目录不存在，则同时使用-m选项，可以创建主目录。
  - -g 用户组 指定用户所属的用户组。
  - -G 用户组，用户组 指定用户所属的附加组。
  - -s Shell文件 指定用户的登录Shell。
  - -u 用户号 指定用户的用户号，如果同时有-o选项，则可以重复使用其他用户的标识号。

**实例1**

```shell
useradd –d  /home/sam -m sam
```

此命令创建了一个用户sam，其中-d和-m选项用来为登录名sam产生一个主目录 /home/sam（/home为默认的用户主目录所在的父目录）。

**实例2**

```shell
useradd -s /bin/sh -g group –G adm,root gem
```

此命令新建了一个用户gem，该用户的登录Shell是 `/bin/sh`，它属于group用户组，同时又属于adm和root用户组，其中group用户组是其主组。

这里可能新建组：`#groupadd group及groupadd adm`

增加用户账号就是在/etc/passwd文件中为新用户增加一条记录，同时更新其他系统文件如/etc/shadow, /etc/group等。

Linux提供了集成的系统管理工具userconf，它可以用来对用户账号进行统一管理。

## 4.2 删除帐号

如果一个用户的账号不再使用，可以从系统中删除。删除用户账号就是要将/etc/passwd等系统文件中的该用户记录删除，必要时还删除用户的主目录。

删除一个已有的用户账号使用`userdel`命令，其格式如下：

```
userdel 选项 用户名
```

常用的选项是 **-r**，它的作用是把用户的主目录一起删除。

例如：

```
# userdel -r sam
```

此命令删除用户sam在系统文件中（主要是/etc/passwd, /etc/shadow, /etc/group等）的记录，同时删除用户的主目录。

## 4.3 修改帐号

修改用户账号就是根据实际情况更改用户的有关属性，如用户号、主目录、用户组、登录Shell等。

修改已有用户的信息使用`usermod`命令，其格式如下：

```
usermod 选项 用户名
```

常用的选项包括`-c, -d, -m, -g, -G, -s, -u以及-o等`，这些选项的意义与`useradd`命令中的选项一样，可以为用户指定新的资源值。

```
# usermod -s /bin/ksh -d /home/z –g developer sam
```

此命令将用户sam的登录Shell修改为ksh，主目录改为/home/z，用户组改为developer

## 4.4 用户口令的管理

用户管理的一项重要内容是用户口令的管理。用户账号刚创建时没有口令，但是被系统锁定，无法使用，必须为其指定口令后才可以使用，即使是指定空口令。

指定和修改用户口令的Shell命令是`passwd`。超级用户可以为自己和其他用户指定口令，普通用户只能用它修改自己的口令。命令的格式为：

```
passwd 选项 用户名
```

可使用的选项：

- -l 锁定口令，即禁用账号。
- -u 口令解锁。
- -d 使账号无口令。
- -f 强迫用户下次登录时修改口令。

如果默认用户名，则修改当前用户的口令。

例如，假设当前用户是sam，则下面的命令修改该用户自己的口令：

```
$ passwd 
Old password:****** 
New password:******* 
Re-enter new password:*******
```

如果是超级用户，可以用下列形式指定任何用户的口令：

```
# passwd sam 
New password:******* 
Re-enter new password:*******
```

普通用户修改自己的口令时，passwd命令会先询问原口令，验证后再要求用户输入两遍新口令，如果两次输入的口令一致，则将这个口令指定给用户；而超级用户为用户指定口令时，就不需要知道原口令。

## 4.5 查看用户信息

```shell
[root@VM-4-15-centos ~]# id root
uid=0(root) gid=0(root) groups=0(root)
[root@VM-4-15-centos ~]# id lighthouse
uid=1000(lighthouse) gid=1000(lighthouse) groups=1000(lighthouse)
```

## 4.6 切换用户

```shell
[root@VM-4-15-centos ~]# su - lighthouse
Last login: Sun Nov  8 20:15:19 CST 2020 on pts/0
```

## 4.7 查看当前用户

```shell
[root@VM-4-15-centos ~]# whoami
root
```

# 5. Linux系统用户组的管理

每个用户都有一个用户组，系统可以对一个用户组中的所有用户进行集中管理。不同Linux 系统对用户组的规定有所不同，如Linux下的用户属于与它同名的用户组，这个用户组在创建用户时同时创建。

用户组的管理涉及用户组的添加、删除和修改。组的增加、删除和修改实际上就是对/etc/group文件的更新。

### 5.1 增加一个新的用户组(groupadd)

**其格式如下**

```
groupadd 选项 用户组
```

可以使用的选项有：

- -g GID 指定新用户组的组标识号（GID）。
- -o 一般与-g选项同时使用，表示新用户组的GID可以与系统已有用户组的GID相同。

**实例1**

```
# groupadd group1
```

此命令向系统中增加了一个新组group1，新组的组标识号是在当前已有的最大组标识号的基础上加1。

**实例2**

```
# groupadd -g 101 group2
```

此命令向系统中增加了一个新组group2，同时指定新组的组标识号是101。

### 5.2 删除一个已有的用户组(groupdel)

**其格式如下**

```
groupdel 用户组
```

例如：

```
# groupdel group1
```

此命令从系统中删除组group1。

### 5.3 修改用户组的属性(groupmod)

**其语法如下**

```shell
groupmod 选项 用户组
```

常用的选项有：

- -g GID 为用户组指定新的组标识号。
- -o 与-g选项同时使用，用户组的新GID可以与系统已有用户组的GID相同。
- -n新用户组 将用户组的名字改为新名字

**实例1**

```shell
# groupmod -g 102 group2
```

此命令将组group2的组标识号修改为102。

**实例2**

```shell
# groupmod –g 10000 -n group3 group2
```

此命令将组group2的标识号改为10000，组名修改为group3。

### 5.4 如果一个用户同时属于多个用户组，那么用户可以在用户组之间切换，以便具有其他用户组的权限。

用户可以在登录后，使用命令newgrp切换到其他用户组，这个命令的参数就是目的用户组。例如：

```shell
$ newgrp root
```

这条命令将当前用户切换到root用户组，前提条件是root用户组确实是该用户的主组或附加组。类似于用户账号的管理，用户组的管理也可以通过集成的系统管理工具来完成。

### 5.5 与用户账号有关的系统文件

- #### /etc/passwd

- #### **/etc/shadow**

- #### /etc/group

# 6. 权限管理

## 6.1 sudo命令用法详解：系统权限管理

我们知道，使用 su 命令可以让普通用户切换到 root 身份去执行某些特权命令，但存在一些问题，比如说：

- 仅仅为了一个特权操作就直接赋予普通用户控制系统的完整权限；
- 当多人使用同一台主机时，如果大家都要使用 su 命令切换到 root 身份，那势必就需要 root 的密码，这就导致很多人都知道 root 的密码；


考虑到使用 su 命令可能对系统安装造成的隐患，最常见的解决方法是使用 sudo 命令，此命令也可以让你切换至其他用户的身份去执行命令。

相对于使用 su 命令还需要新切换用户的密码，sudo 命令的运行只需要知道自己的密码即可，甚至于，我们可以通过手动修改 sudo 的配置文件，使其无需任何密码即可运行。

sudo 命令默认只有 root 用户可以运行，该命令的基本格式为：

```shell
[root@localhost ~]# sudo [-b] [-u 新使用者账号] 要执行的命令
```

常用的选项与参数：

- -b ：将后续的命令放到背景中让系统自行运行，不对当前的 shell 环境产生影响。
- -u ：后面可以接欲切换的用户名，若无此项则代表切换身份为 root 。
- -l：此选项的用法为 sudo -l，用于显示当前用户可以用 sudo 执行那些命令。



# 7. shell

> http://c.biancheng.net/view/773.html

## 7.1执行Shell脚本（多种方法）

运行 Shell 脚本有两种方法，一种在新进程中运行，一种是在当前 Shell 进程中运行。

### 7.1.1 在新进程中运行 Shell 脚本

在新进程中运行 Shell 脚本有多种方法。

#### 7.1.1.1 将 Shell 脚本作为程序运行

Shell 脚本也是一种解释执行的程序，可以在终端直接调用（需要使用 chmod 命令给 Shell 脚本加上执行权限），如下所示：

```shell
[mozhiyan@localhost ~]$ cd demo                #切换到 test.sh 所在的目录
[mozhiyan@localhost demo]$ chmod +x ./test.sh  #给脚本添加执行权限
[mozhiyan@localhost demo]$ ./test.sh           #执行脚本文件
Hello World !                                  #运行结果
```

第 2 行中，`chmod +x`表示给 test.sh 增加执行权限。

第 3 行中，`./`表示当前目录，整条命令的意思是执行当前目录下的 test.sh 脚本。如果不写`./`，Linux 会到系统路径（由 PATH 环境变量指定）下查找 test.sh，而系统路径下显然不存在这个脚本，所以会执行失败。

通过这种方式运行脚本，脚本文件第一行的`#!/bin/bash`一定要写对，好让系统查找到正确的解释器。

```shell
#!/bin/bash
echo "Hello World !"
```

#### 7.1.1.2 将 Shell 脚本作为参数传递给 Bash 解释器

你也可以直接运行 Bash 解释器，将脚本文件的名字作为参数传递给 Bash，如下所示：

```shell
[mozhiyan@localhost ~]$ cd demo               #切换到 test.sh 所在的目录
[mozhiyan@localhost demo]$ /bin/bash test.sh  #使用Bash的绝对路径
Hello World !                                 #运行结果
```

通过这种方式运行脚本，不需要在脚本文件的第一行指定解释器信息，写了也没用。

更加简洁的写法是运行 bash 命令。bash 是一个外部命令，Shell 会在 /bin 目录中找到对应的应用程序，也即 /bin/bash，这点我们已在《[Shell命令的本质到底是什么](http://m.biancheng.net/view/vip_3229.html)》一节中提到。

```shell
[mozhiyan@localhost ~]$ cd demo
[mozhiyan@localhost demo]$ bash test.sh
Hello World !
```

这两种写法在本质上是一样的：第一种写法给出了绝对路径，会直接运行 Bash 解释器；第二种写法通过 bash 命令找到 Bash 解释器所在的目录，然后再运行，只不过多了一个查找的过程而已。

#### 7.1.1.3 检测是否开启了新进程

Linux 中的每一个进程都有一个唯一的 ID，称为 PID，使用`$$`变量就可以获取当前进程的 PID。`$$`是 Shell 中的特殊变量，稍后我会在《[Shell特殊变量](http://m.biancheng.net/view/806.html)》一节中展开讲解，读者在此不必深究。

首先编写如下的脚本文件，并命名为 check.sh：

```shell
#!/bin/bash
echo $$  #输出当前进程PID
```

然后使用以上两种方式来运行 check.sh：

```shell
[mozhiyan@localhost demo]$ echo $$
2861  #当前进程的PID
[mozhiyan@localhost demo]$ chmod +x ./check.sh
[mozhiyan@localhost demo]$ ./check.sh
4597  #新进程的PID
[mozhiyan@localhost demo]$ echo $$
2861  #当前进程的PID
[mozhiyan@localhost demo]$ /bin/bash check.sh
4584  #新进程的PID
```

你看，进程的 PID 都不一样，当然就是两个进程了。

### 7.1.2 在当前进程中运行 Shell 脚本

#### 7.1.2.1 source

这里需要引入一个新的命令——source 命令。source 是 [Shell 内置命令](http://m.biancheng.net/view/1136.html)的一种，它会读取脚本文件中的代码，并依次执行所有语句。你也可以理解为，source 命令会强制执行脚本文件中的全部命令，而忽略脚本文件的权限。

source 命令的用法为：

```shell
source filename
```

也可以简写为：

```shell
. filename
```

两种写法的效果相同。对于第二种写法，注意点号`.`和文件名中间有一个空格。

例如，使用 source 运行上节的 test.sh：

```shell
[mozhiyan@localhost ~]$ cd demo              #切换到test.sh所在的目录
[mozhiyan@localhost demo]$ source ./test.sh  #使用source
Hello World !
[mozhiyan@localhost demo]$ source test.sh    #使用source
Hello World !
[mozhiyan@localhost demo]$ . ./test.sh       #使用点号
Hello World !
[mozhiyan@localhost demo]$ . test.sh         #使用点号
Hello World !
```

你看，使用 source 命令不用给脚本增加执行权限，并且写不写`./`都行，是不是很方便呢？

#### 7.1.2.2 检测是否在当前 Shell 进程中

我们仍然借助`$$`变量来输出进程的 PID，如下所示：

```shell
[mozhiyan@localhost ~]$ cd demo
[mozhiyan@localhost demo]$ echo $$
5169  #当前进程PID
[mozhiyan@localhost demo]$ source ./check.sh
5169  #Shell脚本所在进程PID
[mozhiyan@localhost demo]$ echo $$
5169  #当前进程PID
[mozhiyan@localhost demo]$ . ./check.sh
5169  #Shell脚本所在进程PID
```

你看，进程的 PID 都是一样的，当然是同一个进程了。

### 7.1.3 总结

如果需要在新进程中运行 Shell 脚本，我一般使用`bash test.sh`这种写法；如果在当前进程中运行 Shell 脚本，我一般使用`. ./test.sh`这种写法。

## 7.2 shell变量

Shell 变量的作用域（Scope），就是 Shell 变量的有效范围（可以使用的范围）。

在不同的作用域中，同名的变量不会相互干涉，就好像 A 班有个叫小明的同学，B 班也有个叫小明的同学，虽然他们都叫小明（对应于变量名），但是由于所在的班级（对应于作用域）不同，所以不会造成混乱。但是如果同一个班级中有两个叫小明的同学，就必须用类似于“大小明”、“小小明”这样的命名来区分他们。

Shell 变量的作用域可以分为三种：

- 有的变量只能在函数内部使用，这叫做**局部变量**（local variable）；
- 有的变量可以在当前 Shell 进程中使用，这叫做**全局变量**（global variable）；
- 而有的变量还可以在子进程中使用，这叫做**环境变量**（environment variable）。

### 7.2.1 Shell 局部变量

Shell 也支持自定义函数，但是 Shell 函数和 [C++](http://c.biancheng.net/cplus/)、[Java](http://c.biancheng.net/java/)、[C#](http://c.biancheng.net/csharp/) 等其他编程语言函数的一个不同点就是：在 Shell 函数中定义的变量默认也是全局变量，它和在函数外部定义变量拥有一样的效果。请看下面的代码：

```shell
#!/bin/bash
#定义函数
function func(){
    a=99
}
#调用函数
func
#输出函数内部的变量
echo $a
```

输出结果：
99

a 是在函数内部定义的，但是在函数外部也可以得到它的值，证明它的作用域是全局的，而不是仅限于函数内部。

要想变量的作用域仅限于函数内部，可以在定义时加上`local`命令，此时该变量就成了局部变量。请看下面的代码：

```shell
#!/bin/bash
#定义函数
function func(){
    local a=99
}
#调用函数
func
#输出函数内部的变量
echo $a
```

输出结果为空，表明变量 a 在函数外部无效，是一个局部变量。

Shell 变量的这个特性和 [JavaScript](http://c.biancheng.net/js/) 中的变量是类似的。在 JavaScript 函数内部定义的变量，默认也是全局变量，只有加上`var`关键字，它才会变成局部变量。

### 7.2.2 Shell 全局变量

所谓全局变量，就是指变量在当前的整个 Shell 进程中都有效。每个 Shell 进程都有自己的作用域，彼此之间互不影响。在 Shell 中定义的变量，默认就是全局变量。

想要实际演示全局变量在不同 Shell 进程中的互不相关性，可在图形界面下同时打开两个 Shell，或使用两个终端远程连接到服务器（SSH）。

首先打开一个 Shell 窗口，定义一个变量 a 并赋值为 99，然后打印，这时在同一个 Shell 窗口中是可正确打印变量 a 的值的。然后再打开一个新的 Shell 窗口，同样打印变量 a 的值，但结果却为空，如图 1 所示。

![](/Users/fanqingwei/Desktop/学习/linux/images/shell全局变量.png)

这说明全局变量 a 仅仅在定义它的第一个 Shell 进程中有效，对新的 Shell 进程没有影响。这很好理解，就像小王家和小徐家都有一部电视机（变量名相同），但是同一时刻小王家和小徐家的电视中播放的节目可以是不同的（变量值不同）。

需要强调的是，全局变量的作用范围是当前的 Shell 进程，而不是当前的 Shell 脚本文件，它们是不同的概念。打开一个 Shell 窗口就创建了一个 Shell 进程，打开多个 Shell 窗口就创建了多个 Shell 进程，每个 Shell 进程都是独立的，拥有不同的进程 ID。在一个 Shell 进程中可以使用 source 命令执行多个 Shell 脚本文件，此时全局变量在这些脚本文件中都有效。

例如，现在有两个 Shell 脚本文件，分别是 a.sh 和 b.sh。a.sh 的代码如下：

```shell
#!/bin/bash
echo $a
b=200
```

b.sh 的代码如下：

```shell
#!/bin/bash
echo $b
```

打开一个 Shell 窗口，输入以下命令：

```shell
[c.biancheng.net]$ a=99
[c.biancheng.net]$ . ./a.sh
99
[c.biancheng.net]$ . ./b.sh
200
```

这三条命令都是在一个进程中执行的，从输出结果可以发现，在 Shell 窗口中以命令行的形式定义的变量 a，在 a.sh 中有效；在 a.sh 中定义的变量 b，在 b.sh 中也有效，变量 b 的作用范围已经超越了 a.sh。

### 7.2.3 Shell 环境变量

#### 7.2.3.1 export

**全局变量只在当前 Shell 进程中有效，对其它 Shell 进程和子进程都无效。如果使用`export`命令将全局变量导出，那么它就在所有的子进程中也有效了，这称为“环境变量”。**

环境变量被创建时所处的 Shell 进程称为父进程，如果在父进程中再创建一个新的进程来执行 Shell 命令，那么这个新的进程被称作 Shell 子进程。当 Shell 子进程产生时，它会继承父进程的环境变量为自己所用，所以说环境变量可从父进程传给子进程。不难理解，环境变量还可以传递给孙进程。

注意，两个没有父子关系的 Shell 进程是不能传递环境变量的，并且环境变量只能向下传递而不能向上传递，即“传子不传父”。

创建 Shell 子进程最简单的方式是运行 bash 命令，如图 2 所示。

![](/Users/fanqingwei/Desktop/学习/linux/images/进入shell子进程.gif)

​                                图2：进入 Shell 子进程  

通过`exit`命令可以一层一层地退出 Shell。

下面演示一下环境变量的使用：

```shell
[c.biancheng.net]$ a=22       #定义一个全局变量
[c.biancheng.net]$ echo $a    #在当前Shell中输出a，成功
22
[c.biancheng.net]$ bash       #进入Shell子进程
[c.biancheng.net]$ echo $a    #在子进程中输出a，失败

[c.biancheng.net]$ exit       #退出Shell子进程，返回上一级Shell
exit
[c.biancheng.net]$ export a   #将a导出为环境变量
[c.biancheng.net]$ bash       #重新进入Shell子进程
[c.biancheng.net]$ echo $a    #在子进程中再次输出a，成功
22
[c.biancheng.net]$ exit       #退出Shell子进程
exit
[c.biancheng.net]$ exit       #退出父进程，结束整个Shell会话
```

可以发现，默认情况下，a 在 Shell 子进程中是无效的；使用 export 将 a 导出为环境变量后，在子进程中就可以使用了。

`export a`这种形式是在定义变量 a 以后再将它导出为环境变量，如果想在定义的同时导出为环境变量，可以写作`export a=22`。

我们一直强调的是环境变量在 Shell 子进程中有效，并没有说它在所有的 Shell 进程中都有效；如果你通过终端创建了一个新的 Shell 窗口，那它就不是当前 Shell 的子进程，环境变量对这个新的 Shell 进程仍然是无效的。请看下图：

![](/Users/fanqingwei/Desktop/学习/linux/images/shell1号窗口.gif)

第一个窗口中的环境变量 a 在第二个窗口中就无效。

#### 7.2.3.2 环境变量也是临时的

通过 export 导出的环境变量只对当前 Shell 进程以及所有的子进程有效，如果最顶层的父进程被关闭了，那么环境变量也就随之消失了，其它的进程也就无法使用了，所以说环境变量也是临时的。

<u>有读者可能会问，如果我想让一个变量在所有 Shell 进程中都有效，不管它们之间是否存在父子关系，该怎么办呢？</u>

<u>只有将变量写入 Shell 配置文件中才能达到这个目的！Shell 进程每次启动时都会执行配置文件中的代码做一些初始化工作，如果将变量放在配置文件中，**并export这些变量**，那么每次启动进程都会定义这个变量。不知道如何修改配置文件的读者请猛击《[Shell配置文件的加载](http://c.biancheng.net/view/vip_3232.html)》《[编写自己的Shell配置文件](http://c.biancheng.net/view/vip_3233.html)》。</u>

#### 7.2.3.3 设置环境变量

Linux 下设置环境变量有三种方法，一种用于当前终端，一种用于当前用户，一种用于所有用户：

##### 用于当前终端

在当前终端中输入：

```shell
export PATH=$PATH:<你的要加入的路径>
```

不过上面的方法**只适用于当前终端**，一旦当前终端关闭或在另一个终端中，则无效

##### **用于当前用户**

在用户主目录下有一个 .bashrc 隐藏文件，可以在此文件中加入 PATH 的设置如下：

```shell
[root@VM-4-15-centos bin]# vim ~/.bashrc
```

加入：

```shell
export PATH=<你的要加入的路径>:$PATH
```

如果要加入多个路径，只要：

```shell
export PATH=<你要加入的路径1>:<你要加入的路径2>: ...... :$PATH
```

当中每个路径要以冒号分隔。

这样每次登录都会生效

添加PYTHONPATH的方法也是这样，在.bashrc中添加

```shell
export PYTHONPATH=/home/felix/setup/caffe-master/python:/home/felix/setup/mypy:$PYTHONPATH 
```

保存后在终端输入

```shell
 $ source ~/.bashrc 
```

使环境变量立即生效

##### 用于所有用户

```
$ sudo vim /etc/profile 
```

加入：

```shell
export PATH=<你要加入的路径>:$PATH
```

就可以了。

终端输入：

```shell
echo $PATH
```

 可以查看环境变量

##### 注意

修改环境变量后，除了第一种方法立即生效外，第二第三种方法要立即生效，可以**source ~/.bashrc**或者注销再次登录后就可以了

**基础语法**

- export 变量名=变量值 （将shell变量输出为环境变量）
- source 配置文件 （让修改后的配置文件立即生效）
- echo $变量名 （输出环境变量的值）

### 7.2.4 Shell四种运行方式（启动方式）

Shell 是一个应用程序，它的一端连接着 Linux 内核，另一端连接着用户。Shell 是用户和 Linux 系统沟通的桥梁，我们都是通过 Shell 来管理 Linux 系统。

我们可以直接使用 Shell，也可以输入用户名和密码后再使用 Shell；第一种叫做非登录式，第二种叫做登录式。

我们可以在 Shell 中一个个地输入命令并及时查看它们的输出结果，整个过程都在跟 Shell 不停地互动，这叫做交互式。我们也可以运行一个 Shell 脚本文件，让所有命令批量化、一次性地执行，这叫做非交互式。

总起来说，Shell 一共有四种运行方式：

- 交互式的登录 Shell；
- 交互式的非登录 Shell；
- 非交互式的登录 Shell；
- 非交互式的非登录 Shell。

#### 判断 Shell 是否是交互式

判断是否为交互式 Shell 有两种简单的方法。

1) 查看变量`-`的值，如果值中包含了字母`i`，则表示交互式（interactive）。

【实例1】在 CentOS GNOME 桌面环境自带的终端下输出`-`的值：

```shell
[c.biancheng.net]$ echo $-
himBH
```

包含了`i`，为交互式。

【实例2】在 Shell 脚本文件中输出`-`的值：

```shell
[c.biancheng.net]$ cat test.sh
#!/bin/bash

echo $-
[c.biancheng.net]$ bash ./test.sh
hB
```

不包含`i`，为非交互式。注意，必须在新进程中[运行 Shell 脚本](http://c.biancheng.net/view/739.html)。

2) 查看变量`PS1`的值，如果非空，则为交互式，否则为非交互式，因为非交互式会清空该变量。

【实例1】在 CentOS GNOME 桌面环境自带的终端下输出 PS1 的值：

```shell
[mozhiyan@localhost]$ echo $PS1
[/u@/h /W]/$
```

非空，为交互式。

【实例2】在 Shell 脚本文件中输出 PS1 的值：

```shell
[c.biancheng.net]$ cat test.sh
#!/bin/bash

echo $PS1
[c.biancheng.net]$ bash ./test.sh
```

空值，为非交互式。注意，必须在新进程中运行 Shell 脚本。

#### 判断 Shell 是否为登录式

判断 Shell 是否为登录式也非常简单，只需执行`shopt login_shell`即可，值为`on`表示为登录式，`off`为非登录式。

shopt 命令用来查看或设置 Shell 中的行为选项，这些选项可以增强 Shell 的易用性。

【实例1】在 CentOS GNOME 桌面环境自带的终端下查看 login_shell 选项：

```shell
[c.biancheng.net]$ shopt login_shell
login_shell    off
```


【实例2】按下`Ctrl+Alt+Fn`组合键切换到虚拟终端，输入用户名和密码登录后，再查看 login_shell 选项：

```shell
[c.biancheng.net]$ shopt login_shell
login_shell    on
```


【实例3】在 Shell 脚本文件中查看 login_shel 选项：

```shell
[c.biancheng.net]$ cat test.sh
#!/bin/bash

shopt login_shell
[c.biancheng.net]$ bash ./test.sh
login_shell    off
```

#### 常见的 Shell 启动方式

1) 通过 Linux 控制台（不是桌面环境自带的终端）或者 ssh 登录 Shell 时（这才是正常登录方式），为交互式的登录 Shell。

```shell
[c.biancheng.net]$ echo $PS1;shopt login_shell
[/u@/h /W]/$
login_shell    on
```

2) 执行 bash 命令时默认是非登录的，增加`--login`选项（简写为`-l`）后变成登录式。

```shell
[c.biancheng.net]$ cat test.sh
#!/bin/bash

echo $-; shopt login_shell
[c.biancheng.net]$ bash -l ./test.sh
hB
login_shell    on
```

3) 使用由`()`包围的[组命令](http://c.biancheng.net/view/3023.html)或者[命令替换](http://c.biancheng.net/view/1164.html)进入子 Shell 时，子 Shell 会继承父 Shell 的交互和登录属性。

```shell
[c.biancheng.net]$ bash
[c.biancheng.net]$ (echo $PS1;shopt login_shell)
[/u@/h /W]/$
login_shell    off
[c.biancheng.net]$ bash -l
[c.biancheng.net]$ (echo $PS1;shopt login_shell)
[/u@/h /W]/$vj
login_shell    on
```

4) ssh 执行远程命令，但不登录时，为非交互非登录式。

```shell
[c.biancheng.net]$ ssh localhost 'echo $PS1;shopt login_shell'

login_shell     off
```

5) 在 [Linux 桌面环境](http://c.biancheng.net/view/2912.html)下打开终端时，为交互式的非登录 Shell。

![](/Users/fanqingwei/Desktop/学习/linux/images/交互式非登录shell.gif)

### 7.2.5 Shell配置文件加载

#### 预备知识

无论是否是交互式，是否是登录式，Bash Shell 在启动时总要配置其运行环境，例如初始化环境变量、设置命令提示符、指定系统命令路径等。这个过程是通过加载一系列配置文件完成的，这些配置文件其实就是 Shell 脚本文件。

与 Bash Shell 有关的配置文件主要有 `/etc/profile`、`~/.bash_profile`、`~/.bash_login`、`~/.profile`、`~/.bashrc`、`/etc/bashrc`、`/etc/profile.d/*.sh`，**不同的启动方式会加载不同的配置文件**

#### 登录式的 Shell

Bash 官方文档说：如果是登录式的 Shell，首先会读取和执行 `/etc/profile`，这是所有用户的全局配置文件，接着会到用户主目录中寻找 `~/.bash_profile`、`~/.bash_login` 或者 `~/.profile`，它们都是用户个人的配置文件,以最后加载的配置为准，一般最后加载的配置会包含前面的配置

```shell
[root@VM-236-231-centos ~]# vim /etc/profile
...
for i in /etc/profile.d/*.sh ; do
    if [ -r "$i" ]; then
        if [ "${-#*i}" != "$-" ]; then
            . "$i"
        else
            . "$i" >/dev/null
        fi
    fi
done

unset i
unset -f pathmunge

PATH=$PATH
export PATH
```

```shell
[root@VM-236-231-centos ~]# vim ~/.bash_profile
PATH=$HOME/anaconda3/envs/python38/bin:$HOME/bin:$PATH
export PATH
```

不同的 Linux 发行版附带的个人配置文件也不同，有的可能只有其中一个，有的可能三者都有，笔者使用的是 CentOS 7，该发行版只有 ~/.bash_profile，其它两个都没有。

如果三个文件同时存在的话，到底应该加载哪一个呢？它们的优先级顺序是 `~/.bash_profile` > `~/.bash_login` > `~/.profile`

如果 `~/.bash_profile` 存在，那么一切以该文件为准，并且到此结束，不再加载其它的配置文件。

如果 `~/.bash_profile` 不存在，那么尝试加载 `~/.bash_login`。`~/.bash_login` 存在的话就到此结束，不存在的话就加载 `~/.profile。`

注意，`/etc/profile` 文件还会嵌套加载 `/etc/profile.d/*.sh`，请看下面的代码：

```shell
for i in /etc/profile.d/*.sh /etc/profile.d/sh.local ; do
    if [ -r "$i" ]; then
        if [ "${-#*i}" != "$-" ]; then
            . "$i"
        else
            . "$i" >/dev/null
        fi
    fi
done
```

同样，`~/.bash_profile` 也使用类似的方式加载 `~/.bashrc`：

```shell
if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi
```

#### 非登录的 Shell

如果以非登录的方式启动 Shell，那么就不会读取以上所说的配置文件，而是直接读取 **~/.bashrc**。

~/.bashrc 文件还会嵌套加载 /etc/bashrc，请看下面的代码：

```shell
if [ -f /etc/bashrc ]; then
. /etc/bashrc
fi
```

#### 总结

> https://blog.csdn.net/Field_Yang/article/details/51087178

##### 全局配置与个人配置

- 全局配置    `/etc/profile`， `/etc/profile.d/*.sh`，`/etc/bashrc`
- 个人配置   ` ~/.bashrc` , `~/.bash_profile`

##### 加载顺序

- 登录式shell如何读取配置文件`/etc/profile` {嵌套加载`/etc/profile.d/*.sh`和`/etc/profile.d/sh.local` }-->`~/.bash_profile` --> `~/.bashrc`-->`/etc/bashrc` 
- 非登录式*shell*如何配置文件 `~/.bashrc` -->`/etc/bashrc`-->`/etc/profile.d/*.sh`

![](/Users/fanqingwei/Desktop/学习/linux/images/shell环境变量启动过程.png)

##### $PATH

决定了**shell**将到哪些目录中寻找命令或程序，**PATH**的值是一系列目录，当您运行一个程序时，**Linux**在这些目录下进行搜寻编译链接。8

### 7.2.6 如何编写自己的shell配置文件



# 8. 打包压缩

## 8.1 打包（归档）和压缩（包含两者的区别）

**归档**，也称为打包，指的是一个文件或目录的集合，而这个集合被存储在一个文件中。归档文件没有经过压缩，因此，它占用的空间是其中所有文件和目录的总和。

> 通常，归档总是会和系统（数据）备份联系在一起，不过，有关数据备份的内容，留到后续章节讲，本章仅学习归档命令的基本使用。

和归档文件类似，压缩文件也是一个文件和目录的集合，且这个集合也被存储在一个文件中，但它们的不同之处在于，压缩文件采用了不同的存储方式，使其所占用的磁盘空间比集合中所有文件大小的总和要小。

**压缩**是指利用算法将文件进行处理，已达到保留最大文件信息，而让文件体积变小的目的。其基本原理为，通过查找文件内的重复字节，建立一个相同字节的词典文件，并用一个代码表示。比如说，在压缩文件中，有不止一处出现了 "C语言中文网"，那么，在压缩文件时，这个词就会用一个代码表示并写入词典文件，这样就可以实现缩小文件体积的目的。

由于计算机处理的信息是以二进制的形式表示的，因此，压缩软件就是把二进制信息中相同的字符串以特殊字符标记，只要通过合理的数学计算，文件的体积就能够被大大压缩。把一个或者多个文件用压缩软件进行压缩，形成一个文件压缩包，既可以节省存储空间，有方便在网络上传送。

如果你能够理解文件压缩的基本原理，那么很容易就能想到，对文件进行压缩，很可能损坏文件中的内容，因此，压缩又可以分为有损压缩和无损压缩。无损压缩很好理解，指的是压缩数据必须准确无误；有损压缩指的是即便丢失个别的数据，对文件也不会造成太大的影响。有损压缩广泛应用于动画、声音和图像文件中，典型代表就是影碟文件格式 mpeg、音乐文件格式 mp3 以及图像文件格式 jpg。

采用压缩工具对文件进行压缩，生成的文件称为压缩包，该文件的体积通常只有原文件的一半甚至更小。需要注意的是，压缩包中的数据无法直接使用，使用前需要利用压缩工具将文件数据还原，此过程又称解压缩。

Linux 下，常用归档命令有 2 个，分别是 tar 和 dd（相对而言，tar 的使用更为广泛）；常用的压缩命令有很多，比如 gzip、zip、bzip2 等。这些命令的详细用法，后续文件会做一一介绍。

## 8.2 tar打包命令详解

Linux 系统中，最常用的归档（打包）命令就是 tar，该命令可以将许多文件一起保存到一个单独的磁带或磁盘中进行归档。不仅如此，该命令还可以从归档文件中还原所需文件，也就是打包的反过程，称为解打包。

使用 tar 命令归档的包通常称为 tar 包（tar 包文件都是以“.tar”结尾的）。

### tar命令做打包操作

当 tar 命令用于打包操作时，该命令的基本格式为：

```shell
[root@localhost ~]#tar [选项] 源文件或目录
```

此命令常用的选项及各自的含义如表 1 所示。

| 选项    | 含义                                                         |
| ------- | ------------------------------------------------------------ |
| -c      | 将多个文件或目录进行打包。                                   |
| -A      | 追加 tar 文件到归档文件。                                    |
| -f 包名 | 指定包的文件名。包的扩展名是用来给管理员识别格式的，所以一定要正确指定扩展名； |
| -v      | 显示打包文件过程；                                           |

需要注意的是，在使用 tar 命令指定选项时可以不在选项前面输入“-”。例如，使用“cvf”选项和 “-cvf”起到的作用一样。

下面给大家举几个例子，一起看看如何使用 tar 命令打包文件和目录。

【例 1】打包文件和目录。

```shell
[root@localhost ~]# tar -cvf anaconda-ks.cfg.tar anaconda-ks.cfg
#把anacondehks.cfg打包为 anacondehks.cfg.tar文件
```

选项 "-cvf" 一般是习惯用法，记住打包时需要指定打包之后的文件名，而且要用 ".tar" 作为扩展名。打包目录也是如此：

选项 "-cvf" 一般是习惯用法，记住打包时需要指定打包之后的文件名，而且要用 ".tar" 作为扩展名。打包目录也是如此：

```shell
[root@localhost ~]# ll -d test/
drwxr-xr-x 2 root root 4096 6月 17 21:09 test/
#test是我们之前的测试目录
[root@localhost ~]# tar -cvf test.tar test/
test/
test/test3
test/test2
test/test1
#把目录打包为test.tar文件
tar命令也可以打包多个文件或目录，只要用空格分开即可。例如:
[root@localhost ~]# tar -cvf ana.tar anaconda-ks.cfg /tmp/
#把anaconda-ks.cfg文件和/tmp目录打包成ana.tar文件包
```


【例 2】打包并压缩目录。
首先声明一点，**压缩命令不能直接压缩目录，必须先用 tar 命令将目录打包，然后才能用 gzip 命令或 bzip2 命令对打包文件进行压缩**。例如：

```shell
[root@localhost ~]#ll -d test test.tar
drwxr-xr-x 2 root root 4096 6月 17 21:09 test
-rw-r--r-- 1 root root 10240 6月 18 01:06 test.tar
#我们之前已经把test目录打包成test.tar文件
[root@localhost ~]# gzip test.tar
[root@localhost ~]# ll test.tar.gz
-rw-r--r-- 1 root root 176 6月 18 01:06 test.tar.gz
#gzip命令会把test.tar压缩成test.tar.gz
```

### tar命令做解打包操作

当 tar 命令用于对 tar 包做解打包操作时，该命令的基本格式如下：

```shell
[root@localhost ~]#tar [选项] 压缩包
```

当用于解打包时，常用的选项与含义如表 2 所示。

| 选项    | 含义                                                       |
| ------- | ---------------------------------------------------------- |
| -x      | 对 tar 包做解打包操作。                                    |
| -f      | 指定要解压的 tar 包的包名。                                |
| -t      | 只查看 tar 包中有哪些文件或目录，不对 tar 包做解打包操作。 |
| -C 目录 | 指定解打包位置。                                           |
| -v      | 显示解打包的具体过程。                                     |


其实解打包和打包相比，只是把打包选项 "-cvf" 更换为 "-xvf"。我们来试试：

```shell
[root@localhost ~]# tar -xvf anaconda-ks.cfg. tar
#解打包到当前目录下
```

如果使用 "-xvf" 选项，则会把包中的文件解压到当前目录下。如果想要指定解压位置，则需要使用 "-C(大写)" 选项。例如：

```shell
[root@localhost ~]# tar -xvf test.tar -C /tmp
#把文件包test.tar解打包到/tmp/目录下
```

如果只想查看文件包中有哪些文件，则可以把解打包选项 "-x" 更换为测试选项 "-t"。例如：

```shell
[root@localhost ~]# tar -tvf test.tar
drwxr-xr-x root/root 0 2016-06-17 21:09 test/
-rw-r-r- root/root 0 2016-06-17 17:51 test/test3
-rw-r-r- root/root 0 2016-06-17 17:51 test/test2
-rw-r-r- root/root 0 2016-06-17 17:51 test/test1
#会用长格式显示test.tar文件包中文件的详细信息
```

### tar命令做打包压缩（解压缩解打包）操作

你可能会觉得 Linux 实在太不智能了，一个打包压缩，居然还要先打包成 ".tar" 格式，再压缩成 ".tar.gz" 或 ".tar.bz2" 格式。其实 tar 命令是可以同时打包压缩的，前面的讲解之所打包和压缩分开，是为了让大家了解在 Linux 中打包和压缩的不同。

当 tar 命令同时做打包压缩的操作时，其基本格式如下：

```shell
[root@localhost ~]#tar [选项] 压缩包 源文件或目录
```

此处常用的选项有以下 2 个，分别是：

- -z：压缩和解压缩 ".tar.gz" 格式；
- -j：压缩和解压缩 ".tar.bz2"格式。


【例 1】压缩与解压缩 ".tar.gz"格式。

```shell
[root@localhost ~]# tar -zcvf tmp.tar.gz /tmp/
#把/temp/目录直接打包压缩为".tar.gz"格式，通过"-z"来识别格式，"-cvf"和打包选项一致

[sett@VM-253-83-centos ~/settlement]$tar -zcvf monthly_defer.tar.gz monthly_defer --exclude=water_data
# 打包过滤掉某些文件夹
```

解压缩也只是在解打包选项 "-xvf" 前面加了一个 "-z" 选项。

```shell
[root@localhost ~]# tar -zxvf tmp.tar.gz
#解压缩与解打包".tar.gz"格式
```

前面讲的选项 "-C" 用于指定解压位置、"-t" 用于查看压缩包内容，在这里同样适用。

【例 2】压缩与解压缩 ".tar.bz2" 格式。
和".tar.gz"格式唯一的不同就是"-zcvf"选项换成了 "-jcvf"，如下所示：

```shell
[root@localhost ~]# tar -jcvf tmp.tar.bz2 /tmp/
#打包压缩为".tar.bz2"格式，注意压缩包文件名
[root@localhost ~]# tar -jxvf tmp.tar.bz2
#解压缩与解打包".tar.bz2"格式
```

把文件直接压缩成".tar.gz"和".tar.bz2"格式，才是 Linux 中最常用的压缩方式，这是大家一定要掌握的压缩和解压缩方法。

tar 命令最初被用来在磁带上创建备份，现在可以在任何设备上创建备份。利用 tar 命令可以把一大堆的文件和目录打包成一个文件，这对于备份文件或是将几个文件组合成为一个文件进行网络传输是非常有用的。

## 8.3 zip命令：压缩文件或目录

我们经常会在 Windows 系统上使用 “.zip”格式压缩文件，其实“.zip”格式文件是 Windows 和 Linux 系统都通用的压缩文件类型，属于几种主流的压缩格式（zip、rar等）之一，是一种相当简单的分别压缩每个文件的存储格式，

本节要讲的 zip 命令，类似于 Windows 系统中的 winzip 压缩程序，其基本格式如下：

```shell
[root@localhost ~]#zip [选项] 压缩包名 源文件或源目录列表
```

注意，zip 压缩命令需要手工指定压缩之后的压缩包名，注意写清楚扩展名，以便解压缩时使用。

该命令常用的几个选项及各自的含义如表 1 所示。



| 选项      | 含义                                                         |
| --------- | ------------------------------------------------------------ |
| -r        | 递归压缩目录，及将制定目录下的所有文件以及子目录全部压缩。   |
| -m        | 将文件压缩之后，删除原始文件，相当于把文件移到压缩文件中。   |
| -v        | 显示详细的压缩过程信息。                                     |
| -q        | 在压缩的时候不显示命令的执行过程。                           |
| -压缩级别 | 压缩级别是从 1~9 的数字，-1 代表压缩速度更快，-9 代表压缩效果更好。 |
| -u        | 更新压缩文件，即往压缩文件中添加新文件。                     |


下面给大家举几个例子。

```shell
【例 1】zip 命令的基本使用。

[root@localhost ~]# zip ana.zip anaconda-ks.cfg
adding: anaconda-ks.cfg (deflated 37%)
#压缩
[root@localhost ~]# ll ana.zip
-rw-r--r-- 1 root root 935 6月 1716:00 ana.zip
#压缩文件生成
```

不仅如此，所有的压缩命令都可以同时压缩多个文件，例如：

```shell
[root@localhost ~]# zip test.zip install.log install.log.syslog
adding: install.log (deflated 72%)
adding: install.log.syslog (deflated 85%)
#同时压缩多个文件到test.zip压缩包中
[root@localhost ~]#ll test.zip
-rw-r--r-- 1 root root 8368 6月 1716:03 test.zip
#压缩文件生成
```


【例 2】使用 zip 命令压缩目录，需要使用“-r”选项，例如：

```shell
[root@localhost ~]# mkdir dir1
#建立测试目录
[root@localhost ~]# zip -r dir1.zip dir1
adding: dir1/(stored 0%)
#压缩目录
[root@localhost ~]# ls -dl dir1.zip
-rw-r--r-- 1 root root 160 6月 1716:22 dir1.zip
#压缩文件生成
```

## 8.4 unzip命令：解压zip文件

unzip 命令可以查看和解压缩 zip 文件。该命令的基本格式如下：

```shell
[root@localhost ~]# unzip [选项] 压缩包名
```

此命令常用的选项以及各自的含义如表 1 所示。

| 选项        | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| -d 目录名   | 将压缩文件解压到指定目录下。                                 |
| -n          | 解压时并不覆盖已经存在的文件。                               |
| -o          | 解压时覆盖已经存在的文件，并且无需用户确认。                 |
| -v          | 查看压缩文件的详细信息，包括压缩文件中包含的文件大小、文件名以及压缩比等，但并不做解压操作。 |
| -t          | 测试压缩文件有无损坏，但并不解压。                           |
| -x 文件列表 | 解压文件，但不包含文件列表中指定的文件。                     |


【例 1】不论是文件压缩包，还是目录压缩包，都可以直接解压缩，例如：

```shell
[root@localhost ~]# unzip dir1.zip
Archive: dir1.zip
creating: dirl/
#解压缩
```


【例 2】使用 -d 选项手动指定解压缩位置，例如：

```shell
[root@localhost ~]# unzip -d /tmp/ ana.zip
Archive: ana.zip
inflating: /tmp/anaconda-ks.cfg
#把压缩包解压到指定位置
```



## 8.5 gzip命令：压缩文件或目录

gzip 是 Linux 系统中经常用来对文件进行压缩和解压缩的命令，通过此命令压缩得到的新文件，其扩展名通常标记为“.gz”。

再强调一下，gzip 命令只能用来压缩文件，不能压缩目录，即便指定了目录，也只能压缩目录内的所有文件。

gzip 命令的基本格式如下：

```shell
[root@localhost ~]# gzip [选项] 源文件
```

命令中的源文件，当进行压缩操作时，指的是普通文件；当进行解压缩操作时，指的是压缩文件。该命令常用的选项及含义如表 1 所示。

| 选项  | 含义                                                         |
| ----- | ------------------------------------------------------------ |
| -c    | 将压缩数据输出到标准输出中，并保留源文件。                   |
| -d    | 对压缩文件进行解压缩。                                       |
| -r    | 递归压缩指定目录下以及子目录下的所有文件。                   |
| -v    | 对于每个压缩和解压缩的文件，显示相应的文件名和压缩比。       |
| -l    | 对每一个压缩文件，显示以下字段：压缩文件的大小；未压缩文件的大小；压缩比；未压缩文件的名称。 |
| -数字 | 用于指定压缩等级，-1 压缩等级最低，压缩比最差；-9 压缩比最高。默认压缩比是 -6。 |


【例 1】基本压缩。
gzip 压缩命令非常简单，甚至不需要指定压缩之后的压缩包名，只需指定源文件名即可。我们来试试：

```shell
[root@localhost ~]# gzip install.log
#压缩instal.log 文件
[root@localhost ~]# ls
anaconda-ks.cfg install.log.gz install.log.syslog
#压缩文件生成，但是源文件也消失了
```


【例 2】保留源文件压缩。
在使用 gzip 命令压缩文件时，源文件会消失，从而生成压缩文件。这时有些人会有强迫症，就逼问笔者：能不能在压缩文件的时候，不让源文件消失？好吧，也是可以的，不过很别扭。

```shell
[root@localhost ~]# gzip -c anaconda-ks.cfg >anaconda-ks.cfg.gz
#使用-c选项，但是不让压缩数据输出到屏幕上，而是重定向到压缩文件中，这样可以缩文件的同时不删除源文件
[root@localhost ~]# ls
anaconda-ks.cfg anaconda-ks.cfg.gz install.log.gz install.log.syslog
#可以看到压缩文件和源文件都存在
```


【例 3】 压缩目录。
我们可能会想当然地认为 gzip 命令可以压缩目录。 我们来试试：

```shell
[root@localhost ~]# mkdir test
[root@localhost ~]# touch test/test1
[root@localhost ~]# touch test/test2
[root@localhost ~]# touch test/test3 #建立测试目录，并在里面建立几个测试文件
[root@localhost ~]# gzip -r test/
#压缩目录，并没有报错
[root@localhost ~]# ls
anaconda-ks.cfg anaconda-ks.cfg.gz install.log.gz install.log.syslog test
#但是查看发现test目录依然存在，并没有变为压缩文件
[root@localhost ~]# ls test/
testl .gz test2.gz test3.gz
#原来gzip命令不会打包目录，而是把目录下所有的子文件分别压缩
```

在 Linux 中，打包和压缩是分开处理的。而 gzip 命令只会压缩，不能打包，所以才会出现没有打包目录，而只把目录下的文件进行压缩的情况。

## 8.6 gunzip命令：解压缩文件或目录

gunzip 是一个使用广泛的解压缩命令，它用于解压被 gzip 压缩过的文件（扩展名为 .gz）。

对于解压被 gzip 压缩过的文件，还可以使用 gzip 自己，即 gzip -d 压缩包。

gunzip 命令的基本格式为：

```shell
[root@localhost ~]# gunzip [选项] 文件
```

该命令常用的选项及含义如表 1 所示。

| 选项 | 含义                                               |
| ---- | -------------------------------------------------- |
| -r   | 递归处理，解压缩指定目录下以及子目录下的所有文件。 |
| -c   | 把解压缩后的文件输出到标准输出设备。               |
| -f   | 强制解压缩文件，不理会文件是否已存在等情况。       |
| -l   | 列出压缩文件内容。                                 |
| -v   | 显示命令执行过程。                                 |
| -t   | 测试压缩文件是否正常，但不对其做解压缩操作。       |


【例 1】直接解压缩文件。

```shell
[root@localhost ~]# gunzip install.log.gz
```

当然，"gunzip -r"依然只会解压缩目录下的文件，而不会解打包。要想解压缩".gz"格式，还可以使用 "gzip -d"命令，例如：

```shell
[root@localhost ~]# gzip -d anaconda-ks.cfg.gz
```


【例 2】要解压缩目录下的内容，则需使用 "-r" 选项，例如：

```shell
[root@localhost ~]# gunzip -r test/
```

## 8.7 常用操作

### 8.7.1 查看压缩文件内容

注意，如果我们压缩的是一个纯文本文件，则可以直接使用 zcat 命令在不解压缩的情况下查看这个文本文件中的内容。例如：

```shell
[root@localhost ~]# zcat anaconda-ks.cfg.gz
```

### 8.7.2 过滤掉某些文件夹

```shell
[sett@VM-253-83-centos ~/settlement]$tar -zcvf monthly_defer.tar.gz monthly_defer --exclude=water_data
# 打包过滤掉某些文件夹
```

# 10.Linux（centos）下载软件

以centos为例，安装程序的方式：

- 源代码编译-------通用二进制格式：直接解压压缩文件，make编译后就可以使用。但一定要注意安装平台。
- 软件包管理器：如RPM。
- 软件包管理器的前端工具：如YUM。

软件包的组成部分：

- 二进制程序，位于 /bin, /sbin, /usr/bin, /usr/sbin, /usr/local/bin, /usr/local/sbin 等目录中。
- 库文件，位于 /lib, /usr/lib, /usr/local/lib 等目录中。Linux中库文件以 .so（动态链接库）或 .a（静态链接库）作为文件后缀名。
- 配置文件，位于 /etc 目录中。
- 帮助文件：手册, README, INSTALL (/usr/share/doc/)

## 9.1 源代码编译

- 绝大多数开源软件都是直接以原码形式发布的
- 源代码一般会被打成.tar.gz的归档压缩文件
- 源代码需要编译成为二进制形式之后才能够运行使用
- 源代码基本编译流程：
- - configure 检查编译环境；
  - make对源代码进行编译；
  - make insall 将生成的可执行文件安装到当前计算机中

### 9.1.1 wget

**wget命令详解**

https://www.cnblogs.com/sx66/p/11887016.html

yum是一种安装工具。如果你想安装软件，可以使用yum安装的时候，建议使用yum安装最好，基本上是一步完成。
比如安装Linux的rz/sz命令工具：
直接输入：yum install -y lrzsz 就会安装了。

wget是一种下载工具。可以下载网络上的资源，有点类似于迅雷。
比如安装redis时需要先下载redis软件然后再安装，那就用wget命令

**例子**

见lrzsz两种安装方式

## 9.2 rpm的使用

### 9.2.1 简介

这个命令可以用来查询，安装，卸载，更新软件包

RMP 是 LINUX 下的一种软件的可执行程序，你只要安装它就可以了。这种软件安装包通常是一个RPM包（Redhat Linux Packet Manager，就是Redhat的包管理器），后缀是.rpm。

RPM是Red Hat公司随Redhat Linux推出了一个软件包管理器，通过它能够更加轻松容易地实现软件的安装。

 1.安装软件：执行rpm -ivh rpm包名，如：
 /#rpm -ivh apache-1.3.6.i386.rpm 
 2.升级软件：执行rpm -Uvh rpm包名。
 3.反安装：执行rpm -e rpm包名。
 4.查询软件包的详细信息：执行rpm -qpi rpm包名
 5.查询某个文件是属于那个rpm包的：执行rpm -qf rpm包名
 6.查该软件包会向系统里面写入哪些文件：执行 rpm -qpl rpm包名

### 9.2.2 rpm与yum的关系与联系

**rpm :RedHat package manage的简写**

rpm 是linux的一种软件包名称，以.rmp结尾，安装的时候语法为：rpm -ivh，rpm包的安装有一个很大的缺点就是文件的关联性太大时，有时候装一个软件要安装很多其他的软件包，很麻烦

**yum（全称为 Yellow dog Updater, Modified）**

yum是一个在Fedora和RedHat以及SUSE中的Shell前端软件包管理器。基于RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。yum提供了查找、安装、删除某一个、一组甚至全部软件包的命令，而且命令简洁而又好记。
为了解决rpm安装时文件关联行太大的问题,RedHat小红帽开发了yum安装方法，他可以彻底解决这个关联性的问题，很方便，只要配置两个文件即可安装，安装方法是：yum -y install ，yum并不是一中包，而是安装包的软件
yum的命令形式一般是如下：yum [options] [command] [package ...]
其中的[options]是可选的，选项包括-h（帮助），-y（当安装过程提示选择全部为"yes"），-q（不显示安装的过程）等等。[command]为所要进行的操作，[package ...]是操作的对象。

### 9.2.3 搜索软件包

```shell
rpm -pa|grep sz
```

## 9.3 yum下载软件

### 9.3.1 yum简介

rpm软件包形式的管理虽然方便，但是需要手工解决软件包的依赖关系。很多时候安装一个软件安装一个软件需要安装1个或者多个其他软件，手动解决时，很复杂，yum解决这些问题。Yum是rpm的前端程序，主要目的是设计用来自动解决rpm的依赖关系，其特点：

1) 自动解决依赖关系

2) 可以对rpm进行分组，基于组进行安装操作

3) 引入仓库概念，支持多个仓库

4) 配置简单

### 9.3.2 yum管理软件仓库

yum仓库用来存放所有的现有的.rpm包，当使用yum安装一个rpm包时，需要依赖关系，会自动在仓库中查找依赖软件并安装。仓库可以是本地的，也可以是HTTP、FTP、nfs形式使用的集中地、统一的网络仓库。

### 9.3.3 配置

仓库的配置文件/etc/yum.repos.d目录下

### 9.3.4 使用

- yum install 安装；
- yum remove卸载；
- yum update 升级制定软件

### 9.3.5 镜像

安装的时候，会下载软件包.Rpm在安装，所以用国内仓库

改变镜像源

- 访问地址http://mirrors.163.com/
- 点centos使用帮助
- 按步骤来

### 9.3.6 查询

查询软件：可以使用

```shell
 yumsearch **
```

# 10. linux上传下载文件到Windows本地或服务器之间传输文件的方式

## 10.1 linux的rz、sz

ftp 的下载速度 是rz 的3倍以上

rz 命令新版linux 系统都会自带，如果没有请更新下源并且安装

```
 sz：将选定的文件发送（send）到本地机器
 rz：运行该命令会弹出一个文件选择窗口，从本地选择文件上传到服务器(receive)设置上传和下载的默认目录:
options–>session options–>X/Y/Zmodem 下可以设置上传和下载的目录
```

### **检查是否安装sz rz**

```shell
[root@VM-4-15-centos ~]# rpm -qa |grep rz
lrzsz-0.12.20-36.el7.x86_64
```

### lrzsz两种安装方式

#### 通过yum 安装

```shell
yum install -y lrzsz
```

#### 下载文件

**下载**

wget http://www.ohse.de/uwe/releases/lrzsz-0.12.20.tar.gz

**解压编译**

```shell
tar zxvf lrzsz-0.12.20.tar.gz
make：
cd lrzsz-0.12.20
./configure && make && make install
```

**创建软连接方便使用**

```shell
cd 编译目录
sudo ln -s 编译目录/lrz rz
sudo ln -s 编译目录/lsz sz
```

### rz 原理

使用的协议是ZMODEM协议

https://blog.csdn.net/ligerendaqiu123/article/details/44964791

## 10.2 linux ftp

### 10.2.1 介绍

FTP服务器简单地说，支持FTP协议的服务器就是FTP服务器。
与大多数Internet 服务一样，FTP也是一个客户机、服务器系统。用户通过一个支持FTP协议的客户机程序，连接到在远程主机上的FTP服务器程序。用户通过客户机程序向服务器程序发出命令，服务器程序执行用户所发出的命令，并将执行的结果返回到客户机。比如说，用户发出一条命令，要求服务器向用户传送某一个文件的一份拷贝，服务器会响应这条命令，将指定文件送至用户的机器上。客户机程序代表用户接收到这个文件，将其存放在用户目录中。

- **ftp的工作端口:** 

  ​            21 : 控制端口,用于在客户机和服务器之间建立连接

  ​            20 : 数据端口,用于服务器给客户机主动进行数据连接

- **vsftpd**:非常安全文件传输协议守护进程(very secure ftp daemon)

- **ftp的工作模式：主动port、被动passive模式**

  客户端与服务端传输数据时,服务端传输端口为20时为主动模式,传输端口为>1024的随机端口时为被动模式

### 10.2.2 ftp、sftp、vsftp、vsftpd这四个的区别

- **ftp** 是`File Transfer Protocol`的缩写，文件传输协议，用于在网络上进行文件传输的一套标准协议，使用客户/服务器模式。它属于网络传输协议的应用层。
  [了解更多ftp](https://baike.baidu.com/item/ftp/13839?fr=aladdin)
- **sftp** 是`SSH File Transfer Protocol`的缩写，安全文件传输协议；
  [了解更多sftp](https://baike.baidu.com/item/sftp/1184182?fr=aladdin)
- **vsftp** 是一个基于GPL发布的类Unix系统上使用的ftp服务器软件，它的全称是`Very Secure FTP`从此名称可以看出来，编制者的初衷是代码的安全；
  [了解更多vsftp](https://baike.baidu.com/item/VSFTP/2596628?fr=aladdin)
- **vsftpd** 是`very secure FTP daemon`的缩写，安全性是它的一个最大的特点。vsftpd 是一个 UNIX 类操作系统上运行的服务器的名字，它可以运行在诸如 Linux、BSD、Solaris、 HP-UNIX等系统上面，是一个完全免费的、开放源代码的ftp服务器软件；
  [了解更多vsftpd](https://baike.baidu.com/item/vsftpd)

### 10.2.3 检查Linux上是否安装了ftp

```shell
rpm -qa |grep vsftpd
```

如果已经安装了ftp服务，则出现ftp的版本信息

### 10.2.4 安装和配置环境

#### 服务端

**安装**

```shell
yum install vsftpd
```

**启动并查看ftp服务**

```shell
[root@VM-4-15-centos ~]# systemctl start vsftpd
[root@VM-4-15-centos ~]# systemctl enable vsftpd
Created symlink from /etc/systemd/system/multi-user.target.wants/vsftpd.service to /usr/lib/systemd/system/vsftpd.service.
[root@VM-4-15-centos ~]# systemctl status vsftpd
● vsftpd.service - Vsftpd ftp daemon
   Loaded: loaded (/usr/lib/systemd/system/vsftpd.service; enabled; vendor preset: disabled)
   Active: active (running) since Sun 2020-11-08 19:02:46 CST; 1min 17s ago
 Main PID: 20962 (vsftpd)
   CGroup: /system.slice/vsftpd.service
           └─20962 /usr/sbin/vsftpd /etc/vsftpd/vsftpd.conf

Nov 08 19:02:46 VM-4-15-centos systemd[1]: Starting Vsftpd ftp daemon...
Nov 08 19:02:46 VM-4-15-centos systemd[1]: Started Vsftpd ftp daemon.
```

**查看ftp的配置文件**

```shell
[root@VM-4-15-centos ~]# rpm -qc vsftpd
/etc/logrotate.d/vsftpd
/etc/pam.d/vsftpd
/etc/vsftpd/ftpusers
/etc/vsftpd/user_list
/etc/vsftpd/vsftpd.conf
```

#### linux客户端

**方式**

- 使用命令方式
- 使用浏览器地址栏
- **FTP客户端软件--->lftp/ftp**

lftp是一个文件客户端程序,它支持ftp、SETP、HTTP和FTPs等多种文件传输协议

**安装lftp软件**

```shell
yum install lftp -y /
yum install ftp
```

**连接**

```shell
[root@VM-4-15-centos ~]# lftp [hostname| ip-address]
lftp :~> quit
```

**windows的cmd客户端**

```shell
C:/Users/felixsfan>ftp [hostname| ip-address]
ftp>quit
```

**下载文件**

下载文件通常用get和mget这两条命令

- get
  格式：get [remote-file] [local-file]
  将文件从远端主机中传送至本地主机中。
  如要获取远程服务器上/usr/your/1.htm，则

```shell
  ftp> get /usr/your/1.htm1
```

- mget　　　　　　
  格式：mget [remote-files]
  从远端主机接收一批文件至本地主机。
  如要获取服务器上/usr/your/下的所有文件，则

```shell
ftp> cd /usr/your/
ftp> mget *.* (回车)
```

此时每下载一个文件，都会有提示。如果要除掉提示，则在mget *.* 命令前先执行:prompt off

注意：文件都下载到了linux主机的当前目录下。比如，在　/usr/my下运行的ftp命令，则文件都下载到了/usr/my下。

**上传文件**

- put

  格式：put local-file [remote-file]
  将本地一个文件传送至远端主机中。
  如要把本地的1.htm传送到远端主机/usr/your,并改名为2.htm

  ```shell
  ftp> put 1.htm /usr/your/2.htm (回车)
  ```

- mput
  格式：mput local-files
  将本地主机中一批文件传送至远端主机。
  如要把本地当前目录下所有html文件上传到服务器/usr/your/ 下

  ```shell
  ftp> cd /usr/your （回车）
  ftp> mput *.htm　（回车）
  ```

  注意：上传文件都来自于主机的当前目录下。比如，在　/usr/my下运行的ftp命令，则只有在/usr/my下的文件linux才会上传到服务器/usr/your 下

#### 创建用户

```shell
# 以root用户登录后，增加名为 xlftp 的用户，并指定 xlftp 用户的主目录为 /home/xlftp
[root@xl ~]# useradd -d /home/xlftp xlftp 
 
# 为 xlftp 设置或修改密码
[root@xl ~]# passwd xlftp
```

#### 用户登录

```shell
# 直接通过ftp命令登录
[root@xl ~]# ftp 192.168.1.100
 
# 在ftp命令模式下登录
ftp> open 192.168.1.100
 
# 指定ftp服务端口登录
[root@xl ~]# ftp 192.168.1.100 5005
```

## 10.3 linux下sz/rz,scp,sftp,ftp的区别与对比

1.sz/rz 传输速度慢,小文件可以直接使用,基于Zmodem

2.scp与sftp基于ssh,安全连接,但scp无管理文件的功能

3.sftp,替代ftp存在,但因为是加密传输,速度上有一定影响

4.ftp无加密传输,速度较快,但不安全

# 11. ssh

## 11.1 ssh协议及其实现

- SSH全称是Secure Shell，SSH协议是基于应用层的协议，为远程登录会话和其他网络服务提供安全性的协议。SSH使用最多的是远程登录和传输文件，实现此功能的传统协议都不安全（ftp，telnet等），因为它们使用明文传输数据。而SSH在传输过程中的数据是加密的，安全性更高。

- **OpenSSH**是ssh协议的开源实现，CentOS默认安装

- SSH协议版本

  v1: 基于CRC-32做MAC，不安全；man-in-middle
  v2：双方主机协议选择安全的MAC方式
  基于DH算法做密钥交换，基于RSA或DSA实现身份认证

- 两种方式的用户登录认证（见putty远程登录）

  **基于password**
  **基于密钥**

- Openssh软件组成

  - 相关包3个：
    openssh ：通用文件包
    openssh-clients ：客户端，可执行文件一般在bin下
    openssh-server ：服务器端，可执行文件一般在sbin下，后面带字母d
  - 工具：
    基于C/S结构
    Linux Client: ssh, scp, sftp，slogin
    Windows Client：xshell, putty, securecrt, sshsecureshellclient
    Server: sshd

## 11.2 ssh常用命令

<!--以下以openssh为例-->

## 11.3 linux下的OpenSSH

**查看**

```shell
[root@VM-4-15-centos ~]# ssh
usage: ssh [-1246AaCfGgKkMNnqsTtVvXxYy] [-b bind_address] [-c cipher_spec]
           [-D [bind_address:]port] [-E log_file] [-e escape_char]
           [-F configfile] [-I pkcs11] [-i identity_file]
           [-J [user@]host[:port]] [-L address] [-l login_name] [-m mac_spec]
           [-O ctl_cmd] [-o option] [-p port] [-Q query_option] [-R address]
           [-S ctl_path] [-W host:port] [-w local_tun[:remote_tun]]
           [user@]hostname [command]
```

**查看openssh的软件安装**

```shell
[root@VM-4-15-centos ~]rpm -qa|grep -E -w 'openssh'
openssh-7.4p1-21.el7.x86_64
openssh-clients-7.4p1-21.el7.x86_64
openssh-server-7.4p1-21.el7.x86_64
```

**连接命令**

应用见WeTerm

## 11.4 windows下的OpenSSH服务

```shell
C:/Users/felixsfan>ssh
usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface]
           [-b bind_address] [-c cipher_spec] [-D [bind_address:]port]
           [-E log_file] [-e escape_char] [-F configfile] [-I pkcs11]
           [-i identity_file] [-J [user@]host[:port]] [-L address]
           [-l login_name] [-m mac_spec] [-O ctl_cmd] [-o option] [-p port]
           [-Q query_option] [-R address] [-S ctl_path] [-W host:port]
           [-w local_tun[:remote_tun]] destination [command]
```

cmd连接服务器

```shell
ssh -p 22 root@49.234.42.199
```

## 11.5 登录linux实例

### 11.5.1 使用远程登录软件登录 Linux 实例

#### 11.5.1.1 操作场景

本文以 PuTTY 软件为例，介绍如何在 Windows 系统的本地计算机中使用远程登录软件登录 Linux 实例。

#### 11.5.1.2 适用本地操作系统

Windows

#### 11.5.1.3 鉴权方式

**密码**或**密钥**

#### 11.5.1.4 前提条件

- 您已获取登录实例的用户名及密码（或密钥）。
- 请确认本地计算机与实例之间的网络连通正常，以及实例的防火墙已放行22端口（创建实例时默认已开通22端口）。

#### 11.5.1.5 操作步骤

##### 使用密码登录

1. 下载 Windows 远程登录软件，即 PuTTY。
   PuTTY 的获取方式：[点此获取](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

2. 双击【putty.exe】，打开 PuTTY 客户端。

3. 在 PuTTY Configuration 窗口中，输入以下内容。如下图所示：

   1. ![](/Users/fanqingwei/Desktop/学习/linux/images/putty登录远程linux.png)

   参数举例说明如下：

   - Host Name（or IP address）：轻量应用服务器的公网 IP（登录 [轻量应用服务器控制台](https://console.cloud.tencent.com/lighthouse/instance/index)，可在服务器列表页中获取公网 IP）。
   - Port：轻量应用服务器的连接端口，必须设置为22。
   - Connect type：选择 “SSH”。
   - Saved Sessions：填写会话名称，例如 test。
     配置 “Host Name” 后，再配置 “Saved Sessions” 并保存，则后续使用时您可直接双击 “Saved Sessions” 下保存的会话名称即可登录服务器。

4. 单击【Open】，进入 “PuTTY” 的运行界面，提示 “login as:”。

5. 在 “login as” 后输入用户名，如 `root`，按 **Enter**。

6. 在 “Password” 后输入密码，按 **Enter**。

##### 使用密钥登录

1. 下载 Windows 远程登录软件，即 PuTTy。
   请分别下载 putty.exe 和 puttygen.exe 软件，PuTTy 的获取方式：[点此获取](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)。

2. 使用PuTTY安装目录里的puttygen.exe工具生成公密钥

   <img src="/Users/fanqingwei/Desktop/学习/linux/images/生成公密钥.png" style="zoom:50%;" />

3. 将生成的公钥保存到对应机器上 ~/.ssh/authorized_keys 文件

4. 将生成的私钥保存到本地机器上

   ![](/Users/fanqingwei/Desktop/学习/linux/images/putty登录远程linux.png)

5. Putty→会话:将服务器IP填好

   Putty→连接→数据:填好自动登陆用户名

   Putty→连接→SSH→认证:选择认证私钥文件（setup3保存的密钥文件）

   回到Putty→会话:保存的会话

   ![](/Users/fanqingwei/Desktop/学习/linux/images/putty1.png)

   ![](/Users/fanqingwei/Desktop/学习/linux/images/putty2.png)

   - Host Name (IP address)：轻量应用服务器的公网 IP（登录 [轻量应用服务器控制台](https://console.cloud.tencent.com/lighthouse/instance/index)，可在服务器列表页中获取公网 IP）。
   - Port：轻量应用服务器的连接端口，必须设置为22。
   - Connect type：选择 “SSH”。
   - Saved Sessions：填写会话名称，例如 test。
     配置 “Host Name” 后，再配置 “Saved Sessions” 并保存，则后续使用时您可直接双击 “Saved Sessions” 下保存的会话名称即可登录服务器。

6. 单击【Open】，进入 “PuTTY” 的运行界面，提示 “login as:”。

7. 在 “login as” 后输入用户名，如 `root`，按 **Enter**。

8. 若按照 [步骤4](https://cloud.tencent.com/document/product/1207/44578#Step4) 设置了加密私钥的密码，则请输入后按 **Enter**，密码默认不显示。如下图所示：

### 11.5.2 使用 SSH 登录 Linux 实例

##### 11.5.2.1 操作场景

本文介绍如何在 Linux、Mac OS 或者 Windows 系统的本地计算机中通过 SSH 登录 Linux 实例。

##### 11.5.2.2 适用本地操作系统

Linux、Mac OS 或 Windows（Windows 10 和 Windows Server 2019 版本）

##### 11.5.2.3鉴权方式

**密码**或**密钥**

##### 11.5.2.4 前提条件

- 您已获取登录实例的用户名（自定义用户名或默认用户名 root）及密码（或密钥）。
- 请确认本地计算机与实例之间的网络连通正常，以及实例的防火墙已放行22端口（创建实例时默认已开通22端口）。

##### 11.5.2.5 操作步骤

###### 使用密码登录

1. 执行以下命令，连接 Linux 云服务器。

   - 如果您的本地计算机使用非桌面版的 Linux 系统，可直接在系统界面执行以下命令。
   - 如果您的本地计算机使用桌面版 Linux 系统或 MacOS 系统，请先打开系统自带的终端（如 MacOS 的 Terminal），再执行以下命令。
   - 如果您的本地电脑为 Windows 10 或 Windows Server 2019 系统，需先打开命令提示符（CMD），再执行以下命令。

   ```shell
   ssh <username>@<IP address or domain name>
   #username 即为前提条件中已获取的用户名，如root、ubuntu等。
   #IP address or domain name 为您的 Linux 实例公网 IP 地址或自定义域名。
   ```

2. 输入已获取的密码，按 **Enter**，即可完成登录。

###### 使用密钥登录

1. 在你安装ssh后，自带了一个ssh-genkey的工具生成公钥和私钥。

2. 生成秘钥

   ```shell
   ssh-keygen -t rsa
   ```

   <img src="/Users/fanqingwei/Desktop/学习/linux/images/ssh生成秘钥.png" style="zoom:50%;" />

   生成之后会在用户的根目录生成一个 “.ssh”的文件夹

   <img src="/Users/fanqingwei/Desktop/学习/linux/images/生成ssh文件夹.png" style="zoom:50%;" />

   进入“.ssh”会生成以下几个文件

   ![](/Users/fanqingwei/Desktop/学习/linux/images/ssh文件夹内容.png)

3. authorized_keys:存放远程免密登录的公钥,主要通过这个文件记录多台机器的公钥

   - id_rsa : 生成的私钥文件
   - id_rsa.pub ： 生成的公钥文件
   - know_hosts : 已知的主机公钥清单

   如果希望ssh公钥生效需满足至少下面两个条件：

   - .ssh目录的权限必须是700 

   - .ssh/authorized_keys文件权限必须是600

4. 我们只要把 id_rsa.pub里面的公钥添加到目的服务器 `~./.ssh/`文件夹下的 authorized_keys文件中就可以了

   ```shell
   ssh-copy-id hodoop102
   输入密码
   ```

   登录

   ```shell
   ssh hadoop102
   ```

5. 同样你可以把公钥上传到其他服务器，这样用同一个私钥就可以登录多台服务器了。

6. **ssh无密登录区分用户权限，每一个用户都需要配置无密登录**

## 11.6 authorized_keys和known_hosts

### 11.6.1 authorized_keys

我们需要本地机器ssh访问远程服务器时为了减少输入密码的步骤，基本上都会在本地机器生成ssh公钥，然后将本地ssh公钥复制到远程服务器的.ssh/authorized_keys中，这样就可以免密登录了。（ 服务器之间访问同理）。
流程如下

本机生成 ssh公钥；
复制本机公钥到远程服务器.ssh/authorized_keys中，authorized_keys文件不存在则创建；
本机直接ssh连接远程；
结束

### 11.6.2 known_hosts

第一次连接远程数据库时我们可以发现我们本地的.ssh/目录下多了一个文件known_hosts，里面有我们刚刚连接的服务器的信息（如果以前就存在known_hosts，则会发现多了刚刚连接的服务器的信息）。
known_hosts文件每连接一个新的远程服务器都会产生一份数据，如下：

0.0.0.0 ecdsa-sha2-nistp256 AAAA...........=
1
包括远程机器ip、远程机器公钥
known_hosts有什么用？
手动修改一下远程机器A的密钥，然后再连接远程机器A，提示：

The authenticity of host '0.0.0.0 (0.0.0.0)' can't be established.
ECDSA key fingerprint is SHA256:xxxxxxxx.
Are you sure you want to continue connecting (yes/no)?
1
2
3
得到类似这种提示，大概意思就是登录远程机器A验证失败，然后向你确定是否需要继续连接。
known_hosts的作用就很明显了，known_hosts的作用就是记录你曾经远程连接过的机器信息。如果远程机器信息不变，则直接连接，如果改变了ssh就会问你一下，小子，你还连不连了？
如果你yes， 他就重新保存一份到known_hosts文件了。

## 11.7 WETERM登录机器和数据库

登录机器

![](/Users/fanqingwei/Desktop/踩过的坑/images/登录机器.png)

铁将军不需要用户名密码，需要提前申请权限即可

![](/Users/fanqingwei/Desktop/踩过的坑/images/铁将军.png)

跳板机登录机器

![](/Users/fanqingwei/Desktop/踩过的坑/images/跳板机.png)

![](/Users/fanqingwei/Desktop/踩过的坑/images/跳板机2.png)

登录数据库

```shell
mysql -usett -psett@1234 -h9.88.10.64 -P15114 --default-character-set=utf8
```

一般是登录到网络策略符合的机器再去登录数据库

1.先配置用跳板机

![](/Users/fanqingwei/Desktop/踩过的坑/images/登录数据库1.png)

2.通过跳板机登录铁将军机器，再登录沙箱测试数据库

![](/Users/fanqingwei/Desktop/踩过的坑/images/登录数据库2.png)

## 11.8 Linux限制某些用户或IP登录SSH、允许特定IP登录SSH

https://www.cnblogs.com/eos666/p/10684902.html

### **限制用户SSH登录**

1. 只允许指定用户进行登录（白名单）

   在/etc/ssh/sshd_config配置文件中设置AllowUsers选项，（配置完成需要重启 SSHD 服务）格式如下：

   ```
   AllowUsers azureuser oracle@172.0.0.14 oracle@127.0.0.1
   
   ssh仅允许azureuser用户登录
   oracle用户仅允许本地IP地址172.0.0.14和127.0.0.1登录
   ```

2. 只拒绝指定用户进行登录（黑名单）：

   在/etc/ssh/sshd_config配置文件中设置DenyUsers选项，（配置完成需要重启SSHD服务）格式如下： 

   ```
   DenyUsers    jenkins   nginx    #Linux系统账户        
   # 拒绝 jenkins、nginx 帐户通过 SSH 登录系统
   ```

   重启SSH

   ```
   service sshd reload    # centos 6.x
   systemctl reload sshd  # centos 7.x
   ```

### **限制IP SSH登录**

**说明：这里的IP是指客户端IP，不是服务器IP，下面的例子使用了hosts.allow文件的配置方式，目的是快，但也有不灵活的，建议改成iptables的方案。
**

除了可以禁止某个用户登录，我们还可以针对**固定的IP进行禁止登录**，linux 服务器通过设置**/etc/hosts.allow**和**/etc/hosts.deny**这个两个文件，hosts.allow许可大于hosts.deny可以限制或者允许某个或者某段IP地址远程 SSH 登录服务器，方法比较简单，且设置后立即生效，不需要重启SSHD服务，具体如下：

/etc/hosts.allow添加

```
sshd:192.168.0.1:allow  #允许 192.168.0.1 这个IP地址SSH登录
sshd:192.168.0.:allow #允许192.168.0.1/24这段IP地址的用户登录，多个网段可以以逗号隔开，比如192.168.0.,192.168.1.:allow
```

/etc/hosts.allow添加

```
sshd:ALL #允许全部的ssh登录 
```

hosts.allow和hosts.deny两个文件同时设置规则的时候，**hosts.allow文件中的规则优先级高**，按照此方法设置后服务器只允许192.168.0.1这个IP地址的SSH登录，其它的IP都会拒绝。

/etc/hosts.deny添加

```shell
sshd:ALL #拒绝全部IP
```

# 12. 防火墙

常用端口

```shell
http 80
https 443
ftp 21
ssh 22
远程桌面 3389
mysql 3306
redis 4389
memcahce 11211
smtp 25
pop3 110
```

查看防火墙状态

```shell
systemctl status iptables
```

停止firewall

```shell
systemctl stop iptables
```

禁止防火墙开机时自启动

```shell
systemctl disable  iptables
```

重启防火墙

```shell
firewall-cmd --reload
```

禁止firewall开机启动

```shell
systemctl disable firewalld.service 
```

开启防火墙

```shell
systemctl start firewalld.service
```

开启8080端口

```shell
firewall-cmd --zone=public --add-port=8080/tcp --permanent；开启8080端口
firewall-cmd --zone=public --add-port=80/tcp --permanent;开启80端口
 

　　--zone=public：表示作用域为公共的；

　　--add-port=8080/tcp：添加tcp协议的端口8080；

　　--permanent：永久生效，如果没有此参数，则只能维持当前服务生命周期内，重新启动后失效
```

查看所有开启的端口

```shell
firewall-cmd --list-ports
```

查看端口号占用

```shell
netstat -pan | grep 8080
```

命令来重启网络和查看网络信息

```shell
systemctl restart network 和ifconfig | grep network 
```

测试端口通不通

```shell
telnet IP 端口
# 例子
telnet 192.168.1.92 3306
```

# 13.GCC

## 13.1 GCC是什么?

对于 GCC 的认知，很多读者还仅停留在“GCC 是一个C语言编译器”的层面，是很片面的。谈到 GCC，就不得不提 GNU 计划。GNU 全称 GNU's Not UNIX，又被称为“革奴计划”，由理查德·斯托曼于 1983 年发起。GNU 计划的最终目标是打造出一套完全自由（即自由使用、自由更改、自由发布）、开源的操作系统，并初步将其命名为 GNU 操作系统。

GNU 计划的实施可谓一波三折，最重要的一点是，虽然该计划为 GNU 操作系统量身定做了名为 Thr Hurd 的系统内核，但由于其性能比不上同时期诞生的 Linux 内核，最终 GNU 计划放弃 The Hurd 而选用 Linux 作为 GNU 操作系统的内核。在 Linux 内核的基础上，GNU 计划开发了很多系统部件，GCC 就是其中之一（除此之外，还有 Emacs 等非常实用的软件）。

> 由此看来，GNU 计划最终实现了“打造一套自由、开源的操作系统”的初衷，但该操作系统并非完全产自 GNU 计划，因此其被称为 GNU/Linux 操作系统（人们更习惯称为 Linux 操作系统）。注意，开源、自由并不等于免费，有关它们的区别，读者可阅读《[开源就等于免费吗？](http://c.biancheng.net/view/vip_5041.html)》一文。

早期 GCC 的全拼为 GNU C Compiler，即 GUN 计划诞生的 C 语言编译器，显然最初 GCC 的定位确实只用于编译 C 语言。但经过这些年不断的迭代，GCC 的功能得到了很大的扩展，它不仅可以用来编译 C 语言程序，还可以处理 C++、Go、Objective -C 等多种编译语言编写的程序。与此同时，由于之前的 GNU C Compiler 已经无法完美诠释 GCC 的含义，所以其英文全称被重新定义为 GNU Compiler Collection，即 GNU 编译器套件。

> 所谓编译器，可以简单地将其理解为“翻译器”。要知道，计算机只认识二进制指令（仅有 0 和 1 组成的指令），我们日常编写的 C 语言代码、C++ 代码、Go 代码等，计算机根本无法识别，只有将程序中的每条语句翻译成对应的二进制指令，计算机才能执行。

GCC 编译器从而停止过改进。截止到今日（2020 年 5 月），GCC 已经从最初的 1.0 版本发展到了 10.1 版本，期间历经了上百个版本的迭代。作为一款最受欢迎的编译器，GCC 被移植到数以千计的硬件/软件平台上，几乎所有的 Linux 发行版也都默认安装有 GCC 编译器。



| 硬件      | 操作系统                                           |
| --------- | -------------------------------------------------- |
| Alpha     | Red Hat Linux 7.1                                  |
| HPPA      | HPUX 11.0                                          |
| Intel x86 | Debian Linux 2.2、Red Hat Linux 6.2 和 FreeBSD 4.5 |
| MIPS      | IRIX 6.5                                           |
| PowerPC   | AIX 4.3.3                                          |
| Sparc     | Solaris 2.7                                        |


值得一提的是，原汁原味的 GCC 编译器没有我们熟悉的界面窗口，要想使用它，必须编写对应的 gcc 命令。所谓原汁原味，指的是纯 GCC 编译器和集成了 GCC 编译器的开发软件（IDE），和前者相比，后者在集成 GCC 编译器功能的同时，还向用户提供了友好的界面窗口，使得用户即便记不住 gcc 命令，也能从事开发工作，这极大地降低了用户的学习成本。

> 我们知道，操作系统大致分为 2 大阵营，分别是 Windows 阵营和类 Unix 阵营（包括 Unix、Linux、Mac OS、安卓等）。通常情况下，Windows 系统下用户更习惯使用现有的 IDE 来编译程序；而类 Unix 系统下，用户更喜欢直接编写相应的 gcc 命令来编译程序。

在了解什么是 GCC 编译器的基础上，这里以在 CentOS 操作系统（Linux 发行版之一）上使用 gcc 命令运行 C 语言程序为例，让读者更直观的感受一下 GCC 编译器的功能和使用方法。

如下是我们在 vim 编辑器中编写的一段完整的 C 语言程序，其功能是输出一个 "Hello, World!"：

![](/Users/fanqingwei/Desktop/学习/linux/images/GCC1.gif)

对于此程序，我们可以使用如下的 gcc 命令：

gcc demo.c -o demo.exe

> 有关 gcc 命令各部分的含义，后续章节会做详细讲解，这里不必深究。


下图演示了如何使用 gcc 命令将 C 语言代码编译成一个可执行文件：

![](/Users/fanqingwei/Desktop/学习/linux/images/GCC2.gif)
图 2 gcc 命令编译 C 语言程序


如图 2 所示，通过编写对应的 gcc 命令并执行，就可以轻松将我们编写的程序编译成一个二进制可执行文件。

## 13.2 GCC编译器下载和安装教程（针对Linux发行版）

由于 Linux 操作系统的自由、开源，在其基础上衍生出了很多不同的 Linux 操作系统，如 CentOS、Ubuntu、Debian 等。这些 Linux 发行版中，大多数都默认装有 GCC 编译器（版本通常都较低）。

如果读者不清楚当前使用的 Linux 发行版是否已经装有 GCC 编译器，或者忘记了已安装 GCC 的版本号，可以打开命令行窗口（Terminal）并执行如下指令：

```shell
[root@bogon ~]# gcc --version
gcc (GCC) 4.4.7 20120313 (Red Hat 4.4.7-23)
Copyright (C) 2010 Free Software Foundation, Inc.
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

可以看到，本系统（为 CentOS 6.5）中已经安装有 4.4.7 版本的 GCC 编译器。反之，如果该命令的执行结果为：

```shell
[root@bogon ~]# gcc -version
bash: /usr/bin/gcc: No such file or directory
```

则表明当前系统中尚未安装 GCC 编译器。

### 13.2.1 快速安装GCC编译器

要知道，每个 Linux 发行版都有自己的软件包管理工具，比如 CentOS 系统的 yum 包管理器、Ubuntu 系统的 apt 包管理器等等，并且大多数 Linux 发行版都提供有 GCC 编译器的二进制软件包。因此，我们可以直接“傻瓜式”地安装 GCC 编译器（以 yum 为例）：

```shell
yum -y install gcc
yum -y install gcc-c++
```

通过执行这 2 条指令，就可以在 CentOS 系统中利用 gcc 命令来执行 C 语言程序，利用 g++ 命令来执行 C++ 程序。

> 注意，读者切勿认为 gcc 只能用来编译 C 语言程序，g++ 只能用于编译 C++ 程序，这是不对的。有关 gcc 和 g++ 命令，我们会在后续章节给大家做详细讲解。

需要注意的是，采用此方式安装的 GCC 编译器，版本通常较低。以我当前使用的 Centos 6.5 系统为例，通过执行以上 2 条指令，其安装的是 GCC 版本为 4.4.7，而当下 GCC 编译器已经迭代至 10.0.1 版本。

这意味着，如果读者使用此方式安装 GCC 编译器，需要查看 GCC 编译器的版本（通过`gcc --version`指令）是否符合自己的需求。举个例子，如果读者想编译 C++11 标准下的 C++ 程序，则至少要安装 4.8 版本的 GCC 编译器，低版本的 GCC 编译器是不支持 C++11 标准的。

总的来说，如果读者对 GCC 编译器的版本没有要求，则推荐使用此安装方式；反之，如果读者需要安装指定版本的 GCC 编译器，则需要使用接下来介绍的安装方法。

### 13.2.2 手动安装GCC编译器

> 注意，此方式需要耗费的时间较长（几个小时），但支持安装指定版本的 GCC 编译器，并适用于大多数 Linux 发行版（不同之处会有额外提示）；同时，如果读者想对已安装的 GCC 编译器进行版本升级，也可以使用此方式。

和使用 yum 自动安装 GCC 编译器不同，手动安装 GCC 编译器需要提前到 GCC 官网下载指定版本的 GCC 源码安装包，读者可直接点击[GCC源码包](http://mirror.hust.edu.cn/gnu/gcc/)进行下载。值得一提的是，每个版本中都包含 2 种格式的压缩包，分别为 tar.gz 和 tar.xz，只是压缩格式不同，本节以 tar.gz 压缩包教大家安装 GCC 编译器。

这里以在 CentOS 系统上安装 10.1.0 最新版本的 GCC 编译器为例，下载的是 gcc-10.1.0.tar.gz 源码压缩包，整个安装过程如下：
\1) 以源码的方式安装 GCC 编译器，即手动编译 GCC 编译器的源码，需要当前系统中存在一个可用的编译器，我们可以用旧版本的 GCC 编译器来编译安装新版本的 GCC 编译器。

如果读者所用的操作系统已安装有旧版本的 GCC 编译器，则无需另行安装；反之，读者需要先运行如下命令，安装一个旧版本的 GCC 编译器：

```shell
yum install -y glibc-static libstdc++-static
yum install -y gcc gcc-c++
```



> 再次强调，不同 Linux 发行版的软件管理器也有所不同，比如 yum 仅适用于 CentOS、RedHat、Fedora 发行版；而 Ubuntu 系统需使用 apt 完成安装。

其中，第一行指令用于安装编译 C 和 C++ 代码所需的静态链接库；第二行指令用于安装编译 C 和 C++ 代码的 gcc 和 g++ 指令。

\2) 找到下载好的 gcc-10.1.0.tar.gz 安装包，将其解压至 /usr/local/ 目录下，解压命令为：

```shell
[root@bogon local]# tar -xf gcc-10.1.0.tar.gz -C /usr/local/
```

由此，在 usr/local/ 目录下，就生成了一个新的名为 gcc-10.1.0 的目录（也就是文件夹）。

\3) 紧接着执行如下指令，下载安装 GCC 所需要的依赖包（如 gmp、mpfr、mpc 等）：

```shell
[root@bogon local]# cd /usr/local/gcc-10.1.0
[root@bogon gcc-10.1.0]# ./contrib/download_prerequisites
```



> 注意，一定观察此命令的执行结果，保证其确实是将 gmp、mpfr、mpc 等依赖包成功下载下来，才能继续执行下面的安装步骤。


\4) 完成以上准备工作之后，就正式进入安装 GCC 编译器的环节。首先，我们需要手动创建一个目录，用于存放编译 GCC 源码包生成的文件。执行如下命令：

```shell
[root@bogon local]# mkdir gcc-build-10.1.0
[root@bogon local]# cd gcc-build-10.1.0
```

由此，我们在 /usr/local 目录下手动创建了名为 gcc-build-10.1.0 的目录文件，并进入到该目录中。

同时，由于 GCC 编译器支持多种编程语言的编译，而实际情况中我们可能只需要编译 1~2 种编程语言，因此需要对其进行必要的配置。通过执行如下指令，可以配置 GCC 支持编译 C 和 C++ 语言：

```shell
[root@bogon gcc-build-10.1.0]# ../gcc-10.1.0/configure --enable-checking=release --enable-languages=c,c++ --disable-multilib
```



> 有关 configure 后跟的各个参数的含义，读者仅需要了解 --enable-languages 用于设定 GCC 编译器支持编译的编程语言的类别，例如 c、c++、java、objc、obj-c++、go 等。


\5) 在第 4 步创建好 makefile 文件之后，接下来就可以使用 make 命令来编译 GCC 源程序：

```sh
[root@bogon gcc-build-10.1.0]# make
```

注意，编译过程是非常耗时的（本机耗时 6 小时完成编译），因此如果读者选用此方式安装 GCC，则在执行 make 命令时一定要安排合适的时间。

\6) 最后，执行如下命令安装 gcc：

```shell
[root@bogon gcc-build-10.1.0]# make install
```


\7) 由此就成功安装了 10.1.0 版本的 GCC 编译器。需要注意的是，如果此时读者直接执行 gcc --version，则 gcc 版本仍会显示之前安装的版本。操作系统重启之后，GCC 版本就会自行更正过来。

重启操作系统之后，执行 gcc --version 命令，如果看到如下输出结果，则证明安装成功：

```shell
[root@bogon ~]# gcc --version
gcc (GCC) 10.1.0
Copyright (C) 2020 Free Software Foundation, Inc.
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

> 注意，本节是以 CentOS 操作系统为例，演示安装 GCC 编译器的具体过程，但实际上，此过程也完全适用于其它 Linux 发行版，只是在个别细节上（比如使用 yum 还是 apt 有或是其他软件包管理器），读者需要灵活调整，将其修改为自己所用操作系统支持的指令。

## 13.3 GCC的组成部分以及使用到的软件

[GCC](http://c.biancheng.net/gcc/) 是由许多组件组成的。表 1 列出了 GCC 的各个部分，但它们也并不总是出现 的。有些部分是和语言相关的，所以如果没有安装某种特定语言，系统:中就不会出现相关的文件。

| 部分        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| c++         | gcc 的一个版木，默认语言设置为 [C++](http://c.biancheng.net/cplus/)，而且在连接的时候自动包含标准 C++ 库。这和 g++ 一样 |
| ccl         | 实际的C编译程序                                              |
| cclplus     | 实际的 C++ 编泽程序                                          |
| collect2    | 在不使用 GNU 连接程序的系统上，有必要运行 collect2 来产生特定的全局初始化代码（例如 C++ 的构造函数和析构函数） |
| configure   | GCC 源代码树根目录中的一个脚木。用于设置配置值和创建GCC 编译程序必需的 make 程序的描述文件 |
| crt0.o      | 这个初始化和结束代码是为每个系统定制的，而且也被编译进该文件，该文件然后会被连接到每个可执行文件中来执行必要的启动和终止程序 |
| cygwin1.dll | Windows 的共享库提供的 API，模拟 UNIX 系统调用               |
| f77         | 该驱动程序可用于编译 Fortran                                 |
| f771        | 实际的 Fortran 编译程序                                      |
| g++         | gcc 的一个版木，默认语言设置为 C++，而且在连接的时候自动包含标准 C++ 库。这和 c++ 一样 |
| gcc         | 该驱动程序等同于执行编译程序和连接程序以产生需要的输出       |
| gcj         | 该驱动程序用于编译 [Java](http://c.biancheng.net/java/)      |
| gnat1       | 实际的 Ada 编译程序                                          |
| gnatbind    | 一种工具，用于执行 Ada 语言绑定                              |
| gnatlink    | 一种工具，用于执行 Ada 语言连接                              |
| jc1         | 实际的 Java 编译程序                                         |
| libgcc      | 该库包含的例程被作为编泽程序的一部分，是因为它们可被连接到实际的可执行程序中。 它们是特殊的例程，连接到可执行程序，来执行基木的任务，例如浮点运算。这些库中的例程通常都是平台相关的 |
| libgcj      | 运行时库包含所有的核心 Java 类                               |
| libobjc     | 对所有 Objective-C 程序都必须的运行时库                      |
| libstdc++   | 运行时库，包括定义为标准语言一部分的所有的 C++ 类和函数      |


表 2 列出的软件和 GCC 协同工作，目的是实现编译过程。有些是很基本的（例如 as 和 Id），而其他一些则是非常有用但不是严格需要的。尽管这些工具中的很多都是各种 UNIX 系统的本地工具，但还是能够通过 GNU 包 binutils 得到大多数工具。



| 工具      | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| addr2line | 给出一个可执行文件的内部地址，addr2line 使用文件中的调试信息将地址翻泽成源代码文 件名和行号。该程序是 binutils 包的一部分 |
| ar        | 这是一个程序，可通过从文档中增加、删除和析取文件来维护库文件。通常使用该工具是为了创建和管理连接程序使用的目标库文档。该程序是 binutils 包的一部分 |
| as        | GNU 汇编器。实际上它是一族汇编器，因为它可以被编泽或能够在各种不同平台上工作。 该程序是 binutils 包的一部分 |
| autoconf  | 产生的 shell 脚木自动配置源代码包去编泽某个特定版木的 UNIX   |
| c++filt   | 程序接受被 C++ 编泽程序转换过的名字（不是被重载的），而且将该名字翻泽成初始形式。 该程序是 binutils 包的一部分 |
| f2c       | 是 Fortran 到C的翻译程序。不是 GCC 的一部分                  |
| gcov      | gprof 使用的配置工具，用来确定程序运行的时候哪一部分耗时最大 |
| gdb       | GNU 调试器，可用于检查程序运行时的值和行为                   |
| GNATS     | GNU 的调试跟踪系统（GNU Bug Tracking System）。一个跟踪 GCC 和其他 GNU 软件问题的在线系统 |
| gprof     | 该程序会监督编泽程序的执行过程，并报告程序中各个函数的运行时间，可以根据所提供 的配置文件来优化程序。该程序是 binutils 包的一部分 |
| ld        | GNU 连接程序。该程序将目标文件的集合组合成可执行程序。该程序是 binutils 包的一部 |
| libtool   | 一个基本库，支持 make 程序的描述文件使用的简化共享库用法的脚木 |
| make      | 一个工具程序，它会读 makefile 脚木来确定程序中的哪个部分需要编泽和连接，然后发布 必要的命令。它读出的脚木（叫做 makefile 或 Makefile）定义了文件关系和依赖关系 |
| nlmconv   | 将可重定位的目标文件转换成 NetWare 可加载模块（NetWare Loadable Module, NLM）。该 程序是 binutils 的一部分 |
| nm        | 列出目标文件中定义的符号。该程序是 binutils 包的一部分       |
| objcopy   | 将目标文件从一种二进制格式复制和翻译到另外一种。该程序是 binutils 包的一部分 |
| objdump   | 显示一个或多个目标文件中保存的多种不同信息。该程序是 binutils 包的一部分 |
| ranlib    | 创建和添加到 ar 文档的索引。该索引被 Id 使用来定位库中的模块。该程序是 binutils 包的一部分 |
| ratfor    | Ratfor 预处理程序可由 GCC 激活，但不是标准 GCC 发布版的一部分 |
| readelf   | 从 ELF 格式的目标文件显示信息。该程序是 binutils 包的一部分  |
| size      | 列出目标文件中每个部分的名字和尺寸。该程序是 binutils 包的一部分 |
| strings   | 浏览所有类型的文件，析取出用于显示的字符串。该程序是 binutils 包的一部分 |
| strip     | 从目标文件或文档库中去掉符号表，以及其他调试所需的信息。该程序是 binutils 包的一部 |
| vcg       | Ratfor 浏览器从文木文件中读取信息，并以图表形式显示它们。而 vcg 工具并不是 GCC 发布中的一部分，但 -dv 选项可被用来产生 vcg 可以理解的优化数据的格式 |
| windres   | Window 资源文件编泽程序。该程序是 binutils 包的一部分        |

## 13.4 gcc和g++是什么，有什么区别？

发展至今（2020 年 6 月份），GCC 编译器已经更新至 10.1.0 版本，其功能也由最初仅能编译 C 语言，扩增至可以编译多种编程语言，其中就包括 C++ 。

> 除此之外，当下的 GCC 编译器还支持编译 Go、Objective-C，Objective-C ++，Fortran，Ada，D 和 BRIG（HSAIL）等程序，甚至于 GCC 6 以及之前的版本还支持编译 Java 程序。但本教程主要讲解如何使用 GCC 编译器编译运行 C 和 C++ 程序，因此有关其它编程语言如何使用 GCC 编译器编译，将不再做具体讲解。

那么，在已编辑好 C 语言或者 C++ 代码的前提下，如何才能调用 GCC 编译器为我们编译程序呢？很简单，GCC 编译器已经为我们提供了调用它的接口，对于 C 语言或者 C++ 程序，可以通过执行 gcc 或者 g++ 指令来调用 GCC 编译器。

值得一提的是，实际使用中我们更习惯使用 gcc 指令编译 C 语言程序，用 g++ 指令编译 C++ 代码。需要强调的一点是，这并不是 gcc 和 g++ 的区别，gcc 指令也可以用来编译 C++ 程序，同样 g++ 指令也可以用于编译 C 语言程序。

那么，gcc 和 g++ 的区别是什么呢？接下来就给读者做详细的讲解。

实际上，只要是 GCC 支持编译的程序代码，都可以使用 gcc 命令完成编译。可以这样理解，gcc 是 GCC 编译器的通用编译指令，因为根据程序文件的后缀名，gcc 指令可以自行判断出当前程序所用编程语言的类别，比如：

- xxx.c：默认以编译 C 语言程序的方式编译此文件；
- xxx.cpp：默认以编译 C++ 程序的方式编译此文件。
- xxx.m：默认以编译 Objective-C 程序的方式编译此文件；
- xxx.go：默认以编译 Go 语言程序的方式编译此文件；

> 当然，gcc 指令也为用户提供了“手动指定代表编译方式”的接口，即使用 -x 选项。例如，gcc -xc xxx 表示以编译 C 语言代码的方式编译 xxx 文件；而 gcc -xc++ xxx 则表示以编译 C++ 代码的方式编译 xxx 文件。有关 -x 选项的用法，后续会给出具体样例。

但如果使用 g++ 指令，则无论目标文件的后缀名是什么，该指令都一律按照编译 C++ 代码的方式编译该文件。也就是说，对于 .c 文件来说，gcc 指令以 C 语言代码对待，而 g++ 指令会以 C++ 代码对待。但对于 .cpp 文件来说，gcc 和 g++ 都会以 C++ 代码的方式编译。

有读者可能会认为，C++ 兼容 C 语言，因此对于 C 语言程序来说，使用 gcc 编译还是使用 g++ 编译，应该没有什么区别，事实并非如此。严格来说，C++ 标准和 C 语言标准的语法要求是有区别的。举个例子：

```shell
//位于 demo.c 文件中#include <stdio.h>int main(){    const char * a = "abc";    printStr(a);    return;}int printStr(const char* str){    printf(str);}
```

如上所示，这是一段不规范的 C 语言代码。如果我们使用 gcc 指令编译，如下所示：

```shell
[root@bogon ~]# gcc -xc demo.c  #或者直接运行 gcc demo.c
[root@bogon ~]#
```

可以看到，该指令的执行过程并没有发生任何错误。而同样的程序，如果我们使用 g++ 指令编译：

```shell
[root@bogon ~]# g++ demo.c
demo.c: In function ‘int main()’:
demo.c:5: error: ‘printStr’ was not declared in this scope
demo.c:6: error: return-statement with no value, in function returning ‘int’
[root@bogon ~]# 
```

可以看到，GCC 编译器发现了 3 处错误。显然，C++ 标准对代码书写规范的要求更加严格。

除此之外对于编译执行 C++ 程序，使用 gcc 和 g++ 也是有区别的。要知道，很多 C++ 程序都会调用某些标准库中现有的函数或者类对象，而单纯的 gcc 命令是无法自动链接这些标准库文件的。

举个例子：

```shell
//demo.cpp#include <iostream>#include <string>using namespace std;int main(){    string str ="C语言中文网";    cout << str << endl;    return 0;}
```

这是一段很简单的 C++ 程序，其通过 <string> 头文件提供的 string 字符串类定义了一个字符串对象，随后使用 cout 输出流对象将其输出。对于这段 C++ 代码，如果我们使用 g++ 指令编译，如下所示：

```shell
[root@bogon ~]# g++ demo.cpp
[root@bogon ~]#
```

可以看到，整个编译过程没有报任何错误。但如果使用 gcc 指令：

```shell
[root@bogon ~]# gcc demo.cpp
/tmp/ccIOnwra.o: In function `main':
demo.cpp:(.text+0x13): undefined reference to `std::allocator<char>::allocator()'
\#省略了诸多错误信息
```

读者可自行编译，就可以看到很多报错信息。其根本原因就在于，该程序中使用了标准库 <iostream> 和<string> 提供的类对象，而 gcc 默认是无法找到它们的。

如果想使用 gcc 指令来编译执行 C++ 程序，需要在使用 gcc 指令时，手动为其添加 -lstdc++ -shared-libgcc 选项，表示 gcc 在编译 C++ 程序时可以链接必要的 C++ 标准库。也就是说，我们可以这样编译 demo.cpp 文件：

```shell
[root@bogon ~]# gcc -xc++ -lstdc++ -shared-libgcc demo.cpp
[root@bogon ~]#
```

由此，demo.cpp 就被成功的编译了。

> 读者可以这样认为，g++ 指令就等同于`gcc -xc++ -lstdc++ -shared-libgcc`指令。显然后者书写是非常麻烦的，大多数人会更喜欢前者。

## 13.5 GCC使用静态链接库和动态链接库

我们知道，C、C++程序从源文件到生成可执行文件需经历 4 个阶段，分别为预处理、编译、汇编和链接，本节将重点围绕链接阶段，对静态链接库和动态链接库做详细的讲解。

有关链接操作的具体细节，感兴趣的读者可阅读《[到底什么是链接，它起到了什么作用？](http://c.biancheng.net/view/vip_2113.html)》和《[符号——链接的粘合剂](http://c.biancheng.net/view/vip_2114.html)》这两节。总的来说链接阶段要完成的工作，就是将同一项目中各源文件生成的目标文件以及程序中用到的库文件整合为一个可执行文件。

通过前面对 gcc（g++）指令的系统学习，我们已经学会了如何使用 gcc -c 指令将源文件生成对应的目标文件。那么，什么是库文件呢？

所谓库文件，读者可以将其等价为压缩包文件，该文件内部通常包含不止一个目标文件（也就是二进制文件）。值得一提的是，库文件中每个目标文件存储的代码，并非完整的程序，而是一个个实用的功能模块。例如，C 语言库文件提供有大量的函数（如 scanf()、printf()、strlen() 等），C++ 库文件不仅提供有使用的函数，还有大量事先设计好的类（如 string 字符串类）。

库文件的产生，极大的提高了程序员的开发效率，因为很多功能根本不需要从 0 开发，直接调取包含该功能的库文件即可。并且，库文件的调用方法也很简单，以 C 语言中的 printf() 输出函数为例，程序中只需引入 <stdio.h> 头文件，即可调用 printf() 函数。

有读者可能会问，调用库文件为什么还要牵扯到头文件呢？首先，头文件和库文件并不是一码事，它们最大的区别在于：头文件只存储变量、函数或者类等这些功能模块的声明部分，库文件才负责存储各模块具体的实现部分。读者可以这样理解：所有的库文件都提供有相应的头文件作为调用它的接口。也就是说，库文件是无法直接使用的，只能通过头文件间接调用。

> 头文件和库文件相结合的访问机制，最大的好处在于，有时候我们只想让别人使用自己实现的功能，并不想公开实现功能的源码，就可以将其制作为库文件，这样用户获取到的是二进制文件，而头文件又只包含声明部分，这样就实现了“将源码隐藏起来”的目的，且不会影响用户使用。关于如何制作库文件，后续章节会做详细讲解。


事实上，库文件只是一个统称，代指的是一类压缩包，它们都包含有功能实用的目标文件。要知道，虽然库文件用于程序的链接阶段，但编译器提供有 2 种实现链接的方式，分别称为静态链接方式和动态链接方式，其中采用静态链接方式实现链接操作的库文件，称为静态链接库；采用动态链接方式实现链接操作的库文件，称为动态链接库。

那么，静态链接库和动态链接库到底有什么不同呢？

### 13.5.1 静态链接库

静态链接库实现链接操作的方式很简单，即程序文件中哪里用到了库文件中的功能模块，GCC 编译器就会将该模板代码直接复制到程序文件的适当位置，最终生成可执行文件。

使用静态库文件实现程序的链接操作，既有优势也有劣势：

- 优势是，生成的可执行文件不再需要任何静态库文件的支持就可以独立运行（可移植性强）；
- 劣势是，如果程序文件中多次调用库中的同一功能模块，则该模块代码势必就会被复制多次，生成的可执行文件中会包含多段完全相同的代码，造成代码的冗余。

> 和使用动态链接库生成的可执行文件相比，静态链接库生成的可执行文件的体积更大。

另外值得一提的是，在 Linux 发行版系统中，静态链接库文件的后缀名通常用 .a 表示；在 Windows 系统中，静态链接库文件的后缀名为 .lib。

### 13.5.2 动态链接库

动态链接库，又称为共享链接库。和静态链接库不同，采用动态链接库实现链接操作时，程序文件中哪里需要库文件的功能模块，GCC 编译器不会直接将该功能模块的代码拷贝到文件中，而是将功能模块的位置信息记录到文件中，直接生成可执行文件。

显然，这样生成的可执行文件是无法独立运行的。采用动态链接库生成的可执行文件运行时，GCC 编译器会将对应的动态链接库一同加载在内存中，由于可执行文件中事先记录了所需功能模块的位置信息，所以在现有动态链接库的支持下，也可以成功运行。

采用动态链接库实现程序的连接操作，其优势和劣势恰好和静态链接库相反：

- 优势是，由于可执行文件中记录的是功能模块的地址，真正的实现代码会在程序运行时被载入内存，这意味着，即便功能模块被调用多次，使用的都是同一份实现代码（这也是将动态链接库称为共享链接库的原因）。
- 劣势是，此方式生成的可执行文件无法独立运行，必须借助相应的库文件（可移植性差）。

> 和使用静态链接库生成的可执行文件相比，动态链接库生成的可执行文件的体积更小，因为其内部不会被复制一堆冗余的代码。

在 Linux 发行版系统中，动态链接库的后缀名通常用 .so 表示；在 Windows 系统中，动态链接库的后缀名为 .dll。

### 13.5.3 总结

值得一提的是，GCC 编译器生成可执行文件时，默认情况下会优先使用动态链接库实现链接操作，除非当前系统环境中没有程序文件所需要的动态链接库，GCC 编译器才会选择相应的静态链接库。如果两种都没有（或者 GCC 编译器未找到），则链接失败。

在 Linux 发行版中，静态链接库和动态链接库通常存放在 /usr/bin 或者 /bin 目录下。图 1 所示是在 CentOS 系统中，系统库文件在 /usr/bin 目录下的存储状态。

# 14.Linux系统管理（进程管理、工作管理）

## 14.1 Linux进程管理及作用

**什么是进程和程序**

进程是正在执行的一个程序或命令，每个进程都是一个运行的实体，都有自己的地址空间，并占用一定的系统资源。程序是人使用计算机语言编写的可以实现特定目标或解决特定问题的代码集合。

这么讲很难理解，那我们换一种说法。程序是人使用计算机语言编写的，可以实现一定功能，并且可以执行的代码集合。而进程是正在执行中的程序。当程序被执行时，执行人的权限和属性，以及程序的代码都会被加载入内存，操作系统给这个进程分配一个 ID，称为 PID（进程 ID）。

也就是说，在操作系统中，所有可以执行的程序与命令都会产生进程。只是有些程序和命令非常简单，如 ls 命令、touch 命令等，它们在执行完后就会结束，相应的进程也就会终结，所以我们很难捕捉到这些进程。但是还有一些程和命令，比如 httpd 进程，启动之后就会一直驻留在系统当中，我们把这样的进程称作常驻内存进程。

某些进程会产生一些新的进程，我们把这些进程称作子进程，而把这个进程本身称作父进程。比如，我**们必须正常登录到 Shell 环境中才能执行系统命令，而 Linux 的标准 Shell 是 bash。我们在 bash 当中执行了 ls 命令，那么 bash 就是父进程，而 ls 命令是在 bash 进程中产生的进程，所以 ls 进程是 bash 进程的子进程。也就是说，子进程是依赖父进程而产生的，如果父进程不存在，那么子进程也不存在了。**

## 14.2 Linux进程启动的方式有几种？

### 14.2.1 Linux手工启动进程

手工启动进程指的是由用户输入命令直接启动一个进程，根据所启动的进程类型和性质的不同，其又可以细分为前台启动和后台启动 2 种方式。

#### 14.2.1.1 前台启动进程

这是手工启动进程最常用的方式，因为当用户输入一个命令并运行，就已经启动了一个进程，而且是一个前台的进程，此时系统其实已经处于一个多进程的状态（一个是 Shell 进程，另一个是新启动的进程）。

> 
> 实际上，系统自动时就有许多进程悄悄地在后台运行，不过这里为了方便读者理解，并没有将这些进程包括在内。

假如启动一个比较耗时的进程，然后再把该进程挂起，并使用 ps 命令查看，就会看到该进程在 ps 显示列表中，例如：

```shell
[root@localhost ~]# find / -name demo.jpg <--在根目录下查找 demo.jpg 文件，比较耗时
#此处省略了该命令的部分输出信息
#按“CTRL+Z”组合键，即可将该进程挂起
[root@localhost ~]# ps <--查看正在运行的进程
PID  TTY      TIME   CMD
2573 pts/0  00:00:00 bash
2587 pts/0  00:00:01 find
2588 pts/0  00:00:00 ps
```

> 将进程挂起，指的是将前台运行的进程放到后台，并且暂停其运行，有关挂起进程和 ps 命令用法，后续章节会做详细介绍。

通过运行 ps 命令查看进程信息，可以看到，刚刚执行的 find 命令的进程号为 2587，同时 ps 进程的进程号为 2588。

#### 14.2.1.2 后台启动进程

进程直接从后台运行，用的相对较少，除非该进程非常耗时，且用户也不急着需要其运行结果的时候，例如，用户需要启动一个需要长时间运行的格式化文本文件的进程，为了不使整个 Shell 在格式化过程中都处于“被占用”状态，从后台启动这个进程是比较明智的选择。

从后台启动进程，其实就是在命令结尾处添加一个 " &" 符号（注意，& 前面有空格）。输入命令并运行之后，Shell 会提供给我们一个数字，此数字就是该进程的进程号。然后直接就会出现提示符，用户就可以继续完成其他工作，例如：

```shell
[root@localhost ~]# find / -name install.log &
[1] 1920
#[1]是工作号，1920是进程号
```

> 有关后台启动进程及相关的注意事项，后续章节会做详细介绍。

以上介绍了手工启动的 2 种方式，实际上它们有个共同的特点，就是**新进程都是由当前 Shell 这个进程产生的，换句话说，是 Shell 创建了新进程，于是称这种关系为进程间的父子关系，其中 Shell 是父进程，新进程是子进程。**

值得一提的是，一个父进程可以有多个子进程，通常子进程结束后才能继续父进程；当然，如果是从后台启动，父进程就不用等待子进程了。

### 14.2.2 Linux调度启动进程

在 Linux 系统中，任务可以被配置在指定的时间、日期或者系统平均负载量低于指定值时自动启动。

例如，Linux 预配置了重要系统任务的运行，以便可以使系统能够实时被更新，系统管理员也可以使用自动化的任务来定期对重要数据进行备份。

实现调度启动进程的方法有很多，例如通过 crontab、at 等命令，有关这些命令的具体用法，本章后续章节会做详细介绍。

## 14.3 ps命令详解

ps 命令是最常用的监控进程的命令，通过此命令可以查看系统中所有运行进程的详细信息。

ps 命令有多种不同的使用方法，这常常给初学者带来困惑。在各种 Linux 论坛上，询问 ps 命令语法的帖子屡见不鲜，而出现这样的情况，还要归咎于 UNIX 悠久的历史和庞大的派系。在不同的 Linux 发行版上，ps 命令的语法各不相同，为此，Linux 采取了一个折中的方法，即融合各种不同的风格，兼顾那些已经习惯了其它系统上使用 ps 命令的用户。

ps 命令的基本格式如下：

```shell
[root@localhost ~]# ps aux
#查看系统中所有的进程，使用 BS 操作系统格式
[root@localhost ~]# ps -le
#查看系统中所有的进程，使用 Linux 标准命令格式
```

选项：

- a：显示一个终端的所有进程，除会话引线外；
- u：显示进程的归属用户及内存的使用情况；
- x：显示没有控制终端的进程；
- -l：长格式显示更加详细的信息；
- -e：显示所有进程；

可以看到，ps 命令有些与众不同，它的部分选项不能加入"-"，比如命令"ps aux"，其中"aux"是选项，但是前面不能带“-”。

大家如果执行 "man ps" 命令，则会发现 ps 命令的帮助为了适应不同的类 UNIX 系统，可用格式非常多，不方便记忆。所以，我建议大家记忆几个固定选项即可。比如：

- "ps aux" 可以查看系统中所有的进程；
- "ps -le" 可以查看系统中所有的进程，而且还能看到进程的父进程的 PID 和进程优先级；
- "ps -l" 只能看到当前 Shell 产生的进程；


有这三个命令就足够了，下面分别来查看。

【例 1】

```shell
[root@localhost ~]# ps aux
#查看系统中所有的进程
USER PID %CPU %MEM  VSZ  RSS   TTY STAT START TIME COMMAND
root   1  0.0  0.2 2872 1416   ?   Ss   Jun04 0:02 /sbin/init
root   2  0.0  0.0    0    0   ?    S   Jun04 0:00 [kthreadd]
root   3  0.0  0.0    0    0   ?    S   Jun04 0:00 [migration/0]
root   4  0.0  0.0    0    0   ?    S   Jun04 0:00 [ksoftirqd/0]
```

表 1 中罗列出了以上输出信息中各列的具体含义。



| 表头    | 含义                                                         |
| ------- | ------------------------------------------------------------ |
| USER    | 该进程是由哪个用户产生的。                                   |
| PID     | 进程的 ID。                                                  |
| %CPU    | 该进程占用 CPU 资源的百分比，占用的百分比越高，进程越耗费资源。 |
| %MEM    | 该进程占用物理内存的百分比，占用的百分比越高，进程越耗费资源。 |
| VSZ     | 该进程占用虚拟内存的大小，单位为 KB。                        |
| RSS     | 该进程占用实际物理内存的大小，单位为 KB。                    |
| TTY     | 该进程是在哪个终端运行的。其中，tty1 ~ tty7 代表本地控制台终端（可以通过 Alt+F1 ~ F7 快捷键切换不同的终端），tty1~tty6 是本地的字符界面终端，tty7 是图形终端。pts/0 ~ 255 代表虚拟终端，一般是远程连接的终端，第一个远程连接占用 pts/0，第二个远程连接占用 pts/1，依次増长。 |
| STAT    | 进程状态。常见的状态有以下几种：-D：不可被唤醒的睡眠状态，通常用于 I/O 情况。-R：该进程正在运行。-S：该进程处于睡眠状态，可被唤醒。-T：停止状态，可能是在后台暂停或进程处于除错状态。-W：内存交互状态（从 2.6 内核开始无效）。-X：死掉的进程（应该不会出现）。-Z：僵尸进程。进程已经中止，但是部分程序还在内存当中。-<：高优先级（以下状态在 BSD 格式中出现）。-N：低优先级。-L：被锁入内存。-s：包含子进程。-l：多线程（小写 L）。-+：位于后台。 |
| START   | 该进程的启动时间。                                           |
| TIME    | 该进程占用 CPU 的运算时间，注意不是系统时间。                |
| COMMAND | 产生此进程的命令名。                                         |

【例 2】"ps aux"命令可以看到系统中所有的进程，"ps -le"命令也能看到系统中所有的进程。由于 "-l" 选项的作用，所以 "ps -le" 命令能够看到更加详细的信息，比如父进程的 PID、优先级等。但是这两个命令的基本作用是一致的，掌握其中一个就足够了。

```shell
[root@localhost ~]# ps -le
F S UID PID PPID C  PRI Nl ADDR  SZ WCHAN TTY      TIME  CMD
4 S   0   1    0 0  80   0 -    718 -     ?    00:00:02  init
1 S   0   2    0 0  80   0 -      0 -     ?    00:00:00  kthreadd
1 S   0   3    2 0 -40   - -      0 -     ?    00:00:00  migration/0
1 S   0   4    2 0  80   0 -      0 -     ?    00:00:00  ksoflirqd/0
1 S   0   5    2 0 -40   - -      0 -     ?    00:00:00  migration/0
```

表 2 罗列出以上输出信息中各列的含义。



| 表头  | 含义                                                         |
| ----- | ------------------------------------------------------------ |
| F     | 进程标志，说明进程的权限，常见的标志有两个: 1：进程可以被复制，但是不能被执行；4：进程使用超级用户权限； |
| S     | 进程状态。具体的状态和"psaux"命令中的 STAT 状态一致；        |
| UID   | 运行此进程的用户的 ID；                                      |
| PID   | 进程的 ID；                                                  |
| PPID  | 父进程的 ID；                                                |
| C     | 该进程的 CPU 使用率，单位是百分比；                          |
| PRI   | 进程的优先级，数值越小，该进程的优先级越高，越早被 CPU 执行； |
| NI    | 进程的优先级，数值越小，该进程越早被执行；                   |
| ADDR  | 该进程在内存的哪个位置；                                     |
| SZ    | 该进程占用多大内存；                                         |
| WCHAN | 该进程是否运行。"-"代表正在运行；                            |
| TTY   | 该进程由哪个终端产生；                                       |
| TIME  | 该进程占用 CPU 的运算时间，注意不是系统时间；                |
| CMD   | 产生此进程的命令名；                                         |

如果不想看到所有的进程，只想查看一下当前登录产生了哪些进程，那只需使用 "ps -l" 命令就足够了：

```shell
[root@localhost ~]# ps -l
#查看当前登录产生的进程
F S UID   PID  PPID C PRI NI ADDR SZ WCHAN TTY       TIME CMD
4 S 0   18618 18614 0  80  0 - 1681  -     pts/1 00:00:00 bash
4 R 0   18683 18618 4  80  0 - 1619  -     pts/1 00:00:00 ps
```

可以看到，这次从 pts/1 虚拟终端登录，只产生了两个进程：一个是登录之后生成的 Shell，也就是 bash；另一个是正在执行的 ps 命令。

我们再来说说僵尸进程。僵尸进程的产生一般是由于进程非正常停止或程序编写错误，导致子进程先于父进程结束，而父进程又没有正确地回收子进程，从而造成子进程一直存在于内存当中，这就是僵尸进程。

僵尸进程会对主机的稳定性产生影响，所以，在产生僵尸进程后，一定要对产生僵尸进程的软件进行优化，避免一直产生僵尸进程；对于已经产生的僵尸进程，可以在查找出来之后强制中止。

## 14.4 top命令详解

ps 命令可以一次性给出当前系统中进程状态，但使用此方式得到的信息缺乏时效性，并且，如果管理员需要实时监控进程运行情况，就必须不停地执行 ps 命令，这显然是缺乏效率的。

为此，Linux 提供了 top 命令。top 命令可以动态地持续监听进程地运行状态，与此同时，该命令还提供了一个交互界面，用户可以根据需要，人性化地定制自己的输出，进而更清楚地了进程的运行状态。

top 命令的基本格式如下：

```shell
[root@localhost ~]#top [选项]
```

选项：

- -d 秒数：指定 top 命令每隔几秒更新。默认是 3 秒；
- -b：使用批处理模式输出。一般和"-n"选项合用，用于把 top 命令重定向到文件中；
- -n 次数：指定 top 命令执行的次数。一般和"-"选项合用；
- -p 进程PID：仅查看指定 ID 的进程；
- -s：使 top 命令在安全模式中运行，避免在交互模式中出现错误；
- -u 用户名：只监听某个用户的进程；

在 top 命令的显示窗口中，还可以使用如下按键，进行一下交互操作：

- ? 或 h：显示交互模式的帮助；
- P：按照 CPU 的使用率排序，默认就是此选项；
- M：按照内存的使用率排序；
- N：按照 PID 排序；
- T：按照 CPU 的累积运算时间排序，也就是按照 TIME+ 项排序；
- k：按照 PID 给予某个进程一个信号。一般用于中止某个进程，信号 9 是强制中止的信号；
- r：按照 PID 给某个进程重设优先级（Nice）值；
- q：退出 top 命令；


我们看看 top 命令的执行结果，如下：

```shell
[root@localhost ~]# top
top - 12:26:46 up 1 day, 13:32, 2 users, load average: 0.00, 0.00, 0.00
Tasks: 95 total, 1 running, 94 sleeping, 0 stopped, 0 zombie
Cpu(s): 0.1%us, 0.1%sy, 0.0%ni, 99.7%id, 0.1%wa, 0.0%hi, 0.1%si, 0.0%st
Mem: 625344k total, 571504k used, 53840k free, 65800k buffers
Swap: 524280k total, 0k used, 524280k free, 409280k cached
PID   USER PR NI VIRT  RES  SHR S %CPU %MEM   TIME+ COMMAND
19002 root 20  0 2656 1068  856 R  0.3  0.2 0:01.87 top
1     root 20  0 2872 1416 1200 S  0.0  0.2 0:02.55 init
2     root 20  0    0    0    0 S  0.0  0.0 0:00.03 kthreadd
3     root RT  0    0    0    0 S  0.0  0.0 0:00.00 migration/0
4     root 20  0    0    0    0 S  0.0  0.0 0:00.15 ksoftirqd/0
5     root RT  0    0    0    0 S  0.0  0.0 0:00.00 migration/0
6     root RT  0    0    0    0 S  0.0  0.0 0:10.01 watchdog/0
7     root 20  0    0    0    0 S  0.0  0.0 0:05.01 events/0
8     root 20  0    0    0    0 S  0.0  0.0 0:00.00 cgroup
9     root 20  0    0    0    0 S  0.0  0.0 0:00.00 khelper
10    root 20  0    0    0    0 S  0.0  0.0 0:00.00 netns
11    root 20  0    0    0    0 S  0.0  0.0 0:00.00 async/mgr
12    root 20  0    0    0    0 S  0.0  0.0 0:00.00 pm
13    root 20  0    0    0    0 S  0.0  0.0 0:01.70 sync_supers
14    root 20  0    0    0    0 S  0.0  0.0 0:00.63 bdi-default
15    root 20  0    0    0    0 S  0.0  0.0 0:00.00 kintegrityd/0
16    root 20  0    0    0    0 S  0.0  0.0 0:02.52 kblockd/0
17    root 20  0    0    0    0 S  0.0  0.0 0:00.00 kacpid
18    root 20  0    0    0    0 S  0.0  0.0 0:00.00 kacpi_notify
```

我们解释一下命令的输出。top 命令的输出内容是动态的，默认每隔 3 秒刷新一次。命令的输出主要分为两部分：

1. 第一部分是前五行，显示的是整个系统的资源使用状况，我们就是通过这些输出来判断服务器的资源使用状态的；
2. 第二部分从第六行开始，显示的是系统中进程的信息；

我们先来说明第一部分的作用。

- 第一行为任务队列信息，具体内容如表 1 所示。

  | 内 容                         | 说 明                                                        |
  | ----------------------------- | ------------------------------------------------------------ |
  | 12:26:46                      | 系统当前时间                                                 |
  | up 1 day, 13:32               | 系统的运行时间.本机己经运行 1 天 13 小时 32 分钟             |
  | 2 users                       | 当前登录了两个用户                                           |
  | load average: 0.00,0.00，0.00 | 系统在之前 1 分钟、5 分钟、15 分钟的平均负载。如果 CPU 是单核的，则这个数值超过 1 就是高负载：如果 CPU 是四核的，则这个数值超过 4 就是高负载 （这个平均负载完全是依据个人经验来进行判断的，一般认为不应该超过服务器 CPU 的核数） |



- 第二行为进程信息，具体内容如表 2 所示。

  | 内 容           | 说 明                                          |
  | --------------- | ---------------------------------------------- |
  | Tasks: 95 total | 系统中的进程总数                               |
  | 1 running       | 正在运行的进程数                               |
  | 94 sleeping     | 睡眠的进程数                                   |
  | 0 stopped       | 正在停止的进程数                               |
  | 0 zombie        | 僵尸进程数。如果不是 0，则需要手工检查僵尸进程 |



- 第三行为 CPU 信息，具体内容如表 3 所示。

  | 内 容           | 说 明                                                        |
  | --------------- | ------------------------------------------------------------ |
  | Cpu(s): 0.1 %us | 用户模式占用的 CPU 百分比                                    |
  | 0.1%sy          | 系统模式占用的 CPU 百分比                                    |
  | 0.0%ni          | 改变过优先级的用户进程占用的 CPU 百分比                      |
  | 99.7%id         | 空闲 CPU 占用的 CPU 百分比                                   |
  | 0.1%wa          | 等待输入/输出的进程占用的 CPU 百分比                         |
  | 0.0%hi          | 硬中断请求服务占用的 CPU 百分比                              |
  | 0.1%si          | 软中断请求服务占用的 CPU 百分比                              |
  | 0.0%st          | st（steal time）意为虚拟时间百分比，就是当有虚拟机时，虚拟 CPU 等待实际 CPU 的时间百分比 |



- 第四行为物理内存信息，具体内容如表 4 所示。

  | 内 容              | 说 明                                                        |
  | ------------------ | ------------------------------------------------------------ |
  | Mem: 625344k total | 物理内存的总量，单位为KB                                     |
  | 571504k used       | 己经使用的物理内存数量                                       |
  | 53840k&ee          | 空闲的物理内存数量。我们使用的是虚拟机，共分配了 628MB内存，所以只有53MB的空闲内存 |
  | 65800k buffers     | 作为缓冲的内存数量                                           |



- 第五行为交换分区（swap）信息，如表 5 所示。

  | 内 容               | 说 明                        |
  | ------------------- | ---------------------------- |
  | Swap: 524280k total | 交换分区（虚拟内存）的总大小 |
  | Ok used             | 已经使用的交换分区的大小     |
  | 524280k free        | 空闲交换分区的大小           |
  | 409280k cached      | 作为缓存的交换分区的大小     |


我们通过 top 命令的第一部分就可以判断服务器的健康状态。如果 1 分钟、5 分钟、15 分钟的平均负载高于 1，则证明系统压力较大。如果 CPU 的使用率过高或空闲率过低，则证明系统压力较大。如果物理内存的空闲内存过小，则也证明系统压力较大。

这时，我们就应该判断是什么进程占用了系统资源。如果是不必要的进程，就应该结束这些进程；如果是必需进程，那么我们该増加服务器资源（比如増加虚拟机内存），或者建立集群服务器。

我们还要解释一下缓冲（buffer）和缓存（cache）的区别：

- 缓存（cache）是在读取硬盘中的数据时，把最常用的数据保存在内存的缓存区中，再次读取该数据时，就不去硬盘中读取了，而在缓存中读取。
- 缓冲（buffer）是在向硬盘写入数据时，先把数据放入缓冲区,然后再一起向硬盘写入，把分散的写操作集中进行，减少磁盘碎片和硬盘的反复寻道，从而提高系统性能。

简单来说，缓存（cache）是用来加速数据从硬盘中"读取"的，而缓冲（buffer）是用来加速数据"写入"硬盘的。

再来看 top 命令的第二部分输出，主要是系统进程信息，各个字段的含义如下：

- PID：进程的 ID。
- USER：该进程所属的用户。
- PR：优先级，数值越小优先级越高。
- NI：优先级，数值越小、优先级越高。
- VIRT：该进程使用的虚拟内存的大小，单位为 KB。
- RES：该进程使用的物理内存的大小，单位为 KB。
- SHR：共享内存大小，单位为 KB。
- S：进程状态。
- %CPU：该进程占用 CPU 的百分比。
- %MEM：该进程占用内存的百分比。
- TIME+：该进程共占用的 CPU 时间。
- COMMAND：进程的命令名。

这部分和 ps 命令的输出比较类似，只是如果在终端执行 top 命令，则不能看到所有的进程，而只能看到占比靠前的进程。接下来我们举几个 top 命令常用的实例。

【例 1】如果只想让 top 命令查看某个进程，就可以使用 "-p 选项"。命令如下：

```shell
[root@localhost ~]# top -p 15273 #只查看 PID为 15273的apache进程 top - 14:28:47 up 1 day, 15:34, 3 users, load average: 0.00,0.00,0.00 Tasks: 1 total, 0 running, 1 sleeping, 0 stopped, 0 zombie Cpu(s): 0.0%us, 0.0%sy, 0.0%ni,100.0%id, 0.0%wa, 0.0%hi, 0.0%si, 0.0%st Mem: 625344k total, 574124k used, 51220k free, 67024k buffers Swap: 524280k total, Ok used, 524280k free, 409344k cached PID     USER PR NI VIRT  RES SHR S %CPU %MEM  TIME+  COMMAND 15273 daemon 20 0  4520 1192 580 S  0.0  0.2 0:00.00   httpd
```

【例 2】top 命令如果不正确退出，则会持续运行。在 top 命令的交互界面中按 "q" 键会退出 top 命令；也可以按 "?" 或 "h" 键得到 top 命令交互界面的帮助信息；还可以按键中止某个进程。比如：

```shell
[root@localhost ~]# top
top - 14:10:15 up 1 day, 15:15， 3 users, load average: 0.00，0.00, 0.00
Tasks: 97 total, 1 running, 96 sleeping, 0 stopped, 0 zombie
Cpu(s): 0.0%us, 0.0%sy, 0.0%ni,100.0%id, 0.0%wa, 0.0%hi, 0.0%si, 0.0%st
Mem: 625344k total, 574248k used, 51096k free, 66840k buffers
Swap: 524280k total, Ok used, 524280k free, 409324k cached
PID to kill:15273
#按"k"键，会提示输入要杀死进程的PID
PID     USER PR NI VIRT  RES SHR S %CPU %MEM   TIME+ COMMAND
15273 daemon 20  0 4520 1192 580 S  0.0 0.2  0:00.00 httpd
```

【例 3】如果在操作终端执行 top 命令，则并不能看到系统中所有的进程，默认看到的只是 CPU 占比靠前的进程。如果我们想要看到所有的进程，则可以把 top 命令的执行结果重定向到文件中。不过 top 命令是持续运行的，这时就需要使用 "-b" 和 "-n" 选项了。具体命令如下：

```shell
[root@localhost ~]# top -b -n 1 > /root/top.log
\#让top命令只执行一次，然后把执行结果保存到top.log文件中，这样就能看到所有的进程了
```

## 14.5 pstree命令

pstree 命令是以树形结构显示程序和进程之间的关系，此命令的基本格式如下：

```shell
[root@localhost ~]# pstree [选项] [PID或用户名]
```

表 1 罗列出了 pstree 命令常用选项以及各自的含义。

| 选项 | 含义                                                         |
| ---- | ------------------------------------------------------------ |
| -a   | 显示启动每个进程对应的完整指令，包括启动进程的路径、参数等。 |
| -c   | 不使用精简法显示进程信息，即显示的进程中包含子进程和父进程。 |
| -n   | 根据进程 PID 号来排序输出，默认是以程序名排序输出的。        |
| -p   | 显示进程的 PID。                                             |
| -u   | 显示进程对应的用户名称。                                     |


需要注意的是，在使用 pstree 命令时，如果不指定进程的 PID 号，也不指定用户名称，则会以 init 进程为根进程，显示系统中所有程序和进程的信息；反之，若指定 PID 号或用户名，则将以 PID 或指定命令为根进程，显示 PID 或用户对应的所有程序和进程。

init 进程是系统启动的第一个进程，进程的 PID 是 1，也是系统中所有进程的父进程。


【例 1】

```shell
[root@1ocalhost ~]# pstree
init──┬──abrc-dump-oopa
├──abrtd
├──acpid
...省略部分输出...
├──rayslogd───3*[{rsyslogrd}]
\#有3个rsyslogd进程存在
├──sshd───sshd───bash───pstree
\#Pstree命令进程是在远程连接中被执行的
├──udevd───2*[udevd]
└──xinecd

```

【例 2】如果想知道某个用户都启动了哪些进程，使用 pstree 命令可以很容易实现，以 mysql 用户为例：

```shell
[root@1ocalhost ~]# pstree mysql
mysqid---6*[{mysqid}]
```

此输出结果显示了 mysql 用户对应的进程为 mysqid，并且 mysqid 进程拥有 5 个子进程（外加 1 个父进程，共计 6 个进程）。

## 14.6 lsof命令：列出进程调用或打开的文件信息

我们知道，通过 ps 命令可以查询到系统中所有的进程，那么，是否可以进一步知道这个进程到底在调用哪些文件吗？当然可以，使用 lsof 命令即可。

lsof 命令，“list opened files”的缩写，直译过来，就是列举系统中已经被打开的文件。通过 lsof 命令，我们就可以根据文件找到对应的进程信息，也可以根据进程信息找到进程打开的文件。

lsof 命令的基本格式如下：

```shell
[root@localhost ~]# lsof [选项]
```

此命令常用的选项及功能，如表 1 所示。

| 选项      | 功能                                 |
| --------- | ------------------------------------ |
| -c 字符串 | 只列出以字符串开头的进程打开的文件。 |
| +d 目录名 | 列出某个目录中所有被进程调用的文件。 |
| -u 用户名 | 只列出某个用户的进程打开的文件。     |
| -p pid    | 列出某个 PID 进程打开的文件。        |

【例 1】

```shell
[root@localhost ~]# lsof | more
\#查询系统中所有进程调用的文件
COMMAND PID USER FD  TYPE DEVICE SIZE/OFF NODE NAME
init        1   root  cwd DIR  8，3    4096    2      /
init        1   root  rtd  DIR  8，3    4096    2      /
init        1   root  txt   REG  8，3    145180  130874 /sbin/init
init        1   root  mem REG  8，3    142472  665291 /lib/ld-2.12.so
init        1   root  mem REG  8，3    58704   655087 /lib/libnss_files-2.12.so
…省略部分输出…
```

这个命令的输出非常多。它会按照 PID，从 1 号进程开始列出系统中所有的进程正在调用的文件名。

【例 2】

```shell
[root@localhost ~]# lsof /sbin/init
\#查询某个文件被哪个进程调用
COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE  NAME
init        1   root  txt REG  8，3   145180   130874  /sbin/init
```

lsof 命令也可以反过来查询某个文件被哪个进程调用。这个例子就查询到 /sbin/init 文件是被 init 进程调用的。

【例 5】

```shell
[root@localhost ~]# lsof -p 1
\#查询PID是1的进程调用的文件
COMMAND PID USER FD  TYPE DEVICE SIZE/OFF NODE NAME
init        1   root cwd DIR  8，3   4096    2      /
init        1   root rtd   DIR  8，3   4096    2      /
init        1   root txt   REG  8，3   145180  130874 /sbin/init
init        1   root mem REG  8，3   142472  665291 /lib/ld-2.12.so
init        1   root mem REG  8，3   58704   655087 /lib/libnss_files-2.12.so
```

当然，我们也可以按照 PID 查询进程调用的文件，比如执行“lsof -p 1”命令就可以查看 PID 为 1 的进程调用的所有文件。

【例 6】

```shell
[root@localhost ~]# lsof -u root
\#按照用户名查询某个用户的进程调用的文件
COMMAND PID USER FD   TYPE  DEVICE  SIZE/OFF  NODE NAME
init        1   root  cwd  DIR   8，3    4096     2      /
init        1   root  rtd   DIR   8，3    4096     2      /
init        1   root  txt   REG   8，3    145180   130874 /sbin/init
init        1   root  mem REG   8，3    142472   665291 /lib/ld-2.12.so
init        1   root  mem REG   8，3    58704    655087 /lib/libnss_files-2.12.s
init        1   root  mem REG   8，3    38768    655310 /lib/libnih-dbus.so.1.0.
…省略部分输出…
```

我们还可以查看某个用户的进程调用了哪些文件。

## 14.7 Linux常用信号（进程间通信）及其含义

进程的管理主要是指进程的关闭与重启。我们一般关闭或重启软件，都是关闭或重启它的程序，而不是直接操作进程的。比如，要重启 apache 服务，一般使用命令"service httpd restart"重启 apache的程序。

那么，可以通过直接管理进程来关闭或重启 apache 吗？答案是肯定的，这时就要依赖进程的信号（Signal）了。我们需要给予该进程号，告诉进程我们想要让它做什么。

系统中可以识别的信号较多，我们可以使用命令"kill -l"或"man 7 signal"来查询。命令如下：

```shell
[root@localhost ~]#kill -l
\1) SIGHUP 2) SIGINT 3) SIGQUIT 4) SIGILL 5) SIGTRAP
\6) SIGABRT 7) SIGBUS 8) SIGFPE 9) SIGKILL 10) SIGUSR1
11)SIGSEGV 12) SIGUSR2 13) SIGPIPE 14) SIGALRM 15)SIGTERM 16) SIGSTKFLT 17) SIGCHLD 18) SIGCONT 19) SIGSTOP 20) SIGTSTP 21) SIGTTIN 22) SIGTTOU 23) SIGURG
\24) SIGXCPU 25) SIGXFSZ 26) SIGVTALRM 27) SIGPROF 28) SIGWINCH 29) SIGIO 30) SIGPWR 31) SIGSYS 34) SIGRTMIN 35) SIGRTMIN+1 36) SIGRTMIN+2 37) SIGRTMIN+3 38) SIGRTMIN +4 39) SIGRTMIN +5 40) SIGRTMIN+6 41)SIGRTMIN+7 42) SIGRTMIN+8 43) SIGRTMIN +9 44) SIGRTMIN +10 45) SIGRTMIN+11 46) SIGRTMIN+1247) SIGRTMIN+13 48) SIGRTMIN +14 49) SIGRTMIN +15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12 53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9 56) SIGRTMAX-8 57) SIGRTMAX-7 58) SIGRTMAX-6 59) SIGRTMAX-5 60) SIGRTMAX-4 61) SIGRTMAX-3 62) SIGRTMAX-2 63) SIGRTMAX-1 64) SIGRTMAX
```

这里介绍一下常见的进程信号，如表 1 所示。

| 信号代号 | 信号名称 | 说 明                                                        |
| -------- | -------- | ------------------------------------------------------------ |
| 1        | SIGHUP   | 该信号让进程立即关闭.然后重新读取配置文件之后重启            |
| 2        | SIGINT   | 程序中止信号，用于中止前台进程。相当于输出 Ctrl+C 快捷键     |
| 8        | SIGFPE   | 在发生致命的算术运算错误时发出。不仅包括浮点运算错误，还包括溢出及除数为 0 等其他所有的算术运算错误 |
| 9        | SIGKILL  | 用来立即结束程序的运行。本信号不能被阻塞、处理和忽略。般用于强制中止进程 |
| 14       | SIGALRM  | 时钟定时信号，计算的是实际的时间或时钟时间。alarm 函数使用该信号 |
| 15       | SIGTERM  | 正常结束进程的信号，kill 命令的默认信号。如果进程已经发生了问题，那么这 个信号是无法正常中止进程的，这时我们才会尝试 SIGKILL 信号，也就是信号 9 |
| 18       | SIGCONT  | 该信号可以让暂停的进程恢复执行。本信号不能被阻断             |
| 19       | SIGSTOP  | 该信号可以暂停前台进程，相当于输入 Ctrl+Z 快捷键。本信号不能被阻断 |


我们只介绍了常见的进程信号，其中最重要的就是 "1"、"9"、"15"这三个信号，我们只需要记住这三个信号即可。

## 14.8 Linux kill命令详解：终止进程

kill 从字面来看，就是用来杀死进程的命令，但事实上，这个或多或少带有一定的误导性。从本质上讲，kill 命令只是用来向进程发送一个信号，至于这个信号是什么，是用户指定的。

也就是说，kill 命令的执行原理是这样的，kill 命令会向操作系统内核发送一个信号（多是终止信号）和目标进程的 PID，然后系统内核根据收到的信号类型，对指定进程进行相应的操作。

kill 命令的基本格式如下：

```shell
[root@localhost ~]# kill [信号] PID
```

kill 命令是按照 PID 来确定进程的，所以 kill 命令只能识别 PID，而不能识别进程名。Linux 定义了几十种不同类型的信号，读者可以使用 kill -l 命令查看所有信号及其编号，这里仅列出几个常用的信号，如表 1 所示。

| 信号编号 | 信号名 | 含义                                                         |
| -------- | ------ | ------------------------------------------------------------ |
| 0        | EXIT   | 程序退出时收到该信息。                                       |
| 1        | HUP    | 挂掉电话线或终端连接的挂起信号，这个信号也会造成某些进程在没有终止的情况下重新初始化。 |
| 2        | INT    | 表示结束进程，但并不是强制性的，常用的 "Ctrl+C" 组合键发出就是一个 kill -2 的信号。 |
| 3        | QUIT   | 退出。                                                       |
| 9        | KILL   | 杀死进程，即强制结束进程。                                   |
| 11       | SEGV   | 段错误。                                                     |
| 15       | TERM   | 正常结束进程，是 kill 命令的默认信号。                       |


需要注意的是，表中省略了各个信号名称的前缀 SIG，也就是说，SIGTERM 和 TERM 这两种写法都对，kill 命令都可以理解。

## 14.9 killall命令：终止特定的一类进程

killall 也是用于关闭进程的一个命令，但和 kill 不同的是，killall 命令不再依靠 PID 来杀死单个进程，而是通过程序的进程名来杀死一类进程，也正是由于这一点，该命令常与 ps、pstree 等命令配合使用。

killall 命令的基本格式如下：

```shell
[root@localhost ~]# killall [选项] [信号] 进程名
```

注意，此命令的信号类型同 kill 命令一样，因此这里不再赘述，此命令常用的选项有如下 2 个：

- -i：交互式，询问是否要杀死某个进程；
- -I：忽略进程名的大小写；

【例 1】杀死 httpd 进程。

```shell
[root@localhost ~]# service httpd start
#启动RPM包默认安装的apache服务
[root@localhost ~]# ps aux | grep "httpd" | grep -v "grep"
root 1600 0.0 0.2 4520 1696? Ss 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1601 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1602 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1603 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1604 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
daemon 1605 0.0 0.1 4520 1188? S 19:42 0:00 /usr/local/apache2/bin/httpd -k start
#查看httpd进程
[root@localhost ~]# killall httpd
#杀死所有进程名是httpd的进程
[root@localhost ~]# ps aux | grep "httpd" | grep -v "grep"
#查询发现所有的httpd进程都消失了
```

## 14.10 Linux工作管理简介

**工作管理指的是在单个登录终端（也就是登录的 Shell 界面）同时管理多个工作的行为。**也就是说，我们登陆了一个终端，已经在执行一个操作，那么是否可以在不关闭当前操作的情况下执行其他操作呢？

当然可以，我们可以再启动一个终端，然后执行其他的操作。不过，是否可以在一个终端执行不同的操作呢？这就需要通过工作管理来实现了。

例如，我在当前终端正在 vi 一个文件，在不停止 vi 的情况下，如果我想在同一个终端执行其他的命令，就应该把 vi 命令放入后台，然后再执行其他命令。把命令放入后台，然后把命令恢复到前台，或者让命令恢复到后台执行，这些管理操作就是工作管理。

后台管理有几个事项需要大家注意：

1. 前台是指当前可以操控和执行命令的这个操作环境；后台是指工作可以自行运行，但是不能直接用 Ctrl+C 快捷键来中止它，只能使用 fg/bg 来调用工作。
2. 当前的登录终端只能管理当前终端的工作，而不能管理其他登录终端的工作。比如 tty1 登录的终端是不能管理 tty2 终端中的工作的。
3. 放入后台的命令必须可以持续运行一段时间，这样我们才能捕捉和操作它。
4. 放入后台执行的命令不能和前台用户有交互或需要前台输入，否则只能放入后台暂停，而不能执行。比如 vi 命令只能放入后台暂停，而不能执行，因为 vi 命令需要前台输入信息；top 命令也不能放入后台执行，而只能放入后台暂停，因为 top 命令需要和前台交互。

## 14.11 放入后台运行方法（&和Ctrl+Z）

Linux 命令放入后台的方法有两种，分别介绍如下。

### 14.11.1 "命令 &"，把命令放入后台执行

第一种把命令放入后台的方法是在命令后面加入 `空格 &`。使用这种方法放入后台的命令，在后台处于执行状态。

注意，放入后台执行的命令不能与前台有交互，否则这个命令是不能在后台执行的。例如：

```shell
[root@localhost ~]#find / -name install.log &
[1] 1920
#[工作号] 进程号
#把find命令放入后台执行，每个后台命令会被分配一个工作号。命令既然可以执行，就会有进程产生，所以也会有进程号
```

这样，虽然 find 命令在执行，但在当前终端仍然可以执行其他操作。如果在终端上出现如下信息：

```shell
[1]+ Done find / -name install.log
```

则证明后台的这个命令已经完成了。当然，命令如果有执行结果，则也会显示到操作终端上。其中，[1] 是这个命令的工作号，"+"代表这个命令是最近一个被放入后台的。

### 14.11.2 命令执行过裎中按 Ctrl+Z 快捷键，命令在后台处于暂停状态

使用这种方法放入后台的命令，就算不和前台有交互，能在后台执行，也处于暂停状态，因为 Ctrl+Z 快捷键就是暂停的快捷键。

【例 1】

```shell
[root@localhost ~]#top
#在top命令执行的过程中，按下Ctrl+Z快捷键
[1]+ Stopped top
#top命令被放入后台，工作号是1，状态是暂停。而且，虽然top命令没有结束，但也能取得控制台权限
```

每个被放入后台的命令都会被分配一个工作号。第一个被放入后台的命令，工作号是 1；第二个被放入后台的命令，工作号是 2，以此类推。

## 14.12 nohup命令：后台命令脱离终端运行

在前面章节中，我们一直在说进程可以放到后台运行，这里的后台，其实指的是当前登陆终端的后台。这种情况下，**当我们以远程管理服务器的方式，在远程终端执行后台命令，如果在命令尚未执行完毕时就退出登陆，那么这个后台命令还会继续执行吗？**

**当然不会，此命令的执行会被中断。**这就引出一个问题，如果我们确实需要在远程终端执行某些后台命令，该如何执行呢？有以下 3 种方法：

1. 
   把需要在后台执行的命令加入 /etc/rc.local 文件，让系统在启动时执行这个后台程序。这种方法的问题是，服务器是不能随便重启的，如果有临时后台任务，就不能执行了。
2. 使用系统定时任务，让系统在指定的时间执行某个后台命令。这样放入后台的命令与终端无关，是不依赖登录终端的。
3. 使用 nohup 命令。

nohup 命令的作用就是让后台工作在离开操作终端时，也能够正确地在后台执行。此命令的基本格式如下：

```shell
[root@localhost ~]# nohup [命令] &
```

注意，这里的‘&’表示此命令会在终端后台工作；反之，如果没有‘&’，则表示此命令会在终端前台工作。

**例如1：**

```shell
[root@localhost ~]# nohup find / -print > /root/file.log &
[3] 2349
#使用find命令，打印/下的所有文件。放入后台执行
[root@localhost ~]# nohup：忽略输入并把输出追加到"nohup.out"
[root@localhost ~]# nohup：忽略输入并把输出追加到"nohup.out"
#有提示信息
```

接下来的操作要迅速，否则 find 命令就会执行结束。然后我们可以退出登录，重新登录之后，执行“ps aux”命令，会发现 find 命令还在运行。

如果 find 命令执行太快，我们就可以写一个循环脚本，然后使用 nohup 命令执行。例如：

```shell
[root@localhost ~]# vi for.sh
#！/bin/bash
for ((i=0;i<=1000;i=i+1))
#循环1000次
do
echo 11 >> /root/for.log
#在for.log文件中写入11
sleep 10s
#每次循环睡眠10秒
done
[root@localhost ~]# chmod 755 for.sh
[root@localhost ~]# nohup /root/for.sh &
[1] 2478
[root@localhost ~]# nohup：忽略输入并把输出追加到"nohup.out"
#执行脚本
```

接下来退出登录，重新登录之后，这个脚本仍然可以通过“ps aux”命令看到。

**例2**

```shell
nohup airflow webserver > /dev/null 2>&1 &
```

标准输入和标准输出都写/dev/null

我们**不妨把1和2都理解是一个指针**,然后来看上面的语句就是这样的：

1. 本来1----->屏幕 （1指向屏幕）

2. 执行>log后， 1----->log (1指向/dev/null)

3. 执行2>&1后， 2----->1 (2指向1，而1指向log,因此2也指向了/dev/null)

   /dev/null，或称空设备，是一个特殊的设备文件，它丢弃一切写入其中的数据（但报告写入操作成功），读取它则会立即得到一个EOF

## 14.13 jobs命令：查看当前终端放入后台的工作

```shell
(python37) [root@88b00494ed45 ~]# jobs
[2]-  Running                 nohup airflow scheduler 2>&1 &  (wd: ~/airflow)
[4]+  Running                 nohup airflow webserver > /dev/null 2>&1 &
```

## 14.14 fg命令：把后台命令恢复在前台执行

fg 命令用于把后台工作恢复到前台执行，该命令的基本格式如下：

```shell
[root@localhost ~]#fg %工作号
```

注意，在使用此命令时，％ 可以省略，但若将`% 工作号`全部省略，则此命令会将带有 + 号的工作恢复到前台。另外，使用此命令的过程中， % 可有可无。

例如：

```shell
[root@localhost ~]#jobs
[1]- Stopped top
[2]+ Stopped tar-zcf etc.tar.gz/etc
[root@localhost ~]# fg
#恢复“+”标志的工作，也就是tar命令
[root@localhost ~]# fg ％1
#恢复1号工作，也就是top命令
```

top 命令是不能在后台执行的，所以，如果要想中止 top 命令，要么把 top 命令恢复到前台，然后正常退出；要么找到 top 命令的 PID，使用 kill 命令杀死这个进程。

## 14.15 bg命令：把后台暂停的工作恢复到后台执行

前面讲过，使用 `Ctrl+Z` 快捷键的方式，可以将前台工作放入后台，但是会处于暂停状态，那么，有没有办法可以让后台工作继续在后台执行呢？答案是肯定的，这就需要用到 bg 命令。

bg 命令的基本格式如下：

```shell
[root@localhost ~]# bg ％工作号
```

和 fg 命令类似，这里的 % 可以省略。

举个例子，读者可以试着把前面章节中放入后台的两个工作恢复运行，命令如下：

```shell
[root@localhost ~]# bg ％1  <--- 等同于 bg 1
[root@localhost ~]# bg ％2  <--- 等同于 bg 2
#把两个命令恢复到后台执行
[root@localhost @]# jobs
[1]+ Stopped top
[2]- Running tar -zcf etc.tar.gz /etc &
#tar命令的状态变为了Running，但是top命令的状态还是Stopped
```

可以看到，tar 命令确实已经在后台执行了，但是 top 命令怎么还处于暂停状态呢？原因很简单，top 命令是需要和前台交互的，所以不能在后台执行。换句话说，top 命令就是给前台用户显示系统性能的命令，如果 top 命令在后台恢复运行了，那么给谁去看结果呢？

## 14.16 任务调度

### 14.16.1 介绍

任务调度：是指系统在某个时间执行的特定的命令或程序。相当于Windows任务管理器。
任务调度分类：

1. 系统工作：有些重要的工作必须周而复始地执行。如病毒扫描等
2. 个别用户工作：个别用户可能希望执行某些程序，比如对 mysql 数据库的备份

语法：crontab [选项]

常用选项

- -e：编辑定时crontab任务
- -l：查询crontab任务
- -r：删除当前用户所有的crontab任务
- service crond restart：[重启任务调度]任务的要求

### 14.16.2 两种方式

设置任务调度文件：/etc/crontab

设置个人任务调度。执行 crontab –e 命令。接着输入任务到调度文件

### 14.16.3 案例要求

如：

```shell
*/1 * * * * ls –l	/etc/ > /tmp/to.txt
```

意思说每小时的每分钟执行 ls –l /etc/ > /tmp/to.txt 命令

### 14.16.4 步骤如下

1) cron -e

2. ```shell
   */ 1 * * * * ls -l /etc >> /tmp/to.txt
   ```

3) 当保存退出后就程序。

4. 在每一分钟都会自动的调用 

   ```shell
   ls -l /etc >> /tmp/to.txt
   ```

### 14.16.5 参数细节说明

![](/Users/fanqingwei/Desktop/学习/linux/images/crontab参数格式.png)

# 15 守护进程

## 什么是守护进程

守护进程（Daemon Process），也就是通常说的 Daemon 进程（精灵进程），是 Linux 中的后台服务进程。它是一个生存期较长的进程，通常独立于控制终端并且周期性地执行某种任务或等待处理某些发生的事件。在某些用户空间中，即使用户退出登录，仍然会有一些后台进程在运行，这些进程被称为 `守护进程(daemon)`。

守护进程是个特殊的孤儿进程，这种进程脱离终端，为什么要脱离终端呢？之所以脱离于终端是为了避免进程被任何终端所产生的信息所打断，其在执行过程中的信息也不在任何终端上显示。由于在 Linux 中，每一个系统与用户进行交流的界面称为终端，每一个从此终端开始运行的进程都会依附于这个终端，这个终端就称为这些进程的控制终端，当控制终端被关闭时，相应的进程都会自动关闭。

Linux 的大多数服务器就是用守护进程实现的。比如，Internet 服务器 inetd，Web 服务器 httpd 等。

## 如何查看守护进程

```sh
ps axj

# a 表示不仅列当前用户的进程，也列出所有其他用户的进程
# x 表示不仅列有控制终端的进程，也列出所有无控制终端的进程
# j 表示列出与作业控制相关的信息
```

从上图可以看出守护进行的一些特点：

- 守护进程基本上都是以超级用户启动（ UID 为 0 ）
- 没有控制终端（ TTY 为 ？）
- 终端进程组 ID 为 -1 （ TPGID 表示终端进程组 ID）

## 如何启动守护进程

- 在系统启动时由启动脚本启动，这些启动脚本通常放在 /etc/rc.d 目录下
- 利用 inetd 超级服务器启动，如 telnet 等
- 由 cron 定时启动
- 终端用 nohup 启动的进程也是守护进程

## 编写守护进程

**屏蔽一些控制终端操作的信号**

这是为了防止守护进行在没有运行起来前，控制终端受到干扰退出或挂起

```c
signal(SIGTTOU,SIG_IGN); 
signal(SIGTTIN,SIG_IGN); 
signal(SIGTSTP,SIG_IGN); 
signal(SIGHUP ,SIG_IGN);
```

**在后台运行**

```c
if( pid = fork() ){ // 父进程
	exit(0); 	    //结束父进程，子进程继续
}
```

**脱离控制终端、登录会话和进程组**

有必要先介绍一下 Linux 中的 **进程与控制终端，登录会话和进程组之间的关系**：进程属于一个进程组，进程组号（GID）就是进程组长的进程号（PID）。登录会话可以包含多个进程组。这些进程组共享一个控制终端。这个控制终端通常是创建进程的 shell 登录终端。 控制终端、登录会话和进程组通常是从父进程继承下来的。 **我们的目的就是要摆脱它们 ，使之不受它们的影响**。因此需要调用 setsid() 使子进程成为新的会话组长，示例代码如下：

```c
setsid();
```

setsid() 调用成功后，进程成为新的会话组长和新的进程组长，并与原来的登录会话和进程组脱离。由于会话过程对控制终端的独占性，进程同时与控制终端脱离。 

**禁止进程重新打开控制终端**

现在，进程已经成为无终端的会话组长， **但它可以重新申请打开一个控制终端**。可以通过使进程不再成为会话组长来禁止进程重新打开控制终端，采用的方法是再次创建一个子进程，示例代码如下：

```c
if( pid=fork() ){ // 父进程
	exit(0);      // 结束第一子进程，第二子进程继续（第二子进程不再是会话组长） 
}
```

**关闭打开的文件描述符**

进程从创建它的父进程那里继承了打开的文件描述符。如不关闭，将会浪费系统资源，造成进程所在的文件系统无法卸下以及引起无法预料的错误。按如下方法关闭它们：

```c
// NOFILE 为 <sys/param.h> 的宏定义
// NOFILE 为文件描述符最大个数，不同系统有不同限制
for(i=0; i< NOFILE; ++i){// 关闭打开的文件描述符
	close(i);
}
```

**改变当前工作目录**

进程活动时，其工作目录所在的文件系统不能卸下。一般需要将工作目录改变到根目录。对于需要转储核心，写运行日志的进程将工作目录改变到特定目录如 /tmp。示例代码如下：

```c
chdir("/");
```

**重设文件创建掩模**

```c
umask(0);
```

**处理 SIGCHLD 信号**

但对于某些进程，特别是服务器进程往往在请求到来时生成子进程处理请求。如果父进程不等待子进程结束，子进程将成为僵尸进程（zombie）从而占用系统资源（关于僵尸进程的更多详情， [请看《特殊进程之僵尸进程》](http://blog.csdn.net/tennysonsky/article/details/45966571)）。如果父进程等待子进程结束，将增加父进程的负担，影响服务器进程的并发性能。在 Linux 下可以简单地将 SIGCHLD 信号的操作设为 SIG_IGN 。

```c
signal(SIGCHLD, SIG_IGN);
```

这样，内核在子进程结束时不会产生僵尸进程。

示例代码如下：

```c
#include <unistd.h> 
#include <signal.h> 
#include <fcntl.h>
#include <sys/syslog.h>
#include <sys/param.h> 
#include <sys/types.h> 
#include <sys/stat.h> 
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
 
int init_daemon(void)
{ 
	int pid; 
	int i;
	
	// 1）屏蔽一些控制终端操作的信号
	signal(SIGTTOU,SIG_IGN); 
	signal(SIGTTIN,SIG_IGN); 
	signal(SIGTSTP,SIG_IGN); 
	signal(SIGHUP ,SIG_IGN);
 
	// 2）在后台运行
    if( pid=fork() ){ // 父进程
        exit(0); //结束父进程，子进程继续
	}else if(pid< 0){ // 出错
		perror("fork");
		exit(EXIT_FAILURE);
	}
	
	// 3）脱离控制终端、登录会话和进程组
	setsid();  
	
	// 4）禁止进程重新打开控制终端
	if( pid=fork() ){ // 父进程
		exit(0);      // 结束第一子进程，第二子进程继续（第二子进程不再是会话组长） 
	}else if(pid< 0){ // 出错
		perror("fork");
		exit(EXIT_FAILURE);
	}  
	
	// 5）关闭打开的文件描述符
	// NOFILE 为 <sys/param.h> 的宏定义
	// NOFILE 为文件描述符最大个数，不同系统有不同限制
	for(i=0; i< NOFILE; ++i){
		close(i);
	}
	
	// 6）改变当前工作目录
	chdir("/tmp"); 
	
	// 7）重设文件创建掩模
	umask(0);  
	
	// 8）处理 SIGCHLD 信号
	signal(SIGCHLD,SIG_IGN);
	
	return 0; 
} 
 
int main(int argc, char *argv[]) 
{
	init_daemon();
	
	while(1);
 
	return 0;
}
```

# 16.磁盘管理

## 16.1 机械硬盘和固态硬盘

在 Linux 系统中，文件系统是创建在硬盘上的，因此，要想彻底搞清楚文件系统的管理机制，就要从了解硬盘开始。

硬盘是计算机的主要外部存储设备。计算机中的存储设备种类非常多，常见的主要有光盘、硬盘、U 盘等，甚至还有网络存储设备 SAN、NAS 等，不过使用最多的还是硬盘。

如果从存储数据的介质上来区分，硬盘可分为机械硬盘（Hard Disk Drive, HDD）和固态硬盘（Solid State Disk, SSD），机械硬盘采用磁性碟片来存储数据，而固态硬盘通过闪存颗粒来存储数据。

固态硬盘和机械硬盘对比主要有以下一些特点，如表 1 所示。



| 对比项目  | 固态硬盘        | 机械硬盘 |
| --------- | --------------- | -------- |
| 容量      | 较小            | 大       |
| 读/写速度 | 极快            | —般      |
| 写入次数  | 5000〜100000 次 | 没有限制 |
| 工作噪声  | 极低            | 有       |
| 工作温度  | 极低            | 较高     |
| 防震      | 很好            | 怕震动   |
| 重量      | 低              | 高       |
| 价格      | 高              | 低       |


大家可以发现，固态硬盘因为丟弃了机械硬盘的物理结构，所以相比机械硬盘具有了低能耗、无噪声、抗震动、低散热、体积小和速度快的优势；不过价格相比机械硬盘更高，而且使用寿命有限。

## 16.2 linux常见的文件系统

操作系统通过文件系统管理文件及数据，磁盘或分区需要创建文件系统之后，才能被操作系统所用，创建文件系统的过程又称之为**格式化**。没有文件系统的设备又称之为**裸设备**（raw），某些环境会需要裸设备，例如安装 Oracle 时会需要裸设备。

### 16.2.1 常见的文件系统类型

常见的文件系统有 fat32、NTFS、ext2、ext3、ext4、xfs、HFS 等。其中，fat32 和 NTFS 是 Windows 中的文件系统，ext2、ext3、ext4、xfs、HFS 是 Linux 中的文件系统。NTFS 是当今 Windows 主流的文件系统，ext3、ext4 是 Linux 中主流的文件系统。

### 16.2.2 不同文件系统之间的区别

- 是否带有日志
- 支持的分区大小
- 支持的单个文件大小
- 性能

### 16.2.3 Linux支持的文件系统

常见的有 ext2、ext3、ext4、fat(msdos)、vfat、nfs、iso9660（光盘的文件系统）、proc（Linux 内存中的虚拟文件系统）、gfs（Linux 中的 global file system，全局文件系统）、jfs （带日志的文件系统）等等，不同的 Linux 发行版本，文件系统略有不同

## 16.3 查看文件系统硬盘使用情况(df)

df 命令，**用于显示 Linux 系统中各文件系统的硬盘使用情况，包括文件系统所在硬盘分区的总容量、已使用的容量、剩余容量等。**

前面讲过，与整个文件系统有关的数据，都保存在 Super block（超级块）中，而 df 命令主要读取的数据几乎针对的是整个文件系统，所以 df 命令主要是从各文件系统的 Super block 中读取数据。

df 命令的基本格式为：

```sh
[root@localhost ~]# df [选项] [目录或文件名]
```

表 1 列出了 df 命令几个常用的选项，以及它们各自的作用。



| 选项 | 作用                                                         |
| ---- | ------------------------------------------------------------ |
| -a   | 显示所有文件系统信息，包括系统特有的 /proc、/sysfs 等文件系统； |
| -m   | 以 MB 为单位显示容量；                                       |
| -k   | 以 KB 为单位显示容量，默认以 KB 为单位；                     |
| -h   | 使用人们习惯的 KB、MB 或 GB 等单位自行显示容量；             |
| -T   | 显示该分区的文件系统名称；                                   |
| -i   | 不用硬盘容量显示，而是以含有 inode 的数量来显示。            |

【例 1】

```sh
[root@localhost ~]# df
Filesystem      1K-blocks      Used Available Use% Mounted on
/dev/hdc2         9920624   3823112   5585444  41% /
/dev/hdc3         4956316    141376   4559108   4% /home
/dev/hdc1          101086     11126     84741  12% /boot
tmpfs              371332         0    371332   0% /dev/shm
```

不使用任何选项的 df 命令，默认会将系统内所有的文件系统信息，以 KB 为单位显示出来。

本例中，由 df 命令显示出的各列信息的含义分别是：

- **Filesystem：表示该文件系统位于哪个分区，因此该列显示的是设备名称；**
- 1K-blocks：此列表示文件系统的总大小，默认以 KB 为单位；
- Used：表示用掉的硬盘空间大小；
- Available：表示剩余的硬盘空间大小；
- Use%：硬盘空间使用率。如果使用率高达 90% 以上，就需要额外注意，因为容量不足，会严重影响系统的正常运行；
- Mounted on：文件系统的挂载点，也就是硬盘挂载的目录位置。


【例 2】

```sh
[root@localhost ~]# df -h
Filesystem            Size  Used Avail Use% Mounted on
/dev/hdc2             9.5G  3.7G  5.4G  41% /
/dev/hdc3             4.8G  139M  4.4G   4% /home
/dev/hdc1              99M   11M   83M  12% /boot
tmpfs                 363M     0  363M   0% /dev/shm
```

同例 1 不同，这里使用了 -h 选项，因此文件系统的各种容量数据，会以人们习惯的单位（通常使用 GB 或 MB）显示出来。

【例 3】

```shell
[root@localhost ~]# df -h /etc
Filesystem            Size  Used Avail Use% Mounted on
/dev/hdc2             9.5G  3.7G  5.4G  41% /
```

同之前的 2 个例子不同，这里在 df 命令后添加了目录名，在这种情况下，df 命令会自动分析该目录所在的分区，并将所在分区的有关信息显示出来。由此，我们就可以知道，该目录下还可以使用多少容量。

【例 4】

```shell
[root@localhost ~]# df -aT
Filesystem    Type 1K-blocks    Used Available Use% Mounted on
/dev/hdc2     ext3   9920624 3823112   5585444  41% /
proc          proc         0       0         0   -  /proc
sysfs        sysfs         0       0         0   -  /sys
devpts      devpts         0       0         0   -  /dev/pts
/dev/hdc3     ext3   4956316  141376   4559108   4% /home
/dev/hdc1     ext3    101086   11126     84741  12% /boot
tmpfs        tmpfs    371332       0    371332   0% /dev/shm
none   binfmt_misc         0       0         0   -  /proc/sys/fs/binfmt_misc
sunrpc  rpc_pipefs         0       0         0   -  /var/lib/nfs/rpc_pipefs
```

注意，使用 -a 选项，会将很多特殊的文件系统显示出来，这些文件系统包含的大多是系统数据，存在于内存中，不会占用硬盘空间，因此你会看到，它们所占据的硬盘总容量为 0。

### 16.3.1 TMPFS

我们经常需要查看Linux服务器磁盘挂载使用情况，可以使用df命令。我们使用此命令除了会查看到系统盘以及数据盘挂载情况，还会看到一个tmpfs也在挂载。

我们通过df可以看到tmpfs是挂载到/dev/shm目录，tmpfs是什么呢? 其实是一个临时文件系统，驻留在内存中，所以/dev/shm/这个目录不在硬盘上，而是在内存里。因为是在内存里，所以读写非常快，可以提供较高的访问速度。linux下，tmpfs默认最大为内存的一半大小，使用df -h命令刚才已经看到了，但是这个df查看到的挂载内存大小的数值，如果没有使用，是没有去真正占用的，只有真正在tmpfs存储数据了，才会去占用。比如，tmpfs大小是499M,用了10M大小，内存里就会使用真正使用10M，剩余的489M是可以继续被服务器其他程序来使用的。但是因为数据是在内存里，所以断电后文件会丢失，内存数据不会和硬盘中数据一样可以永久保存。了解了tmpfs这个特性可以用来提高服务器性能，把一些对读写性能要求较高，但是数据又可以丢失的这样的数据保存在/dev/shm中，来提高访问速度。

## 16.4 统计目录或文件所占磁盘空间大小(du)

**du 是统计目录或文件所占磁盘空间大小的命令。**

需要注意的是，使用"ls -lh"命令是可以看到文件的大小的。但是大家会发现，在使用"ls -lh"命令査看目录大小时，目录的大小多数是 4KB，这是因为目录下的子目录名和子文件名是保存到父目录的 block（默认大小为 4KB）中的，如果父目录下的子目录和子文件并不多，一个 block 就能放下，那么这个父目录就只占用了一个 block 大小。

大家可以将其想象成图书馆的书籍目录和实际书籍。如果我们用"ls-l"命令査看，则只能看到这些书籍占用了 1 页纸的书籍目录，但是实际书籍到底有多少是看不到的，哪怕它堆满了几个房间。

但是我们在统计目录时，不是想看父目录下的子目录名和子文件名到底占用了多少空间，而是想看父目录下的子目录和子文件的总磁盘占用量大小，这时就需要使用 du 命令才能统计目录的真正磁盘占用量大小。

du 命令的格式如下：

```sh
[root@localhost ~]# du [选项] [目录或文件名]
```

选项：

- -a：显示每个子文件的磁盘占用量。默认只统计子目录的磁盘占用量
- -h：使用习惯单位显示磁盘占用量，如 KB、MB 或 GB 等；
- -s：统计总磁盘占用量，而不列出子目录和子文件的磁盘占用量

**【例 1】**

```shell
[root@localhost ~]# du
#统计当前目录的总磁盘占用量大小，同时会统计当前目录下所有子目录的磁盘占用量大小，不统计子文件
#磁盘占用量的大小。默认单位为KB
20 ./.gnupg
#统计每个子目录的大小
24 ./yum.bak
8 ./dtest
28 ./sh
188
#统计当前目录总大小
```

### du命令和df命令的区别

有时我们会发现，使用 du 命令和 df 命令去统计分区的使用情况时，得到的数据是不一样的。那是因为df命令是从文件系统的角度考虑的，通过文件系统中未分配的空间来确定文件系统中已经分配的空间大小。也就是说，在使用 df 命令统计分区时，不仅要考虑文件占用的空间，还要统计被命令或程序占用的空间（最常见的就是文件已经删除，但是程序并没有释放空间）。

而 du 命令是面向文件的，只会计算文件或目录占用的磁盘空间。也就是说，df 命令统计的分区更准确，是真正的空闲空间。

## 16.5 挂载Linux系统外的文件(mount)

挂载指的是将硬件设备的文件系统和 Linux 系统中的文件系统，通过指定目录（作为挂载点）进行关联。而要将文件系统挂载到 Linux 系统上，就需要使用 mount 挂载命令。

mount 命令的常用格式有以下几种：

```shell
[root@localhost ~]# mount [-l]
```

单纯使用 mount 命令，会显示出系统中已挂载的设备信息，使用 -l 选项，会额外显示出卷标名称（读者可自行运行，查看输出结果）；

```shell
[root@localhost ~]# mount -a
```

-a 选项的含义是自动检查 /etc/fstab 文件中有无疏漏被挂载的设备文件，如果有，则进行自动挂载操作。这里简单介绍一下 /etc/fstab 文件，此文件是自动挂载文件，系统开机时会主动读取 /etc/fstab 这个文件中的内容，根据该文件的配置，系统会自动挂载指定设备。有关自动挂载（修改此文件）的具体介绍，会在后续文章中讲解。



```shell
[root@localhost ~]# mount [-t 系统类型] [-L 卷标名] [-o 特殊选项] [-n] 设备文件名 挂载点
```

各选项的含义分别是：

- -t 系统类型：指定欲挂载的文件系统类型。Linux 常见的支持类型有 EXT2、EXT3、EXT4、iso9660（光盘格式）、vfat、reiserfs 等。如果不指定具体类型，挂载时 Linux 会自动检测。
- -L 卷标名：除了使用设备文件名（例如 /dev/hdc6）之外，还可以利用文件系统的卷标名称进行挂载。
- -n：在默认情况下，系统会将实际挂载的情况实时写入 /etc/mtab 文件中，但在某些场景下（例如单人维护模式），为了避免出现问题，会刻意不写入，此时就需要使用这个选项；
- -o 特殊选项：可以指定挂载的额外选项，比如读写权限、同步/异步等，如果不指定，则使用默认值（defaults）。具体的特殊选项参见表 1；



| 选项        | 功能                                                         |
| ----------- | ------------------------------------------------------------ |
| rw/ro       | 是否对挂载的文件系统拥有读写权限，rw 为默认值，表示拥有读写权限；ro 表示只读权限。 |
| async/sync  | 此文件系统是否使用同步写入（sync）或异步（async）的内存机制，默认为异步 async。 |
| dev/nodev   | 是否允许从该文件系统的 block 文件中提取数据，为了保证数据安装，默认是 nodev。 |
| auto/noauto | 是否允许此文件系统被以 mount -a 的方式进行自动挂载，默认是 auto。 |
| suid/nosuid | 设定文件系统是否拥有 SetUID 和 SetGID 权限，默认是拥有。     |
| exec/noexec | 设定在文件系统中是否允许执行可执行文件，默认是允许。         |
| user/nouser | 设定此文件系统是否允许让普通用户使用 mount 执行实现挂载，默认是不允许（nouser），仅有 root 可以。 |
| defaults    | 定义默认值，相当于 rw、suid、dev、exec、auto、nouser、async 这 7 个选项。 |
| remount     | 重新挂载已挂载的文件系统，一般用于指定修改特殊权限。         |


【例 1】

```shell
[root@localhost ~]# mount
#查看系统中已经挂载的文件系统，注意有虚拟文件系统
/dev/sda3 on / type ext4 (rw) <--含义是，将 /dev/sda3 分区挂载到了 / 目录上，文件系统是 ext4，具有读写权限
proc on /proc type proc (rw)
sysfe on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw, gid=5, mode=620)
tmpfs on /dev/shm type tmpfs (rw)
/dev/sda1 on /boot type ext4 (rw)
none on /proc/sys/fe/binfmt_misc type binfmt_misc (rw)
sunrpc on /var/lib/nfe/rpc_pipefs type rpc_pipefs (rw)
```


【例 2】
修改特殊权限。通过例 1 我们查看到，/boot 分区已经被挂载了，而且采用的是 defaults 选项。这里我们重新挂载分区，并采用 noexec 权限禁止执行文件执行，看看会出现什么情况（注意不要用 / 分区做实验，否则系统命令也就不能执行了。

```shell
[root@localhost ~]# mount -o remount noexec /boot
#重新挂载 /boot 分区，并使用 noexec 权限
[root@localhost sh]# cd /boot
#写一个 shell 脚本，看是否会运行
[root@localhost boot]#vi hello.sh
#!/bin/bash
echo "hello!!"
[root@localhost boot]# chmod 755 hello.sh
[root@localhost boot]# ./hello.sh
-bash:./hello.sh:权限不够
#虽然赋予了hello.sh执行权限，但是仍然无法执行
[root@localhost boot]# mount -o remount exec /boot
#记得改回来，否则会影响系统启动
```

对于特殊选项的修改，除非特殊场景下需要，否则不建议大家随意修改，非常容易造成系统出现问题，而且还找不到问题的根源。

【例 3】挂载分区。

```shell
[root@localhost ~]# mkdir /mnt/disk1
#建立挂载点目录
[root@localhost ~]# mount /dev/sdb1 /mnt/disk1
#挂载分区
```

/dev/sdb1 分区还没有被划分。我们在这里只看看挂载分区的方式，非常简单，甚至不需要使用 "-ext4" 命令指定文件系统，因为系统可以自动检测。

可能读者会想，为什么使用 Linux 系统的硬盘分区这么麻烦，而不能像 Windows 系统那样，硬盘安装上就可以使用？

其实，硬盘分区（设备）挂载和卸载（使用 umount 命令）的概念源自 UNIX，UNIX 系统一般是作为服务器使用的，系统安全非常重要，特别是在网络上，最简单有效的方法就是“不使用的硬盘分区（设备）不挂载”，因为没有挂载的硬盘分区是无法访问的，这样系统也就更安全了。

另外，这样也可以减少挂载的硬盘分区数量，相应地，也就可以减少系统维护文件的规模，当然也就减少了系统的开销，即提高了系统的效率。

## 16.6 卸载文件系统(umount)

面介绍了如何将光盘和 U 盘挂载在系统中，而在使用完成后，需要先将其与挂载点取消关联，然后才能成功卸载。不过，硬盘分区是否需要卸载，取决于你下次是否还需要使用，一般不对硬盘分区执行卸载操作。

umount 命令用于卸载已经挂载的硬件设备，该命令的基本格式如下：

```shell
[root@localhost ~]# umount 设备文件名或挂载点
```


注意，卸载命令后面既可以加设备文件名，也可以加挂载点，不过只能二选一，比如：

```shell
[root@localhost ~]# umount /mnt/usb
#卸载U盘
[root@localhost ~]# umount /mnt/cdrom
#卸载光盘
[root@localhost ~]# umount /dev/sr0
#命令加设备文件名同样是可以卸载的
```

## 16.7 给硬盘分区(fdisk)

我们在安装操作系统的过程中已经对系统硬盘进行了分区，但如果新添加了一块硬盘，想要正常使用，难道需要重新安装操作系统才可以分区吗？

当然不是，在 Linux 中有专门的分区命令 fdisk 和 parted。其中 fdisk 命令较为常用，但不支持大于 2TB 的分区；如果需要支持大于 2TB 的分区，则需要使用 parted 命令，当然 parted 命令也能分配较小的分区。我们先来看看如何使用 fdisk 命令进行分区。

fdisk 命令的格式如下：

```shell
[root@localhost ~]# fdisk ~l
#列出系统分区
[root@localhost ~]# fdisk 设备文件名
#给硬盘分区
```

注意，千万不要在当前的硬盘上尝试使用 fdisk，这会完整删除整个系统，一定要再找一块硬盘，或者使用虚拟机。这里给大家举个例子：

```shell
[root@localhost ~]# fdisk -l
#查询本机可以识别的硬盘和分区
Disk /dev/sda:32.2 GB, 32212254720 bytes
#硬盘文件名和硬盘大小
255 heads, 63 sectors/track, 3916 cylinders
#共255个磁头、63个扇区和3916个柱面
Units = cylinders of 16065 *512 = 8225280 bytes
#每个柱面的大小
Sector size (logical/physical): 512 bytes/512 bytes
#每个扇区的大小
I/O size (minimum/optimal): 512 bytes/512 bytes
Disk identifier: 0x0009e098
Device Boot Start End Blocks ld System
/dev/sda1 * 1 26 204800 83 Linux
Partition 1 does not end on cylinder boundary.
#分区1没有占满硬盘
/dev/sda2 26 281 2048000 82 Linux swap / Solaris
Partition 2 does not end on cylinder boundary
#分区2没有占满硬盘
/dev/sda3 281 3917 29203456 83 Linux
#设备文件名启动分区 起始柱面 终止柱面容量 ID 系统
Disk /dev/sdb: 21.5 GB, 21474836480 bytes #第二个硬盘识别，这个硬盘的大小
255 heads, 63 sectors/track, 2610 cylinders
Units = cylinders of 16065 * 512 = 8225280 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes/512 bytes Disk identifier: 0x00000000
```

使用 "fdisk -l" 查看分区信息，能够看到我们添加的两块硬盘（/dev/sda 和 /dev/sdb）的信息。我们解释一下这些信息，其上半部分态是硬盘的整体状态，/dev/sda 硬盘的总大小是 32.2 GB，共有 3916 个柱面，每个柱面由 255 个磁头读/写数据，每个磁头管理 63 个扇区。每个柱面的大小是 8225280 Bytes，每个扇区的大小是 512 Bytes。

信息的下半部分是分区的信息，共 7 列，含义如下：

- Device：分区的设备文件名。
- Boot：是否为启动引导分区，在这里 /dev/sda1 为启动引导分区。
- Start：起始柱面，代表分区从哪里开始。
- End：终止柱面，代表分区到哪里结束。
- Blocks：分区的大小，单位是 KB。
- id：分区内文件系统的 ID。在 fdisk 命令中，可以 使用 "i" 查看。
- System：分区内安装的系统是什么。


如果这个分区并没有占满整块硬盘，就会提示 "Partition 1 does not end on cyl inder boundary"，表示第一个分区没有到硬盘的结束柱面。大家发现了吗？/dev/sda 已经分配完了分区，没有空闲空间了。而第二块硬盘 /dev/sdb 已经可以被识别了，但是没有可分区。

我们以硬盘 /dev/sdb 为例来做练习，命令如下:

```shell
[root@localhost ~]# fdisk /dev/sdb
#给/dev/sdb分区
Device contains neither a valid DOS partition table, nor Sun, SGI or OSF disklabel
Building a new DOS disklabel with disk identifier 0xed7e8bc7.
Changes will remain in memory only, until you decide to write them.
After that, of course, the previous content won't be recoverable.
Warning: invalid flag 0x0000 of partition table 4 will be corrected by w(rite)
WARNING: DOS-compatible mode is deprecated.it's strongly recommended to switch off the mode (command 'c') and change display units to sectors (command 'u').
Command (m for help):m
#交互界面的等待输入指令的位置，输入 m 得到帮助
Command action
#可用指令
a toggle a bootable flag
b edit bsd disklabel
c toggle the dos compatibility flag
d delete a partition
I list known partition types m print this menu
n add a new partition
o create a new empty DOS partition table
p print the partition table
q quit without saving changes
s create a new empty Sun disklabel
t change a partition's system id
u change display/entry units
v verity the partition table
w write table to disk and exit
x extra functionality (experts only)
```

注意这里的分区命令是 "fdisk /dev/sdb"，这是因为硬盘并没有分区，使用 fdisk 命令的目的就是建立分区。

在 fdisk 交互界面中输入 m 可以得到帮助，帮助里列出了 fdisk 可以识别的交互命令，我们来解释一下这些命令，如表 1 所示。

| 命令 | 说 明                                                        |
| ---- | ------------------------------------------------------------ |
| a    | 设置可引导标记                                               |
| b    | 编辑 bsd 磁盘标签                                            |
| c    | 设置 DOS 操作系统兼容标记                                    |
| d    | 删除一个分区                                                 |
| 1    | 显示已知的文件系统类型。82 为 Linux swap 分区，83 为 Linux 分区 |
| m    | 显示帮助菜单                                                 |
| n    | 新建分区                                                     |
| 0    | 建立空白 DOS 分区表                                          |
| P    | 显示分区列表                                                 |
| q    | 不保存退出                                                   |
| s    | 新建空白 SUN 磁盘标签                                        |
| t    | 改变一个分区的系统 ID                                        |
| u    | 改变显示记录单位                                             |
| V    | 验证分区表                                                   |
| w    | 保存退出                                                     |
| X    | 附加功能（仅专家）                                           |

## 16.8 创建分区：主分区、逻辑分区、扩展分区(fdisk)

https://blog.csdn.net/weixin_39641697/article/details/111219935

## 16.9 格式化分区、为分区写入文件系统(mkfs)

分区完成后，如果不格式化写入文件系统，则是不能正常使用的。这时就需要使用 mkfs 命令对硬盘分区进行格式化。

mkfs 命令格式如下：

```shell
[root@localhost ~]# mkfs [-t 文件系统格式] 分区设备文件名
```

-t 文件系统格式：用于指定格式化的文件系统，如 ext3、ext4；

前面章节中，我们建立了 /dev/sdb1（主分区）、/dev/sdb2（扩展分区）、/dev/sdb5（逻辑分区）和 /dev/sdb6（逻辑分区）这几个分区，其中 /dev/sdb2 不能被格式化。剩余的三个分区都需要格式化之后使用，这里我们以格式化 /dev/sdb6 分区作为演示，其余分区的格式化方法一样。

格式化 /dev/sdb6 分区的执行命令如下：

```shell
[root@localhost ~]# mkfs -t ext4 /dev/sdb6
mke2fs 1.41.12 (17-May-2010)
Filesystem label= <--这里指的是卷标名，我们没有设置卷标
OS type：Linux
Block size=4096 (log=2) <--block 的大小配置为 4K
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
131648 inodes, 526120 blocks <--由此配置决定的inode/block数量
26306 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=541065216 17 block groups
32768 blocks per group, 32768 fragments per group
7744 inodes per group
Superblock backups stored on blocks:
32768, 98304, 163840, 229376, 294912
Writing inode tables: done
Creating journal (16384 blocks):done
Writing superblocks and filesystem accounting information:done
This filesystem will be automatically checked every 39 mounts or 180 days, whichever comes first. Use tune2fs -c or -i to override.
# 这样就创建起来所需要的 Ext4 文件系统了！简单明了！
```

虽然 mkfs 命令非常简单易用，但其不能调整分区的默认参数（比如块大小是 4096 Bytes），这些默认参数除非特殊清况，否则不需要调整。如果想要调整，就需要使用 mke2fs 命令重新格式化，此命令会在下一节做详细介绍。

# 17. Linux数据备份与恢复

## rsync命令用法详解

# 18.Linux系统服务管理

## 18.1 系统服务及其分类

我们知道，系统服务是在后台运行的应用程序，并且可以提供一些本地系统或网络的功能。我们把这些应用程序称作服务，也就是 Service。不过，我们有时会看到 Daemon 的叫法，Daemon 的英文原意是"守护神"，在这里是"守护进程"的意思。

那么，什么是守护进程？它和服务又有什么关系呢？守护进程就是为了实现服务、功能的进程。比如，我们的 apache 服务就是服务（Service），它是用来实现 Web 服务的。那么，启动 apache 服务的进程是哪个进程呢？就是 httpd 这个守护进程（Daemon）。也就是说，守护进程就是服务在后台运行的真实进程。

如果我们分不清服务和守护进程，那么也没有什么关系，可以把服务与守护进程等同起来。在 Linux 中就是通过启动 httpd 进程来启动 apache 服务的，你可以把 httpd 进程当作 apache 服务的别名来理解。

## 18.2 端口

服务是给系统提供功能的，在系统中除了有系统服务，还有网络服务。而每个网络服务都有自己的端口，一般端口号都是固定的，用户可以修改。

系统给我们提供了服务与端口的对应文件 /etc/services

### 查询系统中已经启动的服务

既然每个网络服务对应的端口是固定的，那么是否可以通过查询服务器中开启的端口，来判断当前服务器开启了哪些服务？

当然是可以的。虽然判断服务器中开启的服务还有其他方法（如通过ps命令），但是通过端口的方法查看最为准确。命令格式如下：

```shell
[root@localhost ~]# netstat 选项
```

选项：

- -a：列出系统中所有网络连接，包括已经连接的网络服务、监听的网络服务和 Socket 套接字；
- -t：列出 TCP 数据；
- -u：列出 UDF 数据；
- -l：列出正在监听的网络服务（不包含已经连接的网络服务）；
- -n：用端口号来显示而不用服务名；
- -p：列出该服务的进程 ID (PID)；

举个例子：

```shell
[root@localhost ~]# netstat -tlunp
# 列出系统中所有已经启动的服务（已经监听的端口），但不包含已经连接的网络服务
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address Foreign Address State PID/Program name
tcp 0 0 0.0.0.0:53575 0.0.0.0:*
LISTEN
1200/rpc.statd
tcp 0 0 0.0.0.0:111 0.0.0.0:* LISTEN 1181/rpcbind
tcp 0 0 0.0.0.0:22 O.O.O.O:* LISTEN 1405/sshd
tcp 0 0127.0.0.1:631 O.O.O.O:* LISTEN 1287/cupsd
tcp 0 0 127.0.0.1:25 O.O.O.O:* LISTEN 1481/master
tcp 0 0 :::57454 :::* LISTEN 1200/rpc.statd
tcp 0 0 :::111 :::* LISTEN 1181/rpcbind
tcp 0 0 :::22 :::* LISTEN 1405/sshd
tcp 0 0 ::1:631 :::* LISTEN 1287/cupsd
tcp 0 0 ::1:25 :::* LISTEN 1481/master
udp 0 0 0.0.0.0:58322 0.0.0.0:* 1276/avahi-daemon
udp 0 0 0.0.0.0:5353 O.O.O.O:* 1276/avahi-daemon
udp 0 0 0.0.0.0:111 O.O.O.O:* 1181/rpcbind
udp 0 0 0.0.0.0:631 O.O.O.O:* 1287/cupsd
udp 0 0 0.0.0.0:56459 0.0.0.0:* 1200/rpc.statd
udp 0 0 0.0.0.0:932 O.O.O.O:* 1181/rpcbind
udp 0 0 0.0.0.0:952 O.O.O.O:* 1200/rpc.statd
udp 0 0 :::111 :::* 1181/rpcbind
udp 0 0 :::47858 :::* 1200/rpc.statd
udp 0 0 :::932 :::* 1181/rpcbind
```

执行这条命令会看到服务器上所有已经开启的端口，也就是说，通过这些端口就可以知道当前服务器上开启了哪些服务。

解释一下命令的执行结果：

- Proto：数据包的协议。分为 TCP 和 UDP 数据包；
- Recv-Q：表示收到的数据已经在本地接收缓冲，但是还没有被进程取走的数据包数量；
- Send-Q：对方没有收到的数据包数量；或者没有 Ack 回复的，还在本地缓冲区的数据包数量；
- Local Address：本地 IP : 端口。通过端口可以知道本机开启了哪些服务；
- Foreign Address：远程主机：端口。也就是远程是哪个 IP、使用哪个端口连接到本机。由于这条命令只能查看监听端口，所以没有 IP 连接到到本机；
- State:连接状态。主要有已经建立连接（ESTABLISED）和监听（LISTEN）两种状态，当前只能查看监听状态；
- PID/Program name：进程 ID 和进程命令；


再举个例子：

```shell
[root@localhost ~]# netstat -an
#查看所有的网络连接，包括已连接的网络服务、监听的网络服务和Socket套接字
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address Foreign Address State
tcp 0 0 0.0.0.0:53575 0.0.0.0:* LISTEN
tcp 0 0 0.0.0.0:111 0.0.0.0:* LISTEN
tcp 0 0 0.0.0.0:22 0.0.0.0:* LISTEN
tcp 0 0 127.0.0.1:631 0.0.0.0:* LISTEN
tcp 0 0 127.0.0.1:25 0.0.0.0:* LISTEN
tcp 0 0 192.168.0.210:22 192.168.0.105:4868 ESTABLISHED
tcp 0 0 :::57454 :::* LISTEN
...省略部分输出...
udp 0 0 :::932 :::*
Active UNIX domain [socket](http://c.biancheng.net/socket/)s (servers and established)
Proto RefCnt Flags Type State I-Node Path
#Socket套接字输出,后面有具体介绍
Unix 2 [ ACC ] STREAM LISTENING 11712 /var/run/dbus/system_bus_socket
unix 2 [ ACC ] STREAM LISTENING 8450 @/com/ubuntu/upstart unix 7. [ ] DGRAM 8651 @/org/kernel/udev/udevd
unix 2 [ ACC ] STREAM LISTENING 11942 @/var/run/hald/dbus-b4QVLkivf1
...省略部分输出...
```

执行"netstat -an"命令能査看更多的信息，在 Stated 中也看到了已经建立的连接（ESTABLISED）。这是 ssh 远程管理命令产生的连接，ssh 对应的端口是 22。

而且我们还看到了 Socket 套接字。在服务器上，除网络服务可以绑定端口，用端口来接收客户端的请求数据外，系统中的网络程序或我们自己开发的网络程序也可以绑定端口，用端口来接收客户端的请求数据。这些网络程序就是通过 Socket 套接字来绑定端口的。也就是说，网络服务或网络程序要想在网络中传递数据，必须利用 Socke 套接字绑定端口，并进行数据传递。

使用"netstat -an"命令查看到的这些 Socke 套接字虽然不是网络服务，但是同样会占用端口，并在网络中传递数据。

解释一下 Socket 套接字的输出：

- Proto：协议，一般是unix；
- RefCnt：连接到此Socket的进程数量；
- Flags：连接标识；
- Type：Socket访问类型；
- State：状态，LISTENING表示监听，CONNECTED表示已经建立连接；
- I-Node：程序文件的 i 节点号；
- Path：Socke程序的路径，或者相关数据的输出路径；

## 18.3 CPU使用情况



## 18.4 内存使用情况



# 19. Linux 性能分析汇总

## 19.1 性能分析工具

首先来看一张图：

<img src="/Users/fanqingwei/Desktop/学习/linux/images/性能分析工具汇总.png" style="zoom:50%;" />

上图是Brendan Gregg 的一次性能分析的分享，这里面的所有工具都可以通过man来获得它的帮助文档，下问简单介绍介绍一下常规的用法：

## 19.2 vmstat--虚拟内存统计

vmstat(VirtualMeomoryStatistics,虚拟内存统计) 是Linux中监控内存的常用工具,可对操作系统的虚拟内存、进程、CPU等的整体情况进行监视。

vmstat的常规用法：vmstat interval times即每隔interval秒采样一次，共采样times次，如果省略times,则一直采集数据，直到用户手动停止为止。简单举个例子：

![](/Users/fanqingwei/Desktop/学习/linux/images/vmstat.png)

可以使用ctrl+c停止vmstat采集数据。

第一行显示了系统自启动以来的平均值，第二行开始显示现在正在发生的情况，接下来的行会显示每5秒间隔发生了什么，每一列的含义在头部，如下所示：

- procs：r这一列显示了多少进程在等待cpu，b列显示多少进程正在不可中断的休眠（等待IO）。
- memory：swapd列显示了多少块被换出了磁盘（页面交换），剩下的列显示了多少块是空闲的（未被使用），多少块正在被用作缓冲区，以及多少正在被用作操作系统的缓存。
- swap：显示交换活动：每秒有多少块正在被换入（从磁盘）和换出（到磁盘）。
- io：显示了多少块从块设备读取（bi）和写出（bo）,通常反映了硬盘I/O。
- system：显示每秒中断(in)和上下文切换（cs）的数量。
- cpu：显示所有的cpu时间花费在各类操作的百分比，包括执行用户代码（非内核），执行系统代码（内核），空闲以及等待IO。

内存不足的表现：free  memory急剧减少，回收buffer和cacher也无济于事，大量使用交换分区（swpd）,页面交换（swap）频繁，读写磁盘数量（io）增多，缺页中断（in）增多，上下文切换（cs）次数增多，等待IO的进程数（b）增多，大量CPU时间用于等待IO（wa）

## 19.3 iostat--用于报告中央处理器统计信息

iostat用于报告中央处理器（CPU）统计信息和整个系统、适配器、tty 设备、磁盘和 CD-ROM 的输入/输出统计信息，默认显示了与vmstat相同的cpu使用信息，使用以下命令显示扩展的设备统计：

![](/Users/fanqingwei/Desktop/学习/linux/images/iostat.png)

第一行显示的是自系统启动以来的平均值，然后显示增量的平均值，每个设备一行。

常见linux的磁盘IO指标的缩写习惯：rq是request,r是read,w是write,qu是queue，sz是size,a是verage,tm是time,svc是service。

- rrqm/s和wrqm/s：每秒合并的读和写请求，“合并的”意味着操作系统从队列中拿出多个逻辑请求合并为一个请求到实际磁盘。
- r/s和w/s：每秒发送到设备的读和写请求数。
- rsec/s和wsec/s：每秒读和写的扇区数。
- avgrq –sz：请求的扇区数。
- avgqu –sz：在设备队列中等待的请求数。
- await：每个IO请求花费的时间。
- svctm：实际请求（服务）时间。
- %util：至少有一个活跃请求所占时间的百分比。

## 19.4 dstat--系统监控工具

dstat显示了cpu使用情况，磁盘io情况，网络发包情况和换页情况，输出是彩色的，可读性较强，相对于vmstat和iostat的输入更加详细且较为直观。在使用时，直接输入命令即可，当然也可以使用特定参数。

如下：dstat –cdlmnpsy

![](/Users/fanqingwei/Desktop/学习/linux/images/dstat.png)

## 19.5 iotop--LINUX进程实时监控工具

iotop命令是专门显示硬盘IO的命令，界面风格类似top命令，可以显示IO负载具体是由哪个进程产生的。是一个用来监视磁盘I/O使用状况的top类工具，具有与top相似的UI，其中包括PID、用户、I/O、进程等相关信息。

可以以非交互的方式使用：

```
iotop –bod interval，查看每个进程的I/O，可以使用pidstat，pidstat –d instat
```

## 19.6 pidstat--监控系统资源情况

pidstat主要用于监控全部或指定进程占用系统资源的情况,如CPU,内存、设备IO、任务切换、线程等。

使用方法：

```shell
pidstat –d interval
#统计CPU使用信息
pidstat –u interval
#统计内存信息
pidstat –r interval
```

## 19.7 top

top命令的汇总区域显示了五个方面的系统性能信息：

- 负载：时间，登陆用户数，系统平均负载；
- 进程：运行，睡眠，停止，僵尸；
- cpu:用户态，核心态，NICE,空闲，等待IO,中断等；
- 内存：总量，已用，空闲（系统角度），缓冲，缓存；
- 交换分区：总量，已用，空闲

任务区域默认显示：进程ID,有效用户，进程优先级，NICE值，进程使用的虚拟内存，物理内存和共享内存，进程状态，CPU占用率，内存占用率，累计CPU时间，进程命令行信息。

## 19.8 htop

htop 是Linux系统中的一个互动的进程查看器,一个文本模式的应用程序(在控制台或者X终端中),需要ncurses。

![](/Users/fanqingwei/Desktop/学习/linux/images/htop.png)

htop可让用户交互式操作，支持颜色主题，可横向或纵向滚动浏览进程列表，并支持鼠标操作。

与top相比，htop有以下优点：

- 可以横向或者纵向滚动浏览进程列表，以便看到所有的进程和完整的命令行。
- 在启动上，比top更快。
- 杀进程时不需要输入进程号。
- htop支持鼠标操作。

## 19.9 mpstat

mpstat 是Multiprocessor Statistics的缩写，是实时系统监控工具。其报告与CPU的一些统计信息，这些信息存放在/proc/stat文件中。在多CPUs系统里，其不但能查看所有CPU的平均状况信息，而且能够查看特定CPU的信息。常见用法：

```
mpstat –P ALL interval times
```

## 19.10 netstat

Netstat用于显示与IP、TCP、UDP和ICMP协议相关的统计数据，一般用于检验本机各端口的网络连接情况。

常见用法：

```
netstat –npl   #可以查看你要打开的端口是否已经打开。
netstat –rn    #打印路由表信息。
netstat –in    #提供系统上的接口信息，打印每个接口的MTU,输入分组数，输入错误，输出分组数，输出错误，冲突以及当前的输出队列的长度。
```

## 19.11 ps--显示当前进程的状态

ps参数太多，具体使用方法可以参考man ps，

常用的方法：

```
ps  aux  #hsserver
ps –ef |grep #hundsun

#杀掉某一程序的方法
ps  aux | grep mysqld | grep –v grep | awk ‘{print $2 }’ xargs kill -9

#杀掉僵尸进程
ps –eal | awk ‘{if ($2 == “Z”){print $4}}’ | xargs kill -9
```

## 19.12 strace

跟踪程序执行过程中产生的系统调用及接收到的信号，帮助分析程序或命令执行中遇到的异常情况。

举例：查看mysqld在linux上加载哪种配置文件，可以通过运行下面的命令：

```
strace –e stat64 mysqld –print –defaults > /dev/null
```

## 19.13 uptime

能够打印系统总共运行了多长时间和系统的平均负载，uptime命令最后输出的三个数字的含义分别是1分钟，5分钟，15分钟内系统的平均负荷。

## 19.14 lsof

lsof(list open files)是一个列出当前系统打开文件的工具。通过lsof工具能够查看这个列表对系统检测及排错，常见的用法：

```
#查看文件系统阻塞  
lsof /boot

#查看端口号被哪个进程占用   
lsof  -i : 3306

#查看用户打开哪些文件   
lsof –u username

#查看进程打开哪些文件   
lsof –p  4838

#查看远程已打开的网络链接  
lsof –i @192.168.34.128
```

## 19.15 perf

perf是Linux kernel自带的系统性能优化工具。优势在于与Linux Kernel的紧密结合，它可以最先应用到加入Kernel的new feature，用于查看热点函数，查看cashe miss的比率，从而帮助开发者来优化程序性能。

性能调优工具如 perf，Oprofile 等的基本原理都是对被监测对象进行采样，最简单的情形是根据 tick 中断进行采样，即在 tick 中断内触发采样点，在采样点里判断程序当时的上下文。假如一个程序 90% 的时间都花费在函数 foo() 上，那么 90% 的采样点都应该落在函数 foo() 的上下文中。运气不可捉摸，但我想只要采样频率足够高，采样时间足够长，那么以上推论就比较可靠。因此，通过 tick 触发采样，我们便可以了解程序中哪些地方最耗时间，从而重点分析。

汇总：结合以上常用的性能测试命令并联系文初的性能分析工具的图，就可以初步了解到性能分析过程中哪个方面的性能使用哪方面的工具（命令）。

# 20. Linux编码问题

大致分为存储乱码和显示乱码

# 21.VIM常用快捷操作

- ctrl+a→  行首
- ctrl+e → 行尾
- `^` → 到本行第一个不是blank字符的位置（所谓blank字符就是空格，tab，换行，回车等）
- `$` → 到本行行尾
- Shift+G→  末尾
- gg→  开头
- N`G` → 到第 N 行

- `/pattern` → 搜索 `pattern` 的字符串
- N→ 下移N行
