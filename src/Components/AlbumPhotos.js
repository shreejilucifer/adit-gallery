import React, { Component } from 'react';
import axios from 'axios';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
//import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-responsive-modal';
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
  selectedImageLink: null,
  openModal: false
}

  componentWillMount(){
    this.setState({
      albumId: this.props.match.params.id,
      loading: true
    });

    var settings = {
      "url": "https://api.imgur.com/3/album/" + this.props.match.params.id + "/images",
      "method": "GET",
      "headers": {
        "Authorization": "Client-ID f8cc7ecefef0b50", // To Change to ADIT Account Key
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

  renderImages = (id, link) => {
    return(
      <div className="album-container" onClick={()=>{
        this.setState({
          selectedImageLink: link,
          openModal: true
        });
      }}>
        <div className="album-cover-container">
          <img height="100%" width="100%" src={link} alt={id} />
        </div>
      </div>
    )
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
        <div className="album-grid">
          {
            this.state.imageList.map(
              (x)=>{
                return (
                  <div key={x.id}>
                    {this.renderImages(x.id, x.link)}
                  </div>
                )
              }
            )
          }
        </div>
        <div>
          <Modal open={this.state.openModal} onClose={()=>{
            this.setState({
              selectedImageLink: null,
              openModal: false
            })
          }} center>
            <img src={this.state.selectedImageLink} height="100%" width="100%" alt="adit"/>
          </Modal>
        </div>
      </div>

    );
  }
}

export default AlbumPhotos;

// Carousel
/*
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
*/

// Grid Older
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
