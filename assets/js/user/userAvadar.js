var layer = layui.layer;
$(function() {
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
    $image.cropper(options);
    /***/
    // $('input[type=file]').hide();
    $('#btnUpload').on('click', function() {
        $('input[type=file]').click();
    })
    $('input[type=file]').on('change', function(e) {
        var fileList = e.target.files;
        if (fileList.length < 1) {
            return layer.msg('未选任何文件!!!');
        }
    })
})