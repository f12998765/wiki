# Java 接口 抽象类 内部类

## 什么是接口？
接口是一种服务提供者与服务使用者之间的协议。

**接口的定义**
```java
访问修饰符 interface  接口名 extends  父接口列表{

}
```

**接口的实现**

```java
访问修饰符 class 类名 extends 父类 implements  接口列表{

}

```
## 接口中的成员

**字段**
* 必须初始化
* 默认：`public` `static` `final`

**抽象方法**
* 默认为： `public abstract`
* 没有主体，由分号结束

**静态方法和默认方法**
* Java 8 支持在接口中定义静态方法和默认方法

# 抽象类
* 抽象类和抽象方法有 `abstract` 修饰符修饰。
* 包含抽象方法的类必须定义为抽象类。
* 抽象类不能被实例化，抽象方法必须在子类中被实现。
* 只有通过子类继承抽象类并覆盖了抽象类中的**所有**抽象方法后，该子类才可以实例化。否则，该子类还是一个抽象类。

## 什么时候使用抽象类和接口？
接口：
* 实现多重继承

抽象类：
* 成员方法需要默认实现
* 基本方法不断改变

# 内部类

使用内部类最吸引人的原因是：**每个内部类都能独立地继承一个（接口的）实现**，所以无论外围类是否已经继承了某个（接口的）实现，对于内部类都没有影响。

**在单个外围类中，可以让多个内部类以不同的方式实现同一个接口，或者继承同一个类。**

除了该外围类，其他类都不能访问

内部类可以访问外围类的成员，哪怕是 用 `private` 修饰的。

## .this 和 .new

在内部类中使用 `外部类名.this` 获得外部类对象的引用。

在程序中，使用 `外部类名.内部类名 对象名=外部对象.new 内部类名()` 创建内部类。

## 分类
成员内部类、局部内部类、匿名内部类、静态内部类
### 成员内部类

- 成员内部类可以访问外围类的成员，哪怕是 用 `private` 修饰的。
- 成员内部类中不能存在任何static的变量和方法
- 成员内部类是依附于外围类的，所以只有先创建了外围类才能够创建内部类。
- 成员内部类是类的一个成员可以**用访问修饰符修饰**，注意访问

```java
class A{
    class B{
        // B 就是成员内部类
    }
}
```
### 局部内部类

在**方法或{}作用域**中定义，作用范围也是方法内。

```java
public class Parcel5 {
    public Destionation destionation(String str){
        //注意巧妙地实现接口
        class PDestionation implements Destionation{
            private String label;
            private PDestionation(String whereTo){
                label = whereTo;
            }
            public String readLabel(){
                return label;
            }
        }
        return new PDestionation(str);
    }
    
    public static void main(String[] args) {
        Parcel5 parcel5 = new Parcel5();
        //使用接口接收返回值
        Destionation d = parcel5.destionation("chenssy");
    }
}
```
### 匿名内部类
- 直接传参数或作为返回值，格式：`new 接口名或抽象类(){ // 类的实现 }`，隐含实现一个接口或者类
- 没有访问修饰符、对象名、构造函数、静态成员
- **存在疑问**当所在的方法的形参需要被内部类里面使用时，该形参必须为`final`
- 属于局部内部类

```java
void get(new A(){ },final int num ){
    return new B(){
    }
}
```

### 静态内部类

- 使用static修饰
- 内部可以有静态方法和静态成员变量
- 只能使用外部类的静态成员
- 直接创建对象，不需要外部类的对象

创建静态内部类
```java
外部类名.静态内部类名  对象名 = new 外部类名.静态内部类名();
```