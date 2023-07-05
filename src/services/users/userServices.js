import { api } from 'services/baseService';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ email, uid, fullName, userType }) => ({
        url: '/users/create-user',
        method: 'POST',
        body: { email, uid, fullName, userType },
      }),
    }),
    fetchUser: builder.query({
      query: (uid) => ({
        url: '/users/get-user-details',
        params: { uid },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ uid, updateData }) => ({
        url: `/users/update-user`,
        method: 'PATCH',
        body: { uid, updateData },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useFetchUserQuery,
  useUpdateUserMutation,
} = userApi;
