import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string;

    @Column()
    timestamp: string;

    @Column()
    route: string;

    @Column()
    payload: string;

    @Column()
    status: number;

    @Column()
    error: string;
}