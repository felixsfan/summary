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
            <h1 class="text-center text-success">Test2-发送Ajax请求，返回一个数字</h1>
            <hr>
            <br>

            <form class="form-inline">
                数字1：<input type="text" id="num1" value="100" class="form-control">
                <br><br>
                数字2：<input type="text" id="num2" value="200" class="form-control">
                <br><br>
                <input type="button" id="btn" value="计算两数之和" class="btn btn-sm btn-primary">
            </form>

            <br>

            <h4 id="result" class="text-danger">此处显示结果</h4>

        </div>

        <script>
            $(document).ready(function () {

                $("#btn").click(function () {

                    $.ajax({
                        url: "test/test2",
                        type: "POST",
                        data: {number1: $("#num1").val(), number2: $("#num2").val()},
                        success: function(data){
                            //success对应的函数可以定义一个参数，用于接受服务器返回的数据
                            //将控制器返回的数据显示为id为result的元素的内容
                            $("#result").html(data);
                        },
                        error: function(req, status, error){
                            //error对应的函数可以接受三个参数，分别表示请求对象，请求状态和错误信息
                            alert("Ajax请求处理有错误："+error);
                        } //最后一个属性不要加逗号
                    });
                });
            });
        </script>

    </body>
</html>