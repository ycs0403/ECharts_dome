<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<HTML>
	<HEAD>
		<TITLE>ECharts研究</TITLE>
		<!-- 资源包 -->
		<link href="<%=request.getContextPath()%>/ext/resources/css/ext-all.css" rel="stylesheet">
		<link href="<%=request.getContextPath()%>/ext/resources/css/xtheme-primb-blue.css" rel="stylesheet">
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/ext/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/ext/ext-all.js"></script>
		<style type=text/css>
			#grid {
				position: absolute;
				left: 50%;
				top: 50%;
				margin-left: -350px;
				margin-top: -250px;
			}
			.x-grid3-row td,.x-grid3-summary-row td{ 
				line-height:30px; //控制行高
			}
		</style>
	</HEAD>
	<body>
		<div id="grid"></div>
	</body>
	<script type="text/javascript" src="<%=request.getContextPath()%>/index.js"></script>
</HTML>
