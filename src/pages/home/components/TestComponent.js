import { useEffect } from 'react';
import { useFetchUserQuery } from 'services/users/userServices';

const TestComponent = ({ uid }) => {
  const { data: userData, isLoading: userLoading } = useFetchUserQuery(uid);
  console.log(userData);
  useEffect(() => {}, [userData, userLoading]);
  if (userLoading) return <p>Loading from test...</p>;
  if (userData) return <div>hello</div>;
};

export default TestComponent;
