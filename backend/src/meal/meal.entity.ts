import { OrderItemEntity } from "../order-item/order-item.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "../comment/comment.entity";

@Entity({ name: "meal" })
export class MealEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "float" })
    price: number;

    @Column()
    description: string;

    @Column()
    long_description: string;

    @Column({ nullable: true })
    image_path?: string;

    @OneToOne(
        type => OrderItemEntity, 
        orderItem => orderItem.meal,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({ name: "orderItem_id", referencedColumnName: "id" })
    orderItem: OrderItemEntity;

    @OneToMany(type => CommentEntity, comments => comments.meal)
    comments: CommentEntity[];
}
