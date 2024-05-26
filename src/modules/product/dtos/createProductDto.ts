import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  
  @IsString()
  @ApiProperty()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @ApiProperty()
  catalogId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  amountInStock: number;
}
