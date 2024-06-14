import React, { Component } from 'react'

const NewsItem = (props) => {

        let {title,description,imgUrl,newsUrl, author, date} = props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imgUrl?imgUrl:"https://c.biztoc.com/p/deec712ce3414248/s.webp"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small class="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
