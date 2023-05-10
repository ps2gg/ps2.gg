// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OWWindow } from '@overwolf/overwolf-api-ts'
import styles from './app.module.scss'
import NxWelcome from './nx-welcome'

export function App() {
  const home = new OWWindow('home')
  return <NxWelcome title="overwolf" />
}

export default App
