import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'email'})
class EmailEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    currentProcessed: number;

    @Column()
    target: number;

    @Column()
    total: number = 0;
}

export { EmailEntity };