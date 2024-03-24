import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Detail from "../components/Detail";
import Loading from "../components/Loading";

const DetailPost = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [post, setpost] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const respond = await axios.get(`${URL}/api/v1/post/detailpost/${id}`);
        // console.log(respond);
        setLoading(false);
        setpost(respond.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, [id]);

  return (
    <div>
      {loading == false && post ? (
        <Detail
          id={post._id}
          file={post.file}
          description={post.description}
          title={post.title}
          username={post.username}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DetailPost;
