import React from "react";
import ContentLoader from "react-content-loader";

const PizzaLoader = () => (
  <ContentLoader speed={2} width={280} height={460} viewBox="0 0 280 460" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
    <circle cx="140" cy="130" r="125" />
    <rect x="0" y="265" rx="5" ry="5" width="280" height="30" />
    <rect x="0" y="310" rx="5" ry="5" width="280" height="85" />
    <rect x="0" y="415" rx="5" ry="5" width="277" height="45" />
  </ContentLoader>
);

export default PizzaLoader;
