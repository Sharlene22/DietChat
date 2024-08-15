'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import WelcomePage from './components/WelcomePage';
import Chat from './components/Chat';

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {!user ? <WelcomePage /> : <Chat />}
    </div>
  );
}
