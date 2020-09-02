import React from "react";
import { NextPage } from "next";
import useSWR from "swr";

import { withLayout } from "@/app/components/layouts/layout";
import { apiSDK } from "@/app/lib/api_sdk";

const userFetcher = (email: string) => apiSDK.User({ email })
const useUser = (email: string) => {
  const { data, error } = useSWR(email, userFetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}

// const usersFetcher = () => apiSDK.Users()
// const useUsers = () => {
//   const { data, error } = useSWR("", usersFetcher);
//   return {
//     users: data,
//     isLoading: !error && !data,
//     isError: error
//   }
// }

const Index: NextPage<any> = () => {
  const { user, isLoading, isError } = useUser("jason@raimondi.us");
  console.log(user, isLoading, isError);
  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>hello {JSON.stringify(user)}!</div>

  // let body;
  // if (!data) {
  //   body = <p>loading...</p>;
  // } else {
  //   body = (
  //     <>
  //       <p>users:</p>
  //       <ul>
  //         {data.users.map((x: any) => (
  //           <li key={x.uuid}>{x.email}</li>
  //         ))}
  //       </ul>
  //     </>
  //   );
  // }
  //
  // return <div>{body}</div>;
};

export default withLayout(Index, {
  title: "Hi ya slugger",
});
