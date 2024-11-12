const connect = require('../lib/connect');
const Travel = require('../model/travel-schema');
const upload = require('./CloudinaryFunction');
const cloudinary = require('cloudinary').v2;


exports.create = async (req, res) => {
    await connect();
    upload(req, res, async (e) => {
        if (e) {
            return res.status(500).json({ error: e.message });
        }

        try {
            const data = {
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                image_url: req.file.path,
                price: req.body.price,
            }

            const travelData = new Travel(data);
            await travelData.save();
            return res.status(201).json({
                success: true,
                message: "Berhasil Menambah Data!",
                data: travelData
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Gagal Menambah Data!",
                error: error.message,
            })
        }
    });

}

exports.get = async (req, res) => {
    await connect();
    try {
        const travelData = await Travel.find();
        return res.status(200).json({
            success: true,
            message: "Berhasil Menampilkan Data!",
            data: travelData
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Gagal Menampilkan Data!",
            error: error.message,
        });
    }
}

exports.getByID = async (req, res) => {
    await connect();
    try {
        ID = req.params.id;
        const travelData = await Travel.findById(ID);

        if (!travelData) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan!" });
        }

        return res.status(200).json({
            success: true,
            message: "Berhasil Menampilkan Data Berdasarkan ID!",
            data: travelData
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Gagal Menampilkan Data Berdasarkan ID!",
            error: error.message,
        });
    }
}

exports.update = async (req, res) => {
    await connect();
    try {
        const ID = req.params.id;
        const travelData = await Travel.findById(ID);

        if (!travelData) {
            res.status(404).json({
                success: false,
                message: "Data Tidak Ditemukan!",
            });
        }

        upload(req, res, async (e) => {
            if (e) {
                return res.status(500).json({ error: e.message });
            }

            if (req.file && travelData.image_url) {
                const public_id = travelData.image_url.split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(public_id);
            }

            travelData.title = req.body.title || travelData.title;
            travelData.description = req.body.description || travelData.description;
            travelData.location = req.body.location || travelData.location;
            travelData.image_url = req.file ? req.file.path : travelData.image_url;
            travelData.price = req.body.price || travelData.price;
            travelData.updated_at = Date.now();

            await travelData.save();

            return res.status(200).json({
                success: true,
                message: "Berhasil Mengupdate Data!",
                data: travelData
            })
        })



    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Gagal Mengupdate Data!",
            error: error.message,
        });
    }
}

exports.delete = async (req, res) => {
    await connect();

    try {
        const ID = req.params.id;

        const travelData = await Travel.findById(ID);

        if (!travelData) {
            return res.status(404).json({ success: false, message: "Data tidak ditemukan!" });
        }

        if (travelData.image_url) {
            const public_id = travelData.image_url.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(public_id);
        }

        await Travel.findByIdAndDelete(ID);

        return res.status(200).json({
            success: true,
            message: "Berhasil Menghapus Data!",
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Gagal Menghapus Data!",
            error: error.message,
        });
    }
}
