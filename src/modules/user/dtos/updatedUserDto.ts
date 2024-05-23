import { ApiProperty } from "@nestjs/swagger";

export class UpdatedUserDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    password: string;
}