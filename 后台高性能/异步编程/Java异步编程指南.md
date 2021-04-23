在我们平时开发中或多或少都会遇到需要调用接口来完成一个功能的需求，这个接口可以是内部系统也可以是外部的，然后等到接口返回数据了才能继续其他的业务流程，这就是传统的**同步**模式。

同步模式虽然简单但缺点也很明显，如果对方服务处理缓慢迟迟未能返回数据，或网络问题导致响应变长，就会阻塞我们调用方的线程，导致我们主流程的耗时latency延长，传统的解决方式是增加接口的超时timeout设置，防止无限期等待。但即使这样还是会占用CPU资源。

在我们做rpc远程调用，redis，数据库访问等比较耗时的网络请求时经常要面对这样的问题，这种业务场景我们可以引入**[异步](http://javakk.com/tag/异步)**的编程思想，即主流程不需要阻塞等待接口返回数据，而是继续往下执行，当真正需要这个接口返回结果时再通过**[回调](http://javakk.com/tag/回调)**或阻塞的方式获取，此时我们的主流程和[异步](http://javakk.com/tag/异步)任务是并行执行的。

Java中实现[异步](http://javakk.com/tag/异步)主要是通过[Future](http://javakk.com/tag/future)，[CompletableFuture](http://javakk.com/tag/completablefuture)，Guava [ListenableFuture](http://javakk.com/tag/listenablefuture)以及一些异步响应式框架如RxJava实现。

下面我们主要看下这几种组件适用的业务场景和需要注意的地方，避免踩坑。

# **一. Future**

java.util.concurrent.Future是JDK5引入的，用来获取一个异步计算的结果。你可以使用isDone方法检查计算是否完成，也可以使用get阻塞住调用线程，直到计算完成返回结果，你也可以使用cancel方法停止任务的执行。

![Java异步编程指南](http://javakk.com/wp-content/uploads/2020/03/javakk.com_2020-03-01_22-22-12.png)



Future的api说明

实际开发中我们一般会结合线程池的submit配合使用，代码如下：

```java
package com.javakk;

import java.util.concurrent.*;

public class FutureTest {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newCachedThreadPool(); // 线程池
        Future<String> future = executor.submit(() ->{
            Thread.sleep(200); // 模拟接口调用，耗时200ms
            return "hello world";
        });
        // 在输出下面异步结果时主线程可以不阻塞的做其他事情
        // TODO 其他业务逻辑

        System.out.println("异步结果:"+future.get()); //主线程获取异步结果
        // 或者通过下面轮询的方式
        // while(!future.isDone());
    }
}

// 输出结果：
异步结果:hello world
```

简单的说我有一个任务，提交给了Future，Future替我完成这个任务，这期间我可以去做别的事情。一段时间之后，我再从Future取出结果。

上面的代码有2个地方需要注意，在15行不建议使用future.get()方式，而应该使用future.get(long timeout, TimeUnit unit), **尤其是在生产环境一定要设置合理的超时时间，防止程序无限期等待下去。另外就是要考虑异步任务执行过程中报错抛出异常的情况，需要捕获future的异常信息。**

通过代码可以看出一些简单的异步场景可以使用Future解决，但是对于结果的获取却不是很方便，只能通过阻塞或者轮询的方式得到任务的结果。阻塞的方式相当于把异步变成了同步，显然和异步编程的初衷相违背，轮询的方式又会浪费CPU资源。

**Future没有提供通知的机制，就是[回调](http://javakk.com/tag/回调)，我们无法知道它什么时间完成任务**。

而且在复杂一点的情况下，比如多个异步任务的场景，一个异步任务依赖上一个异步任务的执行结果，异步任务合并等，Future无法满足需求。

# **二. [ListenableFuture](http://javakk.com/tag/listenablefuture)**

Google并发包下的listenableFuture对Java原生的future做了扩展，顾名思义就是使用监听器模式实现的[回调](http://javakk.com/tag/回调)，所以叫可监听的future。

在我们公司早期的项目里(jdk8之前的版本)都是使用listenableFuture来实现异步编程。

要使用listenableFuture还要结合MoreExecutor线程池，MoreExecutor是对Java原生线程池的封装，比如常用的MoreExecutors.listeningDecorator(threadPool); 修改Java原生线程池的submit方法，封装了future返回listenableFuture。

代码示例如下：

```java
// ListeningExecutorService继承jdk的ExecutorService接口，重写了submit方法，修改返回值类型为ListenableFuture
ListeningExecutorService executor = MoreExecutors.listeningDecorator(Executors.newCachedThreadPool());
ListenableFuture<String> listenableFuture = executor.submit(() -> {
    Thread.sleep(200); // 模拟接口调用，耗时200ms
    return "hello world";
});
```

上面的代码是构造了一个ListenableFuture的异步任务，调用它的结果一般有两种方式：

基于addListener：

```java
listenableFuture.addListener(() -> {
    try {
        System.out.println("异步结果:" + listenableFuture.get());
    } catch (Exception e) {
        e.printStackTrace();
    }
}, executor);

// 输出结果：
异步结果:hello world
```

基于add[Callback](http://javakk.com/tag/callback)：

```java
Futures.addCallback(listenableFuture, new FutureCallback<String>() {
    @Override
    public void onSuccess(String result) {
        System.out.println("异步结果:" + result);
    }

    @Override
    public void onFailure(Throwable t) {
        t.printStackTrace();
    }
}, executor);

// 输出结果：
异步结果:hello world
```

其实两种方式都是基于回调，具体使用哪种看业务场景。

- addListener需要自己代码里捕获处理异常情况，最好设置超时时间
- addCallback把正常返回和异常情况做了分离，方便我们针对不同情况做处理

另外Futures里还有很多其他的api，可以满足我们负责场景，比如transform()可以处理异步任务之间的依赖情况，allAsList()将多个ListenableFuture合并成一个。

# **三. CompletableFuture**

如果你们公司的jdk是8或以上的版本，那可以直接使用CompletableFuture类来实现异步编程。

Java8新增的CompletableFuture类借鉴了Google Guava的ListenableFuture，它包含50多个方法，默认使用forkJoinPool线程池，提供了非常强大的Future扩展功能，可以帮助我们简化异步编程的复杂性，结合函数式编程，通过回调的方式处理计算结果，并且提供了转换和组合CompletableFuture的多种方法，可以满足大部分异步回调场景。

![Java异步编程指南](http://javakk.com/wp-content/uploads/2020/03/javakk.com_2020-03-01_22-22-10.png)



CompletableFuture的api

虽然方法很多但有个特征：

- 以Async结尾的方法签名表示是在异步线程里执行，没有以Async结尾的方法则是由主线程调用
- 如果参数里有Runnable类型，则没有返回结果，即纯消费的方法
- 如果参数里没有指定executor则默认使用forkJoinPool线程池，指定了则以指定的线程池来执行任务

下面就来看下常用的几种api代码示例：

### **转换 : thenApplyAsync**

```java
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() ->
    "hello"
);
// f2依赖f1的结果做转换
CompletableFuture<String> f2 = f1.thenApplyAsync(t ->
    t + " world"
);
System.out.println("异步结果:" + f2.get());

// 输出结果：
异步结果:hello world
```

**这里先说明一下，示例代码只关注核心功能，如果要实际使用需要考虑超时和异常情况，大家需要注意。**

在上面的代码中异步任务f2需要异步任务f1的结果才能执行，但对于我们的主线程来说，无须等到f1返回结果后再调用函数f2，即不会阻塞主流程，而是告诉CompletableFuture当执行完了f1的方法再去执行f2，只有当需要最后的结果时再获取。

### **组合 : thenComposeAsync**

```java
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() ->
    "hello"
);
// f2虽然依赖f1的结果，但不会等待f1结果返回，而是再包装成一个future返回
CompletableFuture<String> f2 = f1.thenComposeAsync(t ->
    CompletableFuture.supplyAsync(() ->
            t + " world"
    )
);
// 等到真正调用的时候再执行f2里的逻辑
System.out.println("异步结果:" + f2.get());

// 输出结果：
异步结果:hello world
```

通过代码注释能看出thenCompose相当于flatMap,避免CompletableFuture<CompletableFuture<String>>这种写法。

这也是thenCompose和thenApply的区别，通过查看api也能看出：

thenApply：

```java
public <U> CompletableFuture<U> thenApply(
    Function<? super T,? extends U> fn) {
    return uniApplyStage(null, fn);
}
```

thenCompose：

```java
public <U> CompletableFuture<U> thenCompose(
    Function<? super T, ? extends CompletionStage<U>> fn) {
    return uniComposeStage(screenExecutor(executor), fn);
}
```

### **合并 : thenCombineAsync**

```java
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "hello";
});
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return " world";
});
CompletableFuture<String> f3 = f1.thenCombineAsync(f2, (t1, t2) ->
    t1 + t2
);
long time = System.currentTimeMillis();
System.out.println("异步结果:" + f3.get());
System.out.println("耗时:" + (System.currentTimeMillis() - time));

// 输出结果：
异步结果:hello world
耗时:1002
```

从代码输出结果可以看到两个异步任务f1、f2是并行执行，彼此无先后依赖顺序，thenCombineAsync适合将两个并行执行的异步任务的结果合并返回成一个新的future。

还有一个类似的方法thenAcceptBoth也是合并两个future的结果，但是不会返回新的值，内部消费掉了。

### **二选一 : applyToEitherAsync**

```java
Random rand = new Random();
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000 + rand.nextInt(1000)); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "hello";
});
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000 + rand.nextInt(1000)); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "world";
});
CompletableFuture<String> f3 = f1.applyToEitherAsync(f2, t -> t);
long time = System.currentTimeMillis();
System.out.println("异步结果:" + f3.get());
System.out.println("耗时:" + (System.currentTimeMillis() - time));
```

输出的结果有时候是hello 有时候是world，哪个future先执行完就根据它的结果计算，取两个future最先返回的。

这里要说明一点，**如果两个future是同时返回结果，那么applyToEitherAsync永远以第一个future的结果为准**，大家可以把上面代码的Thread.sleep注释掉测试下。

另外acceptEither方法和这个类似，但是没有返回值。

### **allOf / anyOf**

前面讲的compose,combine,either都是处理两个future的方法，如果是超过2个的可以使用allOf或anyOf

allOf:

```java
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "hello";
});
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "world";
});
CompletableFuture<String> f3 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "java老k";
});
List<CompletableFuture<String>> list = new ArrayList<>();
list.add(f1);
list.add(f2);
list.add(f3);

CompletableFuture<Void> f4 = CompletableFuture.allOf(list.toArray(new CompletableFuture[]{}));
long time = System.currentTimeMillis();
f4.thenRunAsync(() ->
    list.forEach(f -> {
        try {
            System.out.println("异步结果:" + f.get());
        } catch (Exception e) {
            e.printStackTrace();
        }
    })
);
f4.get();
System.out.println("耗时:" + (System.currentTimeMillis() - time));
// 输出结果：
耗时:1004
异步结果:hello
异步结果:world
异步结果:java老k
```

allOf方法是当所有的CompletableFuture都执行完后执行计算，无返回值。

anyOf:

```java
Random rand = new Random(); // 随机数
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000 + rand.nextInt(1000)); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "hello";
});
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000 + rand.nextInt(1000)); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "world";
});
CompletableFuture<String> f3 = CompletableFuture.supplyAsync(() -> {
    try {
        Thread.sleep(1000 + rand.nextInt(1000)); // 模拟接口调用耗时1秒
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    return "java老k";
});

CompletableFuture<Object> f4 = CompletableFuture.anyOf(f1, f2, f3);
long time = System.currentTimeMillis();
System.out.println("异步结果:" + f4.get());
System.out.println("耗时:" + (System.currentTimeMillis() - time));

// 输出结果：
异步结果:java老k
耗时:1075
```

多次执行输出的结果不一样，anyOf方法当任意一个CompletableFuture执行完后就会执行计算。

虽然说CompletableFuture更适合I/O场景，**但使用时一定要结合具体业务，比如说有些公共方法处理异步任务时需要考虑异常情况，这时候使用CompletableFuture.handle(BiFunction<? super T, Throwable, ? extends U> fn)更合适，handle方法会处理正常计算值和异常，因此它可以屏蔽异常，避免异常继续抛出**。

CompletableFuture还有一个坑需要注意：**如果线上流量比较大的情况下会出现响应缓慢的问题。**

因为CompletableFuture默认使用的线程池是forkJoinPool，当时对一台使用了CompletableFuture实现异步回调功能的接口做压测，通过监控系统发现有大量的[ForkJoinPool](http://javakk.com/tag/forkjoinpool).commonPool-worker-* 线程处于等待状态，进一步分析dump信息发现是forkJoinPool的makeCommonPool问题，如下图：

![Java异步编程指南](http://javakk.com/wp-content/uploads/2020/03/javakk.com_2020-03-01_22-22-09-1.png)

![Java异步编程指南](http://javakk.com/wp-content/uploads/2020/03/javakk.com_2020-03-01_22-22-09.png)

看到这大家应该清楚了，如果在项目里没有设置java.util.concurrent.[ForkJoinPool](http://javakk.com/tag/forkjoinpool).common.parallelism的值，那么forkJoinPool线程池的线程数就是(cpu-1)，我们测试环境的机器是2核，**这样实际执行任务的线程数只有1个，当有大量请求过来时，如果有耗时高的io操作，势必会造成更多的线程等待，进而拖累服务响应时间。**

解决方案一个是设置java.util.concurrent.[ForkJoinPool](http://javakk.com/tag/forkjoinpool).common.parallelism这个值(要在项目启动时指定)，或者指定线程池不使用默认的forkJoinPool。

forkJoinPoll线程池不了解的可以看下这篇文章：[线程池ForkJoinPool简介](http://javakk.com/215.html)

线程数如何设置可以参考《Java并发编程实战》这本书给出的建议，如下图：

![Java异步编程指南](http://javakk.com/wp-content/uploads/2020/03/javakk.com_2020-03-01_22-22-08.png)

[线程池设置线程数公式](http://javakk.com/tag/线程池设置线程数公式)

就是这个公式：

threads = N CPU * U CPU * (1 + W/C)

其中：

- N CPU 是处理器的核数
- U CPU 是期望的CPU利用率（介于0和1之间）
- W/C是等待时间与计算时间的比率

网上也有这么区分的：

如果服务是cpu密集型的，设置为电脑的核数

如果服务是io密集型的，设置为电脑的核数*2

**其实我觉得并不严谨，尤其是io密集型的还要参考QPS和web服务器的配置。**

线程池使用不当造成的后果和分析可以在推荐阅读里了解。

今天主要讲了java实现异步编程的几种方式，大家可以结合自己的实际情况参考，下次有时间会跟大家分享下我们另外一个项目如何使用RxJava实现的全异步化服务。

(其实JDK9又对CompletableFuture增强了一些方法，感兴趣的可以自己看下源码)