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

export default Header;
