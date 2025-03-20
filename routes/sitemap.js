const express = require("express");
const router = express.Router();

router.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml");
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://appzorix.onrender.com/</loc>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>https://appzorix.onrender.com/upload</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>
    </urlset>`;
    res.send(sitemap);
});

module.exports = router;
