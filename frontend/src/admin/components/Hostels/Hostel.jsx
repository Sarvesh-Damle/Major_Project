import axios from 'axios';
import Table from '../Table/Table.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loader from '@/pages/Loader.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import { HostelDeleteButton, HostelEditButton } from '../Buttons.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Hostel = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['hostel-delete'],
    mutationFn: (prop) => {
      return axios.delete(`/api/v1/hostels/delete-hostel?id=${prop._id}`, {
        withCredentials: true,
      });
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
    navigate(`/dashboard/hostels/edit-hostel/${prop._id}`);
  };
  let column = [
    { field: 'hostel_name', headerName: 'Hostel Name', filter: true, width: 215 },
    { field: 'city', filter: true, width: 130 },
    { field: 'locality', filter: true, width: 145 },
    { field: 'type_of_hostel', headerName: 'Type of Hostel', filter: true, width: 168 },
    { field: 'rent_amount', headerName: 'Rent Amount', filter: true, width: 140 },
    { field: 'featured', headerName: 'Verified', filter: true, width: 100 },
    {
      field: 'Edit',
      width: 100,
      cellRenderer: (prop) => <HostelEditButton func={handleEdit} {...prop} />,
    },
    {
      field: 'Delete',
      width: 100,
      cellRenderer: (prop) => <HostelDeleteButton func={handleDelete} {...prop} />,
    },
  ];
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['Hostels'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/hostels/find-all-hostels-info', {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery({
    queryKey: ['Hostels-Type-Count'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/hostels/count-hostel-type', {
        withCredentials: true,
      });
      return response.data;
    },
  });

  if (isLoading || isLoading2)
    return (
      <div className='flex h-screen w-screen justify-center items-center'>
        <Loader />
      </div>
    );
  if (isError || isError2) return <ErrorComponent />;

  return (
    <div className='w-[100vw] h-[90vh] bg-slate-100'>
      <div className='mr-3'>
        <div className='flex justify-start flex-wrap gap-20 items-center h-[120px] ml-5'>
          <div className='w-fit ml-5'>
            <h1 className='text-2xl'>Hostels</h1>
          </div>
          <div className='h-[100px] lg:ml-2 bg-[#aaa1c8] w-full rounded-md flex flex-col justify-center lg:w-[25%] mb-3 opacity-85'>
            <h1 className='text-lg ml-5'>Total Boys Hostels</h1>
            <p className='font-bold text-xl ml-5'>{data2.data[0] || 5}</p>
          </div>
          <div className='h-[100px] lg:ml-2 bg-[#74c69d] w-full rounded-md flex flex-col justify-center lg:w-[25%] mb-3 opacity-85'>
            <h1 className='text-lg ml-5'>Total Girls Hostels</h1>
            <p className='font-bold text-xl ml-5'>{data2.data[1] || 5}</p>
          </div>
        </div>
        <div className='mt-2'>
          <Table rowData={data.data} colDefs={column} />
        </div>
      </div>
    </div>
  );
};

export default Hostel;
