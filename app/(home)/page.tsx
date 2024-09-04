"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Header from "@/components/Header/Header";
import ListFilms from "@/components/ListFilms/ListFilms";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const api_key = process.env.NEXT_PUBLIC_API_KEY;
const imageURL = process.env.NEXT_PUBLIC_BASE_URL_IMAGE;

const Home = () => {

    const [films, setFilms] = useState<Movie[]>([])

    const getFirstSentence = (text: string) => {
        const firstSentence = text.split('.')[0];
        return firstSentence ? firstSentence + '.' : '';
    }

    useEffect(() => {
        const fetchFilms = async () => {
            const response = await axios.get(`${baseUrl}popular?language=pt-BR&api_key=${api_key}`);
            const data = await response.data.results;
            setFilms(data)
        }

        fetchFilms()
    }, [])

    return (
        <div>
            <div className="relative h-screen">
                <Header />
                <Carousel className="absolute top-0 h-screen" autoPlay>
                    <CarouselContent>
                        {

                            films.map((film) => {
                                return (
                                    <CarouselItem key={film.id} className="relative">
                                        <Image
                                            src={`${imageURL}${film.backdrop_path}`}
                                            width={3000}
                                            height={3000}
                                            alt={film.title}
                                            className="w-full h-screen object-cover opacity-40 max-lg:mb-0"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                                        <div className="flex max-lg:flex-col-reverse max-lg:justify-center items-center justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[1200px] mx-auto">
                                            <div className="mr-10 max-lg:mr-0 text-white">
                                                <h1 className="text-white text-5xl max-lg:text-2xl max-lg:px-5 font-bold mb-7 max-lg:text-center mx-auto">{film.title}</h1>
                                                <p className="font-light mb-7 max-lg:text-center max-lg:mx-7 max-w-[500px]">{getFirstSentence(film.overview)}</p>
                                                <div className="flex gap-6 max-lg:justify-center">
                                                    <button className="text-lg max-lg:text-sm font-semibold bg-red-600 max-lg:w-32 w-44 rounded-full py-2">Assista agora</button>
                                                    <button className="text-lg max-lg:text-sm font-semibold border-2 max-lg:w-32 border-white w-44 rounded-full py-2">Assista o trailer</button>
                                                </div>
                                            </div>
                                            <div className="w-80 h-auto max-w-full max-h-[500px] flex justify-center items-center">
                                                <Image
                                                    src={`${imageURL}${film.poster_path}`}
                                                    width={3000}
                                                    height={3000}
                                                    alt={film.title}
                                                    className="rounded-3xl max-lg:mb-5 max-lg:w-48"
                                                    priority
                                                />
                                            </div>
                                        </div>
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>
                </Carousel>
            </div>
            <div className="mt-20">

            </div>
            <ListFilms />
        </div>
    )
}

export default Home
