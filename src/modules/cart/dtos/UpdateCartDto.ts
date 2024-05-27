import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCartDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    productId: number;
    
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    quantity: number;
}
