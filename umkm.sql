-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2024 at 10:38 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `umkm`
--

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `id` int(11) NOT NULL,
  `nama_menu` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `harga_pesanan` decimal(8,2) DEFAULT NULL,
  `jumlah_pesanan` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `nama_menu` varchar(255) DEFAULT NULL,
  `jenis_menu` varchar(255) DEFAULT NULL,
  `stock_menu` int(11) DEFAULT NULL,
  `harga_menu` decimal(8,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `img_menu` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `nama_menu`, `jenis_menu`, `stock_menu`, `harga_menu`, `description`, `img_menu`, `createdAt`, `updatedAt`) VALUES
(1, 'Es Campur', 'minuman', 50, 12.00, 'Minuman menyegarkan dengan campuran es buah dan sirup', '../img/esbuah.jpg', '2024-06-06 08:22:01', '2024-06-06 08:22:01'),
(2, 'Es Kelapa Muda', 'minuman', 50, 12.00, 'Minuman Kelapa muda yang segar dan manis di mulut', '../img/kelapamuda.jpg', '2024-06-06 08:22:17', '2024-06-06 08:22:17'),
(3, 'Es Teh', 'minuman', 50, 7.00, 'Teh Manis yang segar dengan tambahan es batu', '../img/esteh.jpg', '2024-06-06 08:22:31', '2024-06-06 08:22:31'),
(4, 'Pempek telor', 'makanan', 50, 4.50, 'Pempek yang terbuat dari ikan tenggiri dengan isi tolor didalam nya', '../img/pempektelor.jpg', '2024-06-06 08:22:47', '2024-06-06 08:22:47'),
(5, 'Pempek kulit', 'makanan', 50, 4.50, 'Pempek yang terbuat dari ikan tenggiri dengan bentuk seperti kulit', '../img/pempekkulit.jpg', '2024-06-06 08:22:59', '2024-06-06 08:22:59'),
(6, 'Pempek kapal Selem', 'makanan', 50, 25.00, 'Pempek telor yang ged dan dicampur cuka dan potongan timun', '../img/kapalselem.jpg', '2024-06-06 08:23:14', '2024-06-06 08:23:14');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `order` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `jumlah_pesanan` int(11) DEFAULT NULL,
  `harga_pesanan` varchar(255) DEFAULT NULL,
  `deskripsi_pesanan` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `nickname`, `email`, `phoneNumber`, `password`, `role`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'John Doe', 'johndoe123', 'johndoe@example.com', '123456789', '$2b$10$.VYvOMGX8JTgk9lW/F0rAeZPaFkZSLpCnHEhbNbxOX6lpiXIJObw.', NULL, NULL, '2024-05-26 05:01:09', '2024-05-26 05:01:09'),
(2, 'John Doe', 'johndoe123', 'johndoe@example.com', '123456789', '$2b$10$ukZjQB6PAO2F48AkKiHdE.FzGPqILIAWuF0MmOb2CGsBfwL9mtpOq', 'user', NULL, '2024-05-26 05:07:19', '2024-05-26 05:07:19'),
(7, 'Ahmad Rifki Ayala', 'ds', 'ayalarifki@gmail.com', '082184952582', '$2b$10$p2am8CeWlG2bftkbJpaaFOTQZ//9i0jQvA0FXMEZhknYSk42J2f.K', 'user', NULL, '2024-05-27 16:01:31', '2024-05-27 16:01:31'),
(8, 'dinda Sanjaya', 'dinda', 'Dinda@gmail.com', '085622352709', '$2b$10$QbeKBtMa./iCw3W1s/bw.e9tBFF6Rm9VGKGU..aTN4.SoH1gT7MbK', 'user', NULL, '2024-05-29 20:29:50', '2024-05-29 20:29:50'),
(9, 'John Doe', '', 'johndoe@example.com', '', '$2b$10$C9vgjAK3X2NNmyLt8pw/FeqbCR5TnHfnEbgMDpsWuGZvOLxPYbYX6', 'user', NULL, '2024-06-06 03:00:53', '2024-06-06 03:00:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
