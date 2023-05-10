import type { ExecutorContext } from '@nrwl/devkit'
import { execSync } from 'child_process'

export interface OverwolfExecutorOptions {
  buildDir: string
}

export default async function serveExecutor(
  options: OverwolfExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  execSync(`yarn nuxt dev apps/${context.projectName}`)

  return { success: true }
}
