'use client'
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FocusCards } from '@/components/ui/focus-cards';
import { LoaderThree } from '@/components/ui/loader';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  type Card = {
  title: string;
  src: string;
  id:string;  
};
  
  let [cards,setCards] = useState([])
  let [pageReady,setPageReady] = useState(false)

  async function FetchQuizz() {
    setPageReady(false)
    const url = "/api/quizzes"
    const response = await fetch(url)
    let data = await response.json()

    if(response.status!=200){
      toast.error("Faild to fetch data ",{
        description:data.error,
        action:<Button variant={'default'} className={""} size={'sm'} asChild onclick={window.location.replace("/login")}>Login</Button>
      })
      return
    }

    console.log(data)

    let mycards :Card[] = []

    data.map(dta =>{
      let card = {
        title:dta.title,
        src:"https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        id:dta._id
      }
      mycards.push(card)
    })

    setCards(mycards)
    // alert("I am ready")
    setTimeout(() => {
      setPageReady(true)

    }, 2000);
  }

  useEffect(function(){
    FetchQuizz()
  },[])


  return !pageReady?<div className='flex min-h-screen justify-center items-center'><LoaderThree /></div> : (
    <>
      <div className='mt-20'></div>
      <FocusCards cards={cards} />
    </>
  );
}
