import { Router } from '@modules';
import { cors, helmet } from '@plugins';
import { createContext, TRPCPlugin } from '@services'
import fastify from 'fastify';

const app = fastify()

const main = async () => {
  app
    .register(helmet)
    .register(cors, {
      origin: [/localhost:3000$/, /localhost:5173$/],
      methods: [
        'GET',
        'HEAD',
        'PUT',
        'PATCH',
        'POST',
        'DELETE',
        'OPTIONS'
      ],
      allowedHeaders: ['Content-Type'],
      credentials: true,
      preflight: true
    })
    .register(TRPCPlugin, {
      prefix: '/trpc',
      trpcOptions: { router: Router, createContext },
    })

  app.listen(
    {
      port: 3333,
      host: '0.0.0.0'
    },
    (error, address) => {
      if (error) return console.error(error)
      console.log(`Running at ${address}`)
    }
  )
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});