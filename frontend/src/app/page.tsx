import Link from "next/link";
import Table from "@/components/Table";

export default function Home() {
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center px-7">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h1 className="text-4xl font-Doto font-semibold">
          ꧁ Ravi Azzura Putra ꧂
        </h1>
      </div>
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-Doto mt-5 font-semibold">
          Membuat CRUD menggunakan ExpressJS | NextJS | TailwindCSS | MongoDB Secara Mandiri
        </h2>
      </div>
      <div className="overflow-x-auto mt-4">
        <div className="mb-5 w-full text-center">
          <Link href={"/travel/create"}>
            <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold p-3 rounded-lg shadow-xl"> Create </button>
          </Link>
        </div>
        <div>
          <Table />
        </div>
      </div>
    </div>
  );
}
