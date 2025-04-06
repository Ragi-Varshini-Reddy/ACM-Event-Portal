import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '@clerk/clerk-react'
import { MdFilterListAlt } from "react-icons/md";
import './Articles.css'

function Articles() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')
  const [filteredArticles, setFilteredArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const navigate = useNavigate()
  const {getToken} = useAuth()

  // Get all articles
  // async function getArticles(){
  //   // Get jwt token
  //   const token = await getToken();

  //   // Make authenticated request
  //   let res = await axios.get('http://localhost:3000/author-api/articles', {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   console.log(res.data.payload)
  //   if(res.data.message === 'articles'){
  //     setArticles(res.data.payload)
  //     setFilteredArticles(res.data.payload)
  //     const uniqueCategories = [
  //       "All", ...new Set(res.data.payload.map((article) => article.category))
  //     ]
  //     setCategories(uniqueCategories)
  //   } else {
  //     setError(res.data.message)
  //   }
  // }
   
  async function getArticles(){
    try {
      const token = await getToken();
      const res = await axios.get('http://localhost:3000/author-api/articles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Response:", res.data);
      setArticles(res.data.payload);
      setFilteredArticles(res.data.payload);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to fetch articles");
    }
  }  

  //Go to specific article
  function goToArticleById(articleObj){
    navigate(`../${articleObj.title}`, {state: articleObj})
  }

  // Handle category filtering
  function handleFilterChange(e){
    const category = e.target.value;
    setSelectedCategory(category);
    if(category === "All") {
      setFilteredArticles(articles)
    } else {
      const filtered = articles.filter((article) => article.category === category);
      setFilteredArticles(filtered);
    }
  }

  useEffect(() => {
    getArticles()
  }, [])

  useEffect(() => {
    if (articles.length > 0) {
      const uniqueCategories = ["All", ...new Set(articles.map((article) => article.category))];
      setCategories(uniqueCategories);
    }
  }, [articles]);

  return (
    <div className='container'>
      <div>
        {error.length !== 0 && <p className='display-4 text-center mt-5 text-danger'>{error}</p>}

      {/* filter dropdown */}
      <div className="text-end mb-5">
        <select className="form-select w-auto d-inline-block" value = {selectedCategory} onChange={handleFilterChange}>
          <option value="All" disabled>Category</option>
          {categories.map((category) => (
            <option value={category} key = {category}>{category}</option>
          ))
        }
        </select>
      </div>

        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
          {
            filteredArticles.map((articleObj) => 
              <div className="col mb-4" key = {articleObj.title}>
                <div className="card h-100">
                  <div className="cardbody">
                    {/* <div className="author-details text-end">
                      <img src={articleObj.authorData.profileImageUrl}  className = "rounded-circle" width = "40px" alt="" />
                      <p>
                        <small className="text-secondary">
                          {articleObj.authorData.nameOfAuthor}
                        </small>
                      </p>
                    </div> */}
                    <h5 className='card-title'>{articleObj.title}</h5>
                    <p className='card-text'> {articleObj.description + "...."} </p>
                    <button className='btn-4 custom-btn' onClick={() => goToArticleById(articleObj)}>
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
      
    </div>
  )
}

export default Articles