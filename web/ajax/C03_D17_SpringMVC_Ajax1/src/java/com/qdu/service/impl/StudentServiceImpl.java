/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.qdu.service.impl;

import com.qdu.entity.Student;
import com.qdu.service.StudentService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Anna
 */
@Service
public class StudentServiceImpl implements StudentService{
    
    private static List<Student> studentList;

    static {

        studentList = new ArrayList();
        studentList.add(new Student("S001", "张三", "男"));
        studentList.add(new Student("S002", "李四", "男"));
        studentList.add(new Student("S003", "赵武", "男"));
        studentList.add(new Student("S004", "小红", "女"));
        studentList.add(new Student("S005", "小强", "男"));
        studentList.add(new Student("S006", "小明", "男"));
        studentList.add(new Student("S007", "小兰", "女"));
        studentList.add(new Student("S008", "小丽", "女"));
        studentList.add(new Student("S009", "小熊", "男"));
        studentList.add(new Student("S010", "小奇", "男"));
    }

    @Override
    public Student getStudentById(String stuId) {

        Student s = null;
        for (int i = 0; i < studentList.size(); i++) {
            if (studentList.get(i).getStuId().equals(stuId)) {
                s = studentList.get(i);
            }
        }
        return s;
    }

    @Override
    public List getStudentList() {
        return studentList;
    }

    @Override
    public boolean addStudent(Student newStudent) {
        if (newStudent.getStuId().length() != 4) {
            return false;
        } else {
            studentList.add(newStudent);
            return true;
        }
    }
    
    @Override
    public void deleteStudent(String stuId) {
        studentList.remove(getStudentById(stuId));
    }
}
