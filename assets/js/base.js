//请求根路径
var basePath = 'http://www.liulongbin.top:3007';
//每次ajax请求前都要调用一次该函数,option就是请求的参数对象
$.ajaxPrefilter(function(option) {
    option.url = basePath + option.url;
    //为有权限接口[/my/]统一设置 Authorization
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //未登陆并授权用户返回处理
    option.complete = function(res) {
        //登陆不成功
        // if (res.responseJSON.status === 1) {
        //     //强制删除localStorage
        //     localStorage.removeItem('token');
        //     //返回登陆页面
        //     location.href = '/login.htm';
        // }
    }
})