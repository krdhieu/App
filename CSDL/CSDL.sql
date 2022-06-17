-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2022 at 02:40 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlysangkien`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `trungbinhtong` (OUT `tbmucdich` FLOAT UNSIGNED, OUT `tbnoidung` FLOAT, OUT `tbungdung` FLOAT, OUT `tbtrinhbay` FLOAT, IN `masangkien` INT)   BEGIN
SELECT  AVG(chitietchamdiem.diem_muc_dich) into tbmucdich   from chitietchamdiem INNER JOIN sangkien on sangkien.masangkien = chitietchamdiem.masangkien WHERE sangkien.masangkien=masangkien  ;
SELECT  AVG(chitietchamdiem.diem_noi_dung) into tbnoidung   from chitietchamdiem INNER JOIN sangkien on sangkien.masangkien = chitietchamdiem.masangkien WHERE sangkien.masangkien=masangkien;
SELECT  AVG(chitietchamdiem.diem_ung_dung) into tbungdung  from chitietchamdiem INNER JOIN sangkien on sangkien.masangkien = chitietchamdiem.masangkien WHERE sangkien.masangkien=masangkien  ;
SELECT  AVG(chitietchamdiem.diem_trinh_bay) into tbtrinhbay   from chitietchamdiem INNER JOIN sangkien on sangkien.masangkien = chitietchamdiem.masangkien WHERE sangkien.masangkien=masangkien;

end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `chitietchamdiem`
--

CREATE TABLE `chitietchamdiem` (
  `mathanhvien` int(11) NOT NULL,
  `masangkien` int(11) NOT NULL,
  `diem_muc_dich` float NOT NULL,
  `diem_noi_dung` float NOT NULL,
  `diem_ung_dung` float NOT NULL,
  `diem_trinh_bay` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chitietchamdiem`
--

INSERT INTO `chitietchamdiem` (`mathanhvien`, `masangkien`, `diem_muc_dich`, `diem_noi_dung`, `diem_ung_dung`, `diem_trinh_bay`) VALUES
(61, 56, 6, 6, 6, 7),
(61, 57, 6, 8, 8, 7.5),
(61, 60, 9, 9, 9, 9),
(61, 61, 7, 8, 6, 7),
(61, 65, 7, 8, 6, 7),
(61, 66, 8, 8, 8, 9),
(61, 70, 8, 8, 8, 9),
(61, 71, 9, 8, 8, 9),
(62, 56, 8, 7, 8, 7),
(62, 57, 8, 8, 8, 8),
(62, 60, 9, 9, 8.5, 9),
(62, 61, 9, 9, 8.5, 9),
(62, 65, 9, 9, 8.5, 9),
(62, 66, 8, 8.5, 8, 8),
(62, 70, 8, 8.5, 8, 8),
(62, 71, 8, 8.5, 8, 8),
(63, 56, 6, 8, 7, 7),
(63, 57, 8, 8, 7, 8),
(63, 60, 9, 8, 7.5, 9),
(63, 61, 9, 8, 7.5, 9),
(63, 65, 7, 8, 7.5, 7),
(63, 66, 8, 7, 8, 8),
(63, 70, 9, 9, 8, 9),
(63, 71, 9, 8, 8, 9),
(68, 37, 9, 8, 6, 9),
(68, 49, 6, 8, 6, 7),
(68, 53, 8, 8, 8, 8),
(68, 54, 7, 6, 7, 8),
(68, 55, 9, 8, 8, 9),
(68, 75, 7, 8, 8, 7),
(68, 76, 7, 6, 7, 8),
(68, 80, 7, 6, 7, 8),
(68, 81, 7, 7, 6, 8),
(69, 37, 8, 8.5, 8, 8),
(69, 49, 8, 8.5, 8, 8),
(69, 53, 8, 8.5, 8, 8),
(69, 54, 8, 8.5, 7, 8),
(69, 55, 8, 8.5, 8, 8),
(69, 75, 8, 8.5, 8, 8),
(69, 76, 8, 8, 7, 8),
(69, 80, 6, 8, 7, 8),
(69, 81, 8, 8.5, 7, 8),
(70, 37, 6, 6, 8, 7),
(70, 49, 7, 6, 7, 8),
(70, 53, 9, 9, 9, 9),
(70, 54, 6, 8, 7, 7),
(70, 55, 9, 8, 8, 9),
(70, 75, 7, 8, 9, 8),
(70, 76, 6, 8, 6, 7),
(70, 80, 6, 7.5, 6, 7),
(70, 81, 6, 6, 7, 7),
(75, 13, 7, 8, 7, 8),
(75, 26, 6, 8, 6, 7),
(75, 27, 7, 7, 6, 8),
(75, 29, 6, 6, 6, 6),
(75, 38, 7, 6, 7, 8),
(75, 85, 7, 7, 6, 8),
(75, 86, 7, 8, 6, 8),
(75, 90, 7, 8, 7, 8),
(75, 91, 7, 6, 6, 8),
(76, 13, 6, 7, 7, 8),
(76, 26, 8, 8.5, 8, 8),
(76, 27, 8, 8, 7, 8),
(76, 29, 7, 7, 6, 7),
(76, 38, 6, 8, 7, 8),
(76, 85, 8, 8.5, 7, 8),
(76, 86, 8, 7, 8.5, 7),
(76, 90, 7, 8, 7, 8),
(76, 91, 8, 8, 7, 8),
(77, 13, 6, 7, 6, 7),
(77, 26, 7, 6, 7, 8),
(77, 27, 6, 8, 7, 7),
(77, 29, 7, 7, 6, 8),
(77, 38, 6, 7.5, 6, 7),
(77, 85, 6, 6, 7, 7),
(77, 86, 7, 6, 7, 8),
(77, 90, 6, 7, 8, 7),
(77, 91, 6, 8, 8, 7),
(82, 4, 7, 6, 6, 8),
(82, 5, 7, 7, 8, 8),
(82, 6, 8, 9, 9, 9),
(82, 12, 6, 6, 6, 6),
(82, 15, 7, 8, 7, 8),
(82, 34, 7, 6, 6, 8),
(82, 95, 7, 7, 8, 8),
(82, 96, 5, 5.5, 6, 6),
(82, 100, 0, 0, 0, 0),
(82, 101, 9, 9, 8, 8),
(83, 4, 8, 8, 7, 8),
(83, 5, 7, 8, 8, 7),
(83, 6, 8, 8.5, 8, 8.5),
(83, 12, 7, 7, 6, 7),
(83, 15, 7, 8, 7, 8),
(83, 34, 8, 8, 7, 8),
(83, 95, 7, 7, 6, 7),
(83, 96, 5, 5.5, 6, 5),
(83, 100, 0, 0, 0, 0),
(83, 101, 8, 8, 8, 8),
(84, 4, 6, 8, 8, 7),
(84, 5, 8, 7, 8, 8),
(84, 6, 9, 9, 9, 9),
(84, 12, 7, 7, 6, 8),
(84, 15, 6, 7, 8, 7),
(84, 34, 6, 8, 8, 7),
(84, 95, 7, 7, 9, 8),
(84, 96, 6, 5, 5, 5),
(84, 100, 0, 0, 0, 0),
(84, 101, 8.5, 7, 7, 8),
(96, 3, 7, 7, 8, 8),
(96, 10, 8, 9, 9, 9),
(96, 11, 9, 9, 8, 8),
(96, 14, 7, 7, 8, 8),
(96, 105, 8, 8, 8.5, 9),
(96, 106, 9, 9, 8, 8),
(96, 110, 7, 7, 6, 6),
(96, 111, 8, 8, 8.5, 7),
(97, 3, 7, 8, 8, 7),
(97, 10, 8, 8.5, 8, 8.5),
(97, 11, 8, 8, 8, 8),
(97, 14, 7, 8, 8, 7),
(97, 105, 8, 7, 7, 7),
(97, 106, 8, 8, 8, 8),
(97, 110, 7, 6, 6, 7),
(97, 111, 6, 7, 7, 7),
(98, 3, 8, 7, 8, 8),
(98, 10, 9, 9, 9, 9),
(98, 11, 8.5, 7, 7, 8),
(98, 14, 8, 7, 8, 8),
(98, 105, 8, 7, 7, 9),
(98, 106, 8.5, 7, 7, 8),
(98, 110, 6, 7, 8, 6),
(98, 111, 8, 7, 7, 6),
(103, 7, 7, 8, 9, 10),
(103, 8, 7, 8, 9, 10),
(103, 126, 8, 8, 8, 8),
(103, 127, 5, 5, 5, 5),
(103, 129, 7, 7, 7, 7),
(104, 7, 8, 8, 8, 8),
(104, 127, 6, 8, 8, 9),
(105, 7, 6, 6, 6, 6),
(105, 126, 7, 7, 7, 7),
(105, 129, 6, 6, 6.4, 6);

-- --------------------------------------------------------

--
-- Table structure for table `chucvu`
--

CREATE TABLE `chucvu` (
  `machucvu` int(11) NOT NULL,
  `tenchucvu` varchar(100) NOT NULL,
  `motachucvu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chucvu`
--

INSERT INTO `chucvu` (`machucvu`, `tenchucvu`, `motachucvu`) VALUES
(1, 'Giám đốc', 'Quản lý các hoạt động của công ty.\r\nKý kết ban hành các quyết đinh.\r\nXem xét hồ sơ báo cáo định hướng phát triển trong tương lai.'),
(2, 'Phó giám đốc', 'Phụ trách công việc báo cáo thống kê, in ấn tài liệu gửi cho giám đốc'),
(3, 'Trưởng Đài', '-Quản lý nhân viên , lập danh sách cuộc gọi. Tìm kiếm khách hàng tiềm năng.\r\nTư vấn các gói cước của công ty.\r\nTổng hợp yêu cầu của khách hàng liên hệ các phòng ban giải quyết'),
(4, 'Trưởng phòng', 'Quản lý đội ngũ nhân viên kinh doanh nhằm đạt mục tiêu tăng trưởng và mục tiêu doanh số\r\nXây dựng các kế hoạch, chiến lược phục vụ mục tiêu phát triển và đạt được kết quả kinh doanh doanh nghiệp đặt ra\r\nHỗ trợ, giám sát thực thi kế hoạch kinh doanh. '),
(7, 'Phó phòng', 'Xây dựng và phát triển hệ thống khách hàng:\r\nTìm kiếm phát triển các mối quan hệ với khách hàng và đối tác trong [lĩnh vực doanh nghiệp hoạt động] \r\nChăm sóc, xây dựng cơ chế cho khách hàng nhằm gia tăng inbound lead, duy trì doanh thu'),
(8, 'Phó phụ trách', 'Phụ trách công việc được giao phó từ trưởng phòng, điều hướng dẫn dắt nhân viên thực hiên'),
(9, 'Nhân viên', 'Làm việc theo chỉ định của cấp trên'),
(10, 'Quản lý', 'Điều hành giám sát công việc của nhân viên. \r\nNhận lệnh từ giám đốc , đúc thốc nhân viên làm việc');

-- --------------------------------------------------------

--
-- Table structure for table `chucvuhd`
--

CREATE TABLE `chucvuhd` (
  `machucvuhd` int(11) NOT NULL,
  `tenchucvuhd` varchar(100) NOT NULL,
  `motachucvuhd` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chucvuhd`
--

INSERT INTO `chucvuhd` (`machucvuhd`, `tenchucvuhd`, `motachucvuhd`) VALUES
(1, 'Chủ tịch Hội đồng', 'Họp bàn lên kế hoạch tổ chức đợt sáng kiến.\r\nGiám sát đợt sáng kiến.\r\nThống kê báo cáo điểm mức khen thưởng.'),
(2, 'Phó chủ tịch HĐ', 'Họp bàn lên kế hoạch tổ chức đợt sáng kiến. Giám sát đợt sáng kiến. Thống kê báo cáo điểm mức khen thưởng.'),
(3, 'Ủy viên HĐ', 'Chấm điểm sáng kiến.\r\nĐưa ra nhận xét 1 cách khách quan về sáng kiến.'),
(4, 'Ủy viên thường trực HĐ', 'Phụ trách chấm điểm trong trường hợp ủy viên vắng mặt.'),
(5, 'Thư ký HĐ', 'Soạn thảo báo cáo hồ sơ, chuẩn bị cho buổi sáng kiến.');

-- --------------------------------------------------------

--
-- Table structure for table `danhgiasangkien`
--

CREATE TABLE `danhgiasangkien` (
  `masangkien` int(11) NOT NULL,
  `maxeploai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `danhgiasangkien`
--

INSERT INTO `danhgiasangkien` (`masangkien`, `maxeploai`) VALUES
(3, 3),
(4, 3),
(5, 3),
(6, 2),
(7, 3),
(8, 2),
(10, 2),
(11, 2),
(12, 3),
(13, 3),
(14, 3),
(15, 3),
(26, 3),
(27, 3),
(29, 3),
(34, 3),
(37, 3),
(38, 3),
(49, 3),
(53, 2),
(54, 3),
(55, 2),
(56, 3),
(57, 3),
(60, 2),
(61, 2),
(65, 3),
(66, 2),
(70, 2),
(71, 2),
(75, 3),
(76, 3),
(80, 3),
(81, 3),
(85, 3),
(86, 3),
(90, 3),
(95, 3),
(96, 4),
(100, 5),
(101, 2),
(105, 3),
(106, 2),
(110, 3),
(111, 3),
(126, 3),
(127, 3),
(129, 3);

-- --------------------------------------------------------

--
-- Table structure for table `dotsangkien`
--

CREATE TABLE `dotsangkien` (
  `madotsangkien` int(11) NOT NULL,
  `tendotsangkien` varchar(100) NOT NULL,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1,
  `ngaybatdau` datetime NOT NULL,
  `ngayketthuc` datetime NOT NULL,
  `ngaydungdangky` datetime NOT NULL,
  `hannop` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dotsangkien`
--

INSERT INTO `dotsangkien` (`madotsangkien`, `tendotsangkien`, `trangthai`, `ngaybatdau`, `ngayketthuc`, `ngaydungdangky`, `hannop`) VALUES
(18, 'Sáng tạo mùa xuân hè 2017', 0, '2017-01-01 00:00:00', '2017-05-27 00:00:00', '2017-02-17 00:00:00', '2017-05-15 00:00:00'),
(19, 'Sáng tạo mùa thu đông 2017', 0, '2017-06-10 00:00:00', '2017-12-30 00:00:00', '2017-07-10 00:00:00', '2017-12-20 00:00:00'),
(20, 'Sáng tạo mùa hè 2018', 0, '2018-01-17 00:00:00', '2018-05-27 00:00:00', '2018-02-17 00:00:00', '2018-05-15 00:00:00'),
(21, 'Sáng tạo mùa thu đông 2018', 0, '2018-06-10 00:00:00', '2018-12-30 00:00:00', '2018-07-10 00:00:00', '2018-12-20 00:00:00'),
(22, 'Sáng tạo xuân hè 2019', 0, '2019-01-17 00:00:00', '2019-05-27 00:00:00', '2019-02-17 00:00:00', '2019-05-15 00:00:00'),
(23, 'Sáng tạo thu đông 2019', 0, '2019-06-10 00:00:00', '2019-12-30 00:00:00', '2019-07-10 00:00:00', '2019-12-20 00:00:00'),
(24, 'Sáng tạo xuân hè 2020', 0, '2020-01-17 00:00:00', '2020-05-27 00:00:00', '2020-02-17 00:00:00', '2020-05-15 00:00:00'),
(25, 'Sáng tạo thu đông 2020', 0, '2020-06-10 00:00:00', '2020-12-30 00:00:00', '2020-07-10 00:00:00', '2020-12-20 00:00:00'),
(26, 'Sáng tạo xuân hè 2021', 0, '2021-01-17 00:00:00', '2021-05-27 00:00:00', '2021-02-17 00:00:00', '2021-05-15 00:00:00'),
(27, 'Sáng tạo mùa thu đông 2021', 0, '2021-06-10 00:00:00', '2021-12-30 00:00:00', '2021-07-10 00:00:00', '2021-12-20 00:00:00'),
(28, 'Sáng tạo xuân hè 2022', 1, '2022-06-01 00:00:00', '2022-07-30 00:00:00', '2022-06-30 00:00:00', '2022-07-17 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `hoidongkhoahoc`
--

CREATE TABLE `hoidongkhoahoc` (
  `mahoidong` int(11) NOT NULL,
  `ngaythanhlap` date NOT NULL,
  `ngayketthuc` date DEFAULT NULL,
  `nhiemvu` text NOT NULL,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hoidongkhoahoc`
--

INSERT INTO `hoidongkhoahoc` (`mahoidong`, `ngaythanhlap`, `ngayketthuc`, `nhiemvu`, `trangthai`) VALUES
(11, '2017-01-08', '2022-05-31', 'Xây dựng kế hoạch hoạt động khoa học công nghệ tại Công ty\r\nXét và công nhận sáng kiến, đề tài KHCN của CBCNV trong Công ty\r\nĐánh giá lợi ích thu được từ sáng kiến, đề tài KHCN\r\nXét và đề xuất sáng kiến, đề tài KHCN lên Hội đồng KHCN Tổng Công ty', 0),
(12, '2018-01-07', '2022-05-31', 'Xây dựng kế hoạch hoạt động khoa học công nghệ tại Công ty\r\nXét và công nhận sáng kiến, đề tài KHCN của CBCNV trong Công ty\r\nĐánh giá lợi ích thu được từ sáng kiến, đề tài KHCN\r\nXét và đề xuất sáng kiến, đề tài KHCN lên Hội đồng KHCN Tổng Công ty', 0),
(13, '2019-01-06', '2022-05-31', 'Xây dựng kế hoạch hoạt động khoa học công nghệ tại Công ty\r\nXét và công nhận sáng kiến, đề tài KHCN của CBCNV trong Công ty\r\nĐánh giá lợi ích thu được từ sáng kiến, đề tài KHCN\r\nXét và đề xuất sáng kiến, đề tài KHCN lên Hội đồng KHCN Tổng Công ty', 0),
(14, '2020-01-05', '2022-05-31', 'Xây dựng kế hoạch hoạt động khoa học công nghệ tại Công ty\r\nXét và công nhận sáng kiến, đề tài KHCN của CBCNV trong Công ty\r\nĐánh giá lợi ích thu được từ sáng kiến, đề tài KHCN\r\nXét và đề xuất sáng kiến, đề tài KHCN lên Hội đồng KHCN Tổng Công ty', 0),
(15, '2021-01-05', '2022-05-31', 'Xây dựng kế hoạch hoạt động khoa học công nghệ tại Công ty\r\nXét và công nhận sáng kiến, đề tài KHCN của CBCNV trong Công ty\r\nĐánh giá lợi ích thu được từ sáng kiến, đề tài KHCN\r\nXét và đề xuất sáng kiến, đề tài KHCN lên Hội đồng KHCN Tổng Công ty', 0),
(17, '2022-05-31', '2022-06-14', 'Xây dựng kế hoạch hoạt động khoa học công nghệ tại Công ty\r\nXét và công nhận sáng kiến, đề tài KHCN của CBCNV trong Công ty\r\nĐánh giá lợi ích thu được từ sáng kiến, đề tài KHCN\r\nXét và đề xuất sáng kiến, đề tài KHCN lên Hội đồng KHCN Tổng Công ty', 1);

-- --------------------------------------------------------

--
-- Table structure for table `khenthuong`
--

CREATE TABLE `khenthuong` (
  `makhenthuong` int(11) NOT NULL,
  `masangkien` int(11) NOT NULL,
  `muckhenthuong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `khenthuong`
--

INSERT INTO `khenthuong` (`makhenthuong`, `masangkien`, `muckhenthuong`) VALUES
(32, 3, 1000000),
(33, 4, 1000000),
(34, 5, 1000000),
(35, 6, 2000000),
(36, 10, 2000000),
(38, 11, 2000000),
(39, 12, 1000000),
(40, 13, 1000000),
(41, 14, 1000000),
(42, 15, 1000000),
(43, 26, 1000000),
(44, 27, 1000000),
(45, 29, 1000000),
(46, 34, 1000000),
(47, 37, 1000000),
(48, 38, 1000000),
(49, 49, 1000000),
(50, 53, 2000000),
(51, 54, 1000000),
(52, 55, 2000000),
(53, 56, 1000000),
(54, 57, 1000000),
(55, 60, 2000000),
(56, 61, 2000000),
(57, 65, 1000000),
(58, 66, 2000000),
(59, 70, 2000000),
(60, 71, 2000000),
(61, 75, 1000000),
(62, 76, 1000000),
(63, 80, 1000000),
(64, 81, 1000000),
(65, 85, 1000000),
(66, 86, 1000000),
(67, 90, 1000000),
(68, 95, 1000000),
(69, 96, 500000),
(70, 100, 0),
(71, 101, 2000000),
(72, 105, 1000000),
(73, 106, 2000000),
(74, 110, 1000000),
(75, 111, 1111111),
(76, 126, 1000000),
(77, 8, 1500000),
(78, 127, 1000000),
(79, 129, 1000000),
(80, 7, 1000000);

-- --------------------------------------------------------

--
-- Table structure for table `lichsuhanhdong`
--

CREATE TABLE `lichsuhanhdong` (
  `mahanhdong` int(11) NOT NULL,
  `manhanvien` int(11) NOT NULL,
  `hanhdong` varchar(255) NOT NULL,
  `ngaygio` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lichsuhanhdong`
--

INSERT INTO `lichsuhanhdong` (`mahanhdong`, `manhanvien`, `hanhdong`, `ngaygio`) VALUES
(1, 1, 'Sửa thành viên hội đồng', '2022-06-14 22:06:25'),
(2, 1, 'Sửa thành viên hội đồng', '2022-06-14 22:07:20'),
(3, 1, 'Sửa thành viên hội đồng', '2022-06-14 22:09:07'),
(4, 1, 'Xóa thành viên hội đồng', '2022-06-14 22:09:13'),
(5, 1, 'Xóa tài khoản user92@gmail.com', '2022-06-14 22:16:10'),
(6, 1, 'Kết thúc hội đồng 17', '2022-06-14 22:20:48'),
(7, 1, 'Hoàn thành khen thưởng tất cả sáng kiến', '2022-06-14 22:25:26'),
(8, 1, 'Sửa khen thưởng sáng kiến 7', '2022-06-14 22:43:41');

-- --------------------------------------------------------

--
-- Table structure for table `nguoithamgia`
--

CREATE TABLE `nguoithamgia` (
  `manhanvien` int(11) NOT NULL,
  `masangkien` int(11) NOT NULL,
  `vaitro` tinyint(1) NOT NULL,
  `tyledonggop` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nguoithamgia`
--

INSERT INTO `nguoithamgia` (`manhanvien`, `masangkien`, `vaitro`, `tyledonggop`) VALUES
(26, 12, 0, 100),
(26, 60, 0, 100),
(26, 100, 0, 100),
(27, 14, 0, 100),
(29, 7, 0, 100),
(29, 101, 0, 100),
(29, 110, 0, 100),
(32, 85, 0, 100),
(34, 56, 0, 100),
(35, 27, 0, 100),
(38, 38, 0, 100),
(41, 70, 0, 100),
(48, 4, 0, 100),
(48, 29, 0, 100),
(48, 57, 0, 100),
(48, 61, 0, 100),
(48, 86, 0, 100),
(48, 96, 0, 100),
(48, 106, 0, 100),
(48, 111, 0, 100),
(48, 126, 0, 100),
(49, 49, 0, 100),
(52, 5, 0, 100),
(52, 8, 0, 100),
(52, 11, 0, 100),
(52, 75, 0, 100),
(53, 127, 0, 100),
(54, 10, 0, 100),
(54, 37, 0, 60),
(54, 128, 0, 100),
(55, 81, 0, 100),
(55, 129, 0, 100),
(57, 37, 1, 40),
(57, 53, 0, 100),
(57, 71, 0, 100),
(60, 34, 0, 100),
(60, 76, 0, 100),
(60, 120, 0, 100),
(61, 121, 0, 100),
(64, 3, 0, 100),
(65, 6, 0, 100),
(65, 55, 0, 100),
(65, 66, 0, 100),
(65, 95, 0, 100),
(67, 9, 0, 1),
(70, 13, 0, 100),
(72, 26, 0, 100),
(72, 91, 0, 100),
(92, 54, 0, 100),
(97, 15, 0, 100),
(97, 65, 0, 70),
(97, 80, 0, 100),
(105, 65, 1, 30),
(105, 90, 0, 100),
(105, 105, 0, 100);

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `manhanvien` int(11) NOT NULL,
  `maphongban` int(11) NOT NULL,
  `machucvu` int(11) NOT NULL,
  `tennhanvien` varchar(100) NOT NULL,
  `trinhdohocvan` varchar(100) NOT NULL,
  `gioitinh` tinyint(1) NOT NULL DEFAULT 1,
  `ngaysinh` date NOT NULL,
  `sdt` varchar(10) NOT NULL,
  `ngayvaolam` date NOT NULL,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`manhanvien`, `maphongban`, `machucvu`, `tennhanvien`, `trinhdohocvan`, `gioitinh`, `ngaysinh`, `sdt`, `ngayvaolam`, `trangthai`) VALUES
(1, 1, 1, 'Nguyễn Đai Khoa', 'Đại học', 1, '1973-02-01', '0393368623', '2010-01-23', 1),
(2, 1, 2, 'Nguyễn Trọng An', 'Đại học', 1, '1985-12-01', '0393368624', '2010-01-23', 1),
(3, 11, 3, 'Phạm Tuấn Anh', 'Đại học', 1, '1975-12-05', '0393368645', '2010-01-23', 1),
(4, 12, 9, 'Lê Tuấn Anh', 'Đại học', 1, '1984-02-25', '0125486597', '2015-02-03', 1),
(5, 12, 7, 'Vũ Thị Thu Hằng', 'Đại học', 0, '1996-03-13', '0393364582', '2010-01-23', 1),
(6, 12, 7, 'Nguyễn Bá Luyện', 'Đại học', 1, '1989-07-19', '0124578956', '2010-01-23', 1),
(7, 8, 4, 'Phạm Thị Hà Ngân', 'Đại học', 0, '1983-05-10', '0124578923', '2010-01-23', 1),
(8, 8, 8, 'Nguyễn Thị Hồng Thanh', 'Đại học', 0, '1983-06-10', '0154578923', '2010-01-23', 1),
(9, 8, 7, 'Nguyễn Trung Thành', 'Đại học', 1, '1999-12-23', '0312458765', '2021-01-12', 1),
(10, 8, 7, 'Nguyễn Thành Trung', 'Đại học', 1, '1999-12-23', '0312458565', '2021-01-12', 1),
(11, 3, 4, 'Phạm Đức Trọng', 'Đại học', 1, '1986-03-13', '0312448795', '2010-01-23', 1),
(12, 3, 7, 'Phạm Thị Hoài Hương', 'Đại học', 0, '1976-04-23', '0312484795', '2015-01-23', 1),
(13, 3, 7, 'Phạm Thị Thu Cúc', 'Đại học', 0, '1996-05-23', '0312484645', '2020-01-23', 1),
(14, 4, 4, 'Võ Mạnh Hùng', 'Đại học', 1, '1975-04-12', '0312484654', '2020-01-23', 1),
(15, 4, 7, 'Ngô Bá Khá', 'Đại học', 1, '1978-04-12', '0312484654', '2013-01-23', 1),
(16, 4, 7, 'Phạm Hoa Đồng', 'Đại học', 0, '1980-07-24', '0312479458', '2013-01-23', 1),
(17, 5, 7, 'Nguyễn Quang Hoàn', 'Đại học', 1, '1987-02-15', '0393368642', '2014-02-03', 1),
(18, 5, 4, 'Phùng Thị Thuý Hằng', 'Đại học', 0, '1984-05-14', '0783368645', '2014-01-23', 1),
(19, 6, 4, 'Nguyễn Bạch Dương', 'Đại học', 1, '1984-01-23', '0393368624', '2015-02-03', 1),
(20, 7, 4, 'Nguyễn Thị Ngọc Linh', 'Đại học', 1, '1984-02-03', '0393368624', '2015-02-03', 1),
(21, 9, 7, 'Trần Văn Sơn', 'Đại học', 1, '1986-02-05', '0393368645', '2015-02-03', 1),
(22, 10, 4, 'Bùi Minh Thịnh', 'Đại học', 1, '1982-01-08', '0393368624', '2012-01-23', 1),
(23, 10, 7, 'Trịnh Hòa Bình', 'Đại học', 1, '1984-02-05', '0393368624', '2012-06-06', 1),
(24, 2, 9, 'Nguyễn Văn An', 'Đại học', 1, '2000-12-21', '0393368624', '2020-02-01', 0),
(25, 4, 9, 'Lê Thi Hường', 'Đại học', 0, '1980-08-19', '0393368624', '2010-01-05', 1),
(26, 8, 9, 'Phạm Mỹ Hoa', 'Đại học', 0, '2000-12-01', '0393368645', '2021-12-02', 1),
(27, 7, 9, 'Phạm Như Ngọc', 'Đại học', 0, '2000-04-14', '0393368645', '2020-02-03', 1),
(28, 5, 9, 'Nguyễn Quang Hùng', 'Đại học', 1, '2000-05-19', '0258347758', '2022-01-12', 1),
(29, 4, 9, 'Đào Mạnh Thái', 'Đại học', 1, '2000-05-15', '0124578465', '2022-02-23', 1),
(30, 4, 9, 'Phạm Khác Đạt', 'Đại học', 1, '1999-12-23', '0124578956', '2022-01-12', 1),
(31, 4, 9, 'Phạm Quang Trưởng', 'Đại học', 1, '1996-03-13', '0124578956', '2022-01-12', 1),
(32, 10, 9, 'Trần Tô Ngọc', 'Đại học', 0, '1983-05-10', '0393368645', '2012-02-23', 0),
(33, 12, 4, 'Nguyễn Trung Hiếu', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(34, 3, 9, 'Nguyễn Hữu Trung Hiếu', 'Đại học', 1, '2000-05-18', '0124523956', '2021-12-15', 1),
(35, 11, 9, 'Nguyễn Mỹ Hoa', 'Đại học', 1, '1999-12-23', '0154376623', '2022-05-11', 1),
(36, 4, 9, 'Tống Song Thư', 'Đại học', 1, '2001-02-25', '0184567845', '2022-03-15', 1),
(37, 2, 4, 'Lạc Văn Hư', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(38, 2, 9, 'Hoàng Yên Trần', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(39, 5, 9, 'Trần Văn Đại', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(40, 14, 9, 'Nguyễn Thị Thủy', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(41, 3, 9, 'Đỗ Vân Anh', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(42, 5, 9, 'Phạm Nhật Quang', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(43, 14, 9, 'Phan Xuân Công', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(44, 3, 9, 'Đỗ Quang Hưng', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(45, 14, 4, 'Đào Mạnh Hải', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(46, 5, 9, 'Hoàng Đại Phát', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(47, 14, 9, 'Trần Công Tâm', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(48, 12, 9, 'Đào Hải Đăng', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(49, 3, 9, 'Phạm Nhật Anh', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(50, 15, 7, 'Đinh Thảo Anh', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(51, 3, 9, 'Đinh Thành Long', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(52, 3, 9, 'Trần Văn Hoàng Yến', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(53, 3, 9, 'Nghiêm Trọng Đạt', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(54, 3, 9, 'Trương Lãnh Hải', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(55, 3, 9, 'Đào Thành Công', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(56, 5, 9, 'Nguyễn Bảo Nguyên', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(57, 3, 9, 'Nguyễn Trần Lương', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(58, 14, 9, 'Hoàng Đạo Hải', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(59, 6, 9, 'Trần Linh Nhi', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(60, 6, 9, 'Lại Anh Thư', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(61, 6, 9, 'Lại Hải Anh', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(62, 3, 9, 'Trương Minh Hiếu', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(63, 3, 9, 'Nguyễn Đăng Khoa', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(64, 3, 9, 'Hồ Quang Huy', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(65, 12, 9, 'Nguyễn Trần Thượng', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(66, 3, 9, 'Nguyễn Ngọc Sang', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(67, 3, 9, 'Nguyễn Văn Thành', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(68, 3, 9, 'Nguyễn Trung Thực', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(69, 3, 9, 'Đào Quang Hải', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(70, 3, 9, 'Trần Quang Điện', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(71, 3, 9, 'Hoàng Thiên Trường', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(72, 3, 9, 'Mai Quang Vũ', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(73, 3, 9, 'Lương Kình Thiên', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(74, 3, 9, 'Lưu Hoàng Anh', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(75, 3, 9, 'Đào Thiên Kim', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(76, 3, 9, 'Trần Võ Lan', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(77, 3, 9, 'Trương Hiểu Phàm', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(78, 3, 9, 'Trần Trung Đức', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(79, 3, 9, 'Đào Thành Hưng', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(80, 3, 9, 'Phạm Thành Hưng Vũ', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(81, 3, 9, 'Phạm Nhật Vượng', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(82, 3, 9, 'Phạm Đào Mạnh Thái', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(83, 3, 9, 'Nguyễn Văn Quay', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(84, 3, 9, 'Nguyễn Hải Đại', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(85, 3, 9, 'Nguyễn Hải Long', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(86, 3, 9, 'Nguyễn Minh Hiếu', 'Đại học', 1, '2000-06-10', '0393368645', '2021-01-12', 1),
(87, 4, 9, 'Võ Thị Sàng', 'Đại học', 0, '1999-06-10', '0356368645', '2021-01-12', 1),
(88, 5, 9, 'Juni Phạm', 'Đại học', 1, '1999-07-10', '0393868645', '2021-01-12', 1),
(89, 6, 9, 'Nie Nguyễn', 'Đại học', 0, '1998-05-10', '0393368645', '2021-01-12', 1),
(90, 3, 9, 'Lò Thị Phóng', 'Đại học', 0, '1997-05-10', '0393368612', '2021-01-12', 1),
(91, 4, 9, 'Lờ Thị Nở', 'Đại học', 0, '2000-05-10', '0393368665', '2021-01-12', 1),
(92, 5, 9, 'Tờ iên Tiên', 'Đại học', 0, '2000-05-10', '0393368634', '2021-01-12', 1),
(93, 15, 4, 'Cảnh Minh Tiến', 'Đại học', 1, '2000-05-10', '0393368623', '2021-01-12', 1),
(94, 4, 9, 'Trần Ngọc Cảnh', 'Đại học', 1, '2000-05-10', '0393368665', '2021-01-12', 1),
(95, 3, 9, 'Võ Thị Ngọc Vy', 'Đại học', 0, '2000-05-10', '0393368213', '2021-01-12', 1),
(96, 7, 9, 'Võ Thị Thu San', 'Đại học', 1, '2000-05-10', '0393368123', '2021-01-12', 1),
(97, 8, 9, 'Trần Thế Thiên', 'Đại học', 1, '2002-05-10', '0393368785', '2021-01-12', 1),
(98, 9, 9, 'Nguyễn Đức Minh Trung Tín', 'Đại học', 1, '2000-05-10', '0393348645', '2021-01-12', 1),
(99, 3, 9, 'Phạm Hải Triều', 'Đại học', 1, '2002-05-10', '0393344645', '2021-01-12', 1),
(100, 7, 9, 'Nguyễn Quỳnh San', 'Đại học', 0, '2005-05-23', '0394468645', '2021-01-12', 1),
(101, 6, 9, 'Nguyễn Ngọc Song Thư', 'Đại học', 0, '2000-05-13', '0335568645', '2021-01-12', 1),
(102, 3, 9, 'Ngô Thị Bưởi', 'Đại học', 0, '2000-05-23', '0393312345', '2021-01-12', 1),
(103, 4, 9, 'Phạm Ngọc Ngà', 'Đại học', 0, '2000-05-23', '0393323464', '2021-01-12', 1),
(104, 2, 9, 'Trương Ngọc Cành', 'Đại học', 1, '2000-05-24', '0393438645', '2021-01-12', 1),
(105, 8, 9, 'Phạm Thiếu Tá', 'Đại học', 0, '2000-09-26', '039333445', '2021-01-12', 1),
(106, 9, 4, 'Nguyễn Trần Trung Hải', 'Đại học', 1, '1999-06-23', '0393363445', '2021-01-12', 1),
(107, 9, 9, 'Nguyễn Ngọc Lũ', 'Đại học', 1, '2002-06-14', '039334645', '2021-01-12', 1),
(108, 6, 9, 'Trần Minh tiến', 'Đại học', 1, '2002-05-16', '0393334645', '2021-01-12', 1),
(109, 6, 9, 'Phạm Ngọc Thạch', 'Đại học', 0, '2003-05-10', '0393368645', '2021-01-12', 1),
(110, 6, 9, 'Trần Minh Quân', 'Đại học', 1, '2001-02-10', '0393368645', '2021-01-12', 1),
(111, 4, 9, 'Nguyễn Hoàng Giang', 'Đại học', 1, '1986-12-18', '0312484654', '2014-12-18', 1),
(112, 7, 9, 'Trần Mạnh Thứ', 'Đại học', 1, '1987-12-18', '0393368624', '2014-12-18', 1),
(113, 10, 9, 'Mai Anh Tào', 'Đại học', 1, '1987-12-18', '0393368624', '2014-12-18', 1),
(114, 2, 9, 'Phan Anh Hải', 'Đại học', 1, '1989-12-18', '0393368645', '2014-12-18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `nhanxet`
--

CREATE TABLE `nhanxet` (
  `manhanxet` int(11) NOT NULL,
  `mathanhvien` int(11) NOT NULL,
  `masangkien` int(11) NOT NULL,
  `noidung` varchar(255) NOT NULL,
  `thoigiannhanxet` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nhanxet`
--

INSERT INTO `nhanxet` (`manhanxet`, `mathanhvien`, `masangkien`, `noidung`, `thoigiannhanxet`) VALUES
(14, 61, 56, 'Mục đích và nội dung chưa thiết thực với tầm nhìn hiện tại. Chưa tính toán được lượng kinh phí cần bỏ ra khi áp dụng vào thực tế. ', '2022-06-22'),
(15, 62, 56, 'Kinh phí áp dụng cần bỏ ra lớn. Cần xem xét và phát triển lại kế hoạch sản xuất máy', '2022-06-22'),
(16, 63, 56, 'Chưa đưa ra được hết yêu cầu của bài toán, mức kinh phí phát sinh bảo trì kí kết hợp đồng trong tương lai', '2022-06-22'),
(17, 61, 60, 'Đã đưa ra được danh sách các số dự toán trên 5 năm, mục tiêu phát triển tốt đem lại lợi ích cho công ty ', '2022-06-22'),
(18, 62, 60, 'Mục đích hướng tới khá tốt. Chi phí ưu đãi hợp lý có khả năng áp dụng thực tiễn', '2022-06-22'),
(19, 63, 60, 'Sáng kiến tốt có thể áp dụng trong tương lai', '2022-06-22'),
(20, 61, 70, 'Mục đích nhân văn, hướng phát triển tốt thích hợp để nghiên cứu và cải tạo', '2022-06-22'),
(21, 62, 70, 'Nội dung rõ ràng đúng trọng tâm. Cải thiện không gian mang lại hiểu quả tốt', '2022-06-22'),
(22, 63, 70, 'Tính ứng dụng cao. đơn giản, dễ dàng thực hiện', '2022-06-22'),
(23, 68, 49, 'Nội dung trình bày tốt, đã có nghiên cứu nhưng tính áp dụng thực tế chưa cao. Có thể gây tổn thất một lượng khách hàng nhất định', '2022-06-22'),
(24, 69, 49, 'Mục đích nhân văn hướng tới tương lai. Nội dung triển khai và phương án tốt', '2022-06-22'),
(25, 70, 49, 'Mục đích hướng tới tốt nhưng quy trình các bước thực hiện còn nhiều rủi ro', '2022-06-22'),
(26, 68, 75, 'Mục tiêu tốt nhưng cần phải triển khai trong thời gian dài cần tính toàn chi phí một cách cẩn thận và chính xác', '2022-06-22'),
(27, 69, 75, 'Nội dung còn khá trừu tượng do chưa có nhiều thông tin và mạng này. Cần tìm hiểu thêm và phát triển', '2022-06-22'),
(28, 70, 75, 'Rủi ro thực hiện khá lớn, cần tính toán lại một cách cẩn thận chi phí ngân sách dự toán', '2022-06-22'),
(29, 75, 29, 'Chưa đáp ứng được nhu cầu thực tế', '2022-06-22'),
(30, 76, 29, 'Còn khá nhiều rủi ro trong áp dụng thực tế', '2022-06-22'),
(31, 77, 29, 'Khó khăn trong quá trình thực hiện và phân bố nhân công', '2022-06-22'),
(32, 75, 27, 'Bộ phân liên hệ trực tiếp với khách hàng, ảnh hưởng nhiều tới công ty. Cần xem xét thêm', '2022-06-22'),
(33, 76, 27, 'Cần xem xét nghiên cứu thêm nội dung triển khai', '2022-06-22'),
(34, 77, 27, 'Cần xem xét đánh giá thêm nội dung', '2022-06-22'),
(35, 82, 101, 'Việc áp dụng thực tiễn chưa thiết thực', '2022-06-22'),
(36, 83, 101, 'Chưa nổi bật được nội dung cần triển khai', '2022-06-22'),
(37, 84, 101, 'Chưa đáp ứng được nhu cầu thực tế', '2022-06-22'),
(38, 82, 96, 'Nội dung tốt, nhưng cần áp dụng và khảo sát thêm ý kiến nhân viên', '2022-06-22'),
(39, 83, 96, 'Chưa tiến hành khảo sát ý kiến các nhân viên khác', '2022-06-22'),
(40, 84, 96, 'Cần bản khảo sát các phòng ban để làm dẫn chứng', '2022-06-22'),
(41, 96, 106, 'Kế hoạch tốt, có thể triển khai kí kết hợp đồng', '2022-06-22'),
(42, 97, 106, 'Cần thảo luận của cấp trên để tiến hành thỏa thuận kí kết hợp đồng', '2022-06-22'),
(43, 98, 106, 'Nội dung, mục đính tốt', '2022-06-22'),
(44, 96, 110, 'Phát triển hệ thống mạng mất thời gian và kinh phí', '2022-06-22'),
(45, 97, 110, 'Khả thi nhưng dự toán mức ngân sách còn khá lớn ', '2022-06-22'),
(46, 98, 110, 'Sáng kiến tốt nhưng khả năng thực tế chưa đáp ứng được', '2022-06-22');

-- --------------------------------------------------------

--
-- Table structure for table `phongban`
--

CREATE TABLE `phongban` (
  `maphongban` int(11) NOT NULL,
  `tenphongban` varchar(100) NOT NULL,
  `ngaythanhlap` date DEFAULT NULL,
  `motaphongban` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `phongban`
--

INSERT INTO `phongban` (`maphongban`, `tenphongban`, `ngaythanhlap`, `motaphongban`) VALUES
(1, 'Công ty Dịch vụ MobiFone Khu vực 5', '2010-01-23', '– Thực hiện kinh doanh trong phạm vi các tỉnh/ thành phố: Hải Phòng, Quảng Ninh, Hải Dương, Thái Bình, Hưng Yên, Bắc Ninh, Bắc Giang, Cao Bằng, Bắc Kạn, Lạng Sơn, Hà Giang, Tuyên Quang, Thái Nguyên.\r\n\r\n– Trụ sở đặt tại thành phố Hải Phòng.'),
(2, 'Phòng Nghiên cứu và phát triển Sản phẩm', '2010-01-23', 'Nghiên cứu định hướng và phát triển sản phẩm.\r\nCải tiến công nghệ sản xuất.\r\nNghiên cứu và thay thế dần các vật liệu và công nghệ nhằm nâng cao chất lượng sản phẩm.\r\nNghiên cứu nội địa hóa một số nguyên liệu nhằm tăng giá trị và chủ động trong sản xuất với chi phí hợp lý hơn.'),
(3, 'Phòng Công nghệ Thông tin', '2010-01-23', 'Xây dựng chiến lược và kế hoạch phát triển CNTT trong từng giai đoạn phát triển của doanh nghiệp. \r\nThực hiện báo cáo về tình trạng hoạt động CNTT và đề ra hướng giải quyết sự cố liên quan đến hệ thống CNTT.\r\nChịu trách nhiệm điều hành và quản lý hoạt động CNTT.\r\nQuản lý, đảm bảo cơ sở hạ tầng về kỹ thuật công nghệ thông tin cho các hoạt động trong doanh nghiệp.\r\nTư vấn triển khai giải pháp phần mềm quản lý, đào tạo cho doanh nghiệp; '),
(4, 'Phòng Kế hoạch – Đầu tư', '2010-01-23', 'Nghiên cứu và thực hiện các công việc tiếp cận thị trường\r\nĐưa ra các chiến lược giới thiệu sản phẩm và việc mở rộng phát triển thị trường\r\nLên kế hoạch tổ chức và thực hiện các hoạt động kinh doanh cũng như tính toán báo cáo về giá thành để tạo hợp đồng với khách.\r\nThực hiện việc theo dõi, đôn đốc tiến độ thực hiện các chiến lược kinh doanh của các phòng ban trong công ty, để đảm bảo được thực hiện đúng quy trình và tiến độ sản xuất sản phẩm với các hợp đồng của khách hàng.'),
(5, 'Phòng kế toán', '2010-01-23', 'Thực hiện công việc về nghiệp vụ chuyên môn tài chính kế toán theo quy định của Nhà nước\r\nTheo dõi sự vận động vốn kinh doanh của doanh nghiệp dưới mọi hình thái và cố vấn cho Ban lãnh đạo về các vấn đề liên quan.\r\nTham mưu cho Ban Tổng Giám đốc về chế độ kế toán và những thay đổi qua từng thời kỳ trong hoạt động kinh doanh.\r\nCùng với các bộ phận khác tạo nên mạng lưới thông tin quản lý nhân sự, tài chính,…'),
(6, 'Phòng Kênh phân phối', '2010-01-23', 'Nghiên cứu và thực hiện các công việc tiếp cận thị trường\r\nĐưa ra các chiến lược giới thiệu sản phẩm và việc mở rộng phát triển thị trường\r\nLên kế hoạch tổ chức và thực hiện các hoạt động kinh doanh cũng như tính toán báo cáo về giá thành để tạo hợp đồng với khách.\r\nThực hiện việc theo dõi, đôn đốc tiến độ thực hiện các chiến lược kinh doanh của các phòng ban trong công ty, để đảm bảo được thực hiện đúng quy trình và tiến độ sản xuất sản phẩm với các hợp đồng của khách hàng.'),
(7, 'Phòng Khách hàng Doanh nghiệp', '2010-01-23', 'Nghiên cứu và thực hiện các công việc tiếp cận thị trường\r\nĐưa ra các chiến lược giới thiệu sản phẩm và việc mở rộng phát triển thị trường\r\nLên kế hoạch tổ chức và thực hiện các hoạt động kinh doanh cũng như tính toán báo cáo về giá thành để tạo hợp đồng với khách.\r\nThực hiện việc theo dõi, đôn đốc tiến độ thực hiện các chiến lược kinh doanh của các phòng ban trong công ty, để đảm bảo được thực hiện đúng quy trình và tiến độ sản xuất sản phẩm với các hợp đồng của khách hàng.'),
(8, 'Phòng chăm sóc khách hàng', '2010-01-23', 'Phối hợp với phòng marketing để thực hiện các chương trình khuyến mãi, phân tích những lợi ích của khách hàng nhận được, nhằm phát huy cao nhất hiệu quả của kế hoạch marketing.\r\nLên kế hoạch thăm hỏi khách hàng thường xuyên của công ty. Tổ chức thực hiện, kiểm tra, giám sát, điều chỉnh kế hoạch. Ghi nhận ý kiến của khách hàng để cải tiến doanh nghiệp.\r\nLập kế hoạch tặng quà cho khách trong dịp lễ, tết, ngày khai trương, ngày sinh nhật của công ty.\r\nTheo dõi bảo hành sản phẩm, kiểm tra hoạt động bảo hành, hoạt động bảo trì sửa chữa để nắm được mức hài lòng của khách hàng.'),
(9, 'Phòng Tổ chức – Hành chính', '2010-01-23', 'Tiếp nhận và xử lý các công việc nội bộ trong doanh nghiệp.\r\nTiếp khách, xử lý các công văn mà khách hàng gửi tới\r\nTổ chức sắp xếp hội thảo, hội nghị cho công ty\r\nLưu trữ, phát hành văn bản, con dấu và chịu trách nhiệm trước ban giám đốc và pháp luật về tính pháp lý.\r\nĐảm bảo an toàn lao động, vệ sinh trong công ty, lên kế hoạch tập huấn về bảo hộ lao động\r\nTổ chức kiểm tra sức khỏe thường xuyên cho người lao động'),
(10, 'Tổ xét thầu', '2010-01-23', 'Nghiên cứu và thực hiện các công việc tiếp cận thị trường\r\nĐưa ra các chiến lược giới thiệu sản phẩm và việc mở rộng phát triển thị trường\r\nLên kế hoạch tổ chức và thực hiện các hoạt động kinh doanh cũng như tính toán báo cáo về giá thành để tạo hợp đồng với khách.\r\nThực hiện việc theo dõi, đôn đốc tiến độ thực hiện các chiến lược kinh doanh của các phòng ban trong công ty, để đảm bảo được thực hiện đúng quy trình và tiến độ sản xuất sản phẩm với các hợp đồng của khách hàng.'),
(11, 'Đài 1090', '2010-01-23', 'Hỗ trợ lắng nghe cuộc gọi từ khách hàng'),
(12, 'Phòng Bán hàng & Marketing', '2010-01-23', 'Xây dựng và quản lý hệ thống chăm sóc khách hàng tốt nhất.\r\nThiết kế chương trình khuyến mãi và bảo hành sản phẩm cho khách hàng\r\nTham gia tài trợ các hoạt động xã hội để quảng bá hình ảnh thương hiệu.\r\nXây dựng hệ thống thu thập, tổng hợp thông tin về giá cả, sản phẩm của đối thủ cạnh tranh.\r\nPhân tích, đánh giá thông tin thu thập được, từ đó đưa ra quyết định cải tiến hoặc phát triển sản phẩm mới.\r\nXây dựng chiến lược để mở rộng thị trường phù hợp với mục tiêu phát triển của doanh nghiệp.\r\nXây dựng chiến lược marketing cho doanh nghiệp; điều hành triển khai chiến lược marketing; '),
(14, 'Phòng nhân sự', '2022-05-30', ' Lập kế hoạch và triển khai công tác tuyển dụng nhằm đáp ứng nhu cầu hoạt động của doanh nghiệp.\r\nTiếp cận các kênh truyền thông để đưa thông tin tuyển dụng đến gần hơn với ứng viên tiềm năng.\r\nTạo mối liên kết với các nguồn cung ứng nhân lực: Trường Đại học, Cao đẳng, đơn vị đào tạo nghề…\r\nTrực tiếp đề xuất với cấp trên các ý tưởng nhằm nâng cao chất lượng công việc của nhân viên.\r\nTính toán tiền lương và các chế độ chính sách phúc lợi cho nhân viên.\r\nTính toán, quyết toán mức thuế thu nhập cá nhân cho nhân viên theo quy định pháp luật.\r\nThông báo các quy định, chính sách của công ty cho nhân viên: Ca làm việc, tài khoản cá nhân, chính sách lương thưởng, chế độ bảo hiểm, nghỉ phép…'),
(15, 'Phòng Tổng hợp', '2010-06-23', '');

-- --------------------------------------------------------

--
-- Table structure for table `quyen`
--

CREATE TABLE `quyen` (
  `maquyen` int(11) NOT NULL,
  `tenquyen` varchar(100) NOT NULL,
  `motaquyen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quyen`
--

INSERT INTO `quyen` (`maquyen`, `tenquyen`, `motaquyen`) VALUES
(1, 'ADMIN', NULL),
(2, 'GIAMKHAO', NULL),
(3, 'TRUONGPHONG', NULL),
(4, 'NHANVIEN', NULL),
(5, 'NULL', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sangkien`
--

CREATE TABLE `sangkien` (
  `masangkien` int(11) NOT NULL,
  `tensangkien` varchar(100) NOT NULL,
  `madotsangkien` int(11) NOT NULL,
  `muctieu` varchar(255) NOT NULL,
  `noidung` text NOT NULL,
  `loiich` varchar(255) NOT NULL,
  `doituong` varchar(255) NOT NULL,
  `matrangthai` int(11) NOT NULL DEFAULT 1,
  `dinhkem` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sangkien`
--

INSERT INTO `sangkien` (`masangkien`, `tensangkien`, `madotsangkien`, `muctieu`, `noidung`, `loiich`, `doituong`, `matrangthai`, `dinhkem`) VALUES
(3, 'Sửa chữa nâng cấp hệ thống chấm công tại các phòng ban', 26, 'Tăng độ chính xác trong chấm công bằng nhận diện khuôn mặt', 'Thay đổi thuật toán chấm công', 'Nhận diện chính xác hơn đối tượng chấm công', 'Tất cả phòng ban', 3, 'sangkien-3.pdf'),
(4, 'Thắp sáng ước mơ 4G miễn phí', 25, 'Giúp người dùng có thể tích lũy và sử dụng 4G miễn phí. Tăng trưởng đăng ký gói cước', 'Khi người dùng đăng ký gói mạng 4G của mobiphone sẽ được cộng một tổng điểm tích lũy từ đó có thể đăng ký gói mạng 4G trong thời gian nhất định. Với mỗi lần đăng ký gói mạng 4G từ 30.000 VNĐ - 80.000 VNĐ sẽ được cộng 20 điểm tích lũy. Đăng ký gói cao hơn sẽ được cộng 40 điểm. Khi có đủ 500 điểm người dùng có thể đổi 1 ngày dùng 4G miễn phí tốc độ cao.', 'Thúc đẩy đăng ký gói mạng của công ty', 'Phân phói bán hàng, tăng doanh thu mua gói 4G', 3, 'sangkien-4.pdf'),
(5, 'Phát triển ứng dụng mobiphone banking trên điện thoại', 25, 'Tạo ra môi trường giao dịch, mua thẻ, tích điểm, mua gói data một cách nhanh chóng qua ứng dụng.', 'Sử dụng android studio với ngôn ngữ java, môi trường SDK 22, android lolipop phù hợp với đa số các dòng máy hiện tại đảm bảo an toàn tiện nghi hữu ích. Phát triển đẩy mạnh mua sắm các gói cước một cách trực tiếp đối với khách hàng. Xử lý đơn hàng 1 cách nhanh chóng. Hạn chế được việc tiếp xúc hay giao dịch trực tiếp.', 'Kích thích nhu cầu mua sắm online từ khách hàng. Nơi để khách hàng theo dõi cập nhật thông tin khuyễn mãi thường xuyên', 'Phòng công nghệ thông tin sẽ phân tích thiết kế hệ thống và tạo lập chương trình', 3, 'sangkien-5.pdf'),
(6, 'Tiến hành hỗ trợ thay thế thẻ cào bằng máy in đối với các cơ sở hợp tác bán thẻ của mobiphone', 25, 'Tiến hành lắp đặt 100% máy in mã thẻ với các cơ sở đối tác bán hàng ở trên phường Vạn Mỹ để không còn phải mua trước số lượng thẻ cao như trước.', 'Tiến hành thay thế thiết bị in thẻ với các đối tác của mobiphone', 'Việc phân phối mã thẻ tới các đối tác được trở lên thuận tiện hơn, một phần để khách hàng không gặp trợ ngại khi hết thẻ phải đi quán khác\r\n', 'Phòng marketing', 3, 'sangkien-6.pdf'),
(7, 'Tiến hành xây dựng lắp đặt mạng mobiphone tại 1 số khu vực Hải Phòng', 28, 'Phát triển thêm lĩnh vực mới.', 'Như đã biết Viettel phát triển hệ thống wifi riêng. Với tư cách là một nhà mạng lớn tại Việt Nam thì sao chúng ta không làm được. Phát triển mạng wifi dành cho hộ gia đình. ', 'Mở rộng kinh doanh. Phát triển ngành nghề. Gia tăng cơ hội việc làm. Giúp mobiphone trở nên gần ', 'Phòng ban kế hoạch và đầu tư', 2, 'sangkien-7.pdf'),
(8, 'Xây dựng hệ thống map và hướng dẫn đường đi cho lái xe', 28, 'Phát triển hệ thống map mang thương hiệu mobiphone', 'Xây dựng hệ thống chỉ đường mobimap giúp lái xe dễ dàng hơn. Quảng cáo cho mobiphone . Ưu tiên hiện thị các điểm giao dịch của mobiphone', 'Người lái xe dễ dàng tìm thấy các điểm truy nhập mobiphone. Môt phần quảng cáo cho mobiphone gần hơn với người tiêu dùng', 'Phòng CNTT\n', 2, 'sangkien-8.pdf'),
(9, 'Áp dụng công nghệ Ai vào tính toán chi tiết xếp hạng và mức xét thầu', 28, 'Dự toán mức xét thầu một cách chính xác và gần giá', 'Đưa công nghệ Ai tính toán rủi ro xét thầu, tổng thiệt hại. Hướng phát triển trong tương lại để đưa ra mức xet thầu hợp lý và cạnh tranh', 'Giảm chi phí xét thầu. Tăng tỷ lệ xét thầu thành công', 'Công việc ở phòng xét thầu được tổ chức chặt chẽ, logic . Vận hành hệ thống tính toán đưa ra mức rủi ro , mức độ trúng thầu. Tầm giá định hướng trong tương lai có thể đặt được', 2, 'sangkien-9.pdf'),
(10, 'Phát triển ưu tiên đường truyền mạng vào giờ cao điểm', 26, 'Nhằm cải thiện truy cập tới các trang được ưu tiên mang tính quan trọng cấp thiết.', 'Hạn chế truy nhập với việc load các video từ mạng xã hội facebook. Hạn chế băng thông tới các trang game hay trang web giải trí. Ưu tiên đường truyền tới các web trường, bệnh viện, cục cứu phòng chống và cứu nạn để tiện cho việc liên hệ. Hay một số trang web liên kết tới diễn đàn học tập để tìm tài liệu', 'Giúp học sinh, sinh viên dễ dàng hơn trong tìm kiếm tài liệu học tập giờ cao điểm.', 'Phòng công nghệ thông tin nghiên cứu và phát triển hệ thống', 3, 'sangkien-10.pdf'),
(11, 'Phát hiện chặn một số trang web không lành mạnh.', 26, 'Phát hiện các địa chỉ lưu truyền thông tin không lành mạnh đối với người dùng.', 'Phát hiện các địa chỉ lưu truyền thông tin không lành mạnh đối với người dùng.', 'Niềm tiên, sự thấu hiểu giao cho con cái sử dụng mạng.', 'Phòng công nghệ thông tin', 3, 'sangkien-11.pdf'),
(12, 'Cải tiến phần mềm ngăn chăn truy cập web lậu', 24, 'Hướng tới trình duyệt web an toàn', 'Thu thập thông tin cách trang web không lành mạnh\nChặn các trang web đó', 'Đem trải nghiệm tốt hơn cho người dùng', 'Khách hàng', 3, 'sangkien-12.pdf'),
(13, 'Sáng kiến: Cải tiến công tác lập và quản lý hồ sơ chứng từ quyết toán', 23, 'Hỗ trợ quản lý hồ sơ quy trình thực hiện một cách nhanh chống. Hỗ trợ quy trình thực hiện một cách dễ dàng, tránh sai sót.', 'Khảo khát nghiên cứu đưa ra dự án\r\nPhân tích bài toán đưa ra mô hình nghiệp vụ.\r\nTiến hành cài đặt công cụ , lập khung nền hệ thống.\r\nPhát triển hệ thống đưa vào sử dụng', 'Tiết kiệm thời gian chi phí. Quản lý hiệu quả', 'Nhân viên phòng công nghệ thông tin đưa ra phương án cái thiện phát triển dự án', 3, 'sangkien-13.pdf'),
(14, 'Ứng dụng công nghệ thông tin vào trong sản xuất và kinh doanh', 26, 'Lưu trữ giấy tờ một cách ràng. \r\nXử lý công việc nhanh chóng thuận tiện hơn', 'Nghiên cứu giấy tờ, quy trình làm việc.\r\nPhân tích thiết kế mô hình hệ thống.\r\nViết code triển khai test thử.\r\nChuyển dữ liệu cũ trên giấy tờ lên hệ thống.\r\nHướng dẫn áp dụng cào công ty\r\n', 'Giảm thiểu chi phí nhân công.Tiết kiệm thời gian chi phí. Quản lý hiệu quả quy trình làm việc với các văn bản hành chính.', 'Các phòng ban kiểu cũ còn áp dụng giấy tờ ', 3, 'sangkien-14.pdf'),
(15, 'Khảo sát mức độ hài lòng của khách hàng bằng tin nhắn trắc nghiệm\r\n', 24, 'Biết được mức độ hài lòng của khách hàng với các dịch vụ của công ty', 'Xây dựng mẫu khảo sát hàng tháng, gửi cho các thuê bao mobifone, khách hàng phản hồi bằng tin nhắn miễn phí\r\n', 'Cải thiện các điểm yếu trong dịch vụ hiện tại  của công ty', 'Các khách hàng của công ty, phòng chăm sóc khác hàng', 3, 'sangkien-15.pdf'),
(26, 'Cung cấp dịch vụ lưu trữ điện toán đám mây', 22, 'Tăng thêm dịch vụ hữu ích cho khách hàng, nâng cao doanh thu', 'Phát triển dịch vụ lưu trữ của riêng mobifone cung cấp dịch vụ cho khách hàng thuê theo mức thuê của từng gói', 'Mở rộng thị trường, nâng cao doanh thu', 'Phòng công nghệ thông tin', 3, 'sangkien-26.pdf'),
(27, 'Mở đợt kiểm tra năng lực và khóa học nâng cao nghiệp vụ cho nhân viên đài 1090', 23, 'Nâng cao nghiệp vụ cho nhân viên đài 1090', 'Mở đợt kiểm tra năng lực và khóa học nâng cao nghiệm vụ hằng quý cho nhân viên đài 1090', 'Nâng cao nghiệm vụ cho nhân viên đài, nâng cao trải nghiệm cho khách hàng', 'Đài 1090', 3, 'sangkien-27.pdf'),
(29, 'Cải tiến bộ thu phát sóng 4g tại địa bàn quận hải an', 23, 'Mang lại trải nghiệm mượt mà hơn cho khách hàng', 'Tăng cao tốc độ đường truyền 4G tại Hải An. \r\nChuyển đổi thiết bị cũ thành thiết bị mới hiện đại hơn', 'Tốc độ đường truyền được tăng giúp bán được nhiều gói mạng hơn', 'Phòng bán hàng maketing sẽ có nhiều cái để quảng cáo', 3, 'sangkien-29.pdf'),
(34, 'Xây dựng hệ thống chấm công bằng nhận diện khuôn mặt tại các phòng ban', 24, 'Nhanh chóng, chính xác, thuận tiện trong quản lý làm việc', 'Xây dựng hệ thống chấm công qua nhận diện khuôn mặt của nhận viên, xác định thời điểm bắt đầu và kết thúc làm việc, lắp đặt hệ thống ở các phòng ban trong công ty', 'Tiết kiệm thời gian và chuẩn xác trong việc chấm công', 'Tất cả các phòng ban trong công ty', 3, 'sangkien-34.pdf'),
(37, 'Từ thiện phát triển nông thôn nghèo, tăng trưởng tiềm lực đất nước.', 21, 'Quảng bá hình ảnh công ty.\r\nPhát triển miền quê, khảo sát như  cầu lắp đặt mạng.', 'Thực hiện nghiên cứu tìm hiểu nơi thực hiện giúp đỡ. Tìm hiểu hoàn cảnh, phần quá , lặp danh sách người cần giúp đã.\r\nTìm hiểu tính quảng bá khu vực có được lan rộng.\r\nTìm hiểu khảo sát phát triển lắp mạng viễn thông', 'Giúp đỡ người dân.\r\nTìm hiểu phát triển hình ảnh công ty.\r\nKhảo sát mở rộng thị trường', 'Vùng quê có nhiều khó khăn đăng nhận được chú ý\r\nVùng gặp nạn thiên tai bão lũ.\r\nVÙng covid được đông đảo người dân chú ý tiếp tế', 3, 'sangkien-37.pdf'),
(38, 'Ủng hộ vùng covid,quảng bá hình ảnh của công ty.', 22, 'Quảng bá hình ảnh công ty.\r\nPhát triển miền quê, khảo sát như  cầu lắp đặt mạng.', 'Thực hiện nghiên cứu tìm hiểu nơi thực hiện giúp đỡ. Tìm hiểu hoàn cảnh, phần quá , lặp danh sách người cần giúp đã.\r\nTìm hiểu tính quảng bá khu vực có được lan rộng.\r\nTìm hiểu khảo sát phát triển lắp mạng viễn thông', 'Giúp đỡ người dân.\r\nTìm hiểu phát triển hình ảnh công ty.\r\nKhảo sát mở rộng thị trường', 'Vùng quê có nhiều khó khăn đăng nhận được chú ý\r\nVùng gặp nạn thiên tai bão lũ.\r\nVÙng covid được đông đảo người dân chú ý tiếp tế', 3, 'sangkien-38.pdf'),
(49, 'Phần mềm ngăn chăn truy cập web lậu', 21, 'Phát hiện ngăn chặn các trang web không lành mạnh đối với người dùng', 'Thu thập thông tin cách trang web không lành mạnh\nChặn các trang web đó', 'Môi trường dùng mạng trong sạch. Tiên tưởng từ gia đình với sự phát triển của con cái. Đem lại nguồn khách hàng tiềm năng', 'Trẻ em , trẻ vị thành niên khi tham gia duyệt web', 3, 'sangkien-49.pdf'),
(53, 'Cải tiến công tác lập và quản lý hồ sơ chứng từ quyết toán', 20, 'Hỗ trợ quản lý hồ sơ quy trình thực hiện một cách nhanh chống. Hỗ trợ quy trình thực hiện một cách dễ dàng, tránh sai sót.', 'Khảo sát nghiên cứu đưa ra dự án\r\nPhân tích bài toán đưa ra mô hình nghiệp vụ.\r\nTiến hành cài đặt công cụ , lập khung nền hệ thống.\r\nPhát triển hệ thống đưa vào sử dụng', 'Tiết kiệm thời gian chi phí. Quản lý hiệu quả', 'Nhân viên phòng công nghệ thông tin đưa ra phương án cái thiện phát triển dự án', 3, 'sangkien-53.pdf'),
(54, 'Cải tiến hình thức họp offline sang họp online trên web trong thời gian dịch bệnh ', 20, 'Hạn chế tiếp xúc gây lây lan dịch bệnh', 'Xây dựng trang web nội bộ công ty phục vụ cho việc họp, \r\nthay thế việc họp hành trực tiếp trong mùa dịch bệnh áp dụng trên tất cả phòng ban  ', 'Đảm bảo hiệu quả như khi họp offline, giảm thiểu ca nhiễm trong mùa dịch', 'Tất cả các phòng ban trong công ty', 3, 'sangkien-54.pdf'),
(55, 'Cung dịch vụ nhắn tin nội mạng miễn phí cho một số khu vực khó khăn trong địa bàn', 20, 'Tiếp thị cho  công ty', 'Phát hành lô sim cung cấp dịch vụ nhắn tin nội mạng miễn phí', 'Tiếp thị cho công ty', 'Phòng marketing', 3, 'sangkien-55.pdf'),
(56, 'Xây dựng thanh toán tự động tại các điểm bán lẻ', 19, 'Giảm thiểu thời gian thanh toán, thuận tiện cho khách hàng', 'Lắp đặt hệ thống tự động thanh toán tại các điểm bán lẻ', 'Tiết kiệm thời gian thanh toán, thuận tiện cho khách hàng', 'Các điểm bán lẻ của công ty', 3, 'sangkien-56.pdf'),
(57, 'Cải tiến trang web bán hàng của các chi nhánh', 19, 'Tối ưu hóa thao tác mua bán, giao diện thân thiện người dùng', 'Thiết kế lại giao diện và thao tác người dùng', 'Tối ưu hóa, giao diện thao tác đơn giản hiện quả, mang lại trải nghiệm tốt cho khách hàng', 'Phòng bán hàng và marketing', 3, 'sangkien-57.pdf'),
(60, 'Tri ân đối với thuê bao trên 5 năm sử dụng', 18, 'Tiếp thị, nâng cao trải nghiệm khách hàng', 'Giảm giá gói cước', 'Tiếp thị, tăng thiện cảm của khách hàng', 'Phòng chăm sóc khách hàng', 3, 'sangkien-60.pdf'),
(61, 'Xây dựng các điểm tiếp thị tại các đia điểm công cộng ', 18, 'Nâng cao doanh thu, tiếp thị sản phẩm đến khách hàng tiềm năng', 'Xây dựng các điểm tiếp thị tại các nơi đông người như gần trường học, nhà ga,...', 'Nâng cao doanh thu, nâng cao nhận thức của khách hàng với sản phẩm', 'Phòng marketing', 3, 'sangkien-61.pdf'),
(65, 'Botchat giải đáp thắc mắc danh sách câu hỏi có sẵn của khách hàng 18', 18, 'Giảm thiểu công việc của bộ phận chăm sóc khách hàng', 'BotChat trả lời câu hỏi cơ bản được soạn sẵn được khách hàng lựa chọn trong danh sách câu hỏi', 'Giảm thiểu công việc cho bộ phận chăm sóc khách hàng ', 'Phòng chăm sóc khách hàng', 3, 'sangkien-65.pdf'),
(66, 'Tiếp thị gói cước theo hộ gia đình', 19, 'Nâng cao doanh thu gói cưới', 'Thành lập nhóm tiếp thị diễu hành bằng xe máy và khẩu hiệu', 'Nâng cao doanh số bán hàng', 'Phòng marketing', 3, 'sangkien-66.pdf'),
(70, 'Cải thiện không gian làm việc trong công ty', 19, 'Nâng cao hiệu suất làm việc, tạo cảm giác thoải mái cho nhân viên', 'Trồng thêm cây xanh, sắp xếp lại không gian thoáng mát trong văn phòng', 'Tạo cảm giác thoải mái, nâng cao chất lượng làm việc', 'Tất cả phòng ban', 3, 'sangkien-70.pdf'),
(71, 'Tài trợ học bổng tại các trường Đại học trên địa bàn', 19, 'Tìm kiếm nguồn nhân lực tương lai', 'Phát học bổng cho sinh viên có thành tích tốt, thu hút nhân lực trẻ', 'Thu hút nguồn nhân lực có triển vọng cho công ty', 'Các trường đại học trên địa bàn', 3, 'sangkien-71.pdf'),
(75, 'Nghiên cứu và phát triển mạng 5G', 20, 'Nhanh chóng chiếm lĩnh thị trường', 'Phát triển nhanh chóng mạng 5G, đưa vào thực tế', 'Dễ dàng mở rộng thị trường nhờ phát hành nhanh chónh dịch vụ', 'Phòng công nghệ thông tin', 3, 'sangkien-75.pdf'),
(76, 'Xây dựng hội chợ việc làm trong các trường đại học trên địa bàn', 20, 'Thu hút nhân lực trẻ cho công ty, đối tượng hướng đến là sinh viên sắp ra trường', 'Đưa ra những lợi ích khi tham gia vào công ty, tiêu chí tuyển nhân lực', 'Tìm nguồn nhân lực trẻ, tiềm năng cho cty', 'Các trường đại học trên địa bàn, phòng kế hoạch- đầu tư', 3, 'sangkien-76.pdf'),
(80, 'Mở các lớp nâng cao nghiệp vụ cho nhân viên', 21, 'Nâng cao chất lượng công việc', 'Thành lập các lớp nâng cao nghiệm vụ cho từng phòng ban, từng công việc', 'Giảm thiểu công việc cho bộ phận chăm sóc khách hàng ', 'Phòng chăm sóc khách hàng', 3, 'sangkien-80.pdf'),
(81, 'Xây dựng hệ thống chấm điểm sáng kiến', 21, 'Dễ dàng lưu trữ, thay thế chấm trên giấy', 'Phát triển trang web quản lý hồ sơ quy trình và chấm điểm sáng kiến', 'Tiện lợi, tiết kiệm thời gian tổng hợp đánh giá sáng kiến ', 'Áp dụng trong đợt sáng kiến của công ty', 3, 'sangkien-81.pdf'),
(85, 'Phát triển AI scan chuyển tài liệu giấy sang tài liệu số', 22, 'Chuyển tài liệu lưu trữ trên giấy sang tài liệu số lưu trữ trên cơ sở dữ liệu', 'Phát triển trí tuệ nhân tạo nhận dạng chuẩn hóa tài liệu giấy sang tài liệu số, thuận tiện lưu trữ trên cơ sở dữ liệu', 'Thuận tiện cho việc lưu trữ, giảm thiểu công việc cho nhân viên', 'Tất cả phòng ban', 3, 'sangkien-85.pdf'),
(86, 'Tiếp thị gói cưới có ưu đãi tại các vùng nông thôn', 22, 'Nâng cao doanh số bán hàng', 'Tiếp thị các gói cưới gia đình, nhiều ưu đãi tại các vùng nông thôn', 'Nâng cao doanh số bán hàng', 'Phòng marketing', 3, 'sangkien-86.pdf'),
(90, 'Phát triển dịch vụ chặn tin nhắn rác cho thuê bao mobifone', 23, 'Nâng cao chất lượng trải nghiệm cho khách hàng', 'Phát triển trí tuệ nhân tạo nhận dạng và chặn tin nhắn rác, spam cho các khách hàng đăng ký dịch vụ', 'Nâng cao chất lượng phục vụ khách hàng', 'Phòng chăm sóc khách hàng', 3, 'sangkien-90.pdf'),
(91, 'Sáng kiến chữ ký điện tử trong thanh toán online cho khách hàng', 23, 'Nâng cao bảo mật, nâng cao trải nghiệm khách hàng', 'Xây dựng bộ chữ ký điện tử cho từng khách hàng', 'Nâng cao bảo mật, khách hàng yên tâm hơn khi sử dụng dịch vụ', 'Phòng công nghệ thông tin', 4, 'sangkien-91.pdf'),
(95, 'Dịch vụ nhạc chờ miễn phí cho các thuê bao học sinh, sinh viên', 24, 'Thu hút đăng ký thuê bao mới', 'Thêm dịch vụ nhạc chờ miễn phí cho các thuê bao học sinh, sinh viên', 'Thu hút khách hàng, nâng cao doanh số', 'Khách hàng là học sinh, sinh viên', 3, 'sangkien-95.pdf'),
(96, 'Thành lập câu lạc bộ thể dục thể thao', 24, 'Nâng cao sức khỏe công nhân viên trong công ty,tăng hiệu suất làm việc', 'Mở các đợt thi đấu thể thao, tập thể dục 5 giờ sáng ', 'Nâng cao sức khỏe, chất lượng công việc', 'Tất cả các phòng ban', 3, 'sangkien-96.pdf'),
(100, 'Phát triển dịch vụ ghép đôi thu hút khách hàng độc thân', 25, 'Thu hút, nâng cao doanh thu bán hàng, hướng tới khách hàng còn độc thân', 'Trao đổi thông tin đối tượng phù hợp giữa các khách hàng tham gia dịch vụ', 'Thu hút khách hàng, nâng cao doanh số bán hàng', 'Khách hàng', 3, 'sangkien-100.pdf'),
(101, 'Thành lập phòng nghiên cứu khoa học, trí tuệ nhân tạo', 25, 'Phát triển các phần mềm   giúp ích cho  công việc trong công ty', 'Xây dựng phòng nghiên cứu khoa học, thành lập nhóm nghiên cứu khoa học', 'Nâng cao chất lượng công việc trong công ty', 'Phòng kế hoạch và đầu tư', 3, 'sangkien-101.pdf'),
(105, 'Tặng quà tri ân ngày thành lập công ty', 26, 'Thu hút khách hàng, nâng cao doanh số bán hàng', 'Tặng quà cho các hàng đăng ký mới thuê bao trong tuần lễ kỷ niệm thành lập công ty', 'Tăng thiện cảm với khách hàng, nâng cao doanh số, thu hút khách hàng', 'Phòng chăm sóc khách hàng', 3, 'sangkien-102.pdf'),
(106, 'Hợp tác vói một số tựa game nổi tiếng phát hành gói cước ưu đã', 26, 'Nâng cao doanh số bán hàng', 'Hợp tác với garena liên quân phát hành gói cưới khuyến mại cho game thủ', 'Nâng cao doanh số bán hàng', 'Phòng marketing', 3, 'sangkien-106.pdf'),
(110, 'Xây dựng dự án phát triển dịch vụ wifi tại thương hiệu mobifone', 27, 'Thâm nhập thị trường mạng không dây tại nhà', 'Phát triển hệ thống mạng wifi tại nhà theo từng gói cước cho khách hàng', 'Mở rộng thị trường, nâng cao doanh thu ', 'Phòng kế hoạch và đầu tư', 3, 'sangkien-110.pdf'),
(111, 'Tạo Bot hướng dẫn khách hàng đăng ký số thuê bao online', 27, 'Thuận tiện trong đăng ký thuê bao mới', 'Xây dựng Bot hướng dẫn khách hàng đăng ký thuê bao mới, sim thuê bao được gửi cho khách hàng qua đường bưu điện', 'Tiết kiệm thời gian, thuận tiện cho khách hàng', 'Phòng bán hàng và Marketing', 3, 'sangkien-111.pdf'),
(120, 'Sáng kiến phòng xả stress cho nhân viên', 28, 'Giảm căng thẳng cho nhân viên, nâng cao chất lượng làm việc', 'Xây dựng phòng giảm căng thẳng, cung cấp các hoạt động giải trí, ngồi ghế massage, nghe nhạc thư giãn, thiền trong giờ giải lao', 'Giảm căng thẳng, nâng cao năng suất làm việc, đảm bảo sức khỏe công nhân viên', 'Tất cả các phòng ban', 2, 'sangkien-120.pdf'),
(121, 'Áp dụng chữ ký điện tử trong ký xét duyệt các giấy tờ cần thiết 72', 28, 'Giảm thiểu thời gian xét duyệt, đảm bảo bảo mật, tiện lợi trong xử lý công việc', 'Xây dựng bộ chữ ký cho cán bộ trong công ty', 'Tiết kiệm thời gian xét duyệt, tiện lợi có thể sử dụng mọi lúc mọi nơi', 'Tất cả các phòng ban', 2, 'sangkien-121.pdf'),
(126, 'Áp dụng mô hình quảng cáo bằng nhân vật 3D, xây dựng cốt truyện mobiphone giúp gần gũi người dùng hơ', 28, 'Xây dựng 3 tập video quảng cáo demo với nhân vật 3D', 'Thiết kế cốt truyện về mobiphone.\r\nXây dụng nhân vật hợp lý.\r\nÁp dụng công nghê vào xây dựng.\r\nXem và kiểm thử chất lượng, thuần phong mỹ tục gửi lên công ty.', 'Quảng bá hình ảnh thương hiệu mobiphone tới người dùng', 'Phòng marketing', 2, 'sangkien-126.pdf'),
(127, 'Thanh toán cước mobiphone qua ví điện tử Mobi', 28, 'Xây dụng phát triển ví điện tử Mobi nhầm thu phí dịch vụ hoặc mua gói mạng', 'Nghiên cứu đánh giá thị thường\r\nPhân tích hệ thống\r\nxây dụng hệ thống \r\nđánh giá , kiểm thử', 'Giúp người dùng có một nơi tin cậy và an toàn để mua gói cước và nạp thẻ', 'Phòng chăm sóc khách hàng', 2, NULL),
(128, 'Tích điểm thanh toán xăng với mobi banking', 28, 'Hoàn thành hệ thống, quảng bá tới khách hàng', 'Tìm hiểu phân tích thị trường\r\nLiên kết với các nhà xăng, tham khảo giá và thảo luận về discount\r\nTính và đưa ra mức tỷ hối hợp lý', 'Khách hàng có thể thanh toán bằng điểm tích lũy khi mua gói mạng', 'Khách hàng sử dụng gói mạng của mobiphone', 2, NULL),
(129, 'Xây dựng trạm bán thẻ nạp tự động', 28, 'Thuận tiện trong giao dịch', 'Nghiên cứu và phát triển trạm bán thẻ nạp tự động giúp thuận tiện cho khách hàng', 'Khách hàng có thể mua sản phẩm qua nhiều cách thức, tăng doanh thu', 'Khách hàng sử dụng dịch vụ của mobifone', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `tentaikhoan` varchar(255) NOT NULL,
  `matkhau` varchar(255) NOT NULL,
  `manhanvien` int(11) NOT NULL,
  `maquyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`tentaikhoan`, `matkhau`, `manhanvien`, `maquyen`) VALUES
('An@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 24, 5),
('hdkhoahoc@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 2, 2),
('krdhieuhp20@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 1, 1),
('thaoanh@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 50, 1),
('truongdai@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 3, 3),
('truongphongbanhang@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 33, 3),
('truongphongcntt@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 11, 3),
('truongphongcskh@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 7, 3),
('truongphongketoan@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 18, 3),
('truongphongkhdn@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 20, 3),
('truongphongkhdt@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 14, 3),
('truongphongkpp@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 19, 3),
('truongphongnghiencuu@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 37, 3),
('truongphongnhansu@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 45, 3),
('truongphongtchc@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 106, 3),
('truongphongtonghop@gmail.com', '$2a$10$ja/18x84F6LLbUz4xegqiekGYJ9q/u1QAvOa3tNsEv0ApexHbJS0m', 93, 1),
('truongphongtxt@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 22, 3),
('user06@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 6, 4),
('user08@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 8, 4),
('user09@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 9, 4),
('user105@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 105, 4),
('user10@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 10, 4),
('user12@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 12, 4),
('user13@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 13, 4),
('user15@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 15, 4),
('user16@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 16, 4),
('user17@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 17, 4),
('user21@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 21, 4),
('user23@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 23, 4),
('user25@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 25, 4),
('user26@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 26, 4),
('user27@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 27, 4),
('user28@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 28, 4),
('user29@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 29, 4),
('user30@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 30, 4),
('user31@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 31, 4),
('user32@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 32, 4),
('user34@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 34, 4),
('user35@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 35, 4),
('user36@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 36, 4),
('user38@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 38, 4),
('user39@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 39, 4),
('user40@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 40, 4),
('user41@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 41, 4),
('user42@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 42, 4),
('user43@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 43, 4),
('user44@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 44, 4),
('user46@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 46, 4),
('user47@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 47, 4),
('user48@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 48, 4),
('user49@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 49, 4),
('user52@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 52, 4),
('user53@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 53, 4),
('user54@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 54, 4),
('user55@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 55, 4),
('user56@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 56, 4),
('user57@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 57, 4),
('user58@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 58, 4),
('user59@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 59, 4),
('user60@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 60, 4),
('user61@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 61, 4),
('user62@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 62, 4),
('user63@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 63, 4),
('user64@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 64, 4),
('user65@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 65, 4),
('user66@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 66, 4),
('user67@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 67, 4),
('user68@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 68, 4),
('user69@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 69, 4),
('user70@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 70, 4),
('user71@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 71, 4),
('user72@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 72, 4),
('user73@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 73, 4),
('user74@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 74, 4),
('user75@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 75, 4),
('user76@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 76, 4),
('user77@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 77, 4),
('user78@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 78, 4),
('user79@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 79, 4),
('user80@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 80, 4),
('user81@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 81, 4),
('user82@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 82, 4),
('user83@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 83, 4),
('user84@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 84, 4),
('user85@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 85, 4),
('user86@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 86, 4),
('user87@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 87, 4),
('user88@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 88, 4),
('user89@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 89, 4),
('user90@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 90, 4),
('user91@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 91, 4),
('user92@gmail.com', '$2a$10$n.1QxJZzmuXoUke9zE9B9OI35Gee8LxVBaH2qNpr3S0oI9qqKL8Pm', 92, 4),
('uyvien03@gmail.com', '$2a$10$nS5MtPakrr.Qp3hn4fkf2OEPF1COWY3dDc0CC9T20BRWCYziHGrNq', 3, 2),
('uyvien04@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 4, 2),
('uyvien05@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `thanhvienhoidong`
--

CREATE TABLE `thanhvienhoidong` (
  `mathanhvien` int(11) NOT NULL,
  `mahoidong` int(11) NOT NULL,
  `manhanvien` int(11) NOT NULL,
  `machucvuhd` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `thanhvienhoidong`
--

INSERT INTO `thanhvienhoidong` (`mathanhvien`, `mahoidong`, `manhanvien`, `machucvuhd`) VALUES
(59, 11, 1, 1),
(60, 11, 2, 2),
(61, 11, 3, 3),
(62, 11, 4, 3),
(63, 11, 5, 3),
(64, 11, 6, 4),
(65, 11, 93, 5),
(66, 12, 1, 1),
(67, 12, 2, 2),
(68, 12, 3, 3),
(69, 12, 4, 3),
(70, 12, 5, 3),
(71, 12, 6, 4),
(72, 12, 93, 5),
(73, 13, 1, 1),
(74, 13, 2, 2),
(75, 13, 3, 3),
(76, 13, 4, 3),
(77, 13, 5, 3),
(78, 13, 6, 4),
(79, 13, 93, 5),
(80, 14, 1, 1),
(81, 14, 2, 2),
(82, 14, 3, 3),
(83, 14, 4, 3),
(84, 14, 5, 3),
(85, 14, 6, 4),
(86, 14, 93, 5),
(94, 15, 1, 1),
(95, 15, 2, 2),
(96, 15, 3, 3),
(97, 15, 4, 3),
(98, 15, 5, 3),
(99, 15, 6, 4),
(100, 15, 93, 5),
(103, 17, 3, 3),
(104, 17, 4, 3),
(105, 17, 5, 3),
(106, 17, 6, 4),
(107, 17, 93, 5),
(116, 17, 10, 1),
(117, 17, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `trangthaisangkien`
--

CREATE TABLE `trangthaisangkien` (
  `matrangthai` int(11) NOT NULL,
  `tentrangthai` varchar(100) NOT NULL,
  `motatrangthai` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trangthaisangkien`
--

INSERT INTO `trangthaisangkien` (`matrangthai`, `tentrangthai`, `motatrangthai`) VALUES
(1, 'Chờ duyệt', NULL),
(2, 'Đang triển khai', NULL),
(3, 'Hoàn thành', NULL),
(4, 'Không được duyệt', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `xeploai`
--

CREATE TABLE `xeploai` (
  `maxeploai` int(11) NOT NULL,
  `tenxeploai` varchar(100) NOT NULL,
  `motaxeploai` varchar(255) DEFAULT NULL,
  `mucthuong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `xeploai`
--

INSERT INTO `xeploai` (`maxeploai`, `tenxeploai`, `motaxeploai`, `mucthuong`) VALUES
(1, 'Xuất Sắc', '9 < điểm trung bình =< 10', 2000000),
(2, 'Giỏi', '8 < điểm trung bình =< 9', 1500000),
(3, 'Khá', '6 < điểm trung bình =< 8', 1000000),
(4, 'Trung Bình', '5 =< điểm trung bình < 6\n', 800000),
(5, 'Yếu', 'điểm trung bình < 5 hoặc không bảo vệ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `xetduyet`
--

CREATE TABLE `xetduyet` (
  `manhanvien` int(11) NOT NULL,
  `masangkien` int(11) NOT NULL,
  `ngayxetduyet` date NOT NULL,
  `lydotuchoi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `xetduyet`
--

INSERT INTO `xetduyet` (`manhanvien`, `masangkien`, `ngayxetduyet`, `lydotuchoi`) VALUES
(3, 27, '2019-07-04', NULL),
(7, 12, '2020-02-09', NULL),
(7, 15, '2020-02-09', NULL),
(7, 60, '2017-02-10', NULL),
(7, 65, '2017-02-10', NULL),
(7, 80, '2018-07-03', NULL),
(7, 90, '2019-07-04', NULL),
(7, 100, '2020-07-03', NULL),
(7, 105, '2021-02-08', NULL),
(11, 3, '2021-02-08', NULL),
(11, 5, '2020-07-03', NULL),
(11, 8, '2022-06-10', NULL),
(11, 9, '2022-06-10', NULL),
(11, 10, '2021-02-08', NULL),
(11, 11, '2021-02-08', NULL),
(11, 13, '2019-07-04', NULL),
(11, 26, '2019-02-08', NULL),
(11, 37, '2018-07-03', NULL),
(11, 49, '2022-06-10', NULL),
(11, 53, '2018-02-06', NULL),
(11, 56, '2017-07-05', NULL),
(11, 70, '2017-07-05', NULL),
(11, 71, '2017-07-05', NULL),
(11, 75, '2018-02-06', NULL),
(11, 81, '2018-07-03', NULL),
(11, 91, '2019-07-04', 'Sáng kiến không đạt yêu cầu'),
(11, 127, '2022-06-10', NULL),
(11, 128, '2022-06-10', NULL),
(11, 129, '2022-06-10', NULL),
(14, 7, '2022-06-10', NULL),
(14, 101, '2020-07-03', NULL),
(14, 110, '2021-07-06', NULL),
(18, 54, '2018-02-06', NULL),
(19, 34, '2020-02-09', NULL),
(19, 76, '2018-02-06', NULL),
(19, 120, '2022-06-10', NULL),
(19, 121, '2022-06-10', NULL),
(20, 14, '2021-02-08', NULL),
(22, 85, '2019-02-08', NULL),
(33, 4, '2020-07-03', NULL),
(33, 6, '2020-07-03', NULL),
(33, 29, '2019-07-04', NULL),
(33, 55, '2018-02-06', NULL),
(33, 57, '2017-07-05', NULL),
(33, 61, '2017-02-10', NULL),
(33, 66, '2017-07-05', NULL),
(33, 86, '2019-02-08', NULL),
(33, 95, '2020-02-09', NULL),
(33, 96, '2020-02-09', NULL),
(33, 106, '2021-02-08', NULL),
(33, 111, '2021-07-06', NULL),
(33, 126, '2022-06-10', NULL),
(37, 38, '2019-02-08', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chitietchamdiem`
--
ALTER TABLE `chitietchamdiem`
  ADD PRIMARY KEY (`mathanhvien`,`masangkien`),
  ADD KEY `masangkien` (`masangkien`);

--
-- Indexes for table `chucvu`
--
ALTER TABLE `chucvu`
  ADD PRIMARY KEY (`machucvu`);

--
-- Indexes for table `chucvuhd`
--
ALTER TABLE `chucvuhd`
  ADD PRIMARY KEY (`machucvuhd`);

--
-- Indexes for table `danhgiasangkien`
--
ALTER TABLE `danhgiasangkien`
  ADD PRIMARY KEY (`masangkien`,`maxeploai`),
  ADD KEY `maxeploai` (`maxeploai`);

--
-- Indexes for table `dotsangkien`
--
ALTER TABLE `dotsangkien`
  ADD PRIMARY KEY (`madotsangkien`);

--
-- Indexes for table `hoidongkhoahoc`
--
ALTER TABLE `hoidongkhoahoc`
  ADD PRIMARY KEY (`mahoidong`);

--
-- Indexes for table `khenthuong`
--
ALTER TABLE `khenthuong`
  ADD PRIMARY KEY (`makhenthuong`),
  ADD KEY `masangkien` (`masangkien`);

--
-- Indexes for table `lichsuhanhdong`
--
ALTER TABLE `lichsuhanhdong`
  ADD PRIMARY KEY (`mahanhdong`),
  ADD KEY `manhanvien` (`manhanvien`);

--
-- Indexes for table `nguoithamgia`
--
ALTER TABLE `nguoithamgia`
  ADD PRIMARY KEY (`manhanvien`,`masangkien`),
  ADD KEY `masangkien` (`masangkien`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`manhanvien`),
  ADD KEY `maphongban` (`maphongban`),
  ADD KEY `machucvu` (`machucvu`);

--
-- Indexes for table `nhanxet`
--
ALTER TABLE `nhanxet`
  ADD PRIMARY KEY (`manhanxet`),
  ADD KEY `mathanhvien` (`mathanhvien`),
  ADD KEY `masangkien` (`masangkien`);

--
-- Indexes for table `phongban`
--
ALTER TABLE `phongban`
  ADD PRIMARY KEY (`maphongban`);

--
-- Indexes for table `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`maquyen`);

--
-- Indexes for table `sangkien`
--
ALTER TABLE `sangkien`
  ADD PRIMARY KEY (`masangkien`),
  ADD KEY `madotsangkien` (`madotsangkien`),
  ADD KEY `matrangthai` (`matrangthai`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`tentaikhoan`),
  ADD KEY `manhanvien` (`manhanvien`),
  ADD KEY `taikhoan_ibfk_1` (`maquyen`);

--
-- Indexes for table `thanhvienhoidong`
--
ALTER TABLE `thanhvienhoidong`
  ADD PRIMARY KEY (`mathanhvien`),
  ADD KEY `mahoidong` (`mahoidong`),
  ADD KEY `manhanvien` (`manhanvien`),
  ADD KEY `machucvuhd` (`machucvuhd`);

--
-- Indexes for table `trangthaisangkien`
--
ALTER TABLE `trangthaisangkien`
  ADD PRIMARY KEY (`matrangthai`);

--
-- Indexes for table `xeploai`
--
ALTER TABLE `xeploai`
  ADD PRIMARY KEY (`maxeploai`);

--
-- Indexes for table `xetduyet`
--
ALTER TABLE `xetduyet`
  ADD PRIMARY KEY (`manhanvien`,`masangkien`),
  ADD KEY `masangkien` (`masangkien`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chucvu`
--
ALTER TABLE `chucvu`
  MODIFY `machucvu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `chucvuhd`
--
ALTER TABLE `chucvuhd`
  MODIFY `machucvuhd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dotsangkien`
--
ALTER TABLE `dotsangkien`
  MODIFY `madotsangkien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `hoidongkhoahoc`
--
ALTER TABLE `hoidongkhoahoc`
  MODIFY `mahoidong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `khenthuong`
--
ALTER TABLE `khenthuong`
  MODIFY `makhenthuong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `lichsuhanhdong`
--
ALTER TABLE `lichsuhanhdong`
  MODIFY `mahanhdong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `manhanvien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `nhanxet`
--
ALTER TABLE `nhanxet`
  MODIFY `manhanxet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `phongban`
--
ALTER TABLE `phongban`
  MODIFY `maphongban` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `quyen`
--
ALTER TABLE `quyen`
  MODIFY `maquyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sangkien`
--
ALTER TABLE `sangkien`
  MODIFY `masangkien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `thanhvienhoidong`
--
ALTER TABLE `thanhvienhoidong`
  MODIFY `mathanhvien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `trangthaisangkien`
--
ALTER TABLE `trangthaisangkien`
  MODIFY `matrangthai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `xeploai`
--
ALTER TABLE `xeploai`
  MODIFY `maxeploai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chitietchamdiem`
--
ALTER TABLE `chitietchamdiem`
  ADD CONSTRAINT `chitietchamdiem_ibfk_1` FOREIGN KEY (`masangkien`) REFERENCES `sangkien` (`masangkien`),
  ADD CONSTRAINT `chitietchamdiem_ibfk_2` FOREIGN KEY (`mathanhvien`) REFERENCES `thanhvienhoidong` (`mathanhvien`);

--
-- Constraints for table `danhgiasangkien`
--
ALTER TABLE `danhgiasangkien`
  ADD CONSTRAINT `danhgiasangkien_ibfk_1` FOREIGN KEY (`masangkien`) REFERENCES `sangkien` (`masangkien`),
  ADD CONSTRAINT `danhgiasangkien_ibfk_2` FOREIGN KEY (`maxeploai`) REFERENCES `xeploai` (`maxeploai`);

--
-- Constraints for table `khenthuong`
--
ALTER TABLE `khenthuong`
  ADD CONSTRAINT `khenthuong_ibfk_1` FOREIGN KEY (`masangkien`) REFERENCES `sangkien` (`masangkien`);

--
-- Constraints for table `lichsuhanhdong`
--
ALTER TABLE `lichsuhanhdong`
  ADD CONSTRAINT `lichsuhanhdong_ibfk_1` FOREIGN KEY (`manhanvien`) REFERENCES `nhanvien` (`manhanvien`);

--
-- Constraints for table `nguoithamgia`
--
ALTER TABLE `nguoithamgia`
  ADD CONSTRAINT `nguoithamgia_ibfk_1` FOREIGN KEY (`manhanvien`) REFERENCES `nhanvien` (`manhanvien`),
  ADD CONSTRAINT `nguoithamgia_ibfk_2` FOREIGN KEY (`masangkien`) REFERENCES `sangkien` (`masangkien`);

--
-- Constraints for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `nhanvien_ibfk_1` FOREIGN KEY (`maphongban`) REFERENCES `phongban` (`maphongban`),
  ADD CONSTRAINT `nhanvien_ibfk_2` FOREIGN KEY (`machucvu`) REFERENCES `chucvu` (`machucvu`);

--
-- Constraints for table `nhanxet`
--
ALTER TABLE `nhanxet`
  ADD CONSTRAINT `nhanxet_ibfk_1` FOREIGN KEY (`mathanhvien`) REFERENCES `thanhvienhoidong` (`mathanhvien`),
  ADD CONSTRAINT `nhanxet_ibfk_2` FOREIGN KEY (`masangkien`) REFERENCES `sangkien` (`masangkien`);

--
-- Constraints for table `sangkien`
--
ALTER TABLE `sangkien`
  ADD CONSTRAINT `sangkien_ibfk_1` FOREIGN KEY (`madotsangkien`) REFERENCES `dotsangkien` (`madotsangkien`),
  ADD CONSTRAINT `sangkien_ibfk_2` FOREIGN KEY (`matrangthai`) REFERENCES `trangthaisangkien` (`matrangthai`);

--
-- Constraints for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `taikhoan_ibfk_1` FOREIGN KEY (`maquyen`) REFERENCES `quyen` (`maquyen`),
  ADD CONSTRAINT `taikhoan_ibfk_2` FOREIGN KEY (`manhanvien`) REFERENCES `nhanvien` (`manhanvien`);

--
-- Constraints for table `thanhvienhoidong`
--
ALTER TABLE `thanhvienhoidong`
  ADD CONSTRAINT `thanhvienhoidong_ibfk_1` FOREIGN KEY (`mahoidong`) REFERENCES `hoidongkhoahoc` (`mahoidong`),
  ADD CONSTRAINT `thanhvienhoidong_ibfk_2` FOREIGN KEY (`manhanvien`) REFERENCES `nhanvien` (`manhanvien`),
  ADD CONSTRAINT `thanhvienhoidong_ibfk_3` FOREIGN KEY (`machucvuhd`) REFERENCES `chucvuhd` (`machucvuhd`);

--
-- Constraints for table `xetduyet`
--
ALTER TABLE `xetduyet`
  ADD CONSTRAINT `xetduyet_ibfk_1` FOREIGN KEY (`manhanvien`) REFERENCES `nhanvien` (`manhanvien`),
  ADD CONSTRAINT `xetduyet_ibfk_2` FOREIGN KEY (`masangkien`) REFERENCES `sangkien` (`masangkien`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
