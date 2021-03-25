import { NestFactory } from '@nestjs/core'
import { AppModule } from './App.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000)

    Logger.log(`Running at port 3000`, 'RunningPort')
}
bootstrap()
