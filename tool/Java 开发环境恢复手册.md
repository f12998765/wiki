# Java 开发环境恢复手册

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
## Source Tree
官网：[https://www.sourcetreeapp.com/](https://www.sourcetreeapp.com/)

### 安装配置
1. 跳过默认设置
2. 使用系统Git
3. 添加 SSH key 

## Hugo
官网：[https://gohugo.io/](https://gohugo.io/)

下载地址：[https://github.com/spf13/hugo/releases](https://github.com/spf13/hugo/releases)

### 安装

1. 解压，重命名为 hugo.exe ，放在 `D:/Software/hugo/bin/` 下
2. 配置环境变量 Path

## Visual Studio Code
官网：[https://code.visualstudio.com/](https://code.visualstudio.com/)

## JDK
官网：[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

### 配置环境变量
- JAVA\_HOME
- Path
    - %JAVA\_HOME%\bin;
    - %JAVA\_HOME%\jre\bin;

## Tomcat
官网：[http://tomcat.apache.org/](http://tomcat.apache.org/)

解压到 `C:\Program Files\Apache Software Foundation`

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

### 配置
1. 登陆激活
2. 去掉不需要的插件
3. 设置默认设置
    - 设置默认Maven

### IDEA新建MAVEN项目卡住显示 : "Generating Project in Batch mode"

1. 下载 `archetype-catalog.xml`  - -  [http://repo.maven.apache.org/maven2/](http://repo.maven.apache.org/maven2/)，找到 `archetype-catalog.xml` ,右键保存
2. 放到 "\.m2\repository\org\apache\maven\archetype\archetype-catalog\2.4" 下
3. 在 `Settings `> `Maven` > `Runner` > `VM Options` 中添加 `-DarchetypeCatalog=internal`
4. PS：注意右上角的灰字：for default project，而不是for current project