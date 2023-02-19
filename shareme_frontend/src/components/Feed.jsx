import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);

      console.log(query);
      client.fetch(query).then((data) => {
        console.log(data);
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message={`We are adding ideas to your feed!`} />;
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
