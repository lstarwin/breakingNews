var layer = layui.layer;
var form = layui.form;
$(function() {
        getArticleList();
        //弹出点击添加文章类别按钮时界面
        var openIndex;
        $('#btnAddCategory').on('click', function() {
                openIndex = layer.open({
                    type: 1,
                    title: ['添加文章分类:', 'color:#f39292'],
                    anim: 6,
                    area: ['500px', '250px'],
                    content: $('#dialogContent').html() //这里content是一个普通的String
                });
            })
            //使用代理的方式添加文章类别
        $('body').on('submit', '#dialogFormData', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    layer.msg(res.message);
                    if (status === 0) {
                        layer.close(openIndex);
                    }
                }
            })
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