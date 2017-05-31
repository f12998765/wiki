# Centos 配置

## SSH 配置修改
```bash
#修改ssh配置
vim /etc/ssh/sshd_config

#使用第二代通讯协定
Protocol 2

#不容许空白密码
PermitEmptyPasswords no

#禁止root 使用SSH 登入
PermitRootLogin no

#重新启动sshd
systemctl restart sshd.service
```

## 更新系统和软件

```bash
yum update && yum upgrade
```

## 创建用户赋予权限

```bash
#创建用户，修改密码
useradd [username]
passwd [username]

#修改权限
EDITOR=nano visudo
#修改 %wheel ALL=(ALL) ALL

#修改用户组
usermod -aG wheel [username]
```

## 更改计算机的名称

```bash
sudo hostnamectl --static set-hostname <host-name>
```

## 安装 MySQL

```bash
#添加源
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm

#安装软件包
rpm -ivh mysql-community-release-el7-5.noarch.rpm

#yum 安装
yum install mysql-server

#启动 mysql
systemctl start mysql

#修改root密码
mysqladmin -u root password "newpassword"

#本地登录
mysql -u root -p

#查看用户
mysql > select host,user from user;

#添加远程用户
mysql > Grant all privileges on *.* to 'zero'@'%' identified by 'zero' with grant option;

```
