---
slug: Rust-Iterator 
title: Rust-迭代器
date: 2024-01-31
authors: Clamber
tags: [Rust]
keywords: [Rust]
---
迭代器 主要用来 **遍历 集合**。

迭代器 就是把集合中的所有元素按照顺序一个接一个的传递给处理逻辑。

如果把集合比喻为一大缸水，那么迭代器就是水瓢。

<!-- truncate -->

## Rust 中的迭代器

Rust 语言中的集合包括 **数组（ array ）**、**向量（ Vect! ）**、**哈希表（ map ）**等。

Rust 语言中的迭代器都要实现标准库中定义的 Iterator 特质。

**Iterator** 特质有两个函数必须实现：

**一个是 iter()，用于返回一个 迭代器 对象。迭代器中存储的值，我们称之为 项 ( items ) 。**

**另一个是 next()，用于返回迭代器中的下一个元素。如果已经迭代到集合的末尾（最后一个项后面）则返回 None。**

Rust 语言中所有的集合都实现了 Iterator 特质。我们可以简单的使用 iter() 和 next() 方法来完成迭代

```cpp
fn main() {

   //创建一个数组
   let a = [10,20,30];

   let mut iter = a.iter(); // 从一个数组中返回迭代器
   println!("{:?}",iter);

   //使用 next() 方法返回迭代器中的下一个元素
   println!("{:?}",iter.next());
   println!("{:?}",iter.next());
   println!("{:?}",iter.next());
   println!("{:?}",iter.next());
}
```

编译运行以上 Rust 代码，输出结果如下

```cpp
Iter([10, 20, 30])
Some(10)
Some(20)
Some(30)
None
```

## for 循环和迭代器
上面的范例中我们了解了迭代器的使用，不过有点累的是，每次都需要手动调用 next() 方法才可以获得下一个迭代项。

为了解决这种手动迭代的代码冗余，Rust 允许我们使用 for 循环来使用迭代器。

**for 循环迭代器的语法如下**

```cpp
for iterator_item in iterator {
   // 使用迭代项的具体逻辑
}
```
有了 for ... in 语句，我们遍历结合就比较轻松了，短短三行代码就搞定了。
```cpp
fn main() {
   let a = [10,20,30];
   let iter = a.iter();
   for data in iter{
      print!("{}\t",data);
   }
}
```

编译运行以上 Rust 代码，输出结果如下

```cpp
10 20 30
```

## Rust 迭代器类型
Rust 中有三种类型的迭代器。

具体介绍每种迭代器之前，我们先来说说都有哪几种迭代器：

 既然迭代器用于遍历集合，那么在一次遍历后，集合是否还能用？这里就分两种情况。
 迭代器遍历集合的同时，能够修改集合中的元素？ 这里又分为两种情况了。
也就是说，遍历的迭代器有 4 种：

 1. 只读遍历但不可重新遍历
 2. 只读遍历但可以重新遍历
 3. 可修改遍历但不可重新遍历
 4. 可修改遍历但不可重入遍历

最后一种 **可修改遍历但不可重入遍历** 感觉没啥大作用。都已经修改元素了但限制遍历，那要怎么访问啊。

剩下三种，Rust 提供了三个方法来返回。我们都罗列在下表中。

**T 表示集合中的元素。**

```dart
iter()	      返回一个只读可重入迭代器，迭代器元素的类型为 &T
into_iter()	  返回一个只读不可重入迭代器，迭代器元素的类型为 T
iter_mut()	  返回一个可修改可重入迭代器，迭代器元素的类型为 &mut T
```

### 范例： 只读可重入迭代器 iter()
##### iter() 充分体现了 Rust 中 借用 的概念。它返回的迭代器只是一个指向集合元素的引用。

因为只是引用，所以集合保持不变，并且迭代器在遍历之后还可以继续使用。

```dart
fn main() {
   let names = vec!["简单教程", "简明教程", "简单编程"];
   for name in names.iter() {
      match name {
         &"简明教程" => println!("我们当中有一个异类!"),
         _ => println!("Hello {}", name),
      }
   }
   println!("{:?}",names); // 迭代之后可以重用集合
}
```

编译运行以上 Rust 代码，输出结果如下

```dart
Hello 简单教程
我们当中有一个异类!
Hello 简单编程
["简单教程", "简明教程", "简单编程"]
```

### 范例： 自动拆箱迭代 into_iter()
##### into_iter() 方法会返回一个自动拆箱迭代。

是不是有点拗口？

**into_iter() 同 iter() 一样返回的是只读迭代，但还是有些不同的，into_iter() 充分运用了 所有权 ownership 的概念。它会把所有迭代的值从集合中移动到一个迭代器对象中。**

**这样，我们的迭代变量就是一个普通对象而不是对集合元素的引用。在 match 匹配时就不需要引用 & 了。**

**iter_into() 之后的集合不可重用。**

```dart
fn main(){
   let names = vec!["简单教程", "简明教程", "简单编程"];
   for name in names.into_iter() {
      match name {
         "简明教程" => println!("我们当中有一个异类!"),
         _ => println!("Hello {}", name),
      }
   }
   // 迭代器之后集合不可再重复使用，因为元素都被拷贝走了
   //println!("{:?}",names); 
   //Error:Cannot access after ownership move
}
```

编译运行以上 Rust 代码，输出结果如下

```dart
Hello 简单教程
我们当中有一个异类!
Hello 简单编程. 
```

### 范例：可变更集合迭代 iter_mut()
集合的 iter() 方法返回的是一个只读迭代，我们不能通过迭代器来修改集合。

如果在迭代集合的同时修改集合的元素，则需要使用 iter_mut() 方法代替 iter() 方法。

##### iter_mut() 方法返回的迭代元素是一个 引用类型 或者说是智能指针。我们可以通过对迭代变量 解引用 的方式来重新赋值。

**这种重新赋值会修改集合的原元素。**

**iter_mut() 之后的集合是可以重复使用的。**

```dart
fn main() {
   let mut names = vec!["简单教程", "简明教程", "简单编程"];
   for name in names.iter_mut() {
      match name {
         &mut "简明教程" => { *name = "简单教程";println!("我们中间有一个异类!")},
         _ => println!("Hello {}", name),
      }
   }

   // 集合还可以重复使用
   println!("{:?}",names);
}
```

编译运行以上 Rust 代码，输出结果如下

```dart
Hello 简单教程
我们中间有一个异类!
Hello 简单编程
["简单教程", "简单教程", "简单编程"]
```
