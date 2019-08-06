import { HttpException, HttpStatus } from "@nestjs/common";

export class TestException extends HttpException {
    constructor() {
        super('Testing 1, 2, 3...', HttpStatus.NOT_IMPLEMENTED);
    }
}