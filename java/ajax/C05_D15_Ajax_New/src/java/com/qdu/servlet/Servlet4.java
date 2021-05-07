package com.qdu.servlet;

import com.qdu.dao.StudentDao;
import com.qdu.entity.Student;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;

/**
 * 根据学号查询个人信息的Servlet
 *
 * @author Anna
 */
@WebServlet("/servlet4")
public class Servlet4 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String rollno = req.getParameter("srollno");

        StudentDao dao = new StudentDao();
        Student s = dao.getOneById(rollno);

        //将数据作为json格式数据输出为响应
        resp.setContentType("application/x-json;charset=utf-8");
        JSONObject obj = JSONObject.fromObject(s);
        resp.getWriter().println(obj.toString());
    }
}
