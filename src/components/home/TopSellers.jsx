import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

  const [sellers, setSellers] = useState(new Array(12).fill(0));
  const [loading, setLoading] = useState(true);

  async function getSellers() {
    setLoading(true);
    await axios
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
      .then(({ data }) => {
        setSellers(data);
        setLoading(false);
      });
  }

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            className="col-md-12"
            data-aos="fade"
          >
            <ol className="author_list">
              { !loading ? (
                sellers.slice(0, 12).map((seller) => (
                  <li key={seller.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                      <span>{seller.price} ETH</span>
                    </div>
                  </li>
                ))
              ) : (
                sellers.map((_, id) => (
                  <li key={id}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="author_list_info">
                      <Skeleton width="65%" height="15px" borderRadius="8px" />
                      <div></div>
                      <Skeleton width="30%" height="15px" borderRadius="8px" />
                    </div>
                  </li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
