import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { BaseEntity } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Note } from '../entity/Note';

@Resolver()
export class NoteResolver extends BaseEntity {
	@Query(() => [Note])
	async getNotes() {
		return await Note.find();
	}

	@Mutation(() => Note)
	async createNote(@Arg('name') note: string) {
		try {
			const record = await Note.create({
				color: '#ffffff',
				href: uuid(),
				note,
			});
			return record;
		} catch (error) {
			return false;
		}
	}

	@Mutation(() => Boolean)
	async updateNote(@Arg('href') href: string, @Arg('name') note?: string) {
		try {
			await Note.update({ href }, { note });
			return true;
		} catch (error) {
			return false;
		}
	}

	@Mutation(() => Boolean)
	async deleteNote(@Arg('href') href: string) {
		try {
			await Note.delete({ href });
			return true;
		} catch (error) {
			return false;
		}
	}
}
