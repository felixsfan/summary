## 1.Python 简介

Python 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。

**Python 是一种解释型语言**

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\解释性语言和编译型区别.png)

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\Java和python区别.png)

**Python 是交互式语言：** 这意味着，您可以在一个 Python 提示符 **>>>** 后直接执行代码。

**Python 是面向对象语言:** 这意味着Python支持面向对象的风格或代码封装在对象的编程技术。

## 2.Python 特点

- **1.易于学习：**Python有相对较少的关键字，结构简单，和一个明确定义的语法，学习起来更加简单。
- **2.易于阅读：**Python代码定义的更清晰。
- **3.易于维护：**Python的成功在于它的源代码是相当容易维护的。
- **4.一个广泛的标准库：**Python的最大的优势之一是丰富的库，跨平台的，在UNIX，Windows和Macintosh兼容很好。
- **5.互动模式：**互动模式的支持，您可以从终端输入执行代码并获得结果的语言，互动的测试和调试代码片断。
- **6.可移植：**基于其开放源代码的特性，Python已经被移植（也就是使其工作）到许多平台。
- **7.可扩展：**如果你需要一段运行很快的关键代码，或者是想要编写一些不愿开放的算法，你可以使用C或C++完成那部分程序，然后从你的Python程序中调用。
- **8.数据库：**Python提供所有主要的商业数据库的接口。
- **9.GUI编程：**Python支持GUI可以创建和移植到许多系统调用。
- **10.可嵌入:** 你可以将Python嵌入到C/C++程序，让你的程序的用户获得"脚本化"的能力。

## 3.Python 中文编码

Python中默认的编码格式是 ASCII 格式，在没修改编码格式时无法正确打印汉字，所以在读取中文时会报错。

解决方法为只要在文件开头加入 **# -\*- coding: UTF-8 -\*-** 或者 **# coding=utf-8** 就行了

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
print( "你好，世界" )
```

## 4.安装目录介绍

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\20181214080209657.png)

- DLLs： Python 自己使用的动态库
- Doc： 自带的 Python 使用说明文档（如果上面安装时不选择，应该会没有，这个没具体试过）
- include： 包含共享目录
- Lib： 库文件，放自定义模块和包
- libs： 编译生成的Python 自己使用的静态库
- Scripts： 各种包/模块对应的可执行程序。安装时如果选择了pip。那么pip的可执行程序就在此！

- tcl： 桌面编程包

### 4.1 动态库和静态库

动态库和静态库都是共享程序代码的一种方式。二者区别在于链接阶段，静态库被复制到程序当中，和程序运行的时候没有关系。而动态库在链接阶段没有被复制到程序中。而是程序在运行的过程中，由系统动态加载到内存中

## 5. Python 基础语法

学习 Python 与其他语言最大的区别就是，Python 的代码块不使用大括号 **{}** 来控制类，函数以及其他逻辑判断。python 最具特色的就是用缩进来写模块。

### 5.1 Python 标识符

在 Python 里，标识符由字母、数字、下划线组成。

在 Python 中，所有标识符可以包括英文、数字以及下划线(_)，但不能以数字开头。

Python 中的标识符是区分大小写的。

以下划线开头的标识符是有特殊意义的。以单下划线开头 **_foo** 的代表不能直接访问的类属性，需通过类提供的接口进行访问，不能用 **from xxx import \*** 而导入。

以双下划线开头的 **__foo** 代表类的私有成员，以双下划线开头和结尾的 **__foo__** 代表 Python 里特殊方法专用的标识，如 **__init__()** 代表类的构造函数。

### 5.2 Python空行

函数之间或类的方法之间用空行分隔，表示一段新的代码的开始。类和函数入口之间也用一行空行分隔，以突出函数入口的开始。

空行与代码缩进不同，空行并不是Python语法的一部分。书写时不插入空行，Python解释器运行也不会出错。但是空行的作用在于分隔两段不同功能或含义的代码，便于日后代码的维护或重构。

记住：空行也是程序代码的一部分。

### 5.3 运算符

#### 5.3.1 is 与 == 区别

is 用于判断两个变量引用对象是否为同一个(同一块内存空间)， == 用于判断引用变量的值是否相等。

## 6. Python 变量类型

Python有五个标准的数据类型：

- Numbers（数字）
- String（字符串）
- List（列表）
- Tuple（元组）
- Dictionary（字典）

## 7. 变量赋值和浅拷贝、深拷贝

<https://blog.csdn.net/weixin_38819889/article/details/86476528>

- **直接赋值：**其实就是对象的引用（别名）。
- **浅拷贝(copy)：**拷贝父对象，不会拷贝对象的内部的子对象。
- **深拷贝(deepcopy)：** copy 模块的 deepcopy 方法，完全拷贝了父对象及其子对象。

> 在业务中有时我们需要复制一个对象，但是又不想对原对象产生副作用，那就不能通过赋值给新变量来解决了(赋值不是拷贝一个对象)。Python专门提供了一种拷贝机制，基于原对象创建一个含有相同值的对象。拷贝有`copy`模块提供

### 7.1 直接赋值

所谓的赋值实际上就是对象引用的传递而已，当创建一个对象的时候，再赋值给另外一个变量的时候，并不是赋值给另一个变量。而是把这个变量在地址空间的id地址值传递给另一个变量，简单的说就是拷贝了这个对象的引用

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\直接赋值.png)

### 7.2 浅拷贝

浅拷贝是对一个对象父级（外层）的拷贝，并不会拷贝子级（内部）。使用浅拷贝的时候，分为两种情况。
第一种，如果最外层的数据类型是可变的，比如说列表，字典等，浅拷贝会开启新的地址空间去存放。
第二种，如果最外层的数据类型是不可变的，比如元组，字符串等，浅拷贝对象的时候，还是引用对象的地址空间
![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\浅拷贝1.png)

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\浅拷贝2.png)

字典浅拷贝实例

```python
>>>a = {1: [1,2,3]}
>>> b = a.copy()
>>> a, b
({1: [1, 2, 3]}, {1: [1, 2, 3]})
>>> a[1].append(4)
>>> a, b
({1: [1, 2, 3, 4]}, {1: [1, 2, 3, 4]})
```

### 7.3 深拷贝

深拷贝对一个对象是所有层次的拷贝（递归），内部和外部都会被拷贝过来。
深拷贝也分两种情况：
第一种，最外层数据类型可变。这个时候，内部和外部的都会拷贝过来。
第二种，外层数据类型不可变，如果里面是可变数据类型，会新开辟地址空间存放。如果内部数据类型不可变，才会如同浅拷贝一样，是对地址的引用

深度拷贝需要引入 copy 模块：

```python
>>>import copy
>>> c = copy.deepcopy(a)
>>> a, c
({1: [1, 2, 3, 4]}, {1: [1, 2, 3, 4]})
>>> a[1].append(5)
>>> a, c
({1: [1, 2, 3, 4, 5]}, {1: [1, 2, 3, 4]})
```

## 8. 函数

函数是组织好的，可重复使用的，用来实现单一，或相关联功能的代码段。

### 8.1 定义一个函数

```python
def functionname( parameters ):
   "函数_文档字符串"
   function_suite
   return [expression]
```

### 8.2 函数调用

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
# 定义函数
def printme( str ):
   "打印任何传入的字符串"
   print str
   return
 
# 调用函数
printme("我要调用用户自定义函数!")
printme("再次调用同一函数")
```

### 8.3 闭包

<https://blog.csdn.net/zwj1452267376/article/details/88411889>

### 8.5 参数传递

#### 8.5.1 可更改(mutable)与不可更改(immutable)对象

在 python 中，strings, tuples, 和 numbers 是不可更改的对象，而 list,dict 等则是可以修改的对象。

- **不可变类型：**变量赋值 **a=5** 后再赋值 **a=10**，这里实际是新生成一个 int 值对象 10，再让 a 指向它，而 5 被丢弃，不是改变a的值，相当于新生成了a。
- **可变类型：**变量赋值 **la=[1,2,3,4]** 后再赋值 **la[2]=5** 则是将 list la 的第三个元素值更改，本身la没有动，只是其内部的一部分值被修改了。

python 函数的参数传递：

- **不可变类型：**类似 c++ 的值传递，如 整数、字符串、元组。如fun（a），传递的只是a的值，没有影响a对象本身。比如在 fun（a）内部修改 a 的值，只是修改另一个复制的对象，不会影响 a 本身。
- **可变类型：**类似 c++ 的引用传递，如 列表，字典。如 fun（la），则是将 la 真正的传过去，修改后fun外部的la也会受影响

**python 中一切都是对象，严格意义我们不能说值传递还是引用传递，我们应该说传不可变对象和传可变对象。**



### 8.6 全局变量与局部变量名字相同问题

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\20181222224740294.png)

### 8.7 修改不可变类型全局变量

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\20181222224805373.png)

**总结1**

- 在函数外边定义的变量叫做`全局变量`
- ##### 全局变量能够在所有的函数中进行访问
- 如果在函数中修改全局变量，那么就需要使用`global`进行声明，否则出错
- 如果全局变量的名字和局部变量的名字相同，那么使用的是局部变量的

### 8.8 修改可变类型的全局变量

```python
>>> a = 1
>>> def f():
...     a += 1
...     print a
...
>>> f()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 2, in f
UnboundLocalError: local variable 'a' referenced before assignment
>>>
>>>
>>> li = [1,]
>>> def f2():
...     li.append(1)
...     print li
...
>>> f2()
[1, 1]
>>> li
[1, 1]
```

**总结2**

- 在函数中不使用global声明全局变量时不能修改全局变量的本质是不能修改全局变量的指向，即不能将全局变量指向新的数据，**因为会在局部命名空间自动创建一个新的同名变量**。
- 对于不可变类型的全局变量来说，因其指向的数据不能修改，所以不使用global时无法修改全局变量。
- 对于可变类型的全局变量来说，因其指向的数据可以修改，所以不使用global时也可修改全局变量。

```python
a=100
def test1():
    b=a
    b=b+1
    print b

test1()
```

**总结3**

函数不能直接修改全局变量，但是可以访问

### 8.9 星号变量（*）、（**）

<https://blog.csdn.net/zkk9527/article/details/88675129>

\* 该位置接受任意多个非关键字（non-keyword）参数，在函数中将其转化为元组（1,2,3,4）

**   该位置接受任意多个关键字（keyword）参数，在函数**位置上转化为词典 [key:value, key:value ]

```python
def one(a,*b):
    """a是一个普通传入参数，*b是一个非关键字星号参数"""
    print(b)
one(1,2,3,4,5,6)
#--------
def two(a=1,**b):
    """a是一个普通关键字参数，**b是一个关键字双星号参数"""
    print(b)
two(a=1,b=2,c=3,d=4,e=5,f=6)
```

输出为：

```python
# 第一个输出为：
(2, 3, 4, 5, 6)

# 第二个输出为：
{'b': 2, 'c': 3, 'e': 5, 'f': 6, 'd': 4}
```

## 9. 模块

**Python 模块(Module)，是一个 Python 文件，以 .py 结尾，包含了 Python 对象定义和Python语句**。

模块让你能够有逻辑地组织你的 Python 代码段。

把相关的代码分配到一个模块里能让你的代码更好用，更易懂。

**模块能定义函数，类和变量，模块里也能包含可执行的代码。**

### 9.1 命名空间

变量是拥有匹配对象的名字（标识符）。命名空间是一个包含了变量名称们（键）和它们各自相应的对象们（值）的字典。

一个 Python 表达式可以访问局部命名空间和全局命名空间里的变量。如果一个局部变量和一个全局变量重名，则局部变量会覆盖全局变量。

### 9.2 作用域

**Python 使用 LEGB 的顺序来查找一个符号对应的对象**

- L(局部变量)：在函数内、在class的方法内
- E(Enclosing)：闭包函数外的函数中(嵌套作用域)、在class内方法外
- G(全局变量)：在模块内、在所有函数和类的外面
- B(Built-in)：内置作用域(内置函数所在模块的范围)

Python中的作用域遵循LEGB原则：查找变量，先在L作用域查找，找不到便会去E作用域查找，再找不到去G作用域查找，再者去B作用域查找。

Python 中只有模块（module），类（class）以及函数（def、lambda）才会引入新的作用域。

局部变量只能在其被声明的函数内部访问，而全局变量可以在整个程序范围内访问。调用函数时，所有在函数内声明的变量名称都将被加入到作用域中。如下实例：

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
total = 0 # 这是一个全局变量
# 可写函数说明
def sum( arg1, arg2 ):
   #返回2个参数的和."
   total = arg1 + arg2 # total在这里是局部变量.
   print "函数内是局部变量 : ", total
   return total
 
#调用sum函数
sum( 10, 20 )
print "函数外是全局变量 : ", total
```

```python
a = 1  # 这个是全局变量 全局这个.py 任意一个函数或者方法都可以使用

def test1():
    a = 2  # 这个是局部变量 在这个函数可以使用
    
class clazz1():
    a = 3  # 这个类变量 在当前类可以使用
    def test2(self):
        a = 4  # 这个是局部变量 在这个方法可以使用
        self.b = 5  # 这个是实例变量 属性b 在当前类共享
```

### 9.3 Python中的包

包是一个分层次的文件目录结构，它定义了一个由模块及子包，和子包下的子包等组成的 Python 的应用环境。

简单来说，包就是文件夹，但该文件夹下必须存在 __init__.py 文件, 该文件的内容可以为空。**__init__.py** 用于标识当前文件夹是一个包。

考虑一个在 **package_runoob** 目录下的 **runoob1.py、runoob2.py、__init__.py** 文件，test.py 为测试调用包的代码，目录结构如下：

```python
test.py
package_runoob
|-- __init__.py
|-- runoob1.py
|-- runoob2.py
#如果没有__init__.py就是一个文件夹，可以通过   import src.sett_def 导入
```

### 9.4 搜索路径

当你导入一个模块，Python 解析器对模块位置的搜索顺序是：

- 1、当前目录
- 2、如果不在当前目录，Python 则搜索在 shell 变量 PYTHONPATH 下的每个目录。
- 3、如果都找不到，Python会察看默认路径。UNIX下，默认路径一般为/usr/local/lib/python/。

模块搜索路径存储在 system 模块的 sys.path 变量中。变量里包含当前目录，PYTHONPATH和由安装过程决定的默认目录。

### 9.5 import 语句

关键是能够在sys.path里面找到通向模块文件的路径。 
下面将具体介绍几种常用情况: 

#### 9.5.1 主程序与模块程序在同一目录下

如下面程序结构: 

```python
`-- src 
  |-- mod1.py 
  `-- test1.py 
```

  若在程序test1.py中导入模块mod1, 则直接使用 **import** mod1或from mod1 import *; 

#### 9.5.2 主程序所在目录是模块所在目录的父(或祖辈)目录 

如下面程序结构: 

```python
`-- src 
    |-- mod1.py 
    |-- mod2 
    |   `-- mod2.py 
    `-- test1.py 
```

若在程序test1.py中导入模块mod2, 需要在mod2文件夹中建立空文件__init__.py文件(也可以在该文件中自定义输出模块接口); 然后使用 from mod2.mod2 import * 或import mod2.mod2. 

#### 9.5.3 主程序导入上层目录中模块或其他目录(平级)下的模块 

如下面程序结构: 

```python
`-- src 
    |-- mod1.py 
    |-- mod2 
    |   `-- mod2.py 
    |-- sub 
    |   `-- test2.py 
    `-- test1.py 
```

若在程序test2.py中导入模块mod1和mod2。首先需要在mod2下建立__init__.py文件(同(2))，src下不必建立该文件。然后调用方式如下: 
  下面程序执行方式均在程序文件所在目录下执行，如test2.py是在cd sub;之后执行python test2.py 
而test1.py是在cd src;之后执行python test1.py; 不保证在src目录下执行python sub/test2.py成功。 

```python 
  import sys 
  sys.path.append("..") 
  import mod1 
  import mod2.mod2 
```

#### 9.5.4 总结

**从(3)可以看出，导入模块关键是能够根据sys.path环境变量的值，找到具体模块的路径**

### 9.6 python调用另一个.py文件中的类和函数

结合模块import语句

<https://www.cnblogs.com/AmyHu/p/10654500.html>

#### 9.6.1 同一文件夹下的调用

**调用函数**

```python
【A.py】
def add(x,y):
    print('和为：%d'%(x+y))
    
【B.py】
import A
A.add(1,2)
或
from A import add
add(1,2)
```

**调用类**

```python
【A.py】
class A:
    def __init__(self,xx,yy):
        self.x=xx
        self.y=yy
    def add(self):
        print("x和y的和为：%d"%(self.x+self.y))
        
【B.py】
from A import A
a=A(2,3)
a.add()
或
import A
a=A.A(2,3)
a.add()
```

#### 9.6.2 在不同文件夹下调用

```python
#A.py文件的文件路径为：C:\AmyPython\Test1
#B.py中调用A.py文件：

import sys
sys.path.append('C:\AmyPython\Test1')
#python import模块时， 是在sys.path里按顺序查找的。sys.path是一个列表，里面以字符串的形式存储了许多路径。使用A.py文件中的函数需要先将他的文件路径放到sys.path中
import A
a=A.A(2,3)
a.add()
```

### 9.7 PYTHONPATH 变量

作为环境变量，PYTHONPATH 由装在一个列表里的许多目录组成。PYTHONPATH 的语法和 shell 变量 PATH 的一样。

在 Windows 系统，典型的 PYTHONPATH 如下：

在 UNIX 系统，典型的 PYTHONPATH 如下：

```shell
set PYTHONPATH=/usr/local/lib/python
```

### 9.8 Python中____init__.py文件的作用详解

__init__.py 文件的作用是将文件夹变为一个Python模块包,Python 中的每个模块的包中，都有__init__.py 文件。

<https://www.cnblogs.com/tp1226/p/8453854.html>

### 9.9 globals() 和 locals() 函数

根据调用地方的不同，globals() 和 locals() 函数可被用来返回全局和局部命名空间里的名字。

如果在函数内部调用 locals()，返回的是所有能在该函数里访问的命名。

如果在函数内部调用 globals()，返回的是所有在该函数里能访问的全局名字。

两个函数的返回类型都是字典。所以名字们能用 keys() 函数摘取。

## 10. 面向对象

### 10.1 面向对象技术简介

- **类(Class):** 用来描述具有相同的属性和方法的对象的集合。它定义了该集合中每个对象所共有的属性和方法。对象是类的实例。
- **类变量：**类变量在整个实例化的对象中是公用的。类变量定义在类中且在函数体之外。类变量通常不作为实例变量使用。
- **数据成员：**类变量或者实例变量, 用于处理类及其实例对象的相关的数据。
- **方法重写：**如果从父类继承的方法不能满足子类的需求，可以对其进行改写，这个过程叫方法的覆盖（override），也称为方法的重写。
- **局部变量：**定义在方法中的变量，只作用于当前实例的类。
- **实例变量：**在类的声明中，属性是用变量来表示的。这种变量就称为实例变量，是在类声明的内部但是在类的其他成员方法之外声明的。
- **继承：**即一个派生类（derived class）继承基类（base class）的字段和方法。继承也允许把一个派生类的对象作为一个基类对象对待。例如，有这样一个设计：一个Dog类型的对象派生自Animal类，这是模拟"是一个（is-a）"关系（例图，Dog是一个Animal）。
- **实例化：**创建一个类的实例，类的具体对象。
- **方法：**类中定义的函数。
- **对象：**通过类定义的数据结构实例。对象包括两个数据成员（类变量和实例变量）和方法。

### 10.2 单下划线、双下划线、头尾双下划线说明

- **__foo__**: 定义的是特殊方法，一般是系统定义名字 ，类似 **__init__()** 之类的。
- **_foo**: 以单下划线开头的表示的是 protected 类型的变量，即保护类型只能允许其本身与子类进行访问，不能用于 **from module import \***
- **__foo**: 双下划线的表示的是私有类型(private)的变量, 只能是允许这个类本身进行访问了。

### 10.3 self

类的方法与普通的函数只有一个特别的区别——它们必须有一个额外的**第一个参数名称**, 按照惯例它的名称是 self

**子类的实例**

```python
class A():
    def a(self, name):
        print self
        self.c(name)

    def c(self, name):
        print self
        print "父类", name


class B(A):
    def c(self, name):
        print self
        print "子类", name

B().a("fan")
```

结果

```python
C:\Python27\python.exe D:/git/Directory/src/test.py
<__main__.B instance at 0x0000000002D24588>
<__main__.B instance at 0x0000000002D24588>
子类 fan

Process finished with exit code 0

```

### 10.4 python的局部变量，全局变量，类变量，实例变量

```python
a = 1 # 这个是全局变量 全局这个.py 任意一个函数或者方法都可以使用

def test1():
    a = 2 # 这个是局部变量 在这个函数可以使用

class clazz1():
    a = 3 # 这个类变量 在当前类可以使用
    def test2(self):
    	a = 4 # 这个是局部变量 在这个方法可以使用
    	self.b = 5 # 这个是实例变量 属性b 在当前类共享
```

Python中的一切都是对象，所以就有以下的结论

#### 10.4.1 类变量

是类的属性（因为每一个类是class的一个对象，所有类的对象共享）

```python

class MyClass(object):
    class_var = 1 #类变量
    def __init__(self, i_var):
        self.i_var = i_var #实例变量

foo = MyClass(2)
bar = MyClass(3)
 
foo.class_var, foo.i_var
## 1, 2
bar.class_var, bar.i_var
## 1, 3
MyClass.class_var
## 1

##所有MyClass的对象都能够访问到class_var，
##同时class_var也能被MyClass直接访问到self.class_var或类名.calss_var
##这个类变量有点像Java或者C++里面的静态成员，但是又不一样
```

#### 10.4.2 实例变量

是对象的属性（因为每一个实例对象，是类的一个对象，在每个类的对象里相互独立）

**实例变量的定义方式**

1. Python变量的本质是被赋值，**实例变量是在实例方法内第一次通过self方式赋值来定义，该实例方法不一定是构造方法，只要是实例方法中通过self给一个未定义的变量赋值都是定义一个实例变量**。不过由于构造方法在实例创建是即执行，因此在实例定义时就需要初始化的实例变量可以通过构造方法赋值来定义；
2. 实例变量在类定义外访问时，可以通过”实例对象.实例变量”方式访问，包括赋值，如果通过”实例对象.实例变量”方式给一未定义变量赋值，也是定义一个实例变量；
3. 任何时候通过以上两种方式给一个未定义的实例变量赋值时，都是新定义实例变量，即实例变量是可以动态增加的，动态增加的实例变量不影响其他实例变量，在实例对象释放后就不再有作用；
   注意：如果实例方法中的变量没有带self，则赋值对应变量时变为了给方法内的局部变量赋值

**实例变量的访问方式**

1. 直接在实例方法中通过self方式访问；
2. 在实例定义代码内通过“实例名.变量名”方式访问

#### 10.4.3 局部变量

是函数或方法的属性（因为每一个函数或方法是function或method的一个对象）

**只能在该函数中调用**

#### 10.4.4 全局变量

是模块的属性（因为每一个模块是module的一个对象）

**全局变量是在整个.py文件中声明，全局范围内都可以访问**

## 11. 进阶

### @staticmethod

```python
class cal:
    cal_name = '计算器'
    def __init__(self,x,y):
        self.x = x
        self.y = y

    @property           #在cal_add函数前加上@property，使得该函数可直接调用，封装起来
    def cal_add(self):
        return self.x + self.y

    @classmethod        #在cal_info函数前加上@classmethon，则该函数变为类方法，该函数只能访问到类的数据属性，不能获取实例的数据属性
    def cal_info(cls):  #python自动传入位置参数cls就是类本身
        print('这是一个%s'%cls.cal_name)   #cls.cal_name调用类自己的数据属性

    @staticmethod       #静态方法 类或实例均可调用
    def cal_test(a,b,c): #改静态方法函数里不传入self 或 cls
        print(a,b,c)
c1 = cal(10,11)
cal.cal_test(1,2,3)     #>>> 1 2 3
c1.cal_test(1,2,3)      #>>> 1 2 3
```



## 12. 数据库操作

<https://blog.csdn.net/guofeng93/article/details/53994112>

## 13. 网络编程

HTTP、TCP与UDP、Socket与Websocket之间的联系与区别

https://blog.csdn.net/weixin_40155271/article/details/80869542