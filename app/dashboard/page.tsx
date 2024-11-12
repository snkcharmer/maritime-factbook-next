import AuthWrapper from '../../components/AuthWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <AuthWrapper>
      <div>
        <h1>Welcome to your dashboard, {user?.email}</h1>
        <p>Your user ID is: {user?.id}</p>
      </div>
    </AuthWrapper>
  );
}
