// file-service/src/file/file.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileService } from './file.service';

@Controller()
export class FileController {
    constructor(private fileService: FileService) {}

    // Патерн "upload-file" – коли мікросервіс отримає повідомлення з таким патерном,
    // викличеться метод "uploadFile".
    @MessagePattern({ cmd: 'upload-file' })
    async uploadFile(@Payload() payload: any) {
        // Тут ваш payload — це обʼєкт із даними, наприклад { filename, fileBase64 }.
        return this.fileService.uploadFile(payload);
    }

    @MessagePattern({ cmd: 'get-file' })
    async getFile(@Payload() payload: any) {
        return this.fileService.getFile(payload.filename);
    }
}
