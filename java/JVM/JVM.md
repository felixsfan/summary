JVM核心知识点

[TOC]



## 图解

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\JVM.png)

## 超牛逼博客

<https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247485874&idx=3&sn=6f34ca32eee215385016190fcedc9ac6&chksm=cea24679f9d5cf6f5331854fd4a0048cbf23b71c96e4c4ba3d74850695e8842b0a9477bf5070&scene=21#wechat_redirect>

## 概念

Java虚拟机（java virtual machine,JVM）,一种能够运行Java字节码得虚拟机。作为一种编程语言的虚拟机，实际上不只是专用的Java语言，只要生成的编译文件匹配JVM对加载编译文件的格式要求，任何原因呢都可以由JVM编译运行。比如kotlin、scala等。

jvm有很多，不只是Hotspot,还有JRockit、J9等

# JVM基本结构

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\20200429200800.png)

JVM由三个主要的子系统构成

- 类加载子系统
- 运行时数据区（内存结构）
- 执行引擎

## 类加载子系统

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\类加载子系统.png)

## JVM内存结构

基本结构与之前类似，只是**Java8**取消了之前的“永久代”，取而代之的是“元空间”——**Metaspace**，两者本质是一样的。**“永久代”使用的是JVM的堆内存，而“元空间”是直接使用的本机物理内存**。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\JVM内存模型.png)

### 1.方法区（JDK1.8后叫元空间）

类的所有字段和方法字节码，以及一些特殊方法如构造函数，接口代码也在这里定义。简单来说，所有定义的方法信息都保存在该区域。静态变量+常量+类信息（构造方法/接口定义）+运行时常量池都存在方法区中，虽然Java虚拟机规范把方法区描述为堆的一个逻辑部门，但是它却有另一个别名叫做Non-Heap(非堆)，目的应该是为了和Java堆区分开

### 2.堆（Heap）

虚拟机启动时自动分配创建，用于存放对象的实例，几乎所有对象都在堆中分配内存，当对象无法在该空间申请到内存是将抛出OutOfMenoryError异常。同时也是垃圾收集器管理的主要区域。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\堆内存.png)

### 3.程序计数器（Program Counter Register）

是一块较小的内存空间，它可以看做是当前线程所执行的字节码的行号指示器。在虚拟机的概念模型里，字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令、分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成。

### 4.Java虚拟机栈

- 线程私有的，它的生命周期与线程相同，每个线程都有一个。
- 每个线程创建的同时会创建一个JVM栈，JVM栈中每个栈帧存放的为当前线程中局部基本类型的变量、reference 、部分的返回结果，非基本类型的对象在JVM栈上仅存放一个指向堆上的地址
- 每一个方法从被调用直至执行完成的过程就对应着一个栈帧在虚拟机栈中从入栈到出栈的过程
- 栈运行原理：栈中的数据都是以栈帧（Stack Frame）的格式存在，栈帧是一个内存区块，是一个数据集，是一个有关方法和运行期数据的数据集

### 5.本地方法栈

- jvm中的本地方法是指方法的修饰符是带有native的但是方法体不是用java代码写的一类方法，这类方法存在的意义当然是填补java代码不方便实现的缺陷而提出的
- 是线程私有的，它的生命周期与线程相同，每个线程都有一个



# GC Roots

## 如果判断一个对象可以被回收？

### 引用计数算法

维护一个计数器，如果有对该对象的引用，计数器+1，反之-1。无法解决循环引用的问题。

### 可达性分析算法

从一组名为“GC Roots”的根节点对象出发，向下遍历。那些没有被遍历到、与GC Roots形成通路的对象，会被标记为“回收”。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\引用计数法.png)

## 哪些对象可以作为GC Roots？

1. 虚拟机栈（栈帧中的局部变量）中引用的对象。
2. 本地方法栈（native）中引用的对象。
3. 方法区中常量引用的对象。
4. 方法区中类静态属性引用的对象。

# JVM参数

## JVM 三种类型参数

### 标配参数

比如`-version`、`-help`、`-showversion`等，几乎不会改变。

### X参数

用得不多，比如`-Xint`，解释执行模式；`-Xcomp`，编译模式；`-Xmixed`，开启混合模式（默认）。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images/InkedJVMXParam_LI.jpg)

### XX参数

重要，用于JVM调优。

## JVM XX参数

### 布尔类型

**公式**：`-XX:+某个属性`、`-XX:-某个属性`，开启或关闭某个功能。比如`-XX:+PrintGCDetails`，开启GC详细信息。

### KV键值类型

**公式**：`-XX:属性key=值value`。比如`-XX:Metaspace=128m`、`-XX:MaxTenuringThreshold=15`。

## JVM Xms/Xmx参数

`-Xms`和`-Xmx`十分常见，用于设置**初始堆大小**和**最大堆大小**。第一眼看上去，既不像X参数，也不像XX参数。实际上`-Xms`等价于`-XX:InitialHeapSize`，`-Xmx`等价于`-XX:MaxHeapSize`。所以`-Xms`和`-Xmx`属于XX参数。

## JVM 查看参数

### 查看某个参数

使用`jps -l`配合`jinfo -flag JVM参数 pid` 。先用`jsp -l`查看java进程，选择某个进程号。

```java
17888 org.jetbrains.jps.cmdline.Launcher
5360 org.jetbrains.idea.maven.server.RemoteMavenServer
18052 demo3.demo3
```

`jinfo -flag PrintGCDetails 18052`可以查看18052 Java进程的`PrintGCDetails`参数信息。

```java
-XX:-PrintGCDetails
```

### 查看**所有**参数

使用`jps -l`配合`jinfo -flags pid`可以查看所有参数。

也可以使用`java -XX:+PrintFlagsInitial`

```java
[Global flags]
     intx ActiveProcessorCount                      = -1            {product}
    uintx AdaptiveSizeDecrementScaleFactor          = 4             {product}
    uintx AdaptiveSizeMajorGCDecayTimeScale         = 10            {product}
    uintx AdaptiveSizePausePolicy                   = 0             {product}
······
    uintx YoungPLABSize                             = 4096          {product}
     bool ZeroTLAB                                  = false         {product}
     intx hashCode                                  = 5             {product}

```

### 查看**修改**后的参数

使用`java -XX:PrintFlagsFinal`可以查看修改后的参数，与上面类似。只是修改过后是`:=`而不是`=`。

### 查看**常见**参数

如果不想查看所有参数，可以用`-XX:+PrintCommandLineFlags`查看常用参数。

```java
-XX:InitialHeapSize=132375936 -XX:MaxHeapSize=2118014976 -XX:+PrintCommandLineFlags -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:-UseLargePagesIndividualAllocation -XX:+UseParallelGC
```

## JVM 常用参数

### -Xmx/-Xms

最大和初始堆大小。最大默认为物理内存的1/4，初始默认为物理内存的1/64。

### -Xss

等价于`-XX:ThresholdStackSize`。用于设置单个栈的大小，系统默认值是0，**不代表栈大小为0**。而是根据操作系统的不同，有不同的值。比如64位的Linux系统是1024K，而Windows系统依赖于虚拟内存。

### -Xmn

新生代大小，一般不调。

### -XX:MetaspaceSize

设置元空间大小。

### -XX:+PrintGCDetails

输出GC收集信息，包含`GC`和`Full GC`信息。

### -XX:SurvivorRatio

新生代中，`Eden`区和两个`Survivor`区的比例，默认是`8:1:1`。通过`-XX:SurvivorRatio=4`改成`4:1:1`

### -XX:NewRatio

老生代和新年代的比列，默认是2，即老年代占2，新生代占1。如果改成`-XX:NewRatio=4`，则老年代占4，新生代占1。

### -XX:MaxTenuringThreshold

新生代设置进入老年代的时间，默认是新生代逃过15次GC后，进入老年代。如果改成0，那么对象不会在新生代分配，直接进入老年代。

# 四大引用

以下Demo都需要设置`-Xmx`和`-Xms`，不然系统默认很大，很难演示。

## 强引用

使用`new`方法创造出来的对象，默认都是强引用。GC的时候，就算**内存不够**，抛出`OutOfMemoryError`也不会回收对象，**死了也不回收**。详见[StrongReferenceDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/StrongReferenceDemo.java)。

## 软引用

需要用`Object.Reference.SoftReference`来显示创建。**如果内存够**，GC的时候**不回收**。**内存不够**，**则回收**。常用于内存敏感的应用，比如高速缓存。详见[SoftReferenceDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/SoftReferenceDemo.java)。

## 弱引用

需要用`Object.Reference.WeakReference`来显示创建。**无论内存够不够，GC的时候都回收**，也可以用在高速缓存上。详见[WeakReferenceDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/WeakReferenceDemo.java)

### WeakHashMap

传统的`HashMap`就算`key==null`了，也不会回收键值对。但是如果是`WeakHashMap`，一旦内存不够用时，且`key==null`时，会回收这个键值对。详见[WeakHashMapDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/WeakHashMapDemo.java)。

## 虚引用

软应用和弱引用可以通过`get()`方法获得对象，但是虚引用不行。虚引形同虚设，在任何时候都可能被GC，不能单独使用，必须配合**引用队列（ReferenceQueue）**来使用。设置虚引用的**唯一目的**，就是在这个对象被回收时，收到一个**通知**以便进行后续操作，有点像`Spring`的后置通知。详见[PhantomReferenceDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/PhantomReferenceDemo.java)。

## 引用队列

弱引用、虚引用被回收后，会被放到引用队列里面，通过`poll`方法可以得到。关于引用队列和弱、虚引用的配合使用，见[ReferenceQueueDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/ReferenceQueueDemo.java)。

# OutOfMemoryError

## StackOverflowError

栈满会抛出该错误。无限递归就会导致StackOverflowError，是`java.lang.Throwable`→`java.lang.Error`→`java.lang.VirtualMachineError`下的错误。详见[StackOverflowErrorDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/StackOverflowErrorDemo.java)。

## OOM—Java head space

栈满会抛出该错误。详见[JavaHeapSpaceDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/JavaHeapSpaceDemo.java)。

## OOM—GC overhead limit exceeded

这个错误是指：GC的时候会有“Stop the World"，STW越小越好，正常情况是GC只会占到很少一部分时间。但是如果用超过98%的时间来做GC，而且收效甚微，就会被JVM叫停。下例中，执行了多次`Full GC`，但是内存回收很少，最后抛出了`OOM:GC overhead limit exceeded`错误。详见[GCOverheadDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/GCOverheadDemo.java)。

```java
[GC (Allocation Failure) [PSYoungGen: 2048K->496K(2560K)] 2048K->960K(9728K), 0.0036555 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 
[GC (Allocation Failure) [PSYoungGen: 2544K->489K(2560K)] 3008K->2689K(9728K), 0.0060306 secs] [Times: user=0.08 sys=0.00, real=0.01 secs] 
[GC (Allocation Failure) [PSYoungGen: 2537K->512K(2560K)] 4737K->4565K(9728K), 0.0050620 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 
[GC (Allocation Failure) [PSYoungGen: 2560K->496K(2560K)] 6613K->6638K(9728K), 0.0064025 secs] [Times: user=0.00 sys=0.00, real=0.01 secs] 

[Full GC (Ergonomics) [PSYoungGen: 2048K->860K(2560K)] [ParOldGen: 6264K->7008K(7168K)] 8312K->7869K(9728K), [Metaspace: 3223K->3223K(1056768K)], 0.1674947 secs] [Times: user=0.63 sys=0.00, real=0.17 secs] 
[Full GC (Ergonomics) [PSYoungGen: 2048K->2006K(2560K)] [ParOldGen: 7008K->7008K(7168K)] 9056K->9015K(9728K), [Metaspace: 3224K->3224K(1056768K)], 0.1048666 secs] [Times: user=0.45 sys=0.00, real=0.10 secs] 
[Full GC (Ergonomics) [PSYoungGen: 2047K->2047K(2560K)] [ParOldGen: 7082K->7082K(7168K)] 9130K->9130K(9728K), [Metaspace: 3313K->3313K(1056768K)], 0.0742516 secs] [Times: user=0.28 sys=0.00, real=0.07 secs] 

·······

[Full GC (Ergonomics) [PSYoungGen: 2047K->2047K(2560K)] [ParOldGen: 7084K->7084K(7168K)] 9132K->9132K(9728K), [Metaspace: 3313K->3313K(1056768K)], 0.0738461 secs] [Times: user=0.36 sys=0.02, real=0.07 secs] 

Exception in thread "main" [Full GC (Ergonomics) [PSYoungGen: 2047K->0K(2560K)] [ParOldGen: 7119K->647K(7168K)] 9167K->647K(9728K), [Metaspace: 3360K->3360K(1056768K)], 0.0129597 secs] [Times: user=0.11 sys=0.00, real=0.01 secs] 
java.lang.OutOfMemoryError: GC overhead limit exceeded
	at java.lang.Integer.toString(Integer.java:401)
	at java.lang.String.valueOf(String.java:3099)
	at jvm.GCOverheadDemo.main(GCOverheadDemo.java:12)
```

## OOM—GC Direct buffer memory

在写`NIO`程序的时候，会用到`ByteBuffer`来读取和存入数据。与Java堆的数据不一样，`ByteBuffer`使用`native`方法，直接在**堆外分配内存**。当堆外内存（也即本地物理内存）不够时，就会抛出这个异常。详见[DirectBufferMemoryDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/DirectBufferMemoryDemo.java)。

## OOM—unable to create new native thread

在高并发应用场景时，如果创建超过了系统默认的最大线程数，就会抛出该异常。Linux单个进程默认不能超过1024个线程。**解决方法**要么降低程序线程数，要么修改系统最大线程数`vim /etc/security/limits.d/90-nproc.conf`。详见[UnableCreateNewThreadDemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/jvm/UnableCreateNewThreadDemo.java)

## OOM—Metaspace

元空间满了就会抛出这个异常。

# JVM垃圾收集

## 触发条件

 **Minor GC触发条件**：

​    当Eden区满时，触发Minor GC

  **Full GC触发条件**：https://www.cnblogs.com/alsf/p/9398834.html

- 
  调用System.gc时，系统建议执行Full GC，但是不必然执行
- 老年代空间不足

- 方法区空间不足

- 通过Minor GC后进入老年代的平均大小大于老年代的可用内存

- 由Eden区、From Space区向To Space区复制时，对象大小大于To Space可用内存，则把该对象转存到老年代，且老年代的可用内存小于该对象大小

## 垃圾回收的过程

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\垃圾回收过程.png)

## 四大垃圾收集算法

### 标记整理

![](/Users/fanqingwei/Desktop/学习/java/JVM/images/GCbq.png)

![](/Users/fanqingwei/Desktop/学习/java/JVM/images/GCbz.png)

1.不产生内存碎片

2.效率不高

### 标记清除

![](/Users/fanqingwei/Desktop/学习/java/JVM/images/GCbq.png)

![](/Users/fanqingwei/Desktop/学习/java/JVM/images/GCbq2.png)

1.效率问题，标记和清楚两个过程效率都不高

2.空间问题，标记和清除后会产生大量不连续的碎片

### 复制算法

![](/Users/fanqingwei/Desktop/学习/java/JVM/images/GCfz.png)

![](/Users/fanqingwei/Desktop/学习/java/JVM/images/GCfz2.png)

1.解决了效率问题

2.浪费了内存空间

### 分代收集算法

准确来讲，跟前面三种算法有所区别。分代收集算法就是根据对象的年代，采用上述三种算法来收集。

1. 对于新生代：每次GC都有大量对象死去，存活的很少，常采用复制算法，只需要拷贝很少的对象。
2. 对于老年代：常采用标整或者标清算法。

## 四个种类垃圾收集器

Java 8可以将垃圾收集器分为四类。

### 串行收集器Serial

为单线程环境设计且**只使用一个线程**进行GC，会暂停所有用户线程，不适用于服务器。就像去餐厅吃饭，只有一个清洁工在打扫。

### 并行收集器Parrallel

使用**多个线程**并行地进行GC，会暂停所有用户线程，适用于科学计算、大数据后台，交互性不敏感的场合。多个清洁工同时在打扫。

### 并发收集器CMS

用户线程和GC线程同时执行（不一定是并行，交替执行），GC时不需要停顿用户线程，互联网公司多用，适用对响应时间有要求的场合。清洁工打扫的时候，也可以就餐。

### G1收集器

对内存的划分与前面3种很大不同，将堆内存分割成不同的区域，然后并发地进行垃圾回收。

## 默认垃圾收集器

### 默认收集器有哪些？

有`Serial`、`Parallel`、`ConcMarkSweep`（CMS）、`ParNew`、`ParallelOld`、`G1`。还有一个`SerialOld`，快被淘汰了。

### 查看默认垃圾修改器

使用`java -XX:+PrintCommandLineFlags`即可看到，Java 8默认使用`-XX:+UseParallelGC`。

```java
-XX:InitialHeapSize=132375936 -XX:MaxHeapSize=2118014976 -XX:+PrintCommandLineFlags -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:-UseLargePagesIndividualAllocation -XX:+UseParallelGC
```

## 七大垃圾收集器

### 体系结构

`Serial`、`Parallel Scavenge`、`ParNew`用户回收新生代；`SerialOld`、`ParallelOld`、`CMS`用于回收老年代。而`G1`收集器，既可以回收新生代，也可以回收老年代。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\垃圾收集器.png)

连线表示可以搭配使用，红叉表示不推荐一同使用，比如新生代用`Serial`，老年代用`CMS`。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\GCqi2.png)



### Serial收集器

年代最久远，是`Client VM`模式下的默认新生代收集器，使用**复制算法**。**优点**：单个线程收集，没有线程切换开销，拥有最高的单线程GC效率。**缺点**：收集的时候会暂停用户线程。

使用`-XX:+UseSerialGC`可以显式开启，开启后默认使用`Serial`+`SerialOld`的组合。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\serial.jpeg)

### ParNew收集器

也就是`Serial`的多线程版本，GC的时候不再是一个线程，而是多个，是`Server VM`模式下的默认新生代收集器，采用**复制算法**。

使用`-XX:+UseParNewGC`可以显式开启，开启后默认使用`ParNew`+`SerialOld`的组合。但是由于`SerialOld`已经过时，所以建议配合`CMS`使用。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\parnew.jpeg)

### Parallel Scavenge收集器（JDK8默认的）

`ParNew`收集器仅在新生代使用多线程收集，老年代默认是`SerialOld`，所以是单线程收集。而`Parallel Scavenge`在新、老两代都采用多线程收集。`Parallel Scavenge`还有一个特点就是**吞吐量优先收集器**，可以通过自适应调节，保证最大吞吐量。采用**复制算法**。

使用`-XX:+UseParallelGC`可以开启， 同时也会使用`ParallelOld`收集老年代。其它参数，比如`-XX:ParallelGCThreads=N`可以选择N个线程进行GC，`-XX:+UseAdaptiveSizePolicy`使用自适应调节策略。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\Parallel.png)

### SerialOld收集器

`Serial`的老年代版本，采用**标整算法**。JDK1.5之前跟`Parallel Scavenge`配合使用，现在已经不了，作为`CMS`的后备收集器。

### ParallelOld收集器

`Parallel`的老年代版本，JDK1.6之前，新生代用`Parallel`而老年代用`SerialOld`，只能保证新生代的吞吐量。JDK1.8后，老年代改用`ParallelOld`。

使用`-XX:+UseParallelOldGC`可以开启， 同时也会使用`Parallel`收集新生代。

### CMS收集器

并发标记清除收集器，是一种以获得**最短GC停顿为**目标的收集器。适用在互联网或者B/S系统的服务器上，这类应用尤其重视服务器的**响应速度**，希望停顿时间最短。是`G1`收集器出来之前的首选收集器。使用**标清算法**。在GC的时候，会与用户线程并发执行，不会停顿用户线程。但是在**标记**的时候，仍然会**STW**。

使用`-XX:+UseConcMarkSweepGC`开启。开启过后，新生代默认使用`ParNew`，同时老年代使用`SerialOld`作为备用。

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\cms.jpeg)

#### 过程

1. **初始标记**：只是标记一下GC Roots能直接关联的对象，速度很快，需要**STW**。
2. **并发标记**：主要标记过程，标记全部对象，和用户线程一起工作，不需要STW。
3. **重新标记**：修正在并发标记阶段出现的变动，需要**STW**。
4. **并发清除**：和用户线程一起，清除垃圾，不需要STW。

#### 优缺点

**优点**：停顿时间少，响应速度快，用户体验好。

**缺点**：

1. 对CPU资源非常敏感：由于需要并发工作，多少会占用系统线程资源。
2. 无法处理浮动垃圾：由于标记垃圾的时候，用户进程仍然在运行，无法有效处理新产生的垃圾。
3. 产生内存碎片：由于使用**标清算法**，会产生内存碎片。

### G1收集器

G1是一款面向服务器的垃圾收集器，主要针对配备多颗处理器及大容量内存的机器，以极高概率满足GC停顿时间要求的同时，还具备高吞吐量性能特征

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\G1.png)

`G1`收集器与之前垃圾收集器的一个显著区别就是——之前收集器都有三个区域，新、老两代和元空间。而G1收集器只有G1区和元空间。而G1区，不像之前的收集器，分为新、老两代，而是一个一个**Region**，每个Region既可能包含新生代，也可能包含老年代。

`G1`收集器既可以提高吞吐量，又可以减少GC时间。最重要的是**STW可控**，增加了预测机制，让用户指定停顿时间。

使用`-XX:+UseG1GC`开启，还有`-XX:G1HeapRegionSize=n`、`-XX:MaxGCPauseMillis=n`等参数可调。

#### 特点

1. **并行和并发**：充分利用多核、多线程CPU，尽量缩短STW。
2. **分代收集**：虽然还保留着新、老两代的概念，但物理上不再隔离，而是融合在Region中。
3. **空间整合**：`G1`整体上看是**标整**算法，在局部看又是**复制算法**，不会产生内存碎片。
4. **可预测停顿**：用户可以指定一个GC停顿时间，`G1`收集器会尽量满足。

#### 过程

与`CMS`类似。

1. 初始标记。
2. 并发标记。
3. 最终标记。
4. 筛选回收。最牛逼的功能就是多了一个可预测停顿

G1收集器在后台维护了一个优先列表，每次根据允许的收集时间，优先选择回收价值最大的Region(这也就是它的名字Garbage-First的由来)。这种使用Region划分内存空间以及有优先级的区域回收方式，保证了G1收集器在有限时间内可以尽可能高的收集效率（把内存化整为零）

### 怎么选择垃圾回收器

1.优先调整堆的大小让服务器自己来选

2.如果内存小于100M，使用串行收集器

3.如果是单核，并且没有停顿时间的要求，串行或自己选择

4.如果允许停顿时间超过1秒，选择并行或者JVM自己选

5.如果影响时间最重要，并且不能超过1秒，使用并发收集器

官方推荐G1，性能高

# 调优

JVM调优主要就是调整下面两个指标

**停顿时间**：垃圾收集器做垃圾回收中断应用执行的时间。-XX：MaxGCPauseMillis

**GC的次数**：尽量减少fullGC的次数

## 调优的步骤

1. 打印GC日志
2. 分析日志得到关键性指标
3. 分析GC原因，调优JVM参数

## 其他（调优工具、优化方案、参考数据、常见问题）

​    见脑图

# 反射机制

## 动态语言与静态语言

### 动态语言

动态语言是一类在运行时可以改变其结构的语言：例如新的函数，对象，甚至代码可以被引进，已有的函数可以被删除或是其它结构上的变化。通俗点说就是在运行时代码可以根据某些条件改变自身结构

主要的动态语言有：Object-c、C#、JavaScript、PHP、Python等

### 静态语言

与动态语言相比，运行时结构不可变的语言就是静态语言。例如Java、C、C++

Java不是动态语言，但是Java可以称为“准动态语言”。即Java有一定的动态性，我们可以利用反射机制来获取类似于动态语言的 特性，Java的动态性让编程的时候更加灵活。

## Java反射机制概述

### 什么是反射

**在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意方法和属性；这种动态获取信息以及动态调用对象方法的功能称为 Java 语言的反射机制.**

Java Reflection：Java反射是Java被视为动态语言的关键，反射机制运行程序在执行期借助于Reflection API 去获得任何类内部的信息，并能直接操作任意对象的内部属性及方法。

```
Class c = Class.forName("java.lang.String")
```

在加载完类后，在堆内存的方法区就产生了一个Class类型的对象（一个类只有一个Class对象），这个对象就包含了完整的类的结构信息，**我们可以通过这个对象看到类的结构，这个对象就像一面镜子，透过这个镜子看到类的结构，所以我们形象的称之为：反射**

![image-20200328232620190](/Users/fanqingwei/Desktop/学习/java/JVM/images\image-20200328232620190.png)

tip：反射可以获取到private修饰的成员变量和方法

### 反射的应用

- 在运行时判断任意一个对象所属类
- 在运行时构造任意一个类的对象
- 在运行时判断任意一个类所具有的成员变量和方法
- 在运行时获取泛型信息
- 在运行时调用任意一个对象的成员变量和方法
- 在运行时候处理注解
- 生成动态代理
- .....

### Java反射的优缺点

- 优点：可以实现动态创建对象和编译，体现出很大的灵活性,降低耦合性，提高自适应能力
- 缺点：对性能有影响。使用反射基本上是一种解释操作，我们可以告诉JVM，我们希望做什么并且它满足我们的要求，这类操作总是慢于直接执行相同的操作。也就是说new创建和对象，比反射性能更高

### 反射相关的主要API

- java.lang.Class：代表一个类
- java.lang.reflect.Method：代表类的方法
- java.lang.reflect.Field：代表类的成员变量
- java.lang.reflect.Constructor：代表类的构造器
- ........

## 理解Class类并获取Class实例

### Class类

我们下面通过Class.forName来获取一个实例对象

```java
/**
 * 反射Demo
 *
 * @author: 陌溪
 * @create: 2020-03-29-8:21
 */
public class ReflectionDemo {
    public static void main(String[] args) throws ClassNotFoundException {
        // 通过反射获取类的Class对象
        Class c1 = Class.forName("com.moxi.interview.study.annotation.User");
        Class c2 = Class.forName("com.moxi.interview.study.annotation.User");
        Class c3 = Class.forName("com.moxi.interview.study.annotation.User");
        System.out.println(c1.hashCode());
        System.out.println(c2.hashCode());
        System.out.println(c3.hashCode());


    }
}

/**
 * 实体类：pojo，entity
 */
class User {
    private String name;
    private int id;
    private int age;

    public User() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", id=" + id +
                ", age=" + age +
                '}';
    }
}
```

上面我们通过反射获取了三个对象，我们输出对应对象的hashcode码，会发现

```java
1173230247
1173230247
1173230247
```

它们的hashcode码是一样的，这就说明了：

- 一个类在内存中只有一个Class对象
- 一个类被加载后，类的整体结构都会被封装在Class对象中

在Object类中定义了以下的方法，此方法将被所有子类继承

```java
public final Class getClass()
```

以上方法的返回值的类型是一个Class类，此类是Java反射的源头，实际上所谓反射从程序的运行结果来看也很好理解，即：可以通过对象反射求出类的名称。

![image-20200329093212035](/Users/fanqingwei/Desktop/学习/java/JVM/images\image-20200329093212035.png)

也就是说，我们通过对象来获取到它的Class，相当于逆过程

通过对照镜子我们可以得到的信息：某个类的属性，方法和构造器，某个类到底实现了那些接口。**对于每个类而言，JRE都为其保留一个不变的Class类型对象，一个Class对象包含了特定某个结构的有关信息**

- Class本身也是一个类
- Class对象只能由系统建立对象
- 一个加载的类在JVM中只会有一个Class实例
- 一个Class对象对应的是一个加载到JVM中的一个.class文件
- 每个类的实例都会记得自己是由哪个Class实例所生成
- 通过Class可以完整地得到一个类中所有被加载的结构
- Class类是Reflection的根源，针对任何你想动态加载、运行的类、唯有先获得相应的Class对象

### Class类常用的方法

- Class .forName(String name)：返回指定类name的Class对象
- newInstance()：调用缺省构造函数，返回Class对象的一个实例
- getName()：返回此Class对象所表示的实体（类，接口，数组或void）的名称
- getSuperClass()：返回当前Class对象的父类Class对象
- getinterfaces()：返回当前对象的接口
- getClassLoader()：返回该类的类加载器
- getConstructors()：返回一个包含某些Constructor对象的数组
- getMethod(String name, Class.. T)：返回一个Method对象，此对象的形参类型为paramsType
- getDeclaredFields()：返回Field对象的一个数组

### 哪些类型可以有Class对象

class：外部类，成员（成员内部类，静态内部类），局部内部类，匿名内部类

interface：接口

[]：数组

enum：枚举

annotation：注解@interface

primitive type：基本数据类型

void

```java
/**
 * 获取Class的方式
 *
 * @author: 陌溪
 * @create: 2020-03-29-10:16
 */
public class GetClassDemo {
    public static void main(String[] args) {
        Class c1 = Object.class; // 类
        Class c2 = Comparable.class; // 接口
        Class c3 = String[].class; // 数组
        Class c4 = int[][].class; // 二维数组
        Class c5 = Override.class; // 注解
        Class c6 = ElementType.class; // 枚举
        Class c7 = Integer.class; // 基本数据类型
        Class c8 = void.class; // void，空数据类型
        Class c9 = Class.class; // Class

        System.out.println(c1);
        System.out.println(c2);
        System.out.println(c3);
        System.out.println(c4);
        System.out.println(c5);
        System.out.println(c6);
        System.out.println(c7);
        System.out.println(c8);
        System.out.println(c9);
    }
}
```

最后运行结果为：

```
class java.lang.Object
interface java.lang.Comparable
class [Ljava.lang.String;
class [[I
interface java.lang.Override
class java.lang.annotation.ElementType
class java.lang.Integer
void
class java.lang.Class
```

同时需要注意，只要类型和维度一样，那就是同一个Class对象

```
int [] a = new int[10];
int [] b = new int[10];
System.out.println(a.getClass().hashCode());
System.out.println(b.getClass().hashCode());
```

这两个的hashcode是一样的

## 获取Class对象的方法

- 若已知具体的类，通过类的class属性获取，该方法最为安全可靠，程序性能最高
  - Class clazz = Person.class;
- 已知某个类的实例，调用该实例的getClass()方法获取Class对象
  - Class clazz = person.getClass()
- 已经一个类的全类名，且该类在类路径下，可以通过Class类的静态方法forName()获取，HIA可能抛出ClassNotFoundException
  - Class clazz = Class.forName("demo01.Sutdent")
- 内置数据类型可以直接通过 类名.Type
- 还可以利用ClassLoader

```java
/**
 * Class类创建的方式
 *
 * @author: 陌溪
 * @create: 2020-03-29-9:56
 */
class Person {
    public String name;
    public Person() {
    }
    public Person(String name) {
        this.name = name;
    }
    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                '}';
    }
}

class Student extends Person{
    public Student() {
        this.name = "学生";
    }
}

class Teacher extends Person {
    public Teacher() {
        this.name = "老师";
    }
}


public class ClassCreateDemo {
    public static void main(String[] args) throws ClassNotFoundException {

        Person person = new Student();
        System.out.println("这个人是：" + person.name);

        // 方式1：通过对象获得
        Class c1 = person.getClass();
        System.out.println("c1:" + c1.hashCode());

        //方式2：通过forName获得
        Class c2 = Class.forName("com.moxi.interview.study.annotation.Student");
        System.out.println("c2:" + c2.hashCode());

        // 方式3：通过类名获取（最为高效）
        Class c3 = Student.class;
        System.out.println("c3:" + c3.hashCode());

        // 方式4：基本内置类型的包装类，都有一个Type属性
        Class c4 = Integer.TYPE;
        System.out.println(c4.getName());

        // 方式5：获取父类类型
        Class c5 = c1.getSuperclass();
    }
}
```

## 有了Class对象，我们能够做什么？

#### 创建类的对象

通过调用Class对象的newInstance()方法

- 类必须有一个无参数的构造器
- 类的构造器的权限需要足够

如果没有无参构造器就不能创建对象？

只要在操作的时候明确的调用类中的构造器，并将参数传递进去之后，才可以实例化操作。

步骤如下：

- 通过Class类的getDeclaredConstructor(Class ... parameterTypes)取得本类的指定形参类型的构造器
- 向构造器的形参中，传递一个对象数组进去，里面包含了构造器中所需的各个参数
- 通过Constructor实例化对象

#### 调用指定方法

通过反射，调用类中的方法，通过Method类完成。

- 通过Class类的getMethod方法取得一个Method对象，并设置此方法操作时所需要的参数类型
- 之后使用Object invoke进行调用，并向方法中传递要设置的obj对象的参数信息

#### Invoke方法

- Object invoke(Object obj， Object ... args)
- Object对应原方法的返回值，若原方法无返回值，此时返回null
- 若原方法为静态方法，此时形参Object 可以为null
- 若原方法形参列表为空，则Object[] args 为 null
- 若原方法声明private，则需要在调用此invoke() 方法前，显示调用方法对象的setAccessible(true)方法，将可访问private的方法

#### setAccessible方法

- Method和Field、Constructor对象都有setAccessible()方法
- setAccessible作用是启动和禁用访问安全检查的开关
- 参数值为true则指示反射对象再使用时应该取消Java语言访问检查
  - 提高反射效率，如果代码中必须使用反射，而这句代码需要频繁被嗲用，那么设置成true
  - 使得原本无法访问的私有成员也可以访问
- 参数值为false则指示反射的对象应该实行Java语言访问检查

![image-20200329144428207](/Users/fanqingwei/Desktop/学习/java/JVM/images/image-20200329144428207.png)

完整代码：

```java
/**
 * 通过反射获取对象
 *
 * @author: 陌溪
 * @create: 2020-03-29-12:43
 */
public class GetObjectByReflectionDemo {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException, NoSuchFieldException {

        // 获取Class
        Class clazz = Class.forName("com.moxi.interview.study.annotation.User");

        // 构造一个对象，newInstance调用的是无参构造器，如果没有无参构造器的话，本方法会出错
//        User user = (User)clazz.newInstance();

        // 获取class的有参构造器
        Constructor constructor = clazz.getDeclaredConstructor(String.class, int.class, int.class);
        User user2 = (User) constructor.newInstance("小溪", 10, 10);
        System.out.println(user2);


        // 通过反射调用普通构造方法
        User user3 = (User)clazz.newInstance();
        // 获取setName 方法
        Method setName = clazz.getDeclaredMethod("setName", String.class);
        // 执行setName方法，传入对象 和 参数
        setName.invoke(user3, "小白");
        System.out.println(user3);

        System.out.println("============");
        Field age = clazz.getDeclaredField("age");
        // 关闭权限检测,这样才能直接修改字段，因为 set方法不能直接操作私有变量
        age.setAccessible(true);
        age.set(user3, 10);
        System.out.println(user3);

    }
}
```

运行结果

```java
User{name='小溪', id=10, age=10}
User{name='小白', id=0, age=0}
============
User{name='小白', id=0, age=10}
```

## 反射性能对比

下面我们编写代码来具体试一试，使用反射的时候和不适用反射，在执行方法时的性能对比

```java
/**
 * 反射性能
 *
 * @author: 陌溪
 * @create: 2020-03-29-14:55
 */
public class ReflectionPerformance {

    /**
     * 普通方式调用
     */
    public static void test01() {
        User user = new User();
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 1000000000; i++) {
            user.getName();
        }
        long endTime = System.currentTimeMillis();

        System.out.println("普通方式执行10亿次getName的时间:" + (endTime - startTime) + " ms");
    }

    /**
     * 反射方式调用
     */
    public static void test02() throws Exception {
        Class clazz = Class.forName("com.moxi.interview.study.annotation.User");
        Method getName = clazz.getDeclaredMethod("getName", null);
        User user = (User) clazz.newInstance();
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < 1000000000; i++) {
            getName.invoke(user, null);
        }
        long endTime = System.currentTimeMillis();

        System.out.println("反射方式执行10亿次getName的时间:" + (endTime - startTime) + " ms");
    }

    /**
     * 反射方式调用，关闭权限检查
     */
    public static void test03() throws Exception {
        Class clazz = Class.forName("com.moxi.interview.study.annotation.User");
        Method getName = clazz.getDeclaredMethod("getName", null);
        User user = (User) clazz.newInstance();
        long startTime = System.currentTimeMillis();
        getName.setAccessible(true);
        for (int i = 0; i < 1000000000; i++) {
            getName.invoke(user, null);
        }
        long endTime = System.currentTimeMillis();

        System.out.println("反射方式执行10亿次getName的时间:" + (endTime - startTime) + " ms");
    }
    public static void main(String[] args) throws Exception {
        test01();
        test02();
        test03();
    }
}

```

运行结果：

```java
普通方式执行10亿次getName的时间:3 ms
反射方式执行10亿次getName的时间:2554 ms
反射方式执行10亿次getName的时间:1365 ms
```

我们上面分别是执行了 10亿次 getName的方法，从里面可以看出，通过直接实例化对象后，调用getName耗时最短，同时关闭了 权限检查后的比不关闭能提高一倍的性能。

##  反射机制性能低的原因

​                         1.Method#invoke 方法会对参数做封装和解封操作
​                         2.需要检查方法可见性
​                         3.需要校验参数
​                         4.反射方法难以内联
​                         5.反射涉及到动态加载的类型，所以无法进行优化

## 反射机制的应用

​              各种框架用的最多的就是反射
​              加载驱动
​              读取配置文件

## 反射操作泛型

Java采用泛型擦除机制来引入泛型，Java中的泛型仅仅是给编译器Java才使用的，确保数据的安全性和免去强制类型转换的问题，但是一旦编译完成后，所有的泛型有关的类型全部被擦除

为了通过反射操作这些类型，Java新增了ParameterizedType，GenericArrayType，TypeVariable和WildcardType几种类型来代表不能被归一到Class类中的类型但是有何原始类型齐名的类型。

- ParameterizedType：表示一种参数化类型，比如Collection<String>
- GenericArrayType：表示一种元素类型是参数化类型或者类型变量的数组类型
- TypeVariable：是各种类型变量的公共父接口
- WildcardType：代表一种通配符类型的表达式

下面我们通过代码来获取方法上的泛型，包括参数泛型，以及返回值泛型

```java
/**
 * 通过反射获取泛型
 *
 * @author: 陌溪
 * @create: 2020-03-29-15:15
 */
public class GenericityDemo {

    public void test01(Map<String, User> map, List<User> list) {
        System.out.println("test01");
    }

    public Map<String, User> test02() {
        System.out.println("test02");
        return null;
    }

    public static void main(String[] args) throws Exception{

        Method method = GenericityDemo.class.getMethod("test01", Map.class, List.class);

        // 获取所有的泛型，也就是参数泛型
        Type[] genericParameterTypes = method.getGenericParameterTypes();

        // 遍历打印全部泛型
        for (Type genericParameterType : genericParameterTypes) {
            System.out.println(" # " +genericParameterType);
            if(genericParameterType instanceof ParameterizedType) {
                Type[] actualTypeArguments = ((ParameterizedType) genericParameterType).getActualTypeArguments();
                for (Type actualTypeArgument : actualTypeArguments) {
                    System.out.println(actualTypeArgument);
                }
            }
        }

        // 获取返回值泛型
        Method method2 = GenericityDemo.class.getMethod("test02", null);
        Type returnGenericParameterTypes = method2.getGenericReturnType();

        // 遍历打印全部泛型
        if(returnGenericParameterTypes instanceof ParameterizedType) {
            Type[] actualTypeArguments = ((ParameterizedType) returnGenericParameterTypes).getActualTypeArguments();
            for (Type actualTypeArgument : actualTypeArguments) {
                System.out.println(actualTypeArgument);
            }
        }

    }
}
```

得到的结果

```java
 # java.util.Map<java.lang.String, com.moxi.interview.study.annotation.User>
class java.lang.String
class com.moxi.interview.study.annotation.User
 # java.util.List<com.moxi.interview.study.annotation.User>
class com.moxi.interview.study.annotation.User
###################
class java.lang.String
class com.moxi.interview.study.annotation.User
```

## 反射操作注解

通过反射能够获取到 类、方法、字段。。。等上的注解

- getAnnotation
- getAnnotations

### ORM对象关系映射

ORM即为：Object relationship Mapping，对象关系映射

- 类和表结构对应
- 属性和字段对应
- 对象和记录对应

![image-20200329153301047](C:/Users/felixsfan/Desktop/LearningNotes/%E6%A0%A1%E6%8B%9B%E9%9D%A2%E8%AF%95/Java%E6%B3%A8%E8%A7%A3%E5%92%8C%E5%8F%8D%E5%B0%84/images/image-20200329153301047.png)

下面使用代码，模拟ORM框架的简单使用

```java
/**
 * ORMDemo
 *
 * @author: 陌溪
 * @create: 2020-03-29-15:33
 */
@TableKuang("db_student")
class Student2 {
    @FieldKuang(columnName = "db_id", type="int", length = 10)
    private int id;

    @FieldKuang(columnName = "db_age", type="int", length = 10)
    private int age;

    @FieldKuang(columnName = "db_name", type="varchar", length = 10)
    private String name;

    public Student2() {
    }

    public Student2(int id, int age, String name) {
        this.id = id;
        this.age = age;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student2{" +
                "id=" + id +
                ", age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}

/**
 * 自定义注解：类名的注解
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@interface TableKuang {
    String value();
}

/**
 * 自定义注解：属性的注解
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@interface FieldKuang {
    String columnName();
    String type();
    int length() default 0;
}
public class ORMDemo {

    public static void main(String[] args) throws Exception{
        // 获取Student 的 Class对象
        Class c1 = Class.forName("com.moxi.interview.study.annotation.Student2");

        // 通过反射，获取到全部注解
        Annotation [] annotations = c1.getAnnotations();

        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }

        // 获取注解的value值
        TableKuang tableKuang = (TableKuang)c1.getAnnotation(TableKuang.class);
        String value = tableKuang.value();
        System.out.println(value);

        // 获得类指定的注解
        Field f = c1.getDeclaredField("name");
        FieldKuang fieldKuang = f.getAnnotation(FieldKuang.class);
        System.out.println(fieldKuang.columnName());
        System.out.println(fieldKuang.type());
        System.out.println(fieldKuang.length());
    }
}
```

# 类的加载

## 类的生命周期

### 步骤

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\类的加载机制.png)

- 加载：将class文件字节码内容加载到内存，并将这些静态数据转换成方法区的运行时数据结构，然后生成一个代表这个类的 `java.lang.Class` 对象。
- 链接：将Java类的二进制代码合并到JVM的运行状态之中的过程。
  - 验证：确保加载的类信息符合JVM规范，没有安全方面的问题
  
  ​           文件格式验证、元数据验证、字节码验证、符号引用验证
  
  - 准备：正式为类变量(static)分配内存并设置类变量默认初始值的阶段，这些内存都将在方法区中进行分配。
  - 解析：虚拟机常量池的符号引用(常量名)替换为直接引用(地址)的过程
- 初始化：
  - 执行类构造器<clinit>方法的过程，类构造器<clinit> 方法是由编译期自动收集类中所有**类变量（static）**的赋值动作和**静态代码块**中的语句合并产生的。（类构造器是构造类信息的，不是构造该类对象的构造器）
  - 当初始化一个类的时候，如果发现其父类还没有初始化完成，则需要先触发其父类的初始化
  - 虚拟机会保证一个类的<clinit>方法在多相差环境中被正确的加锁和同步
- 使用
- 卸载

### 代码示例

下面一段代码，分别说明了static代码块，以及子类和父类构造方法的执行流程

```java
/**
 * 类加载流程
 *
 * @author: 陌溪
 * @create: 2020-03-29-11:02
 */
class SuperA {

    static {
        System.out.println("父类静态代码块初始化");
    }

    public SuperA() {
        System.out.println("父类构造函数初始化");
    }
}
class A extends SuperA{
    static {
        System.out.println("静态代码块初始化");
        m = 300;
    }

    static int m = 100;

    public A() {
        System.out.println("A类的无参构造方法");
    }

}
public class ClassLoaderDemo {

    public static void main(String[] args) {
        A a = new A();
        System.out.println(a.m);
    }
}
```

最后的结果为：

```java
父类静态代码块初始化
静态代码块初始化
父类构造函数初始化
A类的无参构造方法
100
```

说明静态代码块都是先执行的，并且父类优先

### 什么时候发生类初始化

**类的主动引用（一定发生初始化）**

- 当虚拟机启动，先初始化main方法所有在类
- new 一个类的对象
- 调用类的静态成员（除了 final常量）和静态方法
- 使用 java.lang.reflect包的方法对类进行反射调用
- 当初始化一个类，如果其父类没有被初始化，则会先初始化它的父类

**类的被动引用（不会发生初始化）**

- 当访问一个静态域时，只有真正的申明这个域的类才会被初始化，如：当通过子类引用父类的静态变量，不会导致子类初始化
- 通过数组定义类引用，不会触发此类的初始化
- 引用常量不会触发此类的初始化（常量在链接阶段就存入调用类的常量池了）

## 类加载器

### 类加载器的作用

- 类加载的作用：将class文件字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时数据结构，然后在堆中生成了一个代表这个类的 `java.lang.Class`对象，作为方法区中类数据的访问入口。
- 类缓存：标准的JavaSE类加载器可以按要求查找类，但是一旦某个类被加载到类加载器中，它将维持加载（缓存）一段时间。不过JVM垃圾回收机制可以回收这些Class对象

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\加载.png)

### 类加载器种类

#### 启动类加载器

负责加载JRE的核心类库，如JRE目标下的rt.jar,charsets.jar

#### 扩展类加载器

负责加载JRE扩展目录ext中jar类包

#### 系统类加载器

负责加载ClassPath路径下的类包

#### 用户自定义加载器

负责加载用户自定义路径下的类包

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\类加载器.png)

代码如下：

```java
/**
 * 类加载器的种类
 *
 * @author: 陌溪
 * @create: 2020-03-29-11:51
 */
public class ClassLoaderTypeDemo {
    public static void main(String[] args) {

        //当前类是哪个加载器
        ClassLoader loader = ClassLoaderTypeDemo.class.getClassLoader();
        System.out.println(loader);

        // 获取系统类加载器
        ClassLoader classLoader = ClassLoader.getSystemClassLoader();
        System.out.println(classLoader);

        // 获取系统类加载器的父类加载器 -> 扩展类加载器
        ClassLoader parentClassLoader = classLoader.getParent();
        System.out.println(parentClassLoader);

        // 获取扩展类加载器的父类加载器 -> 根加载器（C、C++）
        ClassLoader superParentClassLoader = parentClassLoader.getParent();
        System.out.println(superParentClassLoader);

        // 测试JDK内置类是谁加载的
        ClassLoader loader2 = Object.class.getClassLoader();
        System.out.println(loader2);
    }
}

```

运行结果：我们发现，根加载器我们无法获取到

```java
sun.misc.Launcher$AppClassLoader@18b4aac2
sun.misc.Launcher$AppClassLoader@18b4aac2
sun.misc.Launcher$ExtClassLoader@45ee12a7
null
null
```

获取类加载器能够加载的路径

```java
// 如何获取类加载器可以加载的路径
System.out.println(System.getProperty("java.class.path"));
```

最后输出结果为：

```java
  // 如何获取类加载器可以加载的路径
        System.out.println(System.getProperty("java.class.path"));
        
        /*
        E:\Software\JDK1.8\Java\jre\lib\charsets.jar;
        E:\Software\JDK1.8\Java\jre\lib\deploy.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\access-bridge-64.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\cldrdata.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\dnsns.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\jaccess.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\jfxrt.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\localedata.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\nashorn.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\sunec.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\sunjce_provider.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\sunmscapi.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\sunpkcs11.jar;
        E:\Software\JDK1.8\Java\jre\lib\ext\zipfs.jar;
        E:\Software\JDK1.8\Java\jre\lib\javaws.jar;
        E:\Software\JDK1.8\Java\jre\lib\jce.jar;
        E:\Software\JDK1.8\Java\jre\lib\jfr.jar;
        E:\Software\JDK1.8\Java\jre\lib\jfxswt.jar;
        E:\Software\JDK1.8\Java\jre\lib\jsse.jar;
        E:\Software\JDK1.8\Java\jre\lib\management-agent.jar;
        E:\Software\JDK1.8\Java\jre\lib\plugin.jar;
        E:\Software\JDK1.8\Java\jre\lib\resources.jar;
        E:\Software\JDK1.8\Java\jre\lib\rt.jar;
        C:\Users\Administrator\Desktop\LearningNotes\校招面试\JUC\Code\target\classes;
        C:\Users\Administrator\.m2\repository\org\projectlombok\lombok\1.18.10\lombok-1.18.10.jar;
        C:\Users\Administrator\.m2\repository\cglib\cglib\3.3.0\cglib-3.3.0.jar;
        C:\Users\Administrator\.m2\repository\org\ow2\asm\asm\7.1\asm-7.1.jar;
        E:\Software\IntelliJ IDEA\IntelliJ IDEA 2019.1.2\lib\idea_rt.jar
         */
```

我们能够发现，类在加载的时候，都是有自己的加载区域的，而不是任何地方的类都能够被加载

## 类的加载机制

### 全盘负责委托机制

当一个ClassLoader加载一个类的时候，除非显示使用另一个ClassLoader,该类所依赖和引用的类也由这个ClassLoader载入

### 双亲委派机制

事先委托父类加载器寻找目标类，在找不到的情况下再去在自己路径中的查找并载入目标类

![](/Users/fanqingwei/Desktop/学习/java/JVM/images\image-20200329122029227.png)

### 双亲委派机制优势

- 沙箱安全机制：比如自己写的String.class类不会被加载，这样可以防止核心类库被随意篡改
- 避免类的重复加载：当父类ClassLoader已经加载了该类的时候，就不需要ClassLoader再加载一次

## 获取运行时候类的完整结构

通过反射能够获取运行时类的完整结构

- 实现的全部接口
- 所继承的父类
- 全部的构造器
- 全部的方法
- 全部的Field
- 注解

```
/**
 * 获取运行时类信息
 * @author: 陌溪
 * @create: 2020-03-29-12:13
 */
public class GetClassInfo {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException, NoSuchMethodException {
        Class clazz = Class.forName("com.moxi.interview.study.annotation.User");

        // 获取类名字
        System.out.println(clazz.getName()); // 包名 + 类名
        System.out.println(clazz.getSimpleName()); // 类名

        // 获取类属性
        System.out.println("================");
        // 只能找到public属性
        Field [] fields = clazz.getFields();

        // 找到全部的属性
        Field [] fieldAll = clazz.getDeclaredFields();

        for (int i = 0; i < fieldAll.length; i++) {
            System.out.println(fieldAll[i]);
        }

        // 获取指定属性的值
        Field name = clazz.getDeclaredField("name");

        // 获取方法
        Method [] methods = clazz.getDeclaredMethods(); // 获取本类和父类的所有public方法
        Method [] methods2 = clazz.getMethods(); // 获取本类所有方法

        // 获得指定方法
        Method method = clazz.getDeclaredMethod("getName", null);

        // 获取方法的时候，可以把参数也丢进去，这样因为避免方法重载，而造成不知道加载那个方法
        Method method2 = clazz.getDeclaredMethod("setName", String.class);

    }
}
```



