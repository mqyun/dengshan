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
  // 获取最新的6个产品
  getNewChanPin: function(callback) {
    var sql = "select chanpin.*, chanpinimg.url from chanpin right join chanpinimg on chanpin.id = chanpinimg.chanpinid group by chanpin.id order by chanpin.id desc limit 0, 7;";
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
    var sql = "select dingdan.*, chanpin.place, xingcheng.starttime, chanpinimg.url from ((dingdan left join chanpin on dingdan.chanpinid = chanpin.id) left join xingcheng on xingcheng.chanpinid = chanpin.id) left join chanpinimg on chanpinimg.chanpinid = dingdan.chanpinid where dingdan.userid = ? and dingdan.state = ? group by chanpin.id;";
    db.exec(sql, [userid, state], function(err, rows) {
      if (err) {
        callback(err);
      }
      callback(err, rows);
    });
  },
  // 获取原密码
  getOldPassword: function(id, callback) {
    var sql = "select * from user where id = ?;";
    db.exec(sql, id, function(err, rows) {
			if (err) {
				callback(err);
			}
			callback(err, rows);
		});
  },
  // 修改密码
  updatePassword: function(password, id, callback) {
    var sql = "update user set password = ? where id = ?;";
    db.exec(sql, [password, id], function(err) {
      if (err) {
        callback(err);
      }
      callback(err);
    });
  },
}
