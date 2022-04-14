import React from "react";
import LandingPageView from "../src/landing";
import AppView from "../src/app";

const Home = () => (
    <AppView meta={{ title: 'Dashboard - WQI App' }}>
      <LandingPageView />
    </AppView>
);

export default Home;
