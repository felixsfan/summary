
package com.qdu.entity;

public class Student{
    
    private String srollno;
    private String sname;
    private String spassword;
    private String sgender;
    private String sbatch;

    public Student(String srollno, String sname, String spassword, String sgender, String sbatch) {
        this.srollno = srollno;
        this.sname = sname;
        this.spassword = spassword;
        this.sgender = sgender;
        this.sbatch = sbatch;
    }

    public Student() {
    }

    public String getSrollno() {
        return srollno;
    }

    public void setSrollno(String srollno) {
        this.srollno = srollno;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getSpassword() {
        return spassword;
    }

    public void setSpassword(String spassword) {
        this.spassword = spassword;
    }

    public String getSgender() {
        return sgender;
    }

    public void setSgender(String sgender) {
        this.sgender = sgender;
    }

    public String getSbatch() {
        return sbatch;
    }

    public void setSbatch(String sbatch) {
        this.sbatch = sbatch;
    }
}
