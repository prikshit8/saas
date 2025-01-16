import React from "react";
import PropTypes from "prop-types";

const Header = ({ colDefs }) => {
  return (
    <thead>
      <tr>
        {colDefs.map((def) => (
          <th key={def.headerName}>{def.headerName}</th>
        ))}
      </tr>
    </thead>
  );
};

Header.propTypes = {
  colDefs: PropTypes.arrayOf(
    PropTypes.shape({
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default React.memo(Header);
