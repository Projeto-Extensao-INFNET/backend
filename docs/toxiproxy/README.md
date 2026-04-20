# Toxiproxy

Este guia explica como usar o Toxiproxy para simular latência etc.

## Script para criar o proxy

```bash
docker exec -it toxiproxy /toxiproxy-cli create -l 0.0.0.0:13333 -u backend:3333 nome-do-proxy
```

Esse comando cria um proxy apontando para o backend no Compose (`backend:3333`) e escutando em `13333`.

### O que cada parte faz

- `docker exec -it toxiproxy`: executa o comando dentro do container do toxiproxy
- `/toxiproxy-cli`: CLI oficial do toxiproxy
- `create ... nome-do-proxy`: cria um novo proxy
- `-l 0.0.0.0:13333`: porta onde o proxy vai escutar
- `-u backend:3333`: destino real (o serviço backend do Compose)

## Listar proxies

```bash
docker exec -it toxiproxy /toxiproxy-cli list
```

## Remover proxy

```bash
docker exec -it toxiproxy /toxiproxy-cli delete nome-do-proxy
```

## Aplicar latência usando o nome do proxy(exemplo: `backend-proxy`)

```bash
docker exec -it toxiproxy /toxiproxy-cli toxic add -t latency -n latency_down -a latency=2000 nome-do-proxy
```

Isso adiciona 2000ms (2s) de latencia nas respostas para o cliente.

### O que cada parte faz

- `docker exec -it toxiproxy`: executa o comando dentro do container do toxiproxy
- `/toxiproxy-cli`: CLI oficial do toxiproxy
- `toxic add`: adiciona um novo toxic ao proxy
- `-t latency`: define o tipo do toxic como latência
- `-n latency`: define o nome do toxic, que depois será usado para remover ou atualizar
- `-a latency=2000`: define a latência em milissegundos
- `nome-do-proxy`: nome do proxy que vai receber o toxic

## Remover latencia

```bash
docker exec -it toxiproxy /toxiproxy-cli toxic remove -n latency nome-do-proxy
```

### O que cada parte faz

- `docker exec -it toxiproxy`: executa o comando dentro do container do toxiproxy
- `/toxiproxy-cli`: CLI oficial do toxiproxy
- `toxic remove`: remove um toxic já aplicado
- `-n latency`: informa o nome do toxic que será removido
- `nome-do-proxy`: nome do proxy que contém esse toxic
