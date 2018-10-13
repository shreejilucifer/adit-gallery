import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './CSS/albums.css';

class Albums extends Component {
  render(){
    let coverID = "https://i.imgur.com/" + this.props.coverId + ".jpg";
    let Id = "/" + this.props.albumId + "/" + this.props.albumName ;

    return (
      <Link to={Id}>
        <div className="album-container">
          <div className="album-cover-container">
            <img height="100%" width="100%" src={coverID} alt={this.props.albumName} />
          </div>
          <div className="album-name">
            {this.props.albumName}
          </div>
        </div>
      </Link>
    )
  }
}

class AlbumsList extends Component {

  state = {
    albumList: [],
    loading: false,
    errMessage: ""
  }

  componentWillMount(){

    this.setState({ loading: true });

    var settings = {
      "url": "https://api.imgur.com/3/account/shreejilucifer/albums",
      "method": "GET",
      "headers": {
        "Authorization": "Client-ID f8cc7ecefef0b50",
      }
    }

    axios(settings).then((res)=>{

      res.data.data.map((g) => {
        this.state.albumList.push(g);
        return 0;
      })

      this.setState({ loading: false })
    })
    .catch((err)=>{
      console.log(err);
      this.setState({errMessage: "An Error Occured Fetching Albums ! Please Try Again Later"})
    })
  }


  render() {
    if( this.state.loading ){
      return (
        <div>
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          {this.state.errMessage}
        </div>
      )
    } else {
      return (
        <div>
        <div className="album-grid">
        {
          this.state.albumList.map((x)=>{
            return <Albums
            coverId={x.cover}
            albumId={x.id}
            key={x.id}
            albumName={x.title} />
          })
        }
        </div>
        </div>
      );
    }
  }
}

export default AlbumsList;
