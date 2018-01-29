-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-01-29 09:43:22
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
(1, 'admin', '202cb962ac59075b964b07152d234b70', '超级管理员', 1),
(2, 'admin2', '202cb962ac59075b964b07152d234b70', '普通管理员2', 0),
(3, 'admin3', '202cb962ac59075b964b07152d234b70', '普通管理员3', 0),
(4, 'admin4', '202cb962ac59075b964b07152d234b70', '普通管理员4', 0);

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
(1, '广西北海涠洲岛', '涠洲岛，位于广西壮族自治区北海市北部湾海域中部，北临广西北海市，东望雷州半岛，东南与斜阳岛毗邻，南与海南岛隔海相望，西面面向越南。 涠洲岛总面积24.74平方千米，岛的最高海拔79米。岛内景区包括鳄鱼山景区、滴水丹屏景区、石螺口景区、天主教堂景区和五彩滩景区等。 涠洲岛是火山喷发堆凝而成的岛屿，有海蚀、海积及溶岩等景观，有“蓬莱岛”之称，是中国地质年龄最年轻的火山岛，也是广西最大的海岛。', 3, '140.00', 1, 1),
(2, '中国科技馆', '中国科学技术馆新馆位于朝阳区北辰东路5号，东临亚运居住区，西濒奥运水系，南依奥运主体育场，北望森林公园，占地4.8万平方米，建筑规模10.2万平方米，是奥林匹克公园中心区体现“绿色奥运、科技奥运、人文奥运”三大理念的重要组成部分。 中国科学技术馆一期工程于1988年9月22日建成开放，二期工程于2000年4月29日建成开放，新馆于2009年9月16日建成开放。 中国科学技术馆新馆设有“科学乐园”、“华夏之光”、“探索与发现”、“科技与生活”、“挑战与未来”五大主题展厅、公共空间展示区及球幕影院、巨幕影院、动感影院、4D影院等4个特效影院，其中球幕影院兼具穹幕电影放映和天象演示两种功能。', 5, '140.00', 1, 1),
(3, '恭王府', '恭王府（Prince kung’s Mansion），位于北京市西城区柳荫街，是全国重点文物保护单位，为清代规模最大的一座王府，曾先后作为和珅、永璘的宅邸。1851年恭亲王奕訢成为宅子的主人，恭王府的名称也因此得来。恭王府规模宏大，占地约6万平方米，分为府邸和花园两部分，拥有各式建筑群落30多处，布局讲究，气派非凡。 恭王府历经了清王朝由鼎盛而至衰亡的历史进程，承载了极其丰富的历史文化信息，故有了“一座恭王府，半部清代史”的说法。在周恩来、谷牧和李岚清三代国务院领导人的关心下，恭王府腾退修缮工作历28年完成，使之成为当时中国唯一一座对公众开放的清代王府。 清室覆亡后，府邸的产权曾归属辅仁大学，八十年代初的恭王府已成为被8家单位割据、数百住户聚居的大杂院，有200余住户。要修复恭王府，首要任务是搬迁。1988年，恭王府花园对外开放，2008年恭王府完成府邸修缮工程后，全面对外开放。', 9, '260.00', 1, 1),
(4, '苏州拙政园', '拙政园，位于江苏省苏州市，始建于明正德初年（16世纪初），是江南古典园林的代表作品。拙政园与北京颐和园、承德避暑山庄、苏州留园一起被誉为中国四大名园。 拙政园位于苏州城东北隅（东北街178号），截至2014年，仍是苏州存在的最大的古典园林，占地78亩（约合5.2公顷）。全园以水为中心，山水萦绕，厅榭精美，花木繁茂，具有浓郁的江南水乡特色。花园分为东、中、西三部分，东花园开阔疏朗，中花园是全园精华所在，西花园建筑精美，各具特色。园南为住宅区，体现典型江南地区传统民居多进的格局。园南还建有苏州园林博物馆，是国内唯一的园林专题博物馆。', 8, '220.00', 1, 1),
(5, '墨子纪念馆', '墨子纪念馆坐落于山东省滕州市荆水河滨、龙泉塔畔下的龙泉广场，是集学术研讨、图书资料收藏、科技教育、参观游览于一体的综合性庭院式建筑群体。 墨子纪念馆始建于1993年，2007年进行升级改造，占地面积20000平方米，建筑面积8000平方米。是世界唯一一座专门研究墨子文化、收集墨子资料、展示墨子研究成果的场馆。墨子纪念馆由东、西、北三部分组成，东院为展厅，主要有序厅、综合厅、科技厅、圣迹堂、军事厅等。西院建有目夷亭和名人题词碑廊。北部为图书资料楼，收藏国内外墨学研究图书资料。', 9, '220.00', 1, 1);

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
(1, 1, '/uploads/1/1-1-u=769288643,484617315&fm=27&gp=0.jpg'),
(2, 1, '/uploads/1/1-0-u=232780317,3971893465&fm=27&gp=0.jpg'),
(3, 1, '/uploads/1/1-2-u=922856433,98922304&fm=27&gp=0.jpg'),
(4, 1, '/uploads/1/1-3-u=2086064651,3180186550&fm=27&gp=0.jpg'),
(5, 1, '/uploads/1/1-4-u=3326633309,2116180765&fm=27&gp=0.jpg'),
(6, 2, '/uploads/2/2-0-164fafwavsdf3412.jpg'),
(7, 2, '/uploads/2/2-2-u=2375345909,3310816823&fm=11&gp=0.jpg'),
(8, 2, '/uploads/2/2-1-u=1352168544,117923098&fm=27&gp=0.jpg'),
(9, 2, '/uploads/2/2-3-u=3926360276,881421276&fm=27&gp=0.jpg'),
(10, 3, '/uploads/3/3-0-dwafd3131.jpg'),
(11, 3, '/uploads/3/3-1-u=498031927,473556017&fm=27&gp=0.jpg'),
(12, 3, '/uploads/3/3-2-u=937810505,3460994093&fm=200&gp=0.jpg'),
(13, 3, '/uploads/3/3-3-u=2208095618,1419287700&fm=27&gp=0.jpg'),
(14, 3, '/uploads/3/3-4-u=2476488106,1469049626&fm=200&gp=0.jpg'),
(19, 4, '/uploads/4/4-0-u=39113719,2333017596&fm=27&gp=0.jpg'),
(20, 4, '/uploads/4/4-1-u=553346507,1043652557&fm=27&gp=0.jpg'),
(21, 4, '/uploads/4/4-2-u=2413606287,4119615142&fm=200&gp=0.jpg'),
(22, 4, '/uploads/4/4-3-u=3963477869,999919733&fm=27&gp=0.jpg'),
(23, 5, '/uploads/5/5-1-u=273844234,3437589456&fm=27&gp=0.jpg'),
(24, 5, '/uploads/5/5-0-dwadaw234131dw.jpg'),
(25, 5, '/uploads/5/5-2-u=1144669115,583634325&fm=27&gp=0.jpg'),
(26, 5, '/uploads/5/5-3-u=3177127619,534074664&fm=27&gp=0.jpg'),
(27, 5, '/uploads/5/5-4-u=4218839662,2772476845&fm=27&gp=0.jpg');

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
(1, 1, 2, 1, 2, '280.00', '2018-01-28 17:15:42', 1),
(2, 4, 3, 1, 5, '1100.00', '2018-01-29 09:42:24', 1),
(3, 1, 2, 2, 4, '560.00', '2018-01-29 12:41:42', 0),
(4, 1, 2, 3, 4, '560.00', '2018-01-29 12:50:34', 1);

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
(3, '海滨海岛'),
(4, '特殊地貌'),
(5, '城市风景'),
(6, '生物景观'),
(7, '壁画石窟'),
(8, '民俗风情'),
(9, '历史圣地'),
(10, '纪念地'),
(11, '其他');

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
(1, 'mht', '202cb962ac59075b964b07152d234b70', '马化腾', '110'),
(2, 'my', '202cb962ac59075b964b07152d234b70', '马云', '120'),
(3, 'lqd', '202cb962ac59075b964b07152d234b70', '刘强东', '987456123');

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
(1, 3, 50, 0, 1518228000),
(2, 1, 100, 10, 1517461200),
(3, 4, 100, 5, 1518760800),
(4, 4, 80, 0, 1517986800),
(5, 5, 100, 0, 1518066000);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `chanpin`
--
ALTER TABLE `chanpin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT `chanpinimg`
--
ALTER TABLE `chanpinimg`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- 使用表AUTO_INCREMENT `dingdan`
--
ALTER TABLE `dingdan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `fenlei`
--
ALTER TABLE `fenlei`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `xingcheng`
--
ALTER TABLE `xingcheng`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
