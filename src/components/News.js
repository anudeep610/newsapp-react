import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        console.log("constructor from news item");
        this.state = {
            article: [],
            loading: false
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e529c2fd0a9744c0921804d92e31c9f5"
        let data = await fetch(url);
        let parsedData=await data.json();
        this.setState({article:parsedData.articles})
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
            </div>
        )
    }
}
