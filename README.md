# employee-management

一个简陋的基于 Vue3 + Node.js + PostgreSQL 的员工管理系统

# 启动

启动 PostgreSQL

```bash
docker stop em-postgres
docker rm em-postgres
docker run -d \
	--name em-postgres \
	-p [::1]:5432:5432 \
	-e POSTGRES_PASSWORD=6 \
	-v ~yes/employee-management/pgdata:/var/lib/postgresql/data \
	--restart unless-stopped \
	--pull always \
	postgres:16-bookworm
```

建立数据库，运行 `server/sql/init.sql` 中的 SQL 语句

在 `client` 目录下执行

```bash
pnpm install
pnpm dev
```

在 `server` 目录下执行

```bash
pnpm install
node index.js
```