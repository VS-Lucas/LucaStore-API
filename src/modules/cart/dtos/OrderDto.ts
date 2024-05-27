import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    orderId: number;

    @ApiProperty()
    productId: number;
}

export class OrderDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    total: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({ type: [OrderItemDto] })
    items: OrderItemDto[];
}
