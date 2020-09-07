import { BaseEntity, ObjectIdColumn, ObjectID, Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Label extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID;

	@Field()
	@Column('string')
	name: string;

	@Field()
	@Column()
	href: string;
}
