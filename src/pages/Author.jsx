import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  let { authorID } = useParams();
  
  const [author, setAuthor] = useState({});
  const [followed, setFollowed] = useState(false);

  async function getAuthor() {
    await axios
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorID}`)
      .then(({ data }) => {
        setAuthor(data);
      });
  }

  function changeFollowStatus() {
    if (followed) {
      author.followers -= 1;
    } else {
      author.followers += 1;
    }
    setFollowed(!followed);
  }

  function copyAddress() {
    navigator.clipboard.writeText(author.address);
    alert("Copied address: " + author.address);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthor();
  }, [])

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              { Object.keys(author).length ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">@{author.tag}</span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={copyAddress}
                            >
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{author.followers} followers</div>
                        <Link to="#" onClick={changeFollowStatus} className="btn-main">
                          {followed ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ):(
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton height="150px" width="150px" borderRadius="50%" />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <div className="profile_name__skeleton">
                            <Skeleton height="32px" width="148px" borderRadius="8px" />
                            <Skeleton height="20px" width="100px" borderRadius="8px" />
                            <Skeleton height="24px" width="200px" borderRadius="8px" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton height="28px" width="120px" borderRadius="8px" />
                        <Skeleton height="44px" width="120px" borderRadius="8px" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorId={authorID}
                    authorImage={author.authorImage || ""}
                    items={author.nftCollection || new Array(8).fill(0)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
