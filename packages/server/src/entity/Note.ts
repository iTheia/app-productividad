import { BaseEntity, Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Note extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID;

	@Field()
	@Column('text')
	note: string;

	@Field()
	@Column('string', { nullable: false, default: '#ffffff' })
	color: string;

	@Field()
	@Column('string')
	href: string;
}
