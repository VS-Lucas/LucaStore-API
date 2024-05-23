import { ApiProperty } from "@nestjs/swagger";

export class DeletedUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;
}