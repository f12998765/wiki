# Java 概述

## Java 编程语言

Java 是一种面向对象的高级语言。

源代码文件是以`.java`为扩展名的纯文本文件，经过 javac 编译器编译成包含字节码的 `.class` 文件，它在 Java 虚拟机 ( `JVM` ) 上运行。

## Java 平台

Java 平台是纯软件平台，包含：
- Java 虚拟机
- Java API ( The Java Application Programming Interface )


## Java 技术体系

JAVASE：`Java Platform Standard Edition`，完成桌面应用程序的开发，是其它两者的基础;

JAVAEE：`Java Platform Enterprise Edition`，开发企业环境下的应用程序，主要针对web程序开发;

JAVAME：`Java Platform Micro Edition`，开发电子消费产品和嵌入式设备，如手机中的程序。

## Hello Java !

参考 [《Java 开发环境搭建手册》](https://wiki.xizero.com/#/tool/Java 开发环境搭建手册) 安装 JDK 和 notepad++。

创建一个源代码文件 `Main.java` ，键入代码，注意大小写，编码为 `ANSI` 。
```java
/**
 * 打印 Hello Java !
 */
class Main{
    public static void main(String [] args){
        System.out.printf("Hello Java !");
    }
}
```
在源文件目录，打开终端，键入如下命令。
```bash
# 编译生成 .class 文件
javac Main.java
# 运行
java -cp Main
```

## 入门基础

### 代码注释

代码注释会被编译器忽略，java 支持三种注释，行注释、段注释、文档注释。

```java
/**
 * 打印 Hello Java ! (文档注释)
 */
class Main{
    public static void main(String [] args){
        System.out.printf("Hello Java !"); // 输出 Hello Java ! (行注释)
        /*System.out.printf("Hello Java !"); (段注释)*/ 
    }
}
```

### 类的基本定义



```java
class name {
    // 代码
}
```
### Main 方法

每一个应用程序许都需要一个 Main 方法，它是程序运行的起点。

```java
public static void main (String [] args)
```

public 和 static 是修饰符，位置可以随意调换。

args 是方法的参数，可以随意命名，是一个 String 数组，运行时向下面这样传入值。

```bash
java Main arg1 arg2
```



