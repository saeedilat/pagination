import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
// import { Pagination } from 'react-bootstrap'


export default function Pagination() {
  const [todos, setTodos] = useState([])
  const [isPending, setIsPending] = useState(true)
  const [thispage, setThispage] = useState(1)
  const [todoOnPage, setTodoOnPage] = useState([])







  useEffect(() => {

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(todos => {
        setTodos(todos)
        setIsPending(false)

        // console.log(todos);

      })


  }, [])

  useEffect(() => {
    const filtered = todos.filter((todo) => {
      return (thispage - 1) *12 < todo.id && todo.id < (thispage *12) +1
    })


    // const filteredpaginat = todos.splice(0, (thispage * 12))
    setTodoOnPage(filtered)
    // console.log(filteredpaginat);

  }, [todos,thispage])


  let currentPage = Math.ceil(todos.length / 12)
  // console.log(currentPage);
  let pageCount = Array.from(Array(currentPage).keys())
  //ساخت آرایه با متد array.from()
  //مقدار دهی به آرایه ساخته شده با کمک متدkeys()
  //ایندکس به عنوان مقدار گذاشته میشهkeys()
  // console.log(pageCount);

  function paginatedHandler(page) {
    setThispage(page + 1)

    const filtered = todos.filter((todo) => {
      return page * 12 < todo.id && todo.id < ((page + 1) * 12) +1
    })
    console.log(filtered);
    
    setTodoOnPage(filtered)
  }

  return (
    <div className=' d-flex justify-content-center ' >
      {isPending ? (<div className="spinner-border text-primary mt-5 " role="status">
        <span className="sr-only">loading...</span>
      </div>) : (<div className='container mt-4'>
        <Table striped bordered hover variant='dark'>
          <thead>
            <tr className='center'>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {todoOnPage.map(todo => {
              return (
                <tr key={todo.id}>
                  <td style={{ textAlign: 'center' }}>{todo.id}</td>
                  <td style={{ width: '60%', textAlign: 'center' }}>{todo.title}</td>
                  <td style={{ width: '30%', textAlign: 'center' }} className={todo.completed ? 'text-success' : 'text-danger'}>{todo.completed ? "completed" : "uncompleted"}</td>


                </tr>
              )
            })}
          </tbody>
        </Table>
        <nav aria-label="Page navigation example" className='d-flex justify-content-center ' >
          <ul className="pagination pagination-sm">
            <li className="page-item "><a onClick={() => { setThispage(prev => prev - 1) }} className="page-link" href="#">Previous</a></li>
            {pageCount.map(page => {
              return (
                <li key={page} className={thispage === page + 1 ? 'page-item active' : 'page-item'}><a onClick={() => paginatedHandler(page)} className="page-link" href="#">{page + 1}</a></li>

              )
            })}
            <li className="page-item"><a onClick={() => { setThispage(prev => prev + 1) }} className="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>)}


    </div>
  )
}
