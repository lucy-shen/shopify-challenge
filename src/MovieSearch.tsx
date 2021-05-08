import React, { FC, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import axios from "axios";

import {
  Box,
  Text,
  VStack,
  Input,
  Container,
  Heading,
  HStack,
} from "@chakra-ui/react";

type MovieInfo = {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
};

export const MovieSearch: FC = () => {
  const [query, setQuery] = useState("");
  const [deQuery] = useDebounce(query, 1000);
  const [loading, setLoading] = useState(true);

  // const handleChange = (event) => setQuery(event.target.value);

  // TODO: Add 'searchMovies' state.
  // TODO: Add 'nomineeMovies' state.

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://www.omdbapi.com", {
          params: { apikey: "22aa1b2", s: deQuery },
        });
        if (data.Search) {
          // TODO: setSearchMovies(data.Search as MovieInfo[]);
          // return data.Search as MovieInfo[];
          console.log(data.Search);
        } else {
          alert(`Unexpected error from API: {data.Error.toString()}`);
        }
      } catch (error) {
        console.error("Unexpected network error!", { error });
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [deQuery]);

  return (
    <Container py={12}>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Heading>Some title</Heading>
          <Text>Search for a movie to get started</Text>
        </Box>
        <HStack>
          <Input
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {/* <Button /> */}
        </HStack>
        <HStack align="stretch" spacing={4}>
          <Box shadow="md" borderWidth="1px" flex="1" borderRadius="md">
            <Text fontSize="3xl">Results</Text>
          </Box>
          <Box shadow="md" borderWidth="1px" flex="1" borderRadius="md">
            <Text fontSize="3xl">Nominations</Text>
          </Box>
        </HStack>
      </VStack>
    </Container>
  );
};
