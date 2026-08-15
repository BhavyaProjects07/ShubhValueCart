"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import BottomBar from "@/components/BottomBar";
import WhatsAppButton from "@/components/Whatsapp";
import ShubhamGoyal from "@/components/ShubhamGoyal";
import OfflineScreen from "@/components/OfflineScreen";


import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

import { fetchProducts } from "@/lib/features/product/productSlice";
import {
  fetchCart,
  uploadCart,
} from "@/lib/features/cart/cartSlice";
import { fetchAddress } from "@/lib/features/address/addressSlice";
import { fetchUserRatings } from "@/lib/features/rating/ratingSlice";

export default function PublicLayout({ children }) {
  const dispatch = useDispatch();

  const { user } = useUser();
  const { getToken } = useAuth();

  const { cartItems } = useSelector((state) => state.cart);

  /* --------------------------------
     Fetch Products
  -------------------------------- */
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  /* --------------------------------
     User Data
  -------------------------------- */
  useEffect(() => {
    if (!user) return;

    dispatch(fetchCart({ getToken }));
    dispatch(fetchAddress({ getToken }));
    dispatch(fetchUserRatings({ getToken }));
  }, [user, getToken, dispatch]);

  /* --------------------------------
     Upload Cart
  -------------------------------- */
  useEffect(() => {
    if (!user) return;

    dispatch(uploadCart({ getToken }));
  }, [cartItems, user, getToken, dispatch]);

  return (
    
    <>
      <OfflineScreen/>
        {/* Preloader */}
        <Preloader />

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        {children}

        {/* Floating Founder Widget */}
        <ShubhamGoyal />

        {/* Marketing / WhatsApp Widget */}
        <WhatsAppButton />

        {/* Mobile Bottom Navigation */}
        <BottomBar />

        {/* Footer */}
        <Footer />
      </>
    
  );
}