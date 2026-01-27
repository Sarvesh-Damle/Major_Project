import axios from 'axios';
import Table from '../Table/Table.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loader from '@/pages/Loader.jsx';
import ErrorComponent from '@/pages/ErrorComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FlatDeleteButton, FlatEditButton } from '../Buttons.jsx';
import { useRef, useState, useCallback } from 'react';

const Flat = () => {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const mutation = useMutation({
    mutationKey: ['flat-delete'],
    mutationFn: (prop) => {
      return axios.delete(`/api/v1/flats/delete-flat?id=${prop._id}`, { withCredentials: true });
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

  const bulkVerifyMutation = useMutation({
    mutationKey: ['flat-bulk-verify'],
    mutationFn: ({ ids, featured }) => {
      return axios.put('/api/v1/flats/bulk-verify', { ids, featured }, { withCredentials: true });
    },
    onSuccess(data) {
      toast.success(data.data.message);
      setSelectedRows([]);
      gridRef.current?.api?.deselectAll();
      refetch();
    },
    onError(error) {
      toast.error(error.response?.data?.message || 'Bulk verify failed');
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationKey: ['flat-bulk-delete'],
    mutationFn: (ids) => {
      return axios.delete('/api/v1/flats/bulk-delete', { data: { ids }, withCredentials: true });
    },
    onSuccess(data) {
      toast.success(data.data.message);
      setSelectedRows([]);
      gridRef.current?.api?.deselectAll();
      refetch();
    },
    onError(error) {
      toast.error(error.response?.data?.message || 'Bulk delete failed');
    },
  });

  const handleDelete = (prop) => {
    mutation.mutate({ _id: prop._id });
  };
  const handleEdit = (prop) => {
    navigate(`/dashboard/flats/edit-flat/${prop._id}`);
  };

  const onSelectionChanged = useCallback(() => {
    const selected = gridRef.current?.api?.getSelectedRows() || [];
    setSelectedRows(selected);
  }, []);

  const handleBulkVerify = (featured) => {
    if (selectedRows.length === 0) return;
    const ids = selectedRows.map((row) => row._id);
    bulkVerifyMutation.mutate({ ids, featured });
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedRows.length} flat(s)?`)) return;
    const ids = selectedRows.map((row) => row._id);
    bulkDeleteMutation.mutate(ids);
  };

  let column = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50, pinned: 'left' },
    { field: 'flat_type', headerName: 'Flat Type', filter: true, width: 140 },
    { field: 'city', filter: true, width: 130 },
    { field: 'locality', filter: true, width: 145 },
    { field: 'preferred_tennats', headerName: 'Preferred Tenants', filter: true, width: 168 },
    { field: 'rent_amount', headerName: 'Rent Amount', filter: true, width: 140 },
    { field: 'flat_area', headerName: 'Flat Type', filter: true, width: 140 },
    { field: 'featured', headerName: 'Verified', filter: true, width: 100 },
    { field: 'views', headerName: 'Views', filter: true, width: 90 },
    {
      field: 'Edit',
      width: 100,
      cellRenderer: (prop) => <FlatEditButton func={handleEdit} {...prop} />,
    },
    {
      field: 'Delete',
      width: 100,
      cellRenderer: (prop) => <FlatDeleteButton func={handleDelete} {...prop} />,
    },
  ];
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['Flats'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/flats/find-all-flats-info', {
        withCredentials: true,
      });
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
            <h1 className='text-2xl'>Flats</h1>
          </div>
        </div>
        {selectedRows.length > 0 && (
          <div className='flex items-center gap-3 px-5 py-2 bg-blue-50 border border-blue-200 rounded-md mx-3 mb-2'>
            <span className='text-sm font-medium text-blue-800'>
              {selectedRows.length} selected
            </span>
            <button
              onClick={() => handleBulkVerify(true)}
              disabled={bulkVerifyMutation.isPending}
              className='px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50'
            >
              Verify
            </button>
            <button
              onClick={() => handleBulkVerify(false)}
              disabled={bulkVerifyMutation.isPending}
              className='px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50'
            >
              Unverify
            </button>
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleteMutation.isPending}
              className='px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50'
            >
              Delete
            </button>
          </div>
        )}
        <div className='mt-2'>
          <Table
            ref={gridRef}
            rowData={data.data}
            colDefs={column}
            rowSelection='multiple'
            onSelectionChanged={onSelectionChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default Flat;
