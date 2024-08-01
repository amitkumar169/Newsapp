import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
  
    constructor(){
        super();
        console.log("this is constructor")
        this.state = {
            articles : [],
            loading: false
           
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=3c6bd906a55a43a9bfd6e44b0b3c0a38&page=1&pagesize=20"
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles})
    }

    handlePrevClick = async () =>{
        console.log("prev");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3c6bd906a55a43a9bfd6e44b0b3c0a38&page=${this.state.page - 1}&pagesize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
          page: this.state.page - 1,
          articles:parsedData.articles
  
        })
    }
    handleNextClick = async () =>{
      console.log("next");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3c6bd906a55a43a9bfd6e44b0b3c0a38&page=${this.state.page + 1}&pagesize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles

      })
    }
  render() {
    console.log("render")
    return (
      <div className="container my-3">
        <h2 className='text-center'>NewsMonkey - Top Headlines</h2>
       
        <div className="row">
        {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                 <Newsitem   title={element.title?element.title.slice(0,70):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                 </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
