# Java 基础知识

## Java 类型

不初始化的变量都不能使用，不管是基本类型还是对象。

### 基本类型
Java 类型分为 基本类型和引用类型

基本类型存储在栈中，每种类型占用的存储空间确定

8 个基本类型
- 数值整数型：byte(8)、short(16)、int(32)、long(64)
- 数值浮点型：float(32)、double(64)
- 布尔类型：boolean
- 字符类型：char(16)

- 所有数值类型都有正负号
- 布尔类型的存储大小没有定义
- 除了这八种外还有一个基本类型 void ，而且有对应的包装类
- long 常量声明 `L` ，float 常量声明 `f`
- 八进制数以字母 O 开头，十六进制数以 字母 Ox开头
- 字符常量使用两个单引号 `''`,字符串常量使用两个双引号 `""`

注意整数常量的表示，大于 Integer.MaxValue = 2147483647 的数，必须用Long类型表示，如 2147483648L

**转义字符是字符常量，而不是字符串常量**

常见的转义字符
- \r 表示接受键盘输入，相当于按下了回车键；
- \n 表示换行；
- \t 表示制表符，相当于Table键；
- \b 表示退格键，相当于Back Space键；
- \' 表示单引号；
- \'' 表示双引号；
- \\ 表示一个斜杠\。

### 类型装换

类型装换分为自动转换和强制转换

#### 自动转换

##### 数值

由低级别到高级别，按数值范围大小分级别

数值转换：byte<short<int<long<float<double

不管是变量还是常量，赋值时，低级别的数值转换都会自动转换的高级别。

对于**整数赋值给byte、short**说：
- 默认的整数常量的类型是 int
- 单个整数常量和整数常量表达式的结果类型，都可以直接赋值，如 byte b = 1 ; short s =2+4;等
- **含有变量的多元表达式**一定一定要注意，右侧相当于一个 int 变量，要注意类型是比当前级别高，如 short s = 1 ; s=s+1;
- **但是但是**  s+=1 是正确的，网上的解释是 `+=` 运算时进行了隐式的转换，等价于 s=(short)(s+1)

##### 运算

- 整数常量默认为 int ，浮点数常量默认为 double
- byte 、short、char 在运算时会自动转换成 int 类型
- 表达式的运算结果类型是表达式中**最高的级别**，注意上一条
- 注意表达式结果的数值范围和**类型**，byte -128~127 ，short -32768~32767，char 0~65535 

##### 字符
char 的编码格式是 UTF-16

对于 char 类型的**变量**：
- 不能自动转换成 byte和short
- 可转换成 int 或者更高
- 任何类型的**变量**都不能直接复制给char类型的变量，需要强制转换
- 可以给char 类型的变量直接赋值整数常量（0-65535)，大于 65535 的数需强转

给char类型的变量赋值大于 65535 的数，会将 mod 65536 的值赋给变量

对于 char 类型的**常量**：
- 可以直接复制给任意的数值类型 ，包括 byte

#### 强制转换

高级别的数转换成低级别

- 浮点数转换成整数，会直接丢掉小数
- 大范围的数转换成小范围的数，会溢出，如 (int) 2147483648L=-2147483648

### 包装类型
Boolean 
Character
Byte    Short   Integer Long    
Float   Double

#### 共同的方法
- 使用基本类型作为参数的构造函数，基本类型 --> 包装器类，如 Integer i = new Integer(12);
- Type.valueOf( num ) ，**静态方法**，将基本类型转换为包装类
- 使用 String 类型作为参数的构造函数，String 类 --> 基本类型，如 Integer i = new Integer("212");
- typeValue() 方法，生成基本类型，包装器类 --> 基本类型，如 obj.intValue()
- parseType("str") 方法，将字符串转换为基本类型，String 类 --> 基本类型，如parseInt("21312")
- hashCode()方法，生成哈希码
- equals() 方法，比较
- toString() 方法，生成字符串，包装器类 -->  String类

使用 String.valueOf( type ) 可以将基本类型转换为字符串，如 String str = String.valueOf(123);

#### 自动拆箱/装箱
在 JDK 1.5 引入了自动拆箱/装箱 ，自动会对基本类型与包装类型进行转换，主要改变是，集合类可以直接存放基本类型。

**参数传递时也会自动拆箱/装箱**

**装箱时使用 valueOf() 方法，拆箱使用 typeValue() 方法。**

**注意包装类可以赋值 null**，如下
```java
        Integer i = null;
        System.out.println(i.intValue());
```
编写不会报错，但是编译会报 `java.lang.NullPointerException`

**关于 valueOf（）方法的实现，及面试题**
```java
public static Integer valueOf(int i) {
        if(i >= -128 && i <= IntegerCache.high)
            return IntegerCache.cache[i + 128];
        else
            return new Integer(i);
    }
```
对于**Byte、Short、Integer、Long以及Charatcer**来说，自动装箱时使用 valueOf（）方法，数值在[-128,127] 就返回在cache中已经存在的对象，大于128的数会创建新的对象。注意 Charatcer 的数值必须大于等于0。
任意数值大小对于 Double 和 Float 都是创建不同的对象。

**注意 Boolean 的自动装箱**

```java
 public static final Boolean TRUE = new Boolean(true);
 public static final Boolean FALSE = new Boolean(false);
public static Boolean valueOf(boolean b) {
        return (b ? TRUE : FALSE);
}
```
对于 Boolean 的自动装箱，相同值的对象都是同一个。

**谨记** 使用 `new` 创建的对象都不相同

### 精确运算

**精确计算避免使用float和double，要使用 BigDecimal **

float与double 无法精确表示0.1 或者 10的负次方  

[JDK BigDecimal](http://docs.oracle.com/javase/7/docs/api/java/math/BigDecimal.html)

#### 计算步骤：
 1、用float或者double变量构建BigDecimal对象。
**不支持自动装箱**
```java
BigDecimal b1 = new BigDecimal(Double.toString(0.48)); //构造函数支持参数：字符数组（可截取），String，double，int，long
BigDecimal b2 = BigDecimal.valueOf(0.48);
```
 2、通过调用BigDecimal的加，减，乘，除等相应的方法进行算术运算。
```java
public BigDecimal add(BigDecimal value);                        //加法
public BigDecimal subtract(BigDecimal value);                   //减法 
public BigDecimal multiply(BigDecimal value);                   //乘法
public 	BigDecimal divide(BigDecimal divisor, int scale, RoundingMode  roundingMode)                    //除法 除数、精度、四舍五入方式
```
 3、把BigDecimal对象转换成float，double，int等类型。
```java
BigDecimal b = BigDecimal.valueOf(0.48);
double d d= b.doubleValue();
float d f= b.floatValue();
```

`public 	BigDecimal divide(BigDecimal divisor, int scale, RoundingMode  roundingMode)`

scale 表示小数点后保留几位

对于除法最好指定精度，因为结果是无限循环小数时，会报`java.lang.ArithmeticException` 算术异常

`Enum RoundingMode` 的值
- UP	取大于该数的最小数，与符号无关
- DOWN	直接舍去小数部分（取小于该数的最小数），与符号无关
- CEILING	取大于该数的最整数，与符号有关
- FLOOR	取小于该数的最小数，与符号有关
- HALF_UP	取最近值，等距向上，与符号无关
- HALF_DOWN	 取最近值，等距向下，与符号无关
- HALF_EVEN	取最近值，等距取偶，与符号无关
- UNNECESSARY

`public 	BigDecimal divide(BigDecimal divisor, RoundingMode  roundingMode)`

默认的精度为0，即取整数


#### 比较

eauals() 会比较精度

比较数值大小使用 compareTo()

## 控制语句

### 循环

#### 循环结束标识

- length ，是数组的属性
- length() ,是String的方法，返回字符串长度
- size() ,是集合类的方法，返回集合元素的个数

## 回调

```java
public class Test {
    public static void main(String[] args) {
        new A().TB();
    }
}
interface  Z{
    void p();
}

class A implements Z{
    @Override
    public void p() {
        System.out.println("DOOO");
    }
    void TB(){
        new B().BB(new A());
    }
}

class B{
    void BB(Z z){
        z.p();
    }
}
```

## 关于类结构

- 组合优于继承
- 接口优于抽象类
- 减小访问权限
- 能使用多态的地方不使用 instanceof


