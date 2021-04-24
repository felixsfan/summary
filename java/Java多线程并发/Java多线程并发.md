## Java线程和操作系统线程的关系

### 操作系统线程模型

一对一、多对一、多对多

### Java线程模型

主流的操作系统都提供了线程实现，Java语言则提供了在不同硬件和操作系统平台下对线程操作的统一处理

**线程的实现**

实现线程主要有3种方式：使用内核线程实现、使用用户线程实现和使用用户线程加轻量级进程混合实现

- **内核线程模型**

内核线程模型即完全依赖操作系统内核提供的内核线程（**Kernel-Level Thread ，KLT**）来实现多线程。在此模型下，线程的切换调度由系统内核完成，系统内核负责将多个线程执行的任务映射到各个CPU中去执行。

程序一般不会直接去使用内核线程，而是去使用内核线程的一种高级接口——轻量级进程（Light Weight Process,LWP），轻量级进程就是我们通常意义上所讲的线程，由于每个轻量级进程都由一个内核线程支持，因此只有先支持内核线程，才能有轻量级进程。这种轻量级进程与内核线程之间1:1的关系称为一对一的线程模型。

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\内核线程.png)

用户进程使用系统内核提供的接口———轻量级进程（**Light Weight Process，LWP**）来使用系统内核线程。在此种线程模型下，由于一个用户线程对应一个LWP，因此某个LWP在调用过程中阻塞了不会影响整个进程的执行。

由于内核线程的支持，每个轻量级进程都成为一个独立的调度单元，即使有一个轻量级进程在系统调用中阻塞了，也不会影响整个进程继续工作，但是轻量级进程具有它的局限性：

首先，由于是基于内核线程实现的，所以各种线程操作，如创建、析构及同步，都需要进行系统调用。而系统调用的代价相对较高，需要在用户态（User Mode）和内核态（Kernel Mode）中来回切换。

其次，每个轻量级进程都需要有一个内核线程的支持，因此轻量级进程要消耗一定的内核资源（如内核线程的栈空间），因此一个系统支持轻量级进程的数量是有限的。

- **用户线程模型**

从广义上来讲，一个线程只要不是内核线程，就可以认为是用户线程（User Thread,UT），因此，从这个定义上来讲，轻量级进程也属于用户线程，但轻量级进程的实现始终是建立在内核之上的，许多操作都要进行系统调用，效率会受到限制。

而狭义上的用户线程指的是完全建立在用户空间的线程库上，系统内核不能感知线程存在的实现。用户线程的建立、同步、销毁和调度完全在用户态中完成，不需要内核的帮助。如果程序实现得当，这种线程不需要切换到内核态，因此操作可以是非常快速且低消耗的，也可以支持规模更大的线程数量，部分高性能数据库中的多线程就是由用户线程实现的。这种进程与用户线程之间1：N的关系称为一对多的线程模型。

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\用户级线程模型.webp)

**使用用户线程的优势在于不需要系统内核支援，劣势也在于没有系统内核的支援，所有的线程操作都需要用户程序自己处理。线程的创建、切换和调度都是需要考虑的问题，而且由于操作系统只把处理器资源分配到进程，那诸如“阻塞如何处理”、“多处理器系统中如何将线程映射到其他处理器上”这类问题解决起来将会异常困难，甚至不可能完成。**因而使用用户线程实现的程序一般都比较复杂，此处所讲的“复杂”与“程序自己完成线程操作”，并不限制程序中必须编写了复杂的实现用户线程的代码，使用用户线程的程序，很多都依赖特定的线程库来完成基本的线程操作，这些复杂性都封装在线程库之中，除了以前在不支持多线程的操作系统中（如DOS）的多线程程序与少数有特殊需求的程序外，现在使用用户线程的程序越来越少了，Java、Ruby等语言都曾经使用过用户线程，最终又都放弃使用它。

- **混合线程模型**

线程除了依赖内核线程实现和完全由用户程序自己实现之外，还有一种将内核线程与用户线程一起使用的实现方式。在这种混合实现下，既存在用户线程，也存在轻量级进程。用户线程还是完全建立在用户空间中，因此用户线程的创建、切换、析构等操作依然廉价，并且可以支持大规模的用户线程并发。而操作系统提供支持的轻量级进程则作为用户线程和内核线程之间的桥梁，这样可以使用内核提供的线程调度功能及处理器映射，并且用户线程的系统调用要通过轻量级线程来完成，大大降低了整个进程被完全阻塞的风险。在这种混合模式中，用户线程与轻量级进程的数量比是不定的，即为N：M的关系。许多UNIX系列的操作系统，如Solaris、HP-UX等都提供了N：M的线程模型实现。

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\混合线程模型.png)

对于**Sun JDK**来说，它的Windows版与Linux版都是使用一对一的线程模型实现的，一条Java线程就映射到一条轻量级进程之中，因为Windows和Linux系统提供的线程模型就是一对一的。

在Solaris平台中，由于操作系统的线程特性可以同时支持一对一（通过Bound Threads或Alternate Libthread实现）及多对多（通过LWP/Thread Based Synchronization实现）的线程模型，因此在Solaris版的JDK中也对应提供了两个平台专有的虚拟机参数：-XX：+UseLWPSynchronization（默认值）和-XX：+UseBoundThreads来明确指定虚拟机使用哪种线程模型。



## **线程状态**  

## ![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\线程状态变化.png)

**新生状态(New)** : 线程对象被创建后，就进入了新建状态。此时它和其他Java对象一样，仅仅由Java虚拟机分配了内存，并初始化其成员变量值。

**就绪状态(Runnable)**: 也被称为“可执行状态”。线程对象被调用了该对象的start()方法，该线程处于就绪状态。Java虚拟机会为其创建方法调用栈和程序计数器。处于就绪状态的线程，随时可能被CPU调度执行，取决于JVM中线程调度器的调度。

**运行状态(Running)** : 线程获取CPU权限进行执行。需要注意的是，线程只能从就绪状态进入到运行状态。

**阻塞状态(Blocked)**  : 阻塞状态是线程因为某种原因放弃CPU使用权，暂时停止运行。直到线程进入就绪状态，才有机会转到运行状态。阻塞的情况分三种：
    (01) 等待阻塞 -- 通过调用线程的wait()方法，让线程等待某工作的完成。
    (02) 同步阻塞 -- 线程在获取synchronized同步锁失败(因为锁被其它线程所占用)，它会进入同步阻塞状态。
    (03) 其他阻塞 -- 通过调用线程的sleep()或join()或发出了I/O请求时，线程会进入到阻塞状态。当sleep()状态超时、join()等待线程终止或者超时、或者I/O处理完毕时，线程重新转入就绪状态。

**死亡状态(Dead)**    : 线程执行完了、因异常退出了run()方法或者直接调用该线程的stop()方法（容易导致死锁，现在已经不推荐使用），该线程结束生命周期

## 如何控制线程

### wait()、notify()、nofityAll()方法 

１**.在Object.java中，定义了wait(), notify()和notifyAll()等方法：**

　　wait()的作用是让当前线程进入等待状态，同时，**wait()会让当前线程释放它所持有的锁**。

　　而 notify()和notifyAll()的作用，则是唤醒当前对象上的等待线程；notify()是唤醒单个线程，而notifyAll()是唤醒所有的线程。

２．**Object类中关于等待/唤醒的API详细信息如下：**
　　notify()        -- 唤醒在此对象监视器上等待的单个线程，使其进入“就绪状态”。　　
　　notifyAll()   -- 唤醒在此对象监视器上等待的所有线程，使其进入“就绪状态”。
　　wait()          -- 让当前线程处于“等待(阻塞)状态”，“直到其他线程调用此对象的 notify() 方法或 notifyAll() 方法”，当前线程被唤醒(进入“就绪状态”)。
　　wait(long timeout)                 -- 让当前线程处于“等待(阻塞)状态”，“直到其他线程调用此对象的 notify() 方法或 notifyAll() 方法，或者超过指定的时间量”，当前线程被唤醒(进入“就绪状态”)。
　　wait(long timeout, int nanos) -- 让当前线程处于“等待(阻塞)状态”，“直到其他线程调用此对象的 notify() 方法或 notifyAll() 方法，或者其他某个线程中断当前线程，或者已超过某个实际时间量”，当前线程被唤醒(进入“就绪状态”)。

 **wait()的作用是让“当前线程”等待（会释放锁），而“当前线程”是指正在cpu上运行的线程！**

### **setPriority()、sleep()、yield()、join()和interrupt()方法**  

**0.setPriority(int)** : 设置线程的优先级别 可选范围1-10 默认5
		*：优先级高 代表抢到时间片的概率高~
		*：不要依赖它完成任何功能 因为概率并不可靠

```
public class TestSetPriority{
    public static void main(String[] args){
        ThreadOne_1 t1 = new ThreadOne_1();
        ThreadTwo_1 t2 = new ThreadTwo_1();
        t1.setPriority(1);//最低
        t2.setPriority(10);//最高
        t1.start();
        t2.start();
    }
}
//身高140的小明 = guojing
class ThreadOne_1 extends Thread{
    @Override
    public void run(){
        while(true){
            System.out.println("小明下午去打篮球吗！不！我要去图书馆写小说~");
        }
    }
}
//身高229的小明 = yao
class ThreadTwo_1 extends Thread{
    @Override
    public void run(){
        while(true){
            System.out.println("小明 下午去图书馆看书吗！不！我要打篮球！");
        }
    }
}
```

**1.static sleep(long)** : 让当前处于运行状态的线程休眠指定的毫秒数，**sleep()方法不会释放锁**
	有2种重载方式：

——static void sleep(long millis)　　:　　让当前正在执行的线程暂停millis毫秒，并进入阻塞状态，该方法受到系统计时器和线程调度器的精度和准度的影响。

——static void sleep(long millis , int nanos)　　：　　让当前正在执行的线程暂停millis毫秒加nanos微秒，并进入阻塞状态，该方法受到系统计时器和线程调度器的精度和准度的影响



**2.static yield(**) : 让当前线程主动的放弃时间片 并且返回就绪，**yield()方法不会释放锁**
	*: JDK1.6的中文文档 对这个方法的描述是错误的
	*: yield()方法调用之后 是可能再次抢到时间片的

```
public class TestYield{
    public static void main(String[] args){
        NumThread nt = new NumThread();
        CharThread ct = new CharThread();
        nt.start();
        ct.start();
    }
}
class NumThread extends Thread{
    @Override
    public void  run(){
        for(int i = 1;i<=26;i++){
            System.out.println(i);
            yield();
        }
    }
}
class CharThread extends Thread{
    @Override
    public void run(){
        for(char c = 'a';c<='z';c++){
            System.out.println(c);
            yield();
        }
    }
}
```

**3.join()** : 让当前线程邀请调用方法的线程优先执行
	在被邀请的线程执行结束之前 邀请别人的线程将一直处于阻塞
	不再继续执行

```
ｊpublic class TestJoin{
    public static void main(String[] args)throws Exception{
        MyThread mt = new MyThread();
        mt.start();

        mt.join();//当前线程(主线程) 邀请 调用方法的线程(mt)优先执行

        for(int i = 0;i<1000;i++){
            System.out.println("举头望明月 低头思故乡");
        }
    }
}
class MyThread extends Thread{
    @Override
    public void run(){
        for(int i = 0;i<1000;i++){
            System.out.println("床前明月光 疑是地上霜");
        }
    }
}
```

**４．interrupt()**

　　　interrupt() 方法只是改变中断状态而已，它不会中断一个正在运行的线程。
这一方法实际完成的是，给受阻塞的线程发出一个中断信号，这样受阻线程就得以退出阻塞的状态。
更确切的说，如果线程被Object.wait, Thread.join和Thread.sleep三种方法之一阻塞，此时调用该线程的interrupt()方法，那么该线程将抛出一个 InterruptedException中断异常（该线程必须事先预备好处理此异常），从而提早地终结被阻塞状态。如果线程没有被阻塞，这时调用 interrupt()将不起作用，直到执行到wait(),sleep(),join()时,才马上会抛出 InterruptedException

```
public class TestInterrupt{
    public static void main(String[] args)throws Exception{
        MyThread_1 mt = new MyThread_1();
        mt.start();

		/*
			涉及到一个主动打人的线程：这行操作写在谁的线程体
			一个被动挨打的线程：调用方法的那个线程
		*/
        Thread.sleep(3000);
        mt.interrupt();//主线程要中断打断mt线程的阻塞状态

    }
}
class MyThread_1 extends Thread{
    @Override
    public void run(){
        try{
            sleep(999999999999L);
        }catch(Exception e){
            e.printStackTrace();
        }
        System.out.println("吖！神清气爽吖~");
    }
}
```

### 线程类的常用方法

１．setName() + getName() : 设置和得到线程的名字

２．static activeCount() : 得到程序当中所有活跃线程的总数
	活跃 = 就绪 + 运行 + 阻塞

３．interrupt() : 能够中断 打断线程的阻塞状态
		sleep()  join() 导致的阻塞可以使用interrupt()中断

４．setDaemon() : 让线程成为守护线程
	*: 守护线程是为其它的线程提供服务的线程
		当程序当中只剩下守护线程的时候
		守护线程会自行结束

```
public class TestSetDaemon{
    public static void main(String[] args){
        GYJJ gy = new GYJJ();

        //setDaemon(true) 设置线程成为守护线程的操作 必须早于它自身的start()
        gy.setDaemon(true);
        gy.start();//必须在setDaemon()之后

        //守护线程通常具有最低的优先级 防止和核心业务抢时间片~
        gy.setPriority(1);


        for(int i = 0;i<6666;i++){
            System.out.println("西天取经上大路 一走就是几万里");
        }
    }
}
class GYJJ extends Thread{
    @Override
    public void run(){
        //守护线程通常都是无限循环 防止过早消亡
        while(true){
            System.out.println("你这泼猴儿~");
        }
    }
}
```

５．static currentThread() : 得到正在运行的状态的线程对象

　１．它能够写在主方法当中用于得到主线程对象

　２．它能够在run()调用的其它方法中 用于得到线程对象
X. 绝对不应该直接出现在run()当中
因为得到的当前线程对象将完全等价于this

## 线程的创建

### extends Thread 

```
public class CreateThread{
    public static void main(String[] args){
        ThreadOne t1 = new ThreadOne();//整车进口
        t1.start();//直接启动

        while(true){
            System.out.println("科比");
        }
    }
}
class ThreadOne extends Thread{//is a
    @Override
    public void run(){
        while(true){
            System.out.println("詹姆斯");
        }
    }
}
```

### implements Runnable

```
public class CreateThread{
    public static void main(String[] args){
    
        ThreadTwo t2 = new ThreadTwo();//进口发动机
        Thread t = new Thread(t2);//国产车外壳(进口发动机)
        t.start();
        
        while(true){
            System.out.println("科比");
        }
    }
}
class ThreadTwo extends Object implements Runnable{
    @Override
    public void run(){//给线程布置作战任务
        while(true){
            System.out.println("加内特");
        }
    }
}

```

### implements Callable<T>

Callable接口，是一种让线程执行完成后，能够返回结果的

在说到Callable接口的时候，我们不得不提到Runnable接口

```
/**
 * 实现Runnable接口
 */
class MyThread implements Runnable {

    @Override
    public void run() {

    }
}
```

我们知道，实现Runnable接口的时候，需要重写run方法，也就是线程在启动的时候，会自动调用的方法

同理，我们实现Callable接口，也需要实现call方法，但是这个时候我们还需要有返回值，这个Callable接口的应用场景一般就在于批处理业务，比如转账的时候，需要给一会返回结果的状态码回来，代表本次操作成功还是失败

```
/**
 * Callable有返回值
 * 批量处理的时候，需要带返回值的接口（例如支付失败的时候，需要返回错误状态）
 *
 */
class MyThread2 implements Callable<Integer> {

    @Override
    public Integer call() throws Exception {
        System.out.println("come in Callable");
        return 1024;
    }
}
```

最后我们需要做的就是通过Thread线程， 将MyThread2实现Callable接口的类包装起来

这里需要用到的是FutureTask类，他实现了Runnable接口，并且还需要传递一个实现Callable接口的类作为构造函数

```
// FutureTask：实现了Runnable接口，构造函数又需要传入 Callable接口
// 这里通过了FutureTask接触了Callable接口
FutureTask<Integer> futureTask = new FutureTask<>(new MyThread2());
```

然后在用Thread进行实例化，传入实现Runnabnle接口的FutureTask的类

```
Thread t1 = new Thread(futureTask, "aaa");
t1.start();
```

最后通过 FutureTask.get() 获取到返回值

```
// 输出FutureTask的返回值
System.out.println("result FutureTask " + futureTask.get());
```

这就相当于原来我们的方式是main方法一条龙之心，后面在引入Callable后，对于执行比较久的线程，可以单独新开一个线程进行执行，最后在进行汇总输出

最后需要注意的是 要求获得Callable线程的计算结果，如果没有计算完成就要去强求，会导致阻塞，直到计算完成

![image-20200317152541284](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images/image-20200317152541284.png)

也就是说 futureTask.get() 需要放在最后执行，这样不会导致主线程阻塞

也可以使用下面算法，使用类似于自旋锁的方式来进行判断是否运行完毕

```
// 判断futureTask是否计算完成
while(!futureTask.isDone()) {

}
```

 **注意**

多个线程执行 一个FutureTask的时候，只会计算一次

```
FutureTask<Integer> futureTask = new FutureTask<>(new MyThread2());

// 开启两个线程计算futureTask
new Thread(futureTask, "AAA").start();
new Thread(futureTask, "BBB").start();
```

如果我们要两个线程同时计算任务的话，那么需要这样写，需要定义两个futureTask

```
FutureTask<Integer> futureTask = new FutureTask<>(new MyThread2());
FutureTask<Integer> futureTask2 = new FutureTask<>(new MyThread2());

// 开启两个线程计算futureTask
new Thread(futureTask, "AAA").start();

new Thread(futureTask2, "BBB").start();
```

### 线程池（ThreadPoolExecutor）



### Lambda表达式

```java
public class Demo01Runnable {
    public static void main(String[] args) {
         new Thread(()->System.out.println("多线程任务执行！")).start(); // 启动线程
    }
}
```

## 并发错误的原因

多线程高并发的场景下 由于多线程共享数据 导致的并发错误~
   根本原因：

​             多个线程共享同一个资源
   深层原因：
​             JMM模型
​             指令重排
   直接原因：线程体当中连续的多行代码未必能够连续执行
   导火索：时间片突然耗尽

当多个线程共享数据的时候 线程体当中连续的多个操作未必能够连续执行
   很可能操作只完成了一部分的时候 CPU时间片突然耗尽
   另一个线程直接拿到了时间片 访问操作了 修改并不完整的数据synchronized关键字

### synchronized的锁的原理：

sychornized以前是重量级锁，jdk1.6之后，该关键字被进行了很多的优化，并非一开始就该对象加上重量级锁，也是从偏向锁，轻量级锁，再到重量级锁的过程。了解synchronized的原理我们需要明白3个问题：

- synchronized是如何实现锁
- 为什么任何一个对象都可以成为锁
- 锁存在哪个地方
- 锁的膨胀

### Java对象结构与锁实现原理及MarkWord详解

**Java对象结构**

Java对象存储在堆（Heap）内存。那么一个Java对象到底包含什么呢？概括起来分为对象头、对象体和对齐字节。

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\20190115141050902.png)

对象的几个部分的作用：

1.对象头中的Mark Word（标记字）主要用来表示对象的线程锁状态，另外还可以用来配合GC、存放该对象的hashCode；

2.Klass Word是一个指向方法区中Class信息的指针，意味着该对象可随时知道自己是哪个Class的实例；

3.数组长度也是占用64位（8字节）的空间，这是可选的，只有当本对象是一个数组对象时才会有这个部分；

4.对象体是用于保存对象属性和值的主体部分，占用内存空间取决于对象的属性数量和类型；

5.对齐字是为了减少堆内存的碎片空间（不一定准确）

**一.Mark Word（标记字）**

![img](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\20190111092408622.png)

以上是Java对象处于5种不同状态时，Mark Word中64个位的表现形式，上面每一行代表对象处于某种状态时的样子。其中各部分的含义如下：

![img](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\20190115142040348.png)

biased_lock：对象是否启用偏向锁标记，只占1个二进制位。为1时表示对象启用偏向锁，为0时表示对象没有偏向锁。lock和biased_lock共同表示对象处于什么锁状态。

age：4位的Java对象年龄。在GC中，如果对象在Survivor区复制一次，年龄增加1。当对象达到设定的阈值时，将会晋升到老年代。默认情况下，并行GC的年龄阈值为15，并发GC的年龄阈值为6。由于age只有4位，所以最大值为15，这就是-XX:MaxTenuringThreshold选项最大值为15的原因。

identity_hashcode：31位的对象标识hashCode，采用延迟加载技术。调用方法System.identityHashCode()计算，并会将结果写到该对象头中。当对象加锁后（偏向、轻量级、重量级），MarkWord的字节没有足够的空间保存hashCode，因此该值会移动到管程Monitor中。

thread：持有偏向锁的线程ID。

epoch：偏向锁的时间戳。

ptr_to_lock_record：轻量级锁状态下，指向栈中锁记录的指针。

ptr_to_heavyweight_monitor：重量级锁状态下，指向对象监视器Monitor的指针

**二.Class Word（类指针）**

​     用于存储对象的类型指针，该指针指向它的类元数据，JVM通过这个指针确定对象是哪个类的实例。该指针的位长度为JVM的一个字大小，即32位的JVM为32位，64位的JVM为64位

指针压缩：如果应用的对象过多，使用64位的指针将浪费大量内存，统计而言，64位的JVM将会比32位的JVM多耗费50%的内存。为了节约内存可以使用选项+UseCompressedOops开启指针压缩，其中，oop即ordinary object pointer普通对象指针。】

开启该选项后，下列指针将压缩至32位：

每个Class的属性指针（即静态变量）
每个对象的属性指针（即对象变量）
普通对象数组的每个元素指针
当然，也不是所有的指针都会压缩，一些特殊类型的指针JVM不会优化，比如指向PermGen的Class对象指针(JDK8中指向元空间的Class对象指针)、本地变量、堆栈元素、入参、返回值和NULL指针等
**三、数组长度**

   如果对象是一个数组，那么对象头还需要有额外的空间用于存储数组的长度，这部分数据的长度也随着JVM架构的不同而不同：32位的JVM上，长度为32位；64位JVM则为64位。64位JVM如果开启+UseCompressedOops选项，该区域长度也将由64位压缩至32位

### **Monitor**

   更深入了解对象头在JVM源码中的定义，需要关心两个文件，oop.hpp/markOop.hpp 

  1.每个 Java Object 在 JVM 内部都有一个 native 的 C++ 对象 oop/oopDesc 与之对应。先在oop.hpp中看oopDesc的定义：

```
class oopDesc {
  friend class VMStructs;
 private:
  volatile markOop  _mark;//理解为对象头
  union _metadata {
    Klass*      _klass;
    narrowKlass _compressed_klass;
  } _metadata;
```

_mark的内存分布如对象头分布

2.每个object的对象里 的markOop的monitor方法可以得到ObjectMonitor的对象。oop.hpp下的oopDesc类是JVM对象的顶级基类，所以每个object对象都包含markOop，所以所有的Java对象是天生的Monitor

markOop.hpp 中 markOopDesc继承自oopDesc，　并扩展了自己的monitor方法，这个方法返回一个ObjectMonitor指针对象：这个ObjectMonitor 其实就是对象监视器
  ![img](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\1383365-20190110162628940-924509688.png)

​      3.重量级锁通过对象内部的监视器（monitor）实现，其中monitor的本质是依赖于底层操作系统的Mutex Lock实现

**锁存在哪个地方** ：锁存在于每个对象的 markOop 对象头中.对于为什么每个对象都可以成为锁呢？ 因为每个 Java Object 在 JVM 内部都有一个 native 的 C++ 对象 oop/oopDesc 与之对应，而对应的 oop/oopDesc 都会存在一个markOop 对象头，而这个对象头是存储锁的位置，里面还有对象监视器，即ObjectMonitor，所以这也是为什么每个对象都能成为锁的原因之一

### 总结

#### 1.底层代码实现

### ![1587638591000](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\1587638591000.png)

#### 2.加锁过程

![img](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\1383365-20190111131251217-1725163497.png)

#### 3.sychornized如何保证的内存可见性:

​         JMM关于synchronized的两条可见性规定:
​                    *线程解锁前,必须把共享变量的最新值刷新到主内存中
​                     *线程加锁时,将清空工作内存中共享变量的值,从而使用共享变量时需要从主内存中重新读取最新的值

#### 4.sychornized原子性：monitor

### 锁的膨胀

重量级锁会造成线程排队（串行执行），且会使CPU在用户态和核心态之间频繁切换，所以代价高、效率低。为了提高效率，不会一开始就使用重量级锁，JVM在内部会根据需要，按如下步骤进行锁的升级：

  1.初期锁对象刚创建时，还没有任何线程来竞争，对象的Mark Word是下图的第一种情形，这偏向锁标识位是0，锁状态01，说明该对象处于无锁状态（无线程竞争它）。

​    2.当有一个线程来竞争锁时，先用偏向锁，表示锁对象偏爱这个线程，这个线程要执行这个锁关联的任何代码，不需要再做任何检查和切换，这种竞争不激烈的情况下，效率非常高。这时Mark Word会记录自己偏爱的线程的ID，把该线程当做自己的熟人。如下图第二种情形。

​    3.当有两个线程开始竞争这个锁对象，情况发生变化了，不再是偏向（独占）锁了，锁会升级为轻量级锁，两个线程公平竞争，哪个线程先占有锁对象并执行代码，锁对象的Mark Word就执行哪个线程的栈帧中的锁记录。如下图第三种情形。

​    4.如果竞争的这个锁对象的线程更多，导致了更多的切换和等待，JVM会把该锁对象的锁升级为重量级锁，这个就叫做同步锁，这个锁对象Mark Word再次发生变化，会指向一个监视器对象，这个监视器对象用集合的形式，来登记和管理排队的线程

![img](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\20190111091608949.jpg)

<img src="C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\锁膨胀.png" style="zoom:50%;" />

## 锁分类

锁提供的两种特性：互斥（mutual exclusion）或者原子性 和可见性（visibility）

### 悲观锁/乐观锁：

​    悲观锁/乐观锁并不是锁的类型，而是指看待并发同步的角度。
​    悲观锁：阻塞同步，会上锁，synchorized关键词是一种悲观锁，Lock锁也是一种悲观锁。
​    乐观锁：非阻塞同步，不会上锁，利用CAS原理，在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号等机制。乐观锁适用于多读的应用类型，这样可以提高吞吐量。 Ps（cas设计缺陷可能会造成ABA问题）
​              **实现场景：**
​                  mysql数据库版本号：MVCC
​                  redis实现：Redis的事务机制以及watch指令
​                                  watch指令在一次事务执行完毕后，即结束其生命周期
​                                  watch一个key的变动，并在watch和unwatch之间做一个类似事务操作，只有当事务操作成                      功，整体循环才会跳出，当操作期间watch的key变动时候，
​                                  提交事务操作时候，事务操作将会被取消
​                  CAS实现：在Java中java.util.concurrent.atomic包下面的原子变量类就是使用了乐观锁的一种实现方式

### 公平锁/非公平锁：

公平锁：尽量以请求锁的顺序来获取锁。按顺序排队排最前的获取锁，即等的最久的获取锁。线程获取锁执行完后需要重新排队。
非公平锁：无法保证锁的获取是按照请求锁的顺序进行的。synchorized为非公平锁，Lock默认为非公平锁，可设置为公平锁。非公平锁的优点在于吞吐量比公平锁大。

### 可中断锁/不可中断锁：

​          顾名思义不解释。
​          synchorized是一种不可中断锁，Lock可以通过lockInterruptibly()+interrupt()实现可中断

### 独享锁/共享锁：

​    独享锁指该锁一次只能被一个线程所持有，共享锁可以被多个线程持有。
​    ReentrantLock，synchorized是独享锁，ReadWriteLock中读锁为共享锁。共享锁可保证并发，效率高。

### 互斥锁/读写锁：

​    互斥锁/读写锁是对独享锁/共享锁的实现。

### 分段锁：

​     分段锁其实是一种锁的设计，并不是具体的一种锁，对于ConcurrentHashMap而言，其并发的实现就是通过分段锁的形式来实现高效的并发操作，ConcurrentHashMap中的分段锁称为Segment，
​    它即类似于HashMap（JDK7与JDK8中HashMap的实现）的结构，即内部拥有一个Entry数组，数组中的每个元素又是一个链表；同时又是一个ReentrantLock（Segment继承了ReentrantLock)。
​    当需要put元素的时候，并不是对整个HashMap进行加锁，而是先通过hashcode来知道他要放在那一个分段中，然后对这个分段进行加锁，所以当多线程put的时候，只要不是放在一个分段中，就实现了真正的并行的插入。 但是，在统计size的时候，可就是获取HashMap全局信息的时候，就需要获取所有的分段锁才能统计。
​      分段锁的设计目的是细化锁的粒度，当操作不需要更新整个数组的时候，就仅仅针对数组中的一项进行加锁操作。
​        Ps（HashTable容器使用synchronized来保证线程安全，所有访问HashTable的线程都竞争同一把锁，高并发访问时效率远低于ConcurrentHashMap）

### 自旋锁：

   在Java中，自旋锁是指尝试获取锁的线程不会立即阻塞，而是采用循环的方式去尝试获取锁，这样的好处是减少线程上下文切换的消耗，缺点是循环会消耗CPU；
  **Java中自旋锁可以通过CAS+while实现**（CAS循环检验实现自旋锁，非阻塞的方式）
            
               A线程先进来调用myLock方法自己持有锁5秒,B线程随后进来发现当前有线程持有锁,不是null,所以只能自旋等待,直到A到时间释放锁


```
 A线程先进来调用myLock方法自己持有锁5秒,B线程随后进来发现当前有线程持有锁,不是null,所以只能自旋等待,直到A到时间释放锁
public void myLock(){
     Thread thread = Thread.currentThread();
  
     System.out.println(Thread.currentThread.getName()+"come in");
                                                                                              while(!AtomicReference.compareAndSet(null,thread)){

                                            }
                                          }
public void myUnock(){
         Thread thread=Thread.currentThread();
                                                                                                   AtomicReference.compareAndSet(thread,null);                                              System.out.println(Thread.currentThread.getName()+"invoked myUnLock");
               }
```



### 偏向锁：

   偏向第一个访问的线程(厕所贴标签);它通过消除资源无竞争情况下的同步原语，进一步提高了程序的运行性能

### 轻量级锁：

   是指当前锁是偏向锁的时候，资源被另外的线程所访问，那么偏向锁就会升级为轻量级锁

   使用轻量级锁时，不需要申请互斥量，仅仅将Mark Word中的部分字节【ptr_to_lock_record】CAS(自旋的方式)更新指向线程栈中锁记录(先撕了以前的标签,然后两个人抢着贴标签)，如果更新成功，则轻量级锁获取成功，记录锁状态为轻量级锁

### 重量级锁:

  轻量级锁需要不断循环,消耗CPU,因此引入重量级锁.申请重量级的互斥变量

  参考synchronized关键字

### 可重入锁

   定义:可重入锁就是当前持有该锁的线程能够多次获取该锁，无需等待;家门的锁和厕所的锁,避免死锁.

```
public class Xttblog extends SuperXttblog {
    public static void main(String[] args) {
        Xttblog child = new Xttblog();
        child.doSomething();
    }
 
    public synchronized void doSomething() {
        System.out.println("child.doSomething()" + Thread.currentThread().getName());
        doAnotherThing(); // 调用自己类中其他的synchronized方法
    }
 
    private synchronized void doAnotherThing() {
        super.doSomething(); // 调用父类的synchronized方法
        System.out.println("child.doAnotherThing()" + Thread.currentThread().getName());
    }
}
 
class SuperXttblog {
    public synchronized void doSomething() {
        System.out.println("father.doSomething()" + Thread.currentThread().getName());
    }
}
//打印
child.doSomething()Thread-5492
father.doSomething()Thread-5492
child.doAnotherThing()Thread-5492
```

可重入锁的实现原理：

​       每一个锁关联一个线程持有者和计数器，当计数器为 0 时表示该锁没有被任何线程持有，那么任何线程都可能获得该锁而调用相应的方法；当某一线程请求成功后，JVM会记下锁的持有线程，并且将计数器置为 1；此时其它线程请求该锁，则必须等待；而该持有锁的线程如果再次请求这个锁，就可以再次拿到这个锁，同时计数器会递增；当线程退出同步代码块时，计数器会递减，如果计数器为 0，则释放该锁。

## JUC核心知识点

JUC是java.util.concurrent包的简称，JUC有2大核心，CAS和AQS，CAS是java.util.concurrent.atomic包的基础，即AtomicInteger和AtomicLong等是用CAS实现的

- JMM
- volatile

  - 可见性
  - 原子性
  - 有序性
  - 哪些地方用到了volatile
- CAS

  - CAS底层原理
  - CAS缺点
- ABA问题

  - AtomicReference
  - AtomicStampedReference和ABA问题的解决
- 原子操作

- 集合类的安全问题

  - List

    CopyOnWriteArrayList

  - Set

    HashSet和HashMap

  - Map

- Java锁

  - 公平锁/非公平锁
  - 可重入锁/递归锁
  - 自旋锁
  - 读写锁/独占锁/共享锁
  - Synchronized和Lock的区别

- CountDownLatch/CyclicBarrier/Semaphore

- 阻塞队列

- Callable接口

- 阻塞队列的应用——生产者消费者

  - 传统模式
  - 阻塞模式

- 阻塞队列的应用——线程池

  - 线程池基本概念
  - 线程池三种常用创建方式

  - 线程池创建的七个参数
  - 线程池底层原理
  - 线程池的拒绝策略
  - 实际生产使用自定义线程池

## JMM

**1.概念：**JMM是指Java**内存模型**，不是Java**内存布局**，不是所谓的栈、堆、方法区。

在 Java虚拟机规范中，**试图定义一种 Java内存模型， 来屏蔽各个硬件平台和操作系统的内存访问差异，以实现让 Java 程序在各种平台下都能达到一致的内存访问效果** ，Java内存模型规定所有的变量都是存在主存当中，每个线程都有自己的工作内存，工作内存内保存了该线程使用到的主内存中变量的副本。线程对变量的所有操作（读取，赋值等）都必须在工作内存中进行， 而不能直接对主存进行操作，并且每个线程不能访问其他线程的工作内存。线程间变量值的传递均需要通过主内存来完成

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\JMM.png)

2.JMM可能带来**可见性**、**原子性**和**有序性**问题

3.JMM中有两条规定：
   （1）线程对共享变量的所有操作都必须在自己的工作内存中进行，不能直接在主内存中读写；
   （2）不同的线程之间不能直接访问其他线程工作内存的变量，线程之间变量值得传递只能通过主内存来传递

4、实现共享变量的可见性，必须保证两点：
   （1）线程修改后的共享变量值能够及时从线程工作内存中刷新到主内存中；
   （2）其他线程能够及时把共享变量的最新值从主内存更新到自己的工作内存中

5、java支持的可见性实现的两种方式：synchronized、volatile。
（1）synchronized能够保证同步方法或同步代码块中变量的复合操作的原子性；也能保证变量的可见性。
（2）volatile不能保证变量的复合操作的原子性；只能保证变量的可见性

6.JMM关于synchronized的两条规定（synchronized如何实现内存可见性）：
（1）线程加锁时，将清空工作内存中共享变量的值，从而使用共享变量时需要从主内存中重新读取最新的值。
（2）线程解锁时，必须把共享变量的最新值刷新到主内存中

7、synchronized线程执行互斥代码的六个过程：
（1）获得互斥锁；
（2）清空工作内存；
（3）从主内存中拷贝变量的最新值到工作内存；
（4）执行代码；
（5）将更改后的共享变量的值刷新到主内存；
（6）释放互斥锁。

8、指令重排序：重排序不会对单线程带来内存可见性问题。但是多线程交互时，指令重排序可能会造成内存可见性问题

## ThreadLocal

### 作用

​       当使用ThreadLocal维护变量时，ThreadLocal为每个使用该变量的线程提供独立的变量副本，所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本。
​        ThreadLocal 的作用是提供线程内的局部变量，这种变量在线程的生命周期内起作用，减少同一个线程内多个函数或者组件之间一些公共变量的传递的复杂度。

### 原理

​       ThreadLocal最简单的实现方式就是ThreadLocal类内部有一个线程安全的Map，然后用线程的ID作为Map的key，实例对象作为Map的value，这样就能达到各个线程的值隔离的效果

### 应用

数据库连接、Session管理等等都使用到了TheadLocal 



## ThreadLocal为什么会导致内存泄漏



## volatile关键字

volatile 关键字是Java提供的一种**轻量级**同步机制。它能够保证**可见性**和**有序性**，但是不能保证**原子性**

### 基础概念

#### 1.原理： 

​      当一个共享变量被volatile修饰时，它会保证修改的值会立即被更新到主存，所以对其他线程是可见的，当有其他线程需要读取时，它会去内存中读取新值。当我们使用volatile关键字修饰某个变量之后，就相当于告诉CPU：我这个变量需要使用MESI和总线嗅探机制处理。从而也就保证了可见性。

**缓存一致性实现：MESI协议+总线嗅探机制**

https://zhuanlan.zhihu.com/p/250657181

#### 2.volatile如何实现有序性：

​       通过加入内存屏障和禁止重排序来优化实现的，参考https://blog.csdn.net/qq_41765712/article/details/105633173

（1）对volatile变量执行写操作时，会在写操作后加入一条store屏障指令；
（2）对volatile变量执行读操作时，会在读操作前加入一条load屏障指令

#### 3.不保证原子性原因和解决方法

​    原因：从主内存中读取、修改、写入一系列操作不是原子性的

https://blog.csdn.net/xdzhouxin/article/details/81236356

​    解决办法：

- 加sync
- 使用我们的JUC下AtomicInteger(底层CAS检验)

#### 4.什么情况下volatile能够保证线程安全?

​              1.运算结果并不依赖变量的当前值，或者能够确保只有单一的线程修改变量的值
​              2.变量不受到其他域的值的限制

### 代码测试

####  1、可见性

```java
class MyData{
    int number=0;
    //volatile int number=0;

    AtomicInteger atomicInteger=new AtomicInteger();
    public void setTo60(){
        this.number=60;
    }

    //此时number前面已经加了volatile，但是不保证原子性
    public void addPlusPlus(){
        number++;
    }

    public void addAtomic(){
        atomicInteger.getAndIncrement();
    }
}

//volatile可以保证可见性，及时通知其它线程主物理内存的值已被修改
private static void volatileVisibilityDemo() {
    System.out.println("可见性测试");
    MyData myData=new MyData();//资源类
    //启动一个线程操作共享数据
    new Thread(()->{
        System.out.println(Thread.currentThread().getName()+"\t come in");
        try {TimeUnit.SECONDS.sleep(3);myData.setTo60();
        System.out.println(Thread.currentThread().getName()+"\t update number value: "+myData.number);}catch (InterruptedException e){e.printStackTrace();}
    },"AAA").start();
    
    while (myData.number==0){
     //main线程持有共享数据的拷贝，一直为0
    }
    
    System.out.println(Thread.currentThread().getName()+"\t mission is over. main get number value: "+myData.number);
}
```

MyData类是资源类，一开始number变量没有用volatile修饰，所以程序运行的结果是：

```java
可见性测试
AAA	 come in
AAA	 update number value: 60
```

虽然一个线程把number修改成了60，但是main线程持有的仍然是最开始的0，所以一直循环，程序不会结束。

如果对number添加了volatile修饰，运行结果是：

```java
AAA	 come in
AAA	 update number value: 60
main	 mission is over. main get number value: 60
```

可见某个线程对number的修改，会立刻反映到主内存上。

#### 2、原子性

volatile并**不能保证操作的原子性**。这是因为，比如一条number++的操作，会形成3条指令

```java
getfield        //读
iconst_1	//++常量1
iadd		//加操作
putfield	//写操作
```

假设有3个线程，分别执行number++，都先从主内存中拿到最开始的值，number=0，然后三个线程分别进行操作。假设线程0执行完毕，number=1，也立刻通知到了其它线程，但是此时线程1、2已经拿到了number=0，所以结果就是写覆盖，线程1、2将number变成1

解决的方式就是：

1. 对`addPlusPlus()`方法加锁。

2. 使用`java.util.concurrent.AtomicInteger`类

   ```java
   private static void atomicDemo() {
       System.out.println("原子性测试");
       MyData myData=new MyData();
       for (int i = 1; i <= 20; i++) {
           new Thread(()->{
               for (int j = 0; j <1000 ; j++) {
                 //  myData.addPlusPlus();
                   myData.addAtomic();
               }
           },String.valueOf(i)).start();
       }
       while (Thread.activeCount()>2){
           Thread.yield();
       }
       System.out.println(Thread.currentThread().getName()+"\t int type finally number value: "+myData.number);
       System.out.println(Thread.currentThread().getName()+"\t AtomicInteger type finally number value: "+myData.atomicInteger);
   }
   ```

   结果：可见，由于`volatile`不能保证原子性，出现了线程重复写的问题，最终结果比20000小。而`AtomicInteger`可以保证原子性

```java
原子性测试
main	 int type finally number value: 17542
main	 AtomicInteger type finally number value: 20000
```

#### 3、有序性

volatile可以保证**有序性**，也就是防止**指令重排序**。所谓指令重排序，就是出于优化考虑，CPU执行指令的顺序跟程序员自己编写的顺序不一致。就好比一份试卷，题号是老师规定的，是程序员规定的，但是考生（CPU）可以先做选择，也可以先做填空

```java
int x = 11; //语句1
int y = 12; //语句2
x = x + 5;  //语句3
y = x * x;  //语句4
```

以上例子，可能出现的执行顺序有1234、2134、1342，这三个都没有问题，最终结果都是x = 16，y=256。但是如果是4开头，就有问题了，y=0。这个时候就**不需要**指令重排序。

volatile底层是用CPU的**内存屏障**（Memory Barrier）指令来实现的，有两个作用，一个是保证特定操作的顺序性，二是保证变量的可见性。在指令之间插入一条Memory Barrier指令，告诉编译器和CPU，在Memory Barrier指令之间的指令不能被重排序

### 哪些地方用到过volatile？

#### **单例模式的安全问题**

常见的DCL（Double Check Lock）模式虽然加了同步，但是在多线程下依然会有线程安全问题

```java
public class SingletonDemo {
    private static SingletonDemo singletonDemo=null;
    private SingletonDemo(){
        System.out.println(Thread.currentThread().getName()+"\t 我是构造方法");
    }
    //DCL模式 Double Check Lock 双端检索机制：在加锁前后都进行判断
    public static SingletonDemo getInstance(){
        if (singletonDemo==null){
            synchronized (SingletonDemo.class){
                 if (singletonDemo==null){
                     singletonDemo=new SingletonDemo();
                 }
            }
        }
        return singletonDemo;
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            new Thread(()->{
                SingletonDemo.getInstance();
            },String.valueOf(i+1)).start();
        }
    }
}
```

这个漏洞比较tricky，很难捕捉，但是是存在的。`instance=new SingletonDemo();`可以大致分为三步

```java
memory = allocate();     //1.分配内存
instance(memory);	 //2.初始化对象
instance = memory;	 //3.设置引用地址
```

其中2、3没有数据依赖关系，**可能发生重排**。如果发生，此时内存已经分配，那么`instance=memory`不为null。如果此时线程挂起，`instance(memory)`还未执行，对象还未初始化。由于`instance!=null`，所以两次判断都跳过，最后返回的`instance`没有任何内容，还没初始化。

解决的方法就是对`singletondemo`对象添加上`volatile`关键字，禁止指令重排。

## CAS

### 概念

　　　CAS（比较并交换）底层：它是一条CPU并发原语，CAS并发原语体现在JAVA语言中的sun.misc.Unsafe类中的各个方法。调用UnSafe类中的CAS方法，JVM会帮我们实现出CAS汇编指令。这是一种完全依赖于硬件的功能，通过它实现了原子操作。再次强调，由于CAS是一种系统原语，原语属于操作系统，是由若干指令组成的，用于完成某个功能的一个过程，并且原语的执行必须是连续的，在执行过程中不允许被中断，也就是说CAS是一条CPU的原子指令，不会造成数据不一致性问题。

###  **java中通过UnSafe实现CAS**

　　　由于Java方法无法直接访问底层系统，需要通过本地方法（native）方法来访问，Unsafe相当于一个后门，基于该类可以直接操作特定内存数据。Unsafe类存在于sun.misc包中，其内部方法操作可以像C的指针一样直接操作内存，因此Java中CAS操作的执行依赖于Unsafe类的方法

### 场景一

atomicInteger.compareAndSet(X, X)

```java
public class CASDemo {
    public static void main(String[] args) {
        AtomicInteger atomicInteger=new AtomicInteger(5);
        System.out.println(atomicInteger.compareAndSet(5, 2019)+"\t current data : "+ atomicInteger.get());
        //修改失败
        System.out.println(atomicInteger.compareAndSet(5, 1024)+"\t current data : "+ atomicInteger.get());
    }
}
//ture
//false
```

这是因为我们执行第一个的时候，期望值和原本值是满足的，因此修改成功，但是第二次后，主内存的值已经修改成了2019，不满足期望值，因此返回了false，本次写入失败

![image-20200310201311367](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200310201311367.png)

### 场景二

多线程环境下 volatile i++会丢失，要用atomicInteger.getAndIncrement()

### 底层原理

#### atomicInteger.getAndIncrement()底层原理

1.首先我们先看看 atomicInteger.getAndIncrement()方法的源码

![image-20200310203030720](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200310203030720.png)

2.从这里能够看到，底层又调用了一个unsafe类的getAndAddInt方法，Unsafe`类的大部分方法都是`native的，用来像C语言一样从底层操作内存。

![image-20200310210701761](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200310210701761.png)

var5：就是我们从主内存中拷贝到工作内存中的值

那么操作的时候，需要比较工作内存中的值，和主内存中的值进行比较

假设执行 compareAndSwapInt返回false，那么就一直执行 while方法，直到期望的值和真实值一样

- val1：AtomicInteger对象本身
- var2：该对象值得引用地址
- var4：需要变动的数量
- var5：用var1和var2找到的内存中的真实值
  - 用该对象当前的值与var5比较
  - 如果相同，更新var5 + var4 并返回true
  - 如果不同，继续取值然后再比较，直到更新完成

这里没有用synchronized，而用CAS，这样提高了并发性，也能够实现一致性，是因为每个线程进来后，进入的do while循环，然后不断的获取内存中的值，判断是否为最新，然后在进行更新操作。

3.

```java
      // 本地方法
public native int getIntVolatile(Object var1, long var2);
public final native boolean compareAndSwapInt(Object var1, long var2, int var4, int var5);
```

#### compareAndSet底层原理

1.

```java
public final boolean compareAndSet(int expect, int update) {
         return unsafe.compareAndSwapInt(this, valueOffset, expect, update);
              }

```



2.

```java
   // 本地方法
public final native boolean compareAndSwapInt(Object var1, long var2, int var4, int var5);
```



### 缺点：

- 只能保证一个共享变量的原子操作
  - 当对一个共享变量执行操作时，我们可以通过循环CAS的方式来保证原子操作
  - 但是对于多个共享变量操作时，循环CAS就无法保证操作的原子性，这个时候只能用锁来保证原子性
- 不保证可见性
- 引出来ABA问题
- CAS不加锁，保证原子性，但是需要多次比较，循环时间长，耗费CPU 

## ABA问题

所谓ABA问题，就是比较并交换的循环，存在一个**时间差**，而这个时间差可能带来意想不到的问题。比如线程T1将值从A改为B，然后又从B改为A。线程T2看到的就是A，但是**却不知道这个A发生了更改**。尽管线程T2 CAS操作成功，但不代表就没有问题。
有的需求，比如CAS，**只注重头和尾**，只要首尾一致就接受。但是有的需求，还看重过程，中间不能发生任何修改，这就引出了`AtomicReference`原子引用。

### AtomicReference

`AtomicInteger`对整数进行原子操作，如果是一个POJO呢？可以用`AtomicReference`来包装这个POJO，使其操作原子化。

```java
User user1 = new User("Jack",25);
User user2 = new User("Lucy",21);
AtomicReference<User> atomicReference = new AtomicReference<>();
atomicReference.set(user1);
System.out.println(atomicReference.compareAndSet(user1,user2)); // true
System.out.println(atomicReference.compareAndSet(user1,user2)); //false
```

### AtomicStampedReference和ABA问题的解决

使用`AtomicStampedReference`类可以解决ABA问题。这个类维护了一个“**版本号**”Stamp，在进行CAS操作的时候，不仅要比较当前值，还要比较**版本号**。只有两者都相等，才执行更新操作。

```java
AtomicStampedReference.compareAndSet(expectedReference,newReference,oldStamp,newStamp);
```

详见[ABADemo](https://github.com/MaJesTySA/JVM-JUC-Core/blob/master/src/thread/ABADemo.java)。

## 原子操作

### 基本类型

- AtomicBoolean
- AtomicInteger
- AtomicLong

### 数组

- AtomicIntegerArray
- AtomicLongArray
- AtomicReferenceArray

### 引用类型

- AtomicReference

  包装对象进行CAS

- AtomicReferenceFieldUpdater

  对对象中的字段进行CAS操作

## 集合类不安全问题

### List

`ArrayList`不是线程安全类，在多线程同时写的情况下，会抛出`java.util.ConcurrentModificationException`异常。

```java
private static void listNotSafe() {
    List<String> list=new ArrayList<>();
    for (int i = 1; i <= 30; i++) {
        new Thread(() -> {
            list.add(UUID.randomUUID().toString().substring(0, 8));
            System.out.println(Thread.currentThread().getName() + "\t" + list);
        }, String.valueOf(i)).start();
    }
}
```

这个时候出现了错误，也就是java.util.ConcurrentModificationException

![image-20200312205142763](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200312205142763.png)

#### **解决方法**：

1. 使用`Vector`（`ArrayList`所有方法加`synchronized`，太重）。
2. 使用`Collections.synchronizedList(new ArrayList<>())`转换成线程安全类。
3. 使用`JUC包下的java.concurrent.CopyOnWriteArrayList`（推荐）。

#### CopyOnWriteArrayList

这是JUC的类，通过**写时复制**来实现**读写分离**。比如其`add()`方法，就是先**复制**一个新数组，长度为原数组长度+1，然后将新数组最后一个元素设为添加的元素。

```java
public boolean add(E e) {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        //得到旧数组
        Object[] elements = getArray();
        int len = elements.length;
        //复制新数组
        Object[] newElements = Arrays.copyOf(elements, len + 1);
        //设置新元素
        newElements[len] = e;
        //设置新数组
        setArray(newElements);
        return true;
    } finally {
        lock.unlock();
    }
}
```

任何可变的操作（add、set、remove等等）都是通过ReentrantLock 控制并发并伴随复制这个动作读写分离，读在旧数组，写Copy到新数组，COW则完全放开了牺牲数据实时性而保证数据最终一致性

### Set

跟List类似，`HashSet`和`TreeSet`都不是线程安全的，

#### **解决方法**：

１. Collections.synchronizedSet(new HashSet<>());

２.CopyOnWriteSet　这个类底层维护了一个`CopyOnWriteArrayList`数组。

```java
private final CopyOnWriteArrayList<E> al;
public CopyOnWriteArraySet() {
    al = new CopyOnWriteArrayList<E>();
}
```

#### HashSet和HashMap

`HashSet`底层是用`HashMap`实现的。既然是用`HashMap`实现的，那`HashMap.put()`需要传**两个参数**，而`HashSet.add()`只**传一个参数**，这是为什么？实际上`HashSet.add()`就是调用的`HashMap.put()`，只不过**Value**被写死了，是一个`private static final Object`对象。

```java
//value值
Object PRESENT=new Object()
```



### Map

`HashMap`不是线程安全的

#### 解决方法：

1.Collections.synchronizedMap(new HashMap<>());
2.HashTable（跟`Vector`类似，太重量级）

3.ConcurrentHashMap

#### ConcurrentHashMap：

对于ConcurrentHashMap而言，其并发的实现就是通过分段锁的形式来实现高效的并发操作，ConcurrentHashMap中的分段锁称为Segment，它即类似于HashMap（JDK7与JDK8中HashMap的实现）的结构，即内部拥有一个Entry数组，数组中的每个元素又是一个链表；同时又是一个ReentrantLock（Segment继承了ReentrantLock)。 当需要put元素的时候，并不是对整个HashMap进行加锁，而是先通过hashcode来知道他要放在那一个分段中，然后对这个分段进行加锁，所以当多线程put的时候，只要不是放在一个分段中，就实现了真正的并行的插入。但是，在统计size的时候，可就是获取HashMap全局信息的时候，就需要获取所有的分段锁才能统计

#### 线程不安全的原因：

## AQS

AQS的英文是**抽象队列同步器**的意思

### 三个部分

首先AQS当中主要有三个东西，一个是**state变量**，一个是**当前线程**，一个是**等待队列（双向链表）**

### 运作机制

它的运作机制主要是线程想获取锁的话，先用CAS的机制将state加1，如果成功
的话，在将当前线程变量赋值为自身。由于AQS是可重入的，所以第二次加锁的时候
先判断当前线程变量是否是自身，如果是的话。state变量再进行加1。
在并发的时候，其他线程想加锁的时候，CAS操作state会失败，进入等待队列。
如果之前的线程执行完毕的话，会唤醒等待队列中的线程

### 下面以 ReentrantLock 非公平锁的代码看看 AQS 的原理

[C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\JUC AQS ReentrantLock源码分析.md]: 

## JUC下锁的实现类

### 梗概

JUC下Lock 和 ReadWriteLock两个接口，主要实现类分别为:重入锁ReentrantLock,读写锁ReentrantReadWriteLock,这两个类都是基于 AQS(AbstractQueuedSynchronizer) 实现的.在包括 AQS 在内的很多并发相关类中，CAS 都扮演了很重要的角色

### 公平锁和非公平锁

**概念**：所谓**公平锁**，就是多个线程按照**申请锁的顺序**来获取锁，类似排队，先到先得。而**非公平锁**，则是多个线程抢夺锁，会导致**优先级反转**或**饥饿现象**。

**区别**：公平锁在获取锁时先查看此锁维护的**等待队列**，**为空**或者当前线程是等待队列的**队首**，则直接占有锁，否则插入到等待队列，FIFO原则。非公平锁比较粗鲁，上来直接**先尝试占有锁**，失败则采用公平锁方式。非公平锁的优点是**吞吐量**比公平锁更大。

`synchronized`和`juc.ReentrantLock`默认都是**非公平锁**。`ReentrantLock`在构造的时候传入`true`则是**公平锁**。

```java
/**
* 创建一个可重入锁，true 表示公平锁，false 表示非公平锁。默认非公平锁
*/
Lock lock = new ReentrantLock(true);
```

### ReentrantLock可重入锁

可重入锁又叫递归锁，指的同一个线程在**外层方法**获得锁时，进入**内层方法**会自动获取锁。也就是说，线程可以进入任何一个它已经拥有锁的代码块。比如`get`方法里面有`set`方法，两个方法都有同一把锁，得到了`get`的锁，就自动得到了`set`的锁。

就像有了家门的锁，厕所、书房、厨房就为你敞开了一样。可重入锁可以**避免死锁**的问题。

```java
public synchronized void method1() {
	method2();
}

public synchronized void method2() {

}
```

**synchronized 、ReentrantLock都是可重入锁**

#### 底层原理：

​    ReentrantLock的一个内部类Sync的父类说起，Sync的父类是AbstractQueuedSynchronizer（后面简称AQS）

AQS是JDK1.5提供的一个基于FIFO等待队列实现的一个用于实现同步器的基础框架，这个基础框架的重要性可以这么说，JUC包里面几乎所有的有关锁、多线程并发以及线程同步器等重要组件的实现都是基于AQS这个框架。 AQS的核心思想是基于volatile int state这样的一个属性(CAS操作)对其原子性的操作来实现对当前锁的状态进行修改。当state的值为0的时候，标识改Lock不被任何线程所占有。 AQS的等待队列基于一个双向链表实现的，HEAD节点不关联线程，后面两个节点分别关联Thread2和Thread3。ReenTrantLock入队的实现是一种自旋锁，通过循环调用CAS操作来实现加锁。它的性能比较好也是因为避免了使线程进入内核态的阻塞状态。

#### ReentrantLock实现公平非公平的原理

见ReentrantLock源码解析

#### 作用：防止死锁

#### 可重入锁验证

**证明Synchronized**

```java
/**
 * 可重入锁（也叫递归锁）
 * 指的是同一线程外层函数获得锁之后，内层递归函数仍然能获取到该锁的代码，在同一线程在外层方法获取锁的时候，在进入内层方法会自动获取锁
 *
 * 也就是说：`线程可以进入任何一个它已经拥有的锁所同步的代码块`
 * @author: 陌溪
 * @create: 2020-03-15-12:12
 */

/**
 * 资源类
 */
class Phone {

    /**
     * 发送短信
     * @throws Exception
     */
    public synchronized void sendSMS() throws Exception{
        System.out.println(Thread.currentThread().getName() + "\t invoked sendSMS()");

        // 在同步方法中，调用另外一个同步方法
        sendEmail();
    }

    /**
     * 发邮件
     * @throws Exception
     */
    public synchronized void sendEmail() throws Exception{
        System.out.println(Thread.currentThread().getId() + "\t invoked sendEmail()");
    }
}
public class ReenterLockDemo {


    public static void main(String[] args) {
        Phone phone = new Phone();

        // 两个线程操作资源列
        new Thread(() -> {
            try {
                phone.sendSMS();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, "t1").start();

        new Thread(() -> {
            try {
                phone.sendSMS();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, "t2").start();
    }
}
```

在这里，我们编写了一个资源类phone，拥有两个加了synchronized的同步方法，分别是sendSMS 和 sendEmail，我们在sendSMS方法中，调用sendEmail。最后在主线程同时开启了两个线程进行测试，最后得到的结果为：

```
t1	 invoked sendSMS()
t1	 invoked sendEmail()
t2	 invoked sendSMS()
t2	 invoked sendEmail()
```

这就说明当 t1 线程进入sendSMS的时候，拥有了一把锁，同时t2线程无法进入，直到t1线程拿着锁，执行了sendEmail 方法后，才释放锁，这样t2才能够进入

```
t1	 invoked sendSMS()      t1线程在外层方法获取锁的时候
t1	 invoked sendEmail()    t1在进入内层方法会自动获取锁

t2	 invoked sendSMS()      t2线程在外层方法获取锁的时候
t2	 invoked sendEmail()    t2在进入内层方法会自动获取锁
```

 **证明ReentrantLock**

```java
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * 资源类
 */
class Phone implements Runnable{

    Lock lock = new ReentrantLock();

    /**
     * set进去的时候，就加锁，调用set方法的时候，能否访问另外一个加锁的set方法
     */
    public void getLock() {
        lock.lock();
        try {
            System.out.println(Thread.currentThread().getName() + "\t get Lock");
            setLock();
        } finally {
            lock.unlock();
        }
    }

    public void setLock() {
        lock.lock();
        try {
            System.out.println(Thread.currentThread().getName() + "\t set Lock");
        } finally {
            lock.unlock();
        }
    }

    @Override
    public void run() {
        getLock();
    }
}
public class ReenterLockDemo {


    public static void main(String[] args) {
        Phone phone = new Phone();

        /**
         * 因为Phone实现了Runnable接口
         */
        Thread t3 = new Thread(phone, "t3");
        Thread t4 = new Thread(phone, "t4");
        t3.start();
        t4.start();
    }
}
```

最后输出结果我们能发现，结果和加synchronized方法是一致的，都是在外层的方法获取锁之后，线程能够直接进入里层

```
t3	 get Lock
t3	 set Lock
t4	 get Lock
t4	 set Lock
```

#### 锁的配对

锁之间要配对，加了几把锁，最后就得解开几把锁，下面的代码编译和运行都没有任何问题。但锁的数量不匹配会导致死循环。

```
lock.lock();
lock.lock();
try{
    someAction();
}finally{
    lock.unlock();
}
```

### 自旋锁

所谓自旋锁，就是尝试获取锁的线程不会**立即阻塞**，而是采用**循环的方式去尝试获取**。自己在那儿一直循环获取，就像“**自旋**”一样。这样的好处是减少**线程切换的上下文开销**，缺点是会**消耗CPU**。CAS底层的`getAndAddInt`就是**自旋锁**思想。

![image-20200315154143781](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200315154143781.png)

####  优缺点

优点：循环比较获取直到成功为止，没有类似于wait的阻塞

缺点：当不断自旋的线程越来越多的时候，会因为执行while循环不断的消耗CPU资源

####  手写自旋锁（Unsafe类＋CAS思想）

通过CAS操作完成自旋锁，A线程先进来调用myLock方法自己持有锁5秒，B随后进来发现当前有线程持有锁，不是null，所以只能通过自旋等待，直到A释放锁后B随后抢到

```java
/**
 * 手写一个自旋锁
 *
 * 循环比较获取直到成功为止，没有类似于wait的阻塞
 *
 * 通过CAS操作完成自旋锁，A线程先进来调用myLock方法自己持有锁5秒，B随后进来发现当前有线程持有锁，不是null，所以只能通过自旋等待，直到A释放锁后B随后抢到
 * @author: 陌溪
 * @create: 2020-03-15-15:46
 */
public class SpinLockDemo {

    // 现在的泛型装的是Thread，原子引用线程
    AtomicReference<Thread>  atomicReference = new AtomicReference<>();

    public void myLock() {
        // 获取当前进来的线程
        Thread thread = Thread.currentThread();
        System.out.println(Thread.currentThread().getName() + "\t come in ");

        // 开始自旋，期望值是null，更新值是当前线程，如果是null，则更新为当前线程，否者自旋
        while(!atomicReference.compareAndSet(null, thread)) {

        }
    }

    /**
     * 解锁
     */
    public void myUnLock() {

        // 获取当前进来的线程
        Thread thread = Thread.currentThread();

        // 自己用完了后，把atomicReference变成null
        atomicReference.compareAndSet(thread, null);

        System.out.println(Thread.currentThread().getName() + "\t invoked myUnlock()");
    }

    public static void main(String[] args) {

        SpinLockDemo spinLockDemo = new SpinLockDemo();

        // 启动t1线程，开始操作
        new Thread(() -> {

            // 开始占有锁
            spinLockDemo.myLock();


            try {
                TimeUnit.SECONDS.sleep(5);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // 开始释放锁
            spinLockDemo.myUnLock();

        }, "t1").start();


        // 让main线程暂停1秒，使得t1线程，先执行
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 1秒后，启动t2线程，开始占用这个锁
        new Thread(() -> {

            // 开始占有锁
            spinLockDemo.myLock();
            // 开始释放锁
            spinLockDemo.myUnLock();

        }, "t2").start();

    }
}
```

最后输出结果

```java
t1	 come in 
.....五秒后.....
t1	 invoked myUnlock()
t2	 come in 
t2	 invoked myUnlock()
```

首先输出的是 t1 come in

然后1秒后，t2线程启动，发现锁被t1占有，所有不断的执行 compareAndSet方法，来进行比较，直到t1释放锁后，也就是5秒后，t2成功获取到锁，然后释放

### 读写锁/独占/共享锁

读锁**是**共享的**，**写锁**是**独占的**。`juc.ReentrantLock`和`synchronized`都是**独占锁**，独占锁就是**一个锁**只能被**一个线程**所持有。有的时候，需要**读写分离，那么就要引入读写锁，即`juc.ReentrantReadWriteLock`。

####  代码实现

实现一个读写缓存的操作，假设开始没有加锁的时候，会出现什么情况

```java
/**
 * 读写锁
 * 多个线程 同时读一个资源类没有任何问题，所以为了满足并发量，读取共享资源应该可以同时进行
 * 但是，如果一个线程想去写共享资源，就不应该再有其它线程可以对该资源进行读或写
 *
 * @author: 陌溪
 * @create: 2020-03-15-16:59
 */

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;

/**
 * 资源类
 */
class MyCache {

    private volatile Map<String, Object> map = new HashMap<>();
    // private Lock lock = null;

    /**
     * 定义写操作
     * 满足：原子 + 独占
     * @param key
     * @param value
     */
    public void put(String key, Object value) {
        System.out.println(Thread.currentThread().getName() + "\t 正在写入：" + key);
        try {
            // 模拟网络拥堵，延迟0.3秒
            TimeUnit.MILLISECONDS.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        map.put(key, value);
        System.out.println(Thread.currentThread().getName() + "\t 写入完成");
    }

    public void get(String key) {
        System.out.println(Thread.currentThread().getName() + "\t 正在读取:");
        try {
            // 模拟网络拥堵，延迟0.3秒
            TimeUnit.MILLISECONDS.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Object value = map.get(key);
        System.out.println(Thread.currentThread().getName() + "\t 读取完成：" + value);
    }


}
public class ReadWriteLockDemo {

    public static void main(String[] args) {

        MyCache myCache = new MyCache();
        // 线程操作资源类，5个线程写
        for (int i = 0; i < 5; i++) {
            // lambda表达式内部必须是final
            final int tempInt = i;
            new Thread(() -> {
                myCache.put(tempInt + "", tempInt +  "");
            }, String.valueOf(i)).start();
        }
        // 线程操作资源类， 5个线程读
        for (int i = 0; i < 5; i++) {
            // lambda表达式内部必须是final
            final int tempInt = i;
            new Thread(() -> {
                myCache.get(tempInt + "");
            }, String.valueOf(i)).start();
        }
    }
}
```

最后运行结果：

```java
0	 正在写入：0
4	 正在写入：4
3	 正在写入：3
1	 正在写入：1
2	 正在写入：2
0	 正在读取:
1	 正在读取:
2	 正在读取:
3	 正在读取:
4	 正在读取:
2	 写入完成
4	 写入完成
4	 读取完成：null
0	 写入完成
3	 读取完成：null
0	 读取完成：null
1	 写入完成
3	 写入完成
1	 读取完成：null
2	 读取完成：null
```

我们可以看到，在写入的时候，写操作都没其它线程打断了，这就造成了，还没写完，其它线程又开始写，这样就造成数据不一致

#### 解决方法

上面的代码是没有加锁的，这样就会造成线程在进行写入操作的时候，被其它线程频繁打断，从而不具备原子性，这个时候，我们就需要用到读写锁来解决了

```java
/**
 * 读写锁
 * 多个线程 同时读一个资源类没有任何问题，所以为了满足并发量，读取共享资源应该可以同时进行
 * 但是，如果一个线程想去写共享资源，就不应该再有其它线程可以对该资源进行读或写
 *
 * @author: 陌溪
 * @create: 2020-03-15-16:59
 */

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * 资源类
 */
class MyCache {

    /**
     * 缓存中的东西，必须保持可见性，因此使用volatile修饰
     */
    private volatile Map<String, Object> map = new HashMap<>();

    /**
     * 创建一个读写锁
     * 它是一个读写融为一体的锁，在使用的时候，需要转换
     */
    private ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();

    /**
     * 定义写操作
     * 满足：原子 + 独占
     * @param key
     * @param value
     */
    public void put(String key, Object value) {

        // 创建一个写锁
        rwLock.writeLock().lock();

        try {

            System.out.println(Thread.currentThread().getName() + "\t 正在写入：" + key);

            try {
                // 模拟网络拥堵，延迟0.3秒
                TimeUnit.MILLISECONDS.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            map.put(key, value);

            System.out.println(Thread.currentThread().getName() + "\t 写入完成");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 写锁 释放
            rwLock.writeLock().unlock();
        }
    }

    /**
     * 获取
     * @param key
     */
    public void get(String key) {

        // 读锁
        rwLock.readLock().lock();
        try {

            System.out.println(Thread.currentThread().getName() + "\t 正在读取:");

            try {
                // 模拟网络拥堵，延迟0.3秒
                TimeUnit.MILLISECONDS.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            Object value = map.get(key);

            System.out.println(Thread.currentThread().getName() + "\t 读取完成：" + value);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 读锁释放
            rwLock.readLock().unlock();
        }
    }

    /**
     * 清空缓存
     */
    public void clean() {
        map.clear();
    }


}
public class ReadWriteLockDemo {

    public static void main(String[] args) {

        MyCache myCache = new MyCache();

        // 线程操作资源类，5个线程写
        for (int i = 1; i <= 5; i++) {
            // lambda表达式内部必须是final
            final int tempInt = i;
            new Thread(() -> {
                myCache.put(tempInt + "", tempInt +  "");
            }, String.valueOf(i)).start();
        }

        // 线程操作资源类， 5个线程读
        for (int i = 1; i <= 5; i++) {
            // lambda表达式内部必须是final
            final int tempInt = i;
            new Thread(() -> {
                myCache.get(tempInt + "");
            }, String.valueOf(i)).start();
        }
    }
}
```

运行结果：

```java
1	 正在写入：1
1	 写入完成
2	 正在写入：2
2	 写入完成
3	 正在写入：3
3	 写入完成
4	 正在写入：4
4	 写入完成
5	 正在写入：5
5	 写入完成
2	 正在读取:
3	 正在读取:
1	 正在读取:
4	 正在读取:
5	 正在读取:
2	 读取完成：2
1	 读取完成：1
4	 读取完成：4
3	 读取完成：3
5	 读取完成：5
```

从运行结果我们可以看出，写入操作是一个一个线程进行执行的，并且中间不会被打断，而读操作的时候，是同时5个线程进入，然后并发读取操作

### Synchronized和Lock的区别

1. **原始构成**：`sync`是JVM层面的，底层通过`monitorenter`和`monitorexit`来实现的。`Lock`是JDK API层面的。（`sync`一个enter会有两个exit，一个是正常退出，一个是异常退出）
2. **使用方法**：`sync`不需要手动释放锁，而`Lock`需要手动释放。
3. **是否可中断**：`sync`不可中断，除非抛出异常或者正常运行完成。`Lock`是可中断的，通过调用`interrupt()`方法。
4. **是否为公平锁**：`sync`只能是非公平锁，而`Lock`既能是公平锁，又能是非公平锁。
5. **绑定多个条件**：`sync`不能，只能随机唤醒。而`Lock`可以通过`Condition`来绑定多个条件，精确唤醒。

## CountDownLatch/CyclicBarrier/Semaphore

### CountDownLatch

#### 概念：

让一些线程阻塞直到另一些线程完成一系列操作才被唤醒

CountDownLatch主要有两个方法，当一个或多个线程调用**awai**t方法时，调用线程就会被阻塞。其它线程调用CountDown方法会将**计数器**减1（调用CountDown方法的线程不会被阻塞），当计数器的值变成零时，因调用await方法被阻塞的线程会被唤醒，继续执行

#### 案列一：

一个自习室里有7个人，其中有一个是班长，班长的主要职责就是在其它6个同学走了后，关灯，锁教室门，然后走人，因此班长是需要最后一个走的，那么有什么方法能够控制班长这个线程是最后一个执行，而其它线程是随机执行的

```java
package com.moxi.interview.study.thread;

import java.util.concurrent.CountDownLatch;

/**
 * @author: 陌溪
 * @create: 2020-03-15-19:03
 */
public class CountDownLatchDemo {
    public static void main(String[] args) throws InterruptedException {

        // 计数器
        CountDownLatch countDownLatch = new CountDownLatch(6);

        for (int i = 0; i <= 6; i++) {
            new Thread(() -> {
                System.out.println(Thread.currentThread().getName() + "\t 上完自习，离开教室");
                countDownLatch.countDown();
            }, String.valueOf(i)).start();
        }

        countDownLatch.await();

        System.out.println(Thread.currentThread().getName() + "\t 班长最后关门");
    }
}
```

结果：

```java
0	 上完自习，离开教室
2	 上完自习，离开教室
4	 上完自习，离开教室
1	 上完自习，离开教室
5	 上完自习，离开教室
6	 上完自习，离开教室
3	 上完自习，离开教室
main	 班长最后关门
```

### CyclicBarrier

#### 概念：

和CountDownLatch相反，需要集齐七颗龙珠，召唤神龙。也就是做加法，开始是0，加到某个值的时候就执行

CyclicBarrier的字面意思就是可循环（cyclic）使用的屏障（Barrier）。它要求做的事情是，让一组线程到达一个屏障（也可以叫同步点）时被阻塞，直到最后一个线程到达屏障时，屏障才会开门，所有被屏障拦截的线程才会继续干活，线程进入屏障通过CyclicBarrier的await方法

####  案例：

```java
/**
 * CyclicBarrier循环屏障
 *
 * @author: 陌溪
 * @create: 2020-03-16-14:40
 */
public class CyclicBarrierDemo {


    public static void main(String[] args) {
        /**
         * 定义一个循环屏障，参数1：需要累加的值，参数2 需要执行的方法
         */
        CyclicBarrier cyclicBarrier = new CyclicBarrier(7, () -> {
            System.out.println("召唤神龙");
        });

        for (int i = 0; i < 7; i++) {
            final Integer tempInt = i;
            new Thread(() -> {
                System.out.println(Thread.currentThread().getName() + "\t 收集到 第" + tempInt + "颗龙珠");

                try {
                    // 先到的被阻塞，等全部线程完成后，才能执行方法
                    cyclicBarrier.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (BrokenBarrierException e) {
                    e.printStackTrace();
                }
            }, String.valueOf(i)).start();
        }
    }
}
```

### Semaphore：信号量

####  概念

信号量主要用于两个目的

- 一个是用于多个共享资源的互斥使用
- 另一个用于并发线程数的控制

####  代码

我们模拟一个抢车位的场景，假设一共有6个车，3个停车位

```java
/**
 * 信号量Demo
 * @author: 陌溪
 * @create: 2020-03-16-15:01
 */
public class SemaphoreDemo {

    public static void main(String[] args) {

        /**
         * 初始化一个信号量为3，默认是false 非公平锁， 模拟3个停车位
         */
        Semaphore semaphore = new Semaphore(3, false);

        // 模拟6部车
        for (int i = 0; i < 6; i++) {
            new Thread(() -> {
                try {
                    // 代表一辆车，已经占用了该车位
                    semaphore.acquire(); // 抢占

                    System.out.println(Thread.currentThread().getName() + "\t 抢到车位");

                    // 每个车停3秒
                    try {
                        TimeUnit.SECONDS.sleep(3);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + "\t 离开车位");

                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    // 释放停车位
                    semaphore.release();
                }
            }, String.valueOf(i)).start();
        }
    }
}
```

运行结果

```java
0	 抢到车位
2	 抢到车位
1	 抢到车位
2	 离开车位
1	 离开车位
3	 抢到车位
0	 离开车位
4	 抢到车位
5	 抢到车位
4	 离开车位
3	 离开车位
5	 离开车位
```

## 阻塞队列

### **概念**

当阻塞队列为空时，获取（take）操作是阻塞的；当阻塞队列为满时，添加（put）操作是阻塞的。

![image-20200316152120272](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200316152120272.png)

**好处**：

   阻塞队列不用手动控制什么时候该被阻塞，什么时候该被唤醒，简化了操作。

**为什么要用？**

去海底捞吃饭，大厅满了，需要进候厅等待，但是这些等待的客户能够对商家带来利润，因此我们非常欢迎他们阻塞(生产者消费者模式、消息中间件)

在多线程领域：所谓的阻塞，在某些清空下会挂起线程（即阻塞），一旦条件满足，被挂起的线程又会自动唤醒

（线程池）

**为什么需要BlockingQueue？**

好处是我们不需要关心什么时候需要阻塞线程，什么时候需要唤醒线程，因为这一切BlockingQueue都帮你一手包办了

在concurrent包发布以前，在多线程环境下，我们每个程序员都必须自己取控制这些细节，尤其还要兼顾效率和线程安全，而这会给我们的程序带来不小的复杂度。

**体系**：`Collection`→`Queue`→`BlockingQueue`→七个阻塞队列实现类。

| 类名                    | 作用                             |
| ----------------------- | -------------------------------- |
| **ArrayBlockingQueue**  | 由**数组**构成的**有界**阻塞队列 |
| **LinkedBlockingQueue** | 由**链表**构成的**有界**阻塞队列 |
| PriorityBlockingQueue   | 支持优先级排序的无界阻塞队列     |
| DelayQueue              | 支持优先级的延迟无界阻塞队列     |
| **SynchronousQueue**    | 单个元素的阻塞队列               |
| LinkedTransferQueue     | 由链表构成的无界阻塞队列         |
| LinkedBlockingDeque     | 由链表构成的双向阻塞队列         |

粗体标记的三个用得比较多，许多消息中间件底层就是用它们实现的。

需要注意的是`LinkedBlockingQueue`虽然是有界的，但有个巨坑，其默认大小是`Integer.MAX_VALUE`，高达21亿，一般情况下内存早爆了（在线程池的`ThreadPoolExecutor`有体现）

### **BlockingQueue API**：

抛出异常是指当队列满时，再次插入会抛出异常；返回布尔是指当队列满时，再次插入会返回false；阻塞是指当队列满时，再次插入会被阻塞，直到队列取出一个元素，才能插入。超时是指当一个时限过后，才会插入或者取出。

| 方法类型 | 抛出异常  | 返回布尔   | 阻塞     | 超时                     |
| -------- | --------- | ---------- | -------- | ------------------------ |
| 插入     | add(E e)  | offer(E e) | put(E e) | offer(E e,Time,TimeUnit) |
| 取出     | remove()  | poll()     | take()   | poll(Time,TimeUnit)      |
| 队首     | element() | peek()     | 无       | 无                       |

####  抛出异常组

执行add方法，向已经满的ArrayBlockingQueue中添加元素时候，会抛出异常

```java
// 阻塞队列，需要填入默认值
BlockingQueue<String> blockingQueue = new ArrayBlockingQueue<>(3);

System.out.println(blockingQueue.add("a"));
System.out.println(blockingQueue.add("b"));
System.out.println(blockingQueue.add("c"));

System.out.println(blockingQueue.add("XXX"));
```

运行后：

```java
true
true
true
Exception in thread "main" java.lang.IllegalStateException: Queue full
	at java.util.AbstractQueue.add(AbstractQueue.java:98)
	at java.util.concurrent.ArrayBlockingQueue.add(ArrayBlockingQueue.java:312)
	at com.moxi.interview.study.queue.BlockingQueueDemo.main(BlockingQueueDemo.java:25)
```

如果我们多取出元素的时候，也会抛出异常，我们假设只存储了3个值，但是取的时候，取了四次

```java
// 阻塞队列，需要填入默认值
BlockingQueue<String> blockingQueue = new ArrayBlockingQueue<>(3);
System.out.println(blockingQueue.add("a"));
System.out.println(blockingQueue.add("b"));
System.out.println(blockingQueue.add("c"));

System.out.println(blockingQueue.remove());
System.out.println(blockingQueue.remove());
System.out.println(blockingQueue.remove());
System.out.println(blockingQueue.remove());
```

那么出现异常

```java
true
true
true
a
b
c
Exception in thread "main" java.util.NoSuchElementException
	at java.util.AbstractQueue.remove(AbstractQueue.java:117)
	at com.moxi.interview.study.queue.BlockingQueueDemo.main(BlockingQueueDemo.java:30)
```

#### 布尔类型组

我们使用 offer的方法，添加元素时候，如果阻塞队列满了后，会返回false，否者返回true

同时在取的时候，如果队列已空，那么会返回null

```java
BlockingQueue blockingQueue = new ArrayBlockingQueue(3);

System.out.println(blockingQueue.offer("a"));
System.out.println(blockingQueue.offer("b"));
System.out.println(blockingQueue.offer("c"));
System.out.println(blockingQueue.offer("d"));

System.out.println(blockingQueue.poll());
System.out.println(blockingQueue.poll());
System.out.println(blockingQueue.poll());
System.out.println(blockingQueue.poll());
```

运行结果

```java
true
true
true
false
a
b
c
null
```

#### 阻塞队列组

我们使用 put的方法，添加元素时候，如果阻塞队列满了后，添加消息的线程，会一直阻塞，直到队列元素减少，会被清空，才会唤醒

一般在消息中间件，比如RabbitMQ中会使用到，因为需要保证消息百分百不丢失，因此只有让它阻塞

```java
BlockingQueue<String> blockingQueue = new ArrayBlockingQueue<>(3);
blockingQueue.put("a");
blockingQueue.put("b");
blockingQueue.put("c");
System.out.println("================");

blockingQueue.take();
blockingQueue.take();
blockingQueue.take();
blockingQueue.take();
```

同时使用take取消息的时候，如果内容不存在的时候，也会被阻塞

####  不见不散组

offer( ) ， poll 加时间

使用offer插入的时候，需要指定时间，如果2秒还没有插入，那么就放弃插入

```java
BlockingQueue<String> blockingQueue = new ArrayBlockingQueue<>(3);
System.out.println(blockingQueue.offer("a", 2L, TimeUnit.SECONDS));
System.out.println(blockingQueue.offer("b", 2L, TimeUnit.SECONDS));
System.out.println(blockingQueue.offer("c", 2L, TimeUnit.SECONDS));
System.out.println(blockingQueue.offer("d", 2L, TimeUnit.SECONDS));
```

同时取的时候也进行判断，如果2秒内取不出来，那么就返回null

```java
System.out.println(blockingQueue.poll(2L, TimeUnit.SECONDS));
System.out.println(blockingQueue.poll(2L, TimeUnit.SECONDS));
System.out.println(blockingQueue.poll(2L, TimeUnit.SECONDS));
System.out.println(blockingQueue.poll(2L, TimeUnit.SECONDS));
```

### SynchronousQueue

SynchronousQueue没有容量，与其他BlockingQueue不同，SynchronousQueue是一个不存储的BlockingQueue，每一个put操作必须等待一个take操作，否者不能继续添加元素

下面我们测试SynchronousQueue添加元素的过程

首先我们创建了两个线程，一个线程用于生产，一个线程用于消费

生产的线程分别put了 A、B、C这三个字段

```java
BlockingQueue<String> blockingQueue = new SynchronousQueue<>();

new Thread(() -> {
    try {       
        System.out.println(Thread.currentThread().getName() + "\t put A ");
        blockingQueue.put("A");
       
        System.out.println(Thread.currentThread().getName() + "\t put B ");
        blockingQueue.put("B");        
        
        System.out.println(Thread.currentThread().getName() + "\t put C ");
        blockingQueue.put("C");        
        
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
}, "t1").start();
```

消费线程使用take，消费阻塞队列中的内容，并且每次消费前，都等待5秒

```java
 new Thread(() -> {
            try {

                try {
                    TimeUnit.SECONDS.sleep(5);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                blockingQueue.take();
                System.out.println(Thread.currentThread().getName() + "\t take A ");

                try {
                    TimeUnit.SECONDS.sleep(5);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                blockingQueue.take();
                System.out.println(Thread.currentThread().getName() + "\t take B ");

                try {
                    TimeUnit.SECONDS.sleep(5);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                blockingQueue.take();
                System.out.println(Thread.currentThread().getName() + "\t take C ");

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "t2").start();
```

最后结果输出为：

```java
t1	 put A 
t2	 take A 

5秒后...

t1	 put B 
t2	 take B 

5秒后...

t1	 put C 
t2	 take C 
```

我们从最后的运行结果可以看出，每次t1线程向队列中添加阻塞队列添加元素后，t1输入线程就会等待 t2消费线程，t2消费后，t2处于挂起状态，等待t1在存入，从而周而复始，形成 一存一取的状态

## 阻塞队列的应用——生产者消费者

一个初始值为0的变量，两个线程对其交替操作，一个加1，一个减1，来5轮

### 传统模式

关于多线程的操作，我们需要记住下面几句

- 线程 操作 资源类
- 判断 干活 通知
- 防止虚假唤醒机制

我们下面实现一个简单的生产者消费者模式，首先有资源类ShareData

```java
/**
 * 资源类
 */
class ShareData {

    private int number = 0;

    private Lock lock = new ReentrantLock();

    private Condition condition = lock.newCondition();

    public void increment() throws Exception{
        // 同步代码块，加锁
        lock.lock();
        try {
            // 判断
            while(number != 0) {
                // 等待不能生产
                condition.await();
            }

            // 干活
            number++;

            System.out.println(Thread.currentThread().getName() + "\t " + number);

            // 通知 唤醒
            condition.signalAll();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    public void decrement() throws Exception{
        // 同步代码块，加锁
        lock.lock();
        try {
            // 判断
            while(number == 0) {
                // 等待不能消费
                condition.await();
            }

            // 干活
            number--;

            System.out.println(Thread.currentThread().getName() + "\t " + number);

            // 通知 唤醒
            condition.signalAll();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

}
```

里面有一个number变量，同时提供了increment 和 decrement的方法，分别让number 加1和减1

但是我们在进行判断的时候，为了防止出现虚假唤醒机制，不能使用if来进行判断，而应该使用while

```java
// 判断
while(number != 0) {
    // 等待不能生产
    condition.await();
}
```

不能使用 if判断

```java
// 判断
if(number != 0) {
    // 等待不能生产
    condition.await();
}
```

完整代码

```java
/**
 * 生产者消费者 传统版
 * 题目：一个初始值为0的变量，两个线程对其交替操作，一个加1，一个减1，来5轮
 * @author: 陌溪
 * @create: 2020-03-16-21:38
 */
/**
 * 线程 操作 资源类
 * 判断 干活 通知
 * 防止虚假唤醒机制
 */

/**
 * 资源类
 */
class ShareData {

    private int number = 0;

    private Lock lock = new ReentrantLock();

    private Condition condition = lock.newCondition();

    public void increment() throws Exception{
        // 同步代码块，加锁
        lock.lock();
        try {
            // 判断
            while(number != 0) {
                // 等待不能生产
                condition.await();
            }

            // 干活
            number++;

            System.out.println(Thread.currentThread().getName() + "\t " + number);

            // 通知 唤醒
            condition.signalAll();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    public void decrement() throws Exception{
        // 同步代码块，加锁
        lock.lock();
        try {
            // 判断
            while(number == 0) {
                // 等待不能消费
                condition.await();
            }

            // 干活
            number--;

            System.out.println(Thread.currentThread().getName() + "\t " + number);

            // 通知 唤醒
            condition.signalAll();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

}
public class ProdConsumerTraditionDemo {

    public static void main(String[] args) {

        // 高内聚，低耦合    内聚指的是，一个空调，自身带有调节温度高低的方法

        ShareData shareData = new ShareData();

        // t1线程，生产
        new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                try {
                    shareData.increment();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }, "t1").start();

        // t2线程，消费
        new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                try {
                    shareData.decrement();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }, "t2").start();
    }
}
```

最后运行成功后，我们一个进行生产，一个进行消费

```java
t1	 1
t2	 0
t1	 1
t2	 0
t1	 1
t2	 0
t1	 1
t2	 0
t1	 1
t2	 0
```

### 生成者和消费者3.0

在concurrent包发布以前，在多线程环境下，我们每个程序员都必须自己去控制这些细节，尤其还要兼顾效率和线程安全，则这会给我们的程序带来不小的时间复杂度

现在我们使用新版的阻塞队列版生产者和消费者，使用：volatile、CAS、atomicInteger、BlockQueue、线程交互、原子引用

```java
/**
 * 生产者消费者  阻塞队列版
 * 使用：volatile、CAS、atomicInteger、BlockQueue、线程交互、原子引用
 *
 * @author: 陌溪
 * @create: 2020-03-17-11:13
 */

class MyResource {
    // 默认开启，进行生产消费
    // 这里用到了volatile是为了保持数据的可见性，也就是当TLAG修改时，要马上通知其它线程进行修改
    private volatile boolean FLAG = true;

    // 使用原子包装类，而不用number++
    private AtomicInteger atomicInteger = new AtomicInteger();

    // 这里不能为了满足条件，而实例化一个具体的SynchronousBlockingQueue
    BlockingQueue<String> blockingQueue = null;

    // 而应该采用依赖注入里面的，构造注入方法传入
    public MyResource(BlockingQueue<String> blockingQueue) {
        this.blockingQueue = blockingQueue;
        // 查询出传入的class是什么
        System.out.println(blockingQueue.getClass().getName());
    }

    /**
     * 生产
     * @throws Exception
     */
    public void myProd() throws Exception{
        String data = null;
        boolean retValue;
        // 多线程环境的判断，一定要使用while进行，防止出现虚假唤醒
        // 当FLAG为true的时候，开始生产
        while(FLAG) {
            data = atomicInteger.incrementAndGet() + "";

            // 2秒存入1个data
            retValue = blockingQueue.offer(data, 2L, TimeUnit.SECONDS);
            if(retValue) {
                System.out.println(Thread.currentThread().getName() + "\t 插入队列:" + data  + "成功" );
            } else {
                System.out.println(Thread.currentThread().getName() + "\t 插入队列:" + data  + "失败" );
            }

            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println(Thread.currentThread().getName() + "\t 停止生产，表示FLAG=false，生产介绍");
    }

    /**
     * 消费
     * @throws Exception
     */
    public void myConsumer() throws Exception{
        String retValue;
        // 多线程环境的判断，一定要使用while进行，防止出现虚假唤醒
        // 当FLAG为true的时候，开始消费
        while(FLAG) {
            // 2秒取出1个data
            retValue = blockingQueue.poll(2L, TimeUnit.SECONDS);
            if(retValue != null && retValue != "") {
                System.out.println(Thread.currentThread().getName() + "\t 消费队列:" + retValue  + "成功" );
            } else {
                FLAG = false;
                System.out.println(Thread.currentThread().getName() + "\t 消费失败，队列中已为空，退出" );

                // 退出消费队列
                return;
            }
        }
    }

    /**
     * 停止生产的判断
     */
    public void stop() {
        this.FLAG = false;
    }

}
public class ProdConsumerBlockingQueueDemo {

    public static void main(String[] args) {
        // 传入具体的实现类， ArrayBlockingQueue
        MyResource myResource = new MyResource(new ArrayBlockingQueue<String>(10));

        new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + "\t 生产线程启动");
            System.out.println("");
            System.out.println("");
            try {
                myResource.myProd();
                System.out.println("");
                System.out.println("");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, "prod").start();


        new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + "\t 消费线程启动");

            try {
                myResource.myConsumer();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }, "consumer").start();

        // 5秒后，停止生产和消费
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("");
        System.out.println("");
        System.out.println("5秒中后，生产和消费线程停止，线程结束");
        myResource.stop();
    }
}
```

最后运行结果

```java
java.util.concurrent.ArrayBlockingQueue
prod	 生产线程启动


consumer	 消费线程启动
prod	 插入队列:1成功
consumer	 消费队列:1成功
prod	 插入队列:2成功
consumer	 消费队列:2成功
prod	 插入队列:3成功
consumer	 消费队列:3成功
prod	 插入队列:4成功
consumer	 消费队列:4成功
prod	 插入队列:5成功
consumer	 消费队列:5成功


5秒中后，生产和消费线程停止，线程结束
prod	 停止生产，表示FLAG=false，生产介绍
```

## Callable

见线程的实现方式

## 阻塞队列的应用——线程池

###  为什么用线程池

线程池做的主要工作就是控制运行的线程的数量，处理过程中，将任务放入到队列中，然后线程创建后，启动这些任务，如果线程数量超过了最大数量的线程，需要排队等候，等其它线程执行完毕，再从队列中取出任务来执行。

它的主要特点为：线程复用、控制最大并发数、管理线程

线程池中的任务是放入到阻塞队列中的

###  线程池的好处

多核处理的好处是：省略的上下文的切换开销

###  架构说明

Java中线程池是通过Executor框架实现的，该框架中用到了Executor，Executors（代表工具类），ExecutorService，**ThreadPoolExecutor**这几个类。**ThreadPoolExecutor是线程池创建的核心类**

![image-20200317175241007](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200317175241007.png)

### 线程池三种常用创建方式（生产环境都不要用）

- Executors.newFixedThreadPool(int i) ：创建一个拥有 i 个线程的线程池，使用`LinkedBlockingQueue`实现
  - 执行长期的任务，性能好很多
  - 创建一个定长线程池，可控制线程最大并发数，超出的线程会在队列中等待
- Executors.newSingleThreadExecutor：创建一个只有1个线程的 单线程池，使用`LinkedBlockingQueue`实现
  - 一个任务一个任务执行的场景
  - 创建一个单线程化的线程池，它只会用唯一的工作线程来执行任务，保证所有任务按照指定顺序执行
- Executors.newCacheThreadPool(); 创建一个可扩容的线程池，使用`SynchronousQueue`实现
  - 执行很多短期异步的小程序或者负载教轻的服务器
  - 创建一个可缓存线程池，如果线程长度超过处理需要，可灵活回收空闲线程，如无可回收，则新建新线程

具体使用，首先我们需要使用Executors工具类，进行创建线程池，这里创建了一个拥有5个线程的线程池

```java
// 一池5个处理线程（用池化技术，一定要记得关闭）
ExecutorService threadPool = Executors.newFixedThreadPool(5);

// 创建一个只有一个线程的线程池
ExecutorService threadPool = Executors.newSingleThreadExecutor();

// 创建一个拥有N个线程的线程池，根据调度创建合适的线程
ExecutorService threadPool = Executors.newCacheThreadPool();
```

###  底层源码

![image-20200317183202992](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200317183202992.png)

底层使用的都是ThreadPoolExecutor，这也是创建自定义线程池的基础

我们可以看到线程池的内部，还使用到了LinkedBlockingQueue 链表阻塞队列

同时在查看Executors.newCacheThreadPool 看到底层用的是 SynchronousBlockingQueue阻塞队列

###  线程池的重要参数

| corePoolSize    | 线程池常驻核心线程数       |
| --------------- | -------------------------- |
| maximumPoolSize | 能够容纳的最大线程数       |
| keepAliveTime   | 空闲线程存活时间           |
| unit            | 存活时间单位               |
| workQueue       | 存放提交但未执行任务的队列 |
| threadFactory   | 创建线程的工厂类           |
| 参数            | 意义                       |
| handler         | 等待队列满后的拒绝策略     |

理解**：线程池的创建参数，就像一个**银行**。

![image-20200317201150197](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200317201150197.png)

### 拒绝策略

以下所有拒绝策略都实现了RejectedExecutionHandler接口

- AbortPolicy：默认，直接抛出RejectedExcutionException异常，阻止系统正常运行
- DiscardPolicy：直接丢弃任务，不予任何处理也不抛出异常，如果运行任务丢失，这是一种好方案
- CallerRunsPolicy：该策略既不会抛弃任务，也不会抛出异常，而是将某些任务回退到调用者
- DiscardOldestPolicy：抛弃队列中等待最久的任务，然后把当前任务加入队列中尝试再次提交当前任务

### 线程池底层工作原理

![image-20200318154414717](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java多线程并发\images\image-20200318154414717.png)

文字说明

1. 在创建了线程池后，等待提交过来的任务请求
2. 当调用execute()方法添加一个请求任务时，线程池会做出如下判断
   1. 如果正在运行的线程池数量小于corePoolSize，那么马上创建线程运行这个任务
   2. 如果正在运行的线程数量大于或等于corePoolSize，那么将这个任务放入队列
   3. 如果这时候队列满了，并且正在运行的线程数量还小于maximumPoolSize，那么还是创建非核心线程like运行这个任务；
   4. 如果队列满了并且正在运行的线程数量大于或等于maximumPoolSize，那么线程池会启动饱和拒绝策略来执行
3. 当一个线程完成任务时，它会从队列中取下一个任务来执行
4. 当一个线程无事可做并且超过一定的时间(keepAliveTime)时，线程池会判断：
   1. 如果当前运行的线程数大于corePoolSize，那么这个线程就被停掉
   2. 所以线程池的所有任务完成后，它会最终收缩到corePoolSize的大小

### 为什么不用默认创建的线程池？

线程池创建的方法有：固定数的，单一的，可变的，那么在实际开发中，应该使用哪个？

我们一个都不用，在生产环境中是使用自己自定义的

为什么不用Executors中JDK提供的？

根据阿里巴巴手册：并发控制这章

- 线程资源必须通过线程池提供，不允许在应用中自行显式创建线程
  - 使用线程池的好处是减少在创建和销毁线程上所消耗的时间以及系统资源的开销，解决资源不足的问题，如果不使用线程池，有可能造成系统创建大量同类线程而导致消耗完内存或者“过度切换”的问题
- 线程池不允许使用Executors去创建，而是通过ThreadToolExecutors的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险
  - Executors返回的线程池对象弊端如下：
    - FixedThreadPool和SingleThreadPool：
      - 运行的请求队列长度为：Integer.MAX_VALUE，可能会堆积大量的请求，从而导致OOM
    - CacheThreadPool和ScheduledThreadPool
      - 运行的请求队列长度为：Integer.MAX_VALUE，可能会堆积大量的请求，从而导致OOM

### 手写线程池

####  采用默认拒绝策略

从上面我们知道，因为默认的Executors创建的线程池，底层都是使用LinkBlockingQueue作为阻塞队列的，而LinkBlockingQueue虽然是有界的，但是它的界限是 Integer.MAX_VALUE 大概有20多亿，可以相当是无界的了，因此我们要使用ThreadPoolExecutor自己手动创建线程池，然后指定阻塞队列的大小

下面我们创建了一个 核心线程数为2，最大线程数为5，并且阻塞队列数为3的线程池

```java
// 手写线程池
        final Integer corePoolSize = 2;
        final Integer maximumPoolSize = 5;
        final Long keepAliveTime = 1L;

        // 自定义线程池，只改变了LinkBlockingQueue的队列大小
        ExecutorService executorService = new ThreadPoolExecutor(
                corePoolSize,
                maximumPoolSize,
                keepAliveTime,
                TimeUnit.SECONDS,
                new LinkedBlockingQueue<>(3),
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.AbortPolicy());
```

然后使用for循环，模拟10个用户来进行请求

```java
      // 模拟10个用户来办理业务，每个用户就是一个来自外部请求线程
        try {

            // 循环十次，模拟业务办理，让5个线程处理这10个请求
            for (int i = 0; i < 10; i++) {
                final int tempInt = i;
                executorService.execute(() -> {
                    System.out.println(Thread.currentThread().getName() + "\t 给用户:" + tempInt + " 办理业务");
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executorService.shutdown();
        }
```

但是在用户执行到第九个的时候，触发了异常，程序中断

```java
pool-1-thread-1	 给用户:0 办理业务
pool-1-thread-4	 给用户:6 办理业务
pool-1-thread-3	 给用户:5 办理业务
pool-1-thread-2	 给用户:1 办理业务
pool-1-thread-2	 给用户:4 办理业务
pool-1-thread-5	 给用户:7 办理业务
pool-1-thread-4	 给用户:2 办理业务
pool-1-thread-3	 给用户:3 办理业务
java.util.concurrent.RejectedExecutionException: Task com.moxi.interview.study.thread.MyThreadPoolDemo$$Lambda$1/1747585824@4dd8dc3 rejected from java.util.concurrent.ThreadPoolExecutor@6d03e736[Running, pool size = 5, active threads = 3, queued tasks = 0, completed tasks = 5]
	at java.util.concurrent.ThreadPoolExecutor$AbortPolicy.rejectedExecution(ThreadPoolExecutor.java:2047)
	at java.util.concurrent.ThreadPoolExecutor.reject(ThreadPoolExecutor.java:823)
	at java.util.concurrent.ThreadPoolExecutor.execute(ThreadPoolExecutor.java:1369)
	at com.moxi.interview.study.thread.MyThreadPoolDemo.main(MyThreadPoolDemo.java:34)
```

这是因为触发了拒绝策略，而我们设置的拒绝策略是默认的AbortPolicy，也就是抛异常的

触发条件是，请求的线程大于 阻塞队列大小 + 最大线程数 = 8 的时候，也就是说第9个线程来获取线程池中的线程时，就会抛出异常从而报错退出。

####  采用CallerRunsPolicy拒绝策略

当我们更好其它的拒绝策略时，采用CallerRunsPolicy拒绝策略，也称为回退策略，就是把任务丢回原来的请求开启线程着，我们看运行结果

```java
pool-1-thread-1	 给用户:0 办理业务
pool-1-thread-5	 给用户:7 办理业务
pool-1-thread-4	 给用户:6 办理业务
main	 给用户:8 办理业务
pool-1-thread-3	 给用户:5 办理业务
pool-1-thread-2	 给用户:1 办理业务
pool-1-thread-3	 给用户:9 办理业务
pool-1-thread-4	 给用户:4 办理业务
pool-1-thread-5	 给用户:3 办理业务
pool-1-thread-1	 给用户:2 办理业务
```

我们发现，输出的结果里面出现了main线程，因为线程池出发了拒绝策略，把任务回退到main线程，然后main线程对任务进行处理

####  采用 DiscardPolicy 拒绝策略

```java
pool-1-thread-1	 给用户:0 办理业务
pool-1-thread-3	 给用户:5 办理业务
pool-1-thread-1	 给用户:2 办理业务
pool-1-thread-2	 给用户:1 办理业务
pool-1-thread-1	 给用户:4 办理业务
pool-1-thread-5	 给用户:7 办理业务
pool-1-thread-4	 给用户:6 办理业务
pool-1-thread-3	 给用户:3 办理业务
```

采用DiscardPolicy拒绝策略会，线程池会自动把后面的任务都直接丢弃，也不报异常，当任务无关紧要的时候，可以采用这个方式

#### 采用DiscardOldestPolicy拒绝策略

```java
pool-1-thread-1	 给用户:0 办理业务
pool-1-thread-4	 给用户:6 办理业务
pool-1-thread-1	 给用户:4 办理业务
pool-1-thread-3	 给用户:5 办理业务
pool-1-thread-2	 给用户:1 办理业务
pool-1-thread-1	 给用户:9 办理业务
pool-1-thread-4	 给用户:8 办理业务
pool-1-thread-5	 给用户:7 办理业务
```

这个策略和刚刚差不多，会把最久的队列中的任务替换掉

### 线程池的合理参数

生产环境中如何配置 corePoolSize 和 maximumPoolSize

这个是根据具体业务来配置的，分为CPU密集型和IO密集型

- CPU密集型

CPU密集的意思是该任务需要大量的运算，而没有阻塞，CPU一直全速运行

CPU密集任务只有在真正的多核CPU上才可能得到加速（通过多线程）

而在单核CPU上，无论你开几个模拟的多线程该任务都不可能得到加速，因为CPU总的运算能力就那些

CPU密集型任务配置尽可能少的线程数量：

一般公式：CPU核数 + 1个线程数

- IO密集型

由于IO密集型任务线程并不是一直在执行任务，则可能多的线程，如 CPU核数 * 2

IO密集型，即该任务需要大量的IO操作，即大量的阻塞

在单线程上运行IO密集型的任务会导致浪费大量的CPU运算能力花费在等待上

所以IO密集型任务中使用多线程可以大大的加速程序的运行，即使在单核CPU上，这种加速主要就是利用了被浪费掉的阻塞时间。

IO密集时，大部分线程都被阻塞，故需要多配置线程数：

参考公式：CPU核数 / (1 - 阻塞系数) 阻塞系数在0.8 ~ 0.9左右

例如：8核CPU：8/ (1 - 0.9) = 80个线程数

## 单例模式

### 为什么要用单例模式

​       对于频繁使用的对象，可以省略创建对象所花费的时间，这对于那些重量级对象而言，是非常可观的一笔系统开销； 由于 new 操作的次数减少，因而对系统内存的使用频率也会降低，这将减轻 GC 压力，缩短 GC 停顿时间

### 实现方式

- 饿汉模式

  ```java
  public class Singleton {
  	private static Singleton instance = new Singleton();
  	private Singleton (){}
   
  	public static Singleton getInstance() {
  		return instance;
  	}
  }
  ```

  优点：让instance在类加载的时候初始化，由于静态变量只会在类加载的时候初始化一次，从而避免多线程初始化的情况。

  缺点：在类加载的时候就会实例化

- 懒汉模式

  ```java
  public class Singleton {
      private static Singleton instance;
      private Singleton (){}
   
      public static Singleton getInstance() {
          if(instance == null) {
              instance = new Singleton();
          }
          return instance;
      }
  }
  ```

  缺点：线程不安全

- 线程安全的懒汉模式

  ```java 
  public class Singleton {
      private static Singleton instance;
      private Singleton (){}
   
      public static synchronized Singleton getInstance() {
          if(instance == null) {
              instance = new Singleton();
          }
          return instance;
      }
  }
  ```

  缺点：效率低下

- 静态内部类单例模式（静态内部实现的单例是懒加载的且线程安全）

  ```java
  public class Singleton {
      private static class SingletonHolder{
          private static final Singleton INSTANCE = new Singleton();
      }
      private Singleton (){}
   
      public static Singleton getInstance() {
          return SingletonHolder.INSTANCE;
      }
  }
  ```

  优点：

  由于静态内部类跟外部类是平级的，所以外部类加载的时候不会影响内部类，因此实现了lazy loading；

  同时也是利用静态变量的方式，使得INSTANCE只会在SingletonHolder加载的时候初始化一次，从而保证不会有多线程初始化的情况，因此也是线程安全的。
  这个也是最合理最常规的实现单例模式的方式，推荐。

- **双检锁模式**

  ```java
  public class Singleton {
      private static volatile Singleton instance;
      private Singleton (){}
   
      public static Singleton getInstance() {
          if(instance == null) {
              synchronized (Singleton.class) {
                  if(instance == null) {
                      instance = new Singleton();
                  }
              }
          }
          return instance;
      }
  }
  ```

# 面试题：

### Wait和Sleep的区别：

它们最大本质的区别是，Sleep()不释放同步锁，Wait()释放同步锁。

还有用法的上的不同是：Sleep(milliseconds)可以用时间指定来使他自动醒过来，如果时间不到你只能调用Interreput()来强行打断；Wait()可以用Notify()直接唤起。

这两个方法来自不同的类分别是Thread和Object

最主要是Sleep方法没有释放锁，而Wait方法释放了锁，使得其他线程可以使用同步控制块或者方法。 

### Thread.sleep() 和Thread.yield()的异同

相同 ：Sleep()和yield()都会释放CPU。

不同：Sleep()使当前线程进入停滞状态，所以执行Sleep()的线程在指定的时间内肯定不会执行；yield()只是使当前线程重新回到可执行状态，所以执行yield()的线程有可能在进入到可执行状态后马上又被执行。Sleep()可使优先级低的线程得到执行的机会，当然也可以让同优先级和高优先级的线程有执行的机会；yield()只能使同优先级的线程有执行的机会。 

### **并发和并行的区别**

并发：是指在某个时间段内，多任务交替的执行任务。当有多个线程在操作时，把CPU运行时间划分成若干个时间段,再将时间段分配给各个线程执行。在一个时间段的线程代码运行时，其它线程处于挂起状。

并行：是指同一时刻同时处理多任务的能力。当有多个线程在操作时，CPU同时处理这些线程请求的能力。

区别就在于CPU是否能同时处理所有任务，并发不能，并行能。

### **线程安全三要素**

- 原子性：Atomic包、CAS算法、Synchronized、Lock。
- 可见性：Synchronized、Volatile（不能保证原子性）。
- 有序性：Happens-before规则。

### reetrantlock与synchronized的区别？性能差异？

 锁的实现：
            Synchronized是依赖于JVM实现的，而ReenTrantLock是JDK实现的，类似于操作系统来控制实现和用户自己敲代码实现的区别。前者的实现是比较难见到的，后者有直接的源码可供阅读。

性能的区别：

​             在Synchronized优化以前，synchronized的性能是比ReenTrantLock差很多的，但是自从Synchronized引入了偏向锁，轻量级锁（自旋锁）后，两者的性能就差不多了，在两种方法都可用的情况下，官方甚至建议使用synchronized，其实synchronized的优化我感觉就借鉴了ReenTrantLock中的CAS技术。都是试图在用户态就把加锁问题解决，避免进入内核态的线程阻塞

便利性：

很明显Synchronized的使用比较方便简洁，并且由编译器去保证锁的加锁和释放，而ReenTrantLock需要手工声明来加锁和释放锁，为了避免忘记手工释放锁造成死锁，所以最好在finally中声明释放锁。

锁的细粒度和灵活度：很明显ReenTrantLock优于Synchronized

ReenTrantLock独有的能力：

    1.ReenTrantLock可以指定是公平锁还是非公平锁。而synchronized只能是非公平锁。
    2.ReenTrantLock提供了一个Condition（条件）类，用来实现分组唤醒需要唤醒的线程们，而不是像synchronized要么随机唤醒一个线程要么唤醒全部线程。
    3.ReenTrantLock提供了一种能够中断等待锁的线程的机制，通过lock.lockInterruptibly()来实现这个机制。

volatile和synchronized的区别（https://blog.csdn.net/suchahaerkang/article/details/80456085）

 1.volatile本质是在告诉jvm当前变量在寄存器中的值是不确定的,需要从主存中读取,synchronized则是锁定一个对象,当前线程访问该变量,其他线程阻塞.

 2.volatile仅能使用在变量级别,synchronized则可以使用在方法级别.

 3.volatile仅能实现变量的修改可见性,而synchronized则可以保证变量的修改可见性和原子性. 
　　 
 4.volatile不会造成线程的阻塞,而synchronized可能会造成线程的阻塞.

  5.当一个域的值依赖于它之前的值时，volatile就无法工作了，如n=n+1,n++等。
                                         如果某个域的值受到其他域的值的限制，那么volatile也无法工作，如Range类的lower和upper边界，必须遵循lower<=upper的限制。