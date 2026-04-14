# Toxiproxy

Este guia explica como usar o Toxiproxy para simular latência etc.

## Script para criar o proxy

```bash
docker exec -it toxiproxy /toxiproxy-cli create nome-do-proxy -l 0.0.0.0:13333 -u host.docker.internal:3333
```

Esse comando cria um proxy apontando para seu Nest local (`host.docker.internal:3333`) e escutando em `13333`.

### O que cada parte faz

- `docker exec -it toxiproxy`: executa o comando dentro do container do toxiproxy
- `/toxiproxy-cli`: CLI oficial do toxiproxy
- `create nome-do-proxy`: cria um novo proxy
- `-l 0.0.0.0:13333`: porta onde o proxy vai escutar
- `-u host.docker.internal:3333`: destino real (seu Nest local ou outro micro serviço)

## Listar proxies

```bash
docker exec -it toxiproxy /toxiproxy-cli list
```

## Aplicar latência usando o nome do proxy(exemplo: `backend-proxy`)

```bash
docker exec -it toxiproxy /toxiproxy-cli toxic add -t latency -a latency=2000 backend-proxy 
```

Isso adiciona 800ms de latencia com jitter de 200ms nas respostas para o cliente.

## Remover latencia

```bash
docker exec -it toxiproxy /toxiproxy-cli toxic remove backend-proxy -n latency_down
```
