import { MealEntity } from "../meal/meal.entity";
import { OrderEntity } from "../order/order.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "order-item" })
export class OrderItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @OneToOne(
        type => MealEntity, 
        meal => meal.orderItem,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({ name: "meal_id", referencedColumnName: "id" })
    meal: MealEntity

    
    @ManyToOne(
        type => OrderEntity
    )
    @JoinColumn({ name: "order_id", referencedColumnName: "id" })
    order: OrderEntity;
}
