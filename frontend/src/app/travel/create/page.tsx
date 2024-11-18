"use client"
import axios from "axios"
import Link from "next/link";
import React, { useState } from "react"

export default function CreateTravel() {
    const [travelField, setTravelfield] = useState({
        title: "",
        description: "",
        location: "",
        image_url: "",
        price: "",
    });

    const changeTravelFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTravelfield({
            ...travelField,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", travelField.title);
        formData.append("description", travelField.description);
        formData.append("location", travelField.location);
        formData.append("price", travelField.price);

        if (travelField.image_url) {
            formData.append("image_url", travelField.image_url);
        }

        try {
            const create = await axios.post("http://localhost:3031/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Response:", create);
            window.location.href = "/";
        } catch (error) {
            console.log("Error saat menambah data:", error);
        }
    }

    return (
        <div className="w-screen py-20 flex justify-center flex-col items-center px-7">
            <div className="flex items-center justify-between gap-3 mb-5">
                <h1 className="text-4xl font-Doto font-semibold text-center">Menambah Data Travel</h1>
            </div>
            <div className="overflow-x-auto mt-4 w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <form action="">
                    {/* Title */}
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-black mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Title"
                            onChange={e => changeTravelFiled(e)}
                            className="rounded-lg shadow-sm w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-black mb-2">Description</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            onChange={e => changeTravelFiled(e)}
                            placeholder="Description"
                            className="rounded-lg shadow-sm w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-black mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            onChange={e => changeTravelFiled(e)}
                            placeholder="Location"
                            className="rounded-lg shadow-sm w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Image URL */}
                    <div className="mb-6">
                        <label htmlFor="image_url" className="block text-sm font-medium text-black mb-2">Image URL</label>
                        <input
                            type="file"
                            name="image_url"
                            id="image_url"
                            onChange={e => {
                                if (e.target.files) {
                                    setTravelfield({
                                        ...travelField,
                                        image_url: e.target.files[0],
                                    });
                                }
                            }}
                            className="rounded-lg shadow-sm w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <label htmlFor="price" className="block text-sm font-medium text-black mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            onChange={e => changeTravelFiled(e)}
                            placeholder="Price"
                            className="rounded-lg shadow-sm w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mb-6 flex justify-end mt-3 gap-5">
                        <button
                            type="submit"
                            onClick={e => onSubmit(e)}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
                        >
                            Submit
                        </button>
                        <Link href={"/"}>
                            <button
                                type="submit"
                                className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
                            >
                                Back
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}