var form = layui.form;
var layer = layui.layer;
$(function() {
        //发送请求修改密码
        $('.layui-form').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'post',
                url: '/my/updatepwd',
                data: form.val('formData'),
                success: function(res) {
                    if (res.status) {
                        return layer.msg(res.message);
                    }
                    //使用原始node获取from调用reset()方法重置表单,jquery方式不可以
                    document.querySelector('.layui-form').reset();
                    layer.msg(res.message);
                }
            })
        })
    })
    //定制校验规则
form.verify({
    pwd: function(v, f) {
        var reg = /^([a-z|A-Z|0-9]){6,8}$/
        if (!reg.test(v)) {
            return "密码需要6-8位数字及字母或组合";
        }
    },
    somepwd: function(v, ipt) {
        if (v === $('[name=oldPwd]').val()) {
            return '新旧密码不能一致';
        }
    },
    repwd: function(v, ipt) {
        if (v !== $('[name=newPwd]').val()) {
            return '两次密码输入不一致';
        }
    }
})