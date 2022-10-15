import axios from "axios";
import React, { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import Skeleton from "../UI/Skeleton";
import ItemTile from "../UI/ItemTile";

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
    await axios
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
      .then(({ data }) => {
        setItems(data);
        setLoading(false);
      });
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
                { loading ? (
                  <ItemTile item={item} />
                ) : (
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton height="50px" width="50px" borderRadius="50%"/>
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton width="100%" height="85%" borderRadius="8px"/>
                    </div>
                    <div className="nft__item_info">
                      <Skeleton height="15px" width="90%" />
                      <div></div>
                      <span className="nft__item_info_skeleton_span"><Skeleton height="14px" width="40%" /><Skeleton height="14px" width="10%" /></span>
                    </div>
                  </div>
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
