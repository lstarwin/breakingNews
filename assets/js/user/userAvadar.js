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
    $('input[type=file]').hide();
    $('#btnUpload').on('click', function() {
            $('input[type=file]').click();
        })
        //选择上传图片并更新图片框中图片
    $('input[type=file]').on('change', function(e) {
            var fileList = e.target.files;
            if (fileList.length < 1) {
                return layer.msg('未选任何文件!!!');
            }
            var fileUrl = URL.createObjectURL(fileList[0]);
            $image.cropper('destroy').attr('src', fileUrl).cropper(options);
        })
        //上传图片
    $('#btnUploadOk').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布        width: 100,        height: 100      })
                width: 100,
                height: 100
            }).toDataURL('image/png');
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status) {
                    return layer.msg(res.message);
                }
                window.parent.getUserInfo();
                layer.msg(res.message);
            }
        })
    })
})