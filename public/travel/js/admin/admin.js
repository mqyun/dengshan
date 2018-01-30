$(function() {

});

// 添加分类
$(document).on('click', '.btn-addfenleimodal', function() {
  layer.open({
    type: 1,
    title: '添加分类',
    area: ['600px'],
    skin: 'layui-layer-lan',
    content: '<div class="panel-body">\
    <div class="form col-md-12"><form class="form-horizontal tasi-form">\
    <div class="form-group"><label class="control-label col-lg-3">分类名称</label>\
    <div class="col-lg-9"><input type="text" name="fenlei-name" class="form-control"></div></div>\
    </div></div>',
    btn: ['添加'],
    shadeClose: true,
    yes: function(index, layero) {
      var name = $('input[name="fenlei-name"]').val();
      var data = {
        'name': name
      }
      layer.close(index);
      if (name.length == 0) {
        showTips('warning', 'Warning!', '请填写分类名称！');
      } else {
        ajaxPost('/admin/addFenLei', data, function(result) {
          if (result.success) {
            showTips('success', 'Success!', result.success);
            setTimeout(function() {
              location.reload();
            }, 1000);
          }
        });
      }
    }
  });
});

// 修改分类名称
$(document).on('click', '.btn-xgfenleiname', function() {
  var fenleiid = $(this).data('fenleiid');
  layer.open({
    type: 1,
    title: '修改分类',
    area: ['600px'],
    skin: 'layui-layer-lan',
    content: '<div class="panel-body">\
    <div class="form col-md-12"><form class="form-horizontal tasi-form">\
    <div class="form-group"><label class="control-label col-lg-3">分类名称</label>\
    <div class="col-lg-9"><input type="text" name="fenlei-name" class="form-control"></div></div>\
    </div></div>',
    btn: ['修改'],
    shadeClose: true,
    yes: function(index, layero) {
      var name = $('input[name="fenlei-name"]').val();
      var data = {
        'fenleiid': fenleiid,
        'name': name
      }
      layer.close(index);
      if (name.length == 0) {
        showTips('warning', 'Warning!', '请填写要修改的分类名称！');
      } else {
        ajaxPost('/admin/xgFenLei', data, function(result) {
          if (result.success) {
            showTips('success', 'Success!', result.success);
            setTimeout(function() {
              location.reload();
            }, 1000);
          }
        });
      }
    }
  });
});

// 添加产品iframe
$(document).on('click', '.btn-addChanPinView', function() {
  layer.open({
    type: 2,
    title: '添加产品',
    shadeClose: true,
    skin: 'layui-layer-lan',
    shade: 0.4,
    area: ['893px', '600px'],
    maxmin: true,
    content: '/admin/addChanPinView',
    end: function() {
      location.reload();
    }
  });
});

// 添加基本信息
$(document).on('click', '.btn-addchanpininfo', function() {
  var place = $('input[name="place"]').val();
  var introduce = $('input[name="introduce"]').val();
  var fenlei = $('select[name="fenlei"]').val();
  var price = $('input[name="price"]').val();
  var data = {
    'place': place,
    'introduce': introduce,
    'fenlei': fenlei,
    'price': price
  }
  if (place.length == 0 || introduce.length == 0 || price.length == 0) {
    showTips('warning', 'Warning!', '请检查产品信息');
  } else {
    ajaxPost('/admin/addChanPinInfo', data, function(result) {
      if (result.success) {
        showTips('success', '\n', result.success + '，接下来请上传该产品的图片');
        $('.panel-addChanPinInfo').hide();
        $('.panel-uploadChanPinImg').show();
      }
    });
  }
});

// 上传图片view
$(document).on('click', '.btn-forgetUploadImg', function() {
  var chanpinid = $(this).parents('tr').data('chanpinid');
  var data = {
    'chanpinid': chanpinid
  }
  ajaxPost('/admin/forgetUploadImgView', data, function(result) {
    if (result.success) {
      layer.open({
        type: 1,
        title: '上传图片',
        area: ['800px'],
        skin: 'layui-layer-lan',
        content: result.view,
        shadeClose: true
      });
    }
  });
});

// 修改产品信息
$(document).on('click', '.btn-editchanpininfo', function() {
  var chanpinid = $(this).parents('tr').data('chanpinid');
  var data = {
    'chanpinid': chanpinid
  }
  ajaxPost('/admin/editChanPinInfoView', data, function(result) {
    if (result.success) {
      layer.open({
        type: 1,
        title: '修改产品信息',
        area: ['800px'],
        skin: 'layui-layer-lan',
        content: result.view,
        btn: ['修改'],
        shadeClose: true,
        yes: function(index, layero) {
          var place = $('input[name="edit-place"]').val();
          var introduce = $('input[name="edit-introduce"]').val();
          var fenlei = $('select[name="edit-fenlei"]').val();
          var price = $('input[name="edit-price"]').val();
          data = {
            'place': place,
            'introduce': introduce,
            'fenlei': fenlei,
            'price': price,
            'chanpinid': chanpinid
          }
          layer.close(index);
          if (place.length == 0 || introduce.length == 0 || price.length == 0) {
            showTips('warning', 'Warning!', '请检查修改信息！');
          } else {
            ajaxPost('/admin/editChanPinInfo', data, function(result) {
              if (result.success) {
                showTips('success', '\n', result.success);
                setTimeout(function() {
                  $('.pageli.active').click();
                }, 1000);
              }
            });
          }
        }
      });
    }
  });
});

// 查看某产品图片
$(document).on('click', '.btn-seethisimg', function() {
  var chanpinid = $(this).parents('tr').data('chanpinid');
  var placename = $(this).parents('tr').find('.td-placename').text();
  var data = {
    'chanpinid': chanpinid,
    'placename': placename
  }
  ajaxPost('/admin/getThisChanPinImg', data, function(result) {
    if (result.success) {
      layer.photos({
        photos: result.photojson
      });
    }
  });
});

// 获取某产品行程
$(document).on('click', '.btn-getxingcheng', function() {
  var chanpinid = $(this).parents('tr').data('chanpinid');
  var placename = $(this).parents('tr').find('.td-placename').text();
  var data = {
    'chanpinid': chanpinid,
    'placename': placename
  }
  ajaxPost('/admin/getThisXingCheng', data, function(result) {
    if (result.success) {
      $('#chanpinxingcheng').html('');
      $('#chanpinxingcheng').append(result.view);
    }
  });
});

// 发布新行程
$(document).on('click', '.btn-addxingchengmodal', function() {
  var chanpinid = $(this).parents('tr').data('chanpinid');
  var placename = $(this).parents('tr').find('.td-placename').text();
  var thisbtn = $(this);
  ajaxPost('/admin/addXingChengModal', {}, function(result) {
    if (result.success) {
      layer.open({
        type: 1,
        title: '为' + placename + '添加行程',
        area: ['800px', '500px'],
        skin: 'layui-layer-lan',
        content: result.view,
        btn: ['添加行程'],
        shadeClose: true,
        yes: function(index, layero) {
          var renshu = $('input[name="renshu"]').val();
          var starttime = $('input[name="starttime"]').val();
          starttime = Date.parse(new Date(starttime)) / 1000;
          var data = {
            'chanpinid': chanpinid,
            'renshu': renshu,
            'starttime': starttime
          }
          layer.close(index);
          if (chanpinid.length == 0 || renshu.length == 0) {
            showTips('warning', 'Warning!', '请检查修改信息！');
          } else {
            ajaxPost('/admin/addXingCheng', data, function(result) {
              if (result.success) {
                showTips('success', '\n', result.success);
                thisbtn.parents('tr').find('.btn-getxingcheng').click();
              }
            });
          }
        },
        success: function() {
          $('#datetimepicker-xingchengstart').datetimepicker();
        }
      });
    }
  });
});

// 获取用户信息getThisDingDanUserInfo
$(document).on('click', '.btn-getThisDingDanUserInfo', function() {
  var userid = $(this).data('userid');
  var data = {
    'userid': userid
  }
  ajaxPost('/admin/getThisDingDanUserInfo', data, function(result) {
    if (result.success) {
      layer.open({
        type: 1,
        title: '用户信息',
        area: ['500px'],
        skin: 'layui-layer-lan',
        content: result.view,
        shadeClose: true
      });
    }
  });
});

$(document).on('click', '.btn-clDingDan', function() {
  var dingdanid = $(this).data('dingdanid');
  var xingchengid = $(this).data('xingchengid');
  var ddrenshu = $(this).data('ddrenshu');
  var data = {
    'dingdanid': dingdanid,
    'xingchengid': xingchengid,
    'ddrenshu': ddrenshu
  }
  showBtnTips('success', '\n', '确定退款吗？', '取消', '确定', function() {
    ajaxPost('/admin/handleDingDan', data, function(result) {
      if (result.success) {
        showTips('success', '\n', result.success);
        setTimeout(function() {
          location.reload();
        }, 1000);
      }
    });
  });
});

// 添加管理员modal
$(document).on('click', '.btn-addadmin', function() {
  ajaxPost('/admin/addAdminModal', {}, function(result) {
    if (result.success) {
      layer.open({
        type: 1,
        title: '添加管理员',
        area: ['800px'],
        skin: 'layui-layer-lan',
        content: result.view,
        btn: ['添加'],
        shadeClose: true,
        yes: function(index, layero) {
          var account = $('input[name="admin-account"]').val();
          var password = $('input[name="admin-password"]').val();
          var name = $('input[name="admin-name"]').val();
          var quanxian = $('select[name="admin-quanxian"]').val();
          var data = {
            'account': account,
            'password': password,
            'name': name,
            'quanxian': quanxian
          }
          if (account.length == 0 || password.length == 0 || name.length == 0) {
            showTips('warning', 'Warning!', '请检查填写信息！');
          } else {
            ajaxPost('/admin/addAdmin', data, function(result) {
              if (result.success) {
                showTips('success', 'Success!', result.success);
                setTimeout(function() {
                  location.reload();
                }, 1000);
              }
            });
          }
          layer.close(index);
        }
      });
    }
  });
});
