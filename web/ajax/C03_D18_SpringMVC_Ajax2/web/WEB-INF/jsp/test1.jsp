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
            <h1 class="text-center text-success">Test1-发送Ajax请求，返回一个字符串</h1>
            <hr>
            <br>

            <form class="form-inline">
                姓名：<input type="text" id="nameText" value="Anna" class="form-control">
                &nbsp;&nbsp;
                <input type="button" id="btn" value="提交" class="btn btn-sm btn-primary">
            </form>

            <br>

            <h4 id="msg" class="text-danger">此处显示消息</h4>

        </div>

        <script>
            
            $(document).ready(function(){
                
                $("#btn").click(function(){
                    
                    $.ajax({
                        url: "test/test1",
                        type: "POST",
                        data: {name:$("#nameText").val()}, //将id为nameText文本框的值作为一个请求参数发送给控制器
                        success: function(data){ //success对应的函数可以添加一个参数，接收控制器返回的数据
                            //如果请求处理成功，将返回的数据设置为id为msg的元素的内容
                            $("#msg").html(data);
                        },
                        error: function(req, status, error){
                            //error对应的函数的三个参数：请求对象、请求状态、错误信息
                            alert("Ajax请求处理失败，错误："+error);
                        }
                    });
                    
                });
                
            });
            
        </script>

    </body>
</html>