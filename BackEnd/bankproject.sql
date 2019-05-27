-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2019 at 02:46 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iohbank`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountinfo`
--

CREATE TABLE `accountinfo` (
  `AccountID` int(10) NOT NULL,
  `AccountType` int(3) NOT NULL,
  `ClientID` int(10) NOT NULL,
  `Bank` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Balance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `accounttype`
--

CREATE TABLE `accounttype` (
  `AccountType` int(3) NOT NULL,
  `AccountTypeName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Detail` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `Condition` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `Gain` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `billpamentdata`
--

CREATE TABLE `billpamentdata` (
  `PaymentID` int(10) NOT NULL,
  `FormalAccount` int(10) NOT NULL,
  `CustomerName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `CustomerAddress` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Total` double NOT NULL,
  `EXP` date NOT NULL,
  `Type` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Status` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clientinfo`
--

CREATE TABLE `clientinfo` (
  `ClientID` int(10) NOT NULL,
  `FName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `LName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Tel` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Gender` varchar(6) COLLATE utf8_unicode_ci NOT NULL,
  `IDCardNumber` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `Nationality` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `BloodType` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DateOfBirth` date NOT NULL,
  `Username` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `clientinfo`
--

INSERT INTO `clientinfo` (`ClientID`, `FName`, `LName`, `Tel`, `Address`, `Email`, `Gender`, `IDCardNumber`, `Nationality`, `BloodType`, `DateOfBirth`, `Username`, `Password`) VALUES
(1, 'Jariwat', 'Phansri', '', '', '', '', '', '', NULL, '0000-00-00', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `DiscountID` int(10) NOT NULL,
  `ProductName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `ProductPrice` double NOT NULL,
  `Discount` float NOT NULL,
  `StoreID` int(10) NOT NULL,
  `Detail` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `formalaccount`
--

CREATE TABLE `formalaccount` (
  `FormalAccountID` int(10) NOT NULL,
  `Name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `Address` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `Contract` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `freegift`
--

CREATE TABLE `freegift` (
  `FreeGiftID` int(10) NOT NULL,
  `GiftName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `GiftType` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Price` double NOT NULL,
  `StoreID` int(10) NOT NULL,
  `Total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderbill`
--

CREATE TABLE `orderbill` (
  `OrderBillID` int(10) NOT NULL,
  `AccountID` int(10) NOT NULL,
  `PaymentID` int(10) NOT NULL,
  `Date` date NOT NULL,
  `Memo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Star` tinyint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ordertransaction`
--

CREATE TABLE `ordertransaction` (
  `OrderID` int(10) NOT NULL,
  `AccountID` int(10) NOT NULL,
  `AccountIDRecive` int(10) NOT NULL,
  `Money` double NOT NULL,
  `Date` date NOT NULL,
  `Memo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Star` tinyint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `PromotionID` int(10) NOT NULL,
  `PromotionName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `DiscountID` int(10) DEFAULT NULL,
  `FreeGiftID` int(10) DEFAULT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotionusing`
--

CREATE TABLE `promotionusing` (
  `PromotionUsingID` int(10) NOT NULL,
  `AccountID` int(10) NOT NULL,
  `PromotionID` int(10) NOT NULL,
  `DateOfUse` date NOT NULL,
  `Star` tinyint(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `StoreID` int(10) NOT NULL,
  `StoreName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Location` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ManagerName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Contract` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountinfo`
--
ALTER TABLE `accountinfo`
  ADD PRIMARY KEY (`AccountID`),
  ADD KEY `FK` (`AccountType`),
  ADD KEY `FK2` (`ClientID`);

--
-- Indexes for table `accounttype`
--
ALTER TABLE `accounttype`
  ADD PRIMARY KEY (`AccountType`);

--
-- Indexes for table `billpamentdata`
--
ALTER TABLE `billpamentdata`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `FormalAccountID` (`FormalAccount`);

--
-- Indexes for table `clientinfo`
--
ALTER TABLE `clientinfo`
  ADD PRIMARY KEY (`ClientID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `IDCardNumber` (`IDCardNumber`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`DiscountID`),
  ADD KEY `StoreID2` (`StoreID`);

--
-- Indexes for table `formalaccount`
--
ALTER TABLE `formalaccount`
  ADD PRIMARY KEY (`FormalAccountID`);

--
-- Indexes for table `freegift`
--
ALTER TABLE `freegift`
  ADD PRIMARY KEY (`FreeGiftID`),
  ADD KEY `StoreID` (`StoreID`);

--
-- Indexes for table `orderbill`
--
ALTER TABLE `orderbill`
  ADD PRIMARY KEY (`OrderBillID`),
  ADD KEY `AccountID2` (`AccountID`),
  ADD KEY `PaymentID2` (`PaymentID`);

--
-- Indexes for table `ordertransaction`
--
ALTER TABLE `ordertransaction`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `AccountID` (`AccountID`),
  ADD KEY `AccountRCID` (`AccountIDRecive`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`PromotionID`),
  ADD KEY `DiscountID` (`DiscountID`),
  ADD KEY `FreeGiftID` (`FreeGiftID`);

--
-- Indexes for table `promotionusing`
--
ALTER TABLE `promotionusing`
  ADD PRIMARY KEY (`PromotionUsingID`),
  ADD KEY `AccountID` (`AccountID`),
  ADD KEY `PromotionID` (`PromotionID`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`StoreID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountinfo`
--
ALTER TABLE `accountinfo`
  MODIFY `AccountID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `accounttype`
--
ALTER TABLE `accounttype`
  MODIFY `AccountType` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `billpamentdata`
--
ALTER TABLE `billpamentdata`
  MODIFY `PaymentID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clientinfo`
--
ALTER TABLE `clientinfo`
  MODIFY `ClientID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `DiscountID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `formalaccount`
--
ALTER TABLE `formalaccount`
  MODIFY `FormalAccountID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `freegift`
--
ALTER TABLE `freegift`
  MODIFY `FreeGiftID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderbill`
--
ALTER TABLE `orderbill`
  MODIFY `OrderBillID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ordertransaction`
--
ALTER TABLE `ordertransaction`
  MODIFY `OrderID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `PromotionID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promotionusing`
--
ALTER TABLE `promotionusing`
  MODIFY `PromotionUsingID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `StoreID` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accountinfo`
--
ALTER TABLE `accountinfo`
  ADD CONSTRAINT `FK` FOREIGN KEY (`AccountType`) REFERENCES `accounttype` (`AccountType`),
  ADD CONSTRAINT `FK2` FOREIGN KEY (`ClientID`) REFERENCES `clientinfo` (`ClientID`);

--
-- Constraints for table `billpamentdata`
--
ALTER TABLE `billpamentdata`
  ADD CONSTRAINT `FormalAccountID` FOREIGN KEY (`FormalAccount`) REFERENCES `formalaccount` (`FormalAccountID`);

--
-- Constraints for table `discount`
--
ALTER TABLE `discount`
  ADD CONSTRAINT `StoreID2` FOREIGN KEY (`StoreID`) REFERENCES `store` (`StoreID`);

--
-- Constraints for table `freegift`
--
ALTER TABLE `freegift`
  ADD CONSTRAINT `StoreID` FOREIGN KEY (`StoreID`) REFERENCES `store` (`StoreID`);

--
-- Constraints for table `orderbill`
--
ALTER TABLE `orderbill`
  ADD CONSTRAINT `AccountID2` FOREIGN KEY (`AccountID`) REFERENCES `accountinfo` (`AccountID`),
  ADD CONSTRAINT `PaymentID2` FOREIGN KEY (`PaymentID`) REFERENCES `billpamentdata` (`PaymentID`);

--
-- Constraints for table `ordertransaction`
--
ALTER TABLE `ordertransaction`
  ADD CONSTRAINT `AccountID` FOREIGN KEY (`AccountID`) REFERENCES `accountinfo` (`AccountID`),
  ADD CONSTRAINT `AccountRCID` FOREIGN KEY (`AccountIDRecive`) REFERENCES `accountinfo` (`AccountID`);

--
-- Constraints for table `promotion`
--
ALTER TABLE `promotion`
  ADD CONSTRAINT `DiscountID` FOREIGN KEY (`DiscountID`) REFERENCES `discount` (`DiscountID`),
  ADD CONSTRAINT `FreeGiftID` FOREIGN KEY (`FreeGiftID`) REFERENCES `freegift` (`FreeGiftID`);

--
-- Constraints for table `promotionusing`
--
ALTER TABLE `promotionusing`
  ADD CONSTRAINT `PromotionID` FOREIGN KEY (`PromotionID`) REFERENCES `promotion` (`PromotionID`),
  ADD CONSTRAINT `promotionusing_ibfk_1` FOREIGN KEY (`AccountID`) REFERENCES `accountinfo` (`AccountID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
