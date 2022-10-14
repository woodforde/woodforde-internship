import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from 'axios';

import OwlCarousel, { options } from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// Owl Carousel: Very code light with many options
// Keen Slider: Appears to be more mobile focused and to get an appearance that matches the spec requires too much code
// React Slick: Appears to be a good option with many options

// Both owl and slick appear to be very good options, but I find the owl documentation easier to read when looking for carousel options

const HotCollections = () => {

  const [collections, setCollections] = useState([]);
  // const [loaded, setLoaded] = useState(true);

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    // lazyLoading: true,
    responsive: {
      0: {
        items: 1,
      },
      572: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    }
  }

  async function getCollections() {
    let { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
    setCollections(data);
    // setLoaded(true);
  }

  useEffect(() => {
    getCollections();
  }, [])

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl-theme" {...carouselOptions}>
          {
            // loaded &&
            collections.map((collection) => (
              // <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={collection.id}>
                <div className="nft_coll" key={collection.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>ERC-{collection.code}</span>
                  </div>
                </div>
              // </div>
            ))
          }
          </OwlCarousel>
          {/* {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={AuthorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>Pinky Ocean</h4>
                  </Link>
                  <span>ERC-192</span>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
