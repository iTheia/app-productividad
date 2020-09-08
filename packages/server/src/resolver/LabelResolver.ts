import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Label } from '../entity/Label';
import { v4 as uuid } from 'uuid';

@Resolver()
export class LabelResolver {
	@Query(() => [Label])
	async Labels() {
		return await Label.find();
	}

	@Mutation(() => Label)
	async createLabel(@Arg('name') name: string) {
		try {
			const label = await Label.create({
				name,
				href: uuid(),
			}).save();
			return label;
		} catch (error) {
			return false;
		}
	}

	@Mutation(() => Boolean)
	async updateLabel(@Arg('href') href: string, @Arg('name') name?: string) {
		try {
			await Label.update({ href }, { name: name });
			return true;
		} catch (error) {
			return false;
		}
	}

	@Mutation(() => Boolean)
	async deleteLabel(@Arg('href') href: string) {
		try {
			await Label.delete({ href });
			return true;
		} catch (error) {
			return false;
		}
	}
}
