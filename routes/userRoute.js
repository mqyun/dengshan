var express = require('express');
var router = express.Router();

var usermodel = require('../models/usermodel');

// 用户首页面
router.get('/', function(req, res, next) {
  usermodel.getAllFenLei(function(err, fenleiList) {
    if (err) {
      return next(err);
    }
    usermodel.getNewChanPin(function(err, chanpinList) {
      if (err) {
        return next(err);
      }
      usermodel.getRandChanPin(function(err, randchanpinList) {
        if (err) {
          return next(err);
        }
        res.render('user/index/index', {
          title: '登山俱乐部首页',
          fenleiList: fenleiList,
          chanpinList: chanpinList,
          randchanpinList: randchanpinList
        });
      });
    });
  });
});

// 游客注册页面
router.get('/reg', function(req, res, next) {
  res.render('user/index/reg', {
    title: '众乐游客注册'
  });
});

// 游客登录页面
router.get('/login', function(req, res, next) {
  res.render('user/index/login', {
    title: '众乐游客登录'
  });
});

// 用户注册
router.post('/userreg', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  var name = req.body.name;
  var phone = req.body.phone;
  usermodel.selectUser(account, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (rows.length > 0) {
      res.json({
        'error': '用户名存在'
      });
      return next(err);
    }
    usermodel.userReg(account, password, name, phone, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '注册成功'
      });
    });
  });
});

// 用户登录
router.post('/userlogin', function(req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  usermodel.selectUser(account, function(err, rows) {
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
    req.session.usertype = 'user';
    res.json({
      'success': '登录成功'
    });
  });
});

// 按产品名查询产品
router.post('/placelist', function(req, res, next) {
  var place = req.body.place;
  usermodel.getChanPinByplace(place, function(err, chanpinList) {
    if (err) {
      return next(err);
    }
    usermodel.getAllFenLei(function(err, fenleiList) {
      if (err) {
        return next(err);
      }
      if (place.length == 0) {
        place = '不限'
      }
      res.render('user/chanpin/list', {
        title: '产品列表',
        smalltip: '查询：' + place,
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});

// 按产品分类查询
router.post('/fllist', function(req, res, next) {
  var fenlei = req.body.fenlei;
  usermodel.getChanPinByFenLei(fenlei, function(err, chanpinList) {
    if (err) {
      return next(err);
    }
    usermodel.getAllFenLei(function(err, fenleiList) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < fenleiList.length; i++) {
        if (fenlei == fenleiList[i].id) {
          fenlei = fenleiList[i].name;
        }
      }
      res.render('user/chanpin/list', {
        title: '产品列表',
        smalltip: fenlei,
        fenleiList: fenleiList,
        chanpinList: chanpinList
      });
    });
  });
});

// 查看产品详情
router.get('/detail/:id', function(req, res, next) {
  var chanpinid = req.params.id;
  var nowdatetime = Date.parse(new Date()) / 1000;
  usermodel.getThisChanPinInfo(chanpinid, function(err, chanpinInfo) {
    if (err) {
      return next(err);
    }
    usermodel.getThisChanPinXingCheng(nowdatetime, chanpinid, function(err, xingchengList) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < xingchengList.length; i++) {
        var sqltime = xingchengList[i].starttime * 1000;
        var parsetime = new Date(sqltime);
        xingchengList[i].starttime = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
      }
      usermodel.getThisChanPinImg(chanpinid, function(err, imgList) {
        if (err) {
          return next(err);
        }
        res.render('user/chanpin/detail', {
          title: '产品详情',
          chanpinInfo: chanpinInfo[0],
          xingchengList: xingchengList,
          imgList: imgList
        });
      });
    });
  });
});

// 预定
router.post('/addDingDan', function(req, res, next) {
  var chanpinid = req.body.chanpinid;
  var xingchengid = req.body.xingchengid;
  var userid = req.session.uid;
  var ddrenshu = req.body.ddrenshu;
  var allprice = req.body.allprice;
  usermodel.addDingDan(chanpinid, xingchengid, userid, ddrenshu, allprice, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    usermodel.updateYdRenShu(ddrenshu, xingchengid, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '预定成功'
      });
    });
  });
});

// 获取自己的订单
router.get('/myorder', function(req, res, next) {
	var userid = req.session.uid;
  usermodel.selectMyDingDan(userid, '1', function(err, ycldingdanList) {
    if (err) {
      return next(err);
    }
		usermodel.selectMyDingDan(userid, '0', function(err, wcldingdanList) {
	    if (err) {
	      return next(err);
	    }
			for (var i = 0; i < ycldingdanList.length; i++) {
        var sqltime = ycldingdanList[i].starttime * 1000;
        var parsetime = new Date(sqltime);
        ycldingdanList[i].starttime = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
        var sqltime = ycldingdanList[i].time;
        var parsetime = new Date(sqltime);
        ycldingdanList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
      }
			for (var i = 0; i < wcldingdanList.length; i++) {
        var sqltime = wcldingdanList[i].starttime * 1000;
        var parsetime = new Date(sqltime);
        wcldingdanList[i].starttime = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
        var sqltime = wcldingdanList[i].time;
        var parsetime = new Date(sqltime);
        wcldingdanList[i].time = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
      }
			res.render('user/order/myorder', {
		    title: '我的订单',
				ycldingdanList: ycldingdanList,
				wcldingdanList: wcldingdanList
		  });
		});
	});
});

// 修改密码
router.post('/updatePassword', function(req, res, next) {
  var userid = req.session.uid;
  var password = req.body.password;
  var oldpassword = req.body.oldpassword;
  usermodel.getOldPassword(userid, function(err, rows) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    if (oldpassword != rows[0].password) {
      res.json({
        'error': '请输入正确的原密码!'
      });
      return next(err);
    }
    usermodel.updatePassword(password, userid, function(err) {
      if (err) {
        res.json({
          'error': err
        });
        return next(err);
      }
      res.json({
        'success': '修改密码成功'
      });
    });
  });
});

// 申请退款
router.post('/shenqingtuikuan', function(req, res, next) {
  var dingdanid = req.body.dingdanid;
  usermodel.handleDingDan(dingdanid, function(err) {
    if (err) {
      res.json({
        'error': err
      });
      return next(err);
    }
    res.json({
      'success': '已提交申请，等待管理员审核'
    });
  });
});

// 论坛首页
router.get('/forum', function(req, res, next) {
  res.render('user/forum/index', {
    title: '论坛首页'
  });
});

// 获取用户帖子
router.post('/getForumCon', function(req, res, next) {
  var usertype = req.body.usertype;
  usermodel.getAllTieZi(usertype, function(err, forumList) {
    if (err) {
      res.json({
        'error': err
      });
      return next();
    }
    for (var i = 0; i < forumList.length; i++) {
      var sqltime = forumList[i].date;
      var parsetime = new Date(sqltime);
      forumList[i].date = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
    }
    res.render('user/forum/_ForumList', {
      forumList: forumList
    }, function(err, html) {
      res.json({
        'success': true,
        'view': html
      })
    });
  });
});

// 发帖
router.post('/addTieZi', function(req, res, next) {
  var theme = req.body.theme;
  var content = req.body.content;
  var userid = req.session.uid;
  var usertype = req.session.usertype;
  usermodel.addForumItem(theme, content, userid, usertype, function(err, forumList) {
    if (err) {
      res.json({
        'error': err
      });
      return next();
    }
    res.json({
      'success': '发帖成功'
    });
  });
});

// 查看帖子详情
router.get('/forumdetail/:id', function(req, res, next) {
  var forumid = req.params.id;
  usermodel.addforumViewTimes(forumid, function(err) {
    if (err) {
      return next(err);
    }
    usermodel.getForumCon(forumid, function(err, forumInfo) {
      if (err) {
        return next(err);
      }
      for (var i = 0; i < forumInfo.length; i++) {
        var sqltime = forumInfo[i].date;
        var parsetime = new Date(sqltime);
        forumInfo[i].date = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
      }
      usermodel.getForumReplyCon(forumid, function(err, replyList) {
        if (err) {
          return next(err);
        }
        for (var i = 0; i < replyList.length; i++) {
          var sqltime = replyList[i].date;
          var parsetime = new Date(sqltime);
          replyList[i].date = parsetime.getFullYear() + '-' + (parsetime.getMonth() + 1) + '-' + parsetime.getDate() + ' ' + parsetime.getHours() + ':' + parsetime.getMinutes() + ':' + parsetime.getSeconds();
        }
        res.render('user/forum/forumdetail', {
          title: '帖子详情',
          forumInfo: forumInfo[0],
          replyList: replyList
        });
      });
    });
  });
});

// 回复帖子
router.post('/addReply', function(req, res, next) {
  var forumid = req.body.forumid;
  var userid = req.session.uid;
  var usertype = req.session.usertype;
  var content = req.body.content;
  usermodel.addForumReply(forumid, userid, usertype, content, function(err, forumList) {
    if (err) {
      res.json({
        'error': err
      });
      return next();
    }
    res.json({
      'success': '回复成功'
    });
  });
});

// 退出登录
router.get('/logout', function(req, res) {
  req.session.name = '';
  req.session.uid = '';
  req.session.usertype = '';
  res.redirect('/');
});

module.exports = router;
