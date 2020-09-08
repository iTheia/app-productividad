import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Window } from './Window';

@ObjectType()
@Entity()
export class Note extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	note: string;

	@Field()
	@Column({ nullable: false, default: '#ffffff' })
	color: string;

	@Field()
	@Column()
	href: string;

	@Column()
	windowId: number;

	@ManyToOne(() => Window, (window) => window.notes)
	@JoinColumn({ name: 'windowId' })
	owner: Window;
}
