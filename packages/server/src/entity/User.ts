import {
	Entity,
	Column,
	BaseEntity,
	PrimaryGeneratedColumn,
	OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Label } from './Label';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	userName: string;

	@OneToMany(() => Label, (label) => label.owner, {
		cascade: true,
	})
	labels: Label[];

	@Field()
	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ nullable: true, default: null })
	role: string;

	@Column('int', { default: 0 })
	tokenVersion: number;
}
