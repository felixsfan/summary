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
            <h1 class="text-center text-warning">Test4_5-发送Ajax请求，返回一个List集合和发送请求删除一个学生</h1>
            <hr>

            <br>

            <form>
                <input type="button" id="btn" value="查询学生列表" class="btn btn-sm btn-info">
            </form>

            <br><br>

            <table id="studentTable" class="table table-bordered table-striped table-hover text-center">
                <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>操作</th>
                </tr>
            </table>

        </div>
        <script>

            $(document).ready(function () {


                $("#btn").click(function () {
                    $.ajax({
                        url: 'test/test4',
                        type: "POST",
                        success: function (list) { //服务器返回的是一个列表，列表中都是学生对象
                            //each函数用于遍历数组或集合
                            //第一个参数表示要遍历的数组或集合
                            //第二个参数用一个函数封装对数组或集合中每个元素要执行的操作
                                //该函数可以接受两个参数
                                //1)表示当前遍历的元素的索引,参数名可随便起
                                //2)表示当前遍历的元素,参数名可随便起
                            //remove()是删除当前选中的元素和其所有内容
                            //empty()是清空选中的元素的内容
                            $("#studentTable .datarow").remove(); 
                            $.each(list,function(index,stu){
                                var str="<tr id="+stu.stuId+" class=\"datarow\">"
                                        +"<td>"+stu.stuId+"</td>"
                                        +"<td>"+stu.stuName+"</td>"
                                        +"<td>"+stu.stuGender+"</td>"
                                        +"<td><a href=\"javascript:deleteStudent('"+stu.stuId+"')\">删除</a></td>"
                                        +"</tr>";
                                //将str这个字符串表示的一个tr追加为id为studentTable元素的内容
                                $("#studentTable").append(str);
                            });
                            
                        },
                        error: function (req, status, error) {
                            alert("Ajax请求失败！" + error);
                        }
                    });
                });
            });

            //定义一个函数,根据学号删除学生
            function deleteStudent(stuId) {
                $.ajax({
                    url: 'test/test5',
                    type: 'POST',
                    data: {"stuId": stuId}, //发送一个请求参数，参数名为stuId，参数值为传入的stuId变量的值
                    success: function () {
                        //如果能执行到success，说明后台删除成功，这里同时将表格中对应的数据行删除
                        $("#" + stuId).remove(); // remove是删除当前元素和其内容
                    },
                    error: function (req,status,error) {
                        alert("Ajax请求失败，错误："+error);
                    }
                });
            }
        </script>

    </body>
</html>