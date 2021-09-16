import { GenreResponseProps } from "../App";

type HeaderProps = {
  selectedGenre: GenreResponseProps;
};

export const Header = (props: HeaderProps) => {
  return (
    <header>
      <span className="category">
        Categoria:<span> {props.selectedGenre.title}</span>
      </span>
    </header>
  );
};
