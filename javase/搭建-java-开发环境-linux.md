## 安装 JDK

1. 下载压缩包

    - 地址：http://www.oracle.com/technetwork/java/javase/downloads/index.html

2. 解压到 `/usr/local/jdk`

3. 配置环境变量

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

## 安装 Tomcat

1. 下载压缩包

    - 地址：http://tomcat.apache.org/

2. 解压到 `/usr/local/tomcat`

## 安装 IDEA

1. 下载安装包

    - 地址：https://www.jetbrains.com/idea/

2. 解压到 `/opt`

3. 运行 `/bin/idea.sh`

## 安装 DataGrip

1. 下载安装包

    - 地址：https://www.jetbrains.com/datagrip

2. 解压到 `/opt`

3. 运行 `/bin/DataGrip.sh`
