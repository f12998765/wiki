# Java 排序

# Comparable vs Comparator

## Comparable
Comparable 需要比较的对象类继承该接口，并实现 `compareTo(Object obj)` 方法。

注意与 equals() 的一致性

### [API](http://tool.oschina.net/uploads/apidocs/jdk-zh/java/lang/Comparable.html)
|方法|摘要|
|---|---|
|int	compareTo(T o) |  比较此对象与指定对象的顺序。|


**注意使用泛型**
```java
public class 类名 implements Comparable<类名>{
    //……
    @Override
    public int compareTo(类名 o) {
        //大于返回正数，小于返回负数，等于返回0
    }
}
```

### 备注
- `java.util.Collections.sort(List) `
-  `java.util.Arrays.sort(Object[])`

## Comparator

Comparator 需要创建一个比较器（类），来继承该接口，并实现 `compare(Object o1, Objecto2)` 方法。

适合定义多种比较属性。

### [API](http://tool.oschina.net/uploads/apidocs/jdk-zh/java/util/Comparator.html)
|方法|摘要|
|---|---|
|int	compare(T o1, T o2) |  比较用来排序的两个参数。|
### 例
```java
public class EmComparable implements Comparator<类名> {
    @Override
    public int compare(类名 o1,类名 o2) {
        //大于返回正数，小于返回负数，等于返回0
    }
}
```

### 备注
- `java.util.Collections.sort(List, Comparator)`
-  `java.util.Arrays.sort(Object[], Comparator)`


## 参考
- [Java排序: Comparator vs Comparable 入门](http://fuxueliang.com/tech/2013/05/26/java-sorting-comparator-vs-comparable-tutorial/)
- [简单介绍Java中Comparable和Comparator](http://www.hollischuang.com/archives/1292)
