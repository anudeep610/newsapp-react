import React from 'react'

const NewsItem = (props)=> {
        let {title,desc,imageUrl,newsUrl,date,source,color,mode}=props;
        return (
            <div className="my-3">
                <div className={`card bg-${mode}`}>
                <div style={{display: "flex",flexFlow:"row",position: "absolute",right:0,top:"-10px"}}>
                    <span className={`badge rounded-pill bg-${color}`}>{source}</span>
                </div>
                <img src={imageUrl?imageUrl:"https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA="} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{desc?desc:"click on read more"}</p>
                    <p className="card-text"><small className="text-muted">{new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl?newsUrl:"https://news.google.com/topstories?hl=en-IN&gl=IN&ceid=IN:en"} target="__blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
                </div>
            </div>
        )
}

export default NewsItem 
