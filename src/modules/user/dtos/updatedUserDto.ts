import { ApiProperty } from "@nestjs/swagger";

export class UpdatedUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}