# CORS

跨域资源共享 ，Cross-Origin Resource Sharing ，简称 CORS。

使用 XMLHttpRequest 对象和Fetch发起 HTTP 请求就必须遵守同源策略，CORS 是HTML5 的跨域解决方案。

了解更多，参阅：[https://www.w3.org/TR/cors/](https://www.w3.org/TR/cors/)

## 关于跨域请求

理解上，跨域请求不是被服务器拒绝，而是**返回结果被浏览器拦截**了，被拒绝的结果可以在浏览器的开发者工具中查看。

其它，有些浏览器不允许从HTTPS的域跨域访问HTTP，比如Chrome和Firefox，会在请求发出前拦截。

常用的跨域请求场景是：使用 XMLHttpRequest 或 Fetch发起跨站 HTTP 请求。

## CORS 过程理解

首先明确，**CORS 的关键是服务器**。

最简单的过程：

1. 浏览器发送 CORS 请求，在 header 中添加一个 `Origin` 字段，其值为请求源（协议+地址+端口）
2. 服务器响应，并在 header 中添加 `Access-Control-Allow-Origin` 字段
3. 浏览器接收，判断 header 来确定是否拦截

## CORS 请求

浏览器将 CORS 请求分为两类，简单请求和预请求。

### 简单请求

简单请求的定义：

- 只使用 GET, HEAD 或者 POST 请求方法。
- 使用 POST  请求时，数据类型(Content-Type)只能是 application/x-www-form-urlencoded, multipart/form-data 或 text/plain中的一种。
- 不会使用自定义请求头


简单请求的响应就是最简单的过程，通过使用 Origin 和 Access-Control-Allow-Origin 就可以完成最简单的跨站请求。

### 预请求

预请求就是非简单请求。

预请求的重点是必须发送一个 `OPTIONS ` 请求，来确定是否支持 CORS。浏览器确认之后，才会发送正式请求。原因是会对服务器的数据造成破坏。

**请求过程：**

发送一个 `OPEIONS` 请求。一同发送的还包括三个请求头：

- Origin - 源地址
- Access-Control-Request-Method - 跨域请求的 HTTP 方法列表
- Access-Control-Request-Headers - 跨域请求将发送的自定义头信息

服务器处理请求，返回响应。并且返回了相应的响应头：

- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers
- Access-Control-Allow-Credentials
- Access-Control-Max-Age

之后的正常请求，与简单请求相同。

## HTTP 请求头

### Origin
请求的源地址，包含请求的协议，地址，以及端口

不限于 CORS 请求，普通请求也会携带

当 Origin 的值为 null 时，表示请求地址为本地

### Access-Control-Request-Method
在发送预请求中携带

告诉服务器在正式请求时使用的 HTTP 方法

### Access-Control-Request-Headers
在发送预请求中携带

告诉服务器在正式请求时会携带的自定义头信息。

多个值，使用逗号分开

## HTTP 响应头

### Access-Control-Allow-Origin

服务器响应的响应

允许请求的 URL

当值为 `*` 时，接受任意地址的请求

### Access-Control-Expose-Headers

允许请求的自定义头

### Access-Control-Max-Age

预请求结果的有效期，在有效期内，发送非简单请求，不需要再发送预请求。

### Access-Control-Allow-Credentials

是否允许发送 Cookie和HTTP认证信息

首先，在请求中设置
```javascript
xhr.withCredentials = true;
```
使得 Cookies 能随请求一同发送

服务器接收响应，在响应头中包含 `Access-Control-Allow-Credentials: true` 。

如果响应头中没有该字段，浏览器会把响应结果丢弃，保证信息安全。

**特别注意：**

发送 Cookie 时，必须指定允许请求的域名。

不能设置为
```
Access-Control-Allow-Origin: * 
```
### Access-Control-Allow-Methods

在预请求的响应中携带

在正式请求时可使用的 HTTP 方法

### Access-Control-Allow-Headers

在预请求的响应中携带

在正式请求时可使用的自定义HTTP请求头


## 在服务器端支持 CORS

相关信息，参阅 [enable cross-origin resource sharing](https://enable-cors.org/index.html)

### 在 tomcat 中设置 CORS

在项目的 web.xml 中添加过滤器：

```xml
<filter>
  <filter-name>CorsFilter</filter-name>
  <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
</filter>
<filter-mapping>
  <filter-name>CorsFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

更多参数，请看 [http://tomcat.apache.org/tomcat-7.0-doc/config/filter.html#CORS_Filter](http://tomcat.apache.org/tomcat-7.0-doc/config/filter.html#CORS_Filter)

### 在 nginx 中设置 CORS 

请直接参阅，[https://enable-cors.org/server_nginx.html](https://enable-cors.org/server_nginx.html)

### 在 java web 项目中自定义 CORS 过滤器

一个简单的 CORS 过滤器
```java
package com.x.filter;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class SimpleCORSFilter implements Filter {

    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
        chain.doFilter(req, res);
    }

    public void init(FilterConfig filterConfig) {}

    public void destroy() {}

}
```

记得在 web.xml 中配置

```xml
  <!--CORS 过滤器-->
  <filter>
    <filter-name>CORSFilter</filter-name>
    <filter-class>com.x.filter.SimpleCORSFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>CORSFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

## 参考
- [https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)。
- [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
- [https://www.w3.org/TR/cors/](https://www.w3.org/TR/cors/)

