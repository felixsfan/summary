1.Hashmap在插入元素过多的时候需要进行Resize，Resize的条件是**

**HashMap.Size   >=  Capacity \* LoadFactor。**

**2.Hashmap的Resize包含扩容和ReHash两个步骤，ReHash在并发的情况下可能会形成链表环。**

遍历原Entry数组，把所有的Entry重新Hash到新数组。为什么要重新Hash呢？因为长度扩大以后，Hash的规则也随之改变。

**Resize前的HashMap：**

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424486-09c94b54aea1290.png)

**Resize后的HashMap：**  

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424486-d0a8ade4d7465f5.png)

**ReHash的Java代码如下：**

```Java
/**
 * Transfers all entries from current table to newTable.
 */
void transfer(Entry[] newTable, boolean rehash) {
    int newCapacity = newTable.length;
    for (Entry<K,V> e : table) {
        while(null != e) {
            Entry<K,V> next = e.next;
            if (rehash) {
                e.hash = null == e.key ? 0 : hash(e.key);
            }
            int i = indexFor(e.hash, newCapacity);
            e.next = newTable[i];
            newTable[i] = e;
            e = next;
        }
    }
}
```

**多线程成环步骤**

假设一个HashMap已经到了Resize的临界点。此时有两个线程A和B，在同一时刻对HashMap进行Put操作：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424487-563ed681a60f872.png)

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424487-8d77fd2708d4e23.png)

此时达到Resize条件，两个线程各自进行Rezie的第一步，也就是扩容：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424488-9eed90a2714461.png)

这时候，两个线程都走到了ReHash的步骤。让我们回顾一下ReHash的代码：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424488-88345f29a46aefd.png)

假如此时线程B遍历到Entry3对象，刚执行完红框里的这行代码，线程就被挂起。对于线程B来说：

**e = Entry3**

**next = Entry2**

这时候线程A畅通无阻地进行着Rehash，当ReHash完成后，结果如下（图中的e和next，代表线程B的两个引用）：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424488-88345f29a46aefd-1.png)

直到这一步，看起来没什么毛病。接下来线程B恢复，继续执行属于它自己的ReHash。线程B刚才的状态是：

**e = Entry3**

**next = Entry2**

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424489-0ce457966482ef8.png)

当执行到上面这一行时，显然 i = 3，因为刚才线程A对于Entry3的hash结果也是3。

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424489-a038ecc86314559.png)

我们继续执行到这两行，Entry3放入了线程B的数组下标为3的位置，并且**e指向了Entry2**。此时e和next的指向如下：

**e = Entry2**

**next = Entry2**

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424489-7b0c5690d364cde.png)


接着是新一轮循环，又执行到红框内的代码行：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424490-70860a5b905594b.png)

**e = Entry2**

**next = Entry3**

**整体情况如图所示：**

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424490-70860a5b905594b-1.png)

接下来执行下面的三行，用头插法把Entry2插入到了线程B的数组的头结点：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424490-a5533d3036d1555.png)

整体情况如图所示：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424491-c0c6cb15f20ccf4.png)

第三次循环开始，又执行到红框的代码：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424491-139e79dbfe86dca.png)

**e = Entry3**

**next = Entry3.next = null**

最后一步，当我们执行下面这一行的时候，见证奇迹的时刻来临了：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424491-69db984b925cfba.png)

**newTable[i] = Entry2**

**e = Entry3**

**Entry2.next = Entry3**

**Entry3.next = Entry2**



**链表出现了环形！**



整体情况如图所示：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\Java基础\images\1572424491-d40fa642005fe3a.png)



此时，问题还没有直接产生。当调用Get查找一个不存在的Key，而这个Key的Hash结果恰好等于3的时候，由于位置3带有环形链表，所以程序将会进入**死循环**！