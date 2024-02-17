---
slug: Redis Bloom Filter
title: Redis之布隆过滤器
date: 2021-12-25
tags: [Redis]
authors: carlos
keywords: [Redis]
description: Redis之布隆过滤器
---

说一个很常见的场景吧，我们在新闻网站、视频网站浏览新闻视频的时候，它们是怎么给我们推荐那些我们没看过的内容的呢？
可能你会想到：服务器端储存每个用户的观看记录，在去除掉每个用户已观看的内容，但是这种方法会给服务器端很大的压力，当用户量特别大的时候，每个人看过的内容又很多的时候，效率会大大降低，甚至拖垮服务。
如果每个用户的观看内容是存到了关系型数据库，那每次查询的时候都要顺便判断是否有重复观看的数据，说实话，关系型数据库不适合这种场景。
再假如，把观看数据存到了缓存中，但是这些数据是不会消失的，会随着时间的推移而变得越来越多，时间长了缓存也一样撑不住。
这个时候就需要专业的工具去解决这种场景，我们的布隆过滤器就可以登场了！

<!-- truncate -->

# 布隆过滤器是什么？

我们知道在Redis中Set结构是可以用来判断集合中是否存在某一个value的，简单的理解，布隆过滤器就是一个不怎么精确的Set结构，但是有时候他又不是那么不精确，我们可以通过参数的设置，让他变得足够精确。
当布隆过滤器说一个值存在时，这个值有可能不存在；但是当它说一个值不存在时，那这个值确实不存在。
我们再来看上面我说的那个场景，是不是就可以用布隆过滤器过滤掉那些已经观看过的内容了呢，虽然可能有误判，但是也在合理接受的范围内。

# 布隆过滤器怎么使用？

布隆过滤器的指令其实非常少，只有添加和判断是否存在两个,`bf.add`和`bf.exists`。
其中`bf.add`用来添加元素，`bf.exists`用来判断元素是否存在，用法和**Set**结构的`sadd`
和`sismember`差不多。这两个命令一次只能操作一个元素，当然还有批量操作的指令`bf.madd`和`bf.mexists`。

**redis**操作这里就不做演示了，直接上代码吧

这里用的是`redisson`来操作布隆过滤器，引入pom依赖

	<dependency>
		<groupId>org.redisson</groupId>
		<artifactId>redisson</artifactId>
		<version>3.14.1</version>
	</dependency>

## 初始化redisson

```java
RedissonClient redisson = Redisson.create();
Config config = new Config();
config.useSingleServer().setAddress("myredisserver:6379");
RedissonClient redisson = Redisson.create(config);
```

## 编写测试方法

```java
@Autowired
private RedissonClient redissonClient;

@Test
public void testBoom(){
	RBloomFilter<Object> bloom = redissonClient.getBloomFilter("bloom");
	bloom.tryInit(1000000L,0.01);
	bloom.add(1);
	System.out.println(bloom.contains(1));
	System.out.println(bloom.contains(2));
}
```

初始化一个**布隆过滤器**，调用`bloom.tryInit()`方法初始化**布隆过滤器**的bit长度和误判率，然后调用`add()`方法向布隆过滤器添加内容，最后就可以用`bloom.contains()`方法判断布隆过滤器中是否有这个值。

# 布隆过滤器的原理？
1.将一个值经过多次**hash**计算 放入到bit中 每计算一次**hash**值 将对应位置的0变成1
2.判断一个id是否存在布隆过滤器中 只需要将这个值经过多次hash计算后 判断对应位置的值是否为1 

```java
如果全部为1 则说明可能存在
如果有个一个位置为0 说明肯定不存在
```
# 减少布隆过滤器的误判率


**1.增加bit的长度
2.增加hash计算的次数**

但是两种方法都有着缺点，增加**bit**的长度就意味着要占用更多的空间，而增加**hash**计算的次数则要牺牲一些效率，所以要根据实际使用的情况来合理的分配**bit**的长度和**hash**计算的次数。