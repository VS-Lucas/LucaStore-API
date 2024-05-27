import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    cartId: number;

    @ApiProperty()
    productId: number;
}

export class CreatedCartDto {
    @ApiProperty({name: 'User ID'})
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty({ type: [CartItemDto] })
    items: CartItemDto[];
}
