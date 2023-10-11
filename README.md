# TypeORM

This is a forked version of TypeORM v0.3.17, with patches for:
- Multi-statement SQL queries (only last result is returned)
- Resource scoping

## Development

```bash
git remote add upstream https://github.com/typeorm/typeorm.git
git fetch upstream
```

- Delete local `master`
- Branch off `upstream/master`
- Move patches over to a new version
- Push to a fork
- Create a PR

