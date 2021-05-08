import React, { FC, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";

import {
  Text,
  VStack,
  Input,
  Container,
  Heading,
  HStack,
  Button,
  Center,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

type MovieInfo = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
};

const PAST_MOVIE_NOMS_KEY = "PAST_MOVIE_NOMINATIONS";

export const MovieSearch: FC = () => {
  const [query, setQuery] = useState("");
  const [deQuery] = useDebounce(query, 1000);
  const [loading, setLoading] = useState(true);

  const initialMovieNoms = useMemo<MovieInfo[]>(() => {
    const value = localStorage.getItem(PAST_MOVIE_NOMS_KEY);
    return value ? JSON.parse(value) : [];
  }, []);
  const [movieResults, setMovieResults] = useState<MovieInfo[]>([]);
  const [movieNoms, setMovieNoms] = useState<MovieInfo[]>(initialMovieNoms);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://www.omdbapi.com", {
          params: { apikey: "22aa1b2", s: deQuery },
        });
        if (data.Search) {
          setMovieResults(data.Search);
        } else if (data.Error) {
          if (data.Error === "Movie not found!") {
          } else {
            alert(`Unexpected error from API: ${data.Error.toString()}`);
          }
        }
      } catch (error) {
        alert(`Unexpected network error: ${error.toString()}`);
      } finally {
        setLoading(false);
      }
    };
    if (deQuery.length > 2) {
      search();
    } else {
      setMovieResults([]);
    }
  }, [deQuery]);

  useEffect(() => {
    localStorage.setItem(PAST_MOVIE_NOMS_KEY, JSON.stringify(movieNoms));
  }, [movieNoms]);

  console.log(movieResults);

  const renderMessage = () => {
    if (loading) {
      return <Spinner />;
    }
    if (!query) {
      return <Text>Enter a movie name to get started!</Text>;
    }
    if (query.length < 3) {
      return <Text>Movie name must be at least 3 characters</Text>;
    }
    return <Text>Movie not found</Text>;
  };

  return (
    <Container py={12} maxW="container.lg">
      <VStack align="stretch" spacing={4}>
        <VStack align="stretch">
          <Heading size="2xl">The Shoppies</Heading>
          <Text fontSize="lg">
            Nominate 5 movies. Your nominations will be saved if you leave this
            page.
          </Text>
        </VStack>
        <Input
          placeholder="Search"
          value={query}
          size="lg"
          onChange={(event) => setQuery(event.target.value)}
        />
        {movieNoms.length >= 5 && (
          <Alert status="success" fontSize="lg">
            <AlertIcon />5 nominees selected!
          </Alert>
        )}
        <HStack align="stretch" minH={96}>
          <VStack
            align="stretch"
            flex={1}
            spacing={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            p={4}
          >
            <Heading fontSize="3xl">Results</Heading>
            {movieResults.length > 0 ? (
              movieResults.map((item) => {
                return (
                  <HStack>
                    <VStack align="stretch" flex={1} spacing={0}>
                      <Text fontSize="xl" fontWeight="semibold">
                        {item.Title}
                      </Text>
                      <Text fontSize="lg">{item.Year}</Text>
                    </VStack>
                    <Button
                      onClick={() => {
                        setMovieNoms([...movieNoms, item]);
                      }}
                      isDisabled={
                        movieNoms.some((nom) => {
                          return nom.imdbID === item.imdbID;
                        }) || movieNoms.length >= 5
                      }
                    >
                      Nominate
                    </Button>
                  </HStack>
                );
              })
            ) : (
              <Center fontSize="lg">{renderMessage()}</Center>
            )}
          </VStack>
          <VStack
            align="stretch"
            flex={1}
            spacing={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            p={4}
          >
            <Heading fontSize="3xl">Nominations</Heading>
            {movieNoms.map((item) => {
              return (
                <HStack>
                  <VStack align="stretch" flex={1} spacing={0}>
                    <Text fontSize="xl" fontWeight="semibold">
                      {item.Title}
                    </Text>
                    <Text fontSize="lg">{item.Year}</Text>
                  </VStack>
                  <Button
                    onClick={() => {
                      const noms = movieNoms.filter((oneOfTheMoviesInNom) => {
                        return oneOfTheMoviesInNom.imdbID !== item.imdbID;
                      });
                      setMovieNoms(noms);
                    }}
                  >
                    Remove
                  </Button>
                </HStack>
              );
            })}
          </VStack>
        </HStack>
      </VStack>
    </Container>
  );
};
