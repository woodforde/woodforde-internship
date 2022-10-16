import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState(new Array(4).fill(""));
  const [loading, setLoading] = useState(false);

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
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
    setLoading(true);
    let { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
    setCollections(data);
    setLoading(false);
  }

  useEffect(() => {
    getCollections();
  }, [])

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div
          className="row"
          data-aos="fade"
        >
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>          
          <OwlCarousel className="owl-theme" {...carouselOptions}>
            { (collections.map((collection, id) => (
              <div key={id}>
              { loading ? (
                <div className="nft_coll" key={collection.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${collection.authorId}`}>
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
              ) : (
                <div className="nft_coll" key={id}>
                  <div className="nft_wrap">
                    <Skeleton width="100%" height="100%" />
                  </div>
                  <div className="nft_coll_pp">
                    <Skeleton width="60px" height="60px" borderRadius="50%" />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Skeleton width="60%" height="16px" />
                    <div></div>
                    <Skeleton width="20%" height="12px" />
                  </div>
                </div>
              )}
              </div>
            )))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
