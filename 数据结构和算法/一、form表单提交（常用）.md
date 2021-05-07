# 一、前端发送请求的方式

## 1.1 form表单提交（常用）

from表单把所有属于表单中的内容提交给后台，例如输入框，单选框，多选框，文本域，文件域等。

```html
<form action="demo.do" method="post">
        用户名：<br>
        <input type="text" name="username"><br>
        密码:<br>
        <input type="password" name="password" ><br><br>
        <input type="submit" value="提交">
</form>
```

## 1.2 JQuery中的ajax提交（常用）

JavaScript中也有ajax提交，但是代码太多，所以JQuery对JS中的ajax进行了简化。引入JQuery相应的包即可使用。一般格式为：

```js
 $.ajax({
            url: "TestJsonServlet", //提价的路径
            type: "post",       //提交方式
            data: {
                //向后台提交的数据
            },
            dataType: "JSON",       //规定请求成功后返回的数据
            success: function (data) {
                //请求成功之后进入该方法，data为成功后返回的数据
            },
            error: function (errorMsg) {
                //请求失败之后进入该方法，errorMsg为失败后返回的错误信息
            }
        });
```

总结：以上两种方式如果不显示的指定post提交方式，则默认的提交方式为get方式提交。此外，ajax中的url也可以直接通过字符串拼接，然后向后台提交数据，这种方式为get方式提交。下面详细说明

## 1.3 通过url字符串拼接向后台提交数据

### 1.3.1 直接在ajax中url拼接数据

```js
$.ajax({
            url: "TestJsonServlet?id="+id+"&gender="+"男", //提价的路径
            type: "get",       //提交方式
            dataType: "JSON",       //规定请求成功后返回的数据
            success: function (data) {
                //请求成功之后进入该方法，data为成功后返回的数据
            },
            error: function (errorMsg) {
                //请求失败之后进入该方法，errorMsg为失败后返回的错误信息
            }
        });
```

### 1.3.2 window.location.href

```js
var deleteUser = function (deleteId) {
        if (confirm("确认删除编号是【"+deleteId+"】的成员吗?")){
            window.location.href="DeleteUserServlet?deleteId="+deleteId;
        }
    }
```

### 1.3.3 href/src

1、 link标签的href属性

2、 script标签的src属性

3、 img标签的src属性

4、a标签的href属性

```html
<a href="DeleteUserServlet?id='3'&gender='男'"></a>
```

## 1.4 restful风格的接口

# 二、请求报文分类

- url查询参数

  ```
  GET http://localhost:10020/query?name=%E4%B8%BD%E4%B8%BD&age=123 HTTP/1.1
  ```

- 作为请求头

- 请求体：multipart/form-data

  可以上传文件那种表单提交

  ```js
  GET http://localhost:10020/query HTTP/1.1
  content-type: multipart/form-data; boundary=-------------------------
  Content-Disposition: form-data; name="name"
  李四
  Content-Disposition: form-data; name="age"
  1213
  ```

- 请求体：application/x-www-form-urlencoded

  普通的post提交，表单提交，最典型的一种

  ```js
  GET http://localhost:10020/query HTTP/1.1
  Content-Type: application/x-www-form-urlencoded
  name=%E6%9D%8E%E5%9B%9B&age=123
  ```

- 请求体：application/json

  以json格式提交参数，这种比较适合接口调用

  ```js
  GET http://localhost:10020/query HTTP/1.1
  Content-Type: application/json
  {"name":"李四","age":"123"}
  ```

# 三、SpringMVC后台接收参数的几种方式

## 3.1 接受url路径上的参数

### 3.1.1 直接在Controller 方法参数上配置参数名

后台代码：

```java
/**
 * springMVC的自动匹配参数（GET请求方式）
 *
 * 形参paramName会自动匹配请求中key为paramName的参数值。
 *
 * 可以接收AJAX封装的请求参数
 *
 * @param paramName
 */
@GetMapping("/testGet3")
public String testGet3(String paramName,String paramName1, Model model){
    System.out.println("paramName:"+paramName);
    System.out.println("paramName1:"+paramName1);
    model.addAttribute("paramName",paramName);
    return paramName;
}
```

前台代码：

```java
/**
 * SpringMVC自动匹配参数（GET请求方式）
 *
 * @author: felixsfan
 * @date 2018/10/2  23:40
 **/
function testGet3() {
    $.get(basePath + "/api/params/testGet3?paramName=111&paramName1=222", {}, function (data) {
        alert("SpringMVC自动匹配参数---后台返回来的参数：" + data);
    });
}
```

### 3.1.2 request对象获取参数

```java
@GetMapping("/query")
public int query(HttpServletRequest request) {
    String name=request.getParameter("name");
    String age=request.getParameter("age");
    System.out.println("name = " + name);
    System.out.println("age = " + age);
    return 1;
}
```

### 3.1.3 直接通过实体接收参数

```java
@GetMapping("/query")
public int query(A a) {
    String name=a.getName();
    String age=a.getAge();
    System.out.println("name = " + name);
    System.out.println("age = " + age);
    return 1;
}
public class A{
    private String name;
    private String age;
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getAge() {
        return age;
    }
 
    public void setAge(String age) {
        this.age = age;
    }
}
```

### 3.1.4 @ModelAttribute 接收实体参数

```java
@RequestMapping("/method05")
    public String method05(@ModelAttribute("user") User user) {
        return JSON.toJSONString(user);
    }
```

@ModelAttribute 注解主要作用是自动将数据暴露为模型数据用于视图页面展示时使用,比如此处注解value为user, 前端视图就可以通过${user.name}来获取绑定的命令对象的属性

此用法与方法4完全一致,支持url拼接的多个params 传参

可以用于接收url 或者from表单中的数据映射实体;

支持post请求 的form类型传参(form-data,x-www-form-urlencoded), 不支持JSON 传参

### 3.1.5 @RequestParam 接收url地址中的参数

后台代码：

```java
/**
 * @RequestParam注解获取参数（GET请求方式）
 * @param paramName
 * @return
 */
@GetMapping("/testGet1")
public String testGet1(@RequestParam("paramName") String paramName){
    System.out.println("paramName:"+paramName);
    return paramName;
}
```

前台代码：

```java
 /**
     * GET请求方式传递参数
     *
     * @author: chenlw
     * @date 2018/10/2  23:41
     **/
    function testGet1() {
        $.get(basePath + "/api/params/testGet1?paramName=123", {}, function (data) {
            alert("GET请求方式传递参数---后台返回来的参数：" + data);
        });
 
        AJAX传递请求参数（GET请求方式）
//        var data = {};
//        data.paramName = "111";
//        data.paramName1 = "222";
//        $.get(basePath + "/api/params/testGet2", data, function (data) {
//            alert("AJAX传递请求参数（GET请求方式）---后台返回来的参数：" + data);
//        });
    }
```

## 3.2 请求体

### 3.2.1 application/json

#### 3.2.1.1 @RequestBody

封装成map取值

```java
@PostMapping("/query")
public int query(@RequestBody Map map) {
    String name= MapUtils.getString(map,"name");
    System.out.println("name = " + name);
    String age= MapUtils.getString(map,"age");
    System.out.println("age = " + age);
    return 1;
}
```

封装成对象取值

```java
@PostMapping("/query")
public int query(@RequestBody A a) {
    String name= a.getName();
    System.out.println("name = " + name);
    String age= a.getAge();
    System.out.println("age = " + age);
    return 1;
}
```

传递一个字符串，自己再单独解析

```java
@PostMapping("/query")
public int query(@RequestBody String  data) {
    System.out.println("data = " + data);
    A a = new Gson().fromJson(data, A.class);
    String name= a.getName();
    System.out.println("name = " + name);
    String age= a.getAge();
    System.out.println("age = " + age);
    return 1;
}
```

### 3.2.2 multipart/form-data

#### 3.2.2.1 @RequestParam

后台代码：

```java
/**
 * @RequestParam注解获取参数（POST请求方式）
 * @param paramName
 * @return
 */
@PostMapping("/testPost1")
public String testPost1(@RequestParam("paramName") String paramName){
    System.out.println("paramName:"+paramName);
    return paramName;
}
```

前台代码：

```java
/**
 * AJAX传递请求参数（POST请求方式）
 *
 * @author: chenlw
 * @date 2018/10/2  23:45
 **/
function testPost1() {
    var data = {};
    data.paramName = "111";
    $.post(basePath + "/api/params/testPost1", data, function (data) {
        alert("后台返回来的参数：" + data);
    });
}
```

#### 3.2.2.2 直接通过实体接收参数

```java
@PostMapping("/query")
public int query(A a) {
    String name = a.getName();
    System.out.println("name = " + name);
    String age = a.getAge();
    System.out.println("age = " + age);
    return 1;
}
```

### 3.2.3 application/x-www-form-urlencoded

和url查询参数差不多

## 3.3 作为请求头

```java
@GetMapping("/query")
public int query(@RequestHeader String uuid,@RequestHeader String name) {
    System.out.println("uuid = " + uuid);
    System.out.println("name = " + name);
    return 1;
}
```

```java
@GetMapping("/query")
public int query(HttpServletRequest request) {
    String uuid=request.getHeader("uuid");
    String name=request.getHeader("name");
    System.out.println("uuid = " + uuid);
    System.out.println("name = " + name);
    return 1;
}
```

# 四、restful风格的接口

```html
localhost：8080/项目路径/method07/zhangsan/18/8000
```

```java
@RequestMapping(value = {"/method07/{name}/{age}/{money}","/method07/{name}/{money}"})
    public String method07(@PathVariable("name") String name,
                           @PathVariable(value = "age", required = false) Integer age,
                           @PathVariable("money") Double money) {
        User user = new User();
        user.setName(name);
        user.setMoney(money);
        user.setAge(age);
        return JSON.toJSONString(user);
    }
```

