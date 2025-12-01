import { Following } from '../../entities/Following';
import { FollowingRepository } from '../../../data/repositories/FollowingRepository';

export class FetchFollowingByUserIdUseCase {
  constructor(private postRepository: FollowingRepository) {}

  async execute(userId: number): Promise<Following[] | null> {
    if (!userId) {
      throw new Error('userId is required');
    }
    return await this.postRepository.fetchFollowingByUserId(userId);
  }
}