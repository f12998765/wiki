# Spring MVC 中文乱码

摘要至：[passport_daizi](http://blog.csdn.net/kalision/article/details/46441081/)


**jsp 页面设置**

```java
<%page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8" %>
```


**表单提交的方式必须是 Post  ，get Sprng的编码过滤器不起效果**

```html
<form action="" name="aform" method="post" >
```
**
在 web.xml 中添加编码过滤器,放在首个过滤器**

> forceEncoding=true  无论请求中是否包含编码，都是用过滤器的编码解析

```xml
<filter>  
        <filter-name>characterEncodingFilter</filter-name>  
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>  
        <init-param>  
            <param-name>encoding</param-name>  
            <param-value>UTF-8</param-value>  
        </init-param>  
        <init-param>  
            <param-name>forceEncoding</param-name>  
            <param-value>true</param-value>  
        </init-param>  
    </filter>  
    <filter-mapping>  
        <filter-name>characterEncodingFilter</filter-name>  
        <url-pattern>/*</url-pattern>  
    </filter-mapping>  
</filter>
```

**连接数据库的参数设置**

```xml
<property name="url" value="jdbc:mysql://localhost:3306/database?useUnicode=true&characterEncoding=UTF-8"></property>
```

**数据库的编码**

`utf8_general_ci`
