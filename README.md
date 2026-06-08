# Lab 02 — Task Tracker API (MySQL + Sequelize)

Persistent REST API for managing tasks. Builds on Lab 01 by replacing the in-memory array with a MySQL database accessed through Sequelize.

---

## Prerequisites

- **Node.js** LTS
- **MySQL** running locally (or accessible via network)

---

## Database setup

Run once in your MySQL client:

```sql
CREATE DATABASE IF NOT EXISTS task_tracker_db;
```

Sequelize creates the `tasks` table automatically on first startup via `sequelize.sync()`.

> **Production note:** `sync()` is fine for development. Production apps should use Sequelize migrations (`sequelize-cli`) instead — they give you versioned, reversible schema changes.

---

## Environment configuration

Copy the template and fill in your MySQL password:

```bash
cp .env.example .env
```

Edit `.env`:

| Variable       | Description                        | Default     |
| -------------- | ---------------------------------- | ----------- |
| `PORT`         | HTTP port the server listens on    | `3000`      |
| `DB_HOST`      | MySQL host                         | `localhost` |
| `DB_PORT`      | MySQL port                         | `3306`      |
| `DB_NAME`      | Database name                      | `task_tracker_db` |
| `DB_USER`      | MySQL username                     | `root`      |
| `DB_PASSWORD`  | MySQL password                     | *(required)*|
| `DB_DIALECT`   | Sequelize dialect                  | `mysql`     |

`.env` is gitignored — never commit it.

---

## Install and run

```bash
npm install
npm run dev      # nodemon — restarts on file changes
```

On startup you should see:

```
✅ MySQL connection established
tasks table synced
Server running on http://localhost:3000
```

---

## Endpoints

Base path: `/api/tasks`

| # | Method   | Path             | Body                      | Success       | Errors                             |
| - | -------- | ---------------- | ------------------------- | ------------- | ---------------------------------- |
| — | GET      | `/health`        | —                         | `200`         | —                                  |
| 1 | GET      | `/api/tasks`     | —                         | `200` array   | —                                  |
| 2 | GET      | `/api/tasks/:id` | —                         | `200` task    | `400` invalid id · `404` not found |
| 3 | POST     | `/api/tasks`     | `{ title, completed? }`   | `201` task    | `400` invalid body                 |
| 4 | PUT      | `/api/tasks/:id` | `{ title?, completed? }`  | `200` task    | `400` invalid · `404` not found    |
| 5 | DELETE   | `/api/tasks/:id` | —                         | `204` no body | `400` invalid id · `404` not found |

### Sample task response

```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2026-06-08T10:15:00.000Z"
}
```

Error envelope:

```json
{
  "error": {
    "message": "Task not found",
    "status": 404
  }
}
```

---

## Manual testing

```bash
chmod +x tests/manual-tests.sh
./tests/manual-tests.sh
```
