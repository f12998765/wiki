# Java 枚举

## 创建

```java
public enum enumName{
    parm1,
    parm2,
    ...
}
```

- 创建枚举类型要使用 enum 关键字，隐含了所创建的类型都是 java.lang.Enum 类（抽象类）的子类

- 枚举类型符合通用模式 Class Enum<E extends Enum<E>>，而 E 表示枚举类型的名称。

- 枚举类型的每一个值都将映射到 protected Enum(String name, int ordinal) 构造函数中

## switch

例:

```java
public class App
{
     private enum INT{
        one,two,three
    }
    public static void main(String[] args) {
        INT c = INT.one;

       // 注意case中必须写成one
        switch (c){
            case one:{
                System.out.println("1");
                break;
            }
            case two:{
                System.out.println("2");
                break;
            }
            case three:{
                System.out.println("3");
                break;
            }
            default:{
                System.out.println("0");
            }
        }
    }
}
```

## 成员变量与构造函数

**如果定义的枚举有自己的构造函数必须声明私有的**

```java
public class App
{
     private enum INT{
        one(1,"one"),two(2,"two"),three(2,"three");//注意有分号  

         int i;
         String name;

        INT(int i, String name) {
             this.i = i;
             this.name = name;
         }
         public int getI() {
             return i;
         }
         public void setI(int i) {
             this.i = i;
         }
         public String getName() {
             return name;
         }
         public void setName(String name) {
             this.name = name;
         }
     }
    public static void main(String[] args) {

        INT[] ints = INT.values();
        for(INT n :ints){
            System.out.println("name : \t"+n.getName());
            System.out.println("index : \t"+n.getI());
            System.out.println("oridary : \t"+n.ordinal());
            System.out.println("this : \t"+n);
            System.out.println("name : \t"+n.name());
            System.out.println("name : \t"+n.valueOf("two"));
            System.out.println("---------------------");
        }
    }
}

```

## 方法

|方法|作用|
|---|---|
|ordinal()|返回枚举值在枚举类种的顺序|
|values()|静态方法，返回一个包含全部枚举值的数组|
|toString()|返回枚举常量的名称|
|valueOf()|返回带指定名称的指定枚举类型的枚举常量|

## 实现接口

可以更方便地对枚举中的值进行排序、比较等操作，封装性更好.

```java
   interface INT_ {
        void read();

        String getState();
    }

     private enum INT implements INT_{
        one(1,"one"),two(2,"two"),three(2,"three");

         int i;
         String name;

        INT(int i, String name) {
             this.i = i;
             this.name = name;
         }

         @Override
         public void read() {

         }

         @Override
         public String getState() {
             return null;
         }
     }
```

## EnumMap 和 EnumSet

### EnumMap

```java
    public static void main(String[] args) {

        EnumMap<INT,String> ints = new EnumMap<INT,String>(INT.class);
        ints.put(INT.one,"11111111");
        ints.put(INT.two,"22222222");
        ints.put(INT.three,"333333333");
        Set<INT> keys = ints.keySet();
        for(INT i:keys)
        {
            System.out.println(i.name()+" "+i.ordinal()+" "+ints.get(i));
        }
    }
```

### EnumSet

```java
    public static void main(String[] args) {

        EnumSet<INT> ints = EnumSet.allOf(INT.class);
        for(INT i : ints)
        {
            System.out.println(i);
        }
    }
```
