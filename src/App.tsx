import * as React from "react"
import {
  ChakraProvider
} from "@chakra-ui/react"
// import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { MovieSearch } from "./MovieSearch"

export const App = () => (
  <ChakraProvider>
    <MovieSearch />
  </ChakraProvider>
)
 