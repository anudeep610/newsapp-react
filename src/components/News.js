import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
// import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [article, setArticle] = useState([]);
    const [page, setPage] = useState(1);
    const [totalArticlesPerPage, setTotalArticlesPerPage] = useState(props.pageSize);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    //     document.title = props.category.charAt(0).toUpperCase() + props.category.slice(1) + "-NewsApp";

    const updateNews = async() => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${totalArticlesPerPage}`
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticle(parsedData.articles);
        setTotalPages(Math.ceil(parsedData.totalResults / totalArticlesPerPage));
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    
    const handleNextClick = async () => {
        await setPage(page + 1 );
        updateNews();
    }
    
    const handlePreviousClick = async () => {
        await setPage(page - 1 );
        updateNews();
    }
    
    useEffect(() => {
        updateNews();
    }, [])

    
    const fetchMoreData = async () => {
        props.setProgress(10);
        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${totalArticlesPerPage}`
        setLoading(true );
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticle(article.concat(parsedData.articles));
        setTotalPages(Math.ceil(parsedData.totalResults / totalArticlesPerPage));
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
        return (
            <>
                <h1 className="text-center">Top {props.category} headlines</h1>
                {/* {loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={article.length}
                    next={fetchMoreData}
                    hasMore={article.length !== totalResults}
                    // loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {/* {!loading && article.map((element) => { */}
                            { article.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} source={element.source.name} color={props.color} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={page<=1} className="btn btn-primary my-2" onClick={handlePreviousClick}>&larr;Previous</button>
                    <button disabled={page>=totalPages} className="btn btn-primary my-2" onClick={handleNextClick}>Next&rarr;</button>
                </div> */}
                {article.length === totalResults && <hr className="container" style={{height:"2px", width:"50%", color:"#0d6efd"}} />}
            </>
        );
    }

News.defaultProps = {
    pageSize: 5,
    country: "in",
    category: "general"
}

News.propTypes = {
    pageSize: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
}

export default News