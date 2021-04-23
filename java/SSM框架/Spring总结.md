# Spring优点

-   降低了组件之间的耦合性，实现了软件各层之间的解耦

-   对主流框架提供了集成支持，如hibernate,mabatis，SpringMVC,Struts 等，开发者也可以自由选择

  ​    Spring全部或者部分组件

-   Spring属于低侵入模式，代码污染极低

-   提供了众多服务支持，如事务管理，消息队列等

# Spring两大核心

-  **控制反转（IOC）或依赖注入（DI）**
-  **面向切面编程（AOP）**

## 控制反转

以前对象的创建是由我们开发人员自己维护,包括依赖关系也是自己注入。使用了spring之后，对象的创建以及依赖关系可以由spring完成创建以及注入，反转控制就是反转了对象的创建方式，从我们自己创建反转给了程序创建，控制反转由依赖注入实现

**IOC利用java反射机制**

## AOP

### 什么是AOP

在单体架构下的软件开发中，一个大型项目通常是依照功能拆分成各个模块。但是如日志、安全和事务管理此类重要且繁琐的开发却没有必要参与到各个模块中，将这些功能与业务逻辑相关的模块分离就是面向切面编程所要解决的问题

**AOP采取的是横向抽取机制，取代了传统纵向继承体系重复性代码。**

### AOP 的作用及优势

作用： 在程序运行期间，不修改源码对已有方法进行增强。

优势： 减少重复代码 提高开发效率 维护方便

### 实现AOP的方式

- **使用AspectJ风格的AOP**

  声明式：xml配置

  编程式：使用注解

- **使用Spring提供的相关API实现AOP**

  

### SpringAOP原理

AOP主要是通过动态代理和反射机制实现的

使用动态代理实现 

（1）基于JDK的代理

```
适用于有接口情况，使用动态代理创建接口实现类代理对象
```

（2）基于CGLIB动态代理

```
适用于没有接口情况，使用动态代理创建类的子类代理对象
```

### Spring AOP里面的几个名词

- 切面（Aspect）：被抽取的公共模块，可能会横切多个对象。 在Spring AOP中，切面可以使用通用类（基于模式的风格） 或者在普通类中以 @AspectJ 注解来实现。
- 连接点（Join point）：指方法，在Spring AOP中，一个连接点 总是 代表一个方法的执行。 
- 通知（Advice）：在切面的某个特定的连接点（Join point）上执行的动作。通知有各种类型，其中包括“around”、“before”和“after”等通知。许多AOP框架，包括Spring，都是以拦截器做通知模型， 并维护一个以连接点为中心的拦截器链。
- 切入点（Pointcut）：切入点是指 我们要对哪些Join point进行拦截的定义。通过切入点表达式，指定拦截的方法，比如指定拦截add*、search*。
- 引入（Introduction）：（也被称为内部类型声明（inter-type declaration））。声明额外的方法或者某个类型的字段。Spring允许引入新的接口（以及一个对应的实现）到任何被代理的对象。例如，你可以使用一个引入来使bean实现 IsModified 接口，以便简化缓存机制。
- 目标对象（Target Object）： 被一个或者多个切面（aspect）所通知（advise）的对象。也有人把它叫做 被通知（adviced） 对象。 既然Spring AOP是通过运行时代理实现的，这个对象永远是一个 被代理（proxied） 对象。
- 织入（Weaving）：指把增强应用到目标对象来创建新的代理对象的过程。Spring是在运行时完成织入。
- 切入点（pointcut）和连接点（join point）匹配的概念是AOP的关键，这使得AOP不同于其它仅仅提供拦截功能的旧技术。 切入点使得定位通知（advice）可独立于OO层次。 例如，一个提供声明式事务管理的around通知可以被应用到一组横跨多个对象中的方法上（例如服务层的所有业务操作）

### Spring通知类型

- 前置通知（Before advice）：在某连接点（join point）之前执行的通知，但这个通知不能阻止连接点前的执行（除非它抛出一个异常）。
- 返回后通知（After returning advice）：在某连接点（join point）正常完成后执行的通知：例如，一个方法没有抛出任何异常，正常返回。 
- 抛出异常后通知（After throwing advice）：在方法抛出异常退出时执行的通知。 
- 后通知（After (finally) advice）：当某连接点退出的时候执行的通知（不论是正常返回还是异常退出）。 
- 通知类型。 环绕通知可以在方法调用前后完成自定义的行为。它也会选择是否继续执行连接点或直接返回它们自己的返回值或抛出异常来结束执行。 环绕通知是最常用的一种通知类型。大部分基于拦截的AOP框架，例如Nanning和JBoss4，都只提供环绕通知。 

## 代理模式

定义：给目标对象提供一个代理对象，并由代理对象控制对目标对象的引用

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\SSM框架\images\代理模式.png)

- 特点：字节码随用随创建，随用随加载

- 作用：1.不修改源码的基础上对方法增强

  ​            2.通过引入代理对象的方式来间接访问目标对象，防止直接访问目标对象给系统带来的不必要复杂性

- 分类：

  - 静态代理：以AspectJ为代表，**编译阶段将AspectJ(切面)织入到Java字节码中**
  - 动态代理：以Spring AOP为代表，分为JDK动态代理和CGLIB动态代理

  ​       1.JDK动态代理是基于接口的方式，代理类和目标类都实现同一个接口

  ​       2.代理类去继承目标类，每次调用代理类的方法都会被方法拦截器拦截，在拦截器中才是调用目标类的该方法的逻辑

  ![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\SSM框架\images\AOP．png.png)

###   静态代理和动态代理实现

#### 静态代理

```java
//先抽象出一个接口
public interface IPrinter {
    void print();
}
//打印机类实现这个接口
public class Printer implements IPrinter {
       public void print(){
       System.out.println("打印！");
    }
}
//创建打印机代理类也实现该接口，在构造函数中将打印机对象传进去，实现接口的打印方法时调用打印机对象的打印
//方法并在前面加上记录日志的功能
public class PrinterProxy implements IPrinter {
    private IPrinter printer;
    public PrinterProxy(){
        this.printer = new printer();
    }
    @Override
    public void print() {
        System.out.println("记录日志");
        printer.print();
    }
}
//测试
public class Test {
    public static void main(String[] args) {
        PrinterProxy proxy = new PrinterProxy();
        proxy.print();
    }
}
//结果
记录日志
打印
```

如果我的打印机类中还有别的方法，也需要加上记录日志的功能，就不得不将记录日志的功能写n遍。进一步如果我还有电视机，电冰箱的类里面的所有方法也需要加上记录日志的功能，那要重复的地方就更多了。

#### JDK动态代理

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\SSM框架\images\JDK动态代理.png)

**Proxy类**-------->new一个代理类对象出来，相当于指定代购公司的哪个员工

**调用Proxy的newProxyInstance方法可以生成代理对象**

```java
//CLassLoader loader:被代理对象的类加载器 
//Class<?> interfaces:被代理类全部的接口 
//InvocationHandler h:实现InvocationHandler接口的对象 
 public static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h) throws IllegalArgumentException

```

**invocationHandler接口**--------------->指定需要提供什么服务      

**方法invoke 可以执行通过反射得到的方法，并且增强方法实现**

```java
//Object proxy:被代理的对象 
//Method method:要调用的方法 
//Object[] args:方法调用时所需要参数 
public interface InvocationHandler {
     public Object invoke(Object proxy, Method method, Object[] args) throws Throwable;
}

```

完整代码

```java
public class ProxyHandler implements InvocationHandler {
    private Object targetObject;//被代理的对象
    //将被代理的对象传入获得它的类加载器和实现接口作为Proxy.newProxyInstance方法的参数。
    public  Object newProxyInstance(Object targetObject){
        this.targetObject = targetObject;
        //targetObject.getClass().getClassLoader()：被代理对象的类加载器
        //targetObject.getClass().getInterfaces()：被代理对象的实现接口
        //this 当前对象，该对象实现了InvocationHandler接口所以有invoke方法，通过invoke方法可以调用被代理对象的方法
        return                                                         Proxy.newProxyInstance(targetObject.getClass().getClassLoader(),targetObject.getClass().getInterfaces(),this);
    }
    //该方法在代理对象调用方法时调用
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("记录日志");
        return method.invoke(targetObject,args);
    }
}
```

### 两种动态代理比较



# Spring管理事务

## Spring管理事务的方式有几种方式

​                        编程式事务
​                        声明式事务（AOP实现）   
​                                   基于XML的声明式事务
​                                   基于注解的声明式事务

## 事务传播行为

​                        概念：当事务方法被另一个事务方法调用时，必须指定事务应该如何传播

​                        支持当前事务的情况：
​                                          a. 如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务（Spring提供的默认事务传播行为）
​                                          b. 如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行
​                                          c. 如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常
​                        不支持当前事务的情况：
​                                          a.创建一个新的事务，如果当前存在事务，则把当前事务挂起
​                                          b.以非事务方式运行，如果当前存在事务，则把当前事务挂起
​                                          c.以非事务方式运行，如果当前存在事务，则抛出异常

## 事务的隔离级别

​                         a.默认级别：使用底层数据库的事务级别--->mysql默认可重复读级别
​                         b.
​                         c.
​                         d.

# Spring bean 的作用域

-  **singleton: 范围默认，单例**

-  **prototype: 原型范围，为每一个bean请求提供一个实例**

-  request :   在请求bean范围内为每一个我来自客户端的网络请求创建一个实例，在请求完成后，bean失效并

   会被垃圾回收   

-  Session：会话范围

-   global-session：全局范围

# Spring bean 的生命周期

实例化-->属性注入--->设置bean的名字--->设置bean的工厂--->设置bean范围--->预初始化--->初始化--->初始化后--->使用--->销毁

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\SSM框架\images\bean生命周期.jpg)

# Spring 中装配的方式

## 显示装配

   1.设值的方式注入-使用property标记

2. 使用构造函数注入-使用constructor-arg标记

## 隐式装配（自动装配）

（XML和注解两种）

### XML版

- **byName**
- **byType**
- **construtor**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:c="http://www.springframework.org/schema/c"
       xmlns:p="http://www.springframework.org/schema/p"

       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
">
    
    <bean class="com.qdu.beans.Cat">
        
    </bean>
    
    <bean class="com.qdu.beans.SteelAxe">
        
    </bean>
    
    <!--自动装配中,byName是寻找id或别名和bean的属性名同名的bean进行装配-->
    <!--person这个bean有两个属性,名称分别为fuzi和chongwu-->
    <!--所以如果按照名字自动装配,依赖的bean的id或别名分别应为fuzi和chongwu-->
    <bean id="person1" class="com.qdu.beans.Woman" autowire="byName">
        <!-- 这里没使用显式装配        
        <property name="fuzi" ref="axe" />
        <property name="chongwu" ref="pet" />
        -->
    </bean>
    <!---------------------------------------------------------->
    <!--    
    自动装配之byType:就是寻找数据类型和bean属性的数据类型符合的bean进行自动装配.
        属性fuzi的数据类型是Axe,能够找到匹配类型的bean为SteelAxe
        属性chongwu的数据类型是Pet,能够找到匹配类型的bean为Cat
    按照类型自动装配,如果找到多个匹配类型,则抛出UnsatisfiedDependencyException异常
    如果没有找到匹配类型,则不进行装配,也就是不进行注入
    -->
   
    <bean id="person2" class="com.qdu.beans.Woman" autowire="byType">
        <!--这里不使用显式装配        
        <property name="fuzi" ref="axe" />
        <property name="chongwu" ref="pet" />
        -->
    </bean>

</beans>
```

### 注解版（@Autowired、@Resource）

**@Autowired** 该注解相当于byType,按照类型完成自动装配

**@Resource **是按照属性名称进行自动装配

1. spring组件用注解 @Component, @Controller, @Service, @Repository，通过一下代码扫面指定路径下的组件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"

       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.0.xsd
          http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.0.xsd
">
    
    <!--context名称空间下的标记component-scan用于指定从哪些包扫描spring管理的组件  
        base-package用于指定扫描的基础包的包名
    -->
    <context:component-scan base-package="com.qdu.beans" />

</beans>

```

2. @Autowired注入

   ```java
   package com.qdu.beans1;
   
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Component;
   
   
   @Component
   public class Snake {
       
       //@Autowired也可放在属性前，哪怕属性是私有，spring会利用反射的原理进行按照类型注入
       //也就是按照类型进行自动装配
       @Autowired
       private Mouse laoshu1; //Snake依赖Mouse这个bean
       
       //如果当前的bean依赖多个属性，而且想使用@Autowired进行按照类型自动装配
       //则针对每个属性都要使用一次@Autowired注解
       @Autowired
       private Mouse laoshu2;
   
       public void eat() {
           System.out.println("蛇吃老鼠~~~");
           laoshu1.eat(); //输出依赖的老鼠吃什么
           laoshu2.eat(); //输出以来的另一个老鼠吃什么
       }
       
       
       //生成setter,让spring调用set方法完成自动装配
       //autowire
       //@Autowired注解可放在set方法前，也就意味着调用set方法完成自动装配
   //    @Autowired //该注解相当于byType,按照类型完成自动装配 ，类型是指属性的数据类型
   //    public void setLaoshu1(Mouse laoshu1) {
   //        System.out.println("调用setLaoshu1方法自动装配laoshu1属性..........");
   //        this.laoshu1 = laoshu1;
   //    }
   
       //@Autowired也可放在构造函数前，这样spring调用构造函数完成按照类型自动装配
   //    @Autowired
   //    public Snake(Mouse laoshu1) {
   //        System.out.println("调用Snake类的构造函数完成按照类型自动装配laoshu1属性~~~~~~");
   //        this.laoshu1 = laoshu1;
   //    }
   //    
   }
   ```

3. @Resource注入

   ```java
   package com.qdu.beans2;
   
   import javax.annotation.Resource;
   import org.springframework.stereotype.Component;
   
   /**
    * Man类-男生
    * <br>spring组件用注解 @Component, @Controller, @Service, @Repository
    * <br>自动装配注解 @Autowired, @Resource
    *
    * @author Anna
    */
   @Component("person")
   public class Man implements Person {
   
       //@Resource是按照属性名称进行自动装配,自动装配和属性同名的bean(如fuzi属性装配id为fuzi的bean)
       //@Resource先按照名称进行自动装配，如果没有匹配名称的bean，按照类型自动装配
       //如果类型也不匹配，则抛出异常
       //@Resource(name = "fuzi") ,也可用name属性指定注入的bean的id或别名
       @Resource
       private Axe fuzi; //砍柴用的斧子
       
       @Resource
       private Pet chongwu; //砍柴时带的宠物
   
       @Override
       public void kanChai() {
           System.out.println("男生砍柴，力气大~~~~~");
           fuzi.cut(); //用斧子砍
           chongwu.showSkill(); //宠物秀技能
       }
   }
   
   ```

# BeanFactory和ApplicationContext接口

- BeanFactory接口是Spring框架的顶层接口，是最原始的接口，通过new （BeanFactory的实现类）来启动Spring容器时，并不会创建Spring容器里面的对象，只有在每次通过getBean()获得对象时才会创建。
- ApplicationContext接口是用来替代BeanFactory接口的，通过new （ApplicationContext接口的实现类）ClassPathXmlApplicationContext来启动Spring容器时，就会创建容器中配置的所有对象   

# SpringMVC 原理

![](C:\Users\felixsfan\Desktop\办公机备份\学习\java\SSM框架\images\MVC.jpg)

# Spring拦截器和过滤器有什么区别

- 拦截器是基于Java的反射机制的，而过滤器是基于函数回调
- 拦截器不依赖于servlet容器，过滤器依赖于servlet容器
- 拦截器只能对action请求起作用，而过滤器则可以对几乎所有的请求起作用
- 拦截器可以访问action上下文、值栈里的对象，而过滤器不能访问
- 在action的生命周期中，拦截器可以多次被调用，而过滤器只能在容器初始化时被调用一次
- 拦截器可以获取IOC容器中的各个bean，而过滤器就不行，这点很重要，在拦截器里注入一个service，可以调用业务逻辑，过滤器在拦截器后执行 



​          9.restful和rpc区别：https://blog.csdn.net/u014590757/article/details/80233901
​                        REST(基于http协议)和RPC(一般基于tcp协议)都常用于微服务架构中

​          10.ajax底层原理:异步的 JavaScript 和 XML
​                        AJAX 的核心是 XMLHttpRequest 对象       

​          11.转发和重定向区别
​          
​              1、转发使用的是getRequestDispatcher()方法;重定向使用的是sendRedirect()

​              2、转发：浏览器URL的地址栏不变。重定向：浏览器URL的地址栏改变

​              3、转发是服务器行为，重定向是客户端行为

​              4、转发是浏览器只做了一次访问请求。重定向是浏览器做了至少两次的访问请求

​              5、转发2次跳转之间传输的信息不会丢失，重定向2次跳转之间传输的信息会丢失