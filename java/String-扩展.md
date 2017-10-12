# String扩展

## String 成员变量
String 是典型的[不变模式设计](http://www.cnblogs.com/java-my-life/archive/2012/05/08/2487757.html)

[JDK 8 源码地址](http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/8u40-b25/java/lang/String.java?av=f)

[JDK 6 源码地址](http://grepcode.com/file/repository.grepcode.com/java/root/jdk/openjdk/6-b27/java/lang/String.java?av=f)

```java

//JDK 1.8
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
	//The value is used for character storage.
	private final char value[];

	//Cache the hash code for the string
	private int hash; // Default to 0
}

//JDK1.6
public final class String implements java.io.Serializable, Comparable<String>, CharSequence{
	//The value is used for character storage.
	private final char value[];

	//The offset is the first index of the storage that is used.
	private final int offset;

	//The count is the number of characters in the String.
	private final int count;

	//Cache the hash code for the string
	private int hash; // Default to 0
}
```

## 常量池

java编译时会生成常量池（Constant pool），保存字面常量和符号引用（类名、方法名、接口名和字段名等）。

### 创建字符串对象

- new 运算符
- 字符串常量
- "+"连接的表达式


相同的字符串常量或结果相同的字符串常量表达式创建字符串对象时，
如果常量池中已经存在，相同序列的字符串，则该对象直接指向；不存在时，会在常量池创建一个新的字符串。

```java
String a1 = "abc";
String a2 = "abc";
String a3 = "a"+"bc";
System,out.println(a1==a2+"\t"+a2==a3); //true true
```
因为字符串序列相同，指向的常量池中同一个字符串，所以为true。

使用 new 创建字符串对象时，会在堆中创建一个新的String对象，并且该String对象的char value[]会指向常量池中的字符串，不存在则创建。

```java

String b1 = new String("abc");
String b2 = new String("abc");
System.out.println(b1==b2); //false
```
使用new会在堆中创建新的对象,地址当然不同.

### String +

- " "+[String] 或 [String]+[String]

会在编译时,调用StringBuilder的append()和toString(),最终指向的是堆上新创建的String对象.

```java
String c1 = "abc";
String c2 = "123"+c1;
String c3 = "123abc";
System.out.println(c2==c3); //false
```

- " "+" "

- [final String]+[final String] 或 [final String]+" "

当final修饰的对象发生连接动作时，虚拟机会进行优化，将表达式结果直接赋值给目标变量.

```java
final String a = "hello ";
final String b = "world";
String c = a + "world";
String d = "hello world";
System.out.println(c==d); //true
```

## String.intern()

是一个 Native 方法，调用 C++的 StringTable::intern

如果常量池中已经存在该字符串，则返回池中的字符串；否则将此字符串添加到常量池中，并返回引用。

## String.substring()

```java
//JDK1.6
public String substring(int beginIndex) {
	return substring(beginIndex, count);
}
public String substring(int beginIndex, int endIndex) {
	if (beginIndex < 0) {
		throw new StringIndexOutOfBoundsException(beginIndex);
	}
	if (endIndex > count) {
		throw new StringIndexOutOfBoundsException(endIndex);
	}
	if (beginIndex > endIndex) {
		throw new StringIndexOutOfBoundsException(endIndex - beginIndex);
	}
	return ((beginIndex == 0) && (endIndex == count)) ? this :
		new String(offset + beginIndex, endIndex - beginIndex, value);
}

String(int offset, int count, char value[]) {
	this.value = value;
	this.offset = offset;
	this.count = count;
}
```
JDK1.6 中的实现只是调整了 offset 和 count ,使用的是共享的字符数组。

当使用substring截取一个很长的字符串的2个字符时，会占用这个长字符串，不能垃圾回收。

```java
//JDK 1.8
public String substring(int beginIndex) {
        if (beginIndex < 0) {
            throw new StringIndexOutOfBoundsException(beginIndex);
        }
        int subLen = value.length - beginIndex;
		if (subLen < 0) {
            throw new StringIndexOutOfBoundsException(subLen);
        }
        return (beginIndex == 0) ? this : new String(value, beginIndex, subLen);
}

public String substring(int beginIndex, int endIndex) {
		if (beginIndex < 0) {
			throw new StringIndexOutOfBoundsException(beginIndex);
		}
		if (endIndex > value.length) {
			throw new StringIndexOutOfBoundsException(endIndex);
		}
		int subLen = endIndex - beginIndex;
		if (subLen < 0) {
			throw new StringIndexOutOfBoundsException(subLen);
		}
		return ((beginIndex == 0) && (endIndex == value.length)) ? this : new String(value, beginIndex, subLen);
}

public String(char value[], int offset, int count) {
		if (offset < 0) {
			throw new StringIndexOutOfBoundsException(offset);
		}
		if (count < 0) {
			throw new StringIndexOutOfBoundsException(count);
		}
		// Note: offset or count might be near -1>>>1.
		if (offset > value.length - count) {
			throw new StringIndexOutOfBoundsException(offset + count);
		}
		this.value = Arrays.copyOfRange(value, offset, offset+count);
}
```
分析一下 substring 源码

- 报StringIndexOutOfBoundsException异常
    - beginIndex < 0
    - endIndex > value.length
    - subLen < 0
- subLen 是新的字符串的长度
- endIndex的意义不明确
	- 理解为 beginIndex + subLen
	- beginIndex <= endIndex <= value.length
- 当截取范围与原字符串相同返回this，否则 new 一个新的String对象,在构造方法中复制生成了新的 value。
- substring(1,1)
	- ""==s.substring(1,1) //true
	- "".equals(s.substring(1,1)) //false

## 备注

1. 通过反射机制可以对String进行修改

2. == 和 equals()
	- == 比较引用是否指向堆内存中的同一个String对象
	- equals() 比较的是字符串的内容是否相同

3. String StringBuilder StringBuffer 区别
	- String是不可变(final)类，每次在String对象上的操作都会生成一个新的对象；
	- StringBuffer和StringBuilder是可变的，它允许在原来对象上进行操作，而不用每次增加对象；
	- StringBuffer是线程安全的，但效率较低，而StringBuilder则不是线程安全的，效率最高


## 参考连接

- [浅谈Java String内幕（上）](http://www.importnew.com/21711.html) -- javap 查看字节码
- [Java 7 源码学习系列（一）——String](http://www.hollischuang.com/archives/99) -- 看源码解释
- [关于Java String的一些总结](http://brokendreams.iteye.com/blog/2260870)
