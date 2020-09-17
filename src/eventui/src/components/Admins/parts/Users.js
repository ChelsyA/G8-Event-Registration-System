import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import DataTable from "react-data-table-component";

const Users = (props) => {
  let users = props.users === null ? [] : props.users;
  const [pending, setPending] = React.useState(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Username",
      selector: "username",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Address",
      selector: "address",
      sortable: true,
    },
  ];
  return (
    <Auxiliary>
      <DataTable
        title="User Lists"
        columns={columns}
        data={users}
        pagination={true}
        progressPending={pending}
      />
    </Auxiliary>
  );
};

export default Users;
