-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2022 at 06:12 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `trungbinhtong` (OUT `tbmucdich` FLOAT, OUT `tbnoidung` FLOAT, OUT `tbungdung` FLOAT, OUT `tbtrinhbay` FLOAT, IN `masangkien` INT)   BEGIN
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
(12, 7, 7, 7.5, 7.8, 7.3),
(12, 8, 8, 7, 7.5, 8),
(13, 7, 5, 8, 6, 7.5),
(13, 8, 8, 7, 6.5, 8),
(14, 7, 7, 6.9, 7.5, 8),
(14, 8, 7, 5, 9, 7),
(19, 9, 9, 8, 7.8, 7.3),
(20, 9, 7, 8, 6.5, 7.5),
(21, 9, 9, 8, 7, 8),
(24, 3, 9, 9, 8.5, 9),
(24, 5, 8.5, 8, 8, 7.9),
(26, 3, 10, 9, 10, 10),
(26, 5, 10, 9, 7, 5);

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
(1, 'Giám đốc', ''),
(2, 'Phó giám đốc', ''),
(3, 'Trưởng Đài', ''),
(4, 'Trưởng phòng', ''),
(7, 'Phó phòng', ''),
(8, 'Phó phụ trách', ''),
(9, 'Nhân viên', ''),
(10, 'Quản lý', '');

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
(1, 'Chủ tịch Hội đồng', ''),
(2, 'Phó chủ tịch HĐ', ''),
(3, 'Ủy viên HĐ', ''),
(4, 'Ủy viên thường trực HĐ', ''),
(5, 'Thư ký HĐ', '');

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
(3, 1),
(4, 5),
(5, 3),
(7, 4),
(8, 4),
(25, 5);

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
(3, 'Sáng tạo mùa hè 2020', 0, '2020-03-01 00:00:00', '2020-08-01 00:00:00', '2020-04-01 00:00:00', '2020-07-20 00:00:00'),
(4, 'Sáng tạo đông xuân 2020-2021', 0, '2020-01-09 00:00:00', '2021-01-02 00:00:00', '2020-01-10 00:00:00', '2021-01-25 00:00:00'),
(5, 'Sáng tạo hè thu 2022', 1, '2022-01-01 00:00:00', '2022-06-30 00:00:00', '2022-06-22 00:00:00', '2022-06-20 00:00:00');

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
(4, '2020-03-01', '2022-05-20', 'nhiệm vụ 1\r\nnhiệm vụ 2\r\nnhiệm vụ 3', 0),
(5, '2021-01-30', '2022-05-20', '', 0),
(6, '2022-01-02', '2022-05-29', '                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n                    \n                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n                    \n                    \n                    \n                    \n                    \n                    ', 1);

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
(6, 3, 1000000),
(8, 5, 700000),
(9, 4, 500000);

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
(1, 25, 0, NULL),
(7, 4, 0, NULL),
(26, 3, 0, NULL),
(27, 3, 1, NULL),
(28, 5, 0, NULL),
(29, 6, 0, NULL),
(30, 7, 0, NULL),
(31, 8, 0, NULL),
(32, 9, 0, NULL),
(33, 10, 0, NULL),
(38, 23, 0, NULL),
(38, 24, 0, NULL);

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
(1, 1, 1, 'Nguyễn Đăng Khoa', 'Tiến sĩ', 1, '1973-02-01', '0393368623', '2010-01-23', 1),
(2, 1, 1, 'Nguyễn Trọng An', 'Tiến sĩ', 1, '1985-12-01', '0345123678', '2010-01-23', 1),
(3, 11, 3, 'Phạm Tuấn Anh', 'Tiến sĩ', 1, '1975-12-05', '0393368645', '2010-01-23', 1),
(4, 1, 1, 'Lê Tuấn Anh', 'Tiến sĩ', 1, '1984-02-25', '0125486597', '2015-02-03', 1),
(5, 12, 7, 'Vũ Thị Thu Hằng', 'Tiến sĩ', 0, '1996-03-13', '0393364582', '2010-01-23', 1),
(6, 12, 7, 'Nguyễn Bá Luyện', 'Tiến sĩ', 1, '1989-07-19', '0124578956', '2010-01-23', 1),
(7, 8, 4, 'Phạm Thị Hà Ngân', 'Thạc sĩ', 0, '1983-05-10', '0124578923', '2010-01-23', 1),
(8, 8, 8, 'Nguyễn Thị Hồng Thanh', 'Thạc sĩ', 0, '1983-06-10', '0154578923', '2010-01-23', 1),
(9, 8, 7, 'Nguyễn Trung Thành', 'Đại học', 1, '1999-12-23', '0312458765', '2021-01-12', 1),
(10, 8, 7, 'Nguyễn Thành Trung', 'Đại học', 1, '1999-12-23', '0312458565', '2021-01-12', 1),
(11, 3, 4, 'Phạm Đức Trọng', 'Thạc sĩ', 1, '1986-03-13', '0312448795', '2010-01-23', 1),
(12, 3, 7, 'Phạm Thị Hoài Hương', 'Thạc sĩ', 0, '1976-04-23', '0312484795', '2015-01-23', 1),
(13, 3, 7, 'Phạm Thị Thu Cúc', 'Đại học', 0, '1996-05-23', '0312484645', '2020-01-23', 1),
(14, 4, 4, 'Võ Mạnh Hùng', 'Tiến sĩ', 1, '1975-04-12', '0312484654', '2020-01-23', 1),
(15, 4, 7, 'Ngô Bá Khá', 'Thạc sĩ', 1, '1978-04-12', '0312484654', '2013-01-23', 1),
(16, 4, 7, 'Phạm Hoa Đồng', 'Thạc sĩ', 0, '1980-07-24', '0312479458', '2013-01-23', 1),
(17, 1, 1, 'Nguyễn Quang Hoàn', 'Thạc sĩ', 1, '1987-02-15', '0393368642', '2014-02-03', 1),
(18, 5, 7, 'Phùng Thị Thuý Hằng', 'Thạc sĩ', 0, '1984-05-14', '0783368645', '2014-01-23', 1),
(19, 6, 4, 'Nguyễn Bạch Dương', 'Tiến sĩ', 1, '1984-01-23', '0393368624', '2015-02-03', 1),
(20, 7, 4, 'Nguyễn Thị Ngọc Linh', 'Tiến sĩ', 1, '1984-02-03', '0393368624', '2015-02-03', 1),
(21, 9, 7, 'Trần Văn Sơn', 'Tiến sĩ', 1, '1986-02-05', '0393368645', '2015-02-03', 1),
(22, 10, 4, 'Bùi Minh Thịnh', 'Tiến sĩ', 1, '1982-01-08', '0393368624', '2012-01-23', 1),
(23, 10, 7, 'Trịnh Hòa Bình', 'Thạc sĩ', 1, '1984-02-05', '0393368624', '2012-06-06', 1),
(24, 2, 9, 'Nguyễn Văn An', 'Đại học', 1, '2000-12-21', '0393368624', '2020-02-01', 1),
(25, 4, 9, 'Lê Thi Hường', 'Đại học', 0, '1980-08-19', '0393368624', '2010-01-05', 1),
(26, 8, 9, 'Phạm Mỹ Hoa', 'Đại học', 0, '2000-12-01', '0393368645', '2021-12-02', 1),
(27, 7, 9, 'Phạm Như Ngọc', 'Đại học', 0, '2000-04-14', '0393368645', '2020-02-03', 1),
(28, 3, 9, 'Nguyễn Quang Hùng', 'Đại học', 1, '2000-05-19', '0258347758', '2022-01-12', 1),
(29, 4, 9, 'Đào Mạnh Thái', 'Đại học', 1, '2000-05-15', '0124578465', '2022-02-23', 1),
(30, 4, 9, 'Phạm Khác Đạt', 'Đại học', 1, '1999-12-23', '0124578956', '2022-01-12', 1),
(31, 4, 9, 'Phạm Quang Trưởng', 'Đại học', 1, '1996-03-13', '0124578956', '2022-01-12', 1),
(32, 10, 9, 'Trần Tô Ngọc', 'Đại học', 0, '1983-05-10', '0393368645', '2012-02-23', 1),
(33, 3, 9, 'Nguyễn Trung Hiếu', 'Đại học', 1, '2000-05-10', '0393368645', '2021-01-12', 1),
(34, 3, 9, 'Nguyễn Hữu Trung Hiếu', 'Đại học', 1, '2000-05-18', '0124523956', '2021-12-15', 1),
(35, 11, 9, 'Nguyễn Mỹ Hoa', 'Đại học', 1, '1999-12-23', '0154376623', '2022-05-11', 1),
(36, 4, 9, 'Tống Song Thư', 'Đại học', 1, '2001-02-25', '0184567845', '2022-03-15', 1),
(37, 1, 4, 'Trương Nhược Trần', 'Đại Học', 1, '2000-12-18', '0123456788', '2015-01-01', 1),
(38, 1, 9, 'Lạc Thủy Hàn', 'Đại Học', 0, '2001-12-18', '0345123678', '2019-06-29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `nhanxet`
--

CREATE TABLE `nhanxet` (
  `manhanxet` int(11) NOT NULL,
  `mathanhvien` int(11) NOT NULL,
  `masangkien` int(11) NOT NULL,
  `noidung` text NOT NULL,
  `thoigiannhanxet` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nhanxet`
--

INSERT INTO `nhanxet` (`manhanxet`, `mathanhvien`, `masangkien`, `noidung`, `thoigiannhanxet`) VALUES
(1, 24, 3, '   \r\n                \r\n                \r\n                ', '2022-05-27'),
(2, 24, 5, '                                                                               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\r\n                \r\n                \r\n                \r\n                ', '2022-05-26'),
(3, 26, 5, 'test2asdas', '2022-05-29'),
(4, 26, 3, 'test', '2022-05-29');

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
(1, 'Công ty Dịch vụ MobiFone Khu vực 5', '2010-01-23', ''),
(2, 'Phòng Chăm sóc khách hàng', '2010-01-23', ''),
(3, 'Phòng Công nghệ Thông tin', '2010-01-23', ''),
(4, 'Phòng Kế hoạch – Đầu tư', '2010-01-23', ''),
(5, 'Phòng kế toán', '2010-01-23', 'Thực hiện công việc về nghiệp vụ chuyên môn tài chính kế toán theo quy định của Nhà nước\r\nTheo dõi sự vận động vốn kinh doanh của doanh nghiệp dưới mọi hình thái và cố vấn cho Ban lãnh đạo về các vấn đề liên quan.\r\nTham mưu cho Ban Tổng Giám đốc về chế độ kế toán và những thay đổi qua từng thời kỳ trong hoạt động kinh doanh.\r\nCùng với các bộ phận khác tạo nên mạng lưới thông tin quản lý nhân sự, tài chính,…'),
(6, 'Phòng Kênh phân phối', '2010-01-23', ''),
(7, 'Phòng Khách hàng Doanh nghiệp', '2010-01-23', ''),
(8, 'Phòng chăm sóc khách hàng', '2010-01-23', ''),
(9, 'Phòng Tổ chức – Hành chính', '2010-01-23', ''),
(10, 'Tổ xét thầu', '2010-01-23', ''),
(11, 'Đài 1090', '2010-01-23', ''),
(12, 'Phòng Bán hàng & Marketing', '2010-01-23', '');

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
(3, 'Cải tiến bộ thu phát sóng 4g tại địa bàn quận hải an', 5, 'Mang lại trải nghiệm mượt mà hơn cho khách hàng', 'Tăng cao tốc độ đường truyền 4G tại Hải An. \r\nChuyển đổi thiết bị cũ thành thiết bị mới hiện đại hơn', 'Tốc độ đường truyền được tăng giúp bán được nhiều gói mạng hơn', 'Phòng bán hàng maketing sẽ có nhiều cái để quảng cáo', 2, 'sangkien-25.pdf'),
(4, 'Thắp sáng ước mơ 4G miễn phí', 5, 'Giúp người dùng có thể tích lũy và sử dụng 4G miễn phí. Tăng trưởng đăng ký gói cước', 'Khi người dùng đăng ký gói mạng 4G của mobiphone sẽ được cộng một tổng điểm tích lũy từ đó có thể đăng ký gói mạng 4G trong thời gian nhất định. Với mỗi lần đăng ký gói mạng 4G từ 30.000 VNĐ - 80.000 VNĐ sẽ được cộng 20 điểm tích lũy. Đăng ký gói cao hơn sẽ được cộng 40 điểm. Khi có đủ 500 điểm người dùng có thể đổi 1 ngày dùng 4G miễn phí tốc độ cao.', 'Thúc đẩy đăng ký gói mạng của công ty', 'Phân phói bán hàng, tăng doanh thu mua gói 4G', 2, 'sangkien-25.pdf'),
(5, 'Phát triển ứng dụng mobiphone banking trên điện thoại', 5, 'Tạo ra môi trường giao dịch, mua thẻ, tích điểm, mua gói data một cách nhanh chóng qua ứng dụng.', 'Sử dụng android studio với ngôn ngữ java, môi trường SDK 22, android lolipop phù hợp với đa số các dòng máy hiện tại đảm bảo an toàn tiện nghi hữu ích. Phát triển đẩy mạnh mua sắm các gói cước một cách trực tiếp đối với khách hàng. Xử lý đơn hàng 1 cách nhanh chóng. Hạn chế được việc tiếp xúc hay giao dịch trực tiếp.', 'Kích thích nhu cầu mua sắm online từ khách hàng. Nơi để khách hàng theo dõi cập nhật thông tin khuyễn mãi thường xuyên', 'Phòng công nghệ thông tin sẽ phân tích thiết kế hệ thống và tạo lập chương trình', 3, 'sangkien-25.pdf'),
(6, 'Tiến hành hỗ trợ thay thế thẻ cào bằng máy in đối với các cơ sở hợp tác bán thẻ của mobiphone', 5, 'Tiến hành lắp đặt 100% máy in mã thẻ với các cơ sở đối tác bán hàng ở trên phường Vạn Mỹ để không còn phải mua trước số lượng thẻ cao như trước.', 'Tiến hành thay thế thiết bị in thẻ với các đối tác của mobiphone', 'Việc phân phối mã thẻ tới các đối tác được trở lên thuận tiện hơn, một phần để khách hàng không gặp trợ ngại khi hết thẻ phải đi quán khác\r\n', 'phòng liên hệ công chúng  liên hệ với các đối tác bàn bạc việc lắp đặt. đội thi công lắp đặt. lập bảng biếu mức đánh giá và doanh thu', 3, 'sangkien-25.pdf'),
(7, 'Tiến hành xây dựng lắp đặt mạng mobiphone tại 1 số khu vực Hải Phòng', 3, 'Phát triển thêm lĩnh vực mới.', 'Như đã biết Viettel phát triển hệ thống wifi riêng. Với tư cách là một nhà mạng lớn tại Việt Nam thì sao chúng ta không làm được. Phát triển mạng wifi dành cho hộ gia đình. ', 'Mở rộng kinh doanh. Phát triển ngành nghề. Gia tăng cơ hội việc làm. Giúp mobiphone trở nên gần ', 'Phòng ban kế hoạch và đầu tư', 3, 'sangkien-25.pdf'),
(8, 'Xây dựng hệ thống map và hướng dẫn đường đi cho lái xe', 3, 'Phát triển hệ thống map mang thương hiệu mobiphone', 'Xây dựng hệ thống chỉ đường mobimap giúp lái xe dễ dàng hơn. Quảng cáo cho mobiphone . Ưu tiên hiện thị các điểm giao dịch của mobiphone', 'Người lái xe dễ dàng tìm thấy các điểm truy nhập mobiphone. Môt phần quảng cáo cho mobiphone gần hơn với người tiêu dùng', 'Phát triển hệ thống cho người lái xe , shiper và cả những người cần đến nó', 3, 'sangkien-25.pdf'),
(9, 'Áp dụng công nghệ Ai nào tính toán chi tiết xếp hạng và mức xét thầu', 4, 'Dự toán mức xét thầu một cách chính xác và gần giá', 'Đưa công nghệ Ai tính toán rủi ro xét thầu, tổng thiệt hại. Hướng phát triển trong tương lại để đưa ra mức xet thầu hợp lý và cạnh tranh', 'Giảm chi phí xét thầu. Tăng tỷ lệ xét thầu thành công', 'Công việc ở phòng xét thầu được tổ chức chặt chẽ, logic . Vận hành hệ thống tính toán đưa ra mức rủi ro , mức độ trúng thầu. Tầm giá định hướng trong tương lai có thể đặt được', 3, 'sangkien-25.pdf'),
(10, 'Phát triển ưu tiên đường truyền mạng vào giờ cao điểm', 4, 'Nhằm cải thiện truy cập tới các trang được ưu tiên mang tính quan trọng cấp thiết.', 'Hạn chế truy nhập với việc load các video từ mạng xã hội facebook. Hạn chế băng thông tới các trang game hay trang web giải trí. Ưu tiên đường truyền tới các web trường, bệnh viện, cục cứu phòng chống và cứu nạn để tiện cho việc liên hệ. Hay một số trang web liên kết tới diễn đàn học tập để tìm tài liệu', 'Giúp học sinh, sinh viên dễ dàng hơn trong tìm kiếm tài liệu học tập giờ cao điểm.', 'Phòng công nghệ thông tin nghiên cứu và phát triển hệ thống', 3, 'sangkien-25.pdf'),
(23, 'Lacthuyhanasdadasdasdasd', 5, 'Lacthuyhanasdadasdasdasd', 'lacthuyhanasdadasdasdasd', 'Lacthuyhanasdadasdasdasd', 'Lacthuyhanasdadasdasdasd', 3, 'sangkien-25.pdf'),
(24, 'Test up file', 5, 'Á', 'ád', 'Đâsd', 'Adasd', 3, 'sangkien-25.pdf'),
(25, 'Adaasdasdtesst upload', 5, 'Ádasdasdas', 'đâsdasd', 'Adasdas', 'Dấdasdasd', 2, 'sangkien-25.pdf');

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
('admin@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 1, 1),
('giamkhao@gmail.com', '$2a$10$1uNlJ1xR1BwJ13usser7aOP3RAtzBu3EAliS9uuiO.3Z2kBPbJRWy', 24, 2),
('hdkhoahoc@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 2, 2),
('ngan98@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 7, 1),
('nhanvienphong1@gmail.com', '$2a$10$nKDpdqaAu2DPkmZYoErkseWuvBPPFKHhGsnv8BqyWH3KHEF3CRw82', 38, 4),
('truongphong1@gmail.com', '$2a$10$TUeLebej07LicTpCgwvY2uFEvz.q6giFxyjgvBeaId7PCdvBVNehG', 37, 3),
('truongphong@gmail.com', '$2a$10$yj61sgBtnThfMyQfoHJUeubXs4uSL3KkdLnlm6uMBR.DM5576Cj4O', 11, 3),
('tuananh@gmail.com', '$2a$10$./bAOonV0QRqR6P.X/25jeULdN9eWrvcZC39joRnnFkg3cIXBnZoO', 3, 2);

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
(10, 4, 1, 1),
(11, 4, 2, 2),
(12, 4, 3, 3),
(13, 4, 4, 3),
(14, 4, 5, 3),
(15, 4, 6, 4),
(16, 4, 7, 5),
(17, 5, 1, 1),
(18, 5, 2, 2),
(19, 5, 3, 3),
(20, 5, 4, 3),
(21, 5, 9, 3),
(22, 5, 12, 4),
(23, 5, 15, 5),
(24, 6, 9, 2),
(25, 6, 3, 3),
(26, 6, 2, 1),
(27, 6, 7, 3),
(28, 6, 5, 3),
(29, 6, 11, 4),
(36, 6, 12, 5);

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
  `motaxeploai` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `xeploai`
--

INSERT INTO `xeploai` (`maxeploai`, `tenxeploai`, `motaxeploai`) VALUES
(1, 'Xuất Sắc', '9 < tb =< 10'),
(2, 'Giỏi', '8 < tb =< 9'),
(3, 'Khá', '7 < tb =< 8'),
(4, 'Trung Bình', '5 =< tb =<7'),
(5, 'Yếu', 'tb < 5 hoặc không bảo vệ');

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
(1, 6, '2022-05-29', NULL),
(1, 23, '2022-05-29', 'tesfasdasdasd'),
(1, 25, '2022-05-30', NULL),
(30, 7, '2020-02-09', NULL),
(31, 8, '2020-02-09', NULL),
(33, 10, '2021-02-09', 'Dự án không khả thi. Giải pháp đưa ra không chi tiết, không đáp ứng tính thực tế'),
(37, 24, '2022-05-30', NULL);

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
  MODIFY `madotsangkien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hoidongkhoahoc`
--
ALTER TABLE `hoidongkhoahoc`
  MODIFY `mahoidong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `khenthuong`
--
ALTER TABLE `khenthuong`
  MODIFY `makhenthuong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `manhanvien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `nhanxet`
--
ALTER TABLE `nhanxet`
  MODIFY `manhanxet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `phongban`
--
ALTER TABLE `phongban`
  MODIFY `maphongban` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `quyen`
--
ALTER TABLE `quyen`
  MODIFY `maquyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sangkien`
--
ALTER TABLE `sangkien`
  MODIFY `masangkien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `thanhvienhoidong`
--
ALTER TABLE `thanhvienhoidong`
  MODIFY `mathanhvien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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
