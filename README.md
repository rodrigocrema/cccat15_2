# Clean Code e Clean Architecture

Este conteúdo faz parte do curso Clean Code e Clean Architecture da [Branas.io](https://branas.io).

## Conexão com o Banco de Dados

### Conexão Root

```bash
psql -U postgres
```



### crie um superusuario pra voce 
```
CREATE USER crema WITH PASSWORD '123456';
ALTER USER crema WITH SUPERUSER;
```

### entre na docker para testar os comando do postgres 
```
➜  cccat15 git:(master) ✗ docker exec -it postgres /bin/sh 
psql -h postgres -p 5432 -U crema -d cccat15
#password: (digite) 123456
```

### comandos úteis
```
\c cccat15 (similar ao use database do mysql)
\l lista databases
\dt
cccat15=# \dt
         List of relations
 Schema  |   Name   | Type  | Owner 
---------+----------+-------+-------
 cccat15 | account  | table | crema
 cccat15 | position | table | crema
 cccat15 | ride     | table | crema
(3 rows)
```

### Rodar os testes (exemplo):
```
rodar teste:
docker exec -it node-app npx jest
```