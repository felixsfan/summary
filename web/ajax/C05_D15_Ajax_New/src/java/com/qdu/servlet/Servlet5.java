//package com.qdu.servlet;

import com.qdu.dao.StudentDao;
import com.qdu.entity.Student;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONArray;

/**
 * 处理根据班级名称查询整个班级的学生列表的请求
 *
 * @author Anna
 */
@WebServlet("/servlet5")
public class Servlet5 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        //1. 获取请求参数
        String batchName = req.getParameter("batchName");

        //2. 调用业务逻辑，完成请求处理
        StudentDao dao = new StudentDao();
        List<Student> list = dao.getListByBatch(batchName);
        
        //将列表数据转换成JSON数据格式并输出作为响应
        resp.setContentType("application/x-json;charset=utf-8");
        JSONArray jArray = JSONArray.fromObject(list);
        resp.getWriter().println(jArray.toString());
    }
}
