package com.qdu.dao;

import com.qdu.entity.Student;
import com.qdu.util.DatabaseUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * StudentDao类，包含对Student表的增删改查操作
 *
 * @author Anna
 */
public class StudentDao {

    /**
     * 插入一条新学生记录到表Student中
     *
     * @param student 包含要插入的学生信息的Student对象
     * @return 一个整数值，标识是否插入成功，如果数字小于等于0，则表示插入失败，否则表示受影响的行数
     */
    public int insert(Student student) {

        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        int rows = 0;

        try {
            con = DatabaseUtil.getConnection();
            ps = con.prepareStatement("insert into Student values(?,?,?,?,?)");
            ps.setString(1, student.getSrollno());
            ps.setString(2, student.getSname());
            ps.setString(3, student.getSpassword());
            ps.setString(4, student.getSgender());
            ps.setString(5, student.getSbatch());
            rows = ps.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            DatabaseUtil.close(rs, ps, con);
        }
        return rows;
    }

    /**
     * 更新一个学生信息，该方法只允许修改学生的姓名和密码
     *
     * @param student 包含学生更新后的信息的Student对象
     * @return 一个整数值，标识是否更新成功，如果数字小于等于0，则表示更新失败，否则表示受影响的行数
     */
    public int update(Student student) {
        
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        int rows = 0;

        try {
            con = DatabaseUtil.getConnection();
            ps = con.prepareStatement("update Student set Spassword=?,Sname=? where Srollno=?");
            ps.setString(1, student.getSpassword());
            ps.setString(2, student.getSname());
            ps.setString(3, student.getSrollno());
            rows = ps.executeUpdate();
            rows = ps.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            DatabaseUtil.close(rs, ps, con);
        }
        return rows;
    }

    /**
     * 从Student表中删除指定学号的学生的信息
     *
     * @param id 要删除的学生的学号
     * @return 一个整数值，标识是否删除成功，若返回值大于0，表示受影响的行数，否则表示未删除任何记录
     */
    public int delete(String id) {

        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        int rows = 0;

        try {
            con = DatabaseUtil.getConnection();
            ps = con.prepareStatement("delete Student where Srollno=?");
            ps.setString(1, id);
            rows = ps.executeUpdate();
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            DatabaseUtil.close(rs, ps, con);
        }
        return rows;
    }

    /**
     * 根据学号查询单个学生的所有信息
     *
     * @param id 要查询的学生的学号
     * @return 包含所查询的学生的所有信息的Student对象
     */
    public Student getOneById(String id) {

        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        Student s = null;

        try {
            con = DatabaseUtil.getConnection();
            ps = con.prepareStatement("select * from Student where Srollno=?");
            ps.setString(1, id);
            rs = ps.executeQuery();
            while (rs.next()) { //next()判断有没有下一行，并移动到下一行
                String sno = rs.getString(1);
                String sname = rs.getString(2);
                String spwd = rs.getString(3);
                String sgender = rs.getString(4);
                String sbatch = rs.getString(5);
                s = new Student(sno, sname, spwd, sgender, sbatch);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            DatabaseUtil.close(rs, ps, con);
        }
        return s;
    }

     /**
     * 查询指定班级的总人数
     *
     * @param batchName 字符串表示的班级名称
     * @return 班级人数
     */
    public int getBatchSize(String batchName) {

        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        int count=0;

        try {
            con = DatabaseUtil.getConnection();
            ps = con.prepareStatement("select count(*) from Student where Sbatch=?");
            ps.setString(1, batchName);
            rs = ps.executeQuery();
            if(rs.next()){
                count=rs.getInt(1);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            DatabaseUtil.close(rs, ps, con);
        }
        return count;
    }
    
    /**
     * 根据班级名称查询班级的学生列表
     *
     * @param batchName 字符串表示的班级名称
     * @return 包含该班级所有学生的列表
     */
    public List<Student> getListByBatch(String batchName) {

        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Student> list = new ArrayList();

        try {
            con = DatabaseUtil.getConnection();
            ps = con.prepareStatement("select * from Student where Sbatch=?");
            ps.setString(1, batchName);
            rs = ps.executeQuery();
            while (rs.next()) { //next()判断有没有下一行，并移动到下一行
                String sno = rs.getString(1);
                String sname = rs.getString(2);
                String spwd = rs.getString(3);
                String sgender = rs.getString(4);
                String sbatch = rs.getString(5);
                Student s = new Student(sno, sname, spwd, sgender, sbatch);
                list.add(s);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            DatabaseUtil.close(rs, ps, con);
        }
        return list;
    }
    
     /**
     * 根据班级名称和页码以及每页记录数查询学生列表
     *
     * @param batchName 字符串表示的班级名称
     * @param pageNo 页码，也就是第几页，从1开始
     * @param pageSize 页面大小，也就是每页显示的记录数量
     * @return 所查询的学生的列表
     */
    public List<Student> getListByBatchAndPage(String batchName,int pageNo,int pageSize) {

        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Student> list = new ArrayList();

        try {
            con = DatabaseUtil.getConnection();
            ps = con.prepareStatement("select * from Student where sbatch=? "
                    + "order by srollno OFFSET ? ROWS FETCH next ? rows only");
            ps.setString(1, batchName);
            ps.setInt(2, (pageNo-1)*pageSize);
            ps.setInt(3, pageSize);
            rs = ps.executeQuery();
            while (rs.next()) { //next()判断有没有下一行，并移动到下一行
                String sno = rs.getString(1);
                String sname = rs.getString(2);
                String spwd = rs.getString(3);
                String sgender = rs.getString(4);
                String sbatch = rs.getString(5);
                Student s = new Student(sno, sname, spwd, sgender, sbatch);
                list.add(s);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            DatabaseUtil.close(rs, ps, con);
        }
        return list;
    }

    /**
     * 查询Student表中所有学生的信息
     *
     * @return 包含所有学生信息的列表
     */
    public List<Student> getAll() {
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Student> list = new ArrayList();

        try {
            con = DatabaseUtil.getConnection();
            ps = con.prepareStatement("select * from Student");
            rs = ps.executeQuery();
            while (rs.next()) { //next()判断有没有下一行，并移动到下一行
                String sno = rs.getString(1);
                String sname = rs.getString(2);
                String spwd = rs.getString(3);
                String sgender = rs.getString(4);
                String sbatch = rs.getString(5);
                Student s = new Student(sno, sname, spwd, sgender, sbatch);
                list.add(s);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            DatabaseUtil.close(rs, ps, con);
        }
        return list;
    }
}
