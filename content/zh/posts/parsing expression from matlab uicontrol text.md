---
title: "Matlab 解析表达式"
date: 2020-04-05T14:25:38+08:00
draft: false
description: "利用堆栈对MATLAB Gui控件输入的字符串表达式进行解析"
hideToc: false
enableToc: true
enableTocContent: false
author: zhaoqiu
authorEmoji: 👽
tags: 
- MATLAB
- MATLAB Gui
- 解析表达式
- 栈
- 后缀表达式
---

> Matlab借助其强大的Gui控件可以很容易地开发可视化程序，让处理数据的过程更加交互化。对于解析Gui输入框中手动输入的表达式（比如：`a + b / ln(c)`，a，b可以代表运行时产生的变量的字符串名称，通过索引来映射：`list = ['a','b']`，`data = [1 2]`)，程序需要实现堆栈类，通过根据优先级进行计算、出栈、入栈的操作。

## 解析表达式常用的算法有两种：
>1. 将表达式转换成[后缀表达式](https://en.wikipedia.org/wiki/Reverse_Polish_notation)，然后使用堆栈进行计算
>2. 直接进行堆栈，计算中间结果的同时考虑预算优先级

这里使用的是后缀表达式，这种方式较为优雅。首先，我们正常人类识别的计算公式为中缀表达式，例如：`2+(-1+11)*ln(e^2)`。中缀表达式中各个运算符的优先级只能人类识别，而后缀表达式运算优先级只有一个方向。`2+(-1+11)*ln(e^2)` 转换为后缀表达式为：`'2 1 11 - e 2 ^ ln * + '`，先来看后缀表达式如何计算：
> 定义两个堆栈：操作数堆栈、运算符堆栈。从左至右读取表达式，如果是操作数（数值），就入栈，如果是运算符，就根据不同运算符需要的操作数个数不同从操作数堆栈弹出，然后计算，将结果压入操作数堆栈，继续扫描表达式。

{{< expand "完整过程" >}}

{{< alert theme="info" >}}
1. 读入数值 `2` `1` `11`入操作数栈，读到减号 `-`，减号需要两个操作数，从操作数栈弹出两个数值，依次是 `11` `1`，计算 `1-11`，将结果 `-10`压入操作数栈。
{{< /alert >}}

{{< alert theme="info" >}}
2. 继续扫描表达式，读到 `e`，压入自然底数的数值，在matlab中通过 `exp(1)` 实现。接着将 `2`入栈。读至 `^`，弹出操作数栈两个操作数，做幂指数运算：`e^2`。将结果入栈。
{{< /alert >}}

{{< alert theme="info" >}}
3. 以此类推。
{{< /alert >}}
{{< /expand >}}

### 转化为后缀表达式的过程:
核心是操作符的优先级。定义一个运算符堆栈，从左至右扫描表达式，如果是操作数，就输出（拼接字符串，或者通过堆栈来接收)，如果是运算符，记`op`：
1. 若为 `(`:
直接入栈
2. 若为 `)`:
则不断将运算符堆栈弹出，直至 `(`
3. 若为其他运算符：
    * 若堆栈为空，则直接入栈，否则
    * 若栈顶为`(`，则直接入栈
    * 比较`op`和栈顶运算符的优先级，如果`op`运算级高（不包括等于），将`op`入栈
    * 如果栈顶运算符优先级大于等于`op`，将栈顶运算符弹出，继续将`op`与此时栈顶运算符比较，直至堆栈为空，

对于`2+(1-11)*ln(e^2)`，具体过程如下：
1. 第一个字符为2，输出`2`
2. 读至`+`，此时栈为空，直接入栈
3. 读至`(`，直接入栈
4. 读至`1`，直接输出：`2 1`
5. 读至`-`，此时栈顶运算符为`(`，直接入栈。
6. 读至`11`，输出`2 1 11`
7. 读至`)`，则不断弹出栈，直至`(`，输出：`2 1 11 -`，此时栈中有：`+`
8. 读至`*`，此时栈顶运算符为`+`，优先级：`*` > `+`，直接入栈
9. 读至`ln`，此时栈顶运算符为`*`，优先级：`ln` > `*`，直接入栈
10. 读至`(`，直接入栈，此时栈中有：`+ * ln (`
11. 读至`e`，直接输出：`2 1 11 - e`
12. 读至`^`，此时栈顶运算符为`(`，直接入栈。此时栈中有：`+ * ln ( ^`
13. 读至`2`，直接输出：`2 1 11 - e 2`
14. 读至`)`，则不断弹出栈，直至`(`，输出：`2 1 11 - e 2 ^`，此时栈中有：`+ * ln`
15. 表达式扫描结束，将堆栈剩余运算符依次弹出，输出：`2 1 11 - e 2 ^ ln * +`

### 示例
![运行时解析表达式](/images/posts/guiparsingexp.gif)

字符串操作Tips：
* 字符串比较：strcmp(s1,s2); 字符串分割：strsplit(s,delemiter);
* 不可用`==`进行字符串比较，不可用`split`分割字符串
* 查询时候包含某个字符串：ismember(strGroup, oneStr)，将字符串数组作为第一参数，方便获得索引。

{{< tabs 示例 Stack类 Gui示例>}}

{{< tab >}}
``` Matlab
clear
expression = '2+(1-11)*ln(e^2)';
postfixExp = transformPostfixExpression(expression);
result = evalPostFixExpression(postfixExp);
function value = evalPostFixExpression(expression)
    resultStack = Stack;
    expression = strsplit(expression);
    for i=1:length(expression)
       switch expression{i}
           case {'--'}
               [resultStack,value] = resultStack.pop();
               value = - value;
               resultStack = resultStack.push(value);
           case {'ln'}
               [resultStack,value] = resultStack.pop();
               value = log(value);
               resultStack = resultStack.push(value);
           case {'lg'}
               [resultStack,value] = resultStack.pop();
               value = log10(value);
               resultStack = resultStack.push(value);
           case {'^'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former ^ latter;
               resultStack = resultStack.push(value);
           case {'+'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former + latter;
               resultStack = resultStack.push(value);
           case {'-'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former - latter;
               resultStack = resultStack.push(value);
           case {'*'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former * latter;
               resultStack = resultStack.push(value);
           case {'/'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former / latter;
               resultStack = resultStack.push(value);
           case {'e'}
               resultStack = resultStack.push(exp(1));
           otherwise
               resultStack = resultStack.push(str2double(expression{i}));
       end
    end
end

function postfixExp = transformPostfixExpression(expression)

    %{
    去除空格
    %}
    expression = replace(expression,' ','');
    %{
    加空格, 以便遍历所有字符
    %}
    tempExp = '';
    for i=1:length(expression)
        if expression(i) == '+' || expression(i) == '-' || expression(i) == '*' || expression(i) == '/' || expression(i) == '(' || expression(i) == ')' || expression(i) == '^'
            tempExp = [tempExp,' ',expression(i),' '];
        else
            tempExp=[tempExp,expression(i)];
        end
    end
    expression = tempExp;
    %{
    去除首尾可能的空格
    %}
    expression = strtrim(expression);
    expression = strsplit(expression,' ');
    %{
    转换成后缀表达式
    %}
    opStack = Stack;
    postfixExp = '';
    for i=1:length(expression)
        switch expression{i}
           case {'e','E'}
               postfixExp = [postfixExp,'e '];
           case '('
               opStack = opStack.push('(');
           case ')'
               if opStack.stackismember('(')
                   [opStack, op] = opStack.pop();
                   while op ~= '('
                        postfixExp = [postfixExp,op,' '];
                        [opStack, op] = opStack.pop();
                   end
               else
                   break
               end
           case '-'
               %{
               区别负号和减号，只要'-'前面有数字即为减号，其他皆为负号。负号用'--'代替
               %}
               if i == 1
                   opStack = opStack.push('--');
               elseif strcmp(expression{i-1}, '+') || strcmp(expression{i-1}, '-') || strcmp(expression{i-1}, '*') || strcmp(expression{i-1}, '/') || strcmp(expression{i-1}, '(') || strcmp(expression{i-1}, '^')
                     %{
                     按负号处理，例如e^-1，1/-3
                     %}
                     opStack = opStack.push('--');
               else
                   while ~opStack.stackisempty()
                       if strcmp(opStack.getTop() ,'(')
                           opStack = opStack.push('-');
                           break
                       elseif strcmp(opStack.getTop() ,'--')|| strcmp(opStack.getTop(), '^')|| strcmp(opStack.getTop(), '*')|| strcmp(opStack.getTop(), '/')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg')|| strcmp(opStack.getTop(), '+') || strcmp(opStack.getTop(), '-')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push('-');
                           break
                       end

                   end
                   if opStack.stackisempty()
                       opStack = opStack.push(expression{i});
                   end
               end

           case '+'
               %{
               忽略一些代表正号的情况，例如ln(+5), e^+5
               %}
               if i==1 || strcmp(expression{i-1}, '+') || strcmp(expression{i-1}, '-') || strcmp(expression{i-1}, '*') || strcmp(expression{i-1}, '/') || strcmp(expression{i-1}, '(') || strcmp(expression{i-1}, '^')
                   break
               else
                   while ~opStack.stackisempty()
                       if strcmp(opStack.getTop(), '(')
                           opStack = opStack.push('+');
                           break
                       elseif strcmp(opStack.getTop(), '--')|| strcmp(opStack.getTop(), '^')|| strcmp(opStack.getTop(), '*')|| strcmp(opStack.getTop(), '/')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg')|| strcmp(opStack.getTop(), '+') || strcmp(opStack.getTop(), '-')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push('+');
                           break
                       end

                   end
                   if opStack.stackisempty()
                       opStack = opStack.push(expression{i});
                   end
               end
           case {'*','/'}
               while ~opStack.stackisempty()
                       if strcmp(opStack.getTop(), '(')
                           opStack = opStack.push(expression{i});
                           break
                       elseif strcmp(opStack.getTop(), '--')|| strcmp(opStack.getTop(), '^')|| strcmp(opStack.getTop(), '*')|| strcmp(opStack.getTop(), '/')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push(expression{i});
                           break
                       end

               end
               if opStack.stackisempty()
                    opStack = opStack.push(expression{i});
               end
            case {'ln','lg'}
                while ~opStack.stackisempty()
                       if strcmp(opStack.getTop(), '(')
                           opStack = opStack.push(expression{i});
                           break
                       elseif strcmp(opStack.getTop(), '--')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push(expression{i});
                           break
                       end

                end
                if opStack.stackisempty()
                    opStack = opStack.push(expression{i});
                end
            case {'^'}
                while ~opStack.stackisempty()
                       if strcmp(opStack.getTop(), '(')
                           opStack = opStack.push(expression{i});
                           break
                       elseif strcmp(opStack.getTop(), '--')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg') || strcmp(opStack.getTop(), '^')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push(expression{i});
                           break
                       end

                end
                if opStack.stackisempty()
                    opStack = opStack.push(expression{i});
                end
            otherwise
                postfixExp = [postfixExp,expression{i},' '];
        end
    end
    %{
    将栈中剩余的运算符弹出
    %}
    while ~opStack.stackisempty()
        [opStack, op] = opStack.pop();
        postfixExp = [postfixExp,op,' '];
    end
end
```
{{< /tab >}}

{{< tab >}}

为了配合网页语法高亮，注释采用`%{ %}`

``` Matlab
classdef Stack
   properties
       count = 0;
       top=1;
       stack=cell(1);
   end
   methods

       function displayU(this)
           celldisp(this.stack);
       end
       function x = getTop(this)
           if this.count > 0
               x = this.stack{this.count};
           else
               x = '';
           end
       end
       %{
       判断是否为空
       %}
       function is = stackisempty(this)
           if this.count == 0
               is = true;
           else
               is = false;
           end
       end
       %{
       将堆栈置空
       %}
       function this = empty(this)
           this.count = 0;
           this.top = 1;
           this.stack = cell(1);

       end
       %{
       出栈
       %}
       function [this,x] = pop(this)
           if isempty(this)
               x = {};
           else
               x = this.stack{this.count};
               this.stack(this.count) = [];
               this.count = this.count - 1;
           end
       end
       %{
       入栈
       %}
       function this = push(this,x)
           this.count = this.count + 1;
           this.stack{this.count} = x;
       end
       %{
       遍历
       %}
       function is = stackismember(this,str)
            if this.stackisempty()
              is = false;
            else
              for i=1:this.count
                 if this.stack{i} == str
                     is = true;
                     return
                 end
              end
            end
       end
   end
end

```
{{< /tab >}}

{{< tab >}}
``` Matlab
clear
close all
f = figure;
f.Units='Normalized';
f.Name='解析表达式';
f.NumberTitle='off';
inputpanel=uipanel(f,'Position',[0,0.5,1,0.5],'Title','输入表达式','fontsize',12);
resultpanel=uipanel(f,'Position',[0,0.,1,0.5],'Title','计算结果','fontsize',12);
expressionedit=uicontrol(inputpanel,'Units','Normalized','Position',[0.25 0.4 0.5 0.2],'Style','edit','String','','fontsize',12,'Callback',{@exp_Callback, resultpanel});
info = {'运行时变量:';'a = [1 2;3 4]';'b = [5 6;7 8]';'nameList = {''a'',''b''}';};
uicontrol(inputpanel,'Style','text','Units','Normalized','String',info,'fontsize',12,'Position',[0.25 0.6 0.5 0.3]);

function exp_Callback(src,event,resultpanel)

    expression = get(src,'String');
    if ~isempty(expression)
        postfixExp = transformPostfixExpression(expression);
        result = evalPostFixExpression(postfixExp);
        resulttable = uitable(resultpanel,'Data',result,'Units','Normalized','Position',[0 0 1 1],'ColumnName','','RowName','');
    end
end
function value = evalPostFixExpression(expression)
    a = [1 2;3 4];
    b = [5 6;7 8];
    array(:,:,1) = a;
    array(:,:,2) = b;
    namelist = {'a','b'};
    resultStack = Stack;
    expression = strsplit(expression);
    for i=1:length(expression)
       switch expression{i}
           case {'--'}
               [resultStack,value] = resultStack.pop();
               value = - value;
               resultStack = resultStack.push(value);
           case {'ln'}
               [resultStack,value] = resultStack.pop();
               value = log(value);
               resultStack = resultStack.push(value);
           case {'lg'}
               [resultStack,value] = resultStack.pop();
               value = log10(value);
               resultStack = resultStack.push(value);
           case {'^'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former ^ latter;
               resultStack = resultStack.push(value);
           case {'+'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former + latter;
               resultStack = resultStack.push(value);
           case {'-'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former - latter;
               resultStack = resultStack.push(value);
           case {'*'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former * latter;
               resultStack = resultStack.push(value);
           case {'/'}
               [resultStack,latter] = resultStack.pop();
               [resultStack,former] = resultStack.pop();
               value = former / latter;
               resultStack = resultStack.push(value);
           case {'e'}
               resultStack = resultStack.push(exp(1));
           otherwise
               %{
               增加运行时变量的获取方法
               %}
               valueOfVariable = getvalueOfVariable(expression{i},namelist,array);
               if ~isnan(str2double(expression{i}))
                   resultStack = resultStack.push(str2double(expression{i}));
               elseif ~isempty(valueOfVariable)
                   resultStack = resultStack.push(valueOfVariable);
               end
       end
    end
end
%{
根据字符串索引来获取变量的值
%}
function valueOfVariable = getvalueOfVariable(strname,namelist,valuematrix)
    valueOfVariable = valuematrix(:,:,ismember(namelist,strname));
end
function postfixExp = transformPostfixExpression(expression)

    %{
    去除空格
    %}
    expression = replace(expression,' ','');
    %{
    加空格, 以便遍历所有字符
    %}
    tempExp = '';
    for i=1:length(expression)
        if expression(i) == '+' || expression(i) == '-' || expression(i) == '*' || expression(i) == '/' || expression(i) == '(' || expression(i) == ')' || expression(i) == '^'
            tempExp = [tempExp,' ',expression(i),' '];
        else
            tempExp=[tempExp,expression(i)];
        end
    end
    expression = tempExp;
    %{
    去除首尾可能的空格
    %}
    expression = strtrim(expression);
    expression = strsplit(expression,' ');
    %{
    转换成后缀表达式
    %}
    opStack = Stack;
    postfixExp = '';
    for i=1:length(expression)
        switch expression{i}
           case {'e','E'}
               postfixExp = [postfixExp,'e '];
           case '('
               opStack = opStack.push('(');
           case ')'
               if opStack.stackismember('(')
                   [opStack, op] = opStack.pop();
                   while op ~= '('
                        postfixExp = [postfixExp,op,' '];
                        [opStack, op] = opStack.pop();
                   end
               else
                   break
               end
           case '-'
               %{
                区别负号和减号，只要'-'前面有数字即为减号，其他皆为负号。负号用'--'代替
               %}
               if i == 1
                   opStack = opStack.push('--');
               elseif strcmp(expression{i-1}, '+') || strcmp(expression{i-1}, '-') || strcmp(expression{i-1}, '*') || strcmp(expression{i-1}, '/') || strcmp(expression{i-1}, '(') || strcmp(expression{i-1}, '^')
                     %{
                        按负号处理，例如e^-1，1/-3
                     %}
                     opStack = opStack.push('--');
               else
                   while ~opStack.stackisempty()
                       if strcmp(opStack.getTop() ,'(')
                           opStack = opStack.push('-');
                           break
                       elseif strcmp(opStack.getTop() ,'--')|| strcmp(opStack.getTop(), '^')|| strcmp(opStack.getTop(), '*')|| strcmp(opStack.getTop(), '/')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg')|| strcmp(opStack.getTop(), '+') || strcmp(opStack.getTop(), '-')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push('-');
                           break
                       end
                   end
                   if opStack.stackisempty()
                       opStack = opStack.push(expression{i});
                   end
               end
           case '+'
               %{
                忽略一些代表正号的情况，例如ln(+5), e^+5
               %}
               if i==1 || strcmp(expression{i-1}, '+') || strcmp(expression{i-1}, '-') || strcmp(expression{i-1}, '*') || strcmp(expression{i-1}, '/') || strcmp(expression{i-1}, '(') || strcmp(expression{i-1}, '^')
                   break
               else

                   while ~opStack.stackisempty()
                       if strcmp(opStack.getTop(), '(')
                           opStack = opStack.push('+');
                           break
                       elseif strcmp(opStack.getTop(), '--')|| strcmp(opStack.getTop(), '^')|| strcmp(opStack.getTop(), '*')|| strcmp(opStack.getTop(), '/')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg')|| strcmp(opStack.getTop(), '+') || strcmp(opStack.getTop(), '-')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push('+');
                           break
                       end

                   end
                   if opStack.stackisempty()
                       opStack = opStack.push(expression{i});
                   end
               end
           case {'*','/'}
               while ~opStack.stackisempty()
                       if strcmp(opStack.getTop(), '(')
                           opStack = opStack.push(expression{i});
                           break
                       elseif strcmp(opStack.getTop(), '--')|| strcmp(opStack.getTop(), '^')|| strcmp(opStack.getTop(), '*')|| strcmp(opStack.getTop(), '/')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push(expression{i});
                           break
                       end

               end
               if opStack.stackisempty()
                    opStack = opStack.push(expression{i});
               end
            case {'ln','lg'}
                while ~opStack.stackisempty()
                       if strcmp(opStack.getTop(), '(')
                           opStack = opStack.push(expression{i});
                           break
                       elseif strcmp(opStack.getTop(), '--')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push(expression{i});
                           break
                       end

                end
                if opStack.stackisempty()
                    opStack = opStack.push(expression{i});
                end
            case {'^'}
                while ~opStack.stackisempty()
                       if strcmp(opStack.getTop(), '(')
                           opStack = opStack.push(expression{i});
                           break
                       elseif strcmp(opStack.getTop(), '--')|| strcmp(opStack.getTop() ,'ln') || strcmp(opStack.getTop() ,'lg') || strcmp(opStack.getTop(), '^')
                            [opStack, op] = opStack.pop();
                            postfixExp = [postfixExp,op,' '];
                       else
                           opStack = opStack.push(expression{i});
                           break
                       end

                end
                if opStack.stackisempty()
                    opStack = opStack.push(expression{i});
                end
            otherwise
                postfixExp = [postfixExp,expression{i},' '];
        end
    end
    %{
    将栈中剩余的运算符弹出
    %}

    while ~opStack.stackisempty()
        [opStack, op] = opStack.pop();
        postfixExp = [postfixExp,op,' '];
    end
end
```
{{< /tab >}}

{{< /tabs >}}