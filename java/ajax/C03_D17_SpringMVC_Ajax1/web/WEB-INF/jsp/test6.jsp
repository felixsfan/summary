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
        <script src="js/jquery-3.4.1.min.js"></script>
    </head>
    <body>

        <div class="container">
            <h1 class="text-center text-warning">Test6-发送Ajax请求，提交一个注册表单和返回Map集合</h1>
            <hr>

            <br><br>

            <!--注意：这个表单里的表单元素（文本框或下拉列表）没有给id，而是给了name-->
            <form id="regForm" class="form-inline">
                学号： <input type="text" name="stuId" value="S005" class="form-control">
                &nbsp;
                <span class="text-danger">* 学号是四位字符</span>
                <br><br>
                姓名： <input type="text" name="stuName" value="安娜" class="form-control">
                <br><br>
                性别：
                <select name="stuGender" value="女" class="form-control fixedWidth">
                    <option value="男">男</option>
                    <option value="女" selected="true">女</option>
                </select>
                <br><br>
                <input type="button" value="提交注册" id="btn" class="btn btn-sm btn-danger">
            </form>

            <br>
            <h4 id="msg"></h4>

        </div>

        <script>
            $(document).ready(function () {
                $("#btn").click(function () {
                    $.ajax({
                        url: 'test/test6',
                        type: 'POST',
                        //如果想提交整个表单的所有内容，记得表单中的元素给出name属性
                        //调用serialize()函数将表单的所有参数序列化成一个字符串提交给服务器
                        data: $("#regForm").serialize() , //serialize()函数将表单数据编码成一个字符串提交给服务器
                        success: function (data) {
                            //返回的Map集合会被转换成一个json对象
                            //Map集合中的键会成为json对象属性的名称
                            //Map集合中的值会成为json对象属性的值
                            $("#msg").html(data.message);
                            //css函数用于改变指定元素的样式（单个或多个css属性）
                            $("#msg").css("color",data.textColor);
                        },
                        error: function (req, status, error) {
                            alert("Ajax请求失败！" + error);
                        }
                    });
                });
            });
        </script>

    </body>
</html>