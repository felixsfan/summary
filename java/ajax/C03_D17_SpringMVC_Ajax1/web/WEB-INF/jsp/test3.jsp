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
            <h1 class="text-center text-danger">Test1-发送Ajax请求，返回单个实体对象</h1>
            <hr>
            <br>

            <form class="form-inline">
                学号：<input type="text" id="sid" value="S001" class="form-control"> 
                &nbsp;&nbsp;
                <input type="button" id="btn" value="查询" class="btn btn-sm btn-danger">
            </form>

            <br>

            <div id="studentInfo">
                <p>学号：<span id="idSpan"></span> </p>
                <p>姓名：<span id="nameSpan"></span> </p>
                <p>性别：<span id="genderSpan"></span> </p>
            </div>
        </div>

        <script>
            $(document).ready(function () {

                $("#btn").click(function () {

                    $.ajax({
                        url: "test/test3",
                        type: "POST",
                        data: {id:$("#sid").val()},
                        success: function (student){
                            $("#idSpan").html(student.stuId);
                            $("#nameSpan").html(student.stuName);
                            $("#genderSpan").html(student.stuGender);
                        },
                        error: function (req, status, error) {
                            alert("请求失败：" + error);
                        }
                    });

                });

            });
        </script>

    </body>
</html>