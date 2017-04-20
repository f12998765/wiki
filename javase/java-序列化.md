# Java 序列化
## 什么是序列化？

序列化是为了保存对象的状态，将对象的状态装换为字节数组，反序列化就是重构对象。

就像是冰冻魔法

> 实际上，序列化的思想是 “冻结” 对象状态，传输对象状态（写到磁盘、通过网络传输等等），然后 “解冻” 状态，重新获得可用的 Java 对象。

相关API

- java.io.Serializable
- java.io.Externalizable
- ObjectOutput
- ObjectInput
- ObjectOutputStream
- ObjectInputStream


## 怎么用？

只要一个类实现了 `java.io.Serializable` 接口就能被序列化,该接口仅作为一个标识，标识这个类可以进行序列化。

ObjectOutputStream.writeObject(Object); 将对象入输出流，序列化

ObjectInputStream.readObject(); 从流中读取对象，反序列化

> 标识:在进行序列化时，在 writeObject() 中会检测 obj instanceof Serializable

### 例

序列化对象

```java
import java.io.Serializable;

public class Cat implements Serializable {
    private String name;
    private String age;
    private static final long serialVersionUID = 1L;
    public Cat() {
    }

    public Cat(String name, String age) {

        this.name = name;
        this.age = age;
    }

   //get() set()

    @Override
    public String toString() {
        return "Cat{" +
                "name='" + name + '\'' +
                ", age='" + age + '\'' +
                '}';
    }
}

```

序列化过程

```java
import com.x.model.Cat;

import java.io.*;

public class Main {

    public static void main(String[] args) {
        Cat cat = new Cat("huang","5");
        System.out.println(cat);



        try (FileOutputStream file = new FileOutputStream("he"); ObjectOutputStream oos =  new ObjectOutputStream(file);){
            oos.writeObject(cat);
        } catch (IOException e) {
            e.printStackTrace();
        }

        try (FileInputStream file = new FileInputStream("he");ObjectInputStream ois = new ObjectInputStream(file)) {
            Cat cat1 = (Cat)ois.readObject();
            System.out.println(cat1);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

## 备注

- 使用 Externalizable 接口，需要重写 writeExternal() 和 readExternal() ，可自定义序列化。

- 序列化ID(private static final long serialVersionUID)不同，反序列化报java.io.InvalidClassException异常。

- 静态变量不会序列化。

- 使用 transient 关键字的变量不会序列化。

- 序列化中继承

    - 父类实现序列化，子类默认继承
    - 子类实现序列化，若父类变量也要保存则需要父类序列化；不需要父类序列化，反序列化时调用父类的无参构造函数。

## 参考连接

- [Java对象的序列化与反序列化](http://www.hollischuang.com/archives/1150)
- [关于 Java 对象序列化您不知道的 5 件事](https://www.ibm.com/developerworks/cn/java/j-5things1/)
- [Java 序列化的高级认识](https://www.ibm.com/developerworks/cn/java/j-lo-serial/)
