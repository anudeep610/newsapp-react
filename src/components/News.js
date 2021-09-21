import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        pageSize: 5,
        country: "in",
        category: "general"
    }

    static propTypes = {
        pageSize: PropTypes.number.isRequired,
        country: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            article: [],
            page: 1,
            totalArticlesPerPage: this.props.pageSize,
            loading: false,
            totalPages: 0,
            totalResults: 0
        }
        document.title = this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) + "-NewsApp";
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.totalArticlesPerPage}`
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            article: parsedData.articles,
            totalPages: Math.ceil(parsedData.totalResults / this.state.totalArticlesPerPage),
            loading: false,
            totalResults: parsedData.totalResults
        });
        this.props.setProgress(100);
    }
    
    handleNextClick = async () => {
        await this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    
    handlePreviousClick = async () => {
        await this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    
    async componentDidMount() {
        this.updateNews();
    }
    
    fetchMoreData = async () => {
        this.props.setProgress(10);
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.totalArticlesPerPage}`
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            article: this.state.article.concat(parsedData.articles),
            totalPages: Math.ceil(parsedData.totalResults / this.state.totalArticlesPerPage),
            loading: false,
            totalResults: parsedData.totalResults
        });
        this.props.setProgress(100);
    }

    render() {
        return (
            <>
                <h1 className="text-center">Top {this.props.category} headlines</h1>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    // loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {/* {!this.state.loading && this.state.article.map((element) => { */}
                            { this.state.article.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} source={element.source.name} color={this.props.color} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePreviousClick}>&larr;Previous</button>
                    <button disabled={this.state.page>=this.state.totalPages} className="btn btn-primary" onClick={this.handleNextClick}>Next&rarr;</button>
                </div> */}
                {this.state.article.length === this.state.totalResults && <hr className="container" style={{height:"2px", width:"50%", color:"#0d6efd"}} />}
            </>
        );
    }
}
