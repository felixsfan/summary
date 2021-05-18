1.Django的基本使用和搭建参考博客和菜鸟教程，这里只记录项目遇到的问题及解决方法

# 1. MVC模式与MVT模式

## 1.1 MVC模式

- MVC是一种程序设计模式，核心思想是**分工、解耦**，让不同的代码块之间降低耦合，增强代码的可扩展性和可移植性，实现向后兼容。

- MVC模式说明

  1. M全拼为Model，主要封装对数据库层的访问，对数据库中的数据进行增、删、改、查操作。

  2. V全拼为View，用于封装结果，生成页面展示的html内容。

  3. C全拼为Controller，用于接收请求，处理业务逻辑，与Model和View交互，返回结果。

     <img src="C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\MVC.png" style="zoom:50%;" />

## 1.2 MVT模式

- MVT模式中的’M’，与MVC中的M功能相同，负责和数据库交互，进行数据处理。
- MVT模式中的’V’，与MVC中的C功能相同，接收请求，进行业务处理，返回应答。
- MVT模式中的’T’，与MVC中的V功能相同，负责封装构造要返回的html。
- MVT与MVC模式具体差异不是很大，它们的思路是一样的

<img src="C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\MVT.png" style="zoom:50%;" />

# 2. 模板

**和Java中的JSP一个道理**

我们使用 django.http.HttpResponse() 来输出 "Hello World！"。该方式将**数据与视图**混合在一起，不符合 Django 的 MVC 思想，**模板是一个文本，用于分离文档的表现形式和内容**

## 2.1 应用实例

在 HelloWorld 目录底下创建 templates 目录并建立 runoob.html文件，整个目录结构如下：

```python
HelloWorld/
|-- HelloWorld
|   |-- __init__.py
|   |-- settings.py
|   |-- urls.py
|   |-- views.py
|   |-- wsgi.py
|-- manage.py
`-- templates
    `-- runoob.html
```

runoob.html 文件代码如下：

```html
<h1>{{ hello }}</h1>
```

接下来我们需要向Django说明模板文件的路径，修改HelloWorld/settings.py，修改 TEMPLATES 中的 DIRS 为 **[os.path.join(BASE_DIR, 'templates')]**，如下所示:

HelloWorld/HelloWorld/settings.py 文件代码：

```python
...
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],       # 修改位置
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
...
```

我们现在修改 views.py，增加一个新的对象，用于向模板提交数据：

```python
from django.shortcuts import render
 
def runoob(request):
    context          = {}
    context['hello'] = 'Hello World!'
    return render(request, 'runoob.html', context)
```

HelloWorld/HelloWorld/urls.py 文件代码：

```python
from django.urls import path
 
from . import views
 
urlpatterns = [
    path('runoob/', views.runoob),
]
```

这里使用 render 来替代之前使用的 HttpResponse。render 还使用了一个字典 context 作为参数。

context 字典中元素的键值 **hello** 对应了模板中的变量 **{{ hello }}**。

## 2.2 Django 模板标签

### 变量

模板语法：

```python
view：｛"HTML变量名" : "views变量名"｝
HTML：｛｛变量名｝｝
```

### 列表

templates 中的 runoob.html中，可以用 **.** 索引下标取出对应的元素。

HelloWorld/HelloWorld/views.py 文件代码：

```python
from django.shortcuts import render

def runoob(request):
    views_list = ["菜鸟教程1","菜鸟教程2","菜鸟教程3"]
    return render(request, "runoob.html", {"views_list": views_list})
```

HelloWorld/templates/runoob.html 文件代码：

```python
<p>{{ views_list }}</p>   # 取出整个列表
<p>{{ views_list.0 }}</p> # 取出列表的第一个元素
```

### 字典

templates 中的 runoob.html中，可以用 **.键** 取出对应的值

HelloWorld/HelloWorld/views.py 文件代码：

```python
from django.shortcuts import render

def runoob(request):
    views_dict = {"name":"菜鸟教程"}
    return render(request, "runoob.html", {"views_dict": views_dict})
```

HelloWorld/templates/runoob.html 文件代码：

```python 
<p>{{ views_dict }}</p>
<p>{{ views_dict.name }}</p>
```

### 过滤器

模板过滤器可以在变量被显示前修改它，过滤器使用管道字符

模板语法：

```python
{{ 变量名 | 过滤器：可选参数 }}
```

### if/else 标签

基本语法格式如下：

```python
{% if condition %}
     ... display
{% endif %}
########或者##########
{% if condition1 %}
   ... display 1
{% elif condition2 %}
   ... display 2
{% else %}
   ... display 3
{% endif %}
```

### for 标签

{% for %} 允许我们在一个序列上迭代。

与 Python 的 for 语句的情形类似，循环语法是 for X in Y ，Y 是要迭代的序列而 X 是在每一个特定的循环中使用的变量名称。

每一次循环中，模板系统会渲染在 **{% for %}** 和 **{% endfor %}** 之间的所有内容。

```python
<ul>
{% for athlete in athlete_list %}
    <li>{{ athlete.name }}</li>
{% endfor %}
</ul>
```

**遍历字典**: 可以直接用字典 **.items** 方法，用变量的解包分别获取键和值。

```python 
from django.shortcuts import render

def runoob(request):
    views_dict = {"name":"菜鸟教程","age":18}
    return render(request, "runoob.html", {"views_dict": views_dict})
    
```

```python 
{% for i,j in views_dict.items %}
{{ i }}---{{ j }}
{% endfor %}
```

### include 标签

{% include %} 标签允许在模板中包含其它的模板的内容。

### csrf_token

csrf_token 用于form表单中，作用是跨站请求伪造保护。

如果不用｛% csrf_token %｝标签，在用 form 表单时，要再次跳转页面会报403权限错误。

用了｛% csrf_token %｝标签，在 form 表单提交数据时，才会成功。

**解析：**

首先，向服务器发送请求，获取登录页面，此时中间件 csrf 会自动生成一个隐藏input标签，该标签里的 value 属性的值是一个随机的字符串，用户获取到登录页面的同时也获取到了这个隐藏的input标签。

然后，等用户需要用到form表单提交数据的时候，会携带这个 input 标签一起提交给中间件 csrf，原因是 form 表单提交数据时，会包括所有的 input 标签，中间件 csrf 接收到数据时，会判断，这个随机字符串是不是第一次它发给用户的那个，如果是，则数据提交成功，如果不是，则返回403权限错误。

## 2.3 关于访问静态文件总结

### 2.3.1 静态文件的配置

首先要在settings文件中进行设置，关于静态文件的设置选项主要由以下几项：

 1.

```python 
 STATIC_URL = '/static/' # 别名 
```

指定静态文件查找的url。这样设置后一般来说我们只要把静态文件放在 APP 中的 static 目录下就可以，但是有时我们有一些共用的静态文件。

2.

这时候可以设置 STATICFILES_DIRS 另外弄一个文件夹

```python
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
```

​     Django首先会在STATICFILES_DIRS配置的文件夹中寻找静态文件，然后再从每个app的static子目录下查找，并且返回找到的第一个文件。

​      所以我们可以将全局的静态文件放在STATICFILES_DIRS配置的目录中，将app独有的静态文件放在app的static子目录中。

​      存放的时候按类别存放在static目录的子目录下，如图片都放在images文件夹中，所有的CSS都放在css文件夹中，所有的js文件都放在js文件夹中。

### 2.3.2 在模版中使用这些静态文件

#### 方式一

那如何在模版中使用这些静态文件呢？可以参考如下代码，其中语句{% load static from staticfiles %}在这个模版文件中只需要出现一次。

```html
{% load static from staticfiles %}
<link href="{% static" rel="external nofollow" css/sample.css" %}" rel="stylesheet">
```

用下边的方法也可

```html
{% load static from staticfiles %}
{% static "css/sample.css" assample %}
<link href="{{ sample }}" rel="external nofollow" rel="stylesheet">
```

Django在运行时会自动将这些文件映射到STATIC_URL所给定的值下。也就是如，如果STATIC_URL = '/static/'，那么在运行时，上边模版中的样例中的url会被替换为/static/css/sample.css。

#### 方式二

将静态文件路径硬编码在模版中也可以正常运行，如使用

```html 
<link href="/static/css/sample.css">
```

前提是配置好了STATIC_URL和STATIC_DIRS。但并不推荐这么做，因为如果后来静态资源的位置发生了迁移，如使用独立服务器或者使用CDN，就要修改一大堆URL。而使用推荐的方法可以避免这个庞大的工作量，最多只需要修改STATIC_URL即可。

如果css文件中也使用了静态文件如css背景，则按照相对路径使用即可，因为浏览器解析css是会自动按照相对路径寻找到正确的URL。

> **相对路径**：相对路径是相对于调用页面的文件的路径而不是页面文件本身的路径

# 3. 视图

**一个视图函数，简称视图，是一个简单的 Python 函数，它接受 Web 请求并且返回 Web 响应。**

响应可以是一个 HTML 页面、一个 404 错误页面、重定向页面、XML 文档、或者一张图片...

无论视图本身包含什么逻辑，都要返回响应。代码写在哪里都可以，只要在 Python 目录下面，一般放在项目的 views.py 文件中。

每个视图函数都负责返回一个 HttpResponse 对象，对象中包含生成的响应。

视图层中有两个重要的对象：请求对象(request)与响应对象(HttpResponse)。

## 3.1 请求对象: HttpRequest 对象

### 1、GET

数据类型是 QueryDict，一个类似于字典的对象，包含 HTTP GET 的所有参数。

有相同的键，就把所有的值放到对应的列表里。

取值格式：**对象.方法**。

**get()**：返回字符串，如果该键对应有多个值，取出该键的最后一个值。

```python
#请求：http://127.0.0.1:8000/ocr_app/?name=hello
def runoob(request):
    name = request.GET.get("name")
    return HttpResponse('姓名：{}'.format(name))
```

### 2、POST

数据类型是 QueryDict，一个类似于字典的对象，包含 HTTP POST 的所有参数。

常用于 form 表单，form 表单里的标签 name 属性对应参数的键，value 属性对应参数的值。

取值格式： **对象.方法**。

**get()**：返回字符串，如果该键对应有多个值，取出该键的最后一个值。

```python 
def runoob(request):
    name = request.POST.get("name")
    return HttpResponse('姓名：{}'.format(name))
```

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\Django_post.png)

### 3、body

数据类型是二进制字节流，是原生请求体里的参数内容，在 HTTP 中用于 POST，因为 GET 没有请求体。

在 HTTP 中不常用，而在处理非 HTTP 形式的报文时非常有用，例如：二进制图片、XML、Json 等。

```python
def runoob(request):
    name = request.body
    print(name)
    return HttpResponse("菜鸟教程")
```

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\Django_body.png)

### 4、path

获取 URL 中的路径部分，数据类型是字符串。

```python
#请求：http://127.0.0.1:8000/ocr_app/?name=hello
def runoob(request):
    name = request.path
    print(name)
    return HttpResponse("菜鸟教程")
#结果:/ocr_app/
```

## 3.2 响应对象：HttpResponse 对象

响应对象主要有三种形式：HttpResponse()、JsonResponse对象、render()、redirect()。

**HttpResponse():** 返回文本，参数为字符串，字符串中写文本内容。如果参数为字符串里含有 html 标签，也可以渲染。

```python 
def runoob(request):
    # return HttpResponse("菜鸟教程")
    return HttpResponse("<a href='https://www.runoob.com/'>菜鸟教程</a>")
```

**JsonResponse（）：**是HttpResponse的子类。当我在前端中发起ajax post请求时，需要返回json格式的数据。

JsonResponse有两个功能：

> (1)将数据转换为json字符串，再返回给客户端
>
> (2)自动设置响应头Content-Type为application/json

```python
def hello(request):
    data = {
            'name': '张三',
            'age': 100,
        }
    return JsonResponse(data)
```

**render():** 返回文本，第一个参数为 request，第二个参数为字符串（页面名称），第三个参数为字典（可选参数，向页面传递的参数：键为页面参数名，值为views参数名）。

```python
def runoob(request):
    name ="菜鸟教程"
    return render(request,"runoob.html",{"name":name})
```

**redirect()**：重定向，跳转新页面。参数为字符串，字符串中填写页面路径。一般用于 form 表单提交后，跳转到新页面。

```python
def runoob(request):
    return redirect("/index/")
```

render 和 redirect 是在 HttpResponse 的基础上进行了封装：

- render：底层返回的也是 HttpResponse 对象
- redirect：底层继承的是 HttpResponse 对象

## 3.3 FBV 与 CBV

**FBV（function base views）** 基于函数的视图，就是在视图里使用函数处理请求。

**CBV（class base views）** 基于类的视图，就是在视图里使用类处理请求。

### FBV

基于函数的视图其实我们前面章节一直在使用，就是使用了函数来处理用户的请求，查看以下实例：

路由配置：

urls.py 文件

```python
urlpatterns = [
    path("login/", views.login),
]
```

views.py 文件

```python
from django.shortcuts import render,HttpResponse

def login(request):
    if request.method == "GET":
        return HttpResponse("GET 方法")
    if request.method == "POST":
        user = request.POST.get("user")
        pwd = request.POST.get("pwd")
        if user == "runoob" and pwd == "123456":
            return HttpResponse("POST 方法")
        else:
            return HttpResponse("POST 方法1")
```

如果我们在浏览器中直接访问 http://127.0.0.1:8000/login/ ，输出结果为：

```
GET 方法
```

### CBV

基于类的视图，就是使用了类来处理用户的请求，不同的请求我们可以在类中使用不同方法来处理，这样大大的提高了代码的可读性。

定义的类要继承父类 View，所以需要先引入库：

```python
from django.views import View
```

执行对应请求的方法前会优先执行 dispatch 方法(在get/post/put...方法前执行)，dispatch() 方法会根据请求的不同调用相应的方法来处理。

其实，在我们前面学到的知识都知道 Django 的 url 是将一个请求分配给可调用的函数的，而不是一个类，那是如何实现基于类的视图的呢？ 主要还是通过父类 View 提供的一个静态方法 as_view() ，as_view 方法是基于类的外部接口， 他返回一个视图函数，调用后请求会传递给 dispatch 方法，dispatch 方法再根据不同请求来处理不同的方法。

```python
View 大致执行流程：
self.as_view()   =====>  self.dispatch()    ====>            self.get/post/等
#  路由分发开始         获取具体的请求方法名，在通过反射具体的请求函数        视图函数
```

路由配置：

urls.py 文件

```python
urlpatterns = [
    path("login/", views.Login.as_view()),
]
```

views.py 文件

```python
from django.shortcuts import render,HttpResponse
from django.views import View

class Login(View):
    def get(self,request):
        return HttpResponse("GET 方法")

    def post(self,request):
        user = request.POST.get("user")
        pwd = request.POST.get("pwd")
        if user == "runoob" and pwd == "123456":
            return HttpResponse("POST 方法")
        else:
            return HttpResponse("POST 方法 1")
```

如果我们在浏览器中直接访问 http://127.0.0.1:8000/login/ ，输出结果为：

```
GET 方法
```



# 4. 运行原理

## 4.1 工作目录

```
djangoDemo/
├── djangoDemo
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py
```

**目录说明：**

1、djangoDemo/djangoDemo: 项目最初的Python包

2、djangoDemo/**init**.py: 一个空文件，声明所在目录的包为一个Python包

3、djangoDemo/settings.py: 管理项目的配置信息

4、djangoDemo/urls.py: 声明请求url的映射关系

5、djangoDemo/wsgi.py: python程序和web服务器的通信协议

6、manage.py： 一个命令行工具，用来和Django项目进行交互，如前面创建项目就用到了该文件。

**项目配置文件--setting.py**

setting.py 文件用来配置整个项目，里面的字段非常多，所以在开始之前有必要先都了解一下默认的配置有哪些

```python
import os

# 项目的相对路径，启动服务的时候会运行这个文件所在路径的manage.py
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 安全密钥
SECRET_KEY = 'l&!v_npes(!j82+x(44vt+h&#ag7io2x&shnf*9^8fv0d63!0r'

# 是否开启Debug
DEBUG = True

# 允许访问的主机ip，可以用通配符*
ALLOWED_HOSTS = []

# Application definition

# 用来注册App 前6个是django自带的应用
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# 中间件 ,需要加载的中间件。比如在请求前和响应后根据规则去执行某些代码的方法
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# 指定URL列表文件 父级URL配置
ROOT_URLCONF = 'djangoDemo.urls'

# 加载网页模板路径
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI的配置文件路径
WSGI_APPLICATION = 'djangoDemo.wsgi.application'

# 数据库配置 默认的数据库为sqlite
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# 相关密码验证
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# 语言设置 默认英语， 中文是zh-hans
LANGUAGE_CODE = 'en-us'

# 时区设置，中国的是：Asia/Shanghai
TIME_ZONE = 'UTC'

# i18n字符集是否支持
USE_I18N = True

USE_L10N = True

# 是否使用timezone
# 保证存储到数据库中的是 UTC 时间；
# 在函数之间传递时间参数时，确保时间已经转换成 UTC 时间；
USE_TZ = True

# 静态文件路径
STATIC_URL = '/static/'
```

## 4.2 App

接下来要引入一个APP的概念，举个例子我们需要开发一个电商网站，那么产品列表、购物车、下单等等这都是不同的业务线，我们可以把每条业务线都看做一个App。

创建一个名为app_demo的应用, 在终端项目目录下执行

```python
 python3 manage.py startapp app_demo
```

再次查看目录结构

```python
├── app_demo
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── djangoDemo
│   ├── __init__.py
│   ├── __pycache__
│   │   ├── __init__.cpython-36.pyc
│   │   └── settings.cpython-36.pyc
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py
```

**app_demo目录结构**

admin:对应应用后台管理配置文件

apps:对应应用的配置文件

models:数据模块，用于设计数据库等

tests:编写测试脚本

views：视图层，直接和浏览器进行交互

每次新建一个App我们需要将其在settings.py文件中的INSTALLED_APPS里进行注册，这样程序才能够找到这个服务

```python 
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app_demo', # 注册新创建的应用app
]
```

## 4.3 文件加载过程

1.通过djangoDemo/manage.py文件启动项目，调用djangoDemo/wsgi.py文件

2.容器的djangoDemo/wsgi.py文件会调用djangoDemo/settings.py文件，djangoDemo/settings.py文件里面写了允许哪些主机可以访问、安装指定的APP、安装指定的中间件、指定的模板目录、指定的数据库引擎、指定国际化、指定静态资源、加载路由规则等

3.接着会调用djangoDemo/urls.py文件，这个文件会使用path来映射app_demo项目目录下的urls.py文件

djangoDemo/urls.py

```python
from django.contrib import admin
from django.urls import path,include
from ocr_app import views
from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ocr_app/', include('app_demo.urls'))
]
```

djangoDemo/app_demo/urls.py

```python
from ocr_app import views
from django.conf.urls import url

urlpatterns = [
    url(r'^hello/', views.hello),
]
```

4.djangoDemo/app_demo/urls.py文件会根据配置调用的djangoDemo/app_demo/views.py文件里面的函数

views.py

```python
def hello(request):  # request参数必须有，名字类似self的默认规则，它封装了用户请求的所有内容
    return render(request,'index.html')  # 不能直接字符串，必须是由这个类封装，此为Django规则
```

5.接着hello(request)函数里面会调用到index.html，会使用render渲染器来对网页文件进行操作

6.去djangoDemo/settings.py配置中搜索模板路径

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

## 4.4 template的查找过程

django中查找Templates，会根据setting.py的配置**自动搜索项目和各app**下的templates文件夹下的模板，并按照 INSTALLED_APPS中添加的顺序查找Templates，因此不同的APP下Templates目录中的同名.html文件会造成冲突所以在template下新建html文件的时候，需要再建立一层目录，目录的名称是该app的名称，防止冲突的发生。

# 5. 序列化

- **web请求不需要自己把数据序列化，框架已经自动完成了**

  Django等web框架对于返回的数据和模板一起被模板引擎解析（模板引擎肯定序列化了数据和模板文件）返回前端浏览器，比如SpringMVC的@ResponseBody和springboot在使用@RestController 的时候已经确定使用json 格式传输，自动把实体类序列化成json（jackson包进行的处理），SSM框架需要我们自己导入json的jar包。

- **API接口返回的数据需要自己序列化**。

- 实体类对象序列化需要实现序列化接口或继承序列化类，并且需要序列化成json字符串传输

## **5.1 序列化的定义**

**序列化：**把**对象**转化为可传输或可存储的字节序列过程称为序列化。

**反序列化：**把字节序列**还原为对象**的过程称为反序列化。

## **5.2 为什么要序列化？**

其实序列化最终的目的是为了对象可以**跨平台存储，和进行网络传输**。而我们进行跨平台存储和网络传输的方式就是IO，而我们的IO支持的数据格式就是字节数组。

因为我们单方面的只把对象转成字节数组还不行，因为没有规则的字节数组我们是没办法把对象的本来面目还原回来的，所以我们必须在把对象转成字节数组的时候就制定一种规则**（序列化）**，那么我们从IO流里面读出数据的时候再以这种规则把对象还原回来**（反序列化）。**

如果我们要把一栋房子从一个地方运输到另一个地方去，**序列化**就是我把房子拆成一个个的砖块放到车子里，然后留下一张房子原来结构的图纸，**反序列化**就是我们把房子运输到了目的地以后，根据图纸把一块块砖头还原成房子原来面目的过程

## **5.3 什么情况下需要序列化**

通过上面我想你已经知道了凡是需要进行“跨平台存储”和”网络传输”的数据，都需要进行序列化。

本质上存储和网络传输 都需要经过 把一个对象状态保存成一种跨平台识别的字节格式，然后其他的平台才可以通过字节信息解析还原对象信息。

## **5.4 序列化的方式**

序列化只是一种拆装组装对象的规则，那么这种规则肯定也可能有多种多样，比如现在常见的序列化方式有：

JDK（不支持跨语言）、JSON、XML、Hessian、Kryo（不支持跨语言）、Thrift、Protostuff、FST（不支持跨语言）

## 5.5 序列化技术选型的几个关键点

序列化协议各有千秋，不能简单的说一种序列化协议是最好的，只能从你的当时环境下去选择最适合你们的序列化协议，如果你要为你的公司项目进行序列化技术的选型，那么主要从以下几个因素。

**协议是否支持跨平台**

如果你们公司有好多种语言进行混合开发，那么就肯定不适合用有语言局限性的序列化协议，要不然你JDK序列化出来的格式，其他语言并没法支持。

**序列化的速度**

如果序列化的频率非常高，那么选择序列化速度快的协议会为你的系统性能提升不少。

**序列化出来的大小**

如果频繁的在网络中传输的数据那就需要数据越小越好，小的数据传输快，也不占带宽，也能整体提升系统的性能。

## 5.6 实践

1.===========================API接口返回json=============================================

服务端：

```python
def runoob(request):
    data = {
        'name': '张三',
        'age': 100,
    }
    return HttpResponse(json.dumps(data))
```

客户端：

```python
def http_post():
    url = "http://127.0.0.1:8000/ocr_app/runoob/"

    r = requests.get(url)
    print (r.text)
    print (type(r.text))
    print (json.loads(r.text))
    print (type(json.loads(r.text)))

http_post()
```

结果：

```python
{"name": "\u5f20\u4e09", "age": 100}
<class 'str'>
{'name': '张三', 'age': 100}
<class 'dict'>
```

2.===========================API接口不能返回user对象=====================================

服务端1：

```python
class User():
    """创建用户个人信息"""
    def __init__(self, name, age):

        self.name = name
        self.age = age


def runoob(request):
    u = User("张三",18)
    return JsonResponse(serializers.serialize('json', u), safe=False)

```

结果：

```python
TypeError: 'User' object is not iterable
```

服务端2：

```python
class User():
    """创建用户个人信息"""
    def __init__(self, name, age):

        self.name = name
        self.age = age


def runoob(request):
    u = User("张三",18)
    return HttpResponse(u)
```

客户端:

```python
def http_post():
    url = "http://127.0.0.1:8000/ocr_app/runoob/"

    r = requests.get(url)
    print (r.text)
    print (type(r.text))
```

结果：

```python
<ocr_app.views.User object at 0x05384970>
<class 'str'>
```

3.==============================返回user对象到前端========================================

服务端：

```python
class User():
    """创建用户个人信息"""

    def __init__(self, name, age):
        self.name = name
        self.age = age


def hello(request):
    views_dict = {"name": "菜鸟教程"}
    u = User("张三", 18)
    return render(request, 'runoob.html', {"views_dict": u}) 
```

模板：

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<p>{{ views_dict }}</p>
<p>{{ views_dict.name }}</p>
<p>{{ views_dict.age }}</p>
</body>
</html>
```

结果：

```html
<ocr_app.views.User object at 0x042BDD90>

张三

18
```

## 5.7 json对象、json字符串

JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式

**json对象**在编程语言中就是能被json序列化的对象，在js中`JSON`对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：`JSON.stringify()`和`JSON.parse()`。

**json字符串**是一个用单引号或者双引号引起来的字符串，因为**字符串的格式符合json的格式，所以叫做json字符串**

# 6. API接口开发

## 6.1 API接口与web开发区别

**返回值的区别**：

- API接口需要返回序列化后的数据（大部分为字典、字符串、数组、可序列化实体类对象等序列化后的json字符串数据）
- web开发需要把返回的数据（字典、数组、字符串、实体类对象）和模板通过模板编译器序列化和处理后返回给客户端浏览器。

**序列化上的区别**：

- **web请求不需要自己把数据序列化，框架已经自动完成了**

  Django等web框架对于返回的数据和模板一起被模板引擎解析（模板引擎肯定序列化了数据和模板文件）返回前端浏览器，比如SpringMVC的@ResponseBody和springboot在使用@RestController 的时候已经确定使用json 格式传输，自动把实体类序列化成json（jackson包进行的处理），SSM框架需要我们自己导入json的jar包。

- **API接口返回的数据需要自己序列化**。

- 实体类对象序列化需要实现序列化接口或继承序列化类，并且需要序列化成json字符串传输

## 6.2 restful风格的接口开发

https://segmentfault.com/a/1190000015702416

## 6.2 swagger

# 7.名词解释

通常服务器程序分为web服务器和应用程序服务器。web服务器是用于处理HTML文件，让客户可以通过浏览器进行访问，主流的web服务器有Apache、IIS、Nginx、lighthttpd等。应用服务器处理业务逻辑，比如使用Python的Django、flask写的程序。通常来自客户端浏览器的请求被web服务器截获，如果是静态请求，则如Nginx会自己做处理，如果是动态请求，则会抛给后端应用服务器来处理。于是如何在web服务器与应用服务器之间进行通信成了主要问题，这就引出了以下三种处理的接口：CGI、FastCGI、WSGI。

## 7.1 Web服务器和应用服务器

**Web服务器(Web [Server](http://detail.zol.com.cn/server/))**

　　Web服务器可以解析(handles)HTTP协议。当Web服务器接收到一个HTTP请求(request)，会返回一个HTTP响应(response)，例如送回一个HTML页面。为了处理一个请求(request)，Web服务器可以响应(response)一个静态页面或图片，进行页面跳转(redirect)，或者把动态响应(dynamic response)的产生委托(delegate)给一些其它的程序例如CGI脚本，JSP(JavaServer Pages)脚本，servlets，ASP(Active Server Pages)脚本，服务器端(server-side)JavaScript，或者一些其它的服务器端(server-side)技术。**web服务器：IIS、 Apache、Ngnix**

**应用程序服务器(The Application Server)**

　　根据我们的定义，作为应用程序服务器，它通过各种协议，可以包括HTTP，把商业逻辑暴露给(expose)客户端应用程序。Web服务器主要是处理向浏览器发送HTML以供浏览，而应用程序服务器提供访问商业逻辑的途径以供客户端应用程序使用。应用程序使用此商业逻辑就象你调用对象的一个方法(或过程语言中的一个函数)一样。**应用服务器：Weblogic、Tomcat、Jboss** 

重点：现在大多数应用程序服务器也包含了Web服务器，这就意味着可以把Web服务器当作是应用程序服务器的一个子集(subset)。

## 7.2 CGI、WSGI、uWSGI

### 简介

**CGI：**通用网关接口(Comman Gateway Interface)描述了客户端和服务器程序之间传输数据的一种标准，可以让一个客户端，从网页浏览器向执行在网络服务器上的应用程序请求数据。**它是一段程序，运行在Web Server上。**CGI独立于任何语言，CGI程序可以是任何脚本语言或完全独立编程语言实现，只要这个语言可以在这个系统上运行。Unix shell、Python、Ruby、PHP、Perl、C/C++和VB都可以用来编写CGI程序。最初CGI是在1993年由美国国家超级电脑应用中心为NCSA HTTPd web服务器开发的。这个web服务器使用了Unix shell环境变量来保存从web服务器传递出去的参数，然后生成一个运行CGI的独立的进程。CGI的处理流程如下图所示：

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\CGI.png)

- web服务器收到客户端(浏览器)的请求http request，启动CGI程序，并通过环境变量、标准输入传递数据；
- CGI进程启动解析器、加载配置(如业务相关配置)、连接其它服务器(如数据库服务器)、逻辑处理等；
- CGI进程将处理结果通过标准输出、标准错误，传递给web服务器；
- web服务器收到CGI返回的结果，构建http response返回给客户端，并杀死CGI进程，web服务器与CGI通过环境变量、标准输入、标准输出、标准错误传递数据；

**WSGI：**web服务器网关接口(Python Web Server Gateway Interface)是为Python语言定制的**web服务器和web应用程序或框架之间的一种简单通用的接口**。自从WSGI被开发出来之后，许多其他语言中也出现了类似接口。WSGI是作为web服务器与web应用程序或应用框架之间的一种低级别的接口，以提升可移植web应用开发的共同点。WSGI是基于现存的CGI标准而设计的。
WSGI分为两个部分：一为"服务器"或"网关"，另一为"应用程序"或"应用框架"。在处理一个WSGI请求时，服务器会为应用程序提供环境资讯及一个回调函数(callback function)。当应用程序完成处理请求后，透过前述的回调函数，将结果回传给服务器。所谓的WSGI中间件同时实现了API的两方，因此可以在WSGI服务和WSGI应用之间起调解作用：从WSGI服务器的角度来说，中间件扮演应用程序，而从应用程序角度来说，中间件扮演服务器。"中间件"组件可以执行以下功能：

- 重写环境变量，根据目标URL，将请求消息路由到不同的应用对象；
- 允许在一个进程中同时运行多个应用程序或应用框架；
- 负载均衡和远程处理，通过在网络上转发请求和响应消息；
- 进行内容后处理，例如应用XSLT样式表；

**uwsgi：**uwsgi是一个web服务器，它实现了wsgi协议、uwsgi协议、http等协议

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\uWSGI.png)

### 区别联系

![](C:\Users\felixsfan\Desktop\办公机备份\学习\python学习\images\CGI和WSGI的联系.png)



## 7.3 Servlet与CGI的区别

概括来讲，Servlet可以完成和CGI相同的功能。用Java语言来写CGI，就是servlet技术。

与传统的CGI和许多其他类似CGI的技术相比，Java Servlet具有更高的效率，更容易使用，功能更强大，具有更好的可移植性，更节省投资。**在未来的技术发展过程中，Servlet有可能彻底取代CGI**。

　　在传统的[CGI](http://baike.baidu.com/view/32614.htm)中，每个请求都要启动一个新的进程，如果CGI程序本身的执行时间较短，启动进程所需要的开销很可能反而超过实际执行时间。而在Servlet中，每个请求由一个轻量级的Java线程处理(而不是重量级的操作系统进程)。

　　在传统CGI中，如果有N个并发的对同一CGI程序的请求，则该CGI程序的代码在内存中重复装载了N次；而对于Servlet，处理请求的是N个线程，只需要一份Servlet类代码。在性能优化方面，Servlet也比CGI有着更多的选择。

# 8.各语言web框架区别

tomcat负责检测和建立tcp连接，接收请求转发到应用程序，springboot和django内部嵌套了小型web服务器来处理连接和转发请求，只需要后台noup运行程序就行，django生存环境需要uwsgi web服务器+ngnix来处理连接，转发请求，springboot也可以配置单独的tomcat。golang的net包提供了可移植的网络I/O接口，包括TCP/IP、UDP、域名解析、http和Unix域socket等接口，但没有像tomcat和web框架对请求进行那么强大的封装，相对来说灵活，但是需要自己实现。