var layer = layui.layer;
var form;

//查询参数对象
var qp = {
    pagenum: 1, //当前页码
    pagesize: 2, //每页记录数
    cate_id: '', //文章分类id
    state: '' //文章状态[已发布/草稿]
}
$(function() {
        getArticleList();
        layui.use("form", function() {
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
        success: function(res) {
            layer.msg(res.message);
            if (res.status === 0) {
                var demoData = {
                    "status": 0,
                    "message": "获取文章列表成功！",
                    "data": [{
                            "Id": 1,
                            "title": "abab",
                            "pub_date": "2020-01-03 12:19:57.690",
                            "state": "已发布",
                            "cate_name": "最新"
                        },
                        {
                            "Id": 2,
                            "title": "666",
                            "pub_date": "2020-01-03 12:20:19.817",
                            "state": "已发布",
                            "cate_name": "股市"
                        }
                    ],
                    "total": 5
                }

                var articleList = template('article_list_tmp', demoData);
                $('tbody').html(articleList);
            }
        }
    })
}
//扩展模板引擎函数对日期进行格式化
template.defaults.imports.dateFormate = function(d) {
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