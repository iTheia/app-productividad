import { BaseEntity, ObjectIdColumn, ObjectID, Entity } from 'typeorm';
import { ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Window extends BaseEntity {
	@ObjectIdColumn()
	id: ObjectID;
}
