var layer = layui.layer;
var form = layui.form;
$(function() {
        getArticleList();
        //弹出点击添加文章类别按钮时界面
        var openIndex_btnAddCategory;
        $('#btnAddCategory').on('click', function() {
            openIndex_btnAddCategory = layer.open({
                type: 1,
                title: ['添加文章分类:', 'color:#f39292'],
                anim: 6,
                area: ['500px', '250px'],
                content: $('#dialogContent_add').html() //这里content是一个普通的String
            });
        })

        //使用代理的方式添加文章类别
        $('body').on('submit', '#dialogFormData_add', function(e) {
                e.preventDefault();
                $.ajax({
                    method: 'post',
                    url: '/my/article/addcates',
                    data: $(this).serialize(),
                    success: function(res) {
                        layer.msg(res.message);
                        if (status === 0) {
                            layer.close(openIndex_btnAddCategory);
                        }
                    }
                })
            })
            //使用代理方式绑定[编辑]按钮
        var openIndex_btnEdit;
        $("tbody").on('click', '.btn-edit', function() {
                openIndex_btnEdit = layer.open({
                    type: 1,
                    title: ['修改文章分类:', 'color:#f39292'],
                    anim: 0,
                    area: ['500px', '250px'],
                    content: $('#dialogContent_edit').html() //这里content是一个普通的String
                });
                var Id = $(this).attr('category-id');
                $.ajax({
                    method: 'get',
                    url: '/my/article/cates/' + Id,
                    success: function(res) {
                        form.val('form_edit', res.data)
                    }
                })
            })
            //更新文章分类数据
        $('body').on('submit', '#dialogFormData_edit', function(e) {
                e.preventDefault();
                $.ajax({
                    method: 'post',
                    url: '/my/article/updatecate',
                    data: form.val('form_edit'),
                    success: function(res) {
                        layer.close(openIndex_btnEdit);
                        layer.msg(res.message);
                        if (res.status === 0) {
                            getArticleList();
                        }
                    }
                })
            })
            //删除文章列表
        $('body').on('click', '.btn-delete', function() {
            var Id = $(this).attr('category-id');
            layer.confirm('确认删除吗?', { icon: 2, title: '系统警告' }, function(index) {
                $.ajax({
                    method: 'get',
                    url: '/my/article/deletecate/' + Id,
                    success: function(res) {
                        layer.msg(res.message);
                        if (res.status === 0) {
                            getArticleList();
                        }
                    }
                })

                layer.close(index);
            });
        })

    })
    //获取文章列表数据并使用模板引擎渲染该数据
function getArticleList() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function(res) {
            //使用模板引擎渲染数据 <script src="../assets/lib/template-web.js"></script>
            var tmpStrs = template('tmp', res);
            $('.layui-table tbody').html(tmpStrs);
        }
    })
}