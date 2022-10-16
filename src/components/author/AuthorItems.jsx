import React from "react";
import ItemTile from "../UI/ItemTile";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ authorId, authorImage, items }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          { items.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              { item ? (
                <ItemTile item={{...item, authorId: authorId, authorImage: authorImage }} />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
