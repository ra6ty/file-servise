// file-service/src/file/file.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FileService } from './file.service';

@Controller()
export class FileController {
    constructor(private fileService: FileService) {}

    @MessagePattern({ cmd: 'upload-file' })
    async uploadFile(
        @Payload() data: { filename: string; fileBase64: string },
    ) {
        return this.fileService.uploadFile(data);
    }

    @MessagePattern({ cmd: 'get-file' })
    async getFile(@Payload() payload: any) {
        return this.fileService.getFile(payload.filename);
    }
}
