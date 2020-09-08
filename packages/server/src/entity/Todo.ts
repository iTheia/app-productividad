import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Window } from './Window';

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	todo: string;

	@Field()
	@Column()
	status: string;

	@Field()
	@Column()
	date: Date;

	@Column()
	windowId: number;

	@ManyToOne(() => Window, (window) => window.todos)
	@JoinColumn({ name: 'windowId' })
	window: Window;
}
