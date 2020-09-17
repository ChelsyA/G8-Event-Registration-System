import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import DataTable from "react-data-table-component";

const Button = (props) => (
  <div className="btn-group" role="group" aria-label="Action button group">
    <button
      type="button"
      name="View"
      className="btn btn-info btn-sm"
      onClick={() => alert(props.event.title)}
    >
      <i className="fas fa-eye"></i>
    </button>
    <button
      type="button"
      name="Delete"
      className="btn btn-danger btn-sm"
      onClick={() => alert(props.event.title)}
    >
      <i className="fas fa-trash"></i>
    </button>
  </div>
);

const Table = (props) => {
  let events = props.events === null ? [] : props.events;
  const [pending, setPending] = React.useState(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Speaker",
      selector: "speaker",
      sortable: true,
    },
    {
      name: "Location",
      selector: "location",
      sortable: true,
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
    {
      name: "Room",
      selector: "room_capacity",
      sortable: true,
    },
    {
      name: "Attendees",
      selector: "attendees",
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => <Button event={row} />,
    },
  ];
  return (
    <Auxiliary>
      <DataTable
        title="Event Lists"
        columns={columns}
        data={events}
        pagination={true}
        progressPending={pending}
      />
    </Auxiliary>
  );
};

export default Table;
