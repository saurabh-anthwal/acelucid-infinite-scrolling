import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import "./Main.css";
export default function Main() {
  const [data, setData] = useState([]);

  let page = 1;
  async function loadFunc() {
    const res = await fetch(
      "https://api.github.com/repos/neovim/neovim/pulls?page=" + page
    );
    const result = await res.json();
    page++;
    console.log(result);
    setData([...data, ...result]);
  }
  return (
    <div className="mainBox">
      <InfiniteScroll
        pageStart={1}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        }
      >
        <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Base Branch</th>
              <th>Author Branch</th>
              <th>Author</th>
              <th>Created On</th>
              <th>Reviewers</th>
              <th>Labels</th>
            </tr>
          </thead>

          <tbody>
            {data.map((el, index) => (
              <tr className="mt-3 tableData" key={el.login}>
                <td>{index + 1}</td>

                <td>{el.title}</td>

                <td><a target="_blank" href={el.head.repo.branches_url}>{el.head.repo.branches_url}</a> </td>

                <td> <a target="_blank" href={el.user.html_url}>{el.user.html_url}</a></td>

                <td>{el.user.login}</td>

                <td>{el.created_at.slice(0,10)}</td>

                <td>{el.requested_reviewers.length>0?el.requested_reviewers.map((e)=>(
                 <div className="Reviewers">
                  <img src={e.avatar_url} alt="avtar"/>
                  <strong>{e.login}</strong>
                </div>
                )):<p>no rewiewers</p>}</td>  

                <td>{el.labels.map((e)=>(
                  <div className="subData">
                    <p><strong>url : </strong><a target="_blank" href={e.url}>{e.url}</a></p>
                    <p><strong>name : </strong>{e.name}</p>
                    <p><strong>color : </strong>{e.color}</p>
                    <p><strong>description : </strong><a target="_blank" href={e.description}></a>{e.description}</p>
                  </div>
                  
                ))}</td>

              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </InfiniteScroll>
    </div>
  );
}
