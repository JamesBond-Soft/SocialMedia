import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import Images from '../../../resources/assets';
import './index.scss';
import {
  IMAGE_FILE
} from '../../utils/constants';

class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      timelineMediaList: [],
      factsMediaList: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.timelineMediaList !== state.timelineMediaList || props.factsMediaList !== state.factsMediaList) {
      const timelineImageList = props.timelineMediaList.filter(item => item.fileType === IMAGE_FILE);
      const factsImageList = props.factsMediaList.filter(item => item.fileType === IMAGE_FILE);
      const imageList = timelineImageList.concat(factsImageList);
      return {
        timelineMediaList: props.timelineMediaList,
        factsMediaList: props.timelineMediaList,
        imageList
      };
    }
  }

  renderImages = () => {
    const { imageList } = this.state;
    if (imageList) {
      return (
        imageList.map((item, index) => (
          <div key={index}>
            <img src={item.path} alt="img" />
          </div>
        ))
      );
    }
  }

  render() {
    return (
      <Carousel autoPlay showThumbs={false} infiniteLoop showStatus={false}>
        {
            this.renderImages()
        }
      </Carousel>
    );
  }
}


function mapStateToProps(state) {
  const { timeline, facts } = state;
  return {
    timelineMediaList: timeline.mediaList, factsMediaList: facts.mediaList
  };
}

export default connect(mapStateToProps)(ImageCarousel);

