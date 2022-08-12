var form, layer;
$(function() {
        layui.use('form', function() {
            form = layui.form;
            layer = layui.layer;
            form.render();
        })
        loadArticleCategoryList();
    })
    //加载文章分类列表
function loadArticleCategoryList() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                var tmpStr = template('tmp_cate', res);
                $('[name=cate_id]').html(tmpStr);
                form.render();
            }
        }

    })
}