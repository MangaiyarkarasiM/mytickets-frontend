import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import fetchApi from "../utils/fetchApi";

const Seatingpage = () => {
  let { id } = useParams();

  async function getSeating(id){
    let res = await fetchApi.get()
  }

  useEffect(() => {
    getSeating(id);
  }, [id]);

  return <div>{id}</div>;
};

export default Seatingpage;
