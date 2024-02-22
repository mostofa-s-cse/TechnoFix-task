import { useEffect, useState } from 'react';
import './App.css';

// Function to handle edit action
const handleEdit = (id) => {
  console.log(`Editing item with ID ${id}`);
};

// Function to handle delete action
const handleDelete = (id) => {
  console.log(`Deleting item with ID ${id}`);
};

// Table component with menu to toggle column visibility
const TableWithMenu = ({ columns }) => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((column) => ({ ...column, visible: true }))
  );

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(json => {
        setData(json.users);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const toggleColumnVisibility = (key) => {
    setVisibleColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.key === key ? { ...column, visible: !column.visible } : column
      )
    );
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">
          <div>
            <h2>Table</h2>
            <div>
              <label id="itemsPerPage-label" htmlFor="itemsPerPage">Entries per page:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
          <div className="menu-toggle">
            <input type="checkbox" id="toggle" style={{ display: 'none' }} />
            <label htmlFor="toggle" className="button">
              <span className="icon"></span>
            </label>
            <ul className="menu">
              <p>Add or remove columns</p>
              {visibleColumns.map((column) => (
                <li key={column.key}>
                  <label>
                    <input
                      type="checkbox"
                      checked={column.visible}
                      onChange={() => toggleColumnVisibility(column.key)}
                    />
                    {column.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <CustomTable
            columns={[...visibleColumns, { key: 'actions', label: 'Actions' }]}
            data={data}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
};

// Table component with pagination
const CustomTable = ({ columns, data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
    <div className='table-container'>
      <div className="table">
        <div className="table-row table-header">
          {columns.map((column) => (
            <div
              className="table-cell"
              key={column.key}
              style={{ display: column.visible ? 'block' : 'none' }}
            >
              {column.label}
            </div>
          ))}
        </div>
        {currentPageData.map((row) => (
          <div key={row.id} className="table-row">
            {columns.map((column) => (
              <div
                className="table-cell"
                key={column.key}
                style={{ display: column.visible ? 'block' : 'none' }}
              >
                {column.key === 'action' ? (
                  <>
                    <button className='edit' onClick={() => handleEdit(row.id)}>Edit</button>
                    <button className='delete' onClick={() => handleDelete(row.id)}>Delete</button>
                  </>
                ) : (
                  row[column.key]
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
     <div className="pagination">
     <span className="page-number">Page {currentPage} of {totalPages}</span>
     <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
     {Array.from({ length: totalPages }).map((_, index) => (
       <button
         key={index}
         onClick={() => handlePageChange(index + 1)}
         className={currentPage === index + 1 ? 'active' : ''}
         disabled={currentPage === index + 1}
       >
         {index + 1}
       </button>
     ))}
     <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
   </div>
   </>
  );
};

// App component
function App() {
  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'email', label: 'Email' },
    { key: 'age', label: 'Age' },
    { key: 'phone', label: 'Phone' },
    { key: 'action', label: 'Action' },
  ];
  return <TableWithMenu columns={columns} />;
}

export default App;
