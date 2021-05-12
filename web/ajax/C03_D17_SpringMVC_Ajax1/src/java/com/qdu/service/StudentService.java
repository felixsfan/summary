package com.qdu.service;

import com.qdu.entity.Student;
import java.util.List;

public interface StudentService {

    /**
     * 根据学号获取一个学生的所有信息
     *
     * @param stuId 字符串表示的学号
     * @return 一个Student对象，包含学生信息
     */
    Student getStudentById(String stuId);

    /**
     * 获取所有学生的列表
     *
     * @return 一个列表，包含所有学生的信息
     */
    List getStudentList();

    /**
     * 添加一个新学生
     *
     * @param newStudent 一个包含新学生信息的Student对象
     * @return 一个boolean值，表示是否添加成功
     */
    boolean addStudent(Student newStudent);

    /**
     * 根据学号删除一个学生
     *
     * @param stuId 字符串表示的学号
     */
    void deleteStudent(String stuId);
}
