var layer = layui.layer;
var form = layui.form;
$(function() {
    getArticleList();
    $('#btnAddCategory').on('click', function() {
        layer.open({
            type: 1,
            title: ['添加文章分类:', 'color:#f39292'],
            anim: 6,
            area: ['500px', '250px'],
            content: $('#dialogContent').html() //这里content是一个普通的String
        });
    })
    $('body').on('submit', '[lay-filter=dialogFormData]', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: form.val('dialogFormData'),
            success: function(res) {
                console.log(res);

            }
        })
    })
})

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