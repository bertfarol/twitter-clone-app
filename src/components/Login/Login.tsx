import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Login() {
  
  return (
    <div className="flex h-screen">
      <div className="relative hidden basis-2/3 md:block">
        <Image
          src="/twitter_login_bg.png"
          width="1302"
          height="955"
          alt="twitter"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <Image
            src="/large_twitter.png"
            width={346}
            height={346}
            alt="twitter"
          />
        </div>
      </div>
      <div className="p-8 mx-auto text-center basis-1/3 md:mx-0 md:text-left">
        <div className="pt-20">
          <img
            className="m-3 w-14"
            src="https://links.papareact.com/drq"
            alt=""
          />
          <h1 className="my-12 text-5xl font-bold md:text-6xl">
            Happening now
          </h1>
          <h2 className="text-3xl font-bold md:text-4xl">
            Join Twitter today.
          </h2>
          <button
            onClick={signIn as React.MouseEventHandler<HTMLButtonElement>}
            className="py-2 font-bold text-white rounded-full font-smpx-5 bg-twitter max-w-[300px] w-full text-center mt-10 hover:opacity-80"
          >
            Sign in
          </button>
          <p className="text-[11px] mt-1 max-w-[300px]">
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>
        </div>
      </div>
    </div>
  );
}

