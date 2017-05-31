# Java 开发环境搭建手册

## Notepad++
官网：[https://notepad-plus-plus.org/](https://notepad-plus-plus.org/)

## Git for Windows
官网：[https://git-scm.com/](https://git-scm.com/)

### 安装
添加快捷方式到桌面

添加 git bash 到右键菜单

### 更换主题
网址：[http://ciembor.github.io/4bit/](http://ciembor.github.io/4bit/)

编辑用户目录下的 .minttyrc 文件

```bash
BoldAsFont=-1
Columns=99
Rows=33
Font=Lucida Console
FontHeight=12
BackgroundColour=13,25,38
ForegroundColour=217,230,242
CursorColour=217,230,242
Black=0,0,0
BoldBlack=38,38,38
Red=184,122,122
BoldRed=219,189,189
Green=122,184,122
BoldGreen=189,219,189
Yellow=184,184,122
BoldYellow=219,219,189
Blue=122,122,184
BoldBlue=189,189,219
Magenta=184,122,184
BoldMagenta=219,189,219
Cyan=122,184,184
BoldCyan=189,219,219
White=217,217,217
BoldWhite=255,255,255
Locale=C
Charset=GBK
```
### 配置文件
配置用户名和邮箱
```bash
git config --global user.name "[name]"
git config --global user.email "[email]"
git config --global color.ui true
```
打印全局配置
```bash
git config --list
```
### SSH key
检查用户目录下是否存在隐藏文件夹 .ssh
```bash
cd ~/.ssh
```
生成SSH Key，在 `.ssh/id_rsa.pub` 中
```bash
ssh-keygen -t rsa -C "your_email"
```
在 Github 中添加，并测试
```bash
ssh -T git@github.com
```
## GitKraken

官网：[https://www.gitkraken.com/](https://www.gitkraken.com/)

## Visual Studio Code
官网：[https://code.visualstudio.com/](https://code.visualstudio.com/)

## JDK
官网：[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

### windows
运行程序安装，并配置环境变量

- JAVA\_HOME
- Path
    - %JAVA\_HOME%\bin;
    - %JAVA\_HOME%\jre\bin;

### linux
解压到 `/user/local/jdk`

配置环境变量
```bash
vi /etc/profile

# 在文件末尾添加
export JAVA_HOME=/usr/locl/jdk/**
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib/tools.jar:${JRE_HOME}/lib/dt.jar
export PATH=${JAVA_HOME}/bin:${JAVA_HOME}/jre/bin:$PATH

# 使配置生效
source /etc/profile
```
## Tomcat
官网：[http://tomcat.apache.org/](http://tomcat.apache.org/)

windows 解压到 `C:\Program Files\Apache Software Foundation`

linux 解压到 `/usr/local/tomcat`

## Maven
官网：[https://maven.apache.org/](https://maven.apache.org/)

Maven Repository：[Maven Repository](https://mvnrepository.com/)

### 安装配置
1. 解压到 `C:\Program Files\Apache Software Foundation` 下，重命名为 Maven
2. 配置环境变量
    - MAVEN_HOME
    - Path
        - %MAVEN_HOME%\bin
3. 修改配置文件 `conf/setting.xml`

设置本地仓库
```xml
<localRepository>d:/m2/repository</localRepository>
```
设置远程仓库镜像
```xml
<mirror>
	<id>nexus-aliyun</id>
	<mirrorOf>*</mirrorOf>ben
	<name>Nexus aliyun</name>
	<url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```

## InteLiJ IDEA
官网：[https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)

### 安装

windows 直接运行程序

linux 解压到 `/opt` ,运行 `./bin/idea.sh`

配置时注意 Maven

### Generating Project in Batch mode

IDEA新建MAVEN项目卡住显示 : "Generating Project in Batch mode"

1. 打开 [http://repo.maven.apache.org/maven2/](http://repo.maven.apache.org/maven2/)，找到 `archetype-catalog.xml` ,右键保存
2. 或者点击 -->  [http://d.xizero.com/archetype-catalog.xml](http://d.xizero.com/archetype-catalog.xml)
3. 放到 "\.m2\repository\org\apache\maven\archetype\archetype-catalog\2.4" 下
4. 在 Idea  `Settings `> `Maven` > `Runner` > `VM Options` 中添加 `-DarchetypeCatalog=internal`
5. PS：注意右上角的灰字：for default project，而不是for current project

## DataGrip

官网：[https://www.jetbrains.com/datagrip](https://www.jetbrains.com/datagrip)

windows 直接运行程序

linux 解压到 `/opt` ,运行 `./bin/DataGrip.sh`

## HeidiSQL

官网：[https://www.heidisql.com/](https://www.heidisql.com/)

## Docker

### 安装

使用 [daocloud.io](https://get.daocloud.io) 的脚本安装

```bash
curl -sSL https://get.daocloud.io/docker | sh
```
### 配置 ustc mirror

[ustc docker 镜像使用帮助](https://lug.ustc.edu.cn/wiki/mirrors/help/dockerc)

```bash
$ sudo echo "DOCKER_OPTS=\"--registry-mirror=https://docker.mirrors.ustc.edu.cn\"" >> /etc/default/docker
$ sudo service docker restart
```

## Mysql

在云服务器上运行 docker mysql 容器

MySQL docker hub: [https://hub.docker.com/_/mysql/](https://hub.docker.com/_/mysql/)

```bash
docker pull mysql
```

创建，运行容器

> MYSQL_ROOT_PASSWORD 设置root密码

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql
```

进入容器
```
 sudo docker exec -it  mysql  /bin/bash  
```

创建远程连接用户
```bash
grant all privileges on *.* to 'username' @'%' identified by 'password';
flush privileges; # 刷新
```
