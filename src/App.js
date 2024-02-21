import { useState } from 'react';
import './App.css';

const data = [
  { id: 1, name: 'John', age: 25, city: 'New York' },
  { id: 2, name: 'Alice', age: 30, city: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 28, city: 'Chicago' },
];

const CustomTable = ({ columns, data }) => {
  return (


<div className="table">
      <div className="table-row table-header">
        {columns.map(column => (
          <div className="table-cell" key={column.key} style={{ display: column.visible ? 'block' : 'none' }}>{column.label}</div>
        ))}
        </div>
      
        {data.map(row => (
          <div key={row.id} className="table-row">
            {columns.map(column => (
              <div className="table-cell" key={column.key} style={{ display: column.visible ? 'block' : 'none' }}>{row[column.key]}</div>
            ))}
          </div>
        ))}
        </div>
  );
};

const TableWithMenu = ({ columns, data }) => {
  const [visibleColumns, setVisibleColumns] = useState(columns.map(column => ({ ...column, visible: true })));

  const toggleColumnVisibility = key => {
    setVisibleColumns(prevColumns =>
      prevColumns.map(column =>
        column.key === key ? { ...column, visible: !column.visible } : column
      )
    );
  };

  return (
    <>
      <div className="container">
      <div className='card'>
      <div className='title'>
        <h2>Table</h2>
         <div class="menu-toggle">
  <input type="checkbox" id="toggle"/>
  <label for="toggle" class="button">
    <span class="icon"></span>
  </label>
      <ul class="menu">
        <ul>
          {visibleColumns.map(column => (
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
      </ul>
    </div>
          </div>
          <CustomTable columns={visibleColumns} data={data} />
        </div>
        </div>
    
    </>
  );
};


function App() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'city', label: 'City' },
  ];
  return (
      <TableWithMenu columns={columns} data={data} />
  );
}

export default App;
