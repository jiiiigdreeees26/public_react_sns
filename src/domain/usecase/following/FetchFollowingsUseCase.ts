import { Following } from '../../entities/Following';
import { FollowingRepository } from '../../../data/repositories/FollowingRepository';

export class FetchFollowingsUseCase {
  constructor(private postRepository: FollowingRepository) {}

  async execute(): Promise<Following[]> {
    return await this.postRepository.fetchFollowings();
  }
}