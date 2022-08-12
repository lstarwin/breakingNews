var demoData = {
        "status": 0,
        "message": "获取文章列表成功！",
        "data": [{
                "Id": 1,
                "title": "解放军全面台湾海域军演",
                "pub_date": "2020-01-03 12:19:57.690",
                "state": "已发布",
                "cate_name": "最新"
            },
            {
                "Id": 2,
                "title": "华为率先研发成功军用芯片技术",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "新闻"
            },
            {
                "Id": 3,
                "title": "读书已成为全民爱好，书店爆满！！",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "最新"
            },
            {
                "Id": 4,
                "title": "明星不在成为年青人的崇拜对象，科学家才是",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "新闻"
            },
            {
                "Id": 5,
                "title": "中国海洋深处发现大型'铀田',储量亿吨!!",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "新闻"
            },
            {
                "Id": 6,
                "title": "未来中国贸易突破球3倍大关",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "草稿",
                "cate_name": "新闻"
            },
            {
                "Id": 7,
                "title": "地球环境大会在北京召开,研究恢复极地冰层",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "草稿",
                "cate_name": "新闻"
            },
            {
                "Id": 8,
                "title": "强化粮食安全保障 提升能源资源供应保障能力",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "草稿",
                "cate_name": "最新"
            },
            {
                "Id": 9,
                "title": "@高新技术类企业：这些税收优惠政策请收好",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "草稿",
                "cate_name": "最新"
            },
            {
                "Id": 10,
                "title": "巴西学者：美国的“超级特权”，全世界为它买单",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "草稿",
                "cate_name": "最新"
            },
            {
                "Id": 11,
                "title": "新疆昨日新增确诊病例1例，新增无症状感染者410例",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "最新"
            },
            {
                "Id": 12,
                "title": "2022网民网络安全感满意度调查活动8月3日启动",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "最新"
            },
            {
                "Id": 13,
                "title": "中国经济高质量发展迈出新步伐5G时代,共创共利 ",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "新闻"
            }, {
                "Id": 14,
                "title": "航拍义乌静默管理首日：部分街道空无一人车辆稀少",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "新闻"
            }, {
                "Id": 15,
                "title": "多地鼓励农民进城买房:退出宅基地进城购房奖励5万",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "新闻"
            }, {
                "Id": 16,
                "title": "公安机关摧毁6款淫秽漫画APP，查冻涉案资金5100余万元",
                "pub_date": "2020-01-03 12:20:19.817",
                "state": "已发布",
                "cate_name": "最新"
            }
        ],
        "total": 16
    }
    //查询参数对象


function getNewsByQery(queryParams) {
    var pagenum_ = queryParams.pagenum;
    var pagesize_ = queryParams.pagesize;
    var cate_name = queryParams.cate_id;
    var state = queryParams.state;

    var data = demoData.data;
    var queryResData = [];
    for (var n in data) {
        if (cate_name) {
            if (state) {
                if (cate_name === data[n].cate_name && state === data[n].state) {
                    queryResData.push(data[n]);
                }
            } else {
                if (cate_name === data[n].cate_name) {
                    queryResData.push(data[n]);
                }
            }
        } else {
            if (state) {
                if (state === data[n].state) {
                    queryResData.push(data[n]);
                }
            } else {
                queryResData.push(data[n]);
            }
        }
    }

    queryResData = queryResData.slice((pagenum_ - 1) * pagesize_ >= queryResData.length ? queryResData.length : ((pagenum_ - 1) * pagesize_), ((pagenum_ - 1) * pagesize_ + pagesize_));
    return {
        "status": 0,
        "message": "获取文章列表成功！",
        "data": queryResData,
        "total": demoData.total
    }
}