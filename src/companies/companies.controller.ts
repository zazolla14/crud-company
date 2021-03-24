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
        Put,
} from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { EntityNotFoundExceprtionFilter } from './entity-not-found-exception.filter'
import { CompaniesService } from './companies.service'

@Controller('companies')
@UseFilters(EntityNotFoundExceprtionFilter)
export class UsersController {
        constructor(private readonly companiesService: CompaniesService) {}

        @Get()
        async findAll() {
                return {
                        data: await this.companiesService.findAll(),
                }
        }
        @Get(':id')
        async findOne(@Param('id') id: number) {
                return {
                        data: await this.companiesService.findOne(id),
                }
        }

        @Post()
        async create(@Body() data: CreateCompanyDto) {
                return {
                        data: await this.companiesService.create(data),
                }
        }

        @Post(':id')
        duplicate(@Param('id') id: number) {
                return this.companiesService.duplicate(id)
        }

        @Put(':id')
        async update(@Param('id') id: number, @Body() data: CreateCompanyDto) {
                return {
                        data: await this.companiesService.update(id, data),
                }
        }

        @Delete(':id')
        @HttpCode(HttpStatus.NO_CONTENT)
        async delete(@Param('id') id: number) {
                await this.companiesService.delete(id)
                // return {
                //   message: 'success deleted data',
                // };
        }
}