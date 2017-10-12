# Java 异常

## 定义
编译错误和运行时错误

图中红色部分为受检查异常。它们必须被捕获，或者在函数中声明为抛出该异常。

Throwable 是所有异常的基类。
Error 异常不会检查捕获，一旦产生，程序直接终止
Exception 是通常抛出的异常。

![](https://ox.xizero.com/uploads/2017/03/ _3_.jpeg)


## 捕获异常
```java
try {
//会产生异常的代码
} catch (Exception e){
//处理异常的代码
}
finally {
//不管是否产生异常都会执行的代码
}
```

## 捕获多个异常
1.7 支持单一的catch语句中捕获多个异常，每个异常之间使用管道符号 `|`隔开
```java
catch (excepetion-1 | exception-2 ... e) {
    // 相同的处理代码
}
catch (excepetion-n e) {
    //其他的处理代码
}
```
## try - finally

```java
try {
//会产生异常的代码
}
finally {
//不管是否产生异常都会执行的代码
}
```
如果异常产生，直接执行finally 语句块，并且，抛出异常，所以**需要在方法名参数之后使用 throws**。

## try-with-resource
1.7 之前的关闭资源时，会使用 finally ，但是关闭时产生异常会嵌套很多层。
1.7 添加 try-with-resource 语句，但是只用实现了 java.lang.AutoCloseable 的类才能关掉。

```java
//try ( resource ) { }
try (Statement stmt = con.createStatement()) { }
```
## java.lang.Exception
Exception 覆盖了 toString () , 返回对异常的说明。
printStackTrace 方法 对 Exception 追踪，打印出对异常的描述。

catch 语句的顺序很重要，JVM 根据其顺序来匹配异常，Exception 的 catch 语句必须放在最后。

### throw 和 throws
throw : 用于抛出一个异常对象，出现在函数体内。程序在throw语句之后结束。
throws：用于方法名参数之后，表示该方法可能抛出异常的类型。

### 自定义异常
通过继承异常类，可以自定义异常。通过throw来抛出自定义异常。

### 常见的面试题

try 块中的语句，一旦抛出异常，之后的都不会执行

catch 中的异常类型，从上到下，由特殊到一般，由子类到父类。

finally 块中的语句不管异常是否出现捕获，不管是否存在 return ，都会执行。

关于 return 的顺序：
- [关于Java中try-catch-finally-return的执行顺序](http://qing0991.blog.51cto.com/1640542/1387200)
-  [try catch finally，try里有return，finally还执行么？](https://github.com/HotBitmapGG/AndroidInterview/blob/master/java/%5BJava%5D%20try%20catch%20finally%EF%BC%8Ctry%E9%87%8C%E6%9C%89return%EF%BC%8Cfinally%E8%BF%98%E6%89%A7%E8%A1%8C%E4%B9%88%EF%BC%9F.md)

我的总结：
1. try 中有 return ，不管是否有异常 ：try - ( catch ) - finally - return

2. try 和 finally 中都有 return ，finally 中的return 会覆盖其他位置的。

3. 如果 catch 中有 return num，而在 finally 中对 num 修改，且没有return，返回的是catch 时的值；如果 finally 还有return ，返回修改后的num。

## 常见异常
- NullPointerException 空指针
- ClassNotFoundException  找不到类
- ClassCastException   类型转换
- ArithmeticException   算数条件
- ArrayIndexOutOfBoundsException  数组越界

## Java 异常表

详见：[http://blog.csdn.net/silentbalanceyh/article/details/4549128](http://blog.csdn.net/silentbalanceyh/article/details/4549128)


