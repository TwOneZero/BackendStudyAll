import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';
import { useAuthState } from '../context/auth';
import styles from '../styles/Home.module.css';
import { Post, Sub } from '../types';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';

const Home: NextPage = () => {
  const { authenticated } = useAuthState();

  const address = `/subs/sub/topSubs`;

  //스크롤에 필요한 통신
  const getKey = (pageIndex: number, prevPageData: Post[]) => {
    if (prevPageData && !prevPageData.length) return null;
    // 첫 페이지, `previousPageData`가 없음
    return `/posts?page=${pageIndex}&count=5`;
  };
  //Fetch Posts with scrolling
  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    mutate,
  } = useSWRInfinite<Post[]>(getKey);
  //Post 초기 로딩
  const isInitialLoading = !data && !error;
  //Posts 데이터 저장 concat
  const posts: Post[] = data ? ([] as Post[]).concat(...data) : [];

  //Fetch Top Subs
  const { data: topSubs } = useSWR<Sub[]>(address);

  const [observedPost, setObservedPost] = useState('');

  useEffect(() => {
    //포스트가 없다면 return
    if (!posts || posts.length === 0) return;
    //포스트 배열안에 마지막 post id 가져오기
    const id = posts[posts.length - 1].identifier;
    //포스트 추가시 마지막 포스트로observedPost 변경
    if (id !== observedPost) {
      setObservedPost(id);
      //
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  const observeElement = (element: HTMLElement | null) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        //isIntersecting
        if (entries[0].isIntersecting === true) {
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  return (
    <div className='flex max-w-5xl px-4 pt-5 mx-auto'>
      {/* 포스트 리스트 */}
      <div className='w-full md:mr-3 md:w-8/12'>
        {isInitialLoading && (
          <p className='text-lg text-center'>로딩 중 입니다...</p>
        )}
        {posts?.map((post) => (
          <PostCard key={post.identifier} post={post} mutate={mutate} />
        ))}
        {isValidating && posts.length > 0 && (
          <p className='text-lg text-center'>로딩 중 입니다...</p>
        )}
      </div>
      {/* 사이드바 */}
      <div className='hidden w-4/12 ml-3 md:block'>
        <div className='bg-white border rounded'>
          <div className='p-4 border-b'>
            <p className='text-lg font-semibold text-center'>상위 커뮤니티</p>
          </div>

          {/* 커뮤니티 리스트 */}
          <div>
            {topSubs?.map((sub: Sub) => (
              <div
                key={sub.name}
                className='flex items-center px-4 py-2 text-xs border-b'
              >
                <Link href={`/r/${sub.name}`}>
                  <Image
                    src={sub.imageUrl}
                    className='rounded-full cursor-pointer'
                    alt='Sub'
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href={`/r/${sub.name}`}
                  className='ml-2 font-bold hover:cursor-pointer'
                >
                  /r/{sub.name}
                </Link>
                <p className='ml-auto font-md'>{sub.postCount}</p>
              </div>
            ))}
          </div>
          {authenticated && (
            <div className='w-full py-6 text-center'>
              <Link
                href='/subs/create'
                className='w-full p-2 text-center text-white bg-gray-400 rounded'
              >
                커뮤니티 만들기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
