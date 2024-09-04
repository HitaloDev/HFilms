"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ListFilms = () => {
  const baseUrlSearch = process.env.NEXT_PUBLIC_SEARCH;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const imageURL = process.env.NEXT_PUBLIC_BASE_URL_IMAGE;

  const [showFilms, setShowFilms] = useState<Movie[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [page, setPage] = useState<string>("1");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setLoading(true);
        let response;
        if (!inputSearch) {
          response = await axios.get(
            `${baseUrl}popular?language=pt-BR&api_key=${api_key}&page=${page}`
          );
        } else {
          response = await axios.get(
            `${baseUrlSearch}=${inputSearch}&include_adult=false&language=pt-BR&page=${page}&api_key=${api_key}`
          );
        }
        const data = await response.data.results;
        setShowFilms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [inputSearch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto mb-80 px-4">
      <h1 className="text-white text-4xl font-bold text-center mb-10">
        Filmes Populares
      </h1>
      {loading ? (
        <div className="grid grid-cols-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {showFilms.map((film) => (
            <div key={film.id} className="">
              <Image
                src={`${imageURL}${film.poster_path}`}
                width={1000}
                height={1000}
                alt={film.title}
                className="w-40 rounded-xl"
              />
              <p className="font-bold text-white text-xl mt-3">
                {film.title}
              </p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ListFilms;
