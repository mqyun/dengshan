$(function() {

});

// 用户注册
$(document).on('click', '.btn-reg', function() {
  var account = $('input[name="reg-account"]').val();
  var password = $('input[name="reg-password"]').val();
	var repassword = $('input[name="reg-repassword"]').val();
	var name = $('input[name="reg-name"]').val();
	var phone = $('input[name="reg-phone"]').val();
  var data = {
    'account': account,
		'password': password,
		'name': name,
    'phone': phone
  }
  if (account.length == 0 || password.length == 0 || (password != repassword) || name.length == 0 || phone.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/userreg', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success + '，两秒钟之后返回当前页面！');
        setTimeout(function() {
          location.reload();
        }, 2000);
      }
    });
  }
});

// 用户注册
$(document).on('click', '.btn-login', function() {
  var account = $('input[name="account"]').val();
  var password = $('input[name="password"]').val();
  var data = {
    'account': account,
		'password': password
  }
  if (account.length == 0 || password.length == 0) {
    showTips('warning', 'Warning!', '请检查填写信息！');
  } else {
    ajaxPost('/userlogin', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success + '，两秒钟之后返回当前页面！');
        setTimeout(function() {
          location.reload();
        }, 2000);
      }
    });
  }
});

// 下单
$(document).on('click', '.btn-addDingDan', function() {
  var chanpinid = $(this).data('chanpinid');
  var xingchengid = $('select[name="xingchengid"]').val();
	var ddrenshu = $('input[name="ddrenshu"]').val();
	var allprice = ($('.item-price').data('price') * ddrenshu).toFixed(2);
  var data = {
    'chanpinid': chanpinid,
    'xingchengid': xingchengid,
    'ddrenshu': ddrenshu,
    'allprice': allprice
  }
  if (ddrenshu.length == 0) {
    showTips('warning', 'Warning!', '请填写订单的人数！');
  } else {
    showBtnTips('success', '确定预定该行程吗？', '预定总价格为' + allprice + '元', '取消', '立即付款', function() {
      ajaxPost('/addDingDan', data, function(result) {
        if (result.success) {
          showTips('success', 'Success!', result.success);
        }
      });
    });
  }
});

$(document).on('click', '.btn-ycldingdan', function() {
  $('.btn-order').removeClass('btn-info');
  $(this).addClass('btn-info');
  $('.yclList').show();
  $('.wclList').hide();
});

$(document).on('click', '.btn-wcldingdan', function() {
  $('.btn-order').removeClass('btn-info');
  $(this).addClass('btn-info');
  $('.yclList').hide();
  $('.wclList').show();
});

// 修改密码
$(document).on('click', '.userUpdatePassword', function() {
  layer.open({
    type: 1,
    title: '修改密码',
    area: ['800px'],
    skin: 'layui-layer-lan',
    content: '<div class="panel-body">\
    <div class="form col-md-12"><form class="form-horizontal tasi-form">\
    <div class="form-group"><label class="control-label col-lg-2">原密码</label>\
    <div class="col-lg-10"><input type="password" name="oldpassword" class="form-control"></div></div>\
    <div class="form-group"><label class="control-label col-lg-2">新密码</label>\
    <div class="col-lg-10"><input type="password" name="password" class="form-control"></div></div></div></div>',
    btn: ['修改'],
    shadeClose: true,
    yes: function(index, layero) {
      var oldpassword = $('input[name="oldpassword"]').val();
      var password = $('input[name="password"]').val();
      var data = {
        'oldpassword': oldpassword,
        'password': password
      }
      if (oldpassword.length == 0 || password.length == 0) {
        showTips('warning', 'Warning!', '请检查填写信息！');
      } else {
        ajaxPost('/updatePassword', data, function(result) {
          if (result.success) {
            showTips('success', 'Success!', result.success);
          }
        });
      }
      layer.close(index);
    }
  });
});

// 申请退款
$(document).on('click', '.btn-shenqingtuikuan', function() {
  var data = {
    'dingdanid': $(this).data('dingdanid')
  }
  showBtnTips('success', '\n', '确定申请退款吗？', '取消', '确定', function() {
    ajaxPost('/shenqingtuikuan', data, function(result) {
      if (result.success) {
        showTips('success', 'Success!', result.success);
        location.reload();
      }
    });
  });
});
