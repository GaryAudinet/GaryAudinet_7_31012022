// Import des packages requis

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Create from '../components/Post/Create';

// Fonctions des requetes pour l'affichage des posts sur la page home, ainsi que leur likes, puis leurs vDOM

function Home() {

  let navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {

    if (!sessionStorage.getItem('JWToken')) {
      navigate('/');
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/posts`, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((res) => {
          setListOfPosts(res.data.listOfPosts);
          setLikedPosts(
            res.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeOrNot = (postId) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/likes`,
        { PostId: postId },
        {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        }
      )
      .then((res) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (res.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div className="page_container">
      <Navbar />
      <div className="home">
        <Create />
        <div className="home_posts">
          {listOfPosts.map((value, key) => {
            return (
              <div className="home_post" key={key}>
                <div className="home_post_header">
                  <div className="home_post_username">
                    <p>{value.username}</p>
                  </div>
                </div>
                <div
                  className="home_post_image"
                  onClick={() => {
                    navigate(`/home/${value.id}`);
                  }}
                >
                  {value.image && (
                    <>
                      <img src={value.image} alt="image liée au post en question" />
                    </>
                  )}
                </div>
                <div
                  className="home_post_content"
                  onClick={() => {
                    navigate(`/home/${value.id}`);
                  }}
                >
                  {value.content}
                </div>
                <div className="ligne_post"></div>
                <div className="home_post_footer">
                  <div className="home_post_buttons"
                    onClick={() => {
                      navigate(`/home/${value.id}`);
                    }}
                  >
                    <CommentIcon className="home_post_comment" />
                    <p>Commentaire</p>
                  </div>
                  <div className="home_post_buttons">
                    <FavoriteIcon
                      className={
                        likedPosts.includes(value.id)
                          ? 'home_post_buttons_like'
                          : 'home_post_buttons_unlike'
                      }
                      onClick={() => {
                        likeOrNot(value.id);
                      }}
                    />
                    <p>{value.Likes.length}</p>
                    <p>~ Like</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
