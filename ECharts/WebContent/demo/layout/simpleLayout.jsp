<%@ page language="java" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@include file="../../header.jsp"%>
		<script type="text/javascript" src="<%=request.getContextPath()%>/demo/layout/chartOptions/barGraph.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/demo/layout/chartOptions/bar1Graph.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/demo/layout/chartOptions/lineGraph.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/demo/layout/chartOptions/pieGraph.js"></script>
	</head>
	<body>
	<!--Step:1 引入echarts.js-->
    <script type="text/javascript" src="<%=request.getContextPath()%>/echartsJs/echarts.js"></script>
    
    <script type="text/javascript">
    // Step:2 为模块加载器配置echarts的路径，从当前页面链接到echarts.js，定义所需图表路径
    require.config({
        paths: {
            echarts: '../../echartsJs'
        }
    });
    </script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/demo/layout/simpleLayout.js"></script>
	</body>
</html>
