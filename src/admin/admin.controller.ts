import { Body, Controller, Get, Post,UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDto } from './dto/update.dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Get('/userdata')
    @UseGuards(AuthGuard())
    getUserData(){
        return this.adminService.getUserData();
    }

    @Post('/update')
    @UseGuards(AuthGuard())
    updateUserData(@Body() UpdateDto){
        return this.adminService.updateUserData(UpdateDto);
      }
}
