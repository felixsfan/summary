#创建数据库
CREATE DATABASE `test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
#创建数据表
CREATE TABLE `student` ( `sid` INT NOT NULL AUTO_INCREMENT , `sname` VARCHAR(20) NOT NULL ,
`sage` INT NOT NULL , `score` DOUBLE NOT NULL , PRIMARY KEY (`sid`)) ENGINE = MyISAM;