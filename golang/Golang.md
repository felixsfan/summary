# 1. 编译型和解释性

我们编写的源代码是人类语言，我们自己能够轻松理解；但是对于计算机硬件（CPU），源代码就是天书，根本无法执行，计算机只能识别某些特定的二进制指令，在程序真正运行之前必须将源代码转换成二进制指令。

所谓的二进制指令，也就是机器码，是 CPU 能够识别的硬件层面的“代码”，简陋的硬件（比如古老的单片机）只能使用几十个指令，强大的硬件（PC 和智能手机）能使用成百上千个指令。

然而，究竟在什么时候将源代码转换成二进制指令呢？不同的编程语言有不同的规定：

- 有的编程语言要求必须提前将所有源代码一次性转换成二进制指令，也就是生成一个可执行程序（Windows 下的 .exe），比如C语言、[C++](http://m.biancheng.net/cplus/)、Golang、Pascal（Delphi）、汇编等，这种编程语言称为编译型语言，使用的转换工具称为编译器。
- 有的编程语言可以一边执行一边转换，需要哪些源代码就转换哪些源代码，不会生成可执行程序，比如 [Python](http://m.biancheng.net/python/)、[JavaScript](http://m.biancheng.net/js/)、[PHP](http://m.biancheng.net/php/)、Shell、[MATLAB](http://m.biancheng.net/matlab/) 等，这种编程语言称为解释型语言，使用的转换工具称为解释器。

简单理解，编译器就是一个“翻译工具”，类似于将中文翻译成英文、将英文翻译成俄文。但是，翻译源代码是一个复杂的过程，大致包括词法分析、语法分析、语义分析、性能优化、生成可执行文件等五个步骤，期间涉及到复杂的算法和硬件架构。解释器与此类似，有兴趣的读者请参考《编译原理》一书，本文不再赘述。

<img src="/Users/fanqingwei/Desktop/学习/golang\images\编译型和解释型执行流程.png" style="zoom:50%;" />

## 1.1 编译型语言

对于编译型语言，开发完成以后需要将所有的源代码都转换成可执行程序，比如 Windows 下的`.exe`文件，可执行程序里面包含的就是机器码。只要我们拥有可执行程序，就可以随时运行，不用再重新编译了，也就是“一次编译，无限次运行”。

在运行的时候，我们只需要编译生成的可执行程序，不再需要源代码和编译器了，所以说编译型语言可以脱离开发环境运行。

编译型语言一般是不能跨平台的，也就是不能在不同的操作系统之间随意切换。

编译型语言不能跨平台表现在两个方面：

**1.可执行程序不能跨平台**

可执行程序不能跨平台很容易理解，因为不同操作系统对可执行文件的内部结构有着截然不同的要求，彼此之间也不能兼容。不能跨平台是天经地义，能跨平台反而才是奇葩。

比如，不能将 Windows 下的可执行程序拿到 Linux 下使用，也不能将 Linux 下的可执行程序拿到 Mac OS 下使用（虽然它们都是[类 Unix 系统](http://m.biancheng.net/view/vip_5038.html)）。

另外，相同操作系统的不同版本之间也不一定兼容，比如不能将 x64 程序（Windows 64 位程序）拿到 x86 平台（Windows 32 位平台）下运行。但是反之一般可行，因为 64 位 Windows 对 32 位程序作了很好的兼容性处理。

**2.源代码不能跨平台**

不同平台支持的函数、类型、变量等都可能不同，基于某个平台编写的源代码一般不能拿到另一个平台下编译。我们以C语言为例来说明。

【实例1】在C语言中要想让程序暂停可以使用“睡眠”函数，在 Windows 平台下该函数是 Sleep()，在 Linux 平台下该函数是 sleep()，首字母大小写不同。其次，Sleep() 的参数是毫秒，sleep() 的参数是秒，单位也不一样。

以上两个原因导致使用暂停功能的C语言程序不能跨平台，除非在代码层面做出兼容性处理，非常麻烦。

【实例2】虽然不同平台的C语言都支持 long 类型，但是不同平台的 long 的长度却不同，例如，Windows 64 位平台下的 long 占用 4 个字节，Linux 64 位平台下的 long 占用 8 个字节。

我们在 Linux 64 位平台下编写代码时，将 0x2f1e4ad23 赋值给 long 类型的变量是完全没有问题的，但是这样的赋值在 Windows 平台下就会导致数值溢出，让程序产生错误的运行结果。

让人苦恼的，这样的错误一般不容易察觉，因为编译器不会报错，我们也记不住不同类型的取值范围。

## 1.2 解释型语言

对于解释型语言，每次执行程序都需要一边转换一边执行，用到哪些源代码就将哪些源代码转换成机器码，用不到的不进行任何处理。每次执行程序时可能使用不同的功能，这个时候需要转换的源代码也不一样。

因为每次执行程序都需要重新转换源代码，所以解释型语言的执行效率天生就低于编译型语言，甚至存在数量级的差距。计算机的一些底层功能，或者关键算法，一般都使用 C/C++ 实现，只有在应用层面（比如网站开发、批处理、小工具等）才会使用解释型语言。

在运行解释型语言的时候，我们始终都需要源代码和解释器，所以说它无法脱离开发环境。

当我们说“下载一个程序（软件）”时，不同类型的语言有不同的含义：

- 对于编译型语言，我们下载到的是可执行文件，源代码被作者保留，所以编译型语言的程序一般是闭源的。
- 对于解释型语言，我们下载到的是所有的源代码，因为作者不给源代码就没法运行，所以解释型语言的程序一般是开源的。


相比于编译型语言，解释型语言几乎都能跨平台，“一次编写，到处运行”是真是存在的，而且比比皆是。那么，为什么解释型语言就能快平台呢？

这一切都要归功于解释器！

我们所说的跨平台，是指源代码跨平台，而不是解释器跨平台。解释器用来将源代码转换成机器码，它就是一个可执行程序，是绝对不能跨平台的。

官方需要针对不同的平台开发不同的解释器，这些解释器必须要能够遵守同样的语法，识别同样的函数，完成同样的功能，只有这样，同样的代码在不同平台的执行结果才是相同的。

你看，解释型语言之所以能够跨平台，是因为有了解释器这个中间层。在不同的平台下，解释器会将相同的源代码转换成不同的机器码，解释器帮助我们屏蔽了不同平台之间的差异。

## 1.3 总结

- golang是编译型语言

  ```c++
  $ go build hello.go #编译
  $ ls
  hello    hello.go
  $ ./hello  运行编译后的文件
  Hello, World!
  #=========================
  $ go run hello.go #快捷命令
  Hello, World!
  ```

- 还有一种混合型语言 为了兼顾效率和跨平台，比如Java

  ```java
  javac hello.java  #编译成hello.class字节码文件
  java hello  #运行编译好的字节码文件
  ```

- python是解释型语言，但是python为了效率：

  当python程序运行时，编译的结果则是保存在位于内存中的PyCodeObject中，当Python程序运行结束时，Python解释器则将PyCodeObject写回到pyc文件中。当python程序第二次运行时，首先程序会在硬盘中寻找pyc文件，如果找到，则直接载入，否则就重复上面的过程。所以我们应该这样来定位PyCodeObject和pyc文件，我们说pyc文件其实是PyCodeObject的一种持久化保存方式。\

- Python与Java编译的过程

![](/Users/fanqingwei/Desktop/学习/golang\images\Java和python区别.png)

## 1.4 C/C++程序编译过程详解

因为golang是编译型语言，类似于C/C++,所以这里复习一下C/C++程序编译过程。

C语言的编译链接过程要把我们编写的一个c程序（源代码）转换成可以在硬件上运行的程序（可执行代码），需要进行编译和链接。编译就是把文本形式源代码翻译为机器语言形式的目标文件的过程。链接是把目标文件、操作系统的启动代码和用到的库文件进行组织，形成最终生成可执行代码的过程。过程图解如下：

<img src="/Users/fanqingwei/Desktop/学习/golang\images\C编译过程.png" style="zoom:50%;" />

从图上可以看到，整个代码的编译过程分为编译和链接两个过程，编译对应图中的大括号括起的部分，其余则为链接过程。

### 1.4.1 编译过程

编译过程又可以分成两个阶段：编译和汇编。

#### 2.1.1 编译

编译是读取源程序（字符流），对之进行词法和语法的分析，将高级语言指令转换为功能等效的汇编代码，源文件的编译过程包含两个主要阶段：

##### 编译预处理

读取c源程序，对其中的伪指令（以# 开头的指令）和特殊符号进行处理。

伪指令主要包括以下四个方面：

**1) 宏定义指令**，如# define Name TokenString，# undef等。

对于前一个伪指令，预编译所要做的是将程序中的所有Name用TokenString替换，但作为字符串常量的 Name则不被替换。对于后者，则将取消对某个宏的定义，使以后该串的出现不再被替换。

**2) 条件编译指令**，如# ifdef，# ifndef，# else，# elif，# endif等。

这些伪指令的引入使得程序员可以通过定义不同的宏来决定编译程序对哪些代码进行处理。预编译程序将根据有关的文件，将那些不必要的代码过滤掉。

**3) 头文件包含指令**，如# include "FileName" 或者# include < FileName> 等。

在头文件中一般用伪指令# define定义了大量的宏（最常见的是字符常量），同时包含有各种外部符号的声明。

采用头文件的目的主要是为了使某些定义可以供多个不同的C源程序使用。因为在需要用到这些定义的C源程序中，只需加上一条# include语句即可，而不必再在此文件中将这些定义重复一遍。预编译程序将把头文件中的定义统统都加入到它所产生的输出文件中，以供编译程序对之进行处理。

包含到c源程序中的头文件可以是系统提供的，这些头文件一般被放在/ usr/ include目录下。在程序中# include它们要使用尖括号（< >）。另外开发人员也可以定义自己的头文件，这些文件一般与c源程序放在同一目录下，此时在# include中要用双引号（""）。

**4) 特殊符号**，预编译程序可以识别一些特殊的符号。

例如在源程序中出现的LINE标识将被解释为当前行号（十进制数），FILE则被解释为当前被编译的C源程序的名称。预编译程序对于在源程序中出现的这些串将用合适的值进行替换。

预编译程序所完成的基本上是对源程序的“替代”工作。经过此种替代，生成一个没有宏定义、没有条件编译指令、没有特殊符号的输出文件。这个文件的含义同没有经过预处理的源文件是相同的，但内容有所不同。下一步，此输出文件将作为编译程序的输入而被翻译成为机器指令。

##### 编译、优化阶段

经过预编译得到的输出文件中，只有常量；如数字、字符串、变量的定义，以及C语言的关键字，如main, if , else , for , while , { , } , + , - , * , \ 等等。

编译程序所要作得工作就是通过词法分析和语法分析，在确认所有的指令都符合语法规则之后，将其翻译成等价的中间代码表示或汇编代码。

优化处理是编译系统中一项比较艰深的技术。它涉及到的问题不仅同编译技术本身有关，而且同机器的硬件环境也有很大的关系。优化一部分是对中间代码的优化。这种优化不依赖于具体的计算机。另一种优化则主要针对目标代码的生成而进行的。

对于前一种优化，主要的工作是删除公共表达式、循环优化（代码外提、强度削弱、变换循环控制条件、已知量的合并等）、复写传播，以及无用赋值的删除，等等。

后一种类型的优化同机器的硬件结构密切相关，最主要的是考虑是如何充分利用机器的各个硬件寄存器存放有关变量的值，以减少对于内存的访问次数。另外，如何根据机器硬件执行指令的特点（如流水线、RISC、CISC、VLIW等）而对指令进行一些调整使目标代码比较短，执行的效率比较高，也是一个重要的研究课题。

经过优化得到的汇编代码必须经过汇编程序的汇编转换成相应的机器指令，方可能被机器执行。

#### 2.1.2 汇编

汇编过程实际上指把汇编语言代码翻译成目标机器指令的过程。对于被翻译系统处理的每一个C语言源程序，都将最终经过这一处理而得到相应的目标文件。目标文件中所存放的也就是与源程序等效的目标的机器语言代码。

目标文件由段组成。通常一个目标文件中至少有两个段：

**1) 代码段**：该段中所包含的主要是程序的指令。该段一般是可读和可执行的，但一般却不可写。

**2) 数据段**：主要存放程序中要用到的各种全局变量或静态的数据。一般数据段都是可读，可写，可执行的。

UNIX环境下主要有三种类型的目标文件：

**1) 可重定位文件**

其中包含有适合于其它目标文件链接来创建一个可执行的或者共享的目标文件的代码和数据。

**2) 共享的目标文件**

这种文件存放了适合于在两种上下文里链接的代码和数据。

第一种是链接程序可把它与其它可重定位文件及共享的目标文件一起处理来创建另一个目标文件；

第二种是动态链接程序将它与另一个可执行文件及其它的共享目标文件结合到一起，创建一个进程映象。

**3) 可执行文件**

它包含了一个可以被操作系统创建一个进程来执行之的文件。

汇编程序生成的实际上是第一种类型的目标文件。对于后两种还需要其他的一些处理方能得到，这个就是链接程序的工作了。

### 1.4.2 链接过程

由汇编程序生成的目标文件并不能立即就被执行，其中可能还有许多没有解决的问题。

例如，某个源文件中的函数可能引用了另一个源文件中定义的某个符号（如变量或者函数调用等）；在程序中可能调用了某个库文件中的函数，等等。所有的这些问题，都需要经链接程序的处理方能得以解决。

链接程序的主要工作就是将有关的目标文件彼此相连接，也即将在一个文件中引用的符号同该符号在另外一个文件中的定义连接起来，使得所有的这些目标文件成为一个能够被操作系统装入执行的统一整体。

根据开发人员指定的同库函数的链接方式的不同，链接处理可分为两种：

**1) 静态链接**

在这种链接方式下，函数的代码将从其所在的静态链接库中被拷贝到最终的可执行程序中。这样该程序在被执行时这些代码将被**装入到**该进程的虚拟地址空间中。静态链接库实际上是一个目标文件的集合，其中的每个文件含有库中的一个或者一组相关函数的代码。

**2) 动态链接**

在此种方式下，函数的代码被放到称作是动态链接库或共享对象的某个目标文件中。链接程序此时所作的只是在最终的可执行程序中记录下共享对象的名字以及其它少量的登记信息。在此可执行文件被执行时，动态链接库的全部内容将被**映射到**运行时相应进程的虚地址空间。动态链接程序将根据可执行程序中记录的信息找到相应的函数代码。

对于可执行文件中的函数调用，可分别采用动态链接或静态链接的方法。使用动态链接能够使最终的可执行文件比较短小，并且当共享对象被多个进程使用时能节约一些内存，因为在内存中只需要保存一份此共享对象的代码。但并不是使用动态链接就一定比使用静态链接要优越。在某些情况下动态链接可能带来一些性能上损害。

### 1.4.3 GCC的编译链接

我们在linux使用的gcc编译器便是把以上的几个过程进行捆绑，使用户只使用一次命令就把编译工作完成，这的确方便了编译工作，但对于初学者了解编译过程就很不利了，下图便是gcc代理的编译过程：

<img src="/Users/fanqingwei/Desktop/学习/golang\images\GCC编译过程.png" style="zoom:50%;" />

从上图可以看到：

**1) 预编译**

将.c 文件转化成 .i文件

使用的gcc命令是：gcc –E

对应于预处理命令cpp

**2) 编译**

将.c/.h文件转换成.s文件

使用的gcc命令是：gcc –S

对应于编译命令 cc –S

**3) 汇编**

将.s 文件转化成 .o文件

使用的gcc 命令是：gcc –c

对应于汇编命令是 as

**4) 链接**

将.o文件转化成可执行程序

使用的gcc 命令是： gcc

对应于链接命令是 ld

总结起来编译过程就上面的四个过程：预编译处理(.c) －－> 编译、优化程序（.s、.asm）－－> 汇编程序(.obj、.o、.a、.ko) －－> 链接程序（.exe、.elf、.axf等）。

### 1.4.4 总结

C语言编译的整个过程是非常复杂的，里面涉及到的编译器知识、硬件知识、工具链知识都是非常多的，深入了解整个编译过程对工程师理解应用程序的编写是有很大帮助的，希望大家可以多了解一些，在遇到问题时多思考、多实践。

一般情况下，我们只需要知道分成编译和链接两个阶段，编译阶段将源程序（*.c) 转换成为目标代码（一般是obj文件，至于具体过程就是上面说的那些阶段），链接阶段是把源程序转换成的目标代码（obj文件）与你程序里面调用的库函数对应的代码连接起来形成对应的可执行文件（exe文件）就可以了，其他的都需要在实践中多多体会才能有更深的理解。

# 2. 安装及环境变量说明

## 2.1 Linux

### 2.1.1 安装 golang

请参考 [Go 官网](https://go.dev/doc/install) 来安装最新版本 Golang（请选择 Linux 的 tab），建议使用的版本在最新的三个稳定的 Major Release 内（比如当前最新为 `1.22`，那么 `1.22, 1.21, 1.20` 大概都是 ok 的），新版本 Go 本身会修复很多问题。

如果官网上的安装方式不够清晰，请参考如下步骤：

```shell
# 下载 Go 源码包，请保证下面的版本号是较新的
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
# 移除旧的已有安装，并解压出新的安装（需要 root 权限）
 rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
```

设置环境变量 `vim ~/.bashrc`：

然后把以下部分添加到 `~/.bashrc` 中：

```shell
# 至于这里为什么这么配置，可参考 https://learnku.com/go/t/39086#0b3da8
export GO111MODULE=on

# 把 go 命令以及 gopath 添加到 path 环境变量
test -d ~/go || mkdir ~/go
export GOPATH=~/go
export PATH=/usr/local/go/bin:$GOPATH/bin:$PATH
```

之后记得要 `source ~/.bashrc`

### 2.1.2 配置代理

首先请点击以下链接，进行设置 go proxy 和 go sumdb （把链接中的小眼睛点开，然后复制到 `~/.bashrc` 中）:

https://goproxy.woa.com/

之后记得要 `source ~/.bashrc`

此时请执行 `go env` 查看输出结果，重点看下以下 key:

- `GOPROXY`: 要保证这个值是 https://goproxy.woa.com/ 网站上设置的值
- `GOSUMDB`: 要保证这个值是 https://goproxy.woa.com/ 网站上设置的值
- `GONOPROXY`: 要保证这个值里面不含 `git.code.oa.com`
- `GOPRIVATE`: 要保证这个值里面不含 `git.code.oa.com`
- `GONOSUMDB`: 要保证这个值里面不含 `git.code.oa.com`

假如以上有部分不相符，那么说明存在对应的系统环境变量覆盖了 `go env` 本身设置的值，可以考虑在 `~/bashrc` 中这样写：

```shell
export GOPROXY=""
export GOSUMDB=""
export GONOPROXY=""
export GOPRIVATE=""
export GONOSUMDB=""

# 以下三行换成你自己访问 https://goproxy.woa.com/ 点开小眼睛后看到的三行
go env -w GOPROXY="https://goproxy.woa.com,direct" 
go env -w GOPRIVATE=""
go env -w GOSUMDB="sum.woa.com+643d7a06+Ac5f5VOC4N8NUXdmhbm8pZSXIWfhek5JSmWdWrq7pLX4"

go env -w GONOSUMDB=""
```

执行 `source ~/.bashrc`

然后再次执行 `go env`，保证显示的值符合之前提到的要求

### 2.1.3 配置工蜂

#### 2.1.3.1 支持 go get 工蜂代码

按照 https://goproxy.woa.com/ 配置后，本小节自动支持

#### 2.1.3.2 配置 ssh 访问工蜂

生成 ssh 公钥：

```go
# 执行后连续三次回车
ssh-keygen -t rsa -C "your-rtx-name@tencent.com"
```

`~/.ssh`路径下创建`config`文件并写入如下内容，`IdentityFile`视具体路径情况而定（需要`root`权限）,`vim ~/.ssh/config`：

```sh
Host git.woa.com 
HostName git.woa.com
User git
Port 22
IdentityFile ~/.ssh/id_rsa
```

修改 config 文件权限：

```go
chmod 600 ~/.ssh/config
```

工蜂平台配置 ssh 公钥：

```sh
打开网址 https://git.woa.com/profile/keys => Add SSH Key 按钮
设置 Key： ~/.ssh/id_rsa.pub 内容
设置 Title：自行命名
```

配置使用 ssh 方式访问工蜂平台：

```javascript
git config --global --add url."git@git.code.oa.com:".insteadOf https://git.code.oa.com/

现在公司 oa 域名已全面切换到 woa 域名，增加
git config --global --add url."git@git.woa.com:".insteadOf https://git.woa.com/
```

有些场景下 go get 不到代码，也没有任何提示，可以执行以下命令：

```javascript
git config --global http.sslverify false
```

### 2.1.4 安装依赖

#### 2.1.4.1 protoc v3.6.0+

请根据自己使用的操作系统，优先选择对应的包管理工具安装，如：

- linux 下用 yum 或 apt 等安装；（如 `yum install protobuf-compiler`，`apt install -y protobuf-compiler`）
- macOS 通过 brew 安装；
- windows 通过下载可执行程序或者其他安装程序来安装；

对于某些平台缺乏包管理工具的，或者软件源提供的版本不满足最低要求的，可以参考下面内容从源码安装；

源码安装：
执行此操作前，先确保安装了相应的工具链，如：make、autoconf、aclocal。

```bash
git clone https://github.com/protocolbuffers/protobuf

# v3.6.0+以上版本支持 map 解析，syntax=2、3 消息序列化后是二进制兼容的，用 root 执行以下命令
cd protobuf
git checkout v3.6.1.3
./autogen.sh
./configure
make -j8
make install
```

ps：不要只从其他机器拷贝 protoc 命令，完整的 protobuf 开发包除了 protoc 编译器还包含一些 proto 文件。

#### 2.1.4.2 protoc-gen-go

```bash
go get -u github.com/golang/protobuf/protoc-gen-go
```

新版本 go 已经废弃 go get 安装，使用 install 安装

```bash
go install github.com/golang/protobuf/protoc-gen-go@latest
```

#### 2.1.4.3 git

低版本 git 可能容易碰上莫名其妙的 gomod 拉取失败问题，可升级到`git 2.16.5`，用`root`执行以下命令：

```bash
yum install curl-devel expat-devel   # 依赖

yum remove git  # 删除老版本

wget https://www.kernel.org/pub/software/scm/git/git-2.16.5.tar.gz
tar xzf git-2.16.5.tar.gz
cd git-2.16.5
make prefix=/usr/local/git all
make prefix=/usr/local/git install
```

自行在 .bashrc 加上/usr/local/git/bin/到 path 变量：

```shell
export PATH=$PATH:/usr/local/go/bin:/usr/local/git/bin
```

### 2.1.5 安装常用工具

#### 2.1.5.1 trpc

如果使用 rick 平台进行 pb 管理和代码生成，则 trpc 工具可以暂不用安装
http://trpc.rick.oa.com/rick

低版本 golang 环境（ `< 1.17` ）执行如下：

```bash
go get -u trpc.tech/trpc-go/trpc-go-cmdline/v2/trpc
```

注：从 go 1.17 版本开始，通过 `go get` 来安装包的方式被废弃（ 见 [https://go.dev/doc/go-get-install-deprecation ](https://go.dev/doc/go-get-install-deprecation)），所以建议使用：

```bash
go install trpc.tech/trpc-go/trpc-go-cmdline/v2/trpc@latest
```

> 注：此处 trpc-go-cmdline 工具本身是 v2 的，但是既可以生成 code.oa v1 的代码，也可以生成 trpc.tech v2 的代码。工具的 v2 和项目是否使用 v2 无关。此外，[目前不推荐项目使用 v2](http://mk.woa.com/q/291729/answer/116248)

安装之后确保你的安装目录是加到你的 `PATH` 变量中的，否则 `trpc` 命令会找不到（或者找到的是某个其他路径下的旧版本），一般来说是安装到了你的 `$GOPATH/bin` 目录下，你可以

```bash
echo $GOPATH # 如果为空的话, 可以执行 go env 来确定 GOPATH
ls $GOPATH/bin # 查看 $GOPATH/bin 目录下是否有刚安装的 trpc
export PATH=$GOPATH/bin:$PATH # 在 $PATH 环境变量中添加安装路径, 可以把这一行放到你的 ~/.bashrc 中然后 source ~/.bashrc
```

# 3. Go语言工程结构(包管理)

## 3.1 Go 包管理的历史

在具体讲解 Go Modules 之前，我们先看一下 Go 包管理的历史。从 Go 推出之后，因为没有一个统一的官方方案，所以出现了很多种 Go 包管理方案，比较混乱，也没有彻底解决 Go 包管理的一些问题。Go 包管理的历史如下图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/0167c8f8da2e4714a9342b96f1395801.png)
这张图展示了 Go 依赖包管理工具经历的几个发展阶段，接下来我会按时间顺序重点介绍下其中的五个阶段。

### **Go1.5 版本前：GOPATH**

在 Go1.5 版本之前，没有版本控制，所有的依赖包都放在 GOPATH 下。采用这种方式，无法实现包的多版本管理，并且包的位置只能局限在 GOPATH 目录下。如果 A 项目和 B 项目用到了同一个 Go 包的不同版本，这时候只能给每个项目设置一个 GOPATH，将对应版本的包放在各自的 GOPATH 目录下，切换项目目录时也需要切换 GOPATH。这些都增加了开发和实现的复杂度。

### Go1.5 版本：Vendoring

Go1.5 推出了 vendor 机制，并在 Go1.6 中默认启用。在这个机制中，每个项目的根目录都可以有一个 vendor 目录，里面存放了该项目的 Go 依赖包。在编译 Go 源码时，Go 优先从项目根目录的 vendor 目录查找依赖；如果没有找到，再去 GOPATH 下的 vendor 目录下找；如果还没有找到，就去 GOPATH 下找。

这种方式解决了多 GOPATH 的问题，但是随着项目依赖的增多，vendor 目录会越来越大，造成整个项目仓库越来越大。在 vendor 机制下，一个中型项目的 vendor 目录有几百 M 的大小一点也不奇怪。

### “百花齐放”：多种 Go 依赖包管理工具出现

这个阶段，社区也出现了很多 Go 依赖包管理的工具，这里我介绍三个比较有名的。

- Godep：解决包依赖的管理工具，Docker、Kubernetes、CoreOS 等 Go 项目都曾用过 godep 来管理其依赖。
- Govendor：它的功能比 Godep 多一些，通过 vendor 目录下的vendor.json文件来记录依赖包的版本。
- Glide：相对完善的包管理工具，通过glide.yaml记录依赖信息，通过glide.lock追踪每个包的具体修改。

Govendor、Glide 都是在 Go 支持 vendor 之后推出的工具，Godep 在 Go 支持 vendor 之前也可以使用。Go 支持 vendor 之后，Godep 也改用了 vendor 模式。

### Go1.9 版本：Dep

对于从 0 构建项目的新用户来说，Glide 功能足够，是个不错的选择。不过，Golang 依赖管理工具混乱的局面最终由官方来终结了：Golang 官方接纳了由社区组织合作开发的 Dep，作为 official experiment。在相当长的一段时间里，Dep 作为标准，成为了事实上的官方包管理工具。

因为 Dep 已经成为了 official experiment 的过去时，现在我们就不必再去深究了，让我们直接去了解谁才是未来的 official experiment 吧。

### Go1.11 版本之后：Go Modules

Go1.11 版本推出了 Go Modules 机制，Go Modules 基于 vgo 演变而来，是 Golang 官方的包管理工具。在 Go1.13 版本，Go 语言将 Go Modules 设置为默认的 Go 管理工具；在 Go1.14 版本，Go 语言官方正式推荐在生产环境使用 Go Modules，并且鼓励所有用户从其他的依赖管理工具迁移过来。至此，Go 终于有了一个稳定的、官方的 Go 包管理工具。

到这里，我介绍了 Go 依赖包管理工具的历史，下面再来介绍下 Go Modules 的使用方法。

## 3.2 GOPATH

### 3.2.1 使用命令行查看GOPATH信息

工作目录是一个工程开发的相对参考目录，好比当你要在公司编写一套服务器代码，你的工位所包含的桌面、计算机及椅子就是你的工作区。工作区的概念与工作目录的概念也是类似的。如果不使用工作目录的概念，在多人开发时，每个人有一套自己的目录结构，读取配置文件的位置不统一，输出的二进制运行文件也不统一，这样会导致开发的标准不统一，影响开发效率。

在命令行中运行`go env`后，命令行将提示以下信息：

```shell
$ go env
GOARCH="amd64"
GOBIN=""
GOEXE=""
GOHOSTARCH="amd64"
GOHOSTOS="linux"
GOOS="linux"
GOPATH="/home/davy/go"
GORACE=""
GOROOT="/usr/local/go"
GOTOOLDIR="/usr/local/go/pkg/tool/linux_amd64"
[GCC](https://c.biancheng.net/gcc/)GO="gccgo"
CC="gcc"
GOGCCFLAGS="-fPIC -m64 -pthread -fmessage-length=0"
CXX="g++"
CGO_ENABLED="1"
CGO_CFLAGS="-g -O2"
CGO_CPPFLAGS=""
CGO_CXXFLAGS="-g -O2"
CGO_FFLAGS="-g -O2"
CGO_LDFLAGS="-g -O2"
PKG_CONFIG="pkg-config"
```

命令行说明如下：

- 第 1 行，执行 go env 指令，将输出当前 Go 开发包的环境变量状态。
- 第 2 行，GOARCH 表示目标处理器架构。
- 第 3 行，GOBIN 表示编译器和链接器的安装位置。
- 第 7 行，GOOS 表示目标操作系统。
- 第 8 行，GOPATH 表示当前工作目录。
- 第 10 行，GOROOT 表示 Go 开发包的安装目录。

### 3.2.2 使用GOPATH的工程结构

在 GOPATH 指定的工作目录下，代码总是会保存在 $GOPATH/src 目录下。在工程经过 go build、go install 或 go get 等指令后，会将产生的二进制可执行文件放在 $GOPATH/bin 目录下，生成的中间缓存文件会被保存在 $GOPATH/pkg 下。

如果需要将整个源码添加到版本管理工具（Version Control System，VCS）中时，只需要添加 $GOPATH/src 目录的源码即可。bin 和 pkg 目录的内容都可以由 src 目录生成。



一个Go语言项目的目录一般包含以下三个子目录：

- src 目录：放置项目和库的源文件；
- pkg 目录：放置编译后生成的包/库的归档文件；
- bin 目录：放置编译后生成的可执行文件。

三个目录中我们需要重点关注的是 src 目录，其他两个目录了解即可，下面来分别介绍一下这三个目录。

### 3.2.3 设置和使用GOPATH

本节以 Linux 为演示平台，为大家演示使用 GOPATH 的方法。

#### 1) 设置当前目录为GOPATH

选择一个目录，在目录中的命令行中执行下面的指令：

export GOPATH=`pwd`

该指令中的 pwd 将输出当前的目录，使用反引号```将 pwd 指令括起来表示命令行替换，也就是说，使用``pwd``将获得 pwd 返回的当前目录的值。例如，假设你的当前目录是“/home/davy/go”，那么使用``pwd``将获得返回值“/home/davy/go”。

使用 export 指令可以将当前目录的值设置到环境变量 GOPATH中。

#### 2) 建立GOPATH中的源码目录

使用下面的指令创建 GOPATH 中的 src 目录，在 src 目录下还有一个 hello 目录，该目录用于保存源码。

mkdir -p src/hello

mkdir 指令的 -p 可以连续创建一个路径。

#### 3) 添加main.go源码文件

使用 Linux 编辑器将下面的源码保存为 main.go 并保存到 $GOPATH/src/hello 目录下。

```shell
package main
import "fmt"
func main(){    
  fmt.Println("hello")
}
```

#### 4) 编译源码并运行

此时我们已经设定了 GOPATH，因此在 Go语言中可以通过 GOPATH 找到工程的位置。

在命令行中执行如下指令编译源码：

```shell
go install hello
```

编译完成的可执行文件会保存在 $GOPATH/bin 目录下。

在 bin 目录中执行 ./hello，命令行输出如下：

```shell
hello world
```

### 3.2.4 在多项目工程中使用GOPATH

在很多与 Go语言相关的书籍、文章中描述的 GOPATH 都是通过修改系统全局的环境变量来实现的。然而，根据笔者多年的 Go语言使用和实践经验及周边朋友、同事的反馈，这种设置全局 GOPATH 的方法可能会导致当前项目错误引用了其他目录的 Go 源码文件从而造成编译输出错误的版本或编译报出一些无法理解的错误提示。

比如说，将某项目代码保存在 /home/davy/projectA 目录下，将该目录设置为 GOPATH。随着开发进行，需要再次获取一份工程项目的源码，此时源码保存在 /home/davy/projectB 目录下，如果此时需要编译 projectB 目录的项目，但开发者忘记设置 GOPATH 而直接使用命令行编译，则当前的 GOPATH 指向的是 /home/davy/projectA 目录，而不是开发者编译时期望的 projectB 目录。编译完成后，开发者就会将错误的工程版本发布到外网。

因此，建议大家无论是使用命令行或者使用集成开发环境编译 Go 源码时，GOPATH 跟随项目设定。在 Jetbrains 公司的 GoLand 集成开发环境（IDE）中的 GOPATH 设置分为全局 GOPATH 和项目 GOPATH，如下图所示。

## 3.3 go module模式

### 3.3.1 Go Modules 命令

1) 首先需要把 golang 升级到 1.11 版本以上（现在 1.13 已经发布了，建议使用 1.13）。

2) 设置 GO111MODULE。

在Go语言 1.12 版本之前，要启用 go module 工具首先要设置环境变量 GO111MODULE，不过在Go语言 1.13 及以后的版本则不再需要设置环境变量。通过 GO111MODULE 可以开启或关闭 go module 工具。

- GO111MODULE=off 禁用 go module，编译时会从 GOPATH 和 vendor 文件夹中查找包；
- GO111MODULE=on 启用 go module，编译时会忽略 GOPATH 和 vendor 文件夹，只根据 go.mod下载依赖；
- GO111MODULE=auto（默认值），当项目在 GOPATH/src 目录之外，并且项目根目录有 go.mod 文件时，开启 go module。

Windows 下开启 GO111MODULE 的命令为：

```shell
set GO111MODULE=on 或者 set GO111MODULE=auto
```

MacOS 或者 Linux 下开启 GO111MODULE 的命令为：

```shell
export GO111MODULE=on 或者 export GO111MODULE=auto
```

在开启 GO111MODULE 之后就可以使用 go module 工具了，也就是说在以后的开发中就没有必要在 GOPATH 中创建项目了，并且还能够很好的管理项目依赖的第三方包信息。

Go Modules 的管理命令为go mod，go mod有很多子命令，你可以通过go help mod来获取所有的命令。下面我来具体介绍下这些命令。

| 命令            | 作用                                           |
| --------------- | ---------------------------------------------- |
| go mod download | 下载依赖包到本地（默认为 GOPATH/pkg/mod 目录） |
| go mod edit     | 编辑 go.mod 文件                               |
| go mod graph    | 打印模块依赖图                                 |
| go mod init     | 初始化当前文件夹，创建 go.mod 文件             |
| go mod tidy     | 增加缺少的包，删除无用的包                     |
| go mod vendor   | 将依赖复制到 vendor 目录下                     |
| go mod verify   | 校验依赖                                       |
| go mod why      | 解释为什么需要依赖                             |

### 3.3.2 GOPROXY

proxy 顾名思义就是代理服务器的意思。大家都知道，国内的网络有防火墙的存在，这导致有些Go语言的第三方包我们无法直接通过`go get`命令获取。GOPROXY 是Go语言官方提供的一种通过中间代理商来为用户提供包下载服务的方式。要使用 GOPROXY 只需要设置环境变量 GOPROXY 即可。

目前公开的代理服务器的地址有：

- goproxy.io；
- goproxy.cn：（推荐）由国内的七牛云提供。

Windows 下设置 GOPROXY 的命令为：

```shell
go env -w GOPROXY=https://goproxy.cn,direct
```

MacOS 或 Linux 下设置 GOPROXY 的命令为：

```shell
export GOPROXY=https://goproxy.cn
```

Go语言在 1.13 版本之后 GOPROXY 默认值为 https://proxy.golang.org，在国内可能会存在下载慢或者无法访问的情况，所以十分建议大家将 GOPROXY 设置为国内的 goproxy.cn。

### 3.3.3 模块下载

在执行 go get 等命令时，会自动下载模块。接下来，我会介绍下 go 命令是如何下载模块的。主要有三种下载方式：

- 通过代理下载
- 指定版本号下载；
- 按最小版本下载。

#### a. 通过代理来下载模块

默认情况下，Go 命令从 VCS（Version Control System，版本控制系统）直接下载模块，例如 GitHub、Bitbucket、Bazaar、Mercurial 或者 SVN。

在 Go 1.13 版本，引入了一个新的环境变量 GOPROXY，用于设置 Go 模块代理（Go module proxy）。模块代理可以使 Go 命令直接从代理服务器下载模块。GOPROXY 默认值为https://proxy.golang.org,direct，代理服务器可以指定多个，中间用逗号隔开，例如GOPROXY=https://proxy.golang.org,[https://goproxy.cn](https://goproxy.cn/),direct。当下载模块时，会优先从指定的代理服务器上下载。如果下载失败，比如代理服务器不可访问，或者 HTTP 返回码为404或410，Go 命令会尝试从下一个代理服务器下载。

direct 是一个特殊指示符，用来指示 Go 回源到模块的源地址 (比如 GitHub 等) 去抓取 ，当值列表中上一个 Go module proxy 返回 404 或 410，Go 会自动尝试列表中的下一个，遇见 direct 时回源，遇见 EOF 时终止，并抛出类似invalid version: unknown revision...的错误。 如果GOPROXY=off，则 Go 命令不会尝试从代理服务器下载模块。

引入 Go module proxy 会带来很多好处，比如：

- 国内开发者无法访问像 golang.org、gopkg.in、go.uber.org 这类域名，可以设置 GOPROXY 为国内可以访问的代理服务器，解决依赖包下载失败的问题。
- Go 模块代理会永久缓存和存储所有的依赖，并且这些依赖一经缓存，不可更改，这也意味着我们不需要再维护一个 vendor 目录，也可以避免因为维护 vendor 目录所带来的存储空间占用。
- 因为依赖永久存在于代理服务器，这样即使模块从互联网上被删除，也仍然可以通过代理服务器获取到。
- 一旦将 Go 模块存储在 Go 代理服务器中，就无法覆盖或删除它，这可以保护开发者免受可能注入相同版本恶意代码所带来的攻击。
- 我们不再需要 VCS 工具来下载依赖，因为所有的依赖都是通过 HTTP 的方式从代理服务器下载。
- 因为 Go 代理通过 HTTP 独立提供了源代码（.zip 存档）和 go.mod，所以下载和构建 Go 模块的速度更快。因为可以独立获取 go.mod（而之前必须获取整个仓库），所以解决依赖也更快。
- 当然，开发者也可以设置自己的 Go 模块代理，这样开发者可以对依赖包有更多的控制，并可以预防 VCS 停机所带来的下载失败。

在实际开发中，我们的很多模块可能需要从私有仓库拉取，通过代理服务器访问会报错，这时候我们需要将这些模块添加到环境变量 GONOPROXY 中，这些私有模块的哈希值也不会在 checksum database 中存在，需要将这些模块添加到 GONOSUMDB 中。一般来说，我建议直接设置 GOPRIVATE 环境变量，它的值将作为 GONOPROXY 和 GONOSUMDB 的默认值。

GONOPROXY、GONOSUMDB 和 GOPRIVATE 都支持通配符，多个域名用逗号隔开，例如*.example.com,github.com。

对于国内的 Go 开发者来说，目前有 3 个常用的 GOPROXY 可供选择，分别是官方、七牛和阿里云。

官方的 GOPROXY，国内用户可能访问不到，所以我更推荐使用七牛的goproxy.cn，goproxy.cn是七牛云推出的非营利性项目，它的目标是为中国和世界上其他地方的 Go 开发者提供一个免费、可靠、持续在线，且经过 CDN 加速的模块代理。

#### b. 指定版本号下载

通常，我们通过go get来下载模块，下载命令格式为go get <package[@version]>，如下表所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/c169ab91148b48b09dab519a43d22c67.png)
你可以使用go get -u更新 package 到 latest 版本，也可以使用go get -u=patch只更新小版本，例如从v1.2.4到v1.2.5。

#### c. 按最小版本下载

一个模块往往会依赖许多其他模块，并且不同的模块也可能会依赖同一个模块的不同版本，如下图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/b6bea768b43b4b17874e96d54120dab0.png)
在上述依赖中，模块 A 依赖了模块 B 和模块 C，模块 B 依赖了模块 D，模块 C 依赖了模块 D 和模块 F，模块 D 又依赖了模块 E。并且，同模块的不同版本还依赖了对应模块的不同版本。

那么 Go Modules 是如何选择版本的呢？Go Modules 会把每个模块的依赖版本清单都整理出来，最终得到一个构建清单，如下图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/66527135a9ee4b81a5bf61f9504cce7e.png)
上图中，rough list 和 final list 的区别在于重复引用的模块 D（v1.3、v1.4），最终清单选用了 D 的v1.4版本。

这样做的主要原因有两个。第一个是语义化版本的控制。因为模块 D 的v1.3和v1.4版本变更都属于次版本号的变更，而在语义化版本的约束下，v1.4必须要向下兼容v1.3，因此我们要选择高版本的v1.4。

第二个是模块导入路径的规范。主版本号不同，模块的导入路径就不一样。所以，如果出现不兼容的情况，主版本号会改变，例如从 v1 变为 v2，模块的导入路径也就改变了，因此不会影响 v1 版本。

### 3.3.4 go.mod 和 go.sum 介绍

在 Go Modules 中，go.mod 和 go.sum 是两个非常重要的文件，下面我就来详细介绍这两个文件。

#### go.mod 文件介绍

go.mod 文件是 Go Modules 的核心文件。下面是一个 go.mod 文件示例：

```bash
module github.com/marmotedu/iam

go 1.14

require (
  github.com/AlekSi/pointer v1.1.0
  github.com/appleboy/gin-jwt/v2 v2.6.3
  github.com/asaskevich/govalidator v0.0.0-20200428143746-21a406dcc535
  github.com/gin-gonic/gin v1.6.3
  github.com/golangci/golangci-lint v1.30.0 // indirect
  github.com/google/uuid v1.0.0
    github.com/blang/semver v3.5.0+incompatible
    golang.org/x/text v0.3.2
)

replace (
    github.com/gin-gonic/gin => /home/colin/gin
    golang.org/x/text v0.3.2 => github.com/golang/text v0.3.2
)

exclude (
    github.com/google/uuid v1.1.0
)
```

接下来，我会从 go.mod 语句、go.mod 版本号、go.mod 文件修改方法三个方面来介绍 go.mod。

##### go.mod 语句

go.mod 文件中包含了 4 个语句，分别是 module、require、replace 和 exclude。下面我来介绍下它们的功能。

- module：用来定义当前项目的模块路径。
- go：用来设置预期的 Go 版本，目前只是起标识作用。 所以 没有约束、检查 等实际作用。
- require：用来设置一个特定的模块版本，格式为<导入包路径> <版本> [// indirect]。
- exclude：用来从使用中排除一个特定的模块版本，如果我们知道模块的某个版本有严重的问题，就可以使用 exclude 将该版本排除掉。
- replace：用来将一个模块版本替换为另外一个模块版本。格式为 `$module => $newmodule` ，`$newmodule`可以是本地磁盘的相对路径，例如github.com/gin-gonic/gin => ./gin。也可以是本地磁盘的绝对路径，例如github.com/gin-gonic/gin => /home/lk/gin。还可以是网络路径，例如golang.org/x/text v0.3.2 => github.com/golang/text v0.3.2。

这里需要注意，虽然我们用`$newmodule`替换了`$module`，但是在代码中的导入路径仍然为$module。replace 在实际开发中经常用到，下面的场景可能需要用到 replace：

- 在开启 Go Modules 后，缓存的依赖包是只读的，但在日常开发调试中，我们可能需要修改依赖包的代码来进行调试，这时可以将依赖包另存到一个新的位置，并在 go.mod 中替换这个包。
- 如果一些依赖包在 Go 命令运行时无法下载，就可以通过其他途径下载该依赖包，上传到开发构建机，并在 go.mod 中替换为这个包。
- 在项目开发初期，A 项目依赖 B 项目的包，但 B 项目因为种种原因没有 push 到仓库，这时也可以在 go.mod 中把依赖包替换为 B 项目的本地磁盘路径。
- 在国内访问 golang.org/x 的各个包都需要FQ，可以在 go.mod 中使用 replace，替换成 GitHub 上对应的库，例如golang.org/x/text v0.3.0 => github.com/golang/text v0.3.0。

有一点要注意，exclude 和 replace 只作用于当前主模块，不影响主模块所依赖的其他模块。

##### go.mod 版本号

go.mod 文件中有很多版本号格式，我知道在平时使用中，有很多开发者对此感到困惑。这里，我来详细说明一下。

- 如果模块具有符合语义化版本格式的 tag，会直接展示 tag 的值，例如 github.com/AlekSi/pointer v1.1.0 。
- 除了 v0 和 v1 外，主版本号必须显试地出现在模块路径的尾部，例如github.com/appleboy/gin-jwt/v2 v2.6.3。
- 对于没有 tag 的模块，Go 命令会选择 master 分支上最新的 commit，并根据 commit 时间和哈希值生成一个符合语义化版本的版本号，例如github.com/asaskevich/govalidator v0.0.0-20200428143746-21a406dcc535。
- 如果模块名字跟版本不符合规范，例如模块的名字为github.com/blang/semver，但是版本为 v3.5.0（正常应该是github.com/blang/semver/v3），go 会在 go.mod 的版本号后加+incompatible表示。
- 如果 go.mod 中的包是间接依赖，则会添加`// indirect`注释，例如github.com/golangci/golangci-lint v1.30.0 // indirect。

这里要注意，Go Modules 要求模块的版本号格式为`v<major>.<minor>.<patch>`，如果版本号大于 1，它的版本号还要体现在模块名字中，例如模块github.com/blang/semver版本号增长到v3.x.x，则模块名应为github.com/blang/semver/v3。

这里再详细介绍下出现`// indirect`的情况。原则上 go.mod 中出现的都是直接依赖，但是下面的两种情况只要出现一种，就会在 go.mod 中添加间接依赖。

- 直接依赖未启用 Go Modules：如果模块 A 依赖模块 B，模块 B 依赖 B1 和 B2，但是 B 没有 go.mod 文件，则 B1 和 B2 会记录到 A 的 go.mod 文件中，并在最后加上// indirect。
- 直接依赖 go.mod 文件中缺失部分依赖：如果模块 A 依赖模块 B，模块 B 依赖 B1 和 B2，B 有 go.mod 文件，但是只有 B1 被记录在 B 的 go.mod 文件中，这时候 B2 会被记录到 A 的 go.mod 文件中，并在最后加上// indirect。

##### go.mod 文件修改方法

要修改 go.mod 文件，我们可以采用下面这三种方法：

- Go 命令在运行时自动修改。
- 手动编辑 go.mod 文件，编辑之后可以执行go mod edit -fmt格式化 go.mod 文件。
- 执行 go mod 子命令修改。

在实际使用中，我建议你采用第三种修改方法，和其他两种相比不太容易出错。使用方式如下：

```bash
go mod edit -fmt  # go.mod 格式化
go mod edit -require=golang.org/x/text@v0.3.3  # 添加一个依赖
go mod edit -droprequire=golang.org/x/text # require的反向操作，移除一个依赖
go mod edit -replace=github.com/gin-gonic/gin=/home/colin/gin # 替换模块版本
go mod edit -dropreplace=github.com/gin-gonic/gin # replace的反向操作
go mod edit -exclude=golang.org/x/text@v0.3.1 # 排除一个特定的模块版本
go mod edit -dropexclude=golang.org/x/text@v0.3.1 # exclude的反向操作
```

#### go.sum 文件介绍

Go 会根据 go.mod 文件中记载的依赖包及其版本下载包源码，但是下载的包可能被篡改，缓存在本地的包也可能被篡改。单单一个 go.mod 文件，不能保证包的一致性。为了解决这个潜在的安全问题，Go Modules 引入了 go.sum 文件。

go.sum 文件用来记录每个依赖包的 hash 值，在构建时，如果本地的依赖包 hash 值与go.sum文件中记录的不一致，则会拒绝构建。go.sum 中记录的依赖包是所有的依赖包，包括间接和直接的依赖包。

这里提示下，为了避免已缓存的模块被更改，`$GOPATH/pkg/mod`下缓存的包是只读的，不允许修改。

接下来我从 go.sum 文件内容、go.sum 文件生成、校验三个方面来介绍 go.sum。

##### go.sum 文件内容

下面是一个 go.sum 文件的内容：

```bash
golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c h1:qgOY6WgZOaTkIIMiVjBQcw93ERBE4m30iBm00nkL0i8=
golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c/go.mod h1:NqM8EUOU14njkJ3fqMW+pc6Ldnwhi/IjpwHt7yyuwOQ=
rsc.io/quote v1.5.2 h1:w5fcysjrx7yqtD/aO+QwRjYZOKnaM9Uh2b40tElTs3Y=
rsc.io/quote v1.5.2/go.mod h1:LzX7hefJvL54yjefDEDHNONDjII0t9xZLPXsUe+TKr0=
rsc.io/sampler v1.3.0 h1:7uVkIFmeBqHfdjD+gZwtXXI+RODJ2Wc4O7MPEh/QiW4=
rsc.io/sampler v1.3.0/go.mod h1:T1hPZKmBbMNahiBKFy5HrXp6adAjACjK9JXDnKaTXpA=
```

go.sum 文件中，每行记录由模块名、版本、哈希算法和哈希值组成，如`<module> <version>[/go.mod] <algorithm>:<hash>`。目前，从 Go1.11 到 Go1.14 版本，只有一个算法 SHA-256，用 h1 表示。

正常情况下，每个依赖包会包含两条记录，分别是依赖包所有文件的哈希值和该依赖包 go.mod 的哈希值，例如：

```bash
rsc.io/quote v1.5.2 h1:w5fcysjrx7yqtD/aO+QwRjYZOKnaM9Uh2b40tElTs3Y=
rsc.io/quote v1.5.2/go.mod h1:LzX7hefJvL54yjefDEDHNONDjII0t9xZLPXsUe+TKr0=
```

但是，如果一个依赖包没有 go.mod 文件，就只记录依赖包所有文件的哈希值，也就是只有第一条记录。额外记录 go.mod 的哈希值，主要是为了在计算依赖树时不必下载完整的依赖包版本，只根据 go.mod 即可计算依赖树。

##### go.sum 文件生成

在 Go Modules 开启时，如果我们的项目需要引入一个新的包，通常会执行go get命令，例如：

```bash
$ go get rsc.io/quote
```

当执行`go get rsc.io/quote`命令后，`go get`命令会先将依赖包下载到`$GOPATH/pkg/mod/cache/download`，下载的依赖包文件名格式为`$version.zip`，例如`v1.5.2.zip`。

下载完成之后，`go get`会对该 zip 包做哈希运算，并将结果存在`$version.ziphash`文件中，例如`v1.5.2.ziphash`。如果在项目根目录下执行go get命令，则go get会同时更新 go.mod 和 go.sum 文件。例如，go.mod 新增一行require rsc.io/quote v1.5.2，go.sum 新增两行：

```bash
rsc.io/quote v1.5.2 h1:w5fcysjrx7yqtD/aO+QwRjYZOKnaM9Uh2b40tElTs3Y=
rsc.io/quote v1.5.2/go.mod h1:LzX7hefJvL54yjefDEDHNONDjII0t9xZLPXsUe+TKr0=
```

##### 校验

在我们执行构建时，go 命令会从本地缓存中查找所有的依赖包，并计算这些依赖包的哈希值，然后与 go.sum 中记录的哈希值进行对比。如果哈希值不一致，则校验失败，停止构建。

校验失败可能是因为本地指定版本的依赖包被修改过，也可能是 go.sum 中记录的哈希值是错误的。但是 Go 命令倾向于相信依赖包被修改过，因为当我们在 go get 依赖包时，包的哈希值会经过校验和数据库（checksum database）进行校验，校验通过才会被加入到 go.sum 文件中。也就是说，go.sum 文件中记录的哈希值是可信的。

校验和数据库可以通过环境变量GOSUMDB指定，GOSUMDB的值是一个 web 服务器，默认值是`sum.golang.org`。该服务可以用来查询依赖包指定版本的哈希值，保证拉取到的模块版本数据没有经过篡改。

如果设置GOSUMDB为off，或者使用go get的时候启用了-insecure参数，Go 就不会去对下载的依赖包做安全校验，这存在一定的安全隐患，所以我建议你开启校验和数据库。如果对安全性要求很高，同时又访问不了sum.golang.org，你也可以搭建自己的校验和数据库。

值得注意的是，Go checksum database 可以被 Go module proxy 代理，所以当我们设置了GOPROXY后，通常情况下不用再设置GOSUMDB。还要注意的是，go.sum 文件也应该提交到你的 Git 仓库中去。

> 思考下，如果不提交 go.sum，会有什么风险？

答案是：如果go get时，GOSUMDB=off，就没有办法校验下载的包是否被篡改。当别人使用项目并下载依赖时，无法验证他们使用的依赖和你开发时的依赖是否一致，存在下载到被篡改代码的风险。

## 3.4 Go语言import导入包

### 3.4.1 GOPATH模式

每个导入声明可以单独指定一个导入路径，也可以通过圆括号同时导入多个导入路径。要引用其他包的标识符，可以使用 import 关键字，导入的包名使用双引号包围，**包名是从 GOPATH 开始计算的路径，使用`/`进行路径分隔**。

#### 3.4.1.1 路径写法

代码 8-1 的目录层次如下：

```shell
.
└── src
  └── chapter08
    └── importadd
      ├── main.go
      └── mylib
        └── add.go
```

代码8-1　加函数（具体文件：…/chapter08/importadd/mylib/add.go）

```shell
package mylib
func Add(a, b int) int {    
	return a + b
}
```

第 3 行中的 Add() 函数以大写 A 开头，表示将 Add() 函数导出供包外使用。当首字母小写时，为包内使用，包外无法引用到。

add.go 在 mylib 文件夹下，习惯上将文件夹的命名与包名一致，命名为 mylib 包。

代码8-2　导入包（具体文件：…/chapter08/importadd/main.go）

```shell
package main
import (    
"chapter08/importadd/mylib"    
"fmt"
)
func main() {    
	fmt.Println(mylib.Add(1, 2))
}
```

代码说明如下：

- 第 4 行，导入 chapter08/importadd/mylib 包。
- 第 9 行，使用 mylib 作为包名，并引用 Add() 函数调用。

在命令行中运行下面代码：

```shell
export GOPATH=/home/davy/golangbook/code
go install chapter08/importadd
$GOPATH/bin/importadd
```

命令说明如下：

- 第 1 行，根据你的 GOPATH 不同，设置 GOPATH。
- 第 2 行，使用 go install 指令编译并安装 chapter08/code8-1 到 GOPATH 的 bin 目录下。
- 第 3 行，执行 GOPATH 的 bin 目录下的可执行文件 code8-1。

运行代码，输出结果如下：

```shell
3
```

### 3.4.2 GOMODULE模式

和go.mod里的module有关

### 3.4.3 其他

- **import后面的是目录**
- **包名和目录名没有关系，但是包名最好等于目录名**
- **同一个目录下只能有一种包名**
- **调用方法的时候使用【import目录下】文件指定的包名调用**

# 5. 常用标准库之-fmt

## 5.1 向外输出

标准库`fmt`提供了以下几种输出相关函数。

### **5.1.1 Print**

`Print`函数直接输出内容

`Printf`函数支持格式化输出字符串

`Println`函数会在输出内容的结尾添加一个换行符

```go
func Print(a ...interface{}) (n int, err error)
func Printf(format string, a ...interface{}) (n int, err error)
func Println(a ...interface{}) (n int, err error)
```

举个简单的例子：

```go
func main() {
    fmt.Print("lqz is NB")
    name := "lqz"
    fmt.Printf("我是：%s\n", name)
    fmt.Println("打印并换行")
}
```

执行上面的代码输出：

```go
lqz is NB我是：lqz
打印并换行
```

### **5.1.2 格式化输出占位符**

`Printf`系列函数都支持format格式化参数，在这里我们按照占位符将被替换的变量类型划分，方便查询和记忆。

#### **通用占位符**

| 占位符 | 说明                                           |
| ------ | ---------------------------------------------- |
| %v     | 值的默认格式输出（不知道用什么占都可以用这个） |
| %+v    | 类似于%v，但输出结构体时会输出字段名           |
| %#v    | 值的Go语法表示                                 |
| %T     | 打印值的类型                                   |
| %%     | 百分号                                         |

示例代码如下：

```go
    fmt.Printf("名字是：%v\n","lqz")
    fmt.Printf("年龄是：%v\n",19)
    p:= struct {
        name string
        age int
    }{"lqz",19}
    fmt.Printf("结构体内容为：%v\n",p)
    fmt.Printf("结构体内容为(带字段名)：%+v\n",p) // 输出结构体是会带name
    fmt.Printf("结构体内容为(值的Go语法表示)：%#v\n",p) // 输出结构体是会带name


    fmt.Printf("切片内容为：%v\n",[]int{4,5,6})
    fmt.Printf("切片内容为(值的Go语法表示)：%#v\n",[]int{4,5,6})

    fmt.Printf("切片值的类型为：%T\n",[]int{4,5,6})
    fmt.Printf("字符串值的类型为：%T\n","lqz")

    fmt.Printf("打印百分百：100%%\n")
```

输出结果如下：

```bash
名字是：lqz
年龄是：19
结构体内容为：{lqz 19}
结构体内容为(带字段名)：{name:lqz age:19}
结构体内容为(值的Go语法表示)：struct { name string; age int }{name:"lqz", age:19}
切片内容为：[4 5 6]
切片内容为(值的Go语法表示)：[]int{4, 5, 6}
切片值的类型为：[]int
字符串值的类型为：string
打印百分百：100%

```

#### **布尔型**

| 占位符 | 说明        |
| ------ | ----------- |
| %t     | true或false |

```go
var limit bool = false;
fmt.Printf("limit=%t \n",limit)
```

#### **整型**

| 占位符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| %b     | 表示为二进制                                                 |
| %c     | 该值对应的unicode码值                                        |
| %d     | 表示为十进制                                                 |
| %o     | 表示为八进制                                                 |
| %x     | 表示为十六进制，使用a-f                                      |
| %X     | 表示为十六进制，使用A-F                                      |
| %U     | 表示为Unicode格式：U+1234，等价于”U+%04X”                    |
| %q     | 该值对应的单引号括起来的go语法字符字面值，必要时会采用安全的转义表示 |

示例代码如下：

```go
    n := 3333
    fmt.Printf("二进制表示：%b\n", n)
    fmt.Printf("unicode对应的字符：%c\n", n)
    fmt.Printf("十进制表示：%d\n", n)
    fmt.Printf("八进制表示：%o\n", 9)
    fmt.Printf("十六进制小写：%x\n", 123)
    fmt.Printf("十六进制大写：%X\n", 123)
    fmt.Printf("用引号引起来的字符字面值：%q\n", 65)
```

输出结果如下：

```bash
二进制表示：110100000101
unicode对应的字符：അ
十进制表示：3333
八进制表示：11
十六进制小写：7b
十六进制大写：7B
用引号引起来的字符字面值：'A'
```

#### **浮点数与复数**

| 占位符 | 说明                                                   |
| ------ | ------------------------------------------------------ |
| %b     | 无小数部分、二进制指数的科学计数法，如-123456p-78      |
| %e     | 科学计数法，如-1234.456e+78                            |
| %E     | 科学计数法，如-1234.456E+78                            |
| %f     | 有小数部分但无指数部分，如123.456                      |
| %F     | 等价于%f                                               |
| %g     | 根据实际情况采用%e或%f格式（以获得更简洁、准确的输出） |
| %G     | 根据实际情况采用%E或%F格式（以获得更简洁、准确的输出） |

示例代码如下：

```go
	f := 3.14159
	fmt.Printf("无小数部分、二进制指数的科学计数法，(如-123456p-78):%b\n", f)
	fmt.Printf("科学计数法(-1234.456e+78)：%e\n", f)
	fmt.Printf("科学计数法(如-1234.456E+78)：%E\n", f)
	fmt.Printf("有小数部分但无指数部分:%f\n", f)
	fmt.Printf("有小数部分但无指数部分:%F\n", f)
	fmt.Printf("根据实际情况采用%%e或%%f格式（以获得更简洁、准确的输出）:%g\n", f)
	fmt.Printf("根据实际情况采用%%E或%%F格式（以获得更简洁、准确的输出）:%G\n", f)
```

输出结果如下：

```bash
无小数部分、二进制指数的科学计数法，(如-123456p-78):7074231776675438p-51
科学计数法(-1234.456e+78)：3.141590e+00
科学计数法(如-1234.456E+78)：3.141590E+00
有小数部分但无指数部分:3.141590
有小数部分但无指数部分:3.141590
根据实际情况采用%e或%f格式（以获得更简洁、准确的输出）:3.14159
根据实际情况采用%E或%F格式（以获得更简洁、准确的输出）:3.14159
```

#### **字符串和[]byte**

| 占位符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| %s     | 直接输出字符串或者[]byte                                     |
| %q     | 该值对应的双引号括起来的go语法字符串字面值，必要时会采用安全的转义表示 |
| %x     | 每个字节用两字符十六进制数表示（使用a-f）                    |
| %X     | 每个字节用两字符十六进制数表示（使用A-F）                    |

示例代码如下：

```go
	name:="lqz"
	b:=[]byte{'l','q','z',65}
	fmt.Printf("字符串为：%s\n",name)
	fmt.Printf("切片为：%s\n",b)

	fmt.Printf("双引号括起来的go语法字符串字面值：%q\n",name)
	fmt.Printf("双引号括起来的go语法字符串字面值：%q\n",b)

	fmt.Printf("每个字节用两字符十六进制数表示：%x\n",name)
	fmt.Printf("每个字节用两字符十六进制数表示：%x\n",b)

	fmt.Printf("每个字节用两字符十六进制数表示（使用a-f）：%X\n",name)
	fmt.Printf("每个字节用两字符十六进制数表示（使用A-F）：%X\n",b)
```

输出结果如下：

```bash
字符串为：lqz
切片为：lqzA
双引号括起来的go语法字符串字面值："lqz"
双引号括起来的go语法字符串字面值："lqzA"
每个字节用两字符十六进制数表示：6c717a
每个字节用两字符十六进制数表示：6c717a41
每个字节用两字符十六进制数表示（使用a-f）：6c717a
每个字节用两字符十六进制数表示（使用A-F）：6C717A41
```

#### **指针**

| 占位符 | 说明                           |
| ------ | ------------------------------ |
| %p     | 表示为十六进制，并加上前导的0x |

示例代码如下：

```go
	a := 99
	fmt.Printf("%p\n", &a)
	fmt.Printf("%#p\n", &a)
```

输出结果如下：

```bash
0xc000018078
c000018078
```

#### **宽度标识符**

宽度通过一个紧跟在百分号后面的十进制数指定，如果未指定宽度，则表示值时除必需之外不作填充。精度通过（可选的）宽度后跟点号后跟的十进制数指定。如果未指定精度，会使用默认精度；如果点号后没有跟数字，表示精度为0。举例如下：

| 占位符 | 说明               |
| ------ | ------------------ |
| %f     | 默认宽度，默认精度 |
| %9f    | 宽度9，默认精度    |
| %.2f   | 默认宽度，精度2    |
| %9.2f  | 宽度9，精度2       |
| %9.f   | 宽度9，精度0       |

示例代码如下：

```go
n := 12.34
fmt.Printf("%f\n", n)
fmt.Printf("%9f\n", n)
fmt.Printf("%.2f\n", n)
fmt.Printf("%9.2f\n", n)
fmt.Printf("%9.f\n", n)
```

输出结果如下：

```bash
默认宽度，默认精度:3.141593
宽度9，默认精度: 3.141593
默认宽度，精度2:3.14
宽度9，精度2:     3.14
宽度9，精度0:        3
```

#### **其他flag**

| 占位符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| 'x'    | 总是输出数值的正负号；对%q（%+q）会生成全部是ASCII字符的输出（通过转义）； |
| ''     | 对数值，正数前加空格而负数前加负号；对字符串采用%x或%X时（% x或% X）会给各打印的字节之间加空格 |
| '-'    | 在输出右边填充空白而不是默认的左边（即从默认的右对齐切换为左对齐）； |
| '#'    | 八进制数前加0（%#o），十六进制数前加0x（%#x）或0X（%#X），指针去掉前面的0x（%#p）对%q（%#q），对%U（%#U）会输出空格和单引号括起来的go字面值； |
| '0'    | 使用0而不是空格填充，对于数值类型会把填充的0放在正负号后面； |

举个例子：

```go
	s := "刘清政"
	fmt.Printf("正常字符串输出：%s\n", s)
	fmt.Printf("宽度是5，右对齐：%5s\n", s)
	fmt.Printf("宽度是5，左对齐：%-5s\n", s)
	fmt.Printf("总长度为3,截取2个，右对齐：%3.2s\n", s)
	fmt.Printf("总长度为3,截取2个，左对齐：%-3.2s\n", s)
	fmt.Printf("宽度为5，只要2个字符：%5.2s\n", s)
	fmt.Printf("宽度为5，不够用0补齐：%05s\n", s)
```

输出结果如下：

```bash
正常字符串输出：刘清政
宽度是5，右对齐：  刘清政
宽度是5，左对齐：刘清政  
总长度为3,截取2个，右对齐： 刘清
总长度为3,截取2个，左对齐：刘清 
宽度为5，只要2个字符：   刘清
宽度为5，不够用0补齐：00刘清政
```

### **5.1.3 Fprint**

`Fprint`系列函数会将内容输出到一个`io.Writer`接口类型的变量`w`中，我们通常用这个函数往文件中写入内容。

```go
func Fprint(w io.Writer, a ...interface{}) (n int, err error)
func Fprintf(w io.Writer, format string, a ...interface{}) (n int, err error)
func Fprintln(w io.Writer, a ...interface{}) (n int, err error)
```

举个例子：

```go
func main() {
	// 向标准输出写入内容
	fmt.Fprintln(os.Stdout, "向标准输出(控制台)写入内容")
	fileObj, err := os.OpenFile("./xx.txt", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		fmt.Println("打开文件出错，err:", err)
		return
	}
	name := "lqz is nb"
	// 向打开的文件句柄中写入内容
	fmt.Fprintf(fileObj, "往文件中(标准输出)写如信息：%s", name)

}
```

注意，只要满足`io.Writer`接口的类型都支持写入

### **5.1.4 Sprint**

`Sprint`系列函数会把传入的数据生成并返回一个字符串。

```go
func Sprint(a ...interface{}) string
func Sprintf(format string, a ...interface{}) string
func Sprintln(a ...interface{}) string
```

简单的示例代码如下：

```go
	s1 := fmt.Sprint("lqz")
	name := "lqz"
	age := 18
	s2 := fmt.Sprintf("姓名:%s,年龄:%d", name, age)
	s3 := fmt.Sprintln("lqz is nb")
	fmt.Println(s1, s2, s3)
lqz 姓名:lqz,年龄:18 lqz is nb
```



### **5.1.5 Errorf**

`Errorf`函数根据format参数生成格式化字符串并返回一个包含该字符串的错误。

```go
func Errorf(format string, a ...interface{}) error
```

通常使用这种方式来自定义错误类型，例如：

```go
err := fmt.Errorf("这是一个错误")
```

Go1.13后版本为`fmt.Errorf`函数新加了一个`%w`占位符用来生成一个可以包裹Error的Wrapping Error。

```go
e := errors.New("原始错误e")
w := fmt.Errorf("Wrap了一个错误%w", e)
	err := fmt.Errorf("这是一个错误")
	fmt.Printf("类型是：%T，值是：%v",err,err)
	fmt.Println("-----")
	e := errors.New("原始错误e")
	w := fmt.Errorf("Wrap了一个错误：%w", e)
	fmt.Println(w)
类型是：*errors.errorString，值是：这是一个错误-----
Wrap了一个错误：原始错误e
```

## 5.2 获取输入

Go语言`fmt`包下有`fmt.Scan`、`fmt.Scanf`、`fmt.Scanln`三个函数，可以在程序运行过程中从标准输入获取用户的输入。

### 5.2.1 fmt.Scan

函数定签名如下：

```go
func Scan(a ...interface{}) (n int, err error)
```

- Scan从标准输入扫描文本，读取由空白符分隔的值保存到传递给本函数的参数中，换行符视为空白符。
- 本函数返回成功扫描的数据个数和遇到的任何错误。如果读取的数据个数比提供的参数少，会返回一个错误报告原因。

具体代码示例如下：

```go
	var (
		name string
		age  int
	)
	fmt.Scan(&name, &age)
	fmt.Printf("输入的值为： 姓名:%s 年龄:%d \n", name, age)
```

将上面的代码编译后在终端执行，在终端依次输入`小王子`、`28`和`false`使用空格分隔。

```go
lqz 19
// 或者
lqz
19
```

`fmt.Scan`从标准输入中扫描用户输入的数据，将以空白符分隔的数据分别存入指定的参数。

### 5.2.2 fmt.Scanf

函数签名如下：

```go
func Scanf(format string, a ...interface{}) (n int, err error)
```

- Scanf从标准输入扫描文本，根据format参数指定的格式去读取由空白符分隔的值保存到传递给本函数的参数中。
- 本函数返回成功扫描的数据个数和遇到的任何错误。

代码示例如下：

```go
var (
		name string
		age  int
	)
	fmt.Scanf("name:%s age:%d", &name, &age) // 在控制台按照该格式输入
	fmt.Printf("扫描结果： 姓名:%s 年龄:%d \n", name, age)
```

将上面的代码编译后在终端执行，在终端按照指定的格式依次输入`小王子`、`28`和`false`。

```go
// 控制台按如下格式输入
name:lqz age:19
扫描结果： 姓名:lqz 年龄:19 
```

`fmt.Scanf`不同于`fmt.Scan`简单的以空格作为输入数据的分隔符，`fmt.Scanf`为输入数据指定了具体的输入内容格式，只有按照格式输入数据才会被扫描并存入对应变量。

例如，我们还是按照上个示例中以空格分隔的方式输入，`fmt.Scanf`就不能正确扫描到输入的数据。

```bash
lqz 19
扫描结果： 姓名: 年龄:0 
```

### 5.2.3 fmt.Scanln

函数签名如下：

```go
func Scanln(a ...interface{}) (n int, err error)
```

- Scanln类似Scan，它在遇到换行时才停止扫描。最后一个数据后面必须有换行或者到达结束位置。
- 本函数返回成功扫描的数据个数和遇到的任何错误。

具体代码示例如下：

```go
var (
    name    string
    age     int
)
fmt.Scanln(&name, &age)
fmt.Printf("扫描结果 姓名:%s 年龄:%d \n", name, age)
```

将上面的代码编译后在终端执行，在终端依次输入`小王子`、`28`和`false`使用空格分隔。

```go
//输入：   刘清政 19  敲回车
扫描结果 姓名:刘清政 年龄:19 
```

`fmt.Scanln`遇到回车就结束扫描了，这个比较常用。

### 5.2.4 bufio.NewReader

有时候我们想完整获取输入的内容，而输入的内容可能包含空格，这种情况下可以使用`bufio`包来实现。示例代码如下：

```go
reader := bufio.NewReader(os.Stdin) // 从标准输入生成读对象
fmt.Print("请输入内容：")
text, _ := reader.ReadString('\n') // 读到换行
text = strings.TrimSpace(text) // 去掉空白
fmt.Printf("%#v\n", text)
请输入内容：输入的内容
"输入的内容"
```

### 5.2.5 Fscan系列

这几个函数功能分别类似于`fmt.Scan`、`fmt.Scanf`、`fmt.Scanln`三个函数，只不过它们不是从标准输入中读取数据而是从`io.Reader`中读取数据。

```go
func Fscan(r io.Reader, a ...interface{}) (n int, err error)
func Fscanln(r io.Reader, a ...interface{}) (n int, err error)
func Fscanf(r io.Reader, format string, a ...interface{}) (n int, err error)
```

### 5.2.6 Sscan系列

这几个函数功能分别类似于`fmt.Scan`、`fmt.Scanf`、`fmt.Scanln`三个函数，只不过它们不是从标准输入中读取数据而是从指定字符串中读取数据。

```go
func Sscan(str string, a ...interface{}) (n int, err error)
func Sscanln(str string, a ...interface{}) (n int, err error)
func Sscanf(str string, format string, a ...interface{}) (n int, err error)
var name string="lqz"
var newName string=""
fmt.Sscan(name,&newName) // 相当于把name的值赋值给newName
fmt.Println(name)
fmt.Println(newName)
```

# 6. 断言&接口与类型相互转换



# 7. 错误处理

https://blog.csdn.net/qq_35716689/article/details/135964637



# 8. 数据结构

## 8.1 Map

### 8.1.1 底层原理

https://www.jb51.net/jiaoben/305014xg1.htm#_lab2_0_0

### 8.1.2 Map的基本概念与定义

在Golang中，`map`是一种内置的数据结构，它是一个无序的键值对集合。Map的键可以是任意可以使用`==`比较的类型，如整数、浮点数、字符串等，而值可以是任意类型的。Map的零值是`nil`，表示一个没有任何键值对的map。

### 8.1.3 声明和初始化

声明和初始化map的方式有三种：

（1）声明变量后使用make函数创建map

```go
var m map[string]int  // 声明一个map变量m
m = make(map[string]int)  // 使用make函数创建一个map对象
```

（2）使用字面量方式创建map

```go
m := map[string]int{
    "apple": 1, 
    "banana": 2,
}
```

（3）使用make函数创建map并同时初始化

```go
m := make(map[string]int, 10)  // 初始化容量为10的map
m := make(map[string]int)  		// 省略容量
```

### 8.1.4 访问Map中的元素

访问map中的元素非常简单，你只需要使用键作为索引：

```go
age := m["alice"]
fmt.Println(age) // 输出: 31
```

如果我们尝试访问一个不存在的键，将得到值类型的零值。为了区分零值和不存在的键，我们可以使用两个值的形式来接收返回结果：

```go
age, ok := m["bob"]
if !ok {
    fmt.Println("bob is not in the map")
}
```

### 8.1.5 插入与修改Map中的元素

向map中插入或修改元素也非常直接：

```go
m["alice"] = 32  // 修改已存在的键
m["bob"] = 25    // 插入一个新的键值对
```

### 8.1.6 删除Map中的元素

使用内置的`delete`函数可以从map中删除元素：

```go
delete(m, "charlie")
```

### 8.1.7 遍历Map

遍历map可以使用`for`循环结合`range`：

```go
for key, value := range m {
    fmt.Printf("%s is %d years old\n", key, value)
}
```

遍历的顺序是随机的，每次遍历的顺序可能都不同。

### 8.1.8 Map的并发处理

在多个goroutine中使用map可能会导致并发问题。为了安全地在多个goroutine中使用map，我们可以使用`sync.Map`。`sync.Map`提供了一些如`Load`、`Store`、`LoadOrStore`、`Delete`和`Range`等并发安全的方法。

```go
var sm sync.Map
sm.Store("alice", 32)
age, _ := sm.Load("alice")
fmt.Println(age) // 输出: 32
```

### 8.1.9 Map的性能考量

Map的性能主要取决于两个因素：键的比较速度和哈希函数的效率。在Golang中，map的实现是高效的，但是如果键的比较操作或哈希操作非常耗时，那么map的操作也会变慢。

### 8.1.10 Map的局限性

尽管map非常灵活，但它们也有局限性。例如，map的键必须是可比较的，这意味着你不能使用切片、map或函数作为键。此外，map也不是并发安全的，除非你使用`sync.Map`。

### 8.1.11 例子

```go
// 将非手机数据拆分成道具和代币数据
func getDybDjDatas(month string) (noPhoneTotalMap, noPhoneDjDatas,
	noPhoneDybDatas map[string]*entity.NoPhoneOriginData, err error) {
	var noPhoneDetails []*entity.NoPhoneOriginData

	//取非手机总消耗数据 下面的是覆盖的数据
	noPhoneDetails, err = persistence.GetNoPhoneIntegrationOriginData(month)
	if err != nil {
		log.Error(" GetNoPhoneIntegrationOriginDataGoupBySpoaid failed", zap.Error(err))
		return
	}

	//取非手机总消耗数据 20230901 新增的这几行，有问题到时候直接去掉
	noPhoneDetails, err = persistence.GetNoPhoneIntegrationOriginData2(month)
	if err != nil {
		log.Error(" GetNoPhoneIntegrationOriginData2 failed", zap.Error(err))
		return
	}	
  
	//取非手机代币充值价值
	noPhoneDybDatas, err = persistence.GetDybCharge(month, entity.Android)
	if err != nil {
		log.Error(" GetNoPhoneIntegrationOriginDataGoupBySpoaid failed", zap.Error(err))
		return
	}
	noPhoneTotalMap = make(map[string]*entity.NoPhoneOriginData) //按结算组汇总非手机数据
	noPhoneDjDatas = make(map[string]*entity.NoPhoneOriginData)  //非代币充值

	for _, noPhoneDetail := range noPhoneDetails { //这里按结算组汇总数据
		settlementId := noPhoneDetail.SettlementId

		//构建总的
		noPhoneData, ok := noPhoneTotalMap[settlementId]
		if ok {
			noPhoneData.Jifei = noPhoneData.Jifei + noPhoneDetail.Jifei
			noPhoneData.Zheqian = noPhoneData.Zheqian + noPhoneDetail.Zheqian
			noPhoneData.Jiesuan = noPhoneData.Jiesuan + noPhoneDetail.Jiesuan
		} else {
			noPhoneData = &entity.NoPhoneOriginData{
				SettlementId:   noPhoneDetail.SettlementId,
				SettlementName: noPhoneDetail.SettlementName,
				Zheqian:        noPhoneDetail.Zheqian,
				Jifei:          noPhoneDetail.Jifei,
				Jiesuan:        noPhoneDetail.Jiesuan,
			}
			noPhoneTotalMap[settlementId] = noPhoneData
		}
	}
```



# 9.结构体

## 9.1 三种主要实例化方法

### 1. VAR 声明

```go
// 类名首字母大写,其他包也能访问
type Person struct{
	Age   int   //类的属性首字母大写,表示该属性是对外能够访问的，否则只能内部访问
	name  string
}

func main()  {
	var  fan Person
	fan.age = 10
	fan.name = "fan"
}

```

------

### 2.NEW关键字

方式1：

```go
func main()  {
	fan := new(person)
	fan.name = "fan"
	fan.age = 26
}
```

方式2：

```go
func main()  {
	fan := &person{
		26,"fan"
	}
	fmt.Println(fan.age)
}
```

### 3. 赋值初始化

方式1：

```go
func main()  {
	fan := person{
		name: "fan",
		age:  10,
	}
}

```

方式2：

```go
func main()  {
	fan := person{
		"fan",
		 10,
	}
}
```

方式1和方式2区别：**赋值顺序**；方式2必须对应结构体定义顺序；

## 9.2 内存布局区别

### 1.VAR 声明

![是发哦文件](https://www.freesion.com/images/632/9a8f547e537f90e05f90251ab5a1a878.png)
var p point 为p分配内存，并零值化；

### 2.NEW关键字

![在这里插入图片描述](https://www.freesion.com/images/117/c75042ad357591ce02239932c2ca02cd.png)
new返回一个指向Point的指针；

### 3. 赋值初始化

![在这里插入图片描述](https://www.freesion.com/images/987/39bcfe636380feacdcf1ac220f87e1db.png)

