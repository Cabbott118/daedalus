// Constants
import UserType from 'constants/userType';

// MUI
import { Button } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, createUser } from 'store/slices/userSlice';
import { createTechnician } from 'store/slices/technicianSlice';

const CreateTechnician = () => {
  const dispatch = useDispatch();
  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { data: administratorData, loading: administratorLoading } =
    useSelector((state) => state.administrator);
  const { data: contractorData, loading: contractorLoading } = useSelector(
    (state) => state.contractor
  );

  let email = 'technician2@test.com';
  let password = '123123';
  let firstName = 'Tech2';
  let lastName = 'Nician2';

  const handleCreateTechnicianClick = () => {
    let ownerId;
    if (administratorData) {
      ownerId = administratorData?.uid;
    } else {
      ownerId = contractorData?.uid;
      console.log(ownerId);
    }

    dispatch(signUpUser({ email, password })).then((action) => {
      dispatch(
        createUser({
          email,
          userId: action.payload.uid,
          firstName,
          lastName,
          userType: 'technician',
        })
      );
      dispatch(
        createTechnician({
          firstName,
          lastName,
          ownerId,
          userId: action.payload.uid,
        })
      );
    });
  };

  if (
    userData?.userType !== UserType.ADMINISTRATOR &&
    userData?.userType !== UserType.CONTRACTOR
  ) {
    return null;
  }

  return (
    <>
      <Button variant='contained' onClick={handleCreateTechnicianClick}>
        Create Technician
      </Button>
    </>
  );
};

export default CreateTechnician;
