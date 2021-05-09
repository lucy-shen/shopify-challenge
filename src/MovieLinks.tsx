import React, { FC } from "react";
import type { MovieInfo } from "./MovieSearch";

import {
  HStack,
  Link,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";

export type MovieCardProps = { 
  item: MovieInfo;
}

export const MovieLinks: FC<MovieCardProps> = (props) => {
  const toast = useToast();

  return (
    <HStack>
      <IconButton
        aria-label="Copy IMDB Link"
        icon={<LinkIcon />}
        flex={1}
        onClick={() => {
          navigator.clipboard.writeText(
            "https://www.imdb.com/title/" + props.item.imdbID
          );
          toast({
            title: "Link copied",
            status: "success",
            isClosable: true,
          });
        }}
        colorScheme="pink"
        variant="outline"
      />
      <Link
        href={"https://www.imdb.com/title/" + props.item.imdbID}
        isExternal
        flex={1}
      >
        <IconButton
          aria-label="Open IMDB"
          icon={<ExternalLinkIcon />}
          w="full"
          colorScheme="pink"
          variant="outline"
        />
      </Link>
    </HStack>
  );
};
