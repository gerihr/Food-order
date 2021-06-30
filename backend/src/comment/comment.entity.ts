import { MealEntity } from "../meal/meal.entity";
import { User } from "../user/user.entity";
import { BaseEntity, Check, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "comment" })
@Check(`"rating" > 0 AND "rating" <= 5`)
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    rating: number;

    @ManyToOne(type => User)
    user: User;

    @ManyToOne(type => MealEntity)
    meal: MealEntity;
}
