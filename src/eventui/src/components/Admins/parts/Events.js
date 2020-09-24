import React from "react";
import axios from "axios";
import Auxiliary from "../../../hoc/Auxiliary";
import DataTable from "react-data-table-component";
import { EVENTAPP_URL } from "../../../store/constants";

const Events = (props) => {
  let events = props.events === null ? [] : props.events;
  const [pending, setPending] = React.useState(true);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const Button = (props) => {
    const delete_event = () => {
      var FormData = require("form-data");
      var data = new FormData();
      data.append("event_id", props.event.id);

      var config = {
        method: "delete",
        url: EVENTAPP_URL + "delete_event/",
        data: data,
      };

      let delete_confirm = window.confirm("Are you sure to delete this event?");
      events = events.filter(e => !props.event.id === e.id)
      return
      if (delete_confirm) {
        axios(config)
          .then((res) => {
            if (res.status === 200) {
              events = events.filter(e => !props.event.includes(e))
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    return (
      <div className="btn-group" role="group" aria-label="Action button group">
        <button
          type="button"
          name="Delete"
          className="btn btn-danger btn-sm"
          onClick={delete_event}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    );
  };

  

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
      cell: (row) => <Button ondelete={props.onDelete} event={row} />,
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

export default Events;
