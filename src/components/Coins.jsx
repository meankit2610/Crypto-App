import { Container, HStack} from "@chakra-ui/layout";
import { Button, Radio, RadioGroup } from "@chakra-ui/react";
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
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1)

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$"
  
  const changePage = (page) => {
    setPage(page);
    setLoading(true)
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
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
  }, [currency, page]);

  if (error)
    return <ErrorComponent message={"Error While Fetching Exchanges"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
          <>
            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
              <HStack>
                <Radio value= {"inr"}>INR</Radio>
                <Radio value= {"usd"}>USD</Radio>
                <Radio value= {"eur"}>EUR</Radio>
              </HStack>
            </RadioGroup>
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {coins.map((i) => (
            <CoinCard
              id={i.id}
              key={i.id}
              name={i.name}
              img={i.image}
              price={i.current_price}
              symbol={i.symbol}
              currencySymbol={currencySymbol}
              />
          ))}
            </HStack>
            <HStack overflowX={'auto'} w={'full'} p={'8'}>
              {btns.map((item, index) => (
                <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={'white'}
                onClick={()=> changePage(index+1)}
                >
                  {index+1}
                </Button>
              ))}
            </HStack>
      </>
      )}
    </Container>
  );
};



export default Exchanges;
