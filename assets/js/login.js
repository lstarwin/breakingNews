$(function() {
    // 点去"去注册帐号"链接
    $('#reg-link').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        //点击"去登陆"链接
    $('#login-link').on('click', function() {
            $('.login-box').show();
            $('.reg-box').hide();
        })
        // 为注册表单设置校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            uname: function(v, f) {
                var reg = /^([a-z|A-Z|0-9]){3,6}$/
                if (!reg.test(v)) {
                    return "用户名需要3-6位数字及字母或组合";
                }
            },
            pwd: function(v, f) {
                var reg = /^([a-z|A-Z|0-9]){6,8}$/
                if (!reg.test(v)) {
                    return "密码需要6-8位数字及字母或组合";
                }
            },
            repwd: function(v, f) {
                var rv = f.parentElement.previousElementSibling.lastElementChild.value;
                if (rv !== v) {
                    f.value = "";
                    return "两次输入的密码不一致,请重新输入!";
                }

            }
        })
        //处理注册事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            var uname = $("#form_reg input[name=username]").val();
            var pwd = $("#form_reg input[name=password]").val();
            var data = {
                username: uname,
                password: pwd
            };
            $.post('/api/reguser', data, function(res) {
                if (res.status) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $("#login-link").click();
            })
        })
        //处理登陆事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "post",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status) {
                    return layer.msg(res.message);
                }
                localStorage.setItem('token', res.token);
                layer.msg(res.message);
                location.href = "/index.htm";
            }
        })
    })

})