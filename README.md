# ps2.gg

This is the home of ps2.gg, where UI mods are made that turn Planetside into a better game.<br>
This monorepo includes all microservices used to serve the website and overlay.

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
`bash build.sh [dev/prod]` will build the necessary files
<br>
`bash deploy.sh [dev/prod]` will deploy the stack to Docker Swarm
<br>

### Requirements

- [Docker](https://www.docker.com/) in Swarm Mode.
- [Bun](https://bun.sh/docs/cli/install) as npm replacement (it's fast, like really fast)
- The required docker secrets (see table below)
  <br>

**Please note**: Not all services are open source, so you may need to adjust the [docker-compose.yml](/docker/compose/out/docker-compose.dev.yml) to match your level of access. (accesibilities are described in the table below)

<br>

## Microservices

| Name                | Description                                     | Port       | Secrets             |
| ------------------- | ----------------------------------------------- | ---------- | ------------------- |
| census 🔹           | Internally relays Census data                   | -/-        | -/-                 |
| peepo 🔹            | Big Peepo Discord bot                           | -/-        | discord_token_peepo |
| population 🔹       | Real-time population data                       | :3000      | -/-                 |
| population-db 🔹    | Postgres                                        | :5672      | -/-                 |
| users               | Verifies and links users on different platforms | :3000      | -/-                 |
| users-db 🔹         | Postgres                                        | :5672      | -/-                 |
| alts                | Matches alt characters                          | :3000/3030 | -/-                 |
| alts_db 🔹          | Mongodb                                         | :27017     | -/-                 |
| redis 🔹            | Caches expensive operations                     | :6379      | -/-                 |
| rabbitmq 🔹         | Inter-service communication                     | :5672      | -/-                 |
| registry 🔹         | Hosts Docker images                             | :5000      | -/-                 |

Services with a 🔹 denote that they're open source.<br>
More secrets may be required for production deployments. See [docker-compose.prod.yml](/docker/compose/out/docker-compose.prod.yml).

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
