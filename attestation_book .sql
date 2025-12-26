-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 27 2025 г., 00:37
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `attestation_book`
--

-- --------------------------------------------------------

--
-- Структура таблицы `attestation_book`
--

CREATE TABLE `attestation_book` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `discipline_id` int(11) NOT NULL,
  `report_type_id` int(11) NOT NULL,
  `grade` varchar(10) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `attestation_book`
--

INSERT INTO `attestation_book` (`id`, `student_id`, `discipline_id`, `report_type_id`, `grade`, `date`) VALUES
(3, 2, 1, 67, '5', '2025-12-27'),
(4, 5, 7, 69, 'незачёт', '2025-12-27'),
(5, 4, 4, 67, '3', '2025-12-27'),
(6, 3, 2, 69, 'незачёт', '2025-10-16');

-- --------------------------------------------------------

--
-- Структура таблицы `discipline`
--

CREATE TABLE `discipline` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `discipline`
--

INSERT INTO `discipline` (`id`, `name`) VALUES
(1, 'Математика'),
(2, 'Программирование'),
(3, 'Базы данных'),
(4, 'Веб-технологии'),
(5, 'Алгоритмы и структуры данных'),
(6, 'Операционные системы'),
(7, 'Сетевые технологии'),
(8, 'Иностранный язык');

-- --------------------------------------------------------

--
-- Структура таблицы `report_type`
--

CREATE TABLE `report_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `report_type`
--

INSERT INTO `report_type` (`id`, `name`) VALUES
(67, 'Экзамен'),
(69, 'Зачёт');

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(255) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('2OJ6ufZfscHT1-Mhxi7UQDg7qxnqm51R', '2025-12-27 23:02:57', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-12-27T22:56:30.905Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"passport\":{\"user\":11}}', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `student_group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `student`
--

INSERT INTO `student` (`id`, `full_name`, `student_group_id`) VALUES
(1, 'Иванов Иван Иванович', 1),
(2, 'Петров Петр Петрович', 1),
(3, 'Сидорова Анна Владимировна', 2),
(4, 'Кузнецов Дмитрий Сергеевич', 3),
(5, 'Михайлова Ольга Александровна', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `student_group`
--

CREATE TABLE `student_group` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `student_group`
--

INSERT INTO `student_group` (`id`, `name`) VALUES
(1, '02261'),
(2, '02262'),
(3, '02361'),
(4, '02362'),
(5, '02461'),
(6, '02462');

-- --------------------------------------------------------

--
-- Структура таблицы `student_group_session`
--

CREATE TABLE `student_group_session` (
  `id` int(11) NOT NULL,
  `attestation_book_id` int(11) NOT NULL,
  `student_group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `teacher`
--

INSERT INTO `teacher` (`id`, `full_name`) VALUES
(1, 'Смирнов Александр Иванович'),
(2, 'Козлова Мария Петровна'),
(3, 'Васильев Дмитрий Сергеевич'),
(4, 'Петрова Елена Викторовна'),
(5, 'Иванов Сергей Михайлович');

-- --------------------------------------------------------

--
-- Структура таблицы `teacher_discipline`
--

CREATE TABLE `teacher_discipline` (
  `id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `discipline_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `teacher_discipline`
--

INSERT INTO `teacher_discipline` (`id`, `teacher_id`, `discipline_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 4),
(5, 3, 5),
(6, 3, 6),
(7, 4, 7),
(8, 5, 8);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123'),
(2, 'student', 'student123'),
(3, 'teacher', 'teacher123'),
(11, 'test', '$2b$10$mitmMkdBxYe3Cao92LS6Pek5xvt7/b8wEj3SxOrQ5RZVHBApAewje'),
(12, '123', '$2b$10$XJL1poSnbwUNnNAY0qSv9OFDCi.vKZfScqJPrFoMwRGMhdcPO0GMu');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `attestation_book`
--
ALTER TABLE `attestation_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `discipline_id` (`discipline_id`),
  ADD KEY `report_type_id` (`report_type_id`);

--
-- Индексы таблицы `discipline`
--
ALTER TABLE `discipline`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `report_type`
--
ALTER TABLE `report_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Индексы таблицы `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_group_id` (`student_group_id`);

--
-- Индексы таблицы `student_group`
--
ALTER TABLE `student_group`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `student_group_session`
--
ALTER TABLE `student_group_session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attestation_book_id` (`attestation_book_id`),
  ADD KEY `student_group_id` (`student_group_id`);

--
-- Индексы таблицы `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `discipline_id` (`discipline_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `attestation_book`
--
ALTER TABLE `attestation_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `discipline`
--
ALTER TABLE `discipline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `report_type`
--
ALTER TABLE `report_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT для таблицы `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `student_group`
--
ALTER TABLE `student_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `student_group_session`
--
ALTER TABLE `student_group_session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `attestation_book`
--
ALTER TABLE `attestation_book`
  ADD CONSTRAINT `attestation_book_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attestation_book_ibfk_2` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `attestation_book_ibfk_3` FOREIGN KEY (`report_type_id`) REFERENCES `report_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`student_group_id`) REFERENCES `student_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `student_group_session`
--
ALTER TABLE `student_group_session`
  ADD CONSTRAINT `student_group_session_ibfk_1` FOREIGN KEY (`attestation_book_id`) REFERENCES `attestation_book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_group_session_ibfk_2` FOREIGN KEY (`student_group_id`) REFERENCES `student_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `teacher_discipline`
--
ALTER TABLE `teacher_discipline`
  ADD CONSTRAINT `teacher_discipline_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacher_discipline_ibfk_2` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
