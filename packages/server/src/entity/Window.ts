import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Todo } from './Todo';
import { Note } from './Note';
import { Label } from './Label';

@ObjectType()
@Entity()
export class Window extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column()
	name: string;

	@Column('int')
	labelId: number;

	@ManyToOne(() => Label, (label) => label.windows)
	@JoinColumn({ name: 'labelId' })
	owner: Label;

	@OneToMany(() => Todo, (todo) => todo.windowId)
	todos: Todo[];

	@OneToMany(() => Note, (note) => note.windowId)
	notes: Note[];
}
