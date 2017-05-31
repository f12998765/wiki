# Swagger 学习笔记

官网：[http://swagger.io/](http://swagger.io/)

Github：[https://github.com/swagger-api](https://github.com/swagger-api)

**THE WORLD'S MOST POPULAR API FRAMEWORK**

世界上最流行的API框架

Swagger is a powerful open source framework backed by a large ecosystem of tools that helps you design, build, document, and consume your RESTful APIs.

Swagger是一个强大的开源框架，有工具生态系统支持，可帮助您设计，构建，记录和使用RESTful API。

Swagger 官方提供了三个工具，分别用于 Design、Build和Document：

- Swagger Editor
    - 一个设计或编辑 API 的编辑器，能根据 Swagger 规范进行直观的反馈。
- Swagger Codegen
    - 将 Swagger 文档转换成代码。
- Swagger UI
    - 在浏览器中浏览测试 REST API 。

## Swagger Editor

Swagger Editor 是一个可视化的 API 编辑器，能根据 Swagger 规范实时校验文档。

![](https://ox.xizero.com/uploads/2017/02/swagger_editor.png)

### 安装

Swagger 提供了在线版的 Swagger Editor ：[http://editor.swagger.io/](http://editor.swagger.io/#/)

也可以在 Github 上下载项目，在本地服务器（Nginx 或 npm http-server）上运行。

Github地址：[https://github.com/swagger-api/swagger-editor](https://github.com/swagger-api/swagger-editor)

也可以直接在拉取 docker 镜像，运行。

```bash
docker pull swaggerapi/swagger-editor
docker run -p 80:8080 swaggerapi/swagger-editor
```
### 使用

Swagger 的文档需要符合 OpenAPI Specification ，使用 json 或者 yaml 描述 API。

### OpenAPI Specification

查看官方文档之前，推荐阅读：[《如何编写基于OpenAPI规范的API文档》](https://www.gitbook.com/book/huangwenchao/swagger/details)，可以对文档结构有个了解。

官方文档：

- Swagger 官网上的：[http://swagger.io/specification/](http://swagger.io/specification/)
- Github上的：[https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)

> 国内关于 Swagger 的中文文档较少，简单地翻译了一下  OpenAPI Specification ，水平有限，见谅！

OpenAPI Specification 中文：[https://www.xizero.com/mixin/OpenAPISpecificationZh/](https://www.xizero.com/mixin/OpenAPISpecificationZh/)

Arnaud Lauret 大神的 OpenAPI Specification Visual Documentation ，可以对文档结构有个清晰了解。

- OpenAPI Specification Visual Documentation：[http://openapi-specification-visual-documentation.apihandyman.io/](http://openapi-specification-visual-documentation.apihandyman.io/)
- 在 Github 上开源地址：[https://github.com/arno-di-loreto/openapi-specification-visual-documentation](https://github.com/arno-di-loreto/openapi-specification-visual-documentation)

并且大神在其博客上写了一个系列教程：Writing OpenAPI (fka Swagger) Specification tutorial

- 大神的博客：[API Handyman - http://apihandyman.io/](http://apihandyman.io/)
- 教程的地址：[http://apihandyman.io/writing-openapi-swagger-specification-tutorial-part-1-introduction/](http://apihandyman.io/writing-openapi-swagger-specification-tutorial-part-1-introduction/)

### 相关

- JSON Schema
    - 官网：[http://json-schema.org/](http://json-schema.org/)
    - Github：[https://github.com/json-schema-org/json-schema-spec](https://github.com/json-schema-org/json-schema-spec)

- YAML
    - The Official YAML Web Site：[http://www.yaml.org/](http://www.yaml.org/)
    - 阮一峰-YAML 语言教程：[http://www.ruanyifeng.com/blog/2016/07/yaml.html](http://www.ruanyifeng.com/blog/2016/07/yaml.html)

- Google Java Style Guide
    - [https://google.github.io/styleguide/javaguide.html](https://google.github.io/styleguide/javaguide.html)

### 参考
- [如何编写基于OpenAPI规范的API文档](https://huangwenchao.gitbooks.io/swagger/content/)
- [SWAGGER SPECIFICATION](http://swagger.io/specification/)
- [OpenAPI Specification Visual Documentation](https://github.com/arno-di-loreto/openapi-specification-visual-documentation)


## Swagger Codegen

Swagger Codegen 是一个代码生成工具，根据符合 Swagger 规范的 API 文档生成 API clients 、Server stubs 或者其他类型的文档，还有其他(JMeter)。支持的语言/框架，如下：

- API clients: ActionScript, Bash, C# (.net 2.0, 4.0 or later), C++ (cpprest, Qt5, Tizen), Clojure, Dart, Elixir, Go, Groovy, Haskell, Java (Jersey1.x, Jersey2.x, OkHttp, Retrofit1.x, Retrofit2.x, Feign), Node.js (ES5, ES6, AngularJS with Google Closure Compiler annotations) Objective-C, Perl, PHP, Python, Ruby, Scala, Swift (2.x, 3.x), Typescript (Angular1.x, Angular2.x, Fetch, Node)
- Server stubs: C# (ASP.NET Core, NancyFx), Erlang, Go, Haskell, Java (MSF4J, Spring, Undertow, JAX-RS: CDI, CXF, Inflector, RestEasy), PHP (Lumen, Slim, Silex, Zend Expressive), Python (Flask), NodeJS, Ruby (Sinatra, Rails5), Scala (Finch, Scalatra)
- API documentation generators: HTML, Confluence Wiki
- Others: JMeter

## 安装

### 环境要求

- Java 7 or 8
- Apache maven 3.3.3 or greater

安装及配置环境，可以看  [《Java 开发环境恢复手册》](https://www.xizero.com/tool/Java%20%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E6%81%A2%E5%A4%8D%E6%89%8B%E5%86%8C/)。

### 下载

本地环境是 win10 ，关于[ OS X](https://github.com/swagger-api/swagger-codegen#os-x-users)、[docker](https://github.com/swagger-api/swagger-codegen#docker)下的使用，暂不了解。

可以下载项目，自己编译运行，也可以直接下载 jar 文件执行。

- 克隆编译，生成的 `swagger-codegen-cli.jar` 文件在 `modules/swagger-codegen-cli/target/` 下

```bash
git clone https://github.com/swagger-api/swagger-codegen cd swagger
 -codegen
mvn clean package
```

- 直接下载
    - Github ：[https://github.com/swagger-api/swagger-codegen/releases](https://github.com/swagger-api/swagger-codegen/releases)
    - Maven ：[https://mvnrepository.com/artifact/io.swagger/swagger-codegen](https://mvnrepository.com/artifact/io.swagger/swagger-codegen)

### 使用
编译生成的 `swagger-codegen-cli.jar` 文件在 `modules/swagger-codegen-cli/target/` 下 ，使用时要注意路径。

而且克隆项目下的 `bin` 目录中有很多脚本，可以很方便地使用。初学的话，也可以借鉴很多。

下面，解释一下相关的命令：

#### `java -jar swagger-codegen-cli-2.2.1.jar help`

查看帮助信息

命令格式：` swagger-codegen-cli <command> [<args>]`

> 注意在 win 下使用，应该是 `java -jar swagger-codegen-cli-2.2.1.jar  <command> [<args>]`，其他地方相同不另做声明

可以使用 `swagger-codegen-cli help <command>` 查看相关命令的更多信息。

常用的命令：
- config-help   
    - 所选语言的配置帮助
- generate      
    - 生成所选语言的代码
- help          
    - 显示帮助信息
- langs         
    - 显示支持的语言
- meta          
    - MetaGenerator. Generator for creating a new template set and configuration for Co the language you specify, and includes default templates to include.
    - 用于自定义模板，暂不了解

#### `config-help`

查看 `config-help` 命令的使用：
```bash
`java -jar swagger-codegen-cli-2.2.1.jar help config-help`
```
`config-help` 命令格式：  

```bash
swagger-codegen-cli config-help (-l <language> | --lang <language>)
```
`config-help` 命令参数：
- language - 所选语言

`config-help` 命令样例：

```bash
java -jar swagger-codegen-cli-2.2.1.jar config-help -l spring
```

获取 `spring` 的配置帮助，注意 `spring` 的默认模板是 `spring-boot`，若要生成 `spring-mvc` ，需要在 `generate` 中指定 `library`

```bash
# 部分执行结果
library
    library template (sub-template) to use (Default: spring-boot)
        spring-boot - Spring-boot Server application using the SpringFox integration.
        spring-mvc - Spring-MVC Server application using the SpringFox integration.
        spring-cloud - Spring-Cloud-Feign client with Spring-Boot auto-configured settings.
```

#### `langs`

查看支持的语言和框架

```bash
java -jar swagger-codegen-cli-2.2.1.jar langs
```

执行结果

Available languages: [android, aspnet5, async-scala, cwiki, csharp, cpprest, dart, flash, python-flask, go, groovy, java, jaxrs, jaxrs-cxf, jaxrs-resteasy, jaxrs-spec, inflector, javascript, javascript-closure-angular, jmeter, nancyfx, nodejs-server, objc, perl, php, python, qt5cpp, ruby, scala, scalatra, silex-PHP, sinatra, rails5, slim, spring, dynamic-html, html, html2, swagger, swagger-yaml, swift, tizen, typescript-angular2, typescript-angular, typescript-node, typescript-fetch, akka-scala, CsharpDotNet2, clojure, haskell, lumen, go-server]

了解相关语言的配置帮助，可使用 `config-help` 命令。

#### `generate`

`generate` 的作用是根据 API 文档生成代码，是**最重要的命令**。

首先查看 `generate` 命令的帮助信息：

```bash
$ java -jar swagger-codegen-cli-2.2.1.jar help generate
```
概要，参数 `-i` 和 `-l` 是必要参数，其他参数可选。

```bash
swagger-codegen-cli generate
        [(-a <authorization> | --auth <authorization>)]
        [--additional-properties <additional properties>]
        [--api-package <api package>] [--artifact-id <artifact id>]
        [--artifact-version <artifact version>]
        [(-c <configuration file> | --config <configuration file>)]
        [-D <system properties>] [--git-repo-id <git repo id>]
        [--git-user-id <git user id>] [--group-id <group id>]
        [--http-user-agent <http user agent>]
        (-i <spec file> | --input-spec <spec file>)
        [--import-mappings <import mappings>]
        [--instantiation-types <instantiation types>]
        [--invoker-package <invoker package>]
        (-l <language> | --lang <language>)
        [--language-specific-primitives <language specific primitives>]
        [--library <library>] [--model-name-prefix <model name prefix>]
        [--model-name-suffix <model name suffix>]
        [--model-package <model package>]
        [(-o <output directory> | --output <output directory>)]
        [--release-note <release note>] [(-s | --skip-overwrite)]
        [(-t <template directory> | --template-dir <template directory>)]
        [--type-mappings <type mappings>] [(-v | --verbose)]
```
部分参数解释

`-i <spec file>, --input-spec <spec file>`

**必须** Swagger 规范文件的位置，可以是 url 也可以是文件的路径。

`-l <language>, --lang <language>`

**必须** 所选的语言或框架

`-o <output directory>, --output <output directory>`

生成项目的位置，默认是当前目录

`--library <library>`

指定子模板，库模板




`-c <configuration file>, --config <configuration file>`

设置配置文件的路径，文件格式为 json ，如 `{"optionKey":"optionValue", "optionKey1":"optionValue1"...}`。

不同语言的配置信息不同，使用 ` config-help -l {lang}` 了解更多。

`--api-package <api package>`

设置 api 类的包名

`--artifact-id <artifact id>`

设置 pom.xml 中的 artifactId

`--artifact-version <artifact version>`

设置生成 pom.xml 中的 artifact version

`--model-package <model package>`

设置 models 的包名

`--model-name-prefix <model name prefix>`

model 的前缀，默认为空字符串

`--model-name-suffix <model name suffix>`

model 的后缀，默认为空字符串

`--instantiation-types <instantiation types>`

设置实例化类型的映射。格式为 ` type=instantiatedType`，多个映射之间用逗号 `,` 隔开。

java 的一个例子: `array=ArrayList,map=HashMap`，`array` 类型在生成的代码中会实例化为 `ArrayList`。

`--type-mappings <type mappings>`

设置swagger规范类型和生成的代码类型之间的映射。例如 `array=List,map=Map,string=String`。

不了解 `instantiation-types` 和 `type-mappings` 的区别，待解。

**样例：**

Github wiki 上的 [《Server stub generator HOWTO》](https://github.com/swagger-api/swagger-codegen/wiki/Server-stub-generator-HOWTO)，列举了生成多种语言框架 server 的命令。但是一些并不那么好使，比如 spring-mvc。

wiki 例子：
```bash
java -jar modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate \
  -i http://petstore.swagger.io/v2/swagger.json \
  -l spring-mvc \
  -o samples/server/petstore/spring-mvc
```
但是实际上，在 Swagger codegen v2.2.0 中 spring-mvc 被删掉了，但是作为了 spring 的一个非默认库，spring-boot 作为其默认库。

具体细节

- 更新日志 [https://github.com/swagger-api/swagger-codegen/releases/tag/v2.2.0](https://github.com/swagger-api/swagger-codegen/releases/tag/v2.2.0)
- [[Spring] put spring-mvc and spring-boot under the same language gen #3133](https://github.com/swagger-api/swagger-codegen/pull/3133)

现在创建 spring-mvc ，应该这样：
```bash
java -jar swagger-codegen-cli-2.2.1.jar generate -i swagger.yaml -l spring --library spring-mvc
```

### Swagger codegen 总结

Swagger codegen 作用就是根据 json 或 yaml 格式的 API 文档来生成代码。

基本掌握级别是会使用 `generate` 。

其他进阶，如自定义模板、添加新的语言框架、工作流集成等等，可以看Github 上的 [README](https://github.com/swagger-api/swagger-codegen/blob/master/README.md) 或 [wiki](https://github.com/swagger-api/swagger-codegen/wiki)。

当然最简单的生成，可以在 Swagger Editore 中使用 Generate Server 和 Generate Client。只是不如命令操作仔细。还有，在 Swagger codegen 的 Github 项目中 `bin` 目录下有很多可用的脚本，可根据需要修改使用。

### 参考
- [Swagger Codegen Gtihub 项目](https://github.com/swagger-api/swagger-codegen)
- [Swagger Codegen Gtihub Wiki](https://github.com/swagger-api/swagger-codegen/wiki)
- [Swagger Code Generator v2.1.5 README 中文翻译](https://javaarm.com/faces/display.xhtml;jsessionid=dkH9tZqNyijEI4XCAbpWtmV0?tid=3915)
- [[Spring] put spring-mvc and spring-boot under the same language gen #3133](https://github.com/swagger-api/swagger-codegen/pull/3133)
- [swagger-codegen生成java客户端代码（其他语言类似）](http://blog.csdn.net/wangjunjun2008/article/details/53200437)

## Swagger UI

Swagger UI  将 API 文档在浏览器中可视化。

官方的 Demo ，地址：[http://petstore.swagger.io/](http://petstore.swagger.io/)。截图：

![](https://ox.xizero.com/uploads/2017/02/swagger_ui.png)

### 安装

可以从 [Github](https://github.com/swagger-api/swagger-ui) 下载项目，打开 `./dist/index.html` 直接运行。

关于 `Build` 项目和在 `docker`  中运行，暂不了解。

可以编辑 `index.html` ，对 `swaggerUi ` 对象自定义属性。

相关属性，参阅 ： [https://github.com/swagger-api/swagger-ui#swaggerui](https://github.com/swagger-api/swagger-ui#swaggerui)

重要属性解释：

- url  设置默认文档路径
- docExpansion 控制列表显示：默认 none - 完全隐藏；list - 显示路径的操作列表；full - 完全展开

中文翻译设置，在 `index.html` 中 30 行左右，去掉注释代码，修改为：
```html
<script src='lang/translator.js' type='text/javascript'></script>
<script src='lang/zh-cn.js' type='text/javascript'></script>
```

### CORS 支持

关于 CORS 请看另一篇。


### 参考
- [https://github.com/swagger-api/swagger-ui](https://github.com/swagger-api/swagger-ui)

## 学习 Swagger 的总结

Saggger 是世界上最流行的的 API 框架，提供了 API 设计、构建和展示的工具。但是相关的资料也有限，大概入了个门。

关于 Swagger 的更多相关开源项目，可以在 [http://swagger.io/open-source-integrations/](http://swagger.io/open-source-integrations/) 查看。

下一篇，学习如何从代码生成 API 文档 - SPringFox。
