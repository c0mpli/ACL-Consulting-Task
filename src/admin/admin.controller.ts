import { Body, Controller, Get, Post,UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('/userdata')
    @UseGuards(AuthGuard())
    getUserData(){
        return this.adminService.getUserData();
    }
}
