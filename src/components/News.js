import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

function News() {

  const [news,setNews] = useState([])
  const [page,setpage]=useState(1)
  
  const handlePageClick=(data)=>{
    console.log(data.selected);
    setpage(data.selected)

}
  const newsLatest= async ()=>{
   const res= await axios.get("https://newsapi.org/v2/everything?q=keyword&apiKey=e8757625e32e42e1ad2e70adf0b2ce2b")
    .then((res)=>{
      console.log(res.data.articles);
      setNews(res.data.articles)
    })
  }

  useEffect(()=>{
   newsLatest()
  },[])

  function truncate(str,n){
    // n=100;
   return str?.length>n ? str.substr(0,n-1)+". . .":str;
 }




  return (
    <div className='container my-5'>
      <div className='row text-center'>
     {
      news.slice(page *10 -10,page*12).map((data)=>{
        return(
          <div className='col mt-3'  >
          <div className="card" style={{width: "20rem" , height:"34rem",border:"3px"}} sm={12} md={6} lg={4} xl={3}>
    <img src={data.urlToImage} className="card-img-top p-1" alt="..." />
    <div className="card-body"  >
      <h5 className="card-title fw-bolder" >{data.title}</h5>
      <p className="card-text">{truncate(data.description,100)}</p>
      <a href={data.url} className="btn btn-primary" >Read More </a>
    </div>
  </div>
          </div>
        )
      })
     }
      </div>

      <ReactPaginate containerClassName='pagination justify-content-center m-5'


pageClassName='page-item'
pageLinkClassName='page-link'
breakLabel="..."
nextLabel="next"
onPageChange={handlePageClick}
pageRangeDisplayed={10}
pageCount={10}
previousLabel="previous"
breakClassName='page-item'
previousClassName='page-item'
previousLinkClassName='page-link'
nextClassName='page-item'
nextLinkClassName='page-link'
breakLinkClassName='page-link'
renderOnZeroPageCount={null}
activeClassName='active-page'
/>

    </div>
  )
}

export default News