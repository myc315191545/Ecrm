layui.use(['table', 'laypage'], function () {
    var laypage = layui.laypage //分页
        , table = layui.table //表格
        , element = layui.element; //元素操作


    //执行一个 table 实例
    table.render({
        elem: '#memberTable'
        , height: 390
        , url: 'build/js/tabledata.json'//数据接口
        , page: true //开启分页
        , size: "sm"
        , cols: [[ //表头

            {field: 'phone', title: '商品', width: '30%'}
            , {field: 'username', title: '单价', width: '5%'}
            , {field: 'sex', title: '数量', width: '5%'}
            , {field: 'city', title: '买家', width: '10%'}
            , {field: 'sign', title: '交易来源', width: '10%'}
            , {field: 'experience', title: '实收款', width: '10%'}
            , {field: 'score', title: '导购', width: '10%',}
            , {field: 'score', title: '订单编号', width: '10%'}
            , {field: 'score', title: '创建时间', width: '10%'}

        ]]
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
        reload: function(){
            var phone = $("#phone").val();
            var customer = $("#customer").val();
            var province = $("#province").val();
            var sex = $("#sex").val();

            //执行重载
            table.reload('memberTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                ,where: {
                    key: {
                        phone: phone,
                        customer:customer,
                        province:province,
                        sex:sex
                    }
                }
            });
        }
    };

    $('#btnQuery').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});

function findMemberList() {


    alert(phone + customer + privence + sex);


}

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

        $("#more").html('更多');
    }
    else {
        $("#more").html('收起');
    }

}

function findMemberDetail() {
    window.location.href = "member-detail1.html";
}