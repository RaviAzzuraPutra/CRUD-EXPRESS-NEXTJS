"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function DetailTravel() {
    const { id } = useParams();

    console.log("ID: ", id);

    const [detailTravel, setDetailTravel] = useState<any>({});

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const response = await axios(`http://localhost:3031/${id}`);
            setDetailTravel(response.data.data);
        } catch (error) {
            console.log("error saat mengambil data", error);
        }
    };

    function formatToRupiah(number) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0, // Jika ingin tanpa desimal
        }).format(number);
    }

    return (
        <div className="w-full py-20 flex justify-center px-7">
            <div className="flex max-w-8xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Image Section */}
                <div className="w-full h-full p-4">
                    <img
                        src={detailTravel.image_url}
                        alt={detailTravel.title}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Details Section */}
                <div className="w-2/3 p-6 text-start">
                    <h1 className="text-3xl font-semibold mb-4">
                        Detail Travel: {detailTravel.title}
                    </h1>
                    <ul className="list-none pl-0 space-y-3 gap-3 p-5">
                        <li className="flex justify-start text-lg">
                            <span className="font-semibold mr-3">Location:</span>
                            <span>{detailTravel.location}</span>
                        </li>
                        <li className="flex justify-start text-lg">
                            <span className="font-semibold mr-3">Price:</span>
                            <span>{formatToRupiah(detailTravel.price)}</span>
                        </li>
                        <li className="flex justify-start text-lg text-justify">
                            <span className="font-semibold mr-3">Description:</span>
                            <span>{detailTravel.description}</span>
                        </li>
                    </ul>
                    <div className="mb-6 flex justify-end mt-3 gap-5 items-end">
                        <Link href={"/"}>
                            <button
                                type="submit"
                                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
                            >
                                Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
