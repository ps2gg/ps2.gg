# Creating a backend microservice

We use [NestJS](https://nestjs.com/) for our backend services. It's a modular wrapper around other frameworks that allows us to employ a well structured software architecture with predictable conventions and workflows. Some knowledge of Nest is helpful, but for simple applications it isn't required.

<br>

## Learning Curve

Due to our architecture being strictly split up into singular responsibilities, you'll likely need a few days to know what goes where by heart. Don't be discouraged though, this approach saves us immense amounts of time when trying to understand existing code. Everything has its place and you'll know exactly where to find it.

<br>

## Generate a service

Generating a new microservice is simple! Just run the following
```sh
bun nx g @ps2gg/nx/nest:app service-name
```

This will create the following:
- A simple example service with working POST and GET endpoints
- An HTTP client library to access our new service
- A library for shared types that reflect our ORM entities

<br>

## Domain Driven Design and the Onion Architecture

As mentioned before, we split up our architecture into single responsibilities with a clear dependency flow. We do this by structuring our code around an Onion Architecture that implements [Domain Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html).

<br>

![Clean Architecture](https://d33wubrfki0l68.cloudfront.net/8f004743b6357bf348000d0e1dd07780a16d3189/3b663/img/wiki/dependency-rule/clean-architecture-layers.svg)

*A visualization of domain driven design in an onion architecture (source: [Khalil Stemmler](https://khalilstemmler.com/wiki/dependency-rule/))* 

<br>

At its core, there is the dependency-free **Domain layer** for business logic. Essentially, it's the entities we work with (e.g. a User) and the functionalities they implement. (e.g. linking different identities, adding friends, etc)
<br>

One level up is the **Application layer**. It orchestrates our business logic by providing interfaces for exact use cases (e.g. Adding a new user, updating their name, etc), but it doesn't implement any concrete logic - That's left to the Domain layer.
<br>

The outermost layer, the **Infrastructure layer**, is used to communicate with external services. Databases, clients, etc. It connects our application with the rest of the system.

<br>

**No layer should depend on the code of an outside layer.**

<br>

## CQRS

We also segregate our Reads and Writes in the model via the CQRS pattern. What this means for developers, is that Reads and Writes are split up into Commands (writes) and Queries (reads) in the Application Layer (e.g. SetEmail, GetEmail).
<br>

This helps us make the code even more predictable. For example, if a use case involves the modification of an entity, you'll know exactly where the changes are made in the code. The command are typically named after the action + entity, so jumping to the relevant files is done in seconds. You'll never have to spend dozens of minutes trying to understand large code blocks and determining what happens where, and how everything interacts with the rest of the system.
<br>

At scale, this would also allow us to use specialized databases for a specific use case.

<br>

## Specialized features

There's more to explore for advanced services, such as distributing [Real-time data](./Real-time.md) with highly configurable subscription settings, or doing real-time communication between services via rabbitmq (not yet documented, but you can compare libs/events/subscriptions)<br>

These aren't necessary for most services, however. Just remember that we made them very easy to use, so you don't have to worry about the technicalities behind the scenes.
