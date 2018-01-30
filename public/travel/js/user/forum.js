$(function() {
  $('.btn-forum-user').click();
});

// 获取用户帖子
$(document).on('click', '.btn-forum-user', function() {
  $('.btn-forumtit').removeClass('btn-primary');
  $(this).addClass('btn-primary');
  var data = {
    'usertype': 'user'
  }
  ajaxPost('/getForumCon', data, function(result) {
    if (result.success) {
      $('#forumListView').html('');
      $('#forumListView').append(result.view);
    }
  });
});

// 获取管理员帖子
$(document).on('click', '.btn-forum-admin', function() {
  $('.btn-forumtit').removeClass('btn-primary');
  $(this).addClass('btn-primary');
  var data = {
    'usertype': 'admin'
  }
  ajaxPost('/getForumCon', data, function(result) {
    if (result.success) {
      $('#forumListView').html('');
      $('#forumListView').append(result.view);
    }
  });
});

// 发帖
$(document).on('click', '.btn-addTieZiView', function() {
  layer.open({
    type: 1,
    title: '发帖',
    area: ['800px'],
    skin: 'layui-layer-lan',
    content: '<div class="panel-body">\
    <div class="form col-md-12"><form class="form-horizontal tasi-form">\
    <div class="form-group"><label class="control-label col-lg-2">帖子主题</label>\
    <div class="col-lg-10"><input type="text" name="theme" class="form-control"></div></div>\
    <div class="form-group"><label class="control-label col-lg-2">帖子内容</label>\
    <div class="col-lg-10"><textarea type="text" rows="6" name="content" class="form-control" /></div></div></div></div>',
    btn: ['发帖'],
    shadeClose: true,
    yes: function(index, layero) {
      var theme = $('input[name="theme"]').val();
      var content = $('textarea[name="content"]').val();
      var data = {
        'theme': theme,
        'content': content
      }
      if (theme.length == 0 || content.length == 0) {
        showTips('warning', 'Warning!', '请检查发帖信息！');
      } else {
        ajaxPost('/addTieZi', data, function(result) {
          if (result.success) {
            showTips('success', 'Success!', result.success);
            $('.btn-forumtit.btn-primary').click();
          }
        });
      }
      layer.close(index);
    }
  });
});

// 回复帖子
$(document).on('click', '.replyTieZiView', function() {
  var forumid = $(this).data('forumid');
  layer.open({
    type: 1,
    title: '回复该贴',
    area: ['800px'],
    skin: 'layui-layer-lan',
    content: '<div class="panel-body">\
    <div class="form col-md-12"><form class="form-horizontal tasi-form">\
    <div class="form-group"><label class="control-label col-lg-2">回复内容</label>\
    <div class="col-lg-10"><textarea type="text" rows="6" name="content" class="form-control" /></div></div></div></div>',
    btn: ['回复'],
    shadeClose: true,
    yes: function(index, layero) {
      var content = $('textarea[name="content"]').val();
      var data = {
        'forumid': forumid,
        'content': content
      }
      if (content.length == 0) {
        showTips('warning', 'Warning!', '请检查回帖信息！');
      } else {
        ajaxPost('/addReply', data, function(result) {
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
});
