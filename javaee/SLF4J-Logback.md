# SLF4J - - Simple Logging Facade for Java

官网：[https://www.slf4j.org/](https://www.slf4j.org/)

## Hello World

```java
public class Slf4jTest {  
    static private Logger logger = LoggerFactory.getLogger(Slf4jTest.class);  
    public static void main(String[] args) {  
        logger.info("Hello World {}","!")  
    }  
}  
```
更多推荐阅读 ：

- [门面之下，日志之上-SLF4J](https://my.oschina.net/wangxindong/blog/825066)
- [并发编程网](http://ifeve.com/?x=0&y=0&s=slf4j)

# Logback
官网：[https://logback.qos.ch/](https://logback.qos.ch/)

logback分为三个模块

- logback-core
    - 为其他两个模块打下了基础
- logback-classic
    - 可以被看做个有显著改进的log4J
    - 实现了 SLF4J API
- logback-access
    - ​​与Servlet容器（例如Tomcat和Jetty）集成，以提供HTTP访问日志功能

## 日志级别

原地址：[https://zh.wikipedia.org/wiki/Log4j](https://zh.wikipedia.org/wiki/Log4j)

常用级别由低到高，依次为 Trace < Debug < Tnfo < Warn < Error 

|级别|描述|
|---|---|
|OFF|	最高级别，用于关闭日志记录。|
|FATAL|	导致应用程序提前终止的严重错误。一般这些信息将立即呈现在状态控制台上。|
|ERROR|	其他运行时错误或意外情况。一般这些信息将立即呈现在状态控制台上。|
|WARN|	使用已过时的API，API的滥用，潜在错误，其他不良的或意外的运行时的状况（但不一定是错误的）。一般这些信息将立即呈现在状态控制台上。|
|INFO|	令人感兴趣的运行时事件（启动/关闭）。一般这些信息将立即呈现在状态控制台上，因而要保守使用，并保持到最低限度。|
|DEBUG|	流经系统的详细信息。一般这些信息只记录到日志文件中。|
|TRACE|	最详细的信息。一般这些信息只记录到日志文件中。|

## logback.xml 配置

![](https://ox.xizero.com/uploads/2017/02/Logback.xml.svg)

## 使用
###  1.pox.xml 添加依赖 
仓库地址：[https://mvnrepository.com/artifact/ch.qos.logback/logback-classic](https://mvnrepository.com/artifact/ch.qos.logback/logback-classic)

```
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.1</version>
</dependency>
<!-- 使用求值表达式过滤，需要添加 janino 依赖-->
<dependency>
    <groupId>org.codehaus.janino</groupId>
    <artifactId>janino</artifactId>
    <version>3.0.6</version>
</dependency>

```
### 2.src/main/resource添加logback.xml
参考：[logback.xml](https://gist.githubusercontent.com/f12998765/28613af391c72c8c8ba47a0cef3f8250/raw/d1af5d48490308dd80645f9721e1af2b7cd6f69f/logback.xml)
```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
        <!-- 项目名称 -->
        <contextName>Test contextName</contextName>

        <!-- 变量 -->
        <property name="log" value="./log"/>

        <!-- 时间戳 -->
        <timestamp key="bySecond" datePattern="yyyyMMdd" timeReference="contextBirth"/>

        <!-- 在控制台打印日志 -->
        <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">

                <!-- 级别过滤器 -->
                <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
                        <level>DEBUG</level>
                        <onMatch>ACCEPT</onMatch>
                        <onMismatch>NEUTRAL</onMismatch>
                </filter>

                <!-- 临界值过滤器 -->
                <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
                        <level>INFO</level>
                        <onMatch>ACCEPT</onMatch>
                        <onMismatch>DENY</onMismatch>
                </filter>


                <!-- 求值过滤器 -->
                <filter class="ch.qos.logback.core.filter.EvaluatorFilter">
                        <evaluator>
                                <matcher>
                                        <name>num</name>
                                        <regex>\ba\w*\b</regex>
                                </matcher>
                                <expression> num.matches(formattedMessage) </expression>
                        </evaluator>
                        <onMatch>ACCEPT</onMatch>
                        <onMismatch>DENY</onMismatch>
                </filter>

                <encoder>
                        <!-- pattern模式 %d时间 %thread 线程名 %level行为级别 %logger logger名称 %method 方法名称 %message 调用方法的入参消息 -->
                        <pattern>%-4d [%thread] %highlight%-5level %cyan%logger.%-10method - %message%n</pattern>
                </encoder>
        </appender>

        <!-- FileAppender 输出到文件 -->
        <appender name="FILE" class="ch.qos.logback.core.FileAppender">

                <file>${log}/log-${bySecond}.log</file>

                <encoder>
                        <pattern>%date %level [%thread] %logger{30} [%file:%line] %msg%n</pattern>
                </encoder>
        </appender>


        <!-- 滚动记录日志文件 -->
        <!-- 按时间滚动 -->
        <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
                <file>${log}/test_log.log</file>
                <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                        <!-- daily rollover -->
                        <fileNamePattern>${log}/log.%d{yyyy-MM-dd}.log</fileNamePattern>

                        <!-- keep 30 days' worth of history capped at 3GB total size -->
                        <maxHistory>30</maxHistory>
                        <totalSizeCap>3GB</totalSizeCap>
                </rollingPolicy>

                <encoder>
                        <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
                </encoder>
        </appender>

        <!-- Size and time based rolling policy -->
        <appender name="ROLLING" class="ch.qos.logback.core.rolling.RollingFileAppender">
                <file>${log}/test_log.log</file>
                <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
                        <!-- rollover daily -->
                        <fileNamePattern>${log}/log.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
                        <!-- each file should be at most 100MB, keep 60 days worth of history, but at most 20GB -->
                        <maxFileSize>100MB</maxFileSize>    
                        <maxHistory>60</maxHistory>
                        <totalSizeCap>20GB</totalSizeCap>
                </rollingPolicy>
                <encoder>
                        <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
                </encoder>
        </appender>

        <!-- 按窗口滚动 -->
        <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
                <file>${log}/test_log.log</file>

                <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
                        <fileNamePattern>${log}/log.%i.log.zip</fileNamePattern>
                        <minIndex>1</minIndex>
                        <maxIndex>3</maxIndex>
                </rollingPolicy>

                <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
                        <maxFileSize>5MB</maxFileSize>
                </triggeringPolicy>

                <encoder>
                        <pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
                </encoder>
        </appender>


        <!-- logger -->
        <logger name="log.test" level="INFO" additivity="false">
                <appender-ref ref="STDOUT"/>
                <appender-ref ref="ROLLINGFILE"/>
                <appender-ref ref="HTMLFILE"/>
        </logger>

        <logger name="log.test.Tesg" level="debug" additivity="false">
                <appender-ref ref="STDOUT"/>
                <appender-ref ref="ROLLINGFILE"/>
                <appender-ref ref="HTMLFILE"/>
        </logger>

        <root level="debug">
                <appender-ref ref="STDOUT"/>
        </root>

</configuration>
```

## 备注

### 时间滚动

TimeBasedRollingPolicy 最常用的滚动策略，它根据时间来制定滚动策略，既负责滚动也负责触发滚动

### 日期相关

|符号|意义|
|---|---|
|G|年代标志符|
|y|年|
|M|月|
|d|日|
|h|时 在上午或下午 (1~12)|
|H|时 在一天中 (0~23)|
|m|分|
|s|秒|
|S|毫秒|
|E|星期|
|D|一年中的第几天|
|F|一月中第几个星期几|
|w|一年中第几个星期|
|W|一月中第几个星期|
|a|上午 / 下午 标记符 |
|k|时 在一天中 (1~24)|
|K|时 在上午或下午 (0~11)|
|z|时区|

### 0.9.19版本之后，推荐使用encode
原因： [https://logback.qos.ch/codes.html#layoutInsteadOfEncoder](https://logback.qos.ch/codes.html#layoutInsteadOfEncoder)

### Size and time based rolling policy
原地址：[https://logback.qos.ch/manual/appenders.html#SizeAndTimeBasedFNATP](https://logback.qos.ch/manual/appenders.html#SizeAndTimeBasedFNATP)
```xml
<configuration>
  <appender name="ROLLING" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>mylog.txt</file>
    <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
      <!-- rollover daily -->
      <fileNamePattern>mylog-%d{yyyy-MM-dd}.%i.txt</fileNamePattern>
       <!-- each file should be at most 100MB, keep 60 days worth of history, but at most 20GB -->
       <maxFileSize>100MB</maxFileSize>    
       <maxHistory>60</maxHistory>
       <totalSizeCap>20GB</totalSizeCap>
    </rollingPolicy>
    <encoder>
      <pattern>%msg%n</pattern>
    </encoder>
  </appender>
  <root level="DEBUG">
    <appender-ref ref="ROLLING" />
  </root>
</configuration>
```

## 参考
- [细说Java主流日志工具库](http://www.cnblogs.com/jingmoxukong/p/5910309.html)
- [门面之下，日志之上-SLF4J](https://my.oschina.net/wangxindong/blog/825066)
- [并发编程网](http://ifeve.com/?x=0&y=0&s=slf4j)
- [LogBack学习记录](http://blog.csdn.net/huozhonbin/article/category/1656017)
- [logback系列](http://czj4451.iteye.com/blog/1974831)
- [aubdiy - log](http://aub.iteye.com/category/161103)
