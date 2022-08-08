var layer = layui.layer;
$(function() {
    getArticleList();
    $('#btnAddCategory').on('click', function() {
        layer.open({
            type: 1,
            area: ['400px', '300px'],
            content: '传入任意的文本或html' //这里content是一个普通的String
        });
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