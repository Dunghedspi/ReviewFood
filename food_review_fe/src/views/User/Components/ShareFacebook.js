/* eslint-disable react/prop-types */
import React from "react";
import { Helmet } from "react-helmet";
// import { useLocation } from "react-router-dom";
export default function HelmetMetaData(props) {
  // let location = useLocation();
  let currentUrl = "https://github.com";
  let quote = props.quote !== undefined ? props.quote : "";
  let title = props.title !== undefined ? props.title : "Campers";
  let image =
    "https://images.unsplash.com/photo-1453899242646-c74d86b5b8e8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=05993ddfa31268c29b2e7e253d9b112b";
  let description =
    props.description !== undefined
      ? props.description
      : "CampersTribe lets you experience the camping culture. We discover the hidden gems in the nearby to help you connect with nature & yourself by learning in the woods, on the riverbank under the open sky." +
        "Trust us, its million dollars experience to ride away from city life, pitch a tent, do campfire and endless talk!" +
        "So, join us on this voyage, and explore the beauty and miracle of being yourself!";
  let hashtag = props.hashtag !== undefined ? props.hashtag : "#camperstribe";
  return (
    <Helmet>
      <title>{title}</title>
      <meta charset="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="CampersTribe" />
      <meta property="og:description" content={description} />{" "}
    </Helmet>
  );
}
