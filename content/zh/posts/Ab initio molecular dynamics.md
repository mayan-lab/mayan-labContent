---
title: 第一性原理-从头计算分子动力学模拟
date: 2020-05-28T17:30:06+08:00
description: The first principles, ab initio molecular dynamics
draft: false
hideToc: false
enableToc: true
enableTocContent: false
author: zhaoqiu
authorEmoji: 👽
tags: 
- First-Principles
- Ab initio molecular dynamics 
libraries:
- katex 
---
## 概念

### 密度泛函

## 软件

### VASP(Vienna Ab - initio Simulation Package)

安装开始前，切换到root，检查pwd是否为root的工作路径。

#### 系统选择

CentOS7 安装正常
CentOS7 & CentOS8 实体机安装失败，7：不能GUI下安装；8：循环接收license，进不去系统。
Deepin 15.11 & Deepin 20beta 编译阶段失败

Ubuntu 20


#### Intel parallel studio XE

安装`c++`等必要组件，`sudo apt install build-essential`

解压压缩包，执行`./install_GUI.sh`，Key：S477-2V7GNJ9G，选择必要的组件进行安装。
默认路径`/opt/intel`。

安装完毕，添加环境变量。`~/.bashrc`，`source /opt/intel/parallel_studio_xe_2019/psxevars.sh`，重新打开terminal，输入`ifort -v`测试是否成功。
进入`/opt/intel/compilers_and_libraries_2019.1.144/linux/mkl/interfaces/fftw3xf`，运行`make libintel64`。成功后，会产生libfftw3xf_intel.a库文件。


#### VASP

解压压缩包，最好解压在root目录下。复制`arch/makefile.include.linux_intel` 到根目录并改名`makefile.include`，修改`makefile.include`中`OFLAG=-xhost`修改成`OFLAG=-xhost`。
使用`patch -p0 < patch.5.4.4.16052018`进行补丁修复。
在根目录执行 `make all`。编译完成后，`vasp/bin`目录下会出现`vasp_gam`,`vasp_ncl`,`vasp_std`，分别是Gamma only版，非共线版和标准版。讲`vasp_std`改名为`vasp`。
在`~/.bashrc`中添加：`export PATH=$PATH:/root/vasp.5.4.4/bin`

#### 测试


### LAMMPS

 
$$ \Delta_{30} = \cfrac{\frac{^{15}\mathrm{N} \kern{0.1em} ^{15}\mathrm{N}}{^{14}\mathrm{N} \kern{0.1em} ^{14}\mathrm{N}}}{ \left( \frac{^{15}\mathrm{N} }{^{14}\mathrm{N}} \right) ^2 } - 1 $$

$$ \delta ^{15} \mathrm N = \cfrac{ \frac{^{15}\mathrm{N} }{^{14}\mathrm{N}} }{ \quad \left( \frac{^{15}\mathrm{N} }{^{14}\mathrm{N}} \right) _{air} } - 1 $$


## 结晶学

### 英文对照

   |  
----|----
三斜晶系 | triclinic system
单斜晶系 | monoclinic system
斜方晶系 | orthorhombic system
四方晶系 | tetragonal system
三方晶系 | trigonal system
六方晶系 | hexagonal system
等轴晶系 | isometric system, cubic system

