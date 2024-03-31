import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
// import { FaSquareCheck } from "react-icons/fa6";
// import { ImCross } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

function Crud() {
  const [activity, setActivity] = useState("");
  const [todolist, setToDoList] = useState([]);
  //const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/getAll");
        setToDoList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }); // Empty dependency array ensures the effect runs only once on component mount

  const addActivity = () => {
    const newToDoActivity = {
      taskName: activity,
      status: false,
      id: uuidv4()
    };
    axios.post("http://localhost:3500/save", newToDoActivity);
    setActivity("")
  };

  // const handleToggle = async (itemId) => {
  //   const newtodolist2 = todolist.map((activityitem) => {
  //     if (activityitem.id === itemId) {
  //       const statusNew = !activityitem.status;
  //       const newToDoActivity = {
  //         ...activityitem,
  //         status: statusNew,
  //       };
  //       axios.put(`http://localhost:3500/update/${itemId}`, newToDoActivity)
  //         .then(result => console.log(result.data))
  //         .catch(err => console.log(err));

  //       return newToDoActivity;
  //     }
  //     return activityitem;
  //   });
  //   setToDoList(newtodolist2);
  // };

  const handleDelete = async (itemId) => {
    axios.delete(`http://localhost:3500/delete/${itemId}`)
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
  };

  const removeAll = async () => {
    axios.delete(`http://localhost:3500/deleteAll`)
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
  };

  const editActivity = (Id) => {
    const activityItem = todolist.find((activityitem) => activityitem.id === Id);
    setActivity(activityItem.taskName);
    handleDelete(Id)
  };

  // const editActivityItem = () => {
  //   const updatedToDoList = todolist.map(item => {
  //     if (item.id === editItemId) {
  //       return { ...item, taskName: activity };
  //     }
  //     return item;
  //   });

  //   axios.put(`http://localhost:3500/update/${editItemId}`, { taskName: activity })
  //     .then(result => console.log(result.data))
  //     .catch(err => console.log(err));

  //   setToDoList(updatedToDoList);
  //   setActivity("");
  //   setEditItemId(null);
  // };

  return (
    <>
      <div className="Add-activity">
        <label>Activity</label>
        <input
          type="text"
          placeholder="Add Your Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button onClick={addActivity}>Add</button>

        <ul className="aclist">
          <h1>Activity List...</h1>
          {todolist.map((activityitem) => (
            <li
              style={{ backgroundColor: activityitem.status ? "blue" : "green" }}
            >
              <span>
                {activityitem.taskName}
                <span>
                  <MdDeleteForever
                    onClick={() => handleDelete(activityitem.id)}
                  />
                  <FaEdit onClick={() => editActivity(activityitem.id)} />
                </span>
              </span>
            </li>
          ))}
          <div>
            {todolist.length >= 1 && (
              <button onClick={removeAll}>DeleteAll</button>
            )}
          </div>
        </ul>
      </div>
    </>
  );
}

export default Crud;
