import React from 'react'

export default function ApplicationList() {
  return (
    <div>
      <div className="text-center">
            <div className='p-4 pt-5'>
              <div class="card shadow">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">Applications</h5>
                  {/* <a href="# "onClick={handleAddBlog} class="btn btn-primary">Add Job</a> */}
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-4">
                      <input class="form-control me-2" type="text" aria-label="Search"
                        placeholder="Search something..."
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="col-4">
                  <select 
                    className="form-select" 
                    // value={language} 
                    // onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="english">English</option>
                    <option value="arabic">Arabic</option>
                  </select>
                </div>
                    {/* <div class="col-auto">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </div> */}
                  </div>

                  <table class="table">

                    <thead class="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Applied For</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                    </tbody>

                  </table>
                  {/* <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-start">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button
                    className="page-link"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    >
                    Previous
                    </button>
                    </li>
                      Page {page} of {totalPages}
                      <li class="page-item">
                        <button class="page-link"
                          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                          disabled={page === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav> */}
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}