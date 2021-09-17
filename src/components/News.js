import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            article: [],
            page:1,
            totalArticles:10,
            loading: false,
            totalPages:0
        }
    }

    handleNextClick=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e529c2fd0a9744c0921804d92e31c9f5&page=${this.state.page + 1}&pageSize=${this.state.totalArticles}`
        let data = await fetch(url);
        let parsedData=await data.json();
        this.setState({
            page:this.state.page+1,
            article:parsedData.articles
        });
    }

    handlePreviousClick=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e529c2fd0a9744c0921804d92e31c9f5&page=${this.state.page - 1}&pageSize=${this.state.totalArticles}`
        let data = await fetch(url);
        let parsedData=await data.json();
        this.setState({
            page:this.state.page-1,
            article:parsedData.articles
        });
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e529c2fd0a9744c0921804d92e31c9f5&page=${this.state.page}&pageSize=${this.state.totalArticles}`
        let data = await fetch(url);
        let parsedData=await data.json();
        this.setState({
            article:parsedData.articles,
            totalPages:Math.ceil(parsedData.totalResults/this.state.totalArticles)
        });
    }

    render() {
        return (
            <div className="container my-3">
                <h1>Top headlines</h1>
                <div className="row">
                {this.state.article.map((element)=>{
                    return <div className="col-md-4 my-3" key={element.url}>
                        <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                    </div>
                })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePreviousClick}>&larr;Previous</button>
                    <button disabled={this.state.page>=this.state.totalPages} className="btn btn-primary" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}
