# ps2.gg

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/49991ab701ef4eb0a0a29f947ac4a1fc)](https://app.codacy.com/gh/ps2gg/ps2.gg/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Discord](https://img.shields.io/discord/1090392395427885198.svg?logo=discord)](https://discord.gg/8MvTaUQM2E)

<br>

This is the home of ps2.gg, where software is made that turns Planetside into a better game.<br>
This repo includes all microservices that empower our UI mods and third party applications.

<br>

## Microservices

| Name                                                        | Description                                     | Documentation                                                     |
| ----------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| [census](/services/census/) 🔹                              | Internally relays Census data                   | -/-                                                               |
| [peepo](/services/peepo/) 🔹                                | Planetside2 Companion                           | [Try it on Discord](https://discord.gg/vVa7gDK7Ky)                |
| [jaeger](/services/jaeger/) 🔹                              | Jaeger character verification                   | [Accessible on the Jaeger Discord](https://discord.gg/v6reuCe6QW) |
| [population](/services/population/) 🔹                      | Real-time population data                       | -/-                                                               |
| [population-db](https://github.com/postgres/postgres) 🔹    | Postgres                                        | -/-                                                               |
| [players](/services/players/) 🔹                            | Planetside character information                | -/-                                                               |
| [players-db](https://github.com/postgres/postgres) 🔹       | Postgres                                        | -/-                                                               |
| [friends](/services/players/) 🔹                            | Global alt-wide friend list                     | -/-                                                               |
| [friends-db](https://github.com/postgres/postgres) 🔹       | Postgres                                        | -/-                                                               |
| [users](/services/users/)                                   | Verifies and links users on different platforms | soon™                                                             |
| [users-db](https://github.com/postgres/postgres) 🔹         | Postgres                                        | -/-                                                               |
| alts                                                        | Matches alt characters                          | soon™                                                             |
| [alts_db](https://github.com/mongodb/mongo) 🔹              | Mongodb                                         | -/-                                                               |
| [redis](https://github.com/redis/redis) 🔹                  | Caches expensive operations                     | -/-                                                               |
| [rabbitmq](https://github.com/rabbitmq/rabbitmq-server) 🔹  | Inter-service communication                     | -/-                                                               |
| [registry](https://github.com/distribution/distribution) 🔹 | Hosts Docker images                             | -/-                                                               |

Services with a 🔹 are open source.

<br>

## Want to contribute?

Our platform connects developers from every part of the community to make Planetside just that little bit better. We'd be happy to welcome you into our family and help you ship features that reach thousands of users.

Ps2.gg provides a vast pool of data, ranging from easy-to-access Census data, to unique metadata like alt characters, user verification and per-fight metrics. It's incredibly easy to build features that would otherwise drag you down for weeks if you had to build them on your own.

All of this is powered by the latest in tech, from Next.js on the frontend, to Nest on the backend, to an automated Docker orchestration system and thorough monitoring tools. Everything is professionally designed within robust software architectures that any serious software engineer would wish of.

<br>

## Where to get started?

We guide newcomers through the project with pair programming sessions, so we can show you the ropes and answer all of the questions you'll have in the beginning. If that sounds interesting, [hit us up on Discord!](https://discord.gg/8MvTaUQM2E)

If you're just looking around or want to contribute small changes, you may want to read our [Contributor Guide](/.github/CONTRIBUTING.md).

<br>

## Documentation

For guides and details on our technologies, check out our [Documentation](/docs/README.md)!
