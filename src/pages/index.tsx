import Feed from "@/components/Feed/Feed";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Inter } from "next/font/google";
import Layout from "./layout";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
 
  return (
    <div className={`${inter.className} mx-auto lg:max-w-6xl`}>
      <Toaster />
      <Layout>
        <Sidebar />
        <Feed />
      </Layout>
    </div>
  );
}
