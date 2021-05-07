package com.qdu.servlet;

import java.io.IOException;
import java.util.Random;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 生成一个随机整数的Servlet
 *
 * @author Anna
 */
@WebServlet("/servlet1")
public class Servlet1 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        
        Random rand=new Random();
        int num=rand.nextInt(10000)+1;   
        
        resp.getWriter().println(num);
    }
}
