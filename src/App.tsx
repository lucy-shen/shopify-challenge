import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Container,
  Heading,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { MovieSearch } from "./MovieSearch"

export const App = () => (
  <ChakraProvider theme={theme}>
    <MovieSearch />
  </ChakraProvider>
)
 