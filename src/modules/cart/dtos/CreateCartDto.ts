import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class CartItemDto {
  @ApiProperty({
    description: 'ID of the product',
    example: 1,
  })
  @IsInt()
  productId: number;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 2,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateCartDto {
  @ApiProperty({
    description: 'List of products with their quantities',
    type: [CartItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}
