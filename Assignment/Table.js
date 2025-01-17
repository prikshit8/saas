import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFetch } from "./hooks/useFetch";
import Header from "./Components/Header";
import { NEXT, PREV } from "./constants";

const Table = ({ colDefs, api, rowsPerPage }) => {
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

  const renderData = data.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const isNextDisabled = (currentPage + 1) * rowsPerPage >= data.length;
  const isPrevDisabled = currentPage === 0;

  const nextPage = () => {
    if (!isNextDisabled) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (!isPrevDisabled) {
      setCurrentPage(currentPage - 1);
    }
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
      <button disabled={isPrevDisabled} onClick={prevPage}>{PREV}</button>
      <button disabled={isNextDisabled} onClick={nextPage}>{NEXT}</button>
    </div>
  );
};

Table.propTypes = {
  colDefs: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  api: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default React.memo(Table);
