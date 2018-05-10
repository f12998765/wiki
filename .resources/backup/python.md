# python

国内镜像：

- http://mirrors.sohu.com/python/



输入 

```python
input()
input('提示信息')
```

输出

```python
print()
```



4 个空格缩进



数据类型

- 整数
  - 十六进制：0x前缀，0-9，a-f
  - 无大小限制
- 浮点数
  - 科学计数法：1.23e9 = 1.23*10^9
  - 超出范围显示无限大 `inf`
- 字符串
  - 单引号双引号括起来的文本
  - 转义字符 `\`
- 布尔值
  - True
  - False
- 逻辑运算
  - and
  - or
  - not
- 空
  - None

变量

- 大小写字母、数字和`_` ，数字不能开头
- 变量类型不**固定**

常量

- 常量名全部是大写



运算

- 除法
  - `\` 正常的除法
  - `\\` 类似c语言的除法，商只有整数位
  - `%` 取余



编码

- `ord()` 获取字符的编码
- `chr()` 将编码转化为字符
- 直接转化为字符：`\u0041` 等价于 `A`



字节

- 字节数据表示：`b'ABC'`

- `encode()` 获取utf 字符串的bytes

  ```python
  '中文'.encode('utf-8')
  b'\xe4\xb8\xad\xe6\x96\x87'
  ```

- `decode()` 将 bytes 按某种编码解析

  ```python
  b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
  '中文'
  ```

- `len()` 

  - 计算字符串的字符数
  - 计算 bytes 的字节数



格式化字符串 `%`



| 替代符  |          |
| :--: | -------- |
|  %d  | 整数       |
|  %f  | 浮点数      |
|  %s  | 字符串      |
|  %x  | 十六进制整数   |
|  %%  | 转移，表示一个% |



list

一个有序集合，可随时添加删除元素，元素的类型可以不同，也可一嵌套另一个 list（类似于二维数组）

eg：

```python
lists = ['aaa','bbb','ccc']
```

`len()`：获取一个集合元素的个数

通过索引访问元素，索引从零开始

eg：

```python
lists[0]
```

也可以从后索引，`-1`表示最后一个元素

添加元素：

```python
lists.append('ddd')
```

插入元素：

```python
lists.insert(1,'111') # 1 表示索引号
```

删除末尾的元素

```python
lists.pop()
```

删除指定位置的元素

```python
lists.pop(1) # i 表示索引号
```

替换某个索引位置的元素，直接赋值即可

```python
lists[1] = 'ooo'
```



tuple

元组，有序列表，初始化后不可修改，可以使用索引访问，但不能赋值

eg：

```python
tuples = ('aaa','bbb','ccc')
```

一个小注意：

```python
tuples = (1,) # 定义只有一个元素的元组时，需要在元素之后添加个逗号，消除歧义（相对于数学运算）
```

另一个小注意：

在元组中定义集合，集合的指向不能变，但是集合中的元素可以变。



条件判断

if 、else、elif

eg：

```python
if a > b:
	print('a')
elif b > c:
	print('b')
else:
	print('c')
```

非零数值、非空字符串、非空list等就判断为 `True`，否则为 `False`



数值转换：

`int(str)` 将字符串转换为整数



循环

for ... in 循环，迭代 list 或 tuple

eg：

```python
lists = ['aaa','bbb','ccc']
for n in lists
	print(n)
```



`range(n)` 生成从 0 开始，但小于 n 的整数序列

`list()`将序列转换为 list



while 循环 

eg：

```python
while n > 0:
	sum += 1
    n-=1
```



break

跳出循环体

continue

结束本次循环



dict

字典，类似 java 中的map，key - value 存储

eg：

```python
vi = {'a':1,'b':2}
vi['a']
```

可以根据 key 来访问赋值 value ，所以多次修改同一个key对，value 总是最后一个



可以使用 `in` 判断 key 是否在字典中

```python
'c' in vi #False
```



通过 key 访问value时，如果 key 不存在会报错



使用 `get()` 方法也可以获取 value，当 key 不存在时返回 None 或者自定义的 value

eg：

```python
vi.get('z')
vi.get('z','xyz')
```



`pop(key)` 删除一个 key -value 对

```python
vi.pop('a')
```



set 

无序集合，不可重复



`set()` 能将一个 list 转为 set，重复元素自动剔除

eg：

```python
s = set([1,2,4,5,5])
```



`add(key)` 可以添加元素，添加重复元素时无效果

`remove(key)` 可以删除元素



set 可以做 集合交并

eg：

```python
s1 & s2 # 交集
s1 | s2 # 并集
```



函数

数值转换函数：`int()`、`float()`、`str()`、`bool()`



可以把函数赋值给一个变量，然后可以把变量当函数用



定义函数

```python
def 函数名(参数):
    return 返回值
```



空函数

```python
def nop():
    pass
```

替代未完成的功能，todo



返回多个值，实际上返回的是一个 tuple 

```python
def more():
    return 1,2

x,y = more()
```



默认参数

```python
def default(x,y=1):
	pass
```



默认参数在定义时，放在最右边



多个默认参数，特殊指定

```python
def more(x,y=1,z=1):
	pass

more(1,z=2)
```



默认参数应该指向不变参数，并非强制只是会发生异样



可变参数

类似指针的使用，传入一个数组的全部元素

```python
def add(*num):
    pass

nums = [1,2,3,4,5]
add(*nums)
```



关键字参数

将传入的 0 个或多个参数，组装成一个字典

```python
def get(x,**y):
    pass
```



命名关键字参数

只接受特定的关键词的参数，使用时必须传入关键字

```python
def get(x,*,y,z):
    pass
```



如果函数中包涵了可变参数，那么后面跟着的命名关键字就不需要`*` 分隔

```python
def get(x,*y,z):
    pass
```



也可以设置默认值

```python
def get(x,*,y=1,z):
    pass
```



参数组合

参数顺序：

​	必选参数、默认参数、可变参数、命名关键字参数、关键字参数



eg：

```python
def funcation(a,b,c=0,*args,**kw):
    pass
```



递归

尾递归优化，函数返回的时候调用自身，但是 python 并不支持



切片



针对有序的列表：list 或 tuple ，可以使用切片



格式：

```python
L[起始索引:结束索引（不包括）:间隔（默认为1，可不写）]
```



起始索引为 0 时，可以省略

eg：

```python
L[0:3] # 获取 L[0] L[1] L[2] 的值
L[:3] # 等价于上一条

L[0:5:2] # 从 0 到 5，按间隔为 2，取值
```



因为支持负数索引，所以可以从后切片

末尾索引略去，表示取值到列表的最后

eg：

```python
# 两者等价，取最后两个元素的值
L[-2:-1]  
L[-2:]
```



因为起始和末尾的索引可以略去，所以 `L[:]` 就代表这个列表，等价于 `L[0:]`



字符串也可以看成列表，支持切片，格式是在字符串之后添加索引

eg：

```python
'aabbccddeeff'[::2] # 'abcdef'
```



迭代



字典 dict 默认迭代的是 key 

- 迭代 value ，使用 `for value in d.values()`
- 同时迭代 key 、value ，使用 `for k,v in d.items()`



字符串也可以迭代



任何迭代对象 ， for 都可迭代



判断 一个对象 是否是可迭代对象

```python
from collections import Iterable
isinstance('abc', Iterable)  # True
isinstance(123, Iterable) # False
```



for 循环中使用索引，用`emumerate()` 将 list 转化为索引对

```python
for i,value in enumerate(['A','B','C']):
    print(i,value)
```

