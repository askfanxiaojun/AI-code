# 提取json内容工具介绍
## 体验地址
https://mcp.edgeone.site/share/O8YK1egGtuy8OONNWwY_C

## 起因
在使用大模型生成内容的时候，经常会要求使用json格式，但是大模型生成的内容，除了json代码之外，还有一些其他的无关内容，例如
1. markdown格式中的<```>等内容；
2. 会夹杂一些无关的表达内容，比如“已经为您生成以下Json内容”
所以当时就想要一个工具去提取大模型生成出来的json内容，只保留其中的json代码。

## Vide coding过程
核心工具：Trae，也可以使用cursor等工具，看个人喜好；
模型：DeepSeek V3

## 效果展示
![image](https://raw.githubusercontent.com/askfanxiaojun/img/master/images/2025/05/06/23-04-06-CleanShot%202025-05-06%20at%2022.56.04-2x.png)
支持功能：
- 填写需要处理的json内容，点击「提取并格式化JSON」
- 会生成处理后的json内容，并且会进行格式化和高亮显示，并且支持了点击「复制」直接复制生成后的json内容。