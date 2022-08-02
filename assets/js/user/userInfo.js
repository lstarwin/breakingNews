$(function() {
    getUserInfo();
    //重置按钮绑定点击事件处理重置需求
    $('#btnReset').on('click', function(e) {
        //阻止该按钮的默认行为[清空所有输入项内容]
        e.preventDefault();
        //再次调用ajax重填表单原始数据
        getUserInfo();
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: form.val('formData'),
            success: function(res) {
                if (res.status) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //调用父窗口中的方法重新渲染该页面就可以使用新数据更新页面
                parent.getUserInfo();
            }
        })
    })
})
var form = layui.form;
var layer = layui.layer;
form.verify({
        nickname: function(v, iput) {
            var reg = /^\S{3,6}$/
            if (!reg.test(v)) {
                return "昵称需要3-6个非空字符";
            }
        }
    })
    //初始化获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            //使用layui的自动付值功能
            form.val('formData', res.data);

        }
    })
}