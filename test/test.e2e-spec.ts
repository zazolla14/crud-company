import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { TestModule } from './../src/test.module'

describe(`TestController (e2e)`, () => {
        let test: INestApplication

        beforeEach(async () => {
                const moduleFixture: TestingModule = await Test.createTestingModule(
                        {
                                imports: [TestModule],
                        },
                ).compile()

                test = moduleFixture.createNestApplication()
                await test.init()
        })

        it(`/test/ GET()`, () => {
                return request(test.getHttpServer())
                        .get(`/test/`)
                        .expect(200)
                        .expect('false')
        })
})
