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
 * 该Servlet负责处理验证学号是否已经注册的请求
 *
 * @author Anna
 */
@WebServlet("/servlet8")
public class Servlet8 extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String srollno = req.getParameter("srollno");

        StudentDao studentDao = new StudentDao();
        Student s = studentDao.getOneById(srollno);

        //如果已经有这么个学生，说明学号已经注册，显示提示消息
        resp.setContentType("application/x-json;charset=utf-8");

        JSONObject obj = new JSONObject();

        if (s != null) {
            obj.put("msg", "该学号已经注册过了，请尝试其他学号！");
            obj.put("class", "red");
        } else {
            obj.put("msg", "该学号可以使用！！！");
            obj.put("class", "green");
        }

        resp.getWriter().println(obj.toString());

    }
}
