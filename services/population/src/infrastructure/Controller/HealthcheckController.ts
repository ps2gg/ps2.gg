import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('public')
export class HealthcheckController {
  @Get('healthz')
  healthCheck(): string {
    return 'ALLOK'
  }
}
