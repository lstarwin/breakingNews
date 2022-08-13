var form, layer;
$(function() {
        layui.use('form', function() {
            form = layui.form;
            layer = layui.layer;
            form.render();
        })
        loadArticleCategoryList();
        // 初始化富文本编辑器
        initEditor();
        //初始化cropper
        // 1.1 获取裁剪区域的 DOM 元素
        var $image = $('#image')
            // 1.2 配置选项
        const options = {
                // 纵横比
                aspectRatio: 1,
                // 指定预览区域
                preview: '.img-preview'
            }
            // 1.3 创建裁剪区域
        $image.cropper(options)
            //隐藏原始文件上传按钮
        $('#file').hide();
        //绑定'上传'按钮点击事件,引起file标签click()
        $('#btnFaceSelect').on('click', function() {
            $('#file').click();
        })
        $('#file').on('change', function(e) {
            var files = e.target.files;
            if (files.length === 0) {
                return layer.msg('您未选择任何图片!');
            }
            var file = e.target.files[0];
            var newImgURL = URL.createObjectURL(file);
            $image.cropper('destroy').attr('src', newImgURL).cropper(options);
        })
        var state = '已发布';
        //点击[存为草稿按钮]更改文章状态属性
        $('#btn_saveCG').on('click', function() {
                state = '草稿';
            })
            //绑定表单提交进行发布
        $('#formPublish').on('submit', function(e) {
            e.preventDefault();
            var fd = new FormData($(this)[0]);
            fd.append('state', state);
            var dataURL = $image.cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            }).toDataURL('image/png')
            fd.append('cover_img', dataURL);
            // fd.forEach(function(i, v) {
            //     console.log(i + "-----" + v);

            // })
            publishArticle(fd);

        })
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
//文章发布
function publishArticle(formDate) {
    $.ajax({
        method: 'post',
        url: '/my/article/add',
        data: formDate,
        contentType: false,
        processData: false,
        success: function(res) {
            //远程服务器无法添加,这里只做演示
            layer.msg('发布成功!!');
        }
    })
}