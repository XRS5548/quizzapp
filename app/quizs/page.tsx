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
    id: string;
  };

  let [cards, setCards] = useState([])
  let [pageReady, setPageReady] = useState(false)

  async function FetchQuizz() {
    setPageReady(false)
    const url = "/api/quizzes"
    const response = await fetch(url)
    let data = await response.json()

    if (response.status != 200) {
      toast.error("Faild to fetch data ", {
        description: data.error,
        action: <Button variant={'default'} className={""} size={'sm'} asChild onclick={window.location.replace("/login")}>Login</Button>
      })
      return
    }

    console.log(data)

    let images = [
      "https://plus.unsplash.com/premium_photo-1668736594225-55e292fdd95e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1679957333039-285fb913aa2b?q=80&w=663&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1458419948946-19fb2cc296af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1595452767427-0905ad9b036d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1484069560501-87d72b0c3669?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]

    function getShuffledList(list:string[]) {
      const array = [...list];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function getRandomItem(list: string[]) {
      if (!Array.isArray(list) || list.length === 0) {
        throw new Error("List must be a non-empty array");
      }
      const randomIndex = Math.floor(Math.random() * list.length);
      return list[randomIndex];
    }

    let mycards: Card[] = []

    data.map(dta => {
      let randomlist = getShuffledList(images)
      let card = {
        title: dta.title,
        src: getRandomItem(randomlist),
        id: dta._id
      }
      mycards.push(card)
    })

    setCards(mycards)
    // alert("I am ready")
    setTimeout(() => {
      setPageReady(true)

    }, 2000);
  }

  useEffect(function () {
    FetchQuizz()
  }, [])


  return !pageReady ? <div className='flex min-h-screen justify-center items-center'><LoaderThree /></div> : (
    <>
      <div className='mt-20'></div>
      <FocusCards cards={cards} />
    </>
  );
}
