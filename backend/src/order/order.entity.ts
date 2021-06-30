import { OrderItemEntity } from "../order-item/order-item.entity";
import { BaseEntity, Check, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "./order.types";

@Entity({ name: "order" })
@Check(`"postalNumber" > 999 AND "postalNumber" < 10000`)
export class OrderEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: OrderStatus.Preparing })
    status: OrderStatus;

    @Column()
    city: string;

    @Column()
    purchaserName: string;

    @Column()
    postalNumber: number;

    @Column()
    street: string;

    @OneToMany(
        type => OrderItemEntity,
        items => items.order,
        {
            cascade: true
        }
    )
    @JoinColumn()
    items: OrderItemEntity[];
}
