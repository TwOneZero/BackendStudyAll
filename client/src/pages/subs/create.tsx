import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { InputComponent } from '../../components/InputComponent';

const Subcreate = () => {
  const [subName, setSubName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<any>({});
  const router = useRouter();

  const infoSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/subs', { subName, title, description });
      console.log(res);

      router.push(`/r/${res.data.name}`);
    } catch (error: any) {
      console.log(error);
      setError(error?.response.data);
    }
  };

  return (
    <div className='flex flex-col justify-center pt-16'>
      <div className='w-10/12 mx-auto md:96 bg-white rounded p-4'>
        <h1 className='mb-2 text-lg font-medium'>커뮤니티 생성</h1>
        <hr />
        <form onSubmit={infoSubmit}>
          <div className='my-6'>
            <p className='font-medium'>이름</p>
            <p className='font-midium text-xs text-gray-400'>
              커뮤니티 이름은 변경할 수 없습니다.
            </p>
            <InputComponent
              placeholder='이름'
              value={subName}
              error={error.subName}
              setValue={setSubName}
            />
            <p className='font-medium'>Title</p>
            <p className='font-midium text-xs text-gray-400'>
              주제를 나타냅니다. 언제든지 변경할 수 있음.
            </p>
            <InputComponent
              placeholder='제목'
              value={title}
              error={error.title}
              setValue={setTitle}
            />
            <p className='font-medium'>Description</p>
            <p className='font-midium text-xs text-gray-400'>
              해당 커뮤니티에 대한 설명입니다.
            </p>
            <InputComponent
              placeholder='설명'
              value={description}
              error={error.description}
              setValue={setDescription}
            />
          </div>
          <div className='flex justify-end'>
            <button className='px-4 py-1 text-sm font-semibold rounded text-white bg-gray-400 border'>
              커뮤니티 만들기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subcreate;

//커뮤니티 생성 권한 체크
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    //쿠키가 없다면 에러 반환
    if (!cookie) throw new Error('No token cookie!');

    //쿠키 이용해서 백엔드 인증처리
    await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/me`, { headers: { cookie } });

    return { props: {} };
  } catch (error) {
    //백엔드에서 요청한 쿠키 -> 인증처리 실패 -> login 페이지로 이동
    res.writeHead(307, { Location: '/login' }).end();
    return { props: {} };
  }
};
