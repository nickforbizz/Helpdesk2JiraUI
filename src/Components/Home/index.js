import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

// icons
import PeopleIcon from "@material-ui/icons/People";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";

// components
import Table from "../../Utilities/Table";
import Modal from "../../Utilities/Modal";

export default function Home(props) {
  const ticket_title ="Active Tickets";
  const [ticket_data, setTicket_data] = useState([]);
  const [project, setProject] = useState();
  const [show_modal, setShow_modal] = useState(false);
  const { register, handleSubmit, errors } = useForm();


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
    getParam();
  }, []);

 
//  fetch data
  const getTickets = async () => {
    try {
      axios.get("tickets").then((data) => {
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

  const getParam = async () => {
    try {
      axios.get("params/1").then((data) => {
        let response = data.data;
        setProject(response.project);
      });
    } catch (err) {
      console.log(err.message || "Error Fetching tickets");
      return [];
    }
  };


  // pullTickets from helpdesk
  const pullTickets = () =>{
    console.log("pulling from helpdesk ...");
    try {
      axios.post("tickets").then((data) => {
        console.log(data);
        let response = data.data;
        if (response.length > 0) {
          toast("several tickets pulled successfully")
        } else {
          toast.error(response.message || "Error pulling tickets or no new tickets found")
        }
      });
    } catch (err) {
      toast.error(err.message)
      console.log(err.message || "Error Fetching tickets");
      return [];
    }
  }

    // pushTickets to Jira
    const pushTickets = () =>{
      console.log("pushing from helpdesk ...");
      try {
        axios.post("tickets/pushtojira").then((data) => {
          console.log(data.data);
          let response = data.data;
          if (response.code == 1) {
            toast("several tickets pushed to Jira successfully")
          } else {
            toast.error(response.message || "Error pulling tickets or no new tickets found")
          }
        });
      } catch (err) {
        toast.error(err.message)
        console.log(err.message || "Error Fetching tickets");
        return [];
      }
    }

  // post data
  const onSubmit = (data) => {
    console.log(data)
    try {
      axios.put("params/1",data).then((data) => {
        let response = data.data;
        console.log(response);
        if (response.code == -1) {
          toast(response.message)
        }else{
          toast(response.message)
        }
        
      });
    } catch (err) {
      console.log({err});
      console.log(err.message || "Error Fetching tickets");
    }
  };


  return (
    <div>
      <ToastContainer />
      <nav aria-label="breadcrumb mt-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
             Home 
          </li>
        </ol>
      </nav>
      <hr />

      

      <article className="row mb-5">
        <div className="col-12 col-sm-6">
          <p>
            Project : <b> {project}</b>
          </p>
        </div>
        <div className="col-12 col-sm-6">
          <div>
            <h4> Actions </h4> <hr />
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              <button className="btn btn-info w-100 crud-button">
                <PeopleIcon /> Add User
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button
                className="btn btn-info w-100 crud-button"
                onClick={() => setShow_modal(true)}
              >
                <PresentToAllIcon /> Update Project Entry
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              <button className="btn btn-info w-100 crud-button"
              onClick= {() => pullTickets()}>
                <VerticalAlignBottomIcon /> Helpdesk Pull
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button className="btn btn-info w-100 crud-button" 
              onClick= {() => pushTickets()}>
                <VerticalAlignTopIcon /> Jira Push
              </button>
            </div>
          </div>
        </div>
      </article>

      <article>
        <Table {...data} />
      </article>


      <article>
        <Modal
          isOpen={show_modal}
          close={() => setShow_modal(false)}
          title={"Ammend Project Entry"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="project_entry">Name of Project</label>
              <input
                type="text"
                className="form-control"
                name="project"
                value={project}
                onChange= {(e) => setProject(e.target.value)}
                id="project_entry"
                ref={register({ required: true })}
                placeholder="Enter project name"
              />
              {errors.project && (
                <span className="text-danger"> * This field is required</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal>
      </article>


    </div>
  );
}
