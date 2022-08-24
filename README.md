
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110346458.png#pic_center)

Chrome 商店[地址](https://chrome.google.com/webstore/detail/lp-json-view/jcglapefdggmbmnlnmijdmkahmiaconb)

---
**查看/格式化** 二合一。

## 功能
- 自动识别 JSON 内容，并在页面右下角创建切换按钮。
-  支持展开/折叠节点。
- 支持全部展开、全部折叠、展开一二三层节点操作。
- 支持复制节点信息（Array/Object 节点复制内容自动格式化）。
- 复制文本节点值 不会添加引号。
- 自动识别超链接，可点击。
- 支持在当前页面，原始内容和格式化内容随意切换。
- 对于复制的JSON文本，可点击插件打开新的编辑解页面，缩短使用链路。

### 自动识别JSON内容，右下角出现切换按钮
为了保证第一眼看到的是原始内容，所以这里不会自动用JSON格式视图显示，用户可以在右下角切换：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110619969.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
“JSON数据”视图默认展开所有节点：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110636644.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
### 节点可折叠、可复制、可点击链接
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110655682.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
### 可操作整体节点的展开状态
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110717313.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
### 复制原始内容时，不会被选中
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110741735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
### 支持非页面JSON格式化操作
很多时候，我们在调试接口参数时，可能需要对这些字符串格式化：


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110804695.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
Lp Json-view插件 内置格式化页面：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110824234.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110832172.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
## 注意
#### 建议固定扩展程序，方便点击操作

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110856817.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
#### 建议禁用或删除所有相关插件
防止多个类JSON-View插件相互干扰，建议禁用或删除所有相关插件，只保留这一个。通过浏览器访问`chrome://extensions` 查看操作：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023110943907.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
## 背景
作为开发同学，与JSON内容打交道是必不可少的，例如给你一个JSON接口，或者给你一段JSON字符串，你要更方便的看内容结构，就需要用的格式化工具。
在Chrome的商店搜索了类似的工具，进行了使用，包括：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201023111006305.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xlY2VwaW4=,size_16,color_FFFFFF,t_70#pic_center)
其中这几款加起来的用户量近200万，但仍然满足不了一些需求，如：
- Raw/JSON视图的任意切换
-  节点的复制
- 节点的批量折叠
- 节点的类型识别
- 以及没有对非页面内容的JSON解析

以上诉求为出发点，做了这款插件。
可视化部分rjv组件满足大部分需求，但也有一些功能无法满足，所以对rjv进行了二次开发，满足了所有需求点。
