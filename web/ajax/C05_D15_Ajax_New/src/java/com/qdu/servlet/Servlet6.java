package com.qdu.servlet;

import com.qdu.dao.StudentDao;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 处理根据学号删除一个学生的请求的Servlet
 *
 * @author Anna
 */
@WebServlet("/servlet6")
public class Servlet6 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        String srollno=req.getParameter("srollno");
        StudentDao dao=new StudentDao();
        int rows=dao.delete(srollno);
        
        if(rows==0)
            resp.getWriter().println(false);
        else
            resp.getWriter().println(true);
    }
}
