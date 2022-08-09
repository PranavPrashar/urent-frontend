import React, { Component } from "react";
import "./ListingDetailsPage.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import FavouriteComponent from "../FavouriteComponent/FavouriteComponent";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";

class ListingDetailsPage extends Component {
  state = {
    listingInfo: null,
    imagesArray: null,
  };
  componentDidMount() {
    const listingId = this.props.match.params.listingID;

    axios
      .get(`http://localhost:5050/listings/singleListing/${listingId}`)
      .then((response) => {
        this.setState({ listingInfo: response.data[0] });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:5050/images/listingImages/${listingId}`)
      .then((response) => {
        this.setState({ imagesArray: response.data });
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(listingId);
  }
  render() {
    console.log(this.state.listingInfo);
    return (
      <div className="listingdetailspage">
        <div>
          <FavouriteComponent listingID={this.props.match.params.listingID} />
        </div>
        <div className="listingdetailspage__top">
          <h1 className="listingdetailspage__top--heading">
            {this.state.listingInfo?.listingAddress}
          </h1>
          <p className="listingdetailspage__top--price">
            ${this.state.listingInfo?.price}/Month
          </p>
          <p className="listingdetailspage__top--id">
            Listing Id: {this.state.listingInfo?.listingID}
          </p>
          <p className="listingdetailspage__top--id">
            Contact Email: {this.state.listingInfo?.email}
          </p>
          <p className="listingdetailspage__top--id">
            Contact Phone:{" "}
            <a href={this.state.listingInfo?.phonenumber}>
              {this.state.listingInfo?.phonenumber}
            </a>
          </p>
        </div>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="listingdetailspage__swiper"
        >
          {this.state.imagesArray?.map((image, index) => {
            return (
              <SwiperSlide>
                <img
                  src={image.listingImagePath}
                  alt="alt "
                  className="listingdetailspage__image"
                  key={index}
                />
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>Testing</SwiperSlide>
          <SwiperSlide>Testing 2</SwiperSlide> */}
        </Swiper>
        <div className="listingdetailspage__details">
          <div>
            <p className="listingdetailspage__details--heading">
              Listing Details:
            </p>
          </div>
          <div>
            <p className="listingdetailspage__details--paragraph">
              Listing City: {this.state.listingInfo?.listingCity}{" "}
            </p>
            <p className="listingdetailspage__details--paragraph">
              # Bathrooms: {this.state.listingInfo?.listingBathrooms}
            </p>
            <p className="listingdetailspage__details--paragraph">
              # Bedrooms: {this.state.listingInfo?.listingBedrooms}
            </p>

            <p>Square Feet: {this.state.listingInfo?.size}</p>
          </div>
          <div>
            <h5 className="listingdetailspage__details--headingsmall">
              Listing Description:
            </h5>
            <p>{this.state.listingInfo?.listingDescription}</p>
          </div>
        </div>

        <div>
          <p>MAP SECTION</p>
        </div>
      </div>
    );
  }
}

export default ListingDetailsPage;
