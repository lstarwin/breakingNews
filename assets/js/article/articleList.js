var layer = layui.layer;
var form;

//查询参数对象
var qp = {
    pagenum: 1, //当前页码
    pagesize: 2, //每页记录数
    cate_id: '', //文章分类id
    state: '' //文章状态[已发布/草稿]
}
$(function () {
    getArticleList();
    loadArticleCategory();
    layui.use("form", function () {
        form = layui.form;
        form.render();
    });
})
//获取文章列表数据
function getArticleList() {
    $.ajax({
        method: 'get',
        url: '/my/article/list',
        data: qp,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                var articleList = template('article_list_tmp', demoData);
                $('tbody').html(articleList);
            }
        }
    })
}
//加载文章类别数据
function loadArticleCategory() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status === 0) {
                var selectopts = template('select_load_articleCategory', res);
                $('select[name=cate_name]').html(selectopts);
                layui.use("form", function () {
                    form = layui.form;
                    form.render();
                });
            }
        }
    })
}
//扩展模板引擎函数对日期进行格式化
template.defaults.imports.dateFormate = function (d) {
    const dt = new Date(d);
    var y = addZero(dt.getFullYear());
    var m = addZero(dt.getMonth() + 1);
    var d = addZero(dt.getDate());
    var h = addZero(dt.getHours());
    var mm = addZero(dt.getMinutes());
    var s = addZero(dt.getSeconds());
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
}
//补0函数
function addZero(n) {
    return n < 9 ? '0' + n : n;
}