package com.qdu.controller;

import com.qdu.entity.Student;
import com.qdu.service.ProductService;
import com.qdu.service.StudentService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/test")
public class TestController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private ProductService productService;

    //produces属性指定控制器方法产生的数据，也就是返回的数据的MIME类型
    //同时可以指定内容的字符集
    @PostMapping(value = "/test1", produces = "text/html;charset=utf-8")
    @ResponseBody //该注解将控制器的方法理解为响应内容/正文，这样就不会理解为视图名称
    public String test1(String name) {
        return "哈喽，" + name;
    }

    @PostMapping(value = "/test2")
    @ResponseBody //该注解说明控制器方法返回的内容为响应正文内容，也就是返回给前端的数据
    public int test2(int number1, int number2) {
        return number1 + number2;
    }

    @PostMapping(value = "/test3")
    @ResponseBody
    public Student test3(String id) {
        return studentService.getStudentById(id); //根据学号查询到单个学生对象返回
    }

    @PostMapping(value = "/test4")
    @ResponseBody
    public List test4() {
        //调用StudentService的getStudentList()方法可以获取一个List<Student>列表
        return studentService.getStudentList();
    }

    //如果控制器方法不需要返回任何值，可以直接返回类型设置为void
    //但是如果是ajax请求，请记得添加@ResponseBody
    @PostMapping(value = "/test5")
    @ResponseBody
    public void test5(String stuId) {
        studentService.deleteStudent(stuId);
    }

    //因为提交的请求参数名和Student类中的属性名一一对应，所以参数可以直接用一个Student对象接受
    //可以使用Map集合返回多个数据,这样将控制器方法的返回类型设置为Map即可
    @PostMapping(value = "/test6")
    @ResponseBody
    public Map test6(Student s) {
        //调用StudentService的addStudent()方法添加一个学生，如果成功，返回true，否则返回false
        boolean flag = studentService.addStudent(s);
        //如果需要返回多个信息给前端，可以考虑将多个消息放入一个Map集合
        Map dataMap = new HashMap(); //创建一个Map集合，用于存放返回给前端
        if (flag) { //如果注册成功
            dataMap.put("message", "注册成功！");
            dataMap.put("textColor", "green");
        } else {
            dataMap.put("message", "注册失败，学号必须是四位字符！");
            dataMap.put("textColor", "red");
        }
        return dataMap;
    }

    @PostMapping(value = "/test7")
    @ResponseBody
    public List test7() {
        return productService.getProductList();
    }

}
