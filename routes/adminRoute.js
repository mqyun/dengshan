var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var fs = require('fs');

var adminmodel = require('../models/adminmodel');

// 管理员登录页面
router.get('/', function(req, res, next) {
  res.render('admin/login', {
    title: '管理员登录'
  });
});

// 管理员登录
router.post('/login', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  adminmodel.selectAdmin(account, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length == 0) {
      res.json({
        'error': '用户不存在'
      });
      return next(err);
    }
    if (rows[0].password != password) {
      res.json({
        'error': '密码错误'
      });
      return next(err);
    }
    req.session.name = rows[0].name;
    req.session.uid = rows[0].id;
    req.session.usertype = 'admin';
    req.session.quanxian = rows[0].quanxian;
    res.json({
      'success': '登录成功'
    });
  });
});

// 管理员产品管理页面
router.get('/chanpin', function(req, res, next) {
  adminmodel.getAllChanPinPage(function(err, pagenum) {
    if (err) {
      return next(err);
    }
    res.render('admin/chanpin/index', {
      title: '产品管理',
      pagenum: pagenum[0]
    });
  });
});

// 获取某一页产品信息
router.post('/pageChanPinInfo', function(req, res, next) {
  var page = (req.body.page - 1) * 10 || 0;
  adminmodel.selectAllChanPin(page, function(err, chanpinList) {
    if (err) {
      return next(err);
    }
    res.render('admin/chanpin/_ChanPinInfoList', {
      chanpinList: chanpinList
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      })
    });
  });
});

// 获取产品分类管理页面
router.get('/fenlei', function(req, res, next) {
  adminmodel.getAllFenLei(function(err, fenleiList) {
    if (err) {
      return next(err);
    }
    res.render('admin/fenlei/index', {
      title: '分类管理',
      fenleiList: fenleiList
    });
  });
});

// 添加分类
router.post('/addFenLei', function(req, res, next) {
  var name = req.body.name;
  adminmodel.addFenLei(name, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '添加分类成功'
    });
  });
});

// 修改分类
router.post('/xgFenLei', function(req, res, next) {
  var fenleiid = req.body.fenleiid;
  var name = req.body.name;
  adminmodel.xgFenLei(name, fenleiid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '修改分类名称成功'
    });
  });
});

// 添加产品界面
router.get('/addChanPinView', function(req, res, next) {
  adminmodel.getAllFenLei(function(err, fenleiList) {
    if (err) {
      return next(err);
    }
    res.render('admin/chanpin/_AddChanPin', {
      title: '添加产品',
      fenleiList: fenleiList
    });
  });
});

// 添加产品基本信息
router.post('/addChanPinInfo', function(req, res, next) {
  var place = req.body.place;
  var introduce = req.body.introduce;
  var fenlei = req.body.fenlei;
  var price = req.body.price;
  var adminid = req.session.uid;
  adminmodel.addChanPinInfo(place, introduce, fenlei, price, adminid, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    console.log(rows);
    req.session.insertId = rows.insertId;
    res.json({
      'success': '添加产品基本信息成功',
      'result': rows
    });
  });
});

// 上传图片
router.post('/uploadImg', function(req, res, next) {
  var chanpinid = req.session.insertId;
  var form = new multiparty.Form({
    uploadDir: './public/uploads'
  });
  form.parse(req, function(err, fields, files) {
    if (!fs.existsSync('./public/uploads/' + chanpinid)) {
      fs.mkdirSync('./public/uploads/' + chanpinid);
    }
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp[0]);
      for (var i = 0; i < files.image.length; i++) {
        var filename = files.image[i].originalFilename;
        var uploadedPath = files.image[i].path;
        var dstPath = './public/uploads/' + chanpinid + '/' + chanpinid + '-' + i + '-' + filename;
        var sqlPath = '/uploads/' + chanpinid + '/' + chanpinid + '-' + i + '-' + filename;
        fs.rename(uploadedPath, dstPath, function(err) {
          if (err) {
            console.log('rename error: ' + err);
          } else {
            console.log('rename ok');
          }
        });
        adminmodel.addChanPinImg(chanpinid, sqlPath, function(err) {
          if (err) {
            return next(err);
          }
          adminmodel.updateChanPinHasImg(chanpinid, function(err) {
            if (err) {
              return next(err);
            }
          });
        });
      }
    }
    res.redirect('/admin/successView');
  });
});

router.post('/reuploadImg', function(req, res, next) {
  var chanpinid = req.session.insertId;
  var form = new multiparty.Form({
    uploadDir: './public/uploads'
  });
  form.parse(req, function(err, fields, files) {
    if (!fs.existsSync('./public/uploads/' + chanpinid)) {
      fs.mkdirSync('./public/uploads/' + chanpinid);
    }
    var filesTmp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp[0]);
      for (var i = 0; i < files.image.length; i++) {
        var filename = files.image[i].originalFilename;
        var uploadedPath = files.image[i].path;
        var dstPath = './public/uploads/' + chanpinid + '/' + chanpinid + '-' + i + '-' + filename;
        var sqlPath = '/uploads/' + chanpinid + '/' + chanpinid + '-' + i + '-' + filename;
        fs.rename(uploadedPath, dstPath, function(err) {
          if (err) {
            console.log('rename error: ' + err);
          } else {
            console.log('rename ok');
          }
        });
        adminmodel.addChanPinImg(chanpinid, sqlPath, function(err) {
          if (err) {
            return next(err);
          }
          adminmodel.updateChanPinHasImg(chanpinid, function(err) {
            if (err) {
              return next(err);
            }
          });
        });
      }
    }
    res.redirect('/admin/chanpin');
  });
});

// 成功界面
router.get('/successView', function(req, res, next) {
  res.render('success', {
    title: 'success'
  });
});

// 为没有上传图片的产品上传图片
router.post('/forgetUploadImgView', function(req, res, next) {
  req.session.insertId = req.body.chanpinid;
  res.render('admin/chanpin/_ForgetUploadImg', {}, function(err, html) {
    res.json({
      'success': true,
      'view': html
    });
  });
});

// 获取修改产品信息页面
router.post('/editChanPinInfoView', function(req, res, next) {
  var chanpinid = req.body.chanpinid;
  adminmodel.getAllFenLei(function(err, fenleiList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    adminmodel.getThisChanPinInfo(chanpinid, function(err, chanpinInfo) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.render('admin/chanpin/_EditChanPinInfo', {
        fenleiList: fenleiList,
        chanpinInfo: chanpinInfo[0]
      }, function(err, html) {
        res.json({
          'success': true,
          'view': html
        });
      });
    });
  });
});

// 修改产品信息
router.post('/editChanPinInfo', function(req, res, next) {
  var place = req.body.place;
  var introduce = req.body.introduce;
  var fenlei = req.body.fenlei;
  var price = req.body.price;
  var adminid = req.session.uid;
  var chanpinid = req.body.chanpinid;
  adminmodel.updateChanPinInfo(place, introduce, fenlei, price, adminid, chanpinid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '修改产品信息成功'
    });
  });
});

// 获取某个产品的所有图片
router.post('/getThisChanPinImg', function(req, res, next) {
  var chanpinid = req.body.chanpinid;
  var placename = req.body.placename;
  adminmodel.getThisChanPinImg(chanpinid, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    var photojson = {
      'title': '产品图片',
      'id': 1,
      'start': 0,
      'data': []
    };
    for (var i = 0; i < rows.length; i++) {
      photojson.data.push({
        'alt': placename,
        'pid': rows[i].id,
        'src': '../../../' + rows[i].url,
        'thumb': '../../../' + rows[i].url
      })
    }
    res.json({
      'success': '修改产品信息成功',
      'photojson': photojson
    });
  });
});

// 获取某产品行程
router.post('/getThisXingCheng', function(req, res, next) {
  var chanpinid = req.body.chanpinid;
  var placename = req.body.placename;
  adminmodel.getThisXingCheng(chanpinid, function(err, xingchengList) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    for (var i = 0; i < xingchengList.length; i++) {
      var sqltime = xingchengList[i].starttime * 1000;
      var parsetime = new Date(sqltime);
      xingchengList[i].starttime = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
    }
    res.render('admin/xingcheng/_XingChengList', {
      xingchengList: xingchengList,
      xingchengname: placename + '行程'
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 添加行程modal
router.post('/addXingChengModal', function(req, res, next) {
  res.render('admin/xingcheng/_AddXingCheng', {}, function(err, html) {
    res.json({
      'success': true,
      'view': html
    });
  });
});

// 添加行程
router.post('/addXingCheng', function(req, res, next) {
  var chanpinid = req.body.chanpinid;
  var renshu = req.body.renshu;
  var starttime = req.body.starttime;
  adminmodel.addXingCheng(chanpinid, renshu, starttime, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '添加行程成功'
    });
  });
});

// 获取订单页面
router.get('/dingDan/:state', function(req, res, next) {
  var state = req.params.state;
  adminmodel.getAllDingDanPage(state, function(err, pagenum) {
    if (err) {
      return next(err);
    }
    res.render('admin/dingdan/index', {
      title: '预定管理',
      pagenum: pagenum[0],
      state: state
    });
  });
});

// 获取某一页未处理订单列表
router.post('/pageDingDanInfo', function(req, res, next) {
  var page = (req.body.page - 1) * 10 || 0;
  var state = req.body.state;
  adminmodel.selectAllDingDan(state, page, function(err, dingdanList) {
    if (err) {
      return next(err);
    }
    for (var i = 0; i < dingdanList.length; i++) {
      var sqltime = dingdanList[i].starttime * 1000;
      var parsetime = new Date(sqltime);
      dingdanList[i].starttime = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
      var sqltime = dingdanList[i].time;
      var parsetime = new Date(sqltime);
      dingdanList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
    }
    res.render('admin/dingdan/_DingDanList', {
      dingdanList: dingdanList,
      state: state
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      })
    });
  });
});

// 获取某一页未处理订单列表
router.post('/pageYclDingDanInfo', function(req, res, next) {
  var page = (req.body.page - 1) * 10 || 0;
  var state = req.body.state;
  adminmodel.selectAllDingDan(state, page, function(err, dingdanList) {
    if (err) {
      return next(err);
    }
    res.render('admin/dingdan/_DingDanList', {
      dingdanList: dingdanList,
      state: state
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      })
    });
  });
});

// 获取某个订单的用户信息
router.post('/getThisDingDanUserInfo', function(req, res, next) {
  var userid = req.body.userid;
  adminmodel.getThisDingDanUserInfo(userid, function(err, userInfo) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.render('admin/dingdan/_UserInfo', {
      userInfo: userInfo[0]
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      });
    });
  });
});

// 处理退款
router.post('/handleDingDan', function(req, res, next) {
  var dingdanid = req.body.dingdanid;
  var xingchengid = req.body.xingchengid;
  var ddrenshu = req.body.ddrenshu;
  adminmodel.handleDingDan(dingdanid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    adminmodel.updateTuiKuanXingCheng(ddrenshu, xingchengid, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '退款成功'
      });
    });
  });
});

// 用户管理
router.get('/userinfo', function(req, res) {
  adminmodel.selectAllUser(function(err, userList) {
    if (err) {
      return next(err);
    }
    res.render('admin/userinfo/index', {
      title: '用户管理',
      userList: userList
    });
  });
});

// 管理员列表界面
router.get('/adminList', function(req, res, next) {
  adminmodel.selectAllAdmin(function(err, rows) {
    res.render('admin/admin/index', {
      adminList: rows
    });
  });
});

// 添加管理员modal
router.post('/addAdminModal', function(req, res, next) {
  res.render('admin/admin/_AddAdmin', {}, function(err, html) {
    res.json({
      'success': true,
      'view': html
    });
  });
});

// 添加管理员
router.post('/addAdmin', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  var name = req.body.name;
  var quanxian = req.body.quanxian;
  adminmodel.addAdmin(account, password, name, quanxian, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '添加管理员成功'
    });
  });
});

router.get('/logout', function(req, res) {
  req.session.name = '';
  req.session.uid = '';
  req.session.usertype = '';
  req.session.quanxian = '';
  req.session.insertId = '';
  res.redirect('/');
});

module.exports = router;
