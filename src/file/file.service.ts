// file-service/src/file/file.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
    private readonly staticDir = path.resolve(__dirname, '..', 'static');

    constructor() {
        this.ensureStaticDirExists();
    }

    private ensureStaticDirExists() {
        if (!fs.existsSync(this.staticDir)) {
            fs.mkdirSync(this.staticDir, { recursive: true });
            console.log('📂 Created static directory at:', this.staticDir);
        }
    }

    async uploadFile(data: { filename: string; fileBase64: string }) {
        const { filename, fileBase64 } = data;

        const buffer = Buffer.from(fileBase64, 'base64');
        const filePath = path.resolve(this.staticDir, filename);

        fs.writeFileSync(filePath, buffer);

        console.log(`✅ File saved: ${filePath}`);
        return { status: 'success', filePath };
    }

    async getFile(filename: string) {
        const filePath = path.resolve(this.staticDir, filename);

        if (!fs.existsSync(filePath)) {
            throw new NotFoundException(`File ${filename} not found`);
        }

        const buffer = fs.readFileSync(filePath);
        const fileBase64 = buffer.toString('base64');

        console.log(`📤 File retrieved: ${filePath}`);
        return { status: 'success', filename, fileBase64 };
    }
}
