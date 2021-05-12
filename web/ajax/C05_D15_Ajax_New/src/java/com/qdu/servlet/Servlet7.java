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
 * 该Servlet负责处理添加新学生的请求
 *
 * @author Anna
 */
@WebServlet("/servlet7")
public class Servlet7 extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //获取新注册的学生的信息，封装成一个学生对象
        req.setCharacterEncoding("utf-8");
        String srollno = req.getParameter("srollno");
        String spwd = req.getParameter("spwd");
        String sname = req.getParameter("sname");
        String sgender = req.getParameter("sgender");
        String sbatch = req.getParameter("sbatch");

        Student newStudent = new Student(srollno, sname, spwd, sgender, sbatch);

        StudentDao studentDao = new StudentDao();
        int rows = studentDao.insert(newStudent);

        resp.setContentType("application/x-json;charset=utf-8");
        
        JSONObject obj=new JSONObject();
        
        if (rows == 0) {
            obj.put("msg", "添加新学生失败，该学号已经被注册过了！");
            obj.put("class", "red");
        } else {
            obj.put("msg", "添加新学生成功，请返回查询对应班级的信息！");
            obj.put("class", "green");
        }
        
        resp.getWriter().println(obj.toString());
    }
}
