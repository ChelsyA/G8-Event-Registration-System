import React from "react";
import axios from 'axios';
import Auxiliary from "../../../hoc/Auxiliary";
import DataTable from "react-data-table-component";
import { EVENTAPP_URL } from '../../../store/constants';

// For Canceling a booked event
const Button = (props) => {
  const cancel_book = () => {
    var FormData = require("form-data");
    var data = new FormData();
    data.append("book_id", props.book.book_id);

    var config = {
      method: "delete",
      url: EVENTAPP_URL + "remove_user_book/",
      data: data,
    };

    axios(config)
      .then(res => {
        console.log(JSON.stringify(res.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="btn-group" role="group" aria-label="Action button group">
      <button
        type="button"
        name="Delete"
        className="btn btn-danger btn-sm"
        onClick={cancel_book}
      >
        Cancel
      </button>
    </div>
  );
};

// Event booking lists
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
