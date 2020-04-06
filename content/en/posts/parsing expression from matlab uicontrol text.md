---
title: "Matlab 解析表达式"
date: 2020-04-05T14:25:38+08:00
draft: true
description: "利用堆栈对MATLAB Gui控件输入的字符串表达式进行解析"
hideToc: false
enableToc: true
enableTocContent: false
author: zhaoqiu
authorEmoji: 👽
tags: 
- MATLAB
- MATLAB Gui
- parsing expression 
- stack
- postfix expression
---

> Matlab借助其强大的Gui控件可以很容易地开发可视化程序，让处理数据的过程更加交互化。对于解析Gui输入框中手动输入的表达式（比如：`a + b / ln(c)`，a，b可以代表运行时产生的变量的字符串名称，通过索引来映射：`list = ['a','b']`，`data = [1 2]`)，程序需要实现堆栈类，通过根据优先级进行计算、出栈、入栈的操作。

