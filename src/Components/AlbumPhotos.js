import React, { Component } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './CSS/albums.css';

/*class AlbumImage extends Component {
  render(){
    return (
      <div className="album-container">
        <div className="album-cover-container">
          <img height="100%" width="100%" src={this.props.imageLink} alt={this.props.imageId} />
        </div>
      </div>
    )
  }
}*/

class AlbumPhotos extends Component {

state = {
  albumId: null,
  loading: false,
  imageList: [],
  open: false
}

onOpenModal = () => {
    this.setState({ open: true });
  };

onCloseModal = () => {
    this.setState({ open: false });
  };

  componentWillMount(){
    this.setState({
      albumId: this.props.match.params.id,
      loading: true
    });

    var settings = {
      "url": "https://api.imgur.com/3/album/" + this.props.match.params.id + "/images",
      "method": "GET",
      "headers": {
        "Authorization": "Client-ID f8cc7ecefef0b50",
      }
    }

    axios(settings)
    .then((res)=>{
      res.data.data.map((g) => {
        this.state.imageList.push(g);
        return 0;
      });

      this.setState({loading: false});
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  render() {
    if(this.state.loading){
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
    }
    return (
      <div>
        <div>
          <h1 style={{textAlign: "center"}}>{this.props.match.params.name}</h1>
        </div>
        <div>
          <Carousel dynamicHeight={true}>
            {
              this.state.imageList.map((x)=>{
                return (
                  <div key={x.id}>
                    <img src={x.link} alt={x.id}/>
                  </div>
                )
              })
            }
          </Carousel>
        </div>
      </div>

    );
  }
}

export default AlbumPhotos;

/* <div className="album-grid">
  {
    this.state.imageList.map((x)=>{
      return (
        <AlbumImage key={x.id} imageId={x.id} imageLink={x.link}/>
      )
    })
  }
</div>

*/
