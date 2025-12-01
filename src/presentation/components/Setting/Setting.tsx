import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { UserRepositoryImpl } from '../../../data/repositories/UserRepository';
import { UpdateUserNameUseCase } from '../../../domain/usecase/user/UpdateUserNameUseCase';
import { selectUser } from '../../../store/userSlice';

export const Setting = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const loginUser = useSelector(selectUser).users.filter(user => user.email === session?.user?.email)[0];
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState(loginUser?.name);

  const userRepositoryImpl = new UserRepositoryImpl(dispatch);
  const updateUserNameUseCase = new UpdateUserNameUseCase(userRepositoryImpl);

  useEffect(() => {
    if (loginUser) setNewUsername(loginUser.name);
  },[loginUser]);
  
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    updateUserNameUseCase.execute(
      loginUser?.id,
      newUsername || '' ,
      loginUser?.email || '',
      (session as any)?.jwt?.accessToken);
    await update({
      ...session,
      user: { ...session?.user, name: newUsername },
    });
    router.replace('/profile');
  };

  return (
    <div>
      <h1>User Settings</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border rounded-lg shadow-md"
      >
        <label>
          Username:
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="新しいユーザー名"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          保存
        </button>
      </form>
    </div>
  );
}
