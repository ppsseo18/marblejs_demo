import { app } from './app';
import { Server } from './server';

const bootstrap = async () => {
  await Server.create(app);
}

bootstrap();