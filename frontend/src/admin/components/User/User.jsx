import axios from 'axios';
import Table from '../Table/Table.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loader from '@/pages/Loader.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import { UserDeleteButton, UserEditButton } from '../Buttons.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['user-delete'],
    mutationFn: (prop) => {
      return axios.delete(`/api/v1/users/delete-user?id=${prop._id}`, { withCredentials: true });
    },
    onSuccess(data) {
      toast.success(data.data.message);
      refetch();
    },
    onError(error) {
      let message = error.response?.data?.message;
      toast.error(message);
    },
  });
  const handleDelete = (prop) => {
    mutation.mutate({ _id: prop._id });
  };
  const handleEdit = (prop) => {
    navigate(`/dashboard/users/edit-user/${prop._id}`);
  };

  let column = [
    { field: 'name', filter: true },
    { field: 'email', filter: true },
    { field: 'phoneNumber' },
    {
      field: 'Edit',
      cellRenderer: (prop) => (
        // <EnrollButton func={handleEnroll} {...props} />
        // <button><MdModeEdit size={20} className="text-gray-600"/></button>
        <UserEditButton func={handleEdit} {...prop} />
      ),
    },
    {
      field: 'Delete',
      cellRenderer: (prop) => (
        // <ViewAssigned func={view} {...props} />
        // <button><MdDelete size={23} className="text-red-400"/></button>
        <UserDeleteButton func={handleDelete} {...prop} />
      ),
    },
  ];
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['User'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/users', { withCredentials: true });
      return response.data;
    },
  });

  if (isLoading)
    return (
      <div className='flex h-screen w-screen justify-center items-center'>
        <Loader />
      </div>
    );
  if (isError) return <ErrorComponent />;
  return (
    <div className='w-[100vw] h-[90vh] bg-slate-100'>
      <div className='mr-3'>
        <div className='flex justify-between items-center  h-[120px] '>
          <div className='w-[250px] ml-5 '>
            <h1 className='text-2xl'>Users</h1>
          </div>
        </div>
        <div className='mt-2'>{!isLoading && <Table rowData={data} colDefs={column} />}</div>
      </div>
    </div>
  );
};

export default User;
