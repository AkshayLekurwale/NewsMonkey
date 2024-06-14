import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  // document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    updateNews();
  }, [])
  
  const updateNews =  async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(parseData.articles);
    setLoading(false);
    settotalResults(parseData.totalResults);
    
    props.setProgress(100);
  }

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    settotalResults(parseData.totalResults)
  };

    return (
      <>
        <h1 className="text-center my-6" style={{ backgroundColor: 'gray', color: 'white', marginTop: '70px' }}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className='row'>
              {articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title} imgUrl={element.urlToImage} description={element.description} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
}

export default News;
