# 1.Python 简介

Python 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。

**Python 是一种解释型语言**

![](/Users/fanqingwei/Desktop\学习\python学习\images\解释性语言和编译型区别.png)

![](/Users/fanqingwei/Desktop\学习\python学习\images\Java和python区别.png)

**Python 是交互式语言：** 这意味着，您可以在一个 Python 提示符 **>>>** 后直接执行代码。

**Python 是面向对象语言:** 这意味着Python支持面向对象的风格或代码封装在对象的编程技术。

# 2.Python 特点

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

# 3.Python 中文编码

Python中默认的编码格式是 ASCII 格式，在没修改编码格式时无法正确打印汉字，所以在读取中文时会报错。

解决方法为只要在文件开头加入 **# -\*- coding: UTF-8 -\*-** 或者 **# coding=utf-8** 就行了

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
print( "你好，世界" )
```

# 4.安装目录介绍

![](/Users/fanqingwei/Desktop\学习\python学习\images\20181214080209657.png)

- DLLs： Python 自己使用的动态库
- Doc： 自带的 Python 使用说明文档（如果上面安装时不选择，应该会没有，这个没具体试过）
- include： 包含共享目录
- Lib： 库文件，放自定义模块和包
- libs： 编译生成的Python 自己使用的静态库
- Scripts： 各种包/模块对应的可执行程序。安装时如果选择了pip。那么pip的可执行程序就在此！

- tcl： 桌面编程包

## 4.1 动态库和静态库

动态库和静态库都是共享程序代码的一种方式。二者区别在于链接阶段，静态库被复制到程序当中，和程序运行的时候没有关系。而动态库在链接阶段没有被复制到程序中。而是程序在运行的过程中，由系统动态加载到内存中

# 5. Python 基础语法

学习 Python 与其他语言最大的区别就是，Python 的代码块不使用大括号 **{}** 来控制类，函数以及其他逻辑判断。python 最具特色的就是用缩进来写模块。

## 5.1 Python 标识符

在 Python 里，标识符由字母、数字、下划线组成。

在 Python 中，所有标识符可以包括英文、数字以及下划线(_)，但不能以数字开头。

Python 中的标识符是区分大小写的。

以下划线开头的标识符是有特殊意义的。以单下划线开头 **_foo** 的代表不能直接访问的类属性，需通过类提供的接口进行访问，不能用 **from xxx import \*** 而导入。

以双下划线开头的 **__foo** 代表类的私有成员，以双下划线开头和结尾的 **__foo__** 代表 Python 里特殊方法专用的标识，如 **__init__()** 代表类的构造函数。

## 5.2 Python空行

函数之间或类的方法之间用空行分隔，表示一段新的代码的开始。类和函数入口之间也用一行空行分隔，以突出函数入口的开始。

空行与代码缩进不同，空行并不是Python语法的一部分。书写时不插入空行，Python解释器运行也不会出错。但是空行的作用在于分隔两段不同功能或含义的代码，便于日后代码的维护或重构。

记住：空行也是程序代码的一部分。

## 5.3 运算符

### 5.3.1 is 与 == 区别

is 用于判断两个变量引用对象是否为同一个(同一块内存空间)， == 用于判断引用变量的值是否相等。

# 6. Python 变量类型

Python有五个标准的数据类型：

- Numbers（数字）
- String（字符串）
- List（列表）
- Tuple（元组）
- Dictionary（字典）

# 7. 变量赋值和浅拷贝、深拷贝

<https://blog.csdn.net/weixin_38819889/article/details/86476528>

- **直接赋值：**其实就是对象的引用（别名）。
- **浅拷贝(copy)：**拷贝父对象，不会拷贝对象的内部的子对象。
- **深拷贝(deepcopy)：** copy 模块的 deepcopy 方法，完全拷贝了父对象及其子对象。

> 在业务中有时我们需要复制一个对象，但是又不想对原对象产生副作用，那就不能通过赋值给新变量来解决了(赋值不是拷贝一个对象)。Python专门提供了一种拷贝机制，基于原对象创建一个含有相同值的对象。拷贝有`copy`模块提供

## 7.1 直接赋值

所谓的赋值实际上就是对象引用的传递而已，当创建一个对象的时候，再赋值给另外一个变量的时候，并不是赋值给另一个变量。而是把这个变量在地址空间的id地址值传递给另一个变量，简单的说就是拷贝了这个对象的引用

![](/Users/fanqingwei/Desktop\学习\python学习\images\直接赋值.png)

## 7.2 浅拷贝

浅拷贝是对一个对象父级（外层）的拷贝，并不会拷贝子级（内部）。使用浅拷贝的时候，分为两种情况。
第一种，如果最外层的数据类型是可变的，比如说列表，字典等，浅拷贝会开启新的地址空间去存放。
第二种，如果最外层的数据类型是不可变的，比如元组，字符串等，浅拷贝对象的时候，还是引用对象的地址空间
![](/Users/fanqingwei/Desktop\学习\python学习\images\浅拷贝1.png)

![](/Users/fanqingwei/Desktop\学习\python学习\images\浅拷贝2.png)

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

## 7.3 深拷贝

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

# 8. 函数

函数是组织好的，可重复使用的，用来实现单一，或相关联功能的代码段。

## 8.1 定义一个函数

```python
def functionname(parameters ):
   "函数_文档字符串"
   function_suite
   return [expression]
```

## 8.2 函数调用

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

## 8.3 闭包

### 闭包的概念

在 Python 中很多地方都会使用到闭包，那么究竟什么叫做闭包呢？ 在维基百科上是这么解释的。

> 在一些语言中，在函数中可以（嵌套）定义另一个函数时，如果内部的函数引用了外部的函数的变量，则可能产生闭包。闭包可以用来在一个函数与一组“私有”变量之间创建关联关系。在给定函数被多次调用的过程中，这些私有变量能够保持其持久性。——
> 维基百科

简而言之， 闭包的特点就是内部函数引用了外部函数中的变量。 在Python中，支持将函数当做对象使用，也就是可以将一个函数当做普通变量一样用作另一个函数的参数和返回值。拥有此类特性的语言，一般都支持闭包。

闭包中被内部函数引用的变量，不会因为外部函数结束而被释放掉，而是一直存在内存中，直到内部函数被调用结束。

### 闭包实例

```python
def func():
    name = 'python'
    def inner():
        print(name)
    return inner

f = func()  # f = func() = inner 
f()  # f() = inner 
# 输出结果：python
```

因为作用域的原因，在函数外部就无法拿到函数中的变量和内部函数。通常我们需要使用函数中的变量时，才去将变量返回的办法。同理，在使用内部函数时，我们也可以将函数名作为返回值返回。 这是闭包最常用的方式。

### 如何判断是否是闭包函数

`函数名.__closure__` 在函数是闭包函数时，返回一个cell元素；不是闭包时，返回None。

**输出cell：**

```python
def func():
    name = 'python'
    def inner():
        print(name)
    print(inner.__closure__)  # (<cell at 0x0000027C14EB85E8: str object at 0x0000027C14F54960>,)
    return inner

f = func()
f()
```

**输出None：**

```python
name = 'python'
def func():
    def inner():
        print(name)
    print(inner.__closure__)  # None
    return inner

f = func()
f()

```

## 8.5 参数传递

### 8.5.1 可更改(mutable)与不可更改(immutable)对象

在 python 中，strings, tuples, 和 numbers 是不可更改的对象，而 list,dict 等则是可以修改的对象。

- **不可变类型：**变量赋值 **a=5** 后再赋值 **a=10**，这里实际是新生成一个 int 值对象 10，再让 a 指向它，而 5 被丢弃，不是改变a的值，相当于新生成了a。
- **可变类型：**变量赋值 **la=[1,2,3,4]** 后再赋值 **la[2]=5** 则是将 list la 的第三个元素值更改，本身la没有动，只是其内部的一部分值被修改了。

python 函数的参数传递：

- **不可变类型：**类似 c++ 的值传递，如 整数、字符串、元组。如fun（a），传递的只是a的值，没有影响a对象本身。比如在 fun（a）内部修改 a 的值，只是修改另一个复制的对象，不会影响 a 本身。
- **可变类型：**类似 c++ 的引用传递，如 列表，字典。如 fun（la），则是将 la 真正的传过去，修改后fun外部的la也会受影响

**python 中一切都是对象，严格意义我们不能说值传递还是引用传递，我们应该说传不可变对象和传可变对象。**

## 8.6 全局变量与局部变量名字相同问题

![](/Users/fanqingwei/Desktop\学习\python学习\images\20181222224740294.png)

## 8.7 修改不可变类型全局变量

![](/Users/fanqingwei/Desktop\学习\python学习\images\20181222224805373.png)

**总结1**

- 在函数外边定义的变量叫做**全局变量**
- ##### 全局变量能够在所有的函数中进行访问
- 如果在函数中修改全局变量，那么就需要使用`global`进行声明，否则出错
- 如果全局变量的名字和局部变量的名字相同，那么使用的是局部变量的

## 8.8 修改可变类型的全局变量

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

- 在函数中不使用global声明不可变全局变量时不能修改不可变全局变量的本质是不能修改全局变量的指向，即不能将全局变量指向新的数据，**因为会在局部命名空间自动创建一个新的同名变量**。
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

函数不能直接修改不可变全局变量，但是可以访问

## 8.9 星号变量（*）、（**）

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

# 9. 模块

**Python 模块(Module)，是一个 Python 文件，以 .py 结尾，包含了 Python 对象定义和Python语句**。

模块让你能够有逻辑地组织你的 Python 代码段。

把相关的代码分配到一个模块里能让你的代码更好用，更易懂。

**模块能定义函数，类和变量，模块里也能包含可执行的代码。**

## 9.1 命名空间

变量是拥有匹配对象的名字（标识符）。命名空间是一个包含了变量名称们（键）和它们各自相应的对象们（值）的字典。

一个 Python 表达式可以访问局部命名空间和全局命名空间里的变量。如果一个局部变量和一个全局变量重名，则局部变量会覆盖全局变量。

## 9.2 作用域

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

## 9.3 导入模块的3种方式

### 9.3.1 搜索路径

当你导入一个**模块(包)**，Python 解析器对模块位置的搜索顺序是：

- 1、当前目录
- 2、如果不在当前目录，Python 则搜索在 shell 变量 PYTHONPATH 下的每个目录
- 3、如果都找不到，Python会察看默认路径。UNIX下，默认路径一般为`/usr/local/lib/python/`

模块搜索路径存储在 system 模块的 sys.path 变量中。变量里包含当前目录，PYTHONPATH和由安装过程决定的默认目录。

```python
#hello.py
def say ():    
  print("Hello,World!") 
  
#say.py 
import hello 
hello.say()
```

### 9.3.2 导入模块方式一：临时添加模块完整路径

模块文件的存储位置，可以临时添加到 sys.path 变量中，即向 sys.path 中添加 D:\python_module（hello.py 所在目录），在 say.py 中的开头位置添加如下代码：

```python
import sys.path.append('D:\\python_module')
```

注意：在添加完整路径中，路径中的 '\' 需要使用 \ 进行转义，否则会导致语法错误。再次运行 say.py 文件，运行结果如下：

Hello,World!

可以看到，程序成功运行。在此基础上，我们在 say.py 文件中输出 sys.path 变量的值，会得到以下结果：

```python
['C:\\Users\\mengma\\Desktop', 'D:\\python3.6\\Lib\\idlelib', 'D:\\python3.6\\python36.zip', 'D:\\python3.6\\DLLs', 'D:\\python3.6\\lib', 'D:\\python3.6', 'C:\\Users\\mengma\\AppData\\Roaming\\Python\\Python36\\site-packages', 'D:\\python3.6\\lib\\site-packages', 'D:\\python3.6\\lib\\site-packages\\win32', 'D:\\python3.6\\lib\\site-packages\\win32\\lib', 'D:\\python3.6\\lib\\site-packages\\Pythonwin', 'D:\\python_module']
```

该输出信息中，红色部分就是临时添加进去的存储路径。需要注意的是，通过该方法添加的目录，只能在执行当前文件的窗口中有效，窗口关闭后即失效。

### 9.3.3 导入模块方式二：将模块保存到指定位置

如果要安装某些通用性模块，比如复数功能支持的模块、矩阵计算支持的模块、图形界面支持的模块等，这些都属于对 Python 本身进行扩展的模块，这种模块应该直接安装在 Python 内部，以便被所有程序共享，此时就可借助于 Python 默认的模块加载路径。

Python 程序默认的模块加载路径保存在 sys.path 变量中，因此，我们可以在 say.py 程序文件中先看看 sys.path 中保存的默认加载路径，向 say.py 文件中输出 sys.path 的值，如下所示：

```python
['C:\\Users\\mengma\\Desktop', 'D:\\python3.6\\Lib\\idlelib', 'D:\\python3.6\\python36.zip', 'D:\\python3.6\\DLLs', 'D:\\python3.6\\lib', 'D:\\python3.6', 'C:\\Users\\mengma\\AppData\\Roaming\\Python\\Python36\\site-packages', 'D:\\python3.6\\lib\\site-packages', 'D:\\python3.6\\lib\\site-packages\\win32', 'D:\\python3.6\\lib\\site-packages\\win32\\lib', 'D:\\python3.6\\lib\\site-packages\\Pythonwin']
```

上面的运行结果中，列出的所有路径都是 Python 默认的模块加载路径，但通常来说，我们默认将 Python 的扩展模块添加在 `lib\site-packages` 路径下，它专门用于存放 Python 的扩展模块和包。

所以，我们可以直接将我们已编写好的 hello.py 文件添加到 `lib\site-packages` 路径下，就相当于为 Python 扩展了一个 hello 模块，这样任何 Python 程序都可使用该模块。

移动工作完成之后，再次运行 say.py 文件，可以看到成功运行的结果：

```python
Hello,World!
```

### 9.3.4 导入模块方式三：设置环境变量

作为环境变量，PYTHONPATH 由装在一个列表里的许多目录组成。PYTHONPATH 的语法和 shell 变量 PATH 的一样。

Python 解释器会按照 PYTHONPATH 包含的路径进行一次搜索，直到找到指定要加载的模块

PYTHONPATH设置如下：

```shell
# PYTHONPATH=需要导入的模块的上一级目录(包含模块或包的目录)
export PYTHONPATH=$PYTHONPATH:/home/felix/workspace/reconciliation
```

## 9.6 import路径写法语句

**以下三个例子工作目录都是src,即sys.path.append("src")或PYTHONPATH = src**

### 9.6.1 主程序与模块程序在同一目录下

如下面程序结构:  

```python
`-- src 
  |-- mod1.py 
  `-- test1.py 
```

  若在程序test1.py中导入模块mod1, 则直接使用 

```python
import mod1 或 from mod1 import *; 
```

### 9.6.2 主程序所在目录是模块所在目录的父(或祖辈)目录 

如下面程序结构: 

```python
`-- src 
    |-- mod1.py 
    |-- mod2 
    |   `-- mod2.py 
    `-- test1.py 
```

若在程序test1.py中导入模块mod2 :

**错误写法**

```python
from mod2.mod2 import * 或import mod2.mod2
```

如果mod2文件夹里没有`__init__.py`或sys.path不包含src.mod2就会报错

**正确写法**

```python
`-- src 
    |-- mod1.py 
    |-- mod2 
    |   `-- mod2.py 
    ｜  `__init__.py
    `-- test1.py 
from mod2.mod2 import * 或import mod2.mod2 或 from mod2 import mod2
或
sys.path.append("src.mod2")
import mod2
```

### 9.6.3 主程序导入上层目录中的模块或其他目录(平级)下的模块 

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

若在程序test2.py中导入模块mod1和mod2。然后调用方式如下: 

下面程序执行方式均在程序文件所在目录下执行，如test2.py是在cd sub之后执行python test2.py 而test1.py是在cd src之后执行python test1.py; 不保证在src目录下执行python sub/test2.py成功。 

test2.py：

```python 
  import mod1 
  # import mod2.mod2 报错
  sys.path.append("src/mod2")
  import mod2
```

### 9.6.4 总结

#### 9.6.4.1 模块导入

- python解释器会根据搜索路径区搜索包或者模块，因此**能在sys.path+(from [xxx.]包 import 模块或import [xxx.]包/模块))里面找到通向包或者模块的的路径即可**

  导入路径：

  ```python
  import [文件夹].包名  # 需要用到_init_.py,会执行_init_.py;否则找不到包下的模块
  import [文件夹].包名.模块名  # 不会执行_init_.py
  from [文件夹].包名 import 模块名 # 会执行_init_.py
  from [文件夹].包名.模块名 import 成员 # 会执行_init_.py
  ```

- 至于`__init__.py`是为了方便导入包下的模块,包里包含哪些其他模块由`__init__.py`决定。

  包和文件夹的区别就是，包有`__init__.py`文件，包本质上都是模块,包里包含哪些其他模块由`__init__.py`决定，import 包名导入`__init__.py`里面定义的所有模块。

- Python 所有加载的模块信息都存放在 **sys.modules** 字典结构中，当 import 一个模块时，会按如下步骤来进行

  1. 如果 import A，检查 sys.modules 中是否已经有 A，如果有则不加载，如果没有则为 A 创建 module 对象，并加载 A，即可以重复导入，但只加载一次。

  2. 如果 from A import B，先为 A 创建 module 对象，再解析 A，从中寻找 B 并填充到 A 的 __dict__ 中

#### 9.6.4.2 调用类和函数

##### 同一文件夹下的调用

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

##### 在不同文件夹下调用

**调用类**

```python
#A.py文件的文件路径为：C:\AmyPython\Test1
#B.py中调用A.py文件的A类：

import sys
#把A.py的包路径或者自身模块路径添加到搜索路径
sys.path.append('C:\AmyPython\Test1')或export PYTHONPATH=$PYTHONPATH:C:\AmyPython\Test1
#============第1种===============
import A
a=A.A(2,3)
a.add()
#============第2种=============== 
from A import A
a=A(2,3)
a.add()
#============第3种=============== 
# 搜索路径到 C:\AmyPython
sys.path.append('C:\AmyPython')
# 在Test1下新建__init__.py
from Test1.A import A
a=A(2,3)
a.add()
或
from Test1 import A
a=A.A(2,3)
a.add()
或
import Test1.A
a=Test1.A.A(2,3)
a.add()
```

## 9.8 创建包，导入包

### 9.8.1 Python中的包

- 包就是文件夹，工程类的项目用文件夹区分层次，为了简化模块的导入操作，在文件夹下增加`__init__.py`,文件夹就模块化变成了包。
- 简化的导入操作在`__init__.py`里完成，包里包含哪些其他模块由`__init__.py`决定，import 包名就是导入`__init__.py`里面定义的所有模块。
- 包和文件夹的区别就是，包有`__init__.py`文件。
- 在python在搜索模块时，包的本质就是模块。

### 9.8.2 Python中____init__.py文件的作用详解(模块包和文件夹区别)

#### 9.8.2.1 标识该目录是一个python的模块包

`__init__.py` 文件的作用是将文件夹变为一个Python模块包,Python 中的每个模块的包中，都有`__init__.py` 文件。

如果你是使用python的相关IDE来进行开发，那么如果目录中存在该文件，该目录就会被识别为 **module package 。**

#### 9.8.2.2 简化模块导入操作

- 1.假设我们的模块包的目录结构如下：

  ```css
  pythonpath='./demo'
  demo
  └── mypackage
      ├── subpackage_1
      │   ├── test11.py
      │   └── test12.py
      ├── subpackage_2
      │   ├── test21.py
      │   └── test22.py
      └── subpackage_3
          ├── test31.py
          └── test32.py
  ```

  2.如果我们使用最直接的导入方式，将整个文件拷贝到工程目录下，然后直接导入：

  ```jsx
  from mypackage.subpackage_1 import test11
  from mypackage.subpackage_1 import test12
  from mypackage.subpackage_2 import test21
  from mypackage.subpackage_2 import test22
  from mypackage.subpackage_3 import test31
  from mypackage.subpackage_3 import test32
  ```

  3.这样的话，看起来就会很麻烦，查找的时候也会麻烦，此时`__init__.py`就起到了简化的作用。

  4.mypackage下新建`__init__.py`	并添加如下代码

  ```python
  from mypackage.subpackage_1 import test11
  from mypackage.subpackage_1 import test12
  from mypackage.subpackage_2 import test21
  from mypackage.subpackage_2 import test22
  from mypackage.subpackage_3 import test31
  from mypackage.subpackage_3 import test32
  ```

  5.导入

  ```python
  from mypackage import test11
  #就可以使用test11...了
  ```

#### 9.8.2.3 `__init__.py` 是怎么工作的？

实际上，如果目录中包含了 `__init__.py `时，当用 import 导入该目录时，会执行` __init__.py` 里面的代码。

我们在mypackage目录下增加一个 `__init__.py` 文件来做一个实验：

```python
.
└── mypackage
    ├── __init__.py
    ├── subpackage_1
    │   ├── test11.py
    │   └── test12.py
    ｜  └── __init__.py
    ├── subpackage_2
    │   ├── test21.py
    │   └── test22.py
    │   └── __init__.py
    └── subpackage_3
        ├── test31.py
        └── test32.py
        └── __init__.py
```

**mypackage/`__init__.py`** 里面加一个**print**，如果执行了该文件就会输出：

```python
print("You have imported mypackage")
```

下面直接用交互模式进行 **import**

```python
>>> import mypackage
You have imported mypackage
```

很显然，**`__init__.py`** 在包被导入时会被执行。

#### 9.8.2.4 模块导入路径

我们再做一个实验，在 **mypackage/`__init__.py`** 添加以下语句：

```python
from subpackage_1 import test11
```

我们导入 mypackage 试试:

```python
>>> import mypackage
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/home/taopeng/Workspace/Test/mypackage/__init__.py", line 2, in <module>
    from subpackage_1 import test11
ImportError: No module named 'subpackage_1'
```

报错了。。。怎么回事？

原来，在我们执行**`import`**时，当前目录是不会变的（就算是执行子目录的文件），还是需要完整的包名。

```python
from mypackage.subpackage_1 import test11
```

综上，我们可以在**`__init__.py`** 指定默认需要导入的模块

#### 9.8.2.5 使用

**例1**

我们在**`mypackage/__init__.py`** 下添加

```python
from mypackage.subpackage_1 import test11
```

使用

```python
from mypackage import test11 
# 相当于mypackage执行了from mypackage.subpackage_1 import test11，mypackage模块字典里有了test11;就可以从mypackage导入test11了
```

### 9.8.3 Python包的导入及调用

#### 9.8.3.1 示例搭建

现在我们创建一个非常简单的包，该包的名称为 my_package，可以仿照以上 2 步进行：

1. 创建一个文件夹，其名称设置为 my_package；

2. 在该文件夹中添加一个 `__init__.py` 文件，此文件中可以不编写任何代码。不过，这里向该文件编写如下代码：

   ```python
   '''
   http://c.biancheng.net/
   创建第一个 Python 包
   '''
   print('http://c.biancheng.net/python/')
   ```

   可以看到，`__init__.py `文件中，包含了 2 部分信息，分别是此包的说明信息和一条 print 输出语句。


由此，我们就成功创建好了一个 Python 包。

创建好包之后，我们就可以向包中添加模块（也可以添加包）。这里给 my_package 包添加 2 个模块，分别是 module1.py、module2.py，各自包含的代码分别如下所示（读者可直接复制下来）：

```python
#module1.py模块文件
def display(arc):
    print(arc)
#module2.py 模块文件
class CLanguage:
    def display(self):
        print("http://c.biancheng.net/python/")
```

现在，我们就创建好了一个具有如下文件结构的包：

```python
my_package
   ┠── __init__.py
   ┠── module1.py
   ┗━━ module2.py
```

#### 9.8.3.2 import [文件夹名.]包名[.模块名 [as 别名]]

```python
my_package
   ┠── __init__.py
   ┠── module1.py
   ┗━━ module2.py
```

以前面创建好的 my_package 包为例，导入 module1 模块并使用该模块中成员可以使用如下代码：

```python
import my_package.module1
my_package.module1.display("http://c.biancheng.net/java/")
```

运行结果为：

```python
http://c.biancheng.net/java/
```

可以看到，通过此语法格式导入包中的指定模块后，在使用该模块中的成员（变量、函数、类）时，需添加“包名.模块名”为前缀。当然，如果使用 as 给包名.模块名”起一个别名的话，就使用直接使用这个别名作为前缀使用该模块中的方法了，例如：

```python
import my_package.module1 as module
module.display("http://c.biancheng.net/python/")
```

程序执行结果为：

```python
http://c.biancheng.net/python/
```

⚠️注意点：

`import 包名.模块名 [as 别名]`不会执行包下面的`__init__.py`,是因为直接一步找到模块级别

另外，当直接导入指定包时，程序会自动执行该包所对应文件夹下的` __init__.py` 文件中的代码。例如：

```python
import my_package
my_package.module1.display("http://c.biancheng.net/linux_tutorial/")
```

**直接导入包名，并不会将包中所有模块全部导入到程序中，它的作用仅仅是导入并执行包下的 `__init__.py `文件，因此，运行该程序，在执行 `__init__.py `文件中代码的同时，还会抛出 AttributeError 异常（访问的对象不存在）：**

```python
http://c.biancheng.net/python/
Traceback (most recent call last):
 File "C:\Users\mengma\Desktop\demo.py", line 2, in <module>
  my_package.module1.display("http://c.biancheng.net/linux_tutorial/")
AttributeError: module 'my_package' has no attribute 'module1'
```

⚠️注意点：

我们知道，**包的本质就是模块，因此和导入模块一样。直接导入包时，当前程序中也会以包名(my_package)创建一个类型为 module 的变量，但module 类型的my_package变量(包名，本质是模块)里没有module1的**，导入模块my_package时是找不到module1模块的，除非`__init__.py`里有导入：

```python
import my_package
print(my_package)
print(my_package.__doc__)
print(type(my_package))
```

运行结果为：

```python
http://c.biancheng.net/python/
<module 'my_package' from 'C:\\Users\\mengma\\Desktop\\my_package\\__init__.py'>

http://c.biancheng.net/
创建第一个 Python 包

<class 'module'>
```

#### 9.8.3.3 from [文件夹名.]包名 import 模块名 [as 别名]

仍以导入 my_package 包中的 module1 模块为例，使用此语法格式的实现代码如下：

```python
from my_package import module1
module1.display("http://c.biancheng.net/golang/")
```

运行结果为：

```python
http://c.biancheng.net/python/
http://c.biancheng.net/golang/
```

可以看到，使用此语法格式导入包中模块后，在使用其成员时不需要带包名前缀，但需要带模块名前缀。

当然，我们也可以使用 as 为导入的指定模块定义别名，例如：

```python
from my_package import module1 as module
module.display("http://c.biancheng.net/golang/")
```

此程序的输出结果和上面程序完全相同。

同样，既然包也是模块，那么这种语法格式自然也支持 `from 包名 import *` 这种写法，它和 import 包名 的作用一样，都只是将该包的 `__init__.py `文件导入并执行。

#### 9.8.3.4 from [文件夹名.]包名.模块名 import 成员名 [as 别名]

此语法格式用于向程序中导入“包.模块”中的指定成员（变量、函数或类）。通过该方式导入的变量（函数、类），在使用时可以直接使用变量名（函数名、类名）调用，例如：

```python
from my_package.module1 import display
display("http://c.biancheng.net/shell/")
```

运行结果为：

```python
http://c.biancheng.net/python/
http://c.biancheng.net/shell/
```

当然，也可以使用 as 为导入的成员起一个别名，例如：

```python
from my_package.module1 import display as dis
dis("http://c.biancheng.net/shell/")
```

该程序的运行结果和上面相同。

另外，在使用此种语法格式加载指定包的指定模块时，可以使用 * 代替成员名，表示加载该模块下的所有成员。例如：

```python
from my_package.module1 import *
display("http://c.biancheng.net/python")
```

### 9.8.4 总结

- python解释器会根据搜索路径区搜索包或者模块，因此**能在sys.path+(from [xxx.]包 import 模块或import [xxx.]包/模块))里面找到通向包或者模块的的路径即可**

  导入路径：

  ```python
  import [文件夹].包名  # 需要用到_init_.py,会执行_init_.py;否则找不到包下的模块
  import [文件夹].包名.模块名  # 不会执行_init_.py
  from [文件夹].包名 import 模块名 # 会执行_init_.py
  from [文件夹].包名.模块名 import 成员 # 会执行_init_.py
  ```

- 至于`__init__.py`是为了方便导入包下的模块,包里包含哪些其他模块由`__init__.py`决定。

  包和文件夹的区别就是，包有`__init__.py`文件，包本质上都是模块,包里包含哪些其他模块由`__init__.py`决定，import 包名导入`__init__.py`里面定义的所有模块。

- Python 所有加载的模块信息都存放在 **sys.modules** 字典结构中，当 import 一个模块时，会按如下步骤来进行

  1. 如果 import A，检查 sys.modules 中是否已经有 A，如果有则不加载，如果没有则为 A 创建 module 对象，并加载 A，即可以重复导入，但只加载一次。

  2. 如果 from A import B，先为 A 创建 module 对象，再解析 A，从中寻找 B 并填充到 A 的 __dict__ 中

### 9.8.5 相对路径导入问题

https://www.cnblogs.com/f-ck-need-u/p/9961372.html#%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84%E5%AF%BC%E5%85%A5%E9%99%B7%E9%98%B1

绝对导入的格式为 import A.B 或 from A import B，相对导入格式为 from .A import B 或 from ..X import Y，**.** 代表当前模块，**..** 代表上层模块，**...** 代表上上层模块，依次类推。

**需要注意：存在相对导入语句的模块，是不能直接运行的**

这是因为：一个模块直接运行，Python 认为这个模块就是顶层模块，不存在层次结构，所以找不到其它的相对路径。

而要正确运行，就要显式的指定路径

## 9.9 globals() 和 locals() 函数

根据调用地方的不同，globals() 和 locals() 函数可被用来返回全局和局部命名空间里的名字。

如果在函数内部调用 locals()，返回的是所有能在该函数里访问的命名。

如果在函数内部调用 globals()，返回的是所有在该函数里能访问的全局名字。

两个函数的返回类型都是字典。所以名字们能用 keys() 函数摘取。

# 10. 面向对象

## 10.1 面向对象技术简介

- **类(Class):** 用来描述具有相同的属性和方法的对象的集合。它定义了该集合中每个对象所共有的属性和方法。对象是类的实例。
- **类变量：**类变量在整个实例化的对象中是公用的。类变量定义在类中且在函数体之外。类变量通常不作为实例变量使用。
- **数据成员：**类变量或者实例变量, 用于处理类及其实例对象的相关的数据。
- **方法重写：**如果从父类继承的方法不能满足子类的需求，可以对其进行改写，这个过程叫方法的覆盖（override），也称为方法的重写。
- **局部变量：**定义在方法（函数）中的变量，只作用于当前实例的类。
- **实例变量：**在类的声明中，属性是用变量来表示的。这种变量就称为实例变量，是在类声明的内部但是在类的其他成员方法之外声明的。
- **继承：**即一个派生类（derived class）继承基类（base class）的字段和方法。继承也允许把一个派生类的对象作为一个基类对象对待。例如，有这样一个设计：一个Dog类型的对象派生自Animal类，这是模拟"是一个（is-a）"关系（例图，Dog是一个Animal）。
- **实例化：**创建一个类的实例，类的具体对象。
- **方法：**类中定义的函数。
- **对象：**通过类定义的数据结构实例。对象包括两个数据成员（类变量和实例变量）和方法。

## 10.2 单下划线、双下划线、头尾双下划线说明

- **__foo__**: 定义的是特殊方法，一般是系统定义名字 ，类似 **__init__()** 之类的。
- **_foo**: 以单下划线开头的表示的是 protected 类型的变量，即保护类型只能允许其本身与子类进行访问，不能用于 **from module import \***
- **__foo**: 双下划线的表示的是私有类型(private)的变量, 只能是允许这个类本身进行访问了。

## 10.3 self

**self代表类的实例，而非类**

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

## 10.4 python的局部变量，全局变量，类(成员)变量，实例变量

```python
a = 1 # 这个是全局变量 全局这个.py 任意一个函数或者方法都可以使用

def test1():
    a = 2 # 这个是局部变量 在这个函数可以使用

class clazz1():
    a = 3 # 这个类变量 所有类的实例都可以使用
    def test2(self):
    	a = 4 # 这个是局部变量 在这个方法可以使用
    	self.b = 5 # 这个是实例变量，属于单个实例
```

Python中的一切都是对象，所以就有以下的结论

### 10.4.1 类(成员)变量

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

### 10.4.2 实例变量

是对象的属性（因为每一个实例对象，是类的一个对象，在每个类的对象里相互独立）

**实例变量的定义方式**

1. Python变量的本质是被赋值，**实例变量是在实例方法内第一次通过self方式赋值来定义，该实例方法不一定是构造方法，只要是实例方法中通过self给一个未定义的变量赋值都是定义一个实例变量**。不过由于构造方法在实例创建是即执行，因此在实例定义时就需要初始化的实例变量可以通过构造方法赋值来定义；
2. 实例变量在类定义外访问时，可以通过”实例对象.实例变量”方式访问，包括赋值，如果通过”实例对象.实例变量”方式给一未定义变量赋值，也是定义一个实例变量；
3. 任何时候通过以上两种方式给一个未定义的实例变量赋值时，都是新定义实例变量，即实例变量是可以动态增加的，动态增加的实例变量不影响其他实例变量，在实例对象释放后就不再有作用；

**实例变量的访问方式**

1. 直接在实例方法中通过self方式访问；
2. 在实例定义代码内通过“实例名.变量名”方式访问

### 10.4.3 局部变量

是函数或方法的属性（因为每一个函数或方法是function或method的一个对象）

**只能在该函数中调用**

### 10.4.4 全局变量

是模块的属性（因为每一个模块是module的一个对象）

**全局变量是在整个.py文件中声明，全局范围内都可以访问**

## 10.5 Python实例方法、静态方法和类方法详解（包含区别和用法）

和类属性一样，类方法也可以进行更细致的划分，具体可分为类方法、实例方法和静态方法。

和类属性的分类不同，对于初学者来说，区分这 3 种类方法是非常简单的，即采用 @classmethod 修饰的方法为类方法；采用 @staticmethod 修饰的方法为静态方法；不用任何修改的方法为实例方法。

### 10.5.1 [Python](http://c.biancheng.net/python/)类实例方法

通常情况下，在类中定义的方法默认都是实例方法。前面章节中，我们已经定义了不只一个实例方法。不仅如此，类的构造方法理论上也属于实例方法，只不过它比较特殊。

比如，下面的类中就用到了实例方法：

```python
class CLanguage:    #类构造方法，也属于实例方法    
  def __init__(self):        
    self.name = "C语言中文网"        
    self.add = "http://c.biancheng.net"    
   # 下面定义了一个say实例方法    
   def say(self):        
      print("正在调用 say() 实例方法")
```

实例方法最大的特点就是，它最少也要包含一个 self 参数，用于绑定调用此方法的实例对象（Python 会自动完成绑定）。实例方法通常会用类对象直接调用，例如：

```python
clang = CLanguage()clang.say()
```

运行结果：

```python
正在调用 say() 实例方法
```

当然，Python 也支持使用类名调用实例方法，但此方式需要手动给 self 参数传值。例如：

```python
#类名调用实例方法，需手动给 self 参数传值clang = CLanguage()CLanguage.say(clang)
```

运行结果为：

```python
正在调用 say() 实例方法
```

### 10.5.2 Python类方法

Python 类方法和实例方法相似，它最少也要包含一个参数，只不过类方法中通常将其命名为 cls，Python 会自动将类本身绑定给 cls 参数（注意，绑定的不是类对象）。也就是说，我们在调用类方法时，无需显式为 cls 参数传参。

和 self 一样，cls 参数的命名也不是规定的（可以随意命名），只是 Python 程序员约定俗称的习惯而已。

和实例方法最大的不同在于，类方法需要使用`＠classmethod`修饰符进行修饰，例如：

```python
class CLanguage:    #类构造方法，也属于实例方法    
  def __init__(self):        
    self.name = "C语言中文网"        
    self.add = "http://c.biancheng.net"    
    #下面定义了一个类方法    
    @classmethod    
    def info(cls):        
      print("正在调用类方法",cls)
```

> 注意，如果没有 ＠classmethod，则 Python 解释器会将 fly() 方法认定为实例方法，而不是类方法。

类方法推荐使用类名直接调用，当然也可以使用实例对象来调用（不推荐）。例如，在上面 CLanguage 类的基础上，在该类外部添加如下代码：

```python
#使用类名直接调用类方法CLanguage.info()#使用类对象调用类方法clang = CLanguage()clang.info()
```

运行结果为：

```python
正在调用类方法 <class '__main__.CLanguage'>
正在调用类方法 <class '__main__.CLanguage'>
```

### 10.5.3 Python类静态方法

静态方法，其实就是我们学过的函数，和函数唯一的区别是，静态方法定义在类这个空间（类命名空间）中，而函数则定义在程序所在的空间（全局命名空间）中。

静态方法没有类似 self、cls 这样的特殊参数，因此 Python 解释器不会对它包含的参数做任何类或对象的绑定。也正因为如此，类的静态方法中无法调用任何类属性和类方法。

静态方法需要使用`＠staticmethod`修饰，例如：

```python
class CLanguage:    @staticmethod    def info(name,add):        print(name,add)
```

静态方法的调用，既可以使用类名，也可以使用类对象，例如：

```python
#使用类名直接调用静态方法
CLanguage.info("C语言中文网","http://c.biancheng.net")
#使用类对象调用静态方法
clang = CLanguage()clang.info("Python教程","http://c.biancheng.net/python")
```

运行结果为：

```python
C语言中文网 http://c.biancheng.net
Python教程 http://c.biancheng.net/python
```

在实际编程中，几乎不会用到类方法和静态方法，因为我们完全可以使用函数代替它们实现想要的功能，但在一些特殊的场景中（例如工厂模式中），使用类方法和静态方法也是很不错的选择。

## 10.6 Python类调用实例方法

通过前面的学习，类方法大体分为 3 类，分别是类方法、实例方法和静态方法，其中实例方法用的是最多的。我们知道，实例方法的调用方式其实有 2 种，既可以采用类对象调用，也可以直接通过类名调用。

通常情况下，我们习惯使用类对象调用类中的实例方法。但如果想用类调用实例方法，不能像如下这样：

```python
class CLanguage:    
  def info(self):        
    print("我正在学 Python")#通过类名直接调用实例方法CLanguage.info()
```

运行上面代码，程序会报出如下错误：

```python
Traceback (most recent call last):
 File "D:\python3.6\demo.py", line 5, in <module>
  CLanguage.info()
TypeError: info() missing 1 required positional argument: 'self'
```

其中，最后一行报错信息提示我们，调用 info() 类方式时缺少给 self 参数传参。这意味着，和使用类对象调用实例方法不同，通过类名直接调用实例方法时，Python 并不会自动给 self 参数传值。

> 读者想想也应该明白，self 参数需要的是方法的实际调用者（是类对象），而这里只提供了类名，当然无法自动传值。

因此，如果想通过类名直接调用实例方法，就必须手动为 self 参数传值。例如修改上面的代码为：

```python
class CLanguage:    
  def info(self):        
    print("我正在学 Python")
clang = CLanguage()#通过类名直接调用实例方法
CLanguage.info(clang)
```

再次运行程序，结果为：

```python
我正在学 Python
```

可以看到，通过手动将 clang 这个类对象传给了 self 参数，使得程序得以正确执行。实际上，这里调用实例方法的形式完全是等价于 `clang.info()。`

值得一提的是，上面的报错信息只是让我们手动为 self 参数传值，但并没有规定必须传一个该类的对象，其实完全可以任意传入一个参数，例如：

```python
class CLanguage:    
  def info(self):        
    print(self,"正在学 Python")#通过类名直接调用实例方法
CLanguage.info("zhangsan")
```

运行结果为：

```python
zhangsan 正在学 Python
```

可以看到，"zhangsan" 这个字符串传给了 info() 方法的 self 参数。显然，无论是 info() 方法中使用 self 参数调用其它类方法，还是使用 self 参数定义新的实例变量，胡乱的给 self 参数传参都将会导致程序运行崩溃。

总的来说，Python 中允许使用类名直接调用实例方法，但必须手动为该方法的第一个 self 参数传递参数，这种调用方法的方式被称为“非绑定方法”。

> 用类的实例对象访问类成员的方式称为绑定方法，而用类名调用类成员的方式称为非绑定方法。

# 12. 数据库操作

<https://blog.csdn.net/guofeng93/article/details/53994112>

## 12.1 数据库驱动

我们使用Django、flask等来操作MySQL，实际上底层还是通过Python来操作的。因此我们想要用Django来操作MySQL，首先还是需要安装一个驱动程序。在Python3中，驱动程序有多种选择。比如有pymysql以及mysqlclient等。
常见的Mysql驱动介绍：

- MySQL-python：也就是MySQLdb。是对C语言操作MySQL数据库的一个简单封装。遵循了Python DB API v2。但是只支持Python2，目前还不支持Python3。

- mysqlclient：是MySQL-python的另外一个分支。支持Python3并且修复了一些bug。

- pymysql：纯Python实现的一个驱动。因为是纯Python编写的，因此执行效率不如MySQL-python。并且也因为是纯Python编写的，因此可以和Python代码无缝衔接。

- MySQL Connector/Python：MySQL官方推出的使用纯Python连接MySQL的驱动。因为是纯Python开发的,效率不高。

  ```python
  pip install mysql-connector-python==8.0.22
  ```

  

# 13. 网络编程

HTTP、TCP与UDP、Socket与Websocket之间的联系与区别

https://blog.csdn.net/weixin_40155271/article/details/80869542

# 14. 绝对路径/相对路径

明确一个文件所在的路径，有 2 种表示方式，分别是：

- 绝对路径：总是从根文件夹开始，Window 系统中以盘符（C：、D：）作为根文件夹，而 OS X 或者 Linux 系统中以 / 作为根文件夹。

- 相对路径：

  1.对于文件而言，指的是文件相对于**当前工作目录**所在的位置。例如，当前工作目录为 dev，若文件 demo.txt 就位于这个dev文件夹下，则 demo.txt 的相对路径表示为 ".\demo.txt"（其中 .\ 就表示当前所在目录）

  2.对于程序而言不是程序所在的目录的相对目录，而是，你是在何处打开这个程序，就以这个目录作为相对目录，也就是**相对路径指的是相对于入口函数所在路径**

# 15. Python pdb断点调试详解

**开启调试**

```python
python3 -m pdb myscript.py
pdb.set_trace() # 引入内置的pdb模块，并运行set_trace函数就可以触发调试器
```

**常用命令**

| 命令 | 例子                                 |          |
| :--- | ------------------------------------ | -------- |
| b    | b 10 #断点设置在本py的第10行         | break    |
|      | b ots.py:20 #断点设置到 ots.py第20行 |          |
|      | b #查看断点编号                      |          |
|      | cl 2 #删除第2个断点                  |          |
| n    | 单步运行                             | next     |
| s    | 细点运行 也就是会下到，方法          | step     |
| c    | 跳到下个断点                         | continue |
| p    | p param #查看当前 变量值             | print    |
| l    | 查看运行到某处代码                   | list     |
| a    | 查看全部栈内变量                     | args     |
| r    | 执行代码直到从当前函数返回           | return   |
| q    | 中止并退出                           | quit     |



# 15. PyCharm中import时无法识别自己写的模块

<https://blog.csdn.net/enter89/article/details/79960230>

# 16. Anaconda python包和环境管理工具

https://www.jianshu.com/p/2f3be7781451

https://zhuanlan.zhihu.com/p/64930395

Python易用，但用好却不易，其中比较头疼的就是包管理和Python不同版本的问题。

## 16.1 Anaconda概述

[Anaconda](https://link.jianshu.com?t=https://www.continuum.io/why-anaconda)是一个用于科学计算的Python发行版，支持 Linux, Mac, Windows系统，提供了包管理与环境管理的功能，可以很方便地解决多版本python并存、切换以及各种第三方包安装问题。Anaconda利用工具/命令`conda`来进行package和environment的管理，并且已经包含了Python和相关的配套工具。

这里先解释下conda、anaconda这些概念的差别。`conda`可以理解为一个工具，也是一个可执行命令，其核心功能是**包管理**与**环境管理**。包管理与pip的使用类似，环境管理则允许用户方便地安装不同版本的python并可以快速切换。Anaconda则是一个打包的集合，里面预装好了conda、某个版本的python、众多packages、科学计算工具等等，所以也称为Python的一种发行版。其实还有Miniconda，顾名思义，它只包含最基本的内容——python与conda，以及相关的必须依赖项，对于空间要求严格的用户，Miniconda是一种选择。

进入下文之前，说明一下conda的设计理念——**conda将几乎所有的工具、第三方包都当做package对待，甚至包括python和conda自身**！因此，conda打破了包管理与环境管理的约束，能非常方便地安装各种版本python、各种package并方便地切换。

## 16.2 Anaconda的安装

### Part1. 下载Anaconda

直接在[官网](https://link.zhihu.com/?target=https%3A//www.anaconda.com/distribution/%23linux)下载挺慢的，建议使用清华镜像

在最近的日期中，选择一个对应自己系统版本的Anaconda3安装包，x86_64表示兼容32位和64位系统。右键复制链接，在linux中使用wget下载。

```shell
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2019.03-Linux-x86_64.sh
```

### Part2. 安装Anaconda

在下载目录中执行该文件，根据下载的版本不同，名称会有不同：

```shell
bash Anaconda3-2019.03-Linux-x86_64.sh
```

接下来会出现一堆的License许可声明，一路回车向下，出现如下文字，输入yes：

```shell
Do you accept the license terms? [yes|no]
[no] >>> 
Please answer 'yes' or 'no':
>>> yes
```

之后要选择安装目录，如果无需更改直接回车Enter，如需更改要输入绝对路径：

（可以先查看下硬盘的挂载情况再自行选择安装目录，查看挂载情况的语句是df -h）

```shell
Anaconda3 will now be installed into this location:
/root/anaconda3

  - Press ENTER to confirm the location
  - Press CTRL-C to abort the installation
  - Or specify a different location below

[/root/anaconda3] >>> 
```

等待一会儿后有选项，问是否需要进行conda的初始化，建议输入no。若选择yes，是在/root/.bashrc目录中自动添加环境变量，会使得开机自动启动base环境。（这里应该是新版安装包的改动之处，老版本的安装包都是问是否需要添加conda至环境变量，且默认直接回车Enter是不添加，若未添加后续需要手动添加。）

```shell
Do you wish the installer to initialize Anaconda3
by running conda init? [yes|no]
[no] >>> no
```

看到如下提示则安装成功：

```shell
Thank you for installing Anaconda3!

===========================================================================

Anaconda and JetBrains are working together to bring you Anaconda-powered
environments tightly integrated in the PyCharm IDE.

PyCharm for Anaconda is available at:
https://www.anaconda.com/pycharm
```

如果conda的初始化时选择了yes，那么已经配置了环境变量，输入简单的命令测试一下：

```shell
conda activate # 进入conda环境 出现(base)则说明安装成功
conda deactivate # 退出conda环境
```

**这里需要注意的是新版废用了source activate的命令，如使用旧版安装包则使用如下命令：**

```shell
source activate # 进入conda环境 出现(base)则说明安装成功
source deactivate # 退出conda环境
```

**如果conda的初始化时选择了no**，则需要自行配置环境变量。

打开profile文件：

```shell
vi /etc/profile
```

在文件最后加入如下语句（路径需要根据自己的安装位置更改）：

```shell
PATH=$PATH:/opt/anaconda3/bin
export PATH
```

按住shift键+:键，输入wq，保存文件并退出。最后使用如下命令刷新环境变量即可：

```shell
source /etc/profile
echo $PATH
```

## 16.3 Conda的环境管理

Conda的环境管理功能允许我们同时安装若干不同版本的Python，并能自由切换。对于上述安装过程，假设我们采用的是Python 3.6对应的安装包，那么Python3.6就是默认的环境（默认名字是`root`，注意这个root不是超级管理员的意思）。

假设我们需要安装Python 3.4，此时，我们需要做的操作如下：

```shell
# 创建一个名为python38的环境，指定Python版本是3.8（不用管是3.8.x，conda会为我们自动寻找3.8.x中的最新版本）
conda create --name python38 python=3.8

# 这里需要注意的是新版废用了source activate的命令,使用conda
# 安装好后，使用activate激活某个环境
activate python38 # for Windows
source activate python38 # for Linux & Mac
# 激活后，会发现terminal输入的地方多了python38的字样，实际上，此时系统做的事情就是把默认3.5环境从PATH中去除，再把3.8对应的命令加入PATH

# 此时，再次输入
python --version
# 可以得到`Python 3.8.5 :: Anaconda 4.1.1 (64-bit)`，即系统已经切换到了3.8的环境

# 退出python 3.8环境，运行
deactivate python38 # for Windows
source deactivate python38 # for Linux & Mac

# 删除一个已有的环境
conda remove --name python38 --all

# 查看已安装的环境，当前被激活的环境会显示有一个星号或者括号
conda info -e
```

用户安装的不同python环境都会被放在目录`~/anaconda/envs`下，可以在命令中运行`conda info -e`查看已安装的环境，当前被激活的环境会显示有一个星号或者括号。

## 16.4 Conda的包管理

Conda的包管理就比较好理解了，这部分功能与`pip`类似。

例如，如果需要安装scipy：

```shell
# 安装scipy
conda install scipy
# conda会从从远程搜索scipy的相关信息和依赖项目，对于python 3.8，conda会同时安装numpy和mkl（运算加速的库）

# 查看已经安装的packages
conda list
# 最新版的conda是从site-packages文件夹中搜索已经安装的包，不依赖于pip，因此可以显示出通过各种方式安装的包
```

conda的一些常用操作如下：

```shell
# 查看当前环境下已安装的包
conda list

# 查看某个指定环境的已安装包
conda list -n python38

# 查找package信息
conda search numpy

# 安装package
conda install -n python38 numpy
# 如果不用-n指定环境名称，则被安装在当前活跃环境
# 也可以通过-c指定通过某个channel安装

# 更新package
conda update -n python38 numpy

# 删除package
conda remove -n python38 numpy
```

前面已经提到，conda将conda、python等都视为package，因此，完全可以使用conda来管理conda和python的版本，例如

```shell
# 更新conda，保持conda最新
conda update conda

# 更新anaconda
conda update anaconda

# 更新python
conda update python
# 假设当前环境是python 3.4, conda会将python升级为3.4.x系列的当前最新版本
```

如果创建新的python环境，比如3.8，运行`conda create -n python38 python=3.8`之后，conda仅安装python 3.8相关的必须项，如python, pip等，如果希望该环境像默认环境那样，安装anaconda集合包，只需要：

```shell
# 在当前环境下安装anaconda包集合
conda install anaconda

# 结合创建环境的命令，以上操作可以合并为
conda create -n python34 python=3.4 anaconda
# 也可以不用全部安装，根据需求安装自己需要的package即可
```

## 16.5 设置国内镜像

如果需要安装很多packages，你会发现conda下载的速度经常很慢，因为Anaconda.org的服务器在国外。所幸的是，清华TUNA镜像源有Anaconda仓库的镜像，我们将其加入conda的配置即可：

```shell
# 添加Anaconda的TUNA镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
# TUNA的help中镜像地址加有引号，需要去掉

# 设置搜索时显示通道地址
conda config --set show_channel_urls yes
```

执行完上述命令后，会生成`~/.condarc`(Linux/Mac)或`C:\Users\USER_NAME\.condarc`文件，记录着我们对conda的配置，直接手动创建、编辑该文件是相同的效果。

# 17. python包和环境管理

如果不用Anaconda

## 17.1 windows环境

### 17.1.1 win10下python2和python3同时存在

分别修改python.exe为python2.exe和python3.exe,同时配置到环境变量中，建立软连接

### 17.1.2 python2和python3同时存在时pip的使用

https://www.cnblogs.com/yanqingxu/p/10735011.html

#### **Windows pip升级**

```shell
python -m pip install -U pip   # python2.x
python -m pip3 install -U pip    # python3.x
```

## 17.2 Linux环境

### **17.2.1 安装python模块**

python安装第三方模块的方式

1. whl包的安装：pip install **.whl(要有pip 和 下载好的whl文件)

2. tar.gz包的安装：python setup.py install (先将tar.gz解压到指定文件夹，在地址栏输入cmd)

3. pip install <PACKAGE-NAME>
4. easy_install <PACKAGE-NAME>

#### 17.2.1.1 easy_install

easy_install是由PEAK(Python Enterprise Application Kit)开发的setuptools包里带的一个命令，它用来安装egg包。制作和安装egg包？

##### 安装setuptools

ubuntu:

```shell
sudo apt-get install python-setuptools
```

centos:

```shell 
yum install -y setuptool
```

##### 使用

```shell
easy_install <PACKAGE-NAME>
```

##### 安装pip

```shell
easy_install pip
```

##### egg包

python的egg文件有点像java中的jar文件或者压缩包，是一个工程打包文件，便于安装部署。

而setuptools就是一个提供包管理的工具或者说是软件。

###### 制作

1.首先是制作一个干净的目录用于打包，本例中就简单粗暴的定义为~/project目录，要打包的package就命名为spawn-egg（注：这里只是用来Demo的名字，命名方式并不适合所有的python环境）。目录结构如下：

```shell
ilab@iLab-Dev:~/project$ find ./
./
./spawn-egg
./spawn-egg/Base.pyc
./spawn-egg/hello.py
./spawn-egg/Base.py
./spawn-egg/__init__.py
```

2.然后就是制作一个setup.py脚本，与其说是脚本，这个文件更像是一个配置文件

```shell
vi ~/project/setup.py
#文件内容
from setuptools import setup, find_packages

setup(
 name = "spawn-egg",
 version="0.1.0",
 packages = find_packages(),
 description = "test how to make eggs",
 author = "Litrin J.",
 author_email = "XXX@gmail.com",

 license = "GPL",
 keywords = ("test", "python"),
 platforms = "Independant",
 url = "",
 )
```

就是一个setup函数，入参真心不少，好在字面上很容易理解它的用途，总结起来就这几个比较常用：

- name：就是名字了
- version：版本号
- packages：包含的package，setuptools自带了一个find_packages()工具可以自动从name同名的folder下找到package。
- description：对于这个包的描述，如果描述内容很长，可以把这里当成摘要，更详细的内容使用long_description参数
- author/author_email：作者和邮箱
- keywords：关键字，便于发布到pip上，用于搜索。

3.准备打包环境。打包环境需要setuptools

4.生成egg

```shell
ilab@iLab-Dev:~/project$ python setup.py bdist_egg
running bdist_egg
running egg_info
creating spawn_egg.egg-info
writing spawn_egg.egg-info/PKG-INFO
...
reading manifest file 'spawn_egg.egg-info/SOURCES.txt'
writing manifest file 'spawn_egg.egg-info/SOURCES.txt'
installing library code to build/bdist.linux-x86_64/egg
running install_lib
running build_py
creating build
creating build/lib.linux-x86_64-2.7
creating build/lib.linux-x86_64-2.7/spawn-egg
...
creating dist
creating 'dist/spawn_egg-0.1.0-py2.7.egg' and adding 'build/bdist.linux-x86_64/egg' to it
removing 'build/bdist.linux-x86_64/egg' (and everything under it)
```

egg文件已经在dist文件夹下生成好了，其实就是一个zip文件包

###### 安装

```shell
ilab@iLab-Dev:~/project/dist$ sudo easy_install spawn_egg-0.1.0-py2.7.egg
[sudo] password for ilab:
Processing spawn_egg-0.1.0-py2.7.egg
creating /usr/local/lib/python2.7/dist-packages/spawn_egg-0.1.0-py2.7.egg
Extracting spawn_egg-0.1.0-py2.7.egg to /usr/local/lib/python2.7/dist-packages
Adding spawn-egg 0.1.0 to easy-install.pth file

Installed /usr/local/lib/python2.7/dist-packages/spawn_egg-0.1.0-py2.7.egg
Processing dependencies for spawn-egg==0.1.0
Finished processing dependencies for spawn-egg==0.1.0
```



#### 17.2.1.2 wheel安装

wheel文件本质上就是zip或者rar,我们可以使用pip install wheel 安装wheel,比egg+easy_install要先进

在安装了wheel之后我们可以使用pip install XXX.whl来安装.whl的文件了

1.下载 whl 文件

可以从下面；两个网站找到自己需要的whl文件，部分文件在国内网站上没有，pypi网站上是最全的。

pypi网站：https://pypi.python.org/pypi/

国内whl集合网：https://www.lfd.uci.edu/~gohlke/pythonlibs/

2.安装 whl 文件

```python
pip install wordcloud-1.3.3-cp36-cp36m-win32.whl
```

##### 案例：pip命令下载不了mysqldb

可以自己下载下来。whl文件，然后安装

**下载地址**http://www.lfd.uci.edu/~gohlke/pythonlibs/

![](/Users/fanqingwei/Desktop/学习/linux/images/mysqldb下载.png)

#### 17.2.1.3 setup.py 安装

##### **引入内容**

```python
python setup.py sdist   #将自己的python文件打包

python setup.py install #安装第三方包
```

##### setup.py工作原理

setup.py文件可以对module文件进行打包和安装

详情如下：

打包module需要新建一个setup.py的脚本（作者自己建的），然后在脚本中输入下面的代码，假设你要打包的module名称为str.py

```shell
from distutils.core import setup
setup(name = 'str',
      version = '1.0',
      py_modules = ['str'],
     )
```

具体打包和安装过程详看下面的步骤

##### **注意点**

用setup.py安装的python包卸载， 必须手动删除，而且也容易出错

##### **打包步骤**

1. 准备一个python文件/felix/str.py

   代码如下：

   ```python
   list = ('liu','888','bin')
   print(list*2)
   dict = {}
   dict['one'] = 1
   dict['two'] = 2
   print(dict)
   print(dict.values())
   ```

2. 在准备一个python.py文件/felix/setup.py

   代码如下：

   ```python
   from setuptools import setup
   setup(
   name='str',
   version='0.1',
   py_modules=['str'],
   author='liu',
   )
   ```

3. dos命令下进入到felix目录下

   E:/PycharmProjects>cd felix

4. 执行python setup.py [sdist](javascript:;)命令

   E:/PycharmProjects/felix>python setup.py [sdist](javascript:;)

   运行结果如下：

   ```python
   running sdist
   running egg_info
   creating str.egg-info
   writing str.egg-info/PKG-INFO
   writing dependency_links to str.egg-info/dependency_links.txt
   writing top-level names to str.egg-info/top_level.txt
   writing manifest file 'str.egg-info/SOURCES.txt'
   reading manifest file 'str.egg-info/SOURCES.txt'
   writing manifest file 'str.egg-info/SOURCES.txt'
   warning: sdist: standard file not found: should have one of README, README.rst, README.txt
   running check
   warning: check: missing required meta-data: url
   warning: check: missing meta-data: if 'author' supplied, 'author_email' must be supplied too
   creating str-0.1
   creating str-0.1/str.egg-info
   copying files to str-0.1...
   copying setup.py -> str-0.1
   copying str.py -> str-0.1
   copying str.egg-info/PKG-INFO -> str-0.1/str.egg-info
   copying str.egg-info/SOURCES.txt -> str-0.1/str.egg-info
   copying str.egg-info/dependency_links.txt -> str-0.1/str.egg-info
   copying str.egg-info/top_level.txt -> str-0.1/str.egg-info
   Writing str-0.1/setup.cfg
   creating dist
   Creating tar archive
   removing 'str-0.1' (and everything under it)
   ```

5. 进入E:/PycharmProjects/felix目录，会发现多了一个文件夹dist，此文件夹下面多了一个str-0.1.tar.gz的压缩包，这个压缩包里面就是felix目录下的项目代码

##### **安装第三方包步骤**

本地学习安装上面那个我自己的第三方包str-0.1.tar.gz

安装命令python setup.py [install](javascript:;)

如下安装步骤：

1. 获取str-0.1.tar.gz 并解压到指定的目录我这里解压到E:/PycharmProjects目录下解压后E:/PycharmProjects/str-0.1

2. dos命令下进入到str-0.1 然后执行python setup.py [install](javascript:;) ，通过查看你会发现几乎每个python第三方包中都有这个setup.py文件，这个文件是作者打包时设置的文件，而我们安装第三方包时，也是先进入到setup.py文件所在目录，然后执行python setup.py install

   ```shell
   E:/PycharmProjects/str-0.1>python setup.py install
   ```

说明：

一般第三方包安装时先执行python setup.py build命令 在执行 python setup.py install命令

#### 17.2.1.4 pip安装模块

使用 pip 有一些额外的优势，pip 将自动下载包的所有依赖项。相反，如果使用的是 setup.py，则需要手动搜索和下载依赖项

easy_install 和 pip 都是用来管理、下载安装公共资源库pypi的相关资源包，
pip是easy_install的改进版

##### 1.可以访问外网直接

```shell
pip install kafka
pip3 install kafka
```

##### 2.使用镜像

下载超时需要使用国内镜像，并声明可靠站点

- 使用豆瓣镜像

```shell
pip install apache-airflow==2.1.2 -i https://pypi.douban.com/simple/ --trusted-host pypi.douban.com
```

- 公司镜像


```shell
 --index-url https://mirrors.cloud.tencent.com/pypi/simple/ --extra-index-url https://mirrors.tencent.com/repository/pypi/tencent_pypi/simple/ 
```

示例

```shell
[root@felixsfan1603804403293-0 /]# pip install kafka --index-url https://mirrors.cloud.tencent.com/pypi/simple/  --extra-index-url https://mirrors.tencent.com/repository/pypi/tencent_pypi/simple/
Collecting kafka
  Downloading https://mirrors.cloud.tencent.com/pypi/packages/21/71/73286e748ac5045b6a669c2fe44b03ac4c5d3d2af9291c4c6fc76438a9a9/kafka-1.3.5-py2.py3-none-any.whl (207kB)
    100% |################################| 215kB 4.7MB/s 
Installing collected packages: kafka
Successfully installed kafka-1.3.5
```

##### 3. pip查看包的安装路径

```shell
pip3 show django
#会显示包的信息和安装地址
```

### 17.2.2 安装pip

目前如果你在 [python.org](https://www.python.org/) 下载最新版本的安装包，则是已经自带了该工具。

Python 2.7.9 + 或 Python 3.4+ 以上版本都自带 pip 工具。

pip 官网：https://pypi.org/project/pip/

#### 方法一: 软件包管理工具

python-dev或python-devel称为是python的开发包，

其中包括了一些用C/Java/C#等编写的python扩展在编译的时候依赖的头文件等信息。

比如我们在编译一个用C语言编写的python扩展模块时，因为里面会有#include<Python.h>等这样的语句，因此我们就需要先安装python-devel开发包。

安装pip并自动关联python2

```shell
sudo yum -y install python-devel
sudo yum -y install python-pip
```

安装pip3并自动关联python3

```shell
sudo yum -y install python3-pip
```

部分 Linux 发行版用包管理器安装 pip，如 Debian 和 Ubuntu

```shell
$ sudo apt-get install python-pip
```

#### 方法二：脚本安装

```shell
$ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py   # 下载安装脚本
$ sudo python get-pip.py    # 运行安装脚本
```

*用哪个版本的 Python 运行安装脚本，pip 就被关联到哪个版本，如果是 Python3 则执行以下命令：*

```shell
$ sudo python3 get-pip.py    # 运行安装脚本。
```

*一般情况 pip 对应的是 Python 2.7，pip3 对应的是 Python 3.x*

#### 方法三：源码包安装

下载地址：https://pypi.org/search/?q=pip

```shell
wget --no-check-certific ate https://pypi.python.org/packages/source/p/pip/pip-10.0.1.tar.gz >>/dev/null
tar -zvxf pip-10.0.1.tar.gz >> /dev/null
cd pip.10.0.1
python3 setup.py build
python3 setup.py install
```

注意，这里是安装到python3中，默认是安装到python所链接的具体版本中。

**结果**

python2使用pip

```shell
[root@VM-242-103-centos /usr/bin]# pip -V
pip 8.1.2 from /usr/lib/python2.7/site-packages (python 2.7)
```

python3使用pip3

```shell
[root@VM-242-103-centos /usr/bin]# pip3 -V
pip 9.0.1 from /usr/local/python3/lib/python3.6/site-packages (python 3.6)
```

#### pip升级

```
pip install --upgrade pip    # python2.x
pip3 install --upgrade pip   # python3.x
```

### 17.2.3 centos下安装python3，保留python2

由于ubuntu系统自带python2.7（默认）和python3.4，所以不需要自己安装python

#### 17.2.2.1 步骤

一.查看是否已经安装Python

 **CentOS 7.2 默认安装了python2.7.5** 因为一些命令要用它比如yum 它使用的是python2.7.5。

使用 python -V 命令查看一下是否安装Python

然后使用命令 which python 查看一下Python可执行文件的位置

```shell
[felixsfan@VM-242-103-centos /usr/bin]$ which python
/usr/bin/python
```

 可见**可执行文件**在/usr/bin/ 目录下，切换到该目录下执行 ll python* 命令查看  

```shell
[felixsfan@VM-242-103-centos /usr/bin]$ ll python*
lrwxrwxrwx 1 root root    7 Jun 19  2018 python -> python2
lrwxrwxrwx 1 root root    9 Jun 19  2018 python2 -> python2.7
-rwxr-xr-x 1 root root 4864 Feb 22  2016 python2.6
-rwxr-xr-x 1 root root 7136 Nov 20  2015 python2.7
```

 python 指向的是python2.7 

安装python3不需要管自带的python2

二.安装python3

1.官网下载python3源文件,上传到服务器并解压到相应目录 地址:https://www.python.org/getit/

或wget命令直接下载python3

```shell
wget https://www.python.org/ftp/python/3.6.1/Python-3.6.1.tgz
```

2.个人习惯安装在/usr/local/python3 

a.创建目录

```shell 
# mkdir -p /usr/local/python3
```

b.解压下载好的Python-3.x.x.tgz包(具体包名因你下载的Python具体版本不不同⽽而不不同，如：我下载的是Python3.5.0.那我这里就是Python-3.5.0.tgz)

```shell
tar -zxvf Python-3.5.0.tgz
```

c.进入解压后的目录，编译安装。（编译安装前需要安装编译器yum install gcc，原因是源文件需要GCC编译成可执行文件）

```shell
cd Python-3.6.1
./configure --prefix=/usr/local/python3   #/usr/local/python3为安装目录
make
make install
```

d.建立python3的软链

```shell 
#建立python3软链接
ln -s /usr/local/python3/bin/python3 /usr/bin/python3
```

e. 并将/usr/local/python3/bin加入PATH 

```shell
 vim ~/.bash_profile
# .bash_profile
# Get the aliases and functions
if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi
# User specific environment and startup programs
PATH=$PATH:$HOME/bin:/usr/local/python3/bin
export PATH
```

f.让上一步修改生效

```shell
source ~/.bash_profile
```

g.分别查看python2/3的路径

```shell
[root@VM-242-103-centos /usr/bin]# which python
/usr/bin/python
[root@VM-242-103-centos /usr/bin]# which python3
/usr/local/bin/python3
```

h.查看引用

python2和python3完成后

```shell
[root@VM-242-103-centos /usr/bin]# ll python*
lrwxrwxrwx 1 root root    7 Oct 26 17:32 python -> python2
lrwxrwxrwx 1 root root   14 Oct 26 17:32 python-config -> python2-config
lrwxrwxrwx 1 root root    9 Oct 26 17:32 python2 -> python2.7
lrwxrwxrwx 1 root root   16 Oct 26 17:32 python2-config -> python2.7-config
-rwxr-xr-x 1 root root 4864 Feb 22  2016 python2.6
-rwxr-xr-x 1 root root 7144 Sep 18 09:56 python2.7
-rwxr-xr-x 1 root root 1835 Sep 18 09:55 python2.7-config
lrwxrwxrwx 1 root root   30 Oct 26 17:08 python3 -> /usr/local/python3/bin/python3
```

#### 17.2.2.2 ./configure,make,make install的作用

./configure是用来检测你的安装平台的目标特征的。比如它会检测你是不是有CC或GCC，并不是需要CC或GCC，它是个shell脚本。
make是用来编译的，它从Makefile中读取指令，然后编译。
make install是用来安装的，它也从Makefile中读取指令，安装到指定的位置。

AUTOMAKE和AUTOCONF是非常有用的用来发布C程序的东西。

/-----
1、configure，这一步一般用来生成 Makefile，为下一步的编译做准备，你可以通过在 configure 后加上参数来对安装进行控制，比如代码:./configure –prefix=/usr 意思是将该软件安装在 /usr 下面，执行文件就会安装在 /usr/bin （而不是默认的 /usr/local/bin),资源文件就会安装在 /usr/share（而不是默认的/usr/local/share）。同时一些软件的配置文件你可以通过指定 –sys-config= 参数进行设定。有一些软件还可以加上 –with、–enable、–without、–disable 等等参数对编译加以控制，你可以通过允许 ./configure –help 察看详细的说明帮助。

2、make，这一步就是编译，大多数的源代码包都经过这一步进行编译（当然有些perl或python编写的软件需要调用perl或python来进行编译）。如果 在 make 过程中出现 error ，你就要记下错误代码（注意不仅仅是最后一行），然后你可以向开发者提交 bugreport（一般在 INSTALL 里有提交地址），或者你的系统少了一些依赖库等，这些需要自己仔细研究错误代码。

3、make insatll，这条命令来进行安装（当然有些软件需要先运行 make check 或 make test 来进行一些测试），这一步一般需要你有 root 权限（因为要向系统写入文件）。

/-----
Linux的用户可能知道，在Linux下安装一个应用程序时，一般先运行脚本configure，然后用make来编译源程序，在运行make install，最后运行make clean删除一些临时文件。使用上述三个自动工具，就可以生成configure脚本。运行configure脚本，就可以生成Makefile文件，然后就可以运行make、make install和make clean。

configure是一个shell脚本，它可以自动设定源程序以符合各种不同平台上Unix系统的特性，并且根据系统叁数及环境产生合适的Makefile文件或是C的头文件(header file)，让源程序可以很方便地在这些不同的平台上被编译连接。

#### 17.2.2.3 configure --prefix=/”的作用

1、如果不指定 `--prefix`

则 安装程序的

可执行文件默认放在 `/usr/local/bin` ；
库文件默认放在 `/usr/local/lib` ；
配置文件默认放在 `/usr/local/etc` ；
其它的资源文件放在 `/usr /local/share` 

2、如果指定 `--prefix`

比如： `--prefix=/usr/local/keepalived` ，则此软件的所有文件都放到 `/usr/local/keepalived` 目录下，很整齐

#### **17.2.2.4 python2和python3共存时pip问题**

默认centos自带的python2没有安装pip,需要自己安装,使用上面的方法

python3安装好后自带pip3,知道pip路径,可以添加软链接区分开

### 17.2.5 常用命令

#### **linux下查看python 安装目录**

```shell
方法1：whereis python 
查看所有python的路径，不止一个

方法2：which python 
查看当前使用的python路径
```

#### 查看PYTHONPATH路径

```shell
echo $PYTHONPATH
```

#### python添加模块路径

解决模块不在python的搜索路径下的问题

<https://www.cnblogs.com/crazymagic/p/9132309.html>

##### 方法一

```shell
export PYTHONPATH=$PYTHONPATH:/home/felix/workspace/reconciliation:/home/felix/workspace/reconciliation/src/0001
```

也可以修改配置文件（永久生效）

##### 方法二

```shell
>>> import sys  
>>> sys.path.append('路径')  
```

#### **如何查看python安装包路径**

1. 对于linux平台来说，很多运行的系统软件都是建立在python的基础之上，如果python出错了，那么整个系统可能会有出现重大问题的风险。Linux自带python2.7,例如devcloud

   ```shell
   [felixsfan@VM-242-103-centos ~/workspace/rebate_proj/zk_task]$ python 
   Python 2.7.5 (default, Sep 18 2020, 09:55:20) 
   [GCC 4.8.5 20150623 (Red Hat 4.8.5-39)] on linux2
   Type "help", "copyright", "credits" or "license" for more information.
   >>> 
   ```

2. python命令能够正确执行后，我们先找到python命令的位置，查找python的命令是：

   ```shell
   [felixsfan@VM-242-103-centos ~/workspace/rebate_proj/zk_task]$ whereis python
   python: /usr/bin/python2.7 /usr/bin/python2.7-config /usr/bin/python /usr/bin/python2.6 /usr/lib/python2.7 /usr/lib/python2.6 /usr/lib64/python2.7 /usr/lib64/python2.6 /etc/python /usr/include/python2.7 /usr/share/man/man1/python.1.gz
   ```

3. 然后我们再根据这个命令来找到它的安装包是哪个，命令是：rpm -qf /usr/bin/python

   ```shell
   [felixsfan@VM-242-103-centos ~/workspace/rebate_proj/zk_task]$ rpm -qf /usr/bin/python
   python-2.7.5-89.tl2.x86_64
   ```

   

4. 然后我们就可以根据python的安装包，找到它的所有文件安装路径了，查询安装包的所有文件路径命令是：

   rpm -ql python-2.7.5

   ```shell
   [felixsfan@VM-242-103-centos ~/workspace/rebate_proj/zk_task]$ rpm -ql python-2.7.5
   /usr/bin/pydoc
   /usr/bin/python
   /usr/bin/python2
   /usr/bin/python2.7
   /usr/libexec/platform-python
   /usr/share/doc/python-2.7.5
   /usr/share/doc/python-2.7.5/LICENSE
   /usr/share/doc/python-2.7.5/README
   /usr/share/man/man1/python.1.gz
   /usr/share/man/man1/python2.1.gz
   /usr/share/man/man1/python2.7.1.gz
   ```

#### 常见错误

##### AttributeError: 'module' object has no attribute 'XXXX'

网上大概两种说法：1.XXX.pyc文件的存在；2.文件名和python关键字相同

而我的问题是Directory下的程序访问了另一个程序的的同名模块，原因是linux的PYTHONPATH路径搜索问题

查看PYTHONPATH路径

```shell
echo $PYTHONPATH
```

##### 找不到module

```python
C:/Python27/python.exe D:/python2.7/cloud_account_data_analysis/src/email.py
Traceback (most recent call last):
  File "D:/python2.7/cloud_account_data_analysis/src/email.py", line 10, in <module>
    import smtplib
  File "C:/Python27/lib/smtplib.py", line 46, in <module>
    import email.utils
  File "D:/python2.7/cloud_account_data_analysis/src/email.py", line 11, in <module>
    import email.utils
ImportError: No module named utils
```

检查模块在python搜索路径下，后来发现我自定义模块和第三方库同名

### 17.2.6 python2和python3共存时，相关文件和pip位置

#### python相关文件

```
[root@VM-4-15-centos ~]# whereis python
python: /usr/bin/python3.6m /usr/bin/python3.6 /usr/bin/python /usr/bin/python2.7-config /usr/bin/python2.7 /usr/lib/python3.6 /usr/lib/python2.7 /usr/lib64/python3.6 /usr/lib64/python2.7 /etc/python /usr/include/python3.6m /usr/include/python2.7 /usr/share/man/man1/python.1.gz
```

#### pip模块库位置

```shell
[root@VM-4-15-centos ~]# pip -V
pip 8.1.2 from /usr/lib/python2.7/site-packages (python 2.7)
[root@VM-4-15-centos ~]# pip3 -V
pip 9.0.3 from /usr/lib/python3.6/site-packages (python 3.6)
```

#### python2相关文件位置

```shell
[root@VM-4-15-centos ~]# cd /usr/lib64/python2.7
[root@VM-4-15-centos python2.7]# ls
_abcoll.py          copy_reg.py          HTMLParser.py          opcode.pyo          sched.pyo               tarfile.py
_abcoll.pyc         copy_reg.pyc         HTMLParser.pyc         optparse.py         sets.py                 tarfile.pyc
_abcoll.pyo         copy_reg.pyo         HTMLParser.pyo         optparse.pyc        sets.pyc                tarfile.pyo
abc.py              cProfile.py          httplib.py             optparse.pyo        sets.pyo                telnetlib.py
abc.pyc             cProfile.pyc         httplib.pyc            os2emxpath.py       sgmllib.py              telnetlib.pyc
abc.pyo             cProfile.pyo         httplib.pyo            os2emxpath.pyc      sgmllib.pyc             telnetlib.pyo
aifc.py             crypt.py             idlelib                os2emxpath.pyo      sgmllib.pyo             tempfile.py
aifc.pyc            crypt.pyc            ihooks.py              os.py               sha.py                  tempfile.pyc
aifc.pyo            crypt.pyo            ihooks.pyc             os.pyc              sha.pyc                 tempfile.pyo
antigravity.py      csv.py               ihooks.pyo             os.pyo              sha.pyo                 test
```

#### python3相关文件位置

```shell
[root@VM-4-15-centos python2.7]# cd /usr/lib64/python3.6
[root@VM-4-15-centos python3.6]# ls
abc.py                        dbm                 lib2to3            pyclbr.py         sunau.py
aifc.py                       decimal.py          lib-dynload        py_compile.py     symbol.py
antigravity.py                difflib.py          linecache.py       _pydecimal.py     symtable.py
argparse.py                   dis.py              locale.py          pydoc_data        _sysconfigdata_dm_linux_x86_64-linux-gnu.py
ast.py                        distutils           logging            pydoc.py          _sysconfigdata_m_linux_x86_64-linux-gnu.py
asynchat.py                   doctest.py          lzma.py            _pyio.py          sysconfig.py
asyncio                       dummy_threading.py  macpath.py         queue.py          tabnanny.py
asyncore.py                   _dummy_thread.py    macurl2path.py     quopri.py         tarfile.py
base64.py                     email               mailbox.py         random.py         telnetlib.py
bdb.py                        encodings           mailcap.py         reprlib.py        tempfile.py
binhex.py                     ensurepip           _markupbase.py     re.py             test
bisect.py                     enum.py             mimetypes.py       rlcompleter.py    textwrap.py
_bootlocale.py                filecmp.py          modulefinder.py    runpy.py          this.py
```

#### python可执行文件和软链接位置

```shell
[root@VM-4-15-centos python3.6]# cd /usr/bin
[root@VM-4-15-centos bin]# ll python*
lrwxrwxrwx 1 root root     7 Aug  5 15:32 python -> python2
lrwxrwxrwx 1 root root     9 Aug  5 15:32 python2 -> python2.7
-rwxr-xr-x 1 root root  7144 Apr  2  2020 python2.7
-rwxr-xr-x 1 root root  1835 Apr  2  2020 python2.7-config
lrwxrwxrwx 1 root root    16 Aug  5 15:33 python2-config -> python2.7-config
lrwxrwxrwx 1 root root     9 Sep  2 14:22 python3 -> python3.6
-rwxr-xr-x 2 root root 11336 Apr  2  2020 python3.6
-rwxr-xr-x 2 root root 11336 Apr  2  2020 python3.6m
lrwxrwxrwx 1 root root    14 Aug  5 15:33 python-config -> python2-config
```

#### pip可执行文件和软链接位置

```shell
[root@VM-4-15-centos bin]# ll pip*
-rwxr-xr-x 1 root root 282 Sep  3 14:03 pip
-rwxr-xr-x 1 root root 284 Sep  3 14:03 pip2
-rwxr-xr-x 1 root root 288 Sep  3 14:03 pip2.7
-rwxr-xr-x 1 root root 407 Mar 18  2020 pip3
lrwxrwxrwx 1 root root   9 Sep  2 14:22 pip-3 -> ./pip-3.6
lrwxrwxrwx 1 root root   8 Sep  2 14:22 pip-3.6 -> ./pip3.6
-rwxr-xr-x 1 root root 407 Mar 18  2020 pip3.6
```

### **17.2.7 linux删除python**

```shell
rpm -qa|grep python|xargs rpm -ev --allmatches --nodeps        #强制删除已安装程序及其关联
whereis python|xargs rm -frv 　　　　　　　　　　　　　　　　　　　　 #删除所有残余文件 #xargs，允许你对输出执行其他某些命令
```

### 17.2.8 Unix & Linux 平台安装 Python

以下为在 Unix & Linux 平台上安装 Python 的简单步骤：

- 打开 WEB 浏览器访问https://www.python.org/downloads/source/
- 选择适用 于Unix/Linux 的源码压缩包。
- 下载及解压压缩包。
- 如果你需要自定义一些选项修改*Modules/Setup*
- **执行** ./configure 脚本
- make
- make install

**执行以上操作后，Python 会安装在 /usr/local/bin 目录中，Python 库安装在 /usr/local/lib/pythonXX，XX 为你使用的 Python 的版本号。**

# 18.编码问题总结

