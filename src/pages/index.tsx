import Feed from "@/components/Feed/Feed";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Inter } from "next/font/google";
import Layout from "./layout";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: Session } = useSession();

  return (
    <>
      {Session ? (
        <div className={`${inter.className} mx-auto lg:max-w-6xl`}>
          <Toaster />
          <Layout>
            <Sidebar />
            <Feed />
          </Layout>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
