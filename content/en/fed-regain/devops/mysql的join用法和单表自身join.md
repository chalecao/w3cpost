---
title: mysql的join用法和单表自身join




---
维恩图(Venn)，也叫温氏图、维恩图、范氏图，用于显示元素集合重叠区域的图表。维恩图是关系型图表，通过图形与图形之间的层叠关系，来表示集合与集合之间的相交关系。一个完整的韦恩图包含三个构成元素：若干个圆表示集合，若干个圆层叠部分表示公有集合以及集合内部显示的文本标签。

JOIN的含义就如英文单词“join”一样，连接两张表，大致分为内连接，外连接，右连接，左连接，自然连接。这里描述先甩出一张用烂了的图，然后插入测试数据。

常用的7中JOIN的维恩图如下：

<p id="THXyokg">
  <img loading="lazy" class="alignnone wp-image-2539 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bee193b1780c.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bee193b1780c.png?x-oss-process=image/format,webp" alt="" width="546" height="379" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bee193b1780c.png?x-oss-process=image/format,webp 991w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bee193b1780c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_209/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bee193b1780c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_534/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/11/img_5bee193b1780c.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_556/format,webp 800w" sizes="(max-width: 546px) 100vw, 546px" />
</p>

## 示例

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="godzilla">CREATE TABLE t_blog(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(50),
        typeId INT
    );
SELECT * FROM t_blog;
    +----+-------+--------+
    | id | title | typeId |
    +----+-------+--------+
    |  1 | aaa   |      1 |
    |  2 | bbb   |      2 |
    |  3 | ccc   |      3 |
    |  4 | ddd   |      4 |
    |  5 | eee   |      4 |
    |  6 | fff   |      3 |
    |  7 | ggg   |      2 |
    |  8 | hhh   |   NULL |
    |  9 | iii   |   NULL |
    | 10 | jjj   |   NULL |
    +----+-------+--------+

-- 博客的类别
    CREATE TABLE t_type(
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(20)
    );
    SELECT * FROM t_type;
    +----+------------+
    | id | name       |
    +----+------------+
    |  1 | C++        |
    |  2 | C          |
    |  3 | Java       |
    |  4 | C#         |
    |  5 | Javascript |
    +----+------------+</pre>

<h2 data-anchor-id="o4rx">
  CROSS JOIN：笛卡尔积
</h2>

<p data-anchor-id="yoxf">
  要理解各种JOIN首先要理解笛卡尔积。笛卡尔积就是将A表的每一条记录与B表的每一条记录强行拼在一起。所以，如果A表有n条记录，B表有m条记录，笛卡尔积产生的结果就会产生n*m条记录。下面的例子，t_blog有10条记录，t_type有5条记录，所有他们俩的笛卡尔积有50条记录。有五种产生笛卡尔积的方式如下。
</p>

<pre class="EnlighterJSRAW" data-enlighter-language="sql" data-enlighter-theme="godzilla">SELECT *FROM t_blog CROSS JOIN t_type;
SELECT* FROM t_blog INNER JOIN t_type;
    SELECT *FROM t_blog,t_type;
SELECT* FROM t_blog NATURE JOIN t_type;
    select * from t_blog NATURA join t_type;
    +----+-------+--------+----+------------+
    | id | title | typeId | id | name       |
    +----+-------+--------+----+------------+
    |  1 | aaa   |      1 |  1 | C++        |
    |  1 | aaa   |      1 |  2 | C          |
    |  1 | aaa   |      1 |  3 | Java       |
    |  1 | aaa   |      1 |  4 | C#         |
    |  1 | aaa   |      1 |  5 | Javascript |
    |  2 | bbb   |      2 |  1 | C++        |
    |  2 | bbb   |      2 |  2 | C          |
    |  2 | bbb   |      2 |  3 | Java       |
    |  2 | bbb   |      2 |  4 | C#         |
    |  2 | bbb   |      2 |  5 | Javascript |
    |  3 | ccc   |      3 |  1 | C++        |
    |  3 | ccc   |      3 |  2 | C          |
    |  3 | ccc   |      3 |  3 | Java       |
    |  3 | ccc   |      3 |  4 | C#         |
    |  3 | ccc   |      3 |  5 | Javascript |
    |  4 | ddd   |      4 |  1 | C++        |
    |  4 | ddd   |      4 |  2 | C          |
    |  4 | ddd   |      4 |  3 | Java       |
    |  4 | ddd   |      4 |  4 | C#         |
    |  4 | ddd   |      4 |  5 | Javascript |
    |  5 | eee   |      4 |  1 | C++        |
    |  5 | eee   |      4 |  2 | C          |
    |  5 | eee   |      4 |  3 | Java       |
    |  5 | eee   |      4 |  4 | C#         |
    |  5 | eee   |      4 |  5 | Javascript |
    |  6 | fff   |      3 |  1 | C++        |
    |  6 | fff   |      3 |  2 | C          |
    |  6 | fff   |      3 |  3 | Java       |
    |  6 | fff   |      3 |  4 | C#         |
    |  6 | fff   |      3 |  5 | Javascript |
    |  7 | ggg   |      2 |  1 | C++        |
    |  7 | ggg   |      2 |  2 | C          |
    |  7 | ggg   |      2 |  3 | Java       |
    |  7 | ggg   |      2 |  4 | C#         |
    |  7 | ggg   |      2 |  5 | Javascript |
    |  8 | hhh   |   NULL |  1 | C++        |
    |  8 | hhh   |   NULL |  2 | C          |
    |  8 | hhh   |   NULL |  3 | Java       |
    |  8 | hhh   |   NULL |  4 | C#         |
    |  8 | hhh   |   NULL |  5 | Javascript |
    |  9 | iii   |   NULL |  1 | C++        |
    |  9 | iii   |   NULL |  2 | C          |
    |  9 | iii   |   NULL |  3 | Java       |
    |  9 | iii   |   NULL |  4 | C#         |
    |  9 | iii   |   NULL |  5 | Javascript |
    | 10 | jjj   |   NULL |  1 | C++        |
    | 10 | jjj   |   NULL |  2 | C          |
    | 10 | jjj   |   NULL |  3 | Java       |
    | 10 | jjj   |   NULL |  4 | C#         |
    | 10 | jjj   |   NULL |  5 | Javascript |
    +----+-------+--------+----+------------+</pre>

<h2 id="内连接inner-join" data-anchor-id="9wdp">
  内连接：INNER JOIN
</h2>

<p data-anchor-id="ngfr">
  内连接INNER JOIN是最常用的连接操作。从数学的角度讲就是求两个表的交集，从笛卡尔积的角度讲就是从笛卡尔积中挑出ON子句条件成立的记录。有INNER JOIN，WHERE（等值连接），STRAIGHT_JOIN,JOIN(省略INNER)四种写法。至于哪种好我会在<strong>MySQL的JOIN（二）：优化</strong>讲述。示例如下。
</p>

<div class="cnblogs_code">
  <pre><code>    SELECT *FROM t_blog INNER JOIN t_type ON t_blog.typeId=t_type.id;
SELECT* FROM t_blog,t_type WHERE t_blog.typeId=t_type.id;
    SELECT *FROM t_blog STRAIGHT_JOIN t_type ON t_blog.typeId=t_type.id; --注意STRIGHT_JOIN有个下划线
SELECT* FROM t_blog JOIN t_type ON t_blog.typeId=t_type.id;
    +----+-------+--------+----+------+
    | id | title | typeId | id | name |
    +----+-------+--------+----+------+
    |  1 | aaa   |      1 |  1 | C++  |
    |  2 | bbb   |      2 |  2 | C    |
    |  7 | ggg   |      2 |  2 | C    |
    |  3 | ccc   |      3 |  3 | Java |
    |  6 | fff   |      3 |  3 | Java |
    |  4 | ddd   |      4 |  4 | C#   |
    |  5 | eee   |      4 |  4 | C#   |
    +----+-------+--------+----+------+</code></pre>
</div>

&nbsp;

<h2 id="左连接left-join" data-anchor-id="msqb">
  左连接：LEFT JOIN
</h2>

<p data-anchor-id="tjtt">
  左连接LEFT JOIN的含义就是求两个表的交集外加左表剩下的数据。依旧从笛卡尔积的角度讲，就是先从笛卡尔积中挑出ON子句条件成立的记录，然后加上左表中剩余的记录（见最后三条）。
</p>

<div class="cnblogs_code">
  <pre><code>    SELECT * FROM t_blog LEFT JOIN t_type ON t_blog.typeId=t_type.id;
    +----+-------+--------+------+------+
    | id | title | typeId | id   | name |
    +----+-------+--------+------+------+
    |  1 | aaa   |      1 |    1 | C++  |
    |  2 | bbb   |      2 |    2 | C    |
    |  7 | ggg   |      2 |    2 | C    |
    |  3 | ccc   |      3 |    3 | Java |
    |  6 | fff   |      3 |    3 | Java |
    |  4 | ddd   |      4 |    4 | C#   |
    |  5 | eee   |      4 |    4 | C#   |
    |  8 | hhh   |   NULL | NULL | NULL |
    |  9 | iii   |   NULL | NULL | NULL |
    | 10 | jjj   |   NULL | NULL | NULL |
    +----+-------+--------+------+------+</code></pre>
</div>

&nbsp;

<h2 id="右连接right-join" data-anchor-id="fs75">
  右连接：RIGHT JOIN
</h2>

<p data-anchor-id="pgf9">
  同理右连接RIGHT JOIN就是求两个表的交集外加右表剩下的数据。再次从笛卡尔积的角度描述，右连接就是从笛卡尔积中挑出ON子句条件成立的记录，然后加上右表中剩余的记录（见最后一条）。
</p>

<div class="cnblogs_code">
  <pre><code>    SELECT * FROM t_blog RIGHT JOIN t_type ON t_blog.typeId=t_type.id;
    +------+-------+--------+----+------------+
    | id   | title | typeId | id | name       |
    +------+-------+--------+----+------------+
    |    1 | aaa   |      1 |  1 | C++        |
    |    2 | bbb   |      2 |  2 | C          |
    |    3 | ccc   |      3 |  3 | Java       |
    |    4 | ddd   |      4 |  4 | C#         |
    |    5 | eee   |      4 |  4 | C#         |
    |    6 | fff   |      3 |  3 | Java       |
    |    7 | ggg   |      2 |  2 | C          |
    | NULL | NULL  |   NULL |  5 | Javascript |
    +------+-------+--------+----+------------+</code></pre>
</div>

<h2 id="外连接outer-join" data-anchor-id="fx7n">
  外连接：OUTER JOIN
</h2>

<p data-anchor-id="jr2d">
  外连接就是求两个集合的并集。从笛卡尔积的角度讲就是从笛卡尔积中挑出ON子句条件成立的记录，然后加上左表中剩余的记录，最后加上右表中剩余的记录。另外MySQL不支持OUTER JOIN，但是[我们](https://www.w3cdoc.com)可以对左连接和右连接的结果做UNION操作来实现。
</p>

<div class="cnblogs_code">
  <pre><code>    SELECT *FROM t_blog LEFT JOIN t_type ON t_blog.typeId=t_type.id
    UNION
SELECT* FROM t_blog RIGHT JOIN t_type ON t_blog.typeId=t_type.id;
    +------+-------+--------+------+------------+
    | id   | title | typeId | id   | name       |
    +------+-------+--------+------+------------+
    |    1 | aaa   |      1 |    1 | C++        |
    |    2 | bbb   |      2 |    2 | C          |
    |    7 | ggg   |      2 |    2 | C          |
    |    3 | ccc   |      3 |    3 | Java       |
    |    6 | fff   |      3 |    3 | Java       |
    |    4 | ddd   |      4 |    4 | C#         |
    |    5 | eee   |      4 |    4 | C#         |
    |    8 | hhh   |   NULL | NULL | NULL       |
    |    9 | iii   |   NULL | NULL | NULL       |
    |   10 | jjj   |   NULL | NULL | NULL       |
    | NULL | NULL  |   NULL |    5 | Javascript |
    +------+-------+--------+------+------------+</code></pre>
</div>

<h2 id="using子句" data-anchor-id="3uls">
  USING子句
</h2>

<p data-anchor-id="blpr">
  MySQL中连接SQL语句中，ON子句的语法格式为：table1.column_name = table2.column_name。当模式设计对联接表的列采用了相同的命名样式时，就可以使用 USING 语法来简化 ON 语法，格式为：USING(column_name)。<br /> 所以，USING的功能相当于ON，区别在于USING指定一个属性名用于连接两个表，而ON指定一个条件。另外，SELECT *时，USING会去除USING指定的列，而ON不会。实例如下。
</p>

<div class="cnblogs_code">
  <pre><code>    SELECT * FROM t_blog INNER JOIN t_type ON t_blog.typeId =t_type.id;
    +----+-------+--------+----+------+
    | id | title | typeId | id | name |
    +----+-------+--------+----+------+
    |  1 | aaa   |      1 |  1 | C++  |
    |  2 | bbb   |      2 |  2 | C    |
    |  7 | ggg   |      2 |  2 | C    |
    |  3 | ccc   |      3 |  3 | Java |
    |  6 | fff   |      3 |  3 | Java |
    |  4 | ddd   |      4 |  4 | C#   |
    |  5 | eee   |      4 |  4 | C#   |
    +----+-------+--------+----+------+

    SELECT * FROM t_blog INNER JOIN t_type USING(typeId);
    ERROR 1054 (42S22): Unknown column 'typeId' in 'from clause'
    SELECT * FROM t_blog INNER JOIN t_type USING(id); -- 应为t_blog的typeId与t_type的id不同名，无法用Using，这里用id代替下。
    +----+-------+--------+------------+
    | id | title | typeId | name       |
    +----+-------+--------+------------+
    |  1 | aaa   |      1 | C++        |
    |  2 | bbb   |      2 | C          |
    |  3 | ccc   |      3 | Java       |
    |  4 | ddd   |      4 | C#         |
    |  5 | eee   |      4 | Javascript |
    +----+-------+--------+------------+</code></pre>
</div>

<h2 id="自然连接nature-join" data-anchor-id="y5if">
  自然连接：NATURE JOIN
</h2>

<p data-anchor-id="hi26">
  自然连接就是USING子句的简化版，它找出两个表中相同的列作为连接条件进行连接。有<strong>左自然连接</strong>，<strong>右自然连接</strong>和<strong>普通自然连接</strong>之分。在t_blog和t_type示例中，两个表相同的列是id，所以会拿id作为连接条件。<br /> 另外千万分清下面三条语句的区别 。<br /> 自然连接:SELECT *FROM t_blog NATURAL JOIN t_type;<br /> 笛卡尔积:SELECT* FROM t_blog NATURA JOIN t_type;<br /> 笛卡尔积:SELECT * FROM t_blog NATURE JOIN t_type;
</p>

<div class="cnblogs_code">
  <div id="cnblogs_code_open_b28b36b5-b8c4-4651-af0c-e786640876c3" class="cnblogs_code_hide">
    <pre><code> SELECT * FROM t_blog NATURAL JOIN t_type;
    SELECT t_blog.id,title,typeId,t_type.name FROM t_blog,t_type WHERE t_blog.id=t_type.id;
    SELECT t_blog.id,title,typeId,t_type.name FROM t_blog INNER JOIN t_type ON t_blog.id=t_type.id;
    SELECT t_blog.id,title,typeId,t_type.name FROM t_blog INNER JOIN t_type USING(id);

    +----+-------+--------+------------+
    | id | title | typeId | name       |
    +----+-------+--------+------------+
    |  1 | aaa   |      1 | C++        |
    |  2 | bbb   |      2 | C          |
    |  3 | ccc   |      3 | Java       |
    |  4 | ddd   |      4 | C#         |
    |  5 | eee   |      4 | Javascript |
    +----+-------+--------+------------+

    SELECT * FROM t_blog NATURAL LEFT JOIN t_type;
    SELECT t_blog.id,title,typeId,t_type.name FROM t_blog LEFT JOIN t_type ON t_blog.id=t_type.id;
    SELECT t_blog.id,title,typeId,t_type.name FROM t_blog LEFT JOIN t_type USING(id);

    +----+-------+--------+------------+
    | id | title | typeId | name       |
    +----+-------+--------+------------+
    |  1 | aaa   |      1 | C++        |
    |  2 | bbb   |      2 | C          |
    |  3 | ccc   |      3 | Java       |
    |  4 | ddd   |      4 | C#         |
    |  5 | eee   |      4 | Javascript |
    |  6 | fff   |      3 | NULL       |
    |  7 | ggg   |      2 | NULL       |
    |  8 | hhh   |   NULL | NULL       |
    |  9 | iii   |   NULL | NULL       |
    | 10 | jjj   |   NULL | NULL       |
    +----+-------+--------+------------+

    SELECT * FROM t_blog NATURAL RIGHT JOIN t_type;
    SELECT t_blog.id,title,typeId,t_type.name FROM t_blog RIGHT JOIN t_type ON t_blog.id=t_type.id;
    SELECT t_blog.id,title,typeId,t_type.name FROM t_blog RIGHT JOIN t_type USING(id);

    +----+------------+-------+--------+
    | id | name       | title | typeId |
    +----+------------+-------+--------+
    |  1 | C++        | aaa   |      1 |
    |  2 | C          | bbb   |      2 |
    |  3 | Java       | ccc   |      3 |
    |  4 | C#         | ddd   |      4 |
    |  5 | Javascript | eee   |      4 |
    +----+------------+-------+--------+</code></pre>
  </div>
</div>

<h2 id="补充" data-anchor-id="2685">
  一些例子
</h2>

<div class="cnblogs_code">
  <p>
    <img id="code_img_opened_17522636-4378-4994-8fac-9798b92eb527" class="code_img_opened" src="https://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" />
  </p>
  
  <div id="cnblogs_code_open_17522636-4378-4994-8fac-9798b92eb527" class="cnblogs_code_hide">
    <pre><code>    SELECT *FROM t_blog LEFT JOIN t_type ON t_blog.typeId=t_type.id
    WHERE t_type.id IS NULL;
    +----+-------+--------+------+------+
    | id | title | typeId | id   | name |
    +----+-------+--------+------+------+
    |  8 | hhh   |   NULL | NULL | NULL |
    |  9 | iii   |   NULL | NULL | NULL |
    | 10 | jjj   |   NULL | NULL | NULL |
    +----+-------+--------+------+------+
SELECT* FROM t_blog RIGHT JOIN t_type ON t_blog.typeId=t_type.id
    WHERE t_blog.id IS NULL;
    +------+-------+--------+----+------------+
    | id   | title | typeId | id | name       |
    +------+-------+--------+----+------------+
    | NULL | NULL  |   NULL |  5 | Javascript |
    +------+-------+--------+----+------------+
    SELECT *FROM t_blog LEFT JOIN t_type ON t_blog.typeId=t_type.id
    WHERE t_type.id IS NULL
    UNION
SELECT* FROM t_blog RIGHT JOIN t_type ON t_blog.typeId=t_type.id
    WHERE t_blog.id IS NULL;
    +------+-------+--------+------+------------+
    | id   | title | typeId | id   | name       |
    +------+-------+--------+------+------------+
    |    8 | hhh   |   NULL | NULL | NULL       |
    |    9 | iii   |   NULL | NULL | NULL       |
    |   10 | jjj   |   NULL | NULL | NULL       |
    | NULL | NULL  |   NULL |    5 | Javascript |
    +------+-------+--------+------+------------+</code></pre>

    <h2 class="cnblogs_code_toolbar">
      单表自身join
    </h2>
    
    <div>
      <pre class="EnlighterJSRAW" data-enlighter-language="sql">SELECT a.*
FROM t_blog a
LEFT JOIN t_blog b
    ON a.name = b.name
WHERE
b.typeId = 2
AND a.typeId =1
ORDER BY a.typeId desc
;</pre>

      <p>
        注意On和Where的使用。ON用于选择表连接之间的条件，where则用于筛选左表和右表的数据。
      </p>
    </div>
  </div>
</div>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>
