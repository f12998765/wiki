## Master theorem proof
## 主定理的前提

``` 
\begin{align*}  
T\left( n\right) &=aT\left( \dfrac {n} {b}\right) +f\left( n\right) &a\geq 1 ,  b>1
\end{align*}
```
- n为问题规模
- a为递推的子问题数量
- n/b为每个子问题的规模（假设每个子问题的规模基本一样）
- f(n)为递推以外进行的计算工作

## 主定理的结论

``` 
T(n)=\begin{cases}
 \Theta (n^{log_b a})& \exists \varepsilon >0,f(n)=O(n^{log_b a -\varepsilon }) \\ 
 \Theta (n^{log_b a}lgn)& \exists k \geq 0,f(n)=\Theta (n^{log_b a}) \\ 
 \Theta (f(n))& \exists \varepsilon >0,f(n)=\Omega (n^{log_b a +\varepsilon }) \text{ and }\exists c<1 , n \text{ large enough},af(\frac{n}{b})\leq cf(n)
\end{cases}
```
## 证明
### 递归树求T(n)

前提假设，n 为 b 的 i 次幂：

``` 
T(n)=
\begin{cases}
 \Theta (1)& \text{ if  } n = 1\\ 
 aT(\frac{n}{b})+f(n) & \text{ if  } n = b^i
\end{cases}
```
在假设的前提下，画出递归树：

![](https://ox.xizero.com/uploads/2017/03/master_theorem.png)

递归树的解读：

观察数列的变化，可以推出第 t 层的工作量，t 从0开始递增：

``` 
f(n),af(\frac{n}{b}),a^2f(\frac{n}{b^2}),...,a^tf(\frac{n}{b^t})
```

对 n 换元，n = \frac {n} {b^t} ，得出：

``` 
f(\frac{n}{b^t})=T(\frac{n}{b^t})-T(\frac{n}{b^{t+1}})
```
**重要** 设第 t 层为递归树的倒数第二层，层数从0开始递增，有： 

``` 
\begin{align*}  
&f(\frac{n}{b^t})=T(\frac{n}{b^t})-aT(\frac{n}{b^{t+1}})=T(\frac{n}{b^t})-aT(1)\\ &\Rightarrow \frac{n}{b^{t+1}}=1 \\ &\Rightarrow t=log_b n -1
\end{align*}
```
**重要** 而 t 是从 0 开始的，在加上 n=1 的一层，所以总高度为：

``` 
log_b n +1
```
每层节点的个数 num ，t 为从 0 开始递增的整数，有：

``` 
num = a^{t} 
```
从上面的证明中，已知递归树的倒数第二层的 t 值，而叶节点的个数应为：

``` 
a^{t+1} =a^{log_b n}=n^{log_b a}
```
**重要** T(n) 等于除了 T(1)层 + 除了T(1)层的工作量，所以：

``` 
T(n) = \Theta (n^{\log_b a})+\sum_{j=0}^{log_b n -1}a^jf(\frac{n}{b^j})
```

### 迭代求T(n)

对公式进行迭代

``` 
\begin{align*}  
T(n) &= aT(\frac{n}{b})+f(n)\\
     &= a[aT(\frac{n}{b^2})+f(\frac{n}{b})]+f(n)\\
     &= a^2T(\frac{n}{b^{2}})+af(\frac{n}{b})+f(n)\\
     &= a^kT(\frac{n}{b^{k}})+a^{k-1}f(\frac{n}{b^{k-1}})+...+af(\frac{n}{b})+f(n)
\end{align*}
```

因为迭代在T(1)时停止，所以 n=b^k ，有：

``` 
k=log_b n\Rightarrow a^k=a^{log_b n}=n^{log_b a}
```
设 T(1)= Θ(1)，则：

``` 
\begin{align*}  
T(n) &= a^kT(\frac{n}{b^{k}})+a^{k-1}f(\frac{n}{b^{k-1}})+...+af(\frac{n}{b})+f(n)\\
     &= a^kT(1)+\sum_{j=0}^{k-1}a^jf(\frac{n}{b^j}) &(a)\\
     &= \Theta (n^{\log_b a})+\sum_{j=0}^{log_b n -1}a^jf(\frac{n}{b^j})
\end{align*}
```
或许你观察到 n=b^k ,可以带入表达式 (a) 中，但是我们需要的最终表达式中不应该还有 k 。

### 对 T(a) 分析
``` 
T(n) = \Theta (n^{\log_b a})+\sum_{j=0}^{log_b n -1}a^jf(\frac{n}{b^j})
```
从式子来看，它由 n^{log_b a} 个T(1)之和与多次迭代中产生的 a^j*f(n/b^j) 之和组成。按递归树来说，它由叶节点和各层的工作量组成。讨论T(n)的阶，就是比较两部分。

算法导论对树中总代价的三种情况解释

1. 有所有叶节点的代价决定
2. 均匀地分布在各层上
3. 由根节点的代价决定


[Jason's Techblog](http://blog.jasonding.top) 博客中对三种情况的解释

1. 递归树的每层成本从根向下呈几何级数增长，成本在叶节点一层达到最高，即最后一次递归是整个过程中成本最高的一次，故其占主导地位。所以递归分治的总成本在渐进趋势上和叶子层的成本一样。
2. 递归树每层的成本在渐进趋势上一样，即每层都是n^logb(a)。由于有logb(n)层，因此总成本为每层的成本乘以logb(n)。
3. 递归树每层成本呈几何级数递减，树根一层的成本占主导地位。因此，总成本就是树根层的成本。

[关于<<算法导论>>上的主定理（Master Theorem）的证明](https://my.oschina.net/u/240275/blog/232763)中对三种情况的解释

1. 如果第一部分比第二部分的阶数要高，这意味着递归树的总代价由叶子的代价决定
2. 如果两部分相等，这意味着递归树的总代价分布均匀，由叶子节点和其它节点共同决定
3. 如果第二部分阶数比第一部分要高，这意味着递归树的总代价由内层叶子决定，也即是说，划分问题的代价决定递归树的总代价

我查找了很多，始终对三种情况的出现感到困惑，我对其的理解如下：

首先，出现三种情况，主要是比较两部分阶数的结果。 困惑就在这儿。
``` 
\text{ 比较的是 }\Theta (n^{\log_b a}) \text{ 与 }\sum_{j=0}^{log_b n -1}a^jf(\frac{n}{b^j}) \text{ ,为什么条件却是 } \Theta (n^{\log_b a})  \text{ 与 } f(n)  \text{ 的比较？ }
```

### 三种情况的证明
大前提：
``` 
\text{设第二部分为  } g(n)= \sum_{j=0}^{log_b n -1}a^jf(\frac{n}{b^j})
```
- - - 

#### 情况一
前提：

``` 
\exists \varepsilon >0,f(n)=O(n^{log_b a -\varepsilon })
```
结论：

``` 
T(n)=\Theta (n^{log_b a})
```

证明：

``` 
\begin{align*}  
g(n) &= \sum_{j=0}^{log_b n -1}a^jf(\frac{n}{b^j})\\
     &= O(\sum_{j=0}^{log_b n -1}a^j(\frac{n}{b^j})^{log_b a -\varepsilon })\\
     &= O(n^{log_b a -\varepsilon}\sum_{j=0}^{log_b n-1} \frac{a^j}{(b^{log_b a -\varepsilon})^j})\\
     &= O(n^{log_b a -\varepsilon}\sum_{j=0}^{log_b n-1} (b^\varepsilon )^j)\\
     &= O(n^{log_b a -\varepsilon}\frac{b^{\varepsilon log_b n}-1}{b^\varepsilon -1})\\
     &= O(n^{log_b a -\varepsilon}\frac{n^{\varepsilon}-1}{b^\varepsilon -1})
     & \because b \text{ 和 } \varepsilon \text{都是常数}\\
     &= O(n^{log_b a -\varepsilon}n^\varepsilon )\\
     &= O(n^{log_b a})
\end{align*}
```
所以
``` 
T(n)=\Theta (n^{log_b a}) + O(n^{log_b a}) =\Theta (n^{log_b a})
```
- - - 

#### 情况二

前提：

``` 
\exists k \geq 0,f(n)=\Theta (n^{log_b a}log n)
```

结论：

``` 
T(n)=\Theta (n^{log_b a}logn)
```
证明：

``` 
\begin{align*}  
g(n) &= \sum_{j=0}^{k-1}a^jf(\frac{n}{b^j})\\
     &= \Theta (\sum_{j=0}^{log_b n -1}a^j(\frac{n}{b^j})^{log_b a }) &\text{前提}\\
     &= \Theta ( n^{log_b a} \sum_{j=0}^{log_b n -1}\frac{a^j}{a^j})\\
     &= \Theta ( n^{log_b a} log_b n)\\
     &= \Theta ( n^{log_b a} lg n)\\
\end{align*}
```
所以

``` 
T(n)=\Theta (n^{log_b a}) +\Theta ( n^{log_b a} lg n) =\Theta (n^{log_b a}logn)
```
- - - 

#### 情况三

前提：
``` 
 \exists \varepsilon >0,f(n)=\Omega (n^{log_b a +\varepsilon }) \text{ and }\exists c<1 , n \text{ large enough},af(\frac{n}{b})\leq cf(n)
```

结论：

``` 
T(n)= \Theta (f(n))
```

证明：

``` 
\begin{align*}  
g(n) &= \sum_{j=0}^{k-1}a^jf(\frac{n}{b^j})\\
     &\leq  \sum_{j=0}^{log_b n -1}c^jf(n) & \text{前提}\Rightarrow a^jf(\frac{n}{b^j})\leq c^jf(n)\\
     &= f(n)\frac{c^{log_b n}-1}{c-1}\\
     &= \Theta (f(n))
\end{align*}
```

所以

``` 
\begin{align*}  
&\because \exists \varepsilon >0,f(n)=\Omega (n^{log_b a +\varepsilon })\\
&\therefore T(n)=\Theta (n^{log_b a}) +\Theta (f(n)) =\Theta (f(n))
\end{align*}
```

### n 为自然数

对于 n 为自然数的证明，在解决困惑之前，暂不证明。可查阅参考了解。

### 参考
- [https://en.wikipedia.org/wiki/Master_theorem](https://en.wikipedia.org/wiki/Master_theorem)
- [http://www.cnblogs.com/wu8685/archive/2010/12/21/1912347.html](http://www.cnblogs.com/wu8685/archive/2010/12/21/1912347.html)
- [【算法点滴】分治策略小结](http://blog.jasonding.top/2014/09/10/Classic%20Algorithm/%E3%80%90%E7%AE%97%E6%B3%95%E7%82%B9%E6%BB%B4%E3%80%91%E5%88%86%E6%B2%BB%E7%AD%96%E7%95%A5%E5%B0%8F%E7%BB%93/)
- [关于<<算法导论>>上的主定理（Master Theorem）的证明](https://my.oschina.net/u/240275/blog/232763)
- [https://sites.google.com/site/algorithmssolution/home/c4/master_method](https://sites.google.com/site/algorithmssolution/home/c4/master_method)
- [http://www.sanlp.org/daa/slides/master.pdf](http://www.sanlp.org/daa/slides/master.pdf)