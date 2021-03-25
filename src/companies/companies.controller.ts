import {
        Body,
        Controller,
        Delete,
        Get,
        Param,
        Post,
        UseFilters,
        Patch,
} from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { EntityNotFoundExceprtionFilter } from './filters/entityNotFoundException.filter'
import { CompaniesService } from './companies.service'
import { FindOneParam } from './validator/FindOneParam'

@Controller('companies')
@UseFilters(EntityNotFoundExceprtionFilter)
export class UsersController {
        constructor(private readonly companiesService: CompaniesService) {}

        @Get()
        findAll() {
                return this.companiesService.findAll()
        }
        @Get(':id')
        @UseFilters(EntityNotFoundExceprtionFilter)
        findOne(@Param() id: FindOneParam) {
                return this.companiesService.findOne(id.id)
        }

        @Post()
        create(@Body() data: CreateCompanyDto) {
                return this.companiesService.create(data)
        }

        @Post(':id')
        @UseFilters(EntityNotFoundExceprtionFilter)
        duplicate(@Param() id: FindOneParam) {
                return this.companiesService.duplicate(id.id)
        }

        @Patch(':id')
        @UseFilters(EntityNotFoundExceprtionFilter)
        update(@Param() id: FindOneParam, @Body() data: CreateCompanyDto) {
                return this.companiesService.update(id.id, data)
        }

        @Delete(':id')
        @UseFilters(EntityNotFoundExceprtionFilter)
        delete(@Param() id: FindOneParam) {
                this.companiesService.delete(id.id)
        }
}
