import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { InputComponent } from '../components/InputComponent';
import axios from 'axios';
import Link from 'next/link';
import { useAuthDispatch, useAuthState } from '../context/auth';

const login = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>({});
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  //로그인 된 상태라면 main으로 이동
  if (authenticated) {
    router.push('/');
  }

  const infoSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        '/auth/login',
        {
          userName,
          password,
        },
        { withCredentials: true }
      );
      //Context 에 정보 저장
      dispatch('LOGIN', res.data?.user);
      //Nextjs 에서 페이지 이동시켜주는 라이브러리
      router.push('/');
    } catch (error: any) {
      setError(error.response.data || {});
    }
  };

  return (
    <div className='bg-white'>
      <div className='flex flex-col items-center justify-center h-screen p-6'>
        <div className='w-10/12 mx-auto md:w-96'>
          <h1 className='mb-2 text-lg font-medium'>로그인</h1>
          <form onSubmit={infoSubmit}>
            <InputComponent
              placeholder='Username'
              value={userName}
              setValue={setUserName}
              error={error.userName}
            />

            <InputComponent
              placeholder='Password'
              type='password'
              value={password}
              setValue={setPassword}
              error={error.password}
            />
            <button className='w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded'>
              로그인
            </button>
          </form>
          <small>
            아직 계정이 없으신가요?
            <Link href='/register' className='ml-1 text-blue-400 uppercase'>
              회원가입
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default login;
