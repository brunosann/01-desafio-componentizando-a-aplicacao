import { useEffect, useState } from "react";
import { MovieProps, GenreResponseProps } from "../App";
import { api } from "../services/api";
import { MovieCard } from "../components/MovieCard";
import { Header } from "./Header";

type ContentProps = {
  selectedGenreId: number;
};

export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${props.selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [props.selectedGenreId]);

  return (
    <div className="container">
      <Header selectedGenre={selectedGenre} />
      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
