import React from "react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseConfig";

const SmoothieCard = ({ smoothie, onDelete }) => {
  const { id, title, method, rating } = smoothie;

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.log("Error deleting the data", error);
    }
    if (data) {
      console.log("Data being deleted", data);
      onDelete(id);
    }
  };
  return (
    <div className="smoothie-card">
      <h3>{title}</h3>
      <p>{method}</p>
      <div className="rating">{rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default SmoothieCard;
