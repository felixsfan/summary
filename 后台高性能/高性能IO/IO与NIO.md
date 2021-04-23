# 扩展

http://blog.csdn.net/russell_tao/article/details/9111769)

##  零拷贝

https://mp.weixin.qq.com/s/P0IP6c_qFhuebwdwD8HM7w

此文档只是一些概念的总结，具体参考netty笔记

## 粘包/拆包

见计算机网路课本

# 参考博客

https://www.jianshu.com/p/e6162bc984c8

一文搞懂，网络IO模型https://zhuanlan.zhihu.com/p/260450151?utm_source=wechat_session

EndPoint源码解析https://blog.csdn.net/weixin_43133353/article/details/93602881

Linux 是如何收发网络包https://mp.weixin.qq.com/s/ISQ2qutpJjYOdtM3taeO_A

socket详解 https://www.cnblogs.com/zengzy/p/5107516.html

# 1. 网络框架设计要素

要理解网络框架有哪些，必须要清楚网络框架完成了哪些事情。

![](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qbwyoXr8TRUUv7s9ntgpAAtibJ1Ddem38HIwOIAnAKU24gvRKJIW2TOAop6EicG9umPMZibdRW7HDgyA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

大致描述下这个请求处理的流程：

- 远端的机器A发送了一个HTTP请求到服务器B，此时服务器B网卡接收到数据并产生一个IO可读事件;
- 我们以同步IO为例，此时内核将该可读事件通知到应用程序的Listen线程;
- Listen线程将任务甩给Handler线程，由Handler将数据从内核读缓冲区拷贝到用户空间读缓冲区;
- 请求数据包在应用程序内部进行计算和处理并封装响应包;
- Handler线程等待可写事件的到来;
- 当这个连接可写时将数据从用户态写缓冲区拷贝到内核缓冲区，并通过网卡发送出去;

> 备注：上述例子是以同步IO为例，并且将线程中的角色分为Listen线程、Handler线程、Worker线程，分别完成不同的工作，后续会详细展开。

所以我们可以知道，要完成一个数据交互，涉及了几大块内容：

- **IO事件监听**

- **数据拷贝**

- **数据处理和计算**

  这三大块内容，不论什么形式的框架都绕不开，也是理解网络架构的关键所在。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qbwyoXr8TRUUv7s9ntgpAAtPgJpZdYFfL4UWIUD9KVwGzabOMMyogGcj14kvMZOficGRAnB9htb9kw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



**IO读写经历的两个过程：**
阶段1 wait for data 等待数据准备
阶段2 copy data from kernel to user 将数据从内核拷贝到用户进程中

## 2.1 专有名词

- **用户空间 / 内核空间**
  现在操作系统都是采用虚拟存储器，那么对32位操作系统而言，它的寻址空间（虚拟存储空间）为4G（2的32次方）。
  操作系统的核心是内核，独立于普通的应用程序，可以访问受保护的内存空间，也有访问底层硬件设备的所有权限。为了保证用户进程不能直接操作内核（kernel），保证内核的安全，操作系统将虚拟空间划分为两部分，一部分为内核空间，一部分为用户空间。

- **进程切换**
  为了控制进程的执行，内核必须有能力挂起正在CPU上运行的进程，并恢复以前挂起的某个进程的执行。这种行为被称为进程切换。因此可以说，任何进程都是在操作系统内核的支持下运行的，是与内核紧密相关的，并且进程切换是非常耗费资源的。

- **进程阻塞**
  正在执行的进程，由于期待的某些事件未发生，如请求系统资源失败、等待某种操作的完成、新数据尚未到达或无新工作做等，则由系统自动执行阻塞原语(Block)，使自己由运行状态变为阻塞状态。可见，进程的阻塞是进程自身的一种主动行为，也因此只有处于运行态的进程（获得了CPU资源），才可能将其转为阻塞状态。当进程进入阻塞状态，是不占用CPU资源的。

- **文件描述符**
  文件描述符（File descriptor）是计算机科学中的一个术语，是一个用于表述指向文件的引用的抽象化概念。
  文件描述符在形式上是一个非负整数。实际上**它是一个索引值，指向内核为每一个进程所维护的该进程打开文件的记录表**。当程序打开一个现有文件或者创建一个新文件时，内核向进程返回一个文件描述符。在程序设计中，一些涉及底层的程序编写往往会围绕着文件描述符展开。**但是文件描述符这一概念往往只适用于UNIX、Linux这样的操作系统而windows为句柄的概念**。

- **句柄**
  所谓句柄实际上是一个数据，是一个Long (整长型)的数据。
  **句柄是WONDOWS用来标识被应用程序所建立或使用的对象的唯一整数**，WINDOWS使用各种各样的句柄标识诸如应用程序实例，窗口，控制，位图，GDI对象等等。WINDOWS句柄有点象C语言中的文件句柄。从上面的定义中的我们可以看到，句柄是一个标识符，是拿来标识对象或者项目的，它就象我们的姓名一样，每个人都会有一个，不同的人的姓名不一样，但是，也可能有一个名字和你一样的人。从数据类型上来看它只是一个16位的无符号整数。应用程序几乎总是通过调用一个WINDOWS函数来获得一个句柄，之后其他的WINDOWS函数就可以使用该句柄，以引用相应的对象。

  如果想更透彻一点地认识句柄，我可以告诉大家，句柄是一种指向指针的指针。我们知道，所谓指针是一种内存地址。应用程序启动后，组成这个程序的各对象是住留在内存的。如果简单地理解，似乎我们只要获知这个内存的首地址，那么就可以随时用这个地址访问对象。但是，如果您真的这样认为，那么您就大错特错了。我们知道，Windows是一个以虚拟内存为基础的操作系统。在这种系统环境下，Windows内存管理器经常在内存中来回移动对象，依此来满足各种应用程序的内存需要。对象被移动意味着它的地址变化了。如果地址总是如此变化，我们该到哪里去找该对象呢?

  为了解决这个问题，Windows操作系统为各应用程序腾出一些内存储地址，用来专门登记各应用对象在内存中的地址变化，而这个地址(存储单元的位置)本身是不变的。Windows内存管理器在移动对象在内存中的位置后，把对象新的地址告知这个句柄地址来保存。这样我们只需记住这个句柄地址就可以间接地知道对象具体在内存中的哪个位置。这个地址是在对象装载(Load)时由系统分配给的，当系统卸载时(Unload)又释放给系统。

  句柄地址(稳定)→记载着对象在内存中的地址────→对象在内存中的地址(不稳定)→实际对象，WINDOWS程序中并不是用物理地址来标识一个内存块，文件，任务或动态装入模块的，相反的，WINDOWS API给这些项目分配确定的句柄，并将句柄返回给应用程序，然后通过句柄来进行操作

- **缓存I/O**
  缓存I/O又称为标准I/O，大多数文件系统的默认I/O操作都是缓存I/O。在Linux的缓存I/O机制中，操作系统会将I/O的数据缓存在文件系统的页缓存中，即数据会先被拷贝到操作系统内核的缓冲区中，然后才会从操作系统内核的缓冲区拷贝到应用程序的地址空间。

- **网络分组**
  **分组的概念是大多数计算机网络都不能连续地传送任意长的数据，所以实际上网络系统把数据分割成小块，然后逐块地发送，这种小块就称作分组（packet）**

## 2.2 IO事件

https://mp.weixin.qq.com/s/Wbp2inTGJmOq9dRkIRqkeQ

IO指的是输入Input/输出Output，但是从汉语角度来说，出和入是相对的，所以我们需要个参照物。

这里我们的参照物选择为程序运行时的主存储空间，外部通常包括网卡、磁盘等。

有了上述的设定理解起来就方便多了，我们来一起看下：

> **IO的本质是数据的流动，数据可以从网卡到程序内存，也可以从程序内存写到网卡，磁盘操作也是如此。**

所以可以把常见的IO分为:

- **网络IO**：内存和网卡的数据交互
- **文件IO**：内存和磁盘的数据交互

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qbwyoXr8TRUUv7s9ntgpAAtIylZmezclvRmibTBZxlddg5dpDT4kNpng2GBjfxuhQgkcicFkfFniablg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

那什么又是IO事件呢？

事件可以理解为一种状态或者动作，也就是状态的迁移会触发一种相应的动作。

网络IO的事件通常包括：

- **可读事件**
- **可写事件**
- **异常事件**

理解可读可写事件是非常有必要的，一般来说一个socket大部分时候是可写的，但是并不是都可读。

可读一般代表是一个新连接或者原有连接有新数据交互，对于服务端程序来说也是重点关注的事件。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qbwyoXr8TRUUv7s9ntgpAAt9G8VicksGicCrSz9Mnvgb4HPA19Nqek66cX1PGPCrjBOPJ37d7ZEhOFg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 2.3 Linux网络数据包的接受过程

### 基础知识

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\NXVD}_~TRQ75PNYYVLVX}E5.png)

网卡收包从整体上是网线中的高低电平转换到网卡FIFO存储再拷贝到系统主内存（DDR3）的过程，其中涉及到网卡控制器，CPU，DMA，驱动程序，在OSI模型中属于物理层和链路层，如下图所示。

![img](https://upload-images.jianshu.io/upload_images/11345047-2f686c67ba9b2fa8.png?imageMogr2/auto-orient/strip|imageView2/2/w/714/format/webp)

接收数据包是一个复杂的过程，涉及很多底层的技术细节，但大致需要以下几个步骤：

1. 网卡收到数据包。
2. 将数据包从网卡硬件缓存转移到服务器内存中。
3. 通知内核处理。
4. 经过TCP/IP协议逐层处理。
5. 应用程序通过read()从socket buffer读取数据。

![img](https://upload-images.jianshu.io/upload_images/11345047-1271870a0a9c3db2.png?imageMogr2/auto-orient/strip|imageView2/2/w/313/format/webp)

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\网络包发送过程.webp)

### 2.3.1 网卡收到数据包

![img](https://upload-images.jianshu.io/upload_images/11345047-91ffc46d5a763990.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

物理网卡收到数据包的处理流程如上图所示，详细步骤如下：

1. 网卡收到数据包，先将高低电平转换到网卡fifo存储，网卡申请ring buffer的描述，根据描述找到具体的物理地址，从fifo队列物理网卡会使用DMA将数据包写到了该物理地址,其实就是skb_buffer中.
2. 这个时候数据包已经被转移到skb_buffer中，因为是DMA写入，内核并没有监控数据包写入情况，这时候NIC触发一个硬中断，每一个硬件中断会对应一个中断号，且指定一个vCPU来处理，如上图vcpu2收到了该硬件中断.
3. 硬件中断的中断处理程序，调用驱动程序完成，并启动软中断
4. 硬中断触发的驱动程序会禁用网卡硬中断，其实这时候意思是告诉NIC，再来数据不用触发硬中断了，把数据DMA拷入系统内存即可
5. 硬中断触发的驱动程序会启动软中断，启用软中断目的是将数据包后续处理流程交给软中断慢慢处理，这个时候退出硬件中断了，但是注意和网络有关的硬中断，要等到后续开启硬中断后，才有机会再次被触发
6. NAPI触发软中断，触发napi系统
7. 消耗ringbuffer指向的skb_buffer
8. NAPI循环处理ringbuffer数据，处理完成
9. 启动网络硬件中断，有数据来时候就可以继续触发硬件中断，继续通知CPU来消耗数据包.

其实上述过程过程简单描述为：网卡收到数据包，DMA到内核内存，中断通知内核数据有了，内核按轮次处理消耗数据包，一轮处理完成后，开启硬中断。其核心就是网卡和内核其实是生产和消费模型，网卡生产，内核负责消费，生产者需要通知消费者消费；如果生产过快会产生丢包，如果消费过慢也会产生问题。也就说在高流量压力情况下，只有生产消费优化后，消费能力够快，此生产消费关系才可以正常维持，所以如果物理接口有丢包计数时候，未必是网卡存在问题，也可能是内核消费的太慢。

### 2.3.2 将网卡收到的数据写入到内核内存

NIC在接收到数据包之后，首先需要将数据同步到内核中，这中间的桥梁是rx ring buffer。它是由NIC和驱动程序共享的一片区域，事实上，rx ring buffer存储的并不是实际的packet数据，而是一个描述符，这个描述符指向了它真正的存储地址，具体流程如下：

1. 驱动在内存中分配一片缓冲区用来接收数据包，叫做sk_buffer;
2. 将上述缓冲区的地址和大小（即接收描述符），加入到rx ring buffer。描述符中的缓冲区地址是DMA使用的物理地址;
3. 驱动通知网卡有一个新的描述符;
4. 网卡从rx ring buffer中取出描述符，从而获知缓冲区的地址和大小;
5. 网卡收到新的数据包;
6. 网卡将新数据包通过DMA直接写到sk_buffer中。

![img](https:////upload-images.jianshu.io/upload_images/11345047-acb677e77c562fb8.png?imageMogr2/auto-orient/strip|imageView2/2/w/951/format/webp)

当驱动处理速度跟不上网卡收包速度时，驱动来不及分配缓冲区，NIC接收到的数据包无法及时写到sk_buffer，就会产生堆积，当NIC内部缓冲区写满后，就会丢弃部分数据，引起丢包。这部分丢包为rx_fifo_errors，在 /proc/net/dev中体现为fifo字段增长，在ifconfig中体现为overruns指标增长。

### 2.3.3 通知系统内核处理（驱动与Linux内核交互）

这个时候，数据包已经被转移到了sk_buffer中。前文提到，这是驱动程序在内存中分配的一片缓冲区，并且是通过DMA写入的，这种方式不依赖CPU直接将数据写到了内存中，意味着对内核来说，其实并不知道已经有新数据到了内存中。那么如何让内核知道有新数据进来了呢？答案就是中断，通过中断告诉内核有新数据进来了，并需要进行后续处理。

提到中断，就涉及到硬中断和软中断，首先需要简单了解一下它们的区别：

硬中断： 由硬件自己生成，具有随机性，硬中断被CPU接收后，触发执行中断处理程序。中断处理程序只会处理关键性的、短时间内可以处理完的工作，剩余耗时较长工作，会放到中断之后，由软中断来完成。硬中断也被称为上半部分。
 软中断： 由硬中断对应的中断处理程序生成，往往是预先在代码里实现好的，不具有随机性。（除此之外，也有应用程序触发的软中断，与本文讨论的网卡收包无关。）也被称为下半部分。

当NIC把数据包通过DMA复制到内核缓冲区sk_buffer后，NIC立即发起一个硬件中断。CPU接收后，首先进入上半部分，网卡中断对应的中断处理程序是网卡驱动程序的一部分，之后由它发起软中断，进入下半部分，开始消费sk_buffer中的数据，交给内核协议栈处理。

![img](https:////upload-images.jianshu.io/upload_images/11345047-e59cc7d328524c4e.png?imageMogr2/auto-orient/strip|imageView2/2/w/593/format/webp)

通过中断，能够快速及时地响应网卡数据请求，但如果数据量大，那么会产生大量中断请求，CPU大部分时间都忙于处理中断，效率很低。为了解决这个问题，现在的内核及驱动都采用一种叫NAPI（new API）的方式进行数据处理，其原理可以简单理解为 中断+轮询，在数据量大时，一次中断后通过轮询接收一定数量包再返回，避免产生多次中断。

### 2.3.4 （2.3.2和2.3.3）合并过程

网卡需要有驱动才能工作，驱动是加载到内核中的模块，负责衔接网卡和内核的网络模块，驱动在加载的时候将自己注册进网络模块，当相应的网卡收到数据包时，网络模块会调用相应的驱动程序处理数据。
 下图展示了数据包（packet）如何进入内存，并被内核的网络模块开始处理：



![img](https:////upload-images.jianshu.io/upload_images/11345047-77203311d820e7dc.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

1. 数据包从外面的网络进入物理网卡。如果目的地址不是该网卡，并且该网卡没有开启混杂模式，该包会被网卡丢弃。
2. 网卡将数据包通过DMA的方式写入到指定的内存地址，该地址由网卡驱动分配。
3. 网卡通过硬件中断（IRQ）告知cpu有数据来了。
4. cpu根据中断表，调用已经注册的中断函数，这个中断函数会调动驱动程序中相应的函数
5. 驱动先禁用网卡的中断，表示驱动程序已经知道内存中有数据了，告诉网卡下次再收到数据包直接写内存就可以了，不要再通知cpu了，这样可以提高效率，避免cpu不停的被中断
6. 启动软中断。这步结束后，硬件中断处理函数就结束返回了，由于硬中断处理程序执行的过程中不能被中断，所以如果它执行时间过长，会导致cpu无法响应其他硬件的中断，于是内核引入软中断，这样可以将硬中断处理函数中耗时的部分移到软中断处理函数里面来慢慢处理。

### 2.3.5 内核的网络模块

软中断会触发内核网络模块中的软中断处理函数，后续流程如下:

<img src="C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\网络协议1.png" style="zoom: 50%;" />

<img src="C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\网络协议2.png" style="zoom:50%;" />

内核中的ksoftirqd进程专门负责软中断的处理，当它收到软中断后，就会调用相应软中断所对应的处理函数，对于上面第六步中网卡驱动模块抛出的软中断，ksoftirqd会调用网络模块的net_rx_action函数

net_rx_action调用网卡驱动里的poll函数来一个一个的处理数据包

在poll函数中，驱动会一个接一个的读取网卡写到内存中的数据包，内存中数据包的格式只有驱动知道

驱动程序将内存中的数据包转换成内核网络模块能识别的skb格式，然后调用napi_gro_receive函数

napi_gro_receive会处理[GRO](https://links.jianshu.com/go?to=https%3A%2F%2Flwn.net%2FArticles%2F358910%2F)相关的内容，也就是将可以合并的数据包进行合并，这样就只需要调用一次协议栈。然后判断是否开启了[RPS](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Ftorvalds%2Flinux%2Fblob%2Fv3.13%2FDocumentation%2Fnetworking%2Fscaling.txt%23L99-L222)，如果开启了，将会调用enqueue_to_backlog

在enqueue_to_backlog函数中，会将数据包放入CPU的softnet_data结构体的input_pkt_queue中，然后返回，如果input_pkt_queue满了的话，该数据包将会被丢弃，queue的大小可以通过[net.core.netdev_max_backlog](https://links.jianshu.com/go?to=http%3A%2F%2Fnet.core.netdev_max_backlog%2F)来配置

CPU会接着在自己的软中断上下文中处理自己input_pkt_queue里的网络数据（调用__netif_receive_skb_core）

**如果没开启[RPS](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Ftorvalds%2Flinux%2Fblob%2Fv3.13%2FDocumentation%2Fnetworking%2Fscaling.txt%23L99-L222)，napi_gro_receive会直接调用__netif_receive_skb_core**

**看是不是有AF_PACKET类型的socket（也就是我们常说的原始套接字），如果有的话，拷贝一份数据给它。tcpdump抓包就是抓的这里的包。**

调用协议栈相应的函数，将数据包交给协议栈处理。

待内存中的所有数据包被处理完成后（即poll函数执行完成），启用网卡的硬中断，这样下次网卡再收到数据的时候就会通知CPU

#### 协议栈

#### IP层

```ruby
          |
          |
          ↓         promiscuous mode &&
      +--------+    PACKET_OTHERHOST (set by driver)   +-----------------+
      | ip_rcv |-------------------------------------->| drop this packet|
      +--------+                                       +-----------------+
          |
          |
          ↓
+---------------------+
| NF_INET_PRE_ROUTING |
+---------------------+
          |
          |
          ↓
      +---------+
      |         | enabled ip forword  +------------+        +----------------+
      | routing |-------------------->| ip_forward |------->| NF_INET_FORWARD |
      |         |                     +------------+        +----------------+
      +---------+                                                   |
          |                                                         |
          | destination IP is local                                 ↓
          ↓                                                 +---------------+
 +------------------+                                       | dst_output_sk |
 | ip_local_deliver |                                       +---------------+
 +------------------+
          |
          |
          ↓
 +------------------+
 | NF_INET_LOCAL_IN |
 +------------------+
          |
          |
          ↓
    +-----------+
    | UDP layer |
    +-----------+
```

- ip_rcv： ip_rcv函数是IP模块的入口函数，在该函数里面，第一件事就是将垃圾数据包（目的mac地址不是当前网卡，但由于网卡设置了混杂模式而被接收进来）直接丢掉，然后调用注册在NF_INET_PRE_ROUTING上的函数
- NF_INET_PRE_ROUTING： netfilter放在协议栈中的钩子，可以通过iptables来注入一些数据包处理函数，用来修改或者丢弃数据包，如果数据包没被丢弃，将继续往下走
- routing： 进行路由，如果是目的IP不是本地IP，且没有开启ip forward功能，那么数据包将被丢弃，如果开启了ip forward功能，那将进入ip_forward函数
- ip_forward： ip_forward会先调用netfilter注册的NF_INET_FORWARD相关函数，如果数据包没有被丢弃，那么将继续往后调用dst_output_sk函数
- 该函数会调用IP层的相应函数将该数据包发送出去
- ip_local_deliver：如果上面routing的时候发现目的IP是本地IP，那么将会调用该函数，在该函数中，会先调用NF_INET_LOCAL_IN相关的钩子程序，如果通过，数据包将会向下发送到UDP层

#### UDP层

```ruby
          |
          |
          ↓
      +---------+            +-----------------------+
      | udp_rcv |----------->| __udp4_lib_lookup_skb |
      +---------+            +-----------------------+
          |
          |
          ↓
 +--------------------+      +-----------+
 | sock_queue_rcv_skb |----->| sk_filter |
 +--------------------+      +-----------+
          |
          |
          ↓
 +------------------+
 | __skb_queue_tail |
 +------------------+
          |
          |
          ↓
  +---------------+
  | sk_data_ready |
  +---------------+
```

- udp_rcv： udp_rcv函数是UDP模块的入口函数，它里面会调用其它的函数，主要是做一些必要的检查，其中一个重要的调用是__udp4_lib_lookup_skb，该函数会根据目的IP和端口找对应的socket，如果没有找到相应的socket，那么该数据包将会被丢弃，否则继续
- **sock_queue_rcv_skb：** 主要干了两件事，一是**检查这个socket的receive buffer是不是满了，如果满了的话，丢弃该数据包**，然后就是调用sk_filter看这个包是否是满足条件的包，**如果当前socket上设置了[filter](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.kernel.org%2Fdoc%2FDocumentation%2Fnetworking%2Ffilter.txt)，且该包不满足条件的话，这个数据包也将被丢弃**（在Linux里面，每个socket上都可以像tcpdump里面一样定义[filter](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.kernel.org%2Fdoc%2FDocumentation%2Fnetworking%2Ffilter.txt)，不满足条件的数据包将会被丢弃）
- __skb_queue_tail： 将数据包放入socket接收队列的末尾
- sk_data_ready： 通知socket数据包已经准备好
   调用完sk_data_ready之后，一个数据包处理完成，等待应用层程序来读取，上面所有函数的执行过程都在软中断的上下文中。

### 2.3.6 socket

#### socket、Tomcat、NIO的关系理解

传输层取出 TCP 头或 UDP 头，根据四元组「源 IP、源端口、目的 IP、目的端口」 作为标识，找出对应的 Socket，并把数据拷贝到 Socket 的接收缓冲区

应用层程序调用 Socket 接口，从**内核**的 Socket 接收缓冲区读取新到来的数据到应用层（内核内存到用户内存）。

以tomcat为例，应用程序需要一个监听线程监听端口，来判断是否有请求到达，注册多个socket,**同时监听多个IO请求**，进而调用socket编程读取数据

<img src="C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\Tomcat NIO .webp" style="zoom:50%;" />

socket是在应用层和传输层中间的抽象层，它把传输层（TCP/UDP）的复杂操作抽象成一些简单的接口，供应用层调用实现进程在网络中的通信。Socket起源于UNIX，在Unix一切皆文件的思想下，进程间通信就被冠名为文件描述符（file desciptor），Socket是一种“打开—读/写—关闭”模式的实现，服务器和客户端各自维护一个“文件”，在建立连接打开后，可以向文件写入内容供对方读取或者读取对方内容，通讯结束时关闭文件。

<img src="C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\网络架构1.png" style="zoom:50%;" />



#### **Socket通信过程**

TCP通信时序图

![img](https://pic3.zhimg.com/80/v2-d33375bcba84d804d8e0c4c27ea813ba_1440w.jpg)

核心过程：

（1）成功建立连接。

（2）内核等待网卡数据到位。（这里涉及DMA技术）(这一步控制IO是否阻塞)

（2）内核缓冲区数据拷贝到用户空间（这里涉及mmap内存映射技术）。（这一步控制IO是否同步）

大致解释下DMA和mmap：网卡和磁盘数据拷贝到内存这个过程，如果需要CPU参与的话会占用大量的CPU运行时间，因为IO操作相对耗时非常高。而且CPU主要适用于进行运算，磁盘数据拷贝到内存这个过程并不涉及到运算操作而且流程固定，因此设计了DMA来专门进行上述拷贝操作，相当于在磁盘嵌入了一个DMA芯片（类似简易版的IO cpu）让它来专门负责上述拷贝操作，从而使得CPU不参与上述拷贝操作，使之专注于运算操作。

mmap的设计理念是：用户空间和内核空间映射同一块内存空间，从而达到省略将数据从内核缓冲区拷贝到用户空间的操作，用户空间通过映射直接操作内核缓冲区的数据。

**cpu如何知道接收了网络数据？**

当网卡把数据写入到内存后，网卡向 CPU 发出一个中断信号，操作系统便能得知有新数据到来，再通过网卡中断程序去处理数据

**进程阻塞为什么不占用 CPU 资源?**

阻塞是进程调度的关键一环，指的是进程在等待某个事件发生前的等待状态，recv，select，epoll都是阻塞方法。

```c
//创建socket 
int s = socket(AF_INET, SOCK_STREAM, 0);    
//绑定 
bind(s, ...) 
//监听 
listen(s, ...) 
//接受客户端连接 
int c = accept(s, ...) 
//接收客户端数据 
recv(c, ...); 
//将数据打印出来 
printf(...)
```

这是一段基础的网络编程代码，先创建socket对象，依次绑定ip，端口和接受连接。当执行recv()时，进程会被阻塞，直到接收到数据才往下走。

工作队列和等待队列

进程A执行recv()前：

![img](https://pic2.zhimg.com/80/v2-bbf6f1f55102c60dca23c695068c4455_1440w.jpg)



进程A执行recv()后：

![img](https://pic1.zhimg.com/80/v2-f0c0fd808867830487ae1b3b6a3d1974_1440w.jpg)



cpu会不断地切换调度工作队列里的进程，进程A调用recv()方法后，会从工作队列移除到等待队列，之后CPU只会调度进程B和进程C，因此进程A不再占用CPU资源。

**内核接收数据全过程**：

如上图所示，进程在 Recv 阻塞期间：

- 计算机收到了对端传送的数据(步骤 ①)
- 数据经由网卡传送到内存(步骤 ②)
- 然后网卡通过中断信号通知 CPU 有数据到达，CPU 执行中断程序(步骤 ③)

此处的中断程序主要有两项功能，先将网络数据写入到对应 Socket 的接收缓冲区里面(步骤 ④)，再唤醒进程 A(步骤 ⑤)，重新将进程 A 放入工作队列中。

**唤醒进程的过程如下图所示：**

![img](https://pic3.zhimg.com/80/v2-20fdaf5ed0f6270b22366ffcfd2c25b6_1440w.jpg)



通过上述流程的分析，我们能引申出来两个问题：

（1）如何知道接收的网络数据时属于哪个socket？

（2）如何同时监控多个socket?

socket数据包格式（源ip，源端口，协议，目的ip，目的端口），一般通过这几个信息就可以识别出来接收到的网络数据属于哪个socket。

通过上述流程的分析，我们能引申出来两个问题：

（1）如何知道接收的网络数据时属于哪个socket？

（2）如何同时监控多个socket?

socket数据包格式（源ip，源端口，协议，目的ip，目的端口），一般通过这几个信息就可以识别出来接收到的网络数据属于哪个socket。

有一种情况引发了我的思考：某个进程只启动了一个socket服务端，该服务端只监听了8080端口，有多个客户端连接这一个服务端时，内核这里是否会对应多个socket？各个socket的目的端口是否都为8080？

其实这也是我们最常见的NIO网络编程方式，多线程socket编程。**其实多个客户端与同一个服务端建立了连接，这个时候内核就会有多个socket，并且为它们分配多个fd文件描述符**。它们收到网络数据后无法通过目的端口来直接匹配socket，还需要再通过源ip和端口来确定属于哪个socket。

**如何同时监控多个socket就是select/poll/epoll核心想解决的问题**

#### 客户端、服务端过程

socket对于linux为一个文件描述符，对于windows系统为一个句柄。要建立两个不同主机间进行网络通信，就必须有一个为服务端，一个为客户端。

一、服务端流程

服务端启动先调用socket()内核接口创建一个文件描述符即ServerSocket,**这个socket数据结构里没有远程客户端的地址与端口**，（1）、调用bind接口这个socket是用来绑定本机地址与端口的 。（2）、然后调用listen接口，告诉内核在我这个ServerSocket上，监听是否有客户端的链接进来，内核就会建立两个队列，一个SYN队列，表示接受到请求，但未完成三次握手的连接，另一个是ACCEPT队列，表示已经完成了三次握手的队列，内核监听到有链接进来就根据情况放到这两个队列中。（3）调用accept()接口，这个接口会阻塞调用的线程（如何设置获取阻塞套接字即阻塞IO），直到内核的accept队列有值，然后内核返回新的socket，给我们调用的这个serverSocket, **这个返回的newSocket会在自己的数据接口里保存自己这个进程的地址与端口号还会保存远程客户端的进程与端口号**。通过这个newsocket就可以与远程的客户端进行信息交互。

二、客户端流程

客户端的主机进程调用socket()内核接口创建一个描述符，（1）、调用connect()函数与服务端的进程建立链接。则客户端的socket数据结构里就会保存远程服务端的地址与端口，就可以进行消息的交互了。

以下图片为TCP客户端与服务端建立的流程，来源与其他博客：
![图1](https://img-blog.csdnimg.cn/20190616150024205.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjcwNDc2,size_16,color_FFFFFF,t_70)
UDP客户端与服务端建立的流程，图片来源其他博客：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019061615220415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzNjcwNDc2,size_16,color_FFFFFF,t_70)

## 2.4 tomcat 接受请求的底层原理

有一个线程监听端口（8080）连接过来的多个socket，然后判断哪个socket的数据准备好了，读取到进程（工作内存）

### tomcat的底层NIO实现

### 参考博客

https://www.jianshu.com/p/76ff17bc6dea

https://blog.csdn.net/peelarmy/article/details/109316382

# 2. IO模型

参考《网络 IO 演变发展过程和模型介绍》文档

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\网络IO.jpg)

## 2.1 同步/异步

**同步与异步关注的是消息通信机制**

同步，就是由“调用者”主动等待这个“调用”的结果

异步，“调用”在发出之后，这个调用就直接返回了，所以没有返回结果。换句话说，当一个异步过程调用发出后，调用者不会立即得到结果。而是在“发出后”，“被调用者“通过状态，来通知调用者，或通过**回调函数**处理这个调用。

 **阻塞、非阻塞、多路IO复用，都是同步IO，异步必定是非阻塞的**

## 2.2 阻塞/非阻塞

阻塞和非阻塞关注的是**程序在等待调用结果（消息，返回值）时的状态.**

阻塞调用是指调用结果返回之前，当前线程会被挂起。调用线程只有在得到结果之后才会返回。
非阻塞调用指在不能立刻得到结果之前，该调用不会阻塞当前线程。

**举例**

去银行排队办理业务，排队就是同步，去叫号器取号然后坐在等待区就是异步，排队期间一直等待前面人办理业务就是阻塞同步，排队期间打游戏，聊天就是非阻塞同步，当然异步一定会坐在休息区看手机，喝茶所以是非阻塞的

## 2.3 五种IO模型

- IO过程主要分两个阶段：

  1.数据准备阶段（硬件到内核空间）

  2.内核空间复制回用户进程缓冲区空间

  无论阻塞式IO还是非阻塞式IO，都是同步IO模型，区别就在与第一步是否完成后才返回，但第二步都需要当前进程去完成，异步IO呢，就是从第一步开始就返回，直到第二步完成后才会返回一个消息，也就是说，非阻塞能够让你在第一步时去做其它的事情，而真正的异步IO能让你第二步的过程也能去做其它事情。这里就在说一下select,poll和epoll这几个IO复用方式，这时你就会了解它们为什么是同步IO了，以epoll为例，在epoll开发的服务器模型中，epoll_wait()这个函数会阻塞等待就绪的fd，将就绪的fd拷贝到epoll_events集合这个过程中也不能做其它事（虽然这段时间很短，所以epoll配合非阻塞IO是很高效也是很普遍的服务器开发模式--同步非阻塞IO模型）。有人把epoll这种方式叫做同步非阻塞（NIO），因为用户线程需要不停地轮询，自己读取数据，看上去好像只有一个线程在做事情，也有人把这种方式叫做异步非阻塞（AIO），因为毕竟是内核线程负责扫描fd列表，并填充事件链表的，个人认为真正理想的异步非阻塞，应该是内核线程填充事件链表后，主动通知用户线程，或者调用应用程序事先注册的回调函数来处理数据，如果还需要用户线程不停的轮询来获取事件信息，就不是太完美了，所以也有不少人认为epoll是伪AIO，还是有道理的。

- 

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\同步异步.png)

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\IO复用.webp)

阻塞式I/O、非阻塞式I/O、I/O复用、信号驱动式I/O他们的第二阶段都相同，也就是都会阻塞到recvfrom调用上面就是图中“发起”的动作。异步式I/O两个阶段都要处理。

### 2.3.1 阻塞I/O模型

当用户线程发出IO请求之后，内核会去查看数据是否就绪，如果没有就绪就会等待数据就绪，而用户线程就会处于阻塞状态，用户线程交出CPU。当数据就绪之后，内核会将数据拷贝到用户线程，并返回结果给用户线程，用户线程才解除block状态。 

典型的阻塞IO模型的例子为：

```java
data = socket.read();
```

如果数据没有就绪，就会一直阻塞在read方法。

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\同步阻塞.png)

read请求也就是recv系统调用

### 2.3.2 非阻塞I/O模型

当用户线程发起一个read操作后，并不需要等待，而是马上就得到了一个结果。如果结果是一个error时，它就知道数据还没有准备好，于是它可以再次发送read操作。一旦内核中的数据准备好了，并且又再次收到了用户线程的请求，那么它马上就将数据拷贝到了用户线程，然后返回。

所以事实上，在非阻塞IO模型中，用户线程需要不断地询问内核数据是否就绪，也就说非阻塞IO不会交出CPU，而会一直占用CPU。

典型的非阻塞IO模型一般如下：

```java
while(true){
   data = socket.read();
   if(data!= error){
       处理数据
       break;
   }
}
```

但是对于非阻塞IO就有一个非常严重的问题，在while循环中需要不断地去询问内核数据是否就绪，这样会导致CPU占用率非常高，因此一般情况下很少使用while循环这种方式来读取数据。

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\非阻塞IO.png)

### 2.3.3 I/O多路复用模型

https://www.bilibili.com/video/BV1qJ411w7du?from=search&seid=8320787834210585061

I/O多路复用（multiplexing）的本质是通过一种机制（系统内核缓冲I/O数据），让单个进程可以监视多个文件描述符，一旦某个描述符就绪（一般是读就绪或写就绪），能够通知程序进行相应的读写操作. 

我们熟悉的 select/poll/epoll 就是内核提供给用户态的多路复用系统调用，**进程可以通过一个系统调用函数从内核中获取多个I/O事件**，进而进行I/O复用。

#### 2.3.3.1 什么是IO复用

设想假如有几万个IO事件，那么应用程序该如何管理呢？这就要提到IO复用了。

**IO复用从本质上来说就是应用程序借助于IO复用函数向内核注册很多类型的IO事件，当这些注册的IO事件发生变化时内核就通过IO复用函数来通知应用程序。**

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qbwyoXr8TRUUv7s9ntgpAAtqp64Yosn4269SP0ah2UDEfbAk2RyBvibQgExS3HicwFXpA3X3onrCRNQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

从图中可以看到，IO复用中复用的就是一个负责监听管理这些IO事件的线程。

之所以可以实现一个线程管理成百上千个IO事件，是因为大部分时间里某个时刻只有少量IO事件被触发。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qbwyoXr8TRUUv7s9ntgpAAtp0hkiaoSiadGgYGuic5Fovvic1UjmibAQowib01cRaDKtkDEJVwusKEKEySQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

大概就像这样：**草原上的一只大狗可以看管几十只绵羊，因为大部分时候只有个别绵羊不守规矩乱跑，其他的都是乖乖吃草**。

#### 2.3.3.2 多路复用是同步IO

参考select的运行机制

https://www.bilibili.com/video/BV1qJ411w7du?from=search&seid=8320787834210585061

select，poll，epoll都是IO多路复用的机制。I/O多路复用就通过一种机制，可以监视多个描述符，一旦某个描述符就绪（一般是读就绪或者写就绪），能够通知程序进行相应的读写操作。但select，poll，epoll本质上都是同步I/O，因为他们都需要在读写事件就绪后自己负责进行读写，也就是说这个读写过程是阻塞的（需要select调用返回结果，进程重新被调起），仍然需要read、write去读写数据， 只是因为， mmap实现的零拷贝， 而导致的调用深度不同。 当一个异步过程调用发出后，调用者不能立刻得到结果。实际处理这个调用的部件在完成后，通过状态、通知和回调来通知调用者。而异步I/O则无需自己负责进行读写，异步I/O的实现会负责把数据从内核拷贝到用户空间

#### 2.3.3.3 进一步理解

多路复用IO模型是目前使用得比较多的模型。Java NIO实际上就是多路复用IO。

在多路复用IO模型中，会有一个线程不断去轮询多个socket的状态，只有当socket真正有读写事件时，才真正调用实际的IO读写操作。因为在多路复用IO模型中，只需要使用一个线程就可以管理多个socket，系统不需要建立新的进程或者线程，也不必维护这些线程和进程，并且只有在真正有socket读写事件进行时，才会使用IO资源，所以它大大减少了资源占用。

在Java NIO中，是通过selector.select()去查询每个通道是否有到达事件，如果没有事件，则一直阻塞在那里，因此这种方式会导致用户线程的阻塞。

也许有朋友会说，我可以采用多线程+ 阻塞IO 达到类似的效果，但是由于在多线程 + 阻塞IO 中，每个socket对应一个线程，这样会造成很大的资源占用，并且尤其是对于长连接来说，线程的资源一直不会释放，如果后面陆续有很多连接的话，就会造成性能上的瓶颈。

而多路复用IO模式，通过一个线程就可以管理多个socket，只有当socket真正有读写事件发生才会占用资源来进行实际的读写操作。因此，多路复用IO比较适合连接数比较多的情况。

**另外多路复用IO为何比非阻塞IO模型的效率高是因为在非阻塞IO中，不断地询问socket状态时通过用户线程去进行的，而在多路复用IO中，轮询每个socket状态是内核在进行的，这个效率要比用户线程要高的多。**

 不过要注意的是，多路复用IO模型是通过轮询的方式来检测是否有事件到达，并且对到达的事件逐一进行响应。因此对于多路复用IO模型来说，一旦事件响应体很大，那么就会导致后续的事件迟迟得不到处理，并且会影响新的事件轮询。

 

![img](http://9562908.s21i-9.faiusr.com/4/ABUIABAEGAAg_sKrwAUojMPt1gIwgAU4mgM.png)

#### 2.3.3.4 它的形成原因

如果一个I/O流进来，我们就开启一个进程处理这个I/O流。那么假设现在有一百万个I/O流进来，那我们就需要开启一百万个进程一一对应处理这些I/O流（——这就是传统意义下的**多进程并发处理**）。思考一下，一百万个进程，你的CPU占有率会多高，这个实现方式及其的不合理。所以人们提出了I/O多路复用这个模型，**一个线程，通过记录I/O流的状态来同时管理多个I/O，可以提高服务器的吞吐能力**

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\11319096-1c5d700819116c61.webp)

#### 2.3.3.5 实现方式

我们熟悉的 select/poll/epoll 内核提供给用户态的多路复用系统调用，**进程可以通过一个系统调用函数从内核中获取多个事件**。

##### 2.3.3.5.1 Select

######  实现原理

1. select

   IO多路复用模型是建立在内核提供的多路分离函数select基础之上的，使用select函数可以避免同步非阻塞IO模型中轮询等待的问题

   ![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\11319096-c3fd7c0bf3904dfa.webp)

   我们来分析一下上面这张图

   1. 当进程调用select，进程就会被阻塞
   2. 此时内核会监视所有select负责的的socket，当socket的数据准备好后，就立即返回。（阻塞）
   3. 进程再调用read操作，数据就会从内核拷贝到进程。（同步）

2. recvfrom

   recvfrom一般用于UDP协议中,但是如果在TCP中connect函数调用后也可以用。用于从（已连接）套接口上接收数据，并捕获数据发送源的地址。也就是我们本文中以及书中说的真正的I/O操作。

###### select运行机制

select()的机制中提供一种`fd_set`的数据结构，实际上是一个long类型的数组，每一个数组元素都能与一打开的文件句柄（不管是Socket句柄,还是其他文件或命名管道或设备句柄）建立联系，建立联系的工作由程序员完成，当调用select()时，由内核根据IO状态修改fd_set的内容，由此来通知执行了select()的进程哪一Socket或文件可读。

从流程上来看，使用select函数进行IO请求和同步阻塞模型没有太大的区别，甚至还多了添加监视socket，以及调用select函数的额外操作，效率更差。但是，使用select以后最大的优势是用户可以在一个线程内同时处理多个socket的IO请求。用户可以注册多个socket，然后不断地调用select读取被激活的socket，即可达到在同一个线程内同时处理多个IO请求的目的。而在同步阻塞模型中，必须通过多线程的方式才能达到这个目的。

###### select机制的问题

1. 每次调用select，都需要把`fd_set`集合从用户态拷贝到内核态，如果`fd_set`集合很大时，那这个开销也很大
2. 同时每次调用select都需要在内核遍历传递进来的所有`fd_set`，如果`fd_set`集合很大时，那这个开销也很大
3. 为了减少数据拷贝带来的性能损坏，内核对被监控的`fd_set`集合大小做了限制，并且这个是通过宏控制的，大小不可改变(限制为1024)

##### 2.3.3.5.2 Poll

poll的机制与select类似，与select在本质上没有多大差别，管理多个描述符也是进行轮询，根据描述符的状态进行处理，但是poll没有最大文件描述符数量的限制。也就是说，poll只解决了上面的问题3，并没有解决问题1，2的性能开销问题。

下面是poll的函数原型：

```cpp
int poll(struct pollfd *fds, nfds_t nfds, int timeout);

typedef struct pollfd {
        int fd;                         // 需要被检测或选择的文件描述符
        short events;                   // 对文件描述符fd上感兴趣的事件
        short revents;                  // 文件描述符fd上当前实际发生的事件
} pollfd_t;
```

poll改变了文件描述符集合的描述方式，使用了`pollfd`结构而不是select的`fd_set`结构，使得poll支持的文件描述符集合限制远大于select的1024

**【参数说明】**

**struct pollfd \*fds** `fds`是一个`struct pollfd`类型的数组，用于存放需要检测其状态的socket描述符，并且调用poll函数之后`fds`数组不会被清空；一个`pollfd`结构体表示一个被监视的文件描述符，通过传递`fds`指示 poll() 监视多个文件描述符。其中，结构体的`events`域是监视该文件描述符的事件掩码，由用户来设置这个域，结构体的`revents`域是文件描述符的操作结果事件掩码，内核在调用返回时设置这个域

**nfds_t nfds** 记录数组`fds`中描述符的总数量

**【返回值】**
 **int** 函数返回fds集合中就绪的读、写，或出错的描述符数量，返回0表示超时，返回-1表示出错；

##### 2.3.3.5.3 Epoll

###### Epoll原理解析

https://blog.csdn.net/armlinuxww/article/details/92803381

epoll在Linux2.6内核正式提出，是基于事件驱动的I/O方式，相对于select来说，epoll没有描述符个数限制，使用一个文件描述符管理多个描述符，将用户关心的文件描述符的事件存放到内核的一个事件表中，这样在用户空间和内核空间的copy只需一次。

Linux中提供的epoll相关函数如下：

```csharp
int epoll_create(int size);
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);
int epoll_wait(int epfd, struct epoll_event * events, int maxevents, int timeout);
```

**1. epoll_create** 函数创建一个epoll句柄，参数`size`表明内核要监听的描述符数量。调用成功时返回一个epoll句柄描述符，失败时返回-1。

**2. epoll_ctl** 函数注册要监听的事件类型。四个参数解释如下：

- `epfd` 表示epoll句柄

- ```
  op
  ```

   表示fd操作类型，有如下3种

  - EPOLL_CTL_ADD   注册新的fd到epfd中
  - EPOLL_CTL_MOD 修改已注册的fd的监听事件
  - EPOLL_CTL_DEL 从epfd中删除一个fd

- `fd` 是要监听的描述符

- `event` 表示要监听的事件

epoll_event 结构体定义如下：

```cpp
struct epoll_event {
    __uint32_t events;  /* Epoll events */
    epoll_data_t data;  /* User data variable */
};

typedef union epoll_data {
    void *ptr;
    int fd;
    __uint32_t u32;
    __uint64_t u64;
} epoll_data_t;
```

**3. epoll_wait** 函数等待事件的就绪，成功时返回就绪的事件数目，调用失败时返回 -1，等待超时返回 0。

- `epfd` 是epoll句柄
- `events` 表示从内核得到的就绪事件集合
- `maxevents` 告诉内核events的大小
- `timeout` 表示等待的超时事件

epoll是Linux内核为处理大批量文件描述符而作了改进的poll，是Linux下多路复用IO接口select/poll的增强版本，它能显著提高程序在大量并发连接中只有少量活跃的情况下的系统CPU利用率。原因就是获取事件的时候，它无须遍历整个被侦听的描述符集，只要遍历那些被内核IO事件异步唤醒而加入Ready队列的描述符集合就行了。

epoll除了提供select/poll那种IO事件的水平触发（Level Triggered）外，还提供了边缘触发（Edge Triggered），这就使得用户空间程序有可能缓存IO状态，减少epoll_wait/epoll_pwait的调用，提高应用程序效率。

- **水平触发（LT）：**默认工作模式，即当epoll_wait检测到某描述符事件就绪并通知应用程序时，应用程序可以不立即处理该事件；下次调用epoll_wait时，会再次通知此事件
- **边缘触发（ET）：** 当epoll_wait检测到某描述符事件就绪并通知应用程序时，应用程序必须立即处理该事件。如果不处理，下次调用epoll_wait时，不会再次通知此事件。（直到你做了某些操作导致该描述符变成未就绪状态了，也就是说边缘触发只在状态由未就绪变为就绪时只通知一次）。

LT和ET原本应该是用于脉冲信号的，可能用它来解释更加形象。Level和Edge指的就是触发点，Level为只要处于水平，那么就一直触发，而Edge则为上升沿和下降沿的时候触发。比如：0->1 就是Edge，1->1 就是Level。

ET模式很大程度上减少了epoll事件的触发次数，因此效率比LT模式下高。

#### 2.3.3.6 总结

一张图总结一下select,poll,epoll的区别：

|            |                       select                       |                       poll                       |                            epoll                             |
| :--------- | :------------------------------------------------: | :----------------------------------------------: | :----------------------------------------------------------: |
| 操作方式   |                        遍历                        |                       遍历                       |                             回调                             |
| 底层实现   |                        数组                        |                       链表                       |                            红黑树                            |
| IO效率     |      每次调用都进行线性遍历，时间复杂度为O(n)      |     每次调用都进行线性遍历，时间复杂度为O(n)     | 事件通知方式，每当fd就绪，系统注册的回调函数就会被调用，将就绪fd放到readyList里面，时间复杂度O(1) |
| 最大连接数 |              1024（x86）或2048（x64）              |                      无上限                      |                            无上限                            |
| fd拷贝     | 每次调用select，都需要把fd集合从用户态拷贝到内核态 | 每次调用poll，都需要把fd集合从用户态拷贝到内核态 |  调用epoll_ctl时拷贝进内核并保存，之后每次epoll_wait不拷贝   |

epoll是Linux目前大规模网络并发程序开发的首选模型。在绝大多数情况下性能远超select和poll。目前流行的高性能web服务器Nginx正式依赖于epoll提供的高效网络套接字轮询服务。但是，在并发连接不高的情况下，多线程+阻塞I/O方式可能性能更好。

#### 2.3.3.7 问题

1.阻塞式I/O和I/O复用，两个阶段都阻塞，那区别在哪里呢？

- 类似于java NIO第三组件Selector，虽然第一阶段都是阻塞，但是阻塞式I/O如果要接收更多的连接，就必须创建更多的线程。I/O复用模式下在第一个阶段大量的连接统统都可以过来直接注册到Selector复用器上面，同时只要单个或者少量的线程来循环处理这些连接事件就可以了，一旦达到“就绪”的条件，就可以立即执行真正的I/O操作。这就是I/O复用与传统的阻塞式I/O最大的不同。也正是I/O复用的精髓所在。
- 多路复用IO为何比非阻塞IO模型的效率高是因为在非阻塞IO中，不断地询问socket状态时通过用户线程去进行的，而在多路复用IO中，轮询每个socket状态是内核在进行的，这个效率要比用户线程要高的多。

2.为什么IO多路复用第一阶段是阻塞的？

因为多路复用IO中，轮询每个socket状态是内核在进行的，是系统调用。计算机进行系统调用需要中断原语。因此用户线程是阻塞的。但是用户线程通过系统调用检测到没有数据准备好可以返回，因此对于用户线程来说是非阻塞的。（存疑：IO多路复用到底是阻塞的还是非阻塞的？）

使用 I/O 多路复用时，最好搭配非阻塞 I/O 一起使用，Linux 手册关于 select 的内容中有如下说明：

> Under Linux, select() may report a socket file descriptor as "ready for reading", while nevertheless a subsequent read blocks. This could for example happen when data has arrived but upon examination has wrong checksum and is discarded. There may be other circumstances in which a file descriptor is spuriously reported as ready. Thus it may be safer to use O_NONBLOCK on sockets that should not block.

我谷歌翻译的结果：

> 在Linux下，select() 可能会将一个 socket 文件描述符报告为 "准备读取"，而后续的读取块却没有。例如，当数据已经到达，但经检查后发现有错误的校验而被丢弃时，就会发生这种情况。也有可能在其他情况下，文件描述符被错误地报告为就绪。因此，在不应该阻塞的 socket 上使用 O_NONBLOCK 可能更安全。

简单点理解，就是**多路复用 API 返回的事件并不一定可读写的**，如果使用阻塞 I/O， 那么在调用 read/write 时则会发生程序阻塞，因此最好搭配非阻塞 I/O，以便应对极少数的特殊情况。

### 2.3.4 信号驱动I/O模型

在信号驱动IO模型中，当用户线程发起一个IO请求操作，会给对应的socket注册一个信号函数，然后用户线程会继续执行，当内核数据就绪时会发送一个信号给用户线程，用户线程接收到信号之后，便在信号函数中调用IO读写操作来进行实际的IO请求操作。这个一般用于UDP中，对TCP套接口几乎是没用的，原因是该信号产生得过于频繁，并且该信号的出现并没有告诉我们发生了什么事情

### 2.3.5 异步I/O模型

异步IO模型才是最理想的IO模型，在异步IO模型中，当用户线程发起read操作之后，立刻就可以开始去做其它的事。而另一方面，从内核的角度，当它受到一个asynchronous read之后，它会立刻返回，说明read请求已经成功发起了，因此不会对用户线程产生任何block。然后，内核会等待数据准备完成，然后将数据拷贝到用户线程，当这一切都完成之后，内核会给用户线程发送一个信号，告诉它read操作完成了。也就说用户线程完全不需要关心实际的整个IO操作是如何进行的，只需要先发起一个请求，当接收内核返回的成功信号时表示IO操作已经完成，可以直接去使用数据了。

也就说在异步IO模型中，IO操作的两个阶段都不会阻塞用户线程，这两个阶段都是由内核自动完成，然后发送一个信号告知用户线程操作已完成。用户线程中不需要再次调用IO函数进行具体的读写。这点是和信号驱动模型有所不同的，在信号驱动模型中，当用户线程接收到信号表示数据已经就绪，然后需要用户线程调用IO函数进行实际的读写操作；而在异步IO模型中，收到信号表示IO操作已经完成，不需要再在用户线程中调用iO函数进行实际的读写操作。

异步IO是需要操作系统的底层支持，在Java 7中，提供了Asynchronous IO。简称AIO

### 2.3.6 网络 IO 各种模型

#### 承上启下

   在获取事件时，先把所有连接（文件描述符）传给内核，再由内核返回产生了事件的连接，然后在用户态中再处理这些连接对应的请求即可。以上的select、poll、epoll为查看文件描述符可读可写事件返回给用户线程，以下的IO模型为用户线程处理连接对应的请求。

#### 2.3.6.1 reactor 模型

目前 reactor 模型有以下几种实现方案：

**1. 单 reactor 单线程模型**
**2. 单 reactor 多线程模型**
**3. multi-reactor 多线程模型**
**4. multi-reactor 多进程模型**

https://zhuanlan.zhihu.com/p/95662364

##### 2.3.6.1.1 **基于事件驱动的Reactor模式详解**

**反应堆模式是一种思想，形式却有很多种。**

Reactor模式(反应器模式)**事件驱动结构的一种实现**。是一种处理一个或多个客户端并发进行服务请求的。将服务端接收请求与事件处理分离，从而提高系统处理并发的能力，**Java的NIO的reactor模式是基于系统内核的多路复用技术实现的**

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\142333254136604.png)

##### 2.3.6.1.2 反应堆模式的本质是什么

从本质上理解，无论什么网络框架都要完成两部分操作：

- **IO操作**：数据包的读取和写入(上面的五种IO模型)
- **CPU操作**：数据请求的处理和封装

所以上述这些问题**由谁来做以及多少线程来做，就衍生出了很多形式**，所以不要被表面现象迷惑，出现必有原因，追溯之后我们才能真正掌握它。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBKQL8fCqgpNdTa82zsEneAQQicsUaVBo8Th2yT6rNm6BLicKTDK2hxNPA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

反应堆模式根据处理IO环节和处理数据环节的数量差异分为如下几种：

- **单Reactor线程**
- **单Reactor线程和线程池**
- **多Reactor线程和线程池**

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBv5pia9O2uaGibwicUkWvY6MeLvicAvFZsd5AJa7DsA5gBzibAfSicuo66Gbw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们来看看这三种常见模式的特点、原理、优缺点、应用场景等。

##### 2.3.6.1.3 单Reactor线程模式

这种模式最为简洁，一个线程完成了连接的监听、接收新连接、处理连接、读取数据、写入数据全套工作。

由于只使用了一个线程，对于多核利用率偏低，但是编程简单。

是不是觉得这个种单线程的模式没有市场？那可未必，不信你看Redis。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBdqgEIIK3ejicW3pwoWYpqfWrSLkZMYLNbP1JO2rvfKYFGHNRHT6vepQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在这种模式种IO操作和CPU操作是没有分开的，都是由1个线程来完成的，显然如果在Handler处理某个请求超时了将会阻塞客户端的正常连接。

在Redis中由于都是内存操作，速度很快，这种瓶颈虽然存在但是不够明显。

##### 2.3.6.1.4 单Reactor线程和线程池模式

为了解决IO操作和CPU操作的不匹配，也就是IO操作和CPU操作是在一个线程内部串行执行的，这样就拉低了CPU操作效率。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBBfShPMXxL88S6q8x6rQuibp3mwGX8UA1jKibg2G1tbM33q36AR956hYw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

一种解决方法就是将IO操作和CPU操作分别由单独的线程来完成，各玩各的互不影响。

单Reactor线程完成IO操作、复用工作线程池来完成CPU操作就是一种解决思路。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZB4Vf2ZI0D1ZQNlbhAQXxoic2rBVCsqNsNtAf2dL9yUBX10Vo6ZVlLUiaQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在这种模式种由Reactor线程完成连接的管理和数据读取&写回，完全掌管IO操作。

工作线程池处理来自上游分发的任务，对其中的数据进行解码、计算、编码再返回给Reactor线程和客户端完成交互。

这种模式有效利用了多核，但是单Reactor线程来完成IO操作在高并发场景中仍然会出现瓶颈。

换句话说，连接实在太多了，一个Reactor线程忙不过来建立新连接和响应旧连接这些事情，因此Reactor线程也需要几个帮手。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBEcW98qMybTPgFhUibXFHQH1iapDMO70OUhhp7kTp6zxgia3ial84aDSygw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

##### 2.3.6.1.5 多Reactor线程和线程池模式

水平扩展往往是提供性能的有效方法。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZB8nR11lW7INGr7sP1DGvHZJeqdibpxGTmFF221841cF71GF4Z29cOzFA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们将Reactor线程进行扩展，一个Reactor线程负责处理新连接，多个Reactor线程负责处理连接成功的IO数据读写。

也就是进一步将监听&创建连接 和 处理连接 分别由两个及以上的线程来完成，进一步提高了IO操作部分的效率。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBJWcDxx7ibmFIgKt48nH2PgXft9yXA4ldWPblpH2B9QBmUiaNADTCyuibQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这种模式算是比较高配的版本了，在实际生产环境也有使用。

##### 2.3.6.1.6 拓展：同步IO和异步IO

我们可以轻易区分什么是阻塞IO和非阻塞IO，那么什么是同步IO和异步IO呢？

前面提到Reactor模式其中非常重要的一环就是调用read/write函数来完成数据拷贝，这部分是应用程序自己完成的，内核只负责通知监控的事件到来了，所以本质上Reactor模式属于非阻塞同步IO。

还有一种Preactor模式，借助于系统本身的异步IO特性，由操作系统进行数据拷贝，在完成之后来通知应用程序来取就可以，效率更高一些，但是底层需要借助于内核的异步IO机制来实现。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBDFPAdBmEdELWlDg9PvSRxPI0lDPbXc4gS3SW5TwGS77KFZBM42QqUA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

底层的异步IO机制可能借助于DMA和Zero-Copy技术来实现，理论上性能更高。

当前Windows系统通过IOCP实现了真正的异步I/O，而在Linux 系统的异步I/O还不完善，比如Linux中的boost.asio模块就是异步IO的支持，但是目前Linux系统还是以基于Reactor模式的非阻塞同步IO为主。

#### 2.3.6.2 proactor 模型

proactor 主要是通过对异步 IO 的封装的一种模型，它需要底层操作系统的支持，目前只有 windows 的 IOCP 支持的比较好。详细的介绍可以参考[这篇文章](https://zhuanlan.zhihu.com/p/95662364)

#### 2.3.6.3 主流的中间件所采用的网络模型

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\主流的中间件所采用的网络模型.webp)

#### 2.3.6.4 主流网络框架

- netty
- gnet
- libevent
- evio(golang)
- ACE(c++)
- boost::asio(c++)
- mudou （linux only)

关于c++和c的上述几个库对比，感兴趣的话大家可以自行搜索资料或者阅读[这篇文章](https://www.cnblogs.com/leijiangtao/p/5197566.html)。

# 3. Java NIO

## 3.1 概念

上文讲述了UNIX环境的五种IO模型。**Java NIO中的选择器依赖操作系统内核的poll及epoll的系统调用**。

基于这五种模型，在Java中，随着NIO和NIO2.0(AIO)的引入，一般具有以下几种网络编程模型：

- BIO
- NIO
- AIO

Java NIO（New IO），No Blocking IO **非阻塞IO**，是从Java1.4版本开始引入的一个新的IO API，可以替代标准的Java IO API。NIO与原来的IO有同样的作用和目的，但是使用的方式完全不同，NIO支持面向缓冲区的，基于通道的IO操作。NIO将以更加高效的方式进行文件读写操作

**java NIO的reactor模式是基于系统内核的多路复用技术实现的**

## 3.2 阻塞／非阻塞

阻塞和非阻塞关注的是程序在等待调用结果（消息，返回值）时的状态.

阻塞调用是指调用结果返回之前，当前线程会被挂起。调用线程只有在得到结果之后才会返回。

非阻塞调用指在不能立刻得到结果之前，该调用不会阻塞当前线程

## 3.3 BIO和NIO的区别

| IO                        | NIO                           |
| ------------------------- | ----------------------------- |
| 面向流（Stream Oriented） | 面向缓冲区（Buffer Oriented） |
| 阻塞IO（Blocking IO）     | 非阻塞IO（Non Blocking IO）   |
| 无                        | 选择器（Selectors）           |

- 传统的IO是单向的
  - 也就是需要建立输入流和输出流两个管道，数据的流动只能是单向的
  - ![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\image-20200327143758859.png)

- NIO是双向的
  - 里面的缓存区是可以双向传输的
  - ![image-20200327144423143](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\image-20200327144423143.png)
  
- NIO里面引入的通道的概念
  - 通道可以理解为我们生活中的铁路，它是用于源地址和目的地址连接的
  - 如果需要实际传输的话，那么需要依赖里面的缓冲区
  - 通道负责连接，缓冲区负责传输
  
- ![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\NIO.png)

## 3.4 通道和缓冲区

Java NIO系统的核心在于：通道（Channel）、缓冲区（Buffer）和选择器（Selector）。通道表示打开到IO设备（例如：文件、套接字）的连接。若需要使用NIO系统，需要获取用于连接IO设备的通道以及用于容纳数据的缓冲区。然后操作缓冲区，对数据进行处理

简而言之：Channel负责传输，Buffer负责存储

## 3.5 缓冲区 Buffer

在Java NIO中负责数据的存取。缓冲区就是数组。用于存储不同类型的数据根据数据类型不同，提供相同类型的缓冲区（除了Boolean）

- ByteBuffer：字节缓冲区（最常用的）
- CharBuffer
- ShortBuffer
- IntBuffer
- LongBuffer
- FloatBuffer
- DoubleBuffer

### 缓冲区中的方法

上面缓冲区的管理方式几乎一致， 通过 allocate() 获取缓冲区

缓冲区存取数据的两个核心方法

- put()：存入数据到缓冲区中
- get()：获取缓冲区中的数据
- hasRemaining()：判断缓冲区是否还有剩余的数据
- remaining()：获取缓冲区还有多少剩余数据
- mark()：标记postion的位置
- reset()：恢复到刚标记的地方

### 缓冲区中的核心属性

![image-20200327150236836](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\image-20200327150236836.png)

- capacity：容量，表示缓冲区中最大存储数据的容量，一旦申明不可改变。

- limit：界限，表示缓冲区中的可以操作数据的大小。（limit 后数据不能进行读写）
- position：位置，表示缓冲区中正在操作的位置
- mark：标记，表示记录当前 position 的位置，可以通过reset() 恢复到 mark的位置

最后它们之间的关系是：0 <= mark <= position <= limit <= capacity

### 相关操作

我们首先操作一个大小为1024字节的缓冲区ByteBuffer

```java
// 分配一个指定大小的缓冲区
ByteBuffer buf = ByteBuffer.allocate(1024);
System.out.println("初始化");
System.out.println("position：" + buf.position());
System.out.println("limit：" + buf.limit());
System.out.println("capacity：" + buf.capacity());
```

然后在传入字符串到缓冲区

```java
// 存入数据到缓冲区
String str = "abcde";
buf.put(str.getBytes());

System.out.println("存入数据");
System.out.println("position：" + buf.position());
System.out.println("limit：" + buf.limit());
System.out.println("capacity：" + buf.capacity());
```

然后开始读取数据，在读取数据前，我们需要使用flip切换到读取数据模式

```java
// 切换读取数据模式
buf.flip();
System.out.println("切换读取数据模式");
System.out.println("position：" + buf.position());
System.out.println("limit：" + buf.limit());
System.out.println("capacity：" + buf.capacity());
```

然后在进行读取操作，我们需要创建一个byte[] 数组，将需要读取出来的数据放进去

```java
// 开始读取数据
System.out.println("开始读取数据");
byte[] dst = new byte[buf.limit()];
buf.get(dst);

System.out.println(new String(dst, 0, dst.length));
```

这个图，是我们在执行各个步骤时， position，limit，capacity的变换

![image-20200327150814326](C:\Users\felixsfan\Desktop\Java基础\images\/image-20200327150814326.png)

完整代码：

```java
/**
 * 缓冲区：Buffer
 * 在Java NIO中负责数据的存取。缓冲区就是数组。用于存储不同类型的数据
 * 根据数据类型不同，提供相同类型的缓冲区（除了Boolean）
 * ByteBuffer
 * CharBuffer
 * @author: 陌溪
 * @create: 2020-03-27-14:48
 */
public class BufferDemo {

    public static void main(String[] args) {
        // 分配一个指定大小的缓冲区
        ByteBuffer buf = ByteBuffer.allocate(1024);
        System.out.println("初始化");
        System.out.println("position：" + buf.position());
        System.out.println("limit：" + buf.limit());
        System.out.println("capacity：" + buf.capacity());

        // 存入数据到缓冲区
        String str = "abcde";
        buf.put(str.getBytes());
        System.out.println("存入数据");
        System.out.println("position：" + buf.position());
        System.out.println("limit：" + buf.limit());
        System.out.println("capacity：" + buf.capacity());

        // 切换读取数据模式
        buf.flip();
        System.out.println("切换读取数据模式");
        System.out.println("position：" + buf.position());
        System.out.println("limit：" + buf.limit());
        System.out.println("capacity：" + buf.capacity());

        // 开始读取数据
        System.out.println("开始读取数据");
        byte[] dst = new byte[buf.limit()];
        buf.get(dst);
        System.out.println(new String(dst, 0, dst.length));

        System.out.println("数据读取完毕");
        System.out.println("position：" + buf.position());
        System.out.println("limit：" + buf.limit());
        System.out.println("capacity：" + buf.capacity());

        // rewind()：表示重复读
        buf.rewind();
        System.out.println("rewind");
        System.out.println("position：" + buf.position());
        System.out.println("limit：" + buf.limit());
        System.out.println("capacity：" + buf.capacity());

        // clear()：清空缓冲区，但是缓冲区中的数据仍然存储，但是处于被遗忘状态
        buf.clear();
        System.out.println("clear");
        System.out.println("position：" + buf.position());
        System.out.println("limit：" + buf.limit());
        System.out.println("capacity：" + buf.capacity());
    }
}
```

最后运行结果：

```java
初始化
position：0
limit：1024
capacity：1024
存入数据
position：5
limit：1024
capacity：1024
切换读取数据模式
position：0
limit：5
capacity：1024
开始读取数据
abcde
数据读取完毕
position：5
limit：5
capacity：1024
```

从上述输出我们能够发现，postion一直代表我们能够操作的角标，但切换到读取模式的时候，那么就会从0开始，并且limit限制我们能够读取的范围

### 直接缓冲区和非直接缓冲区

- 非直接缓冲区：通过 `allocate()  ` 方法分配缓冲区，将缓冲区建立在JVM的内存中

![image-20200327160611964](C:\Users\felixsfan\Desktop\Java基础\images\image-20200327160611964.png)

传统IO和非直接缓冲区都需要中间进行一步Copy的过程，是比较耗费时间的



- 直接缓冲区：通过`allocateDirect()` 方法分配直接缓冲区，将缓冲区建立在操作系统的物理内存中，可以提高效率。

![image-20200327160908331](C:\Users\felixsfan\Desktop\Java基础\images\image-20200327160908331.png)

写入物理内存中的数据，已经不归JVM来管辖了，因此JVM不会自动收集物理内存中的数据



- 字节缓冲区要么直接的，要么非直接的，如果为字节缓冲区，则Java虚拟机会尽最大努力直接在此缓冲区上执行本机I/O操作。也就是说，在每次调用基础操作系统的一个本机I/O操作之前，虚拟机都会尽量避免将缓冲区的内容复制到中间缓冲区（或从中间缓冲区中复制内容）
- 直接缓冲区可以通过调用此类的 `allocateDirect()工厂方法` 来创建。此方法返回的缓冲区进行分配和取消分配所需成本通常高于非直接缓冲区。直接缓冲区的内容可以驻留在常规的垃圾回收堆之外，因此，他们对应用程序的内存需求量造成 的影响可能不明显。所以，建议将直接缓冲区主要分配给那些易受基础系统的本机I/O操作影响的大型、持久的缓冲区。一般情况下，最好仅在直接缓冲区能在程序性能方面带来明显好处时分配它们。
- 直接缓冲区还可以通过`FileChannel的map()方法` 将文件区域直接映射到内存中来创建，该方法返回`MappedByteBuffer` 。Java平台的实现有助于JNI从本机代码创建直接字节缓冲区。如果以上这些缓冲区中的某个缓冲区实例指的是不可访问的内存区域。则试图访问该区域不会更改该缓冲区的内容，并且将会在访问期间或稍后的某个时间导致抛出不确定的异常。
- 字节缓冲区是直接缓冲区还是非直接缓冲区可以通过调用其 `isDirect()` 方法来确定，提供此方法是为了能够在性能关键型代码中执行显示缓冲区管理。

## 3.6 通道 Channel

### 概念

由`java.nio.channels`包定义的。Channel表示IO源与目标打开的连接。Channel类似于传统的流，只不过Channel本身不能直接访问数据，Channel只能与Buffer进行交互。

开始的时候，CPU是直接提供IO接口来进行处理应用程序的IO请求的，但是因为IO请求会占用CPU的时间

![image-20200327161715544](C:\Users\felixsfan\Desktop\Java基础\images\image-20200327161715544.png)

后来在内存中，又提供了一条DMA（直接内存存取）线路，直接和IO接口进行交互，但是DMA在进行操作时候，需要首先向CPU申请权限，获得权限后即可进行IO操作，CPU就可以进行其它的操作了

![image-20200327162012058](C:\Users\felixsfan\Desktop\Java基础\images\image-20200327162012058.png)

但是当应用程序发送大量的IO请求时候，内存会向CPU申请多条DMA总线，但是当DMA连线更多时候，又会出现其它的问题，因此后面提出了Channel 通道的方式，Channel是一个完全独立的处理器，用于IO操作，这样可以省略向CPU请求的时间

其实：通道和原来的 流 也没有本质的区别，只是原来的DMA改成了 通道

![image-20200327162401536](C:\Users\felixsfan\Desktop\Java基础\images\image-20200327162401536.png)

### 相关实现类

通道 Channel，用于源节点与目标节点的连接，在Java NIO中 负责缓冲区中的数据传输。Channel本身不存储数据，因此需要配合缓冲区进行传输。

通道的主要实现类

- java.nio.channels.Channels
  - FileChannel：文件通道
  - SocketChannel：套接字通道
  - ServerSocketChannel：套接字通道
  - DatagramChannel：用于网络

### 获取通道

Java 针对支持通道的类，提供了一个getChannel() 方法

- 本地IO
  - FileInputStream 
  - FileOutputStream
  - RandomAccessFile
- 网络IO
  - Socket
  - ServerSocket
  - DatagramSocket

在JDK 1.7 中NIO.2 针对各通道提供了静态方法：` open()`

在JDK 1.7 中NIO.2 的Files工具类提供了一个静态方法：`newByteChannel()`

### 利用通道完成文件的复制

- 使用非直接缓冲区，完成文件的复制

  ```java
  /**
   * 利用通道完成文件的复制
   * @author: 陌溪
   * @create: 2020-03-27-16:36
   */
  public class FileCopyDemo {
  
      public static void main(String[] args) {
  
          FileInputStream fis = null;
          FileOutputStream fos = null;
          FileChannel inChannel = null;
          FileChannel outChannel = null;
          try {
              fis = new FileInputStream("1.jpg");
              fos = new FileOutputStream("2.jpg");
  
              // 获取通道
              inChannel = fis.getChannel();
              outChannel = fos.getChannel();
  
              //分配一个指定大小的缓冲区
              ByteBuffer buf = ByteBuffer.allocate(1024);
  
              // 将通道中的数据，存入缓冲区
              while (inChannel.read(buf) != -1) {
                  // 切换成读取数据的模式
                  buf.flip();
  
                  // 将缓冲区中的数据写入通道
                  outChannel.write(buf);
  
                  // 清空缓冲区
                  buf.clear();
              }
  
          } catch (Exception e) {
              e.printStackTrace();
          } finally {
              try {
                  // 关闭流
                  if(fis != null) {
                      fis.close();
                  }
                  if(fos != null) {
                      fos.close();
                  }
  
                  // // 关闭通道
                  if(outChannel != null) {
                      outChannel.close();
                  }
                  if(inChannel != null) {
                      inChannel.close();
                  }
              } catch (Exception e) {
                  e.printStackTrace();
              } finally {
  
              }
          }
      }
  }
  ```

  

- 利用直接缓冲区，完成文件复制

```java
/**
 * 利用通道完成文件的复制（直接缓冲区，内存映射）
 * @author: 陌溪
 * @create: 2020-03-27-16:36
 */
public class FileCopyByDirectDemo {

    public static void main(String[] args) throws IOException {

        // 获取通道
        FileChannel inChannel = FileChannel.open(Paths.get("1.jpg"), StandardOpenOption.READ);
        FileChannel outChannel = FileChannel.open(Paths.get("2.jpg"), StandardOpenOption.WRITE, StandardOpenOption.READ, StandardOpenOption.CREATE_NEW);

        // 得到的一个内存映射文件
        // 这个的好处是，直接将文件存储在内存中了
        MappedByteBuffer inMappedBuf = inChannel.map(FileChannel.MapMode.READ_ONLY, 0, inChannel.size());
        MappedByteBuffer outMappedBuf = outChannel.map(FileChannel.MapMode.READ_WRITE, 0, inChannel.size());

        // 直接对缓冲区进行数据的读写操作
        byte [] dst = new byte[inMappedBuf.limit()];
        inMappedBuf.get(dst);
        outMappedBuf.put(dst);

        inChannel.close();
        outChannel.close();
    }
}
```

- 通道之间数据传输

```java
/**
 * 利用通道直接进行数据传输
 * @author: 陌溪
 * @create: 2020-03-27-16:36
 */
public class FileCopyByChannelDemo {

    public static void main(String[] args) throws IOException {

        // 获取通道
        // 获取通道
        FileChannel inChannel = FileChannel.open(Paths.get("1.jpg"), StandardOpenOption.READ);
        FileChannel outChannel = FileChannel.open(Paths.get("2.jpg"), StandardOpenOption.WRITE, StandardOpenOption.READ, StandardOpenOption.CREATE_NEW);

        // 从 inChannel通道 到 outChannel通道
        inChannel.transferTo(0, inChannel.size(), outChannel);

        inChannel.close();
        outChannel.close();
    }
}
```

### 分散读取与聚集写入

- 分散读取（Scatter）：将通道中的数据分散到多个缓冲区中



![image-20200327174630941](C:\Users\felixsfan\Desktop\Java基础\images\image-20200327174630941.png)

注意：按照缓冲区的顺序，写入position和limit之间的数据到Channel

下面我们定义了两个缓冲区，然后通过通道将我们的内容分别读取到两个缓冲区中，这就实现了分散读取

```java
/**
     * 分散读取
     * @throws IOException
     */
    private static void Scatteer() throws IOException {
        RandomAccessFile raf1 = new RandomAccessFile("1.txt", "rw");

        // 获取通道
        FileChannel channel = raf1.getChannel();

        // 分配指定大小的缓冲区
        ByteBuffer buf1 = ByteBuffer.allocate(10);
        ByteBuffer buf2 = ByteBuffer.allocate(1024);

        // 分散读取
        ByteBuffer[] bufs = {buf1, buf2};
        channel.read(bufs);

        for (ByteBuffer byteBuffer: bufs) {
            // 切换成读模式
            byteBuffer.flip();
        }

        System.out.println(new String(bufs[0].array(), 0, bufs[0].limit()));
        System.out.println(new String(bufs[1].array(), 0, bufs[1].limit()));
    }
```

- 聚集写入（Gather）：将多个缓冲区中的数据都聚集到通道中

```java
  /**
     * 聚集写入
     * @throws IOException
     */
    private static void Gather() throws IOException {
        RandomAccessFile raf2 = new RandomAccessFile("2.txt", "rw");
        FileChannel channel2 = raf2.getChannel();

        // 分配指定大小的缓冲区
        ByteBuffer buf1 = ByteBuffer.allocate(10);
        ByteBuffer buf2 = ByteBuffer.allocate(1024);
        ByteBuffer[] bufs = {buf1, buf2};

        // 聚集写入
        channel2.write(bufs);
    }
```

### 字符集

- 编码：字符串转换成字节数组
- 解码：字节数组转换成字符串

```java
/**
 * 通道字符集编码
 *
 * @author: 陌溪
 * @create: 2020-03-27-18:20
 */
public class ChannelCharsetDemo {
    public static void main(String[] args) throws CharacterCodingException {

        Charset cs1 = Charset.forName("GBK");

        // 获取编码器
        CharsetEncoder ce = cs1.newEncoder();

        // 获取解码器
        CharsetDecoder cd = cs1.newDecoder();

        CharBuffer cBuf = CharBuffer.allocate(1024);
        cBuf.put("今天天气不错");
        cBuf.flip();

        //编码
        ByteBuffer bBuf = ce.encode(cBuf);

        for(int i=0; i< 12; i++) {
            System.out.println(bBuf.get());
        }

        // 解码
        bBuf.flip();
        CharBuffer cBuf2 = cd.decode(bBuf);
        System.out.println(cBuf2.toString());
    }
}

```

## 3.7 选择器Selector

**jdk的基于I/O多路复用技术的NIO实现。重点在于理解Selector复用器**

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\5350978-a76ed2df22db645f.webp)

## 3.8 NIO的非阻塞式网络通信

传统的阻塞式IO必须等待内容获取完毕后，才能够继续往下执行

![image-20200327190553998](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\image-20200327190553998.png)

在NIO中，引入了选择器的概念，它会把每个通道都注册到选择器中，选择器的作用就是监控通道上的IO状态，当某个通道上，某个IO请求已经准备就绪时，那么选择器才会将该客户端的通道分配到服务端的一个或多个线程上

## 3.9 使用NIO完成网络通信的三个核心

- 通道（Channel）：负责连接
  - `java.nio.channels.Channel`
    - SelectableChannel
      - SocketChannel
      - ServerSocketChannel：TCP
      - DatagramChannel：UDP
    - Pipe.SinkChannel
    - Pipe.SourceChannel
- 缓冲区（Buffer）：负责数据的存取
- **选择器（Selector）：SelectableChannel的多路复用器，用于监控SelectorableChannel的IO状况**

## 3.10 使用阻塞式IO完成网络通信

我们首先需要创建一个服务端，用于接收客户端请求

```java
  /**
     * 服务端
     */
    public static void server() throws IOException {
        // 获取通道
        ServerSocketChannel ssChannel = ServerSocketChannel.open();
        FileChannel fileChannel = FileChannel.open(Paths.get("D:\\2.jpg"), StandardOpenOption.WRITE, StandardOpenOption.CREATE);

        // 绑定端口号
        ssChannel.bind(new InetSocketAddress(9898));

        // 获取客户端连接的通道
        SocketChannel socketChannel = ssChannel.accept();

        // 分配指定大小的缓冲区
        ByteBuffer buf = ByteBuffer.allocate(1024);

        // 读取客户端的数据，并保存到本地
        while(socketChannel.read(buf) != -1) {
            // 切换成读模式
            buf.flip();

            // 写入
            fileChannel.write(buf);

            // 清空缓冲区
            buf.clear();
        }

        // 关闭通道
        ssChannel.close();
        socketChannel.close();
        fileChannel.close();
    }
```

然后在创建客户端，发送文件

```java
 public static void client() throws IOException {
        // 获取通道
        SocketChannel sChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1", 9898));

        FileChannel inChannel = FileChannel.open(Paths.get("D:\\1.jpg"), StandardOpenOption.READ);
        // 分配指定大小的缓冲区
        ByteBuffer buf = ByteBuffer.allocate(1024);

        // 读取本地文件，并发送到服务端
        while (inChannel.read(buf) != -1) {
            // 切换到读数据模式
            buf.flip();

            // 将缓冲区的数据写入管道
            sChannel.write(buf);

            // 清空缓冲区
            buf.clear();
        }

        //关闭通道
        inChannel.close();
        sChannel.close();
    }
```

完整代码：

```java
/**
 * 阻塞式NIO
 *
 * @author: 陌溪
 * @create: 2020-03-27-19:16
 */
public class TestBlockingDemo {

    public static void client() throws IOException {
        // 获取通道
        SocketChannel sChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1", 9898));

        FileChannel inChannel = FileChannel.open(Paths.get("D:\\1.jpg"), StandardOpenOption.READ);
        // 分配指定大小的缓冲区
        ByteBuffer buf = ByteBuffer.allocate(1024);

        // 读取本地文件，并发送到服务端
        while (inChannel.read(buf) != -1) {
            // 切换到读数据模式
            buf.flip();

            // 将缓冲区的数据写入管道
            sChannel.write(buf);

            // 清空缓冲区
            buf.clear();
        }

        // 告诉客户端我发送完成了，或者切换成非阻塞模式
        sChannel.shutdownOutput();

        // 接收服务端的反馈
        int len = 0;
        while((len = sChannel.read(buf)) != -1) {
            buf.flip();
            System.out.println(new String(buf.array(), 0, len));
            buf.clear();
        }

        //关闭通道
        inChannel.close();
        sChannel.close();
    }

    /**
     * 服务端
     */
    public static void server() throws IOException {
        // 获取通道
        ServerSocketChannel ssChannel = ServerSocketChannel.open();
        FileChannel fileChannel = FileChannel.open(Paths.get("D:\\2.jpg"), StandardOpenOption.WRITE, StandardOpenOption.CREATE);

        // 绑定端口号
        ssChannel.bind(new InetSocketAddress(9898));

        // 获取客户端连接的通道
        SocketChannel socketChannel = ssChannel.accept();

        // 分配指定大小的缓冲区
        ByteBuffer buf = ByteBuffer.allocate(1024);

        // 读取客户端的数据，并保存到本地
        while(socketChannel.read(buf) != -1) {
            // 切换成读模式
            buf.flip();

            // 写入
            fileChannel.write(buf);

            // 清空缓冲区
            buf.clear();
        }

        //向客户端反馈
        buf.put("服务端数据接收成功".getBytes());
        buf.flip();
        socketChannel.write(buf);

        // 关闭通道
        ssChannel.close();
        socketChannel.close();
        fileChannel.close();
    }

    public static void main(String[] args) {
        new Thread(() -> {
            try {
                server();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }, "t1").start();

        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        new Thread(() -> {
            try {
                client();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }, "t2").start();
    }
}
```

使用非阻塞式IO完成网络通信

```java
/**
 * @author: 陌溪
 * @create: 2020-03-28-8:57
 */
public class TestNonBlockingNIODemo {

    /**
     * 客户端
     */
    public static void client() throws IOException {

        // 获取通道
        SocketChannel sChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1", 9898));

        // 切换成非阻塞模式
        sChannel.configureBlocking(false);

        // 分配指定大小的缓冲区
        ByteBuffer buf = ByteBuffer.allocate(1024);

        // 发送数据给服务器
        buf.put(new Date().toString().getBytes());

        // 切换成写模式
        buf.flip();

        // 将缓冲区中的内容写入通道
        sChannel.write(buf);

        // 关闭通道
        sChannel.close();
    }

    /**
     * 服务端
     */
    public static void server() throws IOException {

        // 获取通道
        ServerSocketChannel ssChannel = ServerSocketChannel.open();

        // 切换成非阻塞模式
        ssChannel.configureBlocking(false);

        // 绑定连接
        ssChannel.bind(new InetSocketAddress(9898));

        // 获取选择器
        Selector selector = Selector.open();

        // 将通道注册到选择器上，第二个参数代表选择器监控通道的什么状态
        // 用选择器监听 接收状态，也就是说客户端什么时候发送了，我才会开始获取连接
        ssChannel.register(selector, SelectionKey.OP_ACCEPT);

        // 轮询式的获取选择器上已经准备就绪的事件
        while(selector.select() > 0) {

            // 获取当前选择器中 所有注册的选择键（已就绪的监听事件）
            Iterator<SelectionKey> it = selector.selectedKeys().iterator();

            while(it.hasNext()) {
                // 获取准备就绪的事件
                SelectionKey sk = it.next();

                // 判断是具体什么事件准备就绪

                // 接收事件就绪
                if(sk.isAcceptable()) {
                    // 若 接收就绪，获取客户端连接
                    SocketChannel sChannel = ssChannel.accept();

                    // 切换非阻塞模式
                    sChannel.configureBlocking(false);

                    // 将该通道注册到选择器上，并监听读就绪状态
                    sChannel.register(selector, SelectionKey.OP_READ);

                } else if(sk.isReadable()) {
                    // 读就绪状态就绪

                    // 获取当前选择器上 读就绪 状态的通道
                    SocketChannel sChannel = (SocketChannel) sk.channel();

                    // 读取数据
                    ByteBuffer buf = ByteBuffer.allocate(1024);

                    int len = 0;
                    while((len = sChannel.read(buf)) > 0) {
                        // 切换成读取模式
                        buf.flip();
                        // 打印客户端的发送
                        System.out.println(Thread.currentThread().getName() + "\t  " + new String(buf.array(), 0, len));
                        // 清空缓存
                        buf.clear();
                    }
                }
            }

            // 操作执行完成后，需要将 选择键给取消 SelectionKey
            it.remove();

        }
    }

    public static void main(String[] args) {
        new Thread(() -> {
            try {
                server();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }, "t1").start();

        // 十个客户端发送数据过去
        for (int i = 0; i < 10; i++) {
            new Thread(() -> {
                try {
                    client();
                    try {
                        TimeUnit.SECONDS.sleep(1);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }, String.valueOf(i)).start();
        }

    }
}
```

## 3.11 使用非阻塞式IO制作聊天室

我们只需要把上面的代码稍微改一下，就能够实现聊天室的功能了

首先创建一个服务端，然后启动

```java
/**
 * 使用非阻塞IO制作聊天室  服务端
 * @author: 陌溪
 * @create: 2020-03-28-8:57
 */
public class ChatServerDemo {

    /**
     * 服务端
     */
    public static void server() throws IOException {

        // 获取通道
        ServerSocketChannel ssChannel = ServerSocketChannel.open();

        // 切换成非阻塞模式
        ssChannel.configureBlocking(false);

        // 绑定连接
        ssChannel.bind(new InetSocketAddress(9898));

        // 获取选择器
        Selector selector = Selector.open();

        // 将通道注册到选择器上，第二个参数代表选择器监控通道的什么状态
        // 用选择器监听 接收状态，也就是说客户端什么时候发送了，我才会开始获取连接
        ssChannel.register(selector, SelectionKey.OP_ACCEPT);

        // 轮询式的获取选择器上已经准备就绪的事件
        while(selector.select() > 0) {

            // 获取当前选择器中 所有注册的选择键（已就绪的监听事件）
            Iterator<SelectionKey> it = selector.selectedKeys().iterator();

            while(it.hasNext()) {
                // 获取准备就绪的事件
                SelectionKey sk = it.next();

                // 判断是具体什么事件准备就绪

                // 接收事件就绪
                if(sk.isAcceptable()) {
                    // 若 接收就绪，获取客户端连接
                    SocketChannel sChannel = ssChannel.accept();

                    // 切换非阻塞模式
                    sChannel.configureBlocking(false);

                    // 将该通道注册到选择器上，并监听读就绪状态
                    sChannel.register(selector, SelectionKey.OP_READ);

                } else if(sk.isReadable()) {
                    // 读就绪状态就绪

                    // 获取当前选择器上 读就绪 状态的通道
                    SocketChannel sChannel = (SocketChannel) sk.channel();

                    // 读取数据
                    ByteBuffer buf = ByteBuffer.allocate(1024);

                    int len = 0;
                    while((len = sChannel.read(buf)) > 0) {
                        // 切换成读取模式
                        buf.flip();
                        // 打印客户端的发送
                        System.out.println(Thread.currentThread().getName() + "\t  " + new String(buf.array(), 0, len));
                        // 清空缓存
                        buf.clear();
                    }
                }
            }

            // 操作执行完成后，需要将 选择键给取消 SelectionKey
            it.remove();
        }
    }

    public static void main(String[] args) throws IOException {
        server();
    }
}
```

然后在创建一个客户端

```java
/**
 * 使用非阻塞IO制作聊天室  客户端
 * @author: 陌溪
 * @create: 2020-03-28-8:57
 */
public class ChatClientDemo {

    /**
     * 客户端
     */
    public static void client() throws IOException {

        // 获取通道
        SocketChannel sChannel = SocketChannel.open(new InetSocketAddress("127.0.0.1", 9898));

        // 切换成非阻塞模式
        sChannel.configureBlocking(false);

        // 分配指定大小的缓冲区
        ByteBuffer buf = ByteBuffer.allocate(1024);

        // 使用输入流
        Scanner sc = new Scanner(System.in);

        while(sc.hasNext()) {
            String str = sc.next();

            // 获取输入内容
            buf.put((new Date().toString() + "\n" +str).getBytes());
            // 切换成写模式
            buf.flip();
            // 将缓冲区中的内容写入通道
            sChannel.write(buf);
            // 清空缓冲区
            buf.clear();
        }
        // 关闭通道
        sChannel.close();
    }

    public static void main(String[] args) throws IOException {
        client();
    }
}
```

然后我们需要运行两个客户端，但是IDEA默认只能运行一个，因此需要设置并行运行

打开run–>edit configuration

![image-20200328102743970](C:\Users\felixsfan\Desktop\Java基础\images\image-20200328102743970.png)

最后看效果

![image-20200328102743970](C:\Users\felixsfan\Desktop\Java基础\images\111.gif)



## 3.12 管道（Pipe）

```java
/**
 * 管道
 * @author: 陌溪
 * @create: 2020-03-28-10:49
 */
public class PipeDemo {
    public static void main(String[] args) throws IOException {
        // 获取管道
        Pipe pipe = Pipe.open();

        // 将缓冲区的数据写入管道
        ByteBuffer buf = ByteBuffer.allocate(1024);

        // 发送数据（使用sink发送）
        Pipe.SinkChannel sinkChannel = pipe.sink();
        buf.put("通过单向管道发送数据".getBytes());

        buf.flip();
        sinkChannel.write(buf);

        // 读取缓冲区中的数据（使用source接收）
        Pipe.SourceChannel sourceChannel = pipe.source();
        buf.flip();
        int len = sourceChannel.read(buf);
        System.out.println(new String(buf.array(), 0, len));

        sourceChannel.close();
        sinkChannel.close();
    }
}
```



## 3.13  应用

### 3.13.1 Netty

 **概念**

​        Netty 是一个基于 JAVA NIO 类库的异步通信框架，它的架构特点是：异步非阻塞、基于事件驱动、高性能、高可靠性和高可定制性。

**Netty应用场景**

1.分布式开源框架中dubbo、Zookeeper，RocketMQ底层rpc通讯使用就是netty。

2.游戏开发中，底层使用netty通讯。

# 4.Netty

## 4.1 高性能网络框架实践

### 4.1.1 基于线程模型

在早期并发数不多的场景中，有一种One Request One Thread的架构模式。

该模式下每次接收一个新请求就创建一个处理线程，线程虽然消耗资源并不多，但是成千上万请求打过来，性能也是扛不住的。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qaZKROLcTfcbB9kl0H6LJpvEvfbJTtopYpssYGibiazj3ohIl7icgVbF6dAGbPaaBy5fqEBUHicLuniaRw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这是一种比较原始的架构，思路也非常清晰，创建多个线程来提供处理能力，但在高并发生产环境中几乎没有应用，本文不再展开。

### 4.1.2 基于事件驱动模型

当前流行的是基于事件驱动的IO复用模型，相比多线程模型优势很明显。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qaZKROLcTfcbB9kl0H6LJpvFaUmS7G6s1icpUHfM3Tkew1PvbuHOIFfbKeE91rK1eOe22qtictF1iakQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在此我们先理解一下什么是事件驱动Event-Drive-Model。

> 事件驱动编程是一种编程范式，程序的执行流由外部事件来决定，它的特点是包含一个事件循环，当外部事件发生时使用回调机制来触发相应的处理。

通俗来说就是：**有一个循环装置在一直等待各种事件的到来，并将到达的事件放到队列中，再由一个分拣装置来调用对应的处理装置来响应**。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qaZKROLcTfcbB9kl0H6LJpvrFrr2djICYwibDR6DwvTaIFknEj0uoGbkgRWiaUgdmTAgiaRKDLDB5nfA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 4.1.3 Reactor反应堆模式

## 4.2 **基于事件驱动的Reactor模式详解**

**反应堆模式是一种思想，形式却有很多种。**

Reactor模式(反应器模式)**事件驱动结构的一种实现**。是一种处理一个或多个客户端并发进行服务请求的。将服务端接收请求与事件处理分离，从而提高系统处理并发的能力，**Java的NIO的reactor模式是基于系统内核的多路复用技术实现的**

![](C:\Users\felixsfan\Desktop\办公机备份\学习\后台高性能\image\142333254136604.png)

### 4.2.1 反应堆模式的本质是什么

从本质上理解，无论什么网络框架都要完成两部分操作：

- **IO操作**：数据包的读取和写入
- **CPU操作**：数据请求的处理和封装

所以上述这些问题**由谁来做以及多少线程来做，就衍生出了很多形式**，所以不要被表面现象迷惑，出现必有原因，追溯之后我们才能真正掌握它。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBKQL8fCqgpNdTa82zsEneAQQicsUaVBo8Th2yT6rNm6BLicKTDK2hxNPA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

反应堆模式根据处理IO环节和处理数据环节的数量差异分为如下几种：

- **单Reactor线程**
- **单Reactor线程和线程池**
- **多Reactor线程和线程池**

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBv5pia9O2uaGibwicUkWvY6MeLvicAvFZsd5AJa7DsA5gBzibAfSicuo66Gbw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们来看看这三种常见模式的特点、原理、优缺点、应用场景等。

### 4.2.2 单Reactor线程模式

这种模式最为简洁，一个线程完成了连接的监听、接收新连接、处理连接、读取数据、写入数据全套工作。

由于只使用了一个线程，对于多核利用率偏低，但是编程简单。

是不是觉得这个种单线程的模式没有市场？那可未必，不信你看Redis。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBdqgEIIK3ejicW3pwoWYpqfWrSLkZMYLNbP1JO2rvfKYFGHNRHT6vepQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在这种模式种IO操作和CPU操作是没有分开的，都是由1个线程来完成的，显然如果在Handler处理某个请求超时了将会阻塞客户端的正常连接。

在Redis中由于都是内存操作，速度很快，这种瓶颈虽然存在但是不够明显。

### 4.2.3 单Reactor线程和线程池模式

为了解决IO操作和CPU操作的不匹配，也就是IO操作和CPU操作是在一个线程内部串行执行的，这样就拉低了CPU操作效率。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBBfShPMXxL88S6q8x6rQuibp3mwGX8UA1jKibg2G1tbM33q36AR956hYw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

一种解决方法就是将IO操作和CPU操作分别由单独的线程来完成，各玩各的互不影响。

单Reactor线程完成IO操作、复用工作线程池来完成CPU操作就是一种解决思路。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZB4Vf2ZI0D1ZQNlbhAQXxoic2rBVCsqNsNtAf2dL9yUBX10Vo6ZVlLUiaQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

在这种模式种由Reactor线程完成连接的管理和数据读取&写回，完全掌管IO操作。

工作线程池处理来自上游分发的任务，对其中的数据进行解码、计算、编码再返回给Reactor线程和客户端完成交互。

这种模式有效利用了多核，但是单Reactor线程来完成IO操作在高并发场景中仍然会出现瓶颈。

换句话说，连接实在太多了，一个Reactor线程忙不过来建立新连接和响应旧连接这些事情，因此Reactor线程也需要几个帮手。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBEcW98qMybTPgFhUibXFHQH1iapDMO70OUhhp7kTp6zxgia3ial84aDSygw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 4.2.4 多Reactor线程和线程池模式

水平扩展往往是提供性能的有效方法。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZB8nR11lW7INGr7sP1DGvHZJeqdibpxGTmFF221841cF71GF4Z29cOzFA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

我们将Reactor线程进行扩展，一个Reactor线程负责处理新连接，多个Reactor线程负责处理连接成功的IO数据读写。

也就是进一步将监听&创建连接 和 处理连接 分别由两个及以上的线程来完成，进一步提高了IO操作部分的效率。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBJWcDxx7ibmFIgKt48nH2PgXft9yXA4ldWPblpH2B9QBmUiaNADTCyuibQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

这种模式算是比较高配的版本了，在实际生产环境也有使用。

### 4.2.5 拓展：同步IO和异步IO

我们可以轻易区分什么是阻塞IO和非阻塞IO，那么什么是同步IO和异步IO呢？

前面提到Reactor模式其中非常重要的一环就是调用read/write函数来完成数据拷贝，这部分是应用程序自己完成的，内核只负责通知监控的事件到来了，所以本质上Reactor模式属于非阻塞同步IO。

还有一种Preactor模式，借助于系统本身的异步IO特性，由操作系统进行数据拷贝，在完成之后来通知应用程序来取就可以，效率更高一些，但是底层需要借助于内核的异步IO机制来实现。

![img](https://mmbiz.qpic.cn/mmbiz_png/wAkAIFs11qZzzRLrD5lPuoiajEhlkKtZBDFPAdBmEdELWlDg9PvSRxPI0lDPbXc4gS3SW5TwGS77KFZBM42QqUA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

底层的异步IO机制可能借助于DMA和Zero-Copy技术来实现，理论上性能更高。

当前Windows系统通过IOCP实现了真正的异步I/O，而在Linux 系统的异步I/O还不完善，比如Linux中的boost.asio模块就是异步IO的支持，但是目前Linux系统还是以基于Reactor模式的非阻塞同步IO为主。

## 4.3 Netty详解

见netty文件夹