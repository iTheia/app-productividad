import {
	BaseEntity,
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Window } from './Window';

@ObjectType()
@Entity()
export class Label extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	href: string;

	@Column('int')
	ownerId: number;

	@ManyToOne(() => User, (user) => user.labels)
	@JoinColumn({ name: 'ownerId' })
	owner: User;

	@OneToMany(() => Window, (window) => window.labelId)
	windows: Window[];
}
