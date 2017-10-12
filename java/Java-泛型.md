# 泛型

## 泛型是什么?

泛型是一种编译器机制，在编写代码时**参数化类型**，在实例化化时**指定**。

## 泛型编程

### 泛型类/容器类

> 泛型类中依然可以使用基本类型和引用类型，不一定都要参数化类型

定义一个泛型类

> 在类名后使用 <> 定义一个参数化类型。

```java
public class App<T> {
    private T x;

    public T getX() {
        return x;
    }

    public void setX(T x) {
        this.x = x;
    }
}
```

实例化泛型类

```java
public class Main{
    public static void main(String[] args) {

        //指定类型为 String
        App<String> app = new App<>();
        app.setX("Hello World!");
        System.out.println(app.getX()); //Hello World!

        //指定类型为 Integer
        App<Integer> app1 = new App<>();
        app1.setX(100);
        System.out.println(app1.getX()); // 100
    }
}
```
> 实例化时指定的参数类型必须是类，不能是**基本类型**，原因看 泛型的实现原理 。

定义一个有多个参数类型的泛型类

> 在 <> 中可以定义多个参数化类型，之间用 , 隔开

```java
public class App1<T,U,B>{

}
```
实例化

```java
App1<String,Integer,String> app1 = new App1<>();
```

定义一个泛型抽象类

```java
public abstract class App2<T> {
    private T y;

    public T getY() {
        return y;
    }

    public void setY(T y) {
        this.y = y;
    }
}
```

继承抽象泛型类

```java
public class App3 extends App2<String> {
    public static void main(String[] args) {
        App3 app3 = new App3();
        app3.setY("泛型抽象类");
        System.out.println(app3.getY());
    }
}
```

> 参数化类型的名称可以自定义，常用的有KTVE，具体含义看 。

### 泛型接口

定义一个泛型接口

> 接口中参数化类型的定义和类的一样

```java
public interface IApp<T>{
    public T get();
}
```

接口继承泛型接口

```java
public interface IApp1 extends IApp<String> {
    public String getAll();
}
```

泛型接口实现

```java
public  class AppImpl implements IApp<String> {
    @Override
    public String get() {
        return null;
    }
}
```

### 泛型方法

> 泛型方法不只可以泛型类、泛型接口中定义，**普通类** 中也可以

定义一个泛型方法

> 在普通方法中定义参数化类型，在访问修饰符之后，返回类型之前，使用 <> 定义。

```java
//使用参数化类型定义参数的类型
public <T> void hello(T t){
    System.out.println("Hello"+t);
}

//使用参数化类型定义返回类型
public <T> T hello2(){
    return null;
}

//一起使用
public <T> T hello3(T t){
    return t;
}
```

定义一个静态的泛型方法

> 在静态泛型中定义参数化类型，在static 之后，返回类型之前

```java
public static <T> T world(T t){
    return t;
}
```

一个可变参数的例子

```java
public static <T> void out(T... args) {
    for (T t : args) {
        System.out.println(t);
    }
}
```

使用泛型方法

```java
//像普通的方法一样用
app.hello();
//指定参数化类型
app.<String>hello();
//静态方法也一样
App.world();
App.<String>world();
```

## 泛型的继承

###  泛型类的继承

> 类型参数是当前类定义的。

```java
//type parameter of App1
public class App1<T> extends App0<T>{

}
```

### 泛型类实现泛型接口

```java
public class App<T> extends IApp<T>{

}
```
### 泛型接口继承泛型接口

```java
public class IApp1<T> extends IApp0<T>{

}
```

### 泛型接口和泛型抽象类

- 泛型接口可以做基础的容器接口，定义基本的操作。
- 泛型抽象类实现泛型接口。
- 具体接口继承泛型接口，并定义自己的方法。
- 具体类继承泛型抽象类，并实现具体接口。

## 通配符和上下界

### 通配符 ?

通配符 ? 表示未知类型，不确定类型。

**只是用来在实例化时填充**

例
```java
//定义一个通用的容器类引用
App<?> app;

//指向不同对象
app = new App<String>();

app = new App<Integer>();
```

### 上下界

关键字: extends super

- < ? extends T> : 声明上界，表示参数化的类型是 T 或 T 的子类型

- < ? super T>：声明下界，表示参数的类型是 T 或 T 的父类型，直至 Object

理解通配符和上下界的三个方面

- 引用指向的实现对象是否在上下界范围内
- 添加元素时，注意类型是否确定，注意多态（父类引用指向子类实现对象）
- 返回值的类型


**深入理解 < ? extends T>**

```java
public class Main {
    static class A{};
    static class B extends A{};
    static class C extends B{};

    public static void main(String[] args) {
        List<? extends A> list = new ArrayList<B>();
        //编译器报错
        //list.add(new A());
        //list.add(new B());
        //list.add(new C());
        list.add(null);

        B b = list.get(0);
    }
}
```
list 指向的是 A 或者 A 的子类型的ArrayList 对象

list 不能添加非空元素，原因是 **编译器无法确定List所持有的类型**

但可以取出时，值得类型是 A ，因为多态，父类引用指向子类实现。

**深入理解 < ? super T>**

```java
public class Main {
    static class A{};
    static class B extends A{};
    static class C extends B{};
    public static void main(String[] args) {
        List<? super B> list = new ArrayList<B>();
        //注释掉的编译错误
        //list.add(new A());
        list.add(new B());
        list.add(new Object());
        //list.add(null);
    }
}
```
List< ? super B> list 可以指向是 B 或 B 的父类型的 ArrayList 对象

但是可以添加的元素类型应该是 B 或 B 的子类型，可以添加原因也是多态

从list中取值，返回的是 Object

## PECS原则

如果要从集合中读取类型T的数据，并且**不能写入**，可以使用 ? extends 通配符；(Producer Extends)

如果要从集合中写入类型T的数据，并且**不需要读取**，可以使用 ? super 通配符；(Consumer Super)

如果既要存又要取，那么就不要使用任何通配符。

出 处 ：[Java泛型中的PECS原则](http://flyingcat2013.blog.51cto.com/7061638/1616068)

## ? 和 T 的区别

- ? 用在**实例**泛型时，填充范围。

- T 用在**定义**泛型时，参数化类型。

> 与上下界一起使用时，区别还是一样。

## 泛型的实现原理

泛型的实现在编译阶段，通过**类型擦除**实现


### [Type Erasure](http://docs.oracle.com/javase/tutorial/java/generics/erasure.html)

Generics were introduced to the Java language to provide tighter type checks at compile time and to support generic programming.

Java 引入泛型，可以在编译时提供更严格的类型检查，并且支持泛型编程。

To implement generics, the Java compiler applies type erasure to:

为了实现泛型，java 编译器使用类型擦除 ：

- Replace all type parameters in generic types with their bounds or Object if the type parameters are unbounded. The produced bytecode, therefore, contains only ordinary classes, interfaces, and methods.
- Insert type casts if necessary to preserve type safety.
- Generate bridge methods to preserve polymorphism in extended generic types.

- 将所有参数类型替换成其边界，如果没有边界替换成 Object 。因此，产生的字节码文件仅仅包含普通类、接口和方法。
- 必要时添加类型转换以保存类型安全
- 生成桥方法以在扩展泛型时保持多态性

Type erasure ensures that no new classes are created for parameterized types; consequently, generics incur no runtime overhead.

类型擦除确保不因为参数化类型而创建新类； 因此，泛型不会产生运行时开销。

### 几种擦除

1. <T>  --> Object
2. <? extends T> --> T
3. <? super T> --> Object
4. 添加桥接方法，保证多态性

与之前的深入理解有关

### 类型擦除的相关

1.类型擦除，在编译之前进行类型检查

2.泛型与重载

因为类型擦除，所以下面的两个方法的参数类型相同，会报错，both methods hava same erasure.

```
public void a(List<Object> list){};
public void a(List<String> list){};
```
3.泛型与多态

会生成桥方法，以保证多态

4.泛型与static

类的参数化类型不能定义静态变量和方法。

但是泛型方法可以定义成静态方法，它使用的自己的参数类型。

```
public static <T> T get( STring s){};
```
泛型类的所有静态变量是共享的。

## Java 泛型经常使用的符号的含义

- T -- Type / java 类
- K -- Key / 键
- V -- Value / 值
- E -- Element / 集合中的元素
- ? -- 通配符
- S、U、V -- 2nd、3rd、4th types

## 参考

- [Java泛型通配符extends与super](http://www.cnblogs.com/sharewind/archive/2012/11/26/2788698.html)
- [Java泛型中extends和super的理解](http://www.hollischuang.com/archives/255)
- [Java的类型擦除](http://www.hollischuang.com/archives/226)
- [java泛型（二）、泛型的内部原理：类型擦除以及类型擦除带来的问题](http://blog.csdn.net/lonelyroamer/article/details/7868820)
- [Java泛型中K T V E ？ object等的含义](www.hollischuang.com/archives/252)
