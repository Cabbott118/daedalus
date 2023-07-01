import { useEffect, useState } from 'react';

// Components
import BusinessNameComponent from 'pages/dashboard/components/subcomponents/BusinessNameComponent';
import AddressComponent from 'pages/dashboard/components/subcomponents/AddressComponent';
import ContactInformationComponent from 'pages/dashboard/components/subcomponents/ContactInformationComponent';

// Constants
import UserType from 'constants/userType';

// MUI
import { Divider } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomer } from 'store/slices/customerSlice';
import { fetchContractor } from 'store/slices/contractorSlice';

const BusinessInformationComponent = ({ userData }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  const { data: customerData, loading: customerLoading } = useSelector(
    (state) => state.customer
  );
  const { data: contractorData, loading: contractorLoading } = useSelector(
    (state) => state.contractor
  );

  useEffect(() => {
    if (userData?.userType === UserType.CUSTOMER) {
      dispatch(fetchCustomer(userData?.uid));
    }
    if (userData?.userType === UserType.CONTRACTOR) {
      dispatch(fetchContractor(userData?.uid));
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.userType === UserType.CUSTOMER) {
      setLoading(customerLoading);
      setData(customerData);
    }
    if (userData?.userType === UserType.CONTRACTOR) {
      setLoading(contractorLoading);
      setData(contractorData);
    }
  }, [customerData, contractorData]);

  return (
    <>
      <BusinessNameComponent
        uid={data?.uid}
        data={data}
        userType={userData?.userType}
        loading={loading}
      />
      <Divider />
      <AddressComponent
        uid={data?.uid}
        data={data}
        userType={userData?.userType}
        loading={loading}
      />
      <Divider />
      <ContactInformationComponent
        uid={data?.uid}
        data={data}
        userType={userData?.userType}
        userData={userData}
        loading={loading}
      />
    </>
  );
};

export default BusinessInformationComponent;
