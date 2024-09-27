import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Top from "./pages/Top";
import Confirm from "./pages/Confirm";
import Completed from "./pages/Completed";
import Purchased from "./pages/Purchased";
import LogIn from "./pages/LogIn";
import LoggedOut from "./pages/LoggedOut";
import SignUpForm from "./pages/SignUpForm";
import SuccessSignUp from "./pages/SuccessSignUp";
import ScrollToTop from "./hooks/ScrollToTop";
import { PurchasedTicketsProvider } from "./api/PurchasedTicketsContext";

const Router = () => {

  return (
    <>
      <PurchasedTicketsProvider>
        <BrowserRouter>
          <div className="bodyWrap">
            <Header />
            <main>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Top />}></Route>
                <Route path="confirm" element={<Confirm />}></Route>
                <Route path="completed" element={<Completed />}></Route>
                <Route path="purchased" element={<Purchased />}></Route>
                <Route path="logIn" element={<LogIn />}></Route>
                <Route path="loggedOut" element={<LoggedOut />}></Route>
                <Route path="signUpForm" element={<SignUpForm />}></Route>
                <Route path="successSignUp" element={<SuccessSignUp />}></Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </PurchasedTicketsProvider>
    </>
  );
};

export default Router;
