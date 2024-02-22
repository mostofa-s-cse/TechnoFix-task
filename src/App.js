import { useEffect, useState } from 'react';
import './App.css';

const handleEdit = (id) => {
  // Handle edit action
  console.log(`Editing item with ID ${id}`);
};

const handleDelete = (id) => {
  // Handle delete action
  console.log(`Deleting item with ID ${id}`);
};

const TableWithMenu = ({ columns }) => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((column) => ({ ...column, visible: true }))
  );

  const [itemsPerPage, setItemsPerPage] = useState(10); // Initial value

  const [data, setData] = useState([]); // Initialize data with an empty array
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(json => {
        setData(json.users);
        setIsLoading(false); // Set loading state to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading state to false in case of an error
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
    <>
      <div className="container">
        <div className="card">
          <div className="title">
            <div>
              <h2>Table</h2>
              <div>
                <label htmlFor="itemsPerPage">Entries per page:</label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  {/* Add more options if needed */}
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
          {isLoading ? ( // Conditionally render loader if isLoading is true
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
    </>
  );
};

const CustomTable = ({ columns, data, itemsPerPage }) => {
  // State to manage current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Data to be displayed on the current page
  const currentPageData = data.slice(startIndex, endIndex);

  // Total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
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
    {/* Pagination controls */}
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
