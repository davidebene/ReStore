import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContext";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import { getCookie } from "../util/util";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleSwitch() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent message="Initilizing app..."/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header handleSwitch={handleSwitch} />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/catalog' element={<Catalog />}/>
          <Route path='/catalog/:id' element={<ProductDetails />}/>
          <Route path='/about' element={<AboutPage />}/>
          <Route path='/contact' element={<ContactPage />}/>
          <Route path='/server-error' element={<ServerError />}/>
          <Route path='/basket' element={<BasketPage />}/>
          <Route path='/checkout' element={<CheckoutPage />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;


