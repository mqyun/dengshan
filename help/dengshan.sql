-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-01-30 09:49:48
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dengshan`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `account` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(50) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `quanxian` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `account`, `password`, `name`, `quanxian`) VALUES
(1, 'admin', '123', '超级管理员', 1);

-- --------------------------------------------------------

--
-- 表的结构 `chanpin`
--

CREATE TABLE `chanpin` (
  `id` int(10) NOT NULL,
  `place` varchar(50) CHARACTER SET utf8 NOT NULL,
  `introduce` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `fenlei` int(10) NOT NULL,
  `price` varchar(50) CHARACTER SET utf8 NOT NULL,
  `hasimg` int(10) NOT NULL,
  `adminid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `chanpin`
--

INSERT INTO `chanpin` (`id`, `place`, `introduce`, `fenlei`, `price`, `hasimg`, `adminid`) VALUES
(1, '泰山', '泰山又名岱山、岱宗、岱岳、东岳、泰岳，位于山东省中部，隶属于泰安市，绵亘于泰安、济南、淄博三市之间，总面积24200公顷。主峰玉皇顶海拔1545米，气势雄伟磅礴，有“五岳之首”、“五岳之长”、“天下第一山”之称。是世界自然与文化遗产，世界地质公园，国家AAAAA级旅游景区，国家级风景名胜区，全国重点文物保护单位，全国文明风景旅游区。 泰山被古人视为“直通帝座”的天堂，成为百姓崇拜，帝王告祭的神山，有“泰山安，四海皆安”的说法。自秦始皇开始到清代，先后有13代帝王引次亲登泰山封禅或祭祀，另外有24代帝王遣官祭祀72次。', 2, '120.00', 1, 1),
(2, '云台山', '云台山，是世界地质公园、国家AAAAA级旅游景区、国家级风景名胜区，位于河南省焦作市修武县和山西省晋城市陵川县交界处，[1]  景区面积280平方公里，含红石峡、潭瀑峡、泉瀑峡、青龙峡、峰林峡、子房湖、茱萸峰、猕猴谷、叠彩洞、百家岩等主要景点。 园区地形复杂，气候随海拔与山势山形变化各异、上下差异明显，原始次生林覆盖了整个山峦，各种树木和奇花异草种类达五百多种。云台山主峰茱萸峰海拔1308米，有落差314米的云台天瀑，在景区泉瀑峡的尽端，是中国发现的落差最大的瀑布之一。', 4, '140.00', 1, 1),
(3, '月亮山', '月亮山是阳朔境内的奇景，它在高田乡凤楼村边，高达380多米。因为山顶是有一个贯穿的大洞，好像一轮皓月，高而明亮，所以人们叫它明月峰，俗称月亮山。 山头上有一个天然的大石拱，两面贯通，远看酷似天上明月高挂。从不同的角度变换观看，此洞形状也不断变化。如果是开着车赏月山，那个石拱的形状会从弯弯的上弦月，逐渐变成半月、圆月 ，继而又变成下弦月，十分奇妙。', 3, '190.00', 1, 1),
(4, '秦岭', '秦岭，分为狭义上的秦岭和广义上的秦岭。 狭义上的秦岭，仅限于陕西省南部、渭河与汉江之间的山地，东以灞河与丹江河谷为界，西止于嘉陵江。而广义上的秦岭，是横贯中国中部的东西走向山脉。西起甘肃省临潭县北部的白石山，向东经天水南部的麦积山进入陕西。在陕西与河南交界处分为三支，北支为崤山，中支为熊耳山；南支为伏牛山。长约1600多千米，为黄河支流渭河与长江支流嘉陵江、汉水的分水岭。由于秦岭南北的温度、气候、地形均呈现差异性变化，因而秦岭-淮河一线成为了中国地理上最重要的南北分界线。', 4, '99.00', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `chanpinimg`
--

CREATE TABLE `chanpinimg` (
  `id` int(10) NOT NULL,
  `chanpinid` int(10) NOT NULL,
  `url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `chanpinimg`
--

INSERT INTO `chanpinimg` (`id`, `chanpinid`, `url`) VALUES
(1, 1, '/uploads/1/1-0-d654fesf312.jpg'),
(2, 1, '/uploads/1/1-1-dwa2313.jpg'),
(3, 1, '/uploads/1/1-2-u=1611987823,2879094889&fm=200&gp=0.jpg'),
(4, 1, '/uploads/1/1-3-u=2487972476,150395983&fm=200&gp=0.jpg'),
(5, 1, '/uploads/1/1-4-u=3147817036,3060619441&fm=27&gp=0.jpg'),
(6, 4, '/uploads/4/4-0-dwad424bb.jpg'),
(7, 4, '/uploads/4/4-1-dwadw3414.jpg'),
(8, 4, '/uploads/4/4-2-u=60311696,4113246933&fm=27&gp=0.jpg'),
(9, 4, '/uploads/4/4-3-u=3457396570,3710823070&fm=27&gp=0.jpg'),
(10, 3, '/uploads/3/3-0-dwa45daje.jpg'),
(11, 3, '/uploads/3/3-1-u=385940247,3111482566&fm=27&gp=0.jpg'),
(12, 3, '/uploads/3/3-2-u=3446820710,1353450626&fm=200&gp=0.jpg'),
(13, 3, '/uploads/3/3-3-u=4273663885,1245667449&fm=200&gp=0.jpg'),
(14, 2, '/uploads/2/2-0-dwafvxd432.jpg'),
(15, 2, '/uploads/2/2-1-u=1328943340,2797879178&fm=200&gp=0.jpg'),
(16, 2, '/uploads/2/2-2-u=3423340316,2702762112&fm=200&gp=0.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `dingdan`
--

CREATE TABLE `dingdan` (
  `id` int(10) NOT NULL,
  `chanpinid` int(10) NOT NULL,
  `xingchengid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `ddrenshu` int(10) NOT NULL,
  `allprice` varchar(50) CHARACTER SET utf8 NOT NULL,
  `time` datetime NOT NULL,
  `state` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `dingdan`
--

INSERT INTO `dingdan` (`id`, `chanpinid`, `xingchengid`, `userid`, `ddrenshu`, `allprice`, `time`, `state`) VALUES
(1, 1, 1, 1, 3, '360.00', '2018-01-30 11:02:15', 2),
(2, 1, 1, 1, 2, '240.00', '2018-01-30 12:58:52', 2),
(3, 1, 1, 2, 2, '240.00', '2018-01-30 13:06:45', 2),
(4, 1, 1, 2, 4, '480.00', '2018-01-30 13:06:49', 0),
(5, 4, 2, 1, 3, '297.00', '2018-01-30 13:10:38', 0),
(6, 1, 1, 1, 2, '240.00', '2018-01-30 13:10:53', 2),
(7, 1, 1, 1, 2, '240.00', '2018-01-30 13:15:47', 0);

-- --------------------------------------------------------

--
-- 表的结构 `fenlei`
--

CREATE TABLE `fenlei` (
  `id` int(10) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `fenlei`
--

INSERT INTO `fenlei` (`id`, `name`) VALUES
(1, '高山探险'),
(2, '竞技登山'),
(3, '攀岩'),
(4, '普通登山');

-- --------------------------------------------------------

--
-- 表的结构 `forum`
--

CREATE TABLE `forum` (
  `id` int(10) NOT NULL,
  `theme` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `content` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `userid` int(10) NOT NULL,
  `usertype` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `viewingtimes` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `forum`
--

INSERT INTO `forum` (`id`, `theme`, `content`, `userid`, `usertype`, `date`, `viewingtimes`) VALUES
(1, '马化腾测试主题', '马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容马化腾测试内容！！！！！！！', 1, 'user', '2018-01-30 14:42:31', 16),
(2, '管理员测试主题', '管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容管理员测试内容！！！！！！！', 1, 'admin', '2018-01-30 14:45:54', 0),
(3, '陈翔测试主题', '陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容陈翔测试内容！！！！！！！！！！！', 2, 'user', '2018-01-30 14:47:05', 2),
(4, '马化腾测试主题2', '马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2马化腾测试内容2！！！！！！！！', 1, 'user', '2018-01-30 14:53:49', 1);

-- --------------------------------------------------------

--
-- 表的结构 `forumreply`
--

CREATE TABLE `forumreply` (
  `id` int(10) NOT NULL,
  `forumid` int(10) NOT NULL,
  `userid` int(10) NOT NULL,
  `usertype` varchar(50) NOT NULL,
  `content` varchar(10000) CHARACTER SET utf8 NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `forumreply`
--

INSERT INTO `forumreply` (`id`, `forumid`, `userid`, `usertype`, `content`, `date`) VALUES
(1, 1, 1, 'user', '马化腾测试回复！！！！！！！！！！！！！！！！！！', '2018-01-30 15:45:30'),
(2, 1, 2, 'user', '测试回复！！！', '2018-01-30 16:02:38');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `account` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `account`, `password`, `name`, `phone`) VALUES
(1, 'mht', '123', '马化腾', '12345678910'),
(2, 'cx', '123', '陈翔', '45678912320');

-- --------------------------------------------------------

--
-- 表的结构 `xingcheng`
--

CREATE TABLE `xingcheng` (
  `id` int(10) NOT NULL,
  `chanpinid` int(10) NOT NULL,
  `renshu` int(10) NOT NULL,
  `ydrenshu` int(10) NOT NULL,
  `starttime` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `xingcheng`
--

INSERT INTO `xingcheng` (`id`, `chanpinid`, `renshu`, `ydrenshu`, `starttime`) VALUES
(1, 1, 50, 6, 1519174800),
(2, 4, 100, 3, 1521003600);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chanpin`
--
ALTER TABLE `chanpin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chanpinimg`
--
ALTER TABLE `chanpinimg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dingdan`
--
ALTER TABLE `dingdan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fenlei`
--
ALTER TABLE `fenlei`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forumreply`
--
ALTER TABLE `forumreply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `xingcheng`
--
ALTER TABLE `xingcheng`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `chanpin`
--
ALTER TABLE `chanpin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `chanpinimg`
--
ALTER TABLE `chanpinimg`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- 使用表AUTO_INCREMENT `dingdan`
--
ALTER TABLE `dingdan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `fenlei`
--
ALTER TABLE `fenlei`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `forum`
--
ALTER TABLE `forum`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `forumreply`
--
ALTER TABLE `forumreply`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `xingcheng`
--
ALTER TABLE `xingcheng`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
