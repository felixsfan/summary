
package com.qdu.entity;

public class Student {
    
    private String stuId;
    private String stuName;
    private String stuGender;

    public Student() {
    }

    public Student(String stuId, String stuName, String stuGender) {
        this.stuId = stuId;
        this.stuName = stuName;
        this.stuGender = stuGender;
    }

    public String getStuId() {
        return stuId;
    }

    public void setStuId(String stuId) {
        this.stuId = stuId;
    }

    public String getStuName() {
        return stuName;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    public String getStuGender() {
        return stuGender;
    }

    public void setStuGender(String stuGender) {
        this.stuGender = stuGender;
    }

    @Override
    public String toString() {
        return "学号："+stuId+"，姓名："+stuName+"，性别："+stuGender;
    }
    
}
