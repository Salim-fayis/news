import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
function Newstrail() {
   
  const [news,setNews] = useState([])
  const [page,setpage]=useState(0)
  const postPerPage=10;
  const pageCount =Math.ceil(news.length / postPerPage)
  const pageVisited = page * postPerPage
  const [currentPage,setCurrentPage]=useState(0)
  
const handlePageClick=(e)=>{
    console.log(e.selected);
    setpage(e.selected)

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

const displayPost = 
  news.slice(pageVisited, pageVisited + postPerPage).map((data)=>{
    return(
      <div className='col mt-3'  >
      <div className="card" style={{width: "20rem" , height:"34rem",border:"3px",borderRadius:'5px'}} sm={12} md={6} lg={4} xl={3}>
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
 


  return (
    <div className='container my-5'>
      <div className='row text-center'>
     {
      displayPost
     }
      </div>

     

    </div>


  )
}


export default Newstrail