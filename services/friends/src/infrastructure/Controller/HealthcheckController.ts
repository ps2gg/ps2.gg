import { Controller, Get } from '@nestjs/common'

@Controller()
export class HealthcheckController {
  @Get('healthz')
  healthCheck(): string {
    return 'ALLOK'
  }
}
