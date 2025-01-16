import React, { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import Header from "./Components/Header";

const Table = ({ colDefs, api }) => {
  const { data, error, loading } = useFetch(api);
  const [currentPage, setCurrentPage] = useState(0);
  if (loading) {
    return <div>shimmer....</div>;
  }
  if (error) {
    return <div>something went wrong please try again..</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  const renderData = data.slice(currentPage, currentPage + 5);

  const nextPage = () => {
    setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 5);
  };

  return (
    <div>
      <h1>SaaS Labs</h1>
      <table>
        <Header colDefs={colDefs} />
        <tbody>
          {renderData.map((item) => (
            <tr key={item[colDefs[0].field]}>
              {colDefs.map((col, index) => (
                <td key={index}>{item[col.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={prevPage}>prev</button>
      <button onClick={nextPage}>next</button>
    </div>
  );
};

export default React.memo(Table);
