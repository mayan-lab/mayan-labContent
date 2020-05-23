---
title: "树莓派4b相关配置"
date: 2020-05-15T15:15:38+08:00
draft: false
description: "树莓派4b安装系统，调整配置，64位系统，配置Python，NAS"
hideToc: false
enableToc: true
enableTocContent: true
author: zhaoqiu
authorEmoji: 👽
tags: 
- 树莓派4b
- Raspberry pi
- Python
- NAS
---

# 系统安装
https://github.com/openfans-community-offical/Debian-Pi-Aarch64/blob/master/README_ORGI.md
## 系统配置
[无显示器连接vnc时需要开启](https://gitee.com/openfans-community/Debian-Pi-Aarch64/blob/master/README_zh.md#web-vnc%E8%BF%9C%E7%A8%8B%E6%A1%8C%E9%9D%A2%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)：
```
virtual-monitor-enable
```


## 性能优化

[关闭窗口合并](https://github.com/openfans-community-offical/Debian-Pi-Aarch64/blob/master/README_ORGI.md#xfce%E7%8E%AF%E5%A2%83%E4%B8%8B%E6%9B%B4%E5%A5%BD%E7%9A%84%E6%A1%8C%E9%9D%A2%E5%9B%BE%E5%BD%A2%E6%80%A7%E8%83%BD)

## Python配置

pip [安装](https://www.cnblogs.com/nightowl/p/10668933.html)

export PATH="/home/pi/miniconda3/bin:$PATH"

sudo apt-get install python3-venv
python3 -m venv venv1 venv2

python -m pip install --upgrade pip

使用 `pip3 install numpy` 出错，原因未知，采用以下命令：
```
sudo apt-get install python3-numpy

```

## 开机自启的程序

[将python代码设置成服务](https://github.com/ghostwwl/my_raspbian#%E4%BA%94%E9%85%8D%E7%BD%AE%E6%88%91%E4%BB%AC%E8%87%AA%E5%B7%B1%E7%9A%84%E4%BB%A3%E7%A0%81%E4%B8%BA%E8%BF%90%E8%A1%8C%E6%9C%8D%E5%8A%A1)

rc.local 添加执行 .sh 脚本的命令 [链接](https://blog.csdn.net/feixuedongji/article/details/79891735)
## NAS

### Samba 安装
测速：
sudo hdparm -Tt /dev/sda1
https://github.com/ghostwwl/my_raspbian#%E5%AE%89%E8%A3%85-sambda-%E5%BD%93%E7%AE%80%E5%8D%95%E7%9A%84-nas
所选系统：
挂载：
安装ntfs-3g
sudo apt-get install ntfs-3g
加载内核模块
modprobe fuse
查看硬盘情况
fdis -l
将硬盘挂载到/mnt下，意思是吧硬盘的文件夹展开到mnt下，比如就没有windows上盘符这一层了。
ntfs-3g /dev/sda1 /mnt

实现开机自动挂载
vim /etc/fsta
最后一行添加，重启生效
/dev/sda1 /mnt ntfs-3g defaults,noexec,umask=0000 0 0
第五项是0，表示不对分区进行备份。默认0
第六项是1，表示挂载分区时会分区进行坏块检测。默认0

UUID方法：稳定可靠
查看UUID
sudo blkid /dev/sda1
UUID=cf116c95-b7f0-4ce4-b0da-7f2856784c43 /disk1 ext4 defaults 0 2
查看挂载情况
Copy
cd /mnt
ls

安装：
sudo apt install samba samba-common-bin

mkdir data 
chown -R root:users /mnt/data
chmod -R ug=rwx,o=rx /mnt/data

vi /etc/samba/smb.conf



重启smb服务
/etc/init.d/samba-ad-dc restart
配置完成后，sudo systemctl restart smbd重启samba服务
有问题可以试试这个：

Copy
 重启服务: sudo /etc/init.d/smbd restart
 重启服务: sudo /etc/init.d/nmbd restart
添加用户

smbpasswd -a pi
输入密码即可
## qBittorrent

安装：sudo apt-get install qbittorrent-nox
web端口：8080

启动 qbittorrent-nox -d
开启qbt服务
systemctl start qbittorrent
查看服务状态
systemctl status qbittorrent
服务开机自启
systemctl enable qbittorrent


## 安卓客户端
注意要设置用户名和密码！

MX Player 

ES文件管理器：长按编辑，输入密码
## V2ray



## 未解问题

无线连接VNC时经常卡死，但putty可以正常连接。 

## 未完成

磁盘自动挂载

qbittorrent 自动启动

samba 自动启动