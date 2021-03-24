import { NestFactory } from '@nestjs/core'
import { AppModule } from './App.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
        const app = await NestFactory.create(AppModule)
        await app.listen(3000)

        Logger.log(`Running at port 3000`, 'RunningPort')
}
bootstrap()
