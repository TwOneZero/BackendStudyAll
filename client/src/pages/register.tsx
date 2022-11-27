import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { InputComponent } from './components/InputComponent';

const Register = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<any>({});
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const infoSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/register', {
        email,
        userName,
        password,
      });
      console.log(res);
      //Nextjs 에서 페이지 이동시켜주는 라이브러리
      router.push('/login');
    } catch (error: any) {
      console.log('< error >', error);
      setError(error.response.data || {});
    }
  };

  return (
    <div className='bg-white'>
      <div className='flex flex-col items-center justify-center h-screen p-6'>
        <div className='w-10/12 mx-auto md:w-96'>
          <h1 className='mb-2 text-lg font-medium'>회원가입</h1>
          <form onSubmit={infoSubmit}>
            <InputComponent
              placeholder='Email'
              value={email}
              setValue={setEmail}
              error={error.email}
            />
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
              회원가입
            </button>
          </form>
          <small>
            이미 가입하셨나요?
            <Link href='/login' className='ml-1 text-blue-400 uppercase'>
              로그인
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

//Next js 는 default 로 export 해줘야함 파일명이 페이지 이름이 됨
export default Register;
