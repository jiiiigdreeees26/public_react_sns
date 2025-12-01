import { FollowingRepository } from '../../../data/repositories/FollowingRepository';
import { DeleteFollowingResponse } from '../../../api/followingApi';

export class DeleteFollowingUseCase {
  constructor(private postRepository: FollowingRepository) {}

  async execute(id: number, accessToken: string): Promise<DeleteFollowingResponse> {
    if (!id) {
      throw new Error('id is required');
    }
    return await this.postRepository.deleteFollowing(id, accessToken);
  }
}