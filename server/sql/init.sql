DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users ( -- 用户表
    uid SERIAL PRIMARY KEY, -- 编号
    name VARCHAR(100), -- 姓名
    username VARCHAR(100), -- 学号
    phone VARCHAR(100), -- 手机
    email VARCHAR(100), -- 邮箱
    role VARCHAR(100) -- 角色
);

DROP TABLE IF EXISTS schedule CASCADE;
CREATE TABLE schedule ( -- 安排表
    id SERIAL PRIMARY KEY, -- 编号
    uid INTEGER REFERENCES users(uid), -- 用户编号
    start_time VARCHAR(100), -- 开始时间
    end_time VARCHAR(100), -- 结束时间
    location VARCHAR(100), -- 教室
    valid_status BOOLEAN -- 是否有效
);

DROP TABLE IF EXISTS sign CASCADE;
CREATE TABLE sign ( -- 签到表
    id SERIAL PRIMARY KEY, -- 编号
    uid INTEGER REFERENCES users(uid), -- 用户编号
    location VARCHAR(100), -- 教室
    time TIMESTAMP -- 签到时间
);

DROP TABLE IF EXISTS alter CASCADE;
CREATE TABLE alter ( -- （请假/加班）记录表
    id SERIAL PRIMARY KEY, -- 编号
    uid INTEGER REFERENCES users(uid), -- 用户编号
    start_time VARCHAR(100), -- 开始时间
    end_time VARCHAR(100), -- 结束时间
    location VARCHAR(100), -- 教室
    application_time TIMESTAMP, -- 申请时间
    valid_status BOOLEAN, -- 有效状态
    record_type VARCHAR(50) -- 记录类型，'leave' 或 'overtime'
);

INSERT INTO users (name, username, phone, email, role)
VALUES
('John', '21300001', '123', 'john@example.com', 'admin'),
('Jane', '21300002', '456', 'jane@example.com', 'user');

INSERT INTO schedule (uid, start_time, end_time, location, valid_status)
VALUES
(1, '2019-01-01 08:00:00', '2019-01-01 10:00:00', 'A101', true),
(1, '2019-01-01 10:00:00', '2019-01-01 12:00:00', 'A101', true),
(1, '2019-01-01 14:00:00', '2019-01-01 16:00:00', 'A101', true),
(1, '2019-01-01 16:00:00', '2019-01-01 18:00:00', 'A101', true),
(2, '2019-01-01 08:00:00', '2019-01-01 10:00:00', 'A101', true),
(2, '2019-01-01 10:00:00', '2019-01-01 12:00:00', 'A101', true),
(2, '2019-01-01 14:00:00', '2019-01-01 16:00:00', 'A101', true),
(2, '2019-01-01 16:00:00', '2019-01-01 18:00:00', 'A101', true);

INSERT INTO sign (uid, location, time)
VALUES
(1, 'A101', '2019-01-01 08:00:00'),
(1, 'A101', '2019-01-01 10:00:00'),
(1, 'A101', '2019-01-01 14:00:00'),
(1, 'A101', '2019-01-01 16:00:00'),
(2, 'A101', '2019-01-01 08:00:00'),
(2, 'A101', '2019-01-01 10:00:00'),
(2, 'A101', '2019-01-01 14:00:00'),
(2, 'A101', '2019-01-01 16:00:00');

INSERT INTO alter (uid, start_time, end_time, location, application_time, valid_status, record_type)
VALUES
(1, '2019-01-01 08:00:00', '2019-01-01 10:00:00', 'A101', '2019-01-01 00:00:00', true, 'leave'),
(1, '2019-01-01 10:00:00', '2019-01-01 12:00:00', 'A101', '2019-01-01 00:00:00', true, 'leave'),
(1, '2019-01-01 14:00:00', '2019-01-01 16:00:00', 'A101', '2019-01-01 00:00:00', true, 'leave'),
(1, '2019-01-01 16:00:00', '2019-01-01 18:00:00', 'A101', '2019-01-01 00:00:00', true, 'leave'),
(2, '2019-01-01 08:00:00', '2019-01-01 10:00:00', 'A101', '2019-01-01 00:00:00', true, 'leave'),
(2, '2019-01-01 10:00:00', '2019-01-01 12:00:00', 'A101', '2019-01-01 00:00:00', true, 'leave'),
(2, '2019-01-01 14:00:00', '2019-01-01 16:00:00', 'A101', '2019-01-01 00:00:00', true, 'leave'),
(2, '2019-01-01 16:00:00', '2019-01-01 18:00:00', 'A101', '2019-01-01 00:00:00', true, 'leave');
