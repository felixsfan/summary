# 1. node.js

http://nodejs.cn/learn/how-to-use-or-execute-a-package-installed-using-npm

# 2. Promise

https://blog.csdn.net/qq_29483485/article/details/86605396
https://www.jianshu.com/p/1ec8d1c4e287
https://www.cnblogs.com/fdxjava/p/11622490.html

# 3. Async/Await可能最完整入门攻略

https://segmentfault.com/a/1190000016788484

## 3.1 基本用法

```javascript
async/await 是 ES2017 中引入的一种异步编程方式，它是基于 Promise 的语法糖，可以让异步代码看起来更像同步代码，使得异步代码的编写和阅读更加简洁和直观。

下面是 async/await 和 Promise 的用法介绍：

Promise
Promise 是一种异步编程的解决方案，它可以将异步操作封装成一个对象，使得异步操作更加可控和易于管理。Promise 对象有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败），可以通过 then() 方法和 catch() 方法来处理异步操作的结果。


const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const result = Math.random();
    if (result > 0.5) {
      resolve(result); // 成功
    } else {
      reject(new Error('Failed')); // 失败
    }
  }, 1000);
});

promise
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
async/await
async/await 是基于 Promise 的语法糖，它可以让异步代码看起来更像同步代码，使得异步代码的编写和阅读更加简洁和直观。使用 async/await 时，需要将异步操作封装成一个 Promise 对象，并使用 await 关键字来等待异步操作的结果。


async function asyncFunction() {
  try {
    const result = await promise; // 等待异步操作的结果
    console.log('Success:', result);
  } catch (error) {
    console.log('Error:', error);
  }
}

asyncFunction();
在上面的代码中，asyncFunction() 函数使用 await 关键字来等待 promise 对象的结果，如果 promise 对象成功，则将结果打印到控制台，否则将错误信息打印到控制台。

需要注意的是，使用 async/await 时，需要将异步操作封装成一个 Promise 对象，否则无法使用 await 关键字等待异步操作的结果。同时，使用 await 关键字时，需要将其放在 async 函数中，否则会报错。
```

## 3.2 异常处理

```javascript
在使用 async/await 进行异步编程时，异常处理是非常重要的一部分。下面介绍一下 async/await 的异常处理方式：

try-catch
使用 try-catch 可以捕获 async/await 中的异常，类似于同步代码中的异常处理方式。在 try 代码块中使用 await 等待异步操作的结果，如果异步操作抛出异常，则会跳转到 catch 代码块中进行异常处理。

javascript
复制
async function asyncFunction() {
  try {
    const result = await promise; // 等待异步操作的结果
    console.log('Success:', result);
  } catch (error) {
    console.log('Error:', error);
  }
}

asyncFunction();
在上面的代码中，try 代码块中使用 await 等待 promise 对象的结果，如果 promise 对象抛出异常，则会跳转到 catch 代码块中进行异常处理。

Promise.catch()
使用 Promise.catch() 方法也可以捕获 async/await 中的异常。在 async 函数中使用 await 等待异步操作的结果，如果异步操作抛出异常，则会返回一个被拒绝的 Promise 对象，可以使用 catch() 方法来处理异常。

javascript
复制
async function asyncFunction() {
  const result = await promise.catch((error) => {
    console.log('Error:', error);
  });
  console.log('Success:', result);
}

asyncFunction();
在上面的代码中，使用 await 等待 promise 对象的结果，如果 promise 对象抛出异常，则会返回一个被拒绝的 Promise 对象，可以使用 catch() 方法来处理异常。

需要注意的是，使用 Promise.catch() 方法时，需要将其放在 async 函数中，否则会报错。同时，使用 Promise.catch() 方法时，需要注意返回一个新的 Promise 对象，否则会导致异常无法被捕获。
```

## 3.3 async的返回值

```javascript
async 函数返回一个 Promise 对象，这个 Promise 对象的状态和值取决于 async 函数的返回值。

如果 async 函数返回一个值，那么这个值会被包装成一个已完成的 Promise 对象，并作为 Promise 对象的值返回。例如：

javascript
复制
async function asyncFunction() {
  return 'Hello, World!';
}

asyncFunction().then((result) => {
  console.log(result); // 输出：Hello, World!
});
在上面的代码中，asyncFunction 函数返回一个字符串，这个字符串会被包装成一个已完成的 Promise 对象，并作为 Promise 对象的值返回。

如果 async 函数抛出一个异常，那么这个异常会被包装成一个被拒绝的 Promise 对象，并作为 Promise 对象的原因返回。例如：

javascript
复制
async function asyncFunction() {
  throw new Error('Something went wrong!');
}

asyncFunction().catch((error) => {
  console.log(error.message); // 输出：Something went wrong!
});
在上面的代码中，asyncFunction 函数抛出一个异常，这个异常会被包装成一个被拒绝的 Promise 对象，并作为 Promise 对象的原因返回。

如果 async 函数没有返回值，那么它实际上返回一个已完成的 Promise 对象，并且这个 Promise 对象的值为 undefined。例如：

javascript
复制
async function asyncFunction() {
  console.log('Hello, World!');
}

asyncFunction().then((result) => {
  console.log(result); // 输出：undefined
});
在上面的代码中，asyncFunction 函数没有返回值，它实际上返回一个已完成的 Promise 对象，并且这个 Promise 对象的值为 undefined。
```

# 4. axios

# 5. 模块化导入导出

<img src="/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/commonJS.png" alt="commonJS" style="zoom:25%;" />

**ES导入导出**

https://blog.csdn.net/weixin_46016926/article/details/113653247

导出

<img src="/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/es导出.png" alt="es导出" style="zoom:50%;" />

<img src="/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/es6导出2.png" alt="es6导出2" style="zoom: 50%;" />



导入

<img src="/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/es6.png" alt="es6" style="zoom:50%;" />

# 6.vue函数和方法定义和js函数定义

## 6.1 js函数定义及与vue函数区别

![方法和函数区别](/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/方法和函数区别.png)

### 区别

- 在vue实例或组件中定义的是vue函数，在js文件中定义的是js函数。vue实例或组件也可以导入js函数。两者函数没有区别。

### js函数定义

- `function a(){}`
- `a=function(){}`
- 区别是`a=function(){}`必须在定义之后调用

### vue函数定义

- 在vue中函数常规写成`a:function(){}`，等价于js里的`a=function(){}`

## 6.2 vue函数的定义

### 6.2.1 ES5普通写法

ES5语法在vue中写成`a:function(){}`，等价于js里的`a=function(){}`，因为vue的函数都是定义在vue实例或组件中，是键值对的形式。

### 6.2.2 js的ES6语法函数增强写法可以用到对象字面量里,也可以用到vue实例或组件中

<img src="/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/对象字面量里函数写法.png" alt="对象字面量里函数写法" style="zoom:25%;" />

**例子**

<img src="/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/对象字面量函数写法例子.png" alt="对象字面量函数写法例子" style="zoom:25%;" />

### 6.2.2 vue定义函数方式总结

#### 1.ES5普通写法

ES5语法在vue中写成`a:function(){}`，等价于js里的`a=function(){}`，因为vue的函数都是定义在vue实例或组件中，是键值对的形式。

#### 2. js的ES6语法函数增强写法可以用到对象字面量里,也可以用到vue实例或组件中

![定义函数方式总结](/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/定义函数方式总结.png)

#### 3.箭头函数

https://blog.csdn.net/qq_32614411/article/details/80897256

![箭头函数](/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/箭头函数.png)

![箭头函数1](/Users/fanqingwei/Desktop/学习/vue-admin学习总结/images/箭头函数1.png)

# 7.常用链接

https://blog.csdn.net/qq_29483485/article/details/86605396

react-admin

https://github.com/HalseySpicy/Hooks-Admin

react基础教程:
https://gitee.com/hongjilin/hongs-study-notes/tree/master

# 8. Antd中render的使用

## 8.1 columns中使用

https://blog.csdn.net/qq_45799465/article/details/125748364

## 8.2 expandedRowRender中使用

https://blog.csdn.net/qq_42132814/article/details/113760831

# 9. Typescript 范型

https://www.cnblogs.com/IwishIcould/p/15024439.html

# 10. react中打开新的url的方式总结

在 React 中打开新的 URL 有以下几种方式：

1. 使用 `window.open()` 方法

可以在 React 组件中使用 `window.open()` 方法来打开新的 URL。例如：

```js
function Example() {
  const handleClick = () => {
    window.open('https://www.example.com', '_blank');
  };

  return (
    <button onClick={handleClick}>Open Example.com</button>
  );
}
```

1. 使用 `a` 标签

可以在 React 组件中使用 `a` 标签来打开新的 URL。例如：

```js
function Example() {
  return (
    <a href="https://www.example.com" target="_blank">Open Example.com</a>
  );
}
```

1. 使用 React Router

如果你正在使用 React Router，可以使用 `Link` 组件来打开新的 URL。例如：

```js
import { Link } from 'react-router-dom';

function Example() {
  return (
    <Link to="https://www.example.com" target="_blank">Open Example.com</Link>
  );
}
```

需要注意的是，如果你使用 `Link` 组件来打开新的 URL，你需要将 `target` 属性设置为 `_blank`，以便在新的标签页中打开 URL。

总的来说，使用 `window.open()` 方法是在 React 中打开新的 URL 最常用的方式。但是，如果你正在使用 React Router，或者你需要在页面中显示一个链接，那么使用 `Link` 或 `a` 标签可能更加方便。

# 11. Typescript定义React组件

TypeScript是一种静态类型检查的JavaScript超集，可以在编写React组件时提供更好的类型检查和代码提示。下面是如何使用TypeScript定义React函数组件和类式组件的示例：

## 11.1 函数组件

```typescript
import React, { FC } from 'react';

interface Props {
  name: string;
  age: number;
}

const MyComponent: FC<Props> = ({ name, age }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
};

export default MyComponent;
```

在这个示例中，我们使用了FC（FunctionComponent）类型来定义函数组件的Props类型。FC类型是React定义的一个泛型类型，用于定义函数组件的Props类型。在组件中，我们可以通过解构Props对象来获取组件的属性值，并在组件中使用它们。

## 11.2 类式组件

```typescript
import React, { Component } from 'react';

interface Props {
  name: string;
  age: number;
}

interface State {
  count: number;
}

class MyComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    const { name, age } = this.props;
    const { count } = this.state;
    return (
      <div>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Count: {count}</p>
      </div>
    );
  }
}

export default MyComponent;
```


在这个示例中，我们使用了Component类来定义类式组件。在类式组件中，我们需要定义Props和State类型，并在构造函数中初始化State对象。在组件中，我们可以通过this.props和this.state来获取组件的属性值和状态值，并在组件中使用它们。

需要注意的是，在使用TypeScript定义React组件时，需要注意Props和State类型的定义，以及在组件中使用它们的方式。同时，需要注意在组件中使用的React生命周期方法的类型定义。
