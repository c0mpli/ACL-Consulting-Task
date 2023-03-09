import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('/userdata')
    getUserData(){
        return this.adminService.getUserData();
    }
}
