$(function() {
    getArticleList();
})

function getArticleList() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function(res) {
            console.log(res);
        }
    })
}