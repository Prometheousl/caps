import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy, ClientOptions } from '@nestjs/microservices';

const microserviceOptions: ClientOptions = {
    transport: Transport.REDIS,
    options: {
        url: 'redis://localhost:6379'
    }
}

@Injectable()
export class MathService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create(microserviceOptions);
    }

    public accumulate(data: number[]) {
        let tmp = this.client.send<number, number[]>('add', data);
        return tmp;
    }
}