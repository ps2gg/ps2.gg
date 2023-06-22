import { existsSync } from 'fs'

/**
 * process.env.NODE_ENV is forcibly replaced with development in the build process due to
 * the optimization flag being turned off in project.json. It should also stay off to avoid
 * misnaming of entities through minimization.
 * So instead, we check for the production state by the presence of the database secrets.
 */
export function isProd(service: name): boolean {
  return existsSync(`/run/secrets/${service}-db-pass`)
}
