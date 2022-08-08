$(function() {
        getUserInfo();
        $('#btnLogout').on('click', function() {
            layer.confirm('确定要退出码?', {
                icon: 3,
                title: '提示'
            }, function(index) {
                //清空localStorage中的token
                localStorage.removeItem('token');
                //跳转到登陆页面
                location.href = '/login.htm';
                layer.close(index);
            });
        })
    })
    //获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function(res) {
            if (!res.status) {
                return renderAvadar(res.data);
            }
            layui.layer.msg('获取用户信息失败!!!')
            renderAvadar(res.data);
        }
    })
}

function renderAvadar(user) {
    var name = user.nickname || user.username;
    $('.welcome').html('您好,&nbsp;' + name);
    if (user.user_pic) {
        $('.avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).show();
    } else {
        $('.avatar').show().html(name[0].toUpperCase());
        $('.layui-nav-img').hide();
    }
}