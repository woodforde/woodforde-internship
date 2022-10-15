import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import NewItemsCountdown from "./NewItemsCountdown";


const NewItems = () => {
  const [items, setItems] = useState(new Array(4).fill(""));
  const [loading, setLoading] = useState(false);

  const carouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    callbacks: true,
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

  async function getItems() {
    setLoading(true);
    let { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel {...carouselOptions}> {
            items.map((item, id) => (
              <div key={id}>
                {loading ? (
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    { 
                      (item.expiryDate && item.expiryDate > 0) && <NewItemsCountdown expiryDate={item.expiryDate} />
                    }
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // <h1>loading</h1> implement skeleton
                )}
              </div>

            ))
          } </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
