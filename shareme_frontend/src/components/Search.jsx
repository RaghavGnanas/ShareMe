import React, { useEffect, useState } from "react";
import { client } from "../client";
import Spinner from "./Spinner";
import { searchQuery, feedQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";

const Search = ({ searchTerm, setSearchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  useEffect(() => {
    if (searchTerm !== "") {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);
  return (
    <div>
      <div className="font-bold text-slate-500">
        Search Results for {searchTerm} ...
      </div>

      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
