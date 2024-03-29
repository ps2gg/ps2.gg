# Git Conventions

This guide specifies the standards we use to maintain transparent and frictionless collaboration between developers.

<br>

## Issues

Issues should describe the smallest possible use case of a given change or feature.

Some examples:

- Add Query for retrieving experimental alt data
- Publicly log alt lookups by user id
- Add Command to populate new alt relations

If an issue can be split up into smaller components, we consider it a milestone, which consists of a number of issues that we'll approach in sprints. If that's the case, please [contact us on Discord](https://discord.gg/8MvTaUQM2E), so we can onboard you into our workflow and help you plan out the feature.

<br>

## Pull Requests

For the sake of reviewability and ease of collaboration, PRs should be kept as small as possible. They should resolve a single issue and change no more than 100 lines of code. Although we understand that some cases require more changes.

<br>

## Commit format

For commits, we use the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) standard to maintain a descriptive history of changes. We can also leverage this to auto-generate patchlogs, so keep in mind that end-users may see your commit messages.

<br>

## Branch names

Branches are named similarly to the conventional commit format. Following the format of `type/service(optional)/description`

Some examples:

```
feat/service-name/your-feature
fix/service-name/that-one-endpoint
docs/service-name/get-started
refactor/the-latest-framework-we-switch-to
```

<br>

## The master branch

Everything that gets merged on master will be released to our early access channels. Hence it's integral that we ensure master is _always stable_, otherwise we cause downtime for our users.
<br>

We also use this branch to manually trigger production deployments.

<br>

---

<br>

### Next guide for beginners: [Getting started guides for a specific technology](/docs/README.md)
