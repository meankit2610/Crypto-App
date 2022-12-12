import { Image } from "@chakra-ui/image";
import { Container, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import CoinCard from "./CoinCard";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";
const Exchanges = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=inr`
        );
        setCoins(data);
        console.log(coins);
        setLoading(false);
      } catch (error) {
        console.log("error...");
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            <div>GHiii</div>
          {/* {coins.map((i) => (
            <CoinCard
              key={i.id}
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url}
            />
          ))} */}
        </HStack>
      )}
    </Container>
  );
};



export default Exchanges;
