# 搭建 Java 开发环境 win

## 安装JDK
- JDK
    - Java Development Kit
    - 开发工具包和运行环境
- JRE
    - Java Runtime Environment
    - 程序的运行环境

1、下载页面 &lt;[下载链接](http://www.oracle.com/technetwork/java/javase/downloads/index.html)&gt;

2、选择对应系统的java 开发工具包下载 **Java SE Development Kit**

3、运行安装程序，默认安装

## 配置环境变量

### 打开
```
控制面板 --> 系统和安全 --> 系统 --> 高级系统设置 --> 环境变量
```
> **如果使用1.5以上版本的JDK，不用设置CLASSPATH环境变量**

### 设置变量

- JAVA\_HOME
    - C:\Program Files\Java\jdk1.8.0 //根据实际路径配置
	
- Path
    - %JAVA\_HOME%\bin;
    - %JAVA\_HOME%\jre\bin;
	
### 验证

**win+R --> 输入cmd --> 运行命令**

```bash
# 加载类库，运行.class文件
java 
# 编译.java文件，生成.Class文件
javac 
# 查看版本
java -version
```
## IntelliJ IDEA

[官网](https://www.jetbrains.com/idea/)

学习 java se ，使用社区版（Community）就可以了。

如果是学生，可以申请学生授权，<[官方解答](https://sales.jetbrains.com/hc/zh-cn/articles/207154369-%E5%AD%A6%E7%94%9F%E6%8E%88%E6%9D%83%E7%94%B3%E8%AF%B7%E6%96%B9%E5%BC%8F)>。

> 如果没有校园邮箱或ISIC国际学生证，可以拍照发送学生证。

一份很好的 IDEA 教程 ：[https://github.com/judasn/IntelliJ-IDEA-Tutorial/](https://github.com/judasn/IntelliJ-IDEA-Tutorial/)
 
## Maven

很棒的项目构建工具

[Apache Maven](https://maven.apache.org/)

[Maven Repository](https://mvnrepository.com/)

### 安装

下载解压，配置环境变量
- MAVEN_HOME
- Path
    - %MAVEN_HOME%\bin

### 修改配置文件

路径
```
apache-maven-*\conf\settings.xml
```
大概 55 行左右添加，设置本地仓库路径
```xml
<localRepository>d:/m2/repository</localRepository>
```
大概 55 行左右添加，设置远程仓库镜像
```xml
<mirror>
	<id>nexus-aliyun</id>
	<mirrorOf>*</mirrorOf>ben
	<name>Nexus aliyun</name>
	<url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```
## Tomcat
[Apache Tomcat](http://tomcat.apache.org/)
下载安装或解压

## Mysql
因为 MySQL 太耗资源，可以在云服务器上使用 docker 建个远程数据库
### 安装 docker
服务器是 ubuntu,使用脚本安装[
[daocloud.io](https://get.daocloud.io/)
```
 curl -sSL https://get.daocloud.io/docker | sh
```
国内镜像地址，[灵雀云](https://hub.alauda.cn/)

### 安装 Mysql
灵雀云 mysql 地址 : [library>mysql](https://hub.alauda.cn/repos/library/mysql)
下载 mysql 镜像
```
docker pull registry.alauda.cn/library/mysql
```
创建，运行容器

> MYSQL_ROOT_PASSWORD 设置root密码

```bash
docker run --name mysql -v /home/eastren/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 registry.alauda.cn/library/mysql
```
进入容器
```
 sudo docker exec -it  mysql  /bin/bash  
```
创建远程连接用户
```bash
grant all privileges on *.* to 'username' @'%' identified by 'password';
# 刷新
flush privileges;
```
### 本地连接

可以随便选择，数据库图形管理软件

推荐：[HeidiSQL - MySQL, MSSQL and PostgreSQL made easy](http://www.heidisql.com/)

下载安装，数据库连接地址是云服务器公网 ip


