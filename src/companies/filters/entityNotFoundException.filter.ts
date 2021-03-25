import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm'

@Catch(EntityNotFoundError)
export class EntityNotFoundExceprtionFilter implements ExceptionFilter {
    catch(error: EntityNotFoundError, host: ArgumentsHost) {
        const respone = host.switchToHttp().getResponse()
        respone.status(HttpStatus.NOT_FOUND).json({
            error: error.name,
            message: error.message,
            // message: 'Data not found',
        })
    }
}
