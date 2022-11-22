---
title: sql_mode=only_full_group_by

---
  在mysql 工具 搜索或者插入数据时报下面错误：

  ERROR 1055 (42000): Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column &#8216;database_tl.emp.id&#8217; which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by

  原因：

  看一下group by的语法：

  select 选取分组中的列+聚合函数 from 表名称 group by 分组的列

  从语法格式来看，是先有分组，再确定检索的列，检索的列只能在参加分组的列中选。

  我当前Mysql版本5.7.17，

  再看一下ONLY_FULL_GROUP_BY的意思是：对于GROUP BY聚合操作，如果在SELECT中的列，没有在GROUP BY中出现，那么这个SQL是不合法的，因为列不在GROUP BY从句中，也就是说查出来的列必须在group by后面出现否则就会报错，或者这个字段出现在聚合函数里面。

  查看mysql版本命令：select version();

  查看sql_model参数命令：

  SELECT @@GLOBAL.sql_mode;

  SELECT @@SESSION.sql_mode;

  发现：

  ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION

  第一项默认开启ONLY_FULL_GROUP_BY，

  解决方法：

  1.只选择出现在group by后面的列，或者给列增加聚合函数；（不推荐）

  2.命令行输入：

  set @@GLOBAL.sql_mode=&#8221;;

  set sql_mode =&#8217;STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION&#8217;;

  默认关掉ONLY_FULL_GROUP_BY！

  这个时候 在用工具select 一下

  SELECT @@sql_mode;

  SELECT @@GLOBAL.sql_mode;

  发现已经不存在ONLY_FULL_GROUP_BY ，感觉已经OK。但是如果你重启Mysql服务的话，发现ONLY_FULL_GROUP_BY还是会存在的

  想要彻底解决这个问题 就得去改my.ini 配置 （如果你们mysql 没有这个文件，就把my-default.ini 改成my.ini，我这个版本就是没有my.ini配置问题）

  在 [mysqld]和[mysql]下添加

  SET sql_mode =&#8217;STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION&#8217;;
