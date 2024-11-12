import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { locale } = req.query;
    const filePath = path.resolve(`./public/locales/${locale}.json`);
    console.log(`Trying to load translation file from: ${filePath}`);

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        console.log(`File contents: ${fileContents}`);
        const translations = JSON.parse(fileContents);
        console.log(`Parsed translations: ${JSON.stringify(translations, null, 2)}`);
        res.status(200).json(translations);
    } catch (error) {
        console.error('Error loading translation file:', error);
        res.status(500).json({ error: 'Translation file not found.' });
    }
}