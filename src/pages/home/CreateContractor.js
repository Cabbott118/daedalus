// Constants
import UserType from 'constants/userType';

// MUI
import { Button } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, createUser } from 'store/slices/userSlice';
import { createContractor } from 'store/slices/contractorSlice';

const CreateContractor = () => {
  const dispatch = useDispatch();
  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { data: administratorData, loading: administratorLoading } =
    useSelector((state) => state.administrator);

  let email = 'caleb@caleb.com';
  let password = '123123';
  let firstName = 'Caleb';
  let lastName = 'Abbott';
  let companyName = 'test name';
  let linesOfService = ['hvac'];

  const handleCreateContractorClick = () => {
    const ownerId = administratorData?.uid;
    dispatch(signUpUser({ email, password })).then((action) => {
      dispatch(
        createUser({
          email,
          userId: action.payload.uid,
          firstName,
          lastName,
          userType: 'contractor',
        })
      );
      dispatch(createContractor({ companyName, linesOfService, ownerId }));
    });
  };

  if (userData?.userType !== UserType.ADMINISTRATOR) return null;

  return (
    <>
      <Button variant='contained' onClick={handleCreateContractorClick}>
        Create Contractor
      </Button>
    </>
  );
};

export default CreateContractor;