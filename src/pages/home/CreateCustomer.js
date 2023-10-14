// Constants
import UserType from 'constants/userType';

// MUI
import { Button } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, createUser } from 'store/slices/userSlice';
import { createCustomer } from 'store/slices/customerSlice';

const CreateCustomer = () => {
  const dispatch = useDispatch();
  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { data: administratorData, loading: administratorLoading } =
    useSelector((state) => state.administrator);

  let email = 'customertest@test.com';
  let password = '123123';
  let firstName = 'Number2Cust';
  let lastName = 'Cust';
  let companyName = 'test name customer';
  let predefinedLinesOfService = ['elec'];
  let street = '229 Talladega Lane';
  let city = 'Polk City';
  let state = 'FL';
  let zip = '33868';

  const handleCreateCustomerClick = () => {
    const ownerId = administratorData?.uid;
    dispatch(signUpUser({ email, password })).then((action) => {
      dispatch(
        createUser({
          email,
          userId: action.payload.uid,
          firstName,
          lastName,
          userType: 'customer',
        })
      );
      dispatch(
        createCustomer({
          companyName,
          ownerId,
          predefinedLinesOfService,
          street,
          city,
          zip,
          state,
        })
      );
    });
  };

  if (userData?.userType !== UserType.ADMINISTRATOR) return null;

  return (
    <>
      <Button variant='contained' onClick={handleCreateCustomerClick}>
        Create Customer
      </Button>
    </>
  );
};

export default CreateCustomer;
