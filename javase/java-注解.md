# Java 注解

# Annotation（注解）
Java提供的一种元程序中的元素关联任何信息和任何元数据（metadata）的途径和方法。
Annotion(注解)是一个接口，程序可以通过反射来获取指定程序元素的Annotion对象，然后通过Annotion对象来获取注解里面的元数据。
它可以用于创建文档，跟踪代码中的依赖性，甚至执行基本编译时检查。从某些方面看，annotation就像修饰符一样被使用，并应用于包、类 型、构造方法、方法、成员变量、参数、本地变量的声明中。这些信息被存储在Annotation的“name=value”结构对中。

当一个接口直接继承java.lang.annotation.Annotation接口时，仍是接口，而并非注解。要想自定义注解类型，只能通过@interface关键字的方式，其实通过该方式会隐含地继承.Annotation接口。

# 注解和注解类型

**注解类型是一种特殊的接口类型，注解是注解类型的一个实例**

# 注解类型

* 根据注解使用方法和用途：
        1.JDK内置系统注解
        2.元注解
        3.自定义注解
* 根据注解键值对的个数：
        1.标记注解
        2.单值注解
        3.多值注解　　
如果注解类型有单个键值对 , 并且键的名称是 value , 那么可以忽略括号中的键

# 元注解

|注解| 作用 |
|---|---|
|@Target|	用于描述注解的使用对象|
|@Retention|	表示注解类型的存活时长|
|@Documented|	表示含有该注解类型的元素(带有注释的)会通过javadoc或类似工具进行文档化|
|@Inherited|	表示注解类型能被自动继承|

位于  java.lang.annotation 下

## @Targe
**用于描述注解的使用对象**

value取值为java.lang.annnotation.RetentionPolicy 枚举的成员之一

|ElementType|作用|
|---|---|
| ANNOTATION_TYPE|注解类型声明|
| CONSTRUCTOR|构造方法声明|
| FIELD| 字段声明（包括枚举常量）|
| LOCAL_VARIABLE| 局部变量声明|
| METHOD| 方法声明|
| PACKAGE| 包声明|
| PARAMETER|参数声明|
| TYPE| 类、接口（包括注解类型）或枚举声明|

默认策略 , 可作用于任意对象
## @Retention

**定义了该Annotation被保留的时间长短**

value取值为java.lang.annnotation.ElementType 枚举的成员之一

|RetentionPolicy|	含义|
|---|---|
|SOURCE	| 源文件有效|
|CLASS	| Class字节码文件有效|
|RUNTIME	| 运行时有效 , 可通过反射性地读取注解|

默认保留策略为RetentionPolicy.CLASS

## @Documented

**当前注解的元素会被javadoc工具进行文档化**

## @Inherited

**表示该注解类型被自动继承**

# 系统内置标准注解：

|内建注解 | 类型 |作用|Target	|Retention|
|---|---|---|---|---|
|Override| 标记注解 |修饰此方法覆盖了父类的方法	|METHOD	|SOURCE|
|SuppressWarnings| 标记注解 |修饰已经过时的方法	|除ANNOTATION_TYPE和PACKAGE外的所有|	SOURCE|
|Deprecated| 单值注解 |压制提醒 , 抑制编译器警告	|除ANNOTATION_TYPE外的所有	|RUNTIME|

## @Override
**告诉编译器该方法覆盖了超类/父类中的一个方法**

## @Deprecated
**应用于方法或类型 , 表示该方法或类型是要废弃的**

>通常是因为有更好的方法或类型 , 并且兼容低版本

## @SuppressWarnnings

 **抑制编译器警告**

### @SuppressWarnings(value={})注解的常见参数值的简单说明：
|参数值 |说明 |
|---|---|
|deprecation | 使用了不赞成使用的类或方法时的警告|
|unchecked | 执行了未检查的转换时的警告，例如当使用集合时没有用泛型 (Generics) 来指定集合保存的类型|
|fallthrough | 当 switch 程序块 case 直接通往下一种情况而没有 break 时的警告|
|path | 在类路径、源文件路径等中有不存在的路径时的警告|
|serial | 当在可序列化的类上缺少 serialVersionUID 定义时的警告|
|finally | 任何 finally 子句不能正常完成时的警告|
|all | 关于以上所有情况的警告|

# 自定义注解

**一个注解类型是一个java接口**

```java
@Inherited
@Retention
@Documented
@Target(value=ANNOTATION_TYPE)
public @interface CustomAnnotation ( ) {

}
```
# 使用反射来查询注解
java.lang.Class

## 如果存在，返回指定注解类型的注解；不存在则返回null
```java
public <A extends java.lang.annotation.Annotation> A  getAnnotation ( Class<A> annotationClass )
```
## 返回该类中所有注解
```java
public java.lang.annotation.Annotation[] getAnnotations ( )
```
## 判断该类是不是一个注解类型
```java
public boolean isAnnotation()
```
## 判断指定类型的一个注解是否出现在该类上
```java
public boolean isAnnotationPressent( Class<? extends java.lang.annotation.Annotation> annotationClass)
```

# 参考
- [《深入理解Java：注解》 cwcwj3069 - CSDN博客 ](http://blog.csdn.net/cwcwj3069/article/details/52252670)
- [《注解的基本盘点》 墨迹修 - 博客园博客 ](http://www.cnblogs.com/kgrdomore/p/5806321.html)
- [《Java注解(Annotation)》 Gityuan - 个人博客 ](http://gityuan.com/2016/01/23/java-annotation/)
- [《Java 注解》 Developer_Kale - 博客园博客  ](http://www.cnblogs.com/tianzhijiexian/p/4807813.html)
- 《Java 和 Android 开发学习指南》 （第2版）， [加] Budi Kurniawan 著 ，李强 译  ，人民邮电出版社 2016-3
