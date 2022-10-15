import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemTile from "../UI/ItemTile";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {

  const [items, setItems] = useState(new Array(8).fill(0));
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(8);
  const [moreItems, setMoreItems] = useState(true);

  async function getItems() {
    setLoading(true);
    await axios
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
      .then(({ data }) => {
        setItems(data);
        setLoading(false);
        if (data.length <= 8) { setMoreItems(false) }
      })
  }

  function loadMore() {
    let newIndex = index + 4;
    if (newIndex >= items.length) { setMoreItems(false) }
    setIndex(newIndex);
  }

  useEffect(() => {
    getItems();
  }, [])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {
        items.slice(0, index).map((item, id) => (
          <div
            key={id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            { !loading ? (
              <ItemTile item={item}/>
            ):(
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
      }
      { moreItems &&
        <div className="col-md-12 text-center">
          <Link to="" onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div> }
    </>
  );
};

export default ExploreItems;
