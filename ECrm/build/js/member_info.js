layui.use(['table', 'laypage'], function () {
    var laypage = layui.laypage //分页
        , table = layui.table //表格
        , element = layui.element; //元素操作


    //执行一个 table 实例
    table.render({
        elem: '#memberTable'
        , height: 390
        //, url: 'http://xiuniang.yaxin-nanjing.com/xiuniang/v/findMemberList'//数据接口
         , url: 'build/js/member.json'
        , page: true //开启分页
        , size: "sm"
        , cols: [[ //表头

            {checkbox: true, fixed: true, width: '4%'},
            {field: 'phone', title: '手机号', width: '10%'}
            , {field: 'name', title: '会员姓名', width: '10%'}
            , {field: 'sex', title: '会员级别', width: '10%'}
            , {field: 'totalConsumption', title: '交易总额', width: '10%'}
            , {field: 'totalNum', title: '交易笔数', width: '10%'}
            , {field: 'experience', title: '平均交易金额', width: '15%'}
            , {field: 'score', title: '上次交易时间', width: '15%',}
            , {title: '操作', align: 'center', toolbar: '#barMemberTable', width: '15%'}
        ]],
        // request: {
        //     pageName: 'page' //页码的参数名称，默认：page
        //     ,limitName: 'size' //每页数据量的参数名，默认：limit
        // },
        // response: {
        //     statusName: 'size' //数据状态的字段名称，默认：code
        //     ,statusCode: 200 //成功的状态码，默认：0
        //     ,msgName: 'number' //状态信息的字段名称，默认：msg
        //     ,countName: 'totalElements' //数据总数的字段名称，默认：count
        //     ,dataName: 'content' //数据列表的字段名称，默认：data
        // }
    });

    //监听工具条
    table.on('tool(memberTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            , layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'detail') {

            var that = this;
            //多窗口模式，层叠置顶
            layer.open({
                type: 2 //此处以iframe举例
                ,title: '会员详情'
                ,area: ['880px', '500px']
                ,id: data.id
                ,shade: 0
                ,maxmin: true
                ,offset: 'auto'
                ,content: 'member-detail.html?membershipId=' + data.id
               
                ,yes: function(){
                    $(that).click();
                }
                ,btn2: function(){
                    layer.closeAll();
                }

                ,zIndex: layer.zIndex //重点1
                ,success: function(layero){
                    layer.setTop(layero); //重点2
                }
            });


        } else if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if (layEvent === 'edit') {
            layer.msg('编辑操作');
        }
    });

    //分页
    laypage.render({
        elem: 'pageMenberTable' //分页容器的id
        , count: 100 //总页数
        , skin: '#1E9FFF' //自定义选中色值
        //,skip: true //开启跳页
        , jump: function (obj, first) {
            if (!first) {
                layer.msg('第' + obj.curr + '页');
            }
        }
    });


    var $ = layui.$, active = {
        reload: function () {
            var phone = $("#phone").val();
            var customer = $("#customer").val();
            var province = $("#province").val();
            var sex = $("#sex").val();

            //执行重载
            table.reload('memberTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {
                    key: {
                        phone: phone,
                        customer: customer,
                        province: province,
                        sex: sex
                    }
                }
            });
        }
    };

    $('#btnQuery').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});


function more() {
    $("#area").toggleClass('hidden');
    $("#gender").toggleClass('hidden');
    $("#dateOfBirth").toggleClass('hidden');
    $("#tradingValue").toggleClass('hidden');
    $("#level").toggleClass('hidden');
    $("#discountSence").toggleClass('hidden');
    $("#fanStatus").toggleClass('hidden');
    $("#favoriteKind").toggleClass('hidden');
    $("#billNums").toggleClass('hidden');
    $("#ageRange").toggleClass('hidden');
    $("#menberSource").toggleClass('hidden');

    if ($("#area").css('display') == 'none') {

        $("#more").html("<i class='layui-icon' style='font-size: 10px'>&#xe61a;</i>更多");
    }
    else {
        $("#more").html("<i class='layui-icon' style='font-size: 10px'>&#xe619;</i>收起");
    }

}
