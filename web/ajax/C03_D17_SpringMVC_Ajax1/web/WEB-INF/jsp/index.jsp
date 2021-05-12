<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>在Spring MVC应用程序中使用Ajax</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <base href="${pageContext.request.contextPath}/">
        <link rel="stylesheet" href="css/bootstrap.min.css"/>
        <link rel="stylesheet" href="css/style.css"/>
    </head>
    <body>
        <div class="container">
            
            <h1 class="text-center text-primary padding10">在Spring MVC应用程序中使用Ajax</h1>
            <hr>
            <br>

            <ul>
                <li><a href="toTest1">1.  返回一个字符串</a></li>
                <li><a href="toTest2">2.  返回一个数字</a></li>
                <li><a href="toTest3">3.  返回单个对象</a></li>
                <li><a href="toTest4_5">4-5.  返回一个List集合和删除列表中的一项</a></li>
                <li><a href="toTest6">6.  提交一个表单</a></li>
                <li><a href="toTest7">7.  练习-返回一个List集合</a></li>
            </ul>
        </div>

    </body>
</html>