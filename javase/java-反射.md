# Java 反射

**反射是将java 类中的各种成分映射成相应的类。**

JAVA反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为java语言的反射机制。

## Class Name
### 获取完整类名
```java
String className = class.getName();
```
### 获取不包含包名的类名
```java
String simpleClassName = class.getWSimpleName();
```

## Class Modifies
### 获取修饰Class 对象的访问修饰符

```java
int modifiers = class.getModifiers();
```
### 检查修饰符
```java
import  java.lang.reflect.Modifier;

Modifier.isAbstract(int modifiers)
Modifier.isFinal(int modifiers)
Modifier.isInterface(int modifiers)
Modifier.isNative(int modifiers)
Modifier.isPrivate(int modifiers)
Modifier.isProtected(int modifiers)
Modifier.isPublic(int modifiers)
Modifier.isStatic(int modifiers)
Modifier.isStrict(int modifiers)
Modifier.isSynchronized(int modifiers)
Modifier.isTransient(int modifiers)
Modifier.isVolatile(int modifiers)
```
## Package Info
获取包的相关信息：
```
Package package = class.getPackage();
```

## Superclass
获取超类
```java
Class superclass = class.getSuperclass();
```
## Implemented Interfaces
获得类实现的接口的列表
```java
Class[] interfaces = class.getInterfaces();
```
要获取一个给定类的完整的所实现接口的列表，需要递归查询该类以及它的超类。

## Constructors
### 获得构造函数
```java
Constructor[] constructors = class.getConstructors();
```
### 获取指定参数的构造函数
```java
Constructor constructor = class.getConstructor(new Class[]{String.class});
```
### 获取构造函数的参数
```java
Class[] parameterTypes = constructor.getParameterTypes();
```
### 调用构造函数，实例化对象
```java
Constructor constructor = MyObject.class.getConstructor(String.class);
MyObject myObject = (MyObject) constructor.newInstance("参数");
```

## Methods
### 获取类中的公共方法
```java
Method[] method = class.getMethods();
```
### 获取指定的方法
```java
//不存在与参数匹配的方法时，报 NoSuchMethodException 异常
Method method = class.getMethod("doSomething", new Class[]{String.class});
Method method = aClass.getMethod("doSomething", null);
```
### 获取方法的参数
```java
Class[] parameterTypes = method.getParameterTypes();
```
### 获取方法的返回值类型
```java
Class returnType = method.getReturnType();
```
### 调用方法
```java
Method.invoke(Object target, Object... parameters)
//参数  target  是要调用方法的对象
//静态方法需要提供null作为参数，非静态方法需要提供对象的实例。

Method method = MyObject.class.getMethod("doSomething", String.class);
Object returnValue = method.invoke(null, "parameter-value1");
```

## Fields

### 获取类的公共字段
```java
Field[] fields = class.getFields();
```
### 获取指定字段名的字段
```java
Field field = class.getField("字段名");
```
### 根据字段获取字段名
```java
String fieldName = field.getName();
```
### 根据字段获取字段类型
```java
Class fieldType = field.getType();
```
### 通过字段获取设置字段的值
```java
//参数objectInstance必须是拥有该字段的实例
Class  class_  = MyObject.class
Field field = class_.getField("字段名");
MyObject objectInstance = new MyObject();
Object value = field.get(objectInstance);
field.set(objetInstance, value);
```

## Annotations
```java
Annotation[] annotations = class.getAnnotations();
```
## 关于私有成员
### 私有字段
获得私有字段，仅仅在当前类中
```java
Field field = class.getDeclaredField(String name);

Field[] fields = class.getDeclaredFields();

field.setAccessible(true); //关闭对特定的Field实例的访问检查
```
### 私有方法
获得私有方法，仅仅在当前类中
```java
Method  method = class.getDeclaredMethod(String name, Class[ ] parameterTypes);

Method[] method = class.getDeclaredMethods();

method.setAccessible(true); //关闭对特定的Method实例的访问检查
```

## 数组
### 创建数组
```java
import java.lang.reflect.Array;

int[] intArray = (int[]) Array.newInstance(int.class, 3);
//第一个参数int.class指定了数组类型。
//第二个参数声明了数组大小。
```

### get 和 set
```java
Array.get(数组实例,序列);

Array.set(数组实例,序列,值);
```
### 获取数组的类型
```java
Class class_ = class.getComponentType();
```
# 参考

- [Java 反射 【译】](http://www.cnblogs.com/penghongwei/p/3299688.html)
- [java-reflection \[英\] ](http://tutorials.jenkov.com/java-reflection/index.html)
