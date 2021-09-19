import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps={
        pageSize:5,
        country:"in",
        category:"general"
    }

    static propTypes={
        pageSize:PropTypes.number.isRequired,
        country:PropTypes.string.isRequired,
        category:PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            page:1,
            totalArticles:this.props.pageSize,
            loading: false,
            totalPages:0
        }
    }

    handleNextClick=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=in&apiKey=e529c2fd0a9744c0921804d92e31c9f5&page=${this.state.page + 1}&pageSize=${this.state.totalArticles}`
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData=await data.json();
        this.setState({
            page:this.state.page+1,
            article:parsedData.articles,
            loading:false
        });
    }

    handlePreviousClick=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=in&apiKey=e529c2fd0a9744c0921804d92e31c9f5&page=${this.state.page - 1}&pageSize=${this.state.totalArticles}`
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData=await data.json();
        this.setState({
            page:this.state.page-1,
            article:parsedData.articles,
            loading:false
        });
    }
    
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=e529c2fd0a9744c0921804d92e31c9f5&page=${this.state.page}&pageSize=${this.state.totalArticles}`
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData=await data.json();
        this.setState({
            article:parsedData.articles,
            totalPages:Math.ceil(parsedData.totalResults/this.state.totalArticles),
            loading:false
        });
    }

    render() {
        return (
            <div className="container my-3">
                <h1>{this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                {!this.state.loading && this.state.article.map((element)=>{
                    return <div className="col-md-4 my-3" key={element.url}>
                        <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} source={element.source.name} color={this.props.color} />
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
