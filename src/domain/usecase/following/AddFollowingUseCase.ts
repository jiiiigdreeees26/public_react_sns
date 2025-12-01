import { Following } from '../../entities/Following';
import { FollowingRepository } from '../../../data/repositories/FollowingRepository';

export class AddFollowingUseCase {
  constructor(private postRepository: FollowingRepository) {}

  async execute(followUserId: number, followedUserId: number, accessToken: string): Promise<Following> {
    if (!followUserId) {
      throw new Error('followUserId is required');
    }
    if (!followedUserId) {
      throw new Error('followedUserId is required');
    }
    return await this.postRepository.addFollowing({ followUserId, followedUserId }, accessToken);
  }
}