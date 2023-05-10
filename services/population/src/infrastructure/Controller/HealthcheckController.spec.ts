import { Test, TestingModule } from '@nestjs/testing'
import { HealthcheckController } from './HealthcheckController'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HealthcheckController],
    }).compile()
  })

  describe('getData', () => {
    it('should return "ALLOK"', () => {
      const appController = app.get<HealthcheckController>(HealthcheckController)
      expect(appController.healthCheck()).toEqual('ALLOK')
    })
  })
})
