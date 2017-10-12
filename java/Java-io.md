# Java IO

> 关于 Java IO 还没有一个整体的结构，所以先写一点常用的东西

## 前言
### IO常执行的操作：
- 文件的创建、删除、移动、复制
- 对文件或网络套字节中读取和写入
- 把对象序列化到持久储存中，并获取保存的对象

### 一点历史：
- JDK 1.0 ，Java 以 java.io 包中的 I/O API 的形式提供支持 I/O
- JDK 1.4 ，添加了 java.nio
- JDK 1.7 ，引入 NIO.2 的包来补充

### 注意：
- 新的版本中，Path 接口是 java.io.File 类的升级
- JDK 1.7 中添加了 java.lang.AutoCloseable 接口，实现了 try-with-resources

## 文件系统、路径和一些工具类
- [Interface Path](http://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html)
- [Class FileSystem](http://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystem.html)
- [Class Paths](http://docs.oracle.com/javase/8/docs/api/java/nio/file/Paths.html)
- [Class FileSystems](http://docs.oracle.com/javase/8/docs/api/java/nio/file/FileSystems.html)

### 创建一个路径

- Paths 的静态方法 get()

|Modifier and Type|Method | Description|
|---|---|---|
|static Path|	get(String first, String... more)|Converts a path string, or a sequence of strings that when joined form a path string, to a Path.|
|static Path|get(URI uri)|Converts the given URI to a Path object.|

```java
Path p = Paths.get("C:/temp");
Path p_ = Paths.get("/home","user");
```

- FileSystem 的成员方法 getPath()

> 可以通过 FileSystems 的静态方法 getDefault()获取默认的FileSystem

|Modifier and Type|Method | Description|
|---|---|---|
|abstract Path|getPath(String first, String... more)|Converts a path string, or a sequence of strings that when joined form a path string, to a Path.|

```java
Path p =FileSystes.getDefault().getPath("/home","user");
```

### Interface Path
[JDK API : Interface Path](http://docs.oracle.com/javase/8/docs/api/java/nio/file/Path.html)

|Modifier and Type|Method | Description|
|---|---|---|
|Path	|   normalize()| 路径普通化 Returns a path that is this path with redundant name elements eliminated.|
|Path	|   subpath(int beginIndex, int endIndex)| 截取子路径 Returns a relative Path that is a subsequence of the name elements of this path.|
||**判断路径开头和结尾**||
|boolean	|startsWith(Path other)|Tests if this path starts with the given path.|
|boolean	|startsWith(String other)|Tests if this path starts with a Path, constructed by converting the given path string, in exactly the manner specified by the startsWith(Path) method.|
|boolean	|endsWith(Path other)|Tests if this path ends with the given path.|
|boolean	|endsWith(String other)|Tests if this path ends with a Path, constructed by converting the given path string, in exactly the manner specified by the endsWith(Path) method.|
||**获取路径的相关信息**||
|Path	| getFileName()|Returns the name of the file or directory denoted by this path as a Path object.|
|FileSystem	|getFileSystem()|Returns the file system that created this object.|
|Path	| getName(int index)|Returns a name element of this path as a Path object.|
|int|	getNameCount()|Returns the number of name elements in the path.|
|Path	|getParent()|Returns the parent path, or null if this path does not have a parent.|
|Path	|getRoot()|Returns the root component of this path as a Path object, or null if this path does not have a root component.|
||**Path to Path**||
|Path	 |  relativize(Path other)|Constructs a relative path between this path and a given path.|
||**路径替换拼接**||
|Path	|   resolve(Path other)|Resolve the given path against this path.|
|Path    |	resolve(String other)|Converts a given path string to a Path and resolves it against this Path in exactly the manner specified by the resolve method.|
|Path	|   resolveSibling(Path other)|Resolves the given path against this path's parent path.|
|Path	|   resolveSibling(String other)|Converts a given path string to a Path and resolves it against this path's parent path in exactly the manner specified by the resolveSibling method.|
||**转换**||
|boolean	|isAbsolute()|Tells whether or not this path is absolute.|
|Path	|   toAbsolutePath()|Returns a Path object representing the absolute path of this path.|
|File|	toFile()|Returns a File object representing this path.|
|Path	 | toRealPath(LinkOption... options)|Returns the real path of an existing file.|
|URI	|toUri()|Returns a URI to represent this path.|
|String	|toString()|Returns the string representation of this path.|


*deleteIfExists(Path)  删除不存在path时，不会报 NoSuchFileException 异常 *


## 参考
- [Java IO 详解](http://davidisok.iteye.com/blog/2106489)
