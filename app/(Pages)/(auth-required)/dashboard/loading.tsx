"use client";

import { useEffect } from 'react';

export default function Loading() {

    useEffect(() => {
      console.log('this is loading...');
    
      return () => {
      
      }
    }, []);
    
  return (
    <>
      <div>this is from loading</div>
    </>
  );
}