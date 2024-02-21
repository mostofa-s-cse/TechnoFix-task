import './App.css';

function App() {
  return (
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
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </div>
       
      </div>


      <div className="table">
        <div className="table-row table-header">
          <div className="table-cell">Name</div>
          <div className="table-cell">Age</div>
          <div className="table-cell">Email</div>
        </div>
        <div className="table-row">
          <div className="table-cell">John Doe</div>
          <div className="table-cell">30</div>
          <div className="table-cell">john@example.com</div>
        </div>
        <div className="table-row">
          <div className="table-cell">Jane Smith</div>
          <div className="table-cell">25</div>
          <div className="table-cell">jane@example.com</div>
        </div>
        {/* Add more rows as needed */}
      </div>
      </div>
      </div>
  );
}

export default App;
