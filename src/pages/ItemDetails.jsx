import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {

 const { itemID } = useParams();

 const [itemDetails, setItemDetails] = useState({});

 async function getItemDetails() {
  await axios
    .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemID}`)
    .then(({ data }) => {
      setItemDetails(data);
    });
 }

  useEffect(() => {
    window.scrollTo(0, 0);
    getItemDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              { Object.keys(itemDetails).length ? (
                <>
                <div className="col-md-6 text-center">
                  <img
                    src={itemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{itemDetails.title} #{itemDetails.tag}</h2>
                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetails.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetails.likes}
                      </div>
                    </div>
                    <p>{itemDetails.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              <img className="lazy" src={itemDetails.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.ownerId}`}>{itemDetails.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              <img className="lazy" src={itemDetails.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.creatorId}`}>{itemDetails.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{itemDetails.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                </>
              ):(
                <>
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="100%" borderRadius="8px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="70%" height="46px" borderRadius="8px" />
                    <div className="item_info_counts">
                      <Skeleton width="80px" height="30px" borderRadius="8px" />
                      <Skeleton width="80px" height="30px" borderRadius="8px" />
                    </div>
                    <Skeleton width="100%" height="120px" borderRadius="8px" />
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <Skeleton width="60px" height="16px" borderRadius="8px" />
                        <div className="item_author">
                          <div className="author_list_pp">
                              <Skeleton width="50px" height="50px" borderRadius="50%" />
                              <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="100px" height="24px" borderRadius="8px" />
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <Skeleton width="60px" height="16px" borderRadius="8px" />
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton width="50px" height="50px" borderRadius="50%" />
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="author_list_info">
                            <Skeleton width="100px" height="24px" borderRadius="8px" />
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <Skeleton width="60px" height="16px" borderRadius="8px" />
                      <div className="nft-item-price">
                        <Skeleton width="24px" height="24px" borderRadius="50%" />
                        <span></span>
                        <Skeleton width="60px" height="30px" borderRadius="8px" />
                      </div>
                    </div>
                  </div>
                </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
