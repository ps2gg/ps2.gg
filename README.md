# ps2.gg

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/49991ab701ef4eb0a0a29f947ac4a1fc)](https://app.codacy.com/gh/ps2gg/ps2.gg/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Discord](https://img.shields.io/discord/1090392395427885198.svg?logo=discord)](https://discord.gg/8MvTaUQM2E)

<br>

This is the home of ps2.gg, where UI mods are made that turn Planetside into a better game.<br>
This monorepo includes all microservices used to serve the website, overlay and auxiliary applications.

<br>

## Development

Need help to get started?

[Hit us up on Discord!](https://discord.gg/8MvTaUQM2E) We'll guide you through any part of the development process, so you can focus on building features.
<br>

The [/docs](/docs) folder also contains step-by-step guides to get you started in every type of project.

<br>

## Deployment

The following scripts will get you started with a running stack:
<br>
`bash build.sh [dev/prod/staging]` will build the necessary files
<br>
`bash deploy.sh [dev/prod/staging]` will deploy the stack to Docker Swarm
<br>

### Requirements

* [Docker](https://www.docker.com/) in Swarm Mode.
* [Bun](https://bun.sh/docs/cli/install) as npm replacement (it's fast, like really fast)
* The required docker secrets (see table below)
  <br>

**Please note**: Not all services are open source, so you may need to adjust the docker-compose.yml to match your level of access. (accessibilities are described in the table below)

<br>

## Microservices

| Name                                                        | Description                                     | Port       | Secrets      |
|-------------------------------------------------------------|-------------------------------------------------|------------|--------------|
| [census](/services/census/) 🔹                              | Relays Census data internally                   | -/-        | -/-          |
| [peepo](/services/peepo/) 🔹                                | Metadata analysis bot                           | -/-        | peepo-token  |
| [jaeger](/services/jaeger/) 🔹                              | Jaeger character verification                   | -/-        | jaeger-token |
| [population](/services/population/) 🔹                      | Real-time population data                       | :3000      | -/-          |
| [population-db](https://github.com/postgres/postgres) 🔹    | Postgres                                        | :5672      | -/-          |
| [players](/services/players/) 🔹                            | Planetside character information                | :3000      | -/-          |
| [players-db](https://github.com/postgres/postgres) 🔹       | Postgres                                        | :5672      | -/-          |
| [friends](/services/players/) 🔹                            | Global alt-wide friend list                                | :3000      | -/-          |
| [friends-db](https://github.com/postgres/postgres) 🔹       | Postgres                                        | :5672      | -/-          |
| [users](/services/users/)                                   | Verifies and links users on different platforms | :3000      | -/-          |
| [users-db](https://github.com/postgres/postgres) 🔹         | Postgres                                        | :5672      | -/-          |
| alts                                                        | Matches alt characters                          | :3000/3030 | -/-          |
| [alts_db](https://github.com/mongodb/mongo) 🔹              | Mongodb                                         | :27017     | -/-          |
| [redis](https://github.com/redis/redis) 🔹                  | Caches expensive operations                     | :6379      | -/-          |
| [rabbitmq](https://github.com/rabbitmq/rabbitmq-server) 🔹  | Inter-service message queue                     | :5672      | -/-          |
| [registry](https://github.com/distribution/distribution) 🔹 | Hosts Docker images                             | :5000      | -/-          |

Services with a 🔹 denote that they're open source.<br>
Production secrets can be generated with [/docker/create-secrets.sh](/docker/create-secrets.sh).

<br>

## Code Conventions

Our code-style is fully managed by eslint and prettier, so you needn't think too much about it. Just make sure to install their extensions in your IDE and enable auto-formatting, so they fix your code automatically.
<br>
For commits, please use the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) format.

<br>

## License

You are permitted to copy and modify this software for the sole purpose of pull requests and other collaboration in the official ps2.gg repository. When contributing, you keep the ownership of your contributed works, but grant us an irrevocable permission to use, copy, modify, merge, publish, distribute, sublicense and/or sell copies thereof.

For private, commercial, or any other purposes not specified above, all rights are reserved.

Should we ever become unable to maintain the project, we will choose a fitting copyleft license and transfer the ownership to the community.
