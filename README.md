# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Development

Run the Express server with Vite dev middleware:

```shellscript
npm run dev
```

## Deployment

To deploy to Fly.io first install flyctl with the following command:

```shellscript
brew install flyctl
```

then to deploy run

```shellscript
flyctl launch
```

### DIY

If you're familiar with deploying Express applications you should be right at home. Just make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`