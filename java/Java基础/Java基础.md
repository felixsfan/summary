





# 内部类

## 成员内部类

## 局部内部类

## 静态内部类

## 匿名内部类

# 代码块

普通代码块：在方法或语句中出现的{}，就被称为代码块

静态代码块：静态代码块有且仅加载一次，也就是在这个类被加载至内存的时候

普通代码块和一般语句执行顺序由他们在代码中出现的次序决定，先出现先执行

## 代码一

```java
/**
 * 代码块
 * 普通代码块：在方法或语句中出现的{}，就被称为代码块
 * 普通代码块和一般语句执行顺序由他们在代码中出现的次序决定，先出现先执行
 *
 * @author: 陌溪
 * @create: 2020-04-03-9:51
 */
public class CodeBlock {
    public static void main(String[] args) {
        {
            int x = 11;
            System.out.println("普通代码块中的变量X=" + x);
        }

        {
            int y = 13;
            System.out.println("普通代码块中的变量y=" + y);
        }

        int x = 12;
        System.out.println("主方法中的变量x=" + x);
    }
}
```

对于上述方法，我们一下就能看出它的输出结果

```java
普通代码块中的变量X=11
普通代码块中的变量y=13
主方法中的变量x=12
```

## 代码二

而对于下面的代码，我们调用了类的初始化，同时在类里也写了两个代码块

```java
/**
 * 代码块
 * @author: 陌溪
 * @create: 2020-04-03-9:51
 */
public class CodeBlock02 {
    {
        System.out.println("第二构造块33333");
    }

    public  CodeBlock02() {
        System.out.println("构造方法2222");
    }

    {
        System.out.println("第一构造块33333");
    }

    public static void main(String[] args) {
        new CodeBlock02();
        System.out.println("==========");
        new CodeBlock02();
    }
}
```

这里需要谈的就是，类加载机制了，因为我们都知道，当我们实例化一个类的时候

启动调用的就是这个类的构造方法，但是比构造方法更上一级的是跟本构造方法在同一个类的代码块，因此

- **代码块的优先级比构造方法高**
- **构造代码块在每次创建对象的时候都会被调用，并且构造代码块的执行次序优先于构造方法**

## 代码三

```java
/**
 * 代码块
 *
 * @author: 陌溪
 * @create: 2020-04-03-9:51
 */

/**
 * 随从类
 */
class Code {
    public Code() {
        System.out.println("Code的构造方法1111");
    }

    {
        System.out.println("Code的构造代码块22222");
    }

    static {
        System.out.println("Code的静态代码块33333");
    }
}
public class CodeBlock03 {

    {
        System.out.println("CodeBlock03的构造代码块22222");
    }

    static {
        System.out.println("CodeBlock03的静态代码块33333");
    }

    public CodeBlock03() {
        System.out.println("CodeBlock03的构造方法33333");
    }

    public static void main(String[] args) {

        System.out.println("我是主类======");
        new Code();
        System.out.println("======");
        new Code();
        System.out.println("======");
        new CodeBlock03();
    }
}
```

输出结果

```
CodeBlock03的静态代码块33333
我是主类======
Code的静态代码块33333
Code的构造代码块22222
Code的构造方法1111
======
Code的构造代码块22222
Code的构造方法1111
======
CodeBlock03的构造代码块22222
CodeBlock03的构造方法33333
```

从上面的结果可以看出，但这个类被加载到内存的时候，首先需要执行的是静态方法，也就是static方法在类被实例化之前，就已经完成了，和以后的实例化都没有关系了，因此我们能够看到，被第一个输出，同时静态代码块有且仅加载一次，但我们需要运行main方法的时候，就需要等CodeBlock03加载好，因此能够看到下面的输出了

```
CodeBlock03的静态代码块33333
```

同时但我们实例化 Code类的时候，这个类也会首先被加载到内存中，然后也是首先运行静态代码块

```
Code的静态代码块33333
Code的构造代码块22222
Code的构造方法1111
```

再次实例化的时候，因此该类已经在内存中，所以不再运行静态代码块了

```
Code的构造代码块22222
Code的构造方法1111
```

最后在实例化CodeBlock03，因为CodeBlock03也已经被加载内存中

```
CodeBlock03的构造代码块22222
CodeBlock03的构造方法33333
```

## 代码四

```java
/**
 * 代码块
 *
 * @author: 陌溪
 * @create: 2020-04-03-9:51
 */
class Father {
    {
        System.out.println("我是父亲代码块");
    }
    public Father() {
        System.out.println("我是父亲构造");
    }
    static {
        System.out.println("我是父亲静态代码块");
    }
}
class Son extends Father{
    public Son() {
        System.out.println("我是儿子构造");
    }
    {
        System.out.println("我是儿子代码块");
    }

    static {
        System.out.println("我是儿子静态代码块");
    }
}
public class CodeBlock04 {

    public static void main(String[] args) {

        System.out.println("我是主类======");
        new Son();
        System.out.println("======");
        new Son();
        System.out.println("======");
        new Father();
    }
}
```

输出结果

```
我是主类======
我是父亲静态代码块
我是儿子静态代码块
我是父亲代码块
我是父亲构造
我是儿子代码块
我是儿子构造
======
我是父亲代码块
我是父亲构造
我是儿子代码块
我是儿子构造
======
我是父亲代码块
我是父亲构造
```

1. 任何一个类被加载，必须加载这个类的静态代码块
2. 在子类初始化之前，还需要调用父类构造，所以父类需要加载进内存，也就是从父到子，静态执行，并且只加载一次
3. 然后父类在进行实例化，在调用构造方法之前，需要调用本类的代码块
4. 最后父类初始化成功后，在调用子类的
5. 在执行第二次的 new Son()的时候，因为该类已经被装载在内存中了，因此静态代码块不需要执行，我们只需要从父到子执行即可
6. 同理在执行new Father()的时候也是一样的，只需要执行Father的实例化符串

# Object类里面的方法

​                       clone方法 
​                       getClass方法
​                       toString方法
​                       finalize方法
​                       equals方法
​                       hashCode方法
​                       wait方法
​                       notify方法
​                       notifyAll方法

# final关键字

**Java里final为什么不可变**

 对于final域，编译器和处理器要遵守两个重排序规则：

1. 在构造函数内对一个final域的写入，与随后把这个被构造对象的引用赋值给一个引用变量，这两个操作之间不能重排序。（先写入final变量，后调用该对象引用）

   ​    原因：编译器会在final域的写之后，插入一个StoreStore屏障

2. 初次读一个包含final域的对象的引用，与随后初次读这个final域，这两个操作之间不能重排序。（先读对象的引用，后读final变量）
   　 原因:编译器会在读final域操作的前面插入一个LoadLoad屏障  

# java值传递

Java是值传递,只是有时引用类型看起来是引用传递 
https://www.cnblogs.com/JackpotHan/p/10114046.html

# 字符串

## String

### String常用方法总结

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\String类的19个方法.png)

### String为什么设计成final不可变？

String类被final修饰，是不可继承和修改的。当一个String变量被第二次赋值时，不是在原有内存地址上修改数据，而是在内存中重新开辟一块内存地址，并指向新地址.
 **原因:**

- 不可变性支持线程安全。
- 　不可变性支持字符串常量池，提升性能。
- 　String字符串作为最常用数据类型之一，不可变防止了随意修改，保证了数据的安全性。

 **实现:**
 首先，String类是用final关键字修饰，这说明String不可继承。

 其次，再看下面，String类的主力成员字段value是个char[]数组，而且是用final修饰的。final修饰的字段创建以      

 后就不可改变。

## StringBuffer

**StringBuffer长度可变,初始容量可以容纳16个字符或者指定长度+16**

### StringBuffer类的构造器

StringBuffer()初始容量为16的字符串缓冲区
StringBuffer(int size)构造指定容量的字符串缓冲区
StringBuffer(String str)将内容初始化为指定字符串内容
StringBuffer的底层实现，其能够实现可变序列的原因就是，在声明的时候，先给你一个char[]数组的长度，然后再你添加的时候，如果数组长度不够，再增加

### 扩容机制

当StringBuffer达到最大容量的时候，它会将自身容量增加到当前的2倍再加2

### StringBuffer和StringBuilder

StringBuilder -> 多线程 效率高 可能 -----> 并发错误
StringBuffer -> 单线程 效率低 安全

# 常量池

## 运行时常量池 

 **存在于内存的元空间中**

诞生时间：JVM运行时

内容概要：class文件元信息描述，编译后的代码数据，引用类型数据，类文件常量池。

所谓的运行时常量池其实就是将编译后的类信息放入运行时的一个区域中，用来动态获取类信息。

运行时常量池是在类加载完成之后，将每个class常量池中的符号引用值转存到运行时常量池中，也就是说，每个class都有一个运行时常量池，类在解析之后，将符号引用替换成直接引用，与全局常量池中的引用值保持一致。

## 字符串常量池

**存在于堆中**，JDK 1.7 和 1.8 将字符串常量由永久代转移到堆中，并且 JDK 1.8 中已经不存在永久代

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\字符串常量池.png)

- str1==str2 指向同一个堆对象，同时创建了一个常量池引用。
- str3 创建了3个堆对象，只创建了一个常量池引用。
- str4 创建了2个堆对象，其中有个对象的value引用另一个的value地址，并未创建常量池引用。

# 集合

## 集合框架体系

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\集合框架体系.jpg)

## 集合的比较机制

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\JCF-集合内容汇总.png)

## HashMap和HashSet的比较机制

### ![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\HashSet添加元素的完整流程.PNG)

## HashMap

### 基础知识点

   1.HashMap 根据键的 hashCode （Native 修饰的本地方法）值存储数据，大多数情况下可以直接定位到它的值，因而具有很快的访问速度，但遍历顺序却是不确定的。 **HashMap 最多只允许一条记录的键为 null ，允许多条记录的值为 null** 。

2. ​    初始容量大小：16    扩容*2
   ​            
   ​                加载因子：0.75  时间跟空间上达到一个平衡
   ​            
   ​            ​    当元素个数超过（容量*加载因子）时扩容
   ​            
   ​            ​    JDK1.8当链表长度达到8转化成红黑树，小于6时再转成链表
   ​            
   
               ![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\hashmap.jpg)

### 安全性

   HashMap 非线程安全，即任一时刻可以有多个线程同时写 HashMap，可能会导致数据的不一致。如果需要满足线程安全，可以用 Collections的synchronizedMap 方法使 HashMap 具有线程安全的能力，或者使用ConcurrentHashMap。

   线程不安全存在的问题：**环形死循环、和无法保证上一秒put的值，下一秒get的时候还是原值，所以线程安全还是无法保证。**

   成环问题：JDK1.8尾插法可以解决

### HashMap 存储结构

```java
 1// Node<K,V> 类用来实现数组及链表的数据结构
 2 　 static class Node<K,V> implements Map.Entry<K,V> {
 3         final int hash; //保存节点的 hash　值
 4         final K key; //保存节点的　key　值
 5         V value;　//保存节点的　value 值
 6         Node<K,V> next;　//指向链表结构下的当前节点的　next 节点，红黑树　TreeNode　节点中也有用 
 7 
 8         Node(int hash, K key, V value, Node<K,V> next) {
 9             this.hash = hash;
10             this.key = key;
11             this.value = value;
12             this.next = next;
13         }
14 
15         public final K getKey()        { }
16         public final V getValue()      {  }
17         public final String toString() { }
18 
19         public final int hashCode() {           
20         }
21 
22         public final V setValue(V newValue) {          
23         }
24 
25         public final boolean equals(Object o) {            
26         }
27     }
28     
29     public class LinkedHashMap<K,V> {
30           static class Entry<K,V> extends HashMap.Node<K,V> {
31                 Entry<K,V> before, after;
32                 Entry(int hash, K key, V value, Node<K,V> next) {
33                     super(hash, key, value, next);
34                 }    
35             }
36     }    
37     
38 　// TreeNode<K,V> 继承 LinkedHashMap.Entry<K,V>，用来实现红黑树相关的存储结构
39     static final class TreeNode<K,V> extends LinkedHashMap.Entry<K,V> {
40         TreeNode<K,V> parent;  // 存储当前节点的父节点
41         TreeNode<K,V> left;　//存储当前节点的左孩子
42         TreeNode<K,V> right;　//存储当前节点的右孩子
43         TreeNode<K,V> prev;    // 存储当前节点的前一个节点
44         boolean red;　// 存储当前节点的颜色（红、黑）
45         TreeNode(int hash, K key, V val, Node<K,V> next) {
46             super(hash, key, val, next);
47         }
48 }
```



### JDK1.7到JDK１.８的优化

HashMap做了优化，发生了很大变化。

- JDK1.7的HashMap当出现Hash碰撞的时候，最后插入的元素会放在前面，这个称为 “头插法”  ，在JDK1.8以后，由头插法改成了尾插法，**因为头插法还存在一个死链的问题**  

  ```java
  JDK7用头插是考虑到了一个所谓的热点数据的点(新插入的数据可能会更早用到)，但这其实是个伪命题,因为JDK7中rehash的时候，旧链表迁移新链表的时候，如果在新表的数组索引位置相同，则链表元素会倒置(就是因为头插) 所以最后的结果 还是打乱了插入的顺序 所以总的来看支撑JDK7使用头插的这点原因也不足以支撑下去了 所以就干脆换成尾插 一举多得
  ```

- 由JDK1.7的，数组 + 链表 

  JDK1.8变为：数组 + 链表 + 红黑树

-  JDK1.7采用Entry类仅仅只是换了名字

   JDK1.8的数组元素 & 链表节点 采用 `Node`类实现

- JDK1.7在扩容后，都需按照原来方法重新计算，即
  `hashCode（）`->> 扰动处理 ->>`（h & length-1）`）

​       JDK1.8根据位运算的规则快速定位，效率高

### JDK1.8扩容resize()

resize()　方法中比较重要的是链表和红黑树的 rehash 操作，先来说下 rehash 的实现原理：

我们在扩容的时候，一般是把长度扩为原来2倍，所以，元素的位置要么是在原位置，要么是在原位置再移动2次幂的位置。看下图可以明白这句话的意思，n为table的长度，图（a）表示扩容前的key1和key2两种key确定索引位置的示例，图（b）表示扩容后key1和key2两种key确定索引位置的示例，其中hash1是key1对应的哈希与高位运算结果。

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\扩容.jpg)

　元素在重新计算hash之后，因为n变为2倍，那么n-1的mask范围在高位多1bit(红色)，因此新的index就会发生这样的变化：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\扩容1.jpg)

因此，我们在扩充HashMap的时候，只需要看看原来的hash值新增的那个bit是1还是0就好了，是0的话索引没变，是1的话索引变成“原索引+oldCap”，可以看看下图为16扩充为32的resize示意图：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\扩容2.jpg)

 这个算法很巧妙，既省去了重新计算hash值的时间，而且同时，由于新增的1bit是0还是1可以认为是随机的，因此resize的过程，均匀的把之前的冲突的节点分散到新的槽中了。

### JDK1.7出现死循环的原因

 C:\Users\felixsfan\Desktop\Java基础＼JDK1.7HashMap成环原因.md

### hash函数的实现

JDK 1.8 中，是通过 **hashCode() 的高 16 位异或低 16 位实现**的：(h = k.hashCode()) ^ (h >>> 16)，主要是从速度，功效和质量来考虑的，减少系统的开销，也不会造成因为高位没有参与下标的计算，从而引起的碰撞。同时异或运算保证了对象的 hashCode 的 32 位值只要有一位发生改变，整个 hash() 返回值就会改变。尽可能的减少碰撞。

### HashMap容量为什么总是为2的次幂？

- (n - 1) & hash，当n为2次幂时，会满足一个公式：(n - 1) & hash = hash % n，位运算效率高
- 2的次幂是偶数，减1后二进制末尾是1，&运算可以减少冲突

### HashMap 和 HashTable 有什么区别？

- HashMap 是线程不安全的，HashTable 是线程安全的；
- 由于线程安全，所以 HashTable 的效率比不上 HashMap；
- HashMap最多只允许一条记录的键为null，允许多条记录的值为null，而 HashTable不允许；
- HashMap 默认初始化数组的大小为16，HashTable 为 11，前者扩容时，扩大两倍，后者扩大两倍+1；
- HashMap 需要重新计算 hash 值，而 HashTable 直接使用对象的 hashCode

## ConcurrentHashMap

**针对 ConcurrentHashMap，在 JDK 1.7 中采用 分段锁的方式；JDK 1.8 中直接采用了CAS（无锁算法）+ synchronized。**

### HashTable  & ConcurrentHashMap 的区别？

HashTable 使用一把锁（锁住整个链表结构）处理并发问题，多个线程竞争一把锁，容易阻塞；

ConcurrentHashMap

- JDK 1.7 中使用分段锁（ReentrantLock + Segment + HashEntry），相当于把一个 HashMap 分成多个段，每段分配一把锁，这样支持多线程访问。锁粒度：基于 Segment，包含多个 HashEntry。
- JDK 1.8 中使用 CAS + synchronized + Node + 红黑树。锁粒度：Node（首结点）（实现 Map.Entry）。锁粒度降低了。

### 针对 ConcurrentHashMap 锁机制具体分析（JDK 1.7 VS JDK 1.8）？

JDK 1.7 中，采用分段锁的机制，实现并发的更新操作，底层采用数组+链表的存储结构，包括两个核心静态内部类 Segment 和 HashEntry。

①、Segment 继承 ReentrantLock（重入锁） 用来充当锁的角色，每个 Segment 对象守护每个散列映射表的若干个桶；

②、HashEntry 用来封装映射表的键-值对；

③、每个桶是由若干个 HashEntry 对象链接起来的链表

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\640.png)

JDK 1.8 中，采用Node + CAS + Synchronized来保证并发安全。取消类 Segment，直接用 table 数组存储键值对；当 HashEntry 对象组成的链表长度超过 TREEIFY_THRESHOLD 时，链表转换为红黑树，提升性能。底层变更为数组 + 链表 + 红黑树。

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\641.png)

**１．一个线程进行put/remove操作时，对桶（链表 or 红黑树）加上synchronized独占锁，其他线程仍然可以访问其他桶；**

**２．CAS修改值**

```java
//获得在i位置上的Node节点
    static final <K,V> Node<K,V> tabAt(Node<K,V>[] tab, int i) {
        return (Node<K,V>)U.getObjectVolatile(tab, ((long)i << ASHIFT) + ABASE);
    }
		//利用CAS算法设置i位置上的Node节点。之所以能实现并发是因为他指定了原来这个节点的值是多少
		//在CAS算法中，会比较内存中的值与你指定的这个值是否相等，如果相等才接受你的修改，否则拒绝你的修改
		//因此当前线程中的值并不是最新的值，这种修改可能会覆盖掉其他线程的修改结果  有点类似于SVN
    static final <K,V> boolean casTabAt(Node<K,V>[] tab, int i,
                                        Node<K,V> c, Node<K,V> v) {
        return U.compareAndSwapObject(tab, ((long)i << ASHIFT) + ABASE, c, v);
    }
		//利用volatile方法设置节点位置的值
    static final <K,V> void setTabAt(Node<K,V>[] tab, int i, Node<K,V> v) {
        U.putObjectVolatile(tab, ((long)i << ASHIFT) + ABASE, v);
    }
```



### 为何JDK8要放弃分段锁？

由原来的分段锁，变成了CAS，也就是通过无锁化设计替代了阻塞同步的加锁操作，性能得到了提高。

通过分段锁的方式提高了并发度。分段是一开始就确定的了，后期不能再进行扩容的，其中的段Segment继承了重入锁ReentrantLock，有了锁的功能，同时含有类似HashMap中的数组加链表结构（这里没有使用红黑树），虽然Segment的个数是不能扩容的，但是单个Segment里面的数组是可以扩容的。

JDK1.8的ConcurrentHashMap摒弃了1.7的segment设计，而是JDK1.8版本的HashMap的基础上实现了线程安全的版本，即也是采用**数组+链表+红黑树**的形式，虽然ConcurrentHashMap的读不需要锁，但是需要保证能读到最新数据，所以必须加volatile。即数组的引用需要加volatile，同时一个Node节点中的val和next属性也必须要加volatile。

至于为什么抛弃Segment的设计，是因为分段锁的这个段不太好评定，如果我们的Segment设置的过大，那么隔离级别也就过高，那么就有很多空间被浪费了，也就是会让某些段里面没有元素，如果太小容易造成冲突



## HashSet底层

底层使用HashMap,使用了HashMap的key,value为Object PRESENT=new Object()类型的常量

## 集合代码测试

​    吴老师课件

## Collections.sort底层排序原理

​      Collections.sort方法底层就是调用的Arrays.sort方法，而Arrays.sort使用了TimSort排序方法，
​                                   小于60：使用插入排序，插入排序是稳定的
​                                   大于60的数据量会根据数据类型选择排序方式：
​                                   基本类型：使用快速排序。因为基本类型。1、2都是指向同一个常量池不需要考虑稳定性。
​                                   Object类型：使用归并排序。因为归并排序具有稳定性。

## ArrayList

ArrayList默认容量是10，如果初始化时一开始指定了容量，或者通过集合作为元素，则容量为指定的大小或参数集合的大小。每次扩容为原来的1.5倍，
                  新增后容量与限制的容量进行判断，超过则指定为Integer的最大值，否则指定为新增后容量
                  然后通过数组的复制将原数据复制到一个更大(新的容量大小)的数组。

## 集合的安全类

- **ArrayList:**
         Collections.synchronizedList()
         JUC下的CopyOnWriteArrayList（）         

  ```
     CopyOnWriteArrayList，顾名思义，Write的时候总是要Copy（将原来的array复制到新的array），也就是说对于CopyOnWriteArrayList，任何可变的操作（add、set、remove等等）都是通过ReentrantLock 控制并发并伴随复制这个动作读写分离，读在旧数组，写Copy到新数组，COW则完全放开了牺牲数据实时性而保证数据最终一致性       
  ```

- **Set：**
         Collections.synchronizedSet(new HashSet<>());
         CopyOnWriteArraySet：底层是CopyOnWriteArrayList代理实现

- **Map：**
          Collections.synchronizedMap(new HashMap<>());
          HashTable
          ConcurrentHashMap

## Hash算法

Hash算法只是一个定义，并没有规定具体的实现。涉及到分布式的系统，就会有负载均衡和数据分布的问题。为了让连接（或者数据）能够分布得更均匀，很多时候会使用到Hash算法。

### Hash冲突解决方法：

- 开放定址法： 

所谓的开放定址法就是一旦发生了冲突，就去寻找下一个空的散列地址，只要散列表足够大，空的散列地址总能找到，并将记录存入 
公式为：fi(key) = (f(key)+di) MOD m (di=1,2,3,……,m-1) 
※ 用开放定址法解决冲突的做法是：当冲突发生时，使用某种探测技术在散列表中形成一个探测序列。沿此序列逐个单元地查找，直到找到给定的关键字，或者 
碰到一个开放的地址（即该地址单元为空）为止（若要插入，在探查到开放的地址，则可将待插入的新结点存人该地址单元）。查找时探测到开放的地址则表明表 
中无待查的关键字，即查找失败。 
比如说，我们的关键字集合为{12,67,56,16,25,37,22,29,15,47,48,34},表长为12。 我们用散列函数f(key) = key mod l2 
当计算前S个数{12,67,56,16,25}时，都是没有冲突的散列地址，直接存入： 

![这里写图片描述](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\20170210213355178.png) 
计算key = 37时，发现f(37) = 1，此时就与25所在的位置冲突。 
于是我们应用上面的公式f(37) = (f(37)+1) mod 12 = 2。于是将37存入下标为2的位置： 
![这里写图片描述](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\20170210213443522.png)

- 二次哈希法：

有多个不同的Hash函数，当发生冲突时，使用第二个，第三个，….，等哈希函数
计算地址，直到无冲突。虽然不易发生聚集，但是增加了计算时间

- 链地址法：

​         HashMap、HashSet

- 建立公共溢出区： 

​     将哈希表分为基本表和溢出表两部分，凡是和基本表发生冲突的元素，一律填入溢出表

### 一致性Hash

### Java中为什么需要重写equal和hashcode

# JDK8新特性

## lambda表达式