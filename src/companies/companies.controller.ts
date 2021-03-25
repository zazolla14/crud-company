import {
        Body,
        Controller,
        Delete,
        Get,
        HttpCode,
        HttpStatus,
        Param,
        Post,
        UseFilters,
        Patch,
} from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { EntityNotFoundExceprtionFilter } from './entity-not-found-exception.filter'
import { CompaniesService } from './companies.service'

@Controller('companies')
@UseFilters(EntityNotFoundExceprtionFilter)
export class UsersController {
        constructor(private readonly companiesService: CompaniesService) {}

        @Get()
        findAll() {
                return this.companiesService.findAll()
        }
        @Get(':id')
        findOne(@Param('id') id: number) {
                return this.companiesService.findOne(id)
        }

        @Post()
        create(@Body() data: CreateCompanyDto) {
                return this.companiesService.create(data)
        }

        @Post(':id')
        duplicate(@Param('id') id: number) {
                return this.companiesService.duplicate(id)
        }

        @Patch(':id')
        update(@Param('id') id: number, @Body() data: CreateCompanyDto) {
                return this.companiesService.update(id, data)
        }

        @Delete(':id')
        @HttpCode(HttpStatus.NO_CONTENT)
        delete(@Param('id') id: number) {
                this.companiesService.delete(id)
        }
}
