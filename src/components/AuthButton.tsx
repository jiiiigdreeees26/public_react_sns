import { signIn, signOut, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';

export const AuthButton = () => {
  const { data: session } = useSession();
  const loginUser = useSelector(selectUser).users.filter(user => user.email === session?.user?.email)[0];

  if (session) {
    return (
      <div>
        <p className="flex justify-end">ようこそ、{loginUser?.name}さん</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => signOut()}
          >
            サインアウト
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-end">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => signIn('auth0', undefined, { prompt: "login" })}
      >
        サインイン
      </button>
    </div>
  );
};
