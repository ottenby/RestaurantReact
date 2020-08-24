import React, { useState } from "react";
import { Query } from "../models/Query";

export interface IFormData {
  name: string;
  date: string;
  numberOfGuests: string;
}

export function Form() {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    date: "",
    numberOfGuests: ""
  });

  function updateFormValues(
    e: React.ChangeEvent<HTMLInputElement>,
    id: keyof IFormData
  ) {
    setFormData({ ...formData, [id]: e.target.value});
  }

  console.log(formData);

  function newQuery() {
    let query = new Query();
    query.date = formData.date;
    query.numOfPeople = formData.numberOfGuests;
    console.log(query);
  }


  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={e => updateFormValues(e, "name")}
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        onChange={e => updateFormValues(e, "date")}
      />
      <input
        type="number"
        max="6"
        name="number-of-guests"
        placeholder="Number of guests"
        className="num-of-guests"
        onChange={e => updateFormValues(e, "numberOfGuests")}
      />
      <button
        onClick={newQuery}>
        Check for available tables
      </button>
    </>
  );
}
