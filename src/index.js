import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery'


class AppBliimo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    }
    this.search = this.search.bind(this);
  }

  showResults(response) {
    this.setState({
      searchResults: response.items
    })
  }

  search(URL) {
    $.ajax({
      type: 'GET',
      datatype: 'jsonp',
      url: URL,
      success: function(response){
        this.showResults(response);
      }.bind(this)
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <SearchBox search={this.search}/>
        <Results searchResults={this.state.searchResults}/>
      </div>
    )
  }

}

class SearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      query: ''
    }
    this.createAjax = this.createAjax.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  createAjax() {
    var query = this.state.query;
    var URL = 'https://www.googleapis.com/books/v1/volumes?q='+query;
    this.props.search(URL);
  }

  render() {
    return (
      <div>
        <input type="text" name="query" value={this.state.query} onChange={this.handleChange}/>
        <input type="submit" onClick={this.createAjax} />
      </div>
    )
  }
}

class Results extends React.Component {
  render() {
      var resultItems = this.props.searchResults.map(function(result){
        return <ResultItem key={result.id} volumeInfo={result.volumeInfo} />
      })
      return (
        <ul>
          {resultItems}
        </ul>
      )
  }
}

class ResultItem extends React.Component {
  render() {
    var info = this.props.volumeInfo
    console.log(info);
    return <li>
      <div className="rc">
        <h3 className="r">{info.title}</h3>
        <div className="s">
          <div>
            <div className="th">
              <img src={info.imageLinks.thumbnail} />
            </div>
          </div>
          <div className="c">
            <div className="dr">
              {info.authors.join(', ')}
            </div>
            <div className="dr">
              {info.publishedDate.substring(0, 4)}
            </div>
            <div>
              {info.description}
            </div>

          </div>
        </div>
      </div>
    </li>
    // <table><tr><td rowspan="3"><img src={info.imageLinks.thumbnail}/></td><td>Title - {info.title}</td></tr><tr><td>Author - </td></tr></table></div>
  }
}

ReactDOM.render(<AppBliimo />, document.getElementById('root'));
registerServiceWorker();
