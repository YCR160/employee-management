DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS schedule CASCADE;
DROP TABLE IF EXISTS sign CASCADE;
DROP TABLE IF EXISTS records CASCADE;

CREATE TABLE users ( -- 用户表
    uid SERIAL PRIMARY KEY, -- 编号
    name VARCHAR(100), -- 姓名
    username VARCHAR(100), -- 学号
    phone VARCHAR(100), -- 手机
    email VARCHAR(100), -- 邮箱
    role VARCHAR(100) -- 角色
);

CREATE TABLE schedule ( -- 安排表
    id SERIAL PRIMARY KEY, -- 编号
    uid INTEGER REFERENCES users(uid), -- 用户编号
    start_time TIMESTAMP, -- 开始时间
    end_time TIMESTAMP, -- 结束时间
    place VARCHAR(100) -- 教室
);

CREATE TABLE sign ( -- 签到表
    id SERIAL PRIMARY KEY, -- 编号
    uid INTEGER REFERENCES users(uid), -- 用户编号
    sign_time TIMESTAMP -- 签到时间
);

CREATE TABLE records ( -- （请假/加班）记录表
    id SERIAL PRIMARY KEY, -- 编号
    uid INTEGER REFERENCES users(uid), -- 用户编号
    start_time TIMESTAMP, -- 开始时间
    end_time TIMESTAMP, -- 结束时间
    classroom VARCHAR(100), -- 教室
    application_time TIMESTAMP, -- 申请时间
    valid_status BOOLEAN, -- 有效状态
    record_type VARCHAR(50) -- 记录类型，'leave' 或 'overtime'
);