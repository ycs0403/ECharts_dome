Ext.BLANK_IMAGE_URL = '/EChartsDemo/ext/resources/images/default/s.gif';
var clientWidth = document.body.clientWidth - 15;
var clientHeight = document.body.clientHeight;


function initData(){
	alert("初始化数据。存在问题（火狐浏览器下，图片错位。Chrome浏览器下，单元格不显示。）")
	document.getElementById("lvl1NodeRight").innerHTML = "12%"
}
Ext.onReady(function() {
	Ext.Ajax.timeout = 900000;// 超时为十五分钟，单位为毫秒，默认是30秒
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	// 结合拦截器共同拦截数据请求动作，已检查SESSION是否过期
	Ext.util.Observable.observeClass(Ext.data.Connection);
	Ext.data.Connection.on('requestcomplete', function(conn, resp,
					options) {
				if (resp && resp.getResponseHeader
						&& resp.getResponseHeader('__timeout'))
					window.location.href = __prime.constants.contentPath + '/noLogin.html';
			});
	// 检测每个请求返回状态，返回0时表示服务器关闭
	Ext.data.Connection.on('requestexception', function(conn, resp,
					options) {
				if (resp.status == 0)
					parent.Ext.Msg.alert('系统消息',
							'数据请求出错，应用服务器已关闭，请您联系系统管理员！');
			});
	initData();
})
