# 自建图床-Qchan

## 简述

做完博客，搭建一个图床，应该很正常吧。(｡･∀･)ﾉﾞ

翻来覆去，常见的都是在七牛等空间商托管，或者免费的图床网站，因为要自定域名还要文件安全，所以自建是最好的了。
PHP图床程序开源常用的有 Qchan 、树洞外链、Chevereto这三种，还找到一个go编写的 Rikka 。以上程序，我都在 vps 上搭建过，每个都有难以描述的 bug ，很是心累，最后选择了 Qchan ，修改了一下主题。

> 毫无一点 PHP和Go 基础的我，表示 （╯＾╰）

- - - - -

## 图床程序

### Rikkia

搭建难度：★☆☆☆☆

Github : [https://github.com/7sDream/rikka](https://github.com/7sDream/rikka)

**描述：**

因为之前用过 docker ，搭建这个，很容易上手。

很简洁，用于私人好一点，没有用户模块，没有后台管理。

**问题：**

我是用Nginx做二级域名代理，但是 Rikkia 返回的图片地址，却是 nginx 配置的 127.0.0.1。

本想重新编译一下，但是天朝XX，golang 一直连接超时…… 

- - - - -
### Qchan

搭建难度：★★☆☆☆

Github : [https://github.com/qakcn/qchan](https://github.com/qakcn/qchan)

**描述：**

Qchan 没有用户模块，运行需要 PHP，对于像我这样没有接触过 php 的人来说，在 linux 上编译安装，简直了，没有安装成功，后来用 apt 安装的。

界面很是瞎眼，重新写了一下主题，马马虎虎吧。

**问题：**

linux 下的安装，真心折磨；win 还好，开启插件也简单。
- - - - -
### 树洞外链

搭建难度：★★★☆☆

官网：[https://github.com/HFO4/shudong-share](https://github.com/HFO4/shudong-share)

Github : [https://github.com/qakcn/qchan](https://github.com/qakcn/qchan)

**描述：**

运行需要PHP和MySQL，超级强大，不止能上传图片，做一些文件的分享也可以，就像是个云盘吧。

后台管理很复杂，不同的上传方案，不同的用户组等等。

**问题：**

分享文件、注册用户出现bug，官网上的帮助也没有相关内容。

上传 svg 卡住，所以放弃了。

不过，真是一个好的分享云盘。
- - - - -
### Chevereto

搭建难度：★★★☆☆

官网：[https://chevereto.com/](https://chevereto.com/)

**描述：**

老牌的图床程序，对版权很是看重，有免费开源版，网页华丽好看。

商业版和开源版有些差别，对国内好像不友好。

**问题：**

不支持修改 上传图片类型，枪毙。
- - - - -
## 搭建 Qchan

简单描述一下，搭建 Qchan 的过程。

### 安装 PHP

编译安装失败，apt 大法好。

环境：Ubuntu 16.04

```bash
sudo apt-get install php php-gd
```

配置文件位置：`/etc/php/7.0/fpm/php.ini`

修改配置
```ini
post_max_size = 30M
upload_max_filesize = 30M
extension=php_gd2.dll
```

win 处了以上还需要修改
```ini
extension_dir = "ext"
```

### 安装 Nginx

```bash
sudo apt-get install nginx
```

在 `/etc/nginx/conf.d/` 中新建 `www.conf`，添加

```
server {
        listen 80 ;
        server_name ox.xizero.com;
        rewrite ^(.*)$  https://ox.xizero.com$1 permanent;
}
server {
        listen 443 ssl;
        server_name demo.com;
        ssl on;
        ssl_certificate conf.d/1_demo.com_bundle.crt;
        ssl_certificate_key conf.d/2_demo.com.key;
        root /home/ubuntu/qchan/;
        index index.php;

        location / {
                try_files $uri $uri/ /index.html;
        }
        location ~ \.php$ {
                include /etc/nginx/fastcgi_params;
                fastcgi_pass unix:/run/php/php7.0-fpm.sock;
                fastcgi_index index.php;
                fastcgi_param SCRIPT_FILENAME /home/ubuntu/qchan/$fastcgi_script_name;
                client_max_body_size    20m;
        }

        location ~ /purge(/.*){
        expires 10m;
        }
}
```
### 下载项目

原 Github : [https://github.com/qakcn/qchan](https://github.com/qakcn/qchan)

我的 Github : [https://github.com/f12998765/qchan](https://github.com/f12998765/qchan)

- 克隆项目到 `~/`
- 修改  config.php 中的管理员用户和密码
- 修改权限 `sudo chmod -R 777 qchan/`

### 结束

自建图床，花费了几天，还好，最终做了出来。学了点 php 安装，了解了一些套路，果然人还是要努力的！↖(^ω^)↗

最后，  **PHP是世界上最好的语言**。




