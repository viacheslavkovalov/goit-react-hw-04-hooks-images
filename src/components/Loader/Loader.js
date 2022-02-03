import Loader from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export default function LoaderComponent() {
  return (
    <Wrapper>
      <Loader type="Audio" color="#6b9fed" height={60} width={60} />
    </Wrapper>
  );
}
