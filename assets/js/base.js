//请求根路径
var basePath = 'http://www.liulongbin.top:3007';
//每次ajax请求前都要调用一次该函数,option就是请求的参数对象
$.ajaxPrefilter(function(option) {
    option.url = basePath + option.url;
})