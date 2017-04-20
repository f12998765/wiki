# Github Pages 配置 https

Github Pages 不支持自定义域名https，虽然使用第三方的解析代理可以实现，但是却不稳定也并不知道什么时候失效，凡事要靠自己来。

搜索查找，知道使用 **Nginx 反向代理** 可以实现。

下面是一些简单的笔记，需要一个ubuntu环境的云服务器，其他环境自行查找。

## 安装 Nginx
```
apt-get install nginx
```
## 域名解析
1. 删除 Github Pages 上的 CNAME ，不使用自定义域名。
2. 在域名解析商那，将自定义域名用A解析到云服务器

## 申请证书
可以搜索 Let’s Encrypt

## Nginx 配置
如果默认安装，`/etc/nginx/conf.d` 目录是自定义配置文件的存放的地方，新建一个 `.conf` 文件，文件名随意。

> xxx.com 表示你的自定义域名

添加一个虚拟主机，监听 80 ，让 http 跳转到 https
```
server {
        listen 80 ;
        server_name xxx.com;
        rewrite ^(.*)$  https://xxx.com$1 permanent;
}
```
添加一个虚拟主机，监听 443 ，`location /` 设置反向代理 Github pages，`ssl_certificate`等设置证书，最后的 `location` 设置缓存时间。

> 添加证书的时候，注意路径，使用 `nginx -t xxx.conf` 查看配置文件是否错误，多看看日志

```
server {
        listen 443 ssl;
        server_name xxx.com;
        ssl on;
        ssl_certificate conf.d/xxx.com_bundle.crt;
        ssl_certificate_key conf.d/xxx.com.key;
        location / {
                proxy_pass https://xxx.github.io/;
                proxy_redirect     off;
                proxy_set_header   X-Real-IP  $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
        location ~ /purge(/.*){
            expires 10m;
        }
}
```

## 运行 nginx 
```
service nginx start
```

## 参考
- [反向代理 GitHub Pages 并配置博客 HTTPS 访问](https://imciel.com/2016/05/09/github-pages-reverse-proxy-https/)
- [我的博客用上HTTPS啦](https://taozj.org/201603/blog-site-under-https.html#)
- [在 Nginx（LNMP）上配置 NameCheap SSL 证书并开启强制 HTTPS 的方法](https://echo.pm/lnmp-nginx-ssl-https)
- [nginx ssl强制跳转](https://segmentfault.com/q/1010000006614489)
