import axios from "axios";
import Table from "../Table/Table.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Pages/Loader.jsx"
import ErrorComponent from "../../../components/Pages/ErrorComponent.jsx";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import { toast } from "react-toastify";
import { PGDeleteButton, PGEditButton } from "../Buttons.jsx";

const PG = () => {
  const navigate = useHistory();
  const mutation = useMutation({
    mutationKey: ['pg-delete'],
    mutationFn: (prop) => {
      return axios.delete(`/api/v1/pgs/delete-pg?id=${prop._id}`,
        {withCredentials: true}
      )
    },
    onSuccess (data) {
      toast.success(data.data.message); 
      refetch();
    },
    onError (error) {
      let message = error.response?.data?.message;
      toast.error(message);
    }
  })
  const handleDelete = (prop) => {
    mutation.mutate({_id: prop._id});
  };
  const handleEdit = (prop) => {
    console.log(prop)
    navigate.push(`/dashboard/pgs/edit-pg/${prop._id}`);
  };
  let column = [
    { field: "pg_name", headerName: "PG Name", filter: true, width: 160 },
    { field: "city", filter: true, width: 130 },
    { field: "locality", filter: true, width: 140 },
    { field: "preferred_tennats", headerName: "Preferred Tenants", filter: true, width: 168 },
    { field: "rent_amount", headerName: "Rent Amount", filter: true, width: 140 },
    { field: "featured", headerName: "Verified", filter: true, width: 100 },
    {
      field: "Edit",
      width: 100,
      cellRenderer: (prop) => (
        <PGEditButton func={handleEdit} {...prop}/>
      ),
    },
    {
      field: "Delete",
      width: 100,
      cellRenderer: (prop) => (
        <PGDeleteButton func={handleDelete} {...prop} />
      ),
    },
  ];
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["PGs"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/pgs/find-all-pgs-info", { withCredentials: true });
      return response.data;
    }
  })

  if (isLoading) return <div className="flex h-screen w-screen justify-center items-center"><Loader /></div>
  if (isError) return <ErrorComponent />
  return (
    <div className="w-[100vw] h-[90vh] bg-slate-100">
      <div className="mr-3">
        <div className="flex justify-between items-center h-[120px] ">
          <div className="w-[250px] ml-5 ">
            <h1 className="text-2xl">PGs</h1>
          </div>
        </div>
        <div className="mt-2">
          <Table rowData={data.data} colDefs={column} />
        </div>
      </div>
    </div>
  )
}

export default PG