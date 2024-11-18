"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

export default function Table() {

    const [travelData, setTravelData] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const get = await axios("http://localhost:3031");
            if (Array.isArray(get.data.data)) {
                setTravelData(get.data.data);
            } else {
                console.log("Data yag diterima bukan array : ", get.data.data);
                setTravelData([]);
            }
        } catch (error) {
            console.log("Error : ", error);
        }
    }

    function formatToRupiah(number) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0, // Jika ingin tanpa desimal
        }).format(number);
    }

    const handleDelete = async (id) => {
        console.log(id);

        await axios.delete(`http://localhost:3031/delete/${id}`);
        const newData = travelData.filter((item) => {
            return (
                item._id !== id
            );
        });
        setTravelData(newData);
    }

    return (

        <table>
            <thead className="text-bold text-black uppercase text-center bg-pink-300">
                <tr>
                    <th className="py-4 px-7 text-center  hover:bg-pink-400">No</th>
                    <th className="py-4 px-7 text-center  hover:bg-pink-400">Image</th>
                    <th className="py-4 px-7 text-center  hover:bg-pink-400">Title</th>
                    <th className="py-4 px-7 text-center  hover:bg-pink-400">Description</th>
                    <th className="py-4 px-7 text-center  hover:bg-pink-400">Location</th>
                    <th className="py-4 px-7 text-center  hover:bg-pink-400">Price</th>
                    <th className="py-4 px-7 text-center  hover:bg-pink-400">Action</th>
                </tr>
            </thead>
            <tbody>
                {travelData.map((data, index) => (
                    <tr className="bg-white hover:bg-slate-100" key={data._id}>
                        <td className="py-3 px-7 ">{index + 1}</td>
                        <td><img src={data.image_url} alt={data.title} className="w-full h-auto rounded-lg shadow-sm" /></td>
                        <td className="py-3 px-7">{data.title}</td>
                        <td className="py-3 px-7 text-justify">{data.description}</td>
                        <td className="py-3 px-7">{data.location}</td>
                        <td className="py-3 px-7">{formatToRupiah(data.price)}</td>
                        <td className="py-3 px-7 flex justify-between gap-3">
                            <Link href={`/travel/detail/${data._id}`}>
                                <button className="bg-green-400 hover:bg-green-500 text-white font-sm p-3 rounded-lg shadow-xl"> Detail </button>
                            </Link>
                            <Link href={`/travel/update/${data._id}`}>
                                <button className="bg-blue-400 hover:bg-blue-500 text-white font-sm p-3 rounded-lg shadow-xl"> Update </button>
                            </Link>
                            <button className="bg-red-400 hover:bg-red-500 text-white font-sm p-3 rounded-lg shadow-xl"
                                onClick={() => handleDelete(data._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )

}
