// file-service/src/file/file.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
    async uploadFile(data: { filename: string; fileBase64: string }) {
        // розбираємо дані:
        const { filename, fileBase64 } = data;

        // перетворюємо base64 у Buffer:
        const buffer = Buffer.from(fileBase64, 'base64');

        const filePath = path.resolve(__dirname, '..', 'static', filename);
        fs.writeFileSync(filePath, buffer);

        // Повертаємо щось, що потім отримає Gateway як відповідь
        return { status: 'success', filePath };
    }

    async getFile(filename: string) {
        const filePath = path.resolve(__dirname, '..', 'static', filename);
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException(`File ${filename} not found`);
        }
        // зчитуємо і повертаємо у base64 для прикладу
        const buffer = fs.readFileSync(filePath);
        const fileBase64 = buffer.toString('base64');
        return { status: 'success', filename, fileBase64 };
    }
}
