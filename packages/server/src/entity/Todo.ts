import { BaseEntity, ObjectIdColumn, ObjectID, Entity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID;

	@Field()
	@Column()
	todo: string;

	@Field()
	@Column()
	status: string;

	@Field()
	@Column('date')
	date: Date;
}
