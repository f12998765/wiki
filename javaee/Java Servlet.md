# Java Servlet

## 什么是 Java Servlet ?

维基百科：[https://zh.wikipedia.org/wiki/Java_Servlet](https://zh.wikipedia.org/wiki/Java_Servlet)

[Java Platform, Enterprise Edition: The Java EE Tutorial](https://docs.oracle.com/javaee/7/tutorial/servlets.htm#BNAFD)

A servlet is a Java programming language class used to extend the capabilities of servers that host applications accessed by means of a request-response programming model.

Java Servlet 是 Java 应用程序 ，运行在服务器端，由容器进行管理，生成动态内容。 

虽然 servlet 可以响应任何类型的请求，但通常用于web容器，Java Servlet 定义了对 Http 的特定 servlet 类。

javax.servlet和javax.servlet.http包提供了用于编写servlet的接口和类。 所有servlet必须实现Servlet接口，它**定义了生命周期方法**。 当实现通用服务时，可以使用或扩展Java Servlet API提供的GenericServlet类。 HttpServlet类提供了用于处理特定于HTTP的服务的方法，例如doGet和doPost。

## Servlet 的生命周期

Servlet 的生命周期由 servlet 容器控制。

当一个请求映射到servlet，容器执行

1. 如果servlet的实例不存在，则web容器：
    - 加载servlet类
    - 创建servlet类的实例
    - 通过调用初始化servlet实例**init方法**
2. 容器调用**service方法**，判断请求方式，传递请求和响应对象

如果需要删除该servlet，容器通过调用servlet的**destroy方法**

## Servlet 核心类

Java EE API : [https://docs.oracle.com/javaee/7/api/](https://docs.oracle.com/javaee/7/api/)

## 创建

使用注解 @WebServlet( "url " ) , url 是 servlet 的路径映射 ，必须是唯一的 ，使用该注解必须继承 HttpServlet 

也可以在 web.xml 中配置

```java
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet（“/ test”）
public class ModlServlet extends HttpServlet {
    ... ...
}
```








