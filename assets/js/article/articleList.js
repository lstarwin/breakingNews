var layer, form, laypage;
//查询参数对象
var qp = {
    pagenum: 1, //当前页码
    pagesize: 2, //每页记录数
    cate_id: '', //文章分类id
    state: '' //文章状态[已发布/草稿]
}
$(function() {
    getArticleList();
    loadArticleCategory();
    layui.use("form", function() {
        form = layui.form;
        layer = layui.layer;
        laypage = layui.laypage;
    });
    //实现[筛选]按钮功能
    $('#formFilter').on('click', function(e) {
            e.preventDefault();
            var cate_id = $('[name=cate_id]').val();
            var state = $('[name=state]').val();
            qp.cate_id = cate_id;
            qp.state = state;
            getArticleList();
        })
        //通过代理绑定删除按钮
    $('body').on('click', '.btn-del', function() {
        layer.confirm('确认删除吗?', function(index) {
            layer.msg('数据删除成功');
            len = $('.btn-del').length;
            if (len === 1) {
                qp.pagenum = qp.pagenum == 1 ? 1 : qp.pagenum--;
            }
            getArticleList();
            layer.close(index);
        });
    })

})


//获取文章列表数据
function getArticleList() {
    $.ajax({
        method: 'get',
        url: '/my/article/list',
        data: qp,
        success: function(res) {
            res = getNewsByQery(qp);
            layer.msg(res.message);
            //console.log((getNewsByQery(qp)));
            if (res.status === 0) {
                var articleList = template('article_list_tmp', res);
                $('tbody').html(articleList);
                //加载分页
                page(qp.pagenum, qp.pagesize, res.total);
            }
        }
    })
}
//加载文章类别数据
function loadArticleCategory() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status === 0) {
                var selectopts = template('select_load_articleCategory', res);
                $('select[name=cate_id]').html(selectopts);
                form.render();
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
//分页区域配置
function page(currpage, pagesize, totalRecords) {
    laypage.render({
        elem: 'pageBox',
        count: totalRecords,
        limit: pagesize,
        curr: currpage,
        layout: ['count', 'limit', 'pre', 'page', 'next', 'skip'],
        limits: ['2', '3', '5', '10'],
        jump: function(obj, first) {
            var curr = obj.curr; //获取当前所选择页码
            var pnum = obj.limit; //获取所选每页展示条数
            qp.pagenum = curr;
            qp.pagesize = pnum;
            //1.点击页码的时候，会触发jump回调 first为undefined
            //2.只要调用了1aypage.render（）方法，就会触发jump回调 first为true
            if (!first) { //通过first特性解决死循环问题
                getArticleList();
            }
        }
    })
}