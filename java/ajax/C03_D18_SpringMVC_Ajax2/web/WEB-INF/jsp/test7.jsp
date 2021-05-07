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

        <div class="container text-center">
            <h1 class="text-warning">Test7-发送Ajax请求，返回一个List集合</h1>
            <hr>

            <br>

            <form>
                <input type="button" id="btn" value="查询产品列表" class="btn btn-sm btn-danger">
            </form>

            <br><br>

            <div id="contentDiv">
                <div class="dataDiv">
                    <p>P001</p>
                    <p>卫龙辣条</p>
                    <p>2.5</p>
                    <p>一种神奇的食品</p>
                    <p><a href="#">删除</a></p>
                </div>
            </div>

        </div>
        <script>

            $(document).ready(function () {


                $("#btn").click(function () {
                    $.ajax({
                        url: 'test/test7',
                        type: "POST",
                        success: function (list) {

                            $("#contentDiv").empty();

                            $.each(list, function (index, pro) {

                                var str = "<div id=" + pro.produceId + " class=\"dataDiv\">" +
                                        "<p>" + pro.productId + "</p>" +
                                        "<p>" + pro.productName + "</p>" +
                                        "<p>" + pro.productPrice + "</p>" +
                                        "<p>" + pro.productDesc + "</p>" +
                                        "<p><a href=\"#\">删除</a></p>" +
                                        "</div>";
                                $("#contentDiv").append(str);
                            });
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