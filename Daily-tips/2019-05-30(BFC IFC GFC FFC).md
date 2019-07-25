    FC的全称是：Formatting Contexts，是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
    
##### FC一共包含BFC、IFC、GFC 、FFC四种类型。CSS2.1规范中只有BFC、IFC。CSS3推出GFC、FFC两种新类型。

###### BFC(块级格式化上下文)
    如何产生BFC？
    1.float的值不为none。 
    2.overflow的值不为visible。 
    3.position的值不为relative和static。
    4.display的值为table-cell, table-caption, inline-block中的任何一个。 
    
    BFC有一下特性：
    1.内部的Box会在垂直方向，从顶部开始一个接一个地放置。
    2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生叠加
    3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
    4.BFC的区域不会与float box叠加。
    5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
    6.计算BFC的高度时，浮动元素也参与计算。
    
##### IFC(内联格式化上下文)

    IFC有一下特性：
    1.IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 
    2.IFC中时不可能有块级元素的，当插入块级元素时（如p中插入div）会产生两个匿名块与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。
    
    那么IFC一般有什么用呢？
    1.水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
    2.垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中

##### GFC(网格布局格式化上下文) display:grid

##### FFC(自适应格式化上下文) display:flex
