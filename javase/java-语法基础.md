# Java 语法基础

## 1 什么是变量？

变量是内存中存放并不确定数据的一个存储空间，可以重复使用。

一个变量包含：**数据类型**、**标识符**、**初始值**

## 2 数据类型

### 基本的数据类型 `<四类八种>`

 * 整数：byte、short、**int**、long

 * 浮点数：float、**double**

 * 字符：char

 * 布尔：boolean

### 引用数据类型

 * 数组

 * 类

 * 接口

### 数据类型的转换

 **级别从低到高为：**byte,char,short --> int --> float --> long --> double

**自动类型转换：**从低级别到高级别，系统自动转的；

**强制类型转换：**将一个高级别的值赋给低级别的变量，如 `int x=(int)(1.34)`；

## 3 标识符

> 标示符（ID_entifier_）是指用来标识某个实体的一个符号

**标识符定义规则：**

* 组成：**数字、英文字母、`$`、`_`**

* 数字不可以开头

* 不可使用关键字

## 4 命名规则

> 所有的命名都要求符合**标识符**的规则，并且具有可读性。

* **变量、方法**：首字母小写。当包含多个单词时，除第一个单词首字母小写，其他单词的首字母都大写。

* **类**：首字母必须大写。当包含多个单词，每个单词的首字母都要大写。

* **程序文件名**：程序的文件名必须和公共类的名称匹配。最多有一个公共类。不含公共类时可随意命名。

## 5 Java 常量

使用修饰符`final`声明，一旦赋值不可修改，常量名通常大写，例如

```java

final int Pai = 3.14 ;

```

## 6 Java 运算符

### 运算符分类

* 算术运算符

 * `+` `-` `*` `/` `%`

 * `+` 连接符

 * `++` `--`

* 关系运算符

 * `<` `>` `=` `!=` `<=` `>=`

* 逻辑运算符

 * `&&` `||` `!`

* 位运算符

 * `&` `|` `~` `^`

 * `<<` `>>`

 * `>>>` 右移补零

* 赋值运算符

 * `=`

 * `+=` `-=` `*=` `/=` `%=`

 * `&=` `|=` `^=` `<<=` `>>=`

* 条件运算符

 * 变量`=`条件`：`x值`?`y值`;`

* instanceOf 运算符

 * `boolean result = object instanceof class;`

 * 判断变量引用的是否是当前类或它的子类的实例 ，返回布尔值。

> 关系运算符和逻辑运算符的结果都是布尔值

> 位运算符适用类型：整数（byte、short、int、long）与字符型（char）。

### instanceof

可以如下使用，判断某个引用的类型

```java
Object o = funcation();
if( o instanceof ClassX){ }
```

如下，如果 ClassA 的父类及以上不是第二操作数，会在编写时报错。
```java
new ClassA() instanceof 类名
```

对于接口，会在运行时判断
```java
new ClassA() instanceof 接口
```


### 关于&和&&、\|和\|\|

&&和\|\|是逻辑运算符，操作数都是布尔值，结果也是布尔值。

&和\|是位运算符，计算时会将操作数转化为二进制，结果也为数。

&&和\|\|当知道左侧值时，可能不会执行右侧表达式，因此被称为**短路与和短路或**。

&和\|，因为要对两侧的值进行与或位运算，所以不会遗忘右侧值。

之所以会有这样的称呼与用法，可能与布尔类型的**存储类型**有关。

### 运算符优先级

自行查阅。

## 7 流程控制

### 条件判断

**if 语句**

```java

if(Boolean_expression){

 //Executes when the Boolean expression is true

}else{

 //Executes when the Boolean expression is false

}

```

**switch 语句**

```java

switch(expression){

 case value :

 //Statements

 break; //optional

 case value :

 //Statements

 break; //optional

 //You can have any number of case statements.

 default : //Optional

 //Statements

}

```

> expression可取类型：byte、short、int、枚举、char、**String**&lt;JDK 7支持String，long不支持&gt;。

>

> case的value必须是常量，变量用final修饰定义。

>

> default可以写在switch结构中的任意位置，**如果将default语句放在了第一行，则不管expression与case中的value是否匹配，程序会从default开始执行直到第一个break出现。**

### 循环控制

**while 循环**

```java

while(Boolean_expression)

{

 //Statements

}

```

**do...while 循环**

```java

do

{

 //Statements

} while (Boolean_expression);

```

**for 循环**

```java

for(initialization; Boolean_expression; update)

{

 //Statements

}

```

**for-feach循环**

```java

for( type element : Collection )

{

 //Statements

}

```

> 适用于 Collection 实现及数组。

>

> 更多 **for-feach循环** 内容，请看java 迭代器。

### 中断关键字

**break**

作用于switch语句和循环语句，用于跳出\/结束语句。

> 双重循环中，在外循环前加标号，如 "`label：`" ，内层循环中可以用 "`break label;`" 跳出双重循环

**continue**

作用于循环语句，用于结束本次循环。

** return**

* 返回指定类型的值

* 结束方法的执行
