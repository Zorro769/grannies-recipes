import React, { Suspense } from "react";
import Header from "../components/Shared/Header";
import Loading from "components/Shared/Loading";

const Recipes = React.lazy(() => import("../components/Home/Recipes/Recipes"));

const Home = () => {
  return (
    <main className="w-full h-full flex flex-col">
      <Header
        title={
          <p>
            Taste the World with
            <br /> Granny'sRecipes!
          </p>
        }
        type="home"
      />
      <section id="recipes" className="md:max-w-[1440px] mx-auto px-4 md:px-20">
        <Suspense fallback={<Loading />}>
          <Recipes />
        </Suspense>
      </section>
    </main>
  );
};

export default Home;
