# First time Setup

This guide will walk you through the process of getting our stack to run on your dev machine.

<br>

## Operating System

All our code runs on Linux. If you're already on Linux that's great!<br>
If you're on Windows, you can run Linux inside of your Windows via [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

<br>

## Requirements

If you've read the [prerequisites](./Prerequisites.md), you already have these installed and can jump to the next step 😎

- [Docker](https://www.docker.com/) in Swarm Mode.
- [Bun](https://bun.sh/docs/cli/install) as npm replacement (it's fast, like really fast)

<br>

## Deployment

To run our stack, you only need to build it once, and then deploy it. The scripts are found in the root directory.
<br>

To build our Docker images:

```sh
bash build.sh [dev/prod/staging]
```

<br>

To deploy the stack to Docker Swarm:

```sh
bash deploy.sh [dev/prod/staging]
```

<br>

## Setting secrets

This is only relevant if you work with services that require secrets, such as Discord bots. (For a full list of requirements, check the table below)
<br>

Secrets can be added with the following command

```sh
printf "your secret" | docker secret create your-secret-name -
```

<br>

## Microservices

If everything is set up correctly, you should see these services with `docker service ls`

| Name                                                        | Description                                     | Port       | Secrets      |
| ----------------------------------------------------------- | ----------------------------------------------- | ---------- | ------------ |
| [census](/services/census/) 🔹                              | Internally relays Census data                   | -/-        | -/-          |
| [peepo](/services/peepo/) 🔹                                | Planetside2 Companion                           | -/-        | peepo-token  |
| [jaeger](/services/jaeger/) 🔹                              | Jaeger character verification                   | -/-        | jaeger-token |
| [population](/services/population/) 🔹                      | Real-time population data                       | :3000      | -/-          |
| [population-db](https://github.com/postgres/postgres) 🔹    | Postgres                                        | :5672      | -/-          |
| [players](/services/players/) 🔹                            | Planetside character information                | :3000      | -/-          |
| [players-db](https://github.com/postgres/postgres) 🔹       | Postgres                                        | :5672      | -/-          |
| [friends](/services/players/) 🔹                            | Global alt-wide friend list                     | :3000      | -/-          |
| [friends-db](https://github.com/postgres/postgres) 🔹       | Postgres                                        | :5672      | -/-          |
| [users](/services/users/)                                   | Verifies and links users on different platforms | :3000      | -/-          |
| [users-db](https://github.com/postgres/postgres) 🔹         | Postgres                                        | :5672      | -/-          |
| alts                                                        | Matches alt characters                          | :3000/3030 | -/-          |
| [alts_db](https://github.com/mongodb/mongo) 🔹              | Mongodb                                         | :27017     | -/-          |
| [redis](https://github.com/redis/redis) 🔹                  | Caches expensive operations                     | :6379      | -/-          |
| [rabbitmq](https://github.com/rabbitmq/rabbitmq-server) 🔹  | Inter-service communication                     | :5672      | -/-          |
| [registry](https://github.com/distribution/distribution) 🔹 | Hosts Docker images                             | :5000      | -/-          |

Services with a 🔹 are open source. Please ask for access if you need to work with a private service.<br>
Production secrets can be generated with [/docker/create-secrets.sh](/docker/create-secrets.sh).

<br>

---

<br>

### Next guide for beginners: [First Time Setup](/docs/First-Time-Setup.md)
