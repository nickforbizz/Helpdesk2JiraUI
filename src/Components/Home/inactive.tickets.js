import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link } from "react-router-dom"

// components
import Table from "../../Utilities/Table";

export default function Inactivetickets(props) {
  const ticket_title = "Inctive Tickets";
  const [ticket_data, setTicket_data] = useState([]);

  const ticket_columns = [
    "#",
    "Subject",
    "Description",
    "Assigned",
    "Reporter",
    "Project",
    "Status",
  ];

  let data = {
    title: ticket_title,
    columns: ticket_columns,
    data: ticket_data,
  };

  useEffect(() => {
    getTickets();
  }, []);

  //  fetch data
  const getTickets = async () => {
    try {
      axios.get("tickets?active=0").then((data) => {
        let response = data.data.data;
        let res = [];
        if (response.length > 0) {
          response.map((item, i) => {
            i += 1;
            res.push([
              i,
              item.subject,
              item.description,
              item.assigned,
              item.reporter,
              item.project,
              item.status,
            ]);
          });
        }
        setTicket_data(res);
      });
    } catch (err) {
      console.log(err.message || "Error Fetching tickets");
      return [];
    }
  };
  return (
    <div>

<nav aria-label="breadcrumb mt-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
      </nav>
      <hr />


      <article>
        <Table {...data} />
      </article>
    </div>
  );
}
