import '../styles/globals.css';
import type { AppProps } from 'next/app';
import axios from 'axios';
import { AuthProvider } from '../context/auth';
import { useRouter } from 'next/router';
import NavBar from './components/NavBar';

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api';
  //쿠키에서의 신용처리를 전역적으로 해줌
  axios.defaults.withCredentials = true;

  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login'];
  //현재 페이지가 register 나 login 이면
  const authRoute = authRoutes.includes(pathname);

  return (
    <AuthProvider>
      {!authRoute && <NavBar />}
      <div className={authRoute ? '' : 'pt-12'}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
