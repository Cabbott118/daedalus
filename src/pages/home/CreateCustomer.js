// Constants
import UserType from 'constants/userType';

// MUI
import { Button } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createFirebaseUser } from 'store/slices/userSlice';
import { createCustomer } from 'store/slices/customerSlice';

const CreateCustomer = () => {
  const dispatch = useDispatch();
  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { data: administratorData, loading: administratorLoading } =
    useSelector((state) => state.administrator);

  let email = 'customertest2@test.com';
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
    dispatch(
      createFirebaseUser({
        email,
        password,
        firstName,
        lastName,
        userType: 'customer',
      })
    ).then((action) => {
      dispatch(
        createCustomer({
          companyName,
          predefinedLinesOfService,
          ownerId,
          street,
          city,
          zip,
          state,
          firstName,
          lastName,
          primaryContactId: action.payload.uid,
          email,
          contactId: action.payload.uid,
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
