import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy, ClientOptions } from '@nestjs/microservices';

const microserviceOptions: ClientOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 8877,
  }
}

@Injectable()
export class MathService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create(microserviceOptions);
    }

    public accumulate(data: number[]) {
        return this.client.send<number, number[]>('add', data);
    }
}