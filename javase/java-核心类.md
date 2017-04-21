# Java 核心类

# java.lang.Object

|方法|说明|
|---|---|
|equals|将该对象与传入的对象比较|
|toString|返回该对象的说明|
|hashCode|返回该对象的一个哈希值|
|getClass|返回该对象的一个java.lang.Class对象|
# java.lang.String
String 对象表示一个字符串。一个String对象是常量。

## 创建
```java
//常见，直接将字符串赋值给对象
String s = "java is cool";

//使用new来构建一个String对象
String m = new String("Hello");
```
## 字符串比较
**字符串赋值和new关键字赋值的不同。**
```java
String s1="Java";
String s2="Java";
if(s1==s2){ }//ture
```
```java
String s1 = new String("Java");
String s2 = new String("Java");
if(s1 == s2){ }//false
```
**equals方法**
```java
if(s1 != null && s1.equals("java"))   //s1为空时，会有运行时异常
if("Java".equals(s1)   //常用
```
## 字符串赋值
* 字符串以`"`开始和结束，不可以在结束双引号之前换行。
* 可以使用加号连接符`+`将多个字符串连接起来。
* 将 String 与基本类型或其他类型连接，或调用后者的`toString()`方法。

## switch
从 Java 7开始，可以对一个 String 使用switch 语句。

## String 类的方法
|方法|作用|
|---|---|
|public char charAt(int index)|返回指定索引的字符|
|public String concat(String s)|在末尾连接字符串，并返回结果|
|public boolean equals(String s)|比较字符串的值|
|public boolean startWith(String prefix)|测试是否以指定的前缀开头|
|public boolean endsWith(String suffix)|测试是否以指定的后缀结尾|
|public int indexOf(String substring)|返回指定子字符串第一次出现的索引位置，不存在，返回 -1|
|public int indexOf(String substring ,int formIndex)|返回指定子字符串从指定索引开始的出现的第一次索引位置，不存在，返回 -1|
|public int lastIndexOf(String substring)|返回指定字符串最后一次出现的索引位置,不存在，返回 -1|
|public int lastindexOf(String substring,int formIndex)|返回指定子字符串从指定索引开始的出现的最后一次索引位置，不存在，返回 -1|
|public String substring(int beginIndex)|返回从指定索引开始的，到末尾的子字符串|
|public String substring(int beginIndex,int endIndex)|返回从beginIndex开始到endIndex结束的子字符串|
|public String replace(char oldChar,char newChar)|将oldChar 替换为newOld，并返回新的字符串|
|public int length()|返回字符串的长度|
|public boolean isEmpty()|判断字符串是否为空|
|public String[] split(String regEx)|使用指定的正则表达式分割字符串|
|public char[] toCharArray()|将字符串转换为字符的数组|
|public String toLowerCase()|将所有字符转换为小写|
|public String toUpperCase()|将所有字符转换为大写|
|public String trim()|去掉头部和尾部的空格|
|public static String valueOf( )|将基本类型、字符数组、对象转换为一个字符串|

## StringBuffer和StringBuilder

java.lang.StringBuffer和java.lang.StringBuilder

String 对象不可变，添加或插入字符都会创建一个新的对象。

### StringBuffer和StringBuilder的选择
一般用 StringBulider
需要同步选择 StringBuffer

### 方法
|方法|作用|
|---|---|
|public int capacity()|返回对象的容量|
|public int length()|返回存储字符串的长度|
|public String__ append(String string)|将string添加到末尾|
|public String__ insert (int offset,String string)|在指定位置插入字符串|
|public String toString()|返回一个String对象|
# 基本类型包装器
## 包装类
|基本类型	|对应包装类|
|---|---|
|byte   |Byte|
|short	|Short|
|int	|Integer|
|long	|Long|
|char	|Character|
|float	|Float|
|double	|Double|
|boolean	|Boolean|

> 除了Integer和Character类以后，其它类的类名和基本数据类型相同，只是类名首字母大写。

## 包装器类的方法

1. **构造方法**：**基本类型** --> 包装器类
2. **构造方法**：**字符串** --> 包装器类

* 带有基本值参数并创建包装类对象的构造函数  `Integer obj=new Integer(145);`
* 带有字符串参数并创建包装类对象的构造函数  `Integer obj=new Integer("-45.36");`

1. **parse___**：**字符串** --> 基本类型
2. **___Value**：**包装器类** --> 基本类型

* 可生成对象基本值的typeValue方法  `obj.intValue();`
* 将字符串转换为基本值的 parseType方法  `Integer.parseInt(args[0]);`

1. **toString**：**包装器类** -->字符串
3. **___.valueOf**：**字符串** -->包装类

## 自动装箱/拆箱
JDK1.5的新特性：自动装箱/拆箱(Autoboxing/unboxing)

自动装箱
 - 基本类型就自动地封装到与它相似类型的包装中，如：Integer i = 100；
 - 本质上是，编译器编译时自动添加：Integer i = new Integer(100);


自动拆箱
 - 包装类对象自动转换成基本数据类型。如：int a = new Integer(100);
 - 本质是上，编译器编译时自动添加：int a = new Integer(100).intValue();

## 字符串与基本类型的相互转换
### 基本类型 --> 字符串
1. 包装类 的 `toString()` 方法
2. String类 的 `valueOf()` 方法
3. 空字符串`" "` + 基本类型

### 字符串 --> 基本类型
1. 包装类的 parseXxx 静态方法
2. 包装类的 valueOf() 方法转换为基本类型的包装类，自动拆箱

# java.lang.Class

## 关于
1. 每次 JVM 创建对象时，都会创建一个 java.lang.Class 对象来描述该对象的类型。
2. 同一个类的所有实例，都共享同一个 Class 对象。
3. Class 类没有 public 的构造方法，只能有 JVM 创建.

## 获取 Class 实例
1. 实例变量 obj.getClass()；
2. 对象类文件 Object.class；
3. Class的静态方法 forName();

> 数组只能用`.getClass`，不可以用 `.class`

## 使用
### Class.forName()
|方法|描述|
|---|---|
|static Class<?> forName(String className)|Returns the Class object associated with the class or interface with the given string name.|
|static Class<?> forName(String name, boolean initialize, ClassLoader loader)|Returns the Class object associated with the class or interface with the given string name, using the given class loader.|

**参数**
- name - 类的全名
- initialize - 表示是否初始化类
- loader - 表示加载时使用的类加载器

Class.forName(className)实际上是调用Class.forName(className,true, this.getClass().getClassLoader())，默认初始化类，使用默认的类加载器。Class.forName（className）加载类时则已初始化。

CLass.forName()的作用是要求JVM 查找并加载指定的类。
静态代码段在类加载时执行。

### newlnstance()
用来创建实例

**和new 的区别**
- newlnstance ： 使用时类必须已经加载连接，只能调用无参构造函数
- new ： 可以调用任意公共构造函数

构造函数调用 newlnstance 可以含参。
### 判断类型

|方法|作用|
|---|---|
|isAnnotationPresent(Class<? extends Annotation> annotationClass)| 判断指定注解是否存在于该元素上|
|isArray()| 判断该对象是否表示数组|
|isAnnotation()|判断该对象是否表示注解类型|
|isAnonymousClass() |當且僅當底層類是匿名類此方法返回true|
|isAssignableFrom(Class<?> cls) |判断该对象是否与另一个Class对象相同，或者是他的超类或接口|
|isInstance(Object obj)| 判断 obj 是否兼容于该 class 对象，即 obj 是否是 class 的自身实例或子类实例|
|isInterface() |判断该对象是否表示接口类型|
|isEnum() |判断该对象是否表示枚举类型|
|isSynthetic() |判断该对象是否表示合成类|
|isMemberClass() |判断该对象是否表示内部类/成员类|
|isLocalClass() |判断该对象是否表示局部类|
|isPrimitive() |判断该对象是否表示基本类型|

# java.lang.System

# java.lang.Scaner
