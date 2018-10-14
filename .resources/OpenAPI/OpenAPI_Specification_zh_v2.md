> 不堪的英语和谷歌翻译，见谅！

# OpenAPI 规范
## (fka Swagger RESTful API文档规范)

####  2.0 版本

这些关键词： "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" 在本文中按[RFC 2119](http://www.ietf.org/rfc/rfc2119.txt) 所描述的解释。

Swagger 规范遵循[The Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

## 引言

Swagger™  是一个用于描述和记录 RESTful APIs 的项目。

Swagger 规范定义了描述 API 所需的文件。这些文件可以被Swagger-UI项目用来显示API，也可以被Swagger-Codegen用来生成各种语言的客户端。其他程序也可以，如测试工具。

## 修订记录

版本 | 时间 | 记录
--- | --- | ---
2.0 | 2014-09-08 | 发布Swagger 2.0
1.2 | 2014-03-14 | 初步发布正式文件
1.1 | 2012-08-22 | 发布 Swagger 1.1
1.0 | 2011-08-10 | 首次发布 Swagger 规范

## 定义

##### <a name="pathTemplating"></a>Path Templating / 路径模板
》路径模板是指用大括号({})标记的一段URL路径代替参数的用法。

##### <a name="mimeTypes"></a>Mime 类型
Mime 类型的定义分布在多个资源，minm 类型的定义应该符合[RFC 6838](http://tools.ietf.org/html/rfc6838).

一些 Minme 类型的例子：
```
  text/plain; charset=utf-8
  application/json
  application/vnd.github+json
  application/vnd.github.v3+json
  application/vnd.github.v3.raw+json
  application/vnd.github.v3.text+json
  application/vnd.github.v3.html+json
  application/vnd.github.v3.full+json
  application/vnd.github.v3.diff
  application/vnd.github.v3.patch
```

参考：
- [MDN-MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [维基百科-互联网媒体类型](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E5%AA%92%E4%BD%93%E7%B1%BB%E5%9E%8B)
##### <a name="httpCodes"></a>HTTP Status Codes / HTTP 状态码
HTTP 状态码是用来表示执行操作的状态。 可用的状态码由[RFC 7231](http://tools.ietf.org/html/rfc7231#section-6) 在 [IANA Status Code Registry](http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml) 中描述. 

参考：
- [维基百科-HTTP状态码](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)
## 规范

### 格式

根据 Swagger 规范描述 RESTful API 的文档表示为一个 JSON 对象，并且符合 JSON 标准。YAML，作为 JSON 的超集，也可以用于 Swager 规范文件。

例如：如果一个字段是数组变量，用 JSON 数组可以表示为：

```js
{
   "field" : [...]
}
```

虽然 API 使用JSON 描述，但是并不强制API使用JSON输入或输出。

规范中的所有字段名都 **区分大小写**。

模式包括两种字段，有声明名称的固定字段，和用正则表达式声明字段名的 Patterned 字段。Patterned 字段可以多次使用，每个都有唯一名称。

### 文件结构

描述 API 的文件是一个单独文件。但是，定义部分可以由用户分割成多个独立文件。
用[JSON Schema](http://json-schema.org) 定义的`$ref` 引入使用。

按照惯例，Swagger规范文件被命名为`swagger.json`。

### 数据类型

Swagger规范中的基本数据类型基于[JSON-Schema Draft 4](http://json-schema.org/latest/json-schema-core.html#anchor8). 使用JSON Schema Draft 4的子集[Schema Object](#schemaObject)来描述模型。

数据类型 `"file"` 用于在[Parameter Object](#parameterObject) 设置参数类型，以及在 [Response Object](#responseObject) 响应返回一个文件。

<a name="dataTypeFormat"></a>数据有一个可选的修饰属性  `format`. Swagger 使用规定好的 format 来更准确地确定使用的数据类型。 但是，`format` 的值可以是任意的`string`,可以用任意值来支持文档需要。像`"email"`, `"uuid"` 等等，尽管它们没有在规范中定义但是仍可以使用。`format`没有规定的类型遵循 JSON 标准中的定义(除了上面明确的 `file` 类型). Swagger规范定义的格式如下：


名称 | [`type`](#dataTypeType) | [`format`](#dataTypeFormat) | 注释
----------- | ------ | -------- | --------
integer | `integer` | `int32` | 有符号32位
long | `integer` | `int64` | 有符号64位
float | `number` | `float` | |
double | `number` | `double` | |
string | `string` | | |
byte | `string` | `byte` | base64 编码字符
binary | `string` | `binary` | 任何字节序列
boolean | `boolean` | | |
date | `string` | `date` | `full-date` - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)
dateTime | `string` | `date-time` | `date-time` - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)
password | `string` | `password` | 用于提示隐藏输入

### Schema / 模式

#### <a name="swaggerObject"></a>Swagger Object

这是 API 规范的根节点。它是以前Resource Listing和API声明(1.2版本及更早)的结合。

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="swaggerSwagger"></a>swagger | `string` | **必须** 指定使用的 Swagger 规范版本，Swagger UI 和其他客户端根据它来解释API文档。值必须是`"2.0"`。
<a name="swaggerInfo"></a>info | [Info Object](#infoObject) | **必须** 提供 API 的相关信息。如果需要，可以被客户端使用
<a name="swaggerHost"></a>host | `string` | 提供 API 服务的 host 或 ip。必须是 host，不包括访问协议(http/https等)或子路径。可能包含端口。如果未定义，将使用文档所在的服务器，包括端口。不支持 [path templating](#pathTemplating).
<a name="swaggerBasePath"></a>basePath | `string` | 提供相对于[`host`](#swaggerHost)的基本路径。如果没有定义，API则直接在`host`下服务。值必须以右斜杠(`/`)开头. `basePath` 不支持[path templating](#pathTemplating). 
<a name="swaggerSchemes"></a>schemes | [`string`] |  API 的传输协议。值必须在这个列表中：`"http"`, `"https"`, `"ws"`, `"wss"`。 如果没有定义，默认使用访问 Swagger 的协议。
<a name="swaggerConsumes"></a>consumes | [`string`] | API 可以使用的MIME 类型。 全局设置，但在特殊的API调用上可以覆盖。值必须是 [Mime Types](#mimeTypes).
<a name="swaggerProduces"></a>produces | [`string`] | API 可以生成返回的MIME 类型。 全局设置，但在特殊的API调用上可以覆盖。值必须是 [Mime Types](#mimeTypes).
<a name="swaggerPaths"></a>paths | [Paths Object](#pathsObject) | **必须** API 访问路径。
<a name="swaggerDefinitions"></a>definitions | [Definitions Object](#definitionsObject) | 定义操作中的参数对象和响应对象，可在其他地方引用。
<a name="swaggerParameters"></a>parameters | [Parameters Definitions Object](#parametersDefinitionsObject) | 定义参数对象。该属性*不会*为全部操作定义全局参数。(相对于操作中的parameters)
<a name="swaggerResponses"></a>responses | [Responses Definitions Object](#responsesDefinitionsObject) | 定义响应对象。该属性*不会*为全部操作定义全局响应。(相对于操作中的responses)
<a name="swaggerSecurityDefinitions"></a>securityDefinitions | [Security Definitions Object](#securityDefinitionsObject) | 定义规范中使用的安全方案。
<a name="swaggerSecurity"></a>security | [[Security Requirement Object](#securityRequirementObject)] | A declaration of which security schemes are applied for the API as a whole. The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). Individual operations can override this definition.
<a name="swaggerTags"></a>tags | [[Tag Object](#tagObject)] | A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](#operationObject) must be declared. The tags that are not declared may be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
<a name="swaggerExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | 外部文档

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="swaggerExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

#### <a name="infoObject"></a>Info Object

提供 API 的相关信息。如果需要，可以被客户端使用，为了方便可以在Swagger-UI中呈现。

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="infoTitle"></a>title | `string` | **必须** 文档的标题
<a name="infoDescription"></a>description | `string` |关于文档简短描述，支持 Markdown [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) 
<a name="infoTermsOfService"></a>termsOfService | `string` | API 的服务条款
<a name="infoContact"></a>contact | [Contact Object](#contactObject) |  API的联系信息
<a name="infoLicense"></a>license | [License Object](#licenseObject) |  API的许可信息
<a name="infoVersion"></a>version | `string` | **必须** API 的版本，不要与规范的版本混淆

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="infoExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Info Object Example:

```js
{
  "title": "Swagger Sample App",
  "description": "This is a sample server Petstore server.",
  "termsOfService": "http://swagger.io/terms/",
  "contact": {
    "name": "API Support",
    "url": "http://www.swagger.io/support",
    "email": "support@swagger.io"
  },
  "license": {
    "name": "Apache 2.0",
    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
  },
  "version": "1.0.1"
}
```

```yaml
title: Swagger Sample App
description: This is a sample server Petstore server.
termsOfService: http://swagger.io/terms/
contact:
  name: API Support
  url: http://www.swagger.io/support
  email: support@swagger.io
license:
  name: Apache 2.0
  url: http://www.apache.org/licenses/LICENSE-2.0.html
version: 1.0.1
```

#### <a name="contactObject"></a>Contact Object

API 的联系信息

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="contactName"></a>name | `string` | 联系人或组织的标志名称
<a name="contactUrl"></a>url | `string` | 	指向联系人信息的URL。必须采用URL的格式。
<a name="contactEmail"></a>email | `string` | 	联系人/组织的电子邮件地址。必须采用电子邮件地址的格式。

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="contactExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Contact Object Example:

```js
{
  "name": "API Support",
  "url": "http://www.swagger.io/support",
  "email": "support@swagger.io"
}
```

```yaml
name: API Support
url: http://www.swagger.io/support
email: support@swagger.io
```

#### <a name="licenseObject"></a>License Object

API的许可信息。

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="licenseName"></a>name | `string` | **必须** API的许可证名称
<a name="licenseUrl"></a>url | `string` | API使用许可证的URL，格式必须是URL，格式必须是URL

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="licenseExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### License Object Example:

```js
{
  "name": "Apache 2.0",
  "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
}
```

```yaml
name: Apache 2.0
url: http://www.apache.org/licenses/LICENSE-2.0.html
```

#### <a name="pathsObject"></a>Paths Object

到各个节点的相对路径，与  [`basePath`](#swaggerBasePath) 构成完整URL。必须采用URL的格式。可能为空，因为[ACL constraints](#securityFiltering).

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pathsPath"></a>/{path} | [Path Item Object](#pathItemObject) | 到各个节点的相对路径，与  [`basePath`](#swaggerBasePath) 构成完整URL。必须以斜杠开头。允许[Path templating](#pathTemplating).
<a name="pathsExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 

##### Paths Object Example

```js
{
  "/pets": {
    "get": {
      "description": "Returns all pets from the system that the user has access to",
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "A list of pets.",
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/pet"
            }
          }
        }
      }
    }
  }
}
```

```yaml
/pets:
  get:
    description: Returns all pets from the system that the user has access to
    produces:
    - application/json
    responses:
      '200':
        description: A list of pets.
        schema:
          type: array
          items:
            $ref: '#/definitions/pet'
```

#### <a name="pathItemObject"></a>Path Item Object

路径可执行操作。由于 [ACL constraints](#securityFiltering)，可能为空。浏览者可以看到路径，但不知道到可执行的操作和参数。

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="pathItemRef"></a>$ref | `string` | 引入外部定义。格式必须是 [Path Item Object](#pathItemObject). 如果引用定义和 Path Item的定义冲突，则为未定义 *undefined*.
<a name="pathItemGet"></a>get | [Operation Object](#operationObject) | GET 操作
<a name="pathItemPut"></a>put | [Operation Object](#operationObject) | PUT 操作
<a name="pathItemPost"></a>post | [Operation Object](#operationObject) | POST 操作
<a name="pathItemDelete"></a>delete | [Operation Object](#operationObject) | DELETE 操作
<a name="pathItemOptions"></a>options | [Operation Object](#operationObject) | OPTIONS 操作
<a name="pathItemHead"></a>head | [Operation Object](#operationObject) | HEAD 操作
<a name="pathItemPatch"></a>patch | [Operation Object](#operationObject) | PATCH 操作
<a name="pathItemParameters"></a>parameters | [[Parameter Object](#parameterObject) <span>&#124;</span> [Reference Object](#referenceObject)] | 该路径下的所有操作的参数列表。参数可在操作下覆盖，但不可以删除。不能包含重复参数。参数的唯一由 [name](#parameterName)和[location](#parameterIn)组合定义。该列表可以引用[Reference Object](#referenceObject)在Swagger对象 [Swagger Object's parameters](#swaggerParameters) 中定义的参数。最多可以有一个“body”参数。

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pathItemExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 

##### Path Item Object Example

```js
{
  "get": {
    "description": "Returns pets based on ID",
    "summary": "Find pets by ID",
    "operationId": "getPetsById",
    "produces": [
      "application/json",
      "text/html"
    ],
    "responses": {
      "200": {
        "description": "pet response",
        "schema": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Pet"
          }
        }
      },
      "default": {
        "description": "error payload",
        "schema": {
          "$ref": "#/definitions/ErrorModel"
        }
      }
    }
  },
  "parameters": [
    {
      "name": "id",
      "in": "path",
      "description": "ID of pet to use",
      "required": true,
      "type": "array",
      "items": {
        "type": "string"
      },
      "collectionFormat": "csv"
    }
  ]
}
```

```yaml
get:
  description: Returns pets based on ID
  summary: Find pets by ID
  operationId: getPetsById
  produces:
  - application/json
  - text/html
  responses:
    '200':
      description: pet response
      schema:
        type: array
        items:
          $ref: '#/definitions/Pet'
    default:
      description: error payload
      schema:
        $ref: '#/definitions/ErrorModel'
parameters:
- name: id
  in: path
  description: ID of pet to use
  required: true
  type: array
  items:
    type: string
  collectionFormat: csv
```

#### <a name="operationObject"></a>Operation Object

路径上的某个 API 操作。

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="operationTags"></a>tags | [`string`] | API 文档管理中的标签列表。标签能按资源或者其他限定进行逻辑分组。
<a name="operationSummary"></a>summary | `string` | 执行操作的简短描述，为了在 swagger-ui 中获取最大可读性，该字段应该小于 120 字符
<a name="operationDescription"></a>description | `string` | 执行操作的详细描述，支持 Markdown [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) 
<a name="operationExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | 外部文档
<a name="operationId"></a>operationId | `string` | <后台程序提供服务的函数名> 标志操作的唯一字符串,标志在API中所有的操作中具有唯一性。工具和 libraries 可使用 operationId 作为操作的唯一标志,建议遵循常见的编程命名约定。
<a name="operationConsumes"></a>consumes | [`string`] | 操作可以使用的MIME 类型。会覆盖在 Swagger 对象中定义的 [`consumes`](#swaggerConsumes) 。空值可以清除全局配置。值必须是[Mime Types](#mimeTypes).
<a name="operationProduces"></a>produces | [`string`] | 操作可以返回生成的MIME 类型。会覆盖在 Swagger 对象中定义的  [`produces`](#swaggerProduces)  。空值可以清除全局配置值必须是 [Mime Types](#mimeTypes).
<a name="operationParameters"></a>parameters | [[Parameter Object](#parameterObject) <span>&#124;</span> [Reference Object](#referenceObject)] | 操作的参数列表。如果参数在 [Path Item](#pathItemParameters) 中已经定义,那么新的定义将覆盖它，但是不会删除。该列表中不能还有重复元素。一个唯一的参数由 [name](#parameterName) 和 [location](#parameterIn) 组合定义. 该列表可以使用 [Reference Object](#referenceObject) 引用在 [Swagger Object's parameters](#swaggerParameters) 中定义的参数. 最多含有一个 "body" 属性。
<a name="operationResponses"></a>responses | [Responses Object](#responsesObject) | **必须** 执行这个操作所可能返回的响应对象列表
<a name="operationSchemes"></a>schemes | [`string`] | 操作的传输协议，值必须属于这个列表： `"http"`, `"https"`, `"ws"`, `"wss"`。 会覆盖 Swagger Object [`schemes`](#swaggerSchemes) 中的定义. 
<a name="operationDeprecated"></a>deprecated | `boolean` | 声明该操作已经弃用。默认值为 `false`.
<a name="operationSecurity"></a>security | [[Security Requirement Object](#securityRequirementObject)] | 用于声明操作的安全方案。该定义可以覆盖顶级 [`security`](#swaggerSecurity). 如果想删除顶级 security 定义，可以使用空数组。

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="operationExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Operation Object Example

```js
{
  "tags": [
    "pet"
  ],
  "summary": "Updates a pet in the store with form data",
  "description": "",
  "operationId": "updatePetWithForm",
  "consumes": [
    "application/x-www-form-urlencoded"
  ],
  "produces": [
    "application/json",
    "application/xml"
  ],
  "parameters": [
    {
      "name": "petId",
      "in": "path",
      "description": "ID of pet that needs to be updated",
      "required": true,
      "type": "string"
    },
    {
      "name": "name",
      "in": "formData",
      "description": "Updated name of the pet",
      "required": false,
      "type": "string"
    },
    {
      "name": "status",
      "in": "formData",
      "description": "Updated status of the pet",
      "required": false,
      "type": "string"
    }
  ],
  "responses": {
    "200": {
      "description": "Pet updated."
    },
    "405": {
      "description": "Invalid input"
    }
  },
  "security": [
    {
      "petstore_auth": [
        "write:pets",
        "read:pets"
      ]
    }
  ]
}
```

```yaml
tags:
- pet
summary: Updates a pet in the store with form data
description: ""
operationId: updatePetWithForm
consumes:
- application/x-www-form-urlencoded
produces:
- application/json
- application/xml
parameters:
- name: petId
  in: path
  description: ID of pet that needs to be updated
  required: true
  type: string
- name: name
  in: formData
  description: Updated name of the pet
  required: false
  type: string
- name: status
  in: formData
  description: Updated status of the pet
  required: false
  type: string
responses:
  '200':
    description: Pet updated.
  '405':
    description: Invalid input
security:
- petstore_auth:
  - write:pets
  - read:pets
```


#### <a name="externalDocumentationObject"></a>External Documentation Object 

允许引用外部文档中的资源。

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="externalDocDescription"></a>description | `string` | 目标文档的简短描述， 支持 Markdown [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) 。
<a name="externalDocUrl"></a>url | `string` | **必须** 目标文档的 URL，值必须是 URL 格式。

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="externalDocExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### External Documentation Object Example

```js
{
  "description": "Find more info here",
  "url": "https://swagger.io"
}
```

```yaml
description: Find more info here
url: https://swagger.io
```

#### <a name="parameterObject"></a>Parameter Object

描述单个操作的参数。

一个唯一的参数由 [name](#parameterName) 和 [location](#parameterIn) 组合定义。

参数类型有五种。
* Path - 和 [Path Templating](#pathTemplating) 一起使用, 参数值是路径URL的一部分,不包括API的 host或者 base path 。例如，in `/items/{itemId}`, 路径参数值是 `itemId`.
* Query - 附加在URL后的参数。例如，在 `/items?id=###`中,query 参数值是`id`.
* Header - 作为请求头的一部分
* Body - 附加在HTTP请求的载荷 payload,由于只有一个载荷，所以只能有*一个* body 参数。body 参数的名称对其没有影响，仅仅是文档目的。 由于 Form 参数也在载荷中，所以不能同时出现在同一个操作中。
* Form - 用于描述`application/x-www-form-urlencoded`, `multipart/form-data` ，或者两者都有的内容请求(在 Swagger的定义中, 操作中的[`consumes`](#operationConsumes) 属性)的有效载荷。这是唯一可以发送文件的属性类型，因此支持 `file` 类型. 由于 form 参数在载荷中发送，所以不在同一个操作中同时和 body 定义。参数类型使用不同的内容类型 (了解更多，请看http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4):
  * `application/x-www-form-urlencoded` - 类似 Query 的参数格式,但是作用在载荷。例如， `foo=1&bar=swagger` ， `foo` 和 `bar` 都是表单参数。通常用于阐述简单的参数。
  * `multipart/form-data` - 每个参数在载荷中包含一个内部头 （each parameter takes a section in the payload with an internal header.) 例如，在头 `Content-Disposition: form-data; name="submit-name"` 中，参数的名称是 `submit-name`。这种类型的表单参数更多地用于传输文件。

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="parameterName"></a>name | `string` | **必须** 参数的名称，参数名称*区分大小写*<ul><li>如果 [`in`](#parameterIn) 的值是`"path"`,那么 `name` 必须对应 [Paths Object](#pathsObject)中的 [path](#pathsPath) 字段。更多信息看[Path Templating](#pathTemplating) <li>对于其他情况，`name` 对应基于[`in`](#parameterIn) 属性使用的参数名</ul>
<a name="parameterIn"></a>in | `string` | **必须** 参数的位置，值是 "query", "header", "path", "formData" 和 "body"中之一。
<a name="parameterDescription"></a>description | `string` | 参数的简短描述。可以包含使用样例。, 支持 Markdown [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) 。
<a name="parameterRequired"></a>required | `boolean` | 确定此参数是否必须。如果 [`in`](#parameterIn) 的值是"path",那么该属性是 **必须** 而且必须是 `true`。其他情况，该属性也可能包含，默认值是 `false`。 

如果[`in`](#parameterIn) 的值是 `"body"`:

Field Name | Type | Description
---|:---:|---
<a name="parameterSchema"></a>schema | [Schema Object](#schemaObject) | **必须** 模式(schema)定义的是 body 参数的类型(The schema defining the type used for the body parameter.)。

如果 [`in`](#parameterIn) 的值是除了`"body"`的任意一个 :

Field Name | Type | Description
---|:---:|---
<a name="parameterType"></a>type | `string` | **必须** 参数的类型。由于参数不在请求体(request body)中 ，所以仅限简单类型(不能是对象)，值必须是 `"string"`, `"number"`, `"integer"`, `"boolean"`, `"array"` 和 `"file"`中之一。如果 `type` 是 `"file"`，那么 [`consumes`](#operationConsumes) 必须被定义为 `"multipart/form-data"`, `" application/x-www-form-urlencoded"` ，或者两者,而且 [`in`](#parameterIn) 的值必须是`"formData"`。
<a name="parameterFormat"></a>format | `string` | 对[`type`](#parameterType) 进行扩展，更详细的描述。 查看[Data Type Formats](#dataTypeFormat)了解更多。
<a name="parameterAllowEmptyValue"/>allowEmptyValue | `boolean` | 设置能否传递空值参数。仅仅对 `query` 或 `formData`参数有效，允许发送仅具有名称或空值的参数，默认值为 `false`。
<a name="parameterItems"></a>items | [Items Object](#itemsObject) | **必须 ，如果 [`type`](#parameterType) 的值是 "array"。** 描述数组中的元素类型
<a name="parameterCollectionFormat"></a>collectionFormat | `string` | Determines the format of the array if type array is used。可用的值: <ul><li>`csv` - 逗号分隔值 `foo,bar`. <li>`ssv` - 空格分隔值 `foo bar`. <li>`tsv` -  制表符分隔值 `foo\tbar`. <li>`pipes` - 管道分隔值 <code>foo&#124;bar</code>. <li>`multi` - 对应于多个参数实例，而不是单个实例,如`foo=bar&foo=baz`. 仅仅用于 [`in`](#parameterIn) 的值是"query" 或 "formData"。 </ul> 默认值是 `csv`.
<a name="parameterDefault"></a>default | * | 定义参数的默认值。例如， 如果请求中没有提供，那么控制每页结果数的"count" 默认值就为100(注意："default" has no meaning for required parameters.)  参阅 http://json-schema.org/latest/json-schema-validation.html#anchor101. 不同于 JSON Schema，这个值必须符合 [`type`](#parameterType) 定义的参数。
<a name="parameterMaximum"></a>maximum | `number` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="parameterExclusiveMaximum"></a>exclusiveMaximum | `boolean` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="parameterMinimum"></a>minimum | `number` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="parameterExclusiveMinimum"></a>exclusiveMinimum | `boolean` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="parameterMaxLength"></a>maxLength | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor26.
<a name="parameterMinLength"></a>minLength | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor29.
<a name="parameterPattern"></a>pattern | `string` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor33.
<a name="parameterMaxItems"></a>maxItems | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor42.
<a name="parameterMinItems"></a>minItems | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor45.
<a name="parameterUniqueItems"></a>uniqueItems | `boolean` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor49.
<a name="parameterEnum"></a>enum | [*] | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor76.
<a name="parameterMultipleOf"></a>multipleOf | `number` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor14.


##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="parameterExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.


##### Parameter Object Examples

###### Body Parameters

在 body 参数中引用一个 shema 定义（通常用于模型定义）。

```js
{
  "name": "user",
  "in": "body",
  "description": "user to add to the system",
  "required": true,
  "schema": {
    "$ref": "#/definitions/User"
  }
}
```

```yaml
name: user
in: body
description: user to add to the system
required: true
schema:
  $ref: '#/definitions/User'
```

一个包含字符串数组的 body 参数 :
```js
{
  "name": "user",
  "in": "body",
  "description": "user to add to the system",
  "required": true,
  "schema": {
    "type": "array",
    "items": {
      "type": "string"
    }
  }
}
```

```yaml
name: user
in: body
description: user to add to the system
required: true
schema:
  type: array
  items:
    type: string
```

###### Other Parameters

包含64位整数的 header parameter：

```js
{
  "name": "token",
  "in": "header",
  "description": "token to be passed as a header",
  "required": true,
  "type": "array",
  "items": {
    "type": "integer",
    "format": "int64"
  },
  "collectionFormat": "csv"
}
```

```yaml
name: token
in: header
description: token to be passed as a header
required: true
type: array
items:
  type: integer
  format: int64
collectionFormat: csv
```

一个字符串的 path parameter。
```js
{
  "name": "username",
  "in": "path",
  "description": "username to fetch",
  "required": true,
  "type": "string"
}
```

```yaml
name: username
in: path
description: username to fetch
required: true
type: string
```

一个字符串的query parameter,允许多个重复的值：(An optional query parameter of a string value, allowing multiple values by repeating the query parameter:)
```js
{
  "name": "id",
  "in": "query",
  "description": "ID of the object to fetch",
  "required": false,
  "type": "array",
  "items": {
    "type": "string"
  },
  "collectionFormat": "multi"
}
```

```yaml
name: id
in: query
description: ID of the object to fetch
required: false
type: array
items:
  type: string
collectionFormat: multi
```

用于文件上传的表单数据：
```js
{
  "name": "avatar",
  "in": "formData",
  "description": "The avatar of the user",
  "required": true,
  "type": "file"
}
```

```yaml
name: avatar
in: formData
description: The avatar of the user
required: true
type: file
```

#### <a name="itemsObject"></a>Items Object

JSON-SChema 的 items 对象的子集(A limited subset of JSON-Schema's items object). 当[`in`](#parameterIn) 的值不是`"body"`时，该参数才能定义。

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="itemsType"></a>type | `string` | **必须** 参数类型。必须是 `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"` 之一。不允许使用 Files 和 models 。
<a name="itemsFormat"></a>format | `string` | 对[`type`](#parameterType) 进行扩展，更详细的描述。 查看[Data Type Formats](#dataTypeFormat)了解更多。
<a name="itemsItems"></a>items | [Items Object](#itemsObject) | **当[`type`](#itemsType) 的值是 "array"时，是必须的** 描述数组元素的类型。
<a name="itemsCollectionFormat"></a>collectionFormat | `string` |Determines the format of the array if type array is used。可用的值: <ul><li>`csv` - 逗号分隔值 `foo,bar`. <li>`ssv` - 空格分隔值 `foo bar`. <li>`tsv` -  制表符分隔值 `foo\tbar`. <li>`pipes` - 管道分隔值 <code>foo&#124;bar</code>. </ul> 默认值是 `csv`.
<a name="itemsDefault"></a>default | * | 当没有提供时，server 使用的默认值。 (Note: "default" has no meaning for required items.) 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor101.与 JSON Schema 不同，值必须符合 [`type`](#itemsType) 所定义的类型。
<a name="itemsMaximum"></a>maximum | `number` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="itemsMaximum"></a>exclusiveMaximum | `boolean` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="itemsMinimum"></a>minimum | `number` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="itemsExclusiveMinimum"></a>exclusiveMinimum | `boolean` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="itemsMaxLength"></a>maxLength | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor26.
<a name="itemsMinLength"></a>minLength | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor29.
<a name="itemsPattern"></a>pattern | `string` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor33.
<a name="itemsMaxItems"></a>maxItems | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor42.
<a name="itemsMinItems"></a>minItems | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor45.
<a name="itemsUniqueItems"></a>uniqueItems | `boolean` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor49.
<a name="itemsEnum"></a>enum | [*] | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor76.
<a name="itemsMultipleOf"></a>multipleOf | `number` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor14.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="itemsExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Items Object Examples

参数的类型是 string，并且长度小于 2 字符：

```js
{
    "type": "string",
    "minLength": 2
}
```

```yaml
type: string
minLength: 2
```

一个数组，元素的类型是 integer ，大小在 0 与 63 之间（含）：

```js
{
    "type": "array",
    "items": {
        "type": "integer",
        "minimum": 0,
        "maximum": 63
    }
}
```

```yaml
type: array
items:
  type: integer
  minimum: 0
  maximum: 63
```

#### <a name="responsesObject"></a>Responses Object

描述操作的预期响应。将 HTTP 状态码映射到预期响应。不要期望文档可以涵盖全部的响应码，因为它们往往是不可预知的。但是，在文档中可以看到成功时的响应以及已知的错误。

`default` 能作用到全部 HTTP 响应码，除了单独覆盖的。

`Responses Object` 必须包含一个响应码，而且它应该是一个成功操作的响应码。

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="responsesDefault"></a>default | [Response Object](#responseObject) <span>&#124;</span> [Reference Object](#referenceObject) | 描述除了 HTTP 特定响应码外的响应。可以覆盖未声明的响应。可以通过 [Reference Object](#referenceObject) 引用在 [Swagger Object's responses](#swaggerResponses) 对象中定义的响应。

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="responsesCode"></a>{[HTTP Status Code](#httpCodes)} | [Response Object](#responseObject) <span>&#124;</span> [Reference Object](#referenceObject) | 任何 [HTTP status code](#httpCodes) 都可作为属性的名称，每个响应码都是一个独立的属性。描述HTTP响应码所代表的的响应。可通过 [Reference Object](#referenceObject) 引用 [Swagger Object's responses](#swaggerResponses) 中定义的响应.
<a name="responsesExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.


##### Responses Object Example

成功响应的状态码 200，和其他默认的响应（意味着错误）：

```js
{
  "200": {
    "description": "a pet to be returned",
    "schema": {
      "$ref": "#/definitions/Pet"
    }
  },
  "default": {
    "description": "Unexpected error",
    "schema": {
      "$ref": "#/definitions/ErrorModel"
    }
  }
}
```

```yaml
'200':
  description: a pet to be returned
  schema:
    $ref: '#/definitions/Pet'
default:
  description: Unexpected error
  schema:
    $ref: '#/definitions/ErrorModel'
```

#### <a name="responseObject"></a>Response Object

描述API操作的某个响应。

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="responseDescription"></a>description | `string` | **必须** 响应的简短描述 , 支持 Markdown [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) 。
<a name="responseSchema"></a>schema | [Schema Object](#schemaObject) | 定义响应结构。可以是一个 primitive, array 或 object。 如果该字段不存，那么表示响应没有内容返回。作为 [Schema Object](#schemaObject) 的扩展,  它的 root `type` 值可以是 `"file"`。应该伴有一个相关的 `produces` 定义 mime-type。
<a name="responseHeaders"></a>headers | [Headers Object](#headersObject) | 和响应一起发送的响应头
<a name="responseExamples"></a>examples | [Example Object](#exampleObject) | 响应消息的实例。

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="responseExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Response Object Examples

数组的响应示例：

```js
{
  "description": "A complex object array response",
  "schema": {
    "type": "array",
    "items": {
      "$ref": "#/definitions/VeryComplexType"
    }
  }
}
```

```yaml
description: A complex object array response
schema:
  type: array
  items:
    $ref: '#/definitions/VeryComplexType'
```

string 类型的响应示例：

```js
{
  "description": "A simple string response",
  "schema": {
    "type": "string"
  }
}
```

```yaml
description: A simple string response
schema:
  type: string
```

带响应头的示例:

```js
{
  "description": "A simple string response",
  "schema": {
    "type": "string"
  },
  "headers": {
    "X-Rate-Limit-Limit": {
      "description": "The number of allowed requests in the current period",
      "type": "integer"
    },
    "X-Rate-Limit-Remaining": {
      "description": "The number of remaining requests in the current period",
      "type": "integer"
    },
    "X-Rate-Limit-Reset": {
      "description": "The number of seconds left in the current period",
      "type": "integer"
    }
  }
}
```

```yaml
description: A simple string response
schema:
  type: string
headers:
  X-Rate-Limit-Limit:
    description: The number of allowed requests in the current period
    type: integer
  X-Rate-Limit-Remaining:
    description: The number of remaining requests in the current period
    type: integer
  X-Rate-Limit-Reset:
    description: The number of seconds left in the current period
    type: integer
```

没有内容的响应：

```js
{
  "description": "object created"
}
```

```yaml
description: object created
```

#### <a name="headersObject"></a>Headers Object

Lists the headers that can be sent as part of a response.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="headersName"></a>{name} | [Header Object](#headerObject) | The name of the property corresponds to the name of the header. The value describes the type of the header.

##### Headers Object Example

Rate-limit headers:

```js
{
    "X-Rate-Limit-Limit": {
        "description": "The number of allowed requests in the current period",
        "type": "integer"
    },
    "X-Rate-Limit-Remaining": {
        "description": "The number of remaining requests in the current period",
        "type": "integer"
    },
    "X-Rate-Limit-Reset": {
        "description": "The number of seconds left in the current period",
        "type": "integer"
    }
}
```

```yaml
X-Rate-Limit-Limit:
  description: The number of allowed requests in the current period
  type: integer
X-Rate-Limit-Remaining:
  description: The number of remaining requests in the current period
  type: integer
X-Rate-Limit-Reset:
  description: The number of seconds left in the current period
  type: integer
```

#### <a name="exampleObject"></a>Example Object

Allows sharing examples for operation responses.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="exampleMimeType"></a>{[mime type](#mimeTypes)} | Any | 属性的名称必须是操作 `produces` 属性的值之一 (包含或者继承). 响应的示例。

##### Example Object Example

用 application/json mimetype 描述的宠物响应示例：

```js
{
  "application/json": {
    "name": "Puma",
    "type": "Dog",
    "color": "Black",
    "gender": "Female",
    "breed": "Mixed"
  }
}
```

```yaml
application/json:
  name: Puma
  type: Dog
  color: Black
  gender: Female
  breed: Mixed
```

#### <a name="headerObject"></a>Header Object

Field Name | Type | Description
---|:---:|---
<a name="headerDescription"></a>description | `string` | Header 的简短描述 
<a name="headerType"></a>type | `string` | **必须**  对象的类型. 值必须是 `"string"`, `"number"`, `"integer"`, `"boolean"`, 或 `"array"` 之一。
<a name="headerFormat"></a>format | `string` | 对[`type`](#parameterType) 进行扩展，更详细的描述。 查看[Data Type Formats](#dataTypeFormat)了解更多。
<a name="headerItems"></a>items | [Items Object](#itemsObject) | **如果 [`type`](#stType) 的值是 "array"时，是必须的** 描述数组元素的类型。
<a name="headerCollectionFormat"></a>collectionFormat | `string` | Determines the format of the array if type array is used。可用的值: <ul><li>`csv` - 逗号分隔值 `foo,bar`. <li>`ssv` - 空格分隔值 `foo bar`. <li>`tsv` -  制表符分隔值 `foo\tbar`. <li>`pipes` - 管道分隔值 <code>foo&#124;bar</code>. </ul> 默认值是 `csv`.
<a name="headerDefault"></a>default | * | 当没有提供时，server 将使用的默认 header 。 (Note: "de
fault" has no meaning for required items.) 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor101.与 JSON Schema 不同，值必须符合[`type`](#headerDefault) 所定义的类型。
<a name="headerMaximum"></a>maximum | `number` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="headerMaximum"></a>exclusiveMaximum | `boolean` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="headerMinimum"></a>minimum | `number` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="headerExclusiveMinimum"></a>exclusiveMinimum | `boolean` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="headerMaxLength"></a>maxLength | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor26.
<a name="headerMinLength"></a>minLength | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor29.
<a name="headerPattern"></a>pattern | `string` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor33.
<a name="headerMaxItems"></a>maxItems | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor42.
<a name="headerMinItems"></a>minItems | `integer` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor45.
<a name="headerUniqueItems"></a>uniqueItems | `boolean` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor49.
<a name="headerEnum"></a>enum | [*] | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor76.
<a name="headerMultipleOf"></a>multipleOf | `number` | 参阅 http://json-schema.org/latest/json-schema-validation.html#anchor14.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="headerExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Header Object Example

A simple header with of an integer type:

```js
{
  "description": "The number of allowed requests in the current period",
  "type": "integer"
}
```

```yaml
description: The number of allowed requests in the current period
type: integer
```

#### <a name="tagObject"></a>Tag Object

Allows adding meta data to a single tag that is used by the [Operation Object](#operationObject)（为[Operation Object](#operationObject) 添加标签）. It is not mandatory to have a Tag Object per tag used there.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="tagName"></a>name | `string` | **必须** 标签名
<a name="tagDescription"></a>description | `string` | 标签的简短描述，支持 Markdown [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) 。
<a name="tagExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | 添加其他文档。

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="tagExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Tag Object Example

```js
{
	"name": "pet",
	"description": "Pets operations"
}
```

```yaml
name: pet
description: Pets operations
```

#### <a name="referenceObject"></a>Reference Object

一个简单的对象，允许引用规范中的定义。可以引用在顶层定义的 parameters 和 responses 以便重用。

Reference Object 是一个 [JSON Reference](http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-02)，它的值是一个 [JSON Pointer](http://tools.ietf.org/html/rfc6901) 。For this specification, only [canonical dereferencing](http://json-schema.org/latest/json-schema-core.html#anchor27) is supported.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="referenceRef"></a>$ref | `string` | **必须** 引用的字符串

##### Reference Object Example

```js
{
	"$ref": "#/definitions/Pet"
}
```

```yaml
$ref: '#/definitions/Pet'
```

##### Relative Schema File Example
```js
{
  "$ref": "Pet.json"
}
```

```yaml
$ref: 'Pet.yaml'
```

##### Relative Files With Embedded Schema Example

引入外部文档中定义的对象

```js
{
  "$ref": "definitions.json#/Pet"
}
```

```yaml
$ref: 'definitions.yaml#/Pet'
```

#### <a name="schemaObject"></a>Schema Object

Schema Object 定义输入输出的类型。类型可以是 objects, 也可以是 primitives 和 arrays。 This object is based on the [JSON Schema Specification Draft 4](http://json-schema.org/) and uses a predefined subset of it. On top of this subset, there are extensions provided by this specification to allow for more complete documentation.

更多信息，请看 [JSON Schema Core](http://json-schema.org/latest/json-schema-core.html) 和 [JSON Schema Validation](http://json-schema.org/latest/json-schema-validation.html). 除非另有说明，属性定义遵循此处引用的JSON模式规范。

以下属性直接取自JSON模式定义，并遵循相同的规范：
- $ref - As a [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03)
- format (See [Data Type Formats](#dataTypeFormat) for further details)
- title
- description (支持 Markdown [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown))
- default (和 JSON Schema不同, 值必须符合Schema对象的定义类型)
- multipleOf
- maximum
- exclusiveMaximum
- minimum
- exclusiveMinimum
- maxLength
- minLength
- pattern
- maxItems
- minItems
- uniqueItems
- maxProperties
- minProperties
- required
- enum
- type

下面属性取自 JSON Schema ，但是它们的定义根据 Swagger 规范作了调整。Their definition is the same as the one from JSON Schema, only where the original definition references the JSON Schema definition, the [Schema Object](#schemaObject) definition is used instead.
- items
- allOf
- properties
- additionalProperties

除了 JSON Schema 字段外，以下字段也可以在文档中使用。

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="schemaDiscriminator"></a>discriminator | `string` | 添加对多态的支持(Adds support for polymorphism). discriminator 是模式属性的名称，用以区分继承该 schema 的其他 schema。 使用的属性名必须在该 shcema 中定义，而且必须在 `required` 属性列表中。使用的值必须是该schema 或者继承的名称。
<a name="schemaReadOnly"></a>readOnly | `boolean` | Relevant only for Schema `"properties"` definitions.定义成"read only"，意味着仅能作为响应发送而不能作为请求发送。Properties中设置`readOnly` 值为`true` 的参数，不应该出现在`required` 列表中。 默认值为`false`.
<a name="schemaXml"></a>xml | [XML Object](#xmlObject) | This MAY be used only on properties schemas. It has no effect on root schemas. Adds Additional metadata to describe the XML representation format of this property.
<a name="schemaExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | 额外的文档 
<a name="schemaExample"></a>example | Any | A free-form property to include an example of an instance for this schema.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="schemaExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

###### Composition and Inheritance (Polymorphism)

Swagger allows combining and extending model definitions using the `allOf` property of JSON Schema, in effect offering model composition. `allOf` takes in an array of object definitions that are validated *independently* but together compose a single object. 

While composition offers model extensibility, it does not imply a hierarchy between the models. To support polymorphism, Swagger adds the support of the `discriminator` field. When used, the `discriminator` will be the name of the property used to decide which schema definition is used to validate the structure of the model. As such, the `discriminator` field MUST be a required field. The value of the chosen property has to be the friendly name given to the model under the `definitions` property. As such, inline schema definitions, which do not have a given id, *cannot* be used in polymorphism.

###### XML Modeling

The [xml](#schemaXml) property allows extra definitions when translating the JSON definition to XML. The [XML Object](#xmlObject) contains additional information about the available options.

##### Schema Object Examples

###### Primitive Sample

Unlike previous versions of Swagger, Schema definitions can be used to describe primitive and arrays as well.

```js
{
    "type": "string",
    "format": "email"
}
```

```yaml
type: string
format: email
```

###### Simple Model

```js
{
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "address": {
      "$ref": "#/definitions/Address"
    },
    "age": {
      "type": "integer",
      "format": "int32",
      "minimum": 0
    }
  }
}
```

```yaml
type: object
required:
- name
properties:
  name:
    type: string
  address:
    $ref: '#/definitions/Address'
  age:
    type: integer
    format: int32
    minimum: 0
```

###### Model with Map/Dictionary Properties

For a simple string to string mapping:

```js
{
  "type": "object",
  "additionalProperties": {
    "type": "string"
  }
}
```

```yaml
type: object
additionalProperties:
  type: string
```

For a string to model mapping:

```js
{
  "type": "object",
  "additionalProperties": {
    "$ref": "#/definitions/ComplexModel"
  }
}
```

```yaml
type: object
additionalProperties:
  $ref: '#/definitions/ComplexModel'
```

###### Model with Example

```js
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    }
  },
  "required": [
    "name"
  ],
  "example": {
    "name": "Puma",
    "id": 1
  }
}
```

```yaml
type: object
properties:
  id:
    type: integer
    format: int64
  name:
    type: string
required:
- name
example:
  name: Puma
  id: 1
```

###### Models with Composition

```js
{
  "definitions": {
    "ErrorModel": {
      "type": "object",
      "required": [
        "message",
        "code"
      ],
      "properties": {
        "message": {
          "type": "string"
        },
        "code": {
          "type": "integer",
          "minimum": 100,
          "maximum": 600
        }
      }
    },
    "ExtendedErrorModel": {
      "allOf": [
        {
          "$ref": "#/definitions/ErrorModel"
        },
        {
          "type": "object",
          "required": [
            "rootCause"
          ],
          "properties": {
            "rootCause": {
              "type": "string"
            }
          }
        }
      ]
    }
  }
}
```

```yaml
definitions:
  ErrorModel:
    type: object
    required:
    - message
    - code
    properties:
      message:
        type: string
      code:
        type: integer
        minimum: 100
        maximum: 600
  ExtendedErrorModel:
    allOf:
    - $ref: '#/definitions/ErrorModel'
    - type: object
      required:
      - rootCause
      properties:
        rootCause:
          type: string
```

###### Models with Polymorphism Support

```js
{
  "definitions": {
    "Pet": {
      "type": "object",
      "discriminator": "petType",
      "properties": {
        "name": {
          "type": "string"
        },
        "petType": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "petType"
      ]
    },
    "Cat": {
      "description": "A representation of a cat",
      "allOf": [
        {
          "$ref": "#/definitions/Pet"
        },
        {
          "type": "object",
          "properties": {
            "huntingSkill": {
              "type": "string",
              "description": "The measured skill for hunting",
              "default": "lazy",
              "enum": [
                "clueless",
                "lazy",
                "adventurous",
                "aggressive"
              ]
            }
          },
          "required": [
            "huntingSkill"
          ]
        }
      ]
    },
    "Dog": {
      "description": "A representation of a dog",
      "allOf": [
        {
          "$ref": "#/definitions/Pet"
        },
        {
          "type": "object",
          "properties": {
            "packSize": {
              "type": "integer",
              "format": "int32",
              "description": "the size of the pack the dog is from",
              "default": 0,
              "minimum": 0
            }
          },
          "required": [
            "packSize"
          ]
        }
      ]
    }
  }
}
```

```yaml
definitions:
  Pet:
    type: object
    discriminator: petType
    properties:
      name:
        type: string
      petType:
        type: string
    required:
    - name
    - petType
  Cat:
    description: A representation of a cat
    allOf:
    - $ref: '#/definitions/Pet'
    - type: object
      properties:
        huntingSkill:
          type: string
          description: The measured skill for hunting
          default: lazy
          enum:
          - clueless
          - lazy
          - adventurous
          - aggressive
      required:
      - huntingSkill
  Dog:
    description: A representation of a dog
    allOf:
    - $ref: '#/definitions/Pet'
    - type: object
      properties:
        packSize:
          type: integer
          format: int32
          description: the size of the pack the dog is from
          default: 0
          minimum: 0
      required:
      - packSize
```

#### <a name="xmlObject"></a>XML Object

A metadata object that allows for more fine-tuned XML model definitions.

When using arrays, XML element names are *not* inferred (for singular/plural forms) and the `name` property should be used to add that information. See examples for expected behavior.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="xmlName"></a>name | `string` | Replaces the name of the element/attribute used for the described schema property. When defined within the Items Object (`items`), it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.
<a name="xmlNamespace"></a>namespace | `string` | The URL of the namespace definition. Value SHOULD be in the form of a URL.
<a name="xmlPrefix"></a>prefix | `string` | The prefix to be used for the [name](#xmlName).
<a name="xmlAttribute"></a>attribute | `boolean` | Declares whether the property definition translates to an attribute instead of an element. 默认值为`false`.
<a name="xmlWrapped"></a>wrapped | `boolean` | MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). 默认值为`false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="xmlExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### XML Object Examples

The examples of the XML object definitions are included inside a property definition of a [Schema Object](#schemaObject) with a sample of the XML representation of it.

###### No XML Element

Basic string property:

```js
{
    "animals": {
        "type": "string"
    }
}
```

```yaml
animals:
  type: string
```

```xml
<animals>...</animals>
```

Basic string array property ([`wrapped`](#xmlWrapped) is `false` by default):

```js
{
    "animals": {
        "type": "array",
        "items": {
            "type": "string"
        }
    }
}
```

```yaml
animals:
  type: array
  items:
    type: string
```

```xml
<animals>...</animals>
<animals>...</animals>
<animals>...</animals>
```

###### XML Name Replacement

```js
{
  "animals": {
    "type": "string",
    "xml": {
      "name": "animal"
    }
  }
}
```

```yaml
animals:
  type: string
  xml:
    name: animal
```

```xml
<animal>...</animal>
```


###### XML Attribute, Prefix and Namespace

In this example, a full model definition is shown.

```js
{
  "Person": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int32",
        "xml": {
          "attribute": true
        }
      },
      "name": {
        "type": "string",
        "xml": {
          "namespace": "http://swagger.io/schema/sample",
          "prefix": "sample"
        }
      }
    }
  }
}
```

```yaml
Person:
  type: object
  properties:
    id:
      type: integer
      format: int32
      xml:
        attribute: true
    name:
      type: string
      xml:
        namespace: http://swagger.io/schema/sample
        prefix: sample
```

```xml
<Person id="123">
    <sample:name xmlns:sample="http://swagger.io/schema/sample">example</sample:name>
</Person>
```

###### XML Arrays

Changing the element names:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
```

```xml
<animal>value</animal>
<animal>value</animal>
```

The external `name` property has no effect on the XML:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    },
    "xml": {
      "name": "aliens"
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
  xml:
    name: aliens
```

```xml
<animal>value</animal>
<animal>value</animal>
```

Even when the array is wrapped, if no name is explicitly defined, the same name will be used both internally and externally:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string"
    },
    "xml": {
      "wrapped": true
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
  xml:
    wrapped: true
```

```xml
<animals>
  <animals>value</animals>
  <animals>value</animals>
</animals>
```

To overcome the above example, the following definition can be used:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    },
    "xml": {
      "wrapped": true
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
  xml:
    wrapped: true
```

```xml
<animals>
  <animal>value</animal>
  <animal>value</animal>
</animals>
```

Affecting both internal and external names:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    },
    "xml": {
      "name": "aliens",
      "wrapped": true
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
  xml:
    name: aliens
    wrapped: true
```

```xml
<aliens>
  <animal>value</animal>
  <animal>value</animal>
</aliens>
```

If we change the external element but not the internal ones:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string"
    },
    "xml": {
      "name": "aliens",
      "wrapped": true
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
  xml:
    name: aliens
    wrapped: true
```

```xml
<aliens>
  <aliens>value</aliens>
  <aliens>value</aliens>
</aliens>
```

#### <a name="definitionsObject"></a>Definitions Object

定义参数和响应使用的数据对象。

An object to hold data types that can be consumed and produced by operations. These data types can be primitives, arrays or models.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="definitionsName"></a>{name} | [Schema Object](#schemaObject) | 一个 description，"name"映射到定义的数据对象/模式。

##### Definitions Object Example

```js
{
  "Category": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "name": {
        "type": "string"
      }
    }
  },
  "Tag": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "name": {
        "type": "string"
      }
    }
  }
}
```

```yaml
Category:
  type: object
  properties:
    id:
      type: integer
      format: int64
    name:
      type: string
Tag:
  type: object
  properties:
    id:
      type: integer
      format: int64
    name:
      type: string
```

#### <a name="parametersDefinitionsObject"></a>Parameters Definitions Object

定义可重复引用的参数对象。

An object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here.

这里定义的参数不是全局的参数。

This does *not* define global operation parameters.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pdName"></a>{name} | [Parameter Object](#parameterObject) | 一个 parameter 定义，"name"映射定义的参数对象。

##### Parameters Definition Object Example

```js
{
  "skipParam": {
    "name": "skip",
    "in": "query",
    "description": "number of items to skip",
    "required": true,
    "type": "integer",
    "format": "int32"
  },
  "limitParam": {
    "name": "limit",
    "in": "query",
    "description": "max records to return",
    "required": true,
    "type": "integer",
    "format": "int32"
  }
}
```

```yaml
skipParam:
  name: skip
  in: query
  description: number of items to skip
  required: true
  type: integer
  format: int32
limitParam:
  name: limit
  in: query
  description: max records to return
  required: true
  type: integer
  format: int32
```


#### <a name="responsesDefinitionsObject"></a>Responses Definitions Object

定义可重复引用的响应对象。

An object to hold responses to be reused across operations. Response definitions can be referenced to the ones defined here.

这里定义的响应不是全局的响应。

This does *not* define global operation responses.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="rdName"></a>{name} | [Response Object](#responseObject) |一个 response 定义，"name"映射定义的响应。

##### Responses Definitions Object Example

```js
{
  "NotFound": {
    "description": "Entity not found."
  },
  "IllegalInput": {
  	"description": "Illegal input for operation."
  },
  "GeneralError": {
  	"description": "General Error",
  	"schema": {
  		"$ref": "#/definitions/GeneralError"
  	}
  }
}
```

```yaml
NotFound:
  description: Entity not found.
IllegalInput:
  description: Illegal input for operation.
GeneralError:
  description: General Error
  schema:
    $ref: '#/definitions/GeneralError'
```

#### <a name="securityDefinitionsObject"></a>Security Definitions Object

A declaration of the security schemes available to be used in the specification. This does not enforce the security schemes on the operations and only serves to provide the relevant details for each scheme.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="sdName"></a>{name} | [Security Scheme Object](#securitySchemeObject) | A single security scheme definition, mapping a "name" to the scheme it defines.

##### Security Definitions Object Example

```js
{
  "api_key": {
    "type": "apiKey",
    "name": "api_key",
    "in": "header"
  },
  "petstore_auth": {
    "type": "oauth2",
    "authorizationUrl": "http://swagger.io/api/oauth/dialog",
    "flow": "implicit",
    "scopes": {
      "write:pets": "modify pets in your account",
      "read:pets": "read your pets"
    }
  }
}
```

```yaml
api_key:
  type: apiKey
  name: api_key
  in: header
petstore_auth:
  type: oauth2
  authorizationUrl: http://swagger.io/api/oauth/dialog
  flow: implicit
  scopes:
    write:pets: modify pets in your account
    read:pets: read your pets
```

#### <a name="securitySchemeObject"></a>Security Scheme Object

Allows the definition of a security scheme that can be used by the operations. Supported schemes are basic authentication, an API key (either as a header or as a query parameter) and OAuth2's common flows (implicit, password, application and access code).

##### Fixed Fields
Field Name | Type | Validity | Description
---|:---:|---|---
<a name="securitySchemeType"></a>type | `string` | Any | **必须** The type of the security scheme. Valid values are `"basic"`, `"apiKey"` or `"oauth2"`.
<a name="securitySchemeDescription"></a>description | `string` | Any | A short description for security scheme.
<a name="securitySchemeName"></a>name | `string` | `apiKey` | **必须** The name of the header or query parameter to be used.
<a name="securitySchemeIn"></a>in | `string` | `apiKey` | **Required** The location of the API key. Valid values are `"query"` or `"header"`.
<a name="securitySchemeFlow"></a>flow | `string` | `oauth2` | **必须** The flow used by the OAuth2 security scheme. Valid values are `"implicit"`, `"password"`, `"application"` or `"accessCode"`.
<a name="securitySchemeAuthorizationUrl"></a>authorizationUrl | `string` | `oauth2` (`"implicit"`, `"accessCode"`) | **必须** The authorization URL to be used for this flow. This SHOULD be in the form of a URL.
<a name="securitySchemeTokenUrl"></a>tokenUrl | `string` | `oauth2` (`"password"`, `"application"`, `"accessCode"`) | **必须** The token URL to be used for this flow. This SHOULD be in the form of a URL.
<a name="securitySchemeScopes"></a>scopes | [Scopes Object](#scopesObject) | `oauth2` | **必须** The available scopes for the OAuth2 security scheme.

##### Patterned Fields

Field Name | Type | Description 
---|:---:|---
<a name="securitySchemeExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Security Scheme Object Example

###### Basic Authentication Sample

```js
{
  "type": "basic"
}
```

```yaml
type: basic
```

###### API Key Sample

```js
{
  "type": "apiKey",
  "name": "api_key",
  "in": "header"
}
```

```yaml
type: apiKey
name: api_key
in: header
```

###### Implicit OAuth2 Sample

```js
{
  "type": "oauth2",
  "authorizationUrl": "http://swagger.io/api/oauth/dialog",
  "flow": "implicit",
  "scopes": {
    "write:pets": "modify pets in your account",
    "read:pets": "read your pets"
  }
}
```

```yaml
type: oauth2
authorizationUrl: http://swagger.io/api/oauth/dialog
flow: implicit
scopes:
  write:pets: modify pets in your account
  read:pets: read your pets
```

#### <a name="scopesObject"></a>Scopes Object

Lists the available scopes for an OAuth2 security scheme.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="scopesName"></a>{name} | `string` | Maps between a name of a scope to a short description of it (as the value of the property).

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="scopesExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Scopes Object Example

```js
{
  "write:pets": "modify pets in your account",
  "read:pets": "read your pets"
}
```

```yaml
write:pets: modify pets in your account
read:pets: read your pets
```

#### <a name="securityRequirementObject"></a>Security Requirement Object

Lists the required security schemes to execute this operation. The object can have multiple security schemes declared in it which are all required (that is, there is a logical AND between the schemes).

The name used for each property MUST correspond to a security scheme declared in the [Security Definitions](#securityDefinitionsObject).

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="securityRequirementsName"></a>{name} | [`string`] | Each name must correspond to a security scheme which is declared in the [Security Definitions](#securityDefinitions). If the security scheme is of type `"oauth2"`, then the value is a list of scope names required for the execution. For other security scheme types, the array MUST be empty.

##### Security Requirement Object Examples

###### Non-OAuth2 Security Requirement

```js
{
  "api_key": []
}
```

```yaml
api_key: []
```

###### OAuth2 Security Requirement

```js
{
  "petstore_auth": [
    "write:pets",
    "read:pets"
  ]
}
```

```yaml
petstore_auth:
- write:pets
- read:pets
```

### <a name="vendorExtensions"></a>Specification Extensions


虽然  Swagger Specification 适用于大多数用例，但是可以在某些节点添加数据，扩展规范。

扩展属性必须以`"x-"` 作为前缀，而且值必须符合JSON格式。

这些扩展或许不能被某些工具支持，但是你可以为内部或开源的工具添加对这些扩展的支持。

### <a name="securityFiltering"></a>Security Filtering

Swagger 规范中的一些对象可以删除或者为空，即使它们是 API 文档的核心。

The reasoning behind it is to allow an additional layer of access control over the documentation itself. 虽然不是规范的一部分，但是某些库可以通过某种形式的认证/授权来访问文档的某部分

Two examples for this:

1. [Paths Object](#pathsObject) 可能为空。 It may be counterintuitive, but this may tell the viewer that they got to the right place, but can't access any documentation. They'd still have access to the [Info Object](#infoObject) which may contain additional information regarding authentication.
2. [Path Item Object](#pathItemObject) 为空时，这种情况，浏览者知道路径存在，但不能看到任何操作或参数。This is different than hiding the path itself from the [Paths Object](#pathsObject) so the user will not be aware of its existence. 可以更好地让文档提供者控制浏览者可以看什么。
