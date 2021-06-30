import { CommentEntity } from "../comment/comment.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserType } from "./user.types";

@Entity({ name: "user" })
@Unique([ "email" ])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({ nullable: true, default: "" })
    name: string;

    @Column()
    password: string;

    @Column()
    type: UserType;

    @OneToMany(type => CommentEntity, comments => comments.user)
    comments: CommentEntity[];
}
