import React, { useEffect, useRef, useState } from "react";
import MainHeader from '../components/MainHeader/MainHeader';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScroll = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr > lastScroll.current && curr > 40) {
        setShowHeader(false);
      } else if (curr < lastScroll.current) {
        setShowHeader(true);
      }
      lastScroll.current = curr;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <MainHeader show={showHeader} />
      <Outlet />
    </>
  );
}