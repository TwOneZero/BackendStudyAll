import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

//상세페이지
const SubPage = () => {
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  const router = useRouter();
  //r/[sub]
  const subName = router.query.sub;
  const { data: sub, error } = useSWR(
    subName ? `/subs/${subName}` : null,
    fetcher
  );

  return <div>SubPage</div>;
};

export default SubPage;
