import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import DataTable from "react-data-table-component";

const Button = (props) => (
  <div className="btn-group" role="group" aria-label="Action button group">
    <button
      type="button"
      name="Delete"
      className="btn btn-danger btn-sm"
      onClick={() => alert(props.book.book_id)}
    >
      Cancel
    </button>
  </div>
);

const EventBookings = (props) => {
  let books = props.books === null ? [] : props.books;
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
      selector: "event_title",
      sortable: true,
    },
    {
      name: "Speaker",
      selector: "event_speaker",
      sortable: true,
    },
    {
      name: "Ticket",
      selector: "ticket",
      sortable: true,
    },
    {
      name: "Location",
      selector: "event_location",
      sortable: true,
    },
    {
      name: "Tagline",
      selector: "event_tagline",
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => <Button book={row} />,
    },
  ];
  return (
    <Auxiliary>
      <DataTable
        title="Booked Event Lists"
        columns={columns}
        data={books}
        pagination={true}
        progressPending={pending}
      />
    </Auxiliary>
  );
};

export default EventBookings;
