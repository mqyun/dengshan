var db = require('./dboperation');

module.exports = {
  // 验证用户
  selectUser: function(account, callback) {
    var sql = "select * from user where account = ?;";
    db.exec(sql, account, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 用户注册
  userReg: function(account, password, name, phone, callback) {
    var sql = "insert into user(account, password, name, phone) values(?,?,?,?);";
    db.exec(sql, [account, password, name, phone], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取所有分类
  getAllFenLei: function(callback) {
    var sql = "select * from fenlei;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取最新的4个产品
  getNewChanPin: function(callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid group by chanpin.id order by chanpin.id desc limit 0, 4;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 随机推荐
  getRandChanPin: function(callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin left join chanpinimg on chanpin.id = chanpinimg.chanpinid order by rand() LIMIT 2;";
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 按产品名称查询产品
  getChanPinByplace: function(place, callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid where place like '%" + place + "%' group by chanpin.id;"
    db.exec(sql, '', function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 根据分类查询产品
  getChanPinByFenLei: function(fenleiid, callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid where fenlei = ? group by chanpin.id;";
    db.exec(sql, fenleiid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取某个产品的基本信息
  getThisChanPinInfo: function(id, callback) {
    var sql = "select chanpin.*, fenlei.name as fenleiname from chanpin left join fenlei on chanpin.fenlei = fenlei.id where chanpin.id = ?;";
    db.exec(sql, id, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取某个产品的行程
  getThisChanPinXingCheng: function(nowdatetime, chanpinid, callback) {
    var sql = "select * from xingcheng where chanpinid = ? and starttime > ?;";
    db.exec(sql, [chanpinid, nowdatetime], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取某个产品的图片
  getThisChanPinImg: function(chanpinid, callback) {
    var sql = "select * from chanpinimg where chanpinid = ?;";
    db.exec(sql, chanpinid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 下单
  addDingDan: function(chanpinid, xingchengid, userid, ddrenshu, allprice, callback) {
    var sql = "insert into dingdan(chanpinid, xingchengid, userid, ddrenshu, allprice, time, state) values(?,?,?,?,?,now(),0);";
    db.exec(sql, [chanpinid, xingchengid, userid, ddrenshu, allprice], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 下单后增加改行程剩余一定人数
  updateYdRenShu: function(ddrenshu, xingchengid, callback) {
    var sql = "update xingcheng set ydrenshu = ydrenshu + ? where id = ?;";
    db.exec(sql, [ddrenshu, xingchengid], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 查看自己的订单
  selectMyDingDan: function(userid, state, callback) {
    var sql = "select dingdan.*, chanpin.place, xingcheng.starttime, chanpinimg.url from ((dingdan left join chanpin on dingdan.chanpinid = chanpin.id) left join xingcheng on xingcheng.chanpinid = chanpin.id) left join chanpinimg on chanpinimg.chanpinid = dingdan.chanpinid where dingdan.userid = ? and dingdan.state = 0 group by dingdan.id;";
    if (state != 0) {
      sql = "select dingdan.*, chanpin.place, xingcheng.starttime, chanpinimg.url from ((dingdan left join chanpin on dingdan.chanpinid = chanpin.id) left join xingcheng on xingcheng.chanpinid = chanpin.id) left join chanpinimg on chanpinimg.chanpinid = dingdan.chanpinid where dingdan.userid = ? and dingdan.state != 0 group by dingdan.id;";
    }
    db.exec(sql, userid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取手机号
  getOldPassword: function(account, callback) {
    var sql = "select * from user where account = ?;";
    db.exec(sql, account, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 修改密码
  updatePassword: function(password, account, callback) {
    var sql = "update user set password = ? where account = ?;";
    db.exec(sql, [password, account], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 申请退款
  handleDingDan: function(id, callback) {
    var sql = "update dingdan set state = 1 where id = ?;";
    db.exec(sql, id, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 论坛查看所有帖子
  getAllTieZi: function(usertype, callback) {
    var sql;
    if (usertype == 'user') {
      sql = "select forum.*, user.name from forum left join user on forum.userid = user.id where forum.usertype = ?;";
    } else {
      sql = "select forum.*, admin.name from forum left join admin on forum.userid = admin.id where forum.usertype = ?;";
    }
    db.exec(sql, usertype, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取主题帖详情
  getForumCon: function(forumid, callback) {
    var sql = "SELECT * from (SELECT forum.*,\
              case forum.usertype\
              when 'user' THEN user.name\
              when 'admin' THEN admin.name\
              END as relname\
              FROM forum\
              LEFT JOIN user on user.id=forum.userid\
              LEFT JOIN admin on admin.id=forum.userid) as a where id = ?;";
    db.exec(sql, forumid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取帖子详情更新浏览量
  addforumViewTimes: function(forumid, callback) {
    var sql = "update forum set viewingtimes=viewingtimes+1 where id = ?;";
    db.exec(sql, forumid, function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 获取帖子回复内容
  getForumReplyCon: function(forumid, callback) {
    var sql = "SELECT * from (SELECT forumreply.*,\
              case forumreply.usertype\
              when 'user' THEN user.name\
              when 'admin' THEN admin.name\
              END as relname\
              FROM forumreply\
              LEFT JOIN user on user.id=forumreply.userid\
              LEFT JOIN admin on admin.id=forumreply.userid) as a where forumid = ?;";
    db.exec(sql, forumid, function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 发帖
  addForumItem: function(theme, content, userid, usertype, callback) {
    var sql = "insert into forum(theme, content, userid, usertype, date, viewingtimes) values(?,?,?,?,now(),0);";
    db.exec(sql, [theme, content, userid, usertype], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
  // 回复主题帖
  addForumReply: function(forumid, userid, usertype, content, callback) {
    var sql = "insert into forumreply(forumid, userid, usertype, content, date) values(?,?,?,?,now());";
    db.exec(sql, [forumid, userid, usertype, content], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
}
