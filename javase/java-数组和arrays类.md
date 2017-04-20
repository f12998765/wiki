# Java 数组

## 什么是数组？及声明数组变量

数组是存放一组相同类型的容器。

```java
DataType [] arryName;

DataType arryName [];
```

## 数组的初始化

```java
DataType[] arrayName = new DataType[arraySize];

DataType[] arrayName = {value0, value1, ..., valuek};

DataType[] arrayName = new DataType[arraySize] {value0, value1, ..., valuek};
```

> 未初始化的数组会默认赋值 : int --> 0、boolean --> false 、对象 --> null

## 数组引用及长度

```java
arrayName[index] //数组通过下标引用，并且会检查数组越界。

arrayName. length//每个数组都有一个属性length来表示长度
```
>  获取字符串的长度使用 length() 方法

## 遍历数组

**Loop循环**

```java
for(int i;i<arrayName.length;i++){
//Statements
}
```

**for-each循环**

```java
for(DataType e:Array){
//Statements
}
```

> for-each循环只能处理一维数组，二维数组需要双层循环。

## Array类
> 方法有多个重载，详细信息查看[Java API](http://tool.oschina.net/uploads/apidocs/jdk-zh/java/util/Arrays.html)

|方法|说明|
|---|---|
|asList|返回数组支持 的固定个大小的List|
|binarySearch|根据特定的键查找数组，返回索引|
|copyOf|创建一个指定长度的新数组，复制原数组的元素，根据长度进行截取和填充|
|copyOfRamge|根据原数组的指定范围创建新的数组|
|sort|数组排序|
|toString|返回数组的字符串表示|
|equals|比较数组是否相等|
|fill|将指定值赋值给全部元素|
